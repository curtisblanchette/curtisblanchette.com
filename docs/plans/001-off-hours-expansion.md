# Plan 001 — Off-Hours expansion → CRAFT pillar

**Status:** drafted · not started
**Owner:** Curtis
**Depends on:** material in `/raw` (currently empty — Curtis backfills)
**Sister docs:** [`../content.md`](../content.md), [`../design-system.md`](../design-system.md)

## Why

The current "Off Hours" section is six blurb tiles. That format works for *hobbies* (guitar, wakeboarding, coaching) — it does not work for **projects**: built things with photos, build logs, materials, tools, and durations. Curtis's actual off-hours output is project-shaped:

- Construction projects
- Metal fabrication
- Go-karts
- Tree felling / chainsaw work
- Skateboarding
- Dirt jumping

Several of these are skilled-craft endeavours with real artifacts. They deserve case-study treatment, not a one-liner. Visually, raw workshop photography — weld beads, sparks, sawdust, chainsaw chips, sweat — is exactly what a brutalist site wants for contrast against the mono-text-everywhere baseline.

This plan promotes off-hours from a teaser tile to a third content pillar: **Software · Writing · Craft.**

## End state (what "done" looks like)

- A new top-level route `/craft` with a listing index, plus `/craft/<slug>` detail pages.
- A new content type `CraftProject` (data file + optional MDX body) — same two-file pattern as Work.
- The home `Off Hours` section becomes a slim teaser linking into `/craft`, retaining the existing hobby blurbs for things that *don't* warrant a project page (guitar, wakeboarding, coaching, writing).
- Navigation in `Header` updated: `INDEX · WORK · CRAFT · WRITING · STACK · CONTACT`.
- At least 4–6 craft projects authored from raw material, each with a gallery, build log, materials list, and tool list.
- A local synthesis tool (`scripts/synthesize-craft.ts`) that takes a `/raw/craft/<slug>/` folder and generates a draft `src/content/craft/<slug>.mdx`. Curtis reviews, edits, commits.

## Scope notes

- **Visibility:** all craft projects are `public`. No NDAs in the workshop.
- **Hobbies that stay as tiles:** guitar/music, wakeboarding, writing, coaching/culture, off-hours reading. These are *practices*, not projects. They live in the existing `OffHours` component.
- **Hobbies promoted to craft projects:** construction, metal fabrication, go-karts, tree felling, skateboarding, dirt jumping — each potentially multiple projects (a deck, a welding rig, a kart build, a jump line).

## Content model

### TS index — `src/content/data/craft.ts`

```ts
export type CraftDomain =
  | "construction"
  | "metal-fab"
  | "automotive"      // go-karts, small engines
  | "land"            // tree felling, clearing, chainsaw work
  | "skate"
  | "dirt";

export type CraftProject = {
  slug: string;
  title: string;
  domain: CraftDomain;
  year: string;             // "2024" or "2024–2025"
  status: "complete" | "in-progress" | "shelved";
  summary: string;          // one-paragraph elevator pitch
  materials?: string[];     // e.g. ["mild steel tube", "1/4\" plate", "self-tappers"]
  tools?: string[];         // e.g. ["MIG welder", "plasma cutter", "angle grinder"]
  duration?: string;        // "3 weekends" / "ongoing"
  cover?: string;           // /images/craft/<slug>/cover.jpg
  gallery?: string[];       // /images/craft/<slug>/...
  featured?: boolean;
};

export const CRAFT: CraftProject[] = [/* ... */];
```

### MDX body — `src/content/craft/<slug>.mdx`

```mdx
---
title: <Project Title>
domain: metal-fab
year: "2025"
status: complete
summary: One-paragraph pitch.
materials:
  - 1.5" mild steel tube
  - 1/4" plate
tools:
  - MIG welder
  - 4.5" angle grinder
  - plasma cutter
---

## The brief

What I wanted to build and why.

## Build

Step-by-step or anecdotal. Photos inline.

## What I learned

The substrate paragraph. The thing nobody else would write because it isn't impressive — but it's the actual thing.
```

Same `gray-matter` + `unified` pipeline as Work. No new MDX runtime, no new rendering layer.

## Routes

- `/craft` — index, grouped by domain, newest first within each group.
- `/craft/<slug>` — detail page with hero photo, frontmatter spec sheet (`FieldRow` rows), build log MDX, gallery strip.

Each grouped by domain on the index using the same `[01] / DOMAIN` brutalist section headers already used on the home page.

## Components to add

| Component | Role |
|---|---|
| `<CraftGrid />` | Listing grid, grouped by domain (uses existing `SectionHeader` pattern). |
| `<CraftCard />` | Card variant for craft projects — slightly taller than work cards to accommodate a real photo. |
| `<Gallery />` | Brutalist photo strip — 1px borders, no captions, hover invert. Used inside MDX bodies. |
| `<SpecSheet />` | Frontmatter spec rendered as `<FieldRow>`s (materials, tools, duration). |

All built on existing primitives — no new design tokens needed.

## The `/raw` workflow

```
raw/
├── README.md                   (convention; committed)
├── .gitignore                  (everything except README and .gitkeep)
└── craft/
    ├── <slug>/
    │   ├── notes.md            (Curtis's loose notes — voice memos transcribed, jotted thoughts)
    │   ├── photos/
    │   │   ├── 001.jpg
    │   │   ├── 002.jpg
    │   │   └── ...
    │   ├── videos/             (optional)
    │   └── metadata.yml        (optional structured hints)
    └── ...
```

