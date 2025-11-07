import * as Dialog from '@radix-ui/react-dialog';
import { Play, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { CarDetail } from '../types/car';

type MediaAsset = CarDetail['media'][number];

interface MediaGalleryProps {
  media: MediaAsset[];
  modelName: string;
}

type TabKey = 'images' | 'videos';

const MediaGallery = ({ media, modelName }: MediaGalleryProps) => {
  const images = useMemo(() => media.filter((item) => item.type === 'image'), [media]);
  const videos = useMemo(() => media.filter((item) => item.type === 'video'), [media]);
  const [tab, setTab] = useState<TabKey>(images.length ? 'images' : 'videos');
  const [activeMedia, setActiveMedia] = useState<MediaAsset | null>(null);

  const items = tab === 'images' ? images : videos;

  return (
    <section id="media" className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Media</p>
          <h3 className="font-heading text-2xl text-brand">Gallery</h3>
        </div>
        <div className="flex gap-2 rounded-full bg-surface-subtle p-1 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setTab('images')}
            className={`rounded-full px-4 py-1.5 ${tab === 'images' ? 'bg-white text-brand shadow-card' : 'text-slate-500'}`}
          >
            Images ({images.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('videos')}
            className={`rounded-full px-4 py-1.5 ${tab === 'videos' ? 'bg-white text-brand shadow-card' : 'text-slate-500'}`}
          >
            Videos ({videos.length})
          </button>
        </div>
      </div>

      {items.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <button
              key={`${item.url}-${index}`}
              type="button"
              onClick={() => setActiveMedia(item)}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-surface-subtle"
              aria-label={`${item.type === 'video' ? 'Play video' : 'View image'} ${item.caption ?? modelName}`}
            >
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.caption ?? modelName}
                  className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="relative h-56 w-full bg-slate-900">
                  <video src={item.url} className="h-full w-full object-cover opacity-80" muted />
                  <Play className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-white" aria-hidden />
                </div>
              )}
              {item.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-sm text-white">
                  {item.caption}
                </div>
              )}
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-2xl bg-surface-subtle p-6 text-center text-sm text-slate-500">Media assets coming soon.</p>
      )}

      <Dialog.Root open={activeMedia !== null} onOpenChange={(open) => !open && setActiveMedia(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-900/80" />
          <Dialog.Content className="fixed inset-4 z-50 flex flex-col rounded-3xl bg-black/90 p-4 text-white focus-visible:outline-none">
            <button
              type="button"
              onClick={() => setActiveMedia(null)}
              className="ml-auto mb-3 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>
            {activeMedia?.type === 'image' && (
              <img
                src={activeMedia.url}
                alt={activeMedia.caption ?? modelName}
                className="mx-auto max-h-[70vh] w-auto object-contain"
              />
            )}
            {activeMedia?.type === 'video' && (
              <video
                src={activeMedia.url}
                controls
                autoPlay
                className="mx-auto h-full max-h-[70vh] w-full rounded-2xl"
              />
            )}
            {activeMedia?.caption && (
              <p className="mt-4 text-center text-sm text-white/80">{activeMedia.caption}</p>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
};

export default MediaGallery;
