# Technical Implementation Plan

## 1. Objective

Replace the site's current "brutalist mono" visual system with the **cb-site-kit** editorial design system (`docs/cb-site-kit/`) across every page, while preserving the existing Next.js 15 / App Router architecture, MDX pipeline, and theme-switcher UX (rescoped to four kit accent themes).

**Success criteria:**
- Every page renders cleanly with kit components (`.cb-*`) and tokens (`--ink`, `--paper`, `--accent`, etc.).
- Three brand fonts (Basis Grotesque Pro, PP Eiko, IBM Plex Mono) self-hosted via `next/font`.
- Home page composition mirrors `docs/cb-site-kit/templates/home.html` exactly (hero-editorial → intro → selected work → pull quote → writing → stack on `cb-invert` → marquee → now → CTA). **No Career, no Off-hours on home.**
- `/work` and `/writing` are real routes with kit `hero-manifesto` + listings.
- `/work/[slug]` and `/writing/[slug]` use kit chrome + new `cb-prose`.
- Theme switcher exposes `sodium | amber | flame | index`; default `sodium`; legacy values auto-migrate.
- Every work cover is a kit-style **editorial SVG** rendered as a React component (theme-aware via `currentColor` + `var(--accent)`).
- One real **LinkedIn testimonial** lives in `src/content/data/testimonials.ts` and powers the home pull-quote.
- `prefers-reduced-motion` quiets every animation. Lighthouse a11y ≥ 95. `pnpm typecheck && pnpm lint && pnpm build` clean.

## 2. Inputs Reviewed

**Verified repo/docs:**
- `docs/cb-site-kit/{README.md, AGENTS.md, tokens.css, components.css}` + all 16 component HTMLs + all 4 templates + `fonts/`.
- `src/app/{layout.tsx, page.tsx, globals.css, sitemap.ts, not-found.tsx}`; `src/app/{work,writing}/[slug]/page.tsx`.
- All `src/components/*.tsx`; all `src/lib/*.ts`.
- All `src/content/data/*.ts` and existing MDX bodies under `src/content/{work,writing}`.
- `docs/{architecture.md, design-system.md, content.md, roadmap.md}`, `docs/plans/001-off-hours-expansion.md` (listed only — compatible, out of scope here).
- `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`.

**User decisions (this session):**
- D1: **full replacement** of the brutalist visual layer (no legacy fallback).
- D2: **keep theme switcher**, rescoped to 4 accent themes.
- Q3: **sodium** (`#A6E22E`) is the default accent.
- Q4: **real LinkedIn recommendation** powers the home pull-quote.
- Q5: marquee phrases use my defaults: `["AI tooling", "Editorial AI", "IoT & MPC", "Platform engineering", "Judgment over velocity"]`.
- Q6: **replace** existing SVG covers with kit-style editorial SVG **components**.
- Q7: **remove** Career and Off-hours from the home page.

**Vector RAG / Graphify:** not used — design system self-contained in `docs/cb-site-kit/`.

**Not available / assumed:**
- The exact text of the chosen LinkedIn recommendation — Curtis authors this into `src/content/data/testimonials.ts` (PLAN-021).
- PP Eiko license coverage — flagged as a pre-merge legal check (R2).

## 3. Current State / Stack Map

| Layer | Current |
|---|---|
| Framework | Next.js 15.1.6 · App Router · React 19 · TS 5.7 strict |
| Styling | Tailwind v4 (CSS-first `@theme`); `clsx` |
| Fonts | IBM Plex Mono only via Google Fonts CDN |
| Theming | `[data-theme]` on `<html>`, 4 full-palette modes (brutalist/paper/terminal/vapor), localStorage + pre-hydration script |
| Content | TS data (`work.ts`, `career.ts`, `stack.ts`, `hobbies.ts`) + MDX under `src/content/{work,writing}` |
| MDX pipeline | `unified` + `remark-gfm` + `rehype-pretty-code` (Shiki `github-dark-dimmed`) + `rehype-slug` + `rehype-stringify` (no React MDX runtime) |
| External | Medium RSS (`fast-xml-parser`), 4h revalidate, fail-safe |
| Routes | `/`, `/work/[slug]`, `/writing/[slug]`, `/sitemap.xml`, `/404` |
| Package mgr | pnpm 9.3.0 |
| Lint | `next lint` (ESLint 9), zero-warnings |
| Conventions | `@/*` → `src/*`; one accent; the brutalist primitives that this plan deletes (`prose-brutalist`, `text-fg/muted/faint/accent`, `bg-accent`, `border-line`, `invert-on-hover`, `link-accent`, `caret`). |

## 4. Decisions & Assumptions

| # | Decision | Rationale |
|---|---|---|
| D1 | **Full replacement** of the brutalist layer. | User-confirmed; `AGENTS.md` mandate. |
| D2 | **Theme switcher kept**, rescoped to four kit accent themes (`sodium/amber/flame/index`), applied as className on `<html>`. | User-confirmed; preserves shipped UX. |
| D3 | Drop `tokens.css` + `components.css` verbatim into `src/styles/cb-site-kit/`; `@import` from `globals.css`. | `AGENTS.md`: "keep classes identical"; preserves the kit as vendorable upstream. |
| D4 | Self-host fonts via `next/font/local` (Basis, Eiko) and `next/font/google` (IBM Plex Mono). Strip the kit's `@import` + `@font-face` from `tokens.css`. | Zero CLS, automatic preload, scoped CSS variables. |
| D5 | Default accent = **sodium**; legacy storage values (`brutalist|paper|terminal|vapor`) migrate to kit ids via the pre-hydration script. | User-confirmed; protects existing users from FOUC/broken state. |
| D6 | New `.cb-prose` class for long-form MDX bodies. | Kit doesn't ship one; `prose-brutalist` is deleted. |
| D7 | **All work covers become React SVG components** under `src/components/covers/<slug>.tsx`, registered via a `COVERS` map. `WorkItem.cover` (file path) is removed. | User-confirmed Q6; theme-aware covers via `currentColor` + `var(--accent)`; cleaner content model. |
| D8 | **One real LinkedIn testimonial** powers home pull-quote. Stored in `src/content/data/testimonials.ts`; Curtis pastes the text. | User-confirmed Q4. |
| D9 | **Career + Off-hours removed from home.** Both components stay in the tree (dormant) for future `/about` and plan-001 CRAFT pillar respectively. **No restyle until used.** | User-confirmed Q7; avoids dead styling work. |
| D10 | Marquee phrases: `["AI tooling", "Editorial AI", "IoT & MPC", "Platform engineering", "Judgment over velocity"]` stored in `src/content/data/marquee.ts`. | User-confirmed Q5. |
| D11 | Single PR / branch `feat/cb-site-kit`, phased commits, no feature flag. | Total visual replacement; `git revert` is the rollback. |

