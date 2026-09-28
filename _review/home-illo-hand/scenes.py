"""The six case scenes (home and Work), direction B "The hand": built from one source.

Nayara's decision, 2026-09-28: direction B from the Fable exploration (branch home-illo-fable, _review/home-illo/).
No window, no arrow: a cursor performs the case's one change left to right, each click leaves a ring and a mark that
persists, the scene ends resolved and resets with a fade. Below 900px the cursor hides and the scene stacks, still.
Motion lives in components.css (.scene--hand, .h-on*, .h-off*, .h-kn, .sc-hand, .sc-ring) and art.js (measures the
[data-p="p0".."p5"] stops, starts the loop in view, pauses it off screen). Run from the repo root:
    python3 _review/home-illo-hand/scenes.py      # writes the scenes into index.html and work.html
Supersedes _review/home-illo/scenes.py (the round 5 entrance scenes, kept for the record).
"""
import re, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]

P = {
    'up': '<path d="M12 19V5M5 12l7-7 7 7"/>',
    'check': '<path d="M20 6 9 17l-5-5"/>',
    'plus': '<path d="M5 12h14M12 5v14"/>',
    'down': '<path d="m6 9 6 6 6-6"/>',
    'reply': '<path d="m9 17-5-5 5-5M20 18v-2a4 4 0 0 0-4-4H4"/>',
    'dash': '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
    'chart': '<path d="M3 3v18h18M8 17v-5M13 17V8M18 17v-9"/>',
    'doc': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    'note': '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h4"/>',
    'mail': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    'truck': '<path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    'figma': '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>',
    'code': '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    'btn': '<rect x="3" y="8" width="18" height="8" rx="2"/><path d="M8 12h8"/>',
    'input': '<rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 11v2"/>',
    'toggle': '<rect x="2" y="6" width="20" height="12" rx="6"/><circle cx="16" cy="12" r="3"/>',
    'card': '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    'spark': '<path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4M5.3 5.3l2.3 2.3M16.4 16.4l2.3 2.3M18.7 5.3l-2.3 2.3M7.6 16.4l-2.3 2.3"/>',
    'home': '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    'user': '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'star': '<path d="m12 2 3 6.5 7 .8-5.2 4.8 1.5 7L12 17.5 5.7 21l1.5-7L2 9.3l7-.8z"/>',
    'shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    'lock': '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    'plane': '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
    'lounge': '<path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3z"/><path d="M6 18v2M18 18v2"/>',
    'health': '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/>',
    'bag': '<path d="M6 7h12l1 14H5z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
    'umbrella': '<path d="M22 12a10 10 0 0 0-20 0z"/><path d="M12 12v7a2 2 0 0 0 4 0"/>',
}


def ico(name, cls='sc-ico', style='', sw=2):
    st = f' style="{style}"' if style else ''
    return f'<svg class="{cls}"{st} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{P[name]}</svg>'


def send(cls='', quiet=False, p=''):
    q = ' illo-send--quiet' if quiet else ''
    dp = f' data-p="{p}"' if p else ''
    return f'<span class="illo-send{q}{cls}"{dp}>{ico("up", "", "", 2.4)}</span>'


def bar(w, ink=False, style=''):
    k = ' illo-bar--ink' if ink else ''
    return f'<span class="illo-bar{k}" style="width:{w};{style}"></span>'


def lab(t, kind='', cls='', p=''):
    c = {'': 'illo-label', 'acc': 'illo-label illo-label--accent', 'core': 'illo-label sc-core', 'ink': 'illo-label illo-label--ink'}[kind]
    dp = f' data-p="{p}"' if p else ''
    return f'<p class="{c}{" " + cls if cls else ""}"{dp}>{t}</p>'


CURSOR = '<svg viewBox="0 0 16 20" aria-hidden="true"><path d="M1.5 1.2v15.2l3.9-3.6 2.6 5.8 2.5-1.1-2.6-5.7h5.4z"/></svg>'


def hand(rings, carry=''):
    r = ''.join(f'<span class="sc-ring" data-at="p{k}"></span>' for k in range(1, rings + 1))
    c = f'<span class="sc-hand__carry">{carry}</span>' if carry else ''
    return f'{r}<span class="sc-hand">{CURSOR}{c}</span>'


def scene(key, before, after, cap_before, cap_after, rings, carry='', cols=''):
    st = f' style="--cols:{cols}"' if cols else ''
    return (f'<div class="scene scene--hand" data-illo="" data-scene="{key}" aria-hidden="true"{st}>'
            f'<div class="scene__pic" data-side="before">{before}</div><div class="scene__to"></div>'
            f'<div class="scene__pic" data-side="after">{after}</div>'
            f'<div class="scene__cap" data-side="before">{cap_before}</div><div class="scene__cap" data-side="after">{cap_after}</div>'
            f'{hand(rings, carry)}</div>')


