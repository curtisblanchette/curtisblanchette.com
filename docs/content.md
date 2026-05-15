# Content model

Every public surface on the site is driven by typed data in `src/content/data/` plus optional MDX bodies in `src/content/{work,writing}/`. Adding content is a two-file change at most.

## Case study (`/work/<slug>`)

**1. Add metadata** — `src/content/data/work.ts`:

```ts
{
  slug: "my-project",
  title: "My Project",
  client: "Open Source",                       // or "Confidential client · Metalab"
  role: "Engineer",
  year: "2025",
  summary: "One-paragraph elevator pitch.",
  tags: ["TypeScript", "Rust", "..."],
  visibility: "public",                        // | "client-anon" | "internal"
  featured: false,                             // only one true at a time
  cover: "/images/work/my-project.svg",        // optional
  links: [{ label: "GitHub", href: "..." }],   // optional
}
```

**2. (Optional) Add long-form** — `src/content/work/my-project.mdx`:

```mdx
---
title: My Project
client: Open Source
role: Engineer
year: "2025"
summary: One-paragraph elevator pitch.
tags: ["TypeScript", "Rust"]
visibility: public
---

## The problem
...

## What I shipped
...
```

The MDX frontmatter is read by `gray-matter` for metadata redundancy and SEO; the body is rendered via `unified` (markdown → HTML). If the MDX file doesn't exist, the page renders the in-progress placeholder.

**Visibility modes**
- `public` — open-source, freely discussed, full case study.
- `client-anon` — client identity scrubbed; scope, role, and stack visible. No client name or logo.
- `internal` — Metalab-internal initiatives, not for outside-the-firm consumption.

Listing cards show the visibility as a badge.

## Essay (`/writing/<slug>`)

**One file** — `src/content/writing/my-essay.mdx`:

```mdx
---
title: My Essay
description: One-line teaser used on the index and in OG metadata.
date: "2025-11-01"                        # ISO; controls sort order
tags: ["AI", "Practice"]
draft: false                              # true hides from the public index
---

Opening graf...
```

No data-file entry needed — the writing index reads the directory directly. Posts sort by `date` descending. `draft: true` hides a post without deleting it.

## Career timeline

Edit `src/content/data/career.ts`. Order: most recent first. `end: "present"` is a sentinel.

## Stack / receipts

Edit `src/content/data/stack.ts`:

- `STACK[]` — grouped technology pills shown in the home Stack section.
- `ACCREDITATIONS[]` — single-line credit items shown in the right-hand "Receipts" panel.

## Hobbies (`Off Hours` tiles)

Edit `src/content/data/hobbies.ts`. Each tile has a category (`MUSIC` / `BUILD` / `OUTDOOR`), a blurb, and an optional detail line.

> **Note:** the bigger upcoming change here is splitting *projects* out of *blurbs* — see [`plans/001-off-hours-expansion.md`](./plans/001-off-hours-expansion.md). Don't pile project-sized content into hobby tiles in the meantime.

## Authoring conventions

- **Voice:** first-person, present-tense, no marketing fluff. Match the tone in [The Quiet Trade](../src/content/writing/the-quiet-trade.mdx) and the Atlantic Labs case study — declarative, concrete, willing to make a claim.
- **Code blocks:** triple-backtick with a language. Shiki highlights with `github-dark-dimmed`.
- **Tables:** GFM tables work via `remark-gfm`.
- **Internal links:** use absolute paths (`/work/...`, `/writing/...`), not relative `../`.
- **Images in MDX:** absolute path from `/public`. They're given a 1px border by the prose styles.
- **NDA hygiene:** never name a client unless the project metadata is already `visibility: public`. When in doubt, refer to "a confidential client engagement" and describe the *problem shape*, not the customer.

## Adding cover images

Either:
- Drop a real image at `public/images/work/<slug>.png|jpg|svg`, OR
- Generate a brutalist SVG placeholder following the pattern in `public/images/work/*.svg` (mono type, sharp box, single accent line, project name large, subtitle small).

If you don't supply a cover, the listing card falls back to a blank tile — works but visually quiet.
