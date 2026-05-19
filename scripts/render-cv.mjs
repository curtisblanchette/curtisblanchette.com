#!/usr/bin/env node
/**
 * render-cv.mjs
 *
 * Renders public/cv.html → public/cv.pdf using headless Chrome.
 *
 * The HTML is the source of truth. Edit public/cv.html, then run:
 *
 *     pnpm cv:pdf
 *
 * No npm dependencies — uses the system Chrome / Chromium / Edge binary.
 * Locations searched (first hit wins):
 *   - $CHROME env var
 *   - macOS: /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
 *   - macOS: /Applications/Chromium.app/Contents/MacOS/Chromium
 *   - macOS: /Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge
 *   - PATH:  google-chrome, chromium, chromium-browser, msedge
 */

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const input = resolve(root, "public/cv.html");
const output = resolve(root, "public/cv.pdf");

if (!existsSync(input)) {
  console.error(`✗ Missing source: ${input}`);
  process.exit(1);
}

const candidates = [
  process.env.CHROME,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
].filter(Boolean);

function which(bin) {
  const r = spawnSync("which", [bin], { encoding: "utf8" });
  return r.status === 0 ? r.stdout.trim() : null;
}

let chrome = candidates.find((p) => p && existsSync(p));
if (!chrome) {
  for (const bin of ["google-chrome", "chromium", "chromium-browser", "msedge"]) {
    const p = which(bin);
    if (p) { chrome = p; break; }
  }
}

if (!chrome) {
  console.error("✗ No Chrome / Chromium / Edge binary found.");
  console.error("  Install Chrome or set CHROME=<path> and re-run.");
  process.exit(1);
}

console.log(`→ Using ${chrome}`);
console.log(`→ Rendering ${input}`);

const args = [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  "--no-margins",
  `--print-to-pdf=${output}`,
  `file://${input}`,
];

const res = spawnSync(chrome, args, { stdio: "inherit" });

if (res.status !== 0) {
  console.error(`✗ Chrome exited with status ${res.status}`);
  process.exit(res.status ?? 1);
}

console.log(`✓ Wrote ${output}`);
