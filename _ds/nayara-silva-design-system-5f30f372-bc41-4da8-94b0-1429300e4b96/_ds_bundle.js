/* @ds-bundle: {"format":4,"namespace":"NayaraSilvaDesignSystem_5f30f3","components":[{"name":"Arrow","sourcePath":"components/case/Arrow.jsx"},{"name":"CarouselSlide","sourcePath":"components/case/CarouselSlide.jsx"},{"name":"CaseHero","sourcePath":"components/case/CaseHero.jsx"},{"name":"CaseSection","sourcePath":"components/case/CaseSection.jsx"},{"name":"DecisionCard","sourcePath":"components/case/DecisionCard.jsx"},{"name":"FlowChain","sourcePath":"components/case/FlowChain.jsx"},{"name":"FlowStep","sourcePath":"components/case/FlowStep.jsx"},{"name":"InfoCard","sourcePath":"components/case/InfoCard.jsx"},{"name":"ListRow","sourcePath":"components/case/ListRow.jsx"},{"name":"MediaCarousel","sourcePath":"components/case/MediaCarousel.jsx"},{"name":"MetaBar","sourcePath":"components/case/MetaBar.jsx"},{"name":"NextCase","sourcePath":"components/case/NextCase.jsx"},{"name":"ProcessStep","sourcePath":"components/case/ProcessStep.jsx"},{"name":"ScreenFigure","sourcePath":"components/case/ScreenFigure.jsx"},{"name":"StatTile","sourcePath":"components/case/StatTile.jsx"},{"name":"Terminal","sourcePath":"components/case/Terminal.jsx"},{"name":"TerminalLine","sourcePath":"components/case/Terminal.jsx"},{"name":"Band","sourcePath":"components/foundation/Band.jsx"},{"name":"ButtonLink","sourcePath":"components/foundation/ButtonLink.jsx"},{"name":"Eyebrow","sourcePath":"components/foundation/Eyebrow.jsx"},{"name":"HairlineGrid","sourcePath":"components/foundation/HairlineGrid.jsx"},{"name":"StatementLine","sourcePath":"components/foundation/StatementLine.jsx"},{"name":"StatusPill","sourcePath":"components/foundation/StatusPill.jsx"},{"name":"TagChip","sourcePath":"components/foundation/TagChip.jsx"},{"name":"ContactCard","sourcePath":"components/index/ContactCard.jsx"},{"name":"ModelCard","sourcePath":"components/index/ModelCard.jsx"},{"name":"OfferCard","sourcePath":"components/index/OfferCard.jsx"},{"name":"OfferItem","sourcePath":"components/index/OfferCard.jsx"},{"name":"PostRow","sourcePath":"components/index/PostRow.jsx"},{"name":"SpecTable","sourcePath":"components/index/SpecTable.jsx"},{"name":"TimelineRow","sourcePath":"components/index/TimelineRow.jsx"},{"name":"WorkCard","sourcePath":"components/index/WorkCard.jsx"},{"name":"WorkRow","sourcePath":"components/index/WorkRow.jsx"},{"name":"CtaBanner","sourcePath":"components/site/CtaBanner.jsx"},{"name":"Foot","sourcePath":"components/site/Foot.jsx"},{"name":"Nav","sourcePath":"components/site/Nav.jsx"},{"name":"PageHero","sourcePath":"components/site/PageHero.jsx"},{"name":"Prose","sourcePath":"components/site/Prose.jsx"},{"name":"SectionHeader","sourcePath":"components/site/SectionHeader.jsx"}],"sourceHashes":{"assets/image-slot.js":"fff26d081c8d","components/case/Arrow.jsx":"7bb070a84329","components/case/CarouselSlide.jsx":"0b63622aa110","components/case/CaseHero.jsx":"88e7b336521e","components/case/CaseSection.jsx":"c2a0b87b1631","components/case/DecisionCard.jsx":"0f80c3726f55","components/case/FlowChain.jsx":"5b3bfb43c105","components/case/FlowStep.jsx":"fb9fbc17de49","components/case/InfoCard.jsx":"69def34c0274","components/case/ListRow.jsx":"e5d60160b0cd","components/case/MediaCarousel.jsx":"f5581d248544","components/case/MetaBar.jsx":"d72fd39e6338","components/case/NextCase.jsx":"0371d5236dae","components/case/ProcessStep.jsx":"543bd9ac1e8f","components/case/ScreenFigure.jsx":"f81ae08aabf8","components/case/StatTile.jsx":"cf9089c7339d","components/case/Terminal.jsx":"3a0a1c5bef17","components/foundation/Band.jsx":"c98904564a0b","components/foundation/ButtonLink.jsx":"281421965dd3","components/foundation/Eyebrow.jsx":"3c5a41d3f89f","components/foundation/HairlineGrid.jsx":"16bef749779d","components/foundation/StatementLine.jsx":"49fb7bde3de5","components/foundation/StatusPill.jsx":"833461178752","components/foundation/TagChip.jsx":"025b362ab7d6","components/index/ContactCard.jsx":"267a95d60c32","components/index/ModelCard.jsx":"cf1e389d526a","components/index/OfferCard.jsx":"0acfe8d8f580","components/index/PostRow.jsx":"409225f6a4cc","components/index/SpecTable.jsx":"be4046c1c5ac","components/index/TimelineRow.jsx":"c3e45751775c","components/index/WorkCard.jsx":"db70b4b3d0de","components/index/WorkRow.jsx":"de744f3269ff","components/site/CtaBanner.jsx":"f2ff4ac8c8d4","components/site/Foot.jsx":"225e2f707d11","components/site/Nav.jsx":"0098a485f83f","components/site/PageHero.jsx":"f62b79d2bb19","components/site/Prose.jsx":"aba1d0850c39","components/site/SectionHeader.jsx":"c601d9823b48","ui_kits/portfolio/App.jsx":"76e7f745ecf2","ui_kits/portfolio/CaseScreen.jsx":"384757e24502","ui_kits/portfolio/ContactScreen.jsx":"38f11aa4adff","ui_kits/portfolio/HomeScreen.jsx":"96818775b490","ui_kits/portfolio/ServiceScreen.jsx":"8ae87bdbb424","ui_kits/portfolio/WorkScreen.jsx":"983f300d49e0"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NayaraSilvaDesignSystem_5f30f3 = window.NayaraSilvaDesignSystem_5f30f3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever a design needs an image.
 * You control the slot's shape; it sizes to its container by default. When the search_stock_photos tool
 * is available, prefill the slot by default — write the photo's URL into
 * src (with credit/credit-href); the user can still fill or replace it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The sidecar is a SIBLING of the HTML file that uses this component: the
 * read is a document-relative fetch, and the host resolves the bridge's
 * sidecar writes into the previewed file's directory to match (same
 * contract as design_canvas.jsx). Pages in the same directory share one
 * sidecar; keep slot ids distinct across them.
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          Initial framing baseline: cover | contain.   (default 'cover')
 *                cover starts the image filling the frame (overflow cropped);
 *                contain starts it fully visible (letterboxed). Either way the
 *                user can always pan/scale from there — double-click, or the
 *                Edit control, enters reframe mode (drag to move, scroll or
 *                corner-handles to scale; Escape / click-out commits). The
 *                crop persists alongside the image in the sidecar.
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. Prefill it with a real
 *                photo via search_stock_photos when that tool is available
 *                (set credit/credit-href from the result). A user drop
 *                overrides it; clearing the drop reveals src again.
 *   credit       Attribution text shown as a small overlay at the
 *                bottom-left of the filled slot. REQUIRED whenever src
 *                points at any Unsplash host (images.unsplash.com,
 *                plus.unsplash.com, …): an Unsplash src with no credit
 *                renders an error tile INSTEAD of the photo (Unsplash
 *                terms forbid showing their photos unattributed). Use the
 *                exact form 'Photo by {photographer name} on Unsplash' —
 *                the overlay then links the name to credit-href and
 *                'Unsplash' to the Unsplash homepage, and links back to
 *                unsplash.com automatically get the required utm referral
 *                params appended at render time. The credit belongs to
 *                the src image, so it only shows while src is what's
 *                displayed — a user-dropped image hides it.
 *   credit-href  Link for the photographer's name in the credit overlay
 *                (their Unsplash profile URL from the stock-photo search
 *                results). http(s) URLs only — anything else renders the
 *                name as plain text.
 *
 * Sizing: the slot fills its container by default (width/height 100%).
 * Put it in a sized wrapper — absolutely positioned, a grid cell, a fixed
 * frame — and it takes exactly that box. When the parent's height is
 * indefinite (ordinary flow), it falls back to full width at a 3:2 aspect
 * ratio instead of collapsing. In a shrink-to-fit parent (a float,
 * width:max-content, an unsized absolute wrapper), percentages have
 * nothing to resolve against — size the slot or its wrapper explicitly
 * there. For a fixed-size slot, set
 * width/height on the element itself (inline style), which overrides the
 * default. When
 * layering content above a slot (full-bleed layouts), make the overlay
 * click-through — pointer-events: none on scrims/text plates, re-enabled
 * on interactive children — so the slot's hover controls stay reachable.
 * Keep the slot's bottom-left corner visually clear as well: the credit
 * overlay renders there, and a dark fade or text plate covering it hides
 * the attribution Unsplash's terms require — end the fade above that
 * corner, or keep it nearly transparent where the credit sits.
 *
 * Usage:
 *   <div style="position:relative;width:100%;height:100%">      <!-- full-bleed: -->
 *     <image-slot id="bg" shape="rect"></image-slot>            <!-- fills the wrapper -->
 *   </div>
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';

  // Unsplash terms require visible attribution wherever their photos
  // display, and every link back to unsplash.com must carry utm referral
  // params. Two render-time rules enforce that here:
  //  - an Unsplash-src slot with NO credit attribute renders an error
  //    tile INSTEAD of the photo (an uncredited Unsplash photo on screen
  //    is itself the terms violation, so it never renders bare);
  //  - rendered credit links pointing at unsplash.com get the referral
  //    params appended when absent (credit-href values live in page
  //    content that can't be edited after the fact).
  // Keep the utm_source value in sync with UTM_SOURCE in
  // platform/web-agent/unsplash.ts — this file is a project-local
  // artifact and cannot import it (equality is pinned by tests).
  const UNSPLASH_HOMEPAGE_HREF = 'https://unsplash.com/?utm_source=claude_design&utm_medium=referral';
  // Host rule mirrors the hotlink validator that admits Unsplash srcs into
  // pages in the first place (cdn$ in unsplash.ts: apex or any subdomain)
  // — Unsplash+ results serve from plus.unsplash.com, not just images.*,
  // and an admitted-but-uncredited photo must error whatever unsplash
  // host it rides on.
  // Trailing-dot FQDNs (images.unsplash.com.) are the same host to the
  // browser but would miss the regex — strip one dot so the check fails
  // CLOSED (unrecognized-but-real Unsplash srcs must error, not render).
  const isUnsplashHost = u => {
    try {
      return /(^|\.)unsplash\.com$/.test(new URL(u, document.baseURI).hostname.replace(/\.$/, ''));
    } catch {
      return false;
    }
  };
  // Render-time referral normalization for links back to Unsplash:
  // appends utm_source/utm_medium when absent, preserves every existing
  // query param, never overwrites an existing utm_source, and passes
  // non-Unsplash URLs through untouched. Input is an ABSOLUTE validated
  // http(s) URL (the credit render funnel resolves + validates first).
  const withReferral = href => {
    try {
      const u = new URL(href);
      if (!/(^|\.)unsplash\.com$/.test(u.hostname.replace(/\.$/, ''))) {
        return href;
      }
      if (!u.searchParams.has('utm_source')) {
        u.searchParams.set('utm_source', 'claude_design');
      }
      if (!u.searchParams.has('utm_medium')) {
        u.searchParams.set('utm_medium', 'referral');
      }
      return u.toString();
    } catch (e) {
      return href;
    }
  };
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  // Unload-time flush: save()'s serialization defers a mid-RTT re-fire to a
  // .then that never runs in an unloading document, silently dropping a
  // pagehide commit. Post the current slots immediately instead — content
  // is a superset snapshot of any in-flight save's, the write is a
  // whole-file last-writer-wins replace, and postMessage FIFO delivers it
  // to the host after the in-flight one, so a backend-side reorder at
  // worst reproduces the dropped-commit outcome this flush improves on.
  // Guarded on the initial sidecar read: pre-hydration slots can miss
  // other slots' persisted entries, and flushing it would clobber them —
  // that narrow case stays best-effort (the in-memory merge in load()
  // cannot happen in an unloading document anyway).
  function flushNow() {
    if (!loaded) return;
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    try {
      Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {});
    } catch (e) {}
  }
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet =
  // Fill the container by default: slots are usually placed inside a
  // sized wrapper (a hero frame, a grid cell, an inset:0 layer) and are
  // expected to take that box — a fixed intrinsic size would render as
  // a small tile in the corner of a full-bleed wrapper instead.
  // aspect-ratio is the companion fallback that keeps a bare slot
  // visible when the parent's height is indefinite: height:100%
  // resolves to auto there, and the ratio then derives height from
  // width instead of letting the slot collapse to zero height.
  // Explicit width/height on the element override all of this.
  // color:inherit (not a fixed near-black): the placeholder chrome —
  // empty-state icon/caption (currentColor) and the dashed ring — must
  // read on dark decks too, and the slide's own text color is the one
  // color guaranteed to contrast with the slide background. The soft
  // look comes from opacity on those parts, not from a baked-in alpha.
  ':host{display:block;position:relative;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;' + '  width:100%;height:100%;aspect-ratio:3/2}' + '.empty .cap,.empty .sub{opacity:.75}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(127,127,127,.08)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  // popover=manual promotes the spill to the top layer on reframe, so it is
  // not clipped by any overflow:hidden / clip-path / scroll-container
  // ancestor (a plain z-index can't escape overflow clipping). UA popover
  // defaults (inset:0;margin:auto) are reset; _applyView sets viewport px.
  '.spill{position:fixed;margin:0;inset:auto;border:0;padding:0;background:transparent;' + '  overflow:visible;transform:translate(-50%,-50%);z-index:1;cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px}' + '.empty:hover .sub{opacity:1}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed currentColor;' + '  opacity:.35;transition:border-color .12s,opacity .12s}' + ':host([data-over]) .ring{border-color:#c96442;opacity:1}' + ':host([data-filled]) .ring{display:none}' +
  // Controls overlay INSIDE the frame, pinned to the top-right corner, so
  // a full-bleed slot in an overflow:hidden container still shows them
  // (the old below-mask placement got clipped). Credit sits bottom-left,
  // so top-right avoids collision. The blurred pill background keeps them
  // legible over the image.
  // The UA [popover] base rule styles the element in EVERY state (only
  // display:none is gated on :not(:popover-open), and the display:flex
  // below overrides that) — so the UA resets live HERE, like .spill's,
  // or the ordinary hover-state strip renders as a bordered Canvas box
  // centered by margin:auto. inset:auto precedes top/right (shorthand).
  '.ctl{position:absolute;inset:auto;top:8px;right:8px;margin:0;border:0;padding:0;' + '  background:transparent;overflow:visible;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' +
  // While reframing, the spill owns the top layer and would swallow every
  // click on the in-frame controls. Promoting .ctl into the top layer
  // ABOVE the spill (shown after it — later popovers stack higher) keeps
  // Edit-as-toggle and Replace clickable mid-reframe. _applyView pins it
  // to the frame's top-right in viewport px (translateX(-100%)
  // right-aligns against the computed left edge); inset:auto clears the
  // base rule's top/right so the inline left/top position it alone.
  '.ctl:popover-open{position:fixed;inset:auto;transform:translateX(-100%)}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}' +
  // Replacement in flight: after a src swap the browser keeps painting
  // the PREVIOUS image until the new one decodes, so a Replace would
  // flash the old photo and then pop. Hide the stale frame (visibility,
  // not display — _applyView geometry still applies) and spin until the
  // new image reports in (load/error clears data-swapping).
  ':host([data-swapping]) .frame img{visibility:hidden}' + '.loading{position:absolute;inset:0;display:none;align-items:center;' + '  justify-content:center;pointer-events:none}' + ':host([data-swapping]) .loading{display:flex}' + '.loading::after{content:"";width:22px;height:22px;border-radius:50%;' + '  border:2px solid rgba(127,127,127,.25);border-top-color:currentColor;' + '  animation:om-slot-spin .7s linear infinite}' + '@keyframes om-slot-spin{to{transform:rotate(360deg)}}' +
  // Reduced motion: the static two-tone ring still reads as "working".
  '@media (prefers-reduced-motion:reduce){.loading::after{animation:none}}' + '.credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);display:none;' + '  padding:3px 7px;border-radius:5px;background:rgba(0,0,0,.55);color:#fff;' + '  font:10px/1.2 system-ui,-apple-system,sans-serif;text-decoration:none;' + '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;backdrop-filter:blur(6px)}' +
  // The credit is a SPAN holding one or two <a>s (Unsplash's prescribed
  // form links the photographer AND Unsplash) — anchors style inline so
  // the overlay reads as one line of text.
  '.credit a{color:inherit;text-decoration:none}' + '.credit a:hover,.credit a:focus-visible{text-decoration:underline}' + ':host([data-filled][data-credit]) .credit{display:block}' +
  // Exports must ship JUST the image — no hover controls, no credit chip
  // (the host marks <html data-om-exporting> for the capture window; the
  // page-level hide script can't reach shadow DOM, this rule can).
  ':host-context([data-om-exporting]) .ctl,' + ':host-context([data-om-exporting]) .credit{display:none !important}' +
  // Print must ship just the image too: the hover-gated controls can be
  // mid-hover when print() fires, and the credit chip is screen chrome —
  // the same rule the capture window gets, keyed on print media instead
  // of the host's data-om-exporting mark (the print path sets no mark).
  '@media print{.ctl,.credit{display:none !important}}' +
  // No export-window mask rules here on purpose: the export capture
  // releases the replacement mask by REMOVING data-swapping (the
  // shadow-root pass in pages/export/shared.ts HIDE_EXPORT_CHROME_SCRIPT)
  // — attribute removal works in every engine (:host-context is
  // Chromium-only), is scoped by construction to slots actually
  // mid-swap, and hides the spinner through the same gate. A masked img
  // would otherwise be silently dropped from PPTX decks (the capture
  // walk skips visibility:hidden imgs).
  // Attribution error tile: REPLACES the photo when an Unsplash src has
  // no credit attribute — rendering the photo uncredited is the terms
  // violation, so the photo must not appear at all.
  // Calm and neutral on purpose (review feedback): the tile informs the
  // user; the fix instructions are machine-facing (usage docblock, tool
  // description, and the turn-end scan's bounce copy name the attributes
  // for the agent).
  '.attr-error{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  background:#f2f1ef;color:#6e6c66;user-select:none;' + '  font:13px/1.45 system-ui,-apple-system,sans-serif}' + '.attr-error svg{opacity:.55}' + '.attr-error .cap{max-width:92%;font-weight:500;letter-spacing:.01em}' + ':host([data-attribution-error]) .attr-error{display:flex}' + ':host([data-attribution-error]) .ring{display:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  const warnIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>' + '<path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'placeholder', 'src', 'id', 'credit', 'credit-href'];
    }

    /** Duplicate-slide hook (called by deck-stage, see its
     *  _remintDuplicateIds): copy this id's stored image, if any, under a
     *  freshly minted key and return that key — so a duplicated slide's
     *  slot keeps its dropped photo instead of reverting to the
     *  placeholder. 'isFree' is the caller's uniqueness check (document
     *  ids); candidates must ALSO be unused in the sidecar, which can
     *  hold keys from other pages sharing the project root. (An EMPTY
     *  slot on another page leaves no sidecar entry, so its id is not
     *  detectable here — a minted key can collide with it and that slot
     *  would show this photo. Same blast radius as two pages reusing an
     *  id by hand, which the shared sidecar already permits.) Returns null
     *  when no id could be minted (caller strips the id, today's
     *  behavior). */
    static cloneSlot(fromId, isFree) {
      if (typeof fromId !== 'string' || !fromId) return null;
      // Pre-hydration the store can't veto candidates or source the copy
      // — degrade to the strip (today's behavior) rather than mint
      // against keys we can't see yet. Any rendered (= droppable) slot
      // means load() has already settled.
      if (!loaded) return null;
      const stem = fromId.replace(/-\d+$/, '') || fromId;
      for (let n = 2; n < 100; n++) {
        const toId = stem + '-' + n;
        if (toId === fromId) continue;
        if (slots[toId] !== undefined) {
          // Reuse a key holding this exact value (bytes AND crop) if no
          // live element here owns it — a duplicate op the host refused
          // after minting leaves such a key behind, and reusing keeps
          // refused retries from accumulating one orphaned copy per
          // attempt. Full equality (not just bytes) so a byte-identical
          // key another PAGE owns with its own crop is stepped past, not
          // adopted or rewritten. (Entries without .u never match.)
          const prev = getSlot(toId);
          const cur = getSlot(fromId);
          if (!(prev && cur && prev.u && prev.u === cur.u && prev.s === cur.s && prev.x === cur.x && prev.y === cur.y && (typeof isFree !== 'function' || isFree(toId)))) continue;
          return toId;
        }
        if (typeof isFree === 'function' && !isFree(toId)) continue;
        const v = getSlot(fromId);
        if (v) setSlot(toId, Object.assign({}, v));
        return toId;
      }
      return null;
    }
    constructor() {
      super();
      // clonable: rail thumbnails deep-clone slides and carry this shadow
      // along; reuse an already-cloned root so upgrade-after-clone works.
      // (Deliberately NOT serializable — a getHTML consumer would embed
      // multi-MB sidecar data-URLs into serialized page HTML.)
      const root = this.shadowRoot || this.attachShadow({
        mode: 'open',
        clonable: true
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="attr-error" part="attribution-error">' + warnIcon + '    <div class="cap">This photo needs attribution</div></div>' + '  <div class="loading" part="loading"></div>' + '  <div class="ring" part="ring"></div>' + '</div>' +
      // Outside .frame, like .spill/.ctl — the frame's overflow:hidden +
      // border-radius/clip-path would cut the credit off on circle/pill/mask.
      // A SPAN, not an <a>: the prescribed Unsplash credit holds two links
      // (photographer + Unsplash), built per-render in _render().
      '<span class="credit" part="credit"></span>' + '<div class="spill" popover="manual" data-dc-edit-transparent>' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' +
      // data-dc-edit-transparent: the DC editor's edit-mode picker lets
      // clicks through for chrome marked with it (EDIT_TRANSPARENT_SEL)
      // — without it, Replace/Edit clicks in Edit mode are swallowed by
      // element selection and the controls look dead.
      '<div class="ctl" popover="manual" data-dc-edit-transparent><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="edit" title="Reframe image">Edit</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ctl = root.querySelector('.ctl');
      this._credit = root.querySelector('.credit');
      this._attrError = root.querySelector('.attr-error');
      // Credit clicks open the link, not browse/reframe.
      this._credit.addEventListener('click', e => e.stopPropagation());
      this._credit.addEventListener('dblclick', e => e.stopPropagation());
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      // Encode-in-flight marker (the owning _ingest generation): while set,
      // the same-src "nothing in flight" clear in _render must not fire —
      // the stored value still points at the OLD image until the encode
      // lands, so that clear would unmask the stale image mid-replace.
      this._swapGen = 0;
      // Render-owned swap in flight: set when _render assigns a new src,
      // cleared only by the img's own load/error (or the empty branch).
      // img.complete CANNOT stand in for this — setting src only QUEUES
      // the current-request swap (a microtask), so synchronously after an
      // assignment, complete still reports the OLD settled request. The
      // pick path does exactly that: the host sets src, credit, and
      // credit-href back-to-back in one task, and renders #2/#3 would
      // read the stale complete === true and drop the mask one render
      // after it was set.
      this._loadPending = false;
      // See _render's empty branch: a transient attribution-error wipe of a
      // showing image must make the follow-up render a replacement (spinner),
      // not a first fill (blank frame).
      this._hidShowing = false;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        // The hidden controls are opacity-0 but still tabbable — without
        // this gate a keyboard user could drive them on a read-only share
        // link (mirrors the dblclick handler's editable gate).
        if (!this.hasAttribute('data-editable')) return;
        if (act === 'replace') {
          this._exitReframe(true);
          // Host-owned picker (Unsplash modal; it also offers local import).
          this.dispatchEvent(new CustomEvent('image-slot:pick', {
            bubbles: true,
            composed: true,
            detail: {
              id: this.id || null
            }
          }));
        }
        if (act === 'edit') {
          if (!this._reframes()) return;
          if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      // load/error also release the replacement-in-flight mask (via the
      // single discipline in _releaseMask): the swap is only revealed once
      // the new image can actually paint (on error the frame shows its
      // background, same as a fresh slot with a broken src).
      this._img.addEventListener('load', () => {
        this._loadPending = false;
        this._releaseMask(true);
        this._applyView();
      });
      this._img.addEventListener('error', () => {
        this._loadPending = false;
        this._releaseMask(true);
      });
      // Gated only on editable — any filled slot can be repositioned/scaled,
      // regardless of fit. Share links (no writeFile) stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
          const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // The host may inject window.omelette.writeFile AFTER the first render;
      // re-render on hover so the editable-gated controls reliably appear.
      this.addEventListener('pointerenter', this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('pointerenter', this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      // commit=false: a disconnect is not a user intent — committing here
      // would persist whatever half-finished drag a React remount or DOM
      // splice happened to interrupt. Deliberate exits commit on their own
      // paths (Escape/click-out/toggle), and unloads commit via pagehide.
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._signalReframe(true);
      // Best-effort commit when the document unloads mid-reframe (a host
      // navigation racing the enter signal, a manual reload, tab close):
      // the sidecar write rides the host bridge, which outlives this
      // document, so the crop survives even though the mode dies with the
      // DOM. Held on the instance so _exitReframe detaches exactly what
      // was attached.
      this._pagehide = () => {
        this._exitReframe(true);
        flushNow();
      };
      window.addEventListener('pagehide', this._pagehide);
      // Promote spill to the top layer, then keep it pinned over the frame:
      // scroll/resize cover the common cases, and a per-frame rect check
      // catches layout shifts that fire neither (an image above finishing
      // load, streamed DOM pushing the slot down, an ancestor transform
      // change) so the overlay can't detach from the frame.
      try {
        this._spill.showPopover();
      } catch {}
      // After the spill, so the controls stack above it in the top layer.
      try {
        this._ctl.showPopover();
      } catch {}
      this._reposition = () => {
        if (this.hasAttribute('data-reframe')) this._applyView();
      };
      window.addEventListener('scroll', this._reposition, true);
      window.addEventListener('resize', this._reposition);
      this._lastRect = '';
      this._watch = () => {
        if (!this.hasAttribute('data-reframe')) return;
        const r = this.getBoundingClientRect();
        const key = r.left + ',' + r.top + ',' + r.width + ',' + r.height;
        if (key !== this._lastRect) {
          this._lastRect = key;
          this._applyView();
        }
        this._watchId = requestAnimationFrame(this._watch);
      };
      this._watchId = requestAnimationFrame(this._watch);
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (this._reposition) {
        window.removeEventListener('scroll', this._reposition, true);
        window.removeEventListener('resize', this._reposition);
        this._reposition = null;
      }
      if (this._watchId) {
        cancelAnimationFrame(this._watchId);
        this._watchId = 0;
      }
      if (this._pagehide) {
        window.removeEventListener('pagehide', this._pagehide);
        this._pagehide = null;
      }
      try {
        this._spill.hidePopover();
      } catch {}
      try {
        this._ctl.hidePopover();
      } catch {}
      this._ctl.style.left = '';
      this._ctl.style.top = '';
      if (commit) this._commitView();
      this._signalReframe(false);
    }

    // Reframe state lives only in this DOM until commit, invisible to the
    // host's dirty signals — announce enter/exit so the host can hold
    // auto-reloads for exactly the gesture (the guest bundle forwards
    // image-slot:reframe to the host as imageSlotReframe). Dispatched on
    // the element (composed, so it escapes shadow roots) while connected;
    // a disconnected exit (disconnectedCallback) falls back to document so
    // the host still hears it.
    _signalReframe(active) {
      const target = this.isConnected ? this : document;
      target.dispatchEvent(new CustomEvent('image-slot:reframe', {
        bubbles: true,
        composed: true,
        detail: {
          active: active,
          id: this.id || null
        }
      }));
    }

    // Public: host's "Import from computer" calls this to run local browse.
    openFilePicker() {
      this._exitReframe(true);
      this._input.click();
    }

    // A src write is a newer intent for this slot's content — the host
    // pick path (setImageSlotImage) or an agent edit — so it must win
    // over any encode still in flight from an earlier drop: left live,
    // that encode lands later, passes _ingest's gen guard, and its
    // setSlot silently overwrites the pick (the stored value shadows
    // src in _render). Bumping _gen kills the encode before its own
    // _swapGen clear runs, so clear the dead claim here too — otherwise
    // _releaseMask (gated on !_swapGen) never fires and the pick's
    // spinner is stranded. src ONLY: the pick sets credit/credit-href
    // in the same task, and clearing _swapGen on those would let the
    // same-src branch unmask the old image mid-encode.
    attributeChangedCallback(name, oldVal, newVal) {
      if (name === 'src' && oldVal !== newVal) {
        this._gen++;
        this._swapGen = 0;
      }
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      // Replacing a shown image: surface the swap through the encode too,
      // not just the decode — otherwise the old photo sits there with no
      // feedback while the canvas re-encode runs. An empty slot keeps its
      // placeholder (no spinner) until the encode lands, as before.
      // _swapGen guards the mask against re-renders DURING the encode
      // (pointerenter, ResizeObserver, another slot's store write): the
      // stored value still resolves to the old image there, so _render's
      // same-src clear would otherwise unmask it mid-replace.
      if (this.hasAttribute('data-filled')) {
        this.setAttribute('data-swapping', '');
        this._swapGen = gen;
      }
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        // Clear BEFORE setSlot: its synchronous re-render must see no
        // pending encode, so a byte-identical re-upload (same data URL, no
        // load event coming) still clears the mask via the complete branch.
        this._swapGen = 0;
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._swapGen = 0;
        // Reveal the kept old image — unless another replacement (a
        // remote pick's src swap) is still in flight, in which case the
        // mask stays until THAT image settles (its load/error releases).
        this._releaseMask();
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is available on any filled slot — the user can
    // always reposition/scale. `fit` only sets the initial baseline (see
    // _geom): contain starts fully-visible, cover starts frame-filling.
    _reframes() {
      return this.hasAttribute('data-filled');
    }

    // The single release discipline for the replacement-in-flight mask
    // (data-swapping). The mask comes off only when BOTH hold:
    //  - no encode is pending (_swapGen) — mid-encode the stored value
    //    still resolves to the old image, so any reveal paints it;
    //  - the frame img has settled on its current src — an unsettled src
    //    means some replacement is still in flight (e.g. a remote pick),
    //    whoever started it, and revealing would paint the previous
    //    frame. The load/error listeners pass settled=true (the event IS
    //    the settlement signal, per spec complete is true by then);
    //    other callers rely on the complete flag (covers loaded AND
    //    failed).
    // Every release path funnels through here EXCEPT _render's empty
    // branch (the img is being cleared — nothing will ever settle).
    _releaseMask(settled) {
      if (!this._swapGen && !this._loadPending && (settled || this._img.complete)) {
        this.removeAttribute('data-swapping');
      }
    }

    // Baseline geometry, shared by clamp/apply/resize. `base` is the scale at
    // view-scale s=1: cover = fill the frame (overflow on the looser axis),
    // contain = fit fully inside (letterboxed). Zooming a contain image past
    // s where it overflows naturally becomes a crop. Null until the img has
    // loaded (naturalWidth is 0 before that) or when the slot has no layout
    // box — ResizeObserver fires with a 0×0 rect under display:none, and
    // clamping against a degenerate 1×1 frame would silently pull the stored
    // pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
      const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
      return {
        iw,
        ih,
        fw,
        fh,
        base
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      // Top-layer controls: pin to the frame's top-right in viewport px
      // (the same 8px inset as the in-frame layout; unscaled — top-layer UI
      // reads as chrome, not page content). BEFORE the geometry branch:
      // placement needs only the frame rect, and a not-yet-loaded or broken
      // src must not leave the promoted strip floating unpositioned. Gated
      // on the popover actually being open: without the Popover API,
      // showPopover() threw (swallowed in _enterReframe), .ctl stays in
      // its in-frame absolute layout, and viewport-px coordinates would
      // shove it off-frame — and matches(':popover-open') itself throws
      // there (unknown pseudo-class), hence the try/catch.
      if (this.hasAttribute('data-reframe')) {
        let onTop = false;
        try {
          onTop = this._ctl.matches(':popover-open');
        } catch {}
        if (onTop) {
          const r = this.getBoundingClientRect();
          this._ctl.style.left = r.right - 8 + 'px';
          this._ctl.style.top = r.top + 8 + 'px';
        }
      }
      if (!g) {
        // Dimensions not known yet (before img load) — centered fit so there
        // is no flash of an unpositioned image before the geometry lands.
        const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = contain ? 'contain' : 'cover';
        return;
      }
      // Baseline (cover-fill or contain-fit) × view scale. Width/height and
      // left/top are all frame-% — depends only on the frame aspect ratio, so
      // a responsive resize keeps the same crop. The spill layer mirrors the
      // same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      if (this.hasAttribute('data-reframe')) {
        // Top-layer spill: position in viewport px over the frame. The top
        // layer escapes ancestor transforms entirely, so EVERY term must be
        // in viewport units: getBoundingClientRect gives the frame's scaled
        // origin AND size, and the rect/layout ratio rescales the ghost —
        // sizing from layout px alone renders it 1/scale too large under a
        // scaled deck slide. Inner ghost + handles stay box-relative.
        const r = this.getBoundingClientRect();
        const sx = g.fw ? r.width / g.fw : 1;
        const sy = g.fh ? r.height / g.fh : 1;
        this._spill.style.width = g.iw * k * sx + 'px';
        this._spill.style.height = g.ih * k * sy + 'px';
        this._spill.style.left = r.left + (50 + this._view.x) / 100 * r.width + 'px';
        this._spill.style.top = r.top + (50 + this._view.y) / 100 * r.height + 'px';
      }
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      // An Unsplash src with no credit attribute must NOT render — showing
      // the photo uncredited is the Unsplash-terms violation itself. The
      // error tile replaces the photo until the credit is written. A
      // user-dropped image is the user's own content and always renders.
      // Trimmed: credit is agent/user-editable content, and a whitespace-
      // only value must count as missing — otherwise it would suppress the
      // error tile AND render an empty credit box (no text, no links),
      // exactly the unattributed state this gate exists to prevent.
      const credit = (this.getAttribute('credit') || '').trim();
      const attrError = !!(!credit && !this._userUrl && srcAttr && isUnsplashHost(srcAttr));
      this.toggleAttribute('data-attribution-error', attrError);
      if (url && !attrError) {
        const prev = this._img.getAttribute('src');
        if (prev !== url) {
          // Replacing an already-shown image: mark the swap BEFORE setting
          // src so the stale frame is never revealed (see the data-swapping
          // stylesheet rules). First fill (prev empty) keeps the existing
          // placeholder-until-load behavior — no spinner. _hidShowing
          // covers the pick path's transient attribution-error wipe: prev
          // is gone, but an image WAS showing, so this is a replacement.
          if (prev || this._hidShowing) this.setAttribute('data-swapping', '');
          // Mark the swap BEFORE assigning src: complete keeps reporting
          // the old settled request until the browser's
          // update-the-image-data microtask runs, so same-task re-renders
          // (the pick path's credit/credit-href setAttributes) need this
          // flag, not complete, to know a load is in flight.
          this._loadPending = true;
          this._img.src = url;
          this._ghost.src = url;
        } else {
          // Same-src re-render — release if settled, so an ingest-set
          // spinner can't stick after a byte-identical re-upload (same
          // data URL, no further load event ever fires).
          this._releaseMask();
        }
        this._hidShowing = false;
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this.removeAttribute('data-swapping');
        // The src is being removed — no load/error will ever fire for it.
        this._loadPending = false;
        // A transient attribution-error wipe of a showing image happens on
        // the pick path: the host sets src one setAttribute before credit,
        // so render N hides the old image (attrError) and render N+1
        // restores a URL. Remember the wipe so that restore renders as a
        // replacement (spinner), not a first fill (blank frame).
        this._hidShowing = attrError && !!this._img.getAttribute('src');
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        // The error tile owns the blocked-photo state; .empty stays for
        // the genuinely-empty slot.
        this._empty.style.display = attrError ? 'none' : 'flex';
        this.removeAttribute('data-filled');
      }

      // Credit belongs to the author src, so a user drop hides it.
      // textContent + the http(s)-only funnel keep external strings inert.
      const showCredit = !!(url && credit && !this._userUrl && !attrError);
      this._credit.textContent = '';
      if (showCredit) {
        // Validate once (resolved against the document, http(s) only),
        // then append the terms-required utm referral params to links
        // that point back at unsplash.com.
        let href = '';
        const rawHref = this.getAttribute('credit-href') || '';
        if (rawHref) {
          try {
            const u = new URL(rawHref, document.baseURI);
            if (u.protocol === 'http:' || u.protocol === 'https:') {
              href = withReferral(u.href);
            }
          } catch {}
        }
        const mkLink = (text, linkHref) => {
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.setAttribute('href', linkHref);
          a.textContent = text;
          return a;
        };
        // Unsplash's prescribed credit is TWO links — the photographer's
        // name to their profile (credit-href) and 'Unsplash' to the
        // homepage. Render that split whenever the text has the canonical
        // shape; other text keeps the legacy single-link rendering.
        const m = /^Photo by (.+) on Unsplash$/.exec(credit);
        if (m) {
          this._credit.appendChild(document.createTextNode('Photo by '));
          this._credit.appendChild(href ? mkLink(m[1], href) : document.createTextNode(m[1]));
          this._credit.appendChild(document.createTextNode(' on '));
          this._credit.appendChild(mkLink('Unsplash', UNSPLASH_HOMEPAGE_HREF));
        } else if (href) {
          this._credit.appendChild(mkLink(credit, href));
        } else {
          this._credit.textContent = credit;
        }
      }
      this.toggleAttribute('data-credit', showCredit);
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/image-slot.js", error: String((e && e.message) || e) }); }

// components/case/Arrow.jsx
try { (() => {
/* The site's only icon: a Unicode glyph in --ink-7. No SVG icon set exists in
   the source — do not introduce one. */
function Arrow({
  dir = 'right',
  style,
  ...rest
}) {
  const g = {
    right: '\u2192',
    left: '\u2190',
    down: '\u2193',
    up: '\u2191'
  };
  return React.createElement('span', {
    'aria-hidden': 'true',
    style: {
      fontSize: 'var(--size-small)',
      color: 'var(--ink-7)',
      ...style
    },
    ...rest
  }, g[dir]);
}
Object.assign(__ds_scope, { Arrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/case/Arrow.jsx", error: String((e && e.message) || e) }); }

// components/case/CarouselSlide.jsx
try { (() => {
/* One entry in a MediaCarousel: the analysis line with its position counter
   above a fixed-height image well. Media is an <image-slot> placeholder — the
   source ships no bundled imagery. */
function CarouselSlide({
  count,
  name,
  children,
  slotId,
  src,
  style,
  ...rest
}) {
  return React.createElement('div', {
    style: {
      flex: '0 0 100%',
      minWidth: 0,
      scrollSnapAlign: 'start',
      ...style
    },
    ...rest
  }, React.createElement('p', {
    style: {
      margin: '0 0 var(--space-6)',
      paddingRight: 72,
      maxWidth: 'var(--measure-caption)',
      fontSize: 'var(--size-small)',
      lineHeight: 'var(--leading-small)',
      color: 'var(--ink-4)'
    }
  }, count ? React.createElement('span', {
    style: {
      color: 'var(--ink-6)',
      marginRight: 'var(--space-4)'
    }
  }, count) : null, name ? React.createElement('strong', {
    style: {
      color: 'var(--ink)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, name) : null, name ? ' \u2014 ' : null, children), React.createElement('div', {
    style: {
      background: '#c3c3c3',
      border: '1px solid #b9b9b9',
      height: 'clamp(280px,32vw,420px)'
    }
  }, React.createElement('image-slot', {
    id: slotId,
    src,
    shape: 'rect',
    fit: 'contain',
    style: {
      display: 'block',
      width: '100%',
      height: '100%'
    }
  })));
}
Object.assign(__ds_scope, { CarouselSlide });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/case/CarouselSlide.jsx", error: String((e && e.message) || e) }); }

// components/case/CaseHero.jsx
try { (() => {
/* Case study masthead: back link, rust eyebrow (client · city · year),
   the display h1 at a 17ch cap, and a 20px deck at 58ch. */
function CaseHero({
  meta,
  title,
  deck,
  backHref = 'Work.dc.html',
  backLabel = '\u2190 All work',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('section', {
    style: {
      paddingTop: 'var(--case-hero-y)',
      paddingBottom: 'clamp(36px,5vw,56px)',
      ...style
    },
    ...rest
  }, React.createElement('a', {
    href: backHref,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontSize: 'var(--size-label)',
      textDecoration: 'none',
      color: hover ? 'var(--ink)' : 'var(--ink-4)',
      display: 'inline-block',
      marginBottom: 'var(--stack-lg)'
    }
  }, backLabel), React.createElement('div', {
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--rust)',
      marginBottom: 'var(--space-9)'
    }
  }, meta), React.createElement('h1', {
    style: {
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--size-display)',
      lineHeight: 'var(--leading-display)',
      letterSpacing: 'var(--track-display)',
      margin: '0 0 var(--stack-sm)',
      maxWidth: '17ch',
      textWrap: 'balance'
    }
  }, title), React.createElement('p', {
    style: {
      margin: 0,
      maxWidth: 'var(--measure-deck)',
      fontSize: 'var(--size-body-lg)',
      lineHeight: 'var(--leading-body-lg)',
      color: 'var(--ink-2)',
      textWrap: 'pretty'
    }
  }, deck));
}
Object.assign(__ds_scope, { CaseHero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/case/CaseHero.jsx", error: String((e && e.message) || e) }); }

// components/case/CaseSection.jsx
try { (() => {
/* The frame every numbered section sits in: a sticky 200px eyebrow label, a
   content column that flexes from 460px, and a full-bleed band. Alternate
   'paper' and 'band' down the page so each topic is a visible colour change. */
function CaseSection({
  label,
  band = 'paper',
  children,
  measure,
  padBottom,
  style,
  ...rest
}) {
  const bg = band === 'band' ? 'var(--paper-2)' : 'var(--paper)';
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--gap-rail)',
      alignItems: 'flex-start',
      background: bg,
      boxShadow: '0 0 0 100vmax ' + bg,
      clipPath: 'inset(0 -100vmax)',
      paddingTop: 'var(--section-y)',
      paddingBottom: padBottom || 'var(--section-y)',
      ...style
    },
    ...rest
  }, React.createElement('h2', {
    style: {
      flex: '0 0 var(--rail)',
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--ink-4)',
      margin: 0,
      position: 'sticky',
      top: 'var(--rail-sticky-top)'
    }
  }, label), React.createElement('div', {
    style: {
      flex: '1 1 var(--content-flex)',
      minWidth: 0,
      maxWidth: measure
    }
  }, children));
}
Object.assign(__ds_scope, { CaseSection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/case/CaseSection.jsx", error: String((e && e.message) || e) }); }

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

// components/case/FlowChain.jsx
try { (() => {
/* A row of flow chips. label sets an eyebrow above; branch={true} indents the
   row behind a 2px left rail (the yes/no legs under a decision chip). */
function FlowChain({
  label,
  branch = false,
  children,
  style,
  ...rest
}) {
  const row = React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-3)',
      alignItems: 'center'
    }
  }, children);
  if (branch) {
    return React.createElement('div', {
      style: {
        display: 'grid',
        gap: 'var(--space-6)',
        marginTop: 'var(--space-7)',
        marginLeft: 'var(--space-5)',
        paddingLeft: '22px',
        borderLeft: '2px solid var(--line)',
        ...style
      },
      ...rest
    }, row);
  }
  return React.createElement('div', {
    style,
    ...rest
  }, label ? React.createElement('div', {
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--ink-6)',
      marginBottom: 'var(--space-5)'
    }
  }, label) : null, row);
}
Object.assign(__ds_scope, { FlowChain });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/case/FlowChain.jsx", error: String((e && e.message) || e) }); }

// components/case/FlowStep.jsx
try { (() => {
/* A chip in a user-flow chain.
   default  — hairline border on paper
   key      — same box, ink border, weight 600 (the screen the case is about)
   decision — solid ink, paper text (a branch point)
   note     — no box, plain grey text (an aside like "rejoins Select the package") */
function FlowStep({
  label,
  variant = 'default',
  style,
  ...rest
}) {
  if (variant === 'note') {
    return React.createElement('span', {
      style: {
        fontSize: 'var(--size-small)',
        color: 'var(--ink-4)',
        marginLeft: 4,
        ...style
      },
      ...rest
    }, label);
  }
  const skins = {
    default: {
      border: '1px solid var(--line)',
      background: 'var(--paper)',
      color: 'var(--ink-2)'
    },
    key: {
      border: '1px solid var(--line-ink)',
      background: 'var(--paper)',
      color: 'var(--ink-2)',
      fontWeight: 'var(--weight-semibold)'
    },
    decision: {
      border: '1px solid var(--line-ink)',
      background: 'var(--ink)',
      color: 'var(--paper)'
    }
  };
  return React.createElement('span', {
    style: {
      padding: '10px 14px',
      fontSize: 'var(--size-small)',
      lineHeight: 'var(--leading-small)',
      whiteSpace: 'nowrap',
      ...skins[variant],
      ...style
    },
    ...rest
  }, label);
}
Object.assign(__ds_scope, { FlowStep });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/case/FlowStep.jsx", error: String((e && e.message) || e) }); }

// components/case/InfoCard.jsx
try { (() => {
/* A named idea: 14px/600 title over 14px grey prose. Sits in a HairlineGrid.
   Optionally prefixed by a rust step number (the pipeline variant). */
function InfoCard({
  title,
  step,
  children,
  on = 'band',
  style,
  ...rest
}) {
  return React.createElement('div', {
    style: {
      background: on === 'band' ? 'var(--white)' : 'var(--paper)',
      padding: '20px 18px',
      ...style
    },
    ...rest
  }, step ? React.createElement('div', {
    style: {
      fontSize: 'var(--size-label)',
      color: 'var(--rust)',
      marginBottom: 'var(--space-4)'
    }
  }, step) : null, React.createElement('div', {
    style: {
      fontSize: 'var(--size-small)',
      fontWeight: 'var(--weight-semibold)',
      marginBottom: step ? 'var(--space-2)' : 'var(--space-3)'
    }
  }, title), React.createElement('p', {
    style: {
      margin: 0,
      fontSize: 'var(--size-small)',
      lineHeight: 'var(--leading-small)',
      color: 'var(--ink-4)'
    }
  }, children));
}
Object.assign(__ds_scope, { InfoCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/case/InfoCard.jsx", error: String((e && e.message) || e) }); }

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

// components/case/MediaCarousel.jsx
try { (() => {
/* Scroll-snap track with two 26px arrow buttons pinned top-right, over a top
   hairline. Arrows tween scrollLeft; the track also reports manual scrolling. */
function MediaCarousel({
  children,
  style,
  ...rest
}) {
  const track = React.useRef(null);
  const [i, setI] = React.useState(0);
  const n = React.Children.count(children);
  const go = to => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(n - 1, to));
    const from = el.scrollLeft,
      target = next * el.clientWidth,
      t0 = Date.now();
    const tick = () => {
      const k = Math.min(1, (Date.now() - t0) / 380);
      el.scrollLeft = from + (target - from) * (1 - Math.pow(1 - k, 3));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    setI(next);
  };
  return React.createElement('div', {
    style: {
      minWidth: 0,
      position: 'relative',
      borderTop: '1px solid var(--line)',
      paddingTop: 'var(--space-7)',
      ...style
    },
    ...rest
  }, React.createElement('div', {
    style: {
      position: 'absolute',
      top: 14,
      right: 0,
      display: 'flex',
      gap: 'var(--space-2)',
      zIndex: 2
    }
  }, React.createElement(NavBtn, {
    label: 'Previous',
    glyph: '\u2190',
    onClick: () => go(i - 1)
  }), React.createElement(NavBtn, {
    label: 'Next',
    glyph: '\u2192',
    onClick: () => go(i + 1)
  })), React.createElement('div', {
    ref: track,
    onScroll: e => {
      const el = e.currentTarget;
      const k = Math.round(el.scrollLeft / Math.max(1, el.clientWidth));
      if (k !== i) setI(k);
    },
    style: {
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden',
      scrollSnapType: 'x mandatory',
      WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'none'
    }
  }, children));
}
function NavBtn({
  label,
  glyph,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('button', {
    type: 'button',
    'aria-label': label,
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 26,
      height: 26,
      padding: 0,
      border: '1px solid ' + (hover ? 'var(--line-ink)' : 'var(--line)'),
      background: 'var(--white)',
      color: hover ? 'var(--rust)' : 'var(--ink)',
      fontSize: 12,
      lineHeight: 1,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'border-color var(--dur-hover) ease, color var(--dur-hover) ease'
    }
  }, glyph);
}
Object.assign(__ds_scope, { MediaCarousel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/case/MediaCarousel.jsx", error: String((e && e.message) || e) }); }

// components/case/MetaBar.jsx
try { (() => {
/* Full-bleed grey band under the case hero: Role / Team / Context /
   Contribution, each an eyebrow over a 14px sentence. */
function MetaBar({
  items = [],
  style,
  ...rest
}) {
  return React.createElement('section', {
    style: {
      background: 'var(--paper-2)',
      boxShadow: '0 0 0 100vmax var(--paper-2)',
      clipPath: 'inset(0 -100vmax)',
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      padding: 'var(--band-y) 0',
      marginBottom: 'clamp(48px,7vw,88px)',
      ...style
    },
    ...rest
  }, React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
      gap: 'clamp(20px,3vw,36px)'
    }
  }, items.map((it, i) => React.createElement('div', {
    key: i
  }, React.createElement('div', {
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--ink-6)',
      marginBottom: 'var(--space-4)'
    }
  }, it.label), React.createElement('p', {
    style: {
      margin: 0,
      fontSize: 'var(--size-small)',
      lineHeight: 'var(--leading-small)',
      color: it.muted ? 'var(--ink-4)' : 'var(--ink)'
    }
  }, it.value)))));
}
Object.assign(__ds_scope, { MetaBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/case/MetaBar.jsx", error: String((e && e.message) || e) }); }

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

// components/case/ProcessStep.jsx
try { (() => {
/* A numbered stage inside a section: a 1px INK rule, an ink eyebrow, a 14px
   intro, then whatever the stage produced. */
function ProcessStep({
  step,
  title,
  intro,
  children,
  last = false,
  style,
  ...rest
}) {
  return React.createElement('div', {
    style: {
      marginBottom: last ? 0 : 'var(--stack-xl)',
      ...style
    },
    ...rest
  }, React.createElement('div', {
    style: {
      borderTop: '1px solid var(--line-ink)',
      paddingTop: 18,
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--ink)',
      marginBottom: 'var(--space-2)'
    }
  }, step + ' \u2014 ' + title), intro ? React.createElement('p', {
    style: {
      margin: '0 0 18px',
      maxWidth: 'var(--measure-caption)',
      fontSize: 'var(--size-small)',
      lineHeight: 'var(--leading-small)',
      color: 'var(--ink-4)'
    }
  }, intro) : null, children);
}
Object.assign(__ds_scope, { ProcessStep });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/case/ProcessStep.jsx", error: String((e && e.message) || e) }); }

// components/case/ScreenFigure.jsx
try { (() => {
/* A product screenshot with its label and a "Why" note. Phone screens use
   aspect-ratio 375/812; a cropped screen uses 375/700. */
function ScreenFigure({
  label,
  ratio = '375/812',
  slotId,
  src,
  placeholder,
  children,
  why,
  style,
  ...rest
}) {
  return React.createElement('div', {
    style: {
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      ...style
    },
    ...rest
  }, React.createElement('div', {
    style: {
      aspectRatio: ratio,
      position: 'relative',
      border: '1px solid var(--line)',
      background: 'var(--white)'
    }
  }, React.createElement('image-slot', {
    id: slotId,
    src,
    placeholder,
    shape: 'rect',
    fit: 'contain',
    style: {
      width: '100%',
      height: '100%'
    }
  })), React.createElement('div', {
    style: {
      fontSize: 'var(--size-label)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-label)',
      textTransform: 'uppercase',
      color: 'var(--ink)',
      margin: '14px 0 var(--space-3)'
    }
  }, label), React.createElement('p', {
    style: {
      margin: '0 0 var(--space-3)',
      fontSize: 'var(--size-small)',
      lineHeight: 'var(--leading-small)',
      color: 'var(--ink-4)'
    }
  }, children), why ? React.createElement('p', {
    style: {
      margin: 0,
      fontSize: 'var(--size-small)',
      lineHeight: 'var(--leading-small)',
      color: 'var(--ink-4)'
    }
  }, React.createElement('strong', {
    style: {
      color: 'var(--ink)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, 'Why'), ' \u2014 ', why) : null);
}
Object.assign(__ds_scope, { ScreenFigure });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/case/ScreenFigure.jsx", error: String((e && e.message) || e) }); }

// components/case/StatTile.jsx
try { (() => {
/* One measured number over its caption. Only for numbers that carry
   information — if the value is 1 or 3, write a sentence instead. */
function StatTile({
  value,
  children,
  on = 'band',
  style,
  ...rest
}) {
  return React.createElement('div', {
    style: {
      background: on === 'band' ? 'var(--white)' : 'var(--paper)',
      padding: '22px 18px',
      ...style
    },
    ...rest
  }, React.createElement('div', {
    style: {
      fontSize: 'var(--size-title)',
      lineHeight: 'var(--leading-title)',
      letterSpacing: 'var(--track-title)',
      marginBottom: 'var(--space-4)'
    }
  }, value), React.createElement('p', {
    style: {
      margin: 0,
      fontSize: 'var(--size-small)',
      lineHeight: 'var(--leading-small)',
      color: 'var(--ink-4)'
    }
  }, children));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/case/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/case/Terminal.jsx
try { (() => {
/* A CI / shell transcript. The only dark surface besides the closing CTA, and
   the only place the mono stack and the pass/warn/fail colours appear. */
function Terminal({
  title = 'ci · system-check',
  children,
  style,
  ...rest
}) {
  return React.createElement('div', {
    style: {
      overflow: 'hidden',
      border: '1px solid var(--term-border)',
      ...style
    },
    ...rest
  }, React.createElement('div', {
    style: {
      background: 'var(--term-chrome)',
      padding: '11px 16px',
      display: 'flex',
      gap: 'var(--space-4)',
      alignItems: 'center',
      borderBottom: '1px solid var(--term-border-2)'
    }
  }, React.createElement('span', {
    style: {
      width: 9,
      height: 9,
      borderRadius: 'var(--radius)',
      background: 'var(--term-dot)',
      display: 'block'
    }
  }), React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--size-label)',
      color: 'var(--term-dim)'
    }
  }, title)), React.createElement('div', {
    style: {
      background: 'var(--term-bg)',
      padding: '20px 18px',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--size-label)',
      lineHeight: 1.4,
      color: 'var(--term-fg)',
      overflowX: 'auto'
    }
  }, children));
}

/* One output row. state colours the leading keyword. */
function TerminalLine({
  state,
  children,
  dim = false,
  style,
  ...rest
}) {
  const tone = {
    pass: 'var(--state-pass)',
    warn: 'var(--state-warn)',
    fail: 'var(--state-fail)',
    prompt: 'var(--term-dim)'
  }[state];
  return React.createElement('div', {
    style: {
      color: dim ? 'var(--term-dim)' : undefined,
      ...style
    },
    ...rest
  }, state ? React.createElement('span', {
    style: {
      color: tone
    }
  }, state === 'prompt' ? '$' : state) : null, state ? '\u00a0\u00a0' : null, children);
}
Object.assign(__ds_scope, { Terminal, TerminalLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/case/Terminal.jsx", error: String((e && e.message) || e) }); }

// components/foundation/Band.jsx
try { (() => {
/* Full-bleed colour band inside a centred container. The 100vmax box-shadow
   paints the background past the container edge; the clip-path stops it
   growing the document. This is the site's only use of box-shadow. */
function Band({
  children,
  tone = 'band',
  bleed = true,
  style,
  ...rest
}) {
  const bg = tone === 'paper' ? 'var(--paper)' : tone === 'inverse' ? 'var(--ink)' : 'var(--paper-2)';
  return React.createElement('div', {
    style: {
      background: bg,
      color: tone === 'inverse' ? 'var(--on-ink)' : 'var(--ink)',
      boxShadow: bleed ? '0 0 0 100vmax ' + bg : 'none',
      clipPath: bleed ? 'inset(0 -100vmax)' : 'none',
      ...style
    },
    ...rest
  }, children);
}
Object.assign(__ds_scope, { Band });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/foundation/Band.jsx", error: String((e && e.message) || e) }); }

// components/foundation/ButtonLink.jsx
try { (() => {
/* Every call to action on the site is an <a>. 14px 24px, 2px radius,
   11px/600/0.12em uppercase label, optional trailing arrow.
   solid    — ink fill, paper text; hovers to rust
   outline  — --line-3 border; hovers to ink border on --paper-3
   inverse  — paper fill on the dark band; hovers to rust
   quiet    — no box, uppercase label with arrow (the "What's included" row) */
function ButtonLink({
  children,
  href = '#',
  variant = 'solid',
  arrow = false,
  as = 'a',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: arrow ? '12px' : 0,
    padding: variant === 'quiet' ? 0 : '14px 24px',
    borderRadius: variant === 'quiet' ? 0 : 'var(--radius)',
    textDecoration: 'none',
    fontSize: 'var(--size-label)',
    fontWeight: 'var(--weight-semibold)',
    letterSpacing: 'var(--track-label)',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    border: '1px solid transparent',
    cursor: 'pointer',
    transition: 'background var(--dur-hover) ease, border-color var(--dur-hover) ease, color var(--dur-hover) ease'
  };
  const skins = {
    solid: {
      background: hover ? 'var(--rust-hover)' : 'var(--ink)',
      color: hover ? '#fff' : 'var(--paper)'
    },
    outline: {
      borderColor: hover ? 'var(--ink)' : 'var(--line-3)',
      background: hover ? 'var(--paper-3)' : 'transparent',
      color: 'var(--ink)'
    },
    inverse: {
      background: hover ? 'var(--rust-hover)' : 'var(--paper)',
      color: hover ? '#fff' : 'var(--ink)'
    },
    quiet: {
      background: 'transparent',
      color: hover ? 'var(--ink)' : 'var(--ink-4)'
    }
  };
  return React.createElement(as, {
    href: as === 'a' ? href : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...skins[variant],
      ...style
    },
    ...rest
  }, children, arrow ? React.createElement('span', {
    key: 'a',
    'aria-hidden': 'true'
  }, '\u2192') : null);
}
Object.assign(__ds_scope, { ButtonLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/foundation/ButtonLink.jsx", error: String((e && e.message) || e) }); }

// components/foundation/Eyebrow.jsx
try { (() => {
/* 10px / 600 / 0.14em uppercase. The only label style on the site.
   tone: 'meta' (default grey), 'accent' (rust — case study hero + flow yes/no),
   'ink' (black — opens a process step), 'gained', 'traded', 'inverse'. */
const TONE = {
  meta: 'var(--ink-6)',
  accent: 'var(--rust)',
  ink: 'var(--ink)',
  gained: 'var(--gained)',
  traded: 'var(--traded)',
  inverse: 'var(--on-ink)',
  rail: 'var(--ink-4)'
};
function Eyebrow({
  children,
  tone = 'meta',
  as = 'div',
  style,
  ...rest
}) {
  return React.createElement(as, {
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      lineHeight: 1.4,
      color: TONE[tone] || TONE.meta,
      margin: 0,
      ...style
    },
    ...rest
  }, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/foundation/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/foundation/HairlineGrid.jsx
try { (() => {
/* Joined tiles. The grid gap IS the border: a 1px gap over a --line
   background, with a 1px border around the whole block. Children set their
   own background (--white on a grey band, --paper on a white one). */
function HairlineGrid({
  children,
  min = 170,
  tone = 'line',
  style,
  ...rest
}) {
  return React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(' + min + 'px,1fr))',
      gap: '1px',
      background: tone === 'line2' ? 'var(--line-2)' : 'var(--line)',
      border: '1px solid ' + (tone === 'line2' ? 'var(--line-2)' : 'var(--line)'),
      overflow: 'hidden',
      ...style
    },
    ...rest
  }, children);
}
Object.assign(__ds_scope, { HairlineGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/foundation/HairlineGrid.jsx", error: String((e && e.message) || e) }); }

// components/foundation/StatementLine.jsx
try { (() => {
/* The 30px statement. One per section at most — it carries the point of view.
   size 'statement' = clamp(20,2.6vw,30); 'lead' = clamp(19,2.2vw,26) for the
   hero standfirst and card titles; 'mega' = the dark CTA headline. */
const SIZES = {
  statement: {
    fontSize: 'var(--size-statement)',
    lineHeight: 'var(--leading-statement)',
    letterSpacing: 'var(--track-statement)',
    fontWeight: 'var(--weight-medium)'
  },
  lead: {
    fontSize: 'var(--size-lead)',
    lineHeight: 'var(--leading-lead)',
    letterSpacing: 'var(--track-lead)',
    fontWeight: 'var(--weight-medium)'
  },
  bodyLg: {
    fontSize: 'var(--size-body-lg)',
    lineHeight: 'var(--leading-body-lg)',
    letterSpacing: 'var(--track-body-lg)',
    fontWeight: 'var(--weight-medium)'
  },
  mega: {
    fontSize: 'var(--size-mega)',
    lineHeight: 'var(--leading-mega)',
    letterSpacing: 'var(--track-mega)',
    fontWeight: 'var(--weight-medium)'
  },
  title: {
    fontSize: 'var(--size-title)',
    lineHeight: 'var(--leading-title)',
    letterSpacing: 'var(--track-title)',
    fontWeight: 'var(--weight-medium)'
  }
};
function StatementLine({
  children,
  size = 'statement',
  as = 'p',
  measure = 'var(--measure-prose)',
  balance = false,
  inverse = false,
  style,
  ...rest
}) {
  return React.createElement(as, {
    style: {
      margin: 0,
      maxWidth: measure,
      color: inverse ? 'var(--on-ink)' : 'var(--ink)',
      textWrap: balance ? 'balance' : 'pretty',
      ...SIZES[size],
      ...style
    },
    ...rest
  }, children);
}
Object.assign(__ds_scope, { StatementLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/foundation/StatementLine.jsx", error: String((e && e.message) || e) }); }

// components/foundation/StatusPill.jsx
try { (() => {
/* Availability pill: a square dot + uppercase text in a hairline outline.
   The dot is the only place --gained appears as a fill. */
function StatusPill({
  children,
  dotColor = 'var(--gained)',
  style,
  ...rest
}) {
  return React.createElement('div', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '9px',
      padding: '6px 13px 6px 10px',
      border: '1px solid var(--line-3)',
      borderRadius: 'var(--radius)',
      fontSize: 'var(--size-label)',
      letterSpacing: 'var(--track-label)',
      textTransform: 'uppercase',
      color: 'var(--ink-4)',
      ...style
    },
    ...rest
  }, React.createElement('span', {
    style: {
      width: 7,
      height: 7,
      borderRadius: 'var(--radius)',
      background: dotColor,
      display: 'block',
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/foundation/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/foundation/TagChip.jsx
try { (() => {
/* Bordered uppercase chip. Work-index capability tags. */
function TagChip({
  children,
  style,
  ...rest
}) {
  return React.createElement('span', {
    style: {
      display: 'inline-block',
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      padding: '6px 11px',
      border: '1px solid var(--line)',
      color: 'var(--ink-6)',
      whiteSpace: 'nowrap',
      ...style
    },
    ...rest
  }, children);
}
Object.assign(__ds_scope, { TagChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/foundation/TagChip.jsx", error: String((e && e.message) || e) }); }

// components/index/ContactCard.jsx
try { (() => {
/* A contact channel: label over the value at lead size. White card, hairline
   border that goes ink on hover. */
function ContactCard({
  label,
  value,
  href = '#',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('a', {
    href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'block',
      padding: 'clamp(22px,3vw,30px)',
      border: '1px solid ' + (hover ? 'var(--line-ink)' : 'var(--line)'),
      background: 'var(--white)',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'border-color var(--dur-hover-slow) ease',
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
  }, label), React.createElement('div', {
    style: {
      fontSize: 'var(--size-lead)',
      letterSpacing: 'var(--track-lead)',
      lineHeight: 'var(--leading-lead)',
      wordBreak: 'break-word'
    }
  }, value));
}
Object.assign(__ds_scope, { ContactCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/index/ContactCard.jsx", error: String((e && e.message) || e) }); }

// components/index/ModelCard.jsx
try { (() => {
/* Engagement-model card. Cards are joined edge to edge inside a 1px-gap grid
   over --line-2, and hover to white. */
function ModelCard({
  eyebrow,
  title,
  children,
  href = '#',
  action = "What's included",
  surface = 'var(--paper)',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('a', {
    href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)',
      background: hover ? 'var(--white)' : surface,
      padding: 'var(--card-p-lg)',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'background var(--dur-hover-slow) ease',
      ...style
    },
    ...rest
  }, React.createElement('div', {
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--ink-6)'
    }
  }, eyebrow), React.createElement('h3', {
    style: {
      margin: 0,
      fontSize: 'var(--size-title)',
      fontWeight: 'var(--weight-medium)',
      lineHeight: 'var(--leading-title)',
      letterSpacing: 'var(--track-title)'
    }
  }, title), React.createElement('p', {
    style: {
      margin: 0,
      fontSize: 'var(--size-small)',
      lineHeight: 'var(--leading-small)',
      color: 'var(--ink-3)',
      textWrap: 'pretty'
    }
  }, children), React.createElement('div', {
    style: {
      marginTop: 'auto',
      paddingTop: 'var(--space-7)',
      borderTop: '1px solid var(--line)',
      fontSize: 'var(--size-label)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-label)',
      textTransform: 'uppercase',
      display: 'flex',
      gap: 'var(--space-4)',
      alignItems: 'center'
    }
  }, action, React.createElement('span', {
    'aria-hidden': 'true'
  }, '\u2192')));
}
Object.assign(__ds_scope, { ModelCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/index/ModelCard.jsx", error: String((e && e.message) || e) }); }

// components/index/OfferCard.jsx
try { (() => {
/* A priced block on an engagement page: cadence eyebrow, title with the rust
   price on the same baseline, then a numbered list of what's included. */
function OfferCard({
  cadence,
  title,
  price,
  priceSuffix,
  children,
  surface = 'var(--paper)',
  style,
  ...rest
}) {
  return React.createElement('div', {
    style: {
      background: surface,
      padding: 'var(--card-p-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-8)',
      ...style
    },
    ...rest
  }, React.createElement('div', {
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--ink-6)'
    }
  }, cadence), React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-5)',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, React.createElement('h3', {
    style: {
      margin: 0,
      fontSize: 'var(--size-title)',
      fontWeight: 'var(--weight-medium)',
      lineHeight: 'var(--leading-title)',
      letterSpacing: 'var(--track-title)'
    }
  }, title), price ? React.createElement('div', {
    style: {
      fontSize: 'var(--size-statement)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-statement)',
      color: 'var(--rust)'
    }
  }, price, priceSuffix ? React.createElement('span', {
    style: {
      fontSize: 'var(--size-small)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--ink-6)'
    }
  }, priceSuffix) : null) : null), React.createElement('div', {
    style: {
      display: 'grid',
      gap: 0
    }
  }, children));
}

/* A numbered included-item row. The first row's rule is ink. */
function OfferItem({
  number,
  children,
  first = false,
  last = false,
  style,
  ...rest
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      padding: '13px 0',
      borderTop: '1px solid ' + (first ? 'var(--line-ink)' : 'var(--line)'),
      borderBottom: last ? '1px solid var(--line)' : 'none',
      ...style
    },
    ...rest
  }, React.createElement('span', {
    style: {
      fontSize: 'var(--size-label)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--ink-6)',
      flexShrink: 0,
      paddingTop: 2
    }
  }, number), React.createElement('p', {
    style: {
      margin: 0,
      fontSize: 'var(--size-small)',
      lineHeight: 'var(--leading-small)',
      color: 'var(--ink-2)',
      textWrap: 'pretty'
    }
  }, children));
}
Object.assign(__ds_scope, { OfferCard, OfferItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/index/OfferCard.jsx", error: String((e && e.message) || e) }); }

// components/index/PostRow.jsx
try { (() => {
/* A writing entry: number in a fixed column, title, one-line dek. */
function PostRow({
  number,
  title,
  dek,
  href,
  first = false,
  last = false,
  style,
  ...rest
}) {
  const inner = React.createElement(React.Fragment, null, React.createElement('span', {
    style: {
      fontSize: 'var(--size-label)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--ink-6)',
      letterSpacing: 'var(--track-label)'
    }
  }, number), React.createElement('div', null, React.createElement('h2', {
    style: {
      fontSize: 'var(--size-body-lg)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--track-body-lg)',
      lineHeight: 'var(--leading-body-lg)',
      margin: '0 0 var(--space-2)'
    }
  }, title), React.createElement('p', {
    style: {
      margin: 0,
      fontSize: 'var(--size-small)',
      lineHeight: 'var(--leading-small)',
      color: 'var(--ink-6)'
    }
  }, dek)));
  const style0 = {
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0,1fr)',
    gap: 'var(--space-7)',
    alignItems: 'baseline',
    padding: '14px 0',
    borderTop: '1px solid ' + (first ? 'var(--line)' : 'var(--line)'),
    borderBottom: last ? '1px solid var(--line)' : 'none',
    textDecoration: 'none',
    color: 'inherit',
    ...style
  };
  return href ? React.createElement('a', {
    href,
    style: style0,
    ...rest
  }, inner) : React.createElement('div', {
    style: style0,
    ...rest
  }, inner);
}
Object.assign(__ds_scope, { PostRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/index/PostRow.jsx", error: String((e && e.message) || e) }); }

// components/index/SpecTable.jsx
try { (() => {
/* Label / value rows inside a bordered panel. The About page's tools list.
   Label column is a fixed 150px max; values are 14px/500 in full ink. */
function SpecTable({
  rows = [],
  surface = 'var(--paper)',
  style,
  ...rest
}) {
  return React.createElement('div', {
    style: {
      background: surface,
      border: '1px solid var(--line)',
      padding: 'clamp(18px,2.4vw,26px) clamp(18px,2.6vw,30px)',
      ...style
    },
    ...rest
  }, rows.map((r, i) => React.createElement('div', {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,150px) minmax(0,1fr)',
      gap: 'clamp(14px,3vw,32px)',
      alignItems: 'baseline',
      padding: '12px 0',
      borderTop: i === 0 ? 'none' : '1px solid var(--line)'
    }
  }, React.createElement('div', {
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--ink-6)'
    }
  }, r.label), React.createElement('div', {
    style: {
      fontSize: 'var(--size-small)',
      fontWeight: 'var(--weight-medium)',
      lineHeight: 'var(--leading-small)',
      color: 'var(--ink)',
      textWrap: 'pretty'
    }
  }, r.value))));
}
Object.assign(__ds_scope, { SpecTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/index/SpecTable.jsx", error: String((e && e.message) || e) }); }

// components/index/TimelineRow.jsx
try { (() => {
/* A role in the background list: title and date on one baseline, employer,
   then one paragraph. First row's rule is ink; the last row closes. */
function TimelineRow({
  title,
  dates,
  org,
  children,
  first = false,
  last = false,
  style,
  ...rest
}) {
  return React.createElement('div', {
    style: {
      padding: 'clamp(18px,2.4vw,26px) 0',
      borderTop: '1px solid ' + (first ? 'var(--line-ink)' : 'var(--line)'),
      borderBottom: last ? '1px solid var(--line)' : 'none',
      ...style
    },
    ...rest
  }, React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'clamp(12px,3vw,32px)',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 'var(--space-4)'
    }
  }, React.createElement('h3', {
    style: {
      fontSize: 'var(--size-statement)',
      fontWeight: 'var(--weight-medium)',
      lineHeight: 'var(--leading-statement)',
      letterSpacing: 'var(--track-statement)',
      margin: 0
    }
  }, title), React.createElement('span', {
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--ink-6)',
      flexShrink: 0
    }
  }, dates)), React.createElement('div', {
    style: {
      fontSize: 'var(--size-small)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--ink-2)',
      marginBottom: 'var(--space-4)'
    }
  }, org), React.createElement('p', {
    style: {
      margin: 0,
      maxWidth: '64ch',
      fontSize: 'var(--size-small)',
      lineHeight: 'var(--leading-small)',
      color: 'var(--ink-4)',
      textWrap: 'pretty'
    }
  }, children));
}
Object.assign(__ds_scope, { TimelineRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/index/TimelineRow.jsx", error: String((e && e.message) || e) }); }

// components/index/WorkCard.jsx
try { (() => {
/* The work-index entry: metadata row, title, summary, tags, a read link, and
   a 4:3 image well on the right. Top hairline is ink on the first entry. */
function WorkCard({
  meta = [],
  title,
  summary,
  tags = [],
  href = '#',
  slotId,
  src,
  placeholder,
  first = false,
  last = false,
  action = 'Read the case study',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('a', {
    href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(var(--min-col),1fr))',
      gap: 'var(--gap-col-lg)',
      alignItems: 'start',
      textDecoration: 'none',
      color: hover ? 'var(--rust)' : 'inherit',
      padding: 'clamp(24px,3.4vw,44px) 0',
      borderTop: '1px solid ' + (first ? 'var(--line-ink)' : 'var(--line)'),
      borderBottom: last ? '1px solid var(--line)' : 'none',
      transition: 'color var(--dur-hover-slow) ease',
      ...style
    },
    ...rest
  }, React.createElement('div', {
    style: {
      minWidth: 0
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      flexWrap: 'wrap',
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--ink-6)',
      marginBottom: 'var(--space-7)'
    }
  }, meta.map((m, i) => React.createElement('span', {
    key: i
  }, m))), React.createElement('h2', {
    style: {
      fontSize: 'var(--size-title)',
      fontWeight: 'var(--weight-medium)',
      lineHeight: 'var(--leading-title)',
      letterSpacing: 'var(--track-title)',
      margin: '0 0 var(--space-7)',
      maxWidth: 'var(--measure-title)',
      textWrap: 'pretty'
    }
  }, title), React.createElement('p', {
    style: {
      margin: '0 0 var(--space-9)',
      maxWidth: 'var(--measure-card)',
      fontSize: 'var(--size-small)',
      lineHeight: 'var(--leading-small)',
      color: 'var(--ink-4)',
      textWrap: 'pretty'
    }
  }, summary), tags.length ? React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-3)',
      marginBottom: 'var(--space-9)'
    }
  }, tags.map(t => React.createElement('span', {
    key: t,
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      padding: '6px 11px',
      border: '1px solid var(--line)',
      color: 'var(--ink-6)'
    }
  }, t))) : null, React.createElement('div', {
    style: {
      fontSize: 'var(--size-label)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-label)',
      textTransform: 'uppercase',
      display: 'flex',
      gap: 'var(--space-4)',
      alignItems: 'center'
    }
  }, action, React.createElement('span', {
    'aria-hidden': 'true'
  }, '\u2192'))), React.createElement('div', {
    style: {
      aspectRatio: '4/3',
      position: 'relative'
    }
  }, React.createElement('image-slot', {
    id: slotId,
    src,
    placeholder,
    shape: 'rect',
    style: {
      width: '100%',
      height: '100%'
    }
  })));
}
Object.assign(__ds_scope, { WorkCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/index/WorkCard.jsx", error: String((e && e.message) || e) }); }

// components/index/WorkRow.jsx
try { (() => {
/* The compact work row on the home page: number, title, right-hand category.
   Hover: text goes rust and the whole row nudges 10px right. */
function WorkRow({
  number,
  title,
  tag,
  href = '#',
  last = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('a', {
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
      borderBottom: '1px solid var(--line)',
      transition: 'color var(--dur-hover-slow) ease, padding-left .35s var(--ease)',
      ...style
    },
    ...rest
  }, React.createElement('div', {
    style: {
      display: 'flex',
      gap: 'clamp(14px,2vw,24px)',
      alignItems: 'baseline',
      minWidth: 0,
      flex: '1 1 auto'
    }
  }, React.createElement('span', {
    style: {
      fontSize: 'var(--size-label)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--ink-6)',
      letterSpacing: 'var(--track-label)',
      flexShrink: 0
    }
  }, number), React.createElement('h3', {
    style: {
      fontSize: 'var(--size-title)',
      fontWeight: 'var(--weight-medium)',
      lineHeight: 'var(--leading-title)',
      letterSpacing: 'var(--track-title)',
      margin: 0,
      textWrap: 'pretty'
    }
  }, title)), React.createElement('span', {
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--ink-6)',
      flexShrink: 0
    }
  }, tag));
}
Object.assign(__ds_scope, { WorkRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/index/WorkRow.jsx", error: String((e && e.message) || e) }); }

// components/site/CtaBanner.jsx
try { (() => {
/* The single dark section that closes a page: mega headline left, muted prose
   and one inverse button right, aligned to the baseline of the block. */
function CtaBanner({
  title,
  body,
  action,
  style,
  ...rest
}) {
  return React.createElement('section', {
    style: {
      borderTop: '1px solid var(--line)',
      background: 'var(--ink)',
      color: 'var(--on-ink)',
      ...style
    },
    ...rest
  }, React.createElement('div', {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: 'clamp(48px,8vw,110px) var(--page-gutter)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(var(--min-col),1fr))',
      gap: 'clamp(28px,4vw,64px)',
      alignItems: 'end'
    }
  }, React.createElement('h2', {
    style: {
      fontSize: 'var(--size-mega)',
      fontWeight: 'var(--weight-medium)',
      lineHeight: 'var(--leading-mega)',
      letterSpacing: 'var(--track-mega)',
      margin: 0,
      textWrap: 'balance'
    }
  }, title), React.createElement('div', null, React.createElement('p', {
    style: {
      margin: '0 0 var(--space-12)',
      fontSize: 'var(--size-body)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--on-ink-muted)',
      textWrap: 'pretty'
    }
  }, body), action)));
}
Object.assign(__ds_scope, { CtaBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/CtaBanner.jsx", error: String((e && e.message) || e) }); }

// components/site/Foot.jsx
try { (() => {
/* RECONSTRUCTED — not present in the source upload. Follows the site's
   hairline + eyebrow system at the 76–80px hint-size. */
function Foot({
  note = 'New York · remote-first',
  links = [{
    label: 'Email',
    href: 'mailto:nayara.marques@outlook.com'
  }, {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nayarasilvadesign'
  }, {
    label: 'Résumé',
    href: 'Resume.dc.html'
  }],
  style,
  ...rest
}) {
  return React.createElement('footer', {
    style: {
      borderTop: '1px solid var(--line)',
      background: 'var(--paper)',
      ...style
    },
    ...rest
  }, React.createElement('div', {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: '26px var(--page-gutter)',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-9)',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, React.createElement('div', {
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--ink-6)'
    }
  }, note), React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-9)'
    }
  }, links.map(l => React.createElement('a', {
    key: l.label,
    href: l.href,
    style: {
      fontSize: 'var(--size-label)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-label)',
      textTransform: 'uppercase',
      textDecoration: 'none',
      color: 'var(--ink-4)'
    }
  }, l.label)))));
}
Object.assign(__ds_scope, { Foot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/Foot.jsx", error: String((e && e.message) || e) }); }

// components/site/Nav.jsx
try { (() => {
/* RECONSTRUCTED — the source pages import a Nav component that was not
   included in the upload. Geometry follows the 57px hint-size and the site's
   own type and hairline system. Verify against the real header before use. */
function Nav({
  brand = 'Nayara Silva',
  links = [{
    label: 'Work',
    href: 'Work.dc.html'
  }, {
    label: 'About',
    href: 'About.dc.html'
  }, {
    label: 'Notes',
    href: 'Blog.dc.html'
  }, {
    label: 'Contact',
    href: 'Contact.dc.html'
  }],
  current,
  style,
  ...rest
}) {
  return React.createElement('header', {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      height: 'var(--nav-h)',
      display: 'flex',
      alignItems: 'center',
      background: 'var(--paper)',
      borderBottom: '1px solid var(--line)',
      ...style
    },
    ...rest
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: 24,
      width: '100%',
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: '0 var(--page-gutter)'
    }
  }, React.createElement('a', {
    href: 'Home.dc.html',
    style: {
      fontSize: 'var(--size-small)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: '-0.01em',
      color: 'var(--ink)',
      textDecoration: 'none'
    }
  }, brand), React.createElement('nav', {
    style: {
      display: 'flex',
      gap: 'var(--space-11)'
    }
  }, links.map(l => React.createElement(NavLink, {
    key: l.label,
    ...l,
    active: current === l.label
  })))));
}
function NavLink({
  label,
  href,
  active
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('a', {
    href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontSize: 'var(--size-label)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-label)',
      textTransform: 'uppercase',
      textDecoration: 'none',
      color: active ? 'var(--ink)' : hover ? 'var(--ink)' : 'var(--ink-6)',
      transition: 'color var(--dur-hover) ease'
    }
  }, label);
}
Object.assign(__ds_scope, { Nav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/Nav.jsx", error: String((e && e.message) || e) }); }

// components/site/PageHero.jsx
try { (() => {
/* Top of every non-case page: eyebrow, masked-reveal h1, a hairline, then a
   two-column standfirst (lead 26px + supporting 16px), then optional actions.
   The h1 reveal is a translateY(104%) + blur inside an overflow:hidden mask. */
function PageHero({
  eyebrow,
  title,
  lead,
  support,
  actions,
  rule = true,
  animate = true,
  style,
  ...rest
}) {
  return React.createElement('section', {
    style: {
      paddingTop: 'var(--hero-y)',
      paddingBottom: 'clamp(32px,4vw,56px)',
      ...style
    },
    ...rest
  }, eyebrow ? React.createElement('div', {
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--ink-6)',
      marginBottom: 'var(--stack-sm)'
    }
  }, eyebrow) : null, React.createElement('h1', {
    style: {
      fontSize: 'var(--size-display)',
      fontWeight: 'var(--weight-medium)',
      lineHeight: 'var(--leading-display)',
      letterSpacing: 'var(--track-display)',
      margin: '0 0 var(--stack-md)',
      maxWidth: '19ch',
      textWrap: 'balance'
    }
  }, React.createElement('span', {
    style: {
      display: 'block',
      overflow: 'hidden',
      paddingBottom: '0.16em',
      marginBottom: '-0.16em'
    }
  }, React.createElement('span', {
    style: {
      display: 'block',
      willChange: 'transform,filter',
      animation: animate ? 'lineUp 1.5s var(--ease) both' : 'none'
    }
  }, title))), rule ? React.createElement('div', {
    style: {
      height: 1,
      background: 'var(--line)',
      marginBottom: 'var(--stack-md)'
    }
  }) : null, lead || support ? React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(var(--min-col),1fr))',
      gap: 'var(--gap-col)',
      maxWidth: 'var(--content-max)'
    }
  }, lead ? React.createElement('p', {
    style: {
      margin: 0,
      fontSize: 'var(--size-lead)',
      fontWeight: 'var(--weight-medium)',
      lineHeight: 'var(--leading-lead)',
      letterSpacing: 'var(--track-lead)',
      textWrap: 'pretty',
      animation: animate ? 'fadeUp 1.2s var(--ease) .5s both' : 'none'
    }
  }, lead) : null, support ? React.createElement('p', {
    style: {
      margin: 0,
      fontSize: 'var(--size-body)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--ink-4)',
      textWrap: 'pretty',
      animation: animate ? 'fadeUp 1.2s var(--ease) .62s both' : 'none'
    }
  }, support) : null) : null, actions ? React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-4)',
      marginTop: 'clamp(30px,4vw,44px)',
      animation: animate ? 'fadeUp 1.2s var(--ease) .74s both' : 'none'
    }
  }, actions) : null);
}
Object.assign(__ds_scope, { PageHero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/PageHero.jsx", error: String((e && e.message) || e) }); }

// components/site/Prose.jsx
try { (() => {
/* Running text. body = 16px/1.7 on --ink-2 at a 62–66ch measure;
   small = 14px/1.6 on --ink-4 at up to 88ch, for captions and step intros. */
function Prose({
  children,
  size = 'body',
  measure,
  inverse = false,
  as = 'p',
  style,
  ...rest
}) {
  const small = size === 'small';
  return React.createElement(as, {
    style: {
      margin: 0,
      fontSize: small ? 'var(--size-small)' : 'var(--size-body)',
      lineHeight: small ? 'var(--leading-small)' : 'var(--leading-body)',
      color: inverse ? 'var(--on-ink-muted)' : small ? 'var(--ink-4)' : 'var(--ink-2)',
      maxWidth: measure || (small ? 'var(--measure-caption)' : 'var(--measure-prose-wide)'),
      textWrap: 'pretty',
      ...style
    },
    ...rest
  }, children);
}
Object.assign(__ds_scope, { Prose });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/Prose.jsx", error: String((e && e.message) || e) }); }

// components/site/SectionHeader.jsx
try { (() => {
/* Eyebrow left, optional uppercase link right, closed by a 1px INK rule.
   The ink rule (not --line) is what marks this as a page-level division. */
function SectionHeader({
  label,
  action,
  actionHref = '#',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: 'var(--space-9)',
      flexWrap: 'wrap',
      marginBottom: 'clamp(20px,2.4vw,28px)',
      borderBottom: '1px solid var(--line-ink)',
      paddingBottom: 'var(--space-6)',
      ...style
    },
    ...rest
  }, React.createElement('h2', {
    style: {
      fontSize: 'var(--size-eyebrow)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--ink-6)',
      margin: 0
    }
  }, label), action ? React.createElement('a', {
    href: actionHref,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontSize: 'var(--size-label)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-label)',
      textTransform: 'uppercase',
      textDecoration: 'none',
      color: hover ? 'var(--ink)' : 'var(--ink-4)',
      transition: 'color var(--dur-hover) ease'
    }
  }, action + ' \u2192') : null);
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/App.jsx
try { (() => {
const {
  Nav,
  Foot
} = window.NayaraSilvaDesignSystem_5f30f3;
const ROUTES = [{
  hash: '#home',
  label: 'Home',
  screen: 'HomeScreen'
}, {
  hash: '#work',
  label: 'Work',
  screen: 'WorkScreen'
}, {
  hash: '#case',
  label: 'Case study',
  screen: 'CaseScreen'
}, {
  hash: '#service',
  label: 'Services',
  screen: 'ServiceScreen'
}, {
  hash: '#contact',
  label: 'Contact',
  screen: 'ContactScreen'
}];
function App() {
  const [hash, setHash] = React.useState(window.location.hash || '#home');
  React.useEffect(() => {
    const on = () => {
      setHash(window.location.hash || '#home');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const route = ROUTES.find(r => r.hash === hash) || ROUTES[0];
  const Screen = window[route.screen];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(Nav, {
    current: route.label,
    links: ROUTES.slice(1).map(r => ({
      label: r.label,
      href: r.hash
    }))
  }), /*#__PURE__*/React.createElement(Screen, null), /*#__PURE__*/React.createElement(Foot, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/CaseScreen.jsx
try { (() => {
const {
  CaseHero,
  MetaBar,
  CaseSection,
  StatementLine,
  Prose,
  ListRow,
  HairlineGrid,
  StatTile,
  InfoCard,
  ProcessStep,
  FlowChain,
  FlowStep,
  Arrow,
  DecisionCard,
  MediaCarousel,
  CarouselSlide,
  ScreenFigure,
  NextCase,
  Eyebrow
} = window.NayaraSilvaDesignSystem_5f30f3;
function CaseScreen() {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: '0 var(--page-gutter)'
    }
  }, /*#__PURE__*/React.createElement(CaseHero, {
    backHref: "#work",
    meta: "BTG Pactual \xB7 S\xE3o Paulo \xB7 2020",
    title: "Modular card insurance in a banking app",
    deck: "Customisable insurance and assistance for a credit card \u2014 contracting, claims and cancellation inside the bank's app, priced so customers could build a package they were willing to pay for."
  }), /*#__PURE__*/React.createElement(MetaBar, {
    items: [{
      label: 'Role',
      value: 'Senior Product Designer, sole designer on the product.'
    }, {
      label: 'Team',
      value: 'PM, tech lead, developers, and Too Seguros as the insurance partner.'
    }, {
      label: 'Context',
      value: "BTG+, the bank's digital product. October 2020."
    }, {
      label: 'Contribution',
      value: 'survey · benchmark · user flows · prototyping · usability testing · flow strategy',
      muted: true
    }]
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'grid'
    }
  }, /*#__PURE__*/React.createElement(CaseSection, {
    label: "01 \u2014 Context & my role",
    band: "paper",
    measure: "var(--measure-prose-wide)"
  }, /*#__PURE__*/React.createElement(Prose, {
    style: {
      marginBottom: 18
    }
  }, "BTG Pactual is the largest investment bank in Latin America, and at the time it was expanding into retail banking \u2014 credit cards, accounts, and the products attached to them. Card insurance was one of those."), /*#__PURE__*/React.createElement(Prose, null, "I was the designer on it end to end: the survey that framed the opportunity, the benchmark, the flows, the prototype, and the usability test that changed where the product lived.")), /*#__PURE__*/React.createElement(CaseSection, {
    label: "02 \u2014 The problem",
    band: "band",
    measure: "var(--measure-prose)"
  }, /*#__PURE__*/React.createElement(StatementLine, {
    style: {
      marginBottom: 20
    }
  }, "Almost everyone already had card insurance. Almost nobody was happy with it."), /*#__PURE__*/React.createElement(Prose, {
    style: {
      marginBottom: 24
    }
  }, "A survey of 30 BTG Pactual customers set the shape of the opportunity:"), /*#__PURE__*/React.createElement(HairlineGrid, {
    min: 170,
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    value: "90%"
  }, "already have credit card insurance on at least one card"), /*#__PURE__*/React.createElement(StatTile, {
    value: "65%"
  }, "are not satisfied with at least one assistance in their current package"), /*#__PURE__*/React.createElement(StatTile, {
    value: "80%"
  }, "would like to be able to modularise their insurance package")), /*#__PURE__*/React.createElement(Prose, null, "The category sells fixed bundles at a single price, with no way to tell what any part of it costs. The goal was the opposite: modules a customer picks for their own life, each with its coverage limit and its effect on the premium visible at the point of choice.")), /*#__PURE__*/React.createElement(CaseSection, {
    label: "03 \u2014 Constraints",
    band: "paper",
    measure: "var(--measure-prose)"
  }, /*#__PURE__*/React.createElement(ListRow, {
    marker: "A",
    title: "A third-party insurer."
  }, "Coverage, pricing and claim rules belonged to Too Seguros. Some steps \u2014 completing certain claims \u2014 had to leave the app by design."), /*#__PURE__*/React.createElement(ListRow, {
    marker: "B",
    title: "Regulated language."
  }, "Insurance terms can't be paraphrased freely. Transparency had to be achieved through structure and hierarchy, not rewriting the clauses."), /*#__PURE__*/React.createElement(ListRow, {
    marker: "C",
    title: "Free and paid products in one checkout."
  }, "One assistance came free with the plan, which made the purchase flow structurally awkward."), /*#__PURE__*/React.createElement(ListRow, {
    marker: "D",
    title: "Card conversion is sacred.",
    last: true
  }, "Anything added to the card request flow risked the metric the whole retail business was measured on.")), /*#__PURE__*/React.createElement(CaseSection, {
    label: "04 \u2014 Process & key decisions",
    band: "band"
  }, /*#__PURE__*/React.createElement(Prose, {
    measure: "var(--measure-prose)",
    style: {
      marginBottom: 28
    }
  }, "There was no method set out in advance. Looking back, the work moved through four stages: the principles we agreed on, the benchmark, the flows, and the decisions that came out of testing."), /*#__PURE__*/React.createElement(ProcessStep, {
    step: "01",
    title: "Design principles",
    intro: "Three principles came out of a workshop with the PM, tech lead and developers. They resolved most of the later arguments on their own."
  }, /*#__PURE__*/React.createElement(HairlineGrid, {
    min: 170
  }, /*#__PURE__*/React.createElement(InfoCard, {
    title: "Simplicity"
  }, "A fluid, simplified process \u2014 not an infinite shelf of products that makes the decision harder."), /*#__PURE__*/React.createElement(InfoCard, {
    title: "Personalisation"
  }, "Offer coverage matched to the customer's lifestyle, at a premium they're willing to pay."), /*#__PURE__*/React.createElement(InfoCard, {
    title: "Transparency"
  }, "No hidden clauses. Coverage and conditions explained where the decision is made."))), /*#__PURE__*/React.createElement(ProcessStep, {
    step: "02",
    title: "Benchmark",
    intro: "Seven insurers reviewed for contracting, customisation and claims. Three of them shaped the structure we chose."
  }, /*#__PURE__*/React.createElement(MediaCarousel, null, /*#__PURE__*/React.createElement(CarouselSlide, {
    count: "1 / 3",
    name: "Hedvig",
    slotId: "kit-bench-1"
  }, "Referral built into the policy: inviting a friend visibly lowers the monthly price"), /*#__PURE__*/React.createElement(CarouselSlide, {
    count: "2 / 3",
    name: "Wrisk",
    slotId: "kit-bench-2"
  }, "A custom policy built through plain-language questions, one at a time"), /*#__PURE__*/React.createElement(CarouselSlide, {
    count: "3 / 3",
    name: "Cuvva",
    slotId: "kit-bench-3"
  }, "Sliders that increase coverage item by item, with the instant impact on policy price"))), /*#__PURE__*/React.createElement(ProcessStep, {
    step: "03",
    title: "User flows",
    intro: "Contracting, claim and cancellation mapped together before any screen was designed."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '30px 0 34px',
      borderTop: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement(FlowChain, {
    label: "Contracting"
  }, /*#__PURE__*/React.createElement(FlowStep, {
    label: "Home"
  }), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(FlowStep, {
    label: "Credit card"
  }), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(FlowStep, {
    label: "The card is active?",
    variant: "decision"
  })), /*#__PURE__*/React.createElement(FlowChain, {
    branch: true
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "accent",
    style: {
      flex: '0 0 34px'
    }
  }, "Yes"), /*#__PURE__*/React.createElement(FlowStep, {
    label: "Credit card menu"
  }), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(FlowStep, {
    label: "Insurance Page",
    variant: "key"
  }), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(FlowStep, {
    label: "Select the package"
  }), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(FlowStep, {
    label: "Success"
  })), /*#__PURE__*/React.createElement(FlowChain, {
    branch: true
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "accent",
    style: {
      flex: '0 0 34px'
    }
  }, "No"), /*#__PURE__*/React.createElement(FlowStep, {
    label: "Request a credit card",
    variant: "key"
  }), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(FlowStep, {
    label: "Active the card"
  }), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(FlowStep, {
    label: "Insurance offer"
  }), /*#__PURE__*/React.createElement(FlowStep, {
    label: "rejoins \u201CSelect the package\u201D",
    variant: "note"
  })))), /*#__PURE__*/React.createElement(ProcessStep, {
    step: "04",
    title: "Key decisions",
    intro: "",
    last: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(var(--min-col-lg),1fr))',
      gap: 22,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement(DecisionCard, {
    eyebrow: "Decision 01",
    title: "Three plans, then one free assistance to choose",
    gained: "Modularity customers asked for, without the paralysis of pricing every component themselves.",
    traded: "True \xE0-la-carte pricing. The 80% who wanted to modularise get structured choice, not a blank slate."
  }, "Rather than a fully open configurator, the customer picks one of three coverage plans and then chooses an assistance module \u2014 pet, home, repairs, emergency services, bike."), /*#__PURE__*/React.createElement(DecisionCard, {
    eyebrow: "Decision 02",
    title: "Design all three flows, not just the sale",
    gained: "A product that holds up after purchase, and clear boundaries for where the insurer takes over.",
    traded: "Scope. Claims and cancellation cost design and build time the business would rather have spent on conversion."
  }, "Contracting, claim and cancellation were mapped together. Cancellation being easy to find is part of transparency."), /*#__PURE__*/React.createElement(DecisionCard, {
    eyebrow: "Decision 03",
    title: "Take the insurance out of card signup \u2014 because the test said so",
    gained: "Insurance became a pending task after card success, plus a permanent home in card settings.",
    traded: "The highest-intent moment in the funnel. We accepted lower attach at signup to protect card conversion."
  }, "We tested both entry points with 10 active bank customers: from the card request, and from the insurance page in card settings.")))), /*#__PURE__*/React.createElement(CaseSection, {
    label: "05 \u2014 The solution",
    band: "paper"
  }, /*#__PURE__*/React.createElement(Prose, {
    measure: "var(--measure-prose)",
    style: {
      marginBottom: 28
    }
  }, "An insurance page inside card settings: three plans side by side with coverage limits stated in the comparison, assistance modules with their own detail sheets, and a confirmation screen that restates plan, price, payment method and billing date before the terms."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))',
      gap: 'var(--gap-grid)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(ScreenFigure, {
    label: "Card home",
    slotId: "kit-screen-1",
    placeholder: "Card home",
    why: "the usability test showed the signup journey was already carrying too many tasks."
  }, "The card's main screen, where insurance is reachable from settings rather than from the request flow."), /*#__PURE__*/React.createElement(ScreenFigure, {
    label: "Card settings menu",
    slotId: "kit-screen-2",
    placeholder: "Card settings",
    why: "treating insurance as a card setting gives it a permanent home."
  }, "\u201CSeguro do cart\xE3o\u201D listed alongside every other card configuration."), /*#__PURE__*/React.createElement(ScreenFigure, {
    label: "Plan comparison",
    slotId: "kit-screen-3",
    placeholder: "Plan comparison",
    why: "putting the limits next to the price is how transparency happens when the clauses can't be rewritten."
  }, "Simples, Pleno and Superior side by side, with coverage limits stated in the comparison itself."), /*#__PURE__*/React.createElement(ScreenFigure, {
    label: "Assistance selection",
    ratio: "375/700",
    slotId: "kit-screen-4",
    placeholder: "Assistance selection",
    why: "naming Too Seguros before the commitment keeps the free-plus-paid checkout honest."
  }, "Five assistance modules to choose from \u2014 pet, repairs, home, emergency services, bike."))), /*#__PURE__*/React.createElement(CaseSection, {
    label: "06 \u2014 What this case doesn't cover",
    band: "band",
    padBottom: "clamp(48px,7vw,80px)"
  }, /*#__PURE__*/React.createElement(Prose, {
    measure: "var(--measure-prose)",
    style: {
      marginBottom: 24
    }
  }, "The work here runs from the survey to the handover for build. Three things are deliberately outside it."), /*#__PURE__*/React.createElement(ListRow, {
    marker: "01",
    title: "Post-launch numbers.",
    measure: "var(--measure-list)"
  }, "Attach rate, claim volume and cancellation rate are not reported here. I left the bank before they were measurable, so any figure would be a guess."), /*#__PURE__*/React.createElement(ListRow, {
    marker: "02",
    title: "The claim and cancellation screens.",
    measure: "var(--measure-list)"
  }, "Both flows were mapped and designed, but only the contracting screens are shown."), /*#__PURE__*/React.createElement(ListRow, {
    marker: "03",
    title: "Research depth.",
    last: true,
    measure: "var(--measure-list)"
  }, "Thirty survey responses and ten moderated sessions. Enough to settle where the flow lives; not enough to claim anything statistical."))), /*#__PURE__*/React.createElement(NextCase, {
    title: "AI features inside an institutional investment platform",
    tag: "AI platform",
    href: "#work"
  }));
}
Object.assign(window, {
  CaseScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/CaseScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/ContactScreen.jsx
try { (() => {
const {
  StatusPill,
  ContactCard
} = window.NayaraSilvaDesignSystem_5f30f3;
function ContactScreen() {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      maxWidth: 'var(--page-max)',
      width: '100%',
      margin: '0 auto',
      padding: 'clamp(64px,12vw,152px) var(--page-gutter) clamp(56px,9vw,112px)'
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    style: {
      marginBottom: 'var(--stack-lg)'
    }
  }, "Open to senior / lead roles \u2014 remote"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--size-display)',
      lineHeight: 'var(--leading-display)',
      letterSpacing: 'var(--track-display)',
      margin: '0 0 clamp(28px,4vw,40px)',
      maxWidth: '14ch',
      textWrap: 'balance'
    }
  }, "Let's talk."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 clamp(44px,6vw,72px)',
      maxWidth: 'var(--measure-card)',
      fontSize: 'var(--size-body-lg)',
      lineHeight: 'var(--leading-body-lg)',
      color: 'var(--ink-2)',
      textWrap: 'pretty'
    }
  }, "If you're hiring a designer who ships with engineering \u2014 or you just want to argue about design systems \u2014 email is the fastest way to reach me."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
      gap: 'clamp(20px,3vw,28px)',
      maxWidth: 960
    }
  }, /*#__PURE__*/React.createElement(ContactCard, {
    label: "Email",
    value: "nayara.marques@outlook.com",
    href: "mailto:nayara.marques@outlook.com"
  }), /*#__PURE__*/React.createElement(ContactCard, {
    label: "LinkedIn",
    value: "/in/nayarasilvadesign",
    href: "https://www.linkedin.com/in/nayarasilvadesign"
  }), /*#__PURE__*/React.createElement(ContactCard, {
    label: "Phone",
    value: "+1 (360) 867 9341",
    href: "tel:+13608679341"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 'clamp(40px,5vw,56px) 0 0',
      fontSize: 'var(--size-small)',
      lineHeight: 'var(--leading-small)',
      color: 'var(--ink-6)'
    }
  }, "Remote-first, happy to travel for onsites \xB7 English, Portuguese, Spanish"));
}
Object.assign(window, {
  ContactScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/ContactScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/HomeScreen.jsx
try { (() => {
const {
  PageHero,
  SectionHeader,
  WorkRow,
  ModelCard,
  HairlineGrid,
  CtaBanner,
  ButtonLink,
  StatementLine,
  Eyebrow,
  Band
} = window.NayaraSilvaDesignSystem_5f30f3;
const WORK = [['01', 'AI features inside an institutional investment platform', 'AI platform · private capital markets', '#case'], ['02', 'A design system with automated drift validation', 'Method', '#case'], ['03', 'An advisors platform for four business verticals', 'BTG Pactual', '#case'], ['04', 'Capacity matching for private truck fleets', 'Loadsmart', '#case'], ['05', 'Modular card insurance in a banking app', 'BTG Pactual', '#case']];
const MODELS = [['Model 01 · fixed scope, 6—10 weeks', 'Project engagements', "You have an idea, a pitch or a problem worth solving, and nothing built yet. I take it from a conversation to a tested product with front-end code your first engineers can extend."], ['Model 02 · monthly, 2—4 days a week', 'Embedded partner', 'You have a product and a team, and need design that reaches production instead of stopping at approval. I join your standups, your repo and your review cycle.'], ['Model 03 · productized · setup + retainer', 'AI-ready design system', "Your team ships fast with AI tools — and your design system can't keep up. Colours drift, components fork, every new screen a little less consistent than the last. I make your system machine-readable and drift-resistant."]];
const EMPLOYERS = ['Clade', 'Loadsmart', 'BTG Pactual', 'CCEE', 'Itaú', 'Ativa Investimentos'];
function HomeScreen() {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: '0 var(--page-gutter)'
    }
  }, /*#__PURE__*/React.createElement(PageHero, {
    title: "Nayara Silva",
    lead: "I design, I build, I ship. Figma to production code, AI-native, with design systems that maintain themselves.",
    support: "I work with founders and product teams who need the strategy call, the interface and the code held in the same pair of hands \u2014 design-to-code, with no handoff in between.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ButtonLink, {
      href: "#work",
      arrow: true
    }, "Selected work"), /*#__PURE__*/React.createElement(ButtonLink, {
      href: "#contact",
      variant: "outline"
    }, "Enquire about a project"))
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--page-gutter)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    label: "Selected work",
    action: "Full case studies",
    actionHref: "#work"
  }), WORK.map(([n, t, tag, href]) => /*#__PURE__*/React.createElement(WorkRow, {
    key: n,
    number: n,
    title: t,
    tag: tag,
    href: href
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--line)',
      background: 'var(--paper-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: 'var(--section-y-lg) var(--page-gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(var(--min-col-md),1fr))',
      gap: 'var(--gap-col)',
      alignItems: 'start',
      marginBottom: 'var(--stack-lg)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    as: "h2"
  }, "How to work with me"), /*#__PURE__*/React.createElement(StatementLine, {
    size: "bodyLg",
    measure: "54ch"
  }, "Three ways in, depending on what exists today. All run the same way: strategy, design and production code from one person, with AI inside the parts where it earns its place.")), /*#__PURE__*/React.createElement(HairlineGrid, {
    min: 300,
    tone: "line2"
  }, MODELS.map(([e, t, b]) => /*#__PURE__*/React.createElement(ModelCard, {
    key: t,
    eyebrow: e,
    title: t,
    href: "#service"
  }, b))))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--page-gutter)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    as: "h2",
    style: {
      marginBottom: 'var(--stack-sm)'
    }
  }, "Where I've built"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'clamp(18px,3.5vw,48px)',
      alignItems: 'baseline'
    }
  }, EMPLOYERS.map(e => /*#__PURE__*/React.createElement("span", {
    key: e,
    style: {
      fontSize: 'var(--size-statement)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--track-statement)'
    }
  }, e))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '22px 0 0',
      fontSize: 'var(--size-label)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--track-label)',
      textTransform: 'uppercase',
      color: 'var(--ink-6)',
      lineHeight: 1.4
    }
  }, "New York \xB7 Chicago \xB7 S\xE3o Paulo \u2014 fintech, logistics, energy \u2014 seed startup to the largest investment bank in Latin America"))), /*#__PURE__*/React.createElement(CtaBanner, {
    title: "Need one person to take it from idea to shipped?",
    body: "Available as a Super IC for project engagements, embedded work with your product team, and advisory \u2014 as well as senior and lead roles. Design that ships with engineering, not alongside it. Remote, happy to travel.",
    action: /*#__PURE__*/React.createElement(ButtonLink, {
      href: "#contact",
      variant: "inverse",
      arrow: true
    }, "Start a conversation")
  }));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/ServiceScreen.jsx
try { (() => {
const {
  PageHero,
  ButtonLink,
  Eyebrow,
  StatementLine,
  Prose,
  HairlineGrid,
  OfferCard,
  OfferItem,
  CtaBanner
} = window.NayaraSilvaDesignSystem_5f30f3;
function ServiceScreen() {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: '0 var(--page-gutter)'
    }
  }, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Engagement model 03 \xB7 productized \xB7 setup + monthly retainer",
    title: "AI-ready design system",
    lead: "Machine-readable, drift-resistant, and consistent \u2014 so your whole team can create freely, and it stays coherent as you grow.",
    support: "A two-to-three week setup that gives you a canonical source of truth in code, a layer your AI tools can read and apply, and validation that catches drift before it ships \u2014 then a monthly retainer that keeps it clean.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ButtonLink, {
      href: "#contact",
      arrow: true
    }, "Start a conversation"), /*#__PURE__*/React.createElement(ButtonLink, {
      href: "#case",
      variant: "outline"
    }, "See the case study"))
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--line)',
      background: 'var(--paper-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: 'clamp(40px,6vw,80px) var(--page-gutter)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(var(--min-col-md),1fr))',
      gap: 'var(--gap-col)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    as: "h2"
  }, "The problem"), /*#__PURE__*/React.createElement(StatementLine, {
    measure: "60ch"
  }, "Seed-stage teams ship faster than ever with AI design and code tools. But speed without a disciplined system means drift: colours fork, components duplicate, and the product fragments one screen at a time. The generation is automated now \u2014 the judgment that keeps it coherent isn't."))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: 'clamp(40px,6vw,80px) var(--page-gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(var(--min-col-md),1fr))',
      gap: 'var(--gap-col)',
      alignItems: 'start',
      marginBottom: 'var(--stack-lg)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    as: "h2"
  }, "What I do"), /*#__PURE__*/React.createElement(StatementLine, {
    size: "bodyLg",
    measure: "var(--measure-standfirst)"
  }, "Two blocks: a one-time setup that builds the canonical source of truth, and a retainer that keeps it true.")), /*#__PURE__*/React.createElement(HairlineGrid, {
    min: 320,
    tone: "line2"
  }, /*#__PURE__*/React.createElement(OfferCard, {
    cadence: "One-time \xB7 2\u20143 weeks",
    title: "Setup",
    price: "$4,500"
  }, /*#__PURE__*/React.createElement(OfferItem, {
    number: "01",
    first: true
  }, "Audit of your current system, components, and where drift is happening."), /*#__PURE__*/React.createElement(OfferItem, {
    number: "02"
  }, "Canonical, code-authored design tokens as a single source of truth."), /*#__PURE__*/React.createElement(OfferItem, {
    number: "03"
  }, "A machine-readable layer \u2014 a Claude Skill or MCP server \u2014 so AI tools apply your system automatically, every time."), /*#__PURE__*/React.createElement(OfferItem, {
    number: "04"
  }, "Automated component tracking and a validation layer that catches drift before it ships."), /*#__PURE__*/React.createElement(OfferItem, {
    number: "05",
    last: true
  }, "Documentation your engineers and your AI tools both actually use.")), /*#__PURE__*/React.createElement(OfferCard, {
    cadence: "Monthly \xB7 3-month minimum",
    title: "Maintenance",
    price: "$600",
    priceSuffix: "/mo"
  }, /*#__PURE__*/React.createElement(OfferItem, {
    number: "01",
    first: true
  }, "Monthly drift audits across new work."), /*#__PURE__*/React.createElement(OfferItem, {
    number: "02"
  }, "Review and integration of new components into the canonical system."), /*#__PURE__*/React.createElement(OfferItem, {
    number: "03"
  }, "Keeping the source of truth clean as the product and team grow."), /*#__PURE__*/React.createElement(OfferItem, {
    number: "04",
    last: true
  }, "A standing line for \"is this on-system?\" questions."))))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--line)',
      background: 'var(--paper-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: 'clamp(40px,6vw,80px) var(--page-gutter)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(var(--min-col-md),1fr))',
      gap: 'var(--gap-col)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    as: "h2"
  }, "Why it matters"), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '60ch'
    }
  }, /*#__PURE__*/React.createElement(StatementLine, {
    style: {
      marginBottom: 20
    }
  }, "Anyone can produce a screen with an AI tool. The value is a system disciplined enough that what they produce stays coherent."), /*#__PURE__*/React.createElement(Prose, null, "That's the layer I own: the token architecture, the rules that catch meaningful drift, and the curation that keeps a fast-moving team's product from fragmenting.")))), /*#__PURE__*/React.createElement(CtaBanner, {
    title: "Show me where it's drifting.",
    body: "Send me your repo or a handful of recent screens. I'll tell you what's forking, what a canonical layer would cost you, and whether the setup is worth it yet.",
    action: /*#__PURE__*/React.createElement(ButtonLink, {
      href: "#contact",
      variant: "inverse",
      arrow: true
    }, "Start a conversation")
  }));
}
Object.assign(window, {
  ServiceScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/ServiceScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/WorkScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  PageHero,
  WorkCard
} = window.NayaraSilvaDesignSystem_5f30f3;
const ENTRIES = [{
  meta: ['01', 'AI platform · private capital markets', '2024—26'],
  title: 'AI features inside an institutional investment platform',
  summary: 'AI touchpoints across an institutional platform — a composer in the dashboard and contextual AI inside reports, documents and meeting notes. Streaming, inline editing, agent handoffs and human-in-the-loop review, specified state by state.',
  tags: ['AI-native', 'Composer', 'Design-to-code'],
  slotId: 'kit-work-1',
  placeholder: 'Composer in dashboard'
}, {
  meta: ['02', 'Method', '2026'],
  title: 'A design system with automated drift validation',
  summary: 'Tokens authored in code, automated component tracking, and a validation system that catches drift before it ships. An AI-native workflow built to drop into whatever stack a team already has.',
  tags: ['Design systems', 'Component automation', 'Claude Code'],
  slotId: 'kit-work-2',
  placeholder: 'System overview — token graph'
}, {
  meta: ['03', 'BTG Pactual', '2019—21'],
  title: 'An advisors platform for four business verticals',
  summary: 'A configurable dashboard, a modular side menu and a client page built as a workspace — the advisors platform four business verticals finally agreed on. 12 interviews, 21 concept features, 90% acceptance.',
  tags: ['Product strategy', '0→1', 'Team leadership'],
  slotId: 'kit-work-3',
  placeholder: 'Modular dashboard — advisor view'
}, {
  meta: ['04', 'Loadsmart', '2022'],
  title: 'Capacity matching for private truck fleets',
  summary: 'A design sprint produced a platform. A comparison test with six fleet managers said the plain email it was meant to replace was the better bet. We shipped the email — response rate up 250%.',
  tags: ['Research', 'Product strategy'],
  slotId: 'kit-work-4',
  placeholder: 'E-mail match — before / after'
}, {
  meta: ['05', 'BTG Pactual', '2020'],
  title: 'Modular card insurance in a banking app',
  summary: 'Customisable coverage and assistance for a credit card. 80% of customers wanted to modularise their package; usability testing then moved the whole flow out of card signup to protect conversion.',
  tags: ['Usability testing', 'Complex flows'],
  slotId: 'kit-work-5',
  placeholder: 'Contracting flow — plan comparison'
}];
function WorkScreen() {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: '0 var(--page-gutter)',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "Work",
    title: "Five projects, weighted toward the messy middle.",
    lead: "AI platforms, investment banking and logistics \u2014 the constraints, the tradeoffs, and the times research sent us somewhere we weren't planning to go.",
    support: "Each case study is structured the same way: context and my role, the problem, the constraints, the decisions and what they cost, the solution, the impact, and what I'd do differently."
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--paper-2)',
      boxShadow: '0 0 0 100vmax var(--paper-2)',
      clipPath: 'inset(0 -100vmax)',
      padding: 'clamp(32px,5vw,64px) 0 clamp(48px,7vw,96px)'
    }
  }, ENTRIES.map((e, i) => /*#__PURE__*/React.createElement(WorkCard, _extends({
    key: e.title
  }, e, {
    href: "#case",
    first: i === 0,
    last: i === ENTRIES.length - 1
  })))));
}
Object.assign(window, {
  WorkScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/WorkScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Arrow = __ds_scope.Arrow;

__ds_ns.CarouselSlide = __ds_scope.CarouselSlide;

__ds_ns.CaseHero = __ds_scope.CaseHero;

__ds_ns.CaseSection = __ds_scope.CaseSection;

__ds_ns.DecisionCard = __ds_scope.DecisionCard;

__ds_ns.FlowChain = __ds_scope.FlowChain;

__ds_ns.FlowStep = __ds_scope.FlowStep;

__ds_ns.InfoCard = __ds_scope.InfoCard;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.MediaCarousel = __ds_scope.MediaCarousel;

__ds_ns.MetaBar = __ds_scope.MetaBar;

__ds_ns.NextCase = __ds_scope.NextCase;

__ds_ns.ProcessStep = __ds_scope.ProcessStep;

__ds_ns.ScreenFigure = __ds_scope.ScreenFigure;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.Terminal = __ds_scope.Terminal;

__ds_ns.TerminalLine = __ds_scope.TerminalLine;

__ds_ns.Band = __ds_scope.Band;

__ds_ns.ButtonLink = __ds_scope.ButtonLink;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.HairlineGrid = __ds_scope.HairlineGrid;

__ds_ns.StatementLine = __ds_scope.StatementLine;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.TagChip = __ds_scope.TagChip;

__ds_ns.ContactCard = __ds_scope.ContactCard;

__ds_ns.ModelCard = __ds_scope.ModelCard;

__ds_ns.OfferCard = __ds_scope.OfferCard;

__ds_ns.OfferItem = __ds_scope.OfferItem;

__ds_ns.PostRow = __ds_scope.PostRow;

__ds_ns.SpecTable = __ds_scope.SpecTable;

__ds_ns.TimelineRow = __ds_scope.TimelineRow;

__ds_ns.WorkCard = __ds_scope.WorkCard;

__ds_ns.WorkRow = __ds_scope.WorkRow;

__ds_ns.CtaBanner = __ds_scope.CtaBanner;

__ds_ns.Foot = __ds_scope.Foot;

__ds_ns.Nav = __ds_scope.Nav;

__ds_ns.PageHero = __ds_scope.PageHero;

__ds_ns.Prose = __ds_scope.Prose;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

})();
