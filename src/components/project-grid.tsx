import type { WorkItem } from "@/content/data/work";
import { ProjectCard } from "./project-card";

/**
 * Multi-card project grid. 1-col on mobile, 2-col ≥ 700px.
 * Direct port of `docs/cb-site-kit/components/project-grid.html`.
 *
 * Featured items render first.
 */
export function ProjectGrid({ items }: { items: WorkItem[] }) {
  const ordered = [
    ...items.filter((i) => i.featured),
    ...items.filter((i) => !i.featured),
  ];
  return (
    <div className="cb-project-grid">
      {ordered.map((item) => (
        <ProjectCard key={item.slug} item={item} />
      ))}
    </div>
  );
}
