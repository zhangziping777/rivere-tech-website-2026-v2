"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Shield, Layers, Workflow, Brain } from "lucide-react";

/* ── Types ── */
interface ArchNode {
  id: string;
  label: string;
  sub: string;
  badges: string[];
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  cx: number; cy: number; w: number; h: number;
}
interface EdgeDef { id: string; from: string; to: string; multi?: boolean; }
interface PathData { id: string; from: string; to: string; strands: string[]; }
type Point = { x: number; y: number };

/* ── Ecosystem pills ── */
interface EcoPill { label: string; x: number; y: number; }
const ECO_PILLS: EcoPill[] = [
  { label: "VISA / Mastercard", x: 140, y: 16 },
  { label: "Web3 稳定币",        x: 300, y: 16 },
  { label: "全渠道 APP/POS",     x: 600, y: 16 },
  { label: "开放 API 生态",      x: 760, y: 16 },
];

/* ── Node layout — expanded for breathing room (viewBox 900×560) ── */
const NODES: ArchNode[] = [
  {
    id: "gateway", label: "AnyGateway", sub: "融合支付网关核心",
    badges: ["协议自转换", "服务编排", "路由管控"],
    icon: Shield, cx: 450, cy: 82, w: 230, h: 64,
  },
  {
    id: "task", label: "AnyTASK", sub: "流程自动化管理核心",
    badges: ["统一流程设计", "全链路闭环"],
    icon: Workflow, cx: 195, cy: 268, w: 230, h: 64,
  },
  {
    id: "txn", label: "AnyTXN", sub: "信用卡及零售信贷核心",
    badges: ["发卡与收单", "TXA交易账户", "积分权益"],
    icon: Layers, cx: 195, cy: 448, w: 230, h: 64,
  },
  {
    id: "east", label: "AnyEAST & AnyDATA", sub: "智能决策与数据底座",
    badges: ["智慧风控决策", "智能BI分析"],
    icon: Brain, cx: 640, cy: 355, w: 250, h: 64,
  },
];

const EDGES: EdgeDef[] = [
  { id: "gw-tk", from: "gateway", to: "task",  multi: true },
  { id: "gw-tx", from: "gateway", to: "txn",   multi: true },
  { id: "gw-ea", from: "gateway", to: "east",  multi: true },
  { id: "tk-tx", from: "task",   to: "txn" },
  { id: "tk-ea", from: "task",   to: "east" },
  { id: "tx-ea", from: "txn",    to: "east" },
];

/* ── Zone dashed borders — expanded with generous padding ── */
interface ZoneRect { id: string; label: string; x: number; y: number; w: number; h: number; }
const ZONES: ZoneRect[] = [
  { id: "core-zone", label: "业务核心与运营区",   x: 42, y: 185, w: 410, h: 350 },
  { id: "data-zone", label: "数据与智能区",       x: 480, y: 230, w: 395, h: 255 },
];

/* ── Background crosshairs ── */
const CROSSHAIRS: Point[] = [
  { x: 60, y: 120 }, { x: 340, y: 100 }, { x: 560, y: 80 }, { x: 800, y: 120 },
  { x: 60, y: 400 }, { x: 450, y: 530 }, { x: 780, y: 500 }, { x: 850, y: 440 },
  { x: 430, y: 170 }, { x: 830, y: 540 },
];

/* ── Port helper ── */
function port(n: ArchNode, side: "top" | "bottom" | "left" | "right"): Point {
  const hw = n.w / 2, hh = n.h / 2;
  switch (side) {
    case "top":    return { x: n.cx, y: n.cy - hh };
    case "bottom": return { x: n.cx, y: n.cy + hh };
    case "left":   return { x: n.cx - hw, y: n.cy };
    case "right":  return { x: n.cx + hw, y: n.cy };
  }
}

function addP(a: Point, b: Point): Point {
  return { x: a.x + b.x, y: a.y + b.y };
}

/** Build all strands for an edge */
function buildStrands(from: ArchNode, to: ArchNode, multi: boolean): string[] {
  const center = buildPath(from, to, { x: 0, y: 0 });
  if (!multi) return [center];

  const dx = to.cx - from.cx, dy = to.cy - from.cy;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const px = -dy / len, py = dx / len;
  const off = 7;
  return [
    buildPath(from, to, { x: px * off, y: py * off }),
    center,
    buildPath(from, to, { x: -px * off, y: -py * off }),
  ];
}

