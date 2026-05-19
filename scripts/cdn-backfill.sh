#!/usr/bin/env bash
#
# cdn-backfill.sh
#
# One-shot rewrite of Cache-Control headers on objects ALREADY in the
# S3 bucket. Idempotent: re-running is safe and a no-op after the first
# successful pass.
#
# Background: the CI workflow now sets Cache-Control on `aws s3 sync`
# upload, but `sync` only re-uploads changed files. Existing objects in
# the bucket keep whatever headers they had at first upload (typically
# none → CloudFront / browsers fall back to the distribution default).
# Run this once after deploying the workflow change to rewrite headers
# on everything currently in the bucket.
#
# Usage:
#     ./scripts/cdn-backfill.sh [bucket]
#
# Defaults to www.curtisblanchette.com if no bucket argument is passed.
# Requires AWS_PROFILE / AWS_ACCESS_KEY_ID etc. configured locally with
# s3:GetObject + s3:PutObject + s3:PutObjectAcl on the bucket.

set -euo pipefail

BUCKET="${1:-www.curtisblanchette.com}"
REGION="${AWS_REGION:-us-west-2}"

echo "→ Backfilling Cache-Control on s3://${BUCKET} (region ${REGION})"

# `aws s3 cp ... --metadata-directive REPLACE` rewrites object metadata
# without changing content. Doing it server-side (no download/upload of
# bytes) is the cheapest option.

backfill_prefix() {
  local prefix="$1"
  local cache_control="$2"
  local label="$3"

  echo
  echo "→ ${label}"
  echo "  prefix       : s3://${BUCKET}/${prefix}"
  echo "  cache-control: ${cache_control}"

  # The "copy in place" idiom: src == dst, REPLACE the metadata.
  aws s3 cp \
    "s3://${BUCKET}/${prefix}" \
    "s3://${BUCKET}/${prefix}" \
    --recursive \
    --metadata-directive REPLACE \
    --cache-control "${cache_control}" \
    --region "${REGION}" \
    --only-show-errors
}

# Immutable: content-hashed Next chunks + stable-slug video assets.
backfill_prefix "_next/static/" \
  "public, max-age=31536000, immutable" \
  "Long-cache (immutable) — Next.js hashed chunks"

backfill_prefix "videos/" \
  "public, max-age=31536000, immutable" \
  "Long-cache (immutable) — videos & posters"

# Everything else (HTML, sitemap, CV, root) → short edge cache + revalidate.
# We do this in a loop over top-level keys excluding the two immutable
# prefixes above, because `aws s3 cp` doesn't support recursive copy with
# excludes the way `sync` does.

echo
echo "→ Short-cache (must-revalidate) — HTML, sitemap, CV, root"
aws s3api list-objects-v2 \
  --bucket "${BUCKET}" \
  --region "${REGION}" \
  --query 'Contents[].Key' \
  --output text \
| tr '\t' '\n' \
| grep -Ev '^(_next/static/|videos/)' \
| while read -r key; do
    [ -z "$key" ] && continue
    aws s3 cp \
      "s3://${BUCKET}/${key}" \
      "s3://${BUCKET}/${key}" \
      --metadata-directive REPLACE \
      --cache-control "public, max-age=60, s-maxage=300, must-revalidate" \
      --region "${REGION}" \
      --only-show-errors
    printf '.'
  done
echo

echo
echo "✓ Backfill complete. Verify with:"
echo "    aws s3api head-object --bucket ${BUCKET} --key videos/memory-architectures.mp4 --region ${REGION} | jq .CacheControl"
