"use client";

import { useEffect, useRef } from "react";

/* ── Types ── */
interface NodeDef {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface EdgeDef {
  from: string;
  to: string;
}

/* ── Layout constants (viewBox 0 0 520 340) ── */
const NODES: NodeDef[] = [
  { id: "Client",   label: "Client",   sub: "终端接入",  x: 28,  y: 24,  w: 110, h: 56 },
  { id: "Gateway",  label: "AnyGateway",sub: "融合支付网关核心",  x: 210, y: 24,  w: 130, h: 56 },
  { id: "EAST",     label: "AnyEAST",   sub: "智能风控营销决策",  x: 210, y: 240, w: 130, h: 56 },
  { id: "TXN",      label: "AnyTXN",    sub: "信用卡零售信贷核心",  x: 28,  y: 240, w: 110, h: 56 },
];

const EDGES: EdgeDef[] = [
  { from: "Client",  to: "Gateway" },
  { from: "Gateway", to: "EAST" },
  { from: "EAST",    to: "TXN" },
  { from: "TXN",     to: "Client" },
];

function getPort(node: NodeDef, side: "r" | "l" | "t" | "b") {
  const cx = node.x + node.w / 2;
  const cy = node.y + node.h / 2;
  switch (side) {
    case "r": return { x: node.x + node.w, y: cy };
    case "l": return { x: node.x, y: cy };
    case "t": return { x: cx, y: node.y };
    case "b": return { x: cx, y: node.y + node.h };
  }
}

function buildPath(from: NodeDef, to: NodeDef) {
  const start = getPort(from, "r");
  const end   = getPort(to, "l");

  // vertical connection (Gateway → EAST, EAST → TXN via bottom-to-top or side)
  if (from.id === "Gateway" && to.id === "EAST") {
    const s = getPort(from, "b");
    const e = getPort(to, "t");
    const midY = (s.y + e.y) / 2;
    return `M${s.x},${s.y} C${s.x},${midY} ${e.x},${midY} ${e.x},${e.y}`;
  }
  if (from.id === "EAST" && to.id === "TXN") {
    const s = getPort(from, "l");
    const e = getPort(to, "r");
    const midX = (s.x + e.x) / 2;
    return `M${s.x},${s.y} C${midX},${s.y} ${midX},${e.y} ${e.x},${e.y}`;
  }
  if (from.id === "TXN" && to.id === "Client") {
    const s = getPort(from, "t");
    const e = getPort(to, "b");
    const midY = (s.y + e.y) / 2;
    return `M${s.x},${s.y} C${s.x},${midY} ${e.x},${midY} ${e.x},${e.y}`;
  }

  // default: horizontal bezier
  const dx = Math.abs(end.x - start.x) * 0.5;
  return `M${start.x},${start.y} C${start.x + dx},${start.y} ${end.x - dx},${end.y} ${end.x},${end.y}`;
}

/* ── Particle along a cubic bezier via de Casteljau ── */
function bezierPoint(
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
) {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}

function parsePath(d: string) {
  const m = d.match(/M([\d.]+),([\d.]+)\s*C([\d.]+),([\d.]+)\s+([\d.]+),([\d.]+)\s+([\d.]+),([\d.]+)/);
  if (!m) return { p0: { x: 0, y: 0 }, p1: { x: 0, y: 0 }, p2: { x: 0, y: 0 }, p3: { x: 0, y: 0 } };
  return {
    p0: { x: +m[1], y: +m[2] },
    p1: { x: +m[3], y: +m[4] },
    p2: { x: +m[5], y: +m[6] },
    p3: { x: +m[7], y: +m[8] },
  };
}

function Particle({
  pathD,
  delay,
  color = "#00E599",
}: {
  pathD: string;
  delay: number;
  color?: string;
}) {
  const circleRef = useRef<SVGCircleElement>(null);
  const { p0, p1, p2, p3 } = parsePath(pathD);

  useEffect(() => {
    const el = circleRef.current;
    if (!el) return;
    const circle = el;
    let raf: number;
    const duration = 2200;
    const start = performance.now() + delay;

    function tick(now: number) {
      const elapsed = now - start;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      let t = (elapsed % duration) / duration;
      t = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const pt = bezierPoint(t, p0, p1, p2, p3);
      circle.setAttribute("cx", String(pt.x));
      circle.setAttribute("cy", String(pt.y));
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pathD, delay, p0, p1, p2, p3]);

  return <circle ref={circleRef} r={2.5} fill={color} opacity={0.9} />;
}

/* ── Node card ── */
function NodeCard({ node }: { node: NodeDef }) {
  return (
    <g>
      {/* outer glow */}
      <rect
        x={node.x - 1}
        y={node.y - 1}
        width={node.w + 2}
        height={node.h + 2}
        rx={6}
        fill="none"
        stroke="#00E599"
        strokeWidth={0.6}
        opacity={0.35}
      />
      {/* card bg */}
      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={node.h}
        rx={5}
        fill="#131620"
        stroke="#2A2D3A"
        strokeWidth={0.8}
      />
      {/* label */}
      <text
        x={node.x + node.w / 2}
        y={node.y + 21}
        textAnchor="middle"
        fill="#F0F1F6"
        fontSize={11}
        fontWeight={600}
        fontFamily="Inter, sans-serif"
      >
        {node.label}
      </text>
      <text
        x={node.x + node.w / 2}
        y={node.y + 40}
        textAnchor="middle"
        fill="#6B6F80"
        fontSize={9.5}
        fontFamily="Inter, sans-serif"
      >
        {node.sub}
      </text>
    </g>
  );
}

/* ── Main component ── */
export default function HeroWorkflowNode() {
  const paths = EDGES.map((e) => {
    const from = NODES.find((n) => n.id === e.from)!;
    const to = NODES.find((n) => n.id === e.to)!;
    return { id: `${e.from}-${e.to}`, d: buildPath(from, to) };
  });

  return (
    <svg
      viewBox="0 0 520 340"
      className="w-full h-auto max-w-2xl"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* glow filter */}
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* stronger glow for particles */}
        <filter id="particleGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* static edges */}
      {paths.map((p) => (
        <path
          key={`edge-${p.id}`}
          d={p.d}
          stroke="#2A2D3A"
          strokeWidth={1.2}
          fill="none"
        />
      ))}

      {/* flowing glow edges */}
      {paths.map((p) => (
        <path
          key={`flow-${p.id}`}
          d={p.d}
          stroke="#00E599"
          strokeWidth={1.2}
          strokeDasharray="6 12"
          fill="none"
          opacity={0.5}
          filter="url(#glow)"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-36"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </path>
      ))}

      {/* particles */}
      <g filter="url(#particleGlow)">
        {paths.map((p) =>
          [0, 700, 1400].map((d, i) => (
            <Particle key={`${p.id}-${i}`} pathD={p.d} delay={d + i * 200} />
          )),
        )}
      </g>

      {/* nodes */}
      {NODES.map((n) => (
        <NodeCard key={n.id} node={n} />
      ))}

      {/* micro label on edges */}
      <text x={176} y={38} fill="#6B6F80" fontSize={7.5} fontFamily="Inter, sans-serif" textAnchor="middle">TLS 1.3</text>
      <text x={282} y={158} fill="#6B6F80" fontSize={7.5} fontFamily="Inter, sans-serif" textAnchor="middle">gRPC</text>
      <text x={176} y={266} fill="#6B6F80" fontSize={7.5} fontFamily="Inter, sans-serif" textAnchor="middle">MQ</text>
      <text x={72} y={145} fill="#6B6F80" fontSize={7.5} fontFamily="Inter, sans-serif" textAnchor="middle">ACK</text>
    </svg>
  );
}
