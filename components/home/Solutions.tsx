"use client";

import { motion } from "framer-motion";
import { CreditCard, Landmark, Globe } from "lucide-react";
import Link from "next/link";

const solutions = [
  {
    num: "01",
    icon: CreditCard,
    title: "信用卡发卡解决方案",
    desc: "基于 TXA 理念，覆盖申请、审批、发卡到核算全生命周期，助力银行快速搭建新一代信用卡核心体系。",
    href: "/solutions/issuing",
  },
  {
    num: "02",
    icon: Landmark,
    title: "零售信贷一体化解决方案",
    desc: "灵活支撑消费贷、现金贷等多种信贷产品，秒级审批与智能风控驱动业务快速增长。",
    href: "/solutions/retail-credit",
  },
  {
    num: "03",
    icon: Globe,
    title: "Web3 融合支付解决方案",
    desc: "打通传统支付与稳定币生态，实现无缝连接的全球化清结算，抢占下一代支付先机。",
    href: "/solutions/gateway",
  },
];

export default function Solutions() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="text-accent-green text-[clamp(10px,1.2vw,12px)] font-bold tracking-widest uppercase mb-3">
          Industry Solutions
        </p>
        <h2 className="text-[clamp(22px,3vw,30px)] md:text-[clamp(28px,3.5vw,36px)] font-bold text-text-primary">
          端到端的业务赋能
        </h2>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {solutions.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.12, duration: 0.55, ease: "easeOut" }}
          >
            <Link href={s.href}>
              <div className="group relative p-10 bg-gradient-to-b from-white/[0.05] to-transparent border-t border-white/10 rounded-3xl hover:border-t-[#00E599] transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer h-full flex flex-col">
                {/* Watermark number */}
                <div
                  className="pointer-events-none absolute -bottom-4 -right-2 text-[120px] font-bold leading-none select-none opacity-[0.03] text-white transition-opacity duration-500 group-hover:opacity-[0.06]"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  {s.num}
                </div>

                {/* Glow on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: "inset 0 0 50px rgba(0,229,153,0.03)" }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#00E599]/8 border border-[#00E599]/15 flex items-center justify-center mb-6">
                    <s.icon size={22} className="text-[#00E599]" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="text-[clamp(17px,1.9vw,20px)] font-bold text-text-primary mb-3">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary text-[clamp(13px,1.5vw,15px)] leading-relaxed mt-auto">
                    {s.desc}
                  </p>

                  {/* Invisible arrow on hover */}
                  <span className="inline-flex items-center gap-1 mt-5 text-[#00E599] text-[clamp(11px,1.2vw,13px)] font-medium opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
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
