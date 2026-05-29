"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Cpu,
  Database,
  Shield,
  Globe,
  Workflow,
  Server,
  BarChart3,
  Layers,
  type LucideIcon,
} from "lucide-react";

type IconName = "Cpu" | "Database" | "Shield" | "Globe" | "Workflow" | "Server" | "BarChart3" | "Layers";
const iconMap: Record<IconName, LucideIcon> = { Cpu, Database, Shield, Globe, Workflow, Server, BarChart3, Layers };

interface NodeDef {
  label: string;
  sub: string;
  icon: IconName;
}

interface PosNode extends NodeDef {
  top: string;
  left: string;
}

interface ExtNode {
  label: string;
  sub: string;
  top: string;
  left: string;
}

/* ── Default 4-node layout offsets ── */
const defaultPositions = [
  { left: "10%", top: "22%" },
  { left: "62%", top: "22%" },
  { left: "10%", top: "70%" },
  { left: "62%", top: "70%" },
];

function toPosNodes(nodes: NodeDef[]): PosNode[] {
  return nodes.map((n, i) => ({ ...n, top: defaultPositions[i].top, left: defaultPositions[i].left }));
}

/* ═══════════════════════════════════════════════════════════
   SOLUTIONS DATA
   ═══════════════════════════════════════════════════════════ */
