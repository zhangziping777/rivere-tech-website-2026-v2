"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const CX = 400; const CY = 200; const RX = 280; const RY = 150;

interface NodeDef {
  label: string; sub: string;
  className: string;
  sx: number; sy: number;
}

const NODES: NodeDef[] = [
  { label: "数据采集", sub: "Collection",  className: "top-[calc(50%-150px)] left-1/2",                       sx: 400,   sy: 50  },
  { label: "特征加工", sub: "Features",    className: "top-[calc(50%-75px)] left-[calc(50%+242.5px)]",        sx: 642.5, sy: 125 },
  { label: "模型训练", sub: "Training",    className: "top-[calc(50%+75px)] left-[calc(50%+242.5px)]",        sx: 642.5, sy: 275 },
  { label: "策略编排", sub: "Strategy",    className: "top-[calc(50%+160px)] left-1/2",                       sx: 400,   sy: 360 },
  { label: "实时监测", sub: "Monitoring",  className: "top-[calc(50%+75px)] left-[calc(50%-242.5px)]",        sx: 157.5, sy: 275 },
  { label: "处置响应", sub: "Response",    className: "top-[calc(50%-75px)] left-[calc(50%-242.5px)]",        sx: 157.5, sy: 125 },
];

type Phase = "idle" | "incoming" | "collision";

