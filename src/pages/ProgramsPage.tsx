import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePrograms } from '@/lib/cms';
import { ASSETS } from '@/lib/assets';
import { validateProductSearch } from '@/lib/product-categories';
import { Header, NoticeBar } from '@/components/NoticeBar';
import { ProductCatalog } from '@/components/ProductCatalog';
import { ContactDialog } from '@/components/ContactDialog';
import { StickyCta } from '@/components/StickyCta';

export function ProgramsPage() {
  const [searchParams] = useSearchParams();
  const initialFilters = validateProductSearch({
    category: searchParams.get('category'),
    mode: searchParams.get('mode'),
    status: searchParams.get('status'),
  });
  const [contactOpen, setContactOpen] = useState(false);
  const { programs } = usePrograms();

  const openSeats = programs.reduce(
    (sum, p) => sum + Math.max(0, p.totalSeats - p.filledSeats),
    0
  );

  return (
    <div id="top" className="min-h-screen bg-paper">
      <NoticeBar />
      <Header />
      <main className="pb-24">
        <section className="relative isolate overflow-hidden bg-ink pt-32 pb-14 sm:pt-40 sm:pb-20">
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/4 h-[26rem] w-[26rem] rounded-full opacity-25 blur-[120px] sm:h-[38rem] sm:w-[38rem]"
            style={{ background: 'var(--gradient-electric)' }}
          />
          <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-6 sm:px-10 lg:grid-cols-2 lg:gap-12">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-electric-glow" />
                {openSeats} seats open right now
              </span>
              <h1 className="mt-4 font-display text-[clamp(1.75rem,5.5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white">
                <span className="block">AI programs that pay</span>
                <span className="block text-gradient-electric">for themselves.</span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/65 lg:mx-0">
                Live workshops and masterclasses with tools you use the same week. Limited seats per
                batch.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <a
                  href="#all-programs"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-md px-8 py-4 text-base font-semibold text-white transition-transform duration-500 hover:scale-[1.02] sm:w-auto"
                  style={{ background: 'var(--gradient-electric)' }}
                >
                  See all programs
                  <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-xl">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-2.5 backdrop-blur-sm">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                  <video
                    src={ASSETS.heroIntroVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={ASSETS.heroPortrait}
                    className="absolute inset-0 h-full w-full object-cover"
                    aria-label="Lakshit Sethiya programs introduction"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="all-programs" className="mx-auto max-w-7xl px-5 pt-16 sm:px-10">
          <ProductCatalog
            key={`${initialFilters.category}-${initialFilters.mode}-${initialFilters.status}`}
            programs={programs}
            initialFilters={initialFilters}
          />
          <div className="mt-16 flex flex-col items-center justify-center gap-4 rounded-3xl bg-ink px-6 py-12 text-center sm:py-16">
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Need a custom program for your team?
            </h2>
            <p className="max-w-md text-sm text-white/60 sm:text-base">
              Corporate batches, keynotes and private workshops can be shaped around your business
              problem.
            </p>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="group mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-transform duration-500 hover:scale-[1.02] cursor-pointer"
            >
              Contact Us
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </section>

        <StickyCta
          title="Choose your AI program"
          note={`${openSeats} seats open`}
          label="View programs"
          onClick={() =>
            document.querySelector('#all-programs')?.scrollIntoView({ behavior: 'smooth' })
          }
        />
        <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
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
