/**
 * Stack & tools — drives the `cb-stack` block on the home page.
 *
 * Each group renders as one `cb-stack__group` card. Items render as
 * `<li>{name} <span>{note}</span></li>`. Notes are short, punchy, and
 * specific — they are the "voice" of the section. Empty `note` is fine.
 */

export type StackItem = { name: string; note?: string };

export type StackGroup = {
  label: string;
  items: StackItem[];
};

export const STACK: StackGroup[] = [
  {
    label: "languages I reach for",
    items: [
      { name: "TypeScript",  note: "everywhere" },
      { name: "Python",      note: "AI, data, control" },
      { name: "Rust",        note: "latency-critical" },
      { name: "Java",        note: "enterprise stints" },
      { name: "Bash",        note: "too much, probably" },
      { name: "SQL",         note: "fluent · Postgres" },
    ],
  },
  {
    label: "platforms & infra",
    items: [
      { name: "Postgres",    note: "the one true DB" },
      { name: "Redis",       note: "queues, caches" },
      { name: "AWS",         note: "ECS · CDK · S3" },
      { name: "GCP",         note: "Vertex RAG" },
      { name: "Terraform",   note: "infra as code" },
      { name: "Vercel",      note: "edge + RSC" },
    ],
  },
  {
    label: "AI / ML tooling",
    items: [
      { name: "MCP",         note: "model context protocol" },
      { name: "Ollama",      note: "local LLMs" },
      { name: "Anthropic",   note: "Claude code + API" },
      { name: "Vertex RAG",  note: "vector retrieval" },
      { name: "Pi.dev",      note: "coding harness" },
      { name: "Shiki",       note: "syntax highlighting" },
    ],
  },
  {
    label: "IoT & control",
    items: [
      { name: "ESP32",       note: "MicroPython" },
      { name: "MQTT",        note: "telemetry spine" },
      { name: "OSQP",        note: "convex QP solver" },
      { name: "EKF",         note: "state estimation" },
      { name: "MPC",         note: "model predictive control" },
      { name: "FastAPI",     note: "control surface" },
    ],
  },
  {
    label: "frontend",
    items: [
      { name: "React 19",    note: "RSC + suspense" },
      { name: "Next.js 15",  note: "app router" },
      { name: "Tamagui",     note: "RN + web" },
      { name: "Tailwind",    note: "v4 CSS-first" },
      { name: "Angular",     note: "legacy carried" },
      { name: "MDX",         note: "long-form" },
    ],
  },
  {
    label: "how I work",
    items: [
      { name: "Trunk-based",    note: "small, frequent" },
      { name: "Design docs",    note: "before code" },
      { name: "RFCs",           note: "for the big stuff" },
      { name: "Review SLA",     note: "same day, always" },
      { name: "Senior-heavy",   note: "from day one" },
      { name: "On-call",        note: "fair rotations" },
    ],
  },
];

export const ACCREDITATIONS = [
  { icon: "▣", label: "10+ years engineering software at startup → enterprise scale" },
  { icon: "▶", label: "Open-source maintainer (Mycelium, graphify-rs, pi-extensions)" },
  { icon: "♪", label: "Releasing musician — original music on iTunes & Google Play" },
  { icon: "≋", label: "Competitive wakeboarder — Men's Cable Park (2019)" },
  { icon: "♟", label: "Tony Robbins UPW alumnus (2020)" },
  { icon: "◉", label: "Winner — Startup Weekend Okanagan (2014)" },
  { icon: "✎", label: "Diploma — Graphic Design / Web Development (2014)" },
];
