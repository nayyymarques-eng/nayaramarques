/* Rendered-page checks. Run in the local preview (the site served from the repo root):
 *
 *   eval(await (await fetch('/harness/check_pages.js')).text())
 *
 * Returns "<page> :: pass" or a list of findings. Rules are defined in CLAUDE.md.
 *   LAY-01  page is wider than the screen
 *   LAY-03  two light sections meet with no line between them
 *   LAY-04  two light sections meet with two lines between them
 *   LAY-03  a line between different backgrounds stops at the content edge (it must run edge to edge)
 *   LAY-05  an edge-to-edge line between two sections of the same background (same background = one section: use an in-flow divider)
 *   COL-08  text contrast below WCAG AA on its ground: 4.5, or 3.0 for large text (24px+, or 18.66px+ bold).
 *           The ground is the composited background of the nearest ancestors (images and gradients are
 *           skipped, as are [data-mock] figures and hidden text). Reported as "warn" until the
 *           consolidation's B-2 and B-14 land, then it fails like the rest (COL08_FAILS).
 *   Boundaries marked data-rule="none" are skipped (e.g. the home hero).
 */
(() => {
  const main = document.querySelector('main') || document.body;
  const mw = main.getBoundingClientRect().width - 64;
  const fills = [], lines = [];
  const bodyBg = getComputedStyle(document.body).backgroundColor;
  const W = innerWidth;
  let order = 0;
  for (const e of document.querySelectorAll('body *')) {
    order++;
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.position === 'sticky' || cs.position === 'fixed' || e.closest('header')) continue;
    const r = e.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const top = r.top + scrollY, bot = r.bottom + scrollY;
    // full-bleed pseudo lines (style-before / style-after with left:-100vmax)
    for (const ps of ['::before', '::after']) {
      const p = getComputedStyle(e, ps);
      if (!p.content || p.content === 'none' || p.position !== 'absolute') continue;
      if (parseFloat(p.height) > 2 || parseFloat(p.left) > -100) continue;
      if (p.top === '0px') lines.push({ y: top, full: true });
      else if (p.bottom === '0px') lines.push({ y: bot - 1, full: true });
    }
    // full-bleed band: clip-path:inset(0 -100vmax), which the browser reports in px
    const bleed = /inset\(0px -\d+(\.\d+)?px\)|vmax/.test(cs.clipPath || '') || (e.getAttribute('style') || '').includes('-100vmax');
    if (!(bleed || r.width >= mw * 0.9)) continue;
    const clear = /rgba\(0, 0, 0, 0\)/.test(cs.backgroundColor);
    // only real sections set the background here: full-bleed bands or full-width sections, not cards
    if (!clear && r.height > 3 && (bleed || r.width >= W * 0.97)) fills.push({ top, bot, bg: cs.backgroundColor, order });
    if (r.height <= 2 && !clear) lines.push({ y: top, full: r.width >= W * 0.97 });
    if (parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none') lines.push({ y: top, full: r.width >= W * 0.97 });
    if (parseFloat(cs.borderBottomWidth) > 0 && cs.borderBottomStyle !== 'none') lines.push({ y: bot - 1, full: r.width >= W * 0.97 });
  }
  const colorAt = y => { let best = null; for (const f of fills) if (y >= f.top && y < f.bot && (!best || f.order > best.order)) best = f; return best ? best.bg : bodyBg; };
  const light = c => { const m = c.match(/[\d.]+/g).map(Number); return m[0] > 200 && m[1] > 200 && m[2] > 200 && !(m[0] === 255 && m[1] === 255 && m[2] === 255); };
  const heads = [...document.querySelectorAll('h1,h2,h3')].map(h => [h.getBoundingClientRect().top + scrollY, h.textContent.trim().slice(0, 40)]);
  const near = y => (heads.filter(h => h[0] <= y + 40).pop() || [0, 'top'])[1];
  const out = [];
  if (document.documentElement.scrollWidth > W + 1) out.push(`LAY-01 page is ${document.documentElement.scrollWidth}px wide on a ${W}px screen`);
  const noRule = [...document.querySelectorAll('[data-rule="none"]')].map(e => e.getBoundingClientRect().top + scrollY);
  const skip = y => noRule.some(t => Math.abs(t - y) <= 2);
  for (const l of lines.filter(l => l.full)) {
    if (colorAt(l.y - 3) === colorAt(l.y + 3)) out.push(`LAY-05 edge-to-edge line between two sections of the same background, near "${near(l.y)}"`);
  }
  const H = document.documentElement.scrollHeight;
  let prev = colorAt(0);
  for (let y = 1; y < H; y++) {
    const c = colorAt(y);
    if (c === prev) continue;
    if (light(c) && light(prev) && !skip(y)) {
      const here = lines.filter(l => Math.abs(l.y - y) <= 2);
      const ys = [...new Set(here.map(l => Math.round(l.y)))];
      if (ys.length === 0) out.push(`LAY-03 no line where sections meet, near "${near(y)}"`);
      else if (ys.length > 1) out.push(`LAY-04 double line where sections meet, near "${near(y)}"`);
      else if (!here.some(l => l.full)) out.push(`LAY-03 section line stops at the content edge, near "${near(y)}"`);
    }
    prev = c;
  }
  // COL-08 contrast
  const COL08_FAILS = false;
  const rgba = c => { const m = (c.match(/[\d.]+/g) || []).map(Number); if (/^color\(srgb/.test(c)) { m[0] *= 255; m[1] *= 255; m[2] *= 255; } return [m[0], m[1], m[2], m.length > 3 ? m[3] : 1]; };
  const over = (top, bot) => { const a = top[3]; return [0, 1, 2].map(i => top[i] * a + bot[i] * (1 - a)).concat(1); };
  const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  const ground = e => {
    const layers = [];
    for (let a = e; a; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.backgroundImage !== 'none') return null;
      const c = rgba(cs.backgroundColor);
      if (c[3] > 0) { layers.push(c); if (c[3] >= 1) break; }
    }
    let g = [255, 255, 255, 1];
    for (let i = layers.length - 1; i >= 0; i--) g = over(layers[i], g);
    return g;
  };
  const low = new Map();
  for (const e of document.querySelectorAll('body *')) {
    if (e.closest('script,style,template,svg,[data-mock],[aria-hidden="true"]')) continue;
    if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    const cs = getComputedStyle(e);
    if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) === 0) continue;
    const r = e.getBoundingClientRect();
    if (r.width < 2 || r.height < 2 || cs.clipPath.includes('inset(50%)') || cs.clip === 'rect(0px, 0px, 0px, 0px)') continue;
    let hidden = false;
    for (let a = e; a; a = a.parentElement) { const s = getComputedStyle(a); if (parseFloat(s.opacity) === 0 || s.visibility === 'hidden') { hidden = true; break; } }
    if (hidden) continue;
    const g = ground(e); if (!g) continue;
    const fg = rgba(cs.color); if (fg[3] === 0) continue;
    const c = over(fg, g);
    const L1 = lum(c), L2 = lum(g);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const px = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700;
    const need = (px >= 24 || (bold && px >= 18.66)) ? 3 : 4.5;
    if (ratio < need - 0.005) {
      const k = cs.color + ' on ' + g.slice(0, 3).map(Math.round).join(',');
      if (!low.has(k)) low.set(k, { ratio, n: 0, text: e.textContent.trim().slice(0, 30) });
      low.get(k).n++;
    }
  }
  const contrast = [...low.entries()].map(([k, v]) => `COL-08 ${v.ratio.toFixed(2)} "${v.text}" (${v.n}x ${k})`);
  if (COL08_FAILS) out.push(...contrast);
  const warn = !COL08_FAILS && contrast.length ? ' [warn ' + contrast.join(' ; ') + ']' : '';
  return location.pathname + ' :: ' + (out.length ? out.join(' ; ') : 'pass') + warn;
})()
