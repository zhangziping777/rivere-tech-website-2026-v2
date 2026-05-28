"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const products = [
  {
    title: "AnyGateway",
    subtitle: "融合支付网关核心",
    desc: "三层纵深管控、协议自转换与智能路由，构建安全高效的金融级数据连接中枢。",
    href: "/products#anygateway",
  },
  {
    title: "AnyTXN",
    subtitle: "信用卡及零售信贷核心",
    desc: "独创 TXA 理念，统一账户与交易建模，驱动业务持续创新的极速金融底座。",
    href: "/products#anytxn",
  },
  {
    title: "AnyEAST",
    subtitle: "智能风控/营销决策核心",
    desc: "毫秒级事中决策，全生命周期信贷风险管控与智能营销的大脑中心。",
    href: "/products#anyeast",
  },
  {
    title: "AnyTASK",
    subtitle: "流程自动化管理核心",
    desc: "可视化全链路任务编排，实现从策略决策到落地执行的无缝闭环。",
    href: "/products#anytask",
  },
];

/* Dummy code lines for geek-texture background */
const codeLines = Array.from({ length: 18 }, (_, i) => {
  const snippets = [
    "fn process_txn(amt: f64) -> Result<Txn>",
    "  let account = ledger::fetch(id)?;",
    "  let risk   = east::score(&ctx)?;",
    "  let route  = gateway::resolve(iso);",
    "  account.apply(amt)?;",
    "  txn.commit().map_err(|e| e.into())",
    "pub struct AuthRequest { mcc: u16, pin: [u8; 6] }",
    "impl From<Payload> for Settlement { … }",
    "const MAX_RETRY: u8 = 3;",
    "#[wasm_bindgen] pub fn reconcile(batch: &[Txn])",
    "use anytask::pipeline::{Orch, Task};",
    "cache.invalidate(&keys).await?;",
    "tracing::info!(%latency, \"txn settled\");",
    "let proof = merkle::prove(&leaves, idx);",
    "select * from events where ts > now() - 5m",
    "kubectl rollout restart deploy/txn-engine",
    "│  └─ POST /v2/authorize   [201] 44ms",
    "│  ├─ anygateway::route    [OK]   2ms",
  ];
  return snippets[i % snippets.length];
});

function CodeBackground() {
  return (
    <div className="absolute inset-0 z-[0] overflow-hidden pointer-events-none select-none opacity-[0.06] blur-[1px]">
      <div className="font-mono text-[clamp(7px,0.9vw,10px)] text-gray-400 leading-relaxed whitespace-pre">
        {codeLines.map((line, i) => (
          <div key={i} className="ml-[clamp(4%,8vw,10%)]">
            <span className="text-cyan-500/30 mr-3">{String(i + 1).padStart(2, "0")}</span>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CoreProducts() {
  return (
    <section className="relative z-[10] mx-auto max-w-7xl px-6 py-32 border-t border-white/5 overflow-hidden">
      <CodeBackground />

      {/* Engineering grid texture */}
      <div
        className="absolute inset-0 z-[0] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mb-16"
      >
        <p className="text-cyan-500 text-[clamp(10px,1.2vw,12px)] font-bold tracking-widest uppercase mb-3">
          Core Products
        </p>
        <h2 className="text-[clamp(22px,3vw,30px)] md:text-[clamp(28px,3.5vw,36px)] font-bold text-text-primary">
          下一代数字金融引擎
        </h2>
      </motion.div>

      {/* 4-col grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
        {products.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
          >
            <Link href={p.href}>
              <div className="group relative !bg-white/[0.02] !backdrop-blur-xl !border !border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1.5 hover:!bg-white/[0.06] hover:!border-cyan-500/30 hover:shadow-[0_15px_30px_-15px_rgba(6,182,212,0.25)] cursor-pointer h-full flex flex-col">
                {/* Title */}
                <h3 className="text-[clamp(16px,1.8vw,20px)] !font-bold !inline-block tracking-wide !bg-gradient-to-r !from-blue-400 !to-cyan-300 !bg-clip-text !text-transparent mb-1.5 leading-tight">
                  {p.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-blue-400 font-medium tracking-wide mb-3">
                  {p.subtitle}
                </p>

                {/* Description */}
                <p className="text-slate-300 text-[clamp(12px,1.4vw,14px)] leading-relaxed mt-auto">
                  {p.desc}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
