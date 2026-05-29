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
  "99-03 KTC.png",
  "99-04 KUN.png",
];

const anchors = clients.filter((f) => {
  const pfx = f.split("-")[0];
  return pfx === "01" || pfx === "02" || pfx === "99";
});
const ecosystem = clients.filter((f) => {
  const pfx = f.split("-")[0];
  return pfx === "04" || pfx === "05" || pfx === "06" || pfx === "07";
});

export default function Partners() {
  return (
    <section className="relative z-[10] mx-auto max-w-7xl px-6 py-32 border-t border-white/5">
      {/* Deep space ambient radial gradient */}
      <div className="absolute inset-0 z-[0] pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse,rgba(59,130,246,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="mb-16 text-center">
        <p className="text-cyan-400 text-xs font-medium tracking-widest uppercase mb-3">
          Our Clients
        </p>
        <h2 className="text-3xl font-bold text-text-primary">合作客户</h2>
      </div>

      {/* ═══ Tier 1: The Anchors — 国有大行 · 股份制 · 全球化 ═══ */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center justify-items-center mb-10">
        {anchors.map((file) => (
          <div
            key={file}
            className="w-full h-24 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center p-4 hover:bg-white/[0.08] hover:border-cyan-400/30 hover:-translate-y-1 shadow-lg transition-all duration-500"
          >
            <img
              src={`/images/clients/${file}`}
              alt={file.replace(/\.[^.]+$/, "")}
              className="w-full h-full object-contain transition-all duration-500"
            />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent my-10" />

      {/* ═══ Tier 2: The Ecosystem — 农商 · 城商 · 互联网 · 非银 ═══ */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 items-center justify-items-center">
        {ecosystem.map((file) => (
          <div
            key={file}
            className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-center p-3 hover:bg-white/[0.05] transition-all duration-500"
          >
            <img
              src={`/images/clients/${file}`}
              alt={file.replace(/\.[^.]+$/, "")}
              className="w-full h-full object-contain transition-all duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
