# Decisions: nayaramarques.com

Nayara's verdicts, newest first. Every verdict lands here the same day it is given (CLAUDE.md §0). If a machine can check it, it also becomes a rule in CLAUDE.md and a check in `harness/`; the last column says where. Component verdicts (retire, keep, merge) are in `harness/verdicts.json`.

Format: date · decision · what it replaces or rules out · enforced by.

## 2026-09-27 (round 5, from her review of the live site)
- Round 5 layout approved ("everything approved"): all new copy (About intro, Kinds of engagement, the FAQ line, the seven benchmark sentences), two-up landing grids, Contact's third card alone on its row, `--font-size-lead` and `--font-size-h3`, `.ld-list--quiet` and `.ref-row` join the system; "Priced on the call" removed everywhere (the site does not discuss price); benchmark rows use the standard `.tag`, `.badge` stays for states inside product mockups; About Tools: tools only, no note, no skills. · round 5 proposals, price lines · TYP-04, SEC-06, PAT-08, CNT-01 (check_source), harness/verdicts.json
- Headings in sync: one fixed size per heading level site-wide; every subtitle (the lead under a page title, the hero lede on cases and About) the same size, smaller than now, and short on About's intro. · leads at different, too-large sizes · TYP, HIER (to write, with checks)
- "Start a conversation" (Build card) and "Book an audit" (Audit card) are Primary actions. · Link actions on service cards · ACT (ACT-02 to reword: one primary per card)
- Wide components respect the column grid: cards, accordions and lists on one page share widths that end on a column line (the audit card and the Questions accordions ended at different widths). · free widths per component · SEC-05 (extend, with a check)
- Project engagement: no Investment section (A decision, Something tested, Something shipped): all engagements are priced the same way and the site does not talk about price. · the three investment cards and the pricing note · CNT-01 (to reword)
- "What this does not include" (services pages) is a plain list, a disclaimer, low emphasis: no cards. · two cards · by eye
- Embedded partner: keep showing the kinds of engagement (lighter, core, full week), lighter, no cards, no price lines. · three investment cards · by eye
- Card sizes: two widths at most (small, big), and cards of the same job look the same (constraint cards and design-principle cards had different widths). Rules and dividers inside a section end on the same line as the cards (the design principles' line and the process line ended at different places). · per-block widths · PAT-05, SEC-05 (to extend)
- Benchmark rows (card insurance): a small rounded-rectangle picture on the left (not a round avatar); "Shaped the structure" becomes a badge on its own line under the description; the description says what the insurer does that mattered, as a clear sentence, not a fragment. · bare fragments with an inline uppercase label · PAT (reference rows with a thumbnail and a badge)
- AI surfaces, edit mode: brings back inline editing, reversing the 2026-09-26 removal. Edit mode has two ways to edit at the same time, one feature: inline, line by line, on an AI output (show a report and a meeting note, each with the inline accept / keep mine), and the edit chat. The figures make that difference clear. · report plus edit chat only · by eye

## 2026-09-26 (evening)
- Content round 1 approved as a whole and deployed ("approve all and deploy now"): the 234 rewritten sentences on the six cases and About, About's calls to action, Tools & range as columns, the label spacing. The fact questions in the content report are fixed in a next small round. · the old wording · content-clarity skill

## 2026-09-26 (afternoon)
- Illustrations approved, all of it ("amazing job"): the six before/after case windows and their labels, the token card ("~2,300 tokens saved on one screen"), `--stroke-diagram` 1px, square skeleton bars, the window parts joining the system; before/after becomes the rule for case windows. · the word-heavy windows · ILL-05, ILL-07 (check_pages)
- Home and Work case illustrations: too many words. Each illustration explains one main idea of its case, simply, built on how eyes read (one focal point, few words, the idea visible before it is read). · the word-heavy windows · ILL (to be written)
- The audit card highlights how many tokens the design system saved on a single screen (about 2,300, her own measurement, now allowed alongside 44%). · 44% as the headline · CNT-06 list extended
- About, Tools & range: organised like a footer, sections side by side, each a short vertical list; same position on the page. · one long dotted line per row · by eye
- About: both calls to action from the home page; content cleaned up (less metaphor, very direct, with details); the section top padding that looks too big is fixed. · · SEC-04
- Case pages speak from the user's side: who is doing what, what the design does for them, why ("Analysis mode. When the user is reading a report, they don't need to leave the page..."). Text must read fluidly with no gaps; the content-clarity skill does the loop (read, find gaps, rewrite, read again until no gaps). · product-first captions, metaphors, jumps · content-clarity skill

## 2026-09-26
- Every top-level section has the same padding above and below its content, one value site-wide from a token, so content sits centred between its dividers. Columns line up: every section's content starts on the same left edge (the page gutter) and uses the same column grid. · uneven section padding (content sitting high), the home portrait offset from the text column · SEC-04, SEC-05 (check_pages; round 4, theme-sky)
- Round 3 approved, recommendations followed: all 18 lines of new copy (home "Who built it"; AI surfaces 5.1 to 5.3 and 09; Composer spec 06 and 09); principles are stacked cards too (card insurance; About's rows wait for a links line in DecisionCard); findings and references stay rows; step ordinals in the accent; the inactive gap is a hollow dot with a dashed rule; Composer spec gains the Routed card; "Who built it" sits after "Where I've built" and links to About; the sticker enters in four beats over 400ms; the placement figure stacks on phones; `.tags data-pattern="term"` for the editing modes. Claude Design follow-ups: an `inactive` prop on ListRow, a links line on DecisionCard. · the round 3 proposals · PAT-01, PAT-05, PAT-07, MOT-03
- Home sticker: follows the cursor, but stiff (no bobbing, tilt or spring); its entrance is stepped and digital, in beats. "Sorry, it isn't built." and "I can build yours." on two lines. · the trailing tilt and soft entrance · by eye
- Home: one divider between the last case and "Where I've built" (the one on top of Where I've built stays). A "who built it" block with the portrait joins the home page. · two lines at one boundary · LAY-04
- Case cards are stacked: one card per row, full content width, for every card job, and the lists that sat beside them (process steps, constraints) take the same stacked look, so a scanning reader meets one structure. · cards two to a row, horizontal steps · PAT-05 (to be rewritten)
- "What this case doesn't cover" has an inactive style on every case: known, but off topic. · same look as the content · by eye
- AI surfaces: the centralised/distributed illustration is tagged "previous work" and "proposed solution"; analysis and edit mode figures are named for the mode and explain it; the inline-edit figure goes, the report plus edit chat stays, labelled as an editing mode (report, document, meeting notes); "Scope of the spec" goes. Same treatment wherever the pattern repeats. · · by eye
- Round 2, all 13 recommendations accepted ("yes for all"): `--font-size-subsection` (17px, 16 on phones); the sub-section marker is the 12 × 2px accent bar, not a square; labels "Scope" and "Results"; audit counts 10 and 5 stay as findings; tags for bare-label findings; "Decision 01" numbering stays; decision cards 12px apart; about's principle rows stay hand-built until ListRow gets a links line; card-insurance 6.1 risk bullets stay; Advisors "What I learned" stays prose until she writes two lesson titles; services pages and the Advisors/card-insurance next-case band are the next round; `.subsection`, `.stages`, `.stats`, `.cards--2` and `data-pattern` join the system. · the proposals · PAT, NUM, HIER-01 (theme-sky, 4dbfcf2)
- Harness steps S1 to S8 approved: progress file per project, this file, one check command, CLAUDE.md as a map, every verdict becomes a rule or a check, quality grades per page, a light slop sweep at good night (changed pages only, lists, never edits), Digest drawn as a graph with a state file. · — · this file, `harness/check.py`

## 2026-09-25
- Copy approved: the section intros on the six cases and the new strings on `theme-sky` (`data-new-copy` markers removed). · drafts · —
- Section titles: "NN Title", number in the accent, bold 600, about 20px. Sub-sections carry no number; they get a graphic marker (proposal in round 2). · "7.1 Expected gains" style numbering · LAY-08 (round 2)
- Every case section opens with an intro of at least two lines. · one-line or missing intros · by eye
- No sticky section heads. Tried and rejected: frosted strip, mask fade, white card, red bar, opaque band, sky-painted band. · all sticky variants · by eye
- Content structures: one structure per job (problem, constraint, step, decision, finding, result, lesson, gap, action). No look-alike variants of the same job. · vertical, lettered and horizontal lists doing the same job · PAT rules (round 2)
- Big numbers only for measured results or scope counts, labelled as which. · mixed stat blocks · round 2
- Flows read horizontally, left to right. A considered option is labelled with its reason, never struck through; the decided one is labelled "Chosen". · vertical flows, strike-through · by eye
- No process narration in case copy ("made before build"). · — · by eye
- Exactly three action styles: Primary (raised light, 12px radius, soft shade), Link (accent, arrow), Inverse (on ink). No uppercase actions. · square, dark, outline and uppercase buttons · by eye
- Radii 6, 10, 14; pill only for tags. Depth levels −1 to 3, plus two recess levels (soft, deep). · mixed radii and shadows · by eye
- One blue sky behind every page (parallax, grain). No section paints its own ground; no lines at section edges. · alternating bands, dusk sky · by eye
- Home hero: intro on the left, chat on the right, centred vertically; the one exception to the fixed title height on every other page. · cycling word, centred-only hero · by eye
- Illustration B (check-through logic). Text inside diagrams uses the label style (uppercase, 600, 0.14em, 9.5px). · A, C, O · by eye
- Card insurance benchmark as a plain list, not a table. · table · by eye
- Case details band as glass; captions on white; notes with an inner shadow. · — · by eye

## 2026-09-24 and before
- Design system cleanup B-1 to B-15 approved and deployed (roles over primitives, three radii, three elevations, three button styles, base.css on every page, AA contrast checked). · — · COL, LAY rules and checks
