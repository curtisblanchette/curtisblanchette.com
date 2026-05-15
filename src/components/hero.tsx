import Image from "next/image";
import { Crosshair } from "./crosshair";
import { FieldRow } from "./section";

export function Hero() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Portrait — brutalist framed */}
        <div className="md:col-span-4">
          <div className="relative border border-line bg-[#111]">
            <Crosshair />
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="/images/portrait.jpg"
                alt="Curtis Blanchette"
                fill
                priority
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover contrast-105"
              />
            </div>
            <div className="border-t border-line px-3 py-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted">
              <span>SUBJECT</span>
              <span className="text-fg">C. BLANCHETTE</span>
            </div>
          </div>

          {/* Spec sheet */}
          <div className="mt-6 border border-line p-4 text-[12px]">
            <FieldRow label="Role" value="Lead Software Engineer" />
            <FieldRow label="Org" value="Metalab" href="https://metalab.com" />
            <FieldRow label="Base" value="Kelowna, BC · CA" />
            <FieldRow label="Years" value="10+" />
            <FieldRow label="Status" value="Heads-down" />
          </div>
        </div>

        {/* Statement */}
        <div className="md:col-span-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-accent mb-6">
            {"//"} OPERATOR · ENGINEER · BUILDER
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[0.95] tracking-tight">
            Lead Software Engineer
            <br />
            at <span className="text-accent">Metalab</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-fg">
            I build judgment-priced software with the best tools in the industry
            to amplify it. AI tooling, IoT, and agency-grade systems.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted caret">
            Recent work spans an Atlantic recommendation lab, a longevity-risk
            platform, a grow-room MPC controller running on a Pi 5, and a fleet
            of MCP servers powering AI coding workflows.
          </p>

          {/* CTA row */}
          <div className="mt-10 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.18em]">
            <a
              href="#work"
              className="invert-on-hover border border-line px-4 py-2.5"
            >
              ▸ View Work
            </a>
            <a
              href="#writing"
              className="invert-on-hover border border-line px-4 py-2.5"
            >
              ▸ Read Writing
            </a>
            <a
              href="mailto:hello@curtisblanchette.com"
              className="invert-on-hover border border-accent bg-accent text-bg px-4 py-2.5"
            >
              ▸ Get in touch
            </a>
          </div>

          {/* Marquee ticker — stack */}
          <div className="mt-14 border border-line overflow-hidden">
            <div className="px-3 py-1.5 border-b border-line flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted">
              <span>STACK · LIVE FEED</span>
              <span className="text-accent">●</span>
            </div>
            <div className="relative overflow-hidden py-3">
              <div className="marquee-track flex gap-8 whitespace-nowrap text-xs text-muted">
                {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
                  <span key={i} className="shrink-0">
                    <span className="text-accent">▸</span> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const TICKER = [
  "TypeScript",
  "Rust",
  "Python",
  "React 19",
  "Next.js",
  "Tamagui",
  "React Native",
  "NestJS",
  "FastAPI",
  "MCP",
  "Ollama",
  "Anthropic",
  "Vertex AI",
  "PostgreSQL",
  "Redis",
  "SQLite",
  "DynamoDB",
  "AWS · CDK · ECS",
  "Terraform",
  "Docker",
  "Turborepo",
  "MQTT",
  "ESP32 · MicroPython",
  "OSQP · EKF",
  "Shiki",
  "Tailwind v4",
];
