import { ShoppingBag } from 'lucide-react';
import type { Accessory } from '../types/car';
import { formatCurrency } from '../utils/currency';

interface AccessoryListProps {
  accessories?: Accessory[];
}

export function AccessoryList({ accessories }: AccessoryListProps) {
  if (!accessories?.length) return null;

  return (
    <section id="accessories" className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex items-center gap-2">
        <ShoppingBag className="h-5 w-5 text-brand" aria-hidden="true" />
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Personalize</p>
          <h3 className="font-heading text-2xl text-brand">Accessories</h3>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {accessories.map((item) => (
          <article
            key={item.name}
            className="rounded-2xl border border-slate-200 bg-surface-card p-4 shadow-sm"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="h-36 w-full rounded-xl object-cover"
              />
            )}
            <h4 className="mt-3 font-semibold text-brand">{item.name}</h4>
            {item.price && <p className="text-sm text-brand">{formatCurrency(item.price)}</p>}
            {item.note && <p className="text-xs text-slate-500">{item.note}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

export default AccessoryList;
