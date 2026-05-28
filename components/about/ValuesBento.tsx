import { Cpu, RefreshCw, Users, Shield } from "lucide-react";

const values = [
  {
    icon: Cpu,
    title: "技术驱动",
    desc: "坚持自研核心引擎，在分布式事务、实时决策、流计算等领域持续投入研发，保持技术栈始终领先。",
  },
  {
    icon: RefreshCw,
    title: "全生命周期服务",
    desc: "从业务规划、技术选型、系统建设到持续运营，提供端到端全流程服务，确保方案可落地、可持续。",
  },
  {
    icon: Shield,
    title: "安全合规第一",
    desc: "将安全与合规融入产品基因，所有系统严格遵循 PCI-DSS、等保三级等金融行业监管标准。",
  },
  {
    icon: Users,
    title: "开放共赢",
    desc: "携手华为、VISA 等全球顶尖伙伴共建数字金融生态，与客户形成深度战略合作关系，共同成长。",
  },
];

export default function ValuesBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {values.map((v) => (
        <div
          key={v.title}
          className="group relative overflow-hidden rounded-sm border border-brand-border bg-brand-surface/40 p-6 md:p-8 transition-all duration-500 ease-out hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)]"
        >
          {/* neon glow on hover */}
          <div
            className="pointer-events-none absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              boxShadow:
                "inset 0 0 40px rgba(6,182,212,0.06), 0 0 24px rgba(6,182,212,0.08)",
            }}
          />

          <div className="relative z-10">
            <v.icon size={24} className="text-cyan-500 mb-4" strokeWidth={1.5} />
            <h3 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-text-primary mb-2">{v.title}</h3>
            <p className="text-text-secondary text-[clamp(12px,1.4vw,14px)] leading-relaxed">{v.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
