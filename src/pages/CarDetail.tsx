import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Car, Download, PlayCircle, TriangleAlert } from 'lucide-react';
import { fetchCarDetail } from '../api/cars';
import type { CarDetail, Trim } from '../types/car';
import Breadcrumbs from '../components/Breadcrumbs';
import Expandable from '../components/Expandable';
import TrimSelector from '../components/TrimSelector';
import PriceBlock from '../components/PriceBlock';
import ColorPicker from '../components/ColorPicker';
import MediaGallery from '../components/MediaGallery';
import FeatureGrid from '../components/FeatureGrid';
import SpecTabs from '../components/SpecTabs';
import PromoBanner from '../components/PromoBanner';
import AccessoryList from '../components/AccessoryList';
import OTRCalculator from '../components/OTRCalculator';
import ComparisonTable from '../components/ComparisonTable';
import CTAForm from '../components/CTAForm';
import BrochureCard from '../components/BrochureCard';
import { formatCurrency } from '../utils/currency';

export function CarDetailPage() {
  const { modelSlug = 'vf-8' } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery<CarDetail>({
    queryKey: ['car', modelSlug],
    queryFn: () => fetchCarDetail(modelSlug),
    staleTime: 5 * 60 * 1000,
  });

  const [selectedTrimCode, setSelectedTrimCode] = useState<string | undefined>();
  const [selectedExteriorCode, setSelectedExteriorCode] = useState<string | undefined>();
  const [selectedInteriorCode, setSelectedInteriorCode] = useState<string | undefined>();
  const [shareMessage, setShareMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!data) return;
    setSelectedTrimCode((current) => {
      if (current && data.trims.some((trim) => trim.code === current)) return current;
      return data.trims[0]?.code;
    });
    setSelectedExteriorCode((current) => {
      if (current && data.colors.exterior.some((color) => color.code === current)) return current;
      return data.colors.exterior[0]?.code;
    });
    setSelectedInteriorCode((current) => {
      if (current && data.colors.interior.some((color) => color.code === current)) return current;
      return data.colors.interior[0]?.code;
    });
    if (data.seo?.title) {
      document.title = data.seo.title;
    }
  }, [data]);

  const selectedTrim = useMemo(
    () => data?.trims.find((trim) => trim.code === selectedTrimCode) ?? data?.trims[0],
    [data, selectedTrimCode]
  );

  const handleScrollToForm = () => document.getElementById('cta-form')?.scrollIntoView({ behavior: 'smooth' });

  const handleShare = async () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: data?.seo?.title ?? data?.modelName,
          url: window.location.href,
          text: data?.seo?.description,
        });
        return;
      }
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage('Link copied');
        setTimeout(() => setShareMessage(null), 2000);
      }
    } catch {
      setShareMessage('Unable to share');
      setTimeout(() => setShareMessage(null), 2000);
    }
  };

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6 lg:px-10">
        <Skeleton />
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 text-center text-slate-500">
        <TriangleAlert className="mx-auto h-10 w-10 text-warning" aria-hidden="true" />
        <p className="mt-4 text-lg font-semibold text-brand">Car detail unavailable</p>
        <button
          type="button"
          className="mt-4 rounded-full bg-brand text-white px-6 py-2 text-sm font-semibold"
          onClick={() => navigate('/')}
        >
          Back to home
        </button>
      </main>
    );
  }

  const hasComparison = Boolean(data.comparisons);
  const hasBrochure = Boolean(data.brochure?.pdfUrl);
  const exteriorOptions = data.colors.exterior;
  const interiorOptions = data.colors.interior;
  const selectedExterior =
    exteriorOptions.find((color) => color.code === selectedExteriorCode) ?? exteriorOptions[0];
  const selectedInterior =
    interiorOptions.find((color) => color.code === selectedInteriorCode) ?? interiorOptions[0];
  const activeExteriorCode = selectedExterior?.code ?? '';
  const activeInteriorCode = selectedInterior?.code ?? '';
  const colorSurcharge = (selectedExterior?.price?.value ?? 0) + (selectedInterior?.price?.value ?? 0);
  const totalVehiclePrice = selectedTrim ? selectedTrim.price.value + colorSurcharge : undefined;
  const colorNotes = [
    selectedExterior && {
      label: `${selectedExterior.name} exterior`,
      amount: selectedExterior.price?.value ?? 0,
    },
    selectedInterior && {
      label: `${selectedInterior.name} interior`,
      amount: selectedInterior.price?.value ?? 0,
    },
  ].filter((note): note is { label: string; amount: number } => Boolean(note));

  return (
    <main className="bg-surface pb-24">
      <div className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Cars', href: '/cars' },
            { label: data.modelName },
          ]}
        />

        <header className="mt-6 space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.5em] text-slate-400">VinFast</p>
              <h1 className="font-heading text-3xl text-brand sm:text-4xl lg:text-5xl">
                {data.brand} {data.modelName} {data.modelYear ?? ''}
              </h1>
              <div className="max-w-7xl">
                <Expandable text={data.shortDescription} />
              </div>
            </div>
            {shareMessage && (
              <span className="rounded-full bg-black/80 px-4 py-1 text-xs text-white">{shareMessage}</span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleScrollToForm}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg"
            >
              <Car className="h-4 w-4" aria-hidden="true" />
              Book a test drive
            </button>
            <button
              type="button"
              onClick={handleScrollToForm}
              className="inline-flex items-center gap-2 rounded-full border border-brand px-6 py-3 text-sm font-semibold text-brand"
            >
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              Pre-order
            </button>
            {data.brochure?.pdfUrl && (
              <a
                className="inline-flex items-center gap-2 rounded-full bg-surface-subtle px-6 py-3 text-sm font-semibold text-brand"
                href={data.brochure.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download brochure
              </a>
            )}
          </div>
        </header>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <HeroMedia media={data.heroMedia} modelName={data.modelName} />
          <PriceBlock
            trim={selectedTrim}
            modelName={data.modelName}
            onShare={handleShare}
            colorAdjustment={colorSurcharge}
            colorNotes={colorNotes}
          />
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
          <TrimSelector
            trims={data.trims}
            selectedCode={selectedTrim?.code ?? data.trims[0]?.code ?? ''}
            onSelect={setSelectedTrimCode}
          />
          <div className="space-y-4">
            <ColorPicker
              label="Exterior"
              options={exteriorOptions}
              selectedCode={activeExteriorCode}
              onSelect={setSelectedExteriorCode}
            />
            <ColorPicker
              label="Interior"
              options={interiorOptions}
              selectedCode={activeInteriorCode}
              onSelect={setSelectedInteriorCode}
            />
          </div>
        </section>

        <section className="mt-8 space-y-8">
          <MediaGallery media={data.media} modelName={data.modelName} />
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <FeatureGrid items={data.keyFeatures} />
          <AccessoryList accessories={data.accessories} />
        </section>

        <section className="mt-8">
          <SpecTabs sections={data.specifications} />
        </section>

        {(data.onRoadCostSchema || data.promotions?.length) && (
          <section className="mt-8 grid gap-8 lg:grid-cols-2">
            {data.onRoadCostSchema && selectedTrim ? (
              <OTRCalculator
                schema={data.onRoadCostSchema}
                basePrice={totalVehiclePrice ?? selectedTrim.price.value}
                trimName={selectedTrim.name}
              />
            ) : null}
            {data.promotions?.length ? <PromoBanner promotions={data.promotions} /> : null}
          </section>
        )}

        {(hasComparison || hasBrochure) && (
          <section
            className={`mt-8 grid gap-8 ${hasComparison && hasBrochure ? 'lg:grid-cols-2' : ''}`}
          >
            {hasComparison && (
              <ComparisonTable comparison={data.comparisons} selectedTrimCode={selectedTrim?.code} />
            )}
            {hasBrochure && <BrochureCard brochure={data.brochure} />}
          </section>
        )}

        <section id="cta-form" className="mt-10">
          <CTAForm
            trims={data.trims}
            exteriorColors={exteriorOptions}
            interiorColors={interiorOptions}
            selectedTrimCode={selectedTrim?.code ?? data.trims[0]?.code ?? ''}
            selectedExterior={activeExteriorCode}
            selectedInterior={activeInteriorCode}
          />
        </section>
      </div>

      <MobileCtaBar
        trim={selectedTrim}
        totalPrice={totalVehiclePrice}
        onTestDrive={handleScrollToForm}
        onPreOrder={handleScrollToForm}
      />
    </main>
  );
}

