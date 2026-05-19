import Link from "next/link";
import { NOW } from "@/content/data/now";

/**
 * Site footer. 4-column grid (brand · Site · Elsewhere · Colophon),
 * collapses to a single column under md. Direct port of
 * `docs/cb-site-kit/components/footer.html`.
 */
export function Footer() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  return (
    <footer className="cb-footer">
      <div className="cb-container cb-container--bleed">
        <div className="cb-footer__grid">
          <div className="cb-footer__brand">
            <p className="cb-footer__brand-name">Curtis Blanchette</p>
            <p className="cb-footer__brand-tag">
              Lead software engineer. Building the quiet parts.
            </p>
            <span
              className="cb-pill"
              style={{ alignSelf: "flex-start" }}
            >
              <i className="cb-dot" aria-hidden /> {NOW.statusPill}
            </span>
          </div>

          <div>
            <h3 className="cb-footer__heading">Site</h3>
            <ul className="cb-footer__list">
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/writing">Writing</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="cb-footer__heading">Elsewhere</h3>
            <ul className="cb-footer__list">
              <li>
                <a
                  href="https://github.com/curtisblanchette"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <span className="cb-arrow">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/curtisblanchette"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <span className="cb-arrow">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/@curtis.blanchette"
                  target="_blank"
                  rel="noreferrer"
                >
                  Medium <span className="cb-arrow">↗</span>
                </a>
              </li>
              <li>
                <a href="mailto:hello@curtisblanchette.com">
                  Email <span className="cb-arrow">↗</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="cb-footer__heading">Colophon</h3>
            <ul className="cb-footer__list">
              <li>
                <span
                  className="cb-mono"
                  style={{ fontSize: 14, color: "var(--fg-2)" }}
                >
                  Basis Grotesque Pro
                </span>
              </li>
              <li>
                <span
                  className="cb-mono"
                  style={{ fontSize: 14, color: "var(--fg-2)" }}
                >
                  PP Eiko
                </span>
              </li>
              <li>
                <span
                  className="cb-mono"
                  style={{ fontSize: 14, color: "var(--fg-2)" }}
                >
                  IBM Plex Mono
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="cb-footer__bottom">
          <span>© {year} — Curtis Blanchette</span>
          <span>
            v {year}.{month} · hand-built
          </span>
        </div>
      </div>
    </footer>
  );
}
