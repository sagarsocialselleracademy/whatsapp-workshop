import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Check,
  ChevronDown,
  Laptop,
  Lightbulb,
  Megaphone,
  MessageCircle,
  MonitorPlay,
  Play,
  Quote,
  Rocket,
  ShoppingCart,
  Star,
  Store,
  TrendingUp,
  Users,
  Youtube,
} from 'lucide-react';
import {
  trackConversion,
  useProgram,
  usePrograms,
  type TestimonialItem,
} from '@/lib/cms';
import { ASSETS } from '@/lib/assets';
import { getRequiredMembership } from '@/lib/product-categories';
import { Header, NoticeBar } from '@/components/NoticeBar';
import { VideoFeedback, WistiaPlayer, useReveal } from '@/components/VideoFeedback';
import { SpeakerLogos } from '@/components/SpeakerLogos';
import { ContactDialog } from '@/components/ContactDialog';
import { StickyCta } from '@/components/StickyCta';
import { Button } from '@/components/ui/Button';

const WHATSAPP_NUMBER = '918370044449';
const RAIPUR_VIDEO_IDS = ['phqvhpjfev', '8hdpwk5j4t', 'kd07suprf7'];
const RAIPUR_SCREENSHOTS = [
  ASSETS.raipurReview1,
  ASSETS.raipurReview2,
  ASSETS.raipurReview3,
  ASSETS.raipurReview4,
  ASSETS.raipurReview5,
  ASSETS.raipurReview6,
];

const AUDIENCE_ICONS = [
  Briefcase,
  Rocket,
  Lightbulb,
  Laptop,
  Megaphone,
  TrendingUp,
  MonitorPlay,
  Store,
  ShoppingCart,
];

