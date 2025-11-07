import { Download } from 'lucide-react';

interface BrochureCardProps {
  brochure?: { pdfUrl: string; sizeMB?: number; label?: string };
}

const BrochureCard = ({ brochure }: BrochureCardProps) => {
  if (!brochure?.pdfUrl) return null;

  return (
    <section className="rounded-3xl border border-slate-200 bg-gradient-to-r from-brand to-brand-accent p-6 text-white">
      <h3 className="font-heading text-2xl">{brochure.label ?? 'Download brochure'}</h3>
      {brochure.sizeMB && <p className="text-sm text-white/80">{brochure.sizeMB} MB PDF</p>}
      <a
        href={brochure.pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-brand font-semibold shadow"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Download PDF
      </a>
    </section>
  );
};

export default BrochureCard;
