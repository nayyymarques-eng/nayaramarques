# nayaramarques.com: rules for building here

Read this before any change. It is written for AI agents and people alike: every rule has an ID, one line you can pass or fail, and most have a machine check.
Sources of truth, in order: `_ds/…/tokens/*.css` (values) → this file (decisions) → `harness/` (checks). If they disagree, stop and ask Nayara.
The site wears the **sky theme** (approved 2026-09-25): one grained blue sky behind every page, one light and one hue, depth that means where a surface sits. Its rules are in §6.

## 0. Workflow
0. Start: read `PROGRESS.md` (state, what waits on Nayara, next steps) and `DECISIONS.md` (her verdicts; never bring back what they rule out).
1. Before editing: name the rule IDs your change touches.
2. Edit. Reuse tokens and components (§1, §3). Never hand-write a value a token already has.
3. Check: `python3 harness/check.py` (source rules, then every page in headless Chrome at 1400px and 375px; add page names to check only those). Must end with `PASS`. Read the warnings; fix the ones in files you touched. By hand: `harness/check_source.py`, and in the `site` preview `eval(await (await fetch('/harness/check_pages.js')).text())`, which must return `pass` at 1400px and 375px, and once with reduced motion on.
4. Show Nayara the change in the preview. Deploy only when she says so: `/deploy`.
5. A verdict from Nayara goes into `DECISIONS.md` the same day. If a machine can check it, it also becomes a rule here and a check in `harness/`, so she never has to give it twice.
6. End: update `PROGRESS.md` (the three blocks, and the `Updated:` line) before you stop.

## 1. Colour (COL)
- **COL-01** No literal colour in any CSS context: `style`, `style-before`, `style-after`, `style-hover`, `<style>`, CSS strings in x-dc and inline scripts. Use `var(--token)`. `rgba()`, `hsl()`, `oklch()` count as literals; use `color-mix(in srgb, var(--role) N%, transparent)`. *(check_source)*
- **COL-02** Exceptions, and only these: SVG presentation attributes (`fill=`, `stroke=`, var() does not work there, e.g. the star `#c0392b`); the loading screen's placeholder mark (`#e0c3bd` in `#boot`; the rest of the loading screen uses tokens).
- **COL-03** Every page links `tokens/colors.css` before its first `<style>`, followed by `typography.css`, `spacing.css`, `borders.css`, `motion.css`, `base.css`, then `components.css`, and loads `sky.js`. Page `<style>` blocks do not repeat what `base.css` and `motion.css` already set (links, selection, focus ring, body, entrance keyframes, reduced motion). *(check_source)*
- **COL-04** No page redefines a token (primitive, role or alias, in any `tokens/` file). Change it in `tokens/`, and tell Nayara so Claude Design is updated too (`ds-sync`). A component may resolve a role locally (the white-surface block at the end of `colors.css`, `[data-surface]`), never a page. *(check_source)*
- **COL-05** No new colour. If no token fits the job, stop and propose one: name, value, job. Do not approximate.
- **COL-06** Pages use roles, never primitives (`--sky-*`, `--mist-*`, `--slate-*`, `--blue-*`, `--blue-shade-*`, `--peach-*`, `--red-*`, `--green-*`, `--clay-*`, `--graphite-*`, `--coral-*`, `--black`). *(check_source; warning until the aliases go)*
- **COL-07** Pages never use the old alias names listed under the token table. *(check_source; warning until the aliases go)*
- **COL-08** Text passes WCAG AA on its ground: 4.5:1, or 3:1 for large text; arrows and other symbol-only text 3:1. Text on the sky is measured against the sky's darkest point, `--sky-deepest`. *(check_pages)*

Token by job. Pages use role names. The old names (`--paper`, `--ink-*`, `--line-*`, `--rust`, `--text-meta`, `--border-control`, `--size-*`, `--track-*`, `--space-1…18`, `--card-p`, `--surface-band`) remain only as aliases for the Claude Design bundle until it is regenerated on the roles; never write them in new code.

