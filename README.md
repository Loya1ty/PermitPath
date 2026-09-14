# PermitPath MVP

A working, browser-only demonstration of the PermitPath product concept: **brief -> editable concept -> scoped checks -> compare approaches -> prepare a discussion packet**.

This is a prospective-customer demo, not production permitting software. It uses synthetic project data and small deterministic rules. It does not guarantee approval, replace licensed professionals or the authority having jurisdiction (AHJ), or produce construction documents.

## Run locally

Requires **Node.js 24 or later**. There are **no package dependencies or installation steps**.

```powershell
cd ..PermitPath
npm run dev
```

Open **http://127.0.0.1:4173/**. The server binds only to localhost.

For the production output:

```powershell
npm run build
npm run preview
```

Do not run dev and preview on the same port simultaneously. Stop the earlier server first, or set `$env:PORT = "4174"` before starting another one. `dist` is the persistent, self-contained deployment artifact; roughly 103 KB of uncompressed application HTML, CSS and JavaScript plus a small SVG icon. No runtime CDN, web-font, framework, backend, telemetry, API key or AI-service dependency exists. Serve over HTTP rather than opening `index.html` directly, because browsers restrict ES modules under `file://`.

The preview server also exposes **http://127.0.0.1:4173/PermitPath/** as a test alias for repository-subpath hosting.

## Try the two walkthroughs

### Backyard deck

1. Open **Backyard deck -> Edit diagram**.
2. Change width from 16 to 20 feet; the plan and displayed area update.
3. Change level guard height to 35 inches. **Scoped checks** flags that height against the Fairfax typical-details illustration.
4. Restore 36 inches; set the opening to exactly 4 inches. That item becomes **Review needed**, not satisfied.
5. Compare attached versus freestanding concepts, choose an approach, mark preparation items gathered, and download the report.

The initial sample satisfies **three implemented illustrative guard checks only**. Structure, foundations, soil, ledger/independent connections, flashing, lateral stability, stairs, landings, guard strength, zoning, setbacks and approval remain unresolved. The drawing's posts and boards are symbolic.

### Basement bathroom remodel

1. Open **Basement bathroom -> Scoped checks** to see two seeded clearance issues.
2. In **Edit diagram**, change the left toilet centerline clearance from 14 to 15 inches and toilet front clearance from 18 to 21 inches.
3. The corresponding limited checks become satisfied. Electrical, plumbing, concealed conditions, ventilation capacity and permit applicability remain review items.
4. Select **Cosmetic / retain fixtures and systems** to see retained layout items move to existing-building review, not automatically pass.
5. Compare an existing-layout refresh and a reconfiguration; select a discussion option and export a preparation packet.

**Basement scope is deliberate:** the implemented dimensional references are Fairfax County's finished-basement guidance. They are not represented as a universal bathroom-remodel rule or statewide automatic approval.

## Implemented versus preview-only

| Working locally | Clearly labeled, not connected |
|---|---|
| Dashboard and both five-step walkthroughs | Organization membership, invitations and shared review |
| Numeric and option inputs with explicit invalid states | Accounts, authentication and cloud project storage |
| Responsive, original SVG concept drawings | AI rendering, engineering or full code checking |
| Deterministic, source-linked screening results | Payments, subscriptions and production license terms |
| Two distinct strategies per project | Agency integrations or permit submission |
| Preparation checklist, standalone HTML download, printable report / browser PDF | Other jurisdictions, metric units and international coverage |
| Switch/reset samples, opt-in localStorage, storage-error feedback | Automatic regulatory updates |
| Code library, help, settings and useful placeholder destinations | Actual cost or schedule quotations |

Strategy selection records an approach for discussion. It **does not** silently alter inputs, recompute the plan as that strategy, or resolve any check. Diagram room/deck outlines respond to dimensions; fixture/support locations are schematic, not optimized or engineered. The bathroom's entered clearances are not measured from its SVG.

The pricing preview uses the supplied hypothetical plans: Home **$29/month** (1 editor, 1 project), Pro **$149/month** (1 editor, 10 projects), Team **$499/month** (5 editors, 50 projects), and Agency **from $18,000/year**. There is no checkout or claim of a purchasable service.

