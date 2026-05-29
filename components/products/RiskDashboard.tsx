export default function RiskDashboard() {
  const gauges = [
    { label: "FRAUD", value: 0.12, color: "#06B6D4" },
    { label: "CREDIT", value: 0.68, color: "#f59e0b" },
    { label: "APPROVAL", value: 0.91, color: "#06B6D4" },
    { label: "LATENCY", value: 0.22, color: "#ef4444" },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="rounded-xl !bg-white/5 !backdrop-blur-md !border !border-white/10 p-6">
        {/* Dashboard header */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-cyan-400 text-2xs font-mono tracking-widest uppercase">
            Live Risk Monitor
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-2xs font-mono">ONLINE</span>
          </span>
        </div>

        {/* Gauge grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {gauges.map((g) => (
            <div
              key={g.label}
              className="rounded-lg !bg-white/5 !border !border-white/[0.06] p-3"
            >
              <p className="text-text-muted text-2xs font-mono mb-2">{g.label}</p>
              <div className="flex items-end gap-2">
                <span className="text-text-primary text-lg font-mono font-semibold tabular-nums">
                  {(g.value * 100).toFixed(0)}%
                </span>
                {/* Mini bar */}
                <div className="flex-1 h-1.5 mb-1 rounded-full bg-brand-border overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${g.value * 100}%`,
                      backgroundColor: g.color,
                      opacity: g.value > 0.8 ? 0.9 : 0.5,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Status indicators row */}
        <div className="flex items-center gap-3 mb-5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${
                i <= 6 ? "bg-cyan-400/60" : "bg-red-500/40"
              }`}
            />
          ))}
          <span className="text-text-muted text-2xs font-mono ml-1">6/8 UP</span>
        </div>

        {/* Data stream lines */}
        <div className="space-y-2">
          {[82, 45, 67, 33].map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-text-muted text-2xs font-mono w-8 shrink-0">
                CH{i + 1}
              </span>
              <div className="flex-1 h-1 rounded-full bg-brand-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-cyan-400/25"
                  style={{ width: `${w}%` }}
                />
              </div>
              <span className="text-text-muted text-2xs font-mono w-8 text-right tabular-nums">
                {w > 60 ? (
                  <span className="text-cyan-400/60">{w}ms</span>
                ) : (
                  <span>{w}ms</span>
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Animated rotating ring in corner */}
        <svg className="absolute top-3 right-3 w-12 h-12 opacity-30" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke="#06B6D4" strokeWidth="1" strokeDasharray="4 6">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 24 24"
              to="360 24 24"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </div>
  );
}
