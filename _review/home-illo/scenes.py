"""The six case scenes (home and Work), built from one source.

Nayara's picks, 2026-09-27: 01 C, 02 C (labels aligned), 03 A, 04 new (two options), 05 B, 06 B (benefit icons).
Motion is one entrance (components.css .scene, art.js). Run from the repo root:
    python3 _review/home-illo/scenes.py          # writes the scenes into index.html and work.html
The review page imports SCENES and CASE4_OPTIONS from here (see build_review below).
"""
import re, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]

P = {
    'up': '<path d="M12 19V5M5 12l7-7 7 7"/>',
    'chev': '<path d="m9 5 7 7-7 7"/>',
    'check': '<path d="M20 6 9 17l-5-5"/>',
    'plus': '<path d="M5 12h14M12 5v14"/>',
    'down': '<path d="m6 9 6 6 6-6"/>',
    'back': '<path d="m15 18-6-6 6-6"/>',
    'reply': '<path d="m9 17-5-5 5-5M20 18v-2a4 4 0 0 0-4-4H4"/>',
    'dash': '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
    'chart': '<path d="M3 3v18h18M8 17v-5M13 17V8M18 17v-9"/>',
    'doc': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    'note': '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h4"/>',
    'chat': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    'mail': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    'plane': '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
    'lounge': '<path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3z"/><path d="M6 18v2M18 18v2"/>',
    'health': '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/>',
    'bag': '<path d="M6 7h12l1 14H5z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
    'umbrella': '<path d="M22 12a10 10 0 0 0-20 0z"/><path d="M12 12v7a2 2 0 0 0 4 0"/>',
    'spark': '<path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4M5.3 5.3l2.3 2.3M16.4 16.4l2.3 2.3M18.7 5.3l-2.3 2.3M7.6 16.4l-2.3 2.3"/>',
}


def ico(name, cls='sc-ico', style='', sw=2):
    st = f' style="{style}"' if style else ''
    return f'<svg class="{cls}"{st} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{P[name]}</svg>'


def send(extra='', quiet=False, size=''):
    q = ' illo-send--quiet' if quiet else ''
    st = f' style="{size}"' if size else ''
    return f'<span class="illo-send{q}{extra}"{st}>{ico("up", "", "", 2.4)}</span>'


def spark(s, pos):
    return f'<span class="sc-spark" style="--s:{s};{pos}"><svg viewBox="0 0 24 24" aria-hidden="true">{P["spark"]}</svg></span>'


CURSOR = '<svg viewBox="0 0 16 20" aria-hidden="true"><path d="M1.5 1.2v15.2l3.9-3.6 2.6 5.8 2.5-1.1-2.6-5.7h5.4z"/></svg>'


def lab(t, kind=''):
    cls = {'': 'illo-label', 'acc': 'illo-label illo-label--accent', 'core': 'illo-label sc-core', 'ink': 'illo-label illo-label--ink'}[kind]
    return f'<p class="{cls}">{t}</p>'


def arrow(s=1, open_=False):
    head = '' if open_ else ico('chev', '', '', 2)
    o = ' scene__to--open' if open_ else ''
    return f'<div class="scene__to{o}"><span class="sc-dot" style="--s:{s}"></span>{head}</div>'


def scene(key, before, after, cap_before='', cap_after='', to=None, product=False, cols=''):
    cls = 'scene scene--product' if product else 'scene'
    st = f' style="--cols:{cols}"' if cols else ''
    to = to if to is not None else arrow()
    caps = ''
    if cap_before:
        caps += f'<div class="scene__cap" data-side="before">{cap_before}</div>'
    if cap_after:
        caps += f'<div class="scene__cap sc-a-fade" data-side="after" style="--s:{cap_after[1]}">{cap_after[0]}</div>'
    return (f'<div class="{cls}" data-illo="" data-scene="{key}" aria-hidden="true"{st}>'
            f'<div class="scene__pic sc-a-fade" data-side="before">{before}</div>{to}'
            f'<div class="scene__pic" data-side="after">{after}</div>{caps}</div>')


