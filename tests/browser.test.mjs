import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, writeFile, rm, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { once } from 'node:events';

// Native CDP keeps the static project and its browser checks dependency-free.
const root = resolve(import.meta.dirname, '..');
const artifacts = resolve(root, 'test-results');
const browserPath = process.env.BROWSER_PATH || [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
].find(existsSync);
const port = Number(process.env.TEST_PORT || 4187);
const origin = `http://127.0.0.1:${port}`;
let browser, server, cdp, sessionId, profile, downloadPath;
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const errors = [];

class Protocol {
  constructor(socket) {
    this.socket = socket;
    this.id = 0;
    this.pending = new Map();
    socket.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const request = this.pending.get(message.id);
        if (!request) return;
        this.pending.delete(message.id);
        clearTimeout(request.timer);
        if (message.error) request.reject(new Error(message.error.message));
        else request.resolve(message.result);
      }
      if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
    });
  }
  send(method, params = {}, session = sessionId) {
    return new Promise((resolve, reject) => {
      const id = ++this.id;
      const timer = setTimeout(() => { this.pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 15000);
      this.pending.set(id, { resolve, reject, timer });
      this.socket.send(JSON.stringify({ id, method, params, ...(session ? { sessionId: session } : {}) }));
    });
  }
}
async function evaluate(expression) {
  const result = await cdp.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}
async function until(expression, label) {
  for (let i = 0; i < 100; i++) {
    try { if (await evaluate(expression)) return; }
    catch (error) {
      if (!/context|Cannot find|navigat/i.test(error.message)) throw error;
    }
    await pause(50);
  }
  throw new Error(`Timed out: ${label}`);
}
async function goto(path) {
  await cdp.send('Page.navigate', { url: 'about:blank' });
  await until(`location.href === 'about:blank' && document.readyState === 'complete'`, 'reset navigation context');
  await cdp.send('Page.navigate', { url: origin + path });
  await until(`location.href === ${JSON.stringify(origin + path)} && document.readyState === 'complete' && !!document.querySelector('h1')`, `load ${path}`);
}
async function fill(name, value) {
  await evaluate(`{ const el=document.querySelector(${JSON.stringify(`[name="${name}"]`)}); if(!el) throw Error('Missing field ${name}'); el.value=${JSON.stringify(String(value))}; el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true})); }`);
}
async function click(selector) {
  const point = await evaluate(`(()=>{ const el=document.querySelector(${JSON.stringify(selector)}); if(!el) throw Error('Missing control'); el.focus(); el.scrollIntoView({block:'center',inline:'center'}); const r=el.getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()`);
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', ...point, button: 'left', clickCount: 1 });
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...point, button: 'left', clickCount: 1 });
  await pause(40);
}
async function text(selector) { return evaluate(`document.querySelector(${JSON.stringify(selector)})?.textContent`); }
async function reset() {
  await goto('/');
  await evaluate(`localStorage.removeItem('permitpath-demo-v1')`);
  await goto('/#/projects');
}
async function screenshot(name) {
  if (process.env.CAPTURE !== '1') return;
  const result = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await writeFile(resolve(artifacts, name), Buffer.from(result.data, 'base64'));
}
async function readDownload(path) {
  for (let i = 0; i < 100; i++) {
    if (existsSync(path)) {
      const content = await readFile(path, 'utf8');
      if (content.endsWith('</html>')) return content;
    }
    await pause(50);
  }
  throw new Error(`Download did not finish: ${path}`);
}

before(async () => {
  assert.ok(browserPath, 'Set BROWSER_PATH to an installed Chromium, Chrome or Edge executable.');
  await mkdir(artifacts, { recursive: true });
  profile = await mkdtemp(resolve(artifacts, 'browser-profile-'));
  downloadPath = await mkdtemp(resolve(artifacts, 'downloads-'));
  server = spawn(process.execPath, [resolve(root, 'scripts', 'serve.mjs'), '--dist'], { cwd: root, env: { ...process.env, PORT: String(port) }, stdio: 'pipe' });
  let responsive = false;
  for (let i = 0; i < 100; i++) {
    try { responsive = (await fetch(origin)).ok; } catch (error) { if (!(error instanceof TypeError)) throw error; }
    if (responsive) break;
    await pause(50);
  }
  assert.ok(responsive, 'Production server must respond');
  browser = spawn(browserPath, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
  const endpoint = await new Promise((resolve, reject) => {
    let stderr = '';
    const timeout = setTimeout(() => reject(new Error('Browser debugging endpoint did not start')), 20000);
    browser.stderr.on('data', data => {
      stderr += data;
      const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) { clearTimeout(timeout); resolve(match[1]); }
    });
    browser.once('error', error => { clearTimeout(timeout); reject(error); });
  });
  const socket = new WebSocket(endpoint);
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
  cdp = new Protocol(socket);
  const target = await cdp.send('Target.createTarget', { url: 'about:blank' }, null);
  sessionId = (await cdp.send('Target.attachToTarget', { targetId: target.targetId, flatten: true }, null)).sessionId;
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath }, null);
}, { timeout: 40000 });

