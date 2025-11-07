import type { ComparisonSpec } from '../types/car';
import { cn } from '../utils/format';

interface ComparisonTableProps {
  comparison?: ComparisonSpec;
  selectedTrimCode?: string;
}

export function ComparisonTable({ comparison, selectedTrimCode }: ComparisonTableProps) {
  if (!comparison) return null;

  return (
    <section id="comparison" className="rounded-3xl border border-slate-200 bg-white p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Trims</p>
        <h3 className="font-heading text-2xl text-brand">Compare</h3>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="sticky left-0 bg-white px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Spec
              </th>
              {comparison.columns.map((column) => (
                <th
                  key={column.trimCode}
                  className={cn(
                    'px-4 py-2 text-left text-sm font-semibold text-brand',
                    column.trimCode === selectedTrimCode && 'text-brand-accent'
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.label} className="rounded-2xl bg-surface-subtle">
                <th className="sticky left-0 w-40 bg-surface-subtle px-4 py-3 text-left text-sm font-medium text-brand">
                  {row.label}
                </th>
                {comparison.columns.map((column) => (
                  <td
                    key={column.trimCode}
                    className={cn(
                      'px-4 py-3 text-sm text-slate-600',
                      column.trimCode === selectedTrimCode && 'font-semibold text-brand'
                    )}
                  >
                    {row.values[column.trimCode] ?? '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ComparisonTable;
