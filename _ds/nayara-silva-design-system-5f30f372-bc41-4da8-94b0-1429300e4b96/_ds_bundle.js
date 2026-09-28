/* @ds-bundle: {"format":4,"namespace":"NayaraSilvaDesignSystem_5f30f3","components":[{"name":"DecisionCard","sourcePath":"components/case/DecisionCard.jsx"},{"name":"ListRow","sourcePath":"components/case/ListRow.jsx"},{"name":"NextCase","sourcePath":"components/case/NextCase.jsx"}],"sourceHashes":{"components/case/DecisionCard.jsx":"0f80c3726f55","components/case/ListRow.jsx":"e5d60160b0cd","components/case/NextCase.jsx":"0371d5236dae"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NayaraSilvaDesignSystem_5f30f3 = window.NayaraSilvaDesignSystem_5f30f3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/case/DecisionCard.jsx
try { (() => {
/* A decision with a real cost. The Gained / Traded footer is mandatory —
   without the trade-off the card is just a feature list. */
function DecisionCard({
  eyebrow,
  title,
  children,
  gained,
  traded,
  style,
  ...rest
}) {
  return React.createElement('div', {
    style: {
      border: '1px solid var(--line)',
      background: 'var(--white)',
      padding: 'var(--card-p)',
      ...style
    },
    ...rest
  }, React.createElement('div', {
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--ink-6)',
      marginBottom: 'var(--space-5)'
    }
  }, eyebrow), React.createElement('h3', {
    style: {
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--size-lead)',
      lineHeight: 'var(--leading-lead)',
      letterSpacing: 'var(--track-lead)',
      margin: '0 0 var(--space-6)'
    }
  }, title), React.createElement('p', {
    style: {
      margin: gained || traded ? '0 0 18px' : 0,
      fontSize: 'var(--size-body)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--ink-2)',
      textWrap: 'pretty'
    }
  }, children), gained || traded ? React.createElement('div', {
    style: {
      borderTop: '1px solid var(--line-4)',
      paddingTop: 'var(--space-7)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))',
      gap: 'var(--space-8)'
    }
  }, React.createElement(Half, {
    label: 'Gained',
    tone: 'var(--gained)',
    body: gained
  }), React.createElement(Half, {
    label: 'Traded away',
    tone: 'var(--traded)',
    body: traded
  })) : null);
}
function Half({
  label,
  tone,
  body
}) {
  return React.createElement('div', null, React.createElement('div', {
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: tone,
      marginBottom: 7
    }
  }, label), React.createElement('p', {
    style: {
      margin: 0,
      fontSize: 'var(--size-small)',
      lineHeight: 'var(--leading-small)',
      color: 'var(--ink-4)'
    }
  }, body));
}
Object.assign(__ds_scope, { DecisionCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/case/DecisionCard.jsx", error: String((e && e.message) || e) }); }

// components/case/ListRow.jsx
try { (() => {
/* Lettered or numbered row: a rust marker, a bold lead-in, and one sentence.
   Rows share a top hairline; the last one closes with a bottom hairline. */
function ListRow({
  marker,
  title,
  children,
  last = false,
  markerTone = 'var(--rust)',
  measure,
  style,
  ...rest
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      gap: 'var(--space-7)',
      padding: '18px 0',
      borderTop: '1px solid var(--line)',
      borderBottom: last ? '1px solid var(--line)' : 'none',
      maxWidth: measure,
      ...style
    },
    ...rest
  }, React.createElement('span', {
    style: {
      fontSize: 'var(--size-label)',
      color: markerTone,
      flexShrink: 0,
      paddingTop: 3
    }
  }, marker), React.createElement('p', {
    style: {
      margin: 0,
      fontSize: 'var(--size-body)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--ink-2)',
      textWrap: 'pretty'
    }
  }, title ? React.createElement('strong', {
    style: {
      color: 'var(--ink)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, title + ' ') : null, children));
}
Object.assign(__ds_scope, { ListRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/case/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/case/NextCase.jsx
try { (() => {
/* Closes a case study. Same hover as a work row: rust text plus a 10px
   padding-left nudge on a slow ease. Opens with an ink rule. */
function NextCase({
  title,
  href = '#',
  tag,
  label = 'Next case study',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('section', {
    style: {
      borderTop: '1px solid var(--line)',
      padding: 'var(--section-y) 0 clamp(56px,8vw,96px)',
      ...style
    },
    ...rest
  }, React.createElement('div', {
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--ink-6)',
      marginBottom: 'var(--space-6)'
    }
  }, label), React.createElement('a', {
    href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'clamp(12px,3vw,32px)',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      textDecoration: 'none',
      color: hover ? 'var(--rust)' : 'inherit',
      padding: 'clamp(14px,2vw,20px) 0',
      paddingLeft: hover ? 10 : 0,
      borderTop: '1px solid var(--line-ink)',
      borderBottom: '1px solid var(--line)',
      transition: 'color var(--dur-hover-slow) ease, padding-left .35s var(--ease)'
    }
  }, React.createElement('h2', {
    style: {
      fontSize: 'var(--size-title)',
      fontWeight: 'var(--weight-medium)',
      lineHeight: 'var(--leading-title)',
      letterSpacing: 'var(--track-title)',
      margin: 0
    }
  }, title), tag ? React.createElement('span', {
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--ink-6)',
      flexShrink: 0
    }
  }, tag) : null));
}
Object.assign(__ds_scope, { NextCase });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/case/NextCase.jsx", error: String((e && e.message) || e) }); }

__ds_ns.DecisionCard = __ds_scope.DecisionCard;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.NextCase = __ds_scope.NextCase;

})();
