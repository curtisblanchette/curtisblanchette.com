/**
 * Cortex MPC cover — ECG/control-signal waveform vs accent setpoint.
 */
export function CortexCover() {
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
      {/* horizontal setpoint line — accent */}
      <line
        x1="60"
        x2="740"
        y1="320"
        y2="320"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeDasharray="6 6"
      />
      {/* gridlines */}
      <g stroke="var(--ink)" strokeWidth="1" opacity="0.08">
        <line x1="60" x2="740" y1="200" y2="200" />
        <line x1="60" x2="740" y1="440" y2="440" />
        <line x1="200" x2="200" y1="120" y2="520" />
        <line x1="400" x2="400" y1="120" y2="520" />
        <line x1="600" x2="600" y1="120" y2="520" />
      </g>
      {/* response curve */}
      <path
        d="M 60 470 C 140 470, 180 200, 260 200 S 380 460, 460 320 S 600 240, 740 310"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* setpoint marker dot */}
      <circle cx="460" cy="320" r="6" fill="var(--accent)" />
      <circle
        cx="460"
        cy="320"
        r="14"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}
