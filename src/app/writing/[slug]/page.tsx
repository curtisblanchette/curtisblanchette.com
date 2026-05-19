import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  listMdx,
  readMdx,
  formatDate,
  type WritingFrontmatter,
} from "@/lib/content";
import { Section } from "@/components/section";
import { HeroManifesto } from "@/components/hero/hero-manifesto";

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
    <article>
      <HeroManifesto
        num="02"
        numLabel={formatDate(fm.date)}
        statement={{ before: fm.title }}
      />

      <Section variant="sm" hairline container="reading">
        <p className="cb-body-lg" style={{ color: "var(--fg-2)", margin: 0 }}>
          {fm.description}
        </p>
      </Section>

      <Section variant="sm" container="reading">
        <div
          className="cb-prose"
          dangerouslySetInnerHTML={{ __html: mdx.html }}
        />

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
          <Link href="/writing" className="cb-eyebrow">
            ← All writing
          </Link>
          <a
            href="https://medium.com/@curtis.blanchette"
            target="_blank"
            rel="noreferrer"
            className="cb-eyebrow"
          >
            More on Medium →
          </a>
        </div>
      </Section>
    </article>
  );
}
