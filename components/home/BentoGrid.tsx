"use client";

import { motion } from "framer-motion";
import { CreditCard, Building2, Users, ArrowUpRight } from "lucide-react";

/* ── SVG Area Chart ── */
function AreaChart() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute right-0 bottom-0 w-full h-[65%] pointer-events-none"
    >
      <defs>
        {/* Main area gradient — visible green to transparent */}
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00E599" stopOpacity="0.28" />
          <stop offset="35%" stopColor="#00E599" stopOpacity="0.12" />
          <stop offset="70%" stopColor="#00E599" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#00E599" stopOpacity="0" />
        </linearGradient>
        {/* Upper highlight — brighter band just below the line */}
        <linearGradient id="areaHighlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00E599" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00E599" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00E599" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#00E599" stopOpacity="1" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Subtle horizontal grid lines */}
      {[20, 40, 60, 80].map((y) => (
        <line
          key={y}
          x1="0" y1={y} x2="100" y2={y}
          stroke="rgba(255,255,255,0.025)"
          strokeWidth="0.3"
        />
      ))}

      {/* Area fill — main gradient body */}
      <path
        d="M 0 78
           C 4 78, 8 74, 12 72
           C 18 69, 22 77, 28 75
           C 34 73, 38 62, 44 58
           C 50 54, 54 65, 60 60
           C 66 55, 70 44, 76 42
           C 82 40, 86 48, 92 38
           C 96 32, 98 28, 100 25
           L 100 100 L 0 100 Z"
        fill="url(#areaGrad)"
      />

      {/* Area highlight — thin bright band under the line */}
      <path
        d="M 0 78
           C 4 78, 8 74, 12 72
           C 18 69, 22 77, 28 75
           C 34 73, 38 62, 44 58
           C 50 54, 54 65, 60 60
           C 66 55, 70 44, 76 42
           C 82 40, 86 48, 92 38
           C 96 32, 98 28, 100 25
           L 100 32 L 0 85 Z"
        fill="url(#areaHighlight)"
      />

      {/* Main line */}
      <path
        d="M 0 78
           C 4 78, 8 74, 12 72
           C 18 69, 22 77, 28 75
           C 34 73, 38 62, 44 58
           C 50 54, 54 65, 60 60
           C 66 55, 70 44, 76 42
           C 82 40, 86 48, 92 38
           C 96 32, 98 28, 100 25"
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Glow line (wider, soft) */}
      <path
        d="M 0 78
           C 4 78, 8 74, 12 72
           C 18 69, 22 77, 28 75
           C 34 73, 38 62, 44 58
           C 50 54, 54 65, 60 60
           C 66 55, 70 44, 76 42
           C 82 40, 86 48, 92 38
           C 96 32, 98 28, 100 25"
        fill="none"
        stroke="#00E599"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.12"
      />

      {/* Data point — latest value highlight */}
      <circle cx="100" cy="25" r="1.5" fill="#00E599" opacity="0.95" />
      <circle cx="100" cy="25" r="3.5" fill="#00E599" opacity="0.18" />
    </svg>
  );
}

/* ── Stat badge ── */
function StatBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[clamp(18px,2vw,24px)] font-bold text-text-primary tabular-nums">
        {value}
      </span>
      <span className="text-text-muted text-[clamp(9px,1vw,11px)]">{label}</span>
    </div>
  );
}

/* ── Right-hand small card ── */
function SideCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      className="group flex flex-col bg-[#0B0F19]/50 border border-white/5 rounded-3xl p-6 transition-all duration-500 cursor-default backdrop-blur-xl
                 hover:border-[#00E599]/30 hover:bg-[#0B0F19]/80 hover:-translate-y-1"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: "inset 0 0 40px rgba(0,229,153,0.04)" }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="w-9 h-9 rounded-lg bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center mb-4">
          <Icon size={18} className="text-[#00E599]" strokeWidth={1.5} />
        </div>
        <h3 className="text-[clamp(14px,1.5vw,16px)] font-semibold text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-text-secondary text-[clamp(11px,1.2vw,13px)] leading-relaxed flex-1">
          {desc}
        </p>
        <span className="inline-flex text-[#00E599]/50 group-hover:text-[#00E599] group-hover:translate-x-1 transition-all duration-300 text-lg mt-3">
          &rarr;
        </span>
      </div>
    </motion.div>
  );
}

/* ── Main grid ── */
export default function BentoGrid() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-20">
      {/* Section header */}
      <div className="mb-12">
        <p className="text-accent-green text-[clamp(10px,1.2vw,12px)] font-medium tracking-widest uppercase mb-3">
          Our Businesses
        </p>
        <h2 className="text-[clamp(22px,3vw,30px)] font-bold text-text-primary">
          三大核心业务
        </h2>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-16">
        {/* ── Left hero card (span 8): 信用卡核心系统 ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="col-span-1 lg:col-span-8 relative overflow-hidden bg-[#0B0F19]/80 border border-white/5 rounded-3xl p-8 min-h-[380px] flex flex-col backdrop-blur-xl group hover:border-[#00E599]/30 transition-colors duration-500"
        >
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Top-left content */}
          <div className="relative z-10 max-w-[55%]">
            <div className="w-10 h-10 rounded-lg bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center mb-5">
              <CreditCard size={20} className="text-[#00E599]" strokeWidth={1.5} />
            </div>
            <h3 className="text-[clamp(18px,2vw,24px)] font-bold text-text-primary mb-3">
              信用卡 / 零售信贷核心系统
            </h3>
            <p className="text-text-secondary text-[clamp(12px,1.4vw,14px)] leading-relaxed">
              助力客户完成「以客户为中心」的数字核心建设及升级；提供全新搭建、升级、迁移全流程服务。
            </p>

            {/* Stats row */}
            <div className="flex gap-8 mt-6">
              <StatBadge label="系统可用性" value="99.99%" />
              <StatBadge label="日均交易" value="10M+" />
            </div>
          </div>

          {/* Area chart — fills bottom half */}
          <AreaChart />
        </motion.div>

        {/* ── Right column (span 4): two stacked cards ── */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <SideCard
              icon={Building2}
              title="零售信贷一体化方案"
              desc="为区域银行打造「以客户为中心」的智能零售信贷解决方案，构建「生态+运营+科技」体系。"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <SideCard
              icon={Users}
              title="专业咨询与交付"
              desc="汇聚国际金融企业专家、国内大行资深人士及 IT 技术大咖，确保方案可落地。"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
