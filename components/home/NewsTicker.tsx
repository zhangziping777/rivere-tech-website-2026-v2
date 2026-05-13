"use client";

const news = [
  `荣获2023年全球数字经济大会"数字经济产业创新成果奖"`,
  "入选亿欧全球金融科技创新企业 TOP50",
  `荣获广发银行"最佳C位大数据供应商"`,
  "成为中信银行战略合作伙伴和钻石供应商",
];

export default function NewsTicker() {
  return (
    <div className="relative w-full overflow-hidden border-y border-brand-border bg-brand-surface/50">
      <div className="flex animate-marquee whitespace-nowrap py-3">
        {[...news, ...news].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center mx-8 text-sm text-text-secondary"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green mr-3 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
