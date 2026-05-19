import Link from "next/link";

export type EssayRow = {
  href: string;
  /** "YYYY · MM" or any short label that fits the kit's mono date slot. */
  date: string;
  title: string;
  /** "12 min" — short read-time string. Optional. */
  readTime?: string;
  /** Render as an external link (uses <a> with target="_blank"). */
  external?: boolean;
};

/**
 * Tight rows of date + title + read-time. Direct port of
 * `docs/cb-site-kit/components/essay-list.html`.
 */
export function EssayList({ rows }: { rows: EssayRow[] }) {
  return (
    <div className="cb-essay-list">
      {rows.map((r) =>
        r.external ? (
          <a
            key={r.href}
            href={r.href}
            target="_blank"
            rel="noreferrer"
            className="cb-essay-row"
          >
            <Row row={r} />
          </a>
        ) : (
          <Link key={r.href} href={r.href} className="cb-essay-row">
            <Row row={r} />
          </Link>
        ),
      )}
    </div>
  );
}

function Row({ row }: { row: EssayRow }) {
  return (
    <>
      <span className="cb-essay-row__date">{row.date}</span>
      <h3 className="cb-essay-row__title">{row.title}</h3>
      <span className="cb-essay-row__read">{row.readTime ?? ""}</span>
    </>
  );
}
