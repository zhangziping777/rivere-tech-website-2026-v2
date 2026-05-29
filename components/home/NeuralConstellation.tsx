"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ── 6 paths with their endpoint coordinates and labels ── */
const paths = [
  { d: "M 0 0 Q -100 -200 -200 -180", x: -200, y: -180, label: "生态合作" },
  { d: "M 0 0 Q 100 -200 200 -180",   x:  200, y: -180, label: "零售产品体系" },
  { d: "M 0 0 Q -150 0 -260 20",      x: -260, y:   20, label: "数字化运营" },
  { d: "M 0 0 Q 150 0 260 20",        x:  260, y:   20, label: "营销体系" },
  { d: "M 0 0 Q -100 150 -150 220",   x: -150, y:  220, label: "科技支撑" },
  { d: "M 0 0 Q 100 150 150 220",     x:  150, y:  220, label: "风险管理" },
];

export default function NeuralConstellation() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto flex items-center justify-center">
      {/* ── SVG layer ── */}
      <svg viewBox="-400 -400 800 800" className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(6,182,212,0.5)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.1)" />
          </linearGradient>
          <filter id="photonGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Static base curves */}
        {paths.map((p, i) => (
          <path key={`base-${i}`} d={p.d} stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
        ))}

        {/* Animated dash flow */}
        {mounted &&
          paths.map((p, i) => (
            <motion.path
              key={`flow-${i}`}
              d={p.d}
              stroke="rgba(6,182,212,0.55)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              filter="url(#photonGlow)"
              strokeDasharray="10 60"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -70 }}
              transition={{
                duration: 2.4,
                delay: i * 0.38,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
      </svg>

      {/* ── Peripheral nodes — anchored at exact SVG endpoint coordinates ── */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0 z-10 pointer-events-none">
        {paths.map((p, i) => (
          <motion.div
            key={p.label}
            initial={mounted ? { opacity: 0, scale: 0.6 } : false}
            animate={mounted ? { opacity: 1, scale: 1 } : false}
            transition={{ duration: 0.5, delay: 0.25 + i * 0.07, ease: "easeOut" }}
            className="absolute w-24 h-24 -ml-12 -mt-12 !bg-white/5 !backdrop-blur-md border border-cyan-400/30 rounded-full flex items-center justify-center text-xs text-white pointer-events-auto hover:border-cyan-400/80 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.1)]"
            style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
          >
            {p.label}
          </motion.div>
        ))}
      </div>

      {/* ── Center hub ── */}
      <motion.div
        initial={mounted ? { opacity: 0, scale: 0.5 } : false}
        animate={mounted ? { opacity: 1, scale: 1 } : false}
        transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
        className="relative z-20"
      >
        <motion.div
          animate={mounted ? { boxShadow: [
            "0 0 30px rgba(6,182,212,0.1)",
            "0 0 55px rgba(6,182,212,0.2)",
            "0 0 30px rgba(6,182,212,0.1)",
          ]} : false}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="!bg-white/5 !backdrop-blur-md border border-cyan-400/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(6,182,212,0.2)] flex flex-col items-center"
        >
          <div className="text-cyan-400 font-serif text-4xl mb-2">R</div>
          <div className="text-gray-300 text-xs">科技 & 运营服务商</div>
        </motion.div>
      </motion.div>
    </div>
  );
}
