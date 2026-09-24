# Paste-ready prompts for Claude Design

Fill the `{…}` parts; drop sections that don't apply. The other Claude cannot open GitHub links, so give it a local folder (it asks for access) or attached files. The repo is public; no token is needed.

## A. Render or rebuild the design system

```
{ROUTE}
- Folder: /Users/nayaramarques/Portfolio and Services/_ds/nayara-silva-design-system-5f30f372-bc41-4da8-94b0-1429300e4b96
- Rules: /Users/nayaramarques/Portfolio and Services/CLAUDE.md (attached as RULES.md in the package)

Answers:
- Repo: nayyymarques-eng/nayaramarques (public), branch main. No token needed.
- Framework: React. Components are compiled into _ds_bundle.js; _ds_manifest.json lists them and their props.
- Fonts: Archivo from Google Fonts (tokens/fonts.css). No font files.
- Logo: no wordmark; the only mark is the red four-point star (logo-mark.svg).
- Name: "Nayara Marques — Design System". The readme still says "Nayara Silva"; use Marques everywhere.

Keep every token name and value exactly as written. Group colours by job (paper stack, ink scale, dark band, accent, lines, semantic, aliases) using the comments in colors.css. Use the rules file as the system's guidelines, with their IDs. Render one card per component with its props. If something can't be rendered, list it with the reason instead of guessing.
```

`{ROUTE}` is either
`Use option 1 (local folder):` or
`Use option 2. I've attached the files from ~/Downloads/nayara-marques-design-system.zip:`

## B. Update tokens that changed in the repo

```
Update these tokens in tokens/colors.css of the "Nayara Marques — Design System" project. Change only these lines; keep names, comments and everything else as is.

{one line per change, e.g.}
--line:#dedbd5;           /* default 1px rule and card border */
--on-ink-muted:#a4a8ae;   /* prose on the dark section */

Then show me the colour page so I can confirm the swatches.
```

## Checks on its answer
- Current values of anything that changed (from the drift report). An old value means it read an old copy.
- It can render components but not change the site's copy of them: component edits only reach the site when exported again and replacing `_ds_bundle.js` (CMP-04).
