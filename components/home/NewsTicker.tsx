"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const news = [
  {
    date: "2026.05.20",
    headline: "江融信科技与某国有大行达成信用卡核心系统升级战略合作",
    href: "/about",
  },
  {
    date: "2026.05.15",
    headline: "AnyTXN v4.2 版本正式发布：全新交易引擎性能提升 40%",
    href: "/products#anytxn",
  },
  {
    date: "2026.05.08",
    headline: "江融信荣获 2026 年度金融科技优秀解决方案奖",
    href: "/solutions/issuing",
  },
];

export default function NewsTicker() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % news.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(advance, 4500);
    return () => clearInterval(timer);
  }, [paused, advance]);

  const item = news[index];

  return (
    <div
      className="w-full bg-white/[0.02] backdrop-blur-md border-y border-white/5 py-3 relative z-20 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto flex items-center px-6 md:px-10">
        {/* Pulse dot + Badge */}
        <span className="flex items-center gap-2 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-black text-cyan-400 tracking-widest uppercase">
            最新动态
          </span>
        </span>

        {/* Date */}
        <span className="text-sm font-mono text-slate-500 mx-4 shrink-0 select-none">
          [{item.date}]
        </span>

        {/* Animated headline */}
        <Link
          href={item.href}
          className="flex-1 min-w-0 flex items-center group/link overflow-hidden"
        >
          <div className="relative flex-1 h-5 overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={index}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 text-sm text-slate-300 group-hover/link:text-white truncate"
              >
                {item.headline}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Arrow — visible on hover */}
          <span className="ml-2 text-cyan-400 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300 text-sm shrink-0">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
