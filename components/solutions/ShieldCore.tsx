"use client";

export default function ShieldCore() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
      style={{ marginTop: "-8%" }}>
      {/* ── Glow sphere behind shield ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/20 rounded-full blur-[50px] animate-pulse" />

      {/* ── Outer glow rings ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full animate-pulse"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(6,182,212,0.04) 50%, transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full animate-[pulse_2.5s_ease-in-out_0.4s_infinite]"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(6,182,212,0.06) 40%, transparent 60%)" }} />

      {/* ── Glassmorphic shield body ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/60 backdrop-blur-md border border-cyan-500/30"
        style={{
          width: "120px", height: "144px",
          clipPath: "polygon(50% 0%, 100% 16.7%, 96% 54.2%, 50% 100%, 4% 54.2%, 0% 16.7%)",
        }} />

      {/* ── SVG shield outline ── */}
      <svg viewBox="0 0 100 120" width="120" height="144" className="relative"
        style={{ filter: "drop-shadow(0 0 30px rgba(6,182,212,0.3))" }}>
        <defs>
          <linearGradient id="scStroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="scHl" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(6,182,212,0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <polygon points="50,2 100,20 96,65 50,118 4,65 0,20" fill="none" stroke="url(#scStroke)" strokeWidth="1.5" />
        <polygon points="50,2 100,20 96,65 50,118 4,65 0,20" fill="rgba(6,182,212,0.04)" />
        <polygon points="50,2 100,20 96,65 50,50 30,35" fill="url(#scHl)" />
        <line x1="50" y1="8" x2="50" y2="105" stroke="rgba(6,182,212,0.06)" strokeWidth="0.5" />
      </svg>

      {/* ── AnyEAST label ── */}
      <div className="absolute left-1/2 -translate-x-1/2 text-center" style={{ top: "calc(50% + 82px)" }}>
        <p className="font-mono text-cyan-400 text-[11px] tracking-[0.2em] font-bold"
          style={{ textShadow: "0 0 16px rgba(34,211,238,0.5)" }}>
          AnyEAST
        </p>
        <p className="text-cyan-400/30 text-[9px] tracking-wide mt-0.5">智能风控核心</p>
      </div>
    </div>
  );
}
