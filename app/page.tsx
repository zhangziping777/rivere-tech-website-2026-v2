import HeroOrbitGraphic from "@/components/home/HeroOrbitGraphic";
import HeroCanvasBackground from "@/components/home/HeroCanvasBackground";
import HeroTicker from "@/components/home/HeroTicker";
import BentoGrid from "@/components/home/BentoGrid";
import CoreProducts from "@/components/home/CoreProducts";
import Solutions from "@/components/home/Solutions";
import Advantages from "@/components/home/Advantages";
import Partners from "@/components/home/Partners";
import StrategicPartners from "@/components/home/StrategicPartners";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ── Hero Section: Neural Constellation ── */}
      <section className="relative w-full min-h-screen overflow-hidden bg-transparent">
        {/* Layer 0 — Canvas wave background */}
        <HeroCanvasBackground />

        {/* Layer 1 — Hero graphic on the right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[48%] max-w-[680px] z-10 pointer-events-auto">
          <HeroOrbitGraphic />
        </div>

        {/* Layer 2 — Gradient mask (protects left text readability) */}
        <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-black/90 via-black/75 to-transparent z-10 pointer-events-none" />

        {/* Layer 3 — Content overlay */}
        <div className="absolute left-[8%] top-1/2 -translate-y-1/2 z-10 pointer-events-auto max-w-[42%]">
          <ScrollReveal>
            <p className="text-accent-green text-[clamp(10px,1.2vw,12px)] font-medium tracking-widest uppercase mb-4">
              Riveretech Technology
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h1 className="text-[clamp(28px,4vw,48px)] md:text-[clamp(36px,4.5vw,60px)] font-bold text-text-primary leading-tight tracking-tight">
              创造价值，共同成长
              <br />
              <span className="text-gradient-accent">持续服务，开放发展</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.14}>
            <p className="mt-6 text-[clamp(14px,1.6vw,18px)] text-text-secondary max-w-lg leading-relaxed">
              致力于打造商业银行信用卡、零售信贷领域最具价值合作伙伴
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.18}>
            <div className="flex gap-4 mt-8">
              <a
                href="/products"
                className="inline-flex items-center px-6 py-3 rounded-sm bg-[#00E599] text-black text-[clamp(12px,1.3vw,14px)] font-bold hover:bg-[#00E599]/90 transition-colors duration-200"
              >
                探索产品
              </a>
              <a
                href="/about#contact"
                className="inline-flex items-center px-6 py-3 rounded-sm border border-white/20 text-white text-[clamp(12px,1.3vw,14px)] font-medium hover:bg-white/5 transition-colors duration-200"
              >
                联系我们
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Hero Ticker Bar ── */}
      <HeroTicker />

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
