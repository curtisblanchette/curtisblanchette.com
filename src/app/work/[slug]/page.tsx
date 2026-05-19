import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { WORK, getWork, type WorkItem } from "@/content/data/work";
import { readMdx } from "@/lib/content";
import { Section } from "@/components/section";
import { HeroManifesto } from "@/components/hero/hero-manifesto";

export async function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    openGraph: {
      title: item.title,
      description: item.summary,
      images: item.coverImage ? [item.coverImage] : undefined,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();
  const mdx = await readMdx("work", slug);

  return (
    <article>
      <HeroManifesto
        num="01"
        numLabel={`${item.year} · ${item.client}`}
        statement={{
          before: item.italic
            ? splitTitleBeforeItalic(item.title, item.italic)
            : item.title,
          italic: item.italic
            ? matchTitleItalic(item.title, item.italic)
            : undefined,
          after: item.italic
            ? splitTitleAfterItalic(item.title, item.italic)
            : "",
        }}
      />

      {item.heroVideo ? (
        <Section variant="sm" container="bleed">
          <video
            src={item.heroVideo}
            poster={item.coverImage}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              border: "1px solid var(--border-1)",
              borderRadius: "var(--radius-card)",
              background: "var(--bg-2)",
            }}
          />
        </Section>
      ) : null}

      <Section variant="sm" hairline container="reading">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 20,
          }}
        >
          <MetaRow label="Role" value={item.role} />
          <MetaRow label="Tags" value={item.tags.join(" · ")} />
          {item.links && item.links.length > 0 ? (
            <MetaRow
              label="Links"
              value={item.links.map((l, i) => (
                <span key={l.href}>
                  <a
                    href={l.href}
                    className="cb-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {l.label}
                  </a>
                  {i < item.links!.length - 1 ? "  ·  " : ""}
                </span>
              ))}
            />
          ) : null}
        </div>
      </Section>

      <Section variant="sm" container="reading">
        <div className="cb-prose">
          {mdx ? (
            <div dangerouslySetInnerHTML={{ __html: mdx.html }} />
          ) : (
            <NoContentPlaceholder item={item} />
          )}
        </div>

        <div
          style={{
            marginTop: 64,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: "1px solid var(--border-1)",
          }}
        >
          <Link href="/work" className="cb-eyebrow">
            ← All work
          </Link>
          <a href="mailto:hello@curtisblanchette.com" className="cb-eyebrow">
            Talk about this →
          </a>
        </div>
      </Section>
    </article>
  );
}

function MetaRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: 24,
        alignItems: "baseline",
      }}
    >
      <span className="cb-eyebrow">{label}</span>
      <span className="cb-body-md" style={{ color: "var(--fg-1)" }}>
        {value}
      </span>
    </div>
  );
}

function NoContentPlaceholder({ item }: { item: WorkItem }) {
  return (
    <p>
      A full write-up for {item.title} is in progress. For architecture
      diagrams, decisions, and what worked vs. didn&apos;t —{" "}
      <a href="mailto:hello@curtisblanchette.com">drop me a line</a>.
    </p>
  );
}

/* ── Title-italic helpers (mirror the project-list logic) ─────────────────── */
function findItalicSpan(title: string, italic: string) {
  const idx = title.toLowerCase().indexOf(italic.toLowerCase());
  if (idx === -1) return null;
  return {
    before: title.slice(0, idx),
    match: title.slice(idx, idx + italic.length),
    after: title.slice(idx + italic.length),
  };
}
function splitTitleBeforeItalic(title: string, italic: string): string {
  const s = findItalicSpan(title, italic);
  return s ? s.before : `${title} `;
}
function matchTitleItalic(title: string, italic: string): string {
  const s = findItalicSpan(title, italic);
  return s ? s.match : italic;
}
function splitTitleAfterItalic(title: string, italic: string): string {
  const s = findItalicSpan(title, italic);
  return s ? s.after : "";
}
