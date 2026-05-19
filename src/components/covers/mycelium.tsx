/**
 * Mycelium cover — branching network/graph. Dark ground, accent edges.
 * 4:3, two-colour, no hardcoded hex.
 */
export function MyceliumCover() {
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
      {/* edges */}
      <g
        stroke="var(--accent)"
        strokeWidth="1.4"
        fill="none"
        opacity="0.85"
      >
        <path d="M 400 300 L 200 160" />
        <path d="M 400 300 L 620 140" />
        <path d="M 400 300 L 140 360" />
        <path d="M 400 300 L 700 380" />
        <path d="M 400 300 L 320 500" />
        <path d="M 400 300 L 540 520" />
        <path d="M 200 160 L 90 90" />
        <path d="M 620 140 L 740 60" />
        <path d="M 140 360 L 60 470" />
        <path d="M 700 380 L 760 500" />
        <path d="M 320 500 L 220 580" />
        <path d="M 540 520 L 600 580" />
      </g>
      {/* nodes */}
      <g fill="var(--accent)">
        <circle cx="400" cy="300" r="9" />
        <circle cx="200" cy="160" r="6" />
        <circle cx="620" cy="140" r="6" />
        <circle cx="140" cy="360" r="6" />
        <circle cx="700" cy="380" r="6" />
        <circle cx="320" cy="500" r="6" />
        <circle cx="540" cy="520" r="6" />
      </g>
      <g fill="var(--invert-ink)" opacity="0.6">
        <circle cx="90" cy="90" r="4" />
        <circle cx="740" cy="60" r="4" />
        <circle cx="60" cy="470" r="4" />
        <circle cx="760" cy="500" r="4" />
        <circle cx="220" cy="580" r="4" />
        <circle cx="600" cy="580" r="4" />
      </g>
    </svg>
  );
}
