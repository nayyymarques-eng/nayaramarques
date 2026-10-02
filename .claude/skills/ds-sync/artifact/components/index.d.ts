/* Props of the components exported by bundle.js (window.NayaraSilvaDesignSystem_5f30f3), read from their
 * source signatures in the repository's _ds_bundle.js. Documentation only. Every component also takes
 * `style` and passes other attributes through to its root element. Nav and Foot are site components
 * (Nav.dc.html, Foot.dc.html), not in the bundle. */

import * as React from "react";

/** A decision or problem card: eyebrow, title, a paragraph, and an optional Gained / Traded away footer. */
export interface DecisionCardProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  children?: React.ReactNode;
  gained?: React.ReactNode;
  traded?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function DecisionCard(props: DecisionCardProps): React.ReactElement;

/** A lettered or numbered row: a `rust` marker, a bold lead-in, and one sentence. */
export interface ListRowProps {
  marker?: React.ReactNode;
  title?: React.ReactNode;
  children?: React.ReactNode;
  last?: boolean; /** default false */
  markerTone?: string; /** default 'var(--rust)' */
  measure?: string;
  style?: React.CSSProperties;
}
export declare function ListRow(props: ListRowProps): React.ReactElement;

/** Closes a case study: the next case's title with its tag. */
export interface NextCaseProps {
  title?: React.ReactNode;
  href?: string; /** default '#' */
  tag?: React.ReactNode;
  label?: string; /** default 'Next case study' */
  style?: React.CSSProperties;
}
export declare function NextCase(props: NextCaseProps): React.ReactElement;
