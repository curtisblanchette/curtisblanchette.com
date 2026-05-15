import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listMdx, readMdx, formatDate, type WritingFrontmatter } from "@/lib/content";
import { AsciiRule } from "@/components/section";

export async function generateStaticParams() {
  const entries = await listMdx("writing");
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mdx = await readMdx("writing", slug);
  if (!mdx) return {};
  const fm = mdx.data as WritingFrontmatter;
  return {
    title: fm.title,
    description: fm.description,
    openGraph: { title: fm.title, description: fm.description },
  };
}

export default async function WritingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mdx = await readMdx("writing", slug);
  if (!mdx) notFound();
  const fm = mdx.data as WritingFrontmatter;

  return (
    <article className="px-6 md:px-10 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted mb-6">
          <Link href="/" className="hover:text-accent">
            ~/INDEX
          </Link>{" "}
          /{" "}
          <Link href="/#writing" className="hover:text-accent">
            WRITING
          </Link>{" "}
          / <span className="text-fg">{slug.toUpperCase()}</span>
        </div>

        <header className="border-y border-line py-8">
          <div className="text-[10px] uppercase tracking-[0.22em] text-accent">
            ESSAY · {formatDate(fm.date)}
          </div>
          <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight leading-[0.95]">
            {fm.title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted max-w-2xl leading-relaxed">
            {fm.description}
          </p>
          {fm.tags && fm.tags.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-1.5 text-[10px] uppercase tracking-[0.18em]">
              {fm.tags.map((t) => (
                <li key={t} className="border border-line px-1.5 py-0.5 text-muted">
                  {t}
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        <div
          className="mt-10 prose-brutalist"
          dangerouslySetInnerHTML={{ __html: mdx.html }}
        />

        <AsciiRule className="mt-12" />

        <div className="mt-8 flex items-center justify-between text-[11px] uppercase tracking-[0.18em]">
          <Link href="/#writing" className="hover:text-accent">
            ← All writing
          </Link>
          <a
            href="https://medium.com/@curtis.blanchette"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent"
          >
            More on Medium →
          </a>
        </div>
      </div>
    </article>
  );
}
