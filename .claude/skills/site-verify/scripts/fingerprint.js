/* Colour fingerprint of the rendered page: how many elements use each computed colour,
 * per property. Used to prove a change moved only the colours it was meant to move.
 *
 * In the preview, on a page:
 *   snapshot:  eval(await (await fetch('/.claude/skills/site-verify/scripts/fingerprint.js')).text())('save')
 *   compare:   eval(await (await fetch('/.claude/skills/site-verify/scripts/fingerprint.js')).text())('compare', ['222, 219, 213'])
 * The second argument lists rgb triples that are allowed to change (the colours being merged).
 * Snapshots live in localStorage under "fp:<path>", so take them before editing.
 */
(mode, allowed = []) => {
  const h = {};
  const add = k => { h[k] = (h[k] || 0) + 1; };
  for (const e of document.querySelectorAll('body *')) {
    if (e.closest('script,style,template')) continue;
    const c = getComputedStyle(e);
    add('color ' + c.color);
    add('bg ' + c.backgroundColor);
    for (const s of ['Top', 'Right', 'Bottom', 'Left'])
      if (parseFloat(c['border' + s + 'Width']) > 0) add('border ' + c['border' + s + 'Color']);
    if (e instanceof SVGElement) { add('fill ' + c.fill); add('stroke ' + c.stroke); }
    for (const ps of ['::before', '::after']) {
      const p = getComputedStyle(e, ps);
      if (p.content && p.content !== 'none') add('pseudo-bg ' + p.backgroundColor);
    }
  }
  const key = 'fp:' + location.pathname;
  if (mode === 'save') {
    localStorage.setItem(key, JSON.stringify(h));
    return location.pathname + ' :: snapshot saved (' + Object.values(h).reduce((a, b) => a + b, 0) + ' values)';
  }
  const before = JSON.parse(localStorage.getItem(key) || 'null');
  if (!before) return location.pathname + ' :: no snapshot; run save before editing';
  const touched = k => allowed.some(a => k.includes(a)) || k.startsWith('shadow');
  const diffs = [];
  for (const k of new Set([...Object.keys(before), ...Object.keys(h)]))
    if ((before[k] || 0) !== (h[k] || 0) && !touched(k)) diffs.push(k + ' ' + (before[k] || 0) + '→' + (h[k] || 0));
  return location.pathname + ' :: ' + (diffs.length ? 'UNEXPECTED ' + diffs.slice(0, 8).join(' ; ') : 'identical apart from allowed colours');
}
