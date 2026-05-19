#!/usr/bin/env bash
#
# cdn-audit.sh
#
# Read-only diagnostic for the CloudFront distribution serving the site.
# Pulls the live config, prints the settings that matter for video
# performance, and flags anything that hurts.
#
# Usage:
#     CLOUDFRONT_ID=E1ABCDEF234567 ./scripts/cdn-audit.sh
#
# Or pass the ID positionally:
#     ./scripts/cdn-audit.sh E1ABCDEF234567
#
# Requires `aws` and `jq` on PATH. The IAM principal needs
# cloudfront:GetDistribution and cloudfront:GetCachePolicy.

set -euo pipefail

DIST="${1:-${CLOUDFRONT_ID:-}}"
if [ -z "${DIST}" ]; then
  echo "✗ CloudFront distribution id required."
  echo "  Set CLOUDFRONT_ID or pass it as the first argument."
  exit 1
fi

command -v jq >/dev/null 2>&1 || { echo "✗ jq not found on PATH."; exit 1; }

c_red='\033[31m'
c_yellow='\033[33m'
c_green='\033[32m'
c_dim='\033[2m'
c_reset='\033[0m'

ok()    { printf "  ${c_green}✓${c_reset} %s\n" "$1"; }
warn()  { printf "  ${c_yellow}!${c_reset} %s\n" "$1"; }
fail()  { printf "  ${c_red}✗${c_reset} %s\n" "$1"; }
note()  { printf "  ${c_dim}·${c_reset} %s\n" "$1"; }

echo "→ Fetching distribution ${DIST}…"
CFG="$(aws cloudfront get-distribution --id "${DIST}" --output json)"
DCFG="$(echo "${CFG}" | jq '.Distribution.DistributionConfig')"

# --- top-line distribution settings -----------------------------------
echo
echo "── Distribution"
ENABLED=$(echo "${DCFG}" | jq -r '.Enabled')
HTTP=$(echo "${DCFG}"    | jq -r '.HttpVersion')
IPV6=$(echo "${DCFG}"    | jq -r '.IsIPV6Enabled')
PRICE=$(echo "${DCFG}"   | jq -r '.PriceClass')
DOMAIN=$(echo "${CFG}"   | jq -r '.Distribution.DomainName')
ALIASES=$(echo "${DCFG}" | jq -r '.Aliases.Items // [] | join(", ")')
note "Domain   : ${DOMAIN}"
note "Aliases  : ${ALIASES:-none}"
[ "$ENABLED" = "true" ] && ok "Enabled" || fail "Disabled"
case "$HTTP" in
  http2and3) ok "HTTP version: $HTTP" ;;
  http2)     warn "HTTP version: $HTTP — enabling HTTP/3 (http2and3) trims initial-connection RTT on video metadata fetches." ;;
  *)         warn "HTTP version: $HTTP — upgrade to http2and3." ;;
esac
[ "$IPV6" = "true" ] && ok "IPv6 enabled" || warn "IPv6 disabled"
note "Price class: ${PRICE}"

# --- default cache behavior -------------------------------------------
echo
echo "── Default cache behavior"
DCB="$(echo "${DCFG}" | jq '.DefaultCacheBehavior')"
TARGET=$(echo "${DCB}"  | jq -r '.TargetOriginId')
COMPRESS=$(echo "${DCB}" | jq -r '.Compress')
VPP=$(echo "${DCB}"     | jq -r '.ViewerProtocolPolicy')
POLICY_ID=$(echo "${DCB}" | jq -r '.CachePolicyId // empty')
LEGACY_FFWD=$(echo "${DCB}" | jq -r '.ForwardedValues // empty')
note "Origin: ${TARGET}"
[ "$COMPRESS" = "true" ] && ok "Compression enabled (gzip/br on text content)" || fail "Compression disabled — turn it on for HTML/CSS/JS."
[ "$VPP" = "redirect-to-https" ] || [ "$VPP" = "https-only" ] \
  && ok "Viewer protocol: $VPP" \
  || warn "Viewer protocol: $VPP — should redirect HTTP → HTTPS."

