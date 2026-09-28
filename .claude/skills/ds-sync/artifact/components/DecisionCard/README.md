# DecisionCard

A decision or problem card: eyebrow, title, a paragraph, and an optional Gained / Traded away footer.

**When to use.** In case studies, for a decision with a real cost (fill `gained` and `traded`) or for a problem statement (eyebrow and title only). Cards sit in two-column grids.

**Props.** `eyebrow` (e.g. "Decision 01 · Problem A"), `title`, the paragraph as children, optional `gained` and `traded`.

**Notes.** A white card with a `line` border and `card-p` padding. In case bodies the title steps down from `size-lead` to `size-body-lg`; the site's `case-index.js` sets that once (LAY-08), so don't set it on a page. The title is a claim only inside its card; never make it a section heading.

**On the site.** `<x-import component-from-global-scope="NayaraSilvaDesignSystem_5f30f3.DecisionCard" eyebrow="…" title="…" gained="…" traded="…">Paragraph</x-import>`
