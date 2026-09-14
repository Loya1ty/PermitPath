export const reviewDate = 'September 13, 2026';
export const storageKey = 'permitpath-demo-v1';
export const disclaimer = 'PermitPath is an illustrative planning aid, not a complete code review, professional design, or guarantee of permit approval. Confirm requirements with qualified professionals and the authority having jurisdiction (AHJ).';

export const sources = [
  { id: 'dhcd', short: 'DHCD / editions', title: 'Virginia codes and adopted editions', url: 'https://www.dhcd.virginia.gov/codes', publisher: 'Virginia DHCD', scope: 'Virginia statewide', edition: '2021 codes; effective Jan. 18, 2024', note: 'DHCD identifies the 2021 Virginia code family, incorporating Virginia amendments, and the 2020 National Electrical Code. The reviewed official baseline is 2021; confirm the edition applicable to the actual permit.' },
  { id: 'usbc', short: '13VAC5-63-10', title: 'Virginia Construction Code incorporation and precedence', url: 'https://law.lis.virginia.gov/admincode/title13/agency5/chapter63/section10/', publisher: 'Virginia Administrative Code', scope: 'Virginia statewide', edition: '2021 USBC; latest listed change Jan. 18, 2024', note: 'Section 101 identifies the 2021 USBC and model-code incorporation. Virginia amendments have precedence; an unamended model code alone is not the applicable Virginia code.' },
  { id: 'county-edition', short: 'Fairfax / editions', title: 'Fairfax codes and standards', url: 'https://www.fairfaxcounty.gov/landdevelopment/codes-and-standards', publisher: 'Fairfax County LDS', scope: 'Local implementation', edition: '2021 technical provisions required Jan. 18, 2025', note: 'The technical transition ran Jan. 18, 2024 through Jan. 17, 2025. The county states all applications and plans beginning Jan. 18, 2025 must follow the 2021 USBC.' },
  { id: 'cycle', short: 'DHCD / rulemaking', title: '2024 code development cycle', url: 'https://www.dhcd.virginia.gov/2024-code-development-cycle', publisher: 'Virginia DHCD', scope: 'Rulemaking, not adopted rules', edition: 'April 30, 2026 memorandum describes proposed regulations', note: 'A development-cycle label is not an effective date. No replacement effective-date notice was verified in this research. This reference set is not continuous regulatory monitoring; reconfirm current status with DHCD and the AHJ.' },
  { id: 'deck', short: 'Deck details / pp. 21-22', title: 'Fairfax Typical Deck Details', url: 'https://www.fairfaxcounty.gov/landdevelopment/sites/landdevelopment/files/assets/documents/pdf/publications/deck-details.pdf', publisher: 'Fairfax County LDS', scope: 'Single-level residential decks', edition: 'Version 2021.0, Jan. 5, 2024', note: 'Based on the 2021 Virginia Residential Code. Guard guidance on pages 21-22 supports a greater-than-30-inch drop trigger, 36-inch minimum level-deck guard height, and exclusion of a 4-inch sphere. Voluntary guards must also comply. These details are a conditional prescriptive pathway, not engineered design.' },
  { id: 'basement', short: 'Basement details / pp. 3, 9', title: 'Fairfax Typical Finished Basement Details', url: 'https://www.fairfaxcounty.gov/landdevelopment/sites/landdevelopment/files/assets/documents/pdf/publications/basement-details.pdf', publisher: 'Fairfax County LDS', scope: 'Basement bathroom guidance', edition: '2021 edition, July 14, 2024', note: 'Page 9 illustrates toilet centerline clearances of 15 inches to each side, 21 inches in front, and 24 inches at a shower-stall opening. Page 3 addresses bathroom fan discharge directly outside. Applied only as county-guidance screening for the proposed basement bathroom layout; retained existing conditions require separate review.' },
  { id: 'existing', short: '13VAC5-63-410', title: 'Virginia Existing Building Code applicability', url: 'https://law.lis.virginia.gov/admincode/title13/agency5/chapter63/section410/', publisher: 'Virginia Administrative Code', scope: 'Existing buildings', edition: 'VEBC section 102; subsection D / 102.2.2', note: 'R-5 alteration and repair work may use the stated construction-code alternative subject to conditions. Similar-kind replacement and untouched existing work have distinct treatment. The reconstructed-deck provision is not the new-deck guard trigger used in this demonstration.' },
  { id: 'permits', short: '13VAC5-63-80', title: 'Permit applications and exemptions', url: 'https://law.lis.virginia.gov/admincode/title13/agency5/chapter63/section80/', publisher: 'Virginia Administrative Code', scope: 'Virginia administration', edition: 'USBC sections 108.1-108.2', note: 'Alterations to structure, wiring, water, drainage, venting or mechanical systems may require permits. Specific ordinary repairs are exempt; permit exemption does not remove applicable code obligations. No exemption is awarded by this app.' },
  { id: 'county-permits', short: 'Fairfax / permits', title: 'When a permit is required', url: 'https://www.fairfaxcounty.gov/landdevelopment/when-permit-required', publisher: 'Fairfax County LDS', scope: 'Local permit guidance', edition: 'Page last modified Jan. 6, 2026', note: 'Decks and bathroom remodels appear among permit-requiring work. Limited finishes, painting and vanity/countertop replacement are treated differently. Scope changes, separate trades and project-specific conditions need county confirmation.' },
  { id: 'trades', short: 'Fairfax / alterations', title: 'Residential addition and alteration permits', url: 'https://www.fairfaxcounty.gov/landdevelopment/permit-library/addition-alteration-residential', publisher: 'Fairfax County LDS', scope: 'Local residential / trades', edition: 'Live permit-library guidance', note: 'Associated electrical, plumbing and mechanical permits may accompany a building permit. This residential category is not a blanket route for apartments or condominiums. Verify the actual building type and work with the locality.' },
];

