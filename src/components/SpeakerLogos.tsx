import React from 'react';
import { useMediaItems } from '@/lib/cms';
import { ASSETS } from '@/lib/assets';

const BUILTIN_LOGOS = [
  { name: 'IIT Indore', url: ASSETS.logoIitIndore },
  { name: 'IIM Nagpur', url: ASSETS.logoIimNagpur },
  { name: 'JITO', url: ASSETS.logoJito },
  { name: 'CCCI', url: ASSETS.logoCcci },
  { name: 'ITM University Gwalior', url: ASSETS.logoItmGwalior },
  { name: 'Haptik', url: ASSETS.logoHaptik },
];

export function SpeakerLogos({ title }: { title?: string }) {
  const { data } = useMediaItems('marquee_logo');
  const customLogos = (data ?? []).map((item) => ({
    name: item.title ?? item.alt ?? 'Logo',
    url: item.url,
  }));
  const logos = [...BUILTIN_LOGOS, ...customLogos];

  return (
    <section
      id="speaker-logos"
      aria-label="Clients and stages"
      className="border-y border-primary/10 bg-paper py-10 sm:py-14"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        {title ? (
          <h2 className="mb-8 text-center font-display text-2xl font-semibold text-ink">
            {title}
          </h2>
        ) : null}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <figure
              key={`${logo.name}-${logo.url}`}
              className="overflow-hidden rounded-md border border-primary/10 bg-card"
              title={logo.name}
            >
              <div className="flex h-24 items-center justify-center px-4">
                <img
                  src={logo.url}
                  alt={logo.name}
                  loading="lazy"
                  decoding="async"
                  width={160}
                  height={56}
                  className="h-14 w-full object-contain"
                />
              </div>
              <figcaption className="truncate border-t border-primary/10 px-3 py-2 text-xs text-primary/60">
                {logo.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
