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
    <section className="mx-auto max-w-[1280px] px-6 py-24 md:py-32 border-t border-white/5 bg-[#0A1018]/60">
      <ScrollReveal className="mb-12">
        <p className="text-cyan-500 text-[clamp(10px,1.2vw,12px)] font-medium tracking-widest uppercase mb-3">
          Why Choose Us
        </p>
        <h2 className="text-[clamp(22px,3vw,30px)] font-bold text-text-primary">
          为什么选择我们
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {advantages.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.08}>
            <div className="group flex flex-col rounded-2xl bg-white/[0.06] border border-white/10 p-6 backdrop-blur-xl transition-all duration-500 ease-out hover:border-slate-500/60 hover:bg-white/[0.09] hover:-translate-y-1">
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
                <div className="text-sm text-slate-400 font-medium mt-2">
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
