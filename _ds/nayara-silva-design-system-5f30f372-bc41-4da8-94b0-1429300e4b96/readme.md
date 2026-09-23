# Nayara Silva — Design System

The design system behind **nayarasilva**, the personal brand and practice of Nayara
Silva: a Senior Product Designer working as a Design Engineer, selling design
services built around AI-native workflows. The brand's own line for it is
*"I design, I build, I ship."*

This is a consultancy of one. There is no product UI — the brand's only surface is
its portfolio and services website, and that site is where every value in this
system comes from.

## Sources

Everything here was read from Design Component source files uploaded into
`uploads/`, one per page of the live site:

| File | Page |
|---|---|
| `Home.dc.html` | Home |
| `Work.dc.html` | Work index |
| `AI Surfaces.dc.html`, `Design System.dc.html`, `Advisors Platform.dc.html`, `Fleet Optimizer.dc.html`, `Card Insurance.dc.html` | The five case studies |
| `Patterns.dc.html` | **Internal case-study pattern kit** — the component spec, in the brand's own words |
| `Project Engagements.dc.html`, `Embedded Partner.dc.html`, `AI Design System.dc.html` | The three engagement models |
| `About.dc.html`, `Contact.dc.html`, `Blog.dc.html`, `Resume.dc.html` | Everything else |

No Figma file, repository, or image assets were provided. The pages reference
`assets/*.png` screenshots that were not in the upload.

**Two gaps, both flagged in place:**

1. `Nav` and `Foot` were `dc-import`s in every page and their component files were
   not uploaded. Both are reconstructed from the site's type and hairline system at
   the heights the pages declare (57–58px / 76–80px). **Verify them against the real
   components.**
2. Archivo is loaded from the Google Fonts CDN because no font binaries were
   provided. This is not a substitution — Archivo is the correct typeface, and the
   source site loads it the same way. Send self-hosted files if you want
   `@font-face` rules instead.

## No logo

The source contains no logo, wordmark, favicon, or brand mark of any kind — the
name is set in plain Archivo wherever identity is needed, at 14px/600 in the nav
and as the display h1 on the home page. Nothing here invents one, and neither
should anything built with it.

---

## Content fundamentals

The voice is **first person, plain, and unusually willing to say what didn't work.**
It reads like a senior practitioner talking to another senior practitioner, not
like marketing copy.

**Person.** "I" for the work, "you" for the reader's situation. Engagement pages are
written as a diagnosis of the reader: *"You have a product and a team, and need
design that reaches production instead of stopping at approval."* The offer follows
the diagnosis, never precedes it.

**Sentence shape.** Short declarative sentences, often with a colon or an em dash
doing the structural work. Statements land as one line and are not explained
twice: *"Almost everyone already had card insurance. Almost nobody was happy with
it."* · *"I don't hand off."* · *"Let's talk."*

**Negative space as a credibility device.** Every case study closes with a section
titled "What this case doesn't cover" and names the absences directly: *"Attach
rate, claim volume and cancellation rate are not reported here. I left the bank
before they were measurable, so any figure would be a guess."* Trade-offs are
stated on every decision — "Gained" and "Traded away" are structural, not optional.
The Patterns page says it outright: *"without the trade-off it is a feature list."*

**Numbers only when measured.** *"41 → 1 button treatments"*, *"90% already have
credit card insurance"*, *"12 interviews, 21 concept features, 90% acceptance"*, and
where the work is unfinished it says so: *"3 of 5 pipeline stages built and
running; the rest specified."* The Patterns page's rule: *"If the value is 1 or 3,
the number carries no information — write a sentence instead."*

**Casing.** Sentence case everywhere in prose and headlines. UPPERCASE only in
eyebrows, labels and buttons, always tracked out 0.12–0.14em. No Title Case Headings.

**Spelling.** British-leaning: *modularise*, *personalisation*, *colours*,
*organised*. Portuguese product names are left untranslated in case studies
("Seguro do cartão", "Mensalidade", plan names Simples / Pleno / Superior).

**Punctuation.** The middot ` · ` joins metadata and list values — *"survey ·
benchmark · user flows · prototyping"*. Em dashes set off a clause. Curly quotes.
Arrows as prose connectors: *"Contracting moved: Card request journey → Insurance
page in card settings."*

