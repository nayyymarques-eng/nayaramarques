#!/usr/bin/env python3
"""Static checks on the site source. Run from the repo root:

    python3 harness/check_source.py

Exit code 0 = no failures, 1 = failures. Warnings never fail. Each line: FAIL|warn RULE-ID file detail.
Rules are defined in CLAUDE.md; this script checks the ones a machine can settle.
"""
import glob
import re
import sys

ROOT = __file__.rsplit('/harness/', 1)[0] + '/'
TOKENS = ROOT + '_ds/nayara-silva-design-system-5f30f372-bc41-4da8-94b0-1429300e4b96/tokens/colors.css'

# CSS contexts: where var() works, so a literal colour is drift
ATTR = re.compile(r'\s(?:style|style-before|style-after|style-hover)="([^"]*)"')
STYLE = re.compile(r'<style(?![^>]*id="boot-style")[^>]*>(.*?)</style>', re.S)
DC_SCRIPT = re.compile(r'<script type="text/x-dc" data-dc-script>(.*?)</script>', re.S)
HEX = re.compile(r'#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b')

# Known exceptions (COL-02). Keep this list short; every entry needs a reason.
ALLOW = {
    ('*', '#e0c3bd'): 'loading screen placeholder, paints before tokens load',
    ('card-insurance.html', '#cccccc'): 'recreated bank-app screen, not site UI',
    ('card-insurance.html', '#c4c4c4'): 'recreated bank-app screen, not site UI',
}

PAGES = sorted(p for p in glob.glob(ROOT + '*.html') if not p.endswith('.dc.html'))
FILES = sorted(glob.glob(ROOT + '*.html'))

findings = []

def add(rule, path, detail):
    findings.append((rule, path.replace(ROOT, ''), detail))

def prose(html):
    """Visible text only, roughly: drop tags, scripts, styles and attributes."""
    html = re.sub(r'<(script|style|svg)[\s\S]*?</\1>', ' ', html)
    return re.sub(r'<[^>]+>', ' ', html)

tokens_css = open(TOKENS).read()

for path in FILES:
    t = open(path).read()
    name = path.replace(ROOT, '')
    is_page = path in PAGES

    # COL-01 no literal colours in CSS contexts
    for rx in (ATTR, STYLE, DC_SCRIPT):
        for m in rx.finditer(t):
            for h in HEX.findall(m.group(1)):
                h = h.lower()
                if ('*', h) in ALLOW or (name, h) in ALLOW:
                    continue
                add('COL-01', path, f'literal colour {h}; use a token from tokens/colors.css')

    # COL-03 every page loads the colour tokens
    if is_page and 'tokens/colors.css' not in t:
        add('COL-03', path, 'page does not load tokens/colors.css')

    # COL-04 no page redefines a design-system colour token
    for block in re.findall(r':root\s*\{([^}]*)\}', t):
        for k in re.findall(r'--([a-z0-9-]+):', block):
            if re.search(r'--' + re.escape(k) + r':', tokens_css):
                add('COL-04', path, f'redefines --{k}; change it in tokens/colors.css instead')

    # LAY-01 page wrapper clips horizontal overflow (full-bleed lines must not widen the page)
    if is_page and '<x-dc>' in t and 'overflow-x:clip' not in t.split('</helmet>', 1)[-1][:2000]:
        add('LAY-01', path, 'outer wrapper is missing overflow-x:clip')

    # LAY-02 section borders are full-bleed pseudo lines, never content-width borders on bands
    for m in re.finditer(r'<(?:div|section) style="([^"]*clip-path:inset\(0 -100vmax\)[^"]*)"', t):
        if re.search(r'border-(?:top|bottom):1px', m.group(1)):
            add('LAY-02', path, 'full-bleed band uses a content-width border; use style-before/style-after')

    if not is_page:
        continue
    text = prose(t)

    # CNT-01 no prices
    if re.search(r'fixed price|fixed fee|[$€£]\s?\d', text, re.I) and name not in ('start-a-project.html', 'index.html', 'work.html'):
        add('CNT-01', path, 'price wording found; every offer is "Priced on the call"')
    # CNT-02 one name
    if 'Nayara Silva' in t:
        add('CNT-02', path, '"Nayara Silva" found; the name is Nayara Marques')
    # CNT-03 client name stays off services and AI case pages
    if name in ('ai-surfaces.html', 'composer-spec.html', 'design-system.html', 'design-system-build.html',
                'design-system-audit.html') and re.search(r'\bClade\b', text):
        add('CNT-03', path, '"Clade" found; say "an AI platform in private capital markets"')
    # CNT-04 em dashes in prose (rail numbers "01 — Title" and page titles are the only allowed use)
    for m in re.finditer(r'[^\n]{0,40} — [^\n]{0,40}', text):
        s = m.group(0).strip()
        if re.match(r'^\d\d — ', s) or 'Nayara Marques' in s:
            continue
        add('CNT-04', path, f'em dash in prose: "{s[:70]}"')

WARN = {'CNT-04'}   # needs a person's judgement: reported, never blocks a deploy
errors = [f for f in findings if f[0] not in WARN]
warns = [f for f in findings if f[0] in WARN]
for rule, name, detail in errors + warns:
    print(f'{"warn " if rule in WARN else "FAIL "}{rule}  {name}  {detail}')
print(f'\n{len(errors)} failure(s), {len(warns)} warning(s)' if findings else 'pass')
sys.exit(1 if errors else 0)
