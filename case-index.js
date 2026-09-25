// Case index: on wide screens, the numbered section rails (<h2 data-rail>"01 — Title") become one
// sticky list of the whole process. The current section is marked as the reader scrolls; each item
// jumps to its section. Below 861px the page keeps its own sticky rails. Colours are tokens only.
(function () {
  var WIDE = '(min-width: 861px)';
  var TOP = 80; // matches the rails' sticky offset under the nav

  var css = [
    '[data-case-index]{position:absolute;z-index:6;pointer-events:none}',
    '[data-case-index] ol{position:sticky;top:' + TOP + 'px;list-style:none;margin:clamp(28px,4vw,56px) 0 0;padding:var(--space-sm) var(--space-md);background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-sm);pointer-events:auto}',
    '[data-case-index] a{display:grid;grid-template-columns:22px 1fr;gap:6px;padding:7px 0 7px var(--space-sm);border-left:1px solid var(--border);',
    'font-size:var(--font-size-2xs);font-weight:600;letter-spacing:var(--tracking-eyebrow);line-height:var(--leading-label);text-transform:uppercase;',
    'color:var(--text-subtle);text-decoration:none;transition:color .25s ease,border-color .25s ease}',
    '[data-case-index] a:hover{color:var(--text-muted)}',
    '[data-case-index] a[aria-current="step"]{color:var(--text-strong);border-left:2px solid var(--accent);padding-left:11px}',
    '[data-case-index] a[aria-current="step"] span:first-child{color:var(--accent)}',
    '[data-case-index] a.done{color:var(--text-muted)}',
    // the rail text is replaced by the index; it stays in the page (transparent) so screen readers keep the heading
    // the section title in the body is the largest heading in a case, at every width: number in the accent, name in ink
    '[data-case-eyebrow]{display:block;margin:0 0 var(--space-md);font-size:var(--font-size-xl);font-weight:500;line-height:1.22;letter-spacing:var(--tracking-heading);color:var(--text-strong)}',
    '[data-case-eyebrow] span{color:var(--accent);margin-right:0.45em}',
    '@media ' + WIDE + '{html.has-case-index [data-rail-indexed]{color:transparent!important;user-select:none}',
    // the body sits on the details band's 4-column grid: index in column 1, content and dividers from column 2
    'html.has-case-index [data-case-band]{--case-gap:clamp(20px,3vw,36px);column-gap:var(--case-gap)!important;',
    '--case-col:calc((100% - 3 * var(--case-gap)) / 4);--case-divider-left:calc(var(--case-col) + var(--case-gap))}',
    'html.has-case-index [data-case-band]>[data-rail-indexed]{flex:0 0 var(--case-col)!important}}',
    // card titles (DecisionCard reads --size-lead, hand-built cards --font-size-xl-lead) step down below the section title
    '[data-case-band]{--size-lead:var(--font-size-lg);--font-size-xl-lead:var(--font-size-lg);--leading-lead:1.3;--track-lead:var(--tracking-lead)}',
    // narrow screens: no index column, but the section title stays the largest heading;
    // the old small rail is hidden visually and kept for screen readers
    '@media not all and ' + WIDE + '{[data-case-index]{display:none!important}'
      + 'html.has-case-index [data-rail-indexed]{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0 0 0 0);white-space:nowrap;border:0!important;padding:0!important;margin:0!important}}'
  ].join('');

  function init() {
    if (document.querySelector('[data-case-index]')) return; // the page runtime can run scripts twice
    var rails = [].filter.call(document.querySelectorAll('h2[data-rail]'), function (h) {
      return /^\s*\d{2}\s/.test(h.textContent);
    });
    if (rails.length < 3) return;

    var bands = rails.map(function (h) { return h.parentElement; });
    // nearest element that contains every section
    var host = bands[0].parentElement;
    while (host && !bands.every(function (b) { return host.contains(b); })) host = host.parentElement;
    if (!host) return;

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    var nav = document.createElement('nav');
    nav.setAttribute('data-case-index', '');
    nav.setAttribute('aria-label', 'Case sections');
    var ol = document.createElement('ol');
    nav.appendChild(ol);

    var links = rails.map(function (h, i) {
      var m = h.textContent.trim().match(/^(\d{2})\s*[—–-]?\s*(.*)$/);
      var id = h.id || 'section-' + m[1];
      h.id = id;
      h.setAttribute('data-rail-indexed', '');
      bands[i].setAttribute('data-case-band', '');
      // the section's eyebrow, shown above its content on wide screens
      var col = h.nextElementSibling;
      if (col && !col.querySelector('[data-case-eyebrow]')) {
        var eb = document.createElement('p');
        eb.setAttribute('data-case-eyebrow', '');
        eb.setAttribute('aria-hidden', 'true');
        eb.innerHTML = '<span></span>';
        eb.firstChild.textContent = m[1];
        eb.appendChild(document.createTextNode(m[2]));
        col.insertBefore(eb, col.firstChild);
      }
      bands[i].style.scrollMarginTop = (TOP - 20) + 'px';
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + id;
      a.innerHTML = '<span></span><span></span>';
      a.firstChild.textContent = m[1];
      a.lastChild.textContent = m[2];
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
        bands[i].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        history.replaceState(null, '', '#' + id);
      });
      li.appendChild(a);
      ol.appendChild(li);
      return a;
    });

    // spacing: a heading sits close to what it introduces and far from what came before
    // (at least 1.5x more space above than below; here 56px above a sub-section, 12px below)
    bands.forEach(function (band) {
      [].forEach.call(band.querySelectorAll('h3'), function (h) {
        if (h.closest('x-import, [style*="var(--surface-card)"], [style*="var(--white)"]')) return; // card titles keep the card's spacing (the system bundle still writes --white)
        h.style.marginBottom = '12px';
        // the block that starts with this heading: climb while the heading is its first child
        var top = h;
        // (stop below the content column, and at a block that draws its own rule)
        while (top.parentElement && top.parentElement.parentElement !== band &&
               top.parentElement.firstElementChild === top &&
               parseFloat(getComputedStyle(top).borderTopWidth) === 0) top = top.parentElement;
        var prev = top.previousElementSibling;
        if (!prev || prev.hasAttribute('data-case-eyebrow')) return; // first thing under the section title
        prev.style.marginBottom = '0px';
        top.style.marginTop = '56px';
        var ruled = parseFloat(getComputedStyle(top).borderTopWidth) > 0;
        top.style.paddingTop = ruled ? '20px' : '0px';
        if (ruled) top.style.borderTopColor = 'var(--border-strong)'; // sub-section rules are the middle weight
      });
    });
    host.insertBefore(nav, host.firstChild);
    document.documentElement.classList.add('has-case-index');

    // span from the first numbered section to the end of the last one
    function place() {
      var h = host.getBoundingClientRect();
      var first = bands[0].getBoundingClientRect();
      var last = bands[bands.length - 1].getBoundingClientRect();
      var r = rails[0].getBoundingClientRect();
      nav.style.left = (r.left - h.left) + 'px';
      nav.style.width = r.width + 'px';
      nav.style.top = (first.top - h.top) + 'px';
      nav.style.height = (last.bottom - first.top) + 'px';
    }

    var current = -1;
    function update() {
      var line = Math.min(innerHeight * 0.4, 320);
      var idx = 0;
      for (var i = 0; i < bands.length; i++) {
        if (bands[i].getBoundingClientRect().top <= line) idx = i;
      }
      if (idx === current) return;
      current = idx;
      links.forEach(function (a, i) {
        if (i === idx) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current');
        a.classList.toggle('done', i < idx);
      });
    }

    var queued = false;
    function onScroll() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; update(); });
    }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', function () { place(); update(); });
    if (window.ResizeObserver) new ResizeObserver(place).observe(host);
    place();
    update();
  }

  if (document.readyState === 'complete') setTimeout(init, 0);
  else addEventListener('load', function () { setTimeout(init, 300); });
})();