/** Build a single bezier path between two nodes */
function buildPath(from: ArchNode, to: ArchNode, offset: Point): string {
  const s = addP(getSourcePort(from, to), offset);
  const e = addP(getTargetPort(from, to), offset);

  if (from.id === "gateway" && (to.id === "task" || to.id === "txn")) {
    const midY = (s.y + e.y) / 2;
    return `M${s.x},${s.y} C${s.x},${midY} ${e.x - 40},${midY} ${e.x},${e.y}`;
  }
  if (from.id === "gateway" && to.id === "east") {
    return `M${s.x},${s.y} C${s.x + 70},${s.y + 40} ${e.x - 90},${e.y - 20} ${e.x},${e.y}`;
  }
  if (from.id === "task" && to.id === "txn") {
    return `M${s.x},${s.y} L${s.x},${e.y}`;
  }
  if ((from.id === "task" || from.id === "txn") && to.id === "east") {
    const midX = (s.x + e.x) / 2;
    return `M${s.x},${s.y} C${midX},${s.y} ${midX},${e.y} ${e.x},${e.y}`;
  }
  return `M${s.x},${s.y} C${s.x + 40},${s.y} ${e.x - 40},${e.y} ${e.x},${e.y}`;
}

function getSourcePort(from: ArchNode, to: ArchNode): Point {
  if (from.id === "gateway") {
    if (to.id === "east") return port(from, "right");
    return port(from, "bottom");
  }
  if (from.id === "task") {
    if (to.id === "txn") return port(from, "bottom");
    return port(from, "right");
  }
  if (from.id === "txn") return port(from, "right");
  return port(from, "right");
}

function getTargetPort(from: ArchNode, to: ArchNode): Point {
  if (to.id === "task") return port(to, "top");
  if (to.id === "txn") {
    if (from.id === "gateway") return port(to, "left");
    return port(to, "top");
  }
  if (to.id === "east") {
    if (from.id === "gateway") return port(to, "top");
    if (from.id === "task") return port(to, "left");
    return port(to, "bottom");
  }
  return port(to, "left");
}

/* ── de Casteljau ── */
function bezierPoint(t: number, p0: Point, p1: Point, p2: Point, p3: Point): Point {
  const u = 1 - t;
  return {
    x: u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x,
    y: u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y,
  };
}

function parsePath(d: string): { p0: Point; p1: Point; p2: Point; p3: Point } {
  const cm = d.match(/M([\d.]+),([\d.]+)\s*C([\d.]+),([\d.]+)\s+([\d.]+),([\d.]+)\s+([\d.]+),([\d.]+)/);
  if (cm) {
    return {
      p0: { x: +cm[1], y: +cm[2] }, p1: { x: +cm[3], y: +cm[4] },
      p2: { x: +cm[5], y: +cm[6] }, p3: { x: +cm[7], y: +cm[8] },
    };
  }
  const lm = d.match(/M([\d.]+),([\d.]+)\s*L([\d.]+),([\d.]+)/);
  if (lm) {
    const p0 = { x: +lm[1], y: +lm[2] }, p3 = { x: +lm[3], y: +lm[4] };
    const mid = { x: (p0.x + p3.x) / 2, y: (p0.y + p3.y) / 2 };
    return { p0, p1: mid, p2: mid, p3 };
  }
  return { p0: {x:0,y:0}, p1: {x:0,y:0}, p2: {x:0,y:0}, p3: {x:0,y:0} };
}