after(async () => {
  if (cdp) await cdp.send('Browser.close', {}, null);
  if (browser && browser.exitCode === null) await Promise.race([once(browser, 'exit'), pause(5000)]);
  if (browser && browser.exitCode === null) browser.kill();
  if (server) server.kill();
  // Only the uniquely named profile created by this test is removed.
  if (profile) await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  if (downloadPath) await rm(downloadPath, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
});

for (const viewport of [{ name: 'desktop', width: 1440, height: 1000 }, { name: 'mobile', width: 390, height: 844 }]) {
  test(`${viewport.name}: both complete sample journeys, validation, persistence, routes and screenshots`, { timeout: 90000 }, async () => {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.name === 'mobile' });
    await reset();
    await screenshot(`${viewport.name}-dashboard.png`);
    await click('[aria-label="Open Backyard deck walkthrough"]');
    assert.match(await text('h1'), /Backyard deck/);
    await click('a[href="#/project/deck/plan"]');
    await fill('width', 20);
    assert.match(await evaluate(`document.querySelector('#live-diagram svg').getAttribute('aria-label')`), /20 by 12/);
    await fill('guardHeight', 35);
    await click('a[href="#/project/deck/checks"]');
    assert.match(await text('.check-list'), /Issue to resolve/);
    await click('a[href="#/project/deck/plan"]');
    await fill('guardHeight', 36);
    await fill('gap', 4);
    await screenshot(`${viewport.name}-deck-editor.png`);
    await click('a[href="#/project/deck/checks"]');
    assert.match(await text('.check-list'), /Exactly 4 in is not treated as satisfied/);
    await click('a[href="#/project/deck/strategies"]');
    await click('[data-strategy="independent"]');
    assert.equal(await evaluate(`document.querySelector('[data-strategy="independent"]').getAttribute('aria-pressed')`), 'true');
    await click('a[href="#/project/deck/packet"]');
    await click('[data-checklist="site"]');
    assert.match(await text('.packet-layout'), /1 of 5 marked gathered/);
    await click('[data-action="download"]');
    const deckFile = resolve(downloadPath, 'PermitPath-deck-discussion-packet.html');
    const deckReport = await readDownload(deckFile);
    assert.match(deckReport, /Freestanding deck/);
    assert.match(deckReport, /20 ft/);
    assert.match(deckReport, /\[Marked gathered\] Site sketch/);
    assert.match(deckReport, /Not submitted\. Not approved/);
    await rm(deckFile);
    const beforeTargets = (await cdp.send('Target.getTargets', {}, null)).targetInfos;
    await click('[data-action="print"]');
    await pause(150);
    const targets = (await cdp.send('Target.getTargets', {}, null)).targetInfos;
    const popup = targets.find(target => !beforeTargets.some(previous => previous.targetId === target.targetId) && target.type === 'page');
    assert.ok(popup, 'Print control opens a real new report window');
    const popupSession = (await cdp.send('Target.attachToTarget', { targetId: popup.targetId, flatten: true }, null)).sessionId;
    const printed = await cdp.send('Runtime.evaluate', { expression: 'document.body.innerText', returnByValue: true }, popupSession);
    assert.match(printed.result.value, /Discussion packet/);
    await cdp.send('Target.closeTarget', { targetId: popup.targetId }, null);
    await click('a[href="#/project/deck/plan"]');
    await fill('width', '');
    assert.equal(await evaluate(`document.querySelector('#field-width').getAttribute('aria-invalid')`), 'true');
    assert.equal(await evaluate(`document.querySelectorAll('#live-diagram svg').length`), 0);
    await click('a[href="#/project/deck/brief"]');
    assert.equal(await evaluate(`document.querySelectorAll('.sheet svg').length`), 0);
    await click('.back-link');
    assert.match(await text('.project-card'), /Concept needs dimensions/);
    await click('[aria-label="Open Backyard deck walkthrough"]');
    await click('a[href="#/project/deck/plan"]');
    await fill('width', 41);
    assert.match(await text('#error-width'), /4-40/);
    await fill('width', 4);
    assert.equal(await evaluate(`document.querySelectorAll('#live-diagram svg').length`), 1);

    await evaluate(`location.hash='#/project/bathroom/brief'`);
    await pause(50);
    assert.match(await text('h1'), /Basement bathroom/);
    assert.match(await text('.notice'), /Fairfax basement guidance/);
    await click('a[href="#/project/bathroom/checks"]');
    assert.match(await text('.check-summary > div'), /2/);
    await click('a[href="#/project/bathroom/plan"]');
    await fill('left', 15); await fill('front', 21); await fill('width', 9);
    assert.match(await evaluate(`document.querySelector('#live-diagram svg').getAttribute('aria-label')`), /9 by 10/);
    await click('a[href="#/project/bathroom/checks"]');
    assert.match(await text('.check-summary > div'), /0/);
    assert.match(await text('.check-list'), /No numerical airflow threshold is implemented/);
    await screenshot(`${viewport.name}-bathroom-checks.png`);
    await click('a[href="#/project/bathroom/plan"]');
    await fill('scope', 'cosmetic');
    await click('a[href="#/project/bathroom/checks"]');
    assert.match(await text('.check-list'), /Retained existing conditions are outside/);
    await evaluate(`{ const el=document.querySelector('#sample-switch'); el.value='deck'; el.dispatchEvent(new Event('change',{bubbles:true})); }`);
    await pause(50);
    assert.match(await text('h1'), /Backyard deck/);
    await evaluate(`{ const el=document.querySelector('#sample-switch'); el.value='bathroom'; el.dispatchEvent(new Event('change',{bubbles:true})); }`);
    await pause(50);
    await evaluate(`window.confirm=()=>true`);
    await click('[data-action="reset"]');
    assert.match(await text('.check-summary > div'), /2/);
    await click('a[href="#/project/bathroom/strategies"]');
    await click('[data-strategy="refresh"]');
    await click('a[href="#/project/bathroom/packet"]');
    await click('[data-action="download"]');
    const bathFile = resolve(downloadPath, 'PermitPath-bathroom-discussion-packet.html');
    const bathReport = await readDownload(bathFile);
    assert.match(bathReport, /Basement bathroom/);
    assert.match(bathReport, /Keep the existing layout/);
    await rm(bathFile);

    await evaluate(`location.hash='#/settings'`); await pause(50);
    await click('#remember');
    await evaluate(`location.hash='#/project/deck/plan'`); await pause(50);
    await fill('width', 22);
    await goto('/#/project/deck/plan');
    assert.equal(await evaluate(`document.querySelector('#field-width').value`), '22');
    await evaluate(`location.hash='#/settings'`); await pause(50);
    await evaluate(`window.confirm=()=>true`);
    await click('[data-action="reset-all"]');
    await evaluate(`location.hash='#/project/deck/plan'`); await pause(50);
    assert.equal(await evaluate(`document.querySelector('#field-width').value`), '16');
    await evaluate(`location.hash='#/settings'`); await pause(50);
    await click('#remember');
    assert.equal(await evaluate(`localStorage.getItem('permitpath-demo-v1')`), null);

    const paths = ['projects', 'library', 'team', 'plans', 'settings', 'help', ...['deck', 'bathroom'].flatMap(kind => ['brief', 'plan', 'checks', 'strategies', 'packet'].map(step => `project/${kind}/${step}`)), 'missing'];
    for (const base of ['/', '/PermitPath/']) {
      for (const path of paths) {
        await goto(`${base}#/${path}`);
        assert.ok(await text('h1'));
        assert.ok(await evaluate(`document.documentElement.scrollWidth <= window.innerWidth + 1`), `${viewport.name} ${base}${path} must not overflow`);
        assert.equal(await evaluate(`document.querySelectorAll('a[href="#"]').length`), 0);
      }
      await goto(`${base}#/project/deck/plan`);
      await fill('width', 18);
      assert.match(await evaluate(`document.querySelector('#live-diagram svg').getAttribute('aria-label')`), /18 by 12/);
      assert.match(await evaluate(`getComputedStyle(document.body).fontFamily`), /Segoe UI/);
    }
    await goto('/#/project/deck/packet');
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    assert.equal(await evaluate(`document.activeElement.classList.contains('skip-link')`), true);
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
    assert.equal(await evaluate('document.activeElement.id'), 'main');
    assert.equal(await evaluate('location.hash'), '#/project/deck/packet');
    await evaluate(`localStorage.setItem('permitpath-demo-v1','{broken')`);
    await goto('/#/projects');
    assert.match(await text('#storage-warning'), /corrupt or incompatible/);
    await evaluate(`localStorage.removeItem('permitpath-demo-v1')`);
    const blocked = await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: `Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError')}})` });
    await goto('/#/project/bathroom/plan');
    assert.match(await text('#storage-warning'), /storage is unavailable/);
    await fill('width', 12);
    assert.match(await evaluate(`document.querySelector('#live-diagram svg').getAttribute('aria-label')`), /12 by 10/);
    await cdp.send('Page.removeScriptToEvaluateOnNewDocument', { identifier: blocked.identifier });
    assert.deepEqual(errors, []);
  });
}
