import { HOBBIES, type Hobby } from "@/content/data/hobbies";

const COLOR: Record<Hobby["category"], string> = {
  MUSIC: "text-accent",
  BUILD: "text-fg",
  OUTDOOR: "text-fg",
};

export function OffHours() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
      {HOBBIES.map((h) => (
        <div key={h.title} className="bg-[#0a0a0a] p-5">
          <div className="flex items-center justify-between">
            <span
              className={`text-[10px] uppercase tracking-[0.22em] ${COLOR[h.category]}`}
            >
              {h.category}
            </span>
            <span className="text-faint text-[10px]">▒▒</span>
          </div>
          <h3 className="mt-3 text-base font-semibold tracking-tight">
            {h.title}
          </h3>
          <p className="mt-2 text-sm text-muted leading-relaxed">{h.blurb}</p>
          {h.detail ? (
            <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-faint">
              {h.detail}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
