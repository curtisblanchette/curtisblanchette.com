#!/usr/bin/env bash
#
# cdn-backfill.sh
#
# One-shot rewrite of Cache-Control + Content-Type headers on objects
# ALREADY in the S3 bucket. Idempotent — re-running is safe and a no-op
# after the first successful pass.
#
# Background: the CI workflow sets Cache-Control on `aws s3 sync`
# upload, but `sync` only re-uploads changed files. Existing objects
# keep whatever headers they had at first upload (often nothing) →
# CloudFront / browsers fall back to the distribution default TTL.
# Run this once after deploying the workflow change to bring every
# object in the bucket up to spec.
#
# WHY THIS SCRIPT ALSO SETS Content-Type:
# `aws s3 cp --metadata-directive REPLACE --cache-control X` resets
# ALL metadata, including Content-Type. If you only pass --cache-
# control, every HTML file becomes binary/octet-stream and the browser
# downloads the page instead of rendering it (lesson learned the hard
# way — see commit history). We use `aws s3api copy-object` per key
# with BOTH headers set explicitly from the file extension.
#
# Usage:
#     ./scripts/cdn-backfill.sh [bucket]
#
# Defaults to www.curtisblanchette.com.
# Requires AWS_PROFILE / AWS_ACCESS_KEY_ID etc. with s3:GetObject +
# s3:PutObject on the bucket.

set -euo pipefail

BUCKET="${1:-www.curtisblanchette.com}"
REGION="${AWS_REGION:-us-west-2}"

# Some shells inherit a non-normalised AWS_DEFAULT_OUTPUT (e.g. "JSON"
# uppercase) that the CLI rejects even when --output is set explicitly.
# Force a known-good value for the duration of this script.
export AWS_DEFAULT_OUTPUT=json
export AWS_PAGER=""

command -v jq >/dev/null 2>&1 || { echo "✗ jq not found on PATH."; exit 1; }

# --------- helpers ----------------------------------------------------

# Extension → Content-Type. Covers everything the static export emits.
# Defaults extensionless keys to text/html (Next trailingSlash routes
# write index.html files; bare keys without an extension shouldn't
# happen, but octet-stream is a far worse failure mode).
content_type_for() {
  local key="$1"
  local lower
  # macOS bash 3.2 has no ${var,,} — use tr.
  lower="$(printf '%s' "$key" | tr '[:upper:]' '[:lower:]')"
  case "$lower" in
    *.html|*.htm)  echo "text/html; charset=utf-8" ;;
    *.css)         echo "text/css; charset=utf-8" ;;
    *.js|*.mjs)    echo "application/javascript; charset=utf-8" ;;
    *.json|*.map)  echo "application/json; charset=utf-8" ;;
    *.xml)         echo "application/xml; charset=utf-8" ;;
    *.txt)         echo "text/plain; charset=utf-8" ;;
    *.svg)         echo "image/svg+xml" ;;
    *.png)         echo "image/png" ;;
    *.jpg|*.jpeg)  echo "image/jpeg" ;;
    *.gif)         echo "image/gif" ;;
    *.webp)        echo "image/webp" ;;
    *.avif)        echo "image/avif" ;;
    *.ico)         echo "image/x-icon" ;;
    *.mp4)         echo "video/mp4" ;;
    *.webm)        echo "video/webm" ;;
    *.mp3)         echo "audio/mpeg" ;;
    *.pdf)         echo "application/pdf" ;;
    *.woff)        echo "font/woff" ;;
    *.woff2)       echo "font/woff2" ;;
    *.ttf)         echo "font/ttf" ;;
    *.otf)         echo "font/otf" ;;
    *)             echo "text/html; charset=utf-8" ;;
  esac
}

# Path prefix → Cache-Control bucket.
cache_control_for() {
  local key="$1"
  case "$key" in
    _next/static/*) echo "public, max-age=31536000, immutable" ;;
    videos/*)       echo "public, max-age=31536000, immutable" ;;
    *)              echo "public, max-age=60, s-maxage=300, must-revalidate" ;;
  esac
}

# --------- main -------------------------------------------------------

echo "→ Backfilling Cache-Control + Content-Type on s3://${BUCKET} (region ${REGION})"

# We use `aws s3api copy-object` per key (not `aws s3 cp --recursive`)
# so we can set the right Content-Type per extension. Slightly slower
# than recursive cp, but correct — and the bucket is small.

# Get every key via JSON + jq (sidesteps environments where --output
# text is rejected by a non-normalised AWS_DEFAULT_OUTPUT). Pages
# automatically via the CLI's built-in pagination.
KEYS_FILE="$(mktemp -t cdn-backfill-keys.XXXXXX)"
trap 'rm -f "$KEYS_FILE"' EXIT

aws s3api list-objects-v2 \
  --bucket "${BUCKET}" \
  --region "${REGION}" \
  --output json \
| jq -r '.Contents[]?.Key' \
> "${KEYS_FILE}"

total=$(wc -l < "${KEYS_FILE}" | tr -d ' ')
echo "→ ${total} object(s) to evaluate"

while IFS= read -r key; do
  [ -z "$key" ] && continue

  ct="$(content_type_for "$key")"
  cc="$(cache_control_for "$key")"

  # Idempotency check: read current ContentType + CacheControl as JSON
  # and parse with jq, falling back to empty strings if HEAD fails.
  head_json="$(
    aws s3api head-object \
      --bucket "${BUCKET}" \
      --key "${key}" \
      --region "${REGION}" \
      --output json 2>/dev/null || echo '{}'
  )"
  current_ct="$(echo "${head_json}" | jq -r '.ContentType // ""')"
  current_cc="$(echo "${head_json}" | jq -r '.CacheControl // ""')"

  if [ "${current_ct}" = "${ct}" ] && [ "${current_cc}" = "${cc}" ]; then
    printf '·'
    continue
  fi

  aws s3api copy-object \
    --bucket "${BUCKET}" \
    --key "${key}" \
    --copy-source "${BUCKET}/${key}" \
    --metadata-directive REPLACE \
    --content-type "${ct}" \
    --cache-control "${cc}" \
    --region "${REGION}" \
    --output json >/dev/null
  printf '+'
done < "${KEYS_FILE}"

echo
echo
echo "✓ Backfill complete."
echo
echo "  Spot-check:"
echo "    aws s3api head-object --bucket ${BUCKET} --key index.html --region ${REGION} --output yaml | grep -E 'ContentType|CacheControl'"
echo "    aws s3api head-object --bucket ${BUCKET} --key videos/memory-architectures.mp4 --region ${REGION} --output yaml | grep -E 'ContentType|CacheControl'"
echo
echo "  Then invalidate CloudFront so edges drop any bad-header copies:"
echo "    aws cloudfront create-invalidation --distribution-id \$CLOUDFRONT_ID --paths '/*'"
