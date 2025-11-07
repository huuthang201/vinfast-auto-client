import type { LucideIcon } from 'lucide-react';
import {
  BatteryCharging,
  Gauge,
  PlugZap,
  Radar,
  ShieldCheck,
  Sparkles,
  TabletSmartphone,
  Wind,
  Wifi,
} from 'lucide-react';
import type { FeatureItem } from '../types/car';
import Tooltip from './Tooltip';

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  battery: BatteryCharging,
  shield: ShieldCheck,
  radar: Radar,
  gauge: Gauge,
  infotainment: TabletSmartphone,
  plug: PlugZap,
  wind: Wind,
  wifi: Wifi,
};

interface FeatureGridProps {
  items: FeatureItem[];
}

const FeatureGrid = ({ items }: FeatureGridProps) => {
  if (!items.length) return null;

  return (
    <section id="features" className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Highlights</p>
          <h3 className="font-heading text-2xl text-brand">Key Features</h3>
        </div>
        <a href="#specifications" className="text-sm font-semibold text-brand-accent hover:text-brand">
          Jump to specifications
        </a>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((feature) => {
          const iconKey = feature.icon?.toLowerCase() ?? 'sparkles';
          const Icon = iconMap[iconKey] ?? Sparkles;
          return (
            <article
              key={feature.title}
              className="relative flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-surface-card p-4"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-subtle text-brand">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h4 className="font-semibold text-brand">{feature.title}</h4>
                {feature.tooltip && (
                  <Tooltip content={feature.tooltip}>
                    <span className="text-xs text-slate-400 underline decoration-dotted">i</span>
                  </Tooltip>
                )}
              </div>
              <p className="text-sm text-slate-600">{feature.summary}</p>
              {feature.mediaUrl && (
                <a
                  href={feature.mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-brand-accent hover:text-brand"
                >
                  View media
                </a>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureGrid;
