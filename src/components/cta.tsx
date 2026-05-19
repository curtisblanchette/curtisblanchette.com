import { Fragment } from "react";

type Action = { label: string; href: string };

/**
 * Closing-section CTA. Massive headline + a primary button (and an
 * optional ghost button). One per page, just before the footer.
 *
 * Direct port of `docs/cb-site-kit/components/cta.html`.
 */
export function Cta({
  heading,
  lede,
  primary,
  ghost,
}: {
  /**
   * Heading text — split into `{ before, italic, after }` to interpolate
   * the one Eiko italic word.
   */
  heading: { before: string; italic?: string; after?: string };
  lede?: string;
  primary: Action;
  ghost?: Action;
}) {
  return (
    <div className="cb-cta">
      <h2 className="cb-cta__heading">
        {heading.before}
        {heading.italic ? <em>{heading.italic}</em> : null}
        {heading.after}
      </h2>
      {lede ? <p className="cb-cta__lede">{lede}</p> : null}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a href={primary.href} className="cb-btn cb-btn--primary">
          {primary.label} <span className="cb-arrow">↗</span>
        </a>
        {ghost ? (
          <Fragment>
            <a href={ghost.href} className="cb-btn cb-btn--ghost">
              {ghost.label} <span className="cb-arrow">↗</span>
            </a>
          </Fragment>
        ) : null}
      </div>
    </div>
  );
}
