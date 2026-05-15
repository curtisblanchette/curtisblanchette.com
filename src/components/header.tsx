import Link from "next/link";

const NAV = [
  { href: "/", label: "INDEX" },
  { href: "/#work", label: "WORK" },
  { href: "/#writing", label: "WRITING" },
  { href: "/#stack", label: "STACK" },
  { href: "/#contact", label: "CONTACT" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[var(--color-bg)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-bg)]/80">
      {/* Terminal-style status bar */}
      <div className="hidden md:flex items-center gap-4 px-6 md:px-10 h-7 border-b border-line text-[10px] uppercase tracking-[0.2em] text-muted">
        <span className="text-accent">●</span>
        <span>STATUS: ONLINE</span>
        <span className="text-faint">│</span>
        <span>LOC: SALMON ARM, BC</span>
        <span className="text-faint">│</span>
        <span>UTC-07:00</span>
        <span className="flex-1" />
        <span>v1.0.0</span>
      </div>

      {/* Primary nav */}
      <div className="flex items-center justify-between px-6 md:px-10 h-14">
        <Link href="/" className="group flex items-center gap-3 text-sm">
          <span aria-hidden className="text-accent">▌</span>
          <span className="font-semibold tracking-tight">
            curtis.blanchette
          </span>
          <span className="hidden sm:inline text-muted">{"//"}</span>
          <span className="hidden sm:inline text-muted text-xs uppercase tracking-[0.18em]">
            Lead Software Engineer
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-[11px] uppercase tracking-[0.18em]">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2.5 py-1 border border-transparent hover:border-line hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
