import Link from "next/link";
import { WORK, FEATURED, type WorkItem } from "@/content/data/work";
import { Crosshair } from "./crosshair";

function badgeFor(v: WorkItem["visibility"]) {
  switch (v) {
    case "public":
      return { label: "PUBLIC", className: "text-accent border-accent" };
    case "client-anon":
      return { label: "NDA", className: "text-muted border-line" };
    case "internal":
      return { label: "INTERNAL", className: "text-muted border-line" };
  }
}

export function WorkGrid() {
  const featured = FEATURED[0];
  const rest = WORK.filter((w) => !w.featured);
  return (
    <div className="space-y-12">
      {featured ? <FeaturedCard item={featured} /> : null}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
        {rest.map((item) => (
          <WorkCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}

function FeaturedCard({ item }: { item: WorkItem }) {
  const badge = badgeFor(item.visibility);
  return (
    <Link
      href={`/work/${item.slug}`}
      className="group relative block border border-line bg-[#0d0d0d] hover:bg-[#111]"
    >
      <Crosshair />
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-7 relative border-b md:border-b-0 md:border-r border-line aspect-[16/9] md:aspect-auto bg-[#050505]">
          {item.cover ? (
            // Use plain img to avoid layout shift while we ship without remote image setup
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.cover}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300"
            />
          ) : null}
          <div className="absolute top-3 left-3 flex gap-2 text-[10px] uppercase tracking-[0.2em]">
            <span className={`border px-2 py-1 ${badge.className}`}>
              {badge.label}
            </span>
            <span className="border border-line px-2 py-1 bg-bg/80 text-fg">
              FEATURED
            </span>
          </div>
        </div>
        <div className="md:col-span-5 p-6 md:p-8 flex flex-col">
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted">
            CASE STUDY · {item.year} · {item.client}
          </div>
          <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight group-hover:text-accent">
            {item.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {item.summary}
          </p>
          <ul className="mt-5 flex flex-wrap gap-1.5 text-[10px] uppercase tracking-[0.18em]">
            {item.tags.map((t) => (
              <li key={t} className="border border-line px-1.5 py-0.5 text-muted">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-6 text-[11px] uppercase tracking-[0.18em] text-accent">
            READ CASE STUDY →
          </div>
        </div>
      </div>
    </Link>
  );
}

function WorkCard({ item }: { item: WorkItem }) {
  const badge = badgeFor(item.visibility);
  return (
    <Link
      href={`/work/${item.slug}`}
      className="group relative block bg-[#0a0a0a] hover:bg-[#111] p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted">
          {item.year} · {item.client}
        </div>
        <span className={`border px-1.5 py-0.5 text-[9px] uppercase tracking-[0.18em] ${badge.className}`}>
          {badge.label}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold tracking-tight group-hover:text-accent">
        {item.title}
      </h3>
      <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-4">
        {item.summary}
      </p>
      <ul className="mt-4 flex flex-wrap gap-1.5 text-[10px] uppercase tracking-[0.18em]">
        {item.tags.slice(0, 4).map((t) => (
          <li
            key={t}
            className="border border-line px-1.5 py-0.5 text-muted"
          >
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-5 text-[11px] uppercase tracking-[0.18em] text-faint group-hover:text-accent">
        DETAILS →
      </div>
    </Link>
  );
}
