"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

function parseValue(raw: string): { prefix: string; num: number } {
  const match = raw.match(/^([^\d.]*)([\d.]+)/);
  if (!match) return { prefix: "", num: 0 };
  return { prefix: match[1], num: parseFloat(match[2]) };
}

interface CountUpMetricProps {
  value: string;
  suffix?: string;
  className?: string;
  duration?: number;
}

export default function CountUpMetric({
  value,
  suffix = "",
  className = "",
  duration = 2.2,
}: CountUpMetricProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const { prefix, num } = parseValue(value);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {inView ? (
        <CountUp start={0} end={num} duration={duration} decimals={num % 1 !== 0 ? 3 : 0} />
      ) : (
        "0"
      )}
      {suffix}
    </span>
  );
}
