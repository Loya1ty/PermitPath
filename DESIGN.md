---
name: PermitPath
description: A homeowner's working drawing desk for scoped evidence and review preparation.
colors:
  navy: "#102A43"
  teal: "#007F7A"
  teal-dark: "#00645F"
  mint: "#B9E9DC"
  paper: "#F6F8FA"
  white: "#FFFFFF"
  ink: "#16324B"
  muted: "#536777"
  line: "#D9E2E8"
  wash: "#EDF3F5"
  success: "#176B51"
  issue: "#9B3C24"
  review: "#745015"
  success-bg: "#E5F3EC"
  issue-bg: "#FCECE5"
  review-bg: "#F6EEDC"
  blueprint-paper: "#EDF3F7"
  blueprint-ink: "#315771"
typography:
  headline:
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, Arial, sans-serif'
    fontSize: "2rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-.025em"
  title:
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, Arial, sans-serif'
    fontSize: "1.3rem"
    fontWeight: 650
    lineHeight: 1.35
    letterSpacing: "-.015em"
  subsection:
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, Arial, sans-serif'
    fontSize: "1.075rem"
    fontWeight: 650
    lineHeight: 1.4
  body:
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, Arial, sans-serif'
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  button:
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, Arial, sans-serif'
    fontSize: ".875rem"
    fontWeight: 600
    lineHeight: 1.4
  field-label:
    fontSize: ".8rem"
    fontWeight: 600
  badge:
    fontSize: ".7rem"
    fontWeight: 600
    lineHeight: 1.35
rounded:
  field-tag: "4px"
  control: "5px"
  panel: "8px"
spacing:
  compact: "8px"
  actions: "12px"
  group: "16px"
  panel: "20px"
  section: "24px"
components:
  button-primary:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "10px 17px"
  button-primary-hover:
    backgroundColor: "{colors.teal-dark}"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "10px 17px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "10px 8px"
  field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field-tag}"
    padding: "9px 10px"
  badge-satisfied:
    backgroundColor: "{colors.success-bg}"
    textColor: "{colors.success}"
    typography: "{typography.badge}"
    rounded: "{rounded.field-tag}"
    padding: "4px 8px"
  badge-issue:
    backgroundColor: "{colors.issue-bg}"
    textColor: "{colors.issue}"
    typography: "{typography.badge}"
    rounded: "{rounded.field-tag}"
    padding: "4px 8px"
  badge-review:
    backgroundColor: "{colors.review-bg}"
    textColor: "{colors.review}"
    typography: "{typography.badge}"
    rounded: "{rounded.field-tag}"
    padding: "4px 8px"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.panel}"
  sidebar:
    backgroundColor: "{colors.navy}"
---

# Design System: PermitPath

## Overview

**Creative North Star: "The homeowner's working drawing desk"**

PermitPath is a restrained operational workspace: navy navigation frames a light paper canvas, teal identifies actions, and original SVG blueprint sheets make the project tangible. Its visual authority is the built application, not a generated concept or marketing composition.

Compact system typography, fine dividers and visibly labeled states support scanning and editing. The confirmed direction is task-first and responsive; illustration describes a concept without implying engineering certification or permit approval.

**Key Characteristics:**
- Navy navigation, paper canvas and teal actions.
- Compact system typography with a modest heading ramp.
- Original blueprints presented as labeled working sheets.
- Text-backed statuses and explicit form feedback.
- Responsive navigation and drawing-first mobile editing.

Recorded from `styles.css`, the opening direction contract in `index.html`, `src\app.mjs`, `src\diagrams.mjs`, and the binding brand/accessibility constraints in `PRODUCT.md`. The frontmatter records reused values; descriptive scale names organize existing values rather than introducing new CSS variables. Component state details live below and in `.impeccable\design.json`.

## Colors

The palette separates stable navigation, editable content and action while reserving green, rust and ochre for clearly labeled outcomes.

### Primary
- **Action teal** (`teal`): primary buttons, selected walkthrough steps, checkbox accents and selected strategy borders.
- **Deep teal** (`teal-dark`): primary-button hover, links and active-step text.

### Secondary
- **Workspace navy** (`navy`): the persistent navigation shell and compact-rail label backplates.
- **Navigation mint** (`mint`): the brand accent, active-navigation icons, sidebar keyboard focus and the mobile active underline.

