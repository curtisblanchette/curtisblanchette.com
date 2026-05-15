# curtisblanchette.com

Personal site & working portfolio of **Curtis Blanchette** — Lead Software Engineer at Metalab.

Brutalist, mono, dark. 100% IBM Plex Mono, 1px borders, no rounded corners, one accent.

> **Working on this project?** Start in [`docs/`](./docs/README.md) — architecture, design system, content model, and the active roadmap all live there.

```
   ┌─────────────────────────────────────────────────────────┐
   │  STATUS: ONLINE · LOC: KELOWNA, BC · UTC-07:00          │
   ├─────────────────────────────────────────────────────────┤
   │  [ 01 ] / SELECTED WORK                                 │
   │  [ 02 ] / WRITING                                       │
   │  [ 03 ] / STACK & PRACTICE                              │
   │  [ 04 ] / CAREER                                        │
   │  [ 05 ] / OFF HOURS                                     │
   │  [ 06 ] / CONTACT                                       │
   └─────────────────────────────────────────────────────────┘
```

## Stack

| | |
|---|---|
| Framework | Next.js 15 · App Router · React 19 |
| Styling | Tailwind CSS v4 (CSS-first config via `@theme`) |
| Content | MDX via `next-mdx-remote/rsc` + `gray-matter` |
| Code blocks | `rehype-pretty-code` + Shiki (`github-dark-dimmed`) |
| Medium feed | `fast-xml-parser` against `medium.com/feed/@curtis.blanchette` |
| Hosting | Vercel (or any Node 20+ runtime) |

No CSS-in-JS. No component library. No animation library. Brutalist primitives only.

## Run

```bash
pnpm install
pnpm dev      # → http://localhost:3000
pnpm build    # static + RSC build
pnpm start    # serve production build
```

Node 20+ required. The site builds without env vars — `MEDIUM_USERNAME` defaults to `curtis.blanchette`.

## Layout (top-level)

```
curtisblanchette.com/
├── docs/                          # internal documentation — START HERE
│   ├── README.md                  # index
│   ├── architecture.md            # how the site is wired
│   ├── design-system.md           # brutalist tokens, primitives, dos/don'ts
│   ├── content.md                 # data model + author workflow
│   ├── roadmap.md                 # what's next
│   └── plans/                     # implementation plans for upcoming work
│
├── raw/                           # local-only drop zone for source material
│   └── README.md                  # convention; contents gitignored
│
├── public/                        # static assets shipped with the build
│
└── src/
    ├── app/                       # Next.js App Router routes
    ├── components/                # brutalist primitives
    ├── content/                   # MDX + TS data files
    └── lib/                       # content + medium
```

For detailed maps of `src/` and the data flow, see [`docs/architecture.md`](./docs/architecture.md).

## Adding content

### A case study

1. Add an entry to `src/content/data/work.ts`.
2. Create `src/content/work/<slug>.mdx` with matching frontmatter.
3. Done — it appears on `/` and at `/work/<slug>` automatically.

Visibility modes:

- `public` — open-source, freely discussed
- `client-anon` — client name & identifying detail scrubbed; scope and stack shown
- `internal` — Metalab-internal initiatives

### An essay

Drop a new `src/content/writing/<slug>.mdx` with frontmatter (`title`, `description`, `date`, `tags`). Live posts on `/` are sorted by `date` descending; `draft: true` hides them.

## Design tokens

Defined once in `src/app/globals.css` via Tailwind v4 `@theme`:

| Token | Value |
|---|---|
| `--color-bg` | `#0a0a0a` |
| `--color-fg` | `#fafafa` |
| `--color-muted` | `#737373` |
| `--color-faint` | `#404040` |
| `--color-line` | `#262626` |
| `--color-accent` | `#ff5500` |
| `--font-mono` | IBM Plex Mono (Google Fonts) + system mono fallbacks |

## License

Source code: MIT. Content (essays, case studies, photos): © Curtis Blanchette, all rights reserved.
