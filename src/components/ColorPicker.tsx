import { Palette } from 'lucide-react';
import type { ColorOption } from '../types/car';
import Tooltip from './Tooltip';
import { cn } from '../utils/format';
import { formatCurrency } from '../utils/currency';

interface ColorPickerProps {
  options: ColorOption[];
  selectedCode?: string;
  onSelect: (code: string) => void;
  label: string;
}

const ColorPicker = ({ options, selectedCode, onSelect, label }: ColorPickerProps) => {
  if (!options.length) return null;

  const selectedLabel = options.find((option) => option.code === selectedCode)?.name;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <Palette className="h-5 w-5 text-brand" aria-hidden="true" />
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Color</p>
          <h3 className="font-semibold text-brand">{label}</h3>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isActive = option.code === selectedCode;
          return (
            <button
              key={option.code}
              type="button"
              onClick={() => onSelect(option.code)}
              className={cn(
        'relative flex min-w-[200px] items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-left transition',                
        isActive ? 'border-brand-accent bg-white shadow-card' : 'border-slate-200 hover:border-brand-accent/70'
              )}
              aria-pressed={isActive}
            >
              <div className="flex items-center gap-3">
                <span
                  className="block h-10 w-10 rounded-full border border-white/40"
                  style={{ backgroundColor: option.hex ?? '#d6d6d6' }}
                  aria-label={option.name}
                />
                <div>
                  <p className="text-sm font-semibold text-slate-700">{option.name}</p>
                  <p className="text-xs text-slate-500">
                    {option.price ? formatCurrency(option.price.value) : 'Included'}
                  </p>
                </div>
              </div>
              {option.isPremium && (
                <Tooltip content={option.price?.note ?? 'Premium color surcharge applies'}>
                  <span className="absolute -top-2 -right-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-warning text-[10px] font-semibold text-white">
                    P
                  </span>
                </Tooltip>
              )}
            </button>
          );
        })}
      </div>
      {selectedLabel && <p className="mt-3 text-sm font-medium text-brand">Selected: {selectedLabel}</p>}
    </section>
  );
};

export default ColorPicker;
