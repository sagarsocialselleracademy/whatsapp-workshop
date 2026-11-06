import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Crown,
  Download,
  Expand,
  Gem,
  Globe,
  Instagram,
  Layers,
  Mail,
  MapPin,
  Phone,
  Play,
  Users,
  X,
  Youtube,
} from 'lucide-react';
import {
  GALLERY_PHOTOS,
  trackConversion,
  useMediaItems,
  usePrograms,
  useSiteSettings,
} from '@/lib/cms';
import { ASSETS } from '@/lib/assets';
import { Header, NoticeBar } from '@/components/NoticeBar';
import {
  VideoFeedback,
  WistiaPlayer,
  useCountUp,
  useReveal,
} from '@/components/VideoFeedback';
import { ProductCatalog } from '@/components/ProductCatalog';
import { ContactDialog } from '@/components/ContactDialog';
import { SpeakerLogos } from '@/components/SpeakerLogos';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent } from '@/components/ui/Dialog';

const YOUTUBE_CHANNEL = 'https://youtube.com/@Socialselleracademy';

const YOUTUBE_VIDEOS = [
  {
    id: 'VrfzwXI3Q9I',
    title: 'WhatsApp AI Agent Full Tutorial',
    tag: 'WhatsApp AI',
    fallback: ASSETS.fallbackKeynote,
  },
  {
    id: 'dDhjrEu8RCA',
    title: '10 Super AI Business Ideas',
    tag: 'AI Ideas',
    fallback: ASSETS.fallbackWorkshopRoom,
  },
  {
    id: 'HOh7lpszXNQ',
    title: 'This AI Assistant Will Pick Your Call',
    tag: 'AI Assistant',
    fallback: ASSETS.fallbackConsult,
  },
  {
    id: 'IrNmVz9_gmM',
    title: "Jio's Secret AI App for Social Media Automation",
    tag: 'Automation',
    fallback: ASSETS.fallbackWorkshopRoom,
  },
  {
    id: 'j76Khm01G_0',
    title: '10 Best AI Apps for Business',
    tag: 'AI Tools',
    fallback: ASSETS.fallbackConsult,
  },
  {
    id: 'zi28lsefx30',
    title: '10 AI Business Ideas for 2026',
    tag: 'AI Ideas',
    fallback: ASSETS.fallbackKeynote,
  },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IntroVideoModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-5xl border-white/10 bg-ink p-3 sm:p-4">
        {open && (
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <WistiaPlayer
              mediaId="o8h2007ji5"
              eager
              aspect="1.7777777777777777"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        )}
        <div className="mt-4 flex justify-center pb-1">
          <Button asChild size="lg" className="font-semibold">
            <a href="#programs" onClick={() => onOpenChange(false)}>
              Explore Workshops
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const MEMBERSHIP_MODAL_OPTIONS = [
  {
    name: 'Silver membership',
    text: 'Hi, I would like to become a silver member. Please share the details.',
  },
  {
    name: 'Golden membership',
    text: 'Hi, I would like to become a golden member. Please share the details.',
  },
  {
    name: 'Diamond membership',
    text: 'Hi, I would like to become a diamond member. Please share the details.',
  },
  {
    name: 'Platinum membership',
    text: 'Hi, I would like to become a platinum member. Please share the details.',
  },
];

function MembershipModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-3xl gap-0 overflow-hidden border-white/10 bg-ink p-0">
        {open && (
          <div className="relative aspect-video w-full">
            <WistiaPlayer
              mediaId="o8h2007ji5"
              eager
              aspect="1.7777777777777777"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        )}
        <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-6">
          {MEMBERSHIP_MODAL_OPTIONS.map((m) => (
            <Button
              key={m.name}
              asChild
              size="lg"
              className="h-auto w-full whitespace-normal px-4 py-3 text-center font-semibold text-white"
              style={{ background: 'var(--gradient-electric)' }}
            >
              <a
                href={`https://wa.me/918370044449?text=${encodeURIComponent(m.text)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackConversion('whatsapp_click');
                  onOpenChange(false);
                }}
              >
                {m.name}
              </a>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function HeroSection({ onContact }: { onContact: () => void }) {
  const { get } = useSiteSettings();
  const hero = get('hero');
  const stats = get('stats');
  const [videoOpen, setVideoOpen] = useState(false);
  const [membershipOpen, setMembershipOpen] = useState(false);

  return (
    <section className="relative isolate overflow-hidden bg-ink pt-[150px] sm:pt-[163px] lg:pt-[155px]">
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/4 h-[26rem] w-[26rem] rounded-full opacity-25 blur-[120px] sm:h-[38rem] sm:w-[38rem] sm:blur-[140px]"
        style={{ background: 'var(--gradient-electric)' }}
      />
      <div className="relative mx-auto max-w-7xl px-8 pb-14 pt-2 sm:px-16 lg:px-20 lg:pb-24 lg:pt-4">
        <div className="mx-auto max-w-3xl lg:max-w-5xl">
          <div className="text-center">
            <div
              className="reveal flex justify-center"
              data-visible="true"
              style={{ transitionDelay: '80ms' }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm">
                <Youtube className="h-4 w-4 text-electric-glow" />
                {hero.badge}
              </span>
            </div>

            <h1
              className="reveal mt-6 font-display text-[clamp(2.1rem,7.5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white"
              data-visible="true"
              style={{ transitionDelay: '180ms' }}
            >
              <span className="block">{hero.titleLine1}</span>
              <span className="block text-gradient-electric">{hero.titleLine2}</span>
            </h1>

            <div
              className="reveal mt-3 flex flex-nowrap justify-center gap-2 lg:gap-3"
              data-visible="true"
              style={{ transitionDelay: '260ms' }}
            >
              {hero.capsules.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center whitespace-nowrap rounded-full border border-white/12 bg-white/[0.06] px-3 py-2 text-sm font-medium text-white/80 backdrop-blur-sm lg:px-4"
                >
                  {c}
                </span>
              ))}
            </div>

            <div
              className="reveal mt-7 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
              data-visible="true"
              style={{ transitionDelay: '300ms' }}
            >
              <Button
                onClick={() => {
                  trackConversion('hero_cta');
                  onContact();
                }}
                className="group h-auto w-full gap-3 px-8 py-4 text-base font-semibold text-white shadow-[0_18px_50px_-18px_oklch(0.58_0.2_253/0.7)] transition-transform duration-500 hover:scale-[1.02] sm:w-auto"
                style={{ background: 'var(--gradient-electric)' }}
              >
                <WhatsAppIcon className="h-5 w-5" />
                {hero.ctaText}
                <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
              </Button>
              <Button
                onClick={() => setMembershipOpen(true)}
                variant="outline"
                className="hidden h-auto gap-2 border-white/20 bg-white/[0.04] px-8 py-4 text-base font-semibold text-white transition-transform duration-500 hover:scale-[1.02] hover:bg-white/[0.08] lg:inline-flex"
              >
                Buy Membership
              </Button>
            </div>

            <div className="mx-auto mt-7 hidden grid-cols-4 gap-3 lg:grid lg:max-w-xl">
              {stats.map((s, idx) => (
                <div
                  key={`desktop-${s.label}`}
                  className="reveal text-center"
                  data-visible="true"
                  style={{ transitionDelay: `${360 + idx * 70}ms` }}
                >
                  <p className="font-display text-2xl font-bold tracking-tight text-white">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-white/45">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Desktop Wistia player */}
            <div
              className="reveal mx-auto mt-8 hidden w-full max-w-[56rem] lg:block"
              data-visible="true"
              style={{ transitionDelay: '430ms' }}
            >
              <div className="rounded-[calc(var(--radius-xl)*0.8)] border border-white/10 bg-white/[0.04] p-2 shadow-[0_40px_120px_-40px_oklch(0.14_0.012_260/0.75)] backdrop-blur-sm">
                <div className="relative aspect-video w-full overflow-hidden rounded-[6.4px]">
                  <WistiaPlayer
                    mediaId="o8h2007ji5"
                    eager
                    aspect="1.7777777777777777"
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            </div>

            {/* Mobile video thumbnail */}
            <div
              className="reveal -mx-8 mt-7 w-[calc(100%+4rem)] sm:mx-auto sm:w-full sm:max-w-[46rem] lg:hidden"
              data-visible="true"
              style={{ transitionDelay: '360ms' }}
            >
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                aria-label="Play intro video"
                className="group relative block w-full overflow-hidden rounded-[calc(var(--radius-xl)*0.8)] border border-white/10 shadow-[0_40px_120px_-40px_oklch(0.14_0.012_260/0.75)]"
              >
                <img
                  src={ASSETS.seminarThumbnail}
                  alt="AI business seminar intro video thumbnail"
                  className="block aspect-video w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors duration-300 group-hover:bg-black/15">
                  <span
                    className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-[0_18px_50px_-18px_oklch(0.58_0.2_253/0.9)] transition-transform duration-300 group-hover:scale-105"
                    style={{ background: 'var(--gradient-electric)' }}
                  >
                    <Play className="h-7 w-7 fill-current" />
                  </span>
                </span>
              </button>
            </div>

            {/* Mobile stats */}
            <div className="mx-auto mt-7 grid grid-cols-4 gap-2 sm:gap-4 lg:hidden">
              {stats.map((s, idx) => (
                <div
                  key={s.label}
                  className="reveal text-center"
                  data-visible="true"
                  style={{ transitionDelay: `${400 + idx * 70}ms` }}
                >
                  <p className="font-display text-base font-bold tracking-tight text-white sm:text-xl lg:text-2xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[0.6rem] leading-snug text-white/45 sm:text-xs">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile swipeable gallery strip */}
        <div className="reveal mt-8 lg:hidden" data-visible="true">
          <div
            className="-mx-8 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-8 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Session photos — swipe to browse"
          >
            {GALLERY_PHOTOS.slice(0, 8).map((photo) => (
              <div
                key={photo.src}
                className="w-[80%] shrink-0 snap-center overflow-hidden rounded-xl border border-white/10 shadow-[0_30px_80px_-30px_oklch(0.14_0.012_260/0.75)]"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <IntroVideoModal open={videoOpen} onOpenChange={setVideoOpen} />
      <MembershipModal open={membershipOpen} onOpenChange={setMembershipOpen} />
    </section>
  );
}

function ProgramsSection() {
  const { ref, visible } = useReveal();
  const { programs } = usePrograms();
  const { get } = useSiteSettings();
  const words = get('sections').programsTitle.trim().split(' ');
  const lastWord = words.length > 1 ? words.pop() ?? '' : '';

  return (
    <section id="programs" className="bg-paper px-5 py-20 sm:px-10 sm:py-28">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="max-w-2xl text-center sm:text-left">
          <p className="eyebrow text-electric" data-visible={visible}>
            Programs
          </p>
          <h2
            className="reveal mt-4 text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] font-semibold text-ink"
            data-visible={visible}
            style={{ transitionDelay: '90ms' }}
          >
            {words.join(' ')} <span className="text-gradient-electric">{lastWord}</span>
          </h2>
        </div>
        <div className="mt-12">
          <ProductCatalog programs={programs} />
        </div>
      </div>
    </section>
  );
}

const MEMBERSHIPS = [
  {
    name: 'Silver',
    cta: 'Become a silver member',
    banner: ASSETS.membershipSilver,
    price: '₹999',
    icon: Layers,
    accent: 'text-muted-foreground',
    border: 'border-border',
    benefits: [
      'Recorded masterclass',
      'Lifetime access',
      'Multiple Sessions in 1 Membership',
      'Self-paced learning',
      'Hindi and English language',
      'No live session',
      'Upcoming live Sessions',
    ],
    note: 'Perfect for you if you are a beginner and exploring new opportunities.',
  },
  {
    name: 'Golden',
    cta: 'Become a gold member',
    banner: ASSETS.membershipGold,
    price: '₹9,999',
    icon: Crown,
    accent: 'text-gold',
    border: 'border-gold/50',
    benefits: [
      'Everything included in silver membership',
      'Step-by-step proper training',
      'Recorded course from beginner to advanced level',
      'Step-by-step execution',
      'Challenges and assignments',
      '2 Live Sessions by Lakshit Sethiya',
      'Dedicated support and doubt resolution',
    ],
  },
  {
    name: 'Diamond',
    cta: 'Become a diamond member',
    banner: ASSETS.membershipDiamond,
    price: '₹99,999',
    icon: Gem,
    accent: 'text-electric',
    border: 'border-electric/30',
    benefits: [
      'Everything included in gold membership',
      'Execution Service by Expert AI Team',
      'Personalized consultation call by Lakshit Sethiya',
      'Team Training after execution',
      'Dedicated support',
      'Exclusive prompt development',
      '3 Video Content creation',
      'Website development',
    ],
  },
  {
    name: 'Platinum',
    cta: 'Become a platinum member',
    banner: ASSETS.membershipPlatinum,
    price: '₹9,99,999',
    icon: BriefcaseBusiness,
    accent: 'text-foreground',
    border: 'border-foreground/30',
    benefits: [
      'Personal consultation for your business model',
      'Entire business setup built by our team',
      '20+ high-quality, winning advertisements',
      'Advertisements run for the next 6 months',
      'Team support for the next 6 months',
      'Landing page',
      'Your own AI system',
      'Dedicated YouTube and Instagram videos to promote in our community of around 10 lakh followers',
      'Private consultation by Lakshit Sethiya every week',
      'Designing, development and building AI systems',
      'Consulting, reporting, hand-holding and training',
      'Advertisement video creation and Meta ads setup',
    ],
    note: 'You just have to give your vision, and we will do the entire thing for you. Everything will be done by the Social Seller Academy team.',
    guarantee: 'The success is 100% guaranteed.',
  },
];

function MembershipsSection({ view = 'all' }: { view?: 'all' | 'details' | 'overview' }) {
  return (
    <section
      id={view === 'details' ? 'membership-details' : 'memberships'}
      aria-labelledby={view === 'details' ? undefined : 'memberships-title'}
      className="border-t border-border bg-paper px-5 py-16 sm:px-10 sm:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {view !== 'details' && (
          <>
            <h2
              id="memberships-title"
              className="font-display text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl"
            >
              Memberships
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6">
              {MEMBERSHIPS.map((m) => (
                <figure
                  key={m.name}
                  className={`min-w-0 overflow-hidden rounded-lg border bg-card ${m.border}`}
                >
                  <img
                    src={m.banner}
                    alt={`${m.name} membership banner`}
                    loading="lazy"
                    decoding="async"
                    width={1672}
                    height={941}
                    className="block h-auto w-full"
                  />
                </figure>
              ))}
            </div>
          </>
        )}

        {view !== 'overview' && (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {MEMBERSHIPS.map((m) => {
              const Icon = m.icon;
              return (
                <article
                  key={m.name}
                  id={`membership-${m.name.toLowerCase()}`}
                  aria-label={`${m.name} membership details`}
                  className={`flex min-w-0 scroll-mt-8 flex-col overflow-hidden rounded-lg border bg-card ${m.border}`}
                >
                  <img
                    src={m.banner}
                    alt={`${m.name} membership banner`}
                    loading="lazy"
                    decoding="async"
                    width={1672}
                    height={941}
                    className="block h-auto w-full"
                  />
                  <div className="flex flex-1 flex-col p-5 sm:p-8">
                    <div className="flex items-center gap-3">
                      <Icon aria-hidden="true" className={`h-5 w-5 shrink-0 ${m.accent}`} />
                      <h3 className="font-display text-2xl font-semibold text-foreground">
                        {m.name} membership
                      </h3>
                    </div>
                    <p className="mt-4 font-display text-4xl font-semibold text-foreground">
                      {m.price}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {m.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 text-sm leading-relaxed text-card-foreground"
                        >
                          <Check
                            aria-hidden="true"
                            className="mt-1 h-4 w-4 shrink-0 text-muted-foreground"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    {m.note && (
                      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{m.note}</p>
                    )}
                    {m.guarantee && (
                      <p className="mt-4 text-sm font-semibold text-foreground">{m.guarantee}</p>
                    )}
                    <div className="mt-auto pt-7">
                      <Button
                        asChild
                        size="lg"
                        className="h-auto min-h-12 w-full whitespace-normal px-4 py-3 text-center font-semibold"
                      >
                        <a
                          href={`https://wa.me/918370044449?text=${encodeURIComponent(
                            `Hi, I would like to become a ${m.name.toLowerCase()} member. Please share the details.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => void trackConversion('whatsapp_click')}
                        >
                          {m.cta}
                          <ArrowUpRight aria-hidden="true" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

const GLIMPSE_VIDEOS = ['7m8xx55de4', '8hdpwk5j4t', 'kd07suprf7'];

function GlimpseSection() {
  const { ref, visible } = useReveal();
  return (
    <section className="surface-ink overflow-hidden px-5 py-20 sm:px-10 sm:py-32">
      <div ref={ref} className="reveal mx-auto max-w-7xl" data-visible={visible}>
        <div className="text-center">
          <p className="eyebrow text-white/45">
            <span className="inline-flex items-center gap-2">
              <Play className="h-3.5 w-3.5 fill-electric text-electric" /> In action
            </span>
          </p>
          <h2 className="display-section mt-5 text-white" style={{ transitionDelay: '90ms' }}>
            Glimpse of <span className="text-gradient-electric">last program</span>
          </h2>
          <div className="mx-auto mt-8 h-px w-20 bg-white/20" style={{ transitionDelay: '150ms' }} />
        </div>

        <div className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
          {GLIMPSE_VIDEOS.map((id, idx) => (
            <div
              key={id}
              className="relative mx-auto w-full max-w-sm sm:max-w-none"
              style={{ transitionDelay: `${180 + idx * 120}ms` }}
            >
              <div
                className="absolute -inset-3 border border-white/10 sm:-inset-4"
                aria-hidden="true"
              />
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-ink shadow-[var(--shadow-float)]">
                <WistiaPlayer mediaId={id} aspect="0.5625" className="block h-full w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const { ref, visible } = useReveal();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { get } = useSiteSettings();
  const { data: extraMedia } = useMediaItems('gallery');

  const photos = [
    ...GALLERY_PHOTOS,
    ...(extraMedia ?? []).map((item) => ({
      src: item.url,
      alt: item.alt ?? item.title ?? 'AI training session',
      ratio: item.ratio ?? 'aspect-3/2',
    })),
  ];

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIndex]);

  return (
    <section id="gallery" className="bg-paper py-20 sm:py-36">
      <div ref={ref} className="mx-auto max-w-7xl px-5 text-center sm:px-10 sm:text-left">
        <div className="reveal mx-auto max-w-3xl sm:mx-0" data-visible={visible}>
          <p className="eyebrow text-muted-foreground">07 — From the room</p>
          <h2 className="mt-5 text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] font-semibold">
            {get('sections').galleryTitle}
          </h2>
        </div>

        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {photos.map((photo, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              aria-label={`Open image: ${photo.alt}`}
              className={`reveal group relative block w-full overflow-hidden rounded-lg ${photo.ratio}`}
              data-visible={visible}
              style={{ transitionDelay: `${idx * 90}ms` }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/30"
              />
              <Expand className="absolute right-4 bottom-4 h-5 w-5 translate-y-2 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      {selectedIndex !== null && photos[selectedIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/92 p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            aria-label="Close image viewer"
            className="absolute top-6 right-6 rounded-md border border-white/20 p-2.5 text-white transition-colors hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={photos[selectedIndex].src}
            alt={photos[selectedIndex].alt}
            className="max-h-[86vh] w-auto max-w-full rounded-2xl object-contain animate-in zoom-in-95 duration-500"
          />
        </div>
      )}
    </section>
  );
}

function TeamSection() {
  const { ref, visible } = useReveal();
  return (
    <section id="team" className="relative bg-ink py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-[100rem] px-4 sm:px-8">
        <div className="reveal mb-10 text-center" data-visible={visible}>
          <p className="eyebrow text-gold-soft">06 — The people behind it</p>
          <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[0.98] font-semibold text-white">
            Our Team.
          </h2>
        </div>
        <figure
          className="reveal relative overflow-hidden rounded-[2rem]"
          data-visible={visible}
        >
          <img
            src={ASSETS.teamPhoto}
            alt="The Lakshit Sethiya team — a group of specialists in AI training, automation and growth"
            loading="lazy"
            className="block h-auto w-full object-contain object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.14_0.012_260/0.4),transparent_30%,oklch(0.14_0.012_260/0.85))]"
          />
          <figcaption className="absolute inset-x-4 bottom-4 sm:inset-x-9 sm:bottom-9">
            <div className="glass-dark mx-auto max-w-2xl rounded-3xl p-7 text-center sm:mx-0 sm:p-9 sm:text-left">
              <p className="text-white/70">
                The specialists who make every training, automation and campaign happen.
              </p>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

const IMPACT_STATS = [
  {
    value: 25000,
    suffix: '+',
    label: 'People trained',
    note: 'Owners, founders, teams, students',
  },
  {
    value: 100,
    suffix: '+',
    label: 'Physical workshops',
    note: 'On-ground, in-room sessions',
  },
  {
    value: 10,
    suffix: ' Lakh+',
    label: 'Followers',
    note: 'Across platforms',
  },
  {
    value: 150000,
    suffix: '+',
    label: 'Club members',
    note: 'Super AI Mind Club',
  },
  {
    value: 1,
    suffix: ' Mn+',
    label: 'Monthly viewers',
    note: 'Every single month',
  },
  {
    value: 7,
    suffix: ' years',
    label: 'Teaching in public',
    note: 'Consistently, since day one',
  },
];

function ImpactSection() {
  const { ref, visible } = useReveal();
  return (
    <section id="impact" className="relative overflow-hidden bg-paper py-20 sm:py-36">
      <div ref={ref} className="mx-auto max-w-7xl px-5 text-center sm:px-10 sm:text-left">
        <div className="reveal mx-auto max-w-3xl sm:mx-0" data-visible={visible}>
          <p className="eyebrow text-muted-foreground">02 — Scale</p>
          <h2 className="mt-5 text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] font-semibold">
            Seven years of teaching this in public.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-border sm:grid-cols-2 lg:grid-cols-3">
          {IMPACT_STATS.map((stat, idx) => (
            <ImpactCard key={stat.label} {...stat} visible={visible} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactCard({
  value,
  suffix,
  label,
  note,
  visible,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  note: string;
  visible: boolean;
  index: number;
}) {
  const { ref, display } = useCountUp(value, 1700);
  return (
    <div
      className="reveal group relative bg-card px-8 py-12 text-center transition-colors duration-500 hover:bg-secondary sm:text-left"
      data-visible={visible}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <p className="font-display text-[clamp(2.5rem,5vw,3.6rem)] leading-none font-semibold">
        <span ref={ref}>{display.toLocaleString('en-IN')}</span>
        <span className="text-electric">{suffix}</span>
      </p>
      <p className="eyebrow mt-5">{label}</p>
      <p className="mt-2 text-sm text-muted-foreground">{note}</p>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-0 transition-[width] duration-700 group-hover:w-full"
        style={{ background: 'var(--gradient-electric)' }}
      />
    </div>
  );
}

function VideosSection() {
  const { ref, visible } = useReveal();
  return (
    <section id="videos" className="bg-paper px-5 py-20 text-center sm:px-10 sm:py-36 sm:text-left">
      <div ref={ref} className="mx-auto max-w-7xl">
        <p className="eyebrow reveal text-muted-foreground" data-visible={visible}>
          <span className="inline-flex items-center justify-center gap-2 sm:justify-start">
            <Youtube className="h-3.5 w-3.5 text-electric" /> On camera
          </span>
        </p>
        <div className="mt-5 flex flex-col flex-wrap items-center justify-between gap-6 sm:flex-row sm:items-end">
          <h2
            className="reveal max-w-2xl text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] font-semibold"
            data-visible={visible}
            style={{ transitionDelay: '90ms' }}
          >
            Watch the <span className="text-gradient-electric">work</span>
          </h2>
          <a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noreferrer"
            className="reveal group inline-flex w-full items-center justify-center gap-2 rounded-md bg-ink px-5 py-3 text-xs font-semibold text-white sm:w-auto"
            data-visible={visible}
            style={{ transitionDelay: '150ms' }}
          >
            Visit the channel
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {YOUTUBE_VIDEOS.map((video, idx) => (
            <YoutubeVideoCard key={video.title} video={video} visible={visible} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function YoutubeVideoCard({
  video,
  visible,
  index,
}: {
  video: (typeof YOUTUBE_VIDEOS)[number];
  visible: boolean;
  index: number;
}) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(
    video.id ? `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg` : video.fallback
  );

  return (
    <article
      className="reveal lift overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-lift)]"
      data-visible={visible}
      style={{ transitionDelay: `${200 + index * 80}ms` }}
    >
      <div className="relative aspect-video overflow-hidden bg-ink">
        {playing && video.id ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => (video.id ? setPlaying(true) : window.open(YOUTUBE_CHANNEL, '_blank'))}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play ${video.title}`}
          >
            <img
              src={thumb}
              onError={() => setThumb(video.fallback)}
              alt={video.title}
              loading="lazy"
              className="h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent,oklch(0.14_0.012_260/0.6))]" />
            <span className="glass-dark absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md transition-transform duration-500 group-hover:scale-110">
              <Play className="h-5 w-5 fill-white text-white" />
            </span>
          </button>
        )}
      </div>
      <div className="p-5">
        <p className="eyebrow text-electric">{video.tag}</p>
        <h3 className="mt-2 text-base leading-snug font-semibold">{video.title}</h3>
      </div>
    </article>
  );
}

