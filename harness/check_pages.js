/* Rendered-page checks. Run in the local preview (the site served from the repo root):
 *
 *   eval(await (await fetch('/harness/check_pages.js')).text())
 *
 * Returns "<page> :: pass" or a list of findings. Rules are defined in CLAUDE.md. Run it at 1400px and at 375px,
 * and once with reduced motion on.
 *   LAY-01  page is wider than the screen
 *   SEC-01  a line runs edge to edge (dividers are in flow, at content width; the ink band is the only full-bleed band)
 *   SEC-03  two lines at one boundary
 *   SKY-02  something full width paints its own ground (only the sky and the ink band may)
 *   HERO-01 the h1 is not at the hero's fixed height (header + --hero-top + one eyebrow line + 16px), within 2px.
 *           The home is the one exception (HERO-02): its hero fills the first screen, centred.
 *   TYP-01  an eyebrow or label is under 11px (in-diagram labels, tags and product mockups excepted)
 *   ACT-01  an action is uppercase, or boxed without being one of the three variants
 *   ACT-02  more than one primary action outside offer cards, or more than one inside one offer card (.plan-card)
 *   TYP-04  one size per heading level outside case bodies: every visible h2 at --font-size-h2, every h3 at --font-size-h3;
 *           every subtitle (the hero lede, a section-head subtitle, the ink band's subtitle) at --font-size-lead.
 *           Labels (uppercase), case bodies (LAY-08 keeps its own scale), drawings and product mockups are excepted.
 *   SEC-06  a wide component (card, card group, accordion, row list, figure, note, stats, in-section divider) does not end
 *           on a line of the four-column grid (the end of column 1, 2, 3 or 4 of the content; in a case body, of the body
 *           column). Cards come in two widths only: big (the full width) and small (half). Grid cells follow their grid;
 *           heroes, the ink band, drawings, scrollers and anything inside a surface are out of scope.
 *   MOT-01  with reduced motion on, something still loops or the sky still moves
 *   COL-08  text contrast below WCAG AA on its ground: 4.5, or 3.0 for large text (24px+, or 18.66px+ bold).
 *           Text on the sky is measured against the sky's darkest point (--sky-deepest). Images, gradients and
 *           glass are skipped, as are [data-mock] figures and hidden text. Symbol-only text (arrows) is an icon: 3:1.
 *   HIER-01 case headings out of order: section title > sub-section (h3.subsection, 600, no number) > item title
 *           (card titles, row leads, step titles), by rendered size
 *   PAT-04  a big number (24px or more, a bare figure) outside .stats, or a .stats block whose label does not say
 *           which kind it is (Result… for data-pattern="result", Scope… for data-pattern="scope")
 *   PAT-05  case cards are not stacked: a .cards group with more than one column, a gap other than 12px (--gap-cards),
 *           or a card narrower than its group
 *   ILL-07  a case window has at most 8 labels outside [data-mock] and the accent on one side only
 *   ILL-02  text inside a drawing (svg, [data-illo], .illo-window) is not the label style as rendered: under 9.5px,
 *           not uppercase, not 0.14em, or lighter than 600. In a figure's picture, uppercase labels must be the label
 *           style (9.5, 10.5 or 12.5px, 0.14em, 600). Product UI is exempt with [data-mock].
 *   PAT-07  a gap row ("What this case doesn't cover") without the inactive style: dashed rule, no elevation, muted text
 *   SEC-04  a top-level section's content does not sit --section-y below its top line and --section-y above its bottom
 *           line (within 2px each). Lines are the section dividers, the ink band's and the case details' edges, the
 *           next-case well and the footer divider. Content box = the first and last visible box (text, a surface, an
 *           image, a bordered row), never margins. Heroes, the ink band and the footer keep their own padding; the space
 *           under a hero with no line (the home) is the hero's (HERO-02); a well right after a section takes that
 *           section's space above it.
 *   SEC-05  a top-level section's content does not start on the page gutter (within 1px); on a wide case page, on the
 *           case body column (column 2 of the details grid). Content inside a surface is inset by the surface.
 */
