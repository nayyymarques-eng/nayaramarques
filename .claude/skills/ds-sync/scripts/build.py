#!/usr/bin/env python3
"""Build the design system artifact's files from this repo only.

    python3 .claude/skills/ds-sync/scripts/build.py <out_dir>

Writes <out_dir>/project/: tokens.json (from _ds/…/tokens/*.css), components/bundle.js (the site's
bundle), components/bundle.css (the non-colour token stylesheets), guidelines/build-rules.md
(CLAUDE.md), and the hand-written files in .claude/skills/ds-sync/artifact/ (README, component
guides and previews, cover). Never writes project/design-system.json: ds-sync edits the live one.
"""
import json, math, os, re, shutil, subprocess, sys

REPO = __file__.split('/.claude/')[0] + '/'
HAND = REPO + '.claude/skills/ds-sync/artifact/'
DS = REPO + '_ds/nayara-silva-design-system-5f30f372-bc41-4da8-94b0-1429300e4b96/'
OUT = sys.argv[1].rstrip('/') + '/project/'
SHA = subprocess.check_output(['git', '-C', REPO, 'rev-parse', '--short', 'HEAD'], text=True).strip()

LINE = re.compile(r'--([a-z0-9-]+):\s*([^;]+);((?:\s*/\*.*?\*/)*)')
HEAD = re.compile(r'/\*\s*---\s*(.*?)\s*-*\s*\*/')


def comments(s):
    cs = [c.strip() for c in re.findall(r'/\*\s*(.*?)\s*\*/', s)]
    return ' '.join(c for c in cs if not c.startswith('@kind'))


def parse(fname):
    """[(name, value, comment, header)] in file order."""
    out, header = [], ''
    for line in open(DS + 'tokens/' + fname).read().split('\n'):
        h = HEAD.search(line)
        if h and line.strip().startswith('/* ---'):
            header = h.group(1)
            continue
        m = LINE.search(line)
        if m:
            out.append((m.group(1), m.group(2).strip(), comments(m.group(3)), header))
    return out


def sentence(s):
    s = s.strip().rstrip('.')
    return (s[:1].upper() + s[1:] + '.') if s else ''


# Token by job, from CLAUDE.md §1
jobs = {}
for row in re.findall(r'^\| (.+?) \| (.+?) \|$', open(REPO + 'CLAUDE.md').read(), re.M):
    toks = re.findall(r'`--([a-z0-9-]+)`', row[1])
    if len(toks) == 1:  # a job shared by two tokens says less than each token's own comment
        jobs.setdefault(toks[0], row[0])

colors = parse('colors.css')
cvals = {n: v for n, v, _, _ in colors}


def hexrgb(ref):
    m = re.match(r'var\(--([a-z0-9-]+)\)$', ref)
    ref = (cvals[m.group(1)] if m else ref).lstrip('#')
    if len(ref) == 3:
        ref = ''.join(c * 2 for c in ref)
    return [int(ref[i:i + 2], 16) for i in (0, 2, 4)]


def group_of(header):
    g = re.split(r'[:,(]', header)[0].strip()
    return {'Blue': 'Accent', 'Terminal / dark surface stack': 'Terminal'}.get(g, g)


color_tokens, notes = [], []
for n, v, c, h in colors:
    m = re.match(r'var\(--([a-z0-9-]+)\)$', v)
    mix = re.match(r'color-mix\(in srgb,\s*(\S+)\s+(\d+)%,\s*(\S+?)\)$', v)
    if m:
        val = '{%s}' % m.group(1)
    elif mix:
        a, p, b = hexrgb(mix.group(1)), int(mix.group(2)) / 100, hexrgb(mix.group(3))
        val = '#' + ''.join('%02x' % math.ceil(x * p + y * (1 - p) - 0.5) for x, y in zip(a, b))
    else:
        val = v.lower()
    parts = [group_of(h) + ' ·']
    if n in jobs:
        parts.append(sentence(jobs[n]))
    if c and n not in jobs:
        parts.append(sentence(c))
    if m and n not in jobs:
        parts.append('Alias of `%s`.' % m.group(1))
    if mix:
        parts.append('Stored as hex (the colour Chrome paints); the site computes it as `%s`.' % re.sub(r'var\(--([a-z0-9-]+)\)', r'\1', v))
    if len(parts) == 1:
        parts.append(sentence(re.sub(r'\s*\((.*)\)', r', \1', h)))
    color_tokens.append({'name': n, 'value': val, 'usage': ' '.join(parts)})

