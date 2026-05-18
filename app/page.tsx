import HeroWorkflowNode from "@/components/home/HeroWorkflowNode";
import NewsTicker from "@/components/home/NewsTicker";
import BentoGrid from "@/components/home/BentoGrid";
import CoreProducts from "@/components/home/CoreProducts";
import Solutions from "@/components/home/Solutions";
import Advantages from "@/components/home/Advantages";
import Partners from "@/components/home/Partners";
import StrategicPartners from "@/components/home/StrategicPartners";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <main className="min-h-screen pt-24">
      {/* ── Hero Section ── */}
      <section className="mx-auto max-w-[1280px] px-6 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <ScrollReveal>
              <p className="text-accent-green text-xs font-medium tracking-widest uppercase mb-4">
                Riveretech Technology
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight">
                创造价值，共同成长
                <br />
                <span className="text-gradient-accent">持续服务，开放发展</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.14}>
              <p className="mt-6 text-lg text-text-secondary max-w-lg leading-relaxed">
                致力于打造商业银行信用卡、零售信贷领域最具价值合作伙伴
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.18}>
              <div className="flex gap-4 mt-8">
                <a
                  href="/products"
                  className="inline-flex items-center px-6 py-3 rounded-sm bg-accent-green text-brand-bg text-sm font-semibold hover:bg-accent-green/90 transition-colors duration-200"
                >
                  探索产品
                </a>
                <a
                  href="/about#contact"
                  className="inline-flex items-center px-6 py-3 rounded-sm border border-white/10 text-text-muted text-sm font-medium hover:border-white/30 hover:text-white transition-colors duration-200"
                >
                  联系我们
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Animated topology */}
          <ScrollReveal delay={0.1}>
            <div className="flex justify-center lg:justify-end w-full">
              <HeroWorkflowNode />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── News Ticker ── */}
      <NewsTicker />

      {/* ── Three Major Businesses ── */}
      <BentoGrid />

      {/* ── Core Products ── */}
      <CoreProducts />

      {/* ── Industry Solutions ── */}
      <Solutions />

      {/* ── Why Choose Us ── */}
      <Advantages />

      {/* ── Partners ── */}
      <Partners />

      {/* ── Strategic Partners ── */}
      <StrategicPartners />
    </main>
  );
}