const HeroMedia = ({ media, modelName }: { media: CarDetail['heroMedia']; modelName: string }) => (
  <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-surface-subtle pb-[56%]">
    {media.type === 'image' ? (
      <img
        src={media.url}
        alt={media.caption ?? modelName}
        className="absolute inset-0 h-full w-full object-cover"
      />
    ) : (
      <video
        src={media.url}
        poster={media.poster}
        autoPlay
        muted
        loop
        className="absolute inset-0 h-full w-full object-cover"
      />
    )}
  </div>
);

const MobileCtaBar = ({
  trim,
  totalPrice,
  onTestDrive,
  onPreOrder,
}: {
  trim?: Trim;
  totalPrice?: number;
  onTestDrive: () => void;
  onPreOrder: () => void;
}) => {
  if (!trim) return null;
  const displayPrice = totalPrice ?? trim.price.value;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white p-4 shadow-2xl md:hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">{trim.name}</p>
          <p className="text-lg font-semibold text-brand">{formatCurrency(displayPrice)}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onTestDrive}
            className="rounded-full border border-brand px-4 py-2 text-xs font-semibold text-brand"
          >
            Test Drive
          </button>
          <button
            type="button"
            onClick={onPreOrder}
            className="rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white"
          >
            Pre-Order
          </button>
        </div>
      </div>
    </div>
  );
};

const Skeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-4 w-40 rounded bg-slate-200" />
    <div className="h-8 w-1/2 rounded bg-slate-200" />
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="h-80 rounded-3xl bg-slate-200" />
      <div className="h-80 rounded-3xl bg-slate-200" />
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="h-40 rounded-2xl bg-slate-200" />
      ))}
    </div>
  </div>
);

export default CarDetailPage;
