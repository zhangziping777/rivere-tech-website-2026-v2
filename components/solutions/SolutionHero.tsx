"use client";

import type { Metric } from "@/lib/data";
import MetricBadge from "./MetricBadge";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface SolutionHeroProps {
  name: string;
  tagline: string;
  description: string;
  metrics: Metric[];
}

export default function SolutionHero({
  name,
  tagline,
  description,
  metrics,
}: SolutionHeroProps) {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <ScrollReveal>
        <p className="text-cyan-500 text-xs font-medium tracking-widest uppercase mb-4">
          Solutions
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight tracking-tight mb-4">
          {name}
        </h1>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <p className="text-lg md:text-xl text-cyan-500/80 font-medium mb-6">
          {tagline}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <p className="text-text-secondary text-base max-w-3xl leading-relaxed mb-12">
          {description}
        </p>
      </ScrollReveal>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <ScrollReveal key={m.label} delay={0.25 + i * 0.06}>
            <MetricBadge {...m} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