# ---------- 01 AI surfaces: C, line to object ----------
def c1():
    before = (f'<div class="sc-dash sc-col" style="align-items:center;gap:8px;padding:18px 10px">{send(quiet=True)}'
              '<span class="illo-bar" style="width:60%;background:var(--border-divider)"></span>'
              '<span class="illo-bar" style="width:40%;background:var(--border-divider)"></span></div>')
    rows = ''
    for i, (name, ic) in enumerate([('Dashboard', 'dash'), ('Reports', 'chart'), ('Documents', 'doc'), ('Meeting notes', 'note')]):
        rows += (f'<div class="sc-branch"><div class="sc-ghost sc-row" style="height:30px;padding:0 10px">{ico(ic)}{lab(name)}</div>'
                 f'<div class="sc-card sc-row sc-a-fade" style="--s:{4 + i * .6};position:absolute;inset:0;padding:0 6px 0 10px">{ico(ic)}{lab(name, "ink")}<span class="sc-end">{send()}</span></div>'
                 f'<span class="sc-dot" style="--s:{3 + i * .6}"></span></div>')
    after = f'<div class="sc-tree sc-col" style="gap:8px">{rows}</div>'
    return scene('c1', before, after, lab('AI page'), (lab('AI where the work is', 'core'), 7), to=arrow(1, True))


# ---------- 02 Fleet: C, labels of both sides on one line ----------
def screens(fly=False):
    out = ''
    for i, (l, t, ws) in enumerate([(0, 0, (60, 80, 44)), (12, 24, (70, 50, 84)), (24, 48, (54, 76, 40))]):
        bars = ''.join(f'<span class="illo-bar" style="width:{w}%"></span>' for w in ws)
        out += f'<div class="sc-ghost sc-scr" style="left:{l}%;top:{t}px"><span class="sc-scr__nav"></span><span class="sc-col" style="flex:1;gap:6px">{bars}</span></div>'
    if fly:
        for i, (l, t) in enumerate([(0, 0), (12, 24), (24, 48)]):
            out += f'<div class="sc-ghost sc-scr sc-a-away" data-to=".sc-c2-email" style="--s:{1 + i * .4};left:{l}%;top:{t}px"></div>'
    return f'<div style="position:relative;height:122px">{out}</div>'


def c2():
    rows = ''.join(f'<div class="sc-row"><span class="sc-route"></span><span class="illo-bar" style="width:{w}%"></span><span class="sc-end illo-bar illo-bar--ink" style="width:16%"></span></div>' for w in (46, 56, 40))
    ghost_rows = ''.join(f'<span class="illo-bar" style="width:{w}%"></span>' for w in (62, 70, 54))
    after = (f'<div class="sc-c2-email" style="position:relative">'
             f'<div class="sc-ghost sc-col" style="gap:8px;padding:12px;border-radius:var(--radius-md)"><span class="illo-bar" style="width:38%"></span><span class="illo-bar" style="width:74%"></span>{ghost_rows}<span class="sc-ghost" style="width:58px;height:19px;padding:0"></span></div>'
             f'<div class="sc-card sc-card--2 sc-card--md sc-col sc-a-fade" data-mock="" style="--s:3;position:absolute;inset:0;padding:12px;gap:8px">'
             f'<div class="sc-row" style="gap:6px">{ico("mail")}<span class="illo-bar illo-bar--ink" style="width:30%"></span></div>'
             f'<span class="illo-bar illo-bar--ink" style="width:74%"></span>{rows}'
             f'<div class="sc-row"><span class="sc-pill sc-pill--acc sc-a-pop" style="--s:4.5;border-radius:var(--radius-sm)">{ico("reply", "sc-ico", "width:10px;height:10px;color:inherit")}Reply</span></div></div></div>')
    return scene('c2', screens(True), after, lab('The platform'), (lab('The email', 'acc') + lab('Response rate up 250%', 'core'), 5))


