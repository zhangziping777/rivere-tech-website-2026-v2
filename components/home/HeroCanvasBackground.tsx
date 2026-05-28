"use client";

import { useEffect, useRef } from "react";

const N = 100;               // particle count
const MAX_DIST = 250;        // max connection distance (px)
const MAX_SPEED = 0.18;      // max drift speed (px/frame)

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function HeroCanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const particles: Particle[] = [];

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      dpr = window.devicePixelRatio || 1;
      w = parent.clientWidth;
      h = parent.clientHeight;

      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    /* ── Init particles ── */
    function seed() {
      particles.length = 0;
      for (let i = 0; i < N; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * MAX_SPEED * 2,
          vy: (Math.random() - 0.5) * MAX_SPEED * 2,
        });
      }
    }

    resize();
    seed();
    window.addEventListener("resize", () => { resize(); seed(); });

    function draw() {
      /* ── Deep abyss background ── */
      const grad = ctx!.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.7);
      grad.addColorStop(0, "#050D1A");
      grad.addColorStop(0.5, "#030914");
      grad.addColorStop(1, "#02050A");
      ctx!.fillStyle = grad;
      ctx!.fillRect(0, 0, w, h);

      /* ── Update particles ── */
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        /* Wrap around edges with soft boundary */
        if (p.x < -40) p.x = w + 40;
        if (p.x > w + 40) p.x = -40;
        if (p.y < -40) p.y = h + 40;
        if (p.y > h + 40) p.y = -40;

        /* Gentle random walk */
        p.vx += (Math.random() - 0.5) * 0.03;
        p.vy += (Math.random() - 0.5) * 0.03;
        /* Clamp speed */
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }
      }

      /* ── Draw connections (below particles) ── */
      ctx!.globalCompositeOperation = "lighter";
      for (let i = 0; i < N; i++) {
        const a = particles[i];
        for (let j = i + 1; j < N; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.08;
            ctx!.strokeStyle = `rgba(34,211,238,${alpha.toFixed(3)})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      /* ── Draw particles ── */
      for (const p of particles) {
        ctx!.fillStyle = "rgba(34,211,238,0.55)";
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx!.fill();

        /* Inner bright core */
        ctx!.fillStyle = "rgba(34,211,238,0.85)";
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 0.55, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.globalCompositeOperation = "source-over";

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-[0]"
    />
  );
}