**No emoji. Anywhere.** Not in copy, not in cards, not as icons.

**Things the voice never does:** exclamation marks, "unlock", "leverage", "delight",
"passionate about", rhetorical questions as headings, or a claim without either a
number or a named limit behind it. The one question mark on the site is the closing
CTA — *"Need one person to take it from idea to shipped?"*

---

## Visual foundations

**The idea.** Editorial print on warm paper. Hairlines and type do all the work;
there is no decoration, no illustration, no shadow and almost no colour. The brand
signals seniority by restraint, not by ornament.

**Colour.** Three warm greys and a black, plus exactly one chromatic accent.
`--paper #f2f1ee` is the page; `--paper-2 #e9e7e2` is the alternating band;
`--white` appears only inside cards and tiles, never as a page. Text is
`--ink #101114` with a six-step grey ramp beneath it, each step assigned a job
(prose `--ink-2`, captions `--ink-4`, eyebrows `--ink-6`, arrows `--ink-7`). The
accent is rust — `--rust #9c2f16` for case-study eyebrows, prices and hover ink,
`--rust-hover #b23a20` on the index pages' link hover. `--gained #3f6b4a` and
`--traded #8a4a2a` exist only as 10px uppercase labels. There is no blue, no
gradient anywhere, and no second accent.

**Type.** Archivo alone, at four weights. Display type is **weight 500** — the site
never sets 700 on a headline — with tracking that tightens as size grows
(`-0.045em` at display, `-0.018em` at 20px) and leading that goes below 1 at the
top of the scale (`0.94`). Body is 16px/1.7; captions are 14px/1.6. Labels are
10–11px/600 uppercase at 0.12–0.14em, and never smaller than 10px. Measures are
capped in `ch`, never px: 62–66ch for prose, 88ch for captions.

**Layout.** A 1400px container with a 32px gutter. Case studies use a **200px
sticky label rail** — the section's uppercase number stays level with the reader
while the content column (`flex: 1 1 460px`) scrolls past. Everything else is
`repeat(auto-fit, minmax(…, 1fr))`; the floors are tokenised (170px tiles, 300px
rows, 320px cards). Nothing is fixed-position except the nav and the rail label.

**Backgrounds.** Flat colour only. No imagery, no texture, no pattern, no gradient.
Section changes are announced by swapping `--paper` and `--paper-2`, bled to the
viewport edge from inside the centred container with a `0 0 0 100vmax` box-shadow
plus `clip-path: inset(0 -100vmax)`. This is the **only** box-shadow in the brand,
and it is a layout device, not a shade.

**Cards.** Square corners, `1px solid --dedbd5`, white or paper fill, 20–34px
padding, an inner `--line-4` rule above a footer. No radius, no shadow, no lift, no
coloured left border. Tiles inside a `HairlineGrid` have no border of their own —
the grid's 1px gap over a `--line` background *is* the rule between them.

**Corners.** `2px` on buttons and pills. `0` on cards, tiles and image wells.
`999px` appears exactly once on the site, on a 6px availability dot.

**Transparency and blur.** No frosted glass, no scrims, no protection gradients.
Blur appears only as motion — 3–5px on the way in, resolving to zero.

**Animation.** One easing curve, `cubic-bezier(.19, 1, .22, 1)`, for everything.
Headlines arrive by **masked line reveal**: the line is wrapped in
`overflow: hidden` and animates from `translateY(104%)` with a 5px blur over 1.5s.
Supporting copy fades up 16px with a 3px blur, staggered at .5s / .62s / .74s.
Hairlines draw in with `scaleX` from a left origin over 1.6s. Values roll in place
on a state change (price, coverage limits) so the reader's eye doesn't have to
move. `prefers-reduced-motion` kills all of it.

**Hover.** Colour and position, never scale. Rows go rust and slide 10px right
(`padding-left`, 350ms on the slow ease). The solid button fills rust; the outline
button darkens its border to ink and fills `--paper-3`; a card lifts from paper to
white; a contact card darkens its border only. Carousel arrows go rust with an ink
border. Transitions run 200–250ms.

**Press.** There is no separate press state. Nothing scales down, nothing dims.

**Focus.** `:focus-visible` gets a 2px ink outline at a 2px offset.

