/**
 * Workflow Orchestration cover — pipeline boxes with one accent step.
 */
export function WorkflowCover() {
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
      {/* box stack — pipeline */}
      <g
        stroke="var(--ink)"
        strokeWidth="2"
        fill="none"
      >
        <rect x="100" y="220" width="140" height="80" />
        <rect x="320" y="220" width="140" height="80" />
        <rect x="540" y="220" width="160" height="80" />
        {/* arrows */}
        <line x1="240" y1="260" x2="320" y2="260" markerEnd="url(#arrow)" />
        <line x1="460" y1="260" x2="540" y2="260" markerEnd="url(#arrow)" />
      </g>
      {/* center box accent fill — the orchestrator */}
      <rect x="320" y="220" width="140" height="80" fill="var(--accent)" />
      {/* labels */}
      <g
        fontFamily="IBM Plex Mono, monospace"
        fontSize="13"
        fill="var(--ink)"
      >
        <text x="170" y="266" textAnchor="middle">INGEST</text>
        <text x="390" y="266" textAnchor="middle">ORCHESTRATE</text>
        <text x="620" y="266" textAnchor="middle">DELIVER</text>
      </g>
      {/* fan-out below center */}
      <g
        stroke="var(--ink)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.55"
      >
        <line x1="390" y1="300" x2="280" y2="420" />
        <line x1="390" y1="300" x2="390" y2="420" />
        <line x1="390" y1="300" x2="500" y2="420" />
        <rect x="240" y="420" width="80" height="40" />
        <rect x="350" y="420" width="80" height="40" />
        <rect x="460" y="420" width="80" height="40" />
      </g>
      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L9,3 z" fill="var(--ink)" />
        </marker>
      </defs>
    </svg>
  );
}
