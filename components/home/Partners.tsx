const clients = [
  "01-01 ZGYH.png",
  "01-02 YCYH.png",
  "01-03 NYYH.png",
  "02-01 ZXYH.png",
  "02-02 PAYH.png",
  "02-03 GFYH.png",
  "02-04 PFYH.png",
  "02-05 GDYH.png",
  "02-06 ZSYH.png",
  "02-07 HXYH.png",
  "04-01 BJNS.png",
  "04-02 TJNS.png",
  "04-03 GDNX.png",
  "04-04 SHHR.png",
  "04-04 ZJNS.png",
  "05-01 XMGJ.png",
  "05-03 CDYH.png",
  "05-04 LNZX.png",
  "05-05 HTYH.png",
  "05-06 SZYH.png",
  "05-07 LYYH.png",
  "05-08 SNYH.png",
  "05-09 SZSYH.png",
  "05-10 QSYH.png",
  "05-11 LSYH.png",
  "05-12 TAYH.png",
  "06-01 XWYH.png",
  "06-02 TPYH.png",
  "07-01 WPXJ.png",
  "99-01 DCS.png",
  "99-02 SEA.png",
];

const mid = Math.ceil(clients.length / 2);
const ROW1 = clients.slice(0, mid);
const ROW2 = clients.slice(mid);

function LogoImg({ file }: { file: string }) {
  return (
    <div className="flex items-center justify-center shrink-0 px-6">
      <img
        src={`/images/clients/${file}`}
        alt={file.replace(/\.[^.]+$/, "")}
        className="h-8 w-auto max-w-[120px] object-contain grayscale opacity-50 contrast-125 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
      />
    </div>
  );
}

export default function Partners() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-24 md:py-32 border-t border-white/5">
      <div className="mb-12 text-center">
        <p className="text-cyan-500 text-xs font-medium tracking-widest uppercase mb-3">
          Our Clients
        </p>
        <h2 className="text-3xl font-bold text-text-primary">合作客户</h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee">
          {[...ROW1, ...ROW1].map((file, i) => (
            <LogoImg key={`r1-${file}-${i}`} file={file} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative w-full overflow-hidden mt-4">
        <div className="flex animate-marquee-reverse">
          {[...ROW2, ...ROW2].map((file, i) => (
            <LogoImg key={`r2-${file}-${i}`} file={file} />
          ))}
        </div>
      </div>
    </section>
  );
}
