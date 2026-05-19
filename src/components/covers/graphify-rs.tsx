/**
 * graphify-rs cover — knowledge graph with three edge confidences:
 *   solid = EXTRACTED, dashed = INFERRED, dotted = AMBIGUOUS.
 */
export function GraphifyCover() {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      aria-hidden
    >
      <rect width="800" height="600" fill="var(--invert-bg)" />
      <g
        stroke="var(--accent)"
        strokeWidth="1.6"
        fill="none"
      >
        {/* EXTRACTED — solid */}
        <line x1="180" y1="180" x2="380" y2="300" />
        <line x1="380" y1="300" x2="600" y2="200" />
        <line x1="380" y1="300" x2="540" y2="460" />
        {/* INFERRED — dashed */}
        <line
          x1="180"
          y1="180"
          x2="240"
          y2="440"
          strokeDasharray="8 6"
        />
        <line
          x1="600"
          y1="200"
          x2="540"
          y2="460"
          strokeDasharray="8 6"
        />
        {/* AMBIGUOUS — dotted */}
        <line
          x1="240"
          y1="440"
          x2="540"
          y2="460"
          strokeDasharray="2 6"
          opacity="0.6"
        />
        <line
          x1="180"
          y1="180"
          x2="600"
          y2="200"
          strokeDasharray="2 6"
          opacity="0.6"
        />
      </g>
      <g fill="var(--accent)">
        <circle cx="180" cy="180" r="10" />
        <circle cx="380" cy="300" r="13" />
        <circle cx="600" cy="200" r="10" />
        <circle cx="240" cy="440" r="9" />
        <circle cx="540" cy="460" r="9" />
      </g>
    </svg>
  );
}