| Job | Token |
|---|---|
| The page, under the sky | `--surface-page` (the sky itself: `--sky-ground`, its darkest point `--sky-deepest`) |
| Card, link card, figure, plan card, accordion (white surfaces) | `--surface-card` |
| Soft or deep recess ground (wells, illustration windows) | `--surface-well` |
| Frosted glass (case details, the home composer) | `--surface-glass` + `--edge-glass` |
| The primary action's fill | `--surface-raised` |
| Hover fill, current menu item, wireframe skeleton bar | `--surface-hover` |
| Note or callout ground (eyebrow in `--accent`) | `--surface-note` |
| A tag's tint | `--surface-tag` |
| The ink band | `--surface-inverse` |
| Wireframe highlight | `--surface-accent-tint` |
| h1 to h3 | `--text-heading` (the softer heading ink) |
| Strong text, labels in ink, text of actions | `--text-strong` |
| Running prose, card prose, tags | `--text-body` |
| Captions, secondary text, nav links, eyebrows, metadata | `--text-muted` |
| Arrows, icons (never text) | `--text-subtle` |
| Text on the ink band | `--text-on-inverse`, prose and dark-mockup text `--text-on-inverse-muted` |
| Accent: eyebrows on cases, links, arrows, ordinals, the Link action | `--accent`; the Link action on hover `--accent-strong` |
| Pale blue, only on ink grounds | `--accent-soft` |
| The nav star and name, the home sticker (nothing else) | `--brand-mark` |
| The one divider: opens a section, between case sections, item rules | `--border-divider` |
| Default rule, list-row separator | `--border` |
| Inner rule, soft chip border | `--border-subtle` |
| (retired, now the one divider) | `--border-strong`, `--border-emphatic` |
| Gained / traded, considered | `--status-gain` / `--status-cost` |
| Focus ring | `--focus-ring` |
| Elevation −2 / −1 / 1 / 2 / 3 | `--elevation-inset-2` / `--elevation-inset-1` / `--elevation-1` / `--elevation-2` / `--elevation-3` (`--shadow-sm/md/lg` are the old names of 1/2/3) |
| The shade under an action | `--elevation-action`, hover `--elevation-action-hover`, on the ink band `--elevation-action-inverse` |
| The home sticker's terminal | `--terminal-surface`, `--terminal-chrome`, `--terminal-dot`, `--terminal-meta`, `--terminal-text`, `--terminal-error`; its shade `--elevation-sticker` |
| Corners | `--radius-sm` 6 (inside a surface) · `--radius-md` 10 (level 1, menus) · `--radius-lg` 14 (wells, level 2) · `--radius-action` 12 · `--radius-full` (tags, dots, discs) |
| Type sizes | `--font-size-2xs` 10 (tags, mockups) · `--font-size-eyebrow` 11 · `xs` 11 · `sm` 14 · `--font-size-action` 15 · `md` 16 · `--font-size-lead` 16–18 (every subtitle, TYP-04) · `lg` 18–20 · `--font-size-h3` 18–20 · `xl` 20–28 · `--font-size-h2` 24–38 · `2xl` 24–44 · `3xl` 34–68 (h1); in illustrations `--font-size-diagram` 9.5, `--font-size-diagram-core` 10.5, `--font-size-diagram-heading` 12.5 |
| Face | `--font-sans` (the system face: SF Pro on Apple), `--font-mono` |
| Leading and tracking | `--leading-none` 1 · `heading` 1.2 · `label` 1.4 · `snug` 1.5 · `small` 1.6 · `body` 1.7 (`display` 0.94, `title` 1.06); `--tracking-display` · `title` · `heading` · `lead` · `label` 0.12em · `eyebrow` 0.14em · `tag` 0.1em · `action` −0.005em |
| Spacing | `--space-3xs` 2 · `2xs` 4 · `xs` 8 · `sm` 12 · `md` 16 · `lg` 20 · `xl` 24 · `2xl` 32 · `3xl` 40 · `4xl` 48 · `5xl` 64; fluid `--space-fluid-s` 12–20 · `m` 20–28 · `l` 24–36 · `xl` 28–44, `--section-y` 36–64, `--section-y-lg` 48–96; `--hero-top` 64–96, `--gap-cards` 12, `--action-h` 44, `--action-px` 20, `--figure-inset` 8, `--section-gap` (only between a landing hero and its first `.section`, SEC-04), `--section-pad` (unused since SEC-04) |
| Motion | `--ease-standard`, `--ease-out`, `--ease-in-out-soft`, `--ease-linear`; `--dur-micro`, `--dur-hover`, `--dur-entrance`, `--dur-ambient-sm/lg`, `--dur-scene` 12s, `--dur-archive`; `--sky-speed` 0.3 |
| Grain | `--texture-grain`, `--texture-grain-size` (in `base.css`) |

