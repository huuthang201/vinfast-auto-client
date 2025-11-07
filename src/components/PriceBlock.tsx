import { Share2 } from 'lucide-react';
import type { Trim } from '../types/car';
import { formatCurrency } from '../utils/currency';

interface PriceBlockProps {
  trim?: Trim;
  modelName?: string;
  onShare?: () => void;
  colorAdjustment?: number;
  colorNotes?: Array<{ label: string; amount: number }>;
}

const PriceBlock = ({
  trim,
  modelName = 'this model',
  onShare,
  colorAdjustment = 0,
  colorNotes = [],
}: PriceBlockProps) => {
  if (!trim) return null;

  const basePrice = trim.price.value;
  const total = basePrice + colorAdjustment;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Selected price</p>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-sm text-slate-500">Total</span>
            <span className="flex-shrink-0 text-4xl font-semibold text-brand tabular-nums">
              {formatCurrency(total)}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            {colorAdjustment > 0 ? 'Includes premium color upgrades' : 'Includes selected colors'}
          </p>
        </div>
        {onShare && (
          <button
            type="button"
            onClick={onShare}
            className="inline-flex items-center gap-1 self-start rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-brand hover:border-brand-accent hover:text-brand-accent"
            aria-label="Share car detail page"
          >
            <Share2 className="h-4 w-4" aria-hidden />
            Share
          </button>
        )}
      </div>
      <dl className="mt-4 space-y-2 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <dt>Base trim price</dt>
          <dd>{formatCurrency(basePrice)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Color upgrades</dt>
          <dd>{colorAdjustment > 0 ? formatCurrency(colorAdjustment) : 'Included'}</dd>
        </div>
        {colorNotes
          .filter((note) => note.amount > 0)
          .map((note) => (
            <div key={note.label} className="flex items-center justify-between text-xs text-slate-500">
              <dt>{note.label}</dt>
              <dd>{formatCurrency(note.amount)}</dd>
            </div>
          ))}
      </dl>
      <dl className="mt-6 grid gap-4 text-sm text-slate-600 md:grid-cols-3">
        {trim.rangeWLTPKm && (
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">WLTP Range</dt>
            <dd className="text-brand font-semibold">{trim.rangeWLTPKm} km</dd>
          </div>
        )}
        {trim.zeroTo100 && (
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">0-100 km/h</dt>
            <dd className="text-brand font-semibold">{trim.zeroTo100} s</dd>
          </div>
        )}
        {trim.powertrain && (
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">Powertrain</dt>
            <dd className="text-brand font-semibold">{trim.powertrain}</dd>
          </div>
        )}
      </dl>
      <p className="mt-6 text-xs text-slate-400">
        * Pricing shown is indicative for {modelName}. Taxes, fees, and incentives vary by province.
      </p>
    </section>
  );
};

export default PriceBlock;
