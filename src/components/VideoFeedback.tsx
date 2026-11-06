import React, { useEffect, useRef, useState } from 'react';
import { Play, Quote } from 'lucide-react';
import { useSiteSettings, useMediaItems } from '@/lib/cms';
import { ASSETS } from '@/lib/assets';
import { Button } from './ui/Button';

export function useReveal(threshold = 0.18) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function useCountUp(target: number, duration = 1600) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      obs.disconnect();
      if (reduced) {
        setDisplay(target);
        return;
      }
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - progress) ** 3;
        setDisplay(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { ref, display };
}

const WISTIA_PLAYER_JS = 'https://fast.wistia.com/player.js';

function loadScriptOnce(src: string, type?: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement('script');
  s.src = src;
  s.async = true;
  if (type) s.type = type;
  document.head.appendChild(s);
}

export function WistiaPlayer({
  mediaId,
  aspect,
  className,
  eager = false,
  clickToLoad = false,
  poster,
}: {
  mediaId: string;
  aspect: string;
  className?: string;
  eager?: boolean;
  clickToLoad?: boolean;
  poster?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(eager && !clickToLoad);

  useEffect(() => {
    if (clickToLoad) return;
    if (eager) {
      setLoaded(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setLoaded(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoaded(true);
          obs.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [eager, clickToLoad]);

  useEffect(() => {
    if (loaded) {
      loadScriptOnce(WISTIA_PLAYER_JS);
      loadScriptOnce(`https://fast.wistia.com/embed/${mediaId}.js`, 'module');
    }
  }, [mediaId, loaded]);

  const swatch = `https://fast.wistia.com/embed/medias/${mediaId}/swatch`;

  return (
    <div ref={ref} className={className} style={{ aspectRatio: aspect }}>
      {clickToLoad && !loaded ? (
        <Button
          variant="ghost"
          aria-label="Play workshop introduction video"
          onClick={() => setLoaded(true)}
          className="relative h-full w-full overflow-hidden rounded-none p-0 hover:bg-transparent"
        >
          <img
            src={poster ?? swatch}
            alt="Workshop introduction video"
            width={960}
            height={540}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <span className="absolute grid size-14 place-items-center rounded-full bg-primary/90 text-primary-foreground shadow-[var(--shadow-card)]">
            <Play className="size-6 fill-current" />
          </span>
        </Button>
      ) : null}
      {loaded &&
        React.createElement('wistia-player', {
          'media-id': mediaId,
          ...(clickToLoad ? { 'auto-play': true } : {}),
          aspect,
          style: {
            background: `center / contain no-repeat url('${swatch}')`,
            display: 'block',
            width: '100%',
            height: '100%',
          },
        })}
    </div>
  );
}

const DEFAULT_WISTIA_REVIEWS = ['vzci0es4x8', '6bxg4lbls2', 'z17il1hb8n'];
const FALLBACK_THUMBS = [
  ASSETS.fallbackWorkshopRoom,
  ASSETS.fallbackKeynote,
  ASSETS.fallbackConsult,
];

function extractYoutubeId(url: string): string {
  const m = /(?:youtu\.be\/|v=|shorts\/|embed\/)([A-Za-z0-9_-]{6,})/.exec(url);
  return m ? m[1] : '';
}

export function VideoFeedback({ programId }: { programId?: string }) {
  const { ref, visible } = useReveal();
  const { get } = useSiteSettings();
  const { data: videoItems } = useMediaItems('feedback_video', programId ?? null);
  const { data: screenshotItems } = useMediaItems('review_screenshot', programId ?? null);

  const customFeedbacks = (videoItems ?? []).map((item, idx) => {
    const ytId = extractYoutubeId(item.url);
    return {
      youtubeId: ytId,
      videoUrl: ytId ? undefined : item.url,
      name: item.title ?? 'Participant',
      program: item.alt ?? '',
      fallback: FALLBACK_THUMBS[idx % FALLBACK_THUMBS.length],
    };
  });

  const hasCustomVideos = (videoItems ?? []).length > 0;
  const words = get('sections').feedbackTitle.trim().split(' ');
  const accentWords = words.length > 1 ? words.splice(-2).join(' ') : '';

  return (
    <section
      id="feedback"
      className="bg-ink px-5 py-20 text-center text-white sm:px-10 sm:py-36 sm:text-left"
    >
      <div ref={ref} className="mx-auto max-w-7xl">
        <p className="eyebrow reveal text-white/50" data-visible={visible}>
          <span className="inline-flex items-center justify-center gap-2 sm:justify-start">
            <Quote className="h-3.5 w-3.5 text-electric" /> Real voices
          </span>
        </p>
        <h2
          className="reveal mt-5 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] font-semibold"
          data-visible={visible}
          style={{ transitionDelay: '90ms' }}
        >
          {words.join(' ')} <span className="text-gradient-electric">{accentWords}</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-3 sm:gap-6">
          {hasCustomVideos
            ? customFeedbacks
                .slice(0, 5)
                .map((fb, idx) => (
                  <CustomFeedbackCard
                    key={`${fb.name}-${idx}`}
                    feedback={fb}
                    visible={visible}
                    index={idx}
                  />
                ))
            : DEFAULT_WISTIA_REVIEWS.map((mediaId, idx) => (
                <article
                  key={mediaId}
                  className="reveal mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-white/10"
                  data-visible={visible}
                  style={{ transitionDelay: `${200 + idx * 70}ms` }}
                >
                  <WistiaPlayer
                    mediaId={mediaId}
                    aspect="1.7777777777777777"
                    className="h-full w-full"
                  />
                </article>
              ))}
        </div>

        {(screenshotItems ?? []).length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-14 sm:grid-cols-4">
            {(screenshotItems ?? []).map((item) => (
              <img
                key={item.id}
                src={item.url}
                alt={item.alt ?? 'Customer review'}
                loading="lazy"
                className="w-full rounded-xl border border-white/10 object-contain"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CustomFeedbackCard({
  feedback,
  visible,
  index,
}: {
  feedback: {
    youtubeId: string;
    videoUrl?: string;
    name: string;
    program: string;
    fallback: string;
  };
  visible: boolean;
  index: number;
}) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(
    feedback.youtubeId
      ? `https://i.ytimg.com/vi/${feedback.youtubeId}/hqdefault.jpg`
      : feedback.fallback
  );
  const canPlay = !!(feedback.youtubeId || feedback.videoUrl);

  return (
    <article
      className="reveal group relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/5"
      data-visible={visible}
      style={{ transitionDelay: `${200 + index * 70}ms` }}
    >
      <div className="relative aspect-video overflow-hidden">
        {playing && feedback.youtubeId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${feedback.youtubeId}?autoplay=1&rel=0`}
            title={feedback.program}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : playing && feedback.videoUrl ? (
          <video
            src={feedback.videoUrl}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={() => canPlay && setPlaying(true)}
            className="absolute inset-0 h-full w-full"
            aria-label={`Play feedback — ${feedback.program || feedback.name}`}
          >
            <img
              src={thumb}
              onError={() => setThumb(feedback.fallback)}
              alt={`${feedback.program || feedback.name} feedback`}
              loading="lazy"
              className="h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,oklch(0.1_0.01_260/0.85))]" />
            <span className="glass-dark absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md transition-transform duration-500 group-hover:scale-110">
              <Play className="h-5 w-5 fill-white text-white" />
            </span>
            <span className="absolute right-3 bottom-3 left-3 text-left">
              <span className="block text-sm leading-snug font-semibold text-white">
                {feedback.name}
              </span>
              <span className="mt-1 block text-xs text-white/60">{feedback.program}</span>
            </span>
          </button>
        )}
      </div>
    </article>
  );
}
