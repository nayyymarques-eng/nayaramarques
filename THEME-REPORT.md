# Theme sky: report

The approved sky look, built into the real site as a theme on the role tokens and as real components and markup (no override layer). Not pushed, not merged.

- **Branch:** `theme-sky`
- **Worktree:** `/Users/nayaramarques/Portfolio and Services/.claude/worktrees/agent-a7f4a26ee1445f54e`
- **Checks:** `python3 harness/check_source.py` ends with **0 failure(s)** (10 warnings, listed below). `harness/check_pages.js` returns **pass on all 16 pages at 1400px and at 375px**, and again at 1400px with reduced motion on. Nothing scrolls sideways; COL-08 contrast is measured against the sky's darkest point.

## How to preview
From the worktree folder:

```
cd "/Users/nayaramarques/Portfolio and Services/.claude/worktrees/agent-a7f4a26ee1445f54e"
python3 -m http.server 8788 --bind 127.0.0.1
```

Then open http://127.0.0.1:8788/ (the `site` launch configuration does the same on 8787 when started from this folder). Check with `eval(await (await fetch('/harness/check_pages.js')).text())` in the console. To see reduced motion, turn it on in the OS or in DevTools (Rendering, prefers-reduced-motion).

## Commits
| Commit | Step |
|---|---|
| `386d09b` | 1. Tokens: the sky theme on the role tokens |
| `e869833` | 2. Global base: sky, grain, components.css, the three actions, retired patterns removed from the markup |
| `e9fe01f` | 3. Components and pages: figures, two recess levels, case pages, card-insurance flows, contact, 404 |
| `0c81822` | 4. The four services pages as landings, and the new home |
| `ef14028` | 3b. Second sync with the exploration (flows, figures, notes, placement, sky contrast) |
| `07374dd` | 5. Rules (CLAUDE.md) and checks (harness) |
| `5756d75` | 5b. Section titles and intros; final checks |
| (last) | 6. This report, and one size for the case details values |

## What changed

### Tokens (`_ds/…/tokens/`)
- **colors.css:** new primitives (sky, mist, slate, blue, blue-shade, peach, graphite, coral) behind the same role names. New roles: `--surface-well`, `--surface-raised`, `--surface-tag`, `--surface-glass` + `--edge-glass`, `--text-heading`, `--accent-strong`, `--border-divider` (the one divider; `--border-strong` and `--border-emphatic` now point to it), the terminal roles for the home sticker, `--sky-ground`, `--sky-deepest`. Elevation −2 to 3 (`--elevation-inset-2`, `-inset-1`, `--elevation-1/2/3`) and the action shades. Rules fade on the sky and come back with real contrast inside white surfaces (a scoped block for `[data-surface]`, `.card`, `.figure` …). `--surface-band` is now an alias of the page. All old names still work.
- **borders.css:** radii 6 / 10 / 14, `--radius-action` 12, pill; the ink band's bleed.
- **motion.css:** easing, durations and `--sky-speed` from MOTION.md; reduced motion also removes transitions.
- **typography.css:** the system face; `--font-size-eyebrow` 11; `--font-size-h2`; `--font-size-action` 15; diagram sizes 9.5 / 10.5 / 12.5.
- **spacing.css:** `--hero-top`, `--gap-cards`, `--action-h`, `--action-px`, `--figure-inset`, `--section-gap`, `--section-pad`.
- **base.css:** the transparent body, h1 to h3 in the heading ink, the sky layer and its grain. **fonts.css:** no web font.

### New site files
- `components.css`: every site component on tokens (see CLAUDE.md CMP-01).
- `sky.js`: the one sky, 0.3 of the scroll, still under reduced motion.
- `art.js`: pauses illustration loops off screen.

