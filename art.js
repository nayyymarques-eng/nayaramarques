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
// Case scenes, direction B "The hand" (ILL-01, ILL-06; Nayara 2026-09-28): a cursor performs the case's one change on a
// --dur-scene loop (components.css .scene--hand). This script measures the cursor's stops: the centre of each
// [data-p="p0".."p5"] target, relative to the scene, measured without transforms (offset chain), written as --pkx/--pky
// on the scene (a missing stop repeats the one before). The loop starts (.is-live) the first time the scene is in view and
// pauses (.is-offscreen) while it is out of view, as the .ld-art loops above. Reduced motion, phones (below 900px, where the
// scene stacks) and no script: the CSS shows the resolved end state, still.
(function () {
  if (window.__scenes) return; // the page runtime can run scripts twice
  window.__scenes = true;
  function off(el, root) { var x = 0, y = 0, n = el; while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; } return [x, y]; }
  function measure(scene) {
    var last = null, first = scene.querySelector('[data-p="p0"]') ? null : scene.querySelector('[data-p="p1"]');
    // no p0: the cursor comes in from below left of its first stop
    if (first && first.offsetParent) { var f = off(first, scene); last = [f[0] + first.offsetWidth / 2 - 56, f[1] + first.offsetHeight / 2 + 40]; }
    for (var k = 0; k < 6; k++) {
      var el = scene.querySelector('[data-p="p' + k + '"]');
      if (el && el.offsetParent) { var o = off(el, scene); last = [o[0] + el.offsetWidth / 2, o[1] + el.offsetHeight / 2]; }
      if (last) { scene.style.setProperty('--p' + k + 'x', last[0].toFixed(1) + 'px'); scene.style.setProperty('--p' + k + 'y', last[1].toFixed(1) + 'px'); }
    }
  }
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var s = e.target;
      s.classList.toggle('is-offscreen', !e.isIntersecting);
      if (e.isIntersecting && !s.classList.contains('is-live')) { measure(s); s.classList.add('is-live'); }
    });
  }, { threshold: 0.2 }) : null;
  var seen = typeof WeakSet === 'function' ? new WeakSet() : null;
  function scan() {
    [].forEach.call(document.querySelectorAll('.scene--hand'), function (s) {
      measure(s);
      if (seen && seen.has(s)) return;
      if (seen) seen.add(s);
      if (io) io.observe(s);
    });
  }
  if (document.readyState !== 'loading') scan(); else document.addEventListener('DOMContentLoaded', scan);
  window.addEventListener('load', function () { scan(); setTimeout(scan, 600); setTimeout(scan, 2000); });
  var t; window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(scan, 150); });
  window.__sceneScan = scan;
})();