### Neutral
- **Paper** (`paper`): the main application background.
- **White** (`white`): cards, drawing frames, inputs and primary-action lettering.
- **Ink** (`ink`): primary content text.
- **Muted ink** (`muted`): secondary copy, metadata and inactive step labels.
- **Divider** (`line`): panel borders, separators and table rules.
- **Wash** (`wash`): quiet/secondary action hover and paused drawing surfaces.
- **Blueprint paper and ink** (`blueprint-paper`, `blueprint-ink`): drawing canvas and SVG lettering, complemented by fine blue-gray geometry.

### Semantic states
- **Satisfied** (`success`, `success-bg`): green text on a pale green badge.
- **Issue** (`issue`, `issue-bg`): rust text on a pale warm badge; also inline error text.
- **Review** (`review`, `review-bg`): ochre text on a pale ochre badge.

**The Text-Backed Status Rule.** A check status combines color with its label and a checkmark, exclamation mark or question mark; color alone never explains the result.

## Typography

**Display and body font:** the frontmatter's Segoe UI system stack; there is no separate display face or downloaded font.

**Drawing lettering:** Segoe UI with Arial and sans-serif fallbacks. **Technical annotations:** Consolas with a monospace fallback for dimension labels and sheet identifiers.

The type ramp is compact, not a fixed mathematical ratio. Default headings use semibold emphasis and selective negative tracking rather than oversized display lettering. Paragraphs are capped at (74ch).

- **Headline:** the default page heading; project headings use (1.8rem), then (1.65rem) at the compact-rail breakpoint. Default page headings become (1.75rem) on mobile.
- **Title and subsection:** the default second- and third-level hierarchy. Individual card titles adapt to their narrower containers.
- **Body:** the root size and leading; supporting content generally sits below body size, commonly (.82–.9rem).
- **Button and field label:** stronger weights distinguish controls without uppercase navigation.
- **Badge:** deliberately compact; full labels remain available in the detailed check list.
- **Drawing labels:** compact uppercase annotations are native to the blueprint, not a global UI text treatment.

## Layout

The desktop shell is a two-column grid: a sticky, full-height navigation rail (225px) and a flexible workspace. Main content is centered with a maximum width (1550px), desktop padding (35px 38px 36px), a top bar (77px) and a divided footer.

Content uses bordered sheets and purpose-specific grids rather than a single universal card layout. Project cards use (1.1fr / 1fr); the editor pairs a narrower input panel with a wider drawing. Action groups wrap. Repeated spacing values are recorded in frontmatter; this is not a claim that every margin follows one scale.

| Media query | Built behavior |
| --- | --- |
| min-width 1550px | Main top padding increases to 44px; project drawings gain height. |
| max-width 1180px | Rail contracts to 195px; main/topbar/footer gutters become 28px; paired layouts tighten; pricing becomes two columns. |
| max-width 950px | Rail contracts to 76px and hides visible nav labels; hover or keyboard focus exposes them. The wordmark reduces to its symbol. |
| max-width 740px | Rail becomes an in-flow header with horizontally scrollable primary navigation. Main gutters become 20px; walkthrough steps scroll horizontally. Editor, brief, packet and help layouts become one column; the live drawing precedes inputs. |
| max-width 480px | Main gutters become 18px; project, strategy and pricing grids become one column. Primary navigation retains labels while hiding icons. Action groups share available width. |

**The Keep-the-Task-Visible Rule.** Narrow screens retain labeled navigation and scrollable walkthrough steps; the editor places its live drawing before the form rather than squeezing both into desktop columns.

Tables have horizontal overflow containers. Print removes application chrome, project actions, walkthrough navigation and buttons; the remaining content uses an unpadded main area.

## Elevation & Depth

Depth is predominantly flat: white panels against paper, thin borders, tinted notices and the blue-gray drawing canvas. The top bar has a lightly translucent white background. There is no ambient card-shadow ladder.

The two implemented inset accents communicate state, not floating elevation:
- Selected strategy: `inset 0 2px 0 var(--teal)`.
- Mobile active navigation: `inset 0 -2px 0 var(--mint)`.