**Assumptions** (call out and correct if wrong):
- A1: PP Eiko license covers personal website use. Pre-merge check.
- A2: The Atlantic Labs page already has a real screenshot at `/public/images/atlantic/home.png` and should keep it. All other work items get new editorial SVG covers.
- A3: `src/components/{timeline.tsx, off-hours.tsx}` stay in source but are not imported anywhere after PLAN-025. Lint tolerates unused exports (Next/ESLint default).

## 5. Target Design

### File topology after migration

```
src/
├── app/
│   ├── fonts.ts                          # NEW — next/font declarations (basis, eiko, plex)
│   ├── layout.tsx                        # font vars on <html>, updated pre-hydration script
│   ├── globals.css                       # @import kit + cb-prose + focus-visible + font var overrides
│   ├── page.tsx                          # home (kit composition — no Career, no Off-hours)
│   ├── not-found.tsx                     # kit hero-manifesto styled
│   ├── sitemap.ts                        # + /work, + /writing
│   ├── work/
│   │   ├── page.tsx                      # NEW — index route (hero-manifesto + ProjectGrid)
│   │   └── [slug]/page.tsx               # kit-styled article shell
│   └── writing/
│       ├── page.tsx                      # NEW — index route (hero-manifesto + EssayList + Medium)
│       └── [slug]/page.tsx               # kit-styled article shell
│
├── components/
│   ├── nav.tsx                           # was header.tsx — cb-nav
│   ├── footer.tsx                        # cb-footer
│   ├── theme-switcher.tsx                # rescoped to accent themes
│   ├── section.tsx                       # cb-section / cb-section-sm wrapper
│   ├── section-header.tsx                # cb-section-header
│   ├── hero/
│   │   ├── hero-editorial.tsx
│   │   ├── hero-manifesto.tsx
│   │   └── hero-terminal.tsx             # available, may be used by /now in a follow-up
│   ├── project-list.tsx                  # home selected work
│   ├── project-grid.tsx                  # /work index
│   ├── project-card.tsx                  # used by ProjectGrid
│   ├── essay-list.tsx                    # home + /writing
│   ├── stack.tsx                         # cb-stack on cb-invert
│   ├── terminal.tsx                      # cb-terminal panel, data-driven
│   ├── now-block.tsx                     # cb-now
│   ├── pull-quote.tsx                    # cb-pullquote
│   ├── marquee.tsx                       # cb-marquee
│   ├── cta.tsx                           # cb-cta
│   ├── writing-list.tsx                  # composes EssayList + Medium feed
│   ├── covers/                           # NEW — editorial SVG cover components
│   │   ├── index.ts                      # COVERS map
│   │   ├── mycelium.tsx
│   │   ├── cortex.tsx
│   │   ├── graphify-rs.tsx
│   │   ├── pi-extensions.tsx
│   │   ├── longevity-platform.tsx
│   │   ├── workflow-orchestration.tsx
│   │   ├── credential-verification.tsx
│   │   ├── figma-mcp-core.tsx
│   │   ├── librarian.tsx
│   │   └── omakase-stack.tsx
│   ├── timeline.tsx                      # DORMANT — not imported anywhere
│   └── off-hours.tsx                     # DORMANT — not imported anywhere
│
├── content/
│   ├── data/
│   │   ├── work.ts                       # remove `cover`; add `italic?` for Eiko flourish
│   │   ├── stack.ts                      # extend StackItem to {name, note?} shape
│   │   ├── career.ts                     # unchanged (dormant)
│   │   ├── hobbies.ts                    # unchanged (dormant)
│   │   ├── now.ts                        # NEW
│   │   ├── marquee.ts                    # NEW
│   │   └── testimonials.ts               # NEW
│   ├── work/*.mdx                        # unchanged
│   └── writing/*.mdx                     # unchanged
│
├── lib/
│   ├── themes.ts                         # accent-theme registry, legacy-storage migration
│   ├── content.ts                        # unchanged
│   └── medium.ts                         # unchanged
│
├── fonts/                                # NEW — Basis (9) + PP Eiko (2) font files
│
└── styles/
    └── cb-site-kit/
        ├── tokens.css                    # vendored, w/ @font-face + Google Fonts import stripped
        └── components.css                # vendored verbatim
```

### Key contracts

- **`tokens.css` is vendored.** Local overrides live in `globals.css` *after* the import: only `--font-sans`, `--font-accent`, `--font-mono` are rebound to `next/font` CSS variables.
- **Theme is a className on `<html>` (`cb-theme-sodium` etc.).** The kit's section-level `cb-invert` is the only mechanism for light/dark — page-level inversion is not used.
- **MDX bodies render inside `<article class="cb-prose">` inside `cb-container--reading`.**
- **`COVERS` map** (`src/components/covers/index.ts`):
  ```ts
  export const COVERS: Record<string, () => JSX.Element> = { mycelium: MyceliumCover, /* ... */ };
  ```
  `ProjectCard` chooses `<img>` if `WORK_ITEM.coverImage` exists (only `the-atlantic-labs`); else `COVERS[slug] ?? GenericCover`.
- **Storage key stays `cb.theme`.** Legacy values migrate: `{ brutalist:'sodium', paper:'amber', terminal:'sodium', vapor:'index' }`.

### State flow

Unchanged. Static at build time. Theme is read pre-paint. Medium feed revalidated every 4h, fail-safe.

### Security / observability

No new third-party scripts. Inline pre-hydration script structure unchanged.

## 6. Implementation Phases

### Phase 0 — Pre-flight (read-only)

**Goal:** Baseline + capture.
- Confirm PP Eiko license (legal blocker).
- Run `pnpm build` on `main` for green baseline.
- Screenshot `/`, `/work/the-atlantic-labs`, `/writing/the-quiet-trade` at 1440px + 390px.

---

### Phase 1 — Vendor the kit + fonts

**Goal:** Get kit CSS and brand fonts loading.

**Files:** `src/styles/cb-site-kit/{tokens.css,components.css}`, `src/fonts/*`, `src/app/fonts.ts`, `src/app/layout.tsx`, `src/app/globals.css`.

**Steps:**
1. Copy `docs/cb-site-kit/tokens.css` → `src/styles/cb-site-kit/tokens.css`. **Remove** the leading `@import url("…IBM Plex Mono")` and **all `@font-face` blocks**. Leave everything else verbatim.
2. Copy `docs/cb-site-kit/components.css` → `src/styles/cb-site-kit/components.css` verbatim.
3. Copy all 11 font files from `docs/cb-site-kit/fonts/` → `src/fonts/`.
4. Author `src/app/fonts.ts` exporting `basis` (localFont), `eiko` (localFont), `plex` (IBM_Plex_Mono via `next/font/google`) — CSS variables `--cb-font-sans`, `--cb-font-accent`, `--cb-font-mono`. **Only weights actually used** (Basis: 300/400/500/700 + italics; Eiko: 300/400; Plex: 400/500/600).
5. `layout.tsx` adds `${basis.variable} ${eiko.variable} ${plex.variable}` to `<html className>`.
6. Rewrite `globals.css`:
   - Keep `@import "tailwindcss"` (residual utility usage in `layout.tsx` body class).
   - `@import "../styles/cb-site-kit/tokens.css"`.
   - `@import "../styles/cb-site-kit/components.css"`.
   - Override font vars: `:root { --font-sans: var(--cb-font-sans), "Inter", ui-sans-serif, system-ui, sans-serif; --font-accent: var(--cb-font-accent), "Tiempos", ui-serif, Georgia, serif; --font-mono: var(--cb-font-mono), ui-monospace, SFMono-Regular, monospace; }`.
   - **Delete** all `[data-theme]` blocks; `text-fg/.text-muted/.text-faint/.bg-accent/.border-line/.invert-on-hover/.link-accent/.caret/.prose-brutalist/@keyframes blink` rules.
   - Author `.cb-prose` block (Phase 5 step 1).
   - Append global `focus-visible` outline rule.

