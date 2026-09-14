import test from 'node:test';
import assert from 'node:assert/strict';
import { samples, evaluate, validateField, createState, readState, persistState, storageKey, sources, buildReport, fields } from '../src/model.mjs';
import { diagram } from '../src/diagrams.mjs';

const inputs = kind => ({ ...samples[kind].defaults });
const check = (kind, values, id) => evaluate(kind, { ...inputs(kind), ...values }).find(item => item.id === id);
function memory() {
  const data = new Map();
  return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) };
}
test('seeded deck satisfies exactly three implemented guard screens, never overall compliance', () => {
  const result = evaluate('deck', inputs('deck'));
  assert.equal(result.filter(c => c.status === 'issue').length, 0);
  assert.equal(result.filter(c => c.status === 'satisfied').length, 3);
  assert.equal(result.filter(c => c.status === 'review').length, 3);
});
test('guard drop trigger is strictly greater than 30, not greater than or equal', () => {
  assert.equal(check('deck', { drop: 30, guard: 'no' }, 'guard-presence').status, 'review');
  assert.equal(check('deck', { drop: 30.01, guard: 'no' }, 'guard-presence').status, 'issue');
  assert.equal(check('deck', { drop: 29.99, guard: 'no' }, 'guard-presence').status, 'review');
  assert.equal(check('deck', { drop: '', guard: 'yes' }, 'guard-presence').status, 'review');
  assert.equal(check('deck', { guard: 'unknown' }, 'guard-presence').status, 'review');
});
test('guard height boundary also applies to voluntarily provided guards', () => {
  assert.equal(check('deck', { guardHeight: 35.99 }, 'guard-height').status, 'issue');
  assert.equal(check('deck', { guardHeight: 36 }, 'guard-height').status, 'satisfied');
  assert.equal(check('deck', { drop: 10, guardHeight: 35 }, 'guard-height').status, 'issue');
  assert.equal(check('deck', { guard: 'no' }, 'guard-height').status, 'review');
});
test('guard gap is conservative at equality and unknown geometry', () => {
  assert.equal(check('deck', { gap: 3.99 }, 'guard-opening').status, 'satisfied');
  assert.equal(check('deck', { gap: 4 }, 'guard-opening').status, 'review');
  assert.equal(check('deck', { gap: 4.01 }, 'guard-opening').status, 'issue');
  assert.equal(check('deck', { gap: 2, opening: 'unknown' }, 'guard-opening').status, 'review');
  assert.equal(check('deck', { gap: -1 }, 'guard-opening').status, 'review');
});
test('seeded bathroom has two clearance issues and no airflow pass', () => {
  const result = evaluate('bathroom', inputs('bathroom'));
  assert.deepEqual(result.filter(c => c.status === 'issue').map(c => c.id), ['toilet-side', 'toilet-front']);
  assert.equal(result.find(c => c.id === 'airflow').status, 'review');
});
test('bathroom clearance exact thresholds and each side are checked', () => {
  assert.equal(check('bathroom', { left: 15, right: 15 }, 'toilet-side').status, 'satisfied');
  assert.equal(check('bathroom', { left: 15, right: 14.99 }, 'toilet-side').status, 'issue');
  assert.equal(check('bathroom', { left: '', right: 15 }, 'toilet-side').status, 'review');
  assert.equal(check('bathroom', { front: 21 }, 'toilet-front').status, 'satisfied');
  assert.equal(check('bathroom', { front: 20.99 }, 'toilet-front').status, 'issue');
  assert.equal(check('bathroom', { showerFront: 24 }, 'shower-entry').status, 'satisfied');
  assert.equal(check('bathroom', { showerFront: 23.99 }, 'shower-entry').status, 'issue');
  assert.equal(check('bathroom', { shower: 'no' }, 'shower-entry').status, 'review');
});
test('cosmetic scope routes retained geometry to existing-building review, not automatic clearance', () => {
  for (const id of ['toilet-side', 'toilet-front', 'shower-entry', 'permits']) assert.equal(check('bathroom', { scope: 'cosmetic' }, id).status, 'review');
});
test('ventilation distinguishes outdoor route from complete mechanical compliance', () => {
  assert.equal(check('bathroom', { exhaust: 'outdoors' }, 'exhaust').status, 'satisfied');
  assert.equal(check('bathroom', { exhaust: 'interior' }, 'exhaust').status, 'issue');
  for (const exhaust of ['unknown', 'window']) assert.equal(check('bathroom', { exhaust }, 'exhaust').status, 'review');
  for (const airflow of [1, 20, 49, 50, 300]) assert.equal(check('bathroom', { airflow }, 'airflow').status, 'review');
});
test('input validation rejects empty, non-finite, bool, out-of-range and unknown enum values', () => {
  for (const value of ['', ' ', [], null, undefined, NaN, Infinity, -1, 41, 'oops', true]) assert.ok(validateField('deck', 'width', value));
  for (const value of [4, 40, '16.5']) assert.equal(validateField('deck', 'width', value), '');
  assert.ok(validateField('deck', 'guard', 'maybe'));
  assert.equal(check('deck', { guardHeight: '' }, 'guard-height').status, 'review');
  assert.equal(evaluate('deck', { ...inputs('deck'), width: '' })[0].id, 'inputs');
  for (const kind of Object.keys(samples)) for (const key of Object.keys(fields[kind])) assert.equal(validateField(kind, key, samples[kind].defaults[key]), '');
});
test('state is opt-in and round trips both projects, option selections and checklists', () => {
  const storage = memory();
  const state = createState();
  assert.equal(state.remember, false);
  state.projects.deck.inputs.width = '20';
  persistState(storage, state);
  assert.equal(storage.getItem(storageKey), null);
  state.remember = true;
  state.projects.bathroom.inputs.left = '15';
  state.projects.deck.strategy = 'independent';
  state.projects.deck.checklist.site = true;
  assert.equal(persistState(storage, state).warning, '');
  assert.deepEqual(readState(storage).state, state);
  state.remember = false;
  persistState(storage, state);
  assert.equal(storage.getItem(storageKey), null);
});
test('invalid numeric edits persist honestly without getting replaced by safe-looking defaults', () => {
  const storage = memory();
  const state = createState();
  state.remember = true;
  state.projects.deck.inputs.guardHeight = '';
  state.projects.deck.inputs.width = '-1';
  persistState(storage, state);
  const restored = readState(storage).state;
  assert.equal(restored.projects.deck.inputs.width, '-1');
  assert.equal(restored.projects.deck.inputs.guardHeight, '');
  assert.equal(evaluate('deck', restored.projects.deck.inputs).find(c => c.id === 'guard-height').status, 'review');
});
test('corrupt, stale and malicious storage produces explicit warning and clean defaults', () => {
  const storage = memory();
  for (const raw of ['broken', 'null', '{"version":4}', '{"version":1,"remember":true,"projects":{}}']) {
    storage.setItem(storageKey, raw);
    assert.ok(readState(storage).warning);
    assert.deepEqual(readState(storage).state, createState());
  }
  const state = createState();
  state.remember = true;
  state.projects.deck.inputs.width = '<img src=x onerror=alert(1)>';
  storage.setItem(storageKey, JSON.stringify(state));
  assert.ok(readState(storage).warning);
});
test('unavailable storage, quota errors and removal errors are surfaced', () => {
  assert.ok(readState(undefined).warning);
  const failing = { getItem() { throw new Error('denied'); }, setItem() { throw new Error('quota'); }, removeItem() { throw new Error('denied'); } };
  assert.match(readState(failing).warning, /could not be read/);
  const state = createState();
  assert.match(persistState(failing, state).warning, /could not be removed/);
  state.remember = true;
  assert.match(persistState(failing, state).warning, /could not be saved/);
});
test('both reports include inputs, every check, option, checklist, diagram and dated official references', () => {
  for (const kind of Object.keys(samples)) {
    const project = createState().projects[kind];
    const report = buildReport(kind, project, diagram(kind, project.inputs), new Date('2026-09-14T00:00:00Z'));
    assert.match(report, /Not submitted\. Not approved\. Not for construction/);
    assert.match(report, /<svg/);
    assert.match(report, /2026-09-14T00:00:00.000Z/);
    assert.match(report, /September 13, 2026/);
    assert.match(report, /No option selected/);
    for (const item of evaluate(kind, project.inputs)) assert.ok(report.includes(item.title));
    for (const source of sources) assert.ok(report.includes(source.url));
  }
});
test('report escapes untrusted values and omits invalid drawing rather than fabricating dimensions', () => {
  const project = createState().projects.deck;
  project.inputs.width = '<script>alert(1)</script>';
  const report = buildReport('deck', project, '<svg></svg>');
  assert.ok(!report.includes('<script>alert'));
  assert.match(report, /&lt;script&gt;/);
  assert.match(report, /Diagram omitted/);
  assert.ok(!report.includes('<svg>'));
});
test('all rule sources resolve and keep official jurisdiction metadata', () => {
  for (const kind of Object.keys(samples)) for (const c of evaluate(kind, inputs(kind))) {
    assert.ok(c.sources.length > 0);
    assert.ok(c.sources.every(id => sources.some(source => source.id === id && source.scope)));
  }
  assert.equal(new Set(sources.map(source => source.id)).size, sources.length);
  assert.ok(sources.every(source => new URL(source.url).hostname.endsWith('.virginia.gov') || new URL(source.url).hostname === 'www.fairfaxcounty.gov'));
});
