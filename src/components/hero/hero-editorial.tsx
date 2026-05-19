import { Fragment } from "react";

/**
 * Hero · editorial — massive type with one italic Eiko word.
 * Direct port of `docs/cb-site-kit/components/hero-editorial.html`.
 *
 * The `nameLines` array drives the broken-line layout. Each entry can
 * optionally carry an `italic` snippet (which gets wrapped in `<em>`,
 * styled with PP Eiko by the kit CSS). `<br/>` joins consecutive lines.
 */
export function HeroEditorial({
  nameLines,
  role,
  based,
  focus,
  status,
}: {
  nameLines: { text: string; italic?: string }[];
  role: string;
  based: string;
  focus: string;
  status: { live: boolean; text: string };
}) {
  return (
    <section className="cb-hero cb-hero--editorial">
      <div className="cb-container cb-container--bleed">
        <h1 className="cb-hero__name">
          {nameLines.map((line, i) => (
            <Fragment key={i}>
              {line.text}
              {line.italic ? <em>{line.italic}</em> : null}
              {i < nameLines.length - 1 ? <br /> : null}
            </Fragment>
          ))}
        </h1>

        <div className="cb-hero__meta">
          <MetaCell label="Role" value={role} />
          <MetaCell label="Based" value={based} />
          <MetaCell label="Focus" value={focus} />
          <MetaCell
            label="Status"
            value={
              <>
                {status.live ? (
                  <>
                    <i className="cb-dot" aria-hidden />
                    &nbsp;&nbsp;
                  </>
                ) : null}
                {status.text}
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}

function MetaCell({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="cb-hero__meta-cell">
      <span className="cb-hero__meta-label">{label}</span>
      <span className="cb-hero__meta-value">{value}</span>
    </div>
  );
}
