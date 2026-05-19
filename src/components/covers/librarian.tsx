/**
 * Librarian cover — stack of skill cards with mono labels.
 */
export function LibrarianCover() {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      aria-hidden
    >
      <rect width="800" height="600" fill="var(--paper)" />
      {/* card stack — back to front */}
      <g
        stroke="var(--ink)"
        strokeWidth="1.5"
        fill="var(--paper)"
      >
        <rect x="220" y="80" width="380" height="80" transform="rotate(-3 410 120)" />
        <rect x="200" y="180" width="380" height="80" transform="rotate(-1.5 390 220)" />
        <rect x="210" y="280" width="380" height="80" />
        <rect x="220" y="380" width="380" height="80" transform="rotate(1.5 410 420)" />
      </g>
      {/* front card — accent strip */}
      <g>
        <rect
          x="210"
          y="280"
          width="6"
          height="80"
          fill="var(--accent)"
        />
        <text
          x="232"
          y="312"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="13"
          fill="var(--ink)"
          letterSpacing="1.4"
        >
          SKILL.md
        </text>
        <text
          x="232"
          y="336"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="11"
          fill="var(--ink)"
          opacity="0.6"
        >
          delivery · review · linear sync
        </text>
      </g>
      {/* index label */}
      <text
        x="400"
        y="540"
        textAnchor="middle"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="11"
        fill="var(--ink)"
        opacity="0.55"
        letterSpacing="2"
      >
        25+ SKILLS · 6 CATEGORIES
      </text>
    </svg>
  );
}
