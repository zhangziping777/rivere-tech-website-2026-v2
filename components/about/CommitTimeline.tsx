import { GitCommit, GitBranch, GitMerge, Star } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  body: string;
  icon: "commit" | "branch" | "merge" | "star";
}

const milestones: Milestone[] = [
  {
    year: "2026",
    title: "技术与服务全面升级",
    body: "AI 赋能信用卡全生命周期运营；稳定币支付方案启动研发；SaaS 化产品矩阵加速落地。支付领域拓展至 ACU Pay、Blue Pay 等新兴渠道。海外业务实现关键突破——Kbank 发卡项目正式启动。",
    icon: "star",
  },
  {
    year: "2025",
    title: "国际化布局加速",
    body: "设立香港子公司，深化亚太区域服务能力。与香港 KUN 达成战略签约。海外云运营成果显著，成功支持大莱（Diners Club）实现欧洲发卡业务。",
    icon: "branch",
  },
  {
    year: "2024",
    title: "生态合作全面展开",
    body: "正式设立生态发展部，与华为、Kyndryl、VISA、Mastercard 建立深度战略伙伴关系。核心系统通过华为云平台认证，实现国产化适配。",
    icon: "merge",
  },
  {
    year: "2023",
    title: "行业标杆 · 国际拓展",
    body: "国内签约中国邮政储蓄银行、上海银行等重量级客户，确立行业标准地位。海外签约泰国 KTC（Krungthai Card），迈入东南亚市场。通过 PCI-DSS 国际安全认证。",
    icon: "commit",
  },
  {
    year: "2022",
    title: "战略升级 · 头部突破",
    body: `中标中国银行、广发银行、浦发银行核心项目，实现国有大行与股份制银行全覆盖。海外业务突破冬海集团（Sea Group）。获评国家级专精特新"小巨人"企业。`,
    icon: "merge",
  },
  {
    year: "2021",
    title: "双引擎赋能 · 国际化启航",
    body: `扎根区域银行零售信贷市场，形成"核心系统 + 咨询服务"双引擎模式。与 VISA 达成合作，正式进军国际市场。`,
    icon: "branch",
  },
  {
    year: "2020",
    title: "生态元年 · 海外布局",
    body: "场景金融与信用卡云解决方案正式落地。成立新加坡公司（Rivere Tech Singapore），迈出国际化第一步。",
    icon: "commit",
  },
  {
    year: "2019",
    title: "产品里程碑 · 资本助力",
    body: "发布数字信用卡系统 AnyCard V4.0，实现全流程数字化发卡。完成 B 轮融资，加速产品研发与市场拓展。",
    icon: "star",
  },
  {
    year: "2018",
    title: "确立科技领先地位",
    body: "获得平安银行等 10 余家全国性银行认可，客户规模快速增长。完成 A 轮融资，团队与技术实力获资本市场验证。",
    icon: "commit",
  },
  {
    year: "2017",
    title: "首批标杆客户落地",
    body: "自主研发产品获得中信银行、广发银行、新网银行等首批标杆客户认可，进入商业化验证阶段。",
    icon: "branch",
  },
  {
    year: "2015",
    title: "技术奠基 · 首创 TXA",
    body: `首创"交易账户（TXA）"理念，实现账户与交易的统一建模。启动信用卡核心系统及实时决策平台研发，奠定技术根基。`,
    icon: "merge",
  },
  {
    year: "2014",
    title: "公司成立",
    body: "北京江融信科技有限公司正式注册成立。创始团队汇聚国内外顶级银行及一线金融科技企业资深专家，确立以信用卡及零售信贷领域为核心赛道。",
    icon: "star",
  },
];

const iconMap = {
  commit: GitCommit,
  branch: GitBranch,
  merge: GitMerge,
  star: Star,
};

function TimelineCard({
  children,
  side,
}: {
  children: React.ReactNode;
  side: "left" | "right";
}) {
  const hoverClass = side === "left" ? "md:hover:-translate-x-1.5" : "md:hover:translate-x-1.5";
  const alignClass =
    side === "left"
      ? "flex flex-col items-end text-right"
      : "flex flex-col items-start text-left";

  return (
    <div
      className={`bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 md:p-6 transition-transform duration-300 ${alignClass} ${hoverClass}`}
    >
      {children}
    </div>
  );
}

export default function CommitTimeline() {
  return (
    <div className="relative">
      {/* Center vertical line — desktop only */}
      <div className="hidden md:block absolute left-1/2 top-3 bottom-3 w-px -translate-x-px bg-brand-border" />

      {/* Mobile vertical line */}
      <div className="md:hidden absolute left-[13px] top-3 bottom-3 w-px bg-brand-border" />

      <div className="space-y-0">
        {milestones.map((m, i) => {
          const Icon = iconMap[m.icon];
          const isLeft = i % 2 === 0;
          const isLast = i === milestones.length - 1;
          const isFirst = i === 0;

          return (
            <div key={m.year}>
              {/* ────────── Mobile: left-aligned ────────── */}
              <div className="md:hidden relative pl-12 pb-8 last:pb-0">
                <div className="absolute left-0 top-1 flex items-center justify-center w-7 h-7 rounded-full bg-brand-bg border-2 border-accent-green/50 z-10">
                  <Icon size={13} className="text-accent-green" />
                </div>

                <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-accent-green/10 border border-accent-green/20 text-accent-green text-2xs font-mono tracking-wider mb-3">
                    {m.year}
                  </span>
                  <h3 className="text-base font-semibold text-text-primary mb-2">{m.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{m.body}</p>
                </div>

                {/* Mobile connector between nodes */}
                {!isLast && (
                  <div className="absolute left-[13px] top-[28px] w-px h-[calc(100%-20px)] bg-brand-border" />
                )}
              </div>

              {/* ────────── Desktop: centered alternating ────────── */}
              <div className="hidden md:grid md:grid-cols-[1fr_32px_1fr] md:items-start md:pb-14 last:md:pb-0">
                {/* LEFT COLUMN */}
                <div
                  className={
                    isLeft
                      ? "pr-4"
                      : "invisible pointer-events-none"
                  }
                >
                  {isLeft && (
                    <TimelineCard side="left">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-base font-semibold text-text-primary">
                          {m.title}
                        </h3>
                        <span className="inline-flex px-2 py-0.5 rounded-sm bg-accent-green/10 border border-accent-green/20 text-accent-green text-2xs font-mono tracking-wider shrink-0">
                          {m.year}
                        </span>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {m.body}
                      </p>
                    </TimelineCard>
                  )}
                </div>

                {/* CENTER NODE */}
                <div className="relative flex justify-center">
                  <div
                    className={`relative z-10 flex items-center justify-center w-7 h-7 rounded-full border-2 shrink-0 ${
                      isFirst
                        ? "bg-accent-green/15 border-accent-green shadow-[0_0_12px_rgba(0,229,153,0.3)]"
                        : "bg-brand-bg border-accent-green/50"
                    }`}
                  >
                    <Icon
                      size={13}
                      className={isFirst ? "text-accent-green" : "text-accent-green"}
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div
                  className={
                    !isLeft
                      ? "pl-4"
                      : "invisible pointer-events-none"
                  }
                >
                  {!isLeft && (
                    <TimelineCard side="right">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex px-2 py-0.5 rounded-sm bg-accent-green/10 border border-accent-green/20 text-accent-green text-2xs font-mono tracking-wider shrink-0">
                          {m.year}
                        </span>
                        <h3 className="text-base font-semibold text-text-primary">
                          {m.title}
                        </h3>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {m.body}
                      </p>
                    </TimelineCard>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
