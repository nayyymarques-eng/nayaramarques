# nayaramarques.com: rules for building here

Read this before any change. It is written for AI agents and people alike: every rule has an ID, one line you can pass or fail, and most have a machine check.
Sources of truth, in order: `_ds/…/tokens/colors.css` (values) → this file (decisions) → `harness/` (checks). If they disagree, stop and ask Nayara.

## 0. Workflow
1. Before editing: name the rule IDs your change touches.
2. Edit. Reuse tokens and components (§1, §3). Never hand-write a value a token already has.
3. Check source: `python3 harness/check_source.py`. Must end with `0 failure(s)`. Read warnings; fix the ones in files you touched.
4. Check rendered pages: start the `site` preview (`.claude/launch.json`, port 8787), open each changed page, run
   `eval(await (await fetch('/harness/check_pages.js')).text())`. Must return `pass`. Also look at it at 375px wide.
5. Show Nayara the change in the preview. Deploy only when she says so: `/deploy`.

## 1. Colour (COL)
- **COL-01** No literal colour in any CSS context: `style`, `style-before`, `style-after`, `style-hover`, `<style>`, CSS strings in x-dc scripts. Use `var(--token)`. *(check_source)*
- **COL-02** Exceptions, and only these: SVG presentation attributes (`fill=`, `stroke=`, var() does not work there); the loading screen (`boot-style`, `#boot`); the recreated bank-app screen in `card-insurance.html` (`#cccccc`, `#c4c4c4`).
- **COL-03** Every page links `tokens/colors.css` before its first `<style>`. *(check_source)*
- **COL-04** No page redefines a token. Change `tokens/colors.css`, and tell Nayara so Claude Design is updated too. *(check_source)*
- **COL-05** No new colour. If no token fits the job, stop and propose one: name, value, job. Do not approximate.

Token by job:

| Job | Token |
|---|---|
| Page background | `--paper` |
| Alternate band | `--paper-2` |
| Soft fill, hover fill, current menu item | `--paper-3` |
| Card or tile (never a page) | `--white` |
| Headings, strong text, solid buttons, dark band | `--ink` |
| Running prose | `--ink-2` |
| Card prose | `--ink-3` |
| Captions, secondary text, nav links | `--ink-4` |
| Eyebrows, metadata | `--ink-6` |
| Arrows, mono labels | `--ink-7` |
| Text on the dark band | `--on-ink`, prose `--on-ink-muted` |
| Accent: eyebrows on cases, link hover, highlights | `--rust` (`--rust-hover` for hover on index pages) |
| Pale blue, only on ink grounds | `--baby` |
| Nav mark only | `--red` |
| Section border, default rule, card border | `--line` |
| Grid gutter behind joined cards | `--line-2` |
| Control / pill border | `--line-3` |
| Inner rule in a white card, soft chip border | `--line-4` |
| Emphatic rule that opens a block | `--line-ink` |
| Gained / traded labels | `--gained` / `--traded` |
| Wireframe skeleton bar | `--paper-2` (border `--line-4`); darker bar `--line` |
| Wireframe figure ground | `--paper` |
| Wireframe marker dot | `--line-3` |
| Wireframe highlight | `color-mix(in srgb, var(--rust) 12%, var(--white))` |

## 2. Layout (LAY)
- **LAY-01** Nothing scrolls sideways, at any width. The page wrapper (first `div` after `</helmet>`) carries `overflow-x:clip`. Not on `<main>` (it cuts the bands), not on `<html>` (browsers treat it as hidden). *(both checks)*
- **LAY-02** A full-bleed band is `background:var(--paper|--paper-2);box-shadow:0 0 0 100vmax <same>;clip-path:inset(0 -100vmax)`. Bands alternate `--paper` / `--paper-2`. Never `border-top`/`border-bottom` on a band. *(check_source)*
- **LAY-03** Where two light sections meet there is exactly one line, and it runs edge to edge: add `position:relative` and `style-before="content:'';position:absolute;top:0;left:-100vmax;right:-100vmax;height:1px;background:var(--line)"` (`style-after` with `bottom:0` for a bottom line). *(check_pages)*
- **LAY-04** Never two lines at one boundary. If the section above has a bottom line, the one below has no top line. *(check_pages)*
- **LAY-05** Dividers inside a section (list rows, cards, figure frames) stay at content width: a plain `1px solid var(--line)` border.
- **LAY-06** Mobile (375px): the menu fills the height below the header; figures stack; nothing overflows.
- **LAY-07** Case page order: hero (eyebrow `Label · Context · Year`) → details band (Role, Users, Timeframe, Built) → numbered rail sections `01 — …` to `What this case doesn't cover` → dark call to action → `NextCase`.

## 3. Components (CMP)
- **CMP-01** Reuse before drawing. Design-system components: `<x-import component-from-global-scope="NayaraSilvaDesignSystem_5f30f3.<Name>">`
  - `DecisionCard`: eyebrow, title, body; optional `gained`, `traded`. Cards in 2-column grids.
  - `ListRow`: marker, title, body; `last="{{ true }}"` on the final row.
  - `NextCase`: title, href, tag. Extra attributes pass through to its `<section>`.
  Site components: `Nav`, `Foot` and the other `*.dc.html` files, via `<dc-import name="…">`. Section rails: `<h2 data-rail>`.
- **CMP-02** Change a component through its props or attributes, never by copying its markup into a page.
- **CMP-03** Nothing fits? Draw it, mark it `<!-- proposal: what it does, components considered, why each was wrong -->`, and tell Nayara. It joins the system only after her verdict.
- **CMP-04** Never edit `_ds/…/_ds_bundle.js` or other `_ds` files except `tokens/colors.css`; they are generated from Claude Design.

## 4. Content (CNT)
- **CNT-01** No prices. Every offer says "Priced on the call". Budget ranges in the `start-a-project` form are allowed. *(check_source)*
- **CNT-02** The name is Nayara Marques. *(check_source)*
- **CNT-03** On AI case and services pages the client is "an AI platform in private capital markets". Add no new "Clade" mentions anywhere. *(check_source)*
- **CNT-04** No em dashes in prose. Allowed only in rail numbers (`01 — Title`) and page titles (`Page — Nayara Marques`). Use commas, colons, full stops, parentheses; ranges read "3 to 6 months". *(check_source, warning)*
- **CNT-05** AI work is dated 2026.
- **CNT-06** Numbers come only from this list: 90% acceptance, 250% response rate, 80% wanted modularization, 44% shorter screen (21,229 → 11,961 characters). The Storybook benchmark (27%, 2.76×, 12.8%) is unverified: do not reuse it. Anything else: ask.
- **CNT-07** Voice: restrained, report-like, specific. Sentence case. No hype, no stacked disclaimers. Each case opens with the problem, what I did, the result, and says what it does not cover.
- **CNT-08** Case titles (keep links consistent): Where AI lives in an institutional investment platform · Specifying an AI composer, frame by frame · A design system AI can build from · Capacity matching for private truck fleets · An advisors platform for four business verticals · Modular card insurance in a banking app.
- **CNT-09** Positioning: the harness work governs AI generation (AI exploring and designing), not production. Services: Build = a design system AI can build with; Audit = is AI following your design system.

## 5. Who decides
Machine alone: running checks; swapping a literal for a token of the identical value; fixing a finding with one known right answer.
Machine, showing its work: a nearest-token suggestion (say the distance); a layout fix (say what moves).
Nayara: new tokens; merging values that differ; any copy change; anything visible that no rule settles. Ask with the options and a recommendation.
