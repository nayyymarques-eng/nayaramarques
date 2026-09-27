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
NEW_AS_WARN = {'COL-06', 'COL-07', 'ACT-02', 'RET-03', 'FLW-02'}

# Token layers in tokens/colors.css: primitives (values only), roles (what pages use), and the
# temporary aliases (old names). Pages use roles.
PRIMITIVE = re.compile(r'var\(--((?:sand|sky|mist|slate|blue|blue-shade|peach|red|green|clay|graphite|coral)-\d+|black)\)')
OLD_NONCOLOUR = re.compile(r'var\(--((?:size|track)-[a-z-]+|space-\d+|card-p|radius|radius-pill|leading-mega)[,)]')

# Known exceptions (COL-02). Keep this list short; every entry needs a reason.
ALLOW = {
    ('*', '#e0c3bd'): 'loading screen placeholder, paints before tokens load',
}

# Content patterns (CLAUDE.md §7): each job has one structure. Round 3 (2026-09-26): constraints, steps and outcomes
# joined the cards, and every card is stacked (PAT-05); gaps are inactive rows (PAT-07).
PAT_JOBS = {j: 'ListRow' for j in ('finding', 'reference', 'gap')}
# principle joined the cards on 2026-09-26 (round 3 verdict); about's hand-built principle rows carry links and wait for a links line in DecisionCard
PAT_JOBS.update({j: 'DecisionCard' for j in ('problem', 'constraint', 'step', 'decision', 'feature', 'term', 'outcome', 'lesson', 'principle')})
# the eyebrow is a card's marker where the job has one (PAT-03)
PAT_EYEBROW = {'problem': r'Problem [A-Z]', 'constraint': r'Constraint [A-Z]', 'step': r'\d{2}|Phase \d+'}

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
_alias_block = _colors.split('Temporary aliases', 1)[1].split('}', 1)[0] if 'Temporary aliases' in _colors else ''
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

    # COL-03 every page loads the token files in order, then components.css; SKY-01 and the sky
    if is_page:
        order = ['tokens/colors.css', 'tokens/typography.css', 'tokens/spacing.css', 'tokens/borders.css',
                 'tokens/motion.css', 'tokens/base.css', 'components.css']
        pos = [t.find('href="' + ('_ds/nayara-silva-design-system-5f30f372-bc41-4da8-94b0-1429300e4b96/' if o.startswith('tokens') else '') + o + '"') for o in order]
        missing = [o for o, i in zip(order, pos) if i < 0]
        if missing:
            add('COL-03', path, 'page does not load ' + ', '.join(missing))
        elif pos != sorted(pos):
            add('COL-03', path, 'token files load out of order: colors, typography, spacing, borders, motion, base, components.css')
        if 'src="./sky.js"' not in t:
            add('SKY-01', path, 'page does not load sky.js (the one sky behind every page)')

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

    # --- Theme sky rules (CLAUDE.md §6) ------------------------------------------------------------------
    attrs = [m.group(0) for m in re.finditer(r'\s(?:style|style-before|style-after|style-hover)="[^"]*"', t)]
    blocks = STYLE.findall(t)
    styles_all = ' '.join(attrs) + ' ' + ' '.join(blocks)
    # SKY-02 no page or section paints its own ground: the bands and their bleed are retired
    if re.search(r'100vmax var\(--surface-(?:page|band)\)|var\(--surface-band\)', styles_all):
        add('SKY-02', path, 'a section paints its own ground (surface-band or a page-coloured bleed); the sky is the only ground')
    for blk in blocks:
        if re.search(r'(?:^|[\s}])body\s*\{[^}]*background\s*:', blk):
            add('SKY-02', path, 'a <style> gives body a background; the body stays transparent over the sky')
    # SEC-01 dividers are in flow, at content width: never a line to the viewport edge
    for a_ in attrs:
        if a_.lstrip().startswith(('style-before', 'style-after')) and 'left:-100vmax' in a_:
            add('SEC-01', path, 'an edge-to-edge line (left:-100vmax); a divider stops at the content edge')
    # CRD-01 grouped cards stand apart; no hairline grid on a filled gutter
    for a_ in attrs:
        if re.search(r'(?:^|[;"])gap:1px(?:;|")', a_) and re.search(r'background:var\(--border', a_):
            add('CRD-01', path, 'a hairline grid (gap:1px on a filled gutter); use .card or .link-card, 12px apart')
    # ACT-01 exactly three action variants, sentence case
    for m in re.finditer(r'<(a|button|summary)\b([^>]*)>', t):
        tag_attrs = m.group(2)
        st = re.search(r'\sstyle="([^"]*)"', tag_attrs)
        st = st.group(1) if st else ''
        if 'text-transform:uppercase' in st and ('padding:var(--space-md) var(--space-xl)' in st or 'height:44px' in st or 'padding:14px 24px' in st):
            add('ACT-01', path, 'an uppercase, boxed action; use .action--primary, --link or --inverse (sentence case)')
        c = re.search(r'\sclass="([^"]*)"', tag_attrs)
        if c and re.search(r'(?:^|\s)action(?:\s|$)', c.group(1)):
            v = re.findall(r'action--([a-z-]+)', c.group(1))
            if len(v) != 1 or v[0] not in ('primary', 'link', 'inverse'):
                add('ACT-01', path, f'an action with variant {v or "none"}; exactly one of primary, link, inverse')
    # ACT-02 one primary per view: one outside offer cards (the hero's), at most one inside each offer card (.plan-card)
    if is_page:
        prim = r'class="[^"]*\baction--primary\b'
        cards = re.findall(r'<article class="plan-card"[\s\S]*?</article>', t)
        if len(re.findall(prim, t)) - sum(len(re.findall(prim, c)) for c in cards) > 1:
            add('ACT-02', path, 'more than one primary action outside offer cards; one primary, then links', True)
        if any(len(re.findall(prim, c)) > 1 for c in cards):
            add('ACT-02', path, 'an offer card with more than one primary action', True)
    # RET retired patterns
    if name not in ('Nav.dc.html', '404.html', 'index.html') and 'var(--brand-mark)' in styles_all:
        add('RET-01', path, 'red outside the nav mark, the section bar and the home sticker; arrows and ordinals take the accent')
    if re.search(r'\[data-illo\][^{]*\{[^}]*opacity:\s*\.5', ' '.join(blocks)):
        add('RET-02', path, 'illustrations dimmed to 50%; illustration windows are at full strength')
    if re.search(r'border(?:-[a-z]+)?:\s*1px dashed', styles_all):
        add('RET-03', path, 'a dashed frame; a figure is one white surface (a separate place is .elsewhere)', True)
    if 'text-decoration:line-through' in styles_all:
        add('FLW-02', path, 'struck-through text: label a considered option with its reason (.tag--considered); product mockups excepted', True)
    # HERO-01 the first section in <main> is the hero
    if is_page and '<main' in t:
        main_tag = re.search(r'<main\b([^>]*)>', t).group(1)
        mm = re.search(r'<main\b[^>]*>\s*(?:<!--[\s\S]*?-->\s*)*<(?:section|div)\b([^>]*)>', t)
        if 'class="hero' not in main_tag and not (mm and re.search(r'class="[^"]*\bhero\b', mm.group(1))):
            add('HERO-01', path, 'the first section in <main> is not the hero (.hero): nav, --hero-top, eyebrow, 16px, h1')

    # --- Content patterns (CLAUDE.md §7, PAT) ------------------------------------------------------------
    # PAT-02 numbers belong to the section title only: no "5.2" sub-section numbers
    for m in re.finditer(r'<h3\b[^>]*>\s*(?:<span[^>]*>)?\s*(\d+\.\d+)\b', t):
        add('PAT-02', path, f'a numbered sub-section ("{m.group(1)}"); sub-sections are h3.subsection with no number')
    if is_page and 'case-index.js' in t:
        # PAT-01 every row, card, step list and number block on a case page names its job, and the job fits the structure
        for m in re.finditer(r'<x-import component-from-global-scope="NayaraSilvaDesignSystem_5f30f3\.(ListRow|DecisionCard)"([^>]*)>', t):
            comp, attrs = m.group(1), m.group(2)
            job = re.search(r'\sdata-pattern="([a-z]+)"', attrs)
            title = (re.search(r'\stitle="([^"]*)"', attrs) or re.search(r'()', '')).group(1)[:40]
            if not job:
                add('PAT-01', path, f'{comp} "{title}" has no data-pattern; name its job (CLAUDE.md §7)')
                continue
            job = job.group(1)
            if job not in PAT_JOBS:
                add('PAT-01', path, f'unknown job data-pattern="{job}" on {comp} "{title}"')
            elif PAT_JOBS[job] != comp:
                add('PAT-01', path, f'data-pattern="{job}" is a {PAT_JOBS[job]} job, drawn here as a {comp} ("{title}")')
            # PAT-03 markers: ordinals only on steps; letters only on problems and constraints (decisions cite them)
            eb = re.search(r'\seyebrow="([^"]*)"', attrs)
            if comp == 'DecisionCard' and job in PAT_EYEBROW and not (eb and re.fullmatch(PAT_EYEBROW[job], eb.group(1))):
                add('PAT-03', path, f'a {job} card "{title}" with eyebrow "{eb.group(1) if eb else ""}"; its marker is the eyebrow ({PAT_EYEBROW[job]})')
            mk = re.search(r'\smarker="([^"]*)"', attrs)
            if comp == 'ListRow' and mk and mk.group(1):
                if re.fullmatch(r'\d+', mk.group(1)):
                    add('PAT-03', path, f'an ordinal marker "{mk.group(1)}" on a {job} row; ordinals only where order matters (.stages)')
                else:
                    add('PAT-03', path, f'a marker "{mk.group(1)}" on a {job} row; rows carry no marker (constraints are cards, their letter is the eyebrow)')
        # PAT-05 cards are stacked: one per row, full content width. The two-up grid and the horizontal steps are retired.
        for m in re.finditer(r'class="[^"]*\b(cards--2|stages|stage)\b[^"]*"', t):
            add('PAT-05', path, f'.{m.group(1)} is retired: cards are stacked, one per row, in .cards (steps are DecisionCards with data-pattern="step")')
        # PAT-07 the section that says what the case doesn't cover holds gap rows only
        gm = re.search(r"<h2 data-rail[^>]*>\d\d — What this case doesn(?:'|&#39;|’)t cover</h2>(.*?)(?=<h2 data-rail|</section>)", t, re.S)
        if not gm:
            add('PAT-07', path, "no rail section \"What this case doesn't cover\" (LAY-07)")
        else:
            for m in re.finditer(r'<x-import component-from-global-scope="NayaraSilvaDesignSystem_5f30f3\.(\w+)"([^>]*)>', gm.group(1)):
                if m.group(1) != 'ListRow' or 'data-pattern="gap"' not in m.group(2):
                    add('PAT-07', path, f"a {m.group(1)} in \"What this case doesn't cover\" that is not a gap row; gaps are ListRow data-pattern=\"gap\" (the inactive style)")
        for m in re.finditer(r'data-pattern="gap"', t[:gm.start()] if gm else t):
            add('PAT-07', path, "a gap row outside \"What this case doesn't cover\"")
        for m in re.finditer(r'<(?:ol|ul|div)\b[^>]*class="(stats|tags)\b[^"]*"[^>]*>', t):
            job = re.search(r'\sdata-pattern="([a-z]+)"', m.group(0))
            want = {'stats': ('result', 'scope'), 'tags': ('finding', 'term')}[m.group(1)]
            if not job or job.group(1) not in want:
                add('PAT-04' if m.group(1) == 'stats' else 'PAT-01', path,
                    f'.{m.group(1)} needs data-pattern="{"|".join(want)}"' + (' (a big number is a Result or a Scope count, and says which)' if m.group(1) == 'stats' else ''))
        # PAT-04 big numbers only inside .stats: an inline 2xl block holding a bare number is a hand-drawn stat
        for m in re.finditer(r'<(?:div|span|p)\s+style="[^"]*font-size:var\(--font-size-(?:2xl|3xl|xl)\)[^"]*">\s*([+\-−]?[\d.,]+\s*(?:%|×|x)?|\d+\s*→\s*\d+)\s*</', t):
            add('PAT-04', path, f'a big number "{m.group(1)}" outside .stats; use .stats with data-pattern="result|scope"')

    if not is_page:
        continue
    text = prose(t)

    # CNT-10 the design process is not news
    for m in re.finditer(r'[^.]{0,50}\b(before (?:the )?build(?:ing)?|before any (?:of it was built|build|screen)|before it was built|made before|decided before|before the first screen)\b[^.]{0,30}', text, re.I):
        add('CNT-10', path, f'process narrated as news: "{m.group(0).strip()[:80]}"')

    # CNT-01 no prices
    if re.search(r'fixed price|fixed fee|[$€£]\s?\d', text, re.I) and name not in ('start-a-project.html', 'index.html', 'work.html'):
        add('CNT-01', path, 'price wording found; the site does not discuss price')
    # CNT-01 the offer pages say nothing about price at all (Nayara, round 5): no Investment section, no "Priced on the call", no fees
    if name in ('project-engagement.html', 'embedded-partner.html', 'design-system-build.html', 'design-system-audit.html'):
        for m in re.finditer(r'[^.]{0,30}\b(pric\w*|fees?|investment|retainer rate|a figure)\b[^.]{0,30}', text, re.I):
            if re.search(r'investment (?:platform|bank)', m.group(0), re.I):
                continue
            add('CNT-01', path, f'price talk on an offer page: "{m.group(0).strip()[:70]}"')
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

WARN = {'CNT-04', 'CNT-10'}   # needs a person's judgement: reported, never blocks a deploy
errors = [f for f in findings if f[0] not in WARN and not f[3]]
warns = [f for f in findings if f[0] in WARN or f[3]]
for rule, name, detail, new in errors + warns:
    print(f'{"FAIL " if (rule, name, detail, new) in errors else "warn "}{rule}  {name}  {detail}')
print(f'\n{len(errors)} failure(s), {len(warns)} warning(s)' if findings else 'pass')
sys.exit(1 if errors else 0)
