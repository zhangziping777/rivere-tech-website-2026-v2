import { Hexagon } from "lucide-react";

interface ConceptHighlightProps {
  title: string;
  points: string[];
}

export default function ConceptHighlight({ title, points }: ConceptHighlightProps) {
  return (
    <div className="relative rounded-sm !bg-white/5 !backdrop-blur-md !border !border-white/10 p-6 md:p-8">
      {/* corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/3 rounded-bl-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* badge header */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-cyan-400/10 border border-cyan-400/20 mb-5">
          <Hexagon size={14} className="text-cyan-400" />
          <span className="text-xs font-semibold text-cyan-400 tracking-widest uppercase">
            核心概念
          </span>
        </div>

        <h3 className="text-xl font-bold text-text-primary mb-4">{title}</h3>

        <ul className="space-y-3">
          {points.map((point, i) => (
            <li key={i} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
              <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
