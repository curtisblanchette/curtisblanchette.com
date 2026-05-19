import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { NOW } from "@/content/data/now";

/**
 * Sticky 64px-tall navigation. Three-column grid: brand · centered
 * status pill · links + CTA + theme switcher.
 *
 * Direct port of `docs/cb-site-kit/components/site-nav.html`.
 */
export function Nav() {
  return (
    <nav className="cb-nav" aria-label="Primary">
      <div className="cb-nav__inner">
        <Link href="/" className="cb-nav__brand">
          <b>Curtis Blanchette</b>
          <span>— Lead software engineer</span>
        </Link>

        <div className="cb-nav__center">
          <span className="cb-pill">
            <i className="cb-dot" aria-hidden /> {NOW.statusPill}
          </span>
        </div>

        <div className="cb-nav__links">
          <Link href="/work">Work</Link>
          <Link href="/writing">Writing</Link>
          <a
            href="mailto:hello@curtisblanchette.com"
            className="cb-btn cb-btn--ghost cb-btn--sm"
          >
            Get in touch <span className="cb-arrow">↗</span>
          </a>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
