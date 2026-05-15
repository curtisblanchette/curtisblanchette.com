export type StackGroup = {
  label: string;
  items: string[];
};

export const STACK: StackGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "Python", "Rust", "JavaScript", "Java", "Bash"],
  },
  {
    label: "Frontend",
    items: [
      "React 19",
      "Next.js 15",
      "Tamagui",
      "React Native",
      "Tailwind CSS",
      "Angular",
      "MDX",
    ],
  },
  {
    label: "Backend",
    items: [
      "NestJS",
      "FastAPI",
      "Express",
      "Spring Boot",
      "GraphQL",
      "tRPC",
      "OpenAPI",
    ],
  },
  {
    label: "AI / ML",
    items: [
      "MCP",
      "Ollama",
      "Anthropic",
      "Vertex AI RAG",
      "LoRA",
      "Pi.dev",
      "Claude Code",
    ],
  },
  {
    label: "IoT / Control",
    items: [
      "ESP32",
      "MicroPython",
      "MQTT",
      "OSQP (QP solver)",
      "Extended Kalman Filter",
      "Model Predictive Control",
    ],
  },
  {
    label: "Data",
    items: [
      "PostgreSQL",
      "Redis",
      "SQLite",
      "DynamoDB",
      "MySQL",
      "MongoDB",
      "Prisma",
    ],
  },
  {
    label: "Infra / Cloud",
    items: [
      "AWS · ECS Fargate · CDK",
      "Terraform",
      "Docker",
      "GCP",
      "Vercel",
      "GitHub Actions",
    ],
  },
  {
    label: "Tooling",
    items: [
      "Turborepo",
      "pnpm",
      "Yarn 4",
      "Biome",
      "ESLint",
      "Shiki",
      "Storybook",
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