const solutions = [
  {
    id: "issuing",
    title: "发卡业务解决方案",
    desc: "数字化信用卡全生命周期管理",
    href: "/solutions/issuing",
    metrics: ["全生命周期", "模块化装配", "亿级账户"],
    nodes: [
      // Top — 5 nodes, visual center at 50% (left = card edge, center ≈ left+6%)
      { label: "申卡管理", sub: "Application", icon: "Server" as IconName, top: "20%", left: "18%" },
      { label: "授信管理", sub: "Credit Line", icon: "Shield" as IconName, top: "20%", left: "31%" },
      { label: "审批处理", sub: "Approval", icon: "Workflow" as IconName, top: "20%", left: "44%" },
      { label: "交易受理", sub: "Transaction", icon: "Globe" as IconName, top: "20%", left: "57%" },
      { label: "清算对账", sub: "Clearing", icon: "BarChart3" as IconName, top: "20%", left: "70%" },
      // Middle — 2 nodes, symmetric around center 50%
      { label: "运营操作", sub: "Operations", icon: "Cpu" as IconName, top: "42%", left: "15%" },
      { label: "开放API", sub: "Open API", icon: "Layers" as IconName, top: "42%", left: "74%" },
      // Bottom row 1 — 6 cards, 3.5% gaps, centered
      { label: "卡片管理", sub: "Card Mgmt", icon: "Database" as IconName, top: "74%", left: "7%" },
      { label: "账户管理", sub: "Account", icon: "Database" as IconName, top: "74%", left: "22%" },
      { label: "客户管理", sub: "Customer", icon: "Database" as IconName, top: "74%", left: "37%" },
      { label: "额度管理", sub: "Credit Limit", icon: "Database" as IconName, top: "74%", left: "52%" },
      { label: "授权处理", sub: "Auth", icon: "Database" as IconName, top: "74%", left: "67%" },
      { label: "账单管理", sub: "Billing", icon: "Database" as IconName, top: "74%", left: "82%" },
      // Bottom row 2 — 5 cards, same 3.5% gaps, centered
      { label: "分期管理", sub: "Installment", icon: "Layers" as IconName, top: "90%", left: "14%" },
      { label: "会计管理", sub: "Accounting", icon: "Layers" as IconName, top: "90%", left: "29%" },
      { label: "对账管理", sub: "Recon", icon: "Layers" as IconName, top: "90%", left: "44%" },
      { label: "报送管理", sub: "Reporting", icon: "Layers" as IconName, top: "90%", left: "59%" },
      { label: "催收管理", sub: "Collection", icon: "Layers" as IconName, top: "90%", left: "74%" },
    ],
    externalChannels: [
      { label: "客服渠道", sub: "CS Channel", top: "27%", left: "88%" },
      { label: "APP渠道", sub: "App Channel", top: "37%", left: "88%" },
      { label: "三方渠道", sub: "3rd Party", top: "47%", left: "88%" },
      { label: "关联系统", sub: "Linked Sys", top: "57%", left: "88%" },
    ],
    externalAnchor: { left: "74%", top: "42%" },
  },
  {
    id: "acquiring",
    title: "收单业务解决方案",
    desc: "全渠道、多场景聚合支付结算",
    href: "/solutions/acquiring",
    metrics: ["全渠道接入", "多场景聚合", "实时结算"],
    nodes: [
      // Top — 4 nodes, same layout as issuing
      { label: "商户注册", sub: "Merchant Reg", icon: "Globe" as IconName, top: "20%", left: "15%" },
      { label: "多机构管理", sub: "Multi-Institution", icon: "Server" as IconName, top: "20%", left: "34.5%" },
      { label: "交易受理", sub: "Transaction", icon: "Workflow" as IconName, top: "20%", left: "54%" },
      { label: "风险管理", sub: "Risk Mgmt", icon: "Shield" as IconName, top: "20%", left: "73.5%" },
      // Bottom row 1 — 6 cards
      { label: "商户管理", sub: "Merchant Mgmt", icon: "Database" as IconName, top: "74%", left: "7%" },
      { label: "赞助商管理", sub: "Sponsor Mgmt", icon: "Database" as IconName, top: "74%", left: "22%" },
      { label: "终端管理", sub: "Terminal Mgmt", icon: "Database" as IconName, top: "74%", left: "37%" },
      { label: "交易处理", sub: "Txn Processing", icon: "Database" as IconName, top: "74%", left: "52%" },
      { label: "账户管理", sub: "Account Mgmt", icon: "Database" as IconName, top: "74%", left: "67%" },
      { label: "账务处理", sub: "Accounting", icon: "Database" as IconName, top: "74%", left: "82%" },
      // Bottom row 2 — 5 cards
      { label: "分期管理", sub: "Installment", icon: "Layers" as IconName, top: "90%", left: "14%" },
      { label: "账单管理", sub: "Billing", icon: "Layers" as IconName, top: "90%", left: "29%" },
      { label: "清算处理", sub: "Clearing", icon: "Layers" as IconName, top: "90%", left: "44%" },
      { label: "对账管理", sub: "Reconciliation", icon: "Layers" as IconName, top: "90%", left: "59%" },
      { label: "会计管理", sub: "GL Accounting", icon: "Layers" as IconName, top: "90%", left: "74%" },
    ],
  },
  {
    id: "retail-credit",
    title: "零售信贷业务解决方案",
    desc: "线上化、自动化的零售资产引擎",
    href: "/solutions/retail-credit",
    metrics: ["秒级审批", "多产品适配", "智能定价"],
    nodes: toPosNodes([
      { label: "消费贷", sub: "Consumer Loan", icon: "Server" },
      { label: "现金贷", sub: "Cash Advance", icon: "Database" },
      { label: "联合贷", sub: "Syndicated", icon: "Workflow" },
      { label: "助贷通道", sub: "Lending API", icon: "Globe" },
    ]),
  },
  {
    id: "risk-control",
    title: "交易反欺诈解决方案",
    desc: "实时 AI 风险识别与资金保护",
    href: "/solutions/risk-control",
    metrics: ["毫秒级响应", "多维图谱", "亿级并发"],
    nodes: toPosNodes([
      { label: "反欺诈", sub: "Anti-Fraud", icon: "Shield" },
      { label: "信用评估", sub: "Credit Score", icon: "BarChart3" },
      { label: "贷后预警", sub: "Post-Loan", icon: "Server" },
      { label: "模型工厂", sub: "Model Factory", icon: "Cpu" },
    ]),
  },
  {
    id: "collection",
    title: "实时智能催收解决方案",
    desc: "数据驱动的资产回收与清收管理",
    href: "/solutions/collection",
    metrics: ["智能分案", "策略自调优", "全链路追踪"],
    nodes: toPosNodes([
      { label: "策略引擎", sub: "Strategy Engine", icon: "Cpu" },
      { label: "智能外呼", sub: "Auto Calling", icon: "Server" },
      { label: "案件管理", sub: "Case Mgmt", icon: "Database" },
      { label: "合规审计", sub: "Compliance", icon: "Shield" },
    ]),
  },
  {
    id: "marketing",
    title: "智能营销解决方案",
    desc: "全闭环的信托数字化营销增长",
    href: "/solutions/marketing",
    metrics: ["精准画像", "全闭环", "实时触达"],
    nodes: toPosNodes([
      { label: "用户画像", sub: "User Profile", icon: "Database" },
      { label: "策略编排", sub: "Campaign", icon: "Workflow" },
      { label: "实时触达", sub: "Real-Time", icon: "Globe" },
      { label: "效果分析", sub: "Analytics", icon: "BarChart3" },
    ]),
  },
  {
    id: "gateway",
    title: "支付网关解决方案",
    desc: "高并发、极稳健的支付枢纽",
    href: "/solutions/gateway",
    metrics: ["高并发", "极稳健", "多协议适配"],
    nodes: toPosNodes([
      { label: "协议转换", sub: "ISO 8583", icon: "Server" },
      { label: "智能路由", sub: "Smart Route", icon: "Workflow" },
      { label: "限流熔断", sub: "Rate Limit", icon: "Shield" },
      { label: "监控大盘", sub: "Dashboard", icon: "BarChart3" },
    ]),
  },
];

