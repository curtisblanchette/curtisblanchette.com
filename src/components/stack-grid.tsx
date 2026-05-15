import { STACK, ACCREDITATIONS } from "@/content/data/stack";

export function StackGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
      <div className="md:col-span-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line">
          {STACK.map((group) => (
            <div
              key={group.label}
              className="bg-[#0a0a0a] p-5"
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-accent mb-3">
                {group.label}
              </div>
              <ul className="space-y-1 text-sm text-fg">
                {group.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span aria-hidden className="text-faint">▸</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-5">
        <div className="border border-line p-5 bg-[#0a0a0a]">
          <div className="text-[10px] uppercase tracking-[0.22em] text-accent mb-3">
            Receipts
          </div>
          <ul className="space-y-2 text-sm">
            {ACCREDITATIONS.map((a) => (
              <li key={a.label} className="flex gap-3">
                <span aria-hidden className="text-accent w-4 shrink-0">
                  {a.icon}
                </span>
                <span className="text-fg leading-snug">{a.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 border border-line p-5 bg-[#0a0a0a] text-sm text-muted leading-relaxed">
          <div className="text-[10px] uppercase tracking-[0.22em] text-accent mb-3">
            Working principles
          </div>
          <p>
            <span className="text-fg">Judgment over velocity.</span> The
            substrate work — first-pass research, bad rounds, refactors of
            systems you don&apos;t yet understand — is where every senior
            practitioner&apos;s judgment came from. Protect it on purpose.
          </p>
          <p className="mt-3">
            <span className="text-fg">Small focused teams.</span> Senior-heavy
            from day one. Ship, take feedback, iterate.
          </p>
          <p className="mt-3">
            <span className="text-fg">Right tools, not many tools.</span> AI
            amplifies judgment. It does not replace it. Both belong on the
            deliverable.
          </p>
        </div>
      </div>
    </div>
  );
}
