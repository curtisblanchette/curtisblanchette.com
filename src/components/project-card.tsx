import Link from "next/link";
import Image from "next/image";
import type { WorkItem } from "@/content/data/work";
import { COVERS, GenericCover } from "@/components/covers";

/**
 * Single project card used inside `<ProjectGrid>`. Cover priority:
 *   1. real screenshot from `item.coverImage` → <Image>
 *   2. slug-keyed SVG component from `COVERS`
 *   3. `<GenericCover />`
 *
 * Direct port of `docs/cb-site-kit/components/project-grid.html` card.
 */
export function ProjectCard({ item }: { item: WorkItem }) {
  const Cover = COVERS[item.slug] ?? GenericCover;

  return (
    <Link href={`/work/${item.slug}`} className="cb-project-card">
      <div className="cb-project-card__cover">
        {item.coverImage ? (
          <Image
            src={item.coverImage}
            alt={item.title}
            fill
            sizes="(min-width: 700px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <Cover />
        )}
      </div>
      <div>
        <div className="cb-project-card__top">
          <span>{item.client}</span>
          <span>{item.year}</span>
        </div>
        <h3 className="cb-project-card__title">
          {item.title}
        </h3>
        <p className="cb-project-card__desc" style={{ marginTop: 16 }}>
          {item.summary}
        </p>
        <div className="cb-project-card__tags" style={{ marginTop: 16 }}>
          {item.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
