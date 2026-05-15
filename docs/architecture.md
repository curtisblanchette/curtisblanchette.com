# Architecture

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15** (App Router) | RSC + static generation. `next start` for production. |
| Runtime | **React 19** | Strict element validation — see [Gotchas](#gotchas). |
| Styling | **Tailwind CSS v4** | CSS-first config via `@theme` in `src/app/globals.css`. No `tailwind.config.js`. |
| Type system | **TypeScript 5.7**, strict | Path alias `@/*` → `src/*`. |
| Content | **Markdown / MDX** (frontmatter) | Rendered server-side via `unified` + `remark-gfm` + `rehype-pretty-code`. Not via a React-component MDX runtime — see [Gotchas](#gotchas). |
| Code highlighting | **Shiki** (`github-dark-dimmed`) | Via `rehype-pretty-code`. |
| External feed | **Medium RSS** | `fast-xml-parser` against `medium.com/feed/@curtis.blanchette`. 4-hour revalidation. Tolerates failure. |
| Lint | `next lint` (ESLint) | Zero warnings policy. |
| Package manager | **pnpm 9** | Lockfile committed. |
| Deploy target | Vercel (free tier) or any Node 20+ runtime | Deferred per project decision. |

## Folder layout

```
src/
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # site chrome (Header + Footer + metadata)
│   ├── page.tsx                    # home — composes every section
│   ├── globals.css                 # design tokens via @theme + prose styles
│   ├── sitemap.ts                  # /sitemap.xml
│   ├── not-found.tsx               # /404
│   ├── work/[slug]/page.tsx        # case study route (SSG)
│   └── writing/[slug]/page.tsx     # essay route (SSG)
│
├── components/
│   ├── header.tsx · footer.tsx     # global chrome
│   ├── hero.tsx                    # portrait + statement + ticker
│   ├── section.tsx                 # SectionHeader, Section, AsciiRule, FieldRow
│   ├── crosshair.tsx               # `+` corner markers (placed inside .relative)
│   ├── work-grid.tsx               # FEATURED card + work grid
│   ├── timeline.tsx                # career rail
│   ├── stack-grid.tsx              # tech stack + receipts
│   ├── off-hours.tsx               # current hobby tiles
│   └── writing-list.tsx            # local MDX + Medium feed side-by-side
│
├── content/
│   ├── data/                       # TS data — drives nav/listings/SEO
│   │   ├── work.ts                 # case-study index (id → metadata)
│   │   ├── career.ts               # timeline entries
│   │   ├── stack.ts                # stack groups + accreditations
│   │   └── hobbies.ts              # off-hours blurbs
│   ├── work/*.mdx                  # long-form case studies
│   └── writing/*.mdx               # essays
│
└── lib/
    ├── content.ts                  # MDX loader + unified pipeline
    └── medium.ts                   # RSS fetcher (fail-safe)
```

## Data flow

```
                  ┌─────────────────────────────────────┐
                  │  src/content/data/*.ts              │
                  │  (typed, hand-authored data)        │
                  └──┬──────────────────────────────────┘
                     │
   ┌─────────────────┼─────────────────────────┐
   │                 │                         │
   ▼                 ▼                         ▼
home/page.tsx   work/[slug]/page.tsx     writing/[slug]/page.tsx
   │                 │                         │
   │                 │ generateStaticParams    │ generateStaticParams
   │                 │ pulls slugs from WORK[] │ pulls slugs from listMdx()
   │                 │                         │
   │                 ▼                         ▼
   │           lib/content.ts ◀──── src/content/work/*.mdx
   │           ─────────────       src/content/writing/*.mdx
   │           unified + remark-gfm
   │           + rehype-pretty-code → raw HTML
   │
   ▼
WritingList.tsx ──► lib/medium.ts (RSS, 4h revalidate)
```

**Key invariant:** every case study has **two** sources:
1. An entry in `src/content/data/work.ts` (metadata, tags, visibility, cover image, links).
2. An optional `src/content/work/<slug>.mdx` (long-form body).

If the MDX is missing, the slug page renders the in-progress placeholder. Either way the metadata controls the listing card on `/`.

## Routes (current)

| Route | Render | Source |
|---|---|---|
| `/` | static | composes all sections from `data/*.ts` + Medium feed |
| `/work/[slug]` | SSG (params from `WORK[]`) | `data/work.ts` + `content/work/<slug>.mdx` |
| `/writing/[slug]` | SSG (params from MDX dir) | `content/writing/<slug>.mdx` |
| `/sitemap.xml` | static | `app/sitemap.ts` |
| `/robots.txt` | static | `public/robots.txt` |
| `/404` | static | `app/not-found.tsx` |

## Build pipeline

1. `pnpm build` → `next build`
2. Static-params resolution: `WORK[]` and the writing MDX directory listing both contribute slugs.
3. Each slug's page reads its MDX (`gray-matter` for frontmatter, `unified` for body → HTML string).
4. Output prerendered to `.next/server/app/...html`.
5. `next start` serves the prerendered HTML directly. No request-time MDX compilation.

## Gotchas

- **React 19 ↔ MDX-runtime crash.** `next-mdx-remote` and `next-mdx-remote-client` both produce a `MDXContent` wrapper component that fails React 19's element-identity validation in production (`Cannot set properties of undefined (setting 'validated')`). We deliberately skip the MDX runtime and compile markdown → HTML server-side via `unified`/`remark`/`rehype`. If you ever need JSX inside MDX, the workaround is to bake the JSX as a custom React component imported from the page, not rendered from inside the MDX module.

- **Multiple lockfiles at $HOME.** A `package-lock.json` at `~/` was confusing Next's workspace-root inference. Fixed via `outputFileTracingRoot` in `next.config.mjs`.

- **Stale `.next` between schema changes.** When renaming/removing case-study slugs, prerendered HTML can linger on disk. Always `rm -rf .next` before a verification build if you renamed or deleted slugs.

- **Zombie dev/start processes.** A `next start` that survives a terminal close will keep serving an older build on port 3000. Use `pkill -9 -f next-server` if dev acts haunted.

- **Medium feed can be empty.** RSS returns the channel header even when there are no items. The fetcher returns `[]` and the UI shows a graceful "feed offline" placeholder.

- **Force-pushed history is not gone immediately.** GitHub keeps unreachable commits accessible by direct SHA URL for ~90 days. The only immediate purge is repo-delete-then-recreate. If you ever amend something sensitive, delete + recreate (cheap because the repo has no forks/stars to lose).

## Branch strategy

Trunk-based on `main`. Force-push allowed during initial setup; once content stabilizes, switch to PR-only.
