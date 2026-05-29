"use client";

import { useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
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
      { label: "AnyTXN 信用卡及零售信贷核心", href: "/products#anytxn" },
      { label: "AnyEAST 智能风控/营销决策核心", href: "/products#anyeast" },
      { label: "AnyTASK 流程自动化管理核心", href: "/products#anytask" },
      { label: "AnyGateway 融合支付网关核心", href: "/products#anygateway" },
    ],
  },
  {
    label: "解决方案",
    children: [
      { label: "发卡业务解决方案", href: "/solutions/issuing" },
      { label: "收单业务解决方案", href: "/solutions/acquiring" },
      { label: "零售信贷业务解决方案", href: "/solutions/retail-credit" },
      { label: "交易反欺诈解决方案", href: "/solutions/risk-control" },
      { label: "实时智能催收解决方案", href: "/solutions/collection" },
      { label: "智能营销解决方案", href: "/solutions/marketing" },
      { label: "Gateway 网关解决方案", href: "/solutions/gateway" },
    ],
  },
  { label: "业务合作运营", href: "/business-operations" },
  { label: "关于我们", href: "/about" },
  { label: "联系我们", href: "/about#contact" },
];

function Dropdown({ items, pathname }: { items: SubItem[]; pathname: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="dropdown-panel"
    >
      {items.map((item) => {
        const itemPath = item.href.split("#")[0];
        const active = pathname.startsWith(itemPath);
        return (
        <Link
          key={item.label}
          href={item.href}
          className={`dropdown-item block ${active ? "!text-cyan-400 !bg-white/5" : ""}`}
        >
          {item.label}
        </Link>
      )})}
    </motion.div>
  );
}

export default function Header() {
  const pathname = usePathname();
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

  function isActive(item: NavItem): boolean {
    if (item.href && !item.children) {
      if (item.href === "/") return pathname === "/";
      return pathname.startsWith(item.href.split("#")[0]);
    }
    if (item.children) {
      return item.children.some((c) => pathname.startsWith(c.href.split("#")[0]));
    }
    return false;
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-brand-bg/80 backdrop-blur-md border-subtle-b">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-16">
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
          {navItems.map((item) => {
            const active = isActive(item);
            return (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && handleMouseEnter(item.label)}
              onMouseLeave={() => item.children && handleMouseLeave()}
            >
              {item.href && !item.children ? (
                <Link
                  href={item.href}
                  className={`relative px-3 py-2 block text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "text-cyan-400"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                  )}
                </Link>
              ) : (
                <button
                  className={`relative px-3 py-2 flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "text-cyan-400"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                  onClick={() =>
                    setOpenMenu(openMenu === item.label ? null : item.label)
                  }
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      active ? "text-cyan-400" : ""
                    } ${openMenu === item.label ? "rotate-180" : ""}`}
                  />
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                  )}
                </button>
              )}

              <AnimatePresence>
                {item.children && openMenu === item.label && (
                  <Dropdown items={item.children} pathname={pathname} />
                )}
              </AnimatePresence>
            </div>
          )})}
        </nav>

        {/* CTA */}
        <Link
          href="/about#contact"
          className="hidden md:inline-flex items-center px-4 py-2 rounded-sm border border-cyan-400/50 text-cyan-400 text-sm font-medium hover:bg-cyan-400/10 transition-colors duration-200"
        >
          立即咨询
        </Link>
      </div>
    </header>
  );
}
