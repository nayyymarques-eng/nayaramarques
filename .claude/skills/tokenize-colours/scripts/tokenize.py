#!/usr/bin/env python3
"""Replace hard-coded colours with design-system tokens.

    python3 .claude/skills/tokenize-colours/scripts/tokenize.py scan
    python3 .claude/skills/tokenize-colours/scripts/tokenize.py apply [--decisions decisions.json] [--dry-run]

scan   lists every literal colour in a CSS context, grouped as
       EXACT (equals a token: applied automatically), NEAR (closest token and its distance:
       needs the owner's decision), ALLOWED (COL-02 exceptions).
apply  replaces EXACT matches, plus the NEAR ones listed in decisions.json:
       {"#e9e7e2": "surface-band", "#e8e6e1": {"border": "border-subtle", "default": "surface-hover"},
        "#e4eef4": "surface-accent-tint", "#cccccc": "keep"}
       It never rewrites custom-property definitions, never swaps in a token that the same file
       redefines, and adds the tokens stylesheet to any page that lacks it.
Only CSS contexts are touched (style / style-before / style-after / style-hover attributes,
<style> blocks except the boot style, CSS strings in x-dc scripts). SVG fill/stroke attributes
are left alone: var() does not work there.
"""
import glob
import json
import re
import sys

ROOT = __file__.split('/.claude/')[0] + '/'
DS = '_ds/nayara-silva-design-system-5f30f372-bc41-4da8-94b0-1429300e4b96'
TOKENS = ROOT + DS + '/tokens/colors.css'
LINK = '<link rel="stylesheet" href="%s/tokens/colors.css">' % DS

ATTR = re.compile(r'(\s(?:style|style-before|style-after|style-hover)=")([^"]*)(")')
STYLE = re.compile(r'(<style(?![^>]*id="boot-style")[^>]*>)(.*?)(</style>)', re.S)
DC = re.compile(r'(<script type="text/x-dc" data-dc-script[^>]*>)(.*?)(</script>)', re.S)
DC_CSS = re.compile(r"([a-z-]+:[^;'\"`]*?)#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b")
HEX = re.compile(r'#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b')

# COL-02: the only literals allowed to stay (keep in step with harness/check_source.py)
ALLOW = {('*', 'e0c3bd'), ('card-insurance.html', 'cccccc'), ('card-insurance.html', 'c4c4c4')}


def norm(h):
    h = h.lower().lstrip('#')
    return ''.join(c * 2 for c in h) if len(h) == 3 else h


def rgb(h):
    h = norm(h)
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


PRIMITIVE = re.compile(r'^(?:sand|slate|blue|red|green|clay)-\d+$')


def load_tokens():
    """hex -> role names. Resolves var() chains, so roles match by value; never offers a primitive
    or a temporary alias (the names after the "Temporary aliases" comment)."""
    text = open(TOKENS).read()
    alias_block = text.split('Temporary aliases', 1)[1] if 'Temporary aliases' in text else ''
    aliases = set(re.findall(r'--([a-z0-9-]+)\s*:', alias_block))
    decl = dict(re.findall(r'--([a-z0-9-]+):\s*([^;]+?)\s*;', text))

    def resolve(v, depth=0):
        m = re.match(r'^var\(--([a-z0-9-]+)\)$', v.strip())
        if m and depth < 10 and m.group(1) in decl:
            return resolve(decl[m.group(1)], depth + 1)
        return v.strip()

    toks = {}
    for name, val in decl.items():
        if name in aliases or PRIMITIVE.match(name):
            continue
        val = resolve(val)
        if re.match(r'^#[0-9a-fA-F]{3,6}$', val):
            toks.setdefault(norm(val), []).append(name)
    return toks


TOKENS_BY_HEX = load_tokens()


def prop_of(s, pos):
    start = max(s.rfind(c, 0, pos) for c in ';{"\'\n')
    return s[start + 1:pos].split(':')[0].strip().lower()


def pick(names, prop):
    """Several roles can share a value (text-strong / border-emphatic). Choose by the job the property does."""
    if prop.startswith('border') or prop == 'outline':
        pref = ('border', 'border-subtle', 'border-strong', 'border-emphatic')
    elif prop in ('color', 'fill', 'stroke'):
        pref = ('text-strong', 'text-body', 'text-muted', 'text-on-inverse', 'accent', 'status-gain', 'status-cost')
    else:
        pref = ('surface-page', 'surface-band', 'surface-card', 'surface-inverse')
    for p in pref:
        if p in names:
            return p
    return names[0]


def nearest(h):
    r = rgb(h)
    site = [t for t, ns in TOKENS_BY_HEX.items() if any(n != 'text-on-inverse-mock' for n in ns)]  # the mock text colour is for mockups only
    best = min(site, key=lambda t: sum((a - b) ** 2 for a, b in zip(r, rgb(t))))
    dist = max(abs(a - b) for a, b in zip(r, rgb(best)))
    return best, dist


