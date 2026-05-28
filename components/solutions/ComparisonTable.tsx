import type { ComparisonRow } from "@/lib/data";

interface ComparisonTableProps {
  headers: string[];
  rows: ComparisonRow[];
}

export default function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-sm border border-brand-border">
      <table className="w-full text-left border-collapse">
        {/* sticky header */}
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className={`sticky top-0 px-4 py-3 text-xs font-semibold tracking-wider uppercase border-b border-brand-border bg-brand-elevated ${
                  i === 0
                    ? "text-text-muted"
                    : i === 1
                      ? "text-text-secondary"
                      : "text-cyan-500"
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
              className="group transition-colors duration-150 hover:bg-brand-surface/60"
            >
              <td className="px-4 py-3 text-sm font-medium text-text-primary border-b border-brand-border/60 whitespace-nowrap">
                {row.label}
              </td>
              <td className="px-4 py-3 text-sm text-text-muted border-b border-brand-border/60 leading-relaxed">
                {row.traditional}
              </td>
              <td className="px-4 py-3 text-sm text-cyan-500/80 border-b border-brand-border/60 leading-relaxed group-hover:text-cyan-500 transition-colors duration-150">
                {row.riveretech}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
