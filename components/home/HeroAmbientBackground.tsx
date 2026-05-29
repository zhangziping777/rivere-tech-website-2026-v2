"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* Deterministic PRNG for stable star positions */
function prng(seed: number) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}

/* Stars distributed in an extended viewBox (100 × 160) to support vertical drift */
function makeLayer(count: number, seed: number, rMin: number, rMax: number) {
  const rng = prng(seed);
  return Array.from({ length: count }, () => ({
    cx: Math.round(rng() * 1000) / 10,
    cy: Math.round(rng() * 1600) / 10,
    r: Math.round((rMin + rng() * (rMax - rMin)) * 100) / 100,
    isGreen: rng() < 0.22,
    opacity: Math.round((0.35 + rng() * 0.55) * 100) / 100,
  }));
}

/* Duplicate each layer to create seamless looping — copy A & copy B offset by viewBox height */
function starCircles(stars: ReturnType<typeof makeLayer>, offsetY: number) {
  return stars.map((s, i) => (
    <circle key={i} cx={s.cx} cy={s.cy + offsetY} r={s.r}
      fill={s.isGreen ? "#22D3EE" : "white"} opacity={s.opacity} />
  ));
}

const farStars  = makeLayer(65, 42,  0.12, 0.38);
const midStars  = makeLayer(35, 99,  0.3,  0.7);
const nearStars = makeLayer(20, 17,  0.5,  1.1);

export default function HeroAmbientBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.03) 0%, transparent 70%)" }}>
      {/* ── Aurora blobs (breathing, slowly drifting) ── */}
      <motion.div
        className="absolute top-[-18%] left-[-12%] w-[65vw] h-[65vw] bg-[#0284C7]/25 blur-[140px] rounded-full mix-blend-screen"
        animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7], x: [-15, 20, -15], y: [-8, 12, -8] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-18%] right-[-12%] w-[55vw] h-[55vw] bg-cyan-400/22 blur-[140px] rounded-full mix-blend-screen"
        animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6], x: [12, -18, 12], y: [12, -12, 12] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />

      {/* ── Layer 1: Far stars — slowest, smallest ── */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: 0.45 }}
        animate={{ y: ["0%", "-6.25%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <svg className="w-full" style={{ height: "200%" }} viewBox="0 0 100 160" preserveAspectRatio="xMidYMid slice">
          {starCircles(farStars, 0)}
          {starCircles(farStars, 160)}
        </svg>
      </motion.div>

      {/* ── Layer 2: Mid stars — medium speed ── */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: 0.5 }}
        animate={{ y: ["0%", "-12.5%"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        <svg className="w-full" style={{ height: "200%" }} viewBox="0 0 100 160" preserveAspectRatio="xMidYMid slice">
          {starCircles(midStars, 0)}
          {starCircles(midStars, 160)}
        </svg>
      </motion.div>

      {/* ── Layer 3: Near stars — fastest, largest, subtle glow ── */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: 0.55 }}
        animate={{ y: ["0%", "-25%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      >
        <svg className="w-full" style={{ height: "200%" }} viewBox="0 0 100 160" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="starGlow">
              <feGaussianBlur stdDeviation="0.4" />
            </filter>
          </defs>
          <g filter="url(#starGlow)">
            {starCircles(nearStars, 0)}
            {starCircles(nearStars, 160)}
          </g>
        </svg>
      </motion.div>

      {/* ── Sweeping light wave ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        style={{ opacity: 0.15 }}
      >
        <defs>
          <linearGradient id="waveGrad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(2,132,199,0)" />
            <stop offset="45%" stopColor="rgba(2,132,199,0.7)" />
            <stop offset="55%" stopColor="rgba(6,182,212,0.5)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0)" />
          </linearGradient>
        </defs>
        <motion.path
          stroke="url(#waveGrad1)"
          strokeWidth="1.2"
          fill="none"
          animate={{ d: [
            "M -100 450 Q 400 200 900 480 T 1600 350",
            "M -100 400 Q 400 520 900 320 T 1600 480",
            "M -100 500 Q 400 240 900 450 T 1600 360",
            "M -100 450 Q 400 200 900 480 T 1600 350",
          ]}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