def local_overrides(t):
    out = set()
    for block in re.findall(r':root\s*\{([^}]*)\}', t):
        out.update(re.findall(r'--([a-z0-9-]+):', block))
    return out


def css_contexts(t):
    for rx in (ATTR, STYLE):
        for m in rx.finditer(t):
            yield m.group(2), 'css'
    for m in DC.finditer(t):
        yield m.group(2), 'dc'


def scan():
    exact, near, allowed = {}, {}, {}
    for f in sorted(glob.glob(ROOT + '*.html')):
        name = f.replace(ROOT, '')
        t = open(f).read()
        for s, kind in css_contexts(t):
            for m in HEX.finditer(s):
                h = norm(m.group(1))
                prop = prop_of(s, m.start())
                if prop.startswith('--'):
                    continue
                if ('*', h) in ALLOW or (name, h) in ALLOW:
                    allowed.setdefault(h, set()).add(name)
                elif h in TOKENS_BY_HEX:
                    exact.setdefault(h, {}).setdefault(prop, 0)
                    exact[h][prop] += 1
                else:
                    near.setdefault(h, {'props': {}, 'files': set()})
                    near[h]['props'][prop] = near[h]['props'].get(prop, 0) + 1
                    near[h]['files'].add(name)
    print('EXACT (applied automatically)')
    for h, props in sorted(exact.items(), key=lambda x: -sum(x[1].values())):
        print('  #%s  x%d  -> %s' % (h, sum(props.values()), ', '.join('%s: --%s' % (p or '?', pick(TOKENS_BY_HEX[h], p)) for p in props)))
    print('\nNEAR (needs a decision)')
    for h, d in sorted(near.items(), key=lambda x: -sum(x[1]['props'].values())):
        tok, dist = nearest(h)
        print('  #%s  x%d  nearest --%s (#%s, max channel diff %d)  props %s  files %s' % (
            h, sum(d['props'].values()), pick(TOKENS_BY_HEX[tok], ''), tok, dist,
            dict(sorted(d['props'].items(), key=lambda x: -x[1])[:3]), sorted(d['files'])[:4]))
    print('\nALLOWED (COL-02)')
    for h, files in allowed.items():
        print('  #%s  %s' % (h, sorted(files)))


def apply(decisions, dry):
    total_before = total_after = 0
    for f in sorted(glob.glob(ROOT + '*.html')):
        name = f.replace(ROOT, '')
        t = orig = open(f).read()
        skip = local_overrides(t)

        def token(h, prop):
            h = norm(h)
            if ('*', h) in ALLOW or (name, h) in ALLOW or prop.startswith('--'):
                return None
            d = decisions.get('#' + h)
            if d == 'keep':
                return None
            if isinstance(d, dict):
                d = d.get('border' if prop.startswith('border') or prop == 'outline' else 'default')
            if isinstance(d, str):
                return d if d.startswith('color-mix(') else ('var(--%s)' % d if d not in skip else None)
            if h in TOKENS_BY_HEX:
                n = pick(TOKENS_BY_HEX[h], prop)
                return None if n in skip else 'var(--%s)' % n
            return None

        def css(m):
            s = m.group(2)
            s = HEX.sub(lambda x: token(x.group(1), prop_of(s, x.start())) or x.group(0), s)
            return m.group(1) + s + m.group(3)

        def dc(m):
            s, prev = m.group(2), None
            while prev != s:
                prev = s
                s = DC_CSS.sub(lambda x: x.group(1) + (token(x.group(2), x.group(1).split(':')[0].strip().lower()) or '#' + x.group(2)), s)
            return m.group(1) + s + m.group(3)

        t = ATTR.sub(css, t)
        t = STYLE.sub(css, t)
        t = DC.sub(dc, t)
        if not name.endswith('.dc.html') and '/tokens/colors.css' not in t and '<style' in t:
            i = t.index('<style')
            t = t[:i] + LINK + '\n' + t[i:]
        b = sum(len(HEX.findall(s)) for s, _ in css_contexts(orig))
        a = sum(len(HEX.findall(s)) for s, _ in css_contexts(t))
        total_before += b
        total_after += a
        if t != orig:
            print('%-28s %4d -> %4d%s' % (name, b, a, '  (dry run)' if dry else ''))
            if not dry:
                open(f, 'w').write(t)
    print('literal colours in CSS: %d -> %d' % (total_before, total_after))


if __name__ == '__main__':
    args = sys.argv[1:]
    if not args or args[0] not in ('scan', 'apply'):
        print(__doc__)
        sys.exit(2)
    if args[0] == 'scan':
        scan()
    else:
        dec = {}
        if '--decisions' in args:
            raw = json.load(open(args[args.index('--decisions') + 1]))
            dec = {('#' + norm(k)): v for k, v in raw.items()}
        apply(dec, '--dry-run' in args)