### Per page
| Page | Changes |
|---|---|
| Every page | Sky and grain; system face; hero anatomy (eyebrow, 16px, h1 at one height); the three action variants; 11px eyebrows; headings in the softer ink; in-flow dividers in the one light divider; no tinted bands. |
| `Nav.dc.html` | Level 3 shadow, no rule; menus as floating white surfaces; the star always shown, the name in the star's red once past the home hero; current page detection fixed. |
| `Foot.dc.html` | In-flow divider at the gutter on every page. |
| `index.html` | New hero: eyebrow, the name as h1, two-line lede, See cases (primary) and Résumé (link); the chat with the star as sender, a glass composer (deep recess), six lines typed at reading pace, archived together in one blur and fade, then a clean restart; the terminal sticker over the chat only. The hero fills the first screen, centred (HERO-02). Removed: the painted backdrop, the rotating role word, "Selected work / Six case studies", the dimmed illustrations. Case rows: tags, "Read the case study" as a Link, illustration windows as deep wells, the reveal rule as the one divider. Placement and card-insurance illustrations refined (below). |
| `work.html` | Same case rows and illustrations as home; the footer override removed. |
| `about.html` | Hero anatomy; tools as soft-recess notes; the ink band; Résumé as a Link with a floating menu. |
| `contact.html` | No "Direct" label; the three contacts as link cards; Practicalities stacked (heading above). |
| `start-a-project.html` | Hero anatomy; send as the primary; section lines in flow. |
| `404.html` | Hero anatomy; nav with the star; primary + link. |
| Case pages (6) | Details as glass (soft recess); no rule under it; section title smaller (18 to 20px, 600) with a `p[data-sec-intro]` under it; the one divider between sections; case index as plain text on the sky, aligned with the star; figures as one white surface with the caption inside; DecisionCards as level-1 cards; next case in a pressed well; the ink band grained. |
| `ai-surfaces.html` | Placement figure: Composer / In context badges, 12.5px column headings, "Leave the surface" path to the AI panel shown as a separate dashed place. Figure eyebrow pairs removed. |
| `card-insurance.html` | Benchmark carousel replaced by a plain list (Cuvva, Wrisk, Lemonade labelled "Shaped the structure"); 4.3 flows as horizontal chains that scroll inside their block, "The card is active?" in the accent; 6.1 as two horizontal flows on one six-column grid (Considered / Chosen, nothing struck through); risk cards as a list; the "Contracting moved" strip removed. |
| `composer-spec.html` | Every frame of the carousels and 5.6 is one white figure with its caption inside (the frame label as the bold lead). |
| `design-system.html` | 5.2 lifecycle as a row of steps with arrows; stack and lifecycle tiles with the soft shade; eyebrow pair removed. |
| `fleet-optimizer.html` | Before / After figures with captions inside; "What shipped" as a soft-recess note with Considered / Chosen tags. |
| `advisors-platform.html` | Evidence figures one per row; the note as a soft recess. |
| Services (4) | Rebuilt from the approved landing template at their own URLs: hero with the B illustration, cards, plan cards, link cards, accordion questions, the portrait split, the ink band. |

## New rules and checks
CLAUDE.md: token table rewritten; LAY-02/03 retired; LAY-05, 07, 08, 09 rewritten; CMP-01 lists the site components; CNT-10 and CNT-11 added; new §6 with DEP-01..05, SHP-01..02, ACT-01..02, ILL-01..04, FLW-01..02, SKY-01..03, SEC-01..03, HERO-01..02, TYP-01..03, CRD-01..04, MOT-01..02 and the retired table (RET).

| Check | Where | Rule |
|---|---|---|
| Token and component load order, sky.js | check_source | COL-03, SKY-01 |
| No surface-band, page-coloured bleed or body background | check_source, check_pages | SKY-02 |
| No edge-to-edge line | check_source, check_pages | SEC-01 |
| No two lines at one boundary | check_pages | SEC-03 |
| No hairline grid | check_source | CRD-01 |
| Only primary / link / inverse; no uppercase boxed action | check_source, check_pages | ACT-01 |
| One primary per page | check_pages (fail), check_source (warning) | ACT-02 |
| Red only in the nav (and the home sticker) | check_source | RET-01 |
| No 50% dimmed illustrations | check_source | RET-02 |
| Dashed frames; strike-through | check_source (warnings) | RET-03, FLW-02 |
| First section in main is the hero; h1 on the hero line ±2px (home excepted) | check_source, check_pages | HERO-01, HERO-02 |
| Labels under 11px outside illustrations, mockups, tags | check_pages | TYP-01 |
| Loops and sky still under reduced motion | check_pages | MOT-01 |
| Contrast against the sky's darkest point | check_pages | COL-08, SKY-03 |
| Process narration | check_source (warning) | CNT-10 |

