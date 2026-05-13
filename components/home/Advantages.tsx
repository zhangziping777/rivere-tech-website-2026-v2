"use client";

import { useEffect, useRef, useState } from "react";
import { Layers, Users2, Briefcase, ShieldCheck, Cpu } from "lucide-react";

const advantages = [
  {
    icon: Layers,
    title: "全能力视图",
    desc: "业务规划、技术规划、科技建设到持续运营的全流程服务能力",
    stat: 100,
    suffix: "%",
    statLabel: "全流程覆盖",
  },
  {
    icon: Users2,
    title: "顶尖核心团队",
    desc: "高管及核心团队均来自国内外顶级银行及一流金融科技企业",
    stat: 15,
    suffix: "+",
    statLabel: "年平均从业经验",
  },
  {
    icon: Briefcase,
    title: "深厚行业沉淀",
    desc: "平均超过15年的信用卡及零售信贷业务/IT系统建设经验",
    stat: 50,
    suffix: "+",
    statLabel: "服务金融机构",
  },
  {
    icon: ShieldCheck,
    title: "强大交付保障",
    desc: "国内首例、规模最大的信用卡核心系统迁移及自建实战案例",
    stat: 100,
    suffix: "M+",
    statLabel: "账户迁移规模",
  },
  {
    icon: Cpu,
    title: "创新技术架构",
    desc: "率先在信用卡及零售信贷领域实现全组件云原生架构落地",
    stat: 99,
    suffix: ".99%",
    statLabel: "系统可用性",
  },
];

function CountUp({
  target,
  suffix,
  duration = 1800,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const start = performance.now();
          function tick(now: number) {
            const p = Math.min((now - start) / duration, 1);
            // ease-out
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

export default function Advantages() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-24 border-t border-brand-border">
      <div className="mb-12">
        <p className="text-accent-green text-xs font-medium tracking-widest uppercase mb-3">
          Why Choose Us
        </p>
        <h2 className="text-3xl font-bold text-text-primary">为什么选择我们</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {advantages.map((item) => (
          <div
            key={item.title}
            className="group flex flex-col rounded-sm border border-brand-border bg-brand-surface/40 p-5 hover:border-accent-green/30 transition-colors duration-300"
          >
            <item.icon
              size={22}
              className="text-accent-green mb-3"
              strokeWidth={1.5}
            />
            <h4 className="text-sm font-semibold text-text-primary mb-1">
              {item.title}
            </h4>
            <p className="text-text-muted text-xs leading-relaxed mb-4 flex-1">
              {item.desc}
            </p>
            <div className="pt-3 border-t border-brand-border">
              <div className="text-xl font-bold text-accent-green">
                <CountUp target={item.stat} suffix={item.suffix} />
              </div>
              <div className="text-2xs text-text-muted mt-0.5">
                {item.statLabel}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
