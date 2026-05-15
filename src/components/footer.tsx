import { AsciiRule } from "./section";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-line px-6 md:px-10 py-10 text-xs">
      <div className="mx-auto max-w-6xl">
        <AsciiRule />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-muted">
          <div>
            <div className="text-fg uppercase tracking-[0.18em] mb-2">
              © {year} Curtis Blanchette
            </div>
            <p className="leading-relaxed">
              Built with Next.js, Tailwind CSS, and a deliberate refusal of
              rounded corners.
            </p>
          </div>
          <div>
            <div className="text-fg uppercase tracking-[0.18em] mb-2">
              Elsewhere
            </div>
            <ul className="space-y-1">
              <li>
                <a
                  href="https://github.com/curtisblanchette"
                  target="_blank"
                  rel="noreferrer"
                  className="link-accent"
                >
                  github.com/curtisblanchette
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/curtisblanchette"
                  target="_blank"
                  rel="noreferrer"
                  className="link-accent"
                >
                  linkedin.com/in/curtisblanchette
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/@curtis.blanchette"
                  target="_blank"
                  rel="noreferrer"
                  className="link-accent"
                >
                  medium.com/@curtis.blanchette
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-fg uppercase tracking-[0.18em] mb-2">
              Contact
            </div>
            <a
              href="mailto:hello@curtisblanchette.com"
              className="link-accent"
            >
              hello@curtisblanchette.com
            </a>
            <p className="mt-3 text-faint leading-relaxed">
              No agencies. No recruiters. Real conversations welcome.
            </p>
          </div>
        </div>
        <AsciiRule className="mt-8" />
      </div>
    </footer>
  );
}
