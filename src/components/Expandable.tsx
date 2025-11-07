import { useState } from 'react';
import { cn, isLongText } from '../utils/format';

interface ExpandableProps {
  text: string;
  limit?: number;
  className?: string;
  collapsedLabel?: string;
  expandedLabel?: string;
}

const Expandable = ({
  text,
  limit = 180,
  className,
  collapsedLabel = 'Read more',
  expandedLabel = 'Show less',
}: ExpandableProps) => {
  const [expanded, setExpanded] = useState(false);
  const needsToggle = isLongText(text, limit);

  if (!needsToggle) {
    return <p className={cn('text-base text-slate-600', className)}>{text}</p>;
  }

  return (
    <div className={cn('space-y-2', className)}>
      <p className="text-base text-slate-600">{expanded ? text : `${text.slice(0, limit)}...`}</p>
      <button
        type="button"
        className="text-sm font-semibold text-brand-accent hover:text-brand transition"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
      >
        {expanded ? expandedLabel : collapsedLabel}
      </button>
    </div>
  );
};

export default Expandable;