Keyboard focus is a separate visible outline (3px solid #1a78bb, offset 4px); the navy sidebar substitutes mint. Focus inside a linked project drawing uses a negative offset to stay visible within its frame.

## Shapes

Panels use the shared gently rounded corner token; controls have slightly tighter corners and fields/status tags tighter still. Panels and sheets generally use a one-pixel divider border, with clipped contents where a drawing meets its frame. Buttons and inputs have their own stronger control borders.

Circles remain purposeful for step numbers, avatars and status dots. Rectangular drawing geometry, symbolic posts and curved fixture outlines belong to the blueprint vocabulary; these are not general application corner tokens.

## Components

### Buttons

Compact, explicit actions with a minimum height (44px), inline icon gap (9px), transparent default border and the frontmatter's padding/type.

- **Primary:** teal with white text; hover deepens the teal.
- **Secondary:** white with ink text and a border (#c2d0d9); hover uses wash and a stronger border (#7f98a8).
- **Quiet:** transparent with muted text and narrower horizontal padding; hover uses wash and ink.
- **Pressed:** brightness filter (.93).
- **Disabled:** muted text (#586b78), gray background (#e4eaee) and not-allowed cursor. The stylesheet defines this state; it is not a claim that every current workflow disables actions.
- **Motion:** background and border color transition over (160ms ease-out). Reduced-motion preferences remove transitions and restore automatic scroll behavior.

### Status badges and tags

Compact rectangular badges pair semantic color with explicit symbols and text. Full check labels are “Supported check satisfied,” “Issue to resolve,” and “Review needed.” Compact summaries shorten these to “Satisfied,” “Issue,” and “Review.” Neutral sample tags distinguish demonstration content from live project claims. Strategy selection also uses a green badge, but explicitly says “Selected for packet.”

### Cards and drawing sheets

White, bordered containers share the panel radius without ambient shadows. Project cards combine a linked blueprint, title/facts and divided action footer. Drawing sheets add a header, technical identifier, drawing, caption or disclaimer. Padding varies by role: editor panels use (23px), strategy panels (25px), packet summaries (24px), with responsive reductions.

Selected strategies add a teal border and inset top accent, a visible selection label, and an `aria-pressed` action. Selection is not styled as overall compliance.

### Inputs and form states

Labels remain above native number inputs and selects; units are muted within the label. Fields use a white background, border (#b6c8d4), field radius and minimum height (42px). Input padding is in frontmatter; selects reserve extra right padding for their native affordance.

Invalid number fields use `aria-invalid`, a warm border (#ab4b36), near-white warm fill (#fff9f7), and an adjacent issue-colored message. Hints and errors are associated through `aria-describedby`. Native checkboxes use teal and a square size (18px); their enclosing labels provide the clickable checklist row.

Invalid width or depth pauses the drawing with an explanatory empty state instead of displaying substitute dimensions. Storage warnings are visible status banners; the form's save note distinguishes browser persistence from session-only editing. No skeleton/loading pattern or separate custom disabled-input style is established.

### Navigation and accessibility

The desktop sidebar uses subdued light text, a darker-blue hover fill (#1b3b54), and an active fill (#25465c) with white text and a mint icon. `aria-current="page"` identifies the selected destination. Compact-rail names remain in the accessibility tree and appear visually on hover/focus.

Walkthrough “tabs” are ordinary navigation links, not ARIA tab widgets. `aria-current="step"` marks the active link, reinforced by teal text, underline and a filled numbered circle. They retain their sequence on narrow screens.

A visible-on-focus skip link targets the main workspace. Status announcements use a polite live region. Native inputs, links, checkboxes and disclosure elements retain their keyboard semantics.

### Original SVG blueprints

`src\diagrams.mjs` supplies the original deck and bathroom concept drawings. They share a (480 × 355) viewBox, a (20-unit) grid, dimension ticks, technical lettering, illustrative north marker and visible “CONCEPT ONLY / NOT FOR CONSTRUCTION” note. Accessible image labels name the concept and dimensions.

Fine grid/board/dimension strokes sit behind heavier guard or wall outlines. Dimensions use technical monospace lettering. Diagram wrappers scale fluidly to the container, with context-specific height limits.

**The Concept-Not-Certification Rule.** Preserve the drawing's concept label and adjacent limitations: symbolic posts are not engineered spacing, and illustrated fixtures are not a clearance calculation.

## Do's and Don'ts

### Do:
- **Do** preserve the pinned navy, teal, mint and paper palette.
- **Do** keep system typography, visible keyboard focus and labeled native controls.
- **Do** pair check colors with labels and symbols.
- **Do** keep original blueprints and their concept limitations together.
- **Do** retain responsive sidebar names, scrollable steps and drawing-first mobile editing.

### Don't:
- **Don't** portray a satisfied check or selected strategy as permit approval.
- **Don't** substitute decorative concept art for the original working SVG diagrams.
- **Don't** hide invalid dimensions behind a plausible default drawing.

This record does not canonize one-off illustration coordinates, every local metadata size, or unused design primitives. No synthetic tonal ramps, generated comps or quality cards are part of the built system.
