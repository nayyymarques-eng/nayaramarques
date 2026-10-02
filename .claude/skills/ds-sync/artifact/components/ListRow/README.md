# ListRow

A lettered or numbered row: a `rust` marker, a bold lead-in, and one sentence.

**When to use.** Constraints, findings or steps inside a case section, as a run of rows (A, B, C or 1, 2, 3).

**Props.** `marker`, `title` (the lead-in), the sentence as children, `measure` (the site uses `70ch`), `markerTone` (default `var(--rust)`), and `last` on the final row, which drops its bottom rule.

**On the site.** `<x-import component-from-global-scope="NayaraSilvaDesignSystem_5f30f3.ListRow" marker="C" title="…" last="{{ true }}" measure="70ch">Sentence</x-import>`