# ---------- 03 Composer: A, afloat (static depth, one entrance) ----------
def c3(fly=False):
    gp = ''.join(f'<span class="sc-ghost sc-gp" style="width:{w}px"></span>' for w in (34, 22, 28, 40, 24, 30, 36, 26))
    before = (f'<div class="sc-ghost sc-col" style="gap:8px;padding:10px"><div class="illo-pills" style="gap:4px">{gp}</div>'
              f'<div class="sc-row"><span class="illo-bar" style="flex:1"></span>{send(quiet=True)}</div></div>'
              '<span class="sc-ghost sc-gp" style="position:absolute;left:-10px;top:-20px;width:30px"></span>'
              '<span class="sc-ghost sc-gp" style="position:absolute;right:-6px;bottom:-18px;width:38px"></span>')
    menu = ''.join(f'<div class="sc-mrow">{ico(i)}<span class="illo-bar illo-bar--ink" style="width:{w}%"></span></div>' for i, w in (('doc', 54), ('chart', 40), ('note', 62)))
    after = (f'<div style="position:relative;padding-top:92px">'
             f'<div class="sc-card sc-card--3 sc-card--md sc-col sc-a-in" data-mock="" style="--s:7;position:absolute;left:0;top:0;width:58%;padding:6px;gap:2px">{menu}</div>'
             f'<div class="sc-card sc-card--2 sc-card--md sc-row sc-a-in" data-mock="" style="--s:3;padding:8px 8px 8px 12px;gap:12px;min-height:46px">'
             f'<span class="sc-a-pop" style="--s:4;display:flex">{ico("plus", "sc-ico sc-ico--ink", "width:14px;height:14px")}</span>'
             f'<span class="illo-caret sc-a-pop" style="--s:4.6"></span><span style="flex:1"></span>'
             f'<span class="sc-pill sc-a-pop" style="--s:5.2">Model{ico("down", "sc-ico", "width:10px;height:10px;color:inherit")}</span>'
             f'<span class="sc-a-pop" style="--s:5.8;display:flex">{send(size="width:22px;height:22px")}</span></div>'
             f'{spark(8, "right:-6px;bottom:40px")}</div>')
    return scene('c3', before, after, lab('Everything at once'), (lab('Field, plus, model, send', 'core'), 8))


# ---------- 04 Design system: the cycle, option 1 (line to object) and option 2 (in the product) ----------
def panels(stack=True):
    def pan(t, ws):
        bars = ''.join(f'<span class="illo-bar" style="width:{w}%"></span>' for w in ws)
        return f'<div class="sc-ghost sc-col" style="gap:5px;padding:8px 10px">{lab(t)}{bars}</div>'
    return f'<div class="sc-col" style="gap:4px">{pan("Design tool", (70, 48, 82))}<span class="illo-sign">≠</span>{pan("Code", (52, 76, 38))}</div>'


def link(d, s):
    # a drawn segment of the loop in the gap between two cells, with its head and its dot
    head = {'r': 'right:-3px;top:-5px', 'd': 'bottom:-3px;left:-5px;transform:rotate(90deg)', 'l': 'left:-3px;top:-5px;transform:rotate(180deg)', 'u': 'top:-3px;left:-5px;transform:rotate(-90deg)'}[d]
    return (f'<span class="sc-link sc-link--{d}">{ico("chev", "sc-link__head", head)}<span class="sc-dot" style="--s:{s}"></span></span>')


def c4_loop():
    chips = '<span class="sc-row" style="gap:5px"><span class="sc-mini-btn"></span><span class="sc-mini-toggle"></span><span class="sc-mini-input" style="width:22px"></span>{new}</span>'
    ds = (f'<div class="sc-cell"><div class="sc-card sc-card--2 sc-col sc-a-fade" style="--s:3;height:100%;gap:8px;padding:10px 10px 10px 12px"><span class="sc-mark" style="top:10px;bottom:10px"></span>'
          f'{lab("Live design system", "ink")}' + chips.format(new='<span class="sc-mini-new sc-a-pop" style="--s:13.5;width:16px;border-style:solid"></span>') + f'</div>{link("r", 4.5)}{spark(14, "right:-4px;top:4px")}</div>')
    create = (f'<div class="sc-cell"><div class="sc-ghost sc-col" style="height:100%;gap:6px;padding:10px">{lab("Create")}<span class="illo-bar" style="width:70%"></span><span class="illo-bar" style="width:50%"></span></div>'
              f'<div class="sc-card sc-col sc-a-fade" style="--s:6;position:absolute;inset:0;gap:6px;padding:10px">{lab("Create", "ink")}<span class="illo-bar illo-bar--ink" style="width:70%"></span>'
              f'<span class="sc-row" style="gap:5px"><span class="sc-mini-btn"></span><span class="sc-mini-new"></span></span></div>{link("d", 7)}</div>')
    drift = (f'<div class="sc-cell"><div class="sc-ghost sc-col" style="height:100%;gap:6px;padding:10px">{lab("Drift analysis")}<span class="illo-bar" style="width:66%"></span><span class="illo-bar" style="width:52%"></span></div>'
             f'<div class="sc-card sc-col sc-a-fade" style="--s:8.5;position:absolute;inset:0;gap:6px;padding:10px">{lab("Drift analysis", "ink")}'
             f'<span class="sc-row" style="gap:6px"><span class="illo-bar illo-bar--ink" style="width:56%"></span><span class="sc-end">{ico("check", "sc-ico", "width:10px;height:10px", 3)}</span></span>'
             f'<span class="sc-row" style="gap:6px"><span class="sc-mini-new sc-a-pop" style="--s:9.5"></span><span class="illo-bar illo-bar--ink" style="width:30%"></span><span class="sc-end illo-dot sc-a-pop" style="--s:9.5"></span></span></div>{link("l", 10)}</div>')
    back = (f'<div class="sc-cell"><div class="sc-ghost sc-col" style="height:100%;gap:6px;padding:10px">{lab("Back into the system")}<span class="illo-bar" style="width:44%"></span></div>'
            f'<div class="sc-card sc-col sc-a-fade" style="--s:11.5;position:absolute;inset:0;gap:6px;padding:10px">{lab("Back into the system", "ink")}'
            f'<span class="sc-row" style="gap:6px"><span class="sc-mini-new" style="border-style:solid"></span>{ico("up", "sc-ico sc-ico--acc", "width:11px;height:11px")}</span></div>{link("u", 12.5)}</div>')
    after = f'<div class="sc-loop">{ds}{create}{back}{drift}</div>'
    return scene('c4', panels(), after, cols='minmax(0,.5fr) auto minmax(0,1.5fr)')


