/**
 * Cover registry. Maps a work slug to its theme-aware SVG component.
 * Consumed by `<ProjectCard>`.
 *
 * Rules:
 *   - Every cover uses `var(--paper)`, `var(--ink)`, `var(--accent)`,
 *     `var(--invert-bg)`, `var(--invert-ink)`, etc. — never a hex literal.
 *   - 4:3 aspect (viewBox `0 0 800 600`).
 *   - One small accent shape per cover so theme retoning is visible.
 *
 * Slugs covered here are everything *except* `the-atlantic-labs`, which
 * has a real screenshot at `/images/atlantic/home.png` (set via
 * `WorkItem.coverImage`).
 */

import { CortexCover } from "./cortex";
import { CredentialCover } from "./credential-verification";
import { FigmaMcpCover } from "./figma-mcp-core";
import { GenericCover } from "./generic";
import { GraphifyCover } from "./graphify-rs";
import { LibrarianCover } from "./librarian";
import { LongevityCover } from "./longevity-platform";
import { MyceliumCover } from "./mycelium";
import { OmakaseCover } from "./omakase-stack";
import { PiExtensionsCover } from "./pi-extensions";
import { WorkflowCover } from "./workflow-orchestration";

export const COVERS: Record<string, () => React.JSX.Element> = {
  cortex: CortexCover,
  "credential-verification": CredentialCover,
  "figma-mcp-core": FigmaMcpCover,
  "graphify-rs": GraphifyCover,
  librarian: LibrarianCover,
  "longevity-platform": LongevityCover,
  mycelium: MyceliumCover,
  "omakase-stack": OmakaseCover,
  "pi-extensions": PiExtensionsCover,
  "workflow-orchestration": WorkflowCover,
};

export { GenericCover };
