# nayaramarques.com: rules for building here

Read this before any change. It is written for AI agents and people alike: every rule has an ID, one line you can pass or fail, and most have a machine check.
Sources of truth, in order: `_ds/…/tokens/*.css` (values) → this file (decisions) → `harness/` (checks). If they disagree, stop and ask Nayara.

## 0. Workflow
1. Before editing: name the rule IDs your change touches.
2. Edit. Reuse tokens and components (§1, §3). Never hand-write a value a token already has.
3. Check source: `python3 harness/check_source.py`. Must end with `0 failure(s)`. Read warnings; fix the ones in files you touched.
4. Check rendered pages: start the `site` preview (`.claude/launch.json`, port 8787), open each changed page, run
   `eval(await (await fetch('/harness/check_pages.js')).text())`. Must return `pass`. Also look at it at 375px wide.
5. Show Nayara the change in the preview. Deploy only when she says so: `/deploy`.

## 1. Colour (COL)
- **COL-01** No literal colour in any CSS context: `style`, `style-before`, `style-after`, `style-hover`, `<style>`, CSS strings in x-dc and inline scripts. Use `var(--token)`. `rgba()`, `hsl()`, `oklch()` count as literals; use `color-mix(in srgb, var(--role) N%, transparent)`. *(check_source)*
- **COL-02** Exceptions, and only these: SVG presentation attributes (`fill=`, `stroke=`, var() does not work there); the loading screen's placeholder mark and skeleton (`#e0c3bd`, `#e4e2dc` in `#boot` / `boot-style`; its page and text colours use tokens); the recreated bank-app screen in `card-insurance.html` (`#cccccc`, `#c4c4c4`).
- **COL-03** Every page links `tokens/colors.css` before its first `<style>`, followed by `typography.css`, `spacing.css`, `borders.css` and `motion.css`. *(check_source)*
- **COL-04** No page redefines a token (primitive, role or alias, in any `tokens/` file). Change it in `tokens/`, and tell Nayara so Claude Design is updated too (`ds-sync`). *(check_source)*
- **COL-05** No new colour. If no token fits the job, stop and propose one: name, value, job. Do not approximate.
- **COL-06** Pages use roles, never primitives (`--sand-*`, `--slate-*`, `--blue-*`, `--red-*`, `--green-*`, `--clay-*`). *(check_source; warning until the aliases go)*
- **COL-07** Pages never use the old alias names listed under the token table. *(check_source; warning until the aliases go)*
- **COL-08** Text passes WCAG AA on its ground: 4.5:1, or 3:1 for large text. *(check_pages; warning until the consolidation's B-2 and B-14 land)*

Token by job. Pages use role names. The old names (`--paper`, `--ink-*`, `--line-*`, `--rust`, `--text-meta`, `--border-control`, `--size-*`, `--track-*`, `--space-1…18`, `--card-p`) remain only as aliases for the Claude Design bundle until it is regenerated on the roles; never write them in new code.

| Job | Token |
|---|---|
| Page background | `--surface-page` |
| Alternate band | `--surface-band` |
| Hover fill, current menu item, wireframe skeleton bar | `--surface-hover` |
| Card or tile (never a page) | `--surface-card` |
| Dark band, solid button | `--surface-inverse` |
| Note or callout ground on paper (eyebrow in `--accent`) | `--surface-note` |
| Wireframe highlight | `--surface-accent-tint` |
| Headings, strong text | `--text-strong` |
| Running prose, card prose | `--text-body` |
| Captions, secondary text, nav links, eyebrows, metadata | `--text-muted` |
| Arrows, icons (never text) | `--text-subtle` |
| Text on the dark band | `--text-on-inverse`, prose `--text-on-inverse-muted` |
| Text in a dark mockup | `--text-on-inverse-mock` |
| Accent: case eyebrows, link hover, highlights, arrows, ordinals | `--accent` |
| Pale blue, only on ink grounds | `--accent-soft` |
| Nav mark only (never arrows or ordinals) | `--brand-mark` |
| Inner rule in a white card, soft chip border | `--border-subtle` |
| Section border, default rule, card border, control and pill border, grid gutter | `--border` |
| Item rule inside a section (steps, stats, sub-sections) | `--border-strong` |
| Emphatic rule that opens a block; the divider between case sections | `--border-emphatic` |
| Gained / traded labels | `--status-gain` / `--status-cost` |
| Focus ring | `--focus-ring` |
| Elevation: small (mock tiles), medium (floating cards), large (menus, popovers) | `--shadow-sm` / `--shadow-md` / `--shadow-lg` |
| Corners: site controls / mockup surfaces / dots and pills | `--radius-sm` / `--radius-md` / `--radius-full` |
| Type sizes | `--font-size-2xs` 10 · `xs` 11 · `sm` 14 · `md` 16 · `lg` 20 · `xl-lead` · `xl` · `2xl` · `2xl-cta` · `3xl` |
| Spacing | `--space-3xs` 2 · `2xs` 4 · `xs` 8 · `sm` 12 · `md` 16 · `lg` 20 · `xl` 24 · `2xl` 32 · `3xl` 40 · `4xl` 48 · `5xl` 64; fluid `--space-fluid-s/m/l/xl`, `--section-y` |
| Wireframe figure ground | `--surface-page` |
| Wireframe marker dot | `--border` |

## 2. Layout (LAY)
- **LAY-01** Nothing scrolls sideways, at any width. The page wrapper (first `div` after `</helmet>`) carries `overflow-x:clip`. Not on `<main>` (it cuts the bands), not on `<html>` (browsers treat it as hidden). *(both checks)*
- **LAY-02** A full-bleed band is `background:var(--surface-page|--surface-band);box-shadow:0 0 0 100vmax <same>;clip-path:inset(0 -100vmax)`. Bands alternate `--surface-page` / `--surface-band`. Never `border-top`/`border-bottom` on a band. *(check_source)*
- **LAY-03** Where two sections with **different** backgrounds meet there is exactly one line, and it runs edge to edge: add `position:relative` and `style-before="content:'';position:absolute;top:0;left:-100vmax;right:-100vmax;height:1px;background:var(--border)"` (`style-after` with `bottom:0` for a bottom line). *(check_pages)*
- **LAY-04** Never two lines at one boundary. If the section above has a bottom line, the one below has no top line. *(check_pages)*
- **LAY-05** Two sections with the **same** background read as one section: the divider between them is an in-flow divider at content width, never edge to edge. On a band inside `<main>` use `left:0;right:0`; on a full-width section use `left:32px;right:32px` (the gutter). Dividers inside a section (list rows, cards, figure frames) are plain `1px solid var(--border)` borders. *(check_pages: LAY-06 flags an edge-to-edge line between same backgrounds)*
- **LAY-05a** The home hero never has a line under it. `section#work` carries `data-rule="none"`, which tells check_pages the gap is intended.
- **LAY-05b** The footer (`Foot.dc.html`) draws an in-flow divider, because it usually follows a section of its own background. A page where it follows a different background extends it in its own `<style>` (see `work.html`).
- **LAY-06** Mobile (375px): the menu fills the height below the header; figures stack; nothing overflows.
- **LAY-07** Case page order: hero (eyebrow `Label · Context · Year`) → details band (Role, Users, Timeframe, Built) → numbered rail sections `01 — …` to `What this case doesn't cover` → dark call to action → `NextCase`.
- **LAY-08** Case headings. Big type only names a part the reader can navigate to, and the section title is the largest. (1) Section title: the index lists it; in the body `case-index.js` shows it as `04 The decision` at `--font-size-xl`, number in `--accent`, name in `--text-strong` (on phones the sticky rail shows it instead). Only sections use `NN`. (2) Sub-section: `<h3>` at `--font-size-lg`, weight 500, a noun phrase with a nested number in `--text-muted` (`5.2 Field and send`); only when a section has two or more parts, otherwise use a label. (3) Card titles: inside their card only (the card is the claim); in case bodies `--font-size-xl-lead` (and the bundle's `--size-lead`) steps down to `--font-size-lg`, set once in `case-index.js`. (4) Labels: eyebrow size, `--text-muted`, for figures, lists and single parts; never `NN —`, never blue (the note label is the one blue exception). (5) No statement or pull-quote blocks: a section's point is its first body sentence.
- **LAY-09** Case rules and spacing. Three line weights: section divider `--border-emphatic` (darkest), item or sub-section rule `--border-strong`, list-row separator `--border`. A heading sits close to what it introduces: section title 16px above its first line; sub-section 56px above, 12px below (at least 1.5× more above than below). `case-index.js` applies the spacing; do not hand-set margins around case headings.

## 3. Components (CMP)
- **CMP-01** Reuse before drawing. Design-system components: `<x-import component-from-global-scope="NayaraSilvaDesignSystem_5f30f3.<Name>">`
  - `DecisionCard`: eyebrow, title, body; optional `gained`, `traded`. Cards in 2-column grids.
  - `ListRow`: marker, title, body; `last="{{ true }}"` on the final row.
  - `NextCase`: title, href, tag. Extra attributes pass through to its `<section>`.
  Site components: `Nav` and `Foot` (`*.dc.html`), via `<dc-import name="…">`. Section rails: `<h2 data-rail>`.
- **CMP-02** Change a component through its props or attributes, never by copying its markup into a page.
- **CMP-03** Nothing fits? Draw it, mark it `<!-- proposal: what it does, components considered, why each was wrong -->`, and tell Nayara. It joins the system only after her verdict.
- **CMP-04** Never edit `_ds/…/_ds_bundle.js`, `_ds_manifest.json` or `readme.md`; they are generated. The files in `tokens/` are the source: change them here, then run `ds-sync`.

## 4. Content (CNT)
- **CNT-01** No prices. Every offer says "Priced on the call". Budget ranges in the `start-a-project` form are allowed. *(check_source)*
- **CNT-02** The name is Nayara Marques. *(check_source)*
- **CNT-03** On AI case and services pages the client is "an AI platform in private capital markets". Add no new "Clade" mentions anywhere. *(check_source)*
- **CNT-04** No em dashes in prose. Allowed only in rail numbers (`01 — Title`) and page titles (`Page — Nayara Marques`). Use commas, colons, full stops, parentheses; ranges read "3 to 6 months". *(check_source, warning)*
- **CNT-05** AI work is dated 2026.
- **CNT-06** Numbers come only from this list: 90% acceptance, 250% response rate, 80% wanted modularization, 44% shorter screen (21,229 → 11,961 characters). The Storybook benchmark (27%, 2.76×, 12.8%) is unverified: do not reuse it. Anything else: ask.
- **CNT-07** Voice: restrained, report-like, specific. Sentence case. No hype, no stacked disclaimers. Each case opens with the problem, what I did, the result, and says what it does not cover. Headings and labels say what a section is about, in plain nouns ("Benchmark", "Expected gains"), never a claim or slogan; claims live in the body, next to their evidence.
- **CNT-08** Case titles (keep links consistent): Where AI lives in an institutional investment platform · Specifying an AI composer, frame by frame · A design system AI can build from · Capacity matching for private truck fleets · An advisors platform for four business verticals · Modular card insurance in a banking app.
- **CNT-09** Positioning: the harness work governs AI generation (AI exploring and designing), not production. Services: Build = a design system AI can build with; Audit = is AI following your design system.

## 5. Who decides
Machine alone: running checks; swapping a literal for a token of the identical value; fixing a finding with one known right answer.
Machine, showing its work: a nearest-token suggestion (say the distance); a layout fix (say what moves).
Nayara: new tokens (new role names included); merging values that differ; any copy change; anything visible that no rule settles. Ask with the options and a recommendation.
