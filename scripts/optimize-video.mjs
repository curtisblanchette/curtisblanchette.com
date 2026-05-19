#!/usr/bin/env node
/**
 * optimize-video.mjs
 *
 * Re-encodes a raw video for web delivery from public/videos/ on
 * S3 + CloudFront, plus extracts a poster frame.
 *
 *     pnpm video:optimize <path-to-source.mp4> [--poster=<HH:MM:SS|seconds>]
 *
 * Output (alongside ../public/videos/):
 *   - <slug>.mp4              h.264 + AAC, 720p30, ~2 Mbps, faststart
 *   - <slug>.poster.jpg       frame at --poster (default 00:00:02),
 *                             1280x720, quality 3
 *
 * Pick the poster timestamp by scrubbing the source and finding the
 * single frame that best telegraphs the lesson (often a key slide,
 * not the cold-open face).
 *
 * The source file is left untouched. Drop sources into raw/learn/<slug>/
 * (gitignored per raw/.gitignore) so the heavy original stays local.
 *
 * Requires `ffmpeg` on PATH (Homebrew: `brew install ffmpeg`).
 */

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import { basename, dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const outDir = resolve(root, "public/videos");

function die(msg, code = 1) {
  console.error(`✗ ${msg}`);
  process.exit(code);
}

function fmtBytes(n) {
  const mb = n / 1024 / 1024;
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(n / 1024).toFixed(0)} KB`;
}

const ffmpeg = spawnSync("which", ["ffmpeg"], { encoding: "utf8" });
if (ffmpeg.status !== 0) {
  die("ffmpeg not found on PATH. Install with `brew install ffmpeg`.");
}

const args = process.argv.slice(2);
const posterFlag = args.find((a) => a.startsWith("--poster="));
const posterAt = posterFlag ? posterFlag.split("=", 2)[1] : "00:00:02";
const positional = args.filter((a) => !a.startsWith("--"));
const src = positional[0];
if (!src) {
  die("Usage: pnpm video:optimize <path-to-source.mp4> [--poster=<HH:MM:SS|seconds>]");
}
const srcAbs = resolve(src);
if (!existsSync(srcAbs)) die(`Source not found: ${srcAbs}`);

const slug = basename(srcAbs, extname(srcAbs)).replace(/^source$/, basename(dirname(srcAbs)));
const outMp4 = resolve(outDir, `${slug}.mp4`);
const outPoster = resolve(outDir, `${slug}.poster.jpg`);

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

console.log(`→ Source : ${srcAbs} (${fmtBytes(statSync(srcAbs).size)})`);
console.log(`→ Output : ${outMp4}`);
console.log(`→ Poster : ${outPoster}`);

// Encode to a web-friendly 720p30 ~2Mbps mp4 with faststart so CloudFront
// can begin playback before the whole file is buffered.
const encodeArgs = [
  "-y",
  "-i", srcAbs,
  "-vf", "scale=-2:720:flags=lanczos,fps=30",
  "-c:v", "libx264",
  "-profile:v", "high",
  "-level", "4.0",
  "-preset", "slow",
  "-crf", "23",
  "-maxrate", "2500k",
  "-bufsize", "5000k",
  "-pix_fmt", "yuv420p",
  "-c:a", "aac",
  "-b:a", "128k",
  "-ac", "2",
  "-movflags", "+faststart",
  outMp4,
];

console.log("\n→ Encoding…");
let res = spawnSync("ffmpeg", encodeArgs, { stdio: "inherit" });
if (res.status !== 0) die(`ffmpeg encode failed (${res.status})`);

// Poster frame at --poster (default 2s). For explainer-style videos
// a thesis-slide timestamp usually beats the cold-open face shot.
const posterArgs = [
  "-y",
  "-ss", posterAt,
  "-i", srcAbs,
  "-vframes", "1",
  "-vf", "scale=-2:720",
  "-q:v", "3",
  outPoster,
];

console.log(`\n→ Extracting poster at ${posterAt}…`);
res = spawnSync("ffmpeg", posterArgs, { stdio: "inherit" });
if (res.status !== 0) die(`ffmpeg poster failed (${res.status})`);

const finalMp4 = statSync(outMp4).size;
const finalPoster = statSync(outPoster).size;
console.log(`\n✓ ${outMp4} (${fmtBytes(finalMp4)})`);
console.log(`✓ ${outPoster} (${fmtBytes(finalPoster)})`);