/* ═══════════════════════════════════════════════════════════
   TOPOLOGY CANVAS
   ═══════════════════════════════════════════════════════════ */

const ENGINE_CX = 50;
const ENGINE_CY = 50;

/* Card center offset: half card size as viewport % (w-[5rem]≈11.5%→6, h≈8%→4; w-40≈23%→11.5, h≈11%→5.5) */
function toCenter(left: string, top: string, compact: boolean) {
  return {
    x: parseFloat(left) + (compact ? 6 : 11.5),
    y: parseFloat(top)  + (compact ? 4 : 5.5),
  };
}

function TopologyCanvas({ nodes, externalNodes, externalAnchor }: { nodes: PosNode[]; externalNodes?: ExtNode[]; externalAnchor?: { left: string; top: string } }) {
  const compact = nodes.length > 4;
  const centers = nodes.map((n) => toCenter(n.left, n.top, compact));
  const extCenters = externalNodes?.map((n) => toCenter(n.left, n.top, true)) ?? [];
  const anchorCenter = externalAnchor ? toCenter(externalAnchor.left, externalAnchor.top, true) : null;

  return (
    <div className="absolute inset-0 z-[1]">
      {/* ── SVG Bezier Curves ── */}
      <svg
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="cyanGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Main node → Engine */}
        {centers.map((s, i) => (
          <g key={i}>
            <path
              d={`M${s.x},${s.y} C${(ENGINE_CX + s.x) / 2},${s.y} ${(ENGINE_CX + s.x) / 2},${ENGINE_CY} ${ENGINE_CX},${ENGINE_CY}`}
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="0.3"
              fill="none"
            />
            <path
              d={`M${s.x},${s.y} C${(ENGINE_CX + s.x) / 2},${s.y} ${(ENGINE_CX + s.x) / 2},${ENGINE_CY} ${ENGINE_CX},${ENGINE_CY}`}
              stroke="url(#cyanGrad)"
              strokeWidth="0.4"
              strokeDasharray="2 8"
              fill="none"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="20" to="0"
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </path>
            <circle r="0.45" fill="#22D3EE" opacity="0.95">
              <animateMotion
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
                path={`M${s.x},${s.y} C${(ENGINE_CX + s.x) / 2},${s.y} ${(ENGINE_CX + s.x) / 2},${ENGINE_CY} ${ENGINE_CX},${ENGINE_CY}`}
              />
            </circle>
          </g>
        ))}

        {/* External channel → Anchor (开放API) */}
        {anchorCenter && extCenters.map((s, i) => (
          <g key={`ext-${i}`}>
            <path
              d={`M${s.x},${s.y} C${(anchorCenter.x + s.x) / 2},${s.y} ${(anchorCenter.x + s.x) / 2},${anchorCenter.y} ${anchorCenter.x},${anchorCenter.y}`}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="0.3"
              strokeDasharray="2 6"
              fill="none"
            />
            <circle r="0.4" fill="rgba(255,255,255,0.7)">
              <animateMotion
                dur={`${2.5 + i * 0.25}s`}
                repeatCount="indefinite"
                path={`M${s.x},${s.y} C${(anchorCenter.x + s.x) / 2},${s.y} ${(anchorCenter.x + s.x) / 2},${anchorCenter.y} ${anchorCenter.x},${anchorCenter.y}`}
              />
            </circle>
          </g>
        ))}
      </svg>

      {/* ── Engine rear glow orb ── */}
      <div
        className="absolute z-[-1] rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none"
        style={{
          left: "50%", top: "50%", transform: "translate(-50%, -50%)",
          width: "14rem", height: "14rem",
        }}
      />

      {/* ── Central Engine Node ── */}
      <div
        className="absolute z-20 flex items-center gap-3 px-5 py-3.5 rounded-xl border-cyan-500/50 shadow-[0_0_24px_rgba(6,182,212,0.25)] bg-slate-800/50 backdrop-blur-md border"
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      >
        <div className="w-8 h-8 rounded-lg bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center shrink-0">
          <Cpu size={16} className="text-cyan-400" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-white text-sm font-bold tracking-wide whitespace-nowrap">核心引擎</span>
          <span className="text-cyan-400/60 text-[10px] font-mono tracking-wider whitespace-nowrap">TXA ENGINE</span>
        </div>
      </div>

      {/* ── Satellite Nodes ── */}
      {nodes.map((n, i) => {
        const Icon = iconMap[n.icon];
        return compact ? (
          <div
            key={i}
            className="absolute z-10 bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-lg p-2 flex items-center gap-2 shadow-lg transition-all duration-500 hover:border-cyan-400/30 hover:bg-slate-800/60"
            style={{ left: n.left, top: n.top }}
          >
            <Icon size={11} className="text-cyan-400/60 shrink-0" />
            <div className="flex flex-col min-w-0 leading-tight">
              <span className="text-white text-[10px] font-semibold tracking-wide whitespace-nowrap">{n.label}</span>
              <span className="text-cyan-400/45 text-[7px] font-mono tracking-wider whitespace-nowrap uppercase">{n.sub}</span>
            </div>
          </div>
        ) : (
          <div
            key={i}
            className="absolute z-10 bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-xl p-3 flex items-center gap-3 shadow-lg w-40 transition-all duration-500 hover:border-cyan-400/30 hover:bg-slate-800/60"
            style={{ left: n.left, top: n.top }}
          >
            <div className="w-7 h-7 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
              <Icon size={13} className="text-cyan-400/70" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-white text-xs font-semibold tracking-wide whitespace-nowrap">{n.label}</span>
              <span className="text-cyan-400/45 text-[9px] font-mono tracking-wider whitespace-nowrap uppercase">{n.sub}</span>
            </div>
          </div>
        );
      })}

      {/* ── External Channel Nodes ── */}
      {externalNodes && externalNodes.length > 0 && (
        <>
          {externalNodes.map((n, i) => (
            <div
              key={`ext-${i}`}
              className="absolute z-10 bg-slate-800/30 backdrop-blur-sm border border-dashed border-white/10 rounded-md px-2 py-1.5 flex items-center shadow-lg w-20 transition-all duration-300 hover:border-white/25"
              style={{ left: n.left, top: n.top }}
            >
              <div className="flex flex-col min-w-0 leading-tight w-full text-center">
                <span className="text-slate-300 text-[10px] font-semibold tracking-wide whitespace-nowrap">{n.label}</span>
                <span className="text-slate-400 text-[7px] font-mono tracking-wider whitespace-nowrap uppercase">{n.sub}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   METRICS BAR
   ═══════════════════════════════════════════════════════════ */
function MetricsBar({ metrics, href }: { metrics: string[]; href: string }) {
  return (
    <div className="absolute bottom-0 inset-x-0 border-t border-white/5 bg-white/[0.01] backdrop-blur-md flex items-center justify-between px-8 py-5 z-20">
      <div className="flex gap-6">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="px-4 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-cyan-400 text-xs font-mono tracking-wider whitespace-nowrap"
          >
            {m}
          </div>
        ))}
      </div>
      <Link
        href={href}
        className="text-cyan-400 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all flex items-center gap-2 text-sm font-semibold tracking-wider shrink-0"
      >
        了解详情 <span className="text-base leading-none">&rarr;</span>
      </Link>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function Solutions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = solutions[activeIndex];

  return (
    <section data-snap-section className="relative z-[10] mx-auto max-w-7xl px-6 py-32 border-t border-white/5">
      <div className="absolute inset-0 z-[0] pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse,rgba(6,182,212,0.04)_0%,transparent_70%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 text-left"
      >
        <p className="text-cyan-400 text-[clamp(10px,1.2vw,12px)] font-bold tracking-widest uppercase mb-3">
          Industry Solutions
        </p>
        <h2 className="text-[clamp(22px,3vw,30px)] md:text-[clamp(28px,3.5vw,36px)] font-bold text-text-primary">
          端到端的系统解决方案
        </h2>
      </motion.div>

      <div className="w-full max-w-7xl mx-auto flex gap-5 items-stretch">

        {/* ═══ LEFT ═══ */}
        <div className="w-[300px] shrink-0 flex flex-col">
          {solutions.map((s, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={s.id}
                onClick={() => setActiveIndex(i)}
                className={`text-left border-l-2 py-5 px-6 cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "border-cyan-500 bg-gradient-to-r from-cyan-500/10 to-transparent text-white"
                    : "border-transparent text-slate-400 hover:bg-white/[0.02] hover:text-slate-200"
                }`}
              >
                <span className="text-xs font-mono text-cyan-400/60 tracking-widest mr-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`text-lg font-bold tracking-wide ${isActive ? "text-white" : "text-current"}`}>
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* ═══ RIGHT ═══ */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="h-full w-full bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.05)]">

            <div className="absolute top-0 left-0 w-48 h-48 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-cyan-500/8 blur-[100px] rounded-full pointer-events-none" />

            <div
              className="absolute inset-0 z-[0] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(34,211,238,0.10) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0 bottom-[28%]"
              >
                <TopologyCanvas nodes={active.nodes} externalNodes={(active as any).externalChannels} externalAnchor={(active as any).externalAnchor} />

                <div className="absolute top-4 left-4 z-10 max-w-[60%]">
                  <span className="text-white/85 text-base md:text-lg leading-relaxed">
                    {active.desc}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`metrics-${active.id}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <MetricsBar metrics={active.metrics} href={active.href} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