### Synthesis tool (CLI)

`scripts/synthesize-craft.ts` — local-only, run when there's material to process. **Not in the build pipeline.**

Flow:

1. **Index** raw folder: list files, classify by extension.
2. **Read** all `notes.md` + `metadata.yml` content.
3. **Vision pass** (optional): for each photo, ask a vision-capable LLM for a one-line description and a domain guess.
4. **Synthesis prompt** to an LLM: "Here are Curtis's notes, the photo descriptions, and the metadata. Curtis writes like *X* — first-person, declarative, willing to admit what didn't work. Draft an MDX case study following the schema in `docs/plans/001-off-hours-expansion.md`."
5. **Output** a draft MDX at `src/content/craft/<slug>.mdx` + a stub entry in `src/content/data/craft.ts`. **Both marked `status: in-progress`** until Curtis flips them.
6. **Copy** photos into `public/images/craft/<slug>/` with sensible filenames; populate `gallery: []` in the data entry.
7. Curtis reviews, edits, commits.

The tool is a *draft generator*, not a deployment pipeline. Curtis is always the editor of record.

### Why not server-side RAG?

Two options were considered:

| Option | Pros | Cons |
|---|---|---|
| Build-time synthesis → MDX (chosen) | Static site stays static. Content lives in version control. Editorial control 100%. No runtime LLM cost. | Photos must be manually approved into `/public`. |
| Runtime RAG over `/raw` index | Dynamic, query-able, "ask the workshop a question" | Adds a server. Adds an LLM bill. Pollutes the brutalist surface with a chat box. Not in the spirit of the site. |

The static-site / build-time approach is firmly the right answer for a personal portfolio. A runtime RAG endpoint may become interesting later as a curiosity (`/ask`), but it is not on the critical path.

## Implementation phases

### Phase 0 — Foundation (committed alongside this plan)
- `docs/` directory with all current-build documentation.
- Empty `/raw/` directory with `README.md` describing the drop-zone convention.
- `.gitignore` rule keeping `/raw/**` out of git except `README.md` and the directory structure.

### Phase 1 — Content type
Touch lists:
- `src/content/data/craft.ts` — type + empty array.
- `src/content/craft/.gitkeep`.
- `src/app/craft/page.tsx` + `src/app/craft/[slug]/page.tsx` — modeled exactly on `work/`.
- `src/components/craft-grid.tsx`, `craft-card.tsx`, `gallery.tsx`, `spec-sheet.tsx`.
- Update `src/components/header.tsx` nav to include `CRAFT`.
- Update home `Off Hours` section to teaser-link into `/craft`.
- Update `src/app/sitemap.ts` to include craft routes.

Verify: typecheck + build + smoke test of empty `/craft` index (renders "Workshop quiet — back soon" placeholder).

### Phase 2 — Synthesis tool
- `scripts/synthesize-craft.ts` — Node + an LLM SDK (Anthropic or OpenAI).
- Reads from `raw/craft/<slug>/`, writes to `src/content/craft/<slug>.mdx` and `public/images/craft/<slug>/`.
- Dry-run mode (default) prints the draft without writing.
- Add `pnpm synthesize-craft -- --slug=<slug>` script.
- Document tool usage in `docs/synthesis.md`.

### Phase 3 — First content batch
Curtis backfills `/raw/craft/<slug>/` for the first 4–6 projects (one per domain ideally). Synthesis tool runs. Curtis edits drafts. Commit.

Acceptance: `/craft` index has 4+ live projects with real photos, real materials lists, real build logs. Home page Off Hours section links to the right place.

### Phase 4 — Iterate
- Refine the synthesis prompt as more material comes in and the voice gets sharper.
- Add filtering / search if the project count exceeds ~15.
- Consider per-domain landing pages (`/craft/metal-fab`) if any single domain hits ~5+ projects.

## Open questions for Curtis

1. **Domain list** — is `construction · metal-fab · automotive · land · skate · dirt` the right partition, or do you want a different cut (e.g. "wheels" instead of separate skate/dirt/auto)?
2. **Featured pick** — when phase 3 lands, which one project earns the FEATURED slot on `/craft`? (Same role as Atlantic Labs does on `/work`.)
3. **Photo aesthetic** — workshop photos as-shot, or do they get a brutalist treatment (high-contrast B&W, grain, etc.)? My take: as-shot, full colour, single 1px border. The surrounding mono UI does enough framing.
4. **Videos** — embed inline (autoplay-muted, looping clips of a weld bead or a kart launch) or thumbnail-only with a click-out? My take: thumbnail-only at first; revisit when there's video material to test against.
5. **Off-hours hobby tiles in their current form** — keep on the home page as a small block linking into `/craft`, or move entirely to `/craft` and drop from home? My take: keep a slim home block (3 tiles: practice / writing / craft-link).

## Non-goals

- A blog / changelog. Project pages are not date-sorted streams.
- A CMS. Content lives in MDX, full stop.
- Social embed buttons / share widgets. Brutalist sites do not have those.
- Comments. Brutalist sites do not have those.