**Validation:** `pnpm typecheck && pnpm build` succeeds; body text computes to Basis.

---

### Phase 2 — Rescope theme switcher

**Goal:** `<html>` carries `cb-theme-<id>` class. Single source of truth.

**Files:** `src/lib/themes.ts`, `src/components/theme-switcher.tsx`, `src/app/layout.tsx`.

**Steps:**
1. Rewrite `themes.ts`: `THEMES` array with `{id, className, label, description, swatches:[paper, ink, accent]}` for `sodium | amber | flame | index`. `DEFAULT_THEME='sodium'`. `THEME_STORAGE_KEY='cb.theme'`. `PRE_HYDRATION_SCRIPT` reads storage, applies legacy map `{brutalist:'sodium', paper:'amber', terminal:'sodium', vapor:'index'}`, writes migrated id back, applies `cb-theme-<id>` via `classList.add`.
2. Rewrite `theme-switcher.tsx`: on mount, scan `documentElement.classList` for the matching kit theme class; `apply(id)` removes all `cb-theme-*` and adds the new one. Trigger restyled with `cb-btn cb-btn--ghost cb-btn--sm`. Menu rows: swatch row + mono label + ✓ for selected.
3. `layout.tsx`: drop `data-theme={DEFAULT_THEME}`; keep `suppressHydrationWarning`; keep inline pre-hydration `<script>`.

**Validation:** legacy values migrate on first reload; no FOUC; each accent visibly retones nav dot, marquee separator, project-list hover bar, CTA hover, Eiko numerals.

---

### Phase 3 — Global chrome (Nav + Footer)

**Files:** `src/components/nav.tsx` (was `header.tsx`), `src/components/footer.tsx`, `src/app/layout.tsx`.

Build `cb-nav` (sticky 64px, hairline border, brand | centered status pill | links + Get-in-touch button + ThemeSwitcher) per `docs/cb-site-kit/components/site-nav.html`. Build `cb-footer` (4 columns ≥md; brand+pill, Site, Elsewhere, Colophon; bottom row © + version) per `docs/cb-site-kit/components/footer.html`.

---

### Phase 4 — Kit primitive components

**Files:** `src/components/{section.tsx, section-header.tsx, hero/hero-editorial.tsx, hero/hero-manifesto.tsx, hero/hero-terminal.tsx, terminal.tsx}`.

Author each as a strict TS component mapping to the corresponding kit HTML. Signatures per §5.

---

### Phase 5 — `cb-prose` + article shells

**Files:** `src/app/globals.css` (`.cb-prose`), `src/app/work/[slug]/page.tsx`, `src/app/writing/[slug]/page.tsx`.

1. Author `.cb-prose`:
   ```css
   .cb-prose { font-family: var(--font-sans); font-size: var(--fs-body-lg); line-height: var(--lh-body-lg); color: var(--fg-1); max-width: var(--max-reading); }
   .cb-prose p { margin: 1.5em 0; }
   .cb-prose h2 { font-family: var(--font-display); font-weight: 500; font-size: 28px; line-height: 1.2; letter-spacing: -.015em; margin: 2.5em 0 .75em; color: var(--fg-1); }
   .cb-prose h3 { font-family: var(--font-display); font-weight: 500; font-size: 20px; margin: 2em 0 .5em; color: var(--fg-1); }
   .cb-prose a { background-image: linear-gradient(currentColor,currentColor); background-repeat: no-repeat; background-position: 0 100%; background-size: 100% 1px; padding-bottom: 2px; transition: opacity var(--dur-fast) var(--ease-standard); }
   .cb-prose a:hover { opacity: .55; }
   .cb-prose blockquote { font-family: var(--font-accent); font-style: italic; font-weight: 400; font-size: 28px; line-height: 1.25; color: var(--fg-1); border: 0; padding: 0; margin: 2em 0; max-width: 30ch; }
   .cb-prose code { font-family: var(--font-mono); font-size: .9em; background: var(--bg-2); border: 1px solid var(--border-1); padding: 1px 6px; border-radius: 4px; }
   .cb-prose pre { font-family: var(--font-mono); background: var(--invert-bg); color: var(--invert-ink); border: 1px solid var(--invert-line); border-radius: var(--radius-panel); padding: 20px 22px; overflow-x: auto; font-size: 13.5px; line-height: 1.65; }
   .cb-prose pre code { background: transparent; border: 0; padding: 0; }
   .cb-prose ul, .cb-prose ol { padding-left: 1.25em; }
   .cb-prose li { margin: .5em 0; }
   .cb-prose hr { border: 0; border-top: 1px solid var(--border-1); margin: 3em 0; }
   .cb-prose img { display: block; margin: 2em 0; border: 1px solid var(--border-1); }
   .cb-prose table { width: 100%; border-collapse: collapse; margin: 2em 0; font-size: var(--fs-body-sm); }
   .cb-prose th, .cb-prose td { border-bottom: 1px solid var(--border-1); padding: .6em .8em; text-align: left; }
   .cb-prose th { font-family: var(--font-mono); text-transform: uppercase; font-size: var(--fs-micro-md); letter-spacing: var(--ls-micro-md); color: var(--fg-2); font-weight: 400; }
   ```
2. Reskin `/work/[slug]/page.tsx` and `/writing/[slug]/page.tsx`:
   - `HeroManifesto` (numeral, mono label with year/client or date, statement = title with optional italic).
   - Below, `cb-section-sm cb-hairline` meta strip (Role · Tags · Links for work; Date · Tags for writing) using kit micro/mono labels.
   - `<article class="cb-prose">` inside `cb-container--reading`.
   - Footer-of-article: back-link + secondary action in mono micros.

---

### Phase 6 — Listing components + `/work` and `/writing` index routes

**Files:** `src/components/{project-list.tsx, project-grid.tsx, project-card.tsx, essay-list.tsx, writing-list.tsx, stack.tsx, marquee.tsx, now-block.tsx, pull-quote.tsx, cta.tsx}`, `src/app/work/page.tsx`, `src/app/writing/page.tsx`, `src/app/sitemap.ts`.

