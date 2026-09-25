#!/usr/bin/env python3
"""Static checks on the site source. Run from the repo root:

    python3 harness/check_source.py

Exit code 0 = no failures, 1 = failures. Warnings never fail. Each line: FAIL|warn RULE-ID file detail.
Rules are defined in CLAUDE.md; this script checks the ones a machine can settle.
"""
import collections
import glob
import re
import sys

ROOT = __file__.rsplit('/harness/', 1)[0] + '/'
TOKEN_DIR = ROOT + '_ds/nayara-silva-design-system-5f30f372-bc41-4da8-94b0-1429300e4b96/tokens/'

# CSS contexts: where var() works, so a literal colour is drift
ATTR = re.compile(r'\s(?:style|style-before|style-after|style-hover)="([^"]*)"')
STYLE = re.compile(r'<style(?![^>]*id="boot-style")[^>]*>(.*?)</style>', re.S)
DC_SCRIPT = re.compile(r'<script type="text/x-dc" data-dc-script[^>]*>(.*?)</script>', re.S)
# plain inline scripts (no src) can carry CSS strings: cssText = '…', .style.x = '…', style objects
INLINE_SCRIPT = re.compile(r'<script(?![^>]*\ssrc=)(?![^>]*type="text/x-dc")[^>]*>(.*?)</script>', re.S)
HEX = re.compile(r'#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b')
# colour functions are literals too; tokens/*.css and the boot style may use them
FUNC = re.compile(r'\b(?:rgba?|hsla?|oklch)\(')

# Checks added in the consolidation are reported as warnings until the pages are clean,
# then promoted to failures (the rule leaves this set). COL-06 and COL-07 become failures in
# step 6, once the Claude Design bundle reads the role names and the aliases are removed.
NEW_AS_WARN = {'COL-06', 'COL-07'}

# Token layers in tokens/colors.css: primitives (values only), roles (what pages use), and the
# temporary aliases (old names). Pages use roles.
PRIMITIVE = re.compile(r'var\(--((?:sand|slate|blue|red|green|clay)-\d+)\)')
OLD_NONCOLOUR = re.compile(r'var\(--((?:size|track)-[a-z-]+|space-\d+|card-p|radius|radius-pill|leading-mega)[,)]')

# Known exceptions (COL-02). Keep this list short; every entry needs a reason.
ALLOW = {
    ('*', '#e0c3bd'): 'loading screen placeholder, paints before tokens load',
    ('card-insurance.html', '#cccccc'): 'recreated bank-app screen, not site UI',
    ('card-insurance.html', '#c4c4c4'): 'recreated bank-app screen, not site UI',
    ('composer-spec.html', '#e2e0da'): 'pending B-12 of the consolidation (ΔE 1.19 to --line); remove with it',
}

PAGES = sorted(p for p in glob.glob(ROOT + '*.html') if not p.endswith('.dc.html'))
FILES = sorted(glob.glob(ROOT + '*.html'))

findings = []

def add(rule, path, detail, new=False):
    findings.append((rule, path.replace(ROOT, ''), detail, new and rule in NEW_AS_WARN))

def prose(html):
    """Visible text only, roughly: drop tags, scripts, styles and attributes."""
    html = re.sub(r'<(script|style|svg)[\s\S]*?</\1>', ' ', html)
    return re.sub(r'<[^>]+>', ' ', html)

# every token name the design system defines, in any tokens/*.css file
TOKEN_NAMES = set()
COLOR_TOKEN_NAMES = set()
for f in glob.glob(TOKEN_DIR + '*.css'):
    names = set(re.findall(r'--([a-z0-9-]+)\s*:', open(f).read()))
    TOKEN_NAMES |= names
    if f.endswith('/colors.css'):
        COLOR_TOKEN_NAMES |= names
# the colour aliases: everything declared after the "Temporary aliases" comment
_colors = open(TOKEN_DIR + 'colors.css').read()
_alias_block = _colors.split('Temporary aliases', 1)[1] if 'Temporary aliases' in _colors else ''
ALIASES = set(re.findall(r'--([a-z0-9-]+)\s*:', _alias_block))

for path in FILES:
    t = open(path).read()
    name = path.replace(ROOT, '')
    is_page = path in PAGES

    # COL-01 no literal colours in CSS contexts
    legacy_dc = re.compile(r'<script type="text/x-dc" data-dc-script>(.*?)</script>', re.S)
    for rx, new in ((ATTR, False), (STYLE, False), (DC_SCRIPT, None), (INLINE_SCRIPT, True)):
        for m in rx.finditer(t):
            # scripts with data-props were never scanned before the consolidation
            is_new = new if new is not None else not legacy_dc.match(m.group(0))
            for h in HEX.findall(m.group(1)):
                h = h.lower()
                if ('*', h) in ALLOW or (name, h) in ALLOW:
                    continue
                add('COL-01', path, f'literal colour {h}; use a token from tokens/colors.css', is_new)
            for f in FUNC.findall(m.group(1)):
                add('COL-01', path, f'colour function {f}...); use color-mix(in srgb, var(--token) N%, transparent)', True)

    # COL-06 pages use roles, never primitives
    for k in sorted(set(PRIMITIVE.findall(t))):
        add('COL-06', path, f'uses the primitive --{k}; use a role token', True)

    # COL-07 retired alias names (old token names kept only until the bundle moves to roles)
    old = collections.Counter(m for m in re.findall(r'var\(--([a-z0-9-]+)[,)]', t) if m in ALIASES)
    old.update(k for k in OLD_NONCOLOUR.findall(t) if k in TOKEN_NAMES)
    for k, n in sorted(old.items()):
        add('COL-07', path, f'uses the old name --{k} ({n}x); use its role name', True)

    # COL-03 every page loads the colour tokens
    if is_page and 'tokens/colors.css' not in t:
        add('COL-03', path, 'page does not load tokens/colors.css')

    # COL-04 no page redefines a design-system token (any tokens/*.css file)
    for block in re.findall(r':root\s*\{([^}]*)\}', t):
        for k in re.findall(r'--([a-z0-9-]+):', block):
            if k in TOKEN_NAMES:
                add('COL-04', path, f'redefines --{k}; change it in tokens/ instead', k not in COLOR_TOKEN_NAMES)

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
errors = [f for f in findings if f[0] not in WARN and not f[3]]
warns = [f for f in findings if f[0] in WARN or f[3]]
for rule, name, detail, new in errors + warns:
    print(f'{"FAIL " if (rule, name, detail, new) in errors else "warn "}{rule}  {name}  {detail}')
print(f'\n{len(errors)} failure(s), {len(warns)} warning(s)' if findings else 'pass')
sys.exit(1 if errors else 0)
