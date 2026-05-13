"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface SubItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: SubItem[];
}

const navItems: NavItem[] = [
  { label: "首页", href: "/" },
  {
    label: "核心产品",
    children: [
      { label: "AnyTXN (信贷核心)", href: "/products/anytxn" },
      { label: "AnyEAST (实时决策)", href: "/products/anyeast" },
      { label: "AnyTASK (流程自动化)", href: "/products/anytask" },
      { label: "AnyGateway (统一网关平台)", href: "/products/anygateway" },
    ],
  },
  {
    label: "解决方案",
    children: [
      { label: "收单业务解决方案", href: "/solutions/acquirer" },
      { label: "发卡业务解决方案", href: "/solutions/issuer" },
      { label: "零售信贷业务解决方案", href: "/solutions/retail-credit" },
      { label: "实时智能催收解决方案", href: "/solutions/collection" },
      { label: "反欺诈业务解决方案", href: "/solutions/anti-fraud" },
      { label: "智能营销解决方案", href: "/solutions/marketing" },
      { label: "Gateway 网关解决方案", href: "/solutions/gateway" },
    ],
  },
  {
    label: "公司介绍",
    children: [
      { label: "公司概况", href: "/company/about" },
      { label: "发展历史", href: "/company/history" },
      { label: "核心能力", href: "/company/capabilities" },
      { label: "公司资质", href: "/company/qualifications" },
      { label: "合作伙伴", href: "/company/partners" },
      { label: "人才发展", href: "/company/careers" },
    ],
  },
  { label: "联系我们", href: "/contact" },
];

function Dropdown({ items }: { items: SubItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="dropdown-panel"
    >
      {items.map((item) => (
        <Link key={item.label} href={item.href} className="dropdown-item block">
          {item.label}
        </Link>
      ))}
    </motion.div>
  );
}

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback((label: string) => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setOpenMenu(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => {
      setOpenMenu(null);
    }, 150);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-brand-bg/80 backdrop-blur-xl border-subtle-b">
      <div className="mx-auto max-w-[1280px] flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <img
            src="/images/logo.png"
            alt="江融信科技"
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && handleMouseEnter(item.label)}
              onMouseLeave={() => item.children && handleMouseLeave()}
            >
              {item.href && !item.children ? (
                <Link href={item.href} className="nav-link px-3 py-2 block">
                  {item.label}
                </Link>
              ) : (
                <button
                  className="nav-link px-3 py-2 flex items-center gap-1"
                  onClick={() =>
                    setOpenMenu(openMenu === item.label ? null : item.label)
                  }
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openMenu === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}

              <AnimatePresence>
                {item.children && openMenu === item.label && (
                  <Dropdown items={item.children} />
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center px-4 py-2 rounded-sm border border-accent-green/50 text-accent-green text-sm font-medium hover:bg-accent-green/10 transition-colors duration-200"
        >
          立即咨询
        </Link>
      </div>
    </header>
  );
}
