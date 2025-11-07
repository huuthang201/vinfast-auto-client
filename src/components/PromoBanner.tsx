import type { Promotion } from '../types/car';
import { formatDateLabel } from '../utils/format';

interface PromoBannerProps {
  promotions?: Promotion[];
}

const PromoBanner = ({ promotions }: PromoBannerProps) => {
  if (!promotions?.length) return null;

  return (
    <section className="rounded-3xl border border-dashed border-brand-accent bg-brand/5 p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-brand-accent">Promotions</p>
      <ul className="mt-4 space-y-4">
        {promotions.map((promo) => (
          <li key={promo.title} className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-brand">{promo.title}</p>
                <p className="text-sm text-slate-600">{promo.description}</p>
              </div>
              {promo.badge && (
                <span className="rounded-full bg-brand-accent/10 px-3 py-1 text-xs font-semibold text-brand-accent">
                  {promo.badge}
                </span>
              )}
            </div>
            {promo.validUntil && (
              <p className="mt-2 text-xs text-slate-500">
                Valid until {formatDateLabel(promo.validUntil)}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PromoBanner;
