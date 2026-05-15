import Link from "next/link";
import { listMdx, type WritingFrontmatter, formatDate } from "@/lib/content";
import { getMediumPosts, formatPubDate } from "@/lib/medium";

export async function WritingList() {
  const [local, medium] = await Promise.all([
    listMdx("writing"),
    getMediumPosts(),
  ]);

  const localItems = local
    .map((e) => ({
      kind: "local" as const,
      slug: e.slug,
      data: e.data as WritingFrontmatter,
    }))
    .filter((e) => !e.data.draft)
    .sort((a, b) => +new Date(b.data.date) - +new Date(a.data.date));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Local essays */}
      <div className="lg:col-span-7">
        <div className="text-[10px] uppercase tracking-[0.22em] text-accent mb-4">
          {"//"} Essays
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {localItems.length === 0 ? (
            <li className="py-6 text-sm text-muted">
              No essays yet — draft in progress.
            </li>
          ) : null}
          {localItems.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/writing/${p.slug}`}
                className="block py-5 hover:bg-[#111] -mx-3 px-3 group"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-muted w-24 shrink-0">
                    {formatDate(p.data.date)}
                  </span>
                  <div className="flex-1">
                    <div className="text-base font-semibold tracking-tight group-hover:text-accent">
                      {p.data.title}
                    </div>
                    <p className="mt-1 text-sm text-muted leading-snug line-clamp-2">
                      {p.data.description}
                    </p>
                  </div>
                  <span className="text-faint group-hover:text-accent text-sm">→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Medium feed */}
      <div className="lg:col-span-5">
        <div className="text-[10px] uppercase tracking-[0.22em] text-accent mb-4 flex items-center justify-between">
          <span>{"//"} Medium</span>
          <a
            href="https://medium.com/@curtis.blanchette"
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-accent"
          >
            FOLLOW →
          </a>
        </div>
        <ul className="border border-line divide-y divide-line bg-[#0a0a0a]">
          {medium.length === 0 ? (
            <li className="p-4 text-sm text-muted">
              <span className="text-faint">[ feed offline ]</span> Medium RSS is
              unreachable from the build at the moment. Visit{" "}
              <a
                href="https://medium.com/@curtis.blanchette"
                className="link-accent text-accent"
                target="_blank"
                rel="noreferrer"
              >
                medium.com/@curtis.blanchette
              </a>
              .
            </li>
          ) : null}
          {medium.slice(0, 8).map((p) => (
            <li key={p.link}>
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="block p-4 hover:bg-[#111] group"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted">
                  {formatPubDate(p.pubDate)}
                </div>
                <div className="mt-1 text-sm font-semibold group-hover:text-accent leading-snug">
                  {p.title}
                </div>
                {p.description ? (
                  <p className="mt-1.5 text-xs text-muted leading-snug line-clamp-2">
                    {p.description}
                  </p>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
