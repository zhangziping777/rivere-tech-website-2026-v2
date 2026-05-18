export default function WorkflowNodes() {
  const nodes = [
    { x: 60, y: 30, label: "DATA", active: true },
    { x: 180, y: 30, label: "FILTER", active: true },
    { x: 300, y: 30, label: "DECIDE", active: true },
    { x: 120, y: 120, label: "EXEC", active: true },
    { x: 240, y: 120, label: "SYNC", active: false },
  ];

  const edges = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 4 },
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <svg
        viewBox="0 0 420 190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          <linearGradient id="flowLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00E599" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#00E599" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00E599" stopOpacity="0.15" />
          </linearGradient>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dotGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {edges.map((e, i) => {
          const f = nodes[e.from];
          const t = nodes[e.to];
          const fromX = f.x + 48;
          const fromY = f.y + 18;
          const toX = t.x;
          const toY = t.y + 18;

          return (
            <g key={i}>
              {/* Static edge — much brighter */}
              <path
                d={`M${fromX},${fromY} C${(fromX + toX) / 2},${fromY} ${(fromX + toX) / 2},${toY} ${toX},${toY}`}
                stroke="#00E599"
                strokeWidth="1"
                fill="none"
                opacity="0.35"
              />
              {/* Flowing dot — larger, brighter */}
              <circle r="3.5" fill="#00E599" opacity="0.8" filter="url(#dotGlow)">
                <animateMotion
                  dur={2 + i * 0.5}
                  repeatCount="indefinite"
                  path={`M${fromX},${fromY} C${(fromX + toX) / 2},${fromY} ${(fromX + toX) / 2},${toY} ${toX},${toY}`}
                />
              </circle>
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={i} opacity={n.active ? 1 : 0.45}>
            <rect
              x={n.x}
              y={n.y}
              width="96"
              height="36"
              rx="6"
              fill={n.active ? "#00E599" : "none"}
              fillOpacity={n.active ? 0.08 : 0}
              stroke="#00E599"
              strokeWidth={n.active ? "1" : "0.6"}
            />
            {n.active && (
              <rect
                x={n.x}
                y={n.y}
                width="96"
                height="36"
                rx="6"
                fill="none"
                stroke="#00E599"
                strokeWidth="0.5"
                opacity="0.5"
              >
                <animate
                  attributeName="opacity"
                  values="0.5;0.15;0.5"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </rect>
            )}
            <text
              x={n.x + 48}
              y={n.y + 22}
              fill="#00E599"
              fontSize="9.5"
              fontFamily="monospace"
              textAnchor="middle"
              fontWeight="600"
              opacity={n.active ? 1 : 0.5}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Legend bar */}
      <div className="flex items-center justify-center gap-5 mt-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse" />
          <span className="text-gray-400 text-[10px] font-mono">ACTIVE PIPELINE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00E599]/30" />
          <span className="text-gray-400 text-[10px] font-mono">PENDING QUEUE</span>
        </div>
      </div>
    </div>
  );
}
