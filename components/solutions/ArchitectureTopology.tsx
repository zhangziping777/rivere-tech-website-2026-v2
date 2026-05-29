import { Shield, Cpu, Layers, ArrowDown } from "lucide-react";
import type { ArchitectureLayer } from "@/lib/data";

const icons = [Shield, Cpu, Layers];

export default function ArchitectureTopology({
  layers,
}: {
  layers: ArchitectureLayer[];
}) {
  return (
    <div className="rounded-sm !bg-white/5 !backdrop-blur-md !border !border-white/10 overflow-hidden">
      {/* terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 !bg-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/60" />
        <span className="ml-3 text-2xs text-text-muted font-mono tracking-wider">
          arch-topology — riveretech.yaml
        </span>
      </div>

      {/* layers */}
      <div className="p-5 md:p-8 space-y-0">
        {layers.map((layer, i) => {
          const Icon = icons[i % icons.length];
          const isLast = i === layers.length - 1;

          return (
            <div key={layer.name}>
              <div className="group relative rounded-sm !bg-white/5 !border !border-white/[0.06] hover:!border-cyan-400/30 transition-colors duration-300">
                {/* layer header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-brand-border/40">
                  <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-cyan-400/10">
                    <Icon size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-text-primary">
                      {layer.name}
                    </span>
                    <span className="ml-2 text-2xs text-cyan-400/60 font-mono uppercase tracking-wider">
                      {layer.tag}
                    </span>
                  </div>
                </div>

                {/* layer items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 px-4 py-3">
                  {layer.items.map((item, j) => (
                    <div
                      key={j}
                      className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed"
                    >
                      <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-cyan-400/40" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* arrow between layers */}
              {!isLast && (
                <div className="flex justify-center py-3">
                  <ArrowDown size={20} className="text-brand-border-light" strokeWidth={1.5} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
