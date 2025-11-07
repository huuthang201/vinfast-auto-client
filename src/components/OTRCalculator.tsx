import type { OnRoadCostSchema } from '../types/car';
import { formatCurrency } from '../utils/currency';

interface OTRCalculatorProps {
  schema?: OnRoadCostSchema;
  basePrice?: number;
  trimName?: string;
}

export function OTRCalculator({ schema, basePrice, trimName }: OTRCalculatorProps) {
  if (!schema || !basePrice) return null;

  const feeLines = schema.fees.map((fee) => {
    const amount = fee.formula === 'percentOfBase' ? basePrice * fee.value : fee.value;
    return { ...fee, amount };
  });

  const total = basePrice + feeLines.reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Estimation</p>
          <h3 className="font-heading text-2xl text-brand">On-the-road cost</h3>
          {trimName && <p className="text-sm text-slate-500">{trimName}</p>}
        </div>
        <span className="rounded-full bg-surface-subtle px-4 py-2 text-xs font-semibold text-brand">
          Estimated
        </span>
      </div>
      <dl className="mt-6 space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-between rounded-2xl bg-surface-subtle px-4 py-3 font-semibold text-brand">
          <dt>Vehicle price</dt>
          <dd>{formatCurrency(basePrice)}</dd>
        </div>
        {feeLines.map((fee) => (
          <div
            key={fee.label}
            className="flex items-start justify-between rounded-2xl border border-slate-100 px-4 py-3"
          >
            <div>
              <dt className="font-medium text-brand">{fee.label}</dt>
              {fee.tooltip && <p className="text-xs text-slate-400">{fee.tooltip}</p>}
            </div>
            <dd className="text-brand">{formatCurrency(fee.amount)}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-lg font-semibold text-brand">Total estimated</span>
        <span className="text-2xl font-heading text-brand">{formatCurrency(total)}</span>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        * All figures are indicative. Actual licensing & taxes vary by province and VinFast dealer. Verify before
        signing any contract.
      </p>
    </section>
  );
}

export default OTRCalculator;
