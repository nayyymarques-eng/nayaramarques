// Illustrations (ILL-01): a loop never runs off screen (M-10). Every .ld-art is watched; while it is out of view
// it carries .is-offscreen, which pauses its animations (components.css). The page runtime renders late, so look again on load.
(function () {
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { e.target.classList.toggle('is-offscreen', !e.isIntersecting); });
  });
  var seen = typeof WeakSet === 'function' ? new WeakSet() : null;
  function watch() {
    [].forEach.call(document.querySelectorAll('.ld-art'), function (el) {
      if (seen && seen.has(el)) return;
      if (seen) seen.add(el);
      io.observe(el);
    });
  }
  window.addEventListener('load', function () { watch(); setTimeout(watch, 600); setTimeout(watch, 2000); });
})();
// Case scenes (ILL-01, ILL-06; 2026-09-27): one entrance when a .scene scrolls into view, never a loop.
// With motion allowed, a scene waits ([data-enter]) and gets .is-in once, the first time a third of it is in view.
// Before that, the cursor, its rings and the travelling pieces are placed on their targets, measured without transforms.
// Reduced motion, or no script: nothing is set and the scene shows its end state (components.css).
(function () {
  if (window.__scenes) return; // the page runtime can run scripts twice
  window.__scenes = true;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  function off(el, root) { var x = 0, y = 0, n = el; while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; } return [x, y]; }
  function pt(stage, sel) { var el = stage.querySelector(sel); if (!el) return [0, 0]; var o = off(el, stage); return [o[0] + el.offsetWidth * 0.55, o[1] + el.offsetHeight * 0.6]; }
  function place(scene) {
    [].forEach.call(scene.querySelectorAll('[data-t1]'), function (cur) {
      var stage = cur.offsetParent; if (!stage) return;
      var a = pt(stage, cur.dataset.t1), b = pt(stage, cur.dataset.t2), o = (cur.dataset.t0 || '60,80').split(',').map(Number);
      [['--x0', a[0] + o[0]], ['--y0', a[1] + o[1]], ['--x1', a[0]], ['--y1', a[1]], ['--x2', b[0]], ['--y2', b[1]]].forEach(function (v) { cur.style.setProperty(v[0], v[1].toFixed(1) + 'px'); });
    });
    [].forEach.call(scene.querySelectorAll('[data-at]'), function (r) {
      var stage = r.offsetParent; if (!stage) return; var p = pt(stage, r.dataset.at); r.style.left = p[0] + 'px'; r.style.top = p[1] + 'px';
    });
    [].forEach.call(scene.querySelectorAll('[data-to]'), function (el) {
      var t = scene.querySelector(el.dataset.to); if (!t || !el.offsetParent) return;
      var a = off(el, scene), b = off(t, scene);
      el.style.setProperty('--tx', (b[0] + t.offsetWidth / 2 - a[0] - el.offsetWidth / 2).toFixed(1) + 'px');
      el.style.setProperty('--ty', (b[1] + t.offsetHeight / 2 - a[1] - el.offsetHeight / 2).toFixed(1) + 'px');
    });
  }
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      place(e.target); e.target.classList.add('is-in'); io.unobserve(e.target);
    });
  }, { threshold: 0.35 }) : null;
  var seen = typeof WeakSet === 'function' ? new WeakSet() : null;
  function scan() {
    [].forEach.call(document.querySelectorAll('.scene'), function (s) {
      if (seen && seen.has(s)) return;
      if (seen) seen.add(s);
      if (!io || reduce.matches || s.classList.contains('is-in')) return;
      s.setAttribute('data-enter', '');
      io.observe(s);
    });
  }
  if (document.readyState !== 'loading') scan(); else document.addEventListener('DOMContentLoaded', scan);
  window.addEventListener('load', function () { scan(); setTimeout(scan, 600); setTimeout(scan, 2000); });
  window.__sceneScan = scan;
})();
