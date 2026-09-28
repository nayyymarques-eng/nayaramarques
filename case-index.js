// Case index: on wide screens, the numbered section rails (<h2 data-rail>"01 — Title") become one
// sticky list of the whole process. The current section is marked as the reader scrolls; each item
// jumps to its section. Below 861px the page keeps its own sticky rails. Colours are tokens only.
(function () {
  var WIDE = '(min-width: 861px)';
  var TOP = 80; // the index sticks just under the nav

  var css = [
    '[data-case-index]{position:absolute;z-index:6;pointer-events:none}',
    // the index is plain text on the sky: no card, no rules. Its numbers line up with the nav's star.
    '[data-case-index] ol{position:sticky;top:' + TOP + 'px;list-style:none;margin:var(--space-fluid-xl) 0 0;padding:0;max-width:240px;pointer-events:auto}',
    '[data-case-index] a{display:grid;grid-template-columns:22px 1fr;gap:var(--space-xs);padding:var(--space-xs) 0;',
    'font-size:var(--font-size-eyebrow);font-weight:600;letter-spacing:var(--tracking-eyebrow);line-height:var(--leading-label);text-transform:uppercase;',
    'color:var(--text-muted);text-decoration:none;transition:color .25s ease}',
    '[data-case-index] a:hover{color:var(--text-muted)}',
    '[data-case-index] a[aria-current="step"]{color:var(--text-strong)}',
    '[data-case-index] a[aria-current="step"] span:first-child{color:var(--accent)}',
    '[data-case-index] a.done{color:var(--text-muted)}',
    // the rail text is replaced by the index; it stays in the page (transparent) so screen readers keep the heading
    // the section title in the body is the largest heading in a case, at every width: number in the accent, name in ink
    '[data-case-eyebrow]{display:block;margin:0 0 10px;font-size:clamp(18px,1.5vw,20px);font-weight:600;line-height:1.3;letter-spacing:-0.01em;color:var(--text-heading)}',
    '[data-case-eyebrow] span{color:var(--accent);margin-right:0.45em}',
    '@media ' + WIDE + '{html.has-case-index [data-rail-indexed]{color:transparent!important;user-select:none}',
    // the body sits on the details band's 4-column grid: index in column 1, content and dividers from column 2
    'html.has-case-index [data-case-band]{--case-gap:clamp(20px,3vw,36px);column-gap:var(--case-gap)!important;',
    '--case-col:calc((100% - 3 * var(--case-gap)) / 4);--case-divider-left:calc(var(--case-col) + var(--case-gap))}',
    'html.has-case-index [data-case-band]>[data-rail-indexed]{flex:0 0 var(--case-col)!important}}',
    // card titles (DecisionCard reads --size-lead, hand-built cards --font-size-xl-lead) step down to the item title:
    // 16px, 600, below the sub-section (17) and the section title (20). Section 20/600 > sub-section 17/600 > item 16/600.
    '[data-case-band]{--size-lead:var(--font-size-md);--font-size-xl-lead:var(--font-size-md);--leading-lead:var(--leading-heading);--track-lead:var(--tracking-lead)}',
    '[data-case-band] [data-surface="card"]{--weight-medium:var(--weight-semibold)}',
    // sub-section spacing (LAY-09): the block a sub-section starts with, the rule that opens it, the block before it.
    // Wide: 56px above, the rule 20px over the heading. Phones (round 6, SEC-04): the rule has the same space above and
    // below it, --space-fluid-xl, less than a section's --section-y; the space above is measured and set in equalize().
    '[data-sub-prev]{margin-bottom:0!important}',
    '[data-sub-top]{margin-top:56px!important;padding-top:0!important}',
    '[data-sub-rule]{padding-top:20px!important;border-top-color:var(--border-strong)!important}',
    // never two lines at one boundary (LAY-04): a list's closing rule right above a sub-section's rule gives way
    '[data-sub-drop="bottom"]{border-bottom-color:transparent!important}[data-sub-drop="empty"]{display:none!important}',
    '@media not all and ' + WIDE + '{[data-sub-top]{margin-top:var(--space-fluid-xl)!important}[data-sub-rule]{padding-top:var(--space-fluid-xl)!important}}',
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
    // (at least 1.5x more space above than below; here 56px above a sub-section, 12px below; phones: equalize() below)
    function ruleTop(e) { var q = getComputedStyle(e); return parseFloat(q.borderTopWidth) > 0 && q.borderTopStyle !== 'none'; }
    function ruleBottom(e) { var q = getComputedStyle(e); return parseFloat(q.borderBottomWidth) > 0 && q.borderBottomStyle !== 'none'; }
    // the rule a block closes with: its own bottom border, or its last descendant's, or an empty ruled div at its end
    function closingRule(e) {
      while (e) {
        if (ruleBottom(e)) return [e, 'bottom'];
        var last = e.lastElementChild;
        while (last && /^(SCRIPT|STYLE|TEMPLATE)$/.test(last.tagName)) last = last.previousElementSibling;
        if (!last || last.matches('x-import,[data-surface],.card,.figure,figure')) return null;
        if (!last.children.length && !last.textContent.trim() && ruleTop(last)) return [last, 'empty'];
        e = last;
      }
      return null;
    }
    var subs = [];
    bands.forEach(function (band) {
      [].forEach.call(band.querySelectorAll('h3'), function (h) {
        if (h.closest('x-import, .card, .link-card, .figure, [data-surface], [style*="var(--surface-card)"], [style*="var(--white)"]')) return; // card titles keep the card's spacing (the system bundle still writes --white)
        h.style.marginBottom = '12px';
        // the block that starts with this heading: climb while the heading is its first child
        // (stop below the content column, and at a block that draws its own rule; a heading that draws its own rule climbs to its wrapper)
        var top = h;
        while (top.parentElement && top.parentElement.parentElement !== band &&
               top.parentElement.firstElementChild === top && (top === h || !ruleTop(top))) top = top.parentElement;
        var rule = ruleTop(top) ? top : (ruleTop(h) ? h : null);
        var prev = top.previousElementSibling;
        var first = !prev || prev.hasAttribute('data-case-eyebrow') || prev.hasAttribute('data-sec-intro');
        if (!first) {
          prev.setAttribute('data-sub-prev', '');
          top.setAttribute('data-sub-top', '');
          if (rule) rule.setAttribute('data-sub-rule', ''); // sub-section rules are the middle weight
        }
        subs.push({ h: h, rule: rule, top: top, prev: prev, first: first });
      });
    });
    // Phones (round 6): every sub-section rule has the same space above and below it (--space-fluid-xl). Below is set
    // in CSS; above depends on what the block before ends with (a figure, a list, a card's padding), so it is measured:
    // from the last content box (text, a surface, an image) to the rule. Wide screens keep LAY-09's 56px.
    var probe = document.createElement('div');
    probe.style.cssText = 'position:absolute;visibility:hidden;height:var(--space-fluid-xl)';
    function contentBottom(root, limit) {
      var b = -Infinity;
      if ([].some.call(root.childNodes, function (n) { return n.nodeType === 3 && n.textContent.trim(); })) return root.getBoundingClientRect().bottom;
      (function walk(e) {
        [].forEach.call(e.children, function (c) {
          if (/^(SCRIPT|STYLE|TEMPLATE)$/.test(c.tagName) || c.getAttribute('data-sub-drop') === 'empty') return;
          var q = getComputedStyle(c);
          if (q.display === 'none' || q.visibility === 'hidden' || q.position === 'absolute' || q.position === 'fixed') return;
          var r = c.getBoundingClientRect();
          if (r.height < 1 || r.top >= limit) return;
          var solid = c.matches('x-import,img,svg,picture,video,canvas,.figure,figure,.card,[data-surface],.note,.well') ||
            !/rgba\(0, 0, 0, 0\)|transparent/.test(q.backgroundColor) || (q.boxShadow && q.boxShadow !== 'none') ||
            [].some.call(c.childNodes, function (n) { return n.nodeType === 3 && n.textContent.trim(); });
          if (solid) b = Math.max(b, r.bottom); else walk(c);
          if (!solid && ruleBottom(c) && !c.hasAttribute('data-sub-drop')) b = Math.max(b, r.bottom); // a bordered row is content too
        });
      })(root);
      return b;
    }
    var touched = [];
    // what each sub-section's line is. Read again on every pass: the system components (ListRow, DecisionCard) render late.
    function lines() {
      subs.forEach(function (x) {
        x.line = x.rule; x.bottom = false;
        if (x.first) return;
        var c = closingRule(x.prev);
        if (x.rule) { if (c && !c[0].hasAttribute('data-sub-drop')) c[0].setAttribute('data-sub-drop', c[1]); } // never two lines at one boundary (LAY-04)
        // no rule of its own: the line above it is the block before's closing rule (a card group's, a list's last row);
        // that line is the divider, with the same space on both sides on phones
        else if (c && c[1] === 'bottom') { x.line = c[0]; x.bottom = true; }
      });
    }
    function equalize() {
      lines();
      if (matchMedia(WIDE).matches) {
        touched.forEach(function (t) { t[0].style.removeProperty(t[1]); });
        touched = [];
        return;
      }
      document.body.appendChild(probe);
      var S = probe.getBoundingClientRect().height;
      probe.remove();
      function set(el, prop, v) { el.style.setProperty(prop, v, 'important'); if (!touched.some(function (t) { return t[0] === el && t[1] === prop; })) touched.push([el, prop]); }
      // the block above holds its own margins, so the space above a rule is one number we can set
      var ss = subs.filter(function (x) { return x.line; });
      ss.forEach(function (x) {
        if (!x.prev || x.bottom) return;
        set(x.prev, 'margin-bottom', '0px');
        if (getComputedStyle(x.prev).display === 'block') set(x.prev, 'display', 'flow-root');
      });
      // below a rule: the heading sits --space-fluid-xl under it (the rule's own padding; a first sub-section too)
      ss.forEach(function (x) {
        if (x.bottom) { set(x.top, 'margin-top', S + 'px'); set(x.top, 'padding-top', '0px'); }
        else if (x.first) { set(x.line, 'padding-top', S + 'px'); if (x.line !== x.top) set(x.top, 'padding-top', '0px'); }
      });
      // a list that closes with a rule right above the next section's divider: one line at that boundary (LAY-04);
      // the last row gives its bottom padding to the section (SEC-04)
      bands.forEach(function (band, i) {
        if (!i) return;
        var col = bands[i - 1].querySelector(':scope > [data-rail-indexed] + *') || bands[i - 1].lastElementChild;
        var cl = col && closingRule(col);
        if (cl && cl[1] === 'bottom') { set(cl[0], 'border-bottom-color', 'transparent'); set(cl[0], 'padding-bottom', '0px'); }
      });
      for (var pass = 0; pass < 3; pass++) {
        ss.forEach(function (x) {
          var r = x.line.getBoundingClientRect();
          var line = x.bottom ? r.bottom - parseFloat(getComputedStyle(x.line).borderBottomWidth) : r.top;
          var above = x.bottom ? contentBottom(x.line, line) : (x.prev ? contentBottom(x.prev, line) : -Infinity);
          if (above === -Infinity) return;
          var d = S - (line - above);
          if (Math.abs(d) < 0.5) return;
          var el = x.bottom ? x.line : x.top, prop = x.bottom ? 'padding-bottom' : 'margin-top';
          var cur = parseFloat(getComputedStyle(el)[x.bottom ? 'paddingBottom' : 'marginTop']) || 0;
          var v = x.bottom ? Math.max(0, cur + d) : cur + d;
          set(el, prop, v + 'px');
        });
      }
    }
    host.insertBefore(nav, host.firstChild);
    document.documentElement.classList.add('has-case-index');


    // span from the first numbered section to the end of the last one
    function place() {
      var h = host.getBoundingClientRect();
      var first = bands[0].getBoundingClientRect();
      var last = bands[bands.length - 1].getBoundingClientRect();
      var r = rails[0].getBoundingClientRect();
      nav.style.left = (r.left - h.left) + 'px';
      nav.style.width = Math.min(r.width, 240) + 'px'; // a narrow list; the body column keeps its place
      // the card's top lines up with the first section title
      ol.style.marginTop = getComputedStyle(bands[0]).paddingTop;
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
    addEventListener('resize', function () { equalize(); place(); update(); });
    var eq = false;
    if (window.ResizeObserver) new ResizeObserver(function () { place(); if (eq) return; eq = true; requestAnimationFrame(function () { eq = false; equalize(); }); }).observe(host);
    equalize();
    place();
    update();
    setTimeout(function () { equalize(); place(); }, 1200); // components and images that render late
  }

  if (document.readyState === 'complete') setTimeout(init, 0);
  else addEventListener('load', function () { setTimeout(init, 300); });
})();
