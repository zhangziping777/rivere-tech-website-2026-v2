"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ── Orbit constants (elliptical: wide × short) ── */
const CX = 300;
const CY = 300;
const RX = 280;
const RY = 160;

interface OrbitNode {
  label: string;
  angleDeg: number;
}

const orbitNodes: OrbitNode[] = [
  { label: "生态合作",   angleDeg: 240 },
  { label: "营销体系",   angleDeg: 300 },
  { label: "风险管理",   angleDeg: 0 },
  { label: "数字化运营", angleDeg: 60 },
  { label: "科技支撑",   angleDeg: 120 },
  { label: "零售产品",   angleDeg: 180 },
];

/* SVG pixel endpoint (600×600 viewBox, elliptical orbit) */
function svgEnd(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.round(CX + RX * Math.cos(rad)),
    y: Math.round(CY + RY * Math.sin(rad)),
  };
}

/* CSS % offset from center — matches SVG coordinate system at any scale */
function cssOff(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const dx = ((RX * Math.cos(rad)) / 6).toFixed(3);
  const dy = ((RY * Math.sin(rad)) / 6).toFixed(3);
  return { dx, dy };
}

function curveTo(ex: number, ey: number, bow: number) {
  const mx = (CX + ex) / 2;
  const my = (CY + ey) / 2;
  const dx = ex - CX;
  const dy = ey - CY;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const px = (-dy / len) * bow;
  const py = (dx / len) * bow;
  return `M ${CX} ${CY} Q ${mx + px} ${my + py} ${ex} ${ey}`;
}

const bows = [65, -58, 70, -62, 55, -68];

export default function HeroOrbitGraphic() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto">
      {/* ── SVG layer — z-0, out of flow ── */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="orbitLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(6,182,212,0.45)" />
            <stop offset="100%" stopColor="rgba(2,132,199,0.12)" />
          </linearGradient>
          <filter id="orbitGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {orbitNodes.map((n, i) => {
          const { x: ex, y: ey } = svgEnd(n.angleDeg);
          return (
            <g key={`curve-${i}`}>
              <path
                d={curveTo(ex, ey, bows[i])}
                stroke="url(#orbitLineGrad)"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
              />
              {mounted && (
                <motion.path
                  d={curveTo(ex, ey, bows[i])}
                  stroke="rgba(6,182,212,0.45)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#orbitGlow)"
                  strokeDasharray="6 36"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -42 }}
                  transition={{
                    duration: 2.6,
                    delay: i * 0.42,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* ── 6 Orbit Nodes — %-based positioning, scales with container ── */}
      {orbitNodes.map((n, i) => {
        const { dx, dy } = cssOff(n.angleDeg);
        return (
          <div
            key={n.label}
            className="absolute z-10"
            style={{
              top: `calc(50% + ${dy}%)`,
              left: `calc(50% + ${dx}%)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.div
              initial={mounted ? { opacity: 0, scale: 0.5 } : false}
              animate={mounted ? { opacity: 1, scale: 1 } : false}
              transition={{ duration: 0.55, delay: 0.3 + i * 0.09, ease: "easeOut" }}
            >
              <motion.div
                animate={
                  mounted
                    ? {
                        boxShadow: [
                          "0 0 20px rgba(34,211,238,0.35), 0 0 50px rgba(34,211,238,0.12), 0 0 80px rgba(6,182,212,0.06), 0 4px 20px rgba(0,0,0,0.4)",
                          "0 0 36px rgba(34,211,238,0.65), 0 0 80px rgba(34,211,238,0.28), 0 0 120px rgba(6,182,212,0.14), 0 4px 24px rgba(0,0,0,0.5)",
                          "0 0 20px rgba(34,211,238,0.35), 0 0 50px rgba(34,211,238,0.12), 0 0 80px rgba(6,182,212,0.06), 0 4px 20px rgba(0,0,0,0.4)",
                        ],
                      }
                    : false
                }
                transition={{
                  duration: 3.0,
                  delay: i * 0.45,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-[90px] h-[62px] rounded-[50%] bg-[#0B0F19]/60 border-2 backdrop-blur-md flex items-center justify-center text-[12px] font-bold cursor-default transition-all duration-300 hover:scale-110"
                style={{
                  borderColor: "rgba(34,211,238,0.55)",
                  color: "#22D3EE",
                  textShadow: "0 0 8px rgba(34,211,238,0.6), 0 0 20px rgba(34,211,238,0.3)",
                }}
              >
                {n.label}
              </motion.div>
            </motion.div>
          </div>
        );
      })}

      {/* ── CenterHubCard — position wrapper + inner animated div ── */}
      <div
        className="absolute z-20"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          initial={mounted ? { opacity: 0, scale: 0.85 } : false}
          animate={mounted ? { opacity: 1, scale: 1 } : false}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <motion.div
            animate={mounted ? { boxShadow: [
              "0 0 40px -10px rgba(34,211,238,0.08), 0 8px 32px 0 rgba(0,0,0,0.36), inset 0 1px 0 0 rgba(255,255,255,0.04)",
              "0 0 40px -10px rgba(34,211,238,0.15), 0 8px 32px 0 rgba(0,0,0,0.40), inset 0 1px 0 0 rgba(255,255,255,0.08)",
              "0 0 40px -10px rgba(34,211,238,0.08), 0 8px 32px 0 rgba(0,0,0,0.36), inset 0 1px 0 0 rgba(255,255,255,0.04)",
            ]} : false}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl px-8 py-6 max-w-[280px] w-fit mx-auto flex flex-col items-center"
            style={{
              boxShadow: "0 0 40px -10px rgba(34,211,238,0.08), 0 8px 32px 0 rgba(0,0,0,0.36), inset 0 1px 0 0 rgba(255,255,255,0.04)",
            }}
          >
            <h2 className="text-xl font-extrabold tracking-widest text-center whitespace-nowrap bg-gradient-to-r from-blue-500 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              信用卡 · 智能零售信贷
            </h2>
            <div className="h-[1px] w-4/5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent my-5" />
            <p className="text-sm font-medium tracking-wide text-white/70">
              科技 & 运营服务商
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
