"use client";

import { useEffect } from "react";

const DESIGN_WIDTH = 1280;

export default function ViewportScaler() {
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= DESIGN_WIDTH) {
        document.documentElement.style.removeProperty("--body-scale");
        document.body.style.removeProperty("height");
        return;
      }
      const scale = w / DESIGN_WIDTH;
      document.documentElement.style.setProperty("--body-scale", String(scale));
      // Compensate layout height after transform scaling
      requestAnimationFrame(() => {
        const h = document.body.scrollHeight;
        document.body.style.height = Math.round(h * scale) + "px";
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return null;
}
