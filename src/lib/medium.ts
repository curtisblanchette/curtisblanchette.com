import { XMLParser } from "fast-xml-parser";

export type MediumPost = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories: string[];
};

const FEED_URL = (user: string) =>
  `https://medium.com/feed/@${user}`;

/**
 * Server-side fetch of Curtis's Medium feed.
 * Tolerates failure — returns an empty list rather than blowing up the build.
 */
export async function getMediumPosts(): Promise<MediumPost[]> {
  const user = process.env.MEDIUM_USERNAME ?? "curtis.blanchette";
  try {
    const res = await fetch(FEED_URL(user), {
      headers: { "User-Agent": "curtisblanchette.com/1.0" },
      next: { revalidate: 60 * 60 * 4 }, // 4h
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      cdataPropName: "__cdata",
      processEntities: true,
    });
    const json = parser.parse(xml);
    const items = json?.rss?.channel?.item ?? [];
    const list: MediumPost[] = (Array.isArray(items) ? items : [items])
      .filter(Boolean)
      .map((it: Record<string, unknown>) => {
        const description = stripHtml(asText(it.description));
        return {
          title: asText(it.title),
          link: asText(it.link),
          pubDate: asText(it.pubDate),
          description: description.slice(0, 320),
          categories: Array.isArray(it.category)
            ? (it.category as string[]).map(String)
            : it.category
              ? [String(it.category)]
              : [],
        };
      });
    return list;
  } catch {
    return [];
  }
}

function asText(v: unknown): string {
  if (!v) return "";
  if (typeof v === "string") return v;
  if (typeof v === "object" && v !== null) {
    const obj = v as Record<string, unknown>;
    if (typeof obj.__cdata === "string") return obj.__cdata;
    if (typeof obj["#text"] === "string") return obj["#text"] as string;
  }
  return String(v);
}

function stripHtml(s: string) {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function formatPubDate(s: string): string {
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
