# `/raw` — source-of-truth drop zone

This is where unstructured source material lands **before** it becomes a public page on the site.

Photos, voice-memo transcripts, build notes, sketched plans, materials receipts, video files — drop them here in the right subfolder and a synthesis pass (see [`../docs/plans/001-off-hours-expansion.md`](../docs/plans/001-off-hours-expansion.md)) turns them into draft MDX content for Curtis to review, edit, and ship.

## Convention

```
raw/
├── README.md                    (this file — committed)
├── .gitignore                   (committed — everything else here is local-only)
└── <domain>/
    └── <slug>/
        ├── notes.md             (loose first-person notes)
        ├── metadata.yml         (optional structured hints — year, materials, tools)
        ├── photos/
        │   ├── 001.jpg
        │   └── ...
        └── videos/              (optional)
```

### Domains (current plan)

- `craft/` — workshop and outdoor projects (construction, metal-fab, automotive, land, skate, dirt). See plan 001.
- _(future)_ `writing/` — research notes that feed essays.
- _(future)_ `talks/` — slide decks and transcripts.

### Slug naming

`kebab-case`. Be specific. `welding-cart-v2`, not `welding`. `front-yard-deck-2024`, not `deck`.

## What's gitignored

Everything inside `raw/` except `README.md` and `.gitignore` itself. This keeps the directory tracked in git so the convention persists, but lets Curtis drop GB of photos and video locally without bloating the repo or leaking unprocessed material into public history.

If a specific raw file should be committed for posterity (e.g. an architecture sketch worth preserving), add a `!raw/<path>` exception in `raw/.gitignore`.

## Workflow

1. Drop material into `raw/<domain>/<slug>/`.
2. Run `pnpm synthesize-craft -- --slug=<slug>` (tool lives in `scripts/`, ships in plan-001 phase 2).
3. Review the generated draft MDX at `src/content/<domain>/<slug>.mdx`.
4. Edit. Curtis is always the editor of record.
5. Commit the MDX, the curated photos under `public/images/<domain>/<slug>/`, and the data-file entry.
6. The raw material stays local — gitignored — as the source of truth for future regenerations.

## Safety

- Nothing in `raw/` is served by the site. The directory exists outside `public/` and outside `src/`.
- Nothing in `raw/` should contain PII you don't want on disk. Voice memos and personal notes are fine; tax docs, IDs, and account screenshots are not.
- This is not a backup target. Source files belong wherever you'd normally back them up; `raw/` is a processing staging area.
