import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const ROOT = path.join(process.cwd(), "src/content");

export type WritingFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  draft?: boolean;
};

export type CaseStudyFrontmatter = {
  title: string;
  client: string;
  role: string;
  year: string;
  summary: string;
  tags: string[];
  cover?: string;
  visibility?: "public" | "client-anon" | "internal";
};

/**
 * Renders a markdown/MDX-flavoured file body into raw HTML.
 * We deliberately use `remark`/`rehype` directly (no React component wrapping)
 * to side-step React 19's element-identity validation in RSC streaming.
 */
async function renderMarkdown(source: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: "github-dark-dimmed",
      keepBackground: false,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(source);
  return String(file);
}

export async function readMdx(kind: "writing" | "work", slug: string) {
  const file = path.join(ROOT, kind, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(file, "utf8");
    const { data, content } = matter(raw);
    const html = await renderMarkdown(content);
    return { data, html };
  } catch {
    return null;
  }
}

export async function listMdx(kind: "writing" | "work") {
  const dir = path.join(ROOT, kind);
  try {
    const files = await fs.readdir(dir);
    const entries = await Promise.all(
      files
        .filter((f) => f.endsWith(".mdx"))
        .map(async (f) => {
          const slug = f.replace(/\.mdx$/, "");
          const raw = await fs.readFile(path.join(dir, f), "utf8");
          const parsed = matter(raw);
          return { slug, data: parsed.data };
        }),
    );
    return entries;
  } catch {
    return [];
  }
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