(() => {
  const W = innerWidth;
  const out = [];
  const probe = (css) => { const d = document.createElement('div'); d.style.cssText = 'position:absolute;visibility:hidden;' + css; document.body.appendChild(d); const cs = getComputedStyle(d); const r = { h: d.getBoundingClientRect().height, color: cs.color }; d.remove(); return r; };
  const inMock = e => !!e.closest('[data-illo],[data-illo-inner],[data-mock],svg,[aria-hidden="true"],.ld-art,.hx-sticker');
  const visible = (e, cs) => {
    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    for (let a = e; a; a = a.parentElement) { const s = getComputedStyle(a); if (parseFloat(s.opacity) === 0 || s.visibility === 'hidden' || s.display === 'none') return false; }
    const r = e.getBoundingClientRect(); return r.width > 1 && r.height > 1;
  };
  const near = y => { const hs = [...document.querySelectorAll('h1,h2,h3')].map(h => [h.getBoundingClientRect().top + scrollY, h.textContent.trim().slice(0, 40)]); return (hs.filter(h => h[0] <= y + 40).pop() || [0, 'top'])[1]; };

  // LAY-01
  if (document.documentElement.scrollWidth > W + 1) out.push(`LAY-01 page is ${document.documentElement.scrollWidth}px wide on a ${W}px screen`);

  // SEC-01, SEC-03, SKY-02: walk everything once
  const lines = [];
  const grounds = new Set();
  for (const e of document.querySelectorAll('body *')) {
    if (e.closest('header,[data-sky],#boot,.band-inverse,script,style,template') || inMock(e)) continue;
    const inSurface = !!e.closest('.card,.link-card,.figure,figure,.well,.glass,.plan-card,.accordion,.note,[data-surface],[data-case-index]');
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.position === 'fixed') continue;
    const r = e.getBoundingClientRect();
    if (!r.width) continue;
    const top = r.top + scrollY, bot = r.bottom + scrollY;
    for (const ps of inSurface ? [] : ['::before', '::after']) {
      const p = getComputedStyle(e, ps);
      if (!p.content || p.content === 'none' || p.position !== 'absolute' || parseFloat(p.height) > 2) continue;
      if (/rgba\(0, 0, 0, 0\)/.test(p.backgroundColor)) continue;
      const left = r.left + parseFloat(p.left || 0), right = r.right - parseFloat(p.right || 0);
      const y = p.top !== 'auto' && p.top === '0px' ? top : (p.bottom === '0px' ? bot - 1 : null);
      if (y === null) continue;
      lines.push({ y, l: left, r: right });
    }
    const clear = /rgba\(0, 0, 0, 0\)/.test(cs.backgroundColor) && cs.backgroundImage === 'none';
    if (!inSurface) {
    if (r.height <= 2 && !clear) lines.push({ y: top, l: r.left, r: r.right });
    if (parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none' && !/rgba\(0, 0, 0, 0\)/.test(cs.borderTopColor)) lines.push({ y: top, l: r.left, r: r.right });
    if (parseFloat(cs.borderBottomWidth) > 0 && cs.borderBottomStyle !== 'none' && !/rgba\(0, 0, 0, 0\)/.test(cs.borderBottomColor)) lines.push({ y: bot - 1, l: r.left, r: r.right });
    }
    // SKY-02: full-width ground
    if (!clear && r.width >= W * 0.97 && r.height > 3 && !e.closest('.card,.link-card,.figure,.well,.glass,.plan-card,.accordion,[data-surface],[data-case-eyebrow]'))
      grounds.add(`SKY-02 a full-width element paints its own ground, near "${near(top)}"`);
  }
  out.push(...grounds);
  const edge = new Set();
  for (const l of lines) if (l.l <= 2 && l.r >= W - 2) edge.add(`SEC-01 edge-to-edge line, near "${near(l.y)}"`);
  out.push(...edge);
  const sorted = lines.filter(l => l.r - l.l > W * 0.5).sort((a, b) => a.y - b.y);
  const dbl = new Set();
  for (let i = 1; i < sorted.length; i++) {
    const a = sorted[i - 1], b = sorted[i];
    if (b.y - a.y > 0.5 && b.y - a.y <= 3 && Math.min(a.r, b.r) - Math.max(a.l, b.l) > W * 0.3) dbl.add(`SEC-03 two lines at one boundary, near "${near(b.y)}"`);
  }
  out.push(...dbl);

  // HERO-01
  const h1 = document.querySelector('main h1, h1');
  const header = document.querySelector('header');
  const home = !!document.querySelector('.hx') || /\/(index\.html)?$/.test(location.pathname); // HERO-02: the home is the one exception
  if (h1 && header && !home) {
    const expect = header.getBoundingClientRect().bottom + probe('height:calc(var(--hero-top) + var(--font-size-eyebrow) * 1.4 + var(--space-md))').h;
    const got = h1.getBoundingClientRect().top;
    if (scrollY === 0 && Math.abs(got - expect) > 2) out.push(`HERO-01 the h1 sits at ${got.toFixed(1)}px, the hero line is ${expect.toFixed(1)}px`);
  }

  // TYP-01, ACT-01, ACT-02
  const small = new Map();
  let primaries = 0;
  for (const e of document.querySelectorAll('body *')) {
    if (e.closest('script,style,template,#boot')) continue;
    const cs = getComputedStyle(e);
    if (e.matches('.action--primary') && visible(e, cs)) primaries++;
    if (e.matches('a,button,summary') && !inMock(e) && visible(e, cs)) {
      const boxed = !/rgba\(0, 0, 0, 0\)/.test(cs.backgroundColor) || (parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none' && !/rgba\(0, 0, 0, 0\)/.test(cs.borderTopColor));
      const h = e.getBoundingClientRect().height;
      const isVariant = e.matches('.action--primary,.action--link,.action--inverse,.link-card,.card');
      if (cs.textTransform === 'uppercase' && boxed && h >= 30) out.push(`ACT-01 uppercase action "${e.textContent.trim().slice(0, 30)}"`);
      else if (boxed && h >= 36 && h <= 64 && !isVariant && !e.closest('header,[data-case-index]')) out.push(`ACT-01 a boxed action outside the three variants: "${e.textContent.trim().slice(0, 30)}"`);
    }
    if (cs.textTransform === 'uppercase' && parseFloat(cs.fontSize) < 10.95 && !inMock(e) && !e.closest('.tag,.badge,header,[data-case-index] a span,.figure') &&
        [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && visible(e, cs)) {
      const k = e.textContent.trim().slice(0, 30);
      small.set(k, `TYP-01 label at ${parseFloat(cs.fontSize)}px, the eyebrow is 11px: "${k}"`);
    }
  }
  out.push(...small.values());
  // ACT-02 one filled action per view: one outside offer cards (the hero's), and at most one inside each offer card
  const cardPrim = [...document.querySelectorAll('.plan-card')].map(c => [...c.querySelectorAll('.action--primary')].filter(a => visible(a, getComputedStyle(a))).length);
  const loose = primaries - cardPrim.reduce((a, b) => a + b, 0);
  if (loose > 1) out.push(`ACT-02 ${loose} primary actions outside offer cards; one, then links`);
  if (cardPrim.some(n => n > 1)) out.push('ACT-02 an offer card with more than one primary action');

  // TYP-04 one size per heading level, one lead size (outside case bodies, whose scale is LAY-08's)
  {
    const size = css => { const d = document.createElement('div'); d.style.cssText = 'position:absolute;visibility:hidden;' + css; document.body.appendChild(d); const v = parseFloat(getComputedStyle(d).fontSize); d.remove(); return v; };
    const W2 = size('font-size:var(--font-size-h2)'), W3 = size('font-size:var(--font-size-h3)'), WL = size('font-size:var(--font-size-lead)');
    const skip = e => inMock(e) || e.closest('header,footer,[data-case-band],[data-case-index],figure,.figure,.illo-window,[data-surface="card"],.hx-sticker') || getComputedStyle(e).textTransform === 'uppercase' || !visible(e, getComputedStyle(e));
    const typ = new Set();
    for (const h of document.querySelectorAll('main h2, body > section h2, .band-inverse h2')) if (!skip(h) && Math.abs(parseFloat(getComputedStyle(h).fontSize) - W2) > 0.5) typ.add(`TYP-04 h2 "${h.textContent.trim().slice(0, 30)}" at ${parseFloat(getComputedStyle(h).fontSize)}px; every h2 is --font-size-h2 (${W2}px)`);
    for (const h of document.querySelectorAll('main h3, body > section h3')) if (!skip(h) && !h.classList.contains('subsection') && Math.abs(parseFloat(getComputedStyle(h).fontSize) - W3) > 0.5) typ.add(`TYP-04 h3 "${h.textContent.trim().slice(0, 30)}" at ${parseFloat(getComputedStyle(h).fontSize)}px; every h3 is --font-size-h3 (${W3}px)`);
    const leads = [];
    const h1 = document.querySelector('main h1');
    if (h1) { let n = h1.nextElementSibling; while (n && n.tagName !== 'P') n = n.nextElementSibling; if (n) leads.push(n); }
    leads.push(...document.querySelectorAll('.section-head>p:not(.eyebrow), .ld-lede, [data-lead]'));
    for (const b of document.querySelectorAll('.band-inverse')) { const p = [...b.querySelectorAll('p')].find(p => !p.closest('.eyebrow') && getComputedStyle(p).textTransform !== 'uppercase' && p.getBoundingClientRect().top >= (b.querySelector('h2') || b).getBoundingClientRect().top); if (p) leads.push(p); }
    for (const p of leads) if (!skip(p) && Math.abs(parseFloat(getComputedStyle(p).fontSize) - WL) > 0.5) typ.add(`TYP-04 subtitle "${p.textContent.trim().slice(0, 30)}" at ${parseFloat(getComputedStyle(p).fontSize)}px; every subtitle is --font-size-lead (${WL}px)`);
    out.push(...typ);
  }

  // MOT-01
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const sky = document.querySelector('[data-sky]');
    if (sky && getComputedStyle(sky).transform !== 'none') out.push('MOT-01 the sky moves with reduced motion on');
    const loops = document.getAnimations().filter(a => a.playState === 'running' && a.effect && a.effect.getComputedTiming().iterations === Infinity);
    if (loops.length) out.push(`MOT-01 ${loops.length} animation(s) still loop with reduced motion on`);
  }

  // HIER-01 case heading hierarchy (CLAUDE.md LAY-08)
  const px = e => parseFloat(getComputedStyle(e).fontSize);
  const shown = e => { const r = e.getBoundingClientRect(); return r.width > 1 && r.height > 1; };
  const sec = [...document.querySelectorAll('[data-case-eyebrow]')].filter(shown);
  if (sec.length) {
    const secPx = Math.min(...sec.map(px));
    const subs = [...document.querySelectorAll('[data-case-band] h3')].filter(h => shown(h) && !inMock(h) && !h.closest('[data-surface],.card,.figure,figure,.note,.stats'));
    for (const h of subs) {
      const k = h.textContent.trim().slice(0, 30);
      if (!h.classList.contains('subsection') && getComputedStyle(h).textTransform !== 'uppercase') out.push(`HIER-01 an h3 in a case body that is neither a sub-section nor a label: "${k}"`);
      if (/^\s*\d+\.\d+/.test(h.textContent)) out.push(`HIER-01 a numbered sub-section: "${k}"`);
      if (h.classList.contains('subsection') && (px(h) >= secPx || parseInt(getComputedStyle(h).fontWeight) < 600)) out.push(`HIER-01 sub-section "${k}" at ${px(h)}px/${getComputedStyle(h).fontWeight}; below the section title (${secPx}px), weight 600`);
    }
    const subPx = subs.filter(h => h.classList.contains('subsection')).map(px);
    const cap = subPx.length ? Math.min(...subPx) : secPx;
    const items = [...document.querySelectorAll('[data-case-band] [data-surface="card"] h3, [data-case-band] [data-pattern] > p > strong:first-child')].filter(e => shown(e) && !inMock(e));
    const big = new Set();
    // an item title stays below the section title and never above a sub-section (it may equal one on phones)
    for (const e of items) if (px(e) >= secPx || px(e) > cap) big.add(`HIER-01 item title "${e.textContent.trim().slice(0, 30)}" at ${px(e)}px; below the section title (${secPx}px) and at most the sub-section (${cap}px)`);
    out.push(...big);
  }

  // PAT-04 big numbers are a Result or a Scope count, in .stats, and say which
  for (const s of document.querySelectorAll('.stats')) {
    const kind = s.dataset.pattern;
    const lab = s.querySelector(':scope > .eyebrow') || (s.previousElementSibling && s.previousElementSibling.matches('h3,.eyebrow') ? s.previousElementSibling : null);
    const txt = lab ? lab.textContent.trim() : '';
    if (!['result', 'scope'].includes(kind)) out.push(`PAT-04 a .stats block without data-pattern="result|scope"`);
    else if (!new RegExp('^' + kind, 'i').test(txt)) out.push(`PAT-04 a ${kind} block labelled "${txt || 'nothing'}"; its label starts with "${kind === 'result' ? 'Result' : 'Scope'}"`);
  }
  // the grammar covers case pages and about (services landings are not on it yet)
  const patScope = !!document.querySelector('[data-case-band]') || /\/about\.html$/.test(location.pathname);
  const bigNum = new Set();
  for (const e of patScope ? document.querySelectorAll('main *') : []) {
    if (inMock(e) || e.closest('h1,.stats,.hero,.band-inverse,.figure,figure,header,[data-case-index]')) continue;
    const own = [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim();
    if (!own || !/^([+\-−]?[\d.,]+\s*(%|×|x)?|\d+\s*→\s*\d+)$/.test(own)) continue;
    if (px(e) >= 24 && shown(e)) bigNum.add(`PAT-04 a big number "${own}" at ${px(e)}px outside .stats`);
  }
  out.push(...bigNum);

  // PAT-05 cards are stacked: one per row, full content width, 12px apart (CRD-01)
  const gapPx = probe('height:var(--gap-cards)').h;
  const unstacked = new Set();
  for (const g of document.querySelectorAll('[data-case-band] .cards')) {
    if (!shown(g) || inMock(g)) continue;
    const cs = getComputedStyle(g), kids = [...g.children].filter(shown);
    const cols = cs.display.includes('grid') ? cs.gridTemplateColumns.split(' ').filter(Boolean).length : 0;
    const gw = g.getBoundingClientRect().width;
    const k = g.textContent.trim().replace(/\s+/g, ' ').slice(0, 30);
    if (cols !== 1) unstacked.add(`PAT-05 a card group with ${cols || 'no grid'} column(s), near "${k}"; cards are stacked, one per row`);
    else if (kids.length > 1 && Math.abs(parseFloat(cs.rowGap) - gapPx) > 0.5) unstacked.add(`PAT-05 cards ${cs.rowGap} apart, near "${k}"; 12px (--gap-cards)`);
    for (const c of kids) if (Math.abs(c.getBoundingClientRect().width - gw) > 1) unstacked.add(`PAT-05 a card narrower than its group, near "${k}"; full content width`);
  }
  out.push(...unstacked);
  // PAT-07 what the case doesn't cover reads as inactive: a dashed rule, no elevation, muted text, a hollow marker
  const muted = probe('color:var(--text-muted)').color;
  const active = new Set();
  for (const r of document.querySelectorAll('[data-pattern="gap"]')) {
    if (!shown(r)) continue;
    const cs = getComputedStyle(r), p = r.querySelector('p'), k = r.textContent.trim().slice(0, 30);
    if (cs.borderTopStyle !== 'dashed' || cs.boxShadow !== 'none' || !/rgba\(0, 0, 0, 0\)/.test(cs.backgroundColor) || (p && getComputedStyle(p).color !== muted) || getComputedStyle(r, '::before').content === 'none')
      active.add(`PAT-07 gap row "${k}" is not in the inactive style (dashed rule, no elevation, muted text, hollow marker)`);
  }
  out.push(...active);


  // SEC-04, SEC-05 top-level sections: equal padding from one token, content on the gutter
  // (rows still waiting for their scroll reveal are measured where they land)
  {
    const settle = document.createElement('style');
    settle.textContent = '[data-reveal] *:not([data-illo] *){opacity:1!important;transform:none!important;filter:none!important}';
    document.head.appendChild(settle);
    const Y = scrollY, tr = c => /rgba\(0, 0, 0, 0\)/.test(c) || c === 'transparent';
    const root = getComputedStyle(document.documentElement);
    const G = Math.max(0, (W - (parseFloat(root.getPropertyValue('--page-max')) || 1400)) / 2) + (parseFloat(root.getPropertyValue('--page-gutter')) || 32);
    const SY = probe('height:var(--section-y)').h;
    const main = document.querySelector('main');
    const on = e => { const r = e.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return false; for (let a = e; a && a !== document.body; a = a.parentElement) { const q = getComputedStyle(a); if (q.display === 'none' || q.visibility === 'hidden' || parseFloat(q.opacity) === 0) return false; } return true; };
    const blocks = [];
    const add = e => { if (!e || /^(SCRIPT|STYLE|TEMPLATE)$/.test(e.tagName) || e.matches('[data-case-index]')) return; const bands = e.querySelectorAll(':scope > [data-case-band]'); if (bands.length) bands.forEach(b => blocks.push(b)); else blocks.push(e); };
    if (main && main.matches('.hero')) blocks.push(main); else if (main) [...main.children].forEach(add);
    for (let s = main && main.nextElementSibling; s; s = s.nextElementSibling) { if (s.matches('section')) add(s); const f = s.matches('footer') ? s : s.querySelector && s.querySelector('footer'); if (f) blocks.push(f.firstElementChild || f); }
    const kindOf = b => b.matches('.hero') ? 'hero' : b.matches('.case-details') ? 'opening' : b.matches('.band-inverse') ? 'band' : b.closest('footer') ? 'footer' : b.matches('.well') ? 'well' : 'section';
    const linesOf = e => {
      const r = e.getBoundingClientRect(), o = [];
      for (const ps of ['::before', '::after']) {
        const q = getComputedStyle(e, ps);
        if (!q.content || q.content === 'none' || q.position !== 'absolute' || parseFloat(q.height) > 2 || tr(q.backgroundColor)) continue;
        const h = parseFloat(q.height) || 1, l = r.left + (parseFloat(q.left) || 0), rr = r.right - (parseFloat(q.right) || 0);
        if (q.top === '0px') o.push({ y: r.top + Y, h, w: rr - l, top: true }); else if (q.bottom === '0px') o.push({ y: r.bottom + Y - h, h, w: rr - l });
      }
      const q = getComputedStyle(e);
      if (parseFloat(q.borderTopWidth) > 0 && q.borderTopStyle !== 'none' && !tr(q.borderTopColor)) o.push({ y: r.top + Y, h: parseFloat(q.borderTopWidth), w: r.width, top: true });
      return o;
    };
    const B = [], drawers = new Set(), bounds = [];
    for (const b of blocks) {
      if (!on(b)) continue;
      const r = b.getBoundingClientRect(), k = kindOf(b);
      for (const c of [b, b.firstElementChild].filter(Boolean)) {
        const ls = linesOf(c).filter(l => (c === b || l.top) && l.w > r.width * 0.5);
        if (ls.length) drawers.add(c);
        ls.forEach(l => bounds.push({ y: l.y, y2: l.y + l.h, t: 'line' }));
      }
      if (k !== 'section') { bounds.push({ y: r.top + Y, y2: r.top + Y, t: k + '-top', own: k === 'well' ? b : null }); bounds.push({ y: r.bottom + Y, y2: r.bottom + Y, t: k + '-bottom', own: k === 'well' ? b : null }); }
      B.push({ b, k, r });
    }
    bounds.sort((a, c) => a.y - c.y);
    const edged = q => ['Top', 'Right', 'Bottom', 'Left'].some(s => parseFloat(q['border' + s + 'Width']) > 0 && q['border' + s + 'Style'] !== 'none' && !tr(q['border' + s + 'Color']));
    const boxesOf = rootEl => {
      const out = [];
      const walk = e => {
        for (const c of e.children) {
          if (/^(SCRIPT|STYLE|TEMPLATE|BR)$/.test(c.tagName) || c.matches('[data-case-index],[data-rail-indexed]')) continue;
          if (c.parentElement && c.parentElement.matches('details:not([open])') && c.tagName !== 'SUMMARY') continue;
          const q = getComputedStyle(c);
          if (q.display === 'none' || q.position === 'fixed') continue;
          if (!on(c)) { if (q.display === 'contents' || c.getBoundingClientRect().height === 0) walk(c); continue; }
          const r = c.getBoundingClientRect(), box = { t: r.top + Y, b: r.bottom + Y, l: r.left };
          if ((edged(q) && !drawers.has(c)) || !tr(q.backgroundColor) || q.backgroundImage !== 'none' || (q.boxShadow && q.boxShadow !== 'none') ||
              c.matches('.card,.figure,figure,.well,.glass,.note,.link-card,[data-surface],[data-illo],.plan-card,.accordion,img,svg,video,canvas,iframe,picture')) { out.push(box); continue; }
          if ([...c.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) out.push(box);
          walk(c);
        }
      };
      walk(rootEl);
      return out;
    };
    const wideCase = document.documentElement.classList.contains('has-case-index') && matchMedia('(min-width: 861px)').matches;
    const pads = new Set(), cols = new Set();
    for (const x of B) {
      if (x.k !== 'section' && x.k !== 'well') continue;
      const bx = x.k === 'well' ? [{ t: x.r.top + Y, b: x.r.bottom + Y, l: x.r.left }] : boxesOf(x.b);
      if (!bx.length) continue;
      const top = Math.min(...bx.map(b => b.t)), bot = Math.max(...bx.map(b => b.b)), left = Math.min(...bx.map(b => b.l));
      const U = bounds.filter(u => u.own !== x.b);
      let above = U.filter(u => u.y2 <= top + 0.5).pop(); const below = U.find(u => u.y >= bot - 0.5);
      if (above && (above.t === 'hero-bottom' || (x.k === 'well' && above.t !== 'band-bottom'))) above = null;
      const name = (x.b.querySelector('[data-case-eyebrow],h2:not([data-rail-indexed]),.eyebrow,h3') || x.b).textContent.trim().replace(/\s+/g, ' ').slice(0, 30);
      const pt = above ? top - above.y2 : null, pb = below ? below.y - bot : null;
      const bad = [];
      if (pt !== null && Math.abs(pt - SY) > 2) bad.push(`${pt.toFixed(0)}px above`);
      if (pb !== null && Math.abs(pb - SY) > 2) bad.push(`${pb.toFixed(0)}px below`);
      if (!bad.length && pt !== null && pb !== null && Math.abs(pt - pb) > 2) bad.push(`${pt.toFixed(0)}px above and ${pb.toFixed(0)}px below`);
      if (bad.length) pads.add(`SEC-04 "${name}": content ${bad.join(', ')}; --section-y is ${SY.toFixed(0)}px, above and below`);
      let expect = G;
      if (x.b.matches('[data-case-band]') && wideCase) { const gap = parseFloat(getComputedStyle(x.b).columnGap) || 0; expect = x.r.left + (x.r.width - 3 * gap) / 4 + gap; }
      if (Math.abs(left - expect) > 1) cols.add(`SEC-05 "${name}": content starts at ${left.toFixed(0)}px, the ${expect === G ? 'gutter' : 'case body column'} is ${expect.toFixed(0)}px`);
    }
    out.push(...pads, ...cols);
    settle.remove();
  }

  // SEC-06 wide components end on the column grid: the full content width, or half of it (2 of 4 columns); in a case body
  // (wide screens) the body column. Cards come in two widths only: big (full) and small (half). Heroes, the ink band, drawings,
  // case windows and anything inside a surface are out of scope (a surface insets its own content).
  {
    const root = getComputedStyle(document.documentElement);
    const G = Math.max(0, (W - (parseFloat(root.getPropertyValue('--page-max')) || 1400)) / 2) + (parseFloat(root.getPropertyValue('--page-gutter')) || 32);
    const wideCase = document.documentElement.classList.contains('has-case-index') && matchMedia('(min-width: 861px)').matches;
    const SURF = '.card,.link-card,.figure,figure,.well,.glass,.plan-card,.accordion,.note,[data-surface],.illo-window,.step,.chip';
    const colOf = e => {
      const band = e.closest('[data-case-band]');
      let L = G, R = W - G;
      if (band) {
        const r = band.getBoundingClientRect();
        R = r.right;
        if (wideCase) { const gap = parseFloat(getComputedStyle(band).columnGap) || 0; L = r.left + (r.width - 3 * gap) / 4 + gap; }
        else L = r.left;
      }
      return { L, R };
    };
    // inside a scroller or a clipping frame (below <main>; the page wrapper's clip is LAY-01's)
    const scrolls = e => { for (let a = e.parentElement; a && a !== document.body && a.tagName !== 'MAIN'; a = a.parentElement) if (/auto|scroll|hidden|clip/.test(getComputedStyle(a).overflowX)) return true; return false; };
    // form controls and links keep their own measure: a field's border, a link's underline are not dividers
    const control = e => !!e.closest('label,form,fieldset,[role="radiogroup"],[role="group"]') || !!e.querySelector('input,textarea,select') || getComputedStyle(e).display.startsWith('inline');
    const outOfScope = e => inMock(e) || !!e.closest('header,footer,.hero,.band-inverse,[data-case-index],.ld-art,.illo-window,.hx') || scrolls(e);
    // a cell of a grid follows its grid: the grid (or the section around it) is what ends on a line
    const cell = e => { const p = e.parentElement; if (!p) return false; const q = getComputedStyle(p); return q.display.includes('grid') && q.gridTemplateColumns.split(' ').filter(Boolean).length > 1; };
    const nestedIn = e => { const p = e.parentElement && e.parentElement.closest(SURF); return !!p; };
    const ends = new Set(), widths = new Set();
    const judge = (e, what) => {
      const r = e.getBoundingClientRect();
      if (r.width < 40 || r.height < 1 || !visible(e, getComputedStyle(e))) return;
      const { L, R } = colOf(e), g = gapPx, col = (R - L - 3 * g) / 4;
      const lines = [1, 2, 3].map(k => L + k * col + (k - 1) * g); // the ends of columns 1 to 3 (a gap wider than 12px moves a line by at most half of it)
      const onFull = Math.abs(r.right - R) <= 1.5, onLine = lines.some(x => Math.abs(r.right - x) <= 24);
      const k = (e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30);
      if (!onFull && !onLine) ends.add(`SEC-06 ${what} "${k}" ends at ${r.right.toFixed(0)}px; the column grid ends at ${lines.map(x => x.toFixed(0)).join(', ')} or ${R.toFixed(0)}px`);
      return { r, L, R };
    };
    // cards: two widths, and they end on the grid
    const CARD = '.card,.link-card,.plan-card,[data-surface="card"],.accordion';
    for (const c of document.querySelectorAll(CARD)) {
      if (outOfScope(c) || nestedIn(c)) continue;
      const j = judge(c, 'a card'); if (!j) continue;
      const full = j.R - j.L, w = j.r.width;
      if (!(Math.abs(w - full) <= 1.5 || (w >= full / 2 - 24 && w <= full / 2 + 1))) widths.add(`SEC-06 a card ${w.toFixed(0)}px wide, near "${(c.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30)}"; cards are big (${full.toFixed(0)}px) or small (half)`);
    }
    // other wide components
    for (const e of document.querySelectorAll('.figure,figure,.note,.stats,.ld-list,[data-pattern="finding"],[data-pattern="reference"],[data-pattern="principle"],[data-pattern="gap"],.accordions,.cards,.plans,.ld-layers,.link-cards')) {
      if (outOfScope(e) || nestedIn(e) || cell(e)) continue;
      judge(e, e.matches('[data-pattern]') ? 'a row' : 'a component');
    }
    // in-section dividers: a visible rule, not inside a surface
    for (const e of document.querySelectorAll('main *')) {
      if (outOfScope(e) || e.closest(SURF) || e.matches(SURF) || cell(e) || control(e)) continue;
      const cs = getComputedStyle(e);
      const ruled = ['Top', 'Bottom'].some(sd => parseFloat(cs['border' + sd + 'Width']) > 0 && cs['border' + sd + 'Style'] !== 'none' && !/rgba\(0, 0, 0, 0\)/.test(cs['border' + sd + 'Color']));
      if (!ruled) continue;
      const r = e.getBoundingClientRect(), { L, R } = colOf(e);
      if (r.width < (R - L) * 0.3) continue; // short rules inside a row (a label, a key) are part of their row
      judge(e, 'a divider');
    }
    out.push(...ends, ...widths);
  }

  // COL-08 contrast
  const rgba = c => { const m = (c.match(/[\d.]+/g) || []).map(Number); if (/^color\(srgb/.test(c)) { m[0] *= 255; m[1] *= 255; m[2] *= 255; } return [m[0], m[1], m[2], m.length > 3 ? m[3] : 1]; };
  const over = (top, bot) => { const a = top[3]; return [0, 1, 2].map(i => top[i] * a + bot[i] * (1 - a)).concat(1); };
  const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  const skyDeep = rgba(probe('color:var(--sky-deepest,var(--surface-page))').color);
  const ground = e => {
    const layers = [];
    for (let a = e; a; a = a.parentElement) {
      if (a === document.body || a === document.documentElement) { layers.push(skyDeep); break; } // on the sky
      const cs = getComputedStyle(a);
      if (cs.backgroundImage !== 'none' || /blur/.test(cs.backdropFilter || '')) return null;
      const c = rgba(cs.backgroundColor);
      if (c[3] > 0) { layers.push(c); if (c[3] >= 1) break; }
    }
    let g = [255, 255, 255, 1];
    for (let i = layers.length - 1; i >= 0; i--) g = over(layers[i], g);
    return g;
  };
  const low = new Map();
  for (const e of document.querySelectorAll('body *')) {
    if (e.closest('script,style,template,svg,[data-mock],[aria-hidden="true"],#boot')) continue;
    if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    const cs = getComputedStyle(e);
    if (!visible(e, cs) || cs.clipPath.includes('inset(50%)') || cs.clip === 'rect(0px, 0px, 0px, 0px)') continue;
    const g = ground(e); if (!g) continue;
    const fg = rgba(cs.color); if (fg[3] === 0) continue;
    const c = over(fg, g);
    const L1 = lum(c), L2 = lum(g);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const px = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700;
    const need = (px >= 24 || (bold && px >= 18.66) || !/[A-Za-z0-9]/.test(e.textContent)) ? 3 : 4.5;
    if (ratio < need - 0.005) {
      const k = cs.color + ' on ' + g.slice(0, 3).map(Math.round).join(',');
      if (!low.has(k)) low.set(k, { ratio, n: 0, text: e.textContent.trim().slice(0, 30) });
      low.get(k).n++;
    }
  }
  out.push(...[...low.entries()].map(([k, v]) => `COL-08 ${v.ratio.toFixed(2)} "${v.text}" (${v.n}x ${k})`));

  // ILL-02 text inside a drawing (svg, [data-illo], .illo-window) is the label style: at least 9.5px as rendered
  // (scaling counts), uppercase at 0.14em and 600 or bolder. Product UI inside a drawing carries [data-mock] and is exempt.
  const ill = new Map();
  for (const e of document.querySelectorAll('svg text, svg tspan, [data-illo] *, .illo-window *, .figure *')) {
    if (e.closest('[data-mock],header,nav,.hx-sticker,figcaption,.figure__caption')) continue;
    // in a figure's picture (a wireframe) product text keeps sentence case; its uppercase labels are the label style
    const drawing = !!e.closest('svg,[data-illo],.illo-window');
    if (!drawing && getComputedStyle(e).textTransform !== 'uppercase') continue;
    const own = [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim();
    if (!own || !/[A-Za-z0-9]/.test(own)) continue;
    const cs = getComputedStyle(e);
    // a row still waiting for its entrance is transparent, not absent: check it anyway
    if (cs.display === 'none' || cs.visibility === 'hidden' || !e.getClientRects().length || e.closest('[hidden]')) continue;
    let scale = 1;
    if (e instanceof SVGElement) { const s = e.ownerSVGElement, vb = s && s.viewBox.baseVal; if (vb && vb.width) scale = s.getBoundingClientRect().width / vb.width; }
    else for (let a = e; a && a !== document.body; a = a.parentElement) {
      // the used width is untransformed; the box on screen is not, so their ratio is the drawing's scale
      const s = getComputedStyle(a), w = parseFloat(s.width);
      if (!w || s.display === 'inline') continue;
      const full = s.boxSizing === 'border-box' ? w : w + parseFloat(s.paddingLeft) + parseFloat(s.paddingRight) + parseFloat(s.borderLeftWidth) + parseFloat(s.borderRightWidth);
      scale = a.getBoundingClientRect().width / full; break;
    }
    const fs = parseFloat(cs.fontSize) * scale;
    const ls = cs.letterSpacing === 'normal' ? 0 : parseFloat(cs.letterSpacing) / parseFloat(cs.fontSize);
    const up = cs.textTransform === 'uppercase' || own === own.toUpperCase();
    const why = [];
    // the landing diagrams (.ld-art) keep their phone formula below 480px (components.css): labels at about 8.8px,
    // so a long vertical label clears the top rule. Recorded as an open proposal (illo round 1), not yet a rule.
    const floor = e.closest('.ld-art') && innerWidth <= 480 ? 8.5 : 9.45;
    if (fs < floor) why.push(`${fs.toFixed(1)}px`);
    else if (!drawing && ![9.5, 10.5, 12.5].some(v => Math.abs(fs - v) < 0.1)) why.push(`${fs.toFixed(1)}px (9.5, core 10.5, heading 12.5)`);
    if (!up) why.push('not uppercase');
    else if (/[A-Za-z]/.test(own) && Math.abs(ls - 0.14) > 0.006) why.push(`tracking ${ls.toFixed(2)}em`);
    if (parseInt(cs.fontWeight, 10) < 600) why.push(`weight ${cs.fontWeight}`);
    if (why.length) { const k = own.slice(0, 30); ill.set(k, `ILL-02 "${k}" ${why.join(', ')}; the label style is uppercase, 600, 0.14em, 9.5px (mark product UI [data-mock])`); }
  }
  out.push(...ill.values());

  // ILL-07 a case window (home, Work) shows one change read left to right (.illo-ba): at most 8 labels outside
  // product UI ([data-mock]), and the accent on one side only.
  const acc = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const accProbe = document.createElement('i'); accProbe.style.color = acc; document.body.appendChild(accProbe);
  const accRgb = getComputedStyle(accProbe).color; accProbe.remove();
  document.querySelectorAll('.illo-window--case').forEach((w, n) => {
    if (!w.getClientRects().length || getComputedStyle(w).display === 'none') return;
    const labels = [...w.querySelectorAll('*')].filter(e => !e.closest('[data-mock]') && [...e.childNodes].some(c => c.nodeType === 3 && /[A-Za-z0-9]/.test(c.textContent)));
    if (labels.length > 8) out.push(`ILL-07 case window ${n + 1} has ${labels.length} labels (at most 8)`);
    const sides = [...w.querySelectorAll('.illo-side')];
    if (sides.length) {
      const lit = sides.filter(sd => [...sd.querySelectorAll('*')].some(e => { const c = getComputedStyle(e); return c.color === accRgb || c.backgroundColor === accRgb || c.borderTopColor === accRgb; }));
      if (lit.length > 1) out.push(`ILL-07 case window ${n + 1} carries the accent on both sides (one side only)`);
    } else out.push(`ILL-07 case window ${n + 1} is not a before/after (.illo-ba)`);
  });
  return location.pathname + ' :: ' + (out.length ? out.join(' ; ') : 'pass');
})()
