"use client";

const items = [
  "API 开放生态",
  "云原生微服务架构",
  "千万级 TPS 实时交易",
  "七大端到端金融科技方案",
];

export default function HeroTicker() {
  return (
    <div className="w-full bg-white/[0.02] border-t border-b border-white/5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {[...items, ...items, ...items].map((text, i) => (
          <div key={i} className="inline-flex items-center gap-3 mx-8 shrink-0">
            <span className="w-1 h-1 rounded-full bg-cyan-500/30" />
            <span className="text-text-muted text-[clamp(10px,1vw,11px)] tracking-wide">
              {text}
            </span>
            <span className="text-cyan-500/20 text-xs">&rarr;</span>
          </div>
        ))}
      </div>
    </div>
  );
}