def c4_product():
    lib = ''.join(f'<span class="sc-mrow" style="padding:5px 6px;gap:6px">{m}</span>' for m in ('<span class="sc-mini-btn" style="width:20px"></span>', '<span class="sc-mini-toggle"></span>', '<span class="sc-mini-input" style="width:24px"></span>'))
    after = (f'<div class="sc-stage" style="position:relative">'
             f'<div class="sc-card sc-card--2 sc-card--lg sc-row sc-a-fade" data-mock="" style="--s:3;align-items:stretch;padding:0;gap:0">'
             f'<div class="sc-col" style="flex:none;width:86px;padding:10px 6px;gap:2px;border-right:var(--stroke-diagram) solid var(--border-subtle)">'
             f'<span class="sc-row" style="gap:4px;padding:0 4px 6px"><span style="font-size:var(--font-size-2xs);font-weight:600;color:var(--text-strong)">Library</span><span class="sc-pill" style="padding:1px 5px;background:var(--surface-accent-tint);color:var(--accent-strong)">Live</span></span>'
             f'{lib}<span class="sc-mrow sc-b4-new sc-a-pop" style="--s:10;padding:5px 6px;gap:6px;background:var(--surface-accent-tint)"><span class="sc-mini-new" style="border-style:solid;width:20px"></span></span></div>'
             f'<div class="sc-col" style="flex:1;padding:10px;gap:8px;min-width:0">'
             f'<span class="illo-bar illo-bar--ink" style="width:46%"></span>'
             f'<div class="sc-ghost sc-col" style="gap:6px;padding:8px"><span class="illo-bar" style="width:80%"></span><span class="sc-row" style="gap:6px"><span class="sc-mini-btn sc-a-pop" style="--s:4"></span><span class="sc-mini-toggle sc-a-pop" style="--s:4.4"></span><span class="sc-mini-new sc-b4-part sc-a-pop" style="--s:4.8"></span></span></div>'
             f'<div class="sc-row" style="gap:6px;padding:6px 8px;border-radius:var(--radius-sm);background:var(--surface-hover)"><span class="illo-dot"></span><span style="font-size:var(--font-size-2xs);font-weight:600;color:var(--text-strong)">Drift</span><span class="illo-bar illo-bar--ink" style="width:26%"></span>'
             f'<span class="sc-end sc-pill sc-b4-add" style="border-radius:var(--radius-sm)">Add<span class="sc-pill sc-pill--acc sc-a-fade" style="--s:9.2;position:absolute;inset:0;border-radius:inherit;justify-content:center">Add</span></span></div>'
             f'</div></div>'
             f'<span class="sc-ring" data-at=".sc-b4-part" style="--s:6"></span><span class="sc-ring" data-at=".sc-b4-add" style="--s:9"></span>'
             f'<span class="sc-spark" data-at=".sc-b4-new" style="--s:10.5"><svg viewBox="0 0 24 24" aria-hidden="true">{P["spark"]}</svg></span>'
             f'<span class="sc-cursor" data-t0="60,70" data-t1=".sc-b4-part" data-t2=".sc-b4-add" style="--s:4">{CURSOR}</span></div>')
    return scene('c4b', panels(), after, '', (lab('Live design system', 'core') + lab('Drift analysis'), 11), product=True, cols='minmax(0,110px) auto minmax(0,1fr)')


