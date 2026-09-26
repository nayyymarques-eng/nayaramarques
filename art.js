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
