"use client";

import { Layers, Users2, Briefcase, ShieldCheck, Cpu } from "lucide-react";
import CountUpMetric from "@/components/ui/CountUpMetric";
import ScrollReveal from "@/components/ui/ScrollReveal";

const advantages = [
  {
    icon: Layers,
    title: "全能力视图",
    desc: "业务规划、技术规划、科技建设到持续运营的全流程服务能力",
    stat: "100",
    suffix: "%",
    statLabel: "全流程覆盖",
  },
  {
    icon: Users2,
    title: "顶尖核心团队",
    desc: "高管及核心团队均来自国内外顶级银行及一流金融科技企业",
    stat: "15",
    suffix: "+",
    statLabel: "年平均从业经验",
  },
  {
    icon: Briefcase,
    title: "深厚行业沉淀",
    desc: "平均超过15年的信用卡及零售信贷业务/IT系统建设经验",
    stat: "50",
    suffix: "+",
    statLabel: "服务金融机构",
  },
  {
    icon: ShieldCheck,
    title: "强大交付保障",
    desc: "国内首例、规模最大的信用卡核心系统迁移及自建实战案例",
    stat: "100",
    suffix: "M+",
    statLabel: "账户迁移规模",
  },
  {
    icon: Cpu,
    title: "创新技术架构",
    desc: "率先在信用卡及零售信贷领域实现全组件云原生架构落地",
    stat: "99.99",
    suffix: "%",
    statLabel: "系统可用性",
  },
];

export default function Advantages() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-24 border-t border-brand-border">
      <ScrollReveal className="mb-12">
        <p className="text-accent-green text-[clamp(10px,1.2vw,12px)] font-medium tracking-widest uppercase mb-3">
          Why Choose Us
        </p>
        <h2 className="text-[clamp(22px,3vw,30px)] font-bold text-text-primary">为什么选择我们</h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {advantages.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.08}>
            <div
              className="group flex flex-col rounded-sm border border-brand-border bg-brand-surface/40 p-5 hover:border-accent-green/30 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,229,153,0.1)] transition-all duration-500 ease-out"
            >
              <item.icon
                size={22}
                className="text-accent-green mb-3"
                strokeWidth={1.5}
              />
              <h4 className="text-[clamp(13px,1.5vw,14px)] font-semibold text-text-primary mb-1">
                {item.title}
              </h4>
              <p className="text-text-muted text-[clamp(11px,1.2vw,12px)] leading-relaxed mb-4 flex-1">
                {item.desc}
              </p>
              <div className="pt-3 border-t border-brand-border">
                <div className="text-[clamp(16px,2vw,20px)] font-bold text-accent-green">
                  <CountUpMetric value={item.stat} suffix={item.suffix} />
                </div>
                <div className="text-[clamp(9px,1vw,10px)] text-text-muted mt-0.5">
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