Warnings left: COL-07 `--track-lead` (pre-existing, ai-surfaces and composer-spec); FLW-02 strike-through in product mockups (ai-surfaces redline, card-insurance "Not taken"); CNT-04 "Not taken —" (a mockup); CNT-10 three phrases kept for your decision (below); RET-03 the dashed "another page" panel on home and work (intended, `.elsewhere`).

## Copy (approved by Nayara, 2026-09-25)
Approved on 2026-09-25: the new strings and the drafted section intros below. The `data-new-copy` markers were removed from every page in round 2 (commit list at the end).

| Key | Page | String |
|---|---|---|
| hero-eyebrow | home | Senior Product Designer and Design Engineer |
| hero-lede | home | I design the thing, and help get it built. / AI-native products in fintech, logistics and energy. |
| hero-cta | home | See cases |
| chat-lines | home | Hi. Welcome in. · Quick tour? Six case studies, right below. · Hiring for AI? Start with the first three. · Need a design system built? Services, up top. · Or skip the tour and say hi. Contact's in the corner. · Still here? The cursor and I appreciate it. 😛 |
| sticker | home | nayara@portfolio · $ send --message · 404: chat not found · ¯\\_(ツ)_/¯ · Sorry, it isn't built. I can build yours. |
| placement-path | home, work, ai-surfaces | Leave the surface |
| flow-tag-considered | home, work, card-insurance | Considered · too risky for conversion |
| flow-tag-chosen | home, work, card-insurance | Chosen |
| flow-step-card-insurance | card-insurance 6.1 | Card insurance |
| fp-intro | card-insurance 6.1 | Insurance inside the card request put three things at risk (below). Contracting moved to card settings, as a pending task after card success. |
| fp-risks-lead | card-insurance 6.1 | Inside the card request, insurance put three things at risk: |
| bench-shaped | card-insurance 4.2 (×3) | Shaped the structure |
| fleet-considered | fleet | Considered · only managers chose it |
| fleet-chosen | fleet | Chosen |
| art-legend-pass | audit | Pass |

### Section intros (approved 2026-09-25)
Every rail section now opens with `p[data-sec-intro]`. These are the drafted texts; "extended" means the old sentence is kept and continued.

