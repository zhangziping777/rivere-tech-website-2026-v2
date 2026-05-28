import CommitTimeline from "@/components/about/CommitTimeline";
import ValuesBento from "@/components/about/ValuesBento";
import CoordinateCard from "@/components/about/CoordinateCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <section className="mx-auto max-w-[1280px] px-6 pt-28 pb-20 md:pt-40 md:pb-32 text-center">
        <ScrollReveal>
          <p className="text-cyan-500 text-xs font-medium tracking-widest uppercase mb-6">
            About Us
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight tracking-tight mb-8"
            style={{ textShadow: "0 0 80px rgba(6,182,212,0.12), 0 0 16px rgba(6,182,212,0.06)" }}
          >
            创造价值，共同成长
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.14}>
          <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            北京江融信科技有限公司（Beijing Rivere Technology Company Limited）
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.18}>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mt-4 leading-relaxed">
            致力于打造商业银行信用卡、零售信贷领域最具价值合作伙伴
          </p>
        </ScrollReveal>
      </section>

      {/* ── Commit Timeline ── */}
      <section className="mx-auto max-w-[1280px] px-6 pb-24">
        <ScrollReveal className="mb-12">
          <p className="text-cyan-500 text-xs font-medium tracking-widest uppercase mb-3">
            Our Journey
          </p>
          <h2 className="text-3xl font-bold text-text-primary">发展历程</h2>
        </ScrollReveal>
        <CommitTimeline />
      </section>

      {/* ── Values Bento ── */}
      <section className="mx-auto max-w-[1280px] px-6 pb-24">
        <ScrollReveal className="mb-12">
          <p className="text-cyan-500 text-xs font-medium tracking-widest uppercase mb-3">
            Core Values
          </p>
          <h2 className="text-3xl font-bold text-text-primary">核心价值观</h2>
        </ScrollReveal>

        {/* Brand Manifesto */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4 text-center">
            <span className="px-4 py-1 text-xs font-mono text-cyan-500 bg-cyan-500/10 rounded-full border border-cyan-500/20 tracking-wider">
              数字信用卡 · 智慧零售信贷 · 场景生态科技与运营服务商
            </span>
            <p className="text-2xl lg:text-3xl font-bold text-white leading-tight">
              以领先的科技，助客户更卓越。
            </p>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              致力于成为商业银行信用卡、零售信贷、场景生态领域最具价值合作伙伴。
            </p>
          </div>
        </ScrollReveal>

        <ValuesBento />
      </section>

      {/* ── Coordinate Card ── */}
      <section id="contact" className="scroll-mt-24 mx-auto max-w-[1280px] px-6 pb-24">
        <ScrollReveal className="mb-12">
          <p className="text-cyan-500 text-xs font-medium tracking-widest uppercase mb-3">
            Contact Us
          </p>
          <h2 className="text-3xl font-bold text-text-primary">联系我们</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <CoordinateCard />
        </ScrollReveal>
      </section>
    </main>
  );
}