Author each per their kit HTML reference. Index routes per §6 Phase 6 of the v1 plan (hero-manifesto + listing). Update `sitemap.ts` to include `/work` and `/writing`.

---

### Phase 7 — Covers, content, and home composition

**Goal:** Land the data and the home page.

**Files:**
- `src/components/covers/index.ts` + 10 cover components (one per WORK item except `the-atlantic-labs`).
- `src/content/data/work.ts` (remove `cover`; add `italic?` + `coverImage?` for the one real screenshot).
- `src/content/data/{marquee.ts, now.ts, testimonials.ts}` (new).
- `src/content/data/stack.ts` (extend `StackItem` to `string | { name: string; note?: string }`).
- `src/app/page.tsx` (rewrite to kit composition).

**Cover component spec (per slug):**
- 4:3 viewBox `0 0 800 600`.
- Two-color, geometric, schematic. No photorealism, no gradients.
- Use `var(--paper)` / `var(--ink)` / `var(--accent)` directly (or `currentColor`). One small accent shape per cover so theme retoning is visible.
- Inspired by the placeholders in `docs/cb-site-kit/templates/projects.html` (terminal silhouettes, concentric circles, line graphs, type-only frames).
- Suggested motif per slug (agents may execute or refine):
  - `mycelium` — branching network/graph nodes in accent, dark panel.
  - `cortex` — ECG/control-signal waveform with accent setpoint line on paper.
  - `graphify-rs` — node/edge graph with three edge weights (EXTRACTED/INFERRED/AMBIGUOUS marked by dash density).
  - `pi-extensions` — terminal panel mock with a `$ pi /commit` line in accent.
  - `longevity-platform` — risk-tier bars (5 ascending) with one accent.
  - `workflow-orchestration` — boxes-and-arrows pipeline.
  - `credential-verification` — credential card + scan/check chevron.
  - `figma-mcp-core` — concentric padlocks / 3-layer schematic.
  - `librarian` — index card stack with mono row labels.
  - `omakase-stack` — terminal `$ omakase new` + folder tree silhouette.

**`marquee.ts`:**
```ts
export const MARQUEE_PHRASES = ["AI tooling","Editorial AI","IoT & MPC","Platform engineering","Judgment over velocity"] as const;
export const MARQUEE_SEPARATOR = "✦";
```

**`now.ts`:**
```ts
export type TerminalLine =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; quoted?: string }
  | { kind: "cursor" };

export type NowEntry = {
  lede: { text: string; italic?: string };
  updated: string;       // "YYYY · MM · DD"
  status?: string;
  statusPill?: string;   // text for the nav center pill
  terminal: TerminalLine[];
};
export const NOW: NowEntry = {
  lede: { text: "I'm leading engineering at", italic: "Metalab" /* and then continuation in component */ },
  // ...content sourced from existing src/components/hero.tsx + data/career.ts head
};
```
(The component pre-renders the lede shape; Curtis tunes the copy in PR review.)

**`testimonials.ts`:**
```ts
export type Testimonial = {
  quote: string;          // curly quotes added by component
  name: string;
  role: string;
  org?: string;
  source: "linkedin" | "email" | "other";
  url?: string;           // optional source URL for attribution
  visibility: "public" | "internal";
};
export const TESTIMONIALS: Testimonial[] = [
  // PLAN-021: Curtis pastes one real recommendation here from the 15 on LinkedIn.
];
```

**Home composition (`src/app/page.tsx`):** identical to `docs/cb-site-kit/templates/home.html` — intro → editorial hero → 02 Selected work (ProjectList) → pull quote → 03 Writing (EssayList top 4 + "All writing →" ghost button) → 04 Stack (cb-invert) → marquee → 05 Now → CTA. Section anchor ids: `#work`, `#writing`, `#stack`, `#now`, `#contact` (preserve existing inbound anchors). **Career and Off-hours are not rendered.**

---

### Phase 8 — Sweep + polish

- Grep for dead utilities; replace any remaining references; delete corresponding rules from `globals.css`.
- Confirm focus-visible outlines on every interactive element.
- Verify all anchors resolve to real URLs (no `href="#"`).
- `pnpm lint && pnpm typecheck && pnpm build`.
- Manual axe pass on home, both indices, one work article, one writing article.
- Visual diff against Phase-0 screenshots.

---

## 7. Agent Execution Checklist

- [ ] **PLAN-001: Vendor kit CSS into `src/styles/cb-site-kit/`.**
  - Files: `src/styles/cb-site-kit/tokens.css`, `src/styles/cb-site-kit/components.css`
  - Instructions: Copy verbatim from `docs/cb-site-kit/`. In `tokens.css`, **remove** the top `@import url("…IBM Plex Mono…")` and **remove every `@font-face` block**. Leave all CSS custom properties, `cb-invert`, theme classes, semantic utilities, layout utilities untouched.
  - Verify: `diff` against source shows only those deletions.
  - Acceptance: imports cleanly from `globals.css`; no 404s in DevTools network tab.

- [ ] **PLAN-002: Copy brand fonts into `src/fonts/`.**
  - Files: `src/fonts/*`
  - Instructions: Copy all `.otf` and `.ttf` files from `docs/cb-site-kit/fonts/` to `src/fonts/`. Preserve filenames exactly. 11 files total (9 Basis + 2 Eiko).
  - Verify: `ls src/fonts | wc -l` == 11.
  - Acceptance: files committed.

- [ ] **PLAN-003: Author `src/app/fonts.ts`.**
  - Files: `src/app/fonts.ts`
  - Instructions: Export `basis` (next/font/local — weights 300/400/500/700 + matching italics, variable `--cb-font-sans`, display swap), `eiko` (next/font/local — weights 300/400, variable `--cb-font-accent`, display swap), `plex` (next/font/google `IBM_Plex_Mono`, weights 400/500/600, subsets `["latin"]`, variable `--cb-font-mono`, display swap).
  - Verify: `pnpm typecheck` passes.
  - Acceptance: importable from layout.

- [ ] **PLAN-004: Wire font CSS variables on `<html>`.**
  - Files: `src/app/layout.tsx`
  - Instructions: `import { basis, eiko, plex } from "./fonts"`. Set `<html lang="en" suppressHydrationWarning className={`${basis.variable} ${eiko.variable} ${plex.variable}`}>`. Remove `data-theme={DEFAULT_THEME}` attribute.
  - Verify: `<html class>` includes all three variable classes; body computed `font-family` is Basis.
  - Acceptance: no console errors; no FOUC.

