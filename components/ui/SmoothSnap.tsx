"use client";

import { useEffect, useRef } from "react";

const HEADER_OFFSET = 64;

export default function SmoothSnap() {
  const isSnapping = useRef(false);
  const rafId = useRef(0);
  const snapTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const getSections = (): HTMLElement[] =>
      Array.from(document.querySelectorAll("[data-snap-section]"));

    const SNAP_THRESHOLD = 120; // px — only snap when section top is within this range

    function findNearest(): { el: HTMLElement; y: number } | null {
      const sections = getSections();
      if (!sections.length) return null;

      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      const viewY = window.scrollY;

      for (const sec of sections) {
        const top = sec.getBoundingClientRect().top + viewY - HEADER_OFFSET;
        const dist = Math.abs(viewY - top);
        if (dist < bestDist) {
          bestDist = dist;
          best = sec;
        }
      }

      // Only snap if the section top is within threshold of viewport top
      if (!best || bestDist > SNAP_THRESHOLD) return null;

      const y = best.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      return { el: best, y };
    }

    function snapTo(target: { el: HTMLElement; y: number }) {
      const startY = window.scrollY;
      const endY = Math.max(0, target.y);
      const dist = Math.abs(endY - startY);

      if (dist < 1) return;

      // Adaptive duration: shorter for small distances, longer for big jumps
      const duration = Math.min(700, Math.max(300, dist * 0.45));

      const start = performance.now();
      isSnapping.current = true;

      // Visual: activate glow on the target section
      target.el.classList.add("snap-glow-active");

      function tick(now: number) {
        const elapsed = now - start;
        const progress = Math.min(1, elapsed / duration);

        // Ease out quart — gentle deceleration
        const eased = 1 - Math.pow(1 - progress, 4);

        window.scrollTo(0, startY + (endY - startY) * eased);

        if (progress < 1) {
          rafId.current = requestAnimationFrame(tick);
        } else {
          window.scrollTo(0, endY);
          isSnapping.current = false;

          setTimeout(() => {
            target.el.classList.remove("snap-glow-active");
          }, 800);
        }
      }

      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(tick);
    }

    function onScroll() {
      if (isSnapping.current) return;

      clearTimeout(snapTimer.current);
      snapTimer.current = setTimeout(() => {
        if (isSnapping.current) return;
        const nearest = findNearest();
        if (nearest) snapTo(nearest);
      }, 220);
    }

    // Also snap on resize (e.g. device orientation change)
    function onResize() {
      if (isSnapping.current) return;
      const nearest = findNearest();
      if (nearest) snapTo(nearest);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearTimeout(snapTimer.current);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return null;
}