| Page | § | Kind | Was | Draft |
|---|---|---|---|---|
| ai-surfaces | 02 | extended | AI was a place you had to go to, and it treated every question the same way. | … Two problems: one about where AI lived, one about how it behaved. |
| ai-surfaces | 03 | new |  | Three conditions shaped the work: who set the direction, how many places AI had to live in, and what happened to anything AI changed. |
| ai-surfaces | 04 | extended | Five stages so far, not planned in advance. | Five stages so far, not planned in advance: an audit, placement, two modes, prototypes, and the new patterns moved into the system. |
| ai-surfaces | 05 | extended | AI where the work is, in two modes that behave differently. | … First where it appears, then how analysis and edit each behave. |
| ai-surfaces | 08 | new |  | Three lessons, two about the product and one about the practice: where AI goes, why it needs two modes, and what was not mine to build. |
| ai-surfaces | 09 | extended | The work is live and unfinished. | The work is live and unfinished, so some things can't be shown yet. These are the gaps this case leaves open, and why. |
| composer-spec | 01 | new |  | One component sits between the user and every AI feature on the platform. This is where it lives and what it has to serve. |
| composer-spec | 03 | new |  | The redesign had to make the composer simpler without taking anything away. These are the limits every frame was checked against. |
| composer-spec | 04 | new |  | One structural move: empty the first layer and tag the context below the input. Everything else in the spec follows from it. |
| composer-spec | 05 | extended | Twenty-six frames in six families, each with one line an engineer can pass or fail. | …, from the empty field to the edge cases. |
| composer-spec | 06 | extended | The spec is written for the next builder, usually an AI tool. | …, so every state is a rule it can follow rather than a picture to copy. |
| composer-spec | 07 | extended | The composer is in build, so today's claim is the specification itself. | …: what it settles before engineering starts. |
| composer-spec | 08 | new |  | Three lessons: one about the product, and two about the practice of specifying a component for engineers and AI tools. |
| composer-spec | 09 | new |  | The composer is still in build. These are the things this case can't show yet, and why each one is still open. |
| design-system | 02 | new |  | Two problems: the library in the design tool and the one in code had drifted apart, and a list of components alone didn't stop screens drifting. |
| design-system | 03 | new |  | The conditions the system had to meet, starting with where its one source of truth would live: next to what people build from. |
| design-system | 04 | extended | Four stages, in this order. | …, from an audit of what shipped to a route for reporting what the system doesn't cover yet. |
| design-system | 05 | extended | Four layers and a register. | …: each layer rests on the one below it, and the register catches what none of them covers yet. |
| design-system | 06 | extended | Eight rule families. Every answer is a number, a token or a named component. | Eight rule families, covering the decisions between components. Every answer is … |
| design-system | 07 | extended | The system is in use and still growing. Three things have changed. | …, for the team that builds and for the product it builds. |
| design-system | 08 | new |  | The system is in use but not measured yet. These are the gaps this case leaves open, and why each one is still open. |
| fleet-optimizer | 02 | extended | Empty return trips are expensive, and nobody was being paid to care. | … What the interviews found, before any design started. (reads as process narration, CNT-10) |
| fleet-optimizer | 03 | new |  | The limits the work ran under, starting with a design sprint that no fleet manager could join. |
| fleet-optimizer | 04 | extended | Four stages: interviews, the sprint I facilitated, a comparison test, decisions. | …, and the decisions the test produced. |
| fleet-optimizer | 05 | extended | A match email built to be decided on from a phone in a yard. | … The email before and after, then the parts that changed. |
| fleet-optimizer | 06 | new |  | What the comparison test decided: which surface would carry the matches, and what the redesigned email changed. |
| fleet-optimizer | 07 | new |  | Four lessons, two about the product and two about the practice of running research and a design sprint. |
| fleet-optimizer | 08 | new |  | The vertical did not last, so some outcomes can't be shown. These are the gaps, and how to read the numbers above. |
| advisors-platform | 02 | extended | Advisors were doing the integration work the software should have done. | … What the interviews found, across three of the four verticals. |
| advisors-platform | 03 | new |  | One product had to serve four verticals, each with its own director and its own idea of what the first release should hold. |
| advisors-platform | 06 | new |  | Results from the concept test and the approval that followed. They are test scores, not results from a shipped product. |
| advisors-platform | 08 | extended | From interviews to board approval. Not covered: | The case runs from the first interviews to board approval. What happened after that is not covered: |
| card-insurance | 02 | extended | Almost everyone already had card insurance. Almost nobody was happy with it. | …, and the survey said what was wrong. |
| card-insurance | 03 | new |  | Part of the product belonged to someone else: the insurer set its rules. These are the limits every screen was designed within. |
| card-insurance | 04 | extended | Four stages: principles, benchmark, flows, and the decisions testing produced. | … The principles came first, agreed with engineering. |
| card-insurance | 06 | extended | Ten active customers tried the prototype from both entry points. Two findings. | …, the first about where insurance should live. |
| card-insurance | 07 | new |  | Four lessons: two about the product, on placement and transparency, and two about the practice of testing early. |
| card-insurance | 08 | extended | From the survey to handover for build. Not covered: | The case runs from the survey to handover for build. What came after that is not covered: |


