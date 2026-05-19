import Link from "next/link";
import { Section } from "@/components/section";
import { HeroManifesto } from "@/components/hero/hero-manifesto";

export default function NotFound() {
  return (
    <>
      <HeroManifesto
        num="404"
        numLabel="Page not found"
        statement={{
          before: "That path doesn't ",
          italic: "exist",
          after: " — yet.",
        }}
      />
      <Section variant="sm" hairline container="medium">
        <p className="cb-body-lg" style={{ color: "var(--fg-2)" }}>
          If you followed a link, it&apos;s probably my fault. Try the home
          page, or get in touch and tell me what was supposed to be here.
        </p>
        <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/" className="cb-btn cb-btn--ghost">
            ← Home
          </Link>
          <a
            href="mailto:hello@curtisblanchette.com"
            className="cb-btn cb-btn--ghost"
          >
            hello@curtisblanchette.com <span className="cb-arrow">↗</span>
          </a>
        </div>
      </Section>
    </>
  );
}
