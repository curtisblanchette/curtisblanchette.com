import Link from "next/link";
import { listMdx, type WritingFrontmatter } from "@/lib/content";
import { getMediumPosts } from "@/lib/medium";
import { EssayList, type EssayRow } from "./essay-list";

/**
 * Composes EssayList with both local MDX and the Medium RSS feed.
 *
 * - `limit` caps the number of local rows (used on home).
 * - `showMedium` controls whether the Medium feed is appended below
 *   (true on /writing index, false on home — which has its own CTA).
 *
 * Date formatting: "YYYY · MM" to match the kit's mono date slot.
 * Read-time: not stored in our frontmatter today, so omitted.
 */
export async function WritingList({
  limit,
  showMedium = false,
}: {
  limit?: number;
  showMedium?: boolean;
}) {
  const [local, medium] = await Promise.all([
    listMdx("writing"),
    showMedium ? getMediumPosts() : Promise.resolve([]),
  ]);

  const localRows: EssayRow[] = local
    .map((e) => ({ slug: e.slug, data: e.data as WritingFrontmatter }))
    .filter((e) => !e.data.draft)
    .sort((a, b) => +new Date(b.data.date) - +new Date(a.data.date))
    .slice(0, limit ?? local.length)
    .map((p) => ({
      href: `/writing/${p.slug}`,
      date: formatRowDate(p.data.date),
      title: p.data.title,
    }));

  const mediumRows: EssayRow[] = medium.map((p) => ({
    href: p.link,
    date: formatRowDate(p.pubDate),
    title: p.title,
    external: true,
  }));

  return (
    <div>
      {localRows.length > 0 ? <EssayList rows={localRows} /> : null}

      {showMedium && mediumRows.length > 0 ? (
        <div style={{ marginTop: 64 }}>
          <p
            className="cb-eyebrow"
            style={{ marginBottom: 24 }}
          >
            Elsewhere · Medium
          </p>
          <EssayList rows={mediumRows.slice(0, 12)} />
        </div>
      ) : null}

      {showMedium && mediumRows.length === 0 ? (
        <p
          className="cb-body-md"
          style={{ marginTop: 48, color: "var(--fg-2)" }}
        >
          More on Medium —{" "}
          <Link
            href="https://medium.com/@curtis.blanchette"
            className="cb-link"
          >
            medium.com/@curtis.blanchette
          </Link>
        </p>
      ) : null}
    </div>
  );
}

function formatRowDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y} · ${m}`;
}
