import { CheckCircle2, Flashlight } from 'lucide-react';
import type { Trim } from '../types/car';
import { formatCurrency } from '../utils/currency';
import { cn } from '../utils/format';

interface TrimSelectorProps {
  trims: Trim[];
  selectedCode: string;
  onSelect: (code: string) => void;
}

const TrimSelector = ({ trims, selectedCode, onSelect }: TrimSelectorProps) => {
  if (!trims.length) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {trims.map((trim) => {
        const isActive = trim.code === selectedCode;
        return (
          <button
            key={trim.code}
            type="button"
            onClick={() => onSelect(trim.code)}
            className={cn(
              'rounded-2xl border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent',
              isActive ? 'border-brand-accent bg-white shadow-card' : 'border-slate-200 bg-surface-card'
            )}
            aria-pressed={isActive}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{trim.code}</p>
                <p className="font-heading text-xl text-brand">{trim.name}</p>
              </div>
              {isActive ? (
                <CheckCircle2 className="h-5 w-5 text-brand-accent" aria-hidden="true" />
              ) : (
                <Flashlight className="h-5 w-5 text-slate-400" aria-hidden="true" />
              )}
            </div>
            <p className="mt-3 text-sm text-slate-500">Starting at</p>
            <p className="text-2xl font-semibold text-brand">{formatCurrency(trim.price.value)}</p>
            {trim.price.note && <p className="text-xs text-slate-400">{trim.price.note}</p>}
            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-500">
              {trim.rangeWLTPKm && (
                <div>
                  <dt className="uppercase tracking-wide text-slate-400">Range (WLTP)</dt>
                  <dd className="font-medium text-brand">{trim.rangeWLTPKm} km</dd>
                </div>
              )}
              {trim.zeroTo100 && (
                <div>
                  <dt className="uppercase tracking-wide text-slate-400">0-100 km/h</dt>
                  <dd className="font-medium text-brand">{trim.zeroTo100} s</dd>
                </div>
              )}
              {trim.powertrain && (
                <div className="col-span-2">
                  <dt className="uppercase tracking-wide text-slate-400">Powertrain</dt>
                  <dd className="font-medium text-brand">{trim.powertrain}</dd>
                </div>
              )}
            </dl>
            {trim.highlightFeatures && (
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-600">
                {trim.highlightFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TrimSelector;
