"use client";

import CountUpMetric from "@/components/ui/CountUpMetric";

interface MetricBadgeProps {
  value: string;
  unit: string;
  label: string;
}

export default function MetricBadge({ value, unit, label }: MetricBadgeProps) {
  return (
    <div className="group relative flex flex-col items-center px-6 py-5 rounded-sm !bg-white/5 !backdrop-blur-md !border !border-white/10 hover:!border-cyan-400/30 hover:-translate-y-0.5 transition-all duration-500 ease-out">
      {/* glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: "inset 0 0 24px rgba(6,182,212,0.06), 0 0 18px rgba(6,182,212,0.08)" }}
      />
      <div className="relative z-10 flex items-baseline gap-0.5">
        <span className="text-4xl md:text-5xl font-bold text-cyan-400"
          style={{ textShadow: "0 0 32px rgba(6,182,212,0.25), 0 0 8px rgba(6,182,212,0.15)" }}>
          <CountUpMetric value={value} />
        </span>
        <span className="text-lg md:text-xl font-semibold text-cyan-400/70">
          {unit}
        </span>
      </div>
      <span className="relative z-10 mt-2 text-xs text-text-muted tracking-wide text-center">
        {label}
      </span>
    </div>
  );
}
