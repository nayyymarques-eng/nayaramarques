# Progress: nayaramarques.com

Read this first in every session; update it before you stop (CLAUDE.md §0). Three blocks, kept short: what is true now, what waits on Nayara, what comes next. Decisions live in `DECISIONS.md`; Nayara's personal list is `~/Claude/tasks.md` (good night copies "Waiting on Nayara" there, one line per item).

Updated: 2026-09-28 evening (hand illustrations and the header without a band deployed, PR #10).

## Current state
- **Live (main c279f93, PR #10, deployed 2026-09-28 on her word "Deploy beautiful illustrations"):** the six home and Work case scenes in direction B "The hand" (cursor performs each change on a 12s loop, paused off screen, still under reduced motion, stacked and still below 900px; labels AI page, apart · The platform, three screens · Fixed bundle, one price · Two answers / One source / New part to review), and the sticky header without a band on every page (HDR-01: frost on `[data-nav-bar]::before`, 60% tint, fading 32px below the header, no shade; COL-08 counts the frost). Sky checked on all 16 pages for a split: none (SKY-01a). `harness/check.py` PASS. Netlify serves it on https://nayaramarques.com; Cloudflare Workers Builds succeeded and the workers.dev address redirects there. Screenshots `_review/home-illo-hand/header/`, `_review/home-illo-hand/shots/`.
- **Earlier deploys:** round 5 (PR #1), Netlify publish (#2), workers.dev redirect (#3), details sync (#4), round 6 (#5), home on phones (#6), cards fill (#7). Reports in `_review/round-5*.html`, `_review/round-6.html`.
- **Not merged, for the record:** `home-illo-fable` (the same illustration brief on Fable; she first chose the Opus directions, then on 2026-09-28 its direction B, ported on `home-illo-hand`).
- **Local main checkout** is 62+ commits behind origin and holds uncommitted ds-sync skill work (keep or drop is hers).
- **Domain:** https://nayaramarques.com is served by Netlify from `main` (netlify.toml builds `dist/`); `www.nayaramarques.com` fails TLS as of 2026-09-28. Moving the domain to Cloudflare waits on Netlify support (case 1128037).

## Waiting on Nayara
- Look at the header on her phone and desktop (no band now; the frost fades under the nav). Open PRs #8 (ds-sync-local) and #9 (copy-condense draft) untouched.
- Keep or drop the uncommitted ds-sync skill work in the main checkout.
- Illustration atlas and section reader comments (optional). Atlas https://claude.ai/artifact/677im2fSPCqJWwvpm68v9C · Reader https://claude.ai/artifact/R1DMTmECbXHeNF83mxA2Da

## Next steps
0. After round 6 is approved: `ds-sync` for `--font-size-lead` (15px on phones); decide whether desktop gets round 6's divider rules too (equal space around sub-section dividers, no list rule above a section divider).
1. After the deploy: `ds-sync` for `--font-size-lead`, `--font-size-h3`, `.ref-row`, `.ld-list--quiet`; bring the main checkout up to date.
2. Now that the hand is live: remove the round 5 scene CSS no page uses any more (`.sc-tree`, `.sc-merge`, `.sc-link`, `.sc-loop`, `.sc-cursor`, `.sc-a-*`) once the old review page `_review/home-illo/` is retired.
3. The AI surfaces hero lede is about seven lines: propose a shorter one (copy is hers).
4. S4: CLAUDE.md as a short map with rules in `docs/rules/*.md`. S6: `QUALITY.md`, one grade per page.
5. Update DecisionCard and NextCase in Claude Design, then `/ds-sync`.
6. Domain: when Netlify moves it, nameservers → coco / maciej.ns.cloudflare.com, delete the two copied A records, add the custom domains to the Worker.
