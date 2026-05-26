"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

/* ── Mini sparkline: SVG bar chart ── */
function Sparkline({ bars }: { bars: number[] }) {
  const w = 56;
  const h = 28;
  const gap = 3;
  const barW = (w - gap * (bars.length - 1)) / bars.length;
  const max = Math.max(...bars);

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="shrink-0"
      aria-hidden="true"
    >
      {bars.map((v, i) => {
        const barH = Math.max(2, (v / max) * h);
        return (
          <rect
            key={i}
            x={i * (barW + gap)}
            y={h - barH}
            width={barW}
            height={barH}
            rx="1"
            fill="#00E599"
            opacity={0.25 + (v / max) * 0.55}
          />
        );
      })}
    </svg>
  );
}

const advantages = [
  {
    title: "全能力视图",
    desc: "业务规划、技术规划、科技建设到持续运营的全流程服务能力",
    stat: "100%",
    statLabel: "全流程覆盖",
    bars: [0.35, 0.5, 0.6, 0.75, 0.85, 1.0],
  },
  {
    title: "顶尖核心团队",
    desc: "高管及核心团队均来自国内外顶级银行及一流金融科技企业",
    stat: "15+",
    statLabel: "年平均从业经验",
    bars: [0.4, 0.65, 0.55, 0.8, 0.7, 0.95],
  },
  {
    title: "深厚行业沉淀",
    desc: "平均超过15年的信用卡及零售信贷业务 / IT 系统建设经验",
    stat: "50+",
    statLabel: "服务金融机构",
    bars: [0.3, 0.5, 0.7, 0.6, 0.85, 0.9],
  },
  {
    title: "强大交付保障",
    desc: "国内首例、规模最大的信用卡核心系统迁移及自建实战案例",
    stat: "100M+",
    statLabel: "账户迁移规模",
    bars: [0.5, 0.45, 0.7, 0.55, 0.9, 1.0],
  },
];

export default function Advantages() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-20 border-t border-white/5">
      <ScrollReveal className="mb-12">
        <p className="text-[#00E599] text-[clamp(10px,1.2vw,12px)] font-medium tracking-widest uppercase mb-3">
          Why Choose Us
        </p>
        <h2 className="text-[clamp(22px,3vw,30px)] font-bold text-text-primary">
          为什么选择我们
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {advantages.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.08}>
            <div className="group flex flex-col rounded-2xl border border-white/5 bg-[#0B0F19]/50 p-6 backdrop-blur-xl transition-all duration-500 ease-out hover:border-[#00E599]/30 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(0,229,153,0.08)]">
              {/* Title */}
              <h4 className="text-[clamp(13px,1.5vw,14px)] font-semibold text-text-primary mb-1.5">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-text-muted text-[clamp(11px,1.2vw,12px)] leading-relaxed mb-5 flex-1">
                {item.desc}
              </p>

              {/* Stat + Sparkline row */}
              <div className="flex items-end justify-between pt-4 border-t border-white/5">
                <div>
                  <div className="text-[clamp(20px,2.4vw,28px)] font-bold text-[#00E599] leading-none">
                    {item.stat}
                  </div>
                  <div className="text-[clamp(9px,1vw,10px)] text-text-muted mt-1">
                    {item.statLabel}
                  </div>
                </div>
                <Sparkline bars={item.bars} />
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