# ---------- 01 AI surfaces: the cursor carries the AI from its own page to each place ----------
def c1():
    places = [('Dashboard', 'dash', '54%'), ('Reports', 'chart', '66%'), ('Documents', 'doc', '44%'), ('Meeting notes', 'note', '60%')]
    before = ''.join(f'<div class="sc-ghost sc-row" style="flex:1">{ico(ic)}{bar(w)}</div>' for _, ic, w in places)
    before = (f'<div class="sc-col sc-fill" style="gap:8px">{before}'
              f'<div class="sc-dash sc-row" style="flex:1;justify-content:center;border-radius:var(--radius-md)">{send(quiet=True, p="p0")}{bar("40%", style="background:var(--border-divider)")}</div></div>')
    rows = ''
    for k, (name, ic, w) in enumerate(places, 1):
        rows += (f'<div style="position:relative;flex:1;display:flex;flex-direction:column">'
                 f'<div class="sc-ghost sc-row h-off{k}" style="flex:1">{ico(ic)}{bar(w)}</div>'
                 f'<div class="sc-card sc-row sc-hand-over h-on{k}">{ico(ic)}{lab(name, "ink")}<span class="sc-end">{send(p=f"p{k}")}</span></div></div>')
    after = f'<div class="sc-col sc-fill" style="gap:8px">{rows}</div>'
    return scene('c1', before, after, lab('AI page, apart'), lab('AI where the work is', 'core', 'h-on5', 'p5'), 4, carry=send())


# ---------- 02 Fleet: the platform does not answer; the email's Reply does ----------
def c2():
    scr = ''
    for i, (l, t, ws) in enumerate([(0, 0, (42, 74, 58)), (14, 26, (60, 48, 80)), (28, 52, (50, 72, 40))]):
        bars = ''.join(bar(f'{w}%') for w in ws)
        dp = ' data-p="p1"' if i == 2 else ''
        dots = '<span class="sc-row" style="gap:4px">' + '<span class="illo-dot illo-dot--quiet" style="width:5px;height:5px"></span>' * 3 + '</span>'
        scr += (f'<div class="sc-ghost sc-col"{dp} style="position:absolute;left:{l}%;top:{t}px;width:72%;height:calc(100% - 52px);gap:7px;background:var(--surface-well)">{dots}{bars}</div>')
    before = f'<div class="sc-fill" style="position:relative;min-height:170px">{scr}</div>'
    loads = ''.join(f'<div class="sc-row">{ico("truck")}{bar(f"{w}%")}<span class="sc-end">{bar("18px", True)}</span></div>' for w in (30, 38, 26))
    after = (f'<div class="sc-card sc-card--2 sc-col sc-fill" data-mock="" style="gap:9px;padding:12px 14px">'
             f'<div class="sc-row" style="padding-bottom:8px;border-bottom:var(--stroke-diagram) solid var(--border)">{ico("mail")}{bar("34%", True)}<span class="sc-end">{bar("26px")}</span></div>'
             f'{bar("62%", True)}{loads}'
             f'<div class="sc-row" style="margin-top:2px"><span style="position:relative;display:inline-flex">'
             f'<span class="sc-pill sc-pill--acc" data-p="p2" style="border-radius:var(--radius-sm);padding:4px 10px">{ico("reply", "sc-ico", "width:10px;height:10px;color:inherit")}Reply</span>'
             f'<span class="sc-pill h-on2" style="position:absolute;inset:0;border-radius:var(--radius-sm);padding:4px 10px;background:var(--surface-card);box-shadow:inset 0 0 0 var(--stroke-diagram) var(--border)">{ico("check", "sc-ico sc-ico--acc", "width:10px;height:10px", 3)}Sent</span>'
             f'</span></div></div>')
    return scene('c2', before, after, lab('The platform, three screens'),
                 lab('The email', 'acc') + lab('Response rate up 250%', 'core', 'h-on3', 'p3'), 2)