## 2. Layout (LAY)
- **LAY-01** Nothing scrolls sideways, at any width. The page wrapper (first `div` after `</helmet>`) carries `overflow-x:clip`. Not on `<main>`, not on `<html>` (browsers treat it as hidden). Wide flows and figures scroll inside their own frame (`contain:inline-size` on the scroller). *(both checks)*
- **LAY-02** Retired: alternating tinted bands. The only full-bleed band is the ink band (`.band-inverse`). See SKY-02. *(check_source)*
- **LAY-03** Retired with the bands: there are no two backgrounds to separate. See SEC-01.
- **LAY-04** Never two lines at one boundary. *(check_pages: SEC-03)*
- **LAY-05** Dividers are in flow, at content width, never edge to edge (SEC-01). Inside `<main>` use `left:0;right:0`; on a full-width section use `left:var(--page-gutter);right:var(--page-gutter)`. Dividers inside a surface (list rows, cards) are plain `1px solid var(--border)`: inside white surfaces the rules come back with real contrast on their own.
- **LAY-05a** The home hero has no line under it. `section#work` carries `data-rule="none"`. The last case row draws no rule under it: the divider above "Where I've built" is the one line at that boundary (2026-09-26). The first case row draws no rule either, also when the scroll reveal runs.
- **LAY-05b** The footer (`Foot.dc.html`) draws an in-flow divider at the gutter, on every page.
- **LAY-06** Mobile (375px): the menu fills the height below the header; figures stack; flows scroll inside their frame; nothing overflows.
- **LAY-07** Case page order: hero (eyebrow `Label · Context · Year`, HERO-01) → case details as glass (Role, Users, Timeframe, Built; `.glass.case-details`, no rule under it) → numbered rail sections `01 — …` to `What this case doesn't cover` → the ink band → the next case in a pressed well (`.well.well--press.well--next` around `NextCase`).
- **LAY-08** Case headings. Big type only names a part the reader can navigate to. (1) Section title: the index lists it; in the body `case-index.js` shows it as `04 The decision`, at `clamp(18px, 1.5vw, 20px)`, weight 600, line height 1.3, tracking −0.01em, 10px above the intro; number in `--accent`, name in `--text-heading`. It is not sticky. (2) Section intro: every rail section opens with `<p data-sec-intro>`, at least two lines, an ordinary paragraph at most 600px wide (`components.css`). (3) Case index: plain text on the sky, no card, no rules, sticky at 80px, its numbers aligned with the nav's star, about 240px wide; the current item in ink with its number in the accent. (4) Sub-section: `<h3 class="subsection">`, a noun phrase with **no number** (numbers belong to the section title only), at `--font-size-subsection` (17px, 16px on phones), weight 600, `--text-heading`, marked by a short accent bar (12 × 2px, `::before` in `components.css`); only when a section has two or more parts, otherwise use a label. *(check_source PAT-02)* (5) Item titles (card titles, including steps and constraints, and row leads): inside their card or row only, 16px (`--font-size-md`), weight 600; in case bodies `--font-size-xl-lead` (and the bundle's `--size-lead`) steps down to `--font-size-md` and DecisionCard's title to 600, set once in `case-index.js`. The hierarchy is strict: section title 20/600 > sub-section 17/600 > item title 16/600 > body 16/400. *(check_pages HIER-01)* (6) Labels: eyebrow size, `--text-muted`, for figures, lists and single parts; never `NN —`, never blue (the note label is the one blue exception). (7) No statement or pull-quote blocks: a section's point is its first body sentence. (8) No eyebrow pair above a figure restating what the figure or its caption says. (9) Retired: pinned title cards, the red section bar, sticky section heads.
- **LAY-09** Case rules and spacing. One line weight between and inside sections: `--border-divider`; list-row separators `--border`. A heading sits close to what it introduces: section title 10px above the intro; sub-section 56px above, 12px below (at least 1.5× more above than below). `case-index.js` applies the spacing; do not hand-set margins around case headings. 