### Copy removed or changed (no new words)
- **Process narration (CNT-10):** card-insurance 4.3 "Contracting, claim and cancellation, mapped before any screen." → "Contracting, claim and cancellation."; card-insurance 6.1 intro (above) and the caption "The placement change. Made before build." removed with the old figure.
- **Kept for your decision (CNT-10 warns):** fleet "Days of research moved the plan before any build."; card-insurance learning "Written with engineering before the first screen, …"; composer-spec gain "The undecided parts are named before the build, not found during it."; design-system "Someone who needs breakpoints or a chart asks before building, …" (a rule, not narration). The exploration kept these too.
- **Figure eyebrow pairs removed:** ai-surfaces "As-is / AI chat · its own page", "Inline edit / Same behaviour in every output", "Edit chat / Chat left, output right"; design-system "The system / Four layers and a way back in", "Register lifecycle" (the label "Nothing here is canon until it ships" stays); card-insurance "What the category sells · what the customer asked for / 80% want to modularise"; card-insurance 6.1 "Where contracting lives / Tested from both entry points".
- **card-insurance:** the benchmark carousel became a list, word for word; the "Risk 01/02/03" cards became a bullet list with the same texts; the "Contracting moved: Card request journey → Insurance page in card settings" strip removed; the chosen flow's "Card settings → Seguro do cartão" became "Card settings" plus the kicker "Seguro do cartão" on step 05.
- **contact:** the "Direct" label. **home:** the old hero (the rotating "Product Designer / Builder", the client line "CLADE · BTG PACTUAL · LOADSMART · ITAÚ", "Get in touch") and "Selected work / Six case studies".
- **fleet:** Before / After became figure captions (same words); "What shipped" options labelled instead of struck through.
- **Services pages:** the copy is the landing exploration's, which re-places the old pages' words (for example "Six modules; most projects use three or four." as a heading). The audit page no longer repeats "Book an audit" under the questions, and the Storybook benchmark stays out (CNT-06).
- **Home and work illustration:** both the new path label "Leave the surface" and the older footer "Leave the surface, describe it again." now appear; consider dropping one.

## Claude Design follow-ups (the generated bundle was not edited)
- **DecisionCard:** draws `border:1px solid var(--line)` and no radius or shade. On the site it becomes a level-1 card through the `data-surface="card"` prop (the scoped rule clears `--line` and adds `--radius-md` and `--elevation-1`). In Claude Design: no border, radius md, `--elevation-1`, title in `--text-heading`.
- **NextCase:** draws its own top and bottom rules and changes colour and indent on hover. On the site it sits in a pressed well (`.well.well--press.well--next`, which silences `--line` and `--line-ink`). In Claude Design: the component itself should be the well (soft recess, radius lg, deeper on hover, no colour change, no rules), title at `--font-size-h2`.
- **ListRow:** fine on tokens (rows use `--line`); move its separator to `--border` and its marker to 11px when the bundle moves to role names.
- **Tokens:** every `tokens/*.css` file changed. Run `ds-sync` so Claude Design reads the sky values, new roles, radii, elevation and motion tokens. (The Claude Design connector failed to connect in this session, so nothing was synced.)
- **New components to register** after your verdict (CMP-03 proposals): the B illustration, plan card, accordion card, link card, the horizontal flow figure (card-insurance 6.1), chips and chains, steps, badge, `.elsewhere`, the home chat and sticker.

## What I could not do, or did differently
- **Contrast on the sky (SKY-03).** At the exploration's values the sky's darkest point (#c0d4e1) put muted text at 4.22:1 and the accent at 4.01:1. I softened the sky's depth blobs (their mix went from 55/14/24/20/18% to 40/10/12/7/5%), so the darkest point is now #d4e2eb, and nudged `--text-muted` from #4f6873 to #4a626d and `--text-subtle` from #6a8490 to #687f8a. Tags use the body ink. The late "Card conversion" step (pale accent) uses ink text instead of white. The dusk is lighter than in the exploration; the grain is not part of the measurement.
- **Sticky section heads** were built, then cancelled (your call); the section title and intro are ordinary now.
- **Middle sky plane** (faint arcs at 0.6): not built, as in the exploration.
- **composer-spec carousel buttons** (← →) are still 34px outlined squares: a control that is none of the three actions. Left as the exploration did.
- **Card-insurance benchmark screenshots** (`assets/c8-0.png` to `c8-6.png`) are no longer used by any page; the files are still in `assets/`.
- **contact.html** carries a duplicated page block (a second `<x-dc>`), from before this work; both copies were changed the same way.
- The exploration's `kit.html` and the `index-before-*` prototypes were not ported (not site pages).
- Pre-existing COL-07 warnings (`--track-lead`) were left.
