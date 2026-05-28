"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ── 6 planets evenly spaced on one elliptical orbit ── */
const LABELS = ["零售产品体系", "科技支撑", "数字化运营", "营销体系", "风险管理", "生态合作"];
const N = LABELS.length;

// Orbit geometry — fixed % of the stage, independent of viewport
const RX = 42;       // horizontal semi-axis (%)
const RY = 18;       // vertical semi-axis (%) — roughly RX × cos(65°)
const OMEGA = 0.2;   // rad/s (1 revolution ≈ 31s)

export default function OrbitalUniverse() {
  const [mounted, setMounted] = useState(false);
  const planetRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* rAF — drives planet positions on ellipse */
  useEffect(() => {
    setMounted(true);
    let frame: number;
    const t0 = performance.now();

    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      for (let i = 0; i < N; i++) {
        const el = planetRefs.current[i];
        if (!el) continue;
        const a = OMEGA * t + (i * 2 * Math.PI) / N;
        el.style.left = `${50 + RX * Math.cos(a)}%`;
        el.style.top  = `${50 + RY * Math.sin(a)}%`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center">
      {/* ── Fixed-proportion stage: square, fills right side of hero ── */}
      <div className="absolute right-[2%] top-1/2 -translate-y-1/2 w-[clamp(360px,50vw,700px)] aspect-square">

        {/* ── 3D Orbit Ring (static, rotateX projects circle → ellipse) ── */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "800px" }}
        >
          <div
            className="absolute w-full h-full"
            style={{ transform: "rotateX(65deg)", transformStyle: "preserve-3d" }}
          >
            {/* Glow aura behind orbit */}
            <div
              className="absolute top-[3%] left-[3%] right-[3%] bottom-[3%] rounded-full pointer-events-none"
              style={{ boxShadow: "0 0 80px rgba(6,182,212,0.04), inset 0 0 80px rgba(6,182,212,0.03)" }}
            />
            {/* Main orbit line */}
            <div className="absolute top-[5%] left-[5%] right-[5%] bottom-[5%] rounded-full border border-cyan-500/20 pointer-events-none"
              style={{ boxShadow: "0 0 40px rgba(6,182,212,0.05)" }}
            />
            {/* Inner subtle ring */}
            <div className="absolute top-[8%] left-[8%] right-[8%] bottom-[8%] rounded-full border border-cyan-500/8 pointer-events-none" />
          </div>
        </div>

        {/* ── Center Hub ── */}
        <motion.div
          initial={mounted ? { opacity: 0, scale: 0.5 } : false}
          animate={mounted ? { opacity: 1, scale: 1 } : false}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <div
            className="!bg-white/[0.02] !backdrop-blur-xl border border-cyan-500/30 rounded-2xl flex flex-col items-center"
            style={{
              padding: "clamp(12px,2.2vw,22px) clamp(14px,2.5vw,26px)",
              boxShadow: "0 0 40px rgba(6,182,212,0.2), 0 0 80px rgba(6,182,212,0.06)",
            }}
          >
            {/* R diamond */}
            <div
              className="flex items-center justify-center rotate-45 rounded-md border border-cyan-500/55 mb-2"
              style={{
                width: "clamp(32px,5vw,50px)",
                height: "clamp(32px,5vw,50px)",
                background: "linear-gradient(135deg, rgba(6,182,212,0.35), rgba(34,211,238,0.2))",
                boxShadow: "0 0 22px rgba(6,182,212,0.3), inset 0 0 10px rgba(6,182,212,0.08)",
              }}
            >
              <span
                className="text-white font-bold -rotate-45 select-none leading-none"
                style={{
                  fontSize: "clamp(16px,2.8vw,26px)",
                  fontFamily: "Georgia, serif",
                }}
              >
                R
              </span>
            </div>
            <span
              className="text-gray-300 whitespace-nowrap tracking-wider font-medium"
              style={{ fontSize: "clamp(8px,1.1vw,12px)" }}
            >
              科技 &amp; 运营服务商
            </span>
          </div>
        </motion.div>

        {/* ── 6 Orbiting Planets ── */}
        {LABELS.map((label, i) => (
          <div
            key={label}
            ref={(el) => { planetRefs.current[i] = el; }}
            className="absolute z-40 pointer-events-auto"
            style={{ width: 0, height: 0, left: "50%", top: "50%" }}
          >
            <motion.div
              initial={mounted ? { opacity: 0, scale: 0 } : false}
              animate={mounted ? { opacity: 1, scale: 1 } : false}
              transition={{ duration: 0.45, delay: 0.35 + i * 0.06, ease: "easeOut" }}
              className="rounded-full !bg-white/[0.02] !backdrop-blur-xl border border-cyan-500/30 flex items-center justify-center text-white font-bold cursor-default -translate-x-1/2 -translate-y-1/2 transition-shadow duration-500"
              style={{
                width: "clamp(52px,8vw,88px)",
                height: "clamp(52px,8vw,88px)",
                fontSize: "clamp(6.5px,0.85vw,10px)",
                boxShadow: "0 0 18px rgba(6,182,212,0.22), 0 0 5px rgba(6,182,212,0.08)",
              }}
            >
              {label}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