## 3. Components (CMP)
- **CMP-01** Reuse before drawing.
  - Design-system components: `<x-import component-from-global-scope="NayaraSilvaDesignSystem_5f30f3.<Name>">`, with `data-pattern` naming the job (§7). `DecisionCard` (eyebrow, title, body; optional `gained`, `traded`; pass `data-surface="card"` so it is a level-1 card), `ListRow` (marker, title, body; `last="{{ true }}"` on the final row), `NextCase` (title, href, tag; wrap it in `<div class="well well--press well--next">`).
  - Site components (`components.css`): `.action` + `--primary` / `--link` / `--inverse` (with `.action__arrow`), `.eyebrow`, `.tag` (+ `--considered`, `--chosen`), `.badge` (+ `--accent`), `.card`, `.cards`, `.link-card` (+ `__arrow`), `.figure` (+ `--col`, `.figure__caption`), `.well` (+ `--press`, `--next`), `.glass` (+ `--deep`), `.note`, `.illo-window` (+ `--case`, with `.illo-label`, `.illo-ui`, `.illo-cols`/`.illo-col`, `.illo-row`, `.illo-bar`, `.illo-dot`, `.illo-pill`, `.illo-slot`), `.illo-emph`, `.elsewhere` (+ `__path`), `.chip` (+ `--emph`), `.chain`, `.chain-block`, `.steps`, `.step` (+ `--emph`), `.subsection`, `.stats` / `.stat` (the content patterns, §7; approved 2026-09-26; `.cards--2` and `.stages` retired in round 3, PAT-05), `.band-inverse`, `.hero`, `.hero__eyebrow`, `.section`, `.section-head`, `.h2`; the landing template (`.ld-*`, `.plans`/`.plan-card`, `.accordions`/`.accordion`, `.link-cards`; its "Who runs it" block, `.ld-split` + `.ld-portrait`, is also the home's "Who built it") and the B illustration (`.ld-art*`, timing per page).
  - Site components (`*.dc.html`): `Nav`, `Foot`, via `<dc-import name="…">`. Section rails: `<h2 data-rail>`. Scripts: `sky.js` (every page), `case-index.js` (cases), `art.js` (illustrations).
- **CMP-02** Change a component through its props or attributes, never by copying its markup into a page.
- **CMP-03** Nothing fits? Draw it, mark it `<!-- proposal: what it does, components considered, why each was wrong -->`, and tell Nayara. It joins the system only after her verdict.
- **CMP-04** Never edit `_ds/…/_ds_bundle.js`, `_ds_manifest.json` or `readme.md`; they are generated. The files in `tokens/` are the source: change them here, then run `ds-sync`. What the bundle draws itself (DecisionCard's radius, ListRow, NextCase's rules) takes the theme through tokens and props; anything more is a Claude Design follow-up.

## 4. Content (CNT)
- **CNT-01** No prices. Every offer says "Priced on the call". Budget ranges in the `start-a-project` form are allowed. *(check_source)*
- **CNT-02** The name is Nayara Marques. *(check_source)*
- **CNT-03** On AI case and services pages the client is "an AI platform in private capital markets". Add no new "Clade" mentions anywhere. *(check_source)*
- **CNT-04** No em dashes in prose. Allowed only in rail numbers (`01 — Title`) and page titles (`Page — Nayara Marques`). Use commas, colons, full stops, parentheses; ranges read "3 to 6 months". *(check_source, warning)*
- **CNT-05** AI work is dated 2026.
- **CNT-06** Numbers come only from this list: 90% acceptance, 250% response rate, 80% wanted modularization, 44% shorter screen (21,229 → 11,961 characters), about 2,300 tokens saved on that one screen. The Storybook benchmark (27%, 2.76×, 12.8%) is unverified: do not reuse it. Anything else: ask.
- **CNT-07** Voice: restrained, report-like, specific. Sentence case. No hype, no stacked disclaimers. Each case opens with the problem, what I did, the result, and says what it does not cover. Headings and labels say what a section is about, in plain nouns ("Benchmark", "Expected gains"), never a claim or slogan; claims live in the body, next to their evidence.
- **CNT-08** Case titles (keep links consistent): Where AI lives in an institutional investment platform · Specifying an AI composer, frame by frame · A design system AI can build from · Capacity matching for private truck fleets · An advisors platform for four business verticals · Modular card insurance in a banking app.
- **CNT-09** Positioning: the harness work governs AI generation (AI exploring and designing), not production. Services: Build = a design system AI can build with; Audit = is AI following your design system.
- **CNT-10** Don't narrate the design process as if it were news: "made before build", "before any of it was built", "decided before build" state common knowledge. Remove or rephrase minimally, and list the change for Nayara. *(check_source, warning)*
- **CNT-11** New copy that Nayara has not read carries `data-new-copy="<key>"` until she approves it.

## 5. Who decides
Machine alone: running checks; swapping a literal for a token of the identical value; fixing a finding with one known right answer.
Machine, showing its work: a nearest-token suggestion (say the distance); a layout fix (say what moves).
Nayara: new tokens (new role names included); merging values that differ; any copy change; anything visible that no rule settles. Ask with the options and a recommendation.

## 6. The sky theme
### Depth (DEP): depth says where a surface sits, never how important it is
| Level | Name | For | Radius | Shade |
|---|---|---|---|---|
| −2 | Deep recess | windows you look into: illustration windows (`.illo-window`), the home composer (`.glass--deep`) | lg | `--elevation-inset-2` |
| −1 | Soft recess | notes (`.note`), the case details glass, the next case (`.well`) | md / lg | `--elevation-inset-1` |
| 0 | Flat | text, titles, rules, tags, the ink band, the sky | none, or pill for tags | none |
| 1 | Resting | cards, link cards, accordions, DecisionCards, steps and chips | md (sm inside a surface) | `--elevation-1` |
| 2 | Raised | evidence: figures, plan cards, a hovered link card | lg | `--elevation-2` |
| 3 | Floating | the sticky header, menus | md | `--elevation-3` |
- **DEP-01** Frame −1 or −2, story 0, evidence +2. Titles and text never cast a shadow. No other variants.
- **DEP-02** Siblings share one level: every card in a group is level 1.
- **DEP-03** A surface inside a surface is flat, with the small radius. Only a window (−2) holds level-1 product UI.
- **DEP-04** Every shade uses one hue (`--blue-shade-*`) and one light, from above. Higher is softer and wider, never darker.
- **DEP-05** On the sky, rules fade and depth does the work. Inside a white surface, lines come back with real contrast (the scoped block at the end of `colors.css`; use `data-surface` or the component classes).

### Shape (SHP)
- **SHP-01** Architecture is straight, objects are round. Full-width bands (the ink band) keep straight edges. Corners belong to objects in the content: 6, then 10, then 14; the inner radius is the outer minus the padding.
- **SHP-02** Labels are pills (tags, badges); actions are 12px, so the two are never confused. A circle is for a disc or a core, never for a photo of a person.

### Actions (ACT)
- **ACT-01** Exactly three variants, identical geometry (12px radius, 44px tall, 20px side padding, 15px, weight 500, sentence case): **Primary** (a raised light surface, ink text, a soft shade below; hover lifts), **Link** (accent text, no fill, an arrow that moves 3px on hover), **Inverse** (paper fill, ink text, on the ink band). Uppercase is for labels and eyebrows only, never an action. *(check_source, check_pages)*
- **ACT-02** One filled action per view, then links. *(check_pages; check_source warns at more than one primary per page)*

### Illustrations (ILL)
- **ILL-01** An illustration shows a mechanism with states: pending (quiet line), passing (the accent dot), done (marked in the accent). Marks persist; it ends resolved and holds about 3s; it resets softly (a fade, never a reverse). Motion travels only along the drawn structure. A 10 to 12s scene; travel linear, marks and fades `--ease-in-out-soft`. Loops pause off screen (`art.js`). Continuous emission (variant O) is the one exception.
- **ILL-02** All text inside an illustration is the label style: uppercase, 600, 0.14em, `--font-size-diagram` (the result word `--font-size-diagram-core` at 700; a column heading `--font-size-diagram-heading`). At most about 400px wide in a hero.
- **ILL-03** Reduced motion shows the resolved state, still.
- **ILL-04** A dark block inside an illustration is softened to a raised light surface (`.illo-emph`); emphasis by depth, not darkness. A separate place you leave your work to reach is `.elsewhere` (dashed outline, light).
- **ILL-05** One line weight inside illustrations and figures: `--stroke-diagram` (1px) for rules, outlines, connectors and dashed paths. Icons keep their own stroke; marker bars (the 2px accent edge) are not lines. Skeleton bars stand for text: flat and square, no radius. Surfaces inside a window or a figure's picture take `--radius-sm`; product UI inside `[data-mock]` keeps the product's radius (on the scale).
- **ILL-06** The case-card windows (home, Work) are drawn at real size, never scaled, at most 480px wide, shown from 900px up (below that the cell is too narrow and the card stands alone; `.illo-window--case` and its parts in `components.css`). They hold no title row restating the card and no sentence-case line: every word is a label; product UI inside is `[data-mock]`. *(check_pages ILL-02: text in `svg`, `[data-illo]`, `.illo-window` is the label style as rendered; uppercase labels in a figure's picture too; `[data-mock]` exempt)*
- **ILL-07** A case window (home, Work) tells the case's one main idea as a change read left to right (`.illo-ba`): the side before is quiet (outlines, muted labels, no shade, no accent), an arrow, then the side after carries the raised UI, the one accent and the core label. At most 8 labels outside product UI (`[data-mock]`); the idea should read before any word is read. *(check_pages ILL-07; approved by Nayara 2026-09-26)*

### Flows (FLW)
- **FLW-01** Flows read horizontally, left to right; compared flows share one column grid, so the same moment lines up. On a phone a flow scrolls inside its frame.
- **FLW-02** A considered option is labelled with its reason (`.tag--considered`, "Considered · reason"), never struck through; the decided one is labelled Chosen (`.tag--chosen`). *(check_source, warning; product mockups showing a deletion are excepted)*

### Sky (SKY)
- **SKY-01** One sky behind every page (`sky.js`, `[data-sky]` in `base.css`): the far plane is one continuous gradient moving at `--sky-speed` of the scroll; the grain lives on the sky, the ink band, wells and notes; white surfaces stay clean. Under reduced motion it does not move with the scroll. *(check_source: every page loads sky.js; check_pages: MOT-01)*
- **SKY-02** No page or section paints its own ground: the body is transparent, no tinted bands, no page-coloured bleed, no painted hero backdrop. Only the ink band is full bleed. *(check_source, check_pages)*
- **SKY-03** The sky's depth stays light enough that muted text, the accent and tags pass AA at its darkest point; `--sky-deepest` records it, measured from a render. Change the gradient, re-measure.

### Sections (SEC)
- **SEC-01** A divider opens every section: an in-flow 1px `--border-divider` at content width, never edge to edge. *(check_source, check_pages)*
- **SEC-02** A section's subtitle sits below its heading, never beside it (a real side-by-side comparison is the one exception).
- **SEC-03** Never two lines at one boundary. *(check_pages)*
- **SEC-04** Every top-level section has the same space above and below its content: `--section-y` (36 to 64px), on every page. Above: from the line that opens the section (its divider, or the bottom of the case details glass) to the first content box. Below: from the last content box to the next line or edge (the next divider, the top of the ink band, the next-case well, the footer divider). Content box means the first and last visible box: text, an image, a surface, a bordered row; never a margin. So last children carry no trailing margin or padding, and a list's last row gives its bottom padding to the section. Built by `.section` (the divider on its first child, `--section-y` on both sides), by case rail sections (`padding-top` and `padding-bottom` `--section-y`) and by page sections with `padding-block: var(--section-y)`. The larger `--section-y-lg` is allowed only under a hero and inside the ink band, never on a content section. These keep their own rules: heroes (HERO-01, HERO-02; the space under a hero is the hero's, a landing hero followed by `.section` keeps `--section-gap`, the home hero has no line under it); the ink band (its inner padding `--section-y-lg` or `.ld-band__grid`, no margin: the section above gives the space); the footer (its own equal padding, `--space-2xl`). The next-case well takes `--section-y` below it, and above it only after the ink band. *(check_pages: within 2px, at 1400px and 375px, so equal and the same on every page)*
- **SEC-05** One column grid. Content width: `--page-max` (1400) less `--page-gutter` (32) on each side, 1336px at most. Every section's content starts on the gutter. On a wide case page (861px and up) the body starts on column 2 of the case details' four-column grid (`--case-gap` between columns; `case-index.js` puts the index in column 1); on a phone, on the gutter. A block in two parts splits into equal halves with the case rows' gap (`repeat(2, minmax(0, 1fr))`, `--space-fluid-xl`: the home case rows and `.ld-split`), so the text of "Who built it" starts where the case illustrations start. Nothing is inset from the column or centred in it (the portrait starts on the gutter) unless it sits inside a surface (card, figure, well, glass, note), which insets by its own padding. *(check_pages: the section's leftmost content box within 1px of the gutter, or of the case body column)*

