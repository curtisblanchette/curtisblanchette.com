/**
 * Figma MCP Core cover — three-layer security schematic.
 * Concentric rings: AI · proxy · API; accent ring is the guarded layer.
 */
export function FigmaMcpCover() {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      aria-hidden
    >
      <rect width="800" height="600" fill="var(--paper-2)" />
      <g transform="translate(400 300)">
        {/* outer ring — AI client */}
        <circle r="220" fill="none" stroke="var(--ink)" strokeWidth="2" />
        {/* middle ring — guarded proxy (accent) */}
        <circle r="150" fill="none" stroke="var(--accent)" strokeWidth="3.5" />
        {/* inner ring — Figma API */}
        <circle r="80" fill="none" stroke="var(--ink)" strokeWidth="2" />
        {/* core dot */}
        <circle r="20" fill="var(--ink)" />
        {/* labels */}
        <g
          fontFamily="IBM Plex Mono, monospace"
          fontSize="11"
          fill="var(--ink)"
          letterSpacing="1.5"
        >
          <text y="-235" textAnchor="middle">AI CLIENT</text>
          <text y="-165" textAnchor="middle" fill="var(--accent)">
            MCP PROXY
          </text>
          <text y="-95" textAnchor="middle">FIGMA API</text>
        </g>
        {/* arrow markers — request inbound */}
        <g stroke="var(--accent)" strokeWidth="2" fill="none">
          <line x1="-220" y1="0" x2="-150" y2="0" markerEnd="url(#a2)" />
          <line x1="150" y1="0" x2="80" y2="0" markerEnd="url(#a2)" />
        </g>
      </g>
      <defs>
        <marker
          id="a2"
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L9,3 z" fill="var(--accent)" />
        </marker>
      </defs>
    </svg>
  );
}
