"use client";

import { motion } from "framer-motion";
import { Layers, Building2, Users } from "lucide-react";
import Link from "next/link";


/* ── Right-hand small card ── */
function SideCard({
  icon: Icon,
  title,
  desc,
  href,
  ctaLabel,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  href?: string;
  ctaLabel?: string;
}) {
  const content = (
    <motion.div
      className="group flex flex-col !bg-white/5 !backdrop-blur-md !border !border-white/10 rounded-3xl p-6 transition-all duration-500
                 hover:!bg-white/[0.06] hover:!border-cyan-400/30 hover:-translate-y-1 relative h-full"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4">
          <Icon size={18} className="text-slate-400" strokeWidth={1} />
        </div>
        <h3 className="text-[clamp(14px,1.5vw,16px)] font-semibold text-white mb-2">
          {title}
        </h3>
        <p className="text-slate-300 text-[clamp(11px,1.2vw,13px)] leading-relaxed flex-1">
          {desc}
        </p>
        {ctaLabel ? (
          <span className="inline-flex items-center px-4 py-2 mt-4 rounded-sm border border-blue-900/50 text-slate-300 text-xs font-medium hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:text-cyan-400 transition-all duration-300 w-fit">
            {ctaLabel}
          </span>
        ) : (
          <span className="inline-flex items-center px-4 py-2 mt-4 rounded-sm border border-blue-900/50 text-slate-300 text-xs font-medium hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:text-cyan-400 transition-all duration-300 w-fit">
            了解更多
          </span>
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href} className="block h-full">{content}</Link>;
  }
  return content;
}

/* ── Main grid ── */
export default function BentoGrid() {
  return (
    <section data-snap-section className="relative z-[10] mx-auto max-w-7xl px-6 py-32">
      {/* Ambient glow orbs */}
      <div className="absolute inset-0 z-[0] pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-400/8 blur-[120px] rounded-full" />
      </div>

      {/* Section header */}
      <div className="mb-16">
        <p className="text-cyan-400 text-[clamp(10px,1.2vw,12px)] font-medium tracking-widest uppercase mb-3">
          Our Businesses
        </p>
        <h2 className="text-[clamp(22px,3vw,30px)] font-bold text-text-primary">
          三大核心业务
        </h2>
      </div>

      {/* Asymmetric Bento Grid — explicit pixel widths for guaranteed stability */}
      <div className="flex gap-6 mt-16">
        {/* ── Left hero card: 805px ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-[805px] shrink-0 relative overflow-hidden !bg-white/5 !backdrop-blur-md !border !border-white/10 rounded-3xl p-8 min-h-[380px] flex flex-col group hover:!bg-white/[0.06] hover:!border-cyan-400/30 transition-all duration-500"
        >
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Top content */}
          <div className="relative z-10">
            <div className="mb-5">
              <Layers size={20} className="text-slate-400" strokeWidth={1} />
            </div>
            <h3 className="text-[clamp(18px,2vw,24px)] font-bold text-white mb-3">
              产品与解决方案
            </h3>
            <p className="text-slate-300 text-[clamp(12px,1.4vw,14px)] leading-relaxed max-w-2xl">
              覆盖信用卡、零售信贷全业务周期，以四大核心产品为底座，提供七大行业解决方案。
            </p>
          </div>

          {/* Two-block layout: Core Products | Solutions — explicit widths */}
          <div className="relative z-10 mt-10 w-full flex gap-8">
            {/* ── Core Products block — 295px ── */}
            <div className="w-[295px] shrink-0">
              <h4 className="text-slate-300 text-sm font-semibold tracking-wider uppercase mb-5">
                核心产品
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "AnyTXN 信用卡及零售信贷核心", href: "/products#anytxn" },
                  { label: "AnyEAST 智能风控/营销决策核心", href: "/products#anyeast" },
                  { label: "AnyTASK 流程自动化管理核心", href: "/products#anytask" },
                  { label: "AnyGateway 融合支付网关核心", href: "/products#anygateway" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-3 text-slate-300 hover:text-white text-[clamp(10px,1.1vw,12px)] transition-all duration-300 py-1"
                    >
                      <span className="w-[3px] h-4 bg-blue-600/80 rounded-full transition-all duration-300 group-hover:h-6 group-hover:bg-gradient-to-b group-hover:from-cyan-400 group-hover:to-blue-600 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] shrink-0" />
                      <span className="transition-transform duration-300 group-hover:translate-x-2">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Solutions block — 414px, with left divider ── */}
            <div className="w-[414px] shrink-0 pl-6 border-l border-white/10">
              <h4 className="text-slate-300 text-sm font-semibold tracking-wider uppercase mb-5">
                解决方案
              </h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {[
                  { label: "发卡业务解决方案", href: "/solutions/issuing" },
                  { label: "收单业务解决方案", href: "/solutions/acquiring" },
                  { label: "零售信贷业务解决方案", href: "/solutions/retail-credit" },
                  { label: "交易反欺诈解决方案", href: "/solutions/risk-control" },
                  { label: "实时智能催收解决方案", href: "/solutions/collection" },
                  { label: "智能营销解决方案", href: "/solutions/marketing" },
                  { label: "Gateway 网关解决方案", href: "/solutions/gateway" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-3 text-slate-300 hover:text-white text-[clamp(10px,1.1vw,12px)] transition-all duration-300 py-1"
                  >
                    <span className="w-[3px] h-4 bg-blue-600/80 rounded-full transition-all duration-300 group-hover:h-6 group-hover:bg-gradient-to-b group-hover:from-cyan-400 group-hover:to-blue-600 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] shrink-0" />
                    <span className="transition-transform duration-300 group-hover:translate-x-2">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </motion.div>

        {/* ── Right column: 403px ── */}
        <div className="w-[403px] shrink-0 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <SideCard
              icon={Building2}
              title="业务合作运营"
              desc="依托核心产品与技术能力，与合作伙伴共建零售金融生态，提供联合运营、场景获客等一站式服务。"
              href="/business-operations"
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
              ctaLabel="联系我们"
              href="/about#contact"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
