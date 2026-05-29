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

      {/* ── Modern Semi-Transparent Shield SVG ── */}
      <div className="relative flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-24 h-24 text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] relative z-10"
        >
          {/* Right side — semi-transparent */}
          <path fill="currentColor" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" opacity="0.2" />
          {/* Left side — solid highlight */}
          <path fill="currentColor" d="M12 22c0 0-8-4-8-10V5l8-3v20z" opacity="0.9" />
        </svg>
      </div>

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