typo = {n: (v, c) for n, v, c, _ in parse('typography.css')}
space = parse('spacing.css')
borders = {n: (v, c) for n, v, c, _ in parse('borders.css')}
fonts = {n: v for n, v, _, _ in parse('fonts.css')}
motion = [n for n, _, _, _ in parse('motion.css')]


def fam(prefix, note=None):
    toks = [{'name': n, 'value': v, 'usage': sentence(c) or '`--%s`.' % n} for n, (v, c) in typo.items() if n.startswith(prefix)]
    return dict(({'note': note} if note else {}), tokens=toks)


def style(name, size, lead, weight, track=None, usage=''):
    s = {'name': name, 'fontSize': typo['size-' + size][0], 'lineHeight': lead, 'fontWeight': int(typo['weight-' + weight][0])}
    if track:
        s['letterSpacing'] = typo['track-' + track][0]
    s['usage'] = usage
    return s


tokens = {
    'name': 'Nayara Marques — Design System', 'version': 1,
    'color': {'themes': [{'id': 'light', 'name': 'Paper'}], 'tokens': color_tokens},
    'type': {
        'fonts': [],
        'families': {'sans': fonts['font-sans'], 'mono': fonts['font-mono']},
        'groups': [
            {'name': 'Archivo', 'family': 'sans',
             'note': 'One typeface, Archivo, from Google Fonts (variable, wght 100 to 900). Headlines use weight 500 at the fluid sizes in Font size; 700 is never set.',
             'styles': [
                 style('body-lg', 'body-lg', typo['leading-body-lg'][0], 'regular', 'body-lg', 'Hero deck and standfirst, and case sub-section titles at weight 500 (LAY-08). `--size-body-lg`, `--leading-body-lg`, `--track-body-lg`.'),
                 style('body', 'body', typo['leading-body'][0], 'regular', None, 'Running prose in `ink-2`. Shorthand `--type-body`.'),
                 style('small', 'small', typo['leading-small'][0], 'regular', None, 'Captions, card prose, chips. Shorthand `--type-small`.'),
                 style('label', 'label', '1.2', 'semibold', 'label', 'Button and link labels, nav links. Uppercase. Shorthand `--type-label`.'),
                 style('eyebrow', 'eyebrow', '1.4', 'semibold', 'eyebrow', 'Section labels and metadata in `ink-6`, `rust` on case heroes. Uppercase. Shorthand `--type-eyebrow`.'),
             ]},
            {'name': 'Mono', 'family': 'mono', 'note': 'System mono stack.',
             'styles': [style('mono', 'label', '1.4', 'regular', None, 'Mono labels in `ink-7`. Shorthand `--type-mono`.')]},
        ]},
    'spacing': {'tokens': [{'name': n, 'value': v, 'usage': sentence(c) or 'Static step.'} for n, v, c, h in space if n.startswith('space-')]},
    'radius': {'tokens': [{'name': n, 'value': v, 'usage': {'radius': 'The only corner radius on the site.', 'radius-pill': 'Once, on the 6px availability dot.', 'radius-none': 'Square.'}.get(n, n)} for n, (v, c) in borders.items() if n.startswith('radius')]},
    'fontSize': fam('size-', 'Headlines are clamp(min, vw, max), the exact source values. Use them as var(--size-*).'),
    'fontWeight': fam('weight-'),
    'letterSpacing': fam('track-', 'Tighter as type grows; wide only for uppercase.'),
    'lineHeight': fam('leading-'),
    'measure': fam('measure-', 'Prose is capped in ch, never in px.'),
    'rhythm': {'note': 'Fluid vertical rhythm and gaps.', 'tokens': [{'name': n, 'value': v, 'usage': sentence(c) or '`--%s`.' % n} for n, v, c, h in space if v.startswith('clamp(')]},
    'layout': {'tokens': [{'name': n, 'value': v, 'usage': sentence(c) or '`--%s`.' % n} for n, v, c, h in space if not n.startswith('space-') and not v.startswith('clamp(')]
               + [{'name': 'bleed-clip', 'value': borders['bleed-clip'][0], 'usage': 'Clip-path of a full-bleed band (LAY-02).'}]},
    'meta': {'source': 'github', 'repo': 'nayyymarques-eng/nayaramarques', 'ref': 'main@' + SHA,
             'package': '_ds/nayara-silva-design-system-5f30f372-bc41-4da8-94b0-1429300e4b96',
             'paths': {'tokens': ['tokens/colors.css', 'tokens/typography.css', 'tokens/spacing.css', 'tokens/borders.css', 'tokens/fonts.css'],
                       'fonts': [], 'assets': ['favicon.svg'], 'docs': ['CLAUDE.md']},
             'components': {},
             'synced': '2026-09-25'},
}
placed = {t['name'] for f in tokens.values() if isinstance(f, dict) and 'tokens' in f for t in f['tokens']}
placed |= {'font-sans', 'font-mono'}
skipped = [n for f in ['typography.css', 'spacing.css', 'borders.css', 'fonts.css'] for n, *_ in parse(f) if n not in placed]