function RaipurReviewsSection() {
  return (
    <>
      <section
        id="feedback"
        aria-labelledby="raipur-video-reviews"
        className="bg-ink px-5 py-20 text-primary-foreground sm:px-10 sm:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-electric-glow">Real voices</p>
          <h2 id="raipur-video-reviews" className="mt-5 text-4xl font-semibold leading-tight">
            Feedbacks <span className="text-electric-glow">&amp; Reviews</span>
          </h2>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
            {RAIPUR_VIDEO_IDS.map((mediaId, idx) => (
              <article
                key={mediaId}
                aria-label={`Workshop attendee video review ${idx + 1}`}
                className="mx-auto w-full max-w-80 overflow-hidden rounded-lg border border-primary-foreground/15 bg-primary-foreground/5"
              >
                <WistiaPlayer mediaId={mediaId} aspect="0.5625" className="w-full" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="raipur-whatsapp-reviews"
        className="bg-paper px-5 py-20 sm:px-10 sm:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <h2
            id="raipur-whatsapp-reviews"
            className="text-4xl font-semibold leading-tight text-ink"
          >
            Real people. Real feedback.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Workshop attendees share their experience
          </p>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 items-start gap-3 sm:gap-6 lg:grid-cols-3">
            {RAIPUR_SCREENSHOTS.map((src, idx) => (
              <figure
                key={src}
                className="overflow-hidden rounded-lg border border-border bg-card"
              >
                <img
                  src={src}
                  alt={`WhatsApp feedback from workshop attendees — screenshot ${idx + 1}`}
                  width={736}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-contain"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CountdownTimer({
  target,
  label = 'Workshop starts in',
}: {
  target: string;
  label?: string;
}) {
  const targetMs = new Date(target).getTime();
  const [nowMs, setNowMs] = useState<number | null>(null);

  useEffect(() => {
    setNowMs(Date.now());
    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (Number.isNaN(targetMs)) return null;

  const diff = nowMs === null ? null : Math.max(0, targetMs - nowMs);
  const isLive = nowMs !== null && targetMs - nowMs <= 0;

  const days = diff !== null ? Math.floor(diff / 86400000) : null;
  const hours = diff !== null ? Math.floor(diff / 3600000) % 24 : null;
  const minutes = diff !== null ? Math.floor(diff / 60000) % 60 : null;
  const seconds = diff !== null ? Math.floor(diff / 1000) % 60 : null;

  const boxes = [
    { value: days !== null ? String(days).padStart(2, '0') : '--', unit: 'Days' },
    { value: hours !== null ? String(hours).padStart(2, '0') : '--', unit: 'Hours' },
    { value: minutes !== null ? String(minutes).padStart(2, '0') : '--', unit: 'Mins' },
    { value: seconds !== null ? String(seconds).padStart(2, '0') : '--', unit: 'Secs' },
  ];

  return (
    <div aria-live="polite">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-electric-glow">
        {isLive ? 'The workshop is live' : label}
      </p>
      <div className="mt-3 flex justify-center gap-2.5">
        {boxes.map((b) => (
          <div
            key={b.unit}
            className="min-w-16 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-2.5 text-center backdrop-blur-sm"
          >
            <p className="font-display text-2xl font-bold tabular-nums text-white sm:text-3xl">
              {b.value}
            </p>
            <p className="mt-0.5 text-[0.6rem] font-medium uppercase tracking-widest text-white/50">
              {b.unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentTestimonialsSection({ testimonials }: { testimonials: TestimonialItem[] }) {
  const { ref, visible } = useReveal();
  return (
    <section className="bg-ink px-5 py-20 text-center text-white sm:px-10 sm:py-32 sm:text-left">
      <div ref={ref} className="mx-auto max-w-7xl">
        <p className="eyebrow reveal text-white/50" data-visible={visible}>
          <span className="inline-flex items-center gap-2">
            <Quote className="h-3.5 w-3.5 text-electric-glow" /> Student feedback
          </span>
        </p>
        <h2
          className="reveal mt-5 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[0.95]"
          data-visible={visible}
          style={{ transitionDelay: '90ms' }}
        >
          Results speak <span className="text-gradient-electric">louder.</span>
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {testimonials.slice(0, 4).map((t, idx) => (
            <figure
              key={`${t.name}-${idx}`}
              className="reveal overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] text-left"
              data-visible={visible}
              style={{ transitionDelay: `${170 + idx * 80}ms` }}
            >
              {t.mediaUrl ? (
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={t.mediaUrl}
                    alt={`${t.name} program feedback`}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-80"
                  />
                  {t.mediaType === 'video' ? (
                    <span className="glass-dark absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md">
                      <Play className="h-5 w-5 fill-current" />
                    </span>
                  ) : null}
                </div>
              ) : null}
              <div className="p-6">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: t.rating }).map((_, sIdx) => (
                    <Star key={sIdx} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-base leading-relaxed text-white/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm text-white/50">
                  <span className="font-semibold text-white">{t.name}</span>
                  <span className="block">{t.role}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function HighlightedTitle({ title }: { title: string }) {
  return (
    <>
      {title.split(/(AI\s*Agents?)/i).map((part, idx) =>
        /^AI\s*Agents?$/i.test(part) ? (
          <span key={idx} className="text-electric-glow">
            {part}
          </span>
        ) : (
          <span key={idx}>{part}</span>
        )
      )}
    </>
  );
}

export function ProgramDetailPage() {
  const { programId = '' } = useParams();
  const { program, isLoading } = useProgram(programId);
  const { programs } = usePrograms();
  const [contactOpen, setContactOpen] = useState(false);

  if (!program) {
    return (
      <div id="top" className="min-h-screen bg-paper">
        <NoticeBar />
        <Header />
        <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-center text-white/70">
          {isLoading ? 'Loading…' : 'This program is no longer available.'}
        </main>
      </div>
    );
  }

  const seatsLeft = program.totalSeats - program.filledSeats;
  const membership = getRequiredMembership(program);
  const isFull = seatsLeft <= 0 && !program.ctaLink;
  const pct = Math.min(100, Math.round((program.filledSeats / program.totalSeats) * 100));
  const otherPrograms = programs.filter((p) => p.id !== program.id).slice(0, 3);
  const whatsappText = program.whatsappText ?? `Hi, I want to know more about ${program.title}.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;

  const discountPct = program.originalPrice
    ? Math.max(
        0,
        Math.round(
          (1 -
            Number(program.price.replace(/[^\d]/g, '')) /
              Number(program.originalPrice.replace(/[^\d]/g, ''))) *
            100
        )
      )
    : 0;

  const testimonials = program.testimonials ?? [];
  const heroWistia = program.heroWistia;
  const isRaipur = program.id === 'ai-agents-masterclass-raipur';

  const handleCtaClick = () => {
    trackConversion('program_cta', program.id);
    if (program.ctaLink) {
      window.open(program.ctaLink, '_blank', 'noopener,noreferrer');
      return;
    }
    setContactOpen(true);
  };

  return (
    <div id="top" className="min-h-screen bg-paper">
      <NoticeBar />
      <Header />
      <main className="program-detail overflow-hidden pb-20">
        {/* Hero */}
        <section className="program-hero relative isolate bg-ink pt-44 text-primary-foreground sm:pt-52">
          <div className="program-hero-container relative mx-auto max-w-7xl px-8 pb-20 sm:px-16 lg:px-20 lg:pb-24">
            {program.countdownTo && !isRaipur ? (
              <div className="mb-12 flex justify-center">
                <CountdownTimer target={program.countdownTo} />
              </div>
            ) : null}

            <div className="program-hero-grid lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(25rem,0.92fr)] lg:items-center lg:gap-x-16">
              <div className="program-heading text-center lg:col-start-2 lg:row-start-1 lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                  <Youtube className="h-4 w-4 text-electric-glow" />
                  10,00,000 Subscribers
                </span>
                <h1 className="mx-auto mt-6 max-w-5xl font-display text-[clamp(2.1rem,7.5vw,3.5rem)] font-bold leading-[1.05] text-white lg:mx-0 lg:text-[clamp(2.75rem,4vw,4rem)]">
                  <HighlightedTitle title={program.title} />
                </h1>
                {membership && (
                  <p className="mt-4 text-sm font-medium text-primary-foreground">
                    Requires {membership} membership
                  </p>
                )}
                <div className="mt-7 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                  {(
                    program.capsules ?? [
                      program.duration,
                      'Lifetime access',
                      'English language',
                      'Self-paced',
                    ]
                  ).map((cap) => (
                    <span
                      key={cap}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-white/80 sm:text-sm"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-electric-glow" />
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div className="program-media mt-12 max-w-5xl sm:mt-14 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:self-center">
                <div className="rounded-lg border border-primary-foreground/10 bg-primary-foreground/[0.04] p-1 shadow-[var(--shadow-float)]">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    {heroWistia ? (
                      <WistiaPlayer
                        mediaId={heroWistia}
                        aspect="1.7777777777777777"
                        eager={!isRaipur}
                        clickToLoad={isRaipur}
                        poster={program.bannerImage}
                        className="h-full w-full"
                      />
                    ) : program.heroVideo ? (
                      <video
                        src={program.heroVideo}
                        poster={program.heroPoster}
                        controls
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover"
                        aria-label={`${program.title} introduction video`}
                      />
                    ) : (
                      <div
                        className="grid h-full place-items-center"
                        style={{ background: program.bannerGradient }}
                      >
                        <Play className="h-12 w-12 fill-current" />
                      </div>
                    )}
                  </div>
                </div>
                {isRaipur && program.countdownTo ? (
                  <div className="mt-6">
                    <CountdownTimer target={program.countdownTo} />
                  </div>
                ) : null}
              </div>

              <div className="program-enrollment mt-5 grid items-end gap-10 sm:mt-6 lg:col-start-2 lg:row-start-2 lg:mt-8 lg:block">
                <div className="program-summary text-center lg:text-left">
                  {program.summary ? (
                    <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/65 lg:mx-0">
                      {program.summary}
                    </p>
                  ) : null}
                </div>
                <div className="program-purchase min-w-64 text-center lg:mt-7 lg:text-left">
                  <div className="flex flex-wrap items-end justify-center gap-3 lg:justify-start">
                    {program.originalPrice ? (
                      <span className="font-display text-xl font-medium text-white/40 line-through sm:text-2xl">
                        {program.originalPrice}
                      </span>
                    ) : null}
                    <span className="font-display text-3xl font-semibold text-white sm:text-4xl">
                      {program.price}
                    </span>
                    {discountPct > 0 ? (
                      <span className="mb-1 inline-flex items-center rounded-full bg-electric px-2.5 py-1 text-xs font-bold text-white sm:text-sm">
                        {discountPct}% OFF
                      </span>
                    ) : null}
                  </div>
                  <Button
                    onClick={handleCtaClick}
                    disabled={isFull}
                    className="mt-5 h-auto w-full px-8 py-4 text-base font-semibold text-white transition-transform duration-500 hover:scale-[1.02]"
                    style={isFull ? undefined : { background: 'var(--gradient-electric)' }}
                  >
                    {isFull ? 'All seats are full' : program.ctaText ?? 'Join the Program'}
                    {isFull ? null : <ArrowRight className="h-5 w-5" />}
                  </Button>
                  <div className="mt-5 flex items-center justify-between gap-4 text-xs text-white/55">
                    <span>
                      <Users className="mr-1 inline h-3.5 w-3.5 text-electric-glow" />
                      {isFull ? 'Next batch waitlist' : `${seatsLeft} seats left`}
                    </span>
                    <span>
                      {program.filledSeats}/{program.totalSeats} filled
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-electric"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="program-proof mt-10 grid grid-cols-4 gap-2 sm:gap-6 lg:col-start-2 lg:row-start-3 lg:mt-8 lg:gap-3">
                {[
                  { value: '10 Lakh+', label: 'Followers' },
                  { value: '25,000+', label: 'Students' },
                  { value: '500+', label: 'Trainings' },
                  { value: '10+', label: 'Experience' },
                ].map((stat) => (
                  <div key={stat.label} className="min-w-0 text-center lg:text-left">
                    <p className="font-display text-base font-bold tracking-tight text-white sm:text-2xl lg:text-xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[0.6rem] leading-snug text-white/45 sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SpeakerLogos title={isRaipur ? 'Trained at' : undefined} />

        {/* Inside the program */}
        <section className="program-inside bg-paper px-5 py-20 sm:px-10 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow text-electric">Inside the program</p>
            <h2 className="mt-5 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[0.95] text-ink">
              What you’ll <span className="text-muted-foreground">learn.</span>
            </h2>
            <div className="mt-8 overflow-hidden rounded-xl">
              <img
                src={program.bannerImage ?? ASSETS.heroStage}
                alt={
                  program.bannerImage
                    ? program.title
                    : 'Lakshit Sethiya on stage during a live AI training session'
                }
                loading="lazy"
                decoding="async"
                className="aspect-video w-full object-cover"
              />
            </div>
            <ul className="mt-10 grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2">
              {(program.curriculum ?? []).map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 bg-card p-5 text-sm text-ink sm:p-6"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex justify-center">
              <Button
                onClick={handleCtaClick}
                disabled={isFull}
                className="h-auto w-full px-8 py-4 text-sm font-semibold sm:w-auto"
              >
                {isFull ? 'All seats are full' : program.ctaText}
                {!isFull && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </section>

        {/* Audience (non-Raipur position) */}
        {!isRaipur && program.audience?.length ? (
          <section className="bg-secondary px-5 py-20 sm:px-10 sm:py-28">
            <div className="mx-auto max-w-7xl">
              <p className="eyebrow text-electric">Made for you</p>
              <h2 className="mt-5 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[0.95] text-ink">
                Who is this <span className="text-muted-foreground">for?</span>
              </h2>
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {program.audience.map((aud, idx) => {
                  const Icon = AUDIENCE_ICONS[idx % AUDIENCE_ICONS.length] ?? Users;
                  return (
                    <div
                      key={aud}
                      className="flex items-center gap-4 rounded-xl border border-border bg-card p-5"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-electric/10 text-electric">
                        <Icon className="h-5 w-5" />
                      </span>
                      <p className="text-sm font-semibold text-ink">{aud}</p>
                    </div>
                  );
                })}
              </div>
              <p className="mt-8 text-sm text-muted-foreground">
                And anyone who wants to learn how AI can create real-world opportunities.
              </p>
            </div>
          </section>
        ) : null}

        {/* Video feedback */}
        {isRaipur ? <RaipurReviewsSection /> : <VideoFeedback programId={program.id} />}

        {/* Written testimonials */}
        {testimonials.length ? <StudentTestimonialsSection testimonials={testimonials} /> : null}

        {/* Photo gallery */}
        {program.gallery?.length ? (
          <section className="bg-paper px-5 py-20 sm:px-10 sm:py-32">
            <div className="mx-auto max-w-7xl">
              <p className="eyebrow text-muted-foreground">From the room</p>
              <h2 className="mt-5 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[0.95] text-ink">
                Where the work comes alive.
              </h2>
              <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
                {program.gallery.map((img) => (
                  <figure key={img.alt} className={`overflow-hidden rounded-lg ${img.ratio}`}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] hover:scale-[1.05]"
                    />
                  </figure>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* About the founder */}
        <section className="bg-ink px-5 py-20 text-white sm:px-10 sm:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="overflow-hidden rounded-xl">
              <img
                src={ASSETS.heroStatsPortrait}
                alt="Lakshit Sethiya, award-winning AI business consultant"
                loading="lazy"
                className="aspect-4/5 h-full w-full object-cover object-center"
              />
            </div>
            <div className="text-center lg:text-left">
              <p className="eyebrow text-electric-glow">About the founder</p>
              <h2 className="mt-5 text-[clamp(2.3rem,6vw,4.5rem)] font-semibold leading-[0.95]">
                Lakshit Sethiya
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 lg:mx-0">
                Award-winning AI business consultant helping founders and teams turn AI into
                practical business systems. His training is shaped by 10+ years of experience and
                thousands of real learner outcomes.
              </p>
              <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
                {[
                  '10 Lakh+|Followers',
                  '25,000+|Students',
                  '500+|Trainings',
                  '10+|Years',
                ].map((item) => {
                  const [val, lbl] = item.split('|');
                  return (
                    <div key={item}>
                      <p className="font-display text-2xl font-bold">{val}</p>
                      <p className="mt-1.5 text-xs text-white/45">{lbl}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Raipur press coverage */}
        {isRaipur ? (
          <section className="bg-paper px-5 py-20 sm:px-10 sm:py-28">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="eyebrow text-electric">In the press</p>
                <h2 className="mt-5 text-4xl font-semibold leading-tight text-ink">
                  Media <span className="text-muted-foreground">reviews</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Raipur&apos;s newspapers have covered the workshop and the work behind it.
                </p>
              </div>
              <div className="mt-12 grid items-start gap-8 sm:grid-cols-2 lg:gap-12">
                <figure className="press-clip">
                  <div className="overflow-hidden rounded-lg border border-border bg-white shadow-[0_20px_60px_-30px_rgba(23,26,43,0.45)]">
                    <img
                      src={ASSETS.pressHaribhoomi}
                      alt="Haribhoomi newspaper coverage of the Raipur AI workshop"
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full object-contain"
                    />
                  </div>
                  <figcaption className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="h-px w-8 bg-electric/60" aria-hidden="true" />
                    Haribhoomi · Raipur Bhoomi · 29 Jun 2026 · Page 6
                  </figcaption>
                </figure>
                <figure className="press-clip">
                  <div className="overflow-hidden rounded-lg border border-border bg-white shadow-[0_20px_60px_-30px_rgba(23,26,43,0.45)]">
                    <img
                      src={ASSETS.pressDainikBhaskar}
                      alt="Dainik Bhaskar newspaper coverage of the Raipur AI workshop"
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full object-contain"
                    />
                  </div>
                  <figcaption className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="h-px w-8 bg-electric/60" aria-hidden="true" />
                    Dainik Bhaskar · Raipur · 25 Mar 2026
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>
        ) : null}

        {/* Raipur audience position */}
        {isRaipur && program.audience?.length ? (
          <section className="bg-secondary px-5 py-20 sm:px-10 sm:py-28">
            <div className="mx-auto max-w-7xl">
              <p className="eyebrow text-electric">Made for you</p>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-ink">
                Who is this <span className="text-muted-foreground">for?</span>
              </h2>
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {program.audience.map((aud, idx) => {
                  const Icon = AUDIENCE_ICONS[idx % AUDIENCE_ICONS.length] ?? Users;
                  return (
                    <div
                      key={aud}
                      className="flex items-center gap-4 rounded-lg border border-border bg-card p-5"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-electric/10 text-electric">
                        <Icon className="h-5 w-5" />
                      </span>
                      <p className="text-sm font-semibold text-ink">{aud}</p>
                    </div>
                  );
                })}
              </div>
              <p className="mt-8 text-sm text-muted-foreground">
                And anyone who wants to learn how AI can create real-world opportunities.
              </p>
            </div>
          </section>
        ) : null}

        {/* FAQs */}
        <section className="bg-paper px-5 py-20 sm:px-10 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="eyebrow text-electric">Questions, answered</p>
              <h2 className="mt-5 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[0.95] text-ink">
                Everything you need to decide.
              </h2>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {(program.faqs ?? []).map((faq) => (
                <details key={faq.question} className="group py-7">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-ink">
                    {faq.question}
                    <ChevronDown className="h-5 w-5 shrink-0 text-electric transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="max-w-2xl pt-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Other programs */}
        <section className="bg-secondary px-5 py-20 sm:px-10 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow text-muted-foreground">Continue learning</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:mt-5 sm:text-4xl">
              Other programs
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {otherPrograms.map((other) => (
                <Link
                  key={other.id}
                  to={`/programs/${other.id}`}
                  className="lift rounded-xl border border-border bg-card p-6"
                >
                  <p className="font-display text-lg font-semibold leading-snug text-ink">
                    {other.title}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {other.duration} · {other.price}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="program-final relative isolate overflow-hidden bg-ink px-5 py-24 text-center text-primary-foreground sm:px-10 sm:py-36">
          <div className="relative mx-auto max-w-4xl">
            <p className="eyebrow text-electric-glow">Your next step</p>
            <h2 className="mt-6 text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[0.92]">
              {program.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/60">{program.summary}</p>
            {program.programType === 'live' &&
            (program.eventDate || program.eventTime || program.location) ? (
              <p className="mt-5 text-sm text-white/70">
                {[program.eventDate, program.eventTime, program.location]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            ) : null}
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                onClick={handleCtaClick}
                disabled={isFull}
                className="h-auto px-8 py-4 text-base font-semibold text-white"
                style={isFull ? undefined : { background: 'var(--gradient-electric)' }}
              >
                {isFull ? 'All seats are full' : program.ctaText ?? 'Join the Program'}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto border-white/20 bg-white/[0.04] px-8 py-4 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => void trackConversion('whatsapp_click', program.id)}
                >
                  <MessageCircle className="h-5 w-5" /> Ask on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
        <StickyCta
          title={program.title}
          price={program.price}
          originalPrice={program.originalPrice}
          note={isFull ? 'Next batch waitlist' : `${seatsLeft} seats left`}
          label={
            isFull
              ? 'All seats are full'
              : isRaipur
              ? 'Register Now'
              : program.ctaText ?? 'Join now'
          }
          disabled={isFull}
          onClick={handleCtaClick}
        />
      </main>

      <footer className="bg-ink px-6 py-10 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-sm font-semibold text-white">Lakshit Sethiya</p>
          <p className="eyebrow text-white/35">Speaker & workshop portfolio · Raipur, India</p>
        </div>
      </footer>
    </div>
  );
}