## Regulatory scope and source evidence

**Reviewed September 13, 2026. Reference baseline: the 2021 Virginia code family.** DHCD and the live administrative-code material identify January 18, 2024 as the effective date. Fairfax's technical transition ended January 17, 2025; its page requires 2021 provisions for applications starting January 18, 2025.

The retrieved DHCD April 30, 2026 memorandum describes the **2024 development cycle as proposed regulations**, not an adopted effective date. A later replacement effective-date notice was not verified in this research. The app does not predict adoption from a cycle label or claim continuous September-2026 regulatory monitoring. Confirm the current edition and the edition applicable to the actual permit with DHCD and the AHJ.

There is **no single North American building code**. This MVP implements only the identified Virginia/U.S. residential samples with Fairfax-specific guidance. U.S. model codes are context, subject to adoption and amendments. **Canadian and Mexican coverage is not implemented.**

| Source | Applied purpose |
|---|---|
| [Virginia DHCD: Codes](https://www.dhcd.virginia.gov/codes) | Adopted baseline, Virginia amendments, 2020 NEC context |
| [13VAC5-63-10](https://law.lis.virginia.gov/admincode/title13/agency5/chapter63/section10/) | USBC incorporation and precedence |
| [Fairfax codes and standards](https://www.fairfaxcounty.gov/landdevelopment/codes-and-standards) | Local implementation and transition dates |
| [DHCD 2024 code development cycle](https://www.dhcd.virginia.gov/2024-code-development-cycle) | Rulemaking status, not an adopted-code shortcut |
| [Fairfax Typical Deck Details, version 2021.0, Jan. 5, 2024](https://www.fairfaxcounty.gov/landdevelopment/sites/landdevelopment/files/assets/documents/pdf/publications/deck-details.pdf) | Pages 21-22: conditional level-deck guard screening |
| [Fairfax Typical Finished Basement Details, 2021 edition, July 14, 2024](https://www.fairfaxcounty.gov/landdevelopment/sites/landdevelopment/files/assets/documents/pdf/publications/basement-details.pdf) | Pages 3 and 9: exhaust destination and proposed fixture clearances |
| [13VAC5-63-410](https://law.lis.virginia.gov/admincode/title13/agency5/chapter63/section410/) | Virginia Existing Building Code applicability for retained and altered work |
| [13VAC5-63-80](https://law.lis.virginia.gov/admincode/title13/agency5/chapter63/section80/) | Permit application and ordinary-repair exemptions; no exemption granted by the app |
| [Fairfax: When a permit is required](https://www.fairfaxcounty.gov/landdevelopment/when-permit-required) | Local permit routing, separate from geometric checks |
| [Fairfax residential additions/alterations](https://www.fairfaxcounty.gov/landdevelopment/permit-library/addition-alteration-residential) | Building and associated trade-permit review |

The in-app library and every export include source publisher, scope, edition notes and review date. Content is original concise paraphrase with public links, not reproduced copyrighted code tables.

### Exact limits of the rule engine

- **Deck guard presence:** a confirmed drop **greater than 30 inches** with no guard is flagged. Exactly 30 is not that trigger. The maximum drop within 36 horizontal inches of the edge is a disclosed conservative screening input, not a claim of a verbatim county measurement rule. No guard at lower heights stays review-only; unknown conditions never establish an exemption.
- **Provided level-deck guard height:** screens **at least 36 inches**, including voluntary guards; not a stair handrail rule.
- **Openings:** with all regular openings entered as measured, a narrow clear dimension below 4 inches satisfies only the limited geometry screen. Over 4 is an issue; exactly 4 or irregular/unknown geometry requires sphere-test review. Check the actual openings, tolerances and lumber shrinkage.
- **Basement proposed-layout screen:** toilet centerline at least **15 inches each side**, toilet front at least **21 inches**, shower-stall entry at least **24 inches**. Retained cosmetic scope is routed to existing-building review. An absent shower is not counted as a passed shower check.
- **Bathroom mechanical exhaust:** an entered direct-outdoor route satisfies only the destination screen. Interior/attic discharge is flagged. Window-only or unknown routes require review.
- **Airflow is never passed:** proposed CFM and operation mode are recorded, but **50-CFM intermittent / 20-CFM continuous thresholds are not implemented** because accessible official adopted-code text was not directly verified. Fan selection, required and delivered airflow, ducts, controls and termination need mechanical review.
- Input ranges exist to keep the demonstration usable; deck spans and room dimension ranges are **not code minima/maxima**.

## Local data and exports

Remembering is **off by default**. Enable it in **Settings** to persist both projects' inputs, selected options and checklist flags under the single localStorage key `permitpath-demo-v1`. Turning it off removes that record and retains current in-memory edits until reload. Reset has an explicit browser confirmation and affects only the selected sample or both sample records, not downloaded files.

Corrupt/incompatible storage is rejected with a visible warning. Read/write/quota/removal failures are surfaced, and interactions remain available in memory. Unknown/blank input never substitutes a safe-looking diagram or a satisfied check. Saved state is local to the browser origin, not shared with other users; simultaneous tabs use the last saved record, without real-time collaboration.

Do not put confidential project information on a shared device. There are no address/contact/upload fields. External source links leave the app and may have their own policies; the hosting provider may keep ordinary access logs.

The HTML export is self-contained, including the SVG and styling, inputs, all results, selected strategy, checklist and all sources. It can be opened offline and printed to PDF. Print opens a new report window; if popups are blocked, use the download and print the downloaded file instead. Neither action submits anything.

## Validation

```powershell
npm test
npm run build
npm run test:e2e
```

- `npm test`: 16 Node-native tests covering exact boundaries, both scenario defaults, invalid and unknown values, scope changes, source resolution, persistence failures, and report content/escaping.
- `npm run test:e2e`: dependency-free Chrome DevTools Protocol browser checks using an **already installed** Edge or Chrome. On Windows the standard Edge/Chrome install locations are detected. Elsewhere, or for another installed Chromium, set `BROWSER_PATH` to the executable. No browser or test package is downloaded.
- Browser tests start their own production server on `127.0.0.1:4187` (`TEST_PORT` can change it), use a disposable isolated profile, and close their own processes afterward. They do not attach to or modify your normal browser profile.
- Desktop 1440x1000 and mobile 390x844 runs cover both complete sample journeys, actual pointer-click controls, SVG updates, rule states, strategy selection, checklists, real report downloads and print windows, resets, opt-in/reload/opt-out persistence, corrupt/blocked storage, keyboard-focus skip navigation, every route at both `/` and `/PermitPath/`, and horizontal-overflow checks.
- Capture desktop/mobile screenshots under `test-results` with `$env:CAPTURE = "1"; npm run test:e2e`. These are local ignored artifacts, not deployment assets.

The completed implementation was checked with the commands above. Browser automation was exercised in installed Chromium-based Edge; Safari, Firefox, screen-reader behavior and actual agency acceptance are not certified. The mobile check emulates a viewport, not a physical phone. Native print/PDF behavior depends on the user's browser and operating system. No automated WCAG conformance claim is made.

The bounded independent visual review found no material blocker in the captured desktop/mobile dashboard and editor views. Below-fold mobile content and the checks screenshots were not independently visually verified; functional and overflow checks did cover those routes.

## Source layout

```text
index.html                 Application entry and visual contract
styles.css                 Responsive styles, states and SVG presentation
src/app.mjs                Hash routes, accessible controls and interactions
src/model.mjs              Samples, sources, scoped rules, storage and reports
src/diagrams.mjs           Original deterministic SVG schematics
scripts/build.mjs          Copies the runtime-only static site to dist
scripts/serve.mjs          Local HTTP server and subpath test alias
tests/model.test.mjs       Model and export tests
tests/browser.test.mjs     Native-CDP desktop/mobile journey tests
.github/workflows/pages.yml
```

Future real deployments need a jurisdiction/content-maintenance process, legal/source-license review, professionally validated rule coverage and production security/accessibility review before presenting this as anything beyond the described demonstration.