export const samples = {
  deck: {
    title: 'Backyard deck',
    description: 'An outdoor living space, with the right questions built in.',
    brief: 'Plan a new, single-level deck at a fictional detached home. Begin with a 16 by 12 foot concept, then explore how elevation and guard details change the questions for your builder.',
    goals: ['Shape a live deck concept with your own dimensions.', 'Explore three narrow, source-linked guard checks.', 'Compare attached and freestanding approaches.'],
    defaults: { width: '16', depth: '12', drop: '42', guard: 'yes', guardHeight: '36', gap: '3.5', opening: 'regular', attachment: 'ledger' },
  },
  bathroom: {
    title: 'Basement bathroom',
    description: 'Rethink a bathroom without overlooking what is behind the walls.',
    brief: 'Remodel an existing basement bathroom in a fictional detached home. The proposed new layout relocates plumbing. Start with an 8 by 10 foot concept and two clearance issues, then compare it with a limited cosmetic refresh.',
    goals: ['Adjust room dimensions and entered fixture clearances.', 'Screen a proposed layout against Fairfax basement guidance.', 'Separate finish-only work from plumbing and layout changes.'],
    defaults: { width: '8', depth: '10', scope: 'layout', left: '14', right: '18', front: '18', shower: 'yes', showerFront: '24', exhaust: 'outdoors', airflow: '50', fanMode: 'intermittent' },
  },
};
const numeric = (label, unit, min, max, hint = '') => ({ label, unit, min, max, hint });
export const fields = {
  deck: {
    width: numeric('Deck width', 'ft', 4, 40, 'Demo drawing range: 4-40 ft, not a span limit.'),
    depth: numeric('Deck depth', 'ft', 4, 30, 'Demo drawing range: 4-30 ft, not a span limit.'),
    drop: numeric('Maximum drop to grade', 'in', 0, 180, 'Conservative screen: maximum drop within 36 in horizontally of the edge. Confirm measurement on site.'),
    guard: { label: 'Perimeter guard provided', options: [['yes', 'Yes'], ['no', 'No'], ['unknown', 'Not yet known']] },
    guardHeight: numeric('Level guard height', 'in', 0, 72, 'From deck walking surface, not a stair handrail.'),
    gap: numeric('Largest clear opening', 'in', 0, 12, 'Narrow dimension of every regular opening; exactly 4 in needs sphere-test review.'),
    opening: { label: 'Opening geometry', options: [['regular', 'All openings regular and measured'], ['unknown', 'Irregular or not yet measured']], hint: 'Include bottom and corner openings. Spacing alone does not verify guard strength.' },
    attachment: { label: 'Concept attachment', options: [['ledger', 'Attached to house / ledger'], ['freestanding', 'Freestanding / independent supports']], hint: 'Changing this records intent, not an engineered connection.' },
  },
  bathroom: {
    width: numeric('Room width', 'ft', 5, 20, 'Demo drawing range: 5-20 ft, not a code minimum.'),
    depth: numeric('Room depth', 'ft', 5, 25, 'Demo drawing range: 5-25 ft, not a code minimum.'),
    scope: { label: 'Remodel scope', options: [['layout', 'New layout / move plumbing'], ['cosmetic', 'Cosmetic / retain fixtures and systems']], hint: 'Retained conditions need existing-building applicability review.' },
    left: numeric('Toilet centerline to left', 'in', 0, 60, 'Measure to adjacent wall or fixture.'),
    right: numeric('Toilet centerline to right', 'in', 0, 60, 'Both sides are considered separately.'),
    front: numeric('Clear space in front of toilet', 'in', 0, 96, 'Entered measurement, not calculated from the schematic.'),
    shower: { label: 'Shower stall in project', options: [['yes', 'Yes'], ['no', 'No / bath only']] },
    showerFront: numeric('Clear space at shower opening', 'in', 0, 96, 'Not the shower interior; confirm door swing and access.'),
    exhaust: { label: 'Bathroom ventilation route', options: [['outdoors', 'Mechanical exhaust directly outdoors'], ['interior', 'Exhaust into attic / interior'], ['window', 'Window only'], ['unknown', 'Not yet known']] },
    airflow: numeric('Proposed fan airflow', 'CFM', 1, 300, 'Recorded only. No verified numeric airflow threshold is implemented.'),
    fanMode: { label: 'Fan operation', options: [['intermittent', 'Intermittent / on demand'], ['continuous', 'Continuous']], hint: 'Mode, installed airflow, duct losses and termination require mechanical review.' },
  },
};
export const strategies = {
  deck: [
    { id: 'attached', title: 'Attached wood deck', description: 'Explore a house ledger and a pressure-treated wood walking surface.', cost: '$8,000-14,000', time: '1-2 weeks', tradeoff: 'Fewer independent supports; more reliance on the house connection.', questions: ['Can the existing wall and framing accept the ledger loads?', 'How will water management and flashing be detailed?', 'What footings, fasteners and inspections does the design need?'] },
    { id: 'independent', title: 'Freestanding deck', description: 'Explore independent supports rather than a structural ledger connection.', cost: '$11,000-19,000', time: '2-3 weeks', tradeoff: 'More supports and excavation; avoids reliance on a structural house ledger.', questions: ['How will lateral stability and proximity to the house be handled?', 'Do soils, utilities or setbacks limit the additional footings?', 'How will the house/deck interface and access be detailed?'] },
  ],
  bathroom: [
    { id: 'refresh', title: 'Keep the existing layout', description: 'Limit the discussion to finishes and a like-for-like vanity, with no planned system relocation.', cost: '$3,000-7,000', time: '3-7 working days', tradeoff: 'Less disruption, but existing layout limitations remain.', questions: ['Is all work actually ordinary repair under the applicable provisions?', 'Are there concealed moisture or electrical problems?', 'Which existing conditions must be corrected despite the limited scope?'] },
    { id: 'reconfigure', title: 'Reconfigure the bathroom', description: 'Explore relocated fixtures, new supply and waste routing, and coordinated trade work.', cost: '$12,000-22,000', time: '2-4 weeks', tradeoff: 'More flexibility; more demolition, coordination and permit questions.', questions: ['Can drainage slope, venting and basement conditions support the layout?', 'Which building and trade permits apply?', 'Can a measured layout provide all fixture and door clearances?'] },
  ],
};
export const checklist = {
  deck: [
    { id: 'site', title: 'Site sketch and measured conditions', detail: 'Property boundaries, easements, setbacks, utilities and actual grade.' },
    { id: 'structure', title: 'Structural and foundation design', detail: 'Spans, loads, soil bearing, frost depth, footing sizes and lateral stability.' },
    { id: 'connections', title: 'Connection and water-management details', detail: 'House condition, ledger or independent supports, fasteners and flashing.' },
    { id: 'safety', title: 'Guard, stair and access details', detail: 'Actual opening geometry, load resistance, stairs, landings and handrails.' },
    { id: 'local', title: 'Local submission and inspection requirements', detail: 'Current code edition, zoning review, permit documents, fees and inspection sequence.' },
  ],
  bathroom: [
    { id: 'measured', title: 'Existing and proposed measured plans', detail: 'Fixture clearances, door swings, ceiling heights and retained construction.' },
    { id: 'scope', title: 'Written scope of changes', detail: 'Separate finish work from structural, plumbing, electrical and mechanical changes.' },
    { id: 'trades', title: 'Coordinated trade details', detail: 'Drainage/venting, fan duct and installed airflow, circuits and wet-location protection.' },
    { id: 'moisture', title: 'Existing-condition and waterproofing review', detail: 'Basement moisture, concealed damage, shower assemblies and hazardous-material risks.' },
    { id: 'permits', title: 'AHJ permit and inspection confirmation', detail: 'Existing-building pathway, applicable code edition, building and separate trade permits.' },
  ],
};

