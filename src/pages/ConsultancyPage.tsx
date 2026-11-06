import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarClock,
  Check,
  ChevronDown,
  Clock,
  MessageCircle,
  MonitorPlay,
  Sparkles,
  Target,
  Wrench,
} from 'lucide-react';
import { trackConversion } from '@/lib/cms';
import { ASSETS } from '@/lib/assets';
import { Header, NoticeBar } from '@/components/NoticeBar';
import { VideoFeedback } from '@/components/VideoFeedback';
import { Button } from '@/components/ui/Button';

const WHATSAPP_NUMBER = '918370044449';
const CONSULTANCY_WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Lakshit%2C%20I'd%20like%20to%20book%20a%20private%20AI%20consultancy%20call.`;

const CONSULTANCY_PHOTOS = [
  {
    src: ASSETS.consultancyAward,
    alt: 'Lakshit Sethiya receiving the BUSINESSGARH award on stage',
    ratio: 'aspect-4/5',
  },
  {
    src: ASSETS.consultancySession,
    alt: 'Lakshit Sethiya at a BBM 2025 workshop session',
    ratio: 'aspect-9/16',
  },
];

const OUTCOMES = [
  {
    icon: Target,
    title: 'Personalized AI strategies',
    body: 'AI moves shaped to your business, audience, and revenue model — not generic advice.',
  },
  {
    icon: Wrench,
    title: 'AI tool suggestions',
    body: 'The exact stack of tools worth adopting now, with what to skip and why.',
  },
  {
    icon: Sparkles,
    title: 'AI implementation roadmap',
    body: 'A phased, 30-day plan your team can execute — sequenced for quick wins first.',
  },
];

const STEPS = [
  {
    title: 'Register now',
    body: 'Share your name and number. Apply CONSULT20 for 20% off if you have it.',
  },
  {
    title: 'Our team reaches out',
    body: 'Within working hours, we connect to lock the most suitable time for your call.',
  },
  {
    title: 'Join the Zoom call',
    body: 'A focused 1.5-hour session, screen-shared and interactive.',
  },
  {
    title: 'Get the recording',
    body: 'A full recording lands in your inbox so your team can revisit every detail.',
  },
];

const FAQS = [
  {
    question: 'How long is the consultancy call?',
    answer:
      'Around 1.5 hours — enough to diagnose, recommend, and map a roadmap without rushing.',
  },
  {
    question: 'Where does the call happen?',
    answer:
      'On Zoom. You get a calendar invite with the meeting link after our team confirms your slot.',
  },
  {
    question: 'Will I get a recording?',
    answer:
      'Yes. Every consultancy call is recorded and shared with you so you can revisit the strategies and roadmap.',
  },
  {
    question: 'How is the time slot decided?',
    answer:
      'Once you register, our team connects with you to share the most suitable time to conduct the consultancy call based on your availability.',
  },
  {
    question: 'Is there a discount available?',
    answer:
      'Yes. Apply the coupon code CONSULT20 at checkout for 20% off the consultancy fee.',
  },
  {
    question: 'What does the fee include?',
    answer:
      'The 1.5-hour private session, a personalized AI strategy and tool plan, an implementation roadmap, and the full recording. GST is added to the fee.',
  },
];

const TRACK_RECORD_STATS = [
  { value: '10 Lakh+', label: 'Followers' },
  { value: '25,000+', label: 'Students trained' },
  { value: '500+', label: 'Training sessions' },
  { value: '10+', label: 'Years of experience' },
];

const HONOURS = [
  { k: 'State honour', t: 'Honoured by the Chief Minister of Chhattisgarh' },
  { k: 'Industry recognition', t: 'Recognized by Ritesh Agarwal, Founder & CEO, OYO' },
  { k: 'Speaking stages', t: 'Trained audiences at IIT Indore, IIM Nagpur and more' },
  { k: 'Institutional awards', t: 'Multiple industry-body awards for AI education' },
];

