---
name: site-verify
description: Verify the nayaramarques.com site before it ships. Runs the harness (source rules plus rendered checks on every page, desktop and phone width) and, when a change should only move certain colours, a before/after colour fingerprint that proves nothing else moved. Use this whenever the user asks to check, verify, test or review the site, before any /deploy, after any site-wide or visual change (colours, dividers, sections, shared components like Nav or Foot), and whenever you are about to tell the user a change "looks right" or "is done".
---

# Site verify

The site has rules in `CLAUDE.md` and two checks in `harness/`. This skill runs them the same way every time and reports one pass/fail table. The point is that "done" means *checked*: an edit to a shared component (Nav, Foot, tokens) touches every page, so checking only the page you edited misses most of the effect.

## When to take a fingerprint (before editing)

If the change is meant to move only specific colours (a token merge, a hex → token swap, a divider colour), take a snapshot of every page **before** editing. Without it you can prove the new state passes the rules, but not that nothing else changed. Skip it for copy or layout changes.

1. Start the preview: `preview_start` with name `site` (config in `.claude/launch.json`, port 8787).
2. On each page, run:
   `eval(await (await fetch('/.claude/skills/site-verify/scripts/fingerprint.js')).text())('save')`
3. Move the mouse off links first (hover a blank area). A hovered link records its hover colour and shows up later as a false difference.

## The run (after editing)

1. **Source.** `python3 harness/check_source.py`. It must end `0 failure(s)`. Warnings (CNT-04 em dashes) never block; list only the ones in files you touched.
2. **Fresh files.** The preview server caches. Before checking, reload every page and shared component without cache:
   `for (const f of PAGES) await fetch('/'+f+'.html',{cache:'reload'})`, and the same for `*.dc.html` and `_ds/.../tokens/colors.css`. A stale copy once made a fixed page look broken and a broken page look fixed.
3. **Rendered, desktop.** For every page in `PAGES` (below): navigate, wait about 2.5s for the runtime, run
   `eval(await (await fetch('/harness/check_pages.js')).text())`. Each must return `pass`.
4. **Rendered, phone.** `resize_window` preset `mobile`, repeat step 3 on the pages you changed plus `index.html`, then preset `desktop` again.
5. **Fingerprint** (if taken): on each page run `('compare', [<rgb triples allowed to change>])`. Anything reported as UNEXPECTED is a regression until explained.
6. **Links.** Every local `href`/`src` points to a file that exists (a short Python walk over `*.html` is enough).

Batch navigation in `browser_batch` (max 25 actions per call, so two batches for 16 pages). If a result says the page navigated mid-script, rerun that page alone: it is usually the runtime finishing late, not a failure.

## Reading findings

- `LAY-03` no line / line stops short where backgrounds differ → add or extend a full-bleed line (CLAUDE.md LAY-03).
- `LAY-04` double line → remove the lower section's top line.
- `LAY-05` edge-to-edge line between the same background → make it an in-flow divider (LAY-05).
- `LAY-01` page wider than the screen → the page wrapper lost `overflow-x:clip`.
- Before fixing, find the element that owns the line; a flag "near" a heading names the last heading above the boundary, not necessarily the element.
- If a finding looks wrong, check it visually before changing the rule or the check. The check has had real bugs (it once missed every full-bleed band because the browser reports `clip-path` in px). When you fix the check, break a page on purpose and confirm it now fails.

## Report

End with this table, then one line on anything not checked:

| Check | Result |
|---|---|
| Source rules | 0 failures, N warnings (M in changed files) |
| Pages, desktop | 16/16 pass |
| Pages, phone | n/n pass |
| Colour fingerprint | identical apart from allowed colours / not taken |
| Links | none broken |

## PAGES

index, work, about, contact, start-a-project, 404, ai-surfaces, composer-spec, design-system, fleet-optimizer, advisors-platform, card-insurance, design-system-build, design-system-audit, project-engagement, embedded-partner. If `ls *.html` shows a page not on this list, check it too and add it here.