export function validateField(kind, key, value) {
  const spec = fields[kind]?.[key];
  if (!spec) return 'Unknown project input.';
  if (spec.options) return spec.options.some(([id]) => id === value) ? '' : 'Choose one of the listed options.';
  if ((typeof value !== 'number' && typeof value !== 'string') || String(value).trim() === '') return 'Enter a value; unknown values cannot satisfy a check.';
  const n = Number(value);
  if (!Number.isFinite(n)) return 'Enter a finite number.';
  if (n < spec.min || n > spec.max) return `Use ${spec.min}-${spec.max} ${spec.unit} for this demo.`;
  return '';
}
export function evaluate(kind, inputs) {
  if (!samples[kind]) throw new Error('Unknown sample');
  const result = [];
  const add = (id, title, status, detail, refs) => result.push({ id, title, status, detail, sources: refs });
  const invalid = Object.keys(fields[kind]).filter(key => validateField(kind, key, inputs[key]));
  const valid = (...keys) => keys.every(key => !invalid.includes(key));
  if (invalid.length) add('inputs', 'Correct incomplete or invalid inputs', 'issue', invalid.map(key => `${fields[kind][key].label}: ${validateField(kind, key, inputs[key])}`).join(' '), ['dhcd']);
  if (kind === 'deck') {
    const guard = inputs.guard;
    if (!valid('drop', 'guard') || guard === 'unknown') add('guard-presence', 'Does the deck need a guard?', 'review', 'Confirm both guard intent and the maximum drop to grade. An unknown measurement is not a satisfied check.', ['deck']);
    else if (Number(inputs.drop) > 30 && guard === 'no') add('guard-presence', 'Does the deck need a guard?', 'issue', `The entered ${inputs.drop} in drop exceeds the 30 in trigger in the county details, but no guard is proposed. Provide a compliant guard and confirm the site measurement.`, ['deck']);
    else if (Number(inputs.drop) <= 30 && guard === 'no') add('guard-presence', 'Does the deck need a guard?', 'review', 'The entered drop does not exceed the illustrated trigger. This does not establish that a guard is unnecessary at every edge; confirm actual grade, site conditions and applicability.', ['deck']);
    else add('guard-presence', 'Does the deck need a guard?', 'satisfied', `A guard is proposed for the entered ${inputs.drop} in drop. This satisfies only the presence screen; height, openings, strength and attachment are separate.`, ['deck']);
    if (guard !== 'yes' || !valid('guard', 'guardHeight')) add('guard-height', 'Level-deck guard height', 'review', 'A provided guard and a valid height are needed to screen this item. Guards provided voluntarily must also meet the applicable details.', ['deck']);
    else add('guard-height', 'Level-deck guard height', Number(inputs.guardHeight) >= 36 ? 'satisfied' : 'issue', `${inputs.guardHeight} in entered; the Fairfax level-deck guard detail calls for at least 36 in above the walking surface. This is not a stair handrail check.`, ['deck']);
    if (guard !== 'yes' || !valid('gap', 'opening') || inputs.opening === 'unknown') add('guard-opening', 'Guard openings', 'review', 'Measure every opening and confirm its geometry, including below the guard and at corners. The county criterion excludes passage of a 4 in sphere; irregular openings need direct review.', ['deck']);
    else {
      const gap = Number(inputs.gap);
      add('guard-opening', 'Guard openings', gap < 4 ? 'satisfied' : gap > 4 ? 'issue' : 'review', gap < 4
        ? `${gap} in is below the 4 in sphere diameter for the entered regular, measured openings. This limited geometry screen assumes every opening is represented. Verify field conditions and shrinkage of wet lumber.`
        : gap > 4 ? `${gap} in exceeds the 4 in sphere diameter. Revise and verify all actual openings with the county criterion.`
          : 'Exactly 4 in is not treated as satisfied. Confirm tolerances, actual geometry and exclusion of the 4 in sphere; nominal spacing is insufficient.', ['deck']);
    }
    add('structure', 'Structure, soil and foundations', 'review', 'Deck size is a drawing input, not a structural span check. Loads, beams, joists, footings, frost, bearing soils, fasteners and lateral stability are not calculated. Symbolic posts are not engineered support locations.', ['deck']);
    add('attachment', 'Attachment and water management', 'review', inputs.attachment === 'freestanding' ? 'An independent-support concept still needs footing, lateral-stability and house-interface design. The sketch does not engineer those systems.' : 'A ledger concept requires verification of the existing wall, framing, attachment, flashing and water management. The sketch does not verify any house connection.', ['deck']);
    add('site', 'Site, access and local approval', 'review', 'Confirm zoning, setbacks, easements, utilities, stairs, landings, handrails, guard strength and permit/inspection requirements. The new single-level deck screen does not evaluate reconstructed decks or stair guards.', ['deck', 'county-permits', 'existing']);
  } else {
    const layout = inputs.scope === 'layout';
    const fixture = (id, title, keys, predicate, detail) => {
      if (!layout) add(id, title, 'review', 'Retained existing conditions are outside this new-layout screen. Confirm the Virginia Existing Building Code pathway and any required corrections; cosmetic scope is not a clearance exemption.', ['existing', 'basement']);
      else if (!valid(...keys)) add(id, title, 'review', 'Enter valid measurements before applying the Fairfax basement bathroom guidance.', ['basement']);
      else add(id, title, predicate() ? 'satisfied' : 'issue', detail, ['basement']);
    };
    fixture('toilet-side', 'Toilet side clearances', ['left', 'right'], () => Number(inputs.left) >= 15 && Number(inputs.right) >= 15, `${inputs.left} in left and ${inputs.right} in right from toilet centerline. Fairfax basement guidance illustrates at least 15 in on each side to an adjacent wall or fixture. This uses entered measurements, not the schematic.`);
    fixture('toilet-front', 'Toilet front clearance', ['front'], () => Number(inputs.front) >= 21, `${inputs.front} in entered in front of the toilet; Fairfax basement guidance illustrates at least 21 in. Other fixture and door interactions remain unverified.`);
    if (inputs.shower !== 'yes') add('shower-entry', 'Shower-stall entry clearance', 'review', 'No shower stall is selected, so this screen is not applied. Bath access, fixture interactions and existing-condition applicability still need review.', ['basement', 'existing']);
    else fixture('shower-entry', 'Shower-stall entry clearance', ['showerFront'], () => Number(inputs.showerFront) >= 24, `${inputs.showerFront} in entered at the shower opening; Fairfax basement guidance illustrates at least 24 in. Interior shower size and waterproofing are not evaluated.`);
    if (!valid('exhaust') || ['unknown', 'window'].includes(inputs.exhaust)) add('exhaust', 'Bathroom exhaust destination', 'review', 'No verified mechanical route is entered. Window-only ventilation needs full applicability review; this demo does not infer ventilation compliance from a window opening.', ['basement']);
    else add('exhaust', 'Bathroom exhaust destination', inputs.exhaust === 'outdoors' ? 'satisfied' : 'issue', inputs.exhaust === 'outdoors' ? 'The entered mechanical exhaust route is directly outdoors, consistent with the county basement guidance. Airflow, ducting and discharge location still require mechanical review.' : 'An attic or other interior discharge does not satisfy the county guidance for direct exterior bathroom exhaust. Review and reroute with the appropriate professional.', ['basement']);
    add('airflow', 'Fan capacity, ducting and controls', 'review', `Proposed airflow: ${valid('airflow') ? `${inputs.airflow} CFM` : 'not established'}; operation: ${inputs.fanMode === 'continuous' ? 'continuous' : 'intermittent or unconfirmed'}. No numerical airflow threshold is implemented because the adopted-code text was not directly verified. Confirm required and installed airflow, duct losses, controls and termination.`, ['dhcd', 'trades']);
    add('electrical', 'Electrical and wet-area safety', 'review', 'A qualified electrical/trade reviewer must confirm applicable circuit, receptacle protection, bonding, fixture wet-location suitability and permit requirements. The demo makes no electrical compliance finding.', ['dhcd', 'trades']);
    add('plumbing', 'Plumbing, moisture and concealed conditions', 'review', 'Drainage, venting, water supply, waterproofing, basement moisture, structural alterations and concealed damage are not calculated. The plan is not a coordinated trade design.', ['basement', 'trades']);
    add('permits', 'Existing-building pathway and permits', 'review', layout ? 'Moving fixtures or altering plumbing/layout needs AHJ confirmation of the applicable existing-building pathway and building, plumbing, mechanical and electrical permits. Do not start from an assumed exemption.' : 'Limited finishes and certain ordinary repairs may be exempt, but the actual work and conditions determine applicability. No permit exemption is granted by selecting cosmetic scope.', ['existing', 'permits', 'county-permits']);
  }
  return result;
}

