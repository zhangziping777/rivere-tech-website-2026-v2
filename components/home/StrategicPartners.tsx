const partners = [
  { file: "01 HUAWEI.png", alt: "HUAWEI" },
  { file: "02 VISA.png", alt: "VISA" },
  { file: "03 CSLM.png", alt: "CSLM" },
];

export default function StrategicPartners() {
  return (
    <section className="relative z-[10] mx-auto max-w-7xl px-6 py-32 border-t border-white/5">
      {/* Deep space ambient radial gradient */}
      <div className="absolute inset-0 z-[0] pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse,rgba(6,182,212,0.04)_0%,transparent_70%)]" />
      </div>
      <div className="mb-16 text-center">
        <p className="text-cyan-500 text-xs font-medium tracking-widest uppercase mb-3">
          Strategic Partners
        </p>
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          合作伙伴
        </h2>
        <p className="text-text-muted text-sm max-w-xl mx-auto leading-relaxed">
          携手全球顶尖技术与业务伙伴，共建开放、协同的数字金融生态
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-16 lg:gap-24">
        {partners.map((p) => (
          <div
            key={p.file}
            className="flex items-center justify-center"
          >
            <img
              src={`/images/partners/${p.file}`}
              alt={p.alt}
              className="h-10 w-auto max-w-[160px] object-contain mix-blend-screen opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