const STAGE_NAMES = [
  'Jio Haptik',
  'IIT Indore',
  'IIM Nagpur',
  'Government of India',
  'Governor House',
  'ITM University',
  'JITO',
  'JCI',
];

const AUDIENCE_TYPES = [
  'Corporate L&D',
  'MSME clusters',
  'Trade bodies',
  'Chambers of Commerce',
  'Startup incubators',
  'B-school cohorts',
  'Government programmes',
  'Family business forums',
  'Founder communities',
];

function StagesSection() {
  const { ref, visible } = useReveal();
  const row1 = [...STAGE_NAMES, ...STAGE_NAMES];
  const row2 = [...row1].reverse();

  return (
    <section id="stages" className="bg-paper py-20 sm:py-36">
      <div ref={ref} className="mx-auto max-w-7xl px-5 text-center sm:px-10 sm:text-left">
        <div className="reveal mx-auto max-w-3xl sm:mx-0" data-visible={visible}>
          <p className="eyebrow text-muted-foreground">04 — Stages</p>
          <h2 className="mt-5 text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] font-semibold">
            Rooms this has already been delivered in.
          </h2>
        </div>
      </div>

      <div className="marquee-mask mt-16 overflow-hidden py-2" aria-hidden="true">
        <div className="flex w-max animate-marquee items-center gap-4">
          {row1.map((name, idx) => (
            <span
              key={`${name}-${idx}`}
              className="font-display rounded-2xl border border-border bg-card px-8 py-6 text-xl font-medium whitespace-nowrap text-muted-foreground transition-colors duration-500 hover:border-electric hover:text-ink sm:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="marquee-mask mt-4 overflow-hidden py-2" aria-hidden="true">
        <div className="flex w-max animate-marquee-slow items-center gap-4 [animation-direction:reverse]">
          {row2.map((name, idx) => (
            <span
              key={`r-${name}-${idx}`}
              className="font-display rounded-2xl bg-secondary px-8 py-6 text-xl font-medium whitespace-nowrap text-muted-foreground transition-colors duration-500 hover:text-ink sm:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <ul className="sr-only">
        {STAGE_NAMES.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <div className="mx-auto mt-16 max-w-7xl px-5 sm:px-10">
        <div
          className="reveal flex flex-wrap justify-center gap-2.5 sm:justify-start"
          data-visible={visible}
        >
          {AUDIENCE_TYPES.map((item, idx) => (
            <span
              key={item}
              className="reveal rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors duration-500 hover:border-ink hover:text-ink"
              data-visible={visible}
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              {item}
            </span>
          ))}
          <span className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white">
            100+ organisations
          </span>
        </div>
      </div>
    </section>
  );
}

const RECOGNITION_CARDS = [
  { t: 'Chief Minister of Chhattisgarh', k: 'State honour' },
  { t: 'Deputy Chief Minister', k: 'State honour' },
  { t: 'Ritesh Agarwal', k: 'Founder & CEO, OYO' },
  { t: 'Multiple industry bodies', k: 'Institutional awards' },
];

function RecognitionSection() {
  const { ref, visible } = useReveal();
  return (
    <section id="recognition" className="relative bg-ink py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-[100rem] px-4 sm:px-8">
        <figure
          className="reveal relative overflow-hidden rounded-[2rem]"
          data-visible={visible}
        >
          <img
            src={ASSETS.recognitionCm}
            alt="Lakshit Sethiya receiving a state honour from the Honourable Chief Minister of Chhattisgarh"
            loading="lazy"
            className="h-[70vh] min-h-[26rem] w-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.14_0.012_260/0.55),transparent_35%,oklch(0.14_0.012_260/0.9))]"
          />
          <div className="absolute top-6 left-6 flex items-center gap-2 sm:top-9 sm:left-9">
            <span
              className="eyebrow rounded-full px-4 py-2 text-ink"
              style={{ background: 'var(--gradient-gold)' }}
            >
              Recognition
            </span>
          </div>
          <figcaption className="absolute inset-x-4 bottom-4 sm:inset-x-9 sm:bottom-9">
            <div className="glass-dark mx-auto max-w-2xl rounded-3xl p-7 text-center sm:mx-0 sm:p-9 sm:text-left">
              <p className="eyebrow text-gold-soft">05 — State honour</p>
              <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[0.98] font-semibold text-white">
                Honoured by the Chief Minister of Chhattisgarh.
              </h2>
              <p className="mt-4 text-white/60">For seven years of AI education in public.</p>
            </div>
          </figcaption>
        </figure>

        <div className="mt-6 grid gap-px overflow-hidden rounded-3xl bg-white/10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4">
          {RECOGNITION_CARDS.map((card, idx) => (
            <div
              key={card.t}
              className="reveal group bg-ink px-7 py-8 transition-colors duration-500 hover:bg-ink-soft"
              data-visible={visible}
              style={{ transitionDelay: `${140 + idx * 90}ms` }}
            >
              <p className="eyebrow text-gold">{card.k}</p>
              <p className="mt-3 font-display text-xl font-medium text-white">{card.t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const AUDIENCE_CARDS = [
  {
    icon: Youtube,
    k: 'YouTube',
    t: '@Socialselleracademy',
    d: '1 Million+ monthly viewers',
    href: 'https://youtube.com/@Socialselleracademy',
  },
  {
    icon: Users,
    k: 'Community',
    t: 'Super AI Mind Club',
    d: '1,50,000+ members putting the systems to work',
    href: 'https://youtube.com/@Socialselleracademy',
  },
  {
    icon: Instagram,
    k: 'Instagram',
    t: '@socialseller_academy',
    d: '10 Lakh+ followers across platforms',
    href: 'https://instagram.com/socialseller_academy',
  },
  {
    icon: MapPin,
    k: 'Based in',
    t: 'Raipur, Chhattisgarh',
    d: 'Sessions across India and internationally',
    href: 'https://www.socialseller.in',
  },
];

function AudienceSection() {
  const { ref, visible } = useReveal();
  return (
    <section id="content" className="surface-ink relative overflow-hidden py-20 sm:py-36">
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 h-[28rem] w-[28rem] rounded-full opacity-20 blur-[150px]"
        style={{ background: 'var(--gradient-electric)' }}
      />
      <div ref={ref} className="relative mx-auto max-w-7xl px-5 text-center sm:px-10 sm:text-left">
        <div className="reveal mx-auto max-w-3xl sm:mx-0" data-visible={visible}>
          <p className="eyebrow text-white/45">08 — Audience</p>
          <h2 className="mt-5 text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] font-semibold text-white">
            A million business owners
            <br />
            watch this every month.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/60 sm:mx-0">
            Every workshop is built on what Indian business owners are struggling with right now.
          </p>
        </div>

        <div className="mt-14 grid gap-4 text-center sm:grid-cols-2 sm:text-left">
          {AUDIENCE_CARDS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={item.k}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="reveal group relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.04] p-8 transition-colors duration-500 hover:border-white/35"
                data-visible={visible}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-white/[0.06] opacity-0 transition-opacity duration-500 group-hover:animate-sheen group-hover:opacity-100"
                />
                <div className="relative flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-start">
                  <div className="min-w-0">
                    <p className="eyebrow text-electric-glow">{item.k}</p>
                    <p className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
                      {item.t}
                    </p>
                    <p className="mt-2 text-sm text-white/55">{item.d}</p>
                  </div>
                  <Icon className="h-6 w-6 shrink-0 text-white/35 transition-colors duration-500 group-hover:text-white" />
                </div>
                <span className="relative mt-8 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white/70 sm:justify-start">
                  {item.k === 'YouTube' ? <Play className="h-3.5 w-3.5" /> : null}
                  Open
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DownloadPortfolioButton({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  useEffect(() => {
    if (status !== 'loading') return;
    const t = setTimeout(() => setStatus('done'), 1400);
    return () => clearTimeout(t);
  }, [status]);

  useEffect(() => {
    if (status !== 'done') return;
    const t = setTimeout(() => setStatus('idle'), 2600);
    return () => clearTimeout(t);
  }, [status]);

  const isDark = tone === 'dark';

  return (
    <a
      href={ASSETS.portfolioPdf}
      download="Lakshit-Sethiya-Portfolio.pdf"
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => setStatus('loading')}
      className={`group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-md px-8 py-4 text-base font-semibold transition-transform duration-500 hover:scale-[1.02] sm:w-auto ${
        isDark
          ? 'border border-white/20 text-white hover:border-white/50'
          : 'border border-border text-ink hover:border-ink/40'
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 -z-0 transition-[width] duration-1000 ease-out ${
          isDark ? 'bg-white/10' : 'bg-secondary'
        }`}
        style={{ width: status === 'idle' ? '0%' : '100%' }}
      />
      <span className="relative z-10 flex items-center gap-2.5">
        {status === 'done' ? (
          <Check className="h-4 w-4" />
        ) : (
          <Download
            className={`h-4 w-4 transition-transform duration-500 ${
              status === 'loading' ? 'animate-bounce' : 'group-hover:translate-y-0.5'
            }`}
          />
        )}
        {status === 'done' ? 'Portfolio downloaded' : 'Download Portfolio'}
      </span>
    </a>
  );
}

function ContactSection({ onContact }: { onContact: () => void }) {
  const { ref, visible } = useReveal();
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-ink">
      <img
        src={ASSETS.heroStage}
        alt="Audience at an AI keynote, viewed from the stage"
        width={1920}
        height={1088}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.14_0.012_260/0.92),oklch(0.14_0.012_260/0.75))]"
      />
      <div
        ref={ref}
        className="relative mx-auto max-w-7xl px-5 py-24 text-center sm:px-10 sm:py-44 sm:text-left"
      >
        <div className="reveal mx-auto max-w-4xl sm:mx-0" data-visible={visible}>
          <p className="eyebrow text-white/45">09 — Work together</p>
          <h2 className="mt-6 text-[clamp(2.6rem,8vw,6rem)] leading-[0.92] font-semibold text-white">
            Let&apos;s build the AI system
            <br />
            <span className="text-gradient-electric">your people will use.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg text-white/65 sm:mx-0">
            Share your audience, date and objective — you get a session outline built for that room
            within two working days.
          </p>
          <div className="mt-10 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row sm:justify-start">
            <button
              type="button"
              onClick={onContact}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-7 py-4 text-sm font-semibold text-ink transition-transform duration-500 hover:scale-[1.02] sm:w-auto cursor-pointer"
            >
              Contact Us
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <DownloadPortfolioButton tone="dark" />
          </div>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-3">
          <ContactInfoTile
            icon={Mail}
            k="Email"
            v="socialsellertechnology@gmail.com"
            href="mailto:socialsellertechnology@gmail.com"
            visible={visible}
            delay={120}
          />
          <ContactInfoTile
            icon={Phone}
            k="Phone / WhatsApp"
            v="+91 83700 44449"
            href="tel:+918370044449"
            visible={visible}
            delay={210}
          />
          <ContactInfoTile
            icon={Globe}
            k="Website"
            v="www.socialseller.in"
            href="https://www.socialseller.in"
            visible={visible}
            delay={300}
          />
        </div>
      </div>
    </section>
  );
}

function ContactInfoTile({
  icon: Icon,
  k,
  v,
  href,
  visible,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  k: string;
  v: string;
  href: string;
  visible: boolean;
  delay: number;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer noopener"
      className="reveal group glass-dark px-7 py-8 transition-colors duration-500 hover:bg-white/10"
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="eyebrow flex items-center gap-2 text-white/45">
        <Icon className="h-3.5 w-3.5" />
        {k}
      </p>
      <p className="mt-3 truncate font-display text-lg font-medium text-white">{v}</p>
    </a>
  );
}

export function HomePage() {
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = () => setContactOpen(true);

  return (
    <div id="top" className="bg-paper">
      <NoticeBar />
      <Header />
      <main>
        <h1 className="sr-only">
          Lakshit Sethiya — AI Tech Consultant based in Raipur, India
        </h1>
        <HeroSection onContact={openContact} />
        <ProgramsSection />
        <MembershipsSection view="details" />
        <GlimpseSection />
        <VideoFeedback />
        <GallerySection />
        <TeamSection />
        <ImpactSection />
        <VideosSection />
        <SpeakerLogos />
        <StagesSection />
        <RecognitionSection />
        <AudienceSection />
        <ContactSection onContact={openContact} />
      </main>
      <footer className="bg-ink px-6 py-10 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-sm font-semibold text-white">Lakshit Sethiya</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60">
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/consultancy" className="hover:text-white">
              Consultancy
            </Link>
          </div>
          <p className="eyebrow text-white/35">Speaker & workshop portfolio · Raipur, India</p>
        </div>
      </footer>
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}
