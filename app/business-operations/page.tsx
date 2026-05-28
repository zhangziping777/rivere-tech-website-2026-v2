"use client";

import { motion } from "framer-motion";
import {
  Target,
  ShieldCheck,
  Users2,
  Radio,
  BarChart4,
  GanttChart,
  TrendingUp,
  PiggyBank,
  Zap,
  AlertTriangle,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

/* ── Services data ── */
const services = [
  {
    icon: Target,
    index: "01",
    title: "联合营销运营",
    desc: "整合多渠道营销资源，基于AI决策引擎实现精准投放与智能触达，提升转化效率。",
    sparkline: [18, 24, 20, 32, 28, 40, 35, 48, 42, 55],
  },
  {
    icon: ShieldCheck,
    index: "02",
    title: "风险运营管理",
    desc: "全链路风险监控与实时预警，覆盖交易反欺诈、信用评估、贷后催收全场景。",
    sparkline: [35, 30, 25, 22, 18, 15, 12, 10, 8, 5],
  },
  {
    icon: Users2,
    index: "03",
    title: "客户生命周期管理",
    desc: "从获客、激活、留存到价值提升，构建完整的客户经营闭环与分层运营体系。",
    sparkline: [10, 18, 25, 20, 30, 28, 35, 40, 45, 52],
  },
  {
    icon: Radio,
    index: "04",
    title: "场景获客运营",
    desc: "深耕消费、出行、生活缴费等高频场景，以技术驱动场景化流量变现。",
    sparkline: [22, 28, 24, 35, 32, 40, 38, 48, 50, 58],
  },
  {
    icon: BarChart4,
    index: "05",
    title: "数据驱动决策",
    desc: "海量交易数据实时清洗与建模，提供可视化BI看板与智能策略推荐。",
    sparkline: [30, 28, 35, 32, 42, 40, 48, 52, 50, 60],
  },
  {
    icon: GanttChart,
    index: "06",
    title: "合规与监管科技",
    desc: "自动化合规审查与监管报送，确保业务运营满足人民银行及银保监会要求。",
    sparkline: [45, 42, 38, 35, 30, 28, 25, 22, 20, 18],
  },
];

/* ── Impact stats ── */
const impactStats = [
  { icon: TrendingUp, value: "35%+", label: "客户转化率提升", suffix: "相较传统运营模式" },
  { icon: PiggyBank, value: "40%+", label: "获客成本降低", suffix: "基于精准场景触达" },
  { icon: Zap, value: "50%+", label: "运营效率提升", suffix: "自动化流程覆盖" },
  { icon: AlertTriangle, value: "25%+", label: "风险损失降低", suffix: "实时风控策略拦截" },
];

/* ── Mini sparkline SVG ── */
function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 24;
  const w = 80;
  const gap = w / (data.length - 1);
  const points = data
    .map((v, i) => {
      const x = i * gap;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-20 h-6 opacity-30 group-hover/card:opacity-60 transition-opacity duration-500"
    >
      <polyline
        points={points}
        fill="none"
        stroke="#06B6D4"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Service card ── */
function ServiceCard({
  icon: Icon,
  index,
  title,
  desc,
  sparkline,
  delay,
}: (typeof services)[number] & { delay: number }) {
  return (
    <ScrollReveal delay={delay}>
      <motion.div
        className="group/card relative overflow-hidden !bg-white/[0.02] !border !border-white/10 rounded-3xl p-6 !backdrop-blur-xl transition-all duration-500
                   hover:!border-cyan-500/30 hover:!bg-white/[0.06] hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.1)] hover:-translate-y-1"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {/* Decorative index watermark */}
        <span className="absolute top-3 right-5 text-[56px] font-extrabold text-white/[0.03] select-none pointer-events-none leading-none">
          {index}
        </span>

        {/* Glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: "inset 0 0 40px rgba(6,182,212,0.04)" }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Icon */}
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
            <Icon size={18} className="text-cyan-500" strokeWidth={1.5} />
          </div>

          {/* Title & Desc */}
          <h3 className="text-[15px] font-semibold text-text-primary mb-2">{title}</h3>
          <p className="text-slate-400 text-xs leading-relaxed flex-1">{desc}</p>

          {/* Sparkline at bottom */}
          <div className="mt-4 flex items-center justify-between">
            <Sparkline data={sparkline} />
            <span className="text-cyan-500/30 text-lg group-hover/card:text-cyan-500 group-hover/card:translate-x-1 transition-all duration-300">
              &rarr;
            </span>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

/* ── Page ── */
export default function BusinessOperationsPage() {
  return (
    <main className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════════
          Hero Section
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        {/* Aurora glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-[#0284C7]/4 blur-[100px] rounded-full pointer-events-none" />

        {/* Code grid texture */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-44 pb-28 md:pt-52 md:pb-32 text-center">
          <ScrollReveal>
            <p className="text-cyan-500 text-xs font-medium tracking-widest uppercase mb-6">
              Business Operations
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 max-w-4xl mx-auto bg-gradient-to-r from-blue-500 via-cyan-400 to-cyan-300 bg-clip-text text-transparent"
              style={{ textShadow: "0 0 80px rgba(6,182,212,0.10), 0 0 16px rgba(6,182,212,0.05)" }}
            >
              业务合作运营服务
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.14}>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              科技驱动运营，创造增量价值，与合作伙伴共同成长
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Core Services Matrix
          ═══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-cyan-500 text-[clamp(10px,1.2vw,12px)] font-medium tracking-widest uppercase mb-3">
            Core Services
          </p>
          <h2 className="text-[clamp(22px,3vw,30px)] font-bold text-text-primary">
            核心运营服务矩阵
          </h2>
          <p className="mt-3 text-slate-400 text-sm md:text-base max-w-2xl">
            六大服务模块覆盖零售金融运营全场景，以技术驱动效率与规模的双重增长。
          </p>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.index} {...s} delay={i * 0.06} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          Impact Section
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden border-y border-white/[0.04]">
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/4 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28">
          {/* Section header */}
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="text-cyan-500 text-[clamp(10px,1.2vw,12px)] font-medium tracking-widest uppercase mb-3">
                Measurable Impact
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <h2 className="text-[clamp(22px,3vw,30px)] font-bold text-text-primary">
                运营数据效能
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-3 text-slate-400 text-sm md:text-base max-w-xl mx-auto">
                合作伙伴的真实业务增长，是我们技术价值的最佳证明。
              </p>
            </ScrollReveal>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <ScrollReveal key={stat.label} delay={0.1 + i * 0.08}>
                  <motion.div
                    className="group/stats relative !bg-white/[0.02] !border !border-white/10 rounded-3xl p-6 !backdrop-blur-xl transition-all duration-500
                               hover:!border-cyan-500/30 hover:!bg-white/[0.06] hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.1)] hover:-translate-y-1"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <StatIcon size={20} className="text-cyan-500/60 mb-4" strokeWidth={1.5} />
                    <div
                      className="text-[clamp(28px,3vw,40px)] font-extrabold text-cyan-500 mb-1"
                      style={{ textShadow: "0 0 20px rgba(6,182,212,0.35)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-text-primary text-sm font-semibold mb-1">
                      {stat.label}
                    </div>
                    <div className="text-slate-500 text-xs">{stat.suffix}</div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA Section
          ═══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28 text-center">
        <ScrollReveal>
          <p className="text-cyan-500 text-xs font-medium tracking-widest uppercase mb-4">
            Let&apos;s Collaborate
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h2 className="text-[clamp(22px,3vw,30px)] font-bold text-text-primary mb-4">
            成为业务合作伙伴
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.12}>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-8">
            无论您是金融机构、场景平台还是技术服务商，我们期待与您共建零售金融生态。
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <a
            href="/about#contact"
            className="inline-flex items-center px-6 py-3 rounded-sm bg-cyan-500 text-black text-sm font-bold hover:bg-cyan-500/90 transition-colors duration-200"
          >
            立即联系
          </a>
        </ScrollReveal>
      </section>
    </main>
  );
}
