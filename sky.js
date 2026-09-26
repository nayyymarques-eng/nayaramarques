// The sky (SKY-01): one grained blue day gradient behind every page, the far plane.
// It moves at --sky-speed (0.3) of the scroll while the content moves at 1; the
// difference in speed is what reads as depth. Transform only, no images, no blur.
// Under reduced motion it does not move with the scroll: it is sized to the page
// and scrolls with it. Styles live in tokens/base.css ([data-sky]).
(function () {
  if (window.__sky) return; // the page runtime can run scripts twice
  window.__sky = true;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var sky = document.createElement('div');
  sky.setAttribute('data-sky', '');
  sky.setAttribute('aria-hidden', 'true');

  function speed() {
    var v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sky-speed'));
    return isFinite(v) ? v : 0.3;
  }
  function attach() {
    if (!document.body) return false;
    if (sky.parentNode !== document.body) document.body.insertBefore(sky, document.body.firstChild);
    return true;
  }
  function size() {
    if (!attach()) return;
    var doc = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    var vh = window.innerHeight, travel = Math.max(0, doc - vh);
    sky.style.height = Math.ceil(reduce.matches ? doc : vh + travel * speed() + 2) + 'px';
    sky.classList.toggle('is-static', reduce.matches);
  }
  var ticking = false;
  function move() {
    ticking = false;
    if (reduce.matches) { sky.style.transform = 'none'; return; }
    sky.style.transform = 'translate3d(0,' + (-window.scrollY * speed()).toFixed(1) + 'px,0)';
  }
  function both() { size(); move(); }

  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(move); } }, { passive: true });
  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(both, 150); });
  window.addEventListener('load', both);
  if (reduce.addEventListener) reduce.addEventListener('change', both);
  // the page grows as components render: keep the sky as tall as the travel needs
  if ('ResizeObserver' in window) {
    var start = function () { if (document.body) new ResizeObserver(function () { size(); }).observe(document.body); };
    if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', both); else both();
  setTimeout(both, 1200);
})();