export function createState() {
  return { version: 1, remember: false, projects: Object.fromEntries(Object.entries(samples).map(([kind, sample]) => [kind, { inputs: { ...sample.defaults }, strategy: null, checklist: Object.fromEntries(checklist[kind].map(item => [item.id, false])) }])) };
}
export function readState(storage) {
  const fresh = createState();
  if (!storage) return { state: fresh, warning: 'Storage is unavailable. This demo will run in memory only.' };
  let raw;
  try { raw = storage.getItem(storageKey); }
  catch { return { state: fresh, warning: 'Browser storage could not be read. This demo will run in memory only.' }; }
  if (!raw) return { state: fresh, warning: '' };
  try {
    const saved = JSON.parse(raw);
    if (saved.version !== 1 || saved.remember !== true || !saved.projects) throw new Error('Unsupported saved state');
    for (const kind of Object.keys(samples)) {
      const project = saved.projects[kind];
      if (!project?.inputs || !project.checklist) throw new Error('Incomplete project');
      for (const [key, spec] of Object.entries(fields[kind])) {
        const value = project.inputs[key];
        const primitive = typeof value === 'string' || typeof value === 'number';
        if (!primitive || String(value).length > 60) throw new Error('Invalid saved input');
        if (spec.options ? !spec.options.some(([id]) => id === value) : value !== '' && !Number.isFinite(Number(value))) throw new Error('Invalid saved input');
        fresh.projects[kind].inputs[key] = String(value);
      }
      if (project.strategy !== null && !strategies[kind].some(item => item.id === project.strategy)) throw new Error('Unknown option');
      fresh.projects[kind].strategy = project.strategy;
      for (const { id } of checklist[kind]) {
        if (typeof project.checklist[id] !== 'boolean') throw new Error('Invalid checklist');
        fresh.projects[kind].checklist[id] = project.checklist[id];
      }
    }
    fresh.remember = true;
    return { state: fresh, warning: '' };
  } catch {
    return { state: createState(), warning: 'Saved demo data was corrupt or incompatible. Default samples are shown; remembering is off. Enable it in Settings to replace the saved record.' };
  }
}
export function persistState(storage, state) {
  if (!storage) return { warning: 'Storage is unavailable. Changes are in memory only and will not survive a reload.' };
  try {
    if (state.remember) storage.setItem(storageKey, JSON.stringify(state));
    else storage.removeItem(storageKey);
    return { warning: '' };
  } catch {
    return { warning: state.remember ? 'Sample edits could not be saved to browser storage. Current changes are in memory only; do not rely on a reload.' : 'Saved demo data could not be removed. Use your browser site-data controls before leaving a shared device.' };
  }
}