- [ ] **PLAN-005: Rewrite `globals.css`.**
  - Files: `src/app/globals.css`
  - Instructions: New body, in order: (1) `@import "tailwindcss";` (2) `@import "../styles/cb-site-kit/tokens.css";` (3) `@import "../styles/cb-site-kit/components.css";` (4) `:root { --font-sans: var(--cb-font-sans), "Inter", ui-sans-serif, system-ui, sans-serif; --font-accent: var(--cb-font-accent), "Tiempos", ui-serif, Georgia, serif; --font-mono: var(--cb-font-mono), ui-monospace, SFMono-Regular, monospace; }` (5) the `.cb-prose` block from §6 Phase 5 step 1 (verbatim). (6) Global focus rule: `:where(a, button, [tabindex]):focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }`. **Delete** every existing brutalist rule (`[data-theme]` blocks; `.text-fg`, `.text-muted`, `.text-faint`, `.bg-accent`, `.border-line`, `.invert-on-hover`, `.link-accent`, `.caret`, `.prose-brutalist`, `@keyframes blink`).
  - Verify: `pnpm build` succeeds; grep for old utility classes in `src/` returns only references that later steps will refactor.
  - Acceptance: site renders with kit typography end-to-end.

- [ ] **PLAN-006: Rewrite `src/lib/themes.ts`.**
  - Files: `src/lib/themes.ts`
  - Instructions: Replace contents per §6 Phase 2 step 1. Four themes: `sodium` (default), `amber`, `flame`, `index`. Each: `{ id, className: "cb-theme-<id>", label, description, swatches: [paper, ink, accent] }`. `DEFAULT_THEME = "sodium"`. `THEME_STORAGE_KEY = "cb.theme"`. `isThemeId` guards new ids. `PRE_HYDRATION_SCRIPT` applies legacy migration map `{brutalist:'sodium',paper:'amber',terminal:'sodium',vapor:'index'}`, writes migrated id back to storage, applies class via `classList.add`.
  - Verify: setting `localStorage.cb.theme = "brutalist"` then reloading yields `<html class="cb-theme-sodium …">` and storage now reads `"sodium"`.
  - Acceptance: no FOUC; legacy users land on a kit theme.

- [ ] **PLAN-007: Rewrite `theme-switcher.tsx`.**
  - Files: `src/components/theme-switcher.tsx`
  - Instructions: On mount, find current theme by scanning `document.documentElement.classList` for the first `cb-theme-*` match; default `sodium`. `apply(id)` does `classList.remove(...allKitThemeClassNames); classList.add(\`cb-theme-\${id}\`); localStorage.setItem(THEME_STORAGE_KEY, id)`. Reskin: trigger button uses `cb-btn cb-btn--ghost cb-btn--sm`; menu uses `cb-pill`-styled panel; rows render swatch group + mono label + ✓.
  - Verify: cycle through all four themes; persist across reload; outside-click + Esc close menu.
  - Acceptance: each theme visibly retones nav dot, project-list hover bar, marquee separator, CTA hover, Eiko numeral.

- [ ] **PLAN-008: Author `Nav` (kit `cb-nav`).**
  - Files: `src/components/nav.tsx` (rename from `header.tsx`), `src/app/layout.tsx`
  - Instructions: Author per `docs/cb-site-kit/components/site-nav.html`. Brand: `<b>Curtis Blanchette</b><span>— Lead software engineer</span>` linking `/`. Centered pill: read `NOW.statusPill` (fallback "Currently shipping"). Links `/work`, `/writing`; `<a class="cb-btn cb-btn--ghost cb-btn--sm" href="mailto:hello@curtisblanchette.com">Get in touch ↗</a>`; then `<ThemeSwitcher />`. Update layout import.
  - Verify: sticky, 64px tall, hairline border-bottom.
  - Acceptance: keyboard-tabbable; focus rings visible.

- [ ] **PLAN-009: Author `Footer` (kit `cb-footer`).**
  - Files: `src/components/footer.tsx`
  - Instructions: Per `docs/cb-site-kit/components/footer.html`. Year via `new Date().getFullYear()`. Version line: `v {YYYY}.{MM} · hand-built`. Four columns: brand (with `cb-pill` status), Site (`/work`, `/writing`, `/#contact`), Elsewhere (GitHub, LinkedIn, Medium, mailto), Colophon (font names + a `/colophon` placeholder link removed if no route — instead link to GitHub repo or just static label).
  - Verify: 4-col grid ≥ md, 1-col < md.
  - Acceptance: visual match to kit footer.

- [ ] **PLAN-010: Author `Section` + `SectionHeader`.**
  - Files: `src/components/section.tsx`, `src/components/section-header.tsx`
  - Instructions: `<Section variant?="default"|"sm" invert?=boolean hairline?=boolean container?="reading"|"medium"|"wide"|"bleed" id?=string className?=string>` wraps `<section class="cb-section[-sm] [cb-invert] [cb-hairline]" id={id}>` + `<div class="cb-container cb-container--{container}">`. `<SectionHeader num="01" label="…" title="…" sub?="…" id?=string />` renders the kit's two-column header (Eiko italic numeral, mono label, display title, optional sub).
  - Verify: matches `docs/cb-site-kit/components/section-header.html`.
  - Acceptance: TS strict, no `any`.

- [ ] **PLAN-011: Author `HeroEditorial`.**
  - Files: `src/components/hero/hero-editorial.tsx`
  - Instructions: Per `docs/cb-site-kit/components/hero-editorial.html`. Props: `{ nameLines: { text: string; italic?: string }[]; role: string; based: string; focus: string; status: { live: boolean; text: string } }`. Render `<h1 class="cb-hero__name">` with `<br/>` joins and `<em>{italic}</em>` for the Eiko flourish. Meta strip is a 4-cell grid.
  - Verify: three Basis Medium lines clamp 64→200px; one italic Eiko word; meta strip hairline-top.
  - Acceptance: visual match to component file.

- [ ] **PLAN-012: Author `HeroManifesto`.**
  - Files: `src/components/hero/hero-manifesto.tsx`
  - Instructions: Per `docs/cb-site-kit/components/hero-manifesto.html`. Props: `{ num: string; numLabel: string; statement: string; statementItalic?: string }`. Italic word renders inside `<em>` inside the statement.
  - Verify: massive accent-coloured italic Eiko numeral; statement Basis Medium clamp 28→56.
  - Acceptance: shared by `/work`, `/writing`, `/work/[slug]`, `/writing/[slug]`.

- [ ] **PLAN-013: Author `Terminal`.**
  - Files: `src/components/terminal.tsx`
  - Instructions: Per `docs/cb-site-kit/components/terminal.html`. Props: `{ title?: string; lines: TerminalLine[] }`. Discriminated union: `{kind:"cmd", text}`, `{kind:"out", text, quoted?}`, `{kind:"cursor"}`. `quoted` substring wraps in `<span class="cb-terminal__c-string">…</span>`. Final cursor line renders `$ _<span class="cb-blink" aria-hidden />`.
  - Verify: cursor blinks; freezes under `prefers-reduced-motion`.
  - Acceptance: matches kit terminal HTML.

- [ ] **PLAN-014: Author `ProjectList` (home).**
  - Files: `src/components/project-list.tsx`
  - Instructions: `<div class="cb-project-list">` of `<Link class="cb-project-row">` rows: 2-digit num, title (Basis Medium with optional `<em>` for `item.italic`), meta (role · year), arrow `↗`. Honor responsive grid-area collapse at `< 640px`.
  - Verify: kit hover (3px accent bar slides in, arrow translates).
  - Acceptance: reads all `WORK[]` rows.

