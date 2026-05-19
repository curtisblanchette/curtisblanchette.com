/**
 * Two-column section header used at the top of every numbered section:
 *
 *   [ italic-numeral ]          [ display-title ]
 *   [ mono-label  ]              [ optional subhead ]
 *
 * Direct port of `docs/cb-site-kit/components/section-header.html`.
 */
export function SectionHeader({
  num,
  label,
  title,
  sub,
  anchorId,
}: {
  /** e.g. "01" — rendered as the italic Eiko numeral in the accent colour. */
  num: string;
  /** Mono uppercase chapter label, e.g. "Selected work". */
  label: string;
  /** Display-MD-ish heading. Sentence case. */
  title: string;
  /** Optional dek/subhead under the title. */
  sub?: string;
  /** Optional anchor id rendered on the numeral cell. */
  anchorId?: string;
}) {
  return (
    <header className="cb-section-header">
      <div>
        <span className="cb-section-header__num" id={anchorId}>
          {num}
        </span>
        <span className="cb-section-header__label">{label}</span>
      </div>
      <div>
        <h2 className="cb-section-header__title">{title}</h2>
        {sub ? <p className="cb-section-header__sub">{sub}</p> : null}
      </div>
    </header>
  );
}
