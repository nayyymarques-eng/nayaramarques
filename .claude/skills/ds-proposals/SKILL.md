---
name: ds-proposals
description: Review the components AI invented or copied instead of using the design system, and record Nayara's verdict on each (promote, fold, keep local, retire) in harness/verdicts.json. Finds CMP-03 proposal markers, site components that duplicate or shadow a system component, orphans, and pages that hand-draw a part the system already has. Use this after any build where AI drew something new, when check results or site-verify report open proposals, when the user asks "is this a new component?", "should this be in the design system?", "review proposals", or before a handoff to Claude Design.
---

# Component proposals

When AI builds a page and finds no component that fits, it draws one. That drawing is a proposal: a claim that the system is missing something. Sometimes it is right (a real gap). Often it is not: the part existed and the AI didn't find it, or the need belongs to one page only. Only Nayara can tell which, and her answer has to be kept, or the same question comes back on every build.

The model is the one in her harness workflow: **machines produce findings, people produce verdicts, and only verdicts last.** The script finds items and keeps verdicts; you gather the evidence and apply what she decides.

## Verdicts

| Verdict | Means | What you then do |
|---|---|---|
| **fold** | An existing system component does this job. The AI missed it. | Replace the drawn markup with the component (props only, CMP-02); delete a local copy. Then say what made it hard to find, and propose one line for its rules so the next search finds it. |
| **keep-local** | Fine on this page, not a system part. | Leave it. Keep the marker; the verdict holds until the markup changes. |
| **promote** | A real gap. It becomes a system component. | Write a brief for Claude Design (name, job, props, when to use, when not to, a picture). Keep the marker until the export brings the component back, then fold to it. |
| **retire** | Nothing uses it and nothing should. | `git rm` the file. |

## Steps

1. **Scan.** `python3 .claude/skills/ds-proposals/scripts/proposals.py scan`. It lists items marked NEW or EXPIRED (judged, then changed since), with a fingerprint each:
   - `marker`: a `<!-- proposal: … -->` comment on a page (CMP-03)
   - `copy`: a site `*.dc.html` with a system twin, imported by no page
   - `shadow`: a site component pages use *instead of* its system twin (Nav, Foot)
   - `orphan`: a site component with no twin, used by nothing
   The last line names the system components no page uses. That list is where hidden folds live.
2. **Find hand-drawn copies.** For each unused system component that sounds like something on a page (a details band is probably `MetaBar`, a dark call to action `CtaBanner`, a numbered section `SectionHeader`), look at the page markup. Where a page hand-draws it, add a marker above that block: `<!-- proposal: <what it is>; nearest: <Component>; not used because: <reason or "not found"> -->`. Adding a comment changes nothing visible, so it needs no approval, and it turns the block into a `marker` item. Rescan.
3. **Gather evidence**, per item, before asking anything:
   - what the part does, in one line
   - the nearest system component, and what differs (props it lacks, a variant, only styling)
   - for a `shadow`: what the local version has that the system one does not (`git log -p` on the file shows why it was made)
   - a picture when looks decide it: in the `site` preview, screenshot the drawn part and the system component rendered with the same content
4. **Ask**, with `AskUserQuestion`, at most 4 questions a round, recommendation first. Group items that share one answer: the unused `copy` files are usually one question ("retire all 12 local copies; the system versions stay"). Each option says what visibly changes, if anything.
5. **Record** each answer: `proposals.py record "<fingerprint>" <verdict> --note "<her reason, one line>"`. Never record a verdict she did not give, and never pick one for her because the evidence looks obvious. That is exactly the judgment the file exists to keep.
6. **Apply** per the table above. Folds and retires change pages or remove files, so run `site-verify` afterwards (links included).
7. **Monthly, or when asked:** `proposals.py stats`. Many folds on markers mean AI keeps missing existing parts, so fix their rules or docs. Many promotes mean the system has real gaps.

## Things to watch

- A `shadow` is not drift by default. The site's Nav may be ahead of the system's. Then the verdict is **promote** (the local one becomes the system version), not fold.
- A promote changes the design system, which lives in Claude Design (CMP-04). This repo never gains a component by editing `_ds`. Use the brief, and `ds-handoff` or `/ds-sync` for any token it needs.
- The script reads its paths from `ds-handoff`'s `handoff.py` and the namespace from `_ds_manifest.json`, so the same skill runs on another product (Digest) once those point there.

## Report

- items found by kind, and how many were NEW vs EXPIRED
- per item: the evidence line, the verdict and note as recorded
- what was applied (files changed or removed), briefs written for Claude Design, and suggested rule lines for folds
- site-verify table, if anything was applied
- what is still open
