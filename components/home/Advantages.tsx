"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const advantages = [
  {
    title: "全能力视图",
    desc: "业务规划、技术规划、科技建设到持续运营的全流程服务能力",
    stat: "100%",
    statLabel: "全流程覆盖",
  },
  {
    title: "顶尖核心团队",
    desc: "高管及核心团队均来自国内外顶级银行及一流金融科技企业",
    stat: "15+",
    statLabel: "年平均从业经验",
  },
  {
    title: "深厚行业沉淀",
    desc: "平均超过15年的信用卡及零售信贷业务 / IT 系统建设经验",
    stat: "50+",
    statLabel: "服务金融机构",
  },
  {
    title: "强大交付保障",
    desc: "国内首例、规模最大的信用卡核心系统迁移及自建实战案例",
    stat: "100M+",
    statLabel: "账户迁移规模",
  },
];

export default function Advantages() {
  return (
    <section className="relative z-[10] mx-auto max-w-7xl px-6 py-32 border-t border-white/5">
      {/* Deep space ambient radial gradient */}
      <div className="absolute inset-0 z-[0] pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse,rgba(6,182,212,0.04)_0%,transparent_70%)]" />
      </div>
      <ScrollReveal className="mb-16">
        <p className="text-cyan-400 text-[clamp(10px,1.2vw,12px)] font-medium tracking-widest uppercase mb-3">
          Why Choose Us
        </p>
        <h2 className="text-[clamp(22px,3vw,30px)] font-bold text-text-primary">
          为什么选择我们
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {advantages.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.08}>
            <div className="group flex flex-col rounded-2xl !bg-white/5 !backdrop-blur-md !border !border-white/10 p-6 transition-all duration-500 ease-out hover:!bg-white/[0.06] hover:!border-cyan-400/30 hover:-translate-y-1">
              {/* Title */}
              <h4 className="text-[clamp(13px,1.5vw,14px)] font-semibold text-white mb-1.5">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-slate-300 text-[clamp(11px,1.2vw,12px)] leading-relaxed mb-6 flex-1">
                {item.desc}
              </p>

              {/* Stat */}
              <div className="pt-4 border-t border-white/5">
                <div className="text-5xl md:text-6xl font-black leading-none bg-gradient-to-br from-blue-500 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                  {item.stat}
                </div>
                <div className="text-sm text-slate-300 font-medium mt-2">
                  {item.statLabel}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
