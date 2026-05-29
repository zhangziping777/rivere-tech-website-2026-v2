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
        <p className="text-cyan-400 text-xs font-medium tracking-widest uppercase mb-3">
          Strategic Partners
        </p>
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          合作伙伴
        </h2>
        <p className="text-text-muted text-sm max-w-xl mx-auto leading-relaxed">
          携手全球顶尖技术与业务伙伴，共建开放、协同的数字金融生态
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 items-center justify-items-center max-w-2xl mx-auto">
        {partners.map((p) => (
          <div
            key={p.file}
            className="w-full h-24 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center p-4 hover:bg-white/[0.08] hover:border-cyan-400/30 hover:-translate-y-1 shadow-lg transition-all duration-500"
          >
            <img
              src={`/images/partners/${p.file}`}
              alt={p.alt}
              className="w-full h-full object-contain transition-all duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
