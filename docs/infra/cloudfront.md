# CloudFront — canonical config for the static site + video assets

The site is served as a static export from S3 (`www.curtisblanchette.com`)
behind CloudFront. The CloudFront distribution id is held in the
`CLOUDFRONT_ID` GitHub Actions secret.

This document is the source of truth for *how the distribution should
be configured*. The CI workflow ships content with the right
`Cache-Control` headers; CloudFront still needs the right cache policy
and a couple of distribution-level settings to perform well — especially
for video.

## Goals

- **Byte-range video playback.** Visitors can seek a `<video>` element
  without re-downloading the file. Requires the `Range` header to reach
  S3 and to be part of the cache key at the edge.
- **Long edge cache for immutable assets.** Videos and Next chunks
  shouldn't be re-fetched from S3 on every viewer.
- **Short edge cache + revalidate for HTML.** Edits visible in minutes
  without a manual invalidation.
- **Targeted invalidations.** Mutable paths only — immutable assets are
  cache-busted by URL, not by invalidation.

## Cache-Control matrix

The CI workflow uploads with these headers (see `.github/workflows/dev.yml`):

| Prefix              | `Cache-Control`                                       | Rationale                                                                 |
| ------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------- |
| `/_next/static/*`   | `public, max-age=31536000, immutable`                 | Filenames are content-hashed; URL changes when content changes.           |
| `/videos/*`         | `public, max-age=31536000, immutable`                 | Slugs are stable. Re-encoding gets a new slug; we never overwrite a file. |
| everything else     | `public, max-age=60, s-maxage=300, must-revalidate`   | 5 min at the edge, 1 min in browser, revalidate when stale.               |

> Existing objects in the bucket from before this policy was introduced
> won't have these headers. Run `./scripts/cdn-backfill.sh` once to
> rewrite metadata server-side on every object already in S3.

## Required CloudFront settings

Audit the live distribution at any time:

```bash
CLOUDFRONT_ID=E1ABCDEF234567 ./scripts/cdn-audit.sh
```

The audit prints the current state and flags anything below the bar.
Apply the following in the AWS Console (Distribution → *Edit*) if the
audit reports red:

### 1. Default cache behavior → cache policy

Use the AWS-managed cache policy **`Managed-CachingOptimized`**
(`658327ea-f89d-4fab-a63d-7e88639e58f6`).

This policy is the only piece of config that makes video work
performantly:

- Forwards the `Range` header to the origin and includes it in the
  cache key, so a viewer seeking from 0:30 → 1:00 gets the right byte
  range from the edge (no full-file re-fetch).
- TTLs: min 1 s, default 1 day, max 1 year — perfectly aligned with
  our per-object `Cache-Control` headers (the origin always wins).
- Enables gzip + brotli on text content types.

The CachingOptimized policy is the right default for everything on this
site. There is **no need for a separate `/videos/*` behavior** unless
we later want different TTLs or a different origin for video.

### 2. Distribution settings

| Setting                  | Required value         | Why                                                                          |
| ------------------------ | ---------------------- | ---------------------------------------------------------------------------- |
| Compression              | Enabled                | Brotli for HTML/CSS/JS. Has no effect on video — already h.264.              |
| HTTP version             | `http2and3`            | HTTP/3 trims initial-connection RTT; matters for the first video-metadata fetch. |
| IPv6                     | Enabled                | Free reach improvement.                                                      |
| Viewer protocol policy   | `redirect-to-https`    | TLS-only.                                                                    |
| TLS min version          | `TLSv1.2_2021` or 1.3  | PCI / modern-baseline.                                                       |
| Default root object      | `index.html`           | Static export convention.                                                    |

### 3. Custom error responses

S3 returns its default XML 404 body for missing keys, which leaks
implementation detail. Wire CloudFront to surface our own page:

| Error code | Response page path | Response code | Min TTL |
| ---------- | ------------------ | ------------- | ------- |
| 403        | `/404.html`        | 404           | 10      |
| 404        | `/404.html`        | 404           | 10      |

The 403 row matters because S3 returns 403 for missing keys when the
bucket policy doesn't grant `s3:ListBucket`, which is the safe default.

### 4. Origin Access Control (OAC)

Verify the origin uses an **OAC** (not the legacy OAI). The S3 bucket
policy should grant `s3:GetObject` only to the CloudFront service
principal scoped to this distribution's ARN.

## What this gets us for video

For `memory-architectures.mp4` (9.1 MB, faststart h.264 720p30):

- **First view**: ~115 KB initial fetch (moov atom + first segment) →
  playback starts. Total cold-cache cost from origin: 9.1 MB once per
  edge location.
- **Subsequent views from the same edge**: served entirely from CF cache
  for up to a year. Origin sees zero traffic.
- **Returning visitor on the same device**: served from browser cache
  with no network request at all.
- **Seeking**: a byte-range request to the edge, served from cache,
  zero origin trips.

## When a video changes

We never overwrite a video. The slug is the version. If a transcript
correction or re-encode is needed:

1. Drop the new source in `raw/learn/<slug>-v2/source.mp4` (or rename to
   a versioned slug).
2. `pnpm video:optimize raw/learn/<slug>-v2/source.mp4 --poster=01:30`
3. Update the entry in `src/content/data/videos.ts` to point at the new
   slug.
4. The old slug remains live (orphaned) until its next CI sync, at
   which point `aws s3 sync --delete` evicts it from S3 and a
   `/videos/<old-slug>.*` invalidation can clear edge caches if needed.

## What this doesn't try to be

- **HLS / DASH adaptive bitrate.** For sub-2-minute talking heads at
  720p30 / ~1 Mbps total, the operational cost of HLS (transcoding
  ladders, segmenting, manifest management) isn't justified. Revisit
  if any single video crosses ~5 minutes or 1080p.
- **Signed URLs / private video.** All videos here are intentionally
  public.
- **Origin Shield.** Adds a regional cache layer between edges and S3.
  Saves origin GETs at scale; for a personal-site traffic profile it
  costs more than it saves. Re-evaluate if monthly origin GET cost
  becomes a line item.

## Scripts

- `scripts/cdn-audit.sh`     — read-only diagnostic, prints + flags issues.
- `scripts/cdn-backfill.sh`  — one-shot rewrite of `Cache-Control` on existing S3 objects.
- `scripts/optimize-video.mjs` (`pnpm video:optimize`) — re-encode source → web-ready MP4 + poster.
