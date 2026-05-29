import HeroOrbitGraphic from "@/components/home/HeroOrbitGraphic";
import HeroCanvasBackground from "@/components/home/HeroCanvasBackground";
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
    <main className="min-h-[800px]">
      {/* ── Hero Section ── */}
      <section data-snap-section className="relative z-[10] w-full h-[640px] overflow-hidden bg-transparent">
        <HeroCanvasBackground />

        {/* Bottom fade: blend canvas into global #030712 */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#030712] pointer-events-none z-[5]" />

        {/* Content: centered container with flex layout */}
        <div className="relative z-10 max-w-7xl mx-auto w-full h-[640px] px-6 md:px-10 flex items-center">
          {/* Left: Hero text — 1/2 */}
          <div className="w-1/2">
            <ScrollReveal>
              <p className="text-cyan-400 text-[clamp(10px,1.2vw,12px)] font-medium tracking-widest uppercase mb-4">
                Riveretech Technology
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h1 className="flex flex-col gap-3 text-[clamp(24px,3.5vw,52px)] font-bold text-text-primary leading-tight tracking-tight">
                <span className="whitespace-nowrap">创造价值，共同成长</span>
                <span className="text-gradient-accent whitespace-nowrap">持续服务，开放发展</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.14}>
              <p className="mt-6 text-[clamp(14px,1.6vw,18px)] text-slate-200 max-w-lg leading-relaxed tracking-wide">
                致力于打造商业银行信用卡、零售信贷领域最具价值合作伙伴
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.18}>
              <div className="flex gap-4 mt-8">
                <a
                  href="/products"
                  className="inline-flex items-center px-6 py-3 rounded-sm bg-cyan-400/10 border border-cyan-400/40 text-cyan-400 text-[clamp(12px,1.3vw,14px)] font-bold hover:bg-cyan-400/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300"
                >
                  探索产品
                </a>
                <a
                  href="/about#contact"
                  className="inline-flex items-center px-6 py-3 rounded-sm border border-white/20 text-white text-[clamp(12px,1.3vw,14px)] font-medium hover:border-cyan-400/40 hover:bg-white/5 transition-all duration-300"
                >
                  联系我们
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Hero graphic — 1/2 */}
          <div className="w-1/2 flex justify-center">
            <div className="w-full max-w-[500px]">
              <HeroOrbitGraphic />
            </div>
          </div>
        </div>
      </section>

      {/* ── News Ticker Bar ── */}
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