### Hero (HERO)
- **HERO-01** One hero anatomy on every page: nav, then `--hero-top`, then the eyebrow (`.hero__eyebrow`, one line tall; on a phone it grows upwards into the gap), then 16px, then the h1. The title sits at the same height on every page and never moves between pages. Heroes are never centred vertically; landing heroes align to the top. *(check_source: the first section in main is `.hero`; check_pages: the h1 sits on the hero line within 2px at 1400px and 375px)*
- **HERO-02** The home is the one exception: its hero fills the first screen (`min(calc(100vh - var(--nav-h)), 860px)`) with the intro and the chat centred vertically. *(check_pages skips it)*

### Type (TYP)
- **TYP-01** One eyebrow size: `--font-size-eyebrow` (11px, 600, 0.14em, uppercase), never inflated by a surrounding style. Labels under 11px exist only inside illustrations, product mockups, tags and badges. *(check_pages)*
- **TYP-02** The system face (`--font-sans`); no web fonts.
- **TYP-03** h1 to h3 take `--text-heading`; size and weight carry the hierarchy. Headings on the ink band take `--text-on-inverse`.
- **TYP-04** One size per heading level, one size for every subtitle (Nayara, round 5, 2026-09-27). h1 `--font-size-3xl` (the home's name is HERO-02's exception); every h2 `--font-size-h2` (section headings, the ink band's headline, the next case's title); every h3 `--font-size-h3` (plan, layer and link-card titles, About's roles), weight 500. Every subtitle is the lead, `--font-size-lead` (18px from 1400px, 16px on phones), 400, `--leading-snug`, `--tracking-lead`: the hero lede under a page title, a section head's subtitle, the ink band's subtitle, About's intro and its "How I work" line. Case bodies keep their own scale (LAY-08: section title 20 > sub-section 17 > item 16). Labels are eyebrows, not headings. Keep subtitles short: two or three lines. *(check_pages TYP-04)*

### Cards (CRD)
- **CRD-01** Cards are white, level 1, md radius, no border, equal padding on every side (the title starts at the padding). Grouped cards stand 12px apart (`--gap-cards`), never on a filled gutter. On case pages they are stacked: one per row, full content width, never side by side (PAT-05, Nayara 2026-09-26); the landing template keeps its plan cards and link cards side by side. *(check_source: no hairline grid, PAT-05; check_pages PAT-05)*
- **CRD-02** A link card is a card you pick up: on hover it rises to level 2 and its arrow moves 3px; it never changes colour. The label inside (Email, LinkedIn) is enough; no section label above that restates it.
- **CRD-03** A figure is one white surface at level 2: the picture inset 8px (radius sm), the caption on the same card at 15px/1.5 with the bold lead in ink. One per row when it is evidence. No tinted caption boxes.
- **CRD-04** A well is content width, lg radius, one step deeper, an inner shade, no rules around it. The next-case well deepens on hover.

### Motion (MOT)
- **MOT-01** Reduced motion removes every loop, travel and parallax; illustrations show their resolved state; the chat shows its thread, still. *(check_pages, with reduced motion on)*
- **MOT-02** Animate `transform` and `opacity` only on loops. Entrances are one-off, 400 to 600ms, `--ease-out`. The home sticker is the one exception (MOT-03).
- **MOT-03** The home sticker is stiff and digital: it moves with the cursor, with no trail, tilt, bob or spring; it enters in four discrete beats (`steps(4)`, 400ms, revealed top to bottom like a terminal printing its lines) and leaves at once. Reduced motion: it appears at once. Its line reads "Sorry, it isn't built." / "I can build yours." on two lines. *(by eye; 2026-09-26)*

### Retired (RET): do not reintroduce
| Old | Now |
|---|---|
| Alternating tinted bands with a rule on top | One sky; sections separated by space and the one divider |
| Hairline grid: flat tiles on a 1px filled gutter | Cards or link cards, 12px apart |
| Square outlined tags | Flat, tinted, round tags |
| Uppercase, letter-spaced buttons; outline secondary buttons | The three variants; the secondary is a Link |
| Red arrows and ordinals | The accent; red is only the nav star and name (RET-01, check_source) |
| Illustrations dimmed to 50% | Illustration windows at full strength (RET-02, check_source) |
| Dashed frames around figures | A figure as one surface (RET-03, check_source warning) |
| A label restating what the content says ("Direct") | Nothing |
| A page or hero painting its own backdrop | The one sky |
| The dark emphatic rule | The one light divider |
| Struck-through considered options | Considered · reason / Chosen tags |
| Pinned title cards, the red section bar, sticky section heads | The section title and its intro, in the body |
| Cards two to a row (`.cards--2`), horizontal step boxes (`.stages`), constraint and outcome rows | Stacked cards, one per row (PAT-05, 2026-09-26) |
| "What this case doesn't cover" in the same look as the content | The inactive gap row (PAT-07, 2026-09-26) |
| A trailing, tilting, soft-fading home sticker | Stiff, with a stepped entrance (MOT-03) |

## 7. Content patterns (PAT) and numbers (NUM)
Every block of content on a case page (and on about) does one job, and each job has one structure. Name the job on the element as `data-pattern="<job>"`; the structure follows from it. Before drawing a list, a card or a number, find its job in this table. A job that is not here is a proposal (CMP-03). *(Approved by Nayara 2026-09-26: the jobs, `.stats`, `.subsection`, `data-pattern` on ListRow and DecisionCard, the labels Scope and Results, and `--font-size-subsection`. Round 3, same day: every card job is stacked, and constraints, steps and outcomes joined the cards, so a reader scanning fast meets one structure; gaps are inactive rows.)*

| Job | What it holds | Structure | Marker | Component |
|---|---|---|---|---|
| Problem | a pain the work answers | stacked card | letter in the eyebrow (`Problem A`), because decisions cite it | `DecisionCard data-pattern="problem"` in `.cards` |
| Constraint | a limit the work ran under | stacked card | letter in the eyebrow (`Constraint A`), because decisions cite it | `DecisionCard data-pattern="constraint" eyebrow="Constraint A"` in `.cards` |
| Step | a stage in a sequence in time | stacked card | ordinal in the eyebrow, in the accent (`01`, or `Phase 1`): order matters | `DecisionCard data-pattern="step" eyebrow="01"` in `.cards` |
| Decision | a choice, with what it gained and what it traded | stacked card | `Decision 01` in the order taken | `DecisionCard data-pattern="decision"` (gained, traded) in `.cards` |
| Feature | a part of what was built and what it does | stacked card | none (a one-word eyebrow may name it) | `DecisionCard data-pattern="feature"` in `.cards` |
| Term | a name the reader needs, and what it means (a mode, a vertical) | stacked card; bare names with no body are tags | none | `DecisionCard data-pattern="term"` in `.cards`, or `.tags data-pattern="term"` |
| Outcome | a change the work made or is expected to make, in words | stacked card | none | `DecisionCard data-pattern="outcome"` in `.cards` |
| Lesson | a thought taken forward | stacked card | eyebrow `On the product` / `On the practice` | `DecisionCard data-pattern="lesson"` in `.cards` |
| Finding | an observed fact from research, an audit or a survey | row | none; a count, when there is one, is the lead (`6 of 6`, `90%`, `10`); bare labels with no body are tags (`ul.tags`) | `ListRow data-pattern="finding"` |
| Principle | a rule agreed up front, a way of working | stacked card | none | `DecisionCard data-pattern="principle"` (about: hand-built rows with evidence links, until DecisionCard can carry a links line) |
| Reference | a source or a benchmark the work drew on | row | none | `ListRow data-pattern="reference"` |
| Gap | what the case does not cover, and why | inactive row | a hollow muted dot | `ListRow data-pattern="gap"`, only in "What this case doesn't cover" |
| Result | a measured outcome | big number and caption | the number itself | `.stats data-pattern="result"`, label starts "Result" |
| Scope | a count of what exists, not an outcome | big number and caption | the number itself | `.stats data-pattern="scope"`, label starts "Scope" |
| Note | an aside beside the story | soft recess | `Note ·` label | `.note` |
| Evidence | a picture, a table, a flow | figure, level 2 | caption with a bold lead | `.figure`, flows `.fh` / `.chain` |
| Action | what the reader can do next | action, link card, the next case | arrow | `.action`, `.link-card`, `NextCase` |

- **PAT-01** Every `ListRow`, `DecisionCard`, `.stats` and `.tags` on a case page carries a `data-pattern` from the table, and the job matches the structure: card jobs are DecisionCards, row jobs are ListRows. Same job, same structure, on every page. *(check_source)*
- **PAT-02** Sub-sections carry no number (`5.2`); numbers belong to the section title. *(check_source, check_pages HIER-01)*
- **PAT-03** A marker only when it means something, and a card's marker is its eyebrow: `Problem A`, `Constraint A`, `Decision 01`, a step's `01` or `Phase 1`. Rows carry no marker; no ordinals on parallel items. *(check_source)*
- **PAT-04** Big numbers (24px and up, a bare figure) appear only in `.stats`, as a Result or a Scope count, and the block's label says which (its `.eyebrow`, or the sub-section right above it, starts with "Result" or "Scope"). A number that is a finding is a finding row. *(check_source, check_pages)*
- **PAT-05** Cards are stacked: one card per row, full content width, 12px apart, for every card job (problem, constraint, step, decision, feature, term, outcome, lesson). A reader scanning fast meets one structure. Rows stay for findings, principles and references, lists read top to bottom where a card would be heavier than the fact it holds. A card never holds a single sentence with no title. `.cards--2` and `.stages` are retired. *(check_source, check_pages)*
- **PAT-06** Cards share one look: level 1, the eyebrow, the title 16/600, the body; decisions add Gained / Traded away; a step's ordinal is in the accent. Rows share one look: the lead on its own line (16/600, ink), the body under it, a `--border` rule between rows.
- **PAT-07** "What this case doesn't cover" is inactive on every case: known, but off topic. Its rows are `ListRow data-pattern="gap"` and nothing else, and gap rows appear nowhere else. The style lives once in `components.css`: the lead in body ink at 500, the text in `--text-muted` (AA on the sky), a hollow muted dot as the marker, a dashed rule, no surface, no elevation. *(check_source, check_pages)*

### Numbers (NUM): what each numeric display means
| Display | Means | Allowed |
|---|---|---|
| `04 The decision` | a section's place in the case | section titles and the case index only |
| `5.2` | (retired) | nowhere (PAT-02) |
| `01` `02` on a step | order in time | a step card's eyebrow, flows (`.fh-n`), lifecycle figures |
| `Decision 01` | a decision, in the order taken; cited elsewhere | DecisionCard eyebrows |
| `A` `B` (`Problem A`, `Constraint D`) | a name to cite, not an order | problem and constraint card eyebrows only |
| `48` big, with a caption | a Scope count: what exists | `.stats data-pattern="scope"` |
| `+250%`, `90%`, `4 → 1` big | a Result: measured | `.stats data-pattern="result"`; values only from CNT-06 or already on the page |
| `6 of 6`, `90%` as a row lead | a Finding: how many sources say so | finding rows |
| numbers in a sentence | a fact in prose | anywhere; values follow CNT-06 |
| `4 of 18`, `R$ 11,90`, a counter | part of a product mockup | inside `[data-mock]`, figures and illustrations only |
- **NUM-01** Never change a number's value or add a number that is not already in the case (CNT-06). Moving a number to the structure its job needs is allowed and listed for Nayara.
- **NUM-02** A Scope count never sits next to a Result without its label: a reader must never take a count of what exists for an outcome.
