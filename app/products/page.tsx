import { ChevronDown } from "lucide-react";
import GatewayRadar from "@/components/products/GatewayRadar";
import TerminalJSON from "@/components/products/TerminalJSON";
import RiskDashboard from "@/components/products/RiskDashboard";
import WorkflowNodes from "@/components/products/WorkflowNodes";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ArchitectureMap from "@/components/products/ArchitectureMap";

interface Exhibit {
  id: string;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  Visual: React.ComponentType;
}

const exhibits: Exhibit[] = [
  {
    id: "anygateway",
    tag: "HIGH-PERFORMANCE GATEWAY",
    title: "AnyGateway 融合支付网关核心",
    description: "构建安全、高效、可扩展的金融级数据连接中枢。",
    bullets: [
      "三层纵深管控架构，从网络层到应用层全方位防护",
      "协议自转换与智能路由，REST / gRPC / MQ 多协议互通",
      "全自动智能对账体系，差错率降至金融级最低标准",
      "Web3 生态无缝衔接，支持分布式身份与稳定币支付",
    ],
    Visual: GatewayRadar,
  },
  {
    id: "anytxn",
    tag: "NEXT-GENERATION",
    title: "AnyTXN 信用卡及零售信贷核心",
    description: "专为零售银行业务设计，驱动业务持续创新的极速金融底座。",
    bullets: [
      "独创 TXA（以交易为账户）理念，统一账户与交易建模",
      "多维度交易精细化定价，支持实时计息与动态费率",
      "三级额度分配与管控，灵活适配多层级组织架构",
      "全球化多租户架构支持，一套系统服务多法人实体",
    ],
    Visual: TerminalJSON,
  },
  {
    id: "anyeast",
    tag: "AI & BIG DATA DRIVEN",
    title: "AnyEAST 智能风控/营销决策核心",
    description: `全生命周期信贷风险管控与智能营销的"大脑"中心。`,
    bullets: [
      "毫秒级事中决策响应，单笔交易 30ms 内完成全链路判罚",
      "全流程全场景决策覆盖，贯穿贷前、贷中、贷后",
      "海量异构数据实时处理，流计算引擎支撑万级 TPS",
      "垂直应用图算法反欺诈，关系网络穿透识别团伙风险",
    ],
    Visual: RiskDashboard,
  },
  {
    id: "anytask",
    tag: "OPERATIONAL ORCHESTRATION",
    title: "AnyTASK 流程自动化管理核心",
    description: "敏捷高效的业务闭环中枢，实现从策略决策到落地执行的无缝连接。",
    bullets: [
      "可视化全链路任务编排，拖拽式构建复杂业务流程",
      "跨系统联动业务闭环，打通核心、风控、营销系统壁垒",
      "效能驱动的产能管理，实时追踪任务进度与 SLA 达成",
      "严格合规的执行追踪，全链路审计日志满足监管要求",
    ],
    Visual: WorkflowNodes,
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <section className="mx-auto max-w-7xl px-6 pt-28 pb-16 md:pt-44 md:pb-24 text-center">
        <ScrollReveal>
          <p className="text-cyan-400 text-xs font-medium tracking-widest uppercase mb-6">
            Products
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight mb-6 max-w-5xl mx-auto"
            style={{ textShadow: "0 0 80px rgba(6,182,212,0.12), 0 0 16px rgba(6,182,212,0.06)" }}
          >
            构建下一代云原生金融基础设施
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.14}>
          <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            网关、账务、决策、执行四大数字金融引擎，赋能业务敏捷创新与极致安全。
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <ChevronDown
            size={20}
            className="mx-auto text-cyan-400/40 animate-bounce"
            strokeWidth={1.5}
          />
        </ScrollReveal>
      </section>

      {/* ── Architecture Map ── */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <ScrollReveal>
          <ArchitectureMap />
        </ScrollReveal>
      </section>

      {/* ── Exhibits ── */}
      {exhibits.map((exhibit, i) => {
        const isReversed = i % 2 === 1;

        return (
          <section
            key={exhibit.id}
            id={exhibit.id}
            className="scroll-mt-24"
          >
            <div className="mx-auto max-w-7xl px-6 py-32">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  isReversed ? "" : ""
                }`}
              >
                {/* Text column */}
                <div className={`space-y-8 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                  <span className="inline-block text-cyan-400 text-2xs font-mono tracking-widest px-2 py-0.5 rounded-sm bg-cyan-400/5 border border-cyan-400/10">
                    {exhibit.tag}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                    {exhibit.title}
                  </h2>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    {exhibit.description}
                  </p>
                  <ul className="space-y-5">
                    {exhibit.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-text-secondary text-sm leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/50 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual column */}
                <div
                  className={`flex items-center justify-center w-full h-full min-h-[450px] ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="scale-110 lg:scale-125">
                    <exhibit.Visual />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Bottom spacer */}
      <div className="pb-16" />
    </main>
  );
}
