import type { MetadataRoute } from "next";
import { WORK } from "@/content/data/work";
import { listMdx } from "@/lib/content";

// Required for `output: "export"`: the sitemap route must be statically
// generated at build time rather than served dynamically.
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://curtisblanchette.com";
  const now = new Date();

  const writing = await listMdx("writing");

  return [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/work`, lastModified: now, priority: 0.8 },
    { url: `${base}/writing`, lastModified: now, priority: 0.8 },
    ...WORK.map((w) => ({
      url: `${base}/work/${w.slug}`,
      lastModified: now,
      priority: w.featured ? 0.9 : 0.7,
    })),
    ...writing.map((w) => ({
      url: `${base}/writing/${w.slug}`,
      lastModified: now,
      priority: 0.6,
    })),
  ];
}
