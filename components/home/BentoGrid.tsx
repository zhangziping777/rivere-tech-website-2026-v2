"use client";

import { motion } from "framer-motion";
import { CreditCard, Building2, Users } from "lucide-react";

/* ── Simulated transaction log lines ── */
const logLines = [
  { id: "L1", label: "TXN-4A2F",  status: "incoming",  time: "14:32:01.003" },
  { id: "L2", label: "AUTH",      status: "verified",  time: "14:32:01.047" },
  { id: "L3", label: "EAST",      status: "scoring",   time: "14:32:01.128" },
  { id: "L4", label: "CORE",      status: "settled",   time: "14:32:01.203" },
];

function TechLog() {
  return (
    <div className="mt-6 rounded-sm border border-accent-green/15 bg-brand-bg/70 px-4 py-3 font-mono text-[10px] leading-relaxed tracking-tight select-none pointer-events-none">
      {/* header bar */}
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-brand-border/60">
        <span className="w-2 h-2 rounded-full bg-red-500/60" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <span className="w-2 h-2 rounded-full bg-green-500/60" />
        <span className="ml-2 text-text-muted text-[9px]">txn-stream — 256-bit TLS</span>
      </div>

      {/* log entries */}
      {logLines.map((line, i) => (
        <motion.div
          key={line.id}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + i * 0.15, duration: 0.35, ease: "easeOut" }}
          className="flex items-center gap-2"
        >
          <span className="text-accent-green/60 shrink-0">&gt;</span>
          <span className="text-text-muted w-14 shrink-0">{line.label}</span>
          <span className="text-accent-green/40 w-16 shrink-0">{line.status}</span>
          <span className="text-brand-border-light flex-1 text-right">
            {"─".repeat(20 - i * 3)}
          </span>
          <span className="text-text-muted/60 shrink-0 w-[6.5rem] text-right">{line.time}</span>
        </motion.div>
      ))}

      {/* blinking prompt */}
      <motion.div
        className="flex items-center gap-1 mt-2"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-accent-green/80 text-[10px]">$</span>
        <span className="w-2.5 h-3 bg-accent-green/70" />
      </motion.div>
    </div>
  );
}

/* ── System capability tags ── */
const tags = ["微服务架构", "千万级 TPS", "秒级核算", "云原生部署"];

function CapabilityTags() {
  return (
    <div className="mt-4 flex flex-wrap gap-2 pointer-events-none select-none">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center px-2.5 py-1 rounded-sm border border-brand-border/60 bg-brand-bg/40 text-text-muted text-[11px] tracking-wide"
        >
          <span className="w-1 h-1 rounded-full bg-accent-green/50 mr-1.5" />
          {tag}
        </span>
      ))}
    </div>
  );
}

/* ── Card data ── */
const cards = [
  {
    icon: CreditCard,
    title: "信用卡核心系统与实施交付",
    desc: `助力客户完成"以客户为中心"的数字核心建设及升级；提供全新搭建、升级、迁移全流程服务。`,
    highlight: "凭借先进技术和标准化设计，提供多样化的专业系统解决方案。",
    span: "lg:col-span-2 lg:row-span-2",
    decorator: "log",
  },
  {
    icon: Building2,
    title: "零售信贷一体化",
    desc: `为区域银行打造"以客户为中心"的智能零售信贷解决方案，构建"生态+运营+科技"体系。`,
    highlight: `依托金融云/场景云/数据云，助力客户"0门槛"搭建顶尖科技能力。`,
    span: "lg:col-span-1",
  },
  {
    icon: Users,
    title: "专业咨询服务",
    desc: "汇聚国际金融企业专家、国内大行资深人士及 IT 技术大咖。",
    highlight: "丰富的架构设计与项目交付实战经验，确保方案可落地。",
    span: "lg:col-span-1",
  },
];

/* ── Card component ── */
function BentoCard({
  icon: Icon,
  title,
  desc,
  highlight,
  span,
  decorator,
}: (typeof cards)[number] & { decorator?: string }) {
  return (
    <motion.div
      className={`${span} group relative overflow-hidden rounded-sm border border-brand-border bg-brand-surface/60 p-6 md:p-8 transition-colors duration-300 hover:border-accent-green/50`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* neon glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow:
            "inset 0 0 40px rgba(0,229,153,0.06), 0 0 30px rgba(0,229,153,0.08)",
        }}
      />

      <div className="relative z-10">
        {/* header */}
        <Icon size={28} className="text-accent-green mb-4" strokeWidth={1.5} />
        <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>

        {/* decorative element — only for the hero card */}
        {decorator === "log" && <TechLog />}
        {decorator === "log" && <CapabilityTags />}

        {/* highlight */}
        <p
          className={`text-accent-green/80 text-xs leading-relaxed border-l-2 border-accent-green/50 pl-3 ${
            decorator === "log" ? "mt-5" : "mt-4"
          }`}
        >
          {highlight}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Grid ── */
export default function BentoGrid() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-24">
      <div className="mb-12">
        <p className="text-accent-green text-xs font-medium tracking-widest uppercase mb-3">
          Our Businesses
        </p>
        <h2 className="text-3xl font-bold text-text-primary">三大核心业务</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <BentoCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
