import type { ComparisonRow } from "@/lib/data";

interface ComparisonTableProps {
  headers: string[];
  rows: ComparisonRow[];
}

export default function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-sm !bg-white/5 !backdrop-blur-md !border !border-white/10">
      <table className="w-full text-left border-collapse">
        {/* sticky header */}
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className={`sticky top-0 px-4 py-3 text-xs font-semibold tracking-wider uppercase border-b border-white/10 !bg-white/5 ${
                  i === 0
                    ? "text-text-muted"
                    : i === 1
                      ? "text-text-secondary"
                      : "text-cyan-400"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="group transition-colors duration-150 hover:bg-white/[0.04]"
            >
              <td className="px-4 py-3 text-sm font-medium text-text-primary border-b border-brand-border/60 whitespace-nowrap">
                {row.label}
              </td>
              <td className="px-4 py-3 text-sm text-text-muted border-b border-brand-border/60 leading-relaxed">
                {row.traditional}
              </td>
              <td className="px-4 py-3 text-sm text-cyan-400/80 border-b border-brand-border/60 leading-relaxed group-hover:text-cyan-400 transition-colors duration-150">
                {row.riveretech}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
