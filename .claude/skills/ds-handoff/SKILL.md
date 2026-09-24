---
name: ds-handoff
description: Keep Claude Design in step with the design system that ships in the nayaramarques.com repo. Lists the token changes Claude Design hasn't received yet, packages the tokens, components and rules into ~/Downloads, and writes the paste-ready prompt for the other Claude. Use this whenever tokens/colors.css (or any token file) changes, after tokenize-colours changes a token value, when the user wants to render, rebuild, share or "deploy" the design system, send it to Claude Design, or asks whether Claude Design and the site match.
---

# Design system handoff

The site runs on a snapshot of the design system in `_ds/…`. Tokens are edited in the repo (checked by the harness, deployed with the site). Claude Design holds the original project, which the components are compiled from. Every token change in the repo therefore has to reach Claude Design too, or the next export from Claude Design silently undoes it. This skill makes that step routine and visible.

Why a package and a prompt: the other Claude cannot open GitHub links, and this session usually can't reach Claude Design either (its login is rejected; `DesignSync` only runs inside `/design-sync`, which the user starts). So the handoff is: the user pastes a prompt, the other Claude reads a local folder or attached files.

## Steps

1. **Drift and package.** `python3 .claude/skills/ds-handoff/scripts/handoff.py`
   - Prints every token added, removed or changed since the last handoff. That list is what Claude Design is missing.
   - Rebuilds `~/Downloads/nayara-marques-design-system/` and its `.zip`: tokens, readme, manifest, styles, the compiled bundle, `RULES.md` (a copy of `CLAUDE.md`) and the logo mark.
   - `--drift` prints the report without packaging.
2. **Pick the prompt** from `references/prompts.md`:
   - tokens changed and the project exists → prompt **B** with one line per change, copied exactly from `colors.css` (value and comment);
   - rendering or rebuilding the whole system → prompt **A**, with route 1 (local folder, preferred: nothing to attach) or route 2 (attach the zip).
3. **Give it to the user** as copy-ready code blocks, plus the two checks from the end of `prompts.md` so she knows what a stale answer looks like.
4. **Record the handoff only when she confirms** Claude Design matches: `python3 .claude/skills/ds-handoff/scripts/handoff.py --mark-sent`. Recording early would hide changes that never arrived.

## If Claude Design access works in this session

If `/design-sync` is running and the tools are available, prefer a reviewed sync over the paste: one file at a time (`tokens/colors.css` first), with the plan shown to the user before any write. Then `--mark-sent`.

## Things to say, not assume

- The live site never depends on Claude Design; it loads the repo copy. A missed handoff breaks nothing today, it breaks the next export.
- Components can't be changed from the repo (only the compiled bundle is here). A component change is made in Claude Design, exported, and replaces `_ds_bundle.js`; then run `site-verify`.
- The project in Claude Design may live in the old Claude account. If so, it needs moving before that account closes.

## Report

- drift: the list, or "no drift"
- package path and size
- the prompt(s) to paste
- whether `--mark-sent` is waiting on her confirmation
