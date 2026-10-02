# Nayara Marques — Design System

The design system of nayaramarques.com, the portfolio and services site of Nayara Marques: a product designer working AI-native on B2B and B2C products in fintech, logistics and energy.

Everything here comes from the site's repository (`nayyymarques-eng/nayaramarques`), which matches the deployed site file for file. The repository is the source of truth: when the two differ, the repository wins and this system is re-synced from it. The full rules, with IDs and checks, are in **Build rules** (a copy of the repository's `CLAUDE.md`).

## Content fundamentals

- **Voice.** Restrained, report-like, specific. Sentence case. No hype, no stacked disclaimers.
- **Cases** open with the problem, what was done, the result, and say what they do not cover.
- **Headings and labels** name what a section is about in plain nouns ("Benchmark", "Expected gains"), never a claim. Claims live in the body, next to their evidence.
- **No em dashes in prose.** Only in rail numbers (`01 — Title`) and page titles (`Page — Nayara Marques`). Ranges read "3 to 6 months".
- **No prices.** Every offer says "Priced on the call".
- **Numbers** come only from the approved list in Build rules (CNT-06).

## Visual foundations

**Colour.** Paper, ink and one blue. Pages sit on `paper`, and bands alternate `paper` / `paper-2`. `white` is for cards and tiles, never a page. Text steps down the ink scale: `ink` for headings and solid buttons, `ink-2` for prose, `ink-3` for card prose, `ink-4` for captions and nav links, `ink-6` for eyebrows and metadata, `ink-7` for arrows and mono labels. `rust` (a blue, despite the name) is the one accent: case eyebrows, link hover, highlights. `baby` appears only on ink grounds. `red` is the nav mark and nothing else. Never add a colour; if no token fits the job, propose one (COL-05).

**Lines.** Three weights. `line-ink` opens a block and divides case sections; `line-mid` separates items inside a section (steps, stats, sub-sections); `line` separates list rows and borders cards. Where two different backgrounds meet there is exactly one line, edge to edge. Two sections on the same background read as one: their divider stays at content width.

**Type.** One typeface, Archivo, from Google Fonts. Headlines are weight 500 at fluid `clamp()` sizes (`size-display` down to `size-lead`); 700 is never set. Prose is 16px/1.7 in `ink-2`, capped in `ch` (`measure-prose`, 62ch). Labels and eyebrows are uppercase at 10 to 11px, weight 600, tracked wide.

**Shape.** Corners are square (`radius`, 2px). There are no shadows: the one box-shadow on the site is a layout device, the 100vmax spread that bleeds a band's colour past the centred container (`box-shadow: 0 0 0 100vmax var(--paper-2); clip-path: inset(0 -100vmax)`).

**Motion.** One easing curve (`--ease`). Text arrives by masked line reveal, blocks fade up. `prefers-reduced-motion` turns every animation off.

**Layout.** Content maxes at `page-max` (1400px) with a 32px gutter. Case sections sit beside a sticky 200px rail. Nothing scrolls sideways at any width; at 375px figures stack and the menu fills the screen below the header.

## Iconography

There is no icon set. Arrows are Unicode glyphs (→ ↓ ▾) in `ink-7` or the colour they sit in. The only mark is the four-point star in `red`, used in the nav and as the favicon (Logos).

## Components

Five components, the ones the live site uses:

| Component | Where | Source |
|---|---|---|
| `ListRow` | Lettered or numbered rows in cases (44 uses) | bundle |
| `DecisionCard` | Decisions and problems, in two-column grids (31) | bundle |
| `NextCase` | Closes every case | bundle |
| `Nav` | Every page | `Nav.dc.html`, static rendition |
| `Foot` | Every page | `Foot.dc.html`, static rendition |

On a page, bundle components are used as `<x-import component-from-global-scope="NayaraSilvaDesignSystem_5f30f3.<Name>">`; `Nav` and `Foot` as `<dc-import name="…">`. Change a component through its props, never by copying its markup (CMP-02). If nothing fits, draw it, mark it as a proposal and ask (CMP-03).

## Not synced

- **Tokens left in `components/bundle.css` only** (composite values the token format cannot hold): the `type-*` shorthands, `border-hairline`, `border-hairline-strong`, `border-control-1`, the two `bleed-shadow-*` values, and every motion token (`ease`, `ease-out`, `dur-*`, `transition-*`). Pages still use them as `var(--…)`.
- **`note`** is stored as `#dce6e9`, the colour Chrome paints for the repository's `color-mix(in srgb, var(--baby) 30%, var(--paper))`.
- **Headline sizes** are `clamp()` values, so they live in the Font size family, not as type styles.
- **Components:** `Nav` and `Foot` are site components written as `.dc.html`, not React, so their cards are static renditions of the rendered site at 1400px, without the mobile menu.
- **Fonts:** Archivo loads from Google Fonts, as on the site; there are no font files.
