/**
 * Work / case-study index. Each entry can:
 *   - link to an internal MDX case study (slug)
 *   - link out to a public repo or live URL
 *   - be tagged `confidential` to suppress client names & details
 *
 * Covers are theme-aware React components registered under
 * `src/components/covers/`. The `cover` map is consulted by
 * `<ProjectCard>` keyed on slug. When a real screenshot exists (e.g.
 * `the-atlantic-labs`), pass `coverImage` instead — the card prefers
 * the screenshot.
 */

export type WorkVisibility = "public" | "client-anon" | "internal";

export type WorkItem = {
  slug: string;
  title: string;
  /** Optional Eiko italic word inside the title (for cb-project-row). */
  italic?: string;
  client: string;
  role: string;
  year: string;
  summary: string;
  tags: string[];
  visibility: WorkVisibility;
  featured?: boolean;
  links?: { label: string; href: string }[];
  /** Path to a real screenshot under /public, optional. When set, the
   *  ProjectCard renders <img> instead of the slug-keyed SVG cover. */
  coverImage?: string;
  /** Optional hero-video path (under /public) rendered at the top of
   *  the article page, beneath the manifesto hero and above the meta
   *  strip. The `coverImage` (if set) becomes the poster frame so
   *  first paint isn't blank. */
  heroVideo?: string;
};