export function ConsultancyPage() {
  return (
    <div id="top" className="overflow-hidden bg-paper">
      <NoticeBar />
      <Header />
      <main>
        <h1 className="sr-only">
          Book a private AI consultancy call with Lakshit Sethiya
        </h1>

        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-ink pt-36 text-white sm:pt-44">
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/4 h-[30rem] w-[30rem] rounded-full opacity-25 blur-[130px]"
            style={{ background: 'var(--gradient-electric)' }}
          />
          <div className="relative mx-auto max-w-7xl px-8 pb-20 sm:px-16 lg:px-20 lg:pb-28">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-electric-glow" />
                Private Consultancy
              </span>
              <h2 className="mx-auto mt-6 max-w-5xl font-display text-[clamp(2.1rem,7vw,4rem)] font-bold leading-[1.04] tracking-[-0.04em]">
                Book a Private consultancy call with{' '}
                <span className="text-gradient-electric">Mr. Lakshit Sethiya.</span>
              </h2>
              <div className="mt-7 flex flex-wrap justify-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm">
                  <Clock className="h-4 w-4 text-electric-glow" /> ~1.5 hours
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm">
                  <MonitorPlay className="h-4 w-4 text-electric-glow" /> Zoom call
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm">
                  <CalendarClock className="h-4 w-4 text-electric-glow" /> Recording included
                </span>
              </div>
              <div className="mt-9 flex justify-center">
                <Button
                  asChild
                  className="group h-auto gap-3 px-8 py-4 text-base font-semibold text-white shadow-[0_18px_50px_-18px_oklch(0.58_0.2_253/0.7)] transition-transform duration-500 hover:scale-[1.02]"
                  style={{ background: 'var(--gradient-electric)' }}
                >
                  <a
                    href={CONSULTANCY_WA_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => void trackConversion('consultancy_hero_cta')}
                  >
                    <CalendarClock className="h-5 w-5" />
                    Book Consultation Call
                    <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
              <div className="reveal mx-auto mt-10 w-full max-w-2xl" data-visible="true">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2 shadow-[0_40px_120px_-40px_oklch(0.14_0.012_260/0.75)] backdrop-blur-sm">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <video
                      src={ASSETS.heroIntroVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover"
                      aria-label="Lakshit Sethiya consultancy introduction video"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <VideoFeedback />

        {/* Outcomes */}
        <section className="bg-paper px-5 py-20 sm:px-10 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow text-electric">What the call covers</p>
            <h2 className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-ink">
              Three outcomes from one focused session.
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {OUTCOMES.map(({ icon: Icon, title, body }) => (
                <div key={title} className="lift rounded-xl border border-border bg-card p-7">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-electric/10 text-electric">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-paper px-5 py-20 sm:px-10 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow text-muted-foreground">How it works</p>
            <h2 className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-ink">
              From register to recording.
            </h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, idx) => (
                <div key={step.title} className="bg-card p-7">
                  <span className="eyebrow text-electric">0{idx + 1}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Track record */}
        <section className="bg-ink px-5 py-20 text-white sm:px-10 sm:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <figure
              className="reveal overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_40px_120px_-40px_oklch(0.14_0.012_260/0.75)]"
              data-visible="true"
            >
              <img
                src={ASSETS.heroStatsPortrait}
                alt="Lakshit Sethiya"
                loading="lazy"
                className="aspect-4/5 w-full object-cover"
              />
            </figure>
            <div>
              <p className="eyebrow text-electric-glow">Track record</p>
              <h2
                className="reveal mt-5 text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] font-semibold"
                data-visible="true"
              >
                A decade of building AI capability,{' '}
                <span className="text-gradient-electric">recognized publicly.</span>
              </h2>
              <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4">
                {TRACK_RECORD_STATS.map((s) => (
                  <div key={s.label} className="bg-ink px-5 py-6 text-center">
                    <p className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs text-white/50">{s.label}</p>
                  </div>
                ))}
              </div>
              <ul className="mt-8 space-y-4">
                {HONOURS.map((h) => (
                  <li
                    key={h.t}
                    className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <Check className="mt-1 h-4 w-4 shrink-0 text-electric-glow" />
                    <span>
                      <span className="eyebrow block text-white/45">{h.k}</span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-white/85">
                        {h.t}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* From the room */}
        <section className="bg-paper px-5 py-20 sm:px-10 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow text-muted-foreground">From the room</p>
            <h2 className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-ink">
              Where the work happens.
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {CONSULTANCY_PHOTOS.map((photo) => (
                <figure
                  key={photo.alt}
                  className={`overflow-hidden rounded-xl ${photo.ratio} bg-secondary`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] hover:scale-[1.04]"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-secondary px-5 py-20 sm:px-10 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow text-electric">Questions, answered</p>
              <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-ink">
                Everything you need to decide.
              </h2>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {FAQS.map((faq) => (
                <details key={faq.question} className="group py-6">
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

        {/* Final CTA */}
        <section className="relative isolate overflow-hidden bg-ink px-5 py-24 text-center text-white sm:px-10 sm:py-36">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full opacity-20 blur-[130px]"
            style={{ background: 'var(--gradient-electric)' }}
          />
          <div className="relative mx-auto max-w-4xl">
            <p className="eyebrow text-electric-glow">Your next step</p>
            <h2 className="mt-6 text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[0.95]">
              Private AI strategy, built around your business.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/60">
              ₹15,000 + GST for a 1.5-hour Zoom session — recording included. Use CONSULT20 for 20%
              off.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#top"
                className="group inline-flex items-center justify-center gap-2 rounded-md px-8 py-4 text-base font-semibold text-white transition-transform duration-500 hover:scale-[1.02]"
                style={{ background: 'var(--gradient-electric)' }}
              >
                Register Now
                <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
              </a>
              <Button
                asChild
                variant="outline"
                className="h-auto border-white/20 bg-white/[0.04] px-8 py-4 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <a
                  href={CONSULTANCY_WA_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => void trackConversion('whatsapp_click')}
                >
                  <MessageCircle className="h-5 w-5" /> Ask on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
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
          <p className="eyebrow text-white/35">Private AI consultancy · Raipur, India</p>
        </div>
      </footer>
    </div>
  );
}