# ---------- 03 Composer: the cursor clears the first layer until field, plus, model and send remain ----------
def c3():
    widths = (34, 22, 28, 40, 24, 30, 36, 26)
    gp = ''.join(f'<span class="sc-ghost" style="display:inline-block;padding:0;height:14px;width:{w}px;border-radius:var(--radius-full)"></span>' for w in widths)
    before = (f'<div class="sc-ghost sc-col sc-fill" style="justify-content:space-between;gap:10px;padding:12px 14px">'
              f'<div class="illo-pills" style="gap:5px">{gp}</div>'
              f'<div class="sc-row">{bar("50%")}<span class="sc-end">{send(quiet=True)}</span></div></div>')
    pills = ''
    for k, w in zip((1, 1, 2, 2, 3, 3), widths[:6]):
        dp = f' data-p="p{k}"' if w in (34, 28, 24) else ''
        pills += f'<span class="h-off{k}"{dp} style="display:inline-block;height:14px;width:{w}px;border-radius:var(--radius-full);box-shadow:inset 0 0 0 var(--stroke-diagram) var(--border)"></span>'
    after = (f'<div class="sc-card sc-card--2 sc-col sc-fill" data-mock="" style="justify-content:space-between;gap:10px;padding:12px 14px">'
             f'<div style="position:relative;flex:1;min-height:36px"><div class="illo-pills" style="gap:5px">{pills}</div>'
             f'<span class="illo-caret h-on3" style="position:absolute;left:2px;top:2px;height:14px"></span></div>'
             f'<div class="sc-row" style="gap:10px">{ico("plus", "sc-ico sc-ico--ink")}<span style="flex:1"></span>'
             f'<span class="sc-row" style="gap:4px;padding:3px 6px;border-radius:var(--radius-sm);box-shadow:inset 0 0 0 var(--stroke-diagram) var(--border)">{bar("26px", True)}{ico("down", "sc-ico", "width:10px;height:10px")}</span>'
             f'{send(p="p4")}</div></div>')
    return scene('c3', before, after, lab('Everything at once'), lab('Field, plus, model, send', 'core', 'h-on4', 'p5'), 4)


# ---------- 04 Design system: two answers; the one source answers for both; a new part waits for review ----------
def c4():
    def lib(name, ic, p):
        return (f'<div class="sc-ghost sc-col" data-p="{p}" style="flex:1;gap:7px">'
                f'<div class="sc-row" style="gap:6px">{ico(ic)}{lab(name)}</div>{bar("70%")}{bar("48%")}{bar("82%")}</div>')
    before = (f'<div class="sc-row sc-fill" style="align-items:stretch;gap:8px">{lib("Design tool", "figma", "p1")}'
              f'<span class="illo-sign">≠</span>{lib("Code", "code", "p2")}</div>')
    parts = ''.join(ico(i, 'sc-ico') for i in ('btn', 'input', 'toggle', 'card'))
    after = (f'<div class="sc-col sc-fill" style="gap:8px">'
             f'<div style="position:relative;flex:1;display:flex;flex-direction:column">'
             f'<div class="sc-ghost sc-col sc-hand-over h-off2" style="gap:7px">{bar("72%")}{bar("56%")}{bar("84%")}</div>'
             f'<div class="sc-card sc-col h-on2" style="flex:1;gap:7px;padding-left:14px"><span class="sc-mark" style="top:10px;bottom:10px"></span>'
             f'<div class="sc-row">{bar("72%", True)}<span class="sc-end sc-check">{ico("check", "", "", 3)}</span></div>{bar("56%", True)}{bar("84%", True)}'
             f'<div class="sc-row" style="gap:6px;margin-top:2px">{parts}</div></div></div>'
             f'<div class="sc-row illo-slot" data-p="p3" style="gap:8px;padding:8px 10px;border-radius:var(--radius-md)">'
             f'<span class="sc-card sc-row h-on3" style="gap:6px;padding:5px 8px;border-radius:var(--radius-sm)">{ico("spark", "sc-ico sc-ico--acc")}{bar("34px")}</span>'
             f'{lab("New part to review", "acc")}</div></div>')
    return scene('c4', before, after, lab('Two answers'), lab('One source', 'core', 'h-on2', 'p4'), 3)


# ---------- 05 Advisors: the cursor picks an office (its layout changes) and adds a widget in its slot ----------
def widget(kind):
    if kind == 'chart':
        return '<span class="sc-bars"><i style="height:40%"></i><i style="height:70%"></i><i style="height:55%"></i><i style="height:85%"></i></span>'
    if kind == 'list':
        return f'<span class="sc-col" style="gap:4px">{bar("70%", True)}{bar("86%")}{bar("60%")}</span>'
    return f'<span class="sc-col" style="gap:5px">{bar("40%", True, "height:8px")}{bar("70%")}</span>'


