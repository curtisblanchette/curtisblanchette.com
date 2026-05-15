import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WORK, getWork, type WorkItem } from "@/content/data/work";
import { readMdx } from "@/lib/content";
import { Crosshair } from "@/components/crosshair";
import { AsciiRule, FieldRow } from "@/components/section";

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
      images: item.cover ? [item.cover] : undefined,
    },
  };
}

function badgeFor(v: WorkItem["visibility"]) {
  switch (v) {
    case "public":
      return { label: "PUBLIC", className: "text-accent border-accent" };
    case "client-anon":
      return { label: "NDA · CLIENT ANON", className: "text-muted border-line" };
    case "internal":
      return { label: "INTERNAL", className: "text-muted border-line" };
  }
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
  const badge = badgeFor(item.visibility);

  return (
    <article className="px-6 md:px-10 py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        {/* breadcrumb */}
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted mb-6">
          <Link href="/" className="hover:text-accent">
            ~/INDEX
          </Link>{" "}
          /{" "}
          <Link href="/#work" className="hover:text-accent">
            WORK
          </Link>{" "}
          / <span className="text-fg">{item.slug.toUpperCase()}</span>
        </div>

        <header className="border border-line p-6 md:p-8 bg-[#0a0a0a] relative">
          <Crosshair />
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.22em]">
            <span className={`border px-2 py-1 ${badge.className}`}>
              {badge.label}
            </span>
            <span className="text-muted">CASE STUDY · {item.year}</span>
          </div>
          <h1 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[0.95]">
            {item.title}
          </h1>
          <p className="mt-4 text-base text-muted max-w-3xl leading-relaxed">
            {item.summary}
          </p>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div>
              <FieldRow label="Client" value={item.client} />
              <FieldRow label="Role" value={item.role} />
              <FieldRow label="Year" value={item.year} />
            </div>
            <div>
              <FieldRow
                label="Tags"
                value={item.tags.join(" · ")}
              />
              {item.links && item.links.length > 0 ? (
                <FieldRow
                  label="Links"
                  value={
                    <span className="flex flex-wrap gap-x-3 justify-end">
                      {item.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="link-accent text-accent"
                        >
                          {l.label}
                        </a>
                      ))}
                    </span>
                  }
                />
              ) : null}
            </div>
          </div>
        </header>

        <AsciiRule className="mt-10" />

        <div className="mt-10 prose-brutalist">
          {mdx ? (
            <div dangerouslySetInnerHTML={{ __html: mdx.html }} />
          ) : (
            <NoContentPlaceholder item={item} />
          )}
        </div>

        <AsciiRule className="mt-12" />

        <div className="mt-8 flex items-center justify-between text-[11px] uppercase tracking-[0.18em]">
          <Link href="/#work" className="hover:text-accent">
            ← All work
          </Link>
          <a
            href="mailto:hello@curtisblanchette.com"
            className="hover:text-accent"
          >
            Talk about this →
          </a>
        </div>
      </div>
    </article>
  );
}

function NoContentPlaceholder({ item }: { item: WorkItem }) {
  return (
    <div className="border border-dashed border-line p-6 text-sm text-muted leading-relaxed">
      <p className="text-fg">[ case study in progress ]</p>
      <p className="mt-2">
        A full write-up for <span className="text-fg">{item.title}</span> is
        being drafted. In the meantime, the summary above captures the scope
        and the spec sheet captures the contract.
      </p>
      <p className="mt-2">
        For specifics — architecture diagrams, decisions, what worked and what
        didn&apos;t —{" "}
        <a
          href="mailto:hello@curtisblanchette.com"
          className="link-accent text-accent"
        >
          drop me a line
        </a>
        .
      </p>
    </div>
  );
}