# ---------- 05 Advisors: B, in the product ----------
def widget(kind):
    if kind == 'chart':
        return '<span class="sc-bars"><i style="height:40%"></i><i style="height:70%"></i><i style="height:55%"></i><i style="height:85%"></i></span>'
    if kind == 'list':
        return '<span class="sc-col" style="gap:4px"><span class="illo-bar illo-bar--ink" style="width:70%"></span><span class="illo-bar" style="width:86%"></span><span class="illo-bar" style="width:60%"></span></span>'
    return '<span class="sc-col" style="gap:5px"><span class="illo-bar illo-bar--ink" style="width:40%;height:8px"></span><span class="illo-bar" style="width:70%"></span></span>'


def c5():
    before = '<div class="sc-col" style="gap:6px">' + ''.join(f'<div class="sc-ghost" style="padding:6px 10px">{lab(v)}</div>' for v in ('B2B', 'B2C', 'Wealth', 'Advisors')) + '</div>'
    nav = ''
    for i, w in enumerate((34, 28, 38, 30)):
        state = ''
        if i == 0:
            state = '<span class="sc-tint sc-a-out" style="--s:6.2"></span><span class="illo-dot sc-navdot sc-a-out" style="--s:6.2"></span>'
        if i == 2:
            state = '<span class="sc-tint sc-a-fade" style="--s:6.2"></span><span class="illo-dot sc-navdot sc-a-fade" style="--s:6.2"></span>'
        extra = ' sc-b5-office' if i == 2 else ''
        nav += f'<span class="sc-mrow{extra}" style="padding:5px 6px">{state}<span class="illo-dot illo-dot--quiet" style="position:relative"></span><span class="illo-bar illo-bar--ink" style="position:relative;width:{w}px"></span></span>'
    after = (f'<div class="sc-stage" style="position:relative">'
             f'<div class="sc-card sc-card--2 sc-card--lg sc-row sc-a-fade" data-mock="" style="--s:3;align-items:stretch;padding:0;gap:0">'
             f'<div class="sc-col" style="flex:none;width:88px;padding:12px 8px;gap:4px;border-right:var(--stroke-diagram) solid var(--border-subtle)">'
             f'<span class="sc-row" style="gap:6px;padding:0 6px 8px"><span class="sc-avatar" style="width:14px;height:14px"></span><span class="illo-bar illo-bar--ink" style="width:36px"></span></span>{nav}</div>'
             f'<div class="sc-col" style="flex:1;padding:12px;gap:10px;min-width:0">'
             f'<div class="sc-row"><span class="illo-bar illo-bar--ink" style="width:34%"></span><span class="sc-end sc-pill">Office</span></div>'
             f'<div class="sc-w4">'
             f'<div class="sc-wg sc-wg--flat"><span class="sc-swap sc-a-out" style="--s:7">{widget("chart")}</span><span class="sc-swap sc-a-fade" style="--s:7.6">{widget("list")}</span></div>'
             f'<div class="sc-wg sc-wg--flat"><span class="sc-swap sc-a-out" style="--s:7">{widget("list")}</span><span class="sc-swap sc-a-fade" style="--s:7.6">{widget("chart")}</span></div>'
             f'<div class="sc-wg sc-wg--flat">{widget("num")}</div>'
             f'<div class="sc-wg illo-slot sc-b5-add" style="display:grid;place-items:center">{ico("plus", "sc-ico sc-ico--acc")}'
             f'<div class="sc-wg sc-wg--flat sc-a-pop" style="--s:9.3;position:absolute;inset:0">{widget("chart")}</div></div>'
             f'</div></div></div>'
             f'<span class="sc-ring" data-at=".sc-b5-office" style="--s:6"></span><span class="sc-ring" data-at=".sc-b5-add" style="--s:9"></span>'
             f'<span class="sc-spark" data-at=".sc-b5-add" style="--s:9.6;margin:-30px 0 0 24px"><svg viewBox="0 0 24 24" aria-hidden="true">{P["spark"]}</svg></span>'
             f'<span class="sc-cursor" data-t0="120,-30" data-t1=".sc-b5-office" data-t2=".sc-b5-add" style="--s:4">{CURSOR}</span></div>')
    return scene('c5', before, after, '', (lab('One platform', 'core') + lab('Widgets per office'), 10.5), product=True, cols='minmax(0,110px) auto minmax(0,1fr)')


