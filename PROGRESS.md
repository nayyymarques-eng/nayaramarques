# Progress: nayaramarques.com

Read this first in every session; update it before you stop (CLAUDE.md §0). Three blocks, kept short: what is true now, what waits on Nayara, what comes next. Decisions live in `DECISIONS.md`; Nayara's personal list is `~/Claude/tasks.md` (good night copies "Waiting on Nayara" there, one line per item).

Updated: 2026-09-26 (round 4 on theme-sky: one section padding, one column).

## Current state
- **Live (main, pushed):** 68ae1f4, the design system cleanup B-1 to B-15. `check_source.py`: 0 failures, 5 warnings (COL-07 old alias names on composer-spec and design-system-audit).
- **Branch `theme-sky`, not live:** the sky theme on all 16 pages (worktree `.claude/worktrees/agent-a7f4a26ee1445f54e`, report `THEME-REPORT.md`). Checks pass at 1400px and 375px. Round 2 done (commits 17911e0 to 7734ccd): sub-sections unnumbered with an accent bar, one structure per content job (CLAUDE.md §7 PAT and NUM on the branch), number rules; checks pass.
- **Round 4 on `theme-sky` (not live):** SEC-04 (every top-level section `--section-y` above and below its content) and SEC-05 (content on the gutter, one column grid) in CLAUDE.md, with rendered checks; applied on all 16 pages; contact's missing footer fixed (also broken on `main`). `harness/check.py` PASS. Report `_review/round-4.html`.
- **Exploration (scratchpad, port 8797):** `site-digest-look`, the review surface for the look. The illustration atlas and the section reader are being built from it.
- **Uncommitted in this checkout:** the ds-handoff → ds-sync skill rename and CLAUDE.md COL-04 / CMP-04 (from the ds-sync session); `PROGRESS.md`, `DECISIONS.md`, `harness/check.py`, `harness/check_pages_cli.mjs` and the §0 workflow lines (harness steps, 2026-09-26). Commit together when Nayara says.
- **Domain:** `www.nayaramarques.com` still serves the old Netlify site. Waiting on Netlify support (case 1128037).

## Waiting on Nayara
- Round 4 (`_review/round-4.html`): review in the preview, and five open questions (one space under every hero and retire `--section-pad`/`--section-gap`; one ink band padding; ink band and NextCase for Fleet, Advisors, Card insurance; the next-case well's 64px; the services "Who runs it" split).
- Round 2: all 13 approved 2026-09-26 (theme-sky 4dbfcf2). Still hers: two lesson titles for Advisors "What I learned".
- Illustration atlas and section reader: comments. Atlas https://claude.ai/artifact/677im2fSPCqJWwvpm68v9C (70 visuals, 10 style families, 14 inconsistencies). Reader https://claude.ai/artifact/R1DMTmECbXHeNF83mxA2Da (168 sections, 240 flags). Read comments with ArtifactComments.
- Deploy `theme-sky`, on her go.
- Commit or drop the uncommitted ds-sync skill work.
- Open copy items: "sole designer" still on card-insurance, fleet-optimizer and design-system (she words it); the unverified Storybook benchmark on design-system-audit (CNT-06); "Clade" on Home and About.

## Next steps
0. Round 4: record her verdicts in `DECISIONS.md`; if she approves one space under heroes, change `spacing.css` and run `ds-sync`.
1. When round 2 reports: review, show the preview, record her verdicts in `DECISIONS.md`.
2. S4: turn CLAUDE.md into a map (about 40 lines) with the rules in `docs/rules/*.md`, after round 2 has merged its CLAUDE.md edits.
3. S6: `QUALITY.md`, one grade per page by rule family, from the atlas and the section reader.
4. Update DecisionCard and NextCase in Claude Design, then `/ds-sync`.
5. Domain: when Netlify moves it, nameservers → coco / maciej.ns.cloudflare.com, delete the two copied A records, add the custom domains to the Worker.