- [ ] **PLAN-015: Author cover components + `COVERS` map.**
  - Files: `src/components/covers/index.ts`, `src/components/covers/<slug>.tsx` × 10
  - Instructions: Per slug, author a React function component returning `<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">…</svg>`. Use **CSS variables directly inside `fill`/`stroke`**: e.g. `fill="var(--paper)"`, `stroke="var(--ink)"`, `fill="var(--accent)"`. **No hardcoded hex.** One small accent shape per cover so retoning is visible. Use motifs from §6 Phase 7. Export from `index.ts` as `COVERS: Record<string, () => JSX.Element>`.
  - Verify: each cover renders at 4:3 inside `.cb-project-card__cover`; switching theme retones the accent inside the SVG.
  - Acceptance: all 10 slugs (everyone except `the-atlantic-labs`) have a cover.

- [ ] **PLAN-016: Author `ProjectGrid` + `ProjectCard`.**
  - Files: `src/components/project-grid.tsx`, `src/components/project-card.tsx`
  - Instructions: Per `docs/cb-site-kit/components/project-grid.html`. Card renders cover via: if `item.coverImage` → `<img src={item.coverImage} alt={item.title}>`; else `<COVERS[item.slug] />`; else `<GenericCover />`. Other parts: top row (client · year), title (Basis Medium with optional italic), description, tag list.
  - Verify: 1-col mobile, 2-col ≥ 700px; hover scales cover 3%.
  - Acceptance: drives `/work` index.