# ---------- 06 Card insurance: B, in the product, benefit icons ----------
BENEFITS = [('plane', 46, True), ('lounge', 58, False), ('health', 40, True), ('bag', 52, False), ('umbrella', 36, False)]


def bundle():
    bars = ''.join(f'<span class="illo-bar" style="width:{w + 24}%"></span>' for _, w, _ in BENEFITS)
    tag = ('<span class="sc-ghost sc-row" style="display:inline-flex;gap:6px;padding:4px 10px 4px 8px;border-radius:var(--radius-full);margin-top:8px">'
           '<span style="width:5px;height:5px;border-radius:var(--radius-full);box-shadow:inset 0 0 0 var(--stroke-diagram) var(--text-subtle)"></span><span class="illo-bar" style="width:26px"></span></span>')
    return f'<div class="sc-ghost sc-col" style="gap:8px;padding:12px 10px">{bars}</div>{tag}'


def c6():
    rows, n = '', 0
    for ic, w, on in BENEFITS:
        if on:
            s1 = (6.2, 9.2)[n]
            tg = f'<span class="sc-end sc-tg sc-b6-t{n}"><span class="sc-tg__on sc-a-fade" style="--s:{s1}"></span><span class="sc-tg__k sc-a-slide" style="--s:{s1};--kx:12px"></span></span>'
            n += 1
        else:
            tg = '<span class="sc-end sc-tg"><span class="sc-tg__k"></span></span>'
        rows += f'<div class="sc-row illo-rule" style="gap:8px;padding-top:8px">{ico(ic)}<span class="illo-bar illo-bar--ink" style="width:{w}%"></span>{tg}</div>'
    after = (f'<div class="sc-stage" style="position:relative;width:240px">'
             f'<div class="sc-card sc-card--2 sc-card--lg sc-col sc-a-fade" data-mock="" style="--s:3;padding:14px;gap:0">'
             f'<div class="sc-row" style="gap:6px;padding-bottom:10px">{ico("back")}<span class="illo-bar illo-bar--ink" style="width:40%"></span>'
             f'<span class="sc-end sc-cc"><span class="sc-cc__chip"></span></span></div>'
             f'<div class="sc-col" style="gap:8px">{rows}</div>'
             f'<div style="position:relative;margin-top:12px;height:28px;border-radius:var(--radius-sm);background:var(--surface-hover);display:grid;place-items:center">'
             f'<span class="illo-bar illo-bar--ink" style="width:30%"></span>'
             f'<span class="sc-a-fade" style="--s:10.3;position:absolute;inset:0;border-radius:inherit;background:var(--accent);display:grid;place-items:center"><span class="illo-bar" style="width:30%;background:var(--surface-card)"></span></span></div>'
             f'</div>'
             f'<span class="sc-ring" data-at=".sc-b6-t0" style="--s:6"></span><span class="sc-ring" data-at=".sc-b6-t1" style="--s:9"></span>'
             f'<span class="sc-spark" data-at=".sc-b6-t1" style="--s:9.6;margin:-14px 0 0 18px"><svg viewBox="0 0 24 24" aria-hidden="true">{P["spark"]}</svg></span>'
             f'<span class="sc-cursor" data-t0="-70,40" data-t1=".sc-b6-t0" data-t2=".sc-b6-t1" style="--s:4">{CURSOR}</span></div>')
    return scene('c6', bundle(), after, lab('Fixed bundle') + lab('One price'), (lab('Modules', 'core') + lab('Pick what you need'), 11), product=True, cols='minmax(0,120px) auto minmax(0,1fr)')


SCENES = [c1(), c2(), c3(), c4_product(), c5(), c6()]  # 04: option 2, Nayara 2026-09-27
CASE4_OPTIONS = [('Option 1 · Line to object', c4_loop()), ('Option 2 · In the product', c4_product())]


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
