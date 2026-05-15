# curtisblanchette.com

Personal site & working portfolio of **Curtis Blanchette** — Lead Software Engineer at Metalab.

Brutalist, mono, dark. 100% IBM Plex Mono, 1px borders, no rounded corners, one accent.

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

## Layout

```
src/
├── app/
│   ├── layout.tsx               # site chrome (Header + Footer)
│   ├── page.tsx                 # home (composes all sections)
│   ├── globals.css              # brutalist design tokens via @theme
│   ├── sitemap.ts
│   ├── not-found.tsx
│   ├── work/[slug]/page.tsx     # case study route
│   └── writing/[slug]/page.tsx  # essay route
├── components/
│   ├── header.tsx · footer.tsx
│   ├── hero.tsx
│   ├── section.tsx              # SectionHeader, Section, AsciiRule, FieldRow
│   ├── crosshair.tsx
│   ├── work-grid.tsx
│   ├── timeline.tsx
│   ├── stack-grid.tsx
│   ├── off-hours.tsx
│   └── writing-list.tsx
├── content/
│   ├── data/                    # work · career · stack · hobbies (TS data)
│   ├── work/*.mdx               # case-study long-form
│   └── writing/*.mdx            # essays
└── lib/
    ├── content.ts               # MDX loader
    └── medium.ts                # Medium RSS fetcher
```

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
