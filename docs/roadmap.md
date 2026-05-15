# Roadmap

A living list of what's next. Newest at top. Drop completed items at the bottom or strike them through.

## Now

- [ ] **Off-hours expansion → CRAFT pillar.** Promote workshop/outdoor projects (construction, metal fabrication, go-karts, tree felling, skateboarding, dirt jumping) from one-line hobby tiles to a full third content pillar alongside *Work* and *Writing*. Fed by raw source material in `/raw` via a local synthesis tool. See [`plans/001-off-hours-expansion.md`](./plans/001-off-hours-expansion.md).

## Next

- [ ] **Backfill confidential case studies.** Outlive (Longevity), Opus (Workflow Orchestration), ADP (Credential Verification), Figma MCP Core, Librarian, Omakase Stack — each currently ships as a `client-anon` summary card with no MDX body. Add per-project MDX with NDA-safe specifics (problem shape, role, architecture sketch, what carried forward).
- [ ] **Replace placeholder SVG covers** with real photography or richer illustrations once visual direction is set.
- [ ] **`prefers-reduced-motion` gate** on the hero marquee and the blinking caret.
- [ ] **Visible focus rings** with brutalist styling (offset, sharp, accent color).

## Later

- [ ] **About page** (`/about`) with long-form bio. Currently the hero + career timeline cover this; promote to its own route once content warrants.
- [ ] **`/now` page** — what Curtis is heads-down on this month. Updated quarterly. (Pattern stolen from `nownownow.com`.)
- [ ] **Project search** if/when there are enough projects to need it. Server-side vector search backed by an embeddings index built from `/raw` (see plan 001).
- [ ] **RSS feed for `/writing`** so people can subscribe.
- [ ] **Vercel deploy.** Currently builds locally only; deploy when content is ready to be public.
- [ ] **OG image generator** — `@vercel/og` route producing per-page OG cards in the brutalist style.
- [ ] **Dark / light toggle.** Currently dark-only. Brutalist works light too (cream + ink) — would be a fun toggle.

## Done

- [x] Initial scaffold — Next 15 + Tailwind 4 + brutalist primitives + 11 case studies + The Quiet Trade essay.
- [x] Atlantic case study reframed as **The Atlantic Labs** (umbrella engagement) with Take as one experiment under it.
- [x] AI-generated portrait in hero (color, not grayscale).
- [x] Location: Salmon Arm, BC.
- [x] All MyAi / Fabric / Mac Hub references purged from history (repo deleted + recreated).
- [x] GameMaker hobby claim removed.
- [x] Contact section tone softened — no "no recruiters" framing.
