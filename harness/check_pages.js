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
 *   ACT-02  more than one primary action on the page
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
 *   PAT-07  a gap row ("What this case doesn't cover") without the inactive style: dashed rule, no elevation, muted text
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
    if (cs.textTransform === 'uppercase' && parseFloat(cs.fontSize) < 10.95 && !inMock(e) && !e.closest('.tag,header,[data-case-index] a span,.figure') &&
        [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && visible(e, cs)) {
      const k = e.textContent.trim().slice(0, 30);
      small.set(k, `TYP-01 label at ${parseFloat(cs.fontSize)}px, the eyebrow is 11px: "${k}"`);
    }
  }
  out.push(...small.values());
  if (primaries > 1) out.push(`ACT-02 ${primaries} primary actions on the page; one, then links`);

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
  return location.pathname + ' :: ' + (out.length ? out.join(' ; ') : 'pass');
})()
