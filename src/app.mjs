import { samples, fields, sources, strategies, checklist, evaluate, validateField, readState, persistState, createState, buildReport, disclaimer, reviewDate } from './model.mjs';
import { diagram } from './diagrams.mjs';

const $ = selector => document.querySelector(selector);
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const icons = {
  projects: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  library: '<path d="M4 4h7v16H4zm9 0h7v16h-7M7 8h1m8 0h1"/>',
  team: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-4a6 6 0 0 1 12 0v4m1-16a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v2"/>',
  plans: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18m-14 5h3"/>',
  settings: '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3"/><circle cx="16" cy="17" r="3"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 3h.01"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  file: '<path d="M14 3H5v18h14V8zm0 0v5h5M8 12h8m-8 4h6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  external: '<path d="M14 3h7v7m0-7L10 14m-1-9H3v16h16v-6"/>',
};
const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.file}</svg>`;
let storage;
let startupWarning = '';
try { storage = window.localStorage; } catch { startupWarning = 'Browser storage is unavailable. Changes will last only until this page is closed or reloaded.'; }
const loaded = readState(storage);
let state = loaded.state;
let storageWarning = startupWarning || loaded.warning;
let route;
const steps = [['brief', 'Project brief'], ['plan', 'Edit diagram'], ['checks', 'Scoped checks'], ['strategies', 'Compare options'], ['packet', 'Review packet']];
const statusLabel = { satisfied: 'Supported check satisfied', issue: 'Issue to resolve', review: 'Review needed' };

function announce(message) { $('#announcement').textContent = message; }
function save() {
  const result = persistState(storage, state);
  storageWarning = result.warning;
  const banner = $('#storage-warning');
  if (banner) { banner.textContent = storageWarning; banner.hidden = !storageWarning; }
}
function badge(status, short = false) {
  return `<span class="badge ${status}"><span aria-hidden="true">${status === 'satisfied' ? '&#10003;' : status === 'issue' ? '!' : '?'}</span>${short ? ({ satisfied: 'Satisfied', issue: 'Issue', review: 'Review' }[status]) : statusLabel[status]}</span>`;
}
function projectDrawing(kind, compact = false) {
  const inputs = state.projects[kind].inputs;
  return ['width', 'depth'].some(key => validateField(kind, key, inputs[key]))
    ? '<div class="drawing-empty"><h3>Concept needs dimensions</h3><p>Open the diagram editor to correct width and depth. No substitute dimensions are shown.</p></div>'
    : diagram(kind, inputs, compact);
}
function parseRoute() {
  const parts = location.hash.replace(/^#\/?/, '').split('/');
  if (!parts[0] || parts[0] === 'projects') return { page: 'projects' };
  if (parts[0] === 'project' && samples[parts[1]] && steps.some(([key]) => key === parts[2])) return { page: 'project', kind: parts[1], step: parts[2] };
  if (['library', 'team', 'plans', 'settings', 'help'].includes(parts[0]) && parts.length === 1) return { page: parts[0] };
  return { page: 'not-found' };
}
function go(hash) { if (location.hash === hash) render(); else location.hash = hash; }
function shell() {
  const nav = [['projects', 'Projects'], ['library', 'Code library'], ['team', 'Organization'], ['plans', 'Plans & licensing']];
  $('#app').innerHTML = `<div class="app-layout">
    <aside class="sidebar" aria-label="Application">
      <a class="brand" href="#/projects" aria-label="PermitPath projects"><img src="./assets/favicon.svg" width="36" height="36" alt="">Permit<span>Path</span></a>
      <div class="workspace-label"><span class="workspace-avatar">D</span><span>Demo workspace<small>Personal / local only</small></span></div>
      <nav aria-label="Main navigation">${nav.map(([key, name]) => `<a href="#/${key}" ${route.page === key || (key === 'projects' && route.page === 'project') ? 'aria-current="page"' : ''}>${icon(key)}<span>${name}</span></a>`).join('')}</nav>
      <div class="sidebar-bottom"><div class="demo-note"><span class="tiny-dot"></span> Interactive preview<p>Real interactions.<br>No application submitted.</p></div>
      <nav aria-label="Support navigation">${[['settings', 'Settings'], ['help', 'Help & scope']].map(([key, name]) => `<a href="#/${key}" ${route.page === key ? 'aria-current="page"' : ''}>${icon(key)}<span>${name}</span></a>`).join('')}</nav></div>
    </aside>
    <div class="workspace">
      <header class="topbar"><span>Workspace <span class="breadcrumb-separator">/</span> ${route.page === 'project' ? samples[route.kind].title : ({ projects: 'Projects', library: 'Code library', team: 'Organization', plans: 'Plans & licensing', settings: 'Settings', help: 'Help & scope' }[route.page] || 'Page not found')}</span><span class="topbar-meta"><span class="local-dot"></span> Local demo <span class="avatar" aria-label="Demo user">D</span></span></header>
      <div class="storage-warning" id="storage-warning" role="status" ${storageWarning ? '' : 'hidden'}>${escape(storageWarning)}</div>
      <main id="main" tabindex="-1"></main>
      <footer class="app-footer"><span>Built for a clearer next step.</span><span>Illustrative guidance, not permit approval. <a href="#/help">Scope & limitations</a></span></footer>
    </div></div>`;
}
function pageHeading(title, subtitle, action = '') {
  return `<div class="page-heading"><div><h1>${title}</h1><p>${subtitle}</p></div>${action}</div>`;
}
function dashboard() {
  return `${pageHeading('A better plan starts here.', 'Explore a project. Understand the questions before you build.', '<a class="button secondary" href="#/help">How this demo works ' + icon('arrow') + '</a>')}
    <div class="scope-ribbon"><span class="scope-mark">${icon('file')}</span><p><strong>Your Virginia residential workspace</strong><span>Two guided samples. Editable concepts. Source-linked checks.</span></p><a href="#/library">View scope ${icon('arrow')}</a></div>
    <section aria-labelledby="project-list-title"><div class="section-heading"><h2 id="project-list-title">Sample projects</h2><span>2 projects <span class="separator">/</span> Synthetic demonstration data</span></div>
    <div class="project-grid">${Object.entries(samples).map(([kind, sample]) => {
      const checks = evaluate(kind, state.projects[kind].inputs);
      const issueCount = checks.filter(c => c.status === 'issue').length;
      return `<article class="project-card"><a class="project-drawing" href="#/project/${kind}/brief" aria-label="Open ${sample.title} walkthrough">${projectDrawing(kind, true)}<span class="drawing-tag">${kind === 'deck' ? 'New construction' : 'Basement remodel'}</span></a>
        <div class="project-card-body"><div class="project-title-row"><h3><a href="#/project/${kind}/brief">${sample.title}</a></h3><span class="sample-tag">Sample</span></div><p>${sample.description}</p>
        <div class="project-facts"><span>Fairfax County, VA</span><span>${kind === 'deck' ? 'Single-family deck' : 'Bathroom remodel'}</span></div>
        <div class="project-card-footer"><span class="${issueCount ? 'issue-text' : 'muted'}">${issueCount ? `${issueCount} illustrative issue${issueCount === 1 ? '' : 's'}` : 'Ready to explore'}</span><a class="text-action" href="#/project/${kind}/brief">Open walkthrough ${icon('arrow')}</a></div></div></article>`;
    }).join('')}</div></section>
    <section class="journey-strip" aria-labelledby="journey-title"><div><h2 id="journey-title">From an idea to a useful conversation.</h2><p>Work through the questions that make your next meeting more productive.</p></div><ol><li><span>1</span>Define your brief</li><li><span>2</span>Explore & check</li><li><span>3</span>Prepare for review</li></ol></section>
    <p class="scope-footnote">${disclaimer} U.S. model-code context only; no Canadian or Mexican coverage.</p>`;
}
function projectNavigation() {
  const { kind, step } = route;
  const sample = samples[kind];
  return `<div class="project-heading"><div><a class="back-link" href="#/projects">&larr; All projects</a><h1>${sample.title} <span class="sample-tag">Guided sample</span></h1><p>Fairfax County, Virginia <span class="separator">/</span> Detached one-family home</p></div>
    <div class="project-actions"><label class="sr-only" for="sample-switch">Switch sample</label><select id="sample-switch"><option value="deck" ${kind === 'deck' ? 'selected' : ''}>Residential deck</option><option value="bathroom" ${kind === 'bathroom' ? 'selected' : ''}>Bathroom remodel</option></select><button class="button quiet" data-action="reset">Reset sample</button></div></div>
    <nav class="step-nav" aria-label="Project walkthrough">${steps.map(([key, label], i) => `<a href="#/project/${kind}/${key}" ${step === key ? 'aria-current="step"' : ''}><span>${i + 1}</span>${label}</a>`).join('')}</nav><div id="project-content"></div>`;
}
function nextStep(label, step) { return `<a class="button primary" href="#/project/${route.kind}/${step}">${label} ${icon('arrow')}</a>`; }
function brief() {
  const { kind } = route;
  const sample = samples[kind];
  return `<div class="two-column brief-layout"><section><h2>Start with the right questions.</h2><p class="lead">${sample.brief}</p>
    <div class="brief-facts"><div><span>Property</span><strong>Illustrative detached home</strong></div><div><span>Jurisdiction</span><strong>Fairfax County, VA</strong></div><div><span>Code basis</span><strong>2021 Virginia code family</strong></div></div>
    <h3>What you'll explore</h3><ul class="plain-list">${sample.goals.map(goal => `<li>${icon('check')}<span>${goal}</span></li>`).join('')}</ul>
    <div class="notice"><strong>${kind === 'deck' ? 'A supported sample, not a certified deck' : 'A remodel needs more than a floor plan'}</strong><p>${kind === 'deck' ? 'The seeded dimensions satisfy only the implemented illustrative guard checks. Structure, foundations, attachment, site conditions, stairs, zoning and final approval still need review.' : 'The sample starts with moving plumbing and two entered clearance issues. Layout checks use Fairfax basement guidance, not a universal remodel rule. Cosmetic scope does not clear electrical, wet-area or existing-condition risks.'}</p></div>
    <div class="section-actions">${nextStep('Edit the concept', 'plan')}</div></section>
    <aside class="sheet"><div class="sheet-heading"><span>Concept drawing</span><span>${kind === 'deck' ? 'D-01' : 'B-01'}</span></div>${projectDrawing(kind)}<div class="sheet-caption"><strong>${sample.title}</strong><span>Not a survey. Not construction documents.</span></div></aside></div>`;
}
function fieldMarkup(kind, key, spec) {
  const value = state.projects[kind].inputs[key];
  const error = validateField(kind, key, value);
  return `<div class="field"><label for="field-${key}">${spec.label}${spec.unit ? ` <span>(${spec.unit})</span>` : ''}</label>
    ${spec.options ? `<select id="field-${key}" name="${key}" aria-describedby="hint-${key} error-${key}">${spec.options.map(([val, label]) => `<option value="${val}" ${String(value) === val ? 'selected' : ''}>${label}</option>`).join('')}</select>`
      : `<input id="field-${key}" name="${key}" type="number" inputmode="decimal" min="${spec.min}" max="${spec.max}" step="${spec.step || 'any'}" value="${escape(value)}" aria-invalid="${Boolean(error)}" aria-describedby="hint-${key} error-${key}">`}
    <small id="hint-${key}">${spec.hint || ''}</small><span class="field-error" id="error-${key}" ${error ? '' : 'hidden'}>${error || ''}</span></div>`;
}
function plan() {
  const { kind } = route;
  return `<div class="section-intro"><div><h2>Make the idea your own.</h2><p>Change an input to update the concept and scoped checks. Dimensions are in U.S. customary units.</p></div>${nextStep('Review scoped checks', 'checks')}</div>
    <div class="editor-layout"><section class="input-panel" aria-label="Project inputs"><form id="project-form" novalidate><h3>Project details</h3><div class="field-grid">${Object.entries(fields[kind]).map(([key, spec]) => fieldMarkup(kind, key, spec)).join('')}</div></form><p class="local-save-note" id="save-note">${state.remember ? 'Saved in this browser only.' : 'Session only. Reloading resets changes.'}</p></section>
    <section class="drawing-panel"><div class="sheet-heading"><span>Live concept / plan view</span><span>${kind === 'deck' ? 'D-01' : 'B-01'}</span></div><div id="live-diagram"></div><div class="drawing-legend"><span><i class="legend-line"></i>${kind === 'deck' ? 'Guard outline' : 'Existing wall'}</span><span><i class="legend-square"></i>${kind === 'deck' ? 'Symbolic support' : 'Illustrative fixture'}</span></div><p class="drawing-disclaimer">${kind === 'deck' ? 'Board lines and posts are symbolic, not engineered spacing. Height and guards are checked separately; stairs are not drawn.' : 'Only the room outline responds to dimensions. Fixture positions are illustrative; entered clearances are not measured from this drawing.'} *North is illustrative.</p><div id="live-summary"></div></section></div>`;
}
function updateLive() {
  const { kind } = route;
  const inputs = state.projects[kind].inputs;
  const invalidGeometry = ['width', 'depth'].some(key => validateField(kind, key, inputs[key]));
  $('#live-diagram').innerHTML = invalidGeometry ? '<div class="drawing-empty"><h3>Set valid room dimensions</h3><p>The concept is paused until width and depth are within the demo range. No default dimensions have been substituted.</p></div>' : diagram(kind, inputs);
  const result = evaluate(kind, inputs);
  const issue = result.filter(c => c.status === 'issue').length;
  const satisfied = result.filter(c => c.status === 'satisfied').length;
  const review = result.filter(c => c.status === 'review').length;
  $('#live-summary').innerHTML = `<div class="mini-summary"><strong>What your inputs tell us</strong><div>${badge('satisfied', true)} <b>${satisfied}</b> ${badge('issue', true)} <b>${issue}</b> ${badge('review', true)} <b>${review}</b></div><a href="#/project/${kind}/checks">See the evidence ${icon('arrow')}</a></div>`;
}
function sourceLinks(ids) {
  return ids.map(id => {
    const source = sources.find(item => item.id === id);
    return `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.short} ${icon('external')}<span class="sr-only"> (opens in a new tab)</span></a>`;
  }).join(' ');
}
function checks() {
  const result = evaluate(route.kind, state.projects[route.kind].inputs);
  return `<div class="section-intro"><div><h2>Understand what needs attention.</h2><p>Deterministic screening, not a complete code review. No AI or agency decision is involved.</p></div>${nextStep('Compare approaches', 'strategies')}</div>
    <div class="check-summary">${['issue', 'satisfied', 'review'].map(status => `<div><strong>${result.filter(c => c.status === status).length}</strong><span>${statusLabel[status]}</span></div>`).join('')}</div>
    <div class="notice"><strong>No overall compliance score</strong><p>Unknowns stay open. A satisfied item means only that the entered value meets the specific illustrated rule. Review conditions may change applicability.</p></div>
    <section class="check-list" aria-label="Scoped check results">${result.map(check => `<article class="check-row"><div class="check-status">${badge(check.status)}</div><div><h3>${check.title}</h3><p>${escape(check.detail)}</p><div class="check-source">${sourceLinks(check.sources)}</div></div></article>`).join('')}</section>
    <div class="section-actions"><a class="button secondary" href="#/project/${route.kind}/plan">Adjust project inputs</a><span class="muted">Source review: ${reviewDate}. <a href="#/library">Edition & source notes</a></span></div>`;
}
function strategyPage() {
  const { kind } = route;
  const selected = state.projects[kind].strategy;
  return `<div class="section-intro"><div><h2>Choose a path, not a shortcut.</h2><p>Compare the trade-offs before discussing scope with your contractor and local reviewer.</p></div>${nextStep('Prepare review packet', 'packet')}</div>
    <p class="notice compact-notice">Cost bands and durations below are synthetic planning examples, not quotes or permit-processing estimates. Selection adds a discussion option to your packet; it does not change inputs or resolve checks.</p>
    <div class="strategy-grid">${strategies[kind].map((strategy, i) => `<article class="strategy ${selected === strategy.id ? 'selected' : ''}"><div class="strategy-top"><span>Approach ${i + 1}</span>${selected === strategy.id ? '<span class="badge satisfied">Selected for packet</span>' : ''}</div><h3>${strategy.title}</h3><p>${strategy.description}</p><dl><div><dt>Illustrative construction cost</dt><dd>${strategy.cost}</dd></div><div><dt>Illustrative on-site time</dt><dd>${strategy.time}</dd></div><div><dt>Primary trade-off</dt><dd>${strategy.tradeoff}</dd></div></dl><h4>Questions to take forward</h4><ul>${strategy.questions.map(q => `<li>${q}</li>`).join('')}</ul><button class="button ${selected === strategy.id ? 'secondary' : 'primary'}" data-strategy="${strategy.id}" aria-pressed="${selected === strategy.id}">${selected === strategy.id ? 'Selected for packet' : 'Select this approach'} ${icon('check')}</button></article>`).join('')}</div>`;
}
function packet() {
  const { kind } = route;
  const project = state.projects[kind];
  const option = strategies[kind].find(item => item.id === project.strategy);
  const result = evaluate(kind, project.inputs);
  const completed = checklist[kind].filter(item => project.checklist[item.id]).length;
  return `<div class="section-intro"><div><h2>A useful packet. A clearer conversation.</h2><p>Gather what a designer, contractor or local reviewer will need next.</p></div><div class="button-group"><button class="button secondary" data-action="print">${icon('file')} Print / save PDF</button><button class="button primary" data-action="download">${icon('file')} Download report</button></div></div>
    <div class="packet-layout"><section><div class="section-heading"><h3>Preparation checklist</h3><span>${completed} of ${checklist[kind].length} marked gathered</span></div><p class="muted">Self-reported preparation only. Checking a box does not upload, verify, or approve a document.</p><div class="checklist">${checklist[kind].map(item => `<label><input type="checkbox" data-checklist="${item.id}" ${project.checklist[item.id] ? 'checked' : ''}><span><strong>${item.title}</strong><small>${item.detail}</small></span></label>`).join('')}</div></section>
    <aside class="packet-summary"><h3>Your discussion packet</h3><dl><div><dt>Project</dt><dd>${samples[kind].title}</dd></div><div><dt>Preferred discussion option</dt><dd>${option ? option.title : 'Not selected yet'}</dd></div><div><dt>Current screening</dt><dd>${result.filter(c => c.status === 'issue').length} issues / ${result.filter(c => c.status === 'review').length} review items</dd></div><div><dt>Export includes</dt><dd>Inputs, schematic, all check results, references, chosen option and preparation checklist</dd></div></dl><p>The HTML report opens offline and can be printed to PDF. It is a preparation record, not a permit application or construction drawing.</p><a href="#/project/${kind}/strategies">Change discussion option ${icon('arrow')}</a></aside></div>
    <div class="notice"><strong>Nothing is submitted</strong><p>There is no agency connection or approval workflow in this demo. Confirm current requirements directly with <a href="https://www.fairfaxcounty.gov/landdevelopment/" target="_blank" rel="noopener noreferrer">Fairfax County Land Development Services (opens in a new tab)</a> before applying.</p></div>`;
}
function library() {
  return `${pageHeading('Know the source. Know the limits.', 'A small, traceable reference set for the two Virginia residential samples.')}
    <div class="scope-ribbon"><p><strong>2021 Virginia code family</strong><span>Effective January 18, 2024; transition ended January 17, 2025. Sources reviewed ${reviewDate}.</span></p></div>
    <div class="two-column library-intro"><div><h2>Virginia is the implemented scope.</h2><p>Virginia adopts and amends model codes through the Uniform Statewide Building Code (USBC). Residential construction, work on existing buildings and individual trades can invoke different provisions. A locality determines applicable requirements for the actual project.</p></div><div><h3>Not a North American code engine</h3><p>U.S. model codes are context, not blanket jurisdictional coverage. Canada and Mexico have different systems and are not implemented. Fairfax guidance is not automatically transferable to other Virginia localities.</p></div></div>
    <section class="source-list" aria-label="Authoritative references">${sources.map(source => `<article><div><span class="sample-tag">${source.scope}</span><h2><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.title} ${icon('external')}<span class="sr-only"> (opens in a new tab)</span></a></h2><p>${source.note}</p><small>${source.publisher} <span class="separator">/</span> ${source.edition} <span class="separator">/</span> Reviewed ${reviewDate}</small></div><span class="source-code">${source.short}</span></article>`).join('')}</section>
    <div class="notice"><strong>Reference, not reproduction</strong><p>PermitPath uses short original paraphrases and links to lawful public sources, not copied code tables. The library is not exhaustive and is not automatically monitored for changes. Reconfirm editions and applicability with the AHJ before using an exported packet.</p></div>`;
}
function plansPage() {
  const tiers = [
    ['Home', '$29', '/ month', '1 editor', '1 project', 'For a homeowner working through one project.'],
    ['Pro', '$149', '/ month', '1 editor', '10 projects', 'For independent builders and designers.'],
    ['Team', '$499', '/ month', '5 editors', '50 projects', 'For a practice coordinating multiple projects.'],
    ['Agency', 'From $18,000', '/ year', 'Scoping required', 'Scoping required', 'For public-sector review organizations.'],
  ];
  return `${pageHeading('A plan for each kind of builder.', 'Hypothetical pricing from the product concept. No purchase or subscription is available.')}
    <div class="notice"><strong>Plans & licensing preview</strong><p>This local demonstration does not enforce plan limits, create accounts, collect payment details or establish a software license. Your two samples are available regardless of the tier below.</p></div>
    <div class="pricing-grid">${tiers.map(([name, price, period, editors, projects, text]) => `<section class="price-plan"><h2>${name}</h2><div class="price">${price}<small>${period}</small></div><p>${text}</p><ul><li>${editors}</li><li>${projects}</li></ul><span class="sample-tag">Concept pricing only</span></section>`).join('')}</div>
    <section class="help-section"><h2>What a production license would need to cover</h2><p>Jurisdiction coverage, permitted users, data retention, professional-use limitations, support terms and source-content licensing would be agreed separately. None is promised by this prototype.</p><a class="button secondary" href="#/projects">Return to sample projects ${icon('arrow')}</a></section>`;
}
function teamPage() {
  return `${pageHeading('Keep the right people in the loop.', 'Organization preview / illustrative roles, not real members.')}
    <div class="notice"><strong>Collaboration is not connected</strong><p>No invitations, authentication, shared storage or agency access exist in this demo. Project edits stay in this browser. Export a packet locally for your own review instead.</p></div>
    <section class="role-table"><h2>A possible review team</h2><div class="table-scroll"><table><thead><tr><th scope="col">Role</th><th scope="col">Useful responsibility</th><th scope="col">Demo status</th></tr></thead><tbody><tr><th scope="row">Homeowner / editor</th><td>Define goals, document conditions, compare approaches</td><td>Local sample editing</td></tr><tr><th scope="row">Builder or design professional</th><td>Verify measurements, structure and trade coordination</td><td>Placeholder / not invited</td></tr><tr><th scope="row">Local reviewer (AHJ)</th><td>Determine requirements, review submissions and inspect</td><td>Placeholder / no connection</td></tr></tbody></table></div></section>
    <section class="help-section"><h2>Prepare for collaboration today</h2><p>Use the review packet checklist to organize drawings, site information and unresolved questions. No personal addresses or contact information are required.</p><a class="button primary" href="#/project/deck/packet">Open deck review packet ${icon('arrow')}</a></section>`;
}
function settings() {
  return `${pageHeading('Your browser. Your workspace.', 'The demonstration has no account, cloud storage, telemetry or upload service.')}
    <section class="settings-section"><div><h2>Remember sample edits</h2><p>Store dimensions, option selections and checklist state in this browser's localStorage. Do not enter confidential project information on a shared device. Downloads remain wherever you save them.</p></div><label class="check-control"><input type="checkbox" id="remember" ${state.remember ? 'checked' : ''}> Remember edits on this device</label></section>
    <section class="settings-section"><div><h2>Project defaults</h2><p>Jurisdiction: Fairfax County, Virginia. Units: feet and inches (U.S. customary). Other localities, metric units and international coverage are not implemented.</p></div><span class="sample-tag">Fixed demo scope</span></section>
    <section class="settings-section"><div><h2>Start fresh</h2><p>Restore both sample inputs, options and checklists. This changes only this demo's data; it does not delete downloaded reports. Storage preference stays unchanged.</p></div><button class="button secondary" data-action="reset-all">Reset both samples</button></section>
    <section class="help-section"><h2>Data handling</h2><p>Turning off remembering removes PermitPath's saved state from this browser while keeping current edits until the page reloads. External reference links leave this app; those sites have their own privacy policies. GitHub Pages or your hosting provider may maintain ordinary access logs.</p></section>`;
}
function help() {
  return `${pageHeading('A guide, not a green light.', 'Use PermitPath to prepare questions, not to replace the people who answer them.')}
    <div class="help-layout"><section><h2>The five-step walkthrough</h2><ol class="help-steps"><li><strong>Read the brief.</strong> Understand the fictional project and its limits.</li><li><strong>Edit the concept.</strong> Adjust dimensions and choices. The SVG responds to room or deck size.</li><li><strong>Read scoped checks.</strong> Separate issues, supported conditions and unresolved review items.</li><li><strong>Compare approaches.</strong> Choose a discussion option without silently changing your design.</li><li><strong>Prepare a packet.</strong> Mark materials gathered and export a local HTML report or print view.</li></ol>
    <h2>What the statuses mean</h2><dl class="status-help">${Object.entries(statusLabel).map(([status, label]) => `<div><dt>${badge(status)}</dt><dd>${status === 'satisfied' ? 'Your entered value satisfies one implemented, conditional illustration. It is not a full compliance finding.' : status === 'issue' ? 'An entered value is invalid or does not meet the illustrated rule. Correct it and verify applicability.' : 'Information, engineering, trade review or an AHJ decision remains necessary. This is never counted as satisfied.'}</dd></div>`).join('')}</dl></section>
    <aside class="help-aside"><h2>Always involve the right expert.</h2><p>${disclaimer}</p><p>Use qualified licensed professionals where required. Never build from these schematic drawings.</p><a href="#/library">Read sources & scope ${icon('arrow')}</a></aside></div>
    <section class="faq"><h2>Common questions</h2><details><summary>Does this app use AI or verify my property?</summary><p>No. Both projects are synthetic. Checks use small deterministic rules. There is no property lookup, image generation service or code-review AI.</p></details><details><summary>Is my deck compliant if the supported checks are satisfied?</summary><p>No. Structural loads, footings and soil, attachment and flashing, stairs and handrails, site setbacks, zoning and many other requirements remain outside the calculator. Even implemented checks depend on accurate measurements and applicable conditions.</p></details><details><summary>Is cosmetic bathroom work permit-exempt?</summary><p>Some limited ordinary repairs may be exempt, but moving fixtures, altering systems or uncovering unsafe conditions changes the analysis. Your AHJ determines building and trade permits; this demo never awards an exemption.</p></details><details><summary>What do I send to the county?</summary><p>This export is for preparation and discussion, not a completed application. Ask the locality for its current submission checklist, forms, drawing requirements and trade permits.</p></details><details><summary>Can I invite people or change jurisdictions?</summary><p>Not in this MVP. Organization and plans pages describe the product concept and are explicitly unconnected previews. Only the two Virginia samples are implemented.</p></details></section>`;
}
function render(focus = true) {
  route = parseRoute();
  shell();
  $('#main').innerHTML = route.page === 'project' ? projectNavigation() : ({ projects: dashboard, library, team: teamPage, plans: plansPage, settings, help }[route.page]?.() || `${pageHeading('That destination is not in this demo.', 'Choose a working destination from the navigation.')}<a class="button primary" href="#/projects">Back to projects</a>`);
  if (route.page === 'project') {
    $('#project-content').innerHTML = ({ brief, plan, checks, strategies: strategyPage, packet }[route.step])();
    if (route.step === 'plan') updateLive();
  }
  document.title = `${route.page === 'project' ? `${samples[route.kind].title} - ${steps.find(([key]) => key === route.step)[1]}` : ({ projects: 'Projects', library: 'Code library', plans: 'Plans & licensing', team: 'Organization', settings: 'Settings', help: 'Help & scope' }[route.page] || 'Not found')} | PermitPath`;
  if (focus) { $('#main').focus({ preventScroll: true }); window.scrollTo(0, 0); }
}
function reportHTML() {
  const { kind } = route;
  return buildReport(kind, state.projects[kind], diagram(kind, state.projects[kind].inputs));
}
document.addEventListener('input', event => {
  const input = event.target;
  if (!input.matches('#project-form input, #project-form select')) return;
  const { kind } = route;
  state.projects[kind].inputs[input.name] = input.value;
  const error = validateField(kind, input.name, input.value);
  input.setAttribute('aria-invalid', Boolean(error));
  const errorEl = $(`#error-${input.name}`);
  errorEl.hidden = !error;
  errorEl.textContent = error || '';
  save();
  updateLive();
  $('#save-note').textContent = storageWarning || (state.remember ? 'Changes saved in this browser only.' : 'Changes updated for this session only.');
});
document.addEventListener('submit', event => { if (event.target.id === 'project-form') event.preventDefault(); });
document.addEventListener('change', event => {
  const input = event.target;
  if (input.id === 'sample-switch') go(`#/project/${input.value}/${route.step}`);
  if (input.id === 'remember') {
    state.remember = input.checked;
    save();
    announce(storageWarning || (state.remember ? 'Sample edits will be remembered on this device.' : 'Saved sample data removed. Current edits remain for this session.'));
  }
  if (input.dataset.checklist) {
    state.projects[route.kind].checklist[input.dataset.checklist] = input.checked;
    save();
    const count = checklist[route.kind].filter(item => state.projects[route.kind].checklist[item.id]).length;
    $('.packet-layout .section-heading span').textContent = `${count} of ${checklist[route.kind].length} marked gathered`;
    announce(`${count} preparation items marked gathered. Documents have not been verified.`);
  }
});
document.addEventListener('click', event => {
  if (event.target.closest('.skip-link')) {
    event.preventDefault();
    $('#main').focus();
    return;
  }
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.strategy) {
    state.projects[route.kind].strategy = button.dataset.strategy;
    save();
    render(false);
    $(`[data-strategy="${button.dataset.strategy}"]`).focus();
    announce('Discussion option selected. Project inputs and checks are unchanged.');
  }
  if (button.dataset.action === 'reset' || button.dataset.action === 'reset-all') {
    const all = button.dataset.action === 'reset-all';
    if (!window.confirm(all ? 'Restore both samples? This replaces their inputs, options and checklist progress in this browser.' : `Restore the ${samples[route.kind].title} sample? Your edits and checklist progress for this sample will be replaced.`)) return;
    const fresh = createState();
    if (all) state.projects = fresh.projects;
    else state.projects[route.kind] = fresh.projects[route.kind];
    save(); render(false); announce(all ? 'Both samples restored.' : 'Sample restored.');
  }
  if (button.dataset.action === 'download') {
    const url = URL.createObjectURL(new Blob([reportHTML()], { type: 'text/html;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = `PermitPath-${route.kind}-discussion-packet.html`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    announce('Discussion packet downloaded. Nothing was submitted.');
  }
  if (button.dataset.action === 'print') {
    const preview = window.open('', '_blank');
    if (!preview) { announce('Print view was blocked. Allow popups for this page or download the HTML report and print it.'); button.insertAdjacentHTML('afterend', '<p role="alert">Print view blocked. Allow popups, or download the report and print it.</p>'); return; }
    preview.document.write(reportHTML());
    preview.document.close();
    preview.addEventListener('load', () => preview.print(), { once: true });
  }
});
window.addEventListener('hashchange', () => render());
render(false);