- [ ] **PLAN-017: Migrate `work.ts` shape.**
  - Files: `src/content/data/work.ts`
  - Instructions: Remove `cover: string` from `WorkItem`. Add `coverImage?: string` (only `the-atlantic-labs` keeps it pointing at `/images/atlantic/home.png`). Add `italic?: string` for the Eiko flourish word inside the project-list row title. Backfill `italic` per item (e.g. `the-atlantic-labs`: "labs"; `mycelium`: "framework"; `cortex`: "control"; `graphify-rs`: "graph"; …). Delete now-unused SVG cover file references (don't delete the SVG files yet — Phase 8 sweep can do that).
  - Verify: `pnpm typecheck` clean; no consumer references stale `cover` field.
  - Acceptance: card covers route through `COVERS` map or `coverImage`.

- [ ] **PLAN-018: Author `EssayList` + update `WritingList`.**
  - Files: `src/components/essay-list.tsx`, `src/components/writing-list.tsx`
  - Instructions: `EssayList` per `docs/cb-site-kit/components/essay-list.html` — `<div class="cb-essay-list">` of `<Link class="cb-essay-row">` (date mono micro `YYYY · MM`, title, read-time mono micro). Mobile collapse. `WritingList` composes: for home, top-4 local in `EssayList` + `cb-btn cb-btn--ghost` "All writing →" linking `/writing`; for `/writing/page.tsx`, all local in `EssayList`, then a kit section-header "Elsewhere · Medium", then Medium items as a second `EssayList` linking external URLs.
  - Verify: empty Medium feed renders graceful state.
  - Acceptance: works on home and `/writing`.

- [ ] **PLAN-019: Author `Stack`.**
  - Files: `src/components/stack.tsx`, `src/content/data/stack.ts`
  - Instructions: Extend `StackItem = string | { name: string; note?: string }` (non-breaking union). Component renders `<div class="cb-stack">` of `<div class="cb-stack__group">` per group; `<h3 class="cb-stack__heading">` is lowercase prose (kit's `$` injected by `::before`). Items list renders `<li>{name} <span>{note ?? ""}</span></li>`. When item is a bare string, split on `·` if present, else render with empty note. Tighten existing `STACK[]` entries to add real notes (e.g. `{name:"TypeScript", note:"everywhere"}`, `{name:"Rust", note:"latency-critical"}`) — keep punchy.
  - Verify: visual match to `docs/cb-site-kit/components/stack.html`.
  - Acceptance: section sits inside `<Section invert>`; `$` glyphs are accent-coloured.

- [ ] **PLAN-020: Author `Marquee` + `marquee.ts`.**
  - Files: `src/components/marquee.tsx`, `src/content/data/marquee.ts`
  - Instructions: `marquee.ts` exports `MARQUEE_PHRASES = ["AI tooling","Editorial AI","IoT & MPC","Platform engineering","Judgment over velocity"] as const` and `MARQUEE_SEPARATOR = "✦"`. Component renders `<section class="cb-marquee">` with `<div class="cb-marquee__track">` containing **two interleaved copies** of phrases-with-separators for seamless CSS loop.
  - Verify: continuous scroll, no jump; freezes under `prefers-reduced-motion`.
  - Acceptance: one per page (home only).

- [ ] **PLAN-021: Author `PullQuote` + `testimonials.ts` (real LinkedIn entry).**
  - Files: `src/components/pull-quote.tsx`, `src/content/data/testimonials.ts`
  - Instructions: `testimonials.ts` exports `TESTIMONIALS: Testimonial[]` per the shape in §5. Curtis pastes **one real recommendation from his LinkedIn recommendations** as a `visibility: "public"` entry with `source: "linkedin"`, optionally `url: "https://www.linkedin.com/in/curtisblanchette/details/recommendations/"`. Component selects the first `visibility === "public"` item, renders `<figure class="cb-pullquote"><blockquote class="cb-quote">“{quote}”</blockquote><figcaption class="cb-pullquote__attr">— {name} · {role}{org ? ` · ${org}` : ""}</figcaption></figure>`. Curly quotes added by the component (don't store them in data).
  - Verify: home renders one pull-quote with real attribution; missing data raises a build error (or, in dev, a visible warning banner).
  - Acceptance: real LinkedIn quote attributed by name + role appears in the middle third of `/`.
  - **Content task for Curtis:** open `https://www.linkedin.com/in/curtisblanchette/details/recommendations/`, choose one, paste into `testimonials.ts` before merge.

- [ ] **PLAN-022: Author `NowBlock` + `now.ts`.**
  - Files: `src/components/now-block.tsx`, `src/content/data/now.ts`
  - Instructions: `NowBlock` renders the left column of `.cb-now` per `docs/cb-site-kit/components/now.html`: `<p class="cb-now__lede">` with optional Eiko italic, then `<p class="cb-now__updated">` with status pill+dot. `now.ts` exports `NOW: NowEntry` (shape in §6 Phase 7): lede pulled from the existing hero copy (Metalab, AI tooling, IoT, agency systems); terminal lines: shipping (Atlantic Labs), reading (a real book), writing (essay on judgment-priced software), learning (Rust async or Vertex RAG depth), listening (real artist), avoiding (something honest).
  - Verify: section uses `<Terminal>` for the right column.
  - Acceptance: voice rules honoured (no jokes, specific not aspirational).

- [ ] **PLAN-023: Author `Cta`.**
  - Files: `src/components/cta.tsx`
  - Instructions: Per `docs/cb-site-kit/components/cta.html`. Props: `{ heading: string; headingItalic?: string; lede?: string; primary: {label, href}; ghost?: {label, href} }`. Heading clamp 48→128px.
  - Verify: max one per page; placed before footer.
  - Acceptance: kit match.

- [ ] **PLAN-024: Compose home page (`app/page.tsx`).**
  - Files: `src/app/page.tsx`
  - Instructions: Rewrite per `docs/cb-site-kit/templates/home.html` composition. Order: (intro paragraph inside a `Section variant="sm" container="bleed"` with hairline-top) → `HeroEditorial` (no Section wrapper, it owns its own padding) → `Section number="02" label="Selected work" title="…" container="wide"` with `<ProjectList>` → `Section container="medium"` with `<PullQuote>` → `Section number="03" label="Writing" title="Notes from the trenches."` with `<EssayList limit={4}>` + ghost button → `Section number="04" label="Stack & tools" invert` with `<Stack>` → `<Marquee>` (raw section, no container) → `Section number="05" label="Now" title="What I'm working on this month."` with `<NowBlock>` + `<Terminal>` side-by-side → `Section hairline container="bleed"` with `<Cta>`. Preserve `id="work"`, `id="writing"`, `id="stack"`, `id="now"`, `id="contact"` anchors on the corresponding sections. **Do not render `<Timeline>` or `<OffHours>`.**
  - Verify: `/` reads top-to-bottom per the template; `#work`/`#writing` anchors scroll to the right sections.
  - Acceptance: glance test passes at 50% zoom.

- [ ] **PLAN-025: Add `/work/page.tsx`.**
  - Files: `src/app/work/page.tsx`
  - Instructions: `HeroManifesto` (num="01", label="Selected work · 2019 – 2025", statement="A short, honest list of *things I'm proud of* shipping.", italic="things I'm proud of") + `<Section variant="sm" hairline container="wide">` containing `<ProjectGrid items={WORK}>`. Featured first. `generateMetadata` returns `{ title: "Work" }`.
  - Verify: SSG; nav link resolves.
  - Acceptance: matches `docs/cb-site-kit/templates/projects.html`.

- [ ] **PLAN-026: Add `/writing/page.tsx`.**
  - Files: `src/app/writing/page.tsx`
  - Instructions: `HeroManifesto` (num="02", label="Writing · since 2024", statement="Notes from the *trenches*.", italic="trenches") + `<Section variant="sm" hairline container="medium">` containing the full `<EssayList>` of local MDX, then a kit section-header "Elsewhere · Medium", then a second `EssayList` of Medium items.
  - Verify: SSG; works with empty Medium feed.
  - Acceptance: matches `docs/cb-site-kit/templates/writing.html`.

- [ ] **PLAN-027: Reskin article shells.**
  - Files: `src/app/work/[slug]/page.tsx`, `src/app/writing/[slug]/page.tsx`
  - Instructions: Per §6 Phase 5 step 2. Replace top chrome with `HeroManifesto`. Below, `<Section variant="sm" hairline container="reading">` with a meta strip (Role · Tags · Links for work; Date · Tags for writing — use kit mono micros and `cb-link` inline links). Body: `<article class="cb-prose">` inside `cb-container--reading` rendered via `dangerouslySetInnerHTML` from the existing unified pipeline. Bottom: back-link + secondary action in mono micros.
  - Verify: both routes still SSG; metadata correct; Shiki code blocks themed correctly within kit chrome.
  - Acceptance: readable on mobile + desktop; no horizontal scroll inside code blocks (overflow-x auto).

- [ ] **PLAN-028: Update `sitemap.ts`.**
  - Files: `src/app/sitemap.ts`
  - Instructions: Add `/work` and `/writing` entries with sensible `priority` (0.8). Keep existing `/`, work slugs, writing slugs.
  - Verify: `/sitemap.xml` includes both new URLs; no duplicates.
  - Acceptance: SEO crawl path intact.

- [ ] **PLAN-029: Reskin `not-found.tsx`.**
  - Files: `src/app/not-found.tsx`
  - Instructions: Kit `HeroManifesto` (num="404", label="Page not found", statement="That path doesn't *exist* — yet.", italic="exist") + mono link back home as a `cb-btn cb-btn--ghost`.
  - Verify: visiting an unknown URL renders the new 404.
  - Acceptance: kit voice; reduced-motion safe.

- [ ] **PLAN-030: Sweep — remove dead utilities + orphan files.**
  - Files: `src/**`, `src/app/globals.css`, `public/images/work/*.svg`
  - Instructions: `grep -rE "text-(fg|muted|faint)|border-line|bg-(bg|accent)|invert-on-hover|prose-brutalist|link-accent|caret" src/` — replace any remaining references with kit equivalents (`var(--fg-2)`, `var(--accent)`, `cb-link`, `cb-blink`, `cb-prose`). After zero matches, ensure those rules are not present in `globals.css`. Delete `public/images/work/*.svg` (covers now live as React components). Delete `public/images/work/cortex.svg`, `graphify.svg`, `librarian.svg`, `longevity.svg`, `mycelium.svg`, `omakase.svg`, `pi.svg`, `workflow.svg`, `figma-mcp.svg`, `credentials.svg` if present — **only after verifying no `coverImage` data still points at them**.
  - Verify: re-grep returns nothing; `pnpm build` succeeds; no 404s in Network tab.
  - Acceptance: brutalist utilities and orphan SVGs gone.

- [ ] **PLAN-031: Final verification.**
  - Files: n/a
  - Instructions: `pnpm typecheck && pnpm lint && pnpm build`. `rm -rf .next` first (route shape changed — `/work`, `/writing` are new). `pnpm start` and browse `/`, `/work`, `/writing`, `/work/the-atlantic-labs`, `/writing/the-quiet-trade`. Cycle all 4 themes. Toggle `prefers-reduced-motion` in DevTools — marquee freezes, blink stops. Run axe DevTools on each of those URLs. Run Lighthouse on `/`. Confirm pull-quote shows real LinkedIn attribution.
  - Verify: 0 errors, 0 warnings, Lighthouse a11y ≥ 95.
  - Acceptance: §11.

## 8. Testing Strategy

- **Type safety:** `pnpm typecheck` clean after each phase (esp. after `work.ts` reshape).
- **Lint:** `pnpm lint` zero warnings.
- **Build:** `pnpm build` succeeds; output lists `/`, `/work`, `/writing`, every `WORK[]` slug, every `writing/*.mdx` slug, `/sitemap.xml`, `/robots.txt`, `/404`. Run with a fresh `.next` (PLAN-031).
- **Visual diff (manual):** Phase-0 screenshots vs post-migration screenshots on `/`, `/work/the-atlantic-labs`, `/writing/the-quiet-trade` at 1440px and 390px. Document intentional differences.
- **Cover theme-awareness:** open `/work` in DevTools; toggle the theme switcher across all four themes; confirm every cover's accent shape retones (no hardcoded hex anywhere in `src/components/covers/`).
- **Pre-hydration migration:** for each legacy storage value (`brutalist`, `paper`, `terminal`, `vapor`), set in localStorage, hard-reload, verify `<html>` class + storage both reflect the mapped kit theme.
- **Reduced motion:** OS-level toggle + DevTools "Emulate `prefers-reduced-motion: reduce`" — marquee frozen, blink stopped, hover transitions instant.
- **Accessibility:** axe DevTools on `/`, `/work`, `/writing`, one work article, one writing article — 0 critical/serious. Keyboard tab path complete. Single `<h1>` per page. No images without alt text (covers are decorative inline SVGs with `aria-hidden="true"`).
- **External feed:** with Medium URL blocked at the network layer, `/` and `/writing` still render; empty-state copy appears.
- **Lighthouse:** a11y ≥ 95 on `/`; performance acceptable (font payload audit — only the weights declared in `fonts.ts` are emitted).
- **Sitemap:** `/sitemap.xml` includes all expected URLs once.
- **Anchor regression:** external links to `/#work`, `/#writing`, `/#stack`, `/#now`, `/#contact` still scroll to the right home sections.

## 9. Rollout, Migration & Backout

- **Branch:** `feat/cb-site-kit`. Land in topical commits aligned to phases for reviewable history.
- **No feature flag.** Single visual replacement; `git revert` of the merge is the rollback.
- **Data migration:** legacy `localStorage["cb.theme"]` values auto-mapped at first paint by the new pre-hydration script. One-way (overwrites old value). Reverting the migration restores brutalist code; the `isThemeId` guard in the old `themes.ts` already falls back to `DEFAULT_THEME = "brutalist"` for unknown stored values — safe.
- **Deployment:** local-only today. When/if Vercel is wired up, this is a single visual deploy.
- **Stale `.next`:** `rm -rf .next` before verification build (per `docs/architecture.md` gotcha; route shape changed).
- **Monitoring:** manual post-merge browse on Chrome + Safari + Firefox; mobile 390px. Console must be clean.
- **Pre-merge gates:**
  - PP Eiko license confirmed (R2 below).
  - Real LinkedIn testimonial pasted into `testimonials.ts` (PLAN-021).

## 10. Risks & Mitigations

| # | Risk | Severity | Mitigation |
|---|---|---|---|
| R1 | Font payload grows with three families | Med | `next/font` ships only declared weights; subset Plex via Google. Audit Lighthouse "network payloads" post-build. |
| R2 | PP Eiko license — paid Pangram Pangram foundry font | **High** | Curtis confirms license covers personal website use before merge. If not, fall back to Tiempos/Fraunces per kit `README.md` caveat. Legal blocker on PLAN-001. |
| R3 | Visual regressions in long MDX bodies tuned to mono | Med | `cb-prose` exercised against the longest MDX (`the-atlantic-labs.mdx`) during PLAN-027 verification. |
| R4 | External anchors `/#work`, `/#writing` break | Low | PLAN-024 preserves the exact `id` attributes on home sections. |
| R5 | Theme-switcher hydration mismatch | Low | Pre-hydration script applies class before React mounts; component reads class on `useEffect`; `suppressHydrationWarning` already on `<html>`. |
| R6 | Cover components ship a hardcoded hex by mistake → theme doesn't follow | Med | Code review check + the multi-theme cycle test in PLAN-031. Lint rule (manual grep) for `#[0-9a-fA-F]{3,8}` inside `src/components/covers/`. |
| R7 | LinkedIn testimonial missing at merge time | Med | PLAN-021 marks the data file as required; component throws a visible warning in dev if `TESTIMONIALS` is empty. Block merge until populated. |
| R8 | Marquee duplication oversight → loop jumps | Low | PLAN-020 explicit; visual verification step. |
| R9 | Dormant `Timeline` / `OffHours` show up as unused-export warnings | Low | Next ESLint defaults don't flag unused module exports; if flagged, add `// eslint-disable-next-line` or move components to a `dormant/` subfolder excluded from lint. |
| R10 | Tailwind still imported but mostly unused — unnecessary CSS bytes | Low | Tailwind v4 tree-shakes by default; only `min-h-screen flex flex-col` (and similar) remain. Audit final CSS bundle size. |

## 11. Definition of Done

- [ ] `pnpm typecheck` clean.
- [ ] `pnpm lint` zero warnings.
- [ ] `rm -rf .next && pnpm build` succeeds; output lists all expected routes.
- [ ] `/` renders the kit composition top-to-bottom — no Career, no Off-hours, anchor ids preserved.
- [ ] `/work` and `/writing` are real routes with kit `hero-manifesto` + listings.
- [ ] `/work/[slug]` and `/writing/[slug]` use kit chrome + `cb-prose`.
- [ ] Three brand fonts loaded via `next/font`; no `googleapis.com/css2` import remains in CSS.
- [ ] All 10 work covers are React SVG components under `src/components/covers/`. `the-atlantic-labs` keeps `coverImage: "/images/atlantic/home.png"`.
- [ ] All cover SVGs reference `var(--paper)`, `var(--ink)`, `var(--accent)` (and/or `currentColor`); no hex literals. Verified by `grep -rE "#[0-9a-fA-F]{3,8}" src/components/covers/` returning nothing.
- [ ] Old `public/images/work/*.svg` files removed.
- [ ] Theme switcher cycles `sodium → amber → flame → index`; `<html>` carries exactly one `cb-theme-*` class; persists across reload; no FOUC.
- [ ] Legacy storage values (`brutalist|paper|terminal|vapor`) migrate correctly on first paint.
- [ ] Marquee phrases are `["AI tooling", "Editorial AI", "IoT & MPC", "Platform engineering", "Judgment over velocity"]` exactly.
- [ ] One real LinkedIn testimonial appears as the home pull-quote with attribution (`name · role · org`).
- [ ] `prefers-reduced-motion: reduce` freezes marquee, stops blink cursor, disables hover transitions.
- [ ] Focus-visible outlines visible on every interactive element.
- [ ] axe DevTools — zero critical/serious on `/`, `/work`, `/writing`, one work article, one writing article.
- [ ] Lighthouse a11y ≥ 95 on `/`.
- [ ] Grep across `src/` returns no references to `prose-brutalist`, `text-fg`, `text-muted`, `text-faint`, `bg-bg`, `bg-accent`, `border-line`, `invert-on-hover`, `link-accent`, `caret`.
- [ ] PP Eiko license confirmed.
- [ ] Visual diff against Phase-0 screenshots reviewed; intentional differences documented.

---

Plan v2 is locked. Hand PLAN-001 through PLAN-031 to the executing agent in order. Two pre-merge content gates remain: the PP Eiko license check (R2) and the real LinkedIn testimonial paste (PLAN-021).