const html = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export function buildReport(kind, project, svg, now = new Date()) {
  const checks = evaluate(kind, project.inputs);
  const option = strategies[kind].find(item => item.id === project.strategy);
  const labels = { satisfied: 'Supported check satisfied', issue: 'Issue to resolve', review: 'Review needed' };
  const validGeometry = ['width', 'depth'].every(key => !validateField(kind, key, project.inputs[key]));
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PermitPath - ${samples[kind].title} discussion packet</title><style>
  body{font:15px/1.6 "Segoe UI",Arial,sans-serif;color:#102a43;max-width:960px;margin:32px auto;padding:0 25px}h1{line-height:1.2}h2{margin-top:32px}a{color:#00645f;overflow-wrap:anywhere}table{border-collapse:collapse;width:100%;font-size:13px}td,th{text-align:left;padding:9px;border-bottom:1px solid #c9d6de}p{max-width:80ch}.notice{padding:16px;background:#edf3f5;border:1px solid #b6c8d4}.check{break-inside:avoid;border-bottom:1px solid #d9e2e8;padding:14px 0}.check h3{margin:0}.check p{margin:8px 0}.status{font-weight:bold}.satisfied{color:#176b51}.issue{color:#9b3c24}.review{color:#745015}.blueprint{width:100%;max-height:370px;background:#edf3f7;fill:none;stroke:#416b85;stroke-width:1}.blueprint text{stroke:none;fill:#315771;font:10px "Segoe UI",Arial}.blueprint .drawing-title{font-size:18px}.blueprint .drawing-label,.blueprint .drawing-note{font-size:8px}.blueprint .grid-line{stroke:#b9d1df;stroke-width:.4}.blueprint .house,.blueprint .fixture,.blueprint .deck-floor,.blueprint .bath-floor{fill:#e1edf4}.blueprint .label-backdrop,.blueprint .fixture-inner{fill:#f6f8fa;stroke:none}.blueprint .wall,.blueprint .guard-line{stroke-width:3}.blueprint .post{fill:white}small{color:#536777}li{margin:7px 0}@media print{body{margin:0;max-width:none;padding:0}h2,h3{break-after:avoid}a{color:inherit}.blueprint{max-height:300px}}
  </style></head><body><header><p>PermitPath / LOCAL DEMONSTRATION EXPORT</p><h1>${samples[kind].title}<br>Discussion packet</h1><p>Fairfax County, Virginia / fictional detached home<br>Generated ${html(now.toISOString())} / sources reviewed ${reviewDate}</p></header>
  <div class="notice"><strong>Not submitted. Not approved. Not for construction.</strong><p>${disclaimer} This report is not a permit application, professional drawing or certification. U.S./Virginia sample scope only; Canada and Mexico are not covered. Reference baseline: 2021 Virginia code family; confirm current applicability with the AHJ.</p></div>
  <h2>Project inputs</h2><table><thead><tr><th>Input</th><th>Entered value</th></tr></thead><tbody>${Object.entries(fields[kind]).map(([key, spec]) => `<tr><th>${html(spec.label)}</th><td>${html(spec.options?.find(([id]) => id === project.inputs[key])?.[1] ?? (String(project.inputs[key] ?? '') === '' ? 'Not entered' : project.inputs[key]))}${spec.unit ? ` ${spec.unit}` : ''}${validateField(kind, key, project.inputs[key]) ? ' (invalid / incomplete)' : ''}</td></tr>`).join('')}</tbody></table>
  <h2>Concept schematic</h2>${validGeometry ? svg : '<p>Diagram omitted: room or deck dimensions are invalid or incomplete.</p>'}<p><small>Illustrative orientation. ${kind === 'deck' ? 'Posts and board lines are symbolic, not structural design. Stairs are not drawn.' : 'Only the room outline scales with dimensions. Fixture positions are schematic; entered clearances are not derived from this drawing.'}</small></p>
  <h2>All scoped checks</h2><p>No overall compliance result is issued. Unknowns remain open.</p>${checks.map(check => `<section class="check"><span class="status ${check.status}">${labels[check.status]}</span><h3>${html(check.title)}</h3><p>${html(check.detail)}</p><small>${check.sources.map(id => { const source = sources.find(item => item.id === id); return `<a href="${source.url}">${source.short}</a>`; }).join(' / ')}</small></section>`).join('')}
  <h2>Selected discussion option</h2>${option ? `<h3>${option.title}</h3><p>${option.description}</p><p>Illustrative construction cost: ${option.cost}; on-site duration: ${option.time}. Synthetic examples, not quotes or permit-processing estimates.</p><p>${option.tradeoff}</p><ul>${option.questions.map(q => `<li>${q}</li>`).join('')}</ul>` : '<p>No option selected. Compare approaches in the app before the next discussion.</p>'}<p>Option selection does not alter project inputs or resolve any check.</p>
  <h2>Preparation checklist</h2><p>Self-reported collection only, not document verification.</p><ul>${checklist[kind].map(item => `<li><strong>${project.checklist[item.id] ? '[Marked gathered]' : '[Still to gather]'} ${item.title}</strong><br>${item.detail}</li>`).join('')}</ul>
  <h2>Sources and applicability</h2><p>Research supports a 2021 baseline. The 2024 development cycle is not itself an adoption notice; no later effective-date notice was verified in this research. Reconfirm requirements before applying.</p>${sources.map(source => `<section class="check"><h3>${source.title}</h3><p>${source.publisher} / ${source.scope} / ${source.edition}<br>Reviewed ${reviewDate}</p><p>${source.note}</p><a href="${source.url}">${source.url}</a></section>`).join('')}
  <footer><p>PermitPath prototype. Local preparation record only. No AI, agency connection or automatic submission.</p></footer></body></html>`;
}