if [ -n "${POLICY_ID}" ]; then
  POLICY_JSON="$(aws cloudfront get-cache-policy --id "${POLICY_ID}" --output json)"
  POLICY_NAME=$(echo "${POLICY_JSON}" | jq -r '.CachePolicy.CachePolicyConfig.Name')
  HEADERS=$(echo "${POLICY_JSON}" | jq -r '.CachePolicy.CachePolicyConfig.ParametersInCacheKeyAndForwardedToOrigin.HeadersConfig | (.Headers.Items // []) | join(",")')
  HBEHAV=$(echo "${POLICY_JSON}"  | jq -r '.CachePolicy.CachePolicyConfig.ParametersInCacheKeyAndForwardedToOrigin.HeadersConfig.HeaderBehavior')
  MIN_TTL=$(echo "${POLICY_JSON}" | jq -r '.CachePolicy.CachePolicyConfig.MinTTL')
  DEF_TTL=$(echo "${POLICY_JSON}" | jq -r '.CachePolicy.CachePolicyConfig.DefaultTTL')
  MAX_TTL=$(echo "${POLICY_JSON}" | jq -r '.CachePolicy.CachePolicyConfig.MaxTTL')
  note "Cache policy: ${POLICY_NAME} (${POLICY_ID})"
  note "  TTLs : min=${MIN_TTL}s default=${DEF_TTL}s max=${MAX_TTL}s"
  note "  Headers (${HBEHAV}): ${HEADERS:-<none>}"

  # The single most important check for video: Range must reach origin
  # and be part of the cache key. Otherwise byte-range fetches fail or
  # behave inconsistently.
  if echo "${HEADERS}" | tr ',' '\n' | grep -iqx "Range"; then
    ok "Range header is forwarded and part of the cache key (byte-range video works)"
  else
    fail "Range header NOT in cache policy — byte-range video requests will not work correctly."
    note "  Fix: switch the default behavior to the managed policy"
    note "  'Managed-CachingOptimized' (id 658327ea-f89d-4fab-a63d-7e88639e58f6),"
    note "  which forwards Range as part of the cache key."
  fi
else
  fail "Default behavior uses LEGACY ForwardedValues, not a cache policy."
  note "  CloudFront recommends migrating to cache policies. The managed"
  note "  'CachingOptimized' policy forwards Range and is the right default"
  note "  for a static site with video."
  echo "${LEGACY_FFWD}" | jq '.' | sed 's/^/    /'
fi

# --- additional behaviors --------------------------------------------
echo
echo "── Additional behaviors"
N=$(echo "${DCFG}" | jq '.CacheBehaviors.Quantity // 0')
if [ "${N}" -eq 0 ]; then
  note "None — single default behavior handles all paths (fine for this site)."
else
  echo "${DCFG}" | jq -r '.CacheBehaviors.Items[] | "  · " + .PathPattern + "  →  " + (.CachePolicyId // .ForwardedValues // "?" | tostring)'
fi

# --- error responses --------------------------------------------------
echo
echo "── Custom error responses"
ERR=$(echo "${DCFG}" | jq '.CustomErrorResponses.Quantity // 0')
if [ "${ERR}" -eq 0 ]; then
  warn "None configured — visitors hit S3's default XML 404 page."
  note "Recommend: ErrorCode 403 + 404 → /404.html, ResponseCode 404, MinTTL 10."
else
  echo "${DCFG}" | jq -r '.CustomErrorResponses.Items[] | "  · " + (.ErrorCode|tostring) + " → " + (.ResponsePagePath // "(passthrough)") + "  (status " + (.ResponseCode // "passthrough") + ", TTL " + (.ErrorCachingMinTTL|tostring) + "s)"'
fi

# --- origins ----------------------------------------------------------
echo
echo "── Origins"
echo "${DCFG}" | jq -r '
  .Origins.Items[] |
  "  · " + .Id + "  →  " + .DomainName +
  "  (OAC: " + (.OriginAccessControlId // "—") +
  ", OAI: " + (.S3OriginConfig.OriginAccessIdentity // "—") + ")"
'

echo
echo "→ Audit complete."
