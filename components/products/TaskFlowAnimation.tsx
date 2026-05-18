export default function TaskFlowAnimation() {
  return (
    <div className="w-full aspect-[3/2] max-w-sm mx-auto">
      <svg
        viewBox="0 0 300 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00E599" stopOpacity="0" />
            <stop offset="50%" stopColor="#00E599" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00E599" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="nodeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00E599" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00E599" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Connecting lines */}
        <line x1="75" y1="60" x2="225" y2="60" stroke="#00E599" strokeWidth="0.5" opacity="0.15" />
        <line x1="75" y1="100" x2="150" y2="140" stroke="#00E599" strokeWidth="0.5" opacity="0.12" />
        <line x1="150" y1="140" x2="225" y2="100" stroke="#00E599" strokeWidth="0.5" opacity="0.12" />
        <line x1="75" y1="140" x2="225" y2="140" stroke="#00E599" strokeWidth="0.5" opacity="0.15" />

        {/* Animated flow dots on main pipeline */}
        <circle r="2.5" fill="#00E599" opacity="0.6">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M75,60 L225,60"
          />
        </circle>
        <circle r="2" fill="#00E599" opacity="0.35">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            begin="1.5s"
            path="M75,60 L225,60"
          />
        </circle>

        {/* Node 1 — Trigger */}
        <rect x="50" y="30" width="50" height="24" rx="4" fill="url(#nodeGrad)" stroke="#00E599" strokeWidth="0.7" opacity="0.9" />
        <text x="75" y="46" fill="#00E599" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.8">
          TRIGGER
        </text>

        {/* Node 2 — Process */}
        <rect x="125" y="30" width="50" height="24" rx="4" fill="url(#nodeGrad)" stroke="#00E599" strokeWidth="0.7" opacity="0.9" />
        <text x="150" y="46" fill="#00E599" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.8">
          PROCESS
        </text>

        {/* Node 3 — Validate */}
        <rect x="200" y="30" width="50" height="24" rx="4" fill="url(#nodeGrad)" stroke="#00E599" strokeWidth="0.7" opacity="0.9" />
        <text x="225" y="46" fill="#00E599" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.8">
          VALIDATE
        </text>

        {/* Node 4 — Fan-out */}
        <rect x="50" y="110" width="50" height="24" rx="4" fill="url(#nodeGrad)" stroke="#00E599" strokeWidth="0.7" opacity="0.7" />
        <text x="75" y="126" fill="#00E599" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.6">
          DISPATCH
        </text>

        {/* Node 5 — Complete */}
        <rect x="125" y="110" width="50" height="24" rx="4" fill="url(#nodeGrad)" stroke="#00E599" strokeWidth="0.7" opacity="0.7" />
        <text x="150" y="126" fill="#00E599" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.6">
          NOTIFY
        </text>

        {/* Node 6 — Archive */}
        <rect x="200" y="110" width="50" height="24" rx="4" fill="url(#nodeGrad)" stroke="#00E599" strokeWidth="0.7" opacity="0.7" />
        <text x="225" y="126" fill="#00E599" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.6">
          ARCHIVE
        </text>

        {/* Progress bar at bottom */}
        <rect x="50" y="165" width="200" height="3" rx="1.5" fill="#00E599" opacity="0.08" />
        <rect x="50" y="165" width="80" height="3" rx="1.5" fill="#00E599" opacity="0.35">
          <animate attributeName="width" values="60;140;60" dur="4s" repeatCount="indefinite" />
        </rect>

        {/* Checkmarks on completed nodes */}
        <g opacity="0.5">
          <circle cx="75" cy="42" r="14" fill="none" stroke="#00E599" strokeWidth="0.4" strokeDasharray="1 2" opacity="0.4" />
          <circle cx="150" cy="42" r="14" fill="none" stroke="#00E599" strokeWidth="0.4" strokeDasharray="1 2" opacity="0.4" />
        </g>
      </svg>
    </div>
  );
}