def c5():
    verticals = [('B2B', 'home'), ('B2C', 'user'), ('Wealth', 'star'), ('Advisors', 'shield')]
    before = '<div class="sc-col sc-fill" style="gap:8px">' + ''.join(f'<div class="sc-ghost sc-row" style="flex:1">{ico(i)}{lab(v)}</div>' for v, i in verticals) + '</div>'
    nav = ''
    for i, w in enumerate((34, 28, 38, 30)):
        state, dp = '', ''
        if i == 0:
            state = '<span class="sc-tint h-off1"></span><span class="illo-dot sc-navdot h-off1"></span>'
        if i == 2:
            state = '<span class="sc-tint h-on1"></span><span class="illo-dot sc-navdot h-on1"></span>'
            dp = ' data-p="p1"'
        nav += f'<span class="sc-mrow"{dp} style="padding:5px 6px">{state}<span class="illo-dot illo-dot--quiet" style="position:relative"></span>{bar(f"{w}px", True, "position:relative")}</span>'
    after = (f'<div class="sc-card sc-card--2 sc-card--lg sc-row sc-fill" data-mock="" style="align-items:stretch;padding:0;gap:0">'
             f'<div class="sc-col" style="flex:none;width:88px;padding:12px 8px;gap:4px;border-right:var(--stroke-diagram) solid var(--border-subtle)">'
             f'<span class="sc-row" style="gap:6px;padding:0 6px 8px"><span class="sc-avatar" style="width:14px;height:14px"></span>{bar("36px", True)}</span>{nav}</div>'
             f'<div class="sc-col" style="flex:1;padding:12px;gap:10px;min-width:0">'
             f'<div class="sc-row">{bar("34%", True)}<span class="sc-end sc-pill">Office</span></div>'
             f'<div class="sc-w4">'
             f'<div class="sc-wg sc-wg--flat"><span class="sc-swap h-off1">{widget("chart")}</span><span class="sc-swap h-on1">{widget("list")}</span></div>'
             f'<div class="sc-wg sc-wg--flat"><span class="sc-swap h-off1">{widget("list")}</span><span class="sc-swap h-on1">{widget("chart")}</span></div>'
             f'<div class="sc-wg sc-wg--flat">{widget("num")}</div>'
             f'<div class="sc-wg illo-slot" data-p="p2" style="display:grid;place-items:center">{ico("plus", "sc-ico sc-ico--acc")}'
             f'<div class="sc-wg sc-wg--flat h-on2" style="position:absolute;inset:0">{widget("chart")}</div></div>'
             f'</div></div></div>')
    return scene('c5', before, after, '', lab('One platform', 'core', 'h-on3', 'p3') + lab('Widgets per office', '', 'h-on3'), 2,
                 cols='minmax(0,.62fr) auto minmax(0,1.38fr)')


# ---------- 06 Card insurance: the cursor leaves the locked bundle and switches two modules on ----------
BENEFITS = [('plane', '46%', 1), ('lounge', '58%', 0), ('health', '40%', 2), ('bag', '52%', 0), ('umbrella', '36%', 0)]


def c6():
    before = (f'<div class="sc-ghost sc-col sc-fill" data-p="p0" style="justify-content:space-evenly;gap:8px;padding:12px 14px">'
              f'<div class="sc-row">{ico("lock")}{bar("40%")}<span class="sc-end">{bar("22px")}</span></div>'
              + ''.join(bar(w) for w in ('70%', '54%', '80%', '46%', '62%')) + '</div>')
    rows = ''
    for ic, w, on in BENEFITS:
        dp = f' data-p="p{on}"' if on else ''
        off = f' h-off{on}' if on else ''
        ghost_tg = f'<span class="sc-end sc-tg"{dp}><span class="sc-tg__k" style="box-shadow:none"></span></span>'
        row = f'<div class="sc-ghost sc-row{off}" style="flex:1;padding:8px 10px">{ico(ic)}{bar(w)}{ghost_tg}</div>'
        if on:
            at = ' h-at2' if on == 2 else ''
            row += (f'<div class="sc-card sc-row sc-hand-over h-on{on}" style="padding:8px 10px">{ico(ic)}{bar(w, True)}'
                    f'<span class="sc-end sc-tg"><span class="sc-tg__on"></span><span class="sc-tg__k h-kn{at}"></span></span></div>')
        rows += f'<div style="position:relative;flex:1;display:flex;flex-direction:column">{row}</div>'
    after = f'<div class="sc-col sc-fill" style="gap:6px">{rows}</div>'
    return scene('c6', before, after, lab('Fixed bundle, one price'),
                 lab('Modules', 'core', 'h-on3', 'p3') + lab('Pick what you need', '', 'h-on3'), 2)


SCENES = [c1(), c2(), c3(), c4(), c5(), c6()]


def write_pages():
    for name in ('index.html', 'work.html'):
        path = ROOT / name
        lines = path.read_text().split('\n')
        k = 0
        for i, line in enumerate(lines):
            if re.match(r'\s*<div class="(illo-window illo-window--case|scene[^"]*)" data-illo', line):
                indent = line[:len(line) - len(line.lstrip())]
                lines[i] = indent + SCENES[k]
                k += 1
        assert k == 6, (name, k)
        path.write_text('\n'.join(lines))
        print(name, 'scenes:', k)


if __name__ == '__main__':
    write_pages()