export const WORK: WorkItem[] = [
  {
    slug: "the-atlantic-labs",
    title: "Atlantic Companion",
    italic: "Companion",
    client: "The Atlantic × Metalab",
    role: "Engineering Lead",
    year: "2024–2025",
    summary:
      "An auth-gated AI assistant for The Atlantic that finds articles spanning 100+ years of publication. Conversational discovery over the magazine's full historical archive — RAG-backed retrieval, editorial-curated ranking, and tuned for context (what you're reading now vs. what's worth reading from 1932). Shipped from the Zeitgeist experiment inside a Turborepo monorepo of editorial-AI prototypes under the Atlantic Labs umbrella, with shared retrieval infrastructure and a CI/CD pipeline tuned for rapid iteration.",
    tags: [
      "RAG",
      "Conversational AI",
      "Atlantic Archive",
      "Turborepo",
      "AWS",
      "Editorial AI",
    ],
    visibility: "public",
    featured: true,
    coverImage: "/images/atlantic/home.png",
    heroVideo: "/images/atlantic/hero.mp4",
    links: [
      {
        label: "labs.theatlantic.com",
        href: "https://labs.theatlantic.com",
      },
      {
        label: "metalab.com/work/the-atlantic",
        href: "https://www.metalab.com/work/the-atlantic",
      },
    ],
  },
  {
    slug: "mycelium",
    title: "Mycelium",
    italic: "framework",
    client: "Personal R&D",
    role: "Architect & Engineer",
    year: "2025",
    summary:
      "Open-source framework for frictionless IoT — ESP32 devices self-register on the network and become controllable by natural-language voice. Nodes publish a capability declaration over MQTT; a local FastAPI hub exposes them to an LLM (Ollama) plus STT/TTS, so the same structured intent drives chat, voice, and the dashboard. One device file, no frontend changes to add hardware.",
    tags: [
      "ESP32",
      "MicroPython",
      "MQTT",
      "FastAPI",
      "Ollama",
      "Voice UI",
    ],
    visibility: "public",
    links: [
      {
        label: "github.com/curtisblanchette/mycelium",
        href: "https://github.com/curtisblanchette/mycelium",
      },
    ],
  },
  {
    slug: "cortex",
    title: "Cortex MPC",
    italic: "control",
    client: "Personal R&D",
    role: "Architect & Engineer",
    year: "2025",
    summary:
      "Grow-room Model Predictive Control. 7-state ODE physics model with OSQP-based convex QP solver, Extended Kalman Filter state estimation, and a modular actuator plugin architecture. Sub-100ms solves on a Pi 5; deterministic simulation on any laptop.",
    tags: ["Python", "OSQP", "EKF", "FastAPI", "Control Systems"],
    visibility: "public",
  },
  {
    slug: "graphify-rs",
    title: "graphify-rs",
    italic: "graph",
    client: "Open Source",
    role: "Maintainer",
    year: "2025",
    summary:
      "A Rust rewrite of the AI knowledge-graph builder. Drops papers, code, notes, and screenshots into a /raw folder and produces a queryable, audited graph — every edge tagged EXTRACTED, INFERRED, or AMBIGUOUS so facts and guesses are never confused.",
    tags: ["Rust", "Knowledge Graphs", "CLI", "LLM Tooling"],
    visibility: "public",
    links: [
      {
        label: "github.com/curtisblanchette/graphify-rs",
        href: "https://github.com/curtisblanchette/graphify-rs",
      },
    ],
  },
  {
    slug: "pi-extensions",
    title: "Pi Extensions",
    italic: "extensions",
    client: "Open Source",
    role: "Author",
    year: "2025",
    summary:
      "Personal extensions for the Pi.dev coding-agent harness. /commit and /commit-pr stage, write conventional commits, push, and open draft PRs from one TUI. /prs browses open PRs, inspects CI, runs review workflows, and explains failures.",
    tags: ["TypeScript", "TUI", "GitHub CLI", "AI Tooling"],
    visibility: "public",
    links: [
      {
        label: "github.com/curtisblanchette/pi-extensions",
        href: "https://github.com/curtisblanchette/pi-extensions",
      },
    ],
  },
  {
    slug: "longevity-platform",
    title: "Longevity Risk Platform",
    italic: "risk",
    client: "Confidential client · Metalab",
    role: "Engineering Lead",
    year: "2024",
    summary:
      "Consumer + practitioner platform for personalized longevity risk assessment. React Native mobile + web on Tamagui, NestJS backend, Vertex AI RAG over a clinical-evidence corpus, and a rules engine for risk-area severity scoring.",
    tags: ["React Native", "Tamagui", "NestJS", "Vertex RAG", "Turborepo"],
    visibility: "client-anon",
  },
  {
    slug: "workflow-orchestration",
    title: "Workflow Orchestration Platform",
    italic: "orchestration",
    client: "Confidential client · Metalab",
    role: "Backend Lead",
    year: "2024",
    summary:
      "Enterprise workflow API with task containers, schema-driven orchestration, and OCR pipelines. Multi-tenant, multi-environment, with a Postman-driven contract test suite and a generated client SDK shipped with each release.",
    tags: ["NestJS", "OpenAPI", "Postman", "AWS ECS", "Prisma"],
    visibility: "client-anon",
  },
  {
    slug: "credential-verification",
    title: "Verifiable Credential Platform",
    italic: "credentials",
    client: "Confidential client · Metalab",
    role: "Tech Lead",
    year: "2025",
    summary:
      "Employment-credential issuance and verification using SD-JWT and the walt.id stack. Employees hold credentials in a wallet and disclose selectively to verifiers. Express 5 API, two React portals, AWS ECS Fargate in production.",
    tags: ["SD-JWT", "walt.id", "Express", "ECS Fargate", "Identity"],
    visibility: "client-anon",
  },
  {
    slug: "figma-mcp-core",
    title: "Figma MCP Core",
    italic: "secure",
    client: "Metalab",
    role: "Engineer",
    year: "2025",
    summary:
      "Secure MCP layer between AI assistants and Figma. Three-layer architecture: an AI-guarded proxy, scoped credentials, and request validation. Keeps API keys off user machines and detects malicious patterns before they hit the design API.",
    tags: ["MCP", "Security", "TypeScript", "AI Tooling"],
    visibility: "internal",
  },
  {
    slug: "librarian",
    title: "Librarian",
    italic: "skills",
    client: "Metalab",
    role: "Contributor",
    year: "2025",
    summary:
      "Encodes Metalab's collective development experience as reusable guidance for AI coding assistants: 25+ skills across core, workflow, backend, frontend, infra, and CI/CD; a delivery workflow with Linear integration and human review gates; and stack-decision rules.",
    tags: ["AI Coding", "Skills", "Process", "Claude Code"],
    visibility: "internal",
  },
  {
    slug: "omakase-stack",
    title: "Omakase Stack",
    italic: "scaffold",
    client: "Metalab",
    role: "Engineer",
    year: "2025",
    summary:
      "CLI scaffolding tool that bootstraps projects with Metalab's curated patterns. AI-powered version intelligence, a template library for web / mobile / API, and an operations playbook — collapsing multi-sprint setup into a single command.",
    tags: ["CLI", "Templates", "DX", "TypeScript"],
    visibility: "internal",
  },
];

export const FEATURED = WORK.filter((w) => w.featured);
export const NON_FEATURED = WORK.filter((w) => !w.featured);

export function getWork(slug: string) {
  return WORK.find((w) => w.slug === slug) ?? null;
}