if os.path.exists(OUT):
    shutil.rmtree(OUT)
os.makedirs(OUT + 'components')
os.makedirs(OUT + 'guidelines')
json.dump(tokens, open(OUT + 'tokens.json', 'w'), indent=1, ensure_ascii=False)

# bundle.js: the site's bundle as it ships (an inlined script may not contain these two strings)
b = open(DS + '_ds_bundle.js').read()
assert '</script' not in b.lower() and '<!--' not in b, 'bundle.js has </script or <!--'
open(OUT + 'components/bundle.js', 'w').write(b)
first = b.split('\n', 1)[0]
hdr = json.loads(first[len('/* @ds-bundle: '):first.rindex(' */')])
USED = [c['name'] for c in hdr['components']]
tokens['meta']['components'] = {c: '_ds/…/_ds_bundle.js' for c in USED} | {n: n + '.dc.html' for n in ('Nav', 'Foot')}
json.dump(tokens, open(OUT + 'tokens.json', 'w'), indent=1, ensure_ascii=False)

# bundle.css: the repo's non-colour token stylesheets, verbatim (colours come from tokens.css)
css = ['/* The repository\'s token stylesheets, verbatim, in styles.css order. colors.css is left out:\n   colours come from this system\'s tokens.css. */']
for f in ['fonts', 'typography', 'spacing', 'borders', 'motion', 'base']:
    src = open(DS + 'tokens/%s.css' % f).read()
    imp = re.compile(r'^\s*@import\s+url\([^)]*\)[^;\n]*;', re.M)
    imports = [i.strip() for i in imp.findall(src)]
    if imports:
        css.insert(0, '\n'.join(imports))
    css.append('/* ---- tokens/%s.css ---- */\n%s' % (f, imp.sub('/* @import moved to the top of this file */', src)))
open(OUT + 'components/bundle.css', 'w').write('\n\n'.join(c for c in css if c))

shutil.copy(REPO + 'CLAUDE.md', OUT + 'guidelines/build-rules.md')

# hand-written: README, asset notes, component guides and previews, cover, types
for root, _, names in os.walk(HAND):
    for n in names:
        src = os.path.join(root, n)
        dst = OUT + os.path.relpath(src, HAND)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copy(src, dst)

print('colors', len(color_tokens), '| skipped (in bundle.css, not tokens.json):', ', '.join(skipped + motion))
print('exports', USED, '| files', sum(len(f) for _, _, f in os.walk(OUT)))
