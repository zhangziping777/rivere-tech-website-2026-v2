const partners = [
  { file: "01 HUAWEI.png", alt: "HUAWEI" },
  { file: "02 VISA.png", alt: "VISA" },
  { file: "03 CSLM.png", alt: "CSLM" },
];

export default function StrategicPartners() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-20 border-t border-brand-border">
      <div className="mb-16 text-center">
        <p className="text-accent-green text-xs font-medium tracking-widest uppercase mb-3">
          Strategic Partners
        </p>
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          合作伙伴
        </h2>
        <p className="text-text-muted text-sm max-w-xl mx-auto leading-relaxed">
          携手全球顶尖技术与业务伙伴，共建开放、协同的数字金融生态
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24">
        {partners.map((p) => (
          <div
            key={p.file}
            className="flex items-center justify-center h-24 w-48"
          >
            <img
              src={`/images/partners/${p.file}`}
              alt={p.alt}
              className="h-14 w-auto max-w-[160px] object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
