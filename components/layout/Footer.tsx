import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const quickLinks = [
  { label: "首页", href: "/" },
  { label: "解决方案", href: "/solutions/issuing" },
  { label: "关于我们", href: "/about" },
];

const contactInfo = [
  {
    icon: MapPin,
    label: "北京市海淀区...",
  },
  {
    icon: Phone,
    label: "010-64789709",
    href: "tel:010-64789709",
  },
  {
    icon: Mail,
    label: "market@riveretech.com",
    href: "mailto:market@riveretech.com",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-bg">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src="/images/logo.png"
                alt="江融信科技"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs text-left">
              创造价值，共同成长，
              <br />
              持续服务，开放发展。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-text-primary text-sm font-semibold mb-4">
              快速链接
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-muted text-sm hover:text-cyan-500 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-primary text-sm font-semibold mb-4">
              联系方式
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start gap-2">
                  <item.icon
                    size={15}
                    className="text-text-muted shrink-0 mt-0.5"
                  />
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-text-muted text-sm hover:text-cyan-500 transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-text-muted text-sm">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-text-muted text-xs">
          <span>
            &copy; 2024 北京江融信科技有限公司
          </span>
          <span>京ICP备XXXXXXXX号</span>
        </div>
      </div>
    </footer>
  );
}
