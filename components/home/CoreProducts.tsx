"use client";

import { motion } from "framer-motion";
import { Shield, Database, Brain, Workflow, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const products = [
  {
    icon: Shield,
    title: "AnyGateway",
    subtitle: "融合支付网关核心",
    desc: "三层纵深管控、协议自转换与智能路由，构建安全高效的金融级数据连接中枢。",
    href: "/products#anygateway",
  },
  {
    icon: Database,
    title: "AnyTXN",
    subtitle: "信用卡及零售信贷核心",
    desc: "独创 TXA 理念，统一账户与交易建模，驱动业务持续创新的极速金融底座。",
    href: "/products#anytxn",
  },
  {
    icon: Brain,
    title: "AnyEAST",
    subtitle: "智能风控/营销决策核心",
    desc: "毫秒级事中决策，全生命周期信贷风险管控与智能营销的大脑中心。",
    href: "/products#anyeast",
  },
  {
    icon: Workflow,
    title: "AnyTASK",
    subtitle: "流程自动化管理核心",
    desc: "可视化全链路任务编排，实现从策略决策到落地执行的无缝闭环。",
    href: "/products#anytask",
  },
];

export default function CoreProducts() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-24 border-t border-brand-border">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="text-accent-green text-[clamp(10px,1.2vw,12px)] font-bold tracking-widest uppercase mb-3">
          Core Products
        </p>
        <h2 className="text-[clamp(22px,3vw,30px)] md:text-[clamp(28px,3.5vw,36px)] font-bold text-text-primary">
          下一代数字金融引擎
        </h2>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {products.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, duration: 0.55, ease: "easeOut" }}
          >
            <Link href={p.href}>
              <div className="group relative p-8 bg-white/[0.02] border border-white/10 rounded-2xl transition-all duration-500 hover:bg-white/[0.04] hover:border-[#00E599]/50 hover:-translate-y-2 overflow-hidden cursor-pointer h-full flex flex-col">
                {/* Glow on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: "inset 0 0 40px rgba(0,229,153,0.04), 0 0 30px rgba(0,229,153,0.08)" }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon + Arrow */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center">
                      <p.icon size={20} className="text-[#00E599]" strokeWidth={1.5} />
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-text-muted/30 group-hover:text-[#00E599] group-hover:opacity-100 transition-all duration-300 shrink-0 mt-1"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-[clamp(16px,1.8vw,18px)] font-bold text-text-primary mb-1">
                    {p.title}
                  </h3>
                  <p className="text-[clamp(10px,1.1vw,11px)] text-text-muted font-medium tracking-wide mb-3">
                    {p.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-text-secondary text-[clamp(12px,1.4vw,14px)] leading-relaxed mt-auto">
                    {p.desc}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
