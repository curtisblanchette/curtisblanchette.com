import { CAREER } from "@/content/data/career";

export function Timeline() {
  return (
    <ol className="relative border-l border-line ml-2">
      {CAREER.map((entry, i) => (
        <li
          key={i}
          className="relative pl-6 md:pl-10 pb-10 last:pb-0"
        >
          <span
            aria-hidden
            className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-accent"
          />
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted">
            {entry.start} → {entry.end} · {entry.location}
          </div>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-lg font-semibold tracking-tight">
              {entry.role}
            </h3>
            <span className="text-muted">@</span>
            {entry.href ? (
              <a
                href={entry.href}
                target="_blank"
                rel="noreferrer"
                className="link-accent text-fg"
              >
                {entry.company}
              </a>
            ) : (
              <span>{entry.company}</span>
            )}
          </div>
          <ul className="mt-3 space-y-1.5 text-sm text-muted leading-relaxed">
            {entry.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span aria-hidden className="text-accent">▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