/* ── Particle ── */
function FlowParticle({ pathD, delay, idx, active }: { pathD: string; delay: number; idx: number; active: boolean }) {
  const circleRef = useRef<SVGCircleElement>(null);
  const ptsRef = useRef(parsePath(pathD));

  useEffect(() => { ptsRef.current = parsePath(pathD); }, [pathD]);

  useEffect(() => {
    const el = circleRef.current!;
    if (!el) return;
    let raf: number;
    const duration = 2000 + idx * 150;
    const start = performance.now() + delay;

    function tick(now: number) {
      const elapsed = now - start;
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
      let t = (elapsed % duration) / duration;
      t = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const { p0, p1, p2, p3 } = ptsRef.current;
      const pt = bezierPoint(t, p0, p1, p2, p3);
      el!.setAttribute("cx", String(pt.x));
      el!.setAttribute("cy", String(pt.y));
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [delay, idx]);

  const sizes = [2.8, 2.0, 1.6, 2.4, 1.8];
  const size = sizes[idx % sizes.length];
  return (
    <circle
      ref={circleRef}
      r={size}
      fill="#06B6D4"
      opacity={active ? 0.85 : 0.15}
      style={{ transition: "opacity 0.4s", filter: active ? "url(#archParticleGlow)" : "none" }}
    />
  );
}

const PARTICLE_OFFSETS = [0, 400, 800, 1200, 1600];

/* ── Flow Edge ── */
function FlowEdge({ path, active }: { path: PathData; active: boolean }) {
  return (
    <>
      {path.strands.map((d, si) => (
        <g key={`strand-${si}`}>
          <path d={d} stroke="#374151" strokeWidth={si === 1 ? 1.4 : 0.7} fill="none" />
          <motion.path
            d={d}
            stroke="#06B6D4"
            strokeWidth={si === 1 ? (active ? 2 : 0.8) : (active ? 1.2 : 0.5)}
            strokeDasharray="6 16"
            fill="none"
            opacity={si === 1 ? (active ? 0.55 : 0.2) : (active ? 0.35 : 0.12)}
            filter={active && si === 1 ? "url(#archLineGlow)" : undefined}
            animate={{ strokeDashoffset: [0, -44] }}
            transition={{ duration: active ? 0.7 + si * 0.15 : 2.5, repeat: Infinity, ease: "linear" }}
            style={{ transition: "opacity 0.4s, stroke-width 0.4s" }}
          />
          {PARTICLE_OFFSETS.filter((_, i) => si === 1 || i % 2 === 0).map((off, i) => (
            <FlowParticle
              key={`p${i}`}
              pathD={d}
              delay={off + i * 200 + si * 80}
              idx={si * 5 + i}
              active={active}
            />
          ))}
        </g>
      ))}
    </>
  );
}

/* ── Background binary ── */
const BINARY_SPRINKLES = [
  "0100 1101", "1011", "0110 0011", "1100", "0010 1001",
  "1110", "0101", "1001 0110", "0011", "1101 1000",
  "0111", "1010 0100", "0001", "1111 0010",
];
const BIN_POSITIONS: Point[] = [
  { x: 40, y: 60 }, { x: 800, y: 55 }, { x: 350, y: 520 },
  { x: 820, y: 180 }, { x: 40, y: 190 }, { x: 420, y: 140 },
  { x: 830, y: 450 }, { x: 880, y: 310 }, { x: 40, y: 500 },
  { x: 440, y: 545 }, { x: 800, y: 520 }, { x: 100, y: 540 },
  { x: 860, y: 100 }, { x: 40, y: 330 },
];

/* ── Main ── */
export default function ArchitectureMap() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const paths: PathData[] = useMemo(() => EDGES.map((e) => {
    const from = NODES.find((n) => n.id === e.from)!;
    const to = NODES.find((n) => n.id === e.to)!;
    return { id: e.id, from: e.from, to: e.to, strands: buildStrands(from, to, !!e.multi) };
  }), []);

  function isEdgeActive(edge: { from: string; to: string }) {
    if (!hoveredNode) return true;
    return edge.from === hoveredNode || edge.to === hoveredNode;
  }

  return (
    <div className="relative w-full aspect-[16/10] min-h-[520px] max-w-5xl mx-auto rounded-xl !bg-white/5 !backdrop-blur-md !border !border-white/10 overflow-hidden select-none shadow-2xl">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 900 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="archParticleGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="archLineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Crosshairs */}
        {CROSSHAIRS.map((ch, i) => (
          <g key={`cross-${i}`} opacity={0.2}>
            <line x1={ch.x - 6} y1={ch.y} x2={ch.x + 6} y2={ch.y} stroke="#9CA3AF" strokeWidth={0.5} />
            <line x1={ch.x} y1={ch.y - 6} x2={ch.x} y2={ch.y + 6} stroke="#9CA3AF" strokeWidth={0.5} />
            <circle cx={ch.x} cy={ch.y} r={1} fill="#9CA3AF" />
          </g>
        ))}

        {/* Binary */}
        {BIN_POSITIONS.map((bp, i) => (
          <text key={`bin-${i}`} x={bp.x} y={bp.y} fill="#6B6F80" opacity={0.13} fontSize={6.5} fontFamily="monospace">
            {BINARY_SPRINKLES[i]}
          </text>
        ))}

        {/* Zone borders — labels now positioned with more offset */}
        {ZONES.map((z) => (
          <g key={z.id}>
            <rect x={z.x} y={z.y} width={z.w} height={z.h} rx={8} stroke="#6B7280" strokeWidth={1.2} strokeDasharray="6 8" fill="none" opacity={0.85} />
            <text x={z.x + 18} y={z.y + 18} fill="#D1D5DB" opacity={0.9} fontSize={9} fontFamily="monospace" letterSpacing="2">{z.label}</text>
          </g>
        ))}

        {/* Ecosystem pill dashed lines → Gateway top */}
        {ECO_PILLS.map((pill) => {
          const gwTop = port(NODES[0], "top");
          const midY = (pill.y + gwTop.y) / 2;
          return (
            <g key={`eco-line-${pill.label}`}>
              <path
                d={`M${pill.x},${pill.y + 12} C${pill.x},${midY} ${gwTop.x},${midY} ${gwTop.x},${gwTop.y}`}
                stroke="#9CA3AF" strokeWidth={0.7} strokeDasharray="3 5" fill="none" opacity={0.5}
              />
              <circle cx={pill.x} cy={pill.y + 12} r={1.2} fill="#9CA3AF" opacity={0.55} />
            </g>
          );
        })}

        {/* Flow edges */}
        {paths.map((p) => (
          <FlowEdge key={p.id} path={p} active={isEdgeActive(p)} />
        ))}

        {/* Zone watermarks */}
        <text x={450} y={22} textAnchor="middle" fill="#D1D5DB" opacity={0.55} fontSize={9} fontFamily="monospace" letterSpacing="3">ECOSYSTEM ACCESS LAYER</text>
        <text x={28} y={300} textAnchor="middle" fill="#D1D5DB" opacity={0.55} fontSize={9} fontFamily="monospace" letterSpacing="3" transform="rotate(-90, 28, 300)">CORE EXECUTION</text>
        <text x={872} y={355} textAnchor="end" fill="#D1D5DB" opacity={0.55} fontSize={9} fontFamily="monospace" letterSpacing="3" transform="rotate(-90, 872, 355)">INTELLIGENCE & DATA</text>
      </svg>

      {/* Ecosystem pill tags (HTML) */}
      {ECO_PILLS.map((pill) => (
        <div
          key={pill.label}
          className="absolute pointer-events-none"
          style={{
            left: `${(pill.x / 900) * 100}%`,
            top: `${(pill.y / 560) * 100}%`,
            transform: "translate(-50%, 0)",
          }}
        >
          <span className="inline-block px-2.5 py-0.5 rounded-full border border-white/25 !bg-white/5 text-[clamp(7px,0.9vw,10px)] font-mono text-gray-200 tracking-wide whitespace-nowrap backdrop-blur-sm">
            [{pill.label}]
          </span>
        </div>
      ))}

      {/* Node cards */}
      {NODES.map((node) => {
        const Icon = node.icon;
        const isHovered = hoveredNode === node.id;
        const isDimmed = hoveredNode !== null && hoveredNode !== node.id;

        return (
          <div
            key={node.id}
            className="absolute transition-opacity duration-500"
            style={{
              left: `${((node.cx - node.w / 2) / 900) * 100}%`,
              top: `${((node.cy - node.h / 2) / 560) * 100}%`,
              width: `${(node.w / 900) * 100}%`,
              opacity: isDimmed ? 0.55 : 1,
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <motion.div
              className={`rounded-lg border transition-colors duration-300 cursor-default ${
                isHovered
                  ? "border-cyan-400/40 bg-cyan-400/[0.06]"
                  : "border-white/25 !bg-white/5"
              }`}
              style={{ padding: "clamp(6px, 0.8vw, 12px) clamp(8px, 1vw, 14px)" }}
              animate={{
                boxShadow: isHovered
                  ? "0 0 24px rgba(6,182,212,0.14), inset 0 0 20px rgba(6,182,212,0.04)"
                  : "0 0 0px rgba(6,182,212,0)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon
                  size={18}
                  className={`shrink-0 transition-colors duration-300 ${isHovered ? "text-cyan-400" : "text-cyan-400/70"}`}
                  strokeWidth={1.5}
                />
                <div className="min-w-0">
                  <p className="text-white font-semibold leading-tight text-[clamp(8px,1.1vw,13px)] whitespace-nowrap">{node.label}</p>
                  <p className="text-gray-200 leading-tight mt-0.5 text-[clamp(7px,0.9vw,10px)] whitespace-nowrap">{node.sub}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {node.badges.map((b) => (
                  <span
                    key={b}
                    className={`inline-block leading-none rounded-sm border transition-colors duration-300 text-[clamp(6px,0.7vw,8px)] whitespace-nowrap ${
                      isHovered
                        ? "border-cyan-400/25 text-cyan-400/70 bg-cyan-400/[0.04]"
                        : "border-cyan-400/25 text-cyan-400 bg-cyan-400/5"
                    }`}
                    style={{ padding: "clamp(1px, 0.15vw, 2px) clamp(3px, 0.4vw, 6px)" }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
