const partners = [
  { file: "01 HUAWEI.png", alt: "HUAWEI" },
  { file: "02 VISA.png", alt: "VISA" },
  { file: "03 CSLM.png", alt: "CSLM" },
];

export default function StrategicPartners() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-24 md:py-32 border-t border-white/5 bg-[#0A1018]/60">
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
              className="h-10 w-auto max-w-[160px] object-contain grayscale opacity-50 contrast-125 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
