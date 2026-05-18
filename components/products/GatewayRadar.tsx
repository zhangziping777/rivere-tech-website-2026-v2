export default function GatewayRadar() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <radialGradient id="radarGlow">
            <stop offset="0%" stopColor="#00E599" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#00E599" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00E599" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#00E599" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* Center glow */}
        <circle cx="200" cy="180" r="120" fill="url(#radarGlow)" />

        {/* Radar concentric rings */}
        {[40, 80, 130, 190].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="180"
            r={r}
            stroke="#00E599"
            strokeWidth={0.5 - i * 0.08}
            opacity={0.25 - i * 0.04}
            strokeDasharray={i === 3 ? "4 6" : undefined}
          />
        ))}

        {/* Radar scan line - rotating */}
        <line
          x1="200"
          y1="180"
          x2="200"
          y2="60"
          stroke="#00E599"
          strokeWidth="0.6"
          opacity="0.5"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 200 180"
            to="360 200 180"
            dur="6s"
            repeatCount="indefinite"
          />
        </line>

        {/* Scan arc fade */}
        <path
          d="M200 180 L320 180 A120 120 0 0 1 200 60 Z"
          fill="#00E599"
          opacity="0.04"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 200 180"
            to="360 200 180"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>

        {/* Shield shape */}
        <path
          d="M200 140 L250 160 L250 230 Q250 280 200 310 Q150 280 150 230 L150 160 Z"
          fill="url(#shieldGrad)"
          stroke="#00E599"
          strokeWidth="1"
          opacity="0.7"
        />

        {/* Shield inner checkmark */}
        <path
          d="M180 210 L193 223 L222 188"
          stroke="#00E599"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />

        {/* Peripheral nodes */}
        {[
          { x: 80, y: 80 },
          { x: 320, y: 70 },
          { x: 340, y: 240 },
          { x: 60, y: 260 },
        ].map((p, i) => (
          <g key={i} opacity="0.3">
            <circle cx={p.x} cy={p.y} r="4" fill="none" stroke="#00E599" strokeWidth="0.6" />
            <circle cx={p.x} cy={p.y} r="1.5" fill="#00E599" />
            <line
              x1={p.x}
              y1={p.y}
              x2="200"
              y2="180"
              stroke="#00E599"
              strokeWidth="0.3"
              strokeDasharray="2 4"
            />
          </g>
        ))}

        {/* Incoming signal arcs */}
        <path
          d="M50 120 Q120 40 180 60"
          stroke="#00E599"
          strokeWidth="0.4"
          fill="none"
          opacity="0.15"
        />
        <path
          d="M350 90 Q310 30 250 45"
          stroke="#00E599"
          strokeWidth="0.4"
          fill="none"
          opacity="0.15"
        />

        {/* Data packet dots on arcs */}
        <circle r="2" fill="#00E599" opacity="0.5">
          <animateMotion dur="4s" repeatCount="indefinite" path="M50,120 Q120,40 180,60" />
        </circle>
        <circle r="2" fill="#00E599" opacity="0.5">
          <animateMotion dur="4s" repeatCount="indefinite" begin="2s" path="M350,90 Q310,30 250,45" />
        </circle>
      </svg>
    </div>
  );
}
