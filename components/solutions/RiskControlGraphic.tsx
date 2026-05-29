"use client";

import { useState } from "react";

/* ── Golden-ratio center: 38% from top ── */
const CX = 400;
const CY = 152; // 400 × 0.38
const RX = 250;
const RY = 120;

interface NodeDef {
  label: string;
  sub: string;
  className: string;
}

const NODES: NodeDef[] = [
  { label: "数据采集", sub: "Collection",  className: "top-[calc(38%-120px)] left-1/2" },
  { label: "特征工程", sub: "Features",    className: "top-[calc(38%-60px)] left-[calc(50%+216.5px)]" },
  { label: "模型评分", sub: "Scoring",     className: "top-[calc(38%+60px)] left-[calc(50%+216.5px)]" },
  { label: "策略决策", sub: "Strategy",    className: "top-[calc(38%+120px)] left-1/2" },
  { label: "实时监控", sub: "Monitor",     className: "top-[calc(38%+60px)] left-[calc(50%-216.5px)]" },
  { label: "处置响应", sub: "Response",    className: "top-[calc(38%-60px)] left-[calc(50%-216.5px)]" },
];

const LINE_ENDS = [
  { x: 400,   y: 32  },  // top
  { x: 616.5, y: 92  },  // upper right
  { x: 616.5, y: 212 },  // lower right
  { x: 400,   y: 272 },  // bottom
  { x: 183.5, y: 212 },  // lower left
  { x: 183.5, y: 92  },  // upper left
];

export default function RiskControlGraphic() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="absolute inset-0">
      {/* ── Pixel grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0",
          maskImage: "radial-gradient(ellipse 65% 70% at 50% 38%, black 25%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 70% at 50% 38%, black 25%, transparent 100%)",
        }}
      />

      {/* ── SVG orbit layer ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="line-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dashed base track */}
        <ellipse
          cx={CX} cy={CY} rx={RX} ry={RY}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="2"
          strokeDasharray="4 6"
        />

        {/* Flowing glow arc */}
        <ellipse
          cx={CX} cy={CY} rx={RX} ry={RY}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeDasharray="100 1350"
          opacity="0.55"
          className="animate-[dash-flow_5s_linear_infinite]"
        />

        {/* Radial lines */}
        {LINE_ENDS.map((pt, i) => {
          const active = hovered === i;
          return (
            <line
              key={i}
              x1={CX} y1={CY}
              x2={pt.x} y2={pt.y}
              stroke={active ? "#06b6d4" : "rgba(255,255,255,0.05)"}
              strokeWidth={active ? 1.5 : 0.5}
              strokeDasharray={active ? "none" : "3 5"}
              filter={active ? "url(#line-glow)" : "none"}
              style={{ transition: "all 0.35s ease-out" }}
            />
          );
        })}
      </svg>

      {/* ── Node cards ── */}
      {NODES.map((node, i) => (
        <div
          key={i}
          className={`absolute flex flex-col items-center justify-center w-28 h-12 bg-[#0F172A]/80 backdrop-blur-md border border-cyan-500/30 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.15)] z-10 transition-all duration-300 cursor-pointer ${node.className} ${
            hovered === i
              ? "!border-cyan-400 !shadow-[0_0_25px_rgba(6,182,212,0.4)] -translate-y-1.5"
              : ""
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <span className={`text-xs font-bold transition-colors duration-300 ${hovered === i ? "text-white" : "text-slate-200"}`}>
            {node.label}
          </span>
          <span className={`text-[10px] transition-colors duration-300 ${hovered === i ? "text-cyan-400" : "text-cyan-500/70"}`}>
            {node.sub}
          </span>
          {hovered === i && (
            <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
          )}
        </div>
      ))}

      {/* ═══════════════════════════════════════════
          CENTER: Cyberpunk Shield Core
          ═══════════════════════════════════════════ */}
      <div className="absolute z-20" style={{ top: "38%", left: "50%", transform: "translate(-50%, -50%)" }}>
        {/* ── Layer 1: 150px glow sphere ── */}
        <div
          className="absolute rounded-full animate-pulse"
          style={{
            width: "150px",
            height: "150px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(6,182,212,0.08) 40%, transparent 70%)",
          }}
        />
        {/* Secondary wider glow ring */}
        <div
          className="absolute rounded-full animate-[pulse_3s_ease-in-out_1s_infinite]"
          style={{
            width: "200px",
            height: "200px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 65%)",
          }}
        />

        {/* ── Layer 2: Glassmorphic shield body ── */}
        <div
          className="relative w-[88px] h-[104px] bg-slate-950/80 backdrop-blur-xl border border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.35)]"
          style={{ clipPath: "polygon(50% 0%, 100% 20%, 95% 65%, 50% 100%, 5% 65%, 0% 20%)" }}
        >
          <div className="absolute inset-0 bg-cyan-400/5" />
        </div>
      </div>

      {/* ── Center label below core ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-center" style={{ marginTop: "calc(38% + 80px)" }}>
          <p className="font-mono text-cyan-400 text-[10px] tracking-[0.2em] font-bold">AnyEAST</p>
          <p className="text-cyan-400/40 text-[9px] tracking-wide mt-1">智能风控核心</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes dash-flow {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -1450; }
        }
      `}</style>
    </div>
  );
}
