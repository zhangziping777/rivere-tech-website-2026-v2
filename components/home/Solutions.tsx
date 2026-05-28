"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const solutions = [
  {
    num: "01",
    title: "信用卡发卡解决方案",
    desc: "基于 TXA 理念，覆盖申请、审批、发卡到核算全生命周期，助力银行快速搭建新一代信用卡核心体系。",
    href: "/solutions/issuing",
  },
  {
    num: "02",
    title: "零售信贷一体化解决方案",
    desc: "灵活支撑消费贷、现金贷等多种信贷产品，秒级审批与智能风控驱动业务快速增长。",
    href: "/solutions/retail-credit",
  },
  {
    num: "03",
    title: "Web3 融合支付解决方案",
    desc: "打通传统支付与稳定币生态，实现无缝连接的全球化清结算，抢占下一代支付先机。",
    href: "/solutions/gateway",
  },
];

export default function Solutions() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-24 md:py-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16"
      >
        <p className="text-cyan-500 text-[clamp(10px,1.2vw,12px)] font-bold tracking-widest uppercase mb-3">
          Industry Solutions
        </p>
        <h2 className="text-[clamp(22px,3vw,30px)] md:text-[clamp(28px,3.5vw,36px)] font-bold text-text-primary">
          端到端的业务赋能
        </h2>
      </motion.div>

      {/* ── Top connector: dashed line + flowchart nodes ── */}
      <div className="relative mb-8">
        {/* Horizontal dashed line */}
        <div
          className="absolute top-1/2 left-[8%] right-[8%] h-px pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 6px, transparent 6px, transparent 12px)",
          }}
        />

        {/* Flowchart nodes placed above each card column */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {solutions.map((s, i) => (
            <div key={s.num} className="flex justify-center">
              <div className="flex flex-col items-center">
                {/* Node dot */}
                <div className="w-3 h-3 rounded-full bg-cyan-500/40 border border-cyan-500/60 z-10" />
                {/* Tiny label */}
                <span className="text-[clamp(8px,0.9vw,10px)] text-text-muted mt-2 tracking-widest uppercase">
                  {i === 0 ? "Acquire" : i === 1 ? "Process" : "Settle"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3 cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {solutions.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.12, duration: 0.55, ease: "easeOut" }}
          >
            <Link href={s.href}>
              <div className="group relative bg-white/[0.06] border border-white/10 rounded-3xl p-10 backdrop-blur-xl transition-all duration-500 hover:border-slate-500/60 hover:bg-white/[0.09] hover:-translate-y-2 overflow-hidden cursor-pointer h-full flex flex-col">
                {/* ── Giant number watermark ── */}
                <span className="absolute -bottom-4 -right-4 text-8xl md:text-[10rem] font-black leading-none select-none pointer-events-none z-0 text-white/[0.03]">
                  {s.num}
                </span>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Title */}
                  <h3 className="text-[clamp(17px,1.9vw,20px)] font-bold text-white mb-3">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-[clamp(13px,1.5vw,15px)] leading-relaxed flex-1">
                    {s.desc}
                  </p>

                  {/* Arrow on hover */}
                  <span className="inline-flex items-center gap-1 mt-5 text-slate-400 text-[clamp(11px,1.2vw,13px)] font-medium opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    了解更多 <span className="text-base leading-none">&rarr;</span>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
