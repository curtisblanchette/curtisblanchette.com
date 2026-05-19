import { Fragment } from "react";

/**
 * Hero · manifesto — italic Eiko chapter numeral + a single statement.
 * Used on every subpage (`/work`, `/writing`, article shells, /404).
 * Direct port of `docs/cb-site-kit/components/hero-manifesto.html`.
 *
 * `statement` is split around the optional italic word; everything
 * before lives in the leading text node, the italic word renders as
 * `<em>` (Eiko via kit CSS), and everything after follows.
 */
export function HeroManifesto({
  num,
  numLabel,
  statement,
}: {
  /** e.g. "02" — rendered as the massive italic numeral in accent. */
  num: string;
  /** Mono uppercase label rendered next to the numeral. */
  numLabel: string;
  /** Statement text. Use `parts` to interpolate the italic. */
  statement: { before: string; italic?: string; after?: string };
}) {
  return (
    <section className="cb-hero cb-hero--manifesto" style={{ paddingTop: 160 }}>
      <div className="cb-container cb-container--bleed">
        <div className="cb-hero__numrow">
          <span className="cb-hero__num">{num}</span>
          <span className="cb-hero__numlabel">
            {numLabel.split("\n").map((line, i, arr) => (
              <Fragment key={i}>
                {line}
                {i < arr.length - 1 ? <br /> : null}
              </Fragment>
            ))}
          </span>
        </div>
        <p className="cb-hero__statement">
          {statement.before}
          {statement.italic ? <em>{statement.italic}</em> : null}
          {statement.after}
        </p>
      </div>
    </section>
  );
}
