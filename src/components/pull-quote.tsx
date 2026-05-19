import { getPullQuote } from "@/content/data/testimonials";

/**
 * Single-quote callout. Renders the first public testimonial from
 * `data/testimonials.ts`. The kit allows one per page; the home page
 * is the only place it appears.
 *
 * Direct port of `docs/cb-site-kit/components/pull-quote.html`.
 *
 * In dev, when no public testimonial exists, a dashed-bordered
 * "placeholder" version renders so the layout still works while
 * authoring. In production we return `null` rather than ship a
 * placeholder voice.
 */
export function PullQuote() {
  const t = getPullQuote();

  if (!t) {
    if (process.env.NODE_ENV !== "production") {
      return (
        <figure
          className="cb-pullquote"
          style={{
            outline: "1px dashed var(--border-1)",
            outlineOffset: 8,
          }}
        >
          <blockquote className="cb-quote">
            “Placeholder — no public testimonial in
            data/testimonials.ts yet. Flip an entry to{" "}
            <code className="cb-mono">visibility: &quot;public&quot;</code>{" "}
            to render here.”
          </blockquote>
          <figcaption className="cb-pullquote__attr">
            — Dev placeholder · cb-site-kit
          </figcaption>
        </figure>
      );
    }
    return null;
  }

  const attribution = [t.name, t.role, t.org].filter(Boolean).join(" · ");

  return (
    <figure className="cb-pullquote">
      <blockquote className="cb-quote">“{t.quote}”</blockquote>
      <figcaption className="cb-pullquote__attr">— {attribution}</figcaption>
    </figure>
  );
}
