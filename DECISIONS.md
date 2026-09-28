# Decisions: nayaramarques.com

Nayara's verdicts, newest first. Every verdict lands here the same day it is given (CLAUDE.md §0). If a machine can check it, it also becomes a rule in CLAUDE.md and a check in `harness/`; the last column says where. Component verdicts (retire, keep, merge) are in `harness/verdicts.json`.

Format: date · decision · what it replaces or rules out · enforced by.

## 2026-09-26
- Copy fixes, following Claude's recommendations (to apply after the spacing and illustration rounds merge): Card insurance drops "sole designer" (it was team work); Design system keeps "sole designer" (matches About); Fleet keeps "sole designer" (she confirmed she was the only designer); the unverified Storybook benchmark was already gone on theme-sky (only her own 44% remains); the AI cases on Home and Work are dated 2026; "Clade" stays on Home's logo row and About (her employer, public on her résumé), while the AI case and services pages keep "an AI platform in private capital markets"; Advisors lessons become two cards titled from her own prose: "Split the team by module, not by vertical" and "Score screens instead of asking for opinions". · the old wording · CNT-03, CNT-05, CNT-06
- Every top-level section has the same padding above and below its content, one value site-wide from a token, so content sits centred between its dividers. Columns line up: every section's content starts on the same left edge (the page gutter) and uses the same column grid. · uneven section padding (content sitting high), the home portrait offset from the text column · SEC-04, SEC-05 (to be written, with checks)
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
