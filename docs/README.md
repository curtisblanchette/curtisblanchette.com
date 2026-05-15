# Docs

Internal docs for [curtisblanchette.com](https://github.com/curtisblanchette/curtisblanchette.com-v2). Written so anyone (future-Curtis, a fresh collaborator, or an AI coding agent) can pick this project up cold.

## Index

| File | Purpose |
|---|---|
| [`architecture.md`](./architecture.md) | How the site is wired. Routes, data flow, build pipeline, gotchas. |
| [`design-system.md`](./design-system.md) | Brutalist design tokens, primitives, dos and don'ts. |
| [`content.md`](./content.md) | Data model. How to add a case study, an essay, a hobby. |
| [`roadmap.md`](./roadmap.md) | What's next, prioritized. |
| [`plans/`](./plans/) | Detailed implementation plans for upcoming work. |

## Quick reference

```bash
pnpm install
pnpm dev          # → http://localhost:3000
pnpm build        # static + RSC build
pnpm start        # serve production build (use PORT=3030 etc. if needed)
pnpm typecheck    # tsc --noEmit
pnpm lint
```

## Active plans

1. [`plans/001-off-hours-expansion.md`](./plans/001-off-hours-expansion.md) — promote off-hours from blurb tiles to a full **CRAFT** content pillar covering construction, metal fabrication, go-karts, tree felling, skateboarding, dirt jumping. Fed by raw source material in `/raw` via a local synthesis tool.
