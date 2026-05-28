import { MapPin, Mail, Phone } from "lucide-react";

export default function CoordinateCard() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Horizontal layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* ── Address ── */}
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-500/5 shrink-0 mt-0.5">
            <MapPin size={16} className="text-cyan-500/70" />
          </div>
          <div>
            <p className="text-text-muted text-2xs font-mono tracking-widest uppercase mb-2">
              Coordinates
            </p>
            <p className="text-text-primary text-sm font-semibold leading-relaxed">
              中国 · 北京市海淀区
            </p>
            <p className="text-text-muted text-xs leading-relaxed mt-0.5">
              北京江融信科技有限公司
            </p>
          </div>
        </div>

        {/* ── Contact ── */}
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-500/5 shrink-0 mt-0.5">
            <Mail size={16} className="text-cyan-500/70" />
          </div>
          <div>
            <p className="text-text-muted text-2xs font-mono tracking-widest uppercase mb-2">
              Contact
            </p>
            <a
              href="mailto:market@riveretech.com"
              className="text-cyan-500 text-sm font-semibold hover:underline underline-offset-4 transition-all"
            >
              market@riveretech.com
            </a>
            <div className="flex items-center gap-1.5 mt-1 text-text-muted text-xs">
              <Phone size={11} className="shrink-0" />
              <span>010-64789709</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom rule */}
      <div className="mt-16 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />
    </div>
  );
}
