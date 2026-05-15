/**
 * Work / case-study index. Each entry can:
 *   - link to an internal MDX case study (slug)
 *   - link out to a public repo or live URL
 *   - be tagged `confidential` to suppress client names & details
 */

export type WorkVisibility = "public" | "client-anon" | "internal";

export type WorkItem = {
  slug: string;
  title: string;
  client: string;
  role: string;
  year: string;
  summary: string;
  tags: string[];
  visibility: WorkVisibility;
  featured?: boolean;
  links?: { label: string; href: string }[];
  /** Path to a hero image under /public, optional. */
  cover?: string;
};

export const WORK: WorkItem[] = [
  {
    slug: "the-atlantic-labs",
    title: "The Atlantic Labs",
    client: "The Atlantic × Metalab",
    role: "Engineering Lead",
    year: "2024–2025",
    summary:
      "A multi-year AI sandbox engagement running a portfolio of editorial-AI experiments under one umbrella. Shared retrieval infrastructure, a Turborepo experiment harness, a CI/CD pipeline tuned for rapid experiment turnover, and an editorial control surface used across every wrapper and shipped product — including The Atlantic Take.",
    tags: ["AI Sandbox", "Turborepo", "AWS", "RAG", "Editorial AI", "CI/CD"],
    visibility: "public",
    featured: true,
    cover: "/images/atlantic/home.png",
  },
  {
    slug: "mycelium",
    title: "Mycelium",
    client: "Personal R&D",
    role: "Architect & Engineer",
    year: "2025",
    summary:
      "Open-source framework for AI-powered IoT systems. ESP32 devices publish telemetry over MQTT to a local Cortex backend running an MPC controller plus Ollama LLM interpreter. Same device capability declaration drives the dashboard and the optimizer.",
    tags: ["ESP32", "MicroPython", "MQTT", "FastAPI", "Ollama", "React"],
    visibility: "public",
    cover: "/images/work/mycelium.svg",
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
    client: "Personal R&D",
    role: "Architect & Engineer",
    year: "2025",
    summary:
      "Grow-room Model Predictive Control. 7-state ODE physics model with OSQP-based convex QP solver, Extended Kalman Filter state estimation, and a modular actuator plugin architecture. Sub-100ms solves on a Pi 5; deterministic simulation on any laptop.",
    tags: ["Python", "OSQP", "EKF", "FastAPI", "Control Systems"],
    visibility: "public",
    cover: "/images/work/cortex.svg",
  },
  {
    slug: "graphify-rs",
    title: "graphify-rs",
    client: "Open Source",
    role: "Maintainer",
    year: "2025",
    summary:
      "A Rust rewrite of the AI knowledge-graph builder. Drops papers, code, notes, and screenshots into a /raw folder and produces a queryable, audited graph — every edge tagged EXTRACTED, INFERRED, or AMBIGUOUS so facts and guesses are never confused.",
    tags: ["Rust", "Knowledge Graphs", "CLI", "LLM Tooling"],
    visibility: "public",
    cover: "/images/work/graphify.svg",
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
    client: "Open Source",
    role: "Author",
    year: "2025",
    summary:
      "Personal extensions for the Pi.dev coding-agent harness. /commit and /commit-pr stage, write conventional commits, push, and open draft PRs from one TUI. /prs browses open PRs, inspects CI, runs review workflows, and explains failures.",
    tags: ["TypeScript", "TUI", "GitHub CLI", "AI Tooling"],
    visibility: "public",
    cover: "/images/work/pi.svg",
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
    client: "Confidential client · Metalab",
    role: "Engineering Lead",
    year: "2024",
    summary:
      "Consumer + practitioner platform for personalized longevity risk assessment. React Native mobile + web on Tamagui, NestJS backend, Vertex AI RAG over a clinical-evidence corpus, and a rules engine for risk-area severity scoring.",
    tags: ["React Native", "Tamagui", "NestJS", "Vertex RAG", "Turborepo"],
    visibility: "client-anon",
    cover: "/images/work/longevity.svg",
  },
  {
    slug: "workflow-orchestration",
    title: "Workflow Orchestration Platform",
    client: "Confidential client · Metalab",
    role: "Backend Lead",
    year: "2024",
    summary:
      "Enterprise workflow API with task containers, schema-driven orchestration, and OCR pipelines. Multi-tenant, multi-environment, with a Postman-driven contract test suite and a generated client SDK shipped with each release.",
    tags: ["NestJS", "OpenAPI", "Postman", "AWS ECS", "Prisma"],
    visibility: "client-anon",
    cover: "/images/work/workflow.svg",
  },
  {
    slug: "credential-verification",
    title: "Verifiable Credential Platform",
    client: "Confidential client · Metalab",
    role: "Tech Lead",
    year: "2025",
    summary:
      "Employment-credential issuance and verification using SD-JWT and the walt.id stack. Employees hold credentials in a wallet and disclose selectively to verifiers. Express 5 API, two React portals, AWS ECS Fargate in production.",
    tags: ["SD-JWT", "walt.id", "Express", "ECS Fargate", "Identity"],
    visibility: "client-anon",
    cover: "/images/work/credentials.svg",
  },
  {
    slug: "figma-mcp-core",
    title: "Figma MCP Core",
    client: "Metalab",
    role: "Engineer",
    year: "2025",
    summary:
      "Secure MCP layer between AI assistants and Figma. Three-layer architecture: an AI-guarded proxy, scoped credentials, and request validation. Keeps API keys off user machines and detects malicious patterns before they hit the design API.",
    tags: ["MCP", "Security", "TypeScript", "AI Tooling"],
    visibility: "internal",
    cover: "/images/work/figma-mcp.svg",
  },
  {
    slug: "librarian",
    title: "Librarian",
    client: "Metalab",
    role: "Contributor",
    year: "2025",
    summary:
      "Encodes Metalab's collective development experience as reusable guidance for AI coding assistants: 25+ skills across core, workflow, backend, frontend, infra, and CI/CD; a delivery workflow with Linear integration and human review gates; and stack-decision rules.",
    tags: ["AI Coding", "Skills", "Process", "Claude Code"],
    visibility: "internal",
    cover: "/images/work/librarian.svg",
  },
  {
    slug: "omakase-stack",
    title: "Omakase Stack",
    client: "Metalab",
    role: "Engineer",
    year: "2025",
    summary:
      "CLI scaffolding tool that bootstraps projects with Metalab's curated patterns. AI-powered version intelligence, a template library for web / mobile / API, and an operations playbook — collapsing multi-sprint setup into a single command.",
    tags: ["CLI", "Templates", "DX", "TypeScript"],
    visibility: "internal",
    cover: "/images/work/omakase.svg",
  },
];

export const FEATURED = WORK.filter((w) => w.featured);
export const NON_FEATURED = WORK.filter((w) => !w.featured);

export function getWork(slug: string) {
  return WORK.find((w) => w.slug === slug) ?? null;
}
