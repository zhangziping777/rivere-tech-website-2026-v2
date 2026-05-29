"use client";

import { useState } from "react";

interface NodeDef {
  label: string;
  sub: string;
  className: string;
}

/* ── Ellipse params: cx=400 cy=200 rx=250 ry=120 ── */
const NODES: NodeDef[] = [
  { label: "数据采集", sub: "Collection",  className: "top-[calc(50%-120px)] left-1/2" },
  { label: "特征工程", sub: "Features",    className: "top-[calc(50%-60px)] left-[calc(50%+216.5px)]" },
  { label: "模型评分", sub: "Scoring",     className: "top-[calc(50%+60px)] left-[calc(50%+216.5px)]" },
  { label: "策略决策", sub: "Strategy",    className: "top-[calc(50%+120px)] left-1/2" },
  { label: "实时监控", sub: "Monitor",     className: "top-[calc(50%+60px)] left-[calc(50%-216.5px)]" },
  { label: "处置响应", sub: "Response",    className: "top-[calc(50%-60px)] left-[calc(50%-216.5px)]" },
];

/* SVG line endpoints: ellipse cx=400 cy=200 rx=250 ry=120 */
const LINE_ENDS = [
  { x: 400,   y: 80  },  // θ=-90°  top
  { x: 616.5, y: 140 },  // θ=-30°  upper right
  { x: 616.5, y: 260 },  // θ= 30°  lower right
  { x: 400,   y: 320 },  // θ= 90°  bottom
  { x: 183.5, y: 260 },  // θ=150°  lower left
  { x: 183.5, y: 140 },  // θ=210°  upper left
];

export default function RiskControlGraphic() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="absolute inset-0">
      {/* ── Pixel-aligned grid: px-based, mask-faded at edges ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0",
          maskImage: "radial-gradient(ellipse 65% 70% at 50% 50%, black 25%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 70% at 50% 50%, black 25%, transparent 100%)",
        }}
      />

      {/* ── SVG layer: ellipse orbit + radial lines ── */}
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

        {/* Dashed base elliptical track */}
        <ellipse
          cx="400" cy="200" rx="250" ry="120"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="2"
          strokeDasharray="4 6"
        />

        {/* Flowing glow arc on the elliptical track */}
        <ellipse
          cx="400" cy="200" rx="250" ry="120"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeDasharray="100 1350"
          opacity="0.55"
          className="animate-[dash-flow_5s_linear_infinite]"
        />

        {/* Radial lines center → each node */}
        {LINE_ENDS.map((pt, i) => {
          const active = hovered === i;
          return (
            <line
              key={i}
              x1="400" y1="200"
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

      {/* ── Glassmorphic node cards ── */}
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

      {/* ── Center shield core ── */}
      <div className="absolute top-1/2 left-1/2 z-20" style={{ transform: "translate(-50%, -50%)" }}>
        {/* Shield container */}
        <div className="relative flex items-center justify-center w-24 h-24 bg-cyan-500/10 rounded-full border border-cyan-500/25 shadow-[0_0_50px_rgba(6,182,212,0.5)]">
          {/* Inner glow balls — layered for depth */}
          <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg animate-pulse" />
          <div className="absolute inset-2 bg-cyan-300/15 rounded-full blur-md animate-[pulse_2.5s_ease-in-out_0.5s_infinite]" />

          {/* SVG shield icon */}
          <svg viewBox="0 0 48 48" className="relative w-14 h-14 z-10" fill="none">
            <path
              d="M24 6 L38 10 L38 24 C38 34 24 42 24 42 C24 42 10 34 10 24 L10 10 Z"
              stroke="#67e8f9"
              strokeWidth="1.5"
              fill="rgba(6,182,212,0.15)"
            />
            <path
              d="M18 23 L22 27 L30 19"
              stroke="#67e8f9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* ── Center label below shield ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-center" style={{ marginTop: "96px" }}>
          <p className="text-white/70 text-xs tracking-[0.15em] font-semibold">ANYEAST</p>
          <p className="text-white/40 text-[10px] tracking-wide mt-1">智能风控核心</p>
        </div>
      </div>

      {/* ── Inline keyframe for dash-flow animation ── */}
      <style jsx>{`
        @keyframes dash-flow {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -1450; }
        }
      `}</style>
    </div>
  );
}
