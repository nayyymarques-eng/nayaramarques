---
name: tokenize-colours
description: Find hard-coded colours in the nayaramarques.com site and replace them with design-system tokens. Exact matches are swapped automatically; near-duplicates (a hex a few steps off a token) are shown to the owner with the closest token and a recommendation, and only applied after she decides. Use this whenever check_source reports COL-01, when pages or components come in from Claude Design with raw hex values, when the user says "clean up colours", "use the tokens", "merge these greys", "everything that is the same", or before changing a token value (so the change reaches every page).
---

# Tokenize colours

Tokens live in `_ds/…/tokens/colors.css`. A literal colour in the site is drift: it won't follow a token change, and an AI building the next page copies it. The job here is to move every literal onto the token that does the same job, without changing how anything looks unless the owner chose that change.

Two kinds of literal, handled differently on purpose:
- **Exact**: the value equals a token. Swapping it changes nothing visible, so it is a machine decision. When several tokens share a value (`--ink` / `--line-ink`), the script picks by the job the property does: borders take `--line*`, text takes `--ink*`, fills take `--paper*`.
- **Near**: a value a few steps off a token (`#e9e7e2` next to `--paper-2` `#eceae5`). Merging it changes a colour on screen, however slightly, so it is Nayara's decision (CLAUDE.md §5). Never merge a near value on your own judgement.

## Steps

1. **Snapshot first.** Use the `site-verify` skill's fingerprint (`('save')`) on every page before editing. That is what later proves only the chosen colours moved.
2. **Scan.** `python3 .claude/skills/tokenize-colours/scripts/tokenize.py scan`
   It prints EXACT (with the token each property will get), NEAR (closest token, max channel difference, properties, files) and ALLOWED (COL-02 exceptions).
3. **Ask about the near values.** Group them by job, not by hex, and ask with `AskUserQuestion` (at most 4 questions; bundle the small one-offs). For each group give the recommended token first and say what visibly changes. Useful groupings from past runs:
   - line colours doing the same job (merge into `--line`, which wins was a real decision)
   - band / fill greys (`--paper-2`, `--paper-3`)
   - wireframe greys inside figures (skeleton bars, figure grounds)
   - near-ink text greys
   - anything with a different *hue* (an olive hover, a blue highlight): say plainly it will look different
   Values that depict another product (the recreated bank-app screen) stay literal: add them to COL-02 instead of merging.
4. **Write the decisions** to a scratch `decisions.json`: `"#hex": "token"`, `{"border": "…", "default": "…"}` when the job depends on the property, a `color-mix(...)` string for a tint derived from tokens, or `"keep"`.
5. **Watch for context the script can't see.** If a merge would erase a distinction (a current-item highlight that would become the same colour as its menu), give that file its own mapping and say so. Past example: `#f8f7f4` went to `--paper` in figures but `--paper-3` in the Nav, where it marks the current page.
6. **Apply.** `python3 .claude/skills/tokenize-colours/scripts/tokenize.py apply --decisions decisions.json` (add `--dry-run` first on a big run). It also links the tokens stylesheet on pages that lack it, skips custom-property definitions, and skips tokens a file redefines locally.
7. **Local redefinitions.** If a page redefines tokens in its own `:root`, the script leaves those literals alone. Resolve them: identical copies get deleted; ones that are really another token (its `--ink-4` equal to `--ink-2`) get pointed at that token; a real difference goes to Nayara. COL-04 in `check_source` fails until none remain.
8. **Token value changes.** If a decision changes a token's value (the winning line colour), edit `colors.css` and tell Nayara the same change is needed in Claude Design, or use the `ds-handoff` skill.
9. **Verify.** Run `site-verify` with the fingerprint compare, passing the rgb triples of every colour that was merged as allowed. Anything else that moved is a bug; find it before reporting.

## Report

- literal colours before → after, and what remains (COL-02 exceptions, SVG `fill` attributes, loading screen)
- each near-value decision, as applied
- anything that visibly changed hue (hover colours, highlights)
- the verify table from `site-verify`
- the Claude Design follow-up, if a token value changed