export default function RiskControlGraphic() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const timer = useRef<NodeJS.Timeout | null>(null);

  const loop = useCallback(() => {
    timer.current = setTimeout(() => {
      setPhase("incoming");
      setTimeout(() => { setPhase("collision"); }, 1300);
      setTimeout(() => { setPhase("idle"); loop(); }, 2400);
    }, 5000);
  }, []);

  useEffect(() => { loop(); return () => { if (timer.current) clearTimeout(timer.current); }; }, [loop]);

  return (
    <div className="absolute inset-0" style={{ marginTop: "-8%" }}>

      {/* ═══ SVG LAYER ═══ */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 420" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="cg"><feGaussianBlur stdDeviation="2.5"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="rg"><feGaussianBlur stdDeviation="4"/><feMerge><feMergeNode in="blur"/><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <radialGradient id="dl1" cx="20%" cy="80%"><stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.12"/><stop offset="100%" stopColor="transparent"/></radialGradient>
          <radialGradient id="dl2" cx="85%" cy="15%"><stop offset="0%" stopColor="#1e40af" stopOpacity="0.10"/><stop offset="100%" stopColor="transparent"/></radialGradient>
        </defs>
        <rect width="800" height="420" fill="url(#dl1)"/><rect width="800" height="420" fill="url(#dl2)"/>

        {/* Ellipse tracks */}
        <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" strokeDasharray="4 6"/>
        <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke="#06b6d4" strokeWidth="1.8" strokeDasharray="100 1450" opacity="0.5" className="animate-[dashFlow_6s_linear_infinite]"/>

        {/* Bezier veins */}
        {NODES.map((n, i) => {
          const a = hovered === i;
          const mx = (CX + n.sx) / 2; const my = (CY + n.sy) / 2;
          const dx = n.sx - CX; const dy = n.sy - CY;
          const c1x = mx + dy * 0.25; const c1y = my - dx * 0.25;
          const c2x = mx - dy * 0.18; const c2y = my + dx * 0.18;
          const d = `M${n.sx},${n.sy} C${c1x},${c1y} ${c2x},${c2y} ${CX},${CY}`;
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={a ? "rgba(34,211,238,0.6)" : "rgba(6,182,212,0.18)"} strokeWidth={a ? 1.3 : 0.8} filter={a ? "url(#cg)" : "none"} style={{transition:"all 0.4s ease-out"}}/>
              <path d={d} fill="none" stroke="#00D2FF" strokeWidth={a ? 2 : 1.2} strokeDasharray="4 12" opacity={a ? 0.9 : 0.35} className="animate-[dash_3s_linear_infinite]"/>
              {a && <circle r="2.8" fill="#22D3EE" opacity="0.9" filter="url(#cg)"><animateMotion dur="1.2s" repeatCount="indefinite" path={d}/></circle>}
            </g>
          );
        })}

        {/* Red pulse */}
        {phase === "incoming" && (
          <g filter="url(#rg)">
            <line x1={0} y1={CY} x2={CX-25} y2={CY} stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
              <animate attributeName="x2" from="20" to={CX-25} dur="0.8s" fill="freeze"/>
            </line>
            <line x1={10} y1={CY-8} x2={CX-45} y2={CY-5} stroke="#f87171" strokeWidth="1.2" strokeLinecap="round" opacity="0.5">
              <animate attributeName="x2" from="30" to={CX-45} dur="0.9s" fill="freeze"/>
            </line>
            <circle r="6" fill="#ef4444" opacity="0.95"><animate attributeName="cx" from="5" to={CX-22} dur="1.3s" fill="freeze"/><animate attributeName="cy" values={`${CY}`} dur="0.1s"/></circle>
            <circle r="18" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.4"><animate attributeName="cx" from="5" to={CX-22} dur="1.3s" fill="freeze"/><animate attributeName="cy" values={`${CY}`} dur="0.1s"/></circle>
          </g>
        )}
      </svg>

      {/* Blue ripple */}
      {phase === "collision" && (
        <div className="absolute top-1/2 left-1/2 pointer-events-none z-30" style={{transform:"translate(-50%,-50%)"}}>
          <div className="rounded-full border border-cyan-400/50" style={{animation:"ripple 1s ease-out forwards",width:0,height:0}}/>
          <div className="rounded-full border border-cyan-300/30" style={{animation:"ripple 1s ease-out .2s forwards",width:0,height:0}}/>
          <div className="rounded-full border border-cyan-400/20" style={{animation:"ripple 1s ease-out .4s forwards",width:0,height:0}}/>
        </div>
      )}

      {/* Node cards */}
      {NODES.map((n, i) => (
        <div key={i} className={`absolute ${n.className} z-20 transition-all duration-400 cursor-default`} style={{transform:"translate(-50%,-50%)"}}
          onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
          <div className={`backdrop-blur-xl border rounded-lg px-3 py-2 w-32 text-center transition-all duration-400 ${hovered===i?"bg-white/10 border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.35)] -translate-y-1":"bg-white/5 border-white/10"}`}>
            <p className={`text-[11px] font-semibold leading-tight ${hovered===i?"text-white":"text-slate-200"}`}>{n.label}</p>
            <p className={`text-[9px] tracking-wider ${hovered===i?"text-cyan-400":"text-slate-500"}`}>{n.sub}</p>
          </div>
        </div>
      ))}

      {/* Center shield */}
      <div className="absolute top-1/2 left-1/2 z-25 pointer-events-none" style={{transform:"translate(-50%,-50%)"}}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/20 rounded-full blur-[50px] animate-pulse"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full animate-pulse" style={{background:"radial-gradient(circle,rgba(6,182,212,0.18) 0%,rgba(6,182,212,0.04) 50%,transparent 70%)"}}/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full animate-[pulse_2.5s_ease-in-out_0.4s_infinite]" style={{background:"radial-gradient(circle,rgba(6,182,212,0.25) 0%,rgba(6,182,212,0.06) 40%,transparent 60%)"}}/>

        {/* Glass body */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/60 backdrop-blur-md border border-cyan-500/30"
          style={{width:"120px",height:"144px",clipPath:"polygon(50% 0%,100% 16.7%,96% 54.2%,50% 100%,4% 54.2%,0% 16.7%)"}}/>

        {/* SVG outline */}
        <svg viewBox="0 0 100 120" width="120" height="144" className="relative" style={{filter:"drop-shadow(0 0 30px rgba(6,182,212,0.3))"}}>
          <defs>
            <linearGradient id="rcStroke" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8"/><stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5"/><stop offset="100%" stopColor="#0891b2" stopOpacity="0.6"/>
            </linearGradient>
            <linearGradient id="rcHl" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(6,182,212,0.15)"/><stop offset="100%" stopColor="transparent"/>
            </linearGradient>
          </defs>
          <polygon points="50,2 100,20 96,65 50,118 4,65 0,20" fill="none" stroke="url(#rcStroke)" strokeWidth="1.5"/>
          <polygon points="50,2 100,20 96,65 50,118 4,65 0,20" fill="rgba(6,182,212,0.04)"/>
          <polygon points="50,2 100,20 96,65 50,50 30,35" fill="url(#rcHl)"/>
          <line x1="50" y1="8" x2="50" y2="105" stroke="rgba(6,182,212,0.06)" strokeWidth="0.5"/>
        </svg>

        <div className="absolute left-1/2 -translate-x-1/2 text-center" style={{top:"158px"}}>
          <p className="font-mono text-cyan-400 text-[11px] tracking-[0.2em] font-bold" style={{textShadow:"0 0 16px rgba(34,211,238,0.5)"}}>AnyEAST</p>
          <p className="text-cyan-400/30 text-[9px] tracking-wide mt-0.5">智能风控核心</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes dashFlow { 0%{stroke-dashoffset:0} 100%{stroke-dashoffset:-1550} }
        @keyframes dash { 0%{stroke-dashoffset:0} 100%{stroke-dashoffset:-48} }
        @keyframes ripple { 0%{width:0;height:0;margin:0;opacity:.7} 100%{width:400px;height:400px;margin-top:-200px;margin-left:-200px;opacity:0} }
      `}</style>
    </div>
  );
}
