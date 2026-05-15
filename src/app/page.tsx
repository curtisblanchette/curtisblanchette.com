import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { WorkGrid } from "@/components/work-grid";
import { Timeline } from "@/components/timeline";
import { StackGrid } from "@/components/stack-grid";
import { OffHours } from "@/components/off-hours";
import { WritingList } from "@/components/writing-list";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section id="work" number="01" title="Selected Work" meta="2024 → 2025">
        <p className="max-w-2xl text-sm text-muted leading-relaxed mb-10">
          A working portfolio. Public open-source on top; client engagements
          shown with role and scope but scrubbed of identifying client detail
          where required.
        </p>
        <WorkGrid />
      </Section>

      <Section id="writing" number="02" title="Writing" meta="Essays + Medium">
        <WritingList />
      </Section>

      <Section id="stack" number="03" title="Stack & Practice">
        <StackGrid />
      </Section>

      <Section id="career" number="04" title="Career">
        <Timeline />
      </Section>

      <Section id="off-hours" number="05" title="Off Hours">
        <p className="max-w-2xl text-sm text-muted leading-relaxed mb-8">
          The substrate. What I make and do when nobody&apos;s paying for it.
        </p>
        <OffHours />
      </Section>

      <Section id="contact" number="06" title="Contact" meta="Open inbox">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            <p className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
              I&apos;m always up for a real conversation about hard problems —
              especially the AI-native ones the rest of the industry hasn&apos;t
              named yet.
            </p>
            <p className="mt-4 text-sm text-muted max-w-2xl leading-relaxed">
              No agencies pitching. No recruiters. Founders, engineering
              leaders, fellow operators — please reach out.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.18em]">
              <a
                href="mailto:hello@curtisblanchette.com"
                className="invert-on-hover border border-accent bg-accent text-bg px-4 py-2.5"
              >
                ▸ hello@curtisblanchette.com
              </a>
              <a
                href="https://linkedin.com/in/curtisblanchette"
                target="_blank"
                rel="noreferrer"
                className="invert-on-hover border border-line px-4 py-2.5"
              >
                ▸ LinkedIn
              </a>
              <a
                href="https://github.com/curtisblanchette"
                target="_blank"
                rel="noreferrer"
                className="invert-on-hover border border-line px-4 py-2.5"
              >
                ▸ GitHub
              </a>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="border border-line p-5 text-[12px]">
              <div className="text-[10px] uppercase tracking-[0.22em] text-accent mb-3">
                Now
              </div>
              <ul className="space-y-2 text-muted leading-relaxed">
                <li>
                  <span className="text-fg">▸ Working</span> — Leading
                  engineering on confidential AI-native client engagements at
                  Metalab.
                </li>
                <li>
                  <span className="text-fg">▸ Building</span> — Mycelium /
                  Cortex MPC. ESP32 + Pi 5 + Ollama in a real grow chamber.
                </li>
                <li>
                  <span className="text-fg">▸ Writing</span> — Continuing the{" "}
                  <em>Quiet Trade</em> thread: judgment as a priced layer.
                </li>
                <li>
                  <span className="text-fg">▸ Listening</span> — 7-string
                  drop-tuned riffs. REAPER open most evenings.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