**Imagery.** Screenshots of real product work, framed in a `1px --line` box on
white, at fixed aspect ratios: `375/812` for a phone, `375/700` cropped, `4/3` for
desktop and benchmark wells. A benchmark well sits on a neutral `#c3c3c3` ground.
Images are never full-bleed, never tinted, never rounded, and never used as a
background. No photography of any kind — no headshot, no office, no stock.

**The one dark surface.** A single ink-black band closes a page: mega headline on
`--on-ink`, prose on `--on-ink-muted`, one inverse button. Plus the terminal block
in the design-system case study, which is the only place the mono stack and the
oklch `pass` / `warn` / `fail` triad appear.

---

## Iconography

**There is no icon set.** The source site contains zero SVG elements, zero icon
fonts, and zero PNG icons. This is deliberate and it is worth preserving.

What does the work instead:

- **Unicode arrows** — `→` after every button and link label, `←` for "All work"
  and carousel previous, `↓` on the résumé download, `↑` unused but available.
  In a flow chain they are `--ink-7`; inside a button they inherit the label colour.
  Wrapped in `<Arrow>` with `aria-hidden="true"`.
- **2px-radius squares as dots** — a 7px square in `--gained` for the availability
  pill, a 9px `--term-dot` square as the terminal's window chrome. Squares, not
  circles.
- **Type as marker** — letters (A/B/C) and zero-padded numbers (01/02) in rust or
  grey open list rows. A `line-through` span marks the superseded half of a
  before/after.

**Do not add an icon library.** If a glyph is genuinely needed, add it as a Unicode
character in the same `--ink-7` / inherited-colour treatment. No emoji, ever.

---

## Index

| Path | What's there |
|---|---|
| `styles.css` | The entry point. `@import` lines only. |
| `tokens/` | `fonts` · `colors` · `typography` · `spacing` · `borders` · `motion` · `base` |
| `guidelines/` | 21 foundation specimen cards (Colors, Type, Spacing, Brand) |
| `components/foundation/` | Primitives shared by every page |
| `components/site/` | Page chrome |
| `components/case/` | The case-study pattern kit, from `Patterns.dc.html` |
| `components/index/` | Index and page-level blocks |
| `ui_kits/portfolio/` | Five-screen click-through recreation of the site |
| `templates/case-study/` | **Case study** — the eight-section page as a copyable starting point |
| `assets/image-slot.js` | Drag-and-drop image placeholder used by media components |
| `SKILL.md` | Agent Skills entry point |
| `uploads/` | The original source pages, kept for reference |

### Components

**Foundation** — `Band`, `ButtonLink`, `Eyebrow`, `HairlineGrid`, `StatementLine`,
`StatusPill`, `TagChip`

**Site** — `CtaBanner`, `Foot`, `Nav`, `PageHero`, `Prose`, `SectionHeader`

**Case study** — `Arrow`, `CarouselSlide`, `CaseHero`, `CaseSection`,
`DecisionCard`, `FlowChain`, `FlowStep`, `InfoCard`, `ListRow`, `MediaCarousel`,
`MetaBar`, `NextCase`, `ProcessStep`, `ScreenFigure`, `StatTile`, `Terminal`,
`TerminalLine`

**Index & page blocks** — `ContactCard`, `ModelCard`, `OfferCard`, `OfferItem`,
`PostRow`, `SpecTable`, `TimelineRow`, `WorkCard`, `WorkRow`

Every component has a sibling `.d.ts` props contract and a `.prompt.md` with a
usage example and the rules that govern it. Read the `.prompt.md` before using one
— several of them encode a real editorial rule, not just an API.

### Intentional additions

The source defines its section components by name in `Patterns.dc.html`; those are
built exactly as specified. Nine more were extracted because they repeat verbatim
across three or more pages and consumers would otherwise re-implement them:

- `Band`, `Eyebrow`, `Prose`, `StatementLine`, `ButtonLink` — the atomic type and
  surface treatments every page repeats inline
- `Arrow` — wraps the Unicode glyph so the one icon convention stays consistent
- `PageHero`, `SectionHeader`, `CtaBanner` — the three page-chrome blocks shared by
  Home, Work, About, Notes and all three engagement pages

`Nav` and `Foot` are reconstructions, not extractions — see **Sources** above.
