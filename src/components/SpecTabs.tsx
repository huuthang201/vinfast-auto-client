import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { SpecSection } from '../types/car';
import Tooltip from './Tooltip';
import { cn } from '../utils/format';

interface SpecTabsProps {
  sections: SpecSection[];
}

const SpecTabs = ({ sections }: SpecTabsProps) => {
  if (!sections.length) return null;
  const [active, setActive] = useState(sections[0]?.title ?? '');

  const renderSection = (section: SpecSection) => (
    <div id={section.title}>
      <dl className="divide-y divide-slate-200 rounded-2xl border border-slate-100 bg-white">
        {section.items.map((item) => (
          <div key={item.label} className="grid grid-cols-[1fr_auto] gap-3 px-4 py-3 text-sm md:grid-cols-2">
            <dt className="flex items-center gap-2 text-slate-500">
              {item.label}
              {item.tooltip && (
                <Tooltip content={item.tooltip}>
                  <span className="text-xs text-slate-400 underline decoration-dotted">?</span>
                </Tooltip>
              )}
            </dt>
            <dd className="text-right font-medium text-brand md:text-left">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );

  return (
    <section id="specifications" className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Technical data</p>
          <h3 className="font-heading text-2xl text-brand">Specifications</h3>
        </div>
      </div>

      <div className="mt-6 hidden flex-wrap gap-2 md:flex">
        {sections.map((section) => (
          <button
            key={section.title}
            type="button"
            onClick={() => setActive(section.title)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-semibold transition',
              active === section.title
                ? 'border-brand-accent bg-brand text-white'
                : 'border-slate-200 text-slate-500 hover:border-brand-accent hover:text-brand'
            )}
          >
            {section.title}
          </button>
        ))}
      </div>
      <div className="mt-6 hidden md:block">{renderSection(sections.find((section) => section.title === active) ?? sections[0])}</div>

      <div className="mt-4 md:hidden">
        <Accordion.Root type="single" collapsible defaultValue={sections[0]?.title}>
          {sections.map((section) => (
            <Accordion.Item
              key={section.title}
              value={section.title}
              className="mb-3 rounded-2xl border border-slate-200 bg-surface-card"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-2 px-4 py-3 text-left font-semibold text-brand">
                  {section.title}
                  <ChevronDown className="h-4 w-4 transition group-data-[state=open]:rotate-180" aria-hidden="true" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-4 pb-4">
                {renderSection(section)}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
};

export default SpecTabs;
