# Progress: nayaramarques.com

Read this first in every session; update it before you stop (CLAUDE.md §0). Three blocks, kept short: what is true now, what waits on Nayara, what comes next. Decisions live in `DECISIONS.md`; Nayara's personal list is `~/Claude/tasks.md` (good night copies "Waiting on Nayara" there, one line per item).

Updated: 2026-09-27 evening (round 6, mobile refinements, on branch `mobile-r6`, pushed for a preview; not live until she says deploy).

## Current state
- **Round 6, branch `mobile-r6` (worktree `.claude/worktrees/r5-layout`), from her phone review:** equal space around sub-section dividers on phones (LAY-09, SEC-04); product prototypes keep their desktop shape and scroll in the figure (`.figure--proto`, LAY-06); flows run to the screen edge (`.flow-scroll`, FLW-01); lead 15px on phones and short phone ledes on the six cases (TYP-04, `data-new-copy`); case details as a compact `<dl>` with the note's grain (LAY-07); the home chat framed at a fixed height on phones (HERO-02); eyebrow to heading 12px everywhere (TYP-05). Checks for each in `harness/check_pages.js`. `harness/check.py` PASS on 16 pages at 1400px and 375px. Report: `_review/round-6.html`, preview https://mobile-r6-nayaramarques.nayara-marques.workers.dev.
- **Live (main, pushed):** 276b4b1, the sky theme, rounds 2 to 4, illustrations and content round 1 (deployed 2026-09-26 from `theme-sky`). Served on workers.dev.
- **Round 5, branch `round-5-layout` (worktree `.claude/worktrees/r5-layout`), all approved 2026-09-27:** TYP-04 (one lead size `--font-size-lead`, one h2 and one h3 size, `--font-size-h3`); ACT-02 per offer card (Start a conversation, Book an audit are Primary); SEC-06 (widths end on the four-column grid); PAT-08 (two card widths); CNT-01 (the site does not discuss price: Investment gone, "Priced on the call" gone, kinds of engagement as a light list); quiet "What this does not include"; benchmark rows with pictures and a `.tag` (`.ref-row`); About: shorter intro, Tools lists tools only. Merged in: `round-5-ai-edit` (edit mode: inline on report and meeting notes, plus the edit chat with Accept change; report above chat on phones) and `home-illo-explore` (home and Work case scenes with no window, entrance-only motion; 01 C, 02 C, 03 A, 04 in the product, 05 B, 06 B with benefit icons). `harness/check.py` PASS on 16 pages at 1400px and 375px. Reports: `_review/round-5.html`, `_review/round-5-ai.html`, `_review/home-illo/`.
- **Not merged, for the record:** `home-illo-fable` (the same illustration brief on Fable; she chose the Opus directions).
- **Local main checkout** is 62+ commits behind origin and holds uncommitted ds-sync skill work (keep or drop is hers).
- **Domain:** `www.nayaramarques.com` still serves the old Netlify site. Waiting on Netlify support (case 1128037).

## Waiting on Nayara
- Round 6 review (`_review/round-6.html`, preview URL above): the six short phone ledes (new copy); the eyebrow distance (12px, or 8px); the round 6 proposals (`.figure--proto`, `.flow-scroll`, `.case-details__list`, phone ledes); then "deploy".
- Review the round 5 PR preview, then "deploy".
- Keep or drop the uncommitted ds-sync skill work in the main checkout.
- Illustration atlas and section reader comments (optional). Atlas https://claude.ai/artifact/677im2fSPCqJWwvpm68v9C · Reader https://claude.ai/artifact/R1DMTmECbXHeNF83mxA2Da

## Next steps
0. After round 6 is approved: `ds-sync` for `--font-size-lead` (15px on phones); decide whether desktop gets round 6's divider rules too (equal space around sub-section dividers, no list rule above a section divider).
1. After the deploy: `ds-sync` for `--font-size-lead`, `--font-size-h3`, `.ref-row`, `.ld-list--quiet`; bring the main checkout up to date.
2. On phones the case scenes stay hidden below 900px: propose a phone version.
3. The AI surfaces hero lede is about seven lines: propose a shorter one (copy is hers).
4. S4: CLAUDE.md as a short map with rules in `docs/rules/*.md`. S6: `QUALITY.md`, one grade per page.
5. Update DecisionCard and NextCase in Claude Design, then `/ds-sync`.
6. Domain: when Netlify moves it, nameservers → coco / maciej.ns.cloudflare.com, delete the two copied A records, add the custom domains to the Worker.
