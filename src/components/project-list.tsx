import Link from "next/link";
import type { WorkItem } from "@/content/data/work";

/**
 * Dense single-column list of project rows. Used on the home page's
 * "Selected work" section. Each row reveals a thin accent bar on hover.
 *
 * Direct port of `docs/cb-site-kit/components/project-list.html`.
 */
export function ProjectList({ items }: { items: WorkItem[] }) {
  return (
    <div className="cb-project-list">
      {items.map((item, i) => (
        <Link
          key={item.slug}
          href={`/work/${item.slug}`}
          className="cb-project-row"
        >
          <span className="cb-project-row__num">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="cb-project-row__title">
            {renderTitleWithItalic(item.title, item.italic)}
          </h3>
          <span className="cb-project-row__meta">
            {item.role} · {item.year}
          </span>
          <span className="cb-project-row__arrow" aria-hidden>
            ↗
          </span>
        </Link>
      ))}
    </div>
  );
}

/**
 * Inject `<em>` around the matched italic substring inside the title,
 * preserving original casing. The kit applies PP Eiko italic to <em>
 * via the row's CSS rule.
 */
function renderTitleWithItalic(title: string, italic?: string) {
  if (!italic) return title;
  const idx = title.toLowerCase().indexOf(italic.toLowerCase());
  if (idx === -1) {
    return (
      <>
        {title} <em>{italic}</em>
      </>
    );
  }
  const before = title.slice(0, idx);
  const match = title.slice(idx, idx + italic.length);
  const after = title.slice(idx + italic.length);
  return (
    <>
      {before}
      <em>{match}</em>
      {after}
    </>
  );
}
