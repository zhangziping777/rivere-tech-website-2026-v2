"use client";

import { useEffect, useRef, useState } from "react";
import type { ContentSection } from "@/lib/data";

interface ScrollSpyLayoutProps {
  sections: ContentSection[];
}

/* ── Lightweight markdown → HTML ── */
function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-text-primary font-semibold">$1</strong>')
    .split("\n\n")
    .map((block) => `<p>${block.replace(/\n/g, "<br/>")}</p>`)
    .join("");
}

export default function ScrollSpyLayout({ sections }: ScrollSpyLayoutProps) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sectionRefs.current.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function handleClick(id: string) {
    const el = sectionRefs.current.get(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
      {/* Left — sticky nav */}
      <aside className="hidden lg:block">
        <nav className="sticky top-24 space-y-1 border-l-2 border-brand-border">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => handleClick(s.id)}
              className={`block w-full text-left py-2 pl-4 text-sm transition-colors duration-200 border-l-2 -ml-0.5 ${
                active === s.id
                  ? "text-cyan-400 border-cyan-400"
                  : "text-text-muted border-transparent hover:text-text-secondary hover:border-brand-border-light"
              }`}
            >
              {s.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Right — content */}
      <div className="space-y-16">
        {sections.map((s) => (
          <section
            key={s.id}
            id={s.id}
            ref={(el) => {
              if (el) sectionRefs.current.set(s.id, el);
            }}
          >
            <h2 className="text-2xl font-bold text-text-primary mb-4">{s.title}</h2>
            <div
              className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-text-secondary prose-p:text-sm prose-strong:text-text-primary prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(s.body) }}
            />
          </section>
        ))}
      </div>
    </div>
  );
}
