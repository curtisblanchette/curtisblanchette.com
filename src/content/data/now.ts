/**
 * /now content. Drives the home Now block + the nav status pill.
 * Update whenever it stops being true.
 *
 * Voice rules from cb-site-kit/README:
 *   - First-person singular.
 *   - Plainspoken, declarative, specific.
 *   - The terminal lines are not jokes — they are accurate one-liners.
 */

export type TerminalLine =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; quoted?: string }
  | { kind: "cursor" };

export type NowEntry = {
  /** Lede paragraph, with one optional Eiko italic word. */
  lede: { before: string; italic?: string; after?: string };
  /** Date this was last considered true. Format: "YYYY · MM · DD". */
  updated: string;
  /** Optional sentence appended after the date with a live dot. */
  status?: string;
  /** Text inside the nav center pill. */
  statusPill: string;
  /** Lines rendered inside the right-column terminal panel. */
  terminal: TerminalLine[];
};

export const NOW: NowEntry = {
  lede: {
    before: "I lead engineering at ",
    italic: "Metalab",
    after:
      " — building AI-native client solutions, secure AI enablement for engineering teams, and the workflows that accelerate how engineers ship.",
  },
  updated: "2026 · 04 · 12",
  status: "Open to staff & principal-level conversations",
  statusPill: "Currently shipping",
  terminal: [
    { kind: "cmd", text: "cat ~/.plan" },
    { kind: "out", text: "shipping ......... ai-native client work · metalab" },
    { kind: "out", text: "enabling ......... secure AI for engineering teams" },
    { kind: "out", text: "defining ......... workflows that accelerate engineers" },
    { kind: "out", text: "writing .......... judgment as a priced layer" },
    {
      kind: "out",
      text: "reading .......... ",
      quoted: "\"The Soul of a New Machine\"",
    },
    { kind: "out", text: "building ......... cortex MPC · mycelium IoT" },
    { kind: "out", text: "avoiding ......... twitter, mostly" },
    { kind: "cmd", text: "uptime" },
    { kind: "out", text: "on this earth — 13,400 days & counting" },
    { kind: "cursor" },
  ],
};
