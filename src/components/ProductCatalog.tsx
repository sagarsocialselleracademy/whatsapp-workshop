import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MessageSquare, Star, Users } from 'lucide-react';
import type { Program } from '@/lib/cms';
import {
  DEFAULT_FILTERS,
  PRODUCT_CATEGORIES,
  WORKSHOP_MODES,
  WORKSHOP_STATUSES,
  filterPrograms,
  getRequiredMembership,
  type ProductFilters,
} from '@/lib/product-categories';
import { Button } from './ui/Button';

export function ProgramCard({ program }: { program: Program }) {
  const membership = getRequiredMembership(program);
  const seatsLeft = program.totalSeats - program.filledSeats;
  const isFull = seatsLeft <= 0 && !program.ctaLink;
  const pct = Math.min(100, Math.round((program.filledSeats / program.totalSeats) * 100));

  const cardClass =
    'glass lift group flex flex-col overflow-hidden rounded-3xl bg-card transition-transform duration-500 hover:scale-[1.015]';

  const content = (
    <>
      <div
        className="relative flex aspect-video items-center justify-center overflow-hidden"
        style={{ background: program.bannerGradient }}
      >
        {program.bannerImage ? (
          <img
            src={program.bannerImage}
            alt={program.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <>
            <div className="absolute inset-0 opacity-20" aria-hidden="true">
              <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/30 blur-2xl" />
              <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
            </div>
            <div className="relative z-10 scale-150 text-white/90">{program.icon}</div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl font-semibold leading-tight text-ink transition-colors group-hover:text-electric sm:text-2xl">
          {program.title}
        </h3>
        {membership && (
          <p className="mt-3 text-sm font-medium text-foreground">
            Requires {membership} membership
          </p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground sm:text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1">
            <Clock className="h-3.5 w-3.5" />
            {program.duration}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-amber-700">
            <Star className="h-3.5 w-3.5 fill-current" />
            {program.rating.toFixed(1)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" />
            {program.reviewsLabel ?? `${program.reviews.toLocaleString('en-IN')} reviews`}
          </span>
        </div>

        <p className="mt-5 font-display text-3xl font-semibold text-ink sm:text-4xl">
          {program.price}
        </p>

        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="flex items-center gap-1.5 font-medium text-ink">
              <Users className="h-4 w-4 text-electric" />
              {isFull ? 'All seats are full' : `${seatsLeft} seats left`}
            </span>
            <span className="text-muted-foreground">
              {program.filledSeats}/{program.totalSeats} filled
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                isFull ? 'bg-muted-foreground' : 'bg-electric'
              }`}
              style={{ width: `${pct}%` }}
              aria-hidden="true"
            />
          </div>
        </div>

        {isFull ? (
          <span
            aria-disabled="true"
            className="mt-6 block w-full cursor-not-allowed rounded-md bg-muted py-3.5 text-center text-sm font-semibold text-muted-foreground sm:py-3"
          >
            All seats are full
          </span>
        ) : (
          <span className="mt-6 block w-full rounded-md bg-ink py-3.5 text-center text-sm font-semibold text-white transition-transform duration-500 group-hover:scale-[1.015] sm:py-3">
            Join now
          </span>
        )}
      </div>
    </>
  );

  if (isFull) {
    return <div className={cardClass}>{content}</div>;
  }

  return (
    <Link to={`/programs/${program.id}`} className={cardClass}>
      {content}
    </Link>
  );
}

export function ProductCatalog({
  programs,
  initialFilters = DEFAULT_FILTERS,
}: {
  programs: Program[];
  initialFilters?: ProductFilters;
}) {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const filtered = filterPrograms(programs, filters);

  return (
    <div>
      <div className="mb-8 space-y-4 border-b border-border pb-6">
        <div className="flex flex-wrap gap-2" aria-label="Product categories">
          {['All', ...PRODUCT_CATEGORIES].map((cat) => (
            <Button
              key={cat}
              variant={filters.category === cat ? 'default' : 'outline'}
              aria-pressed={filters.category === cat}
              onClick={() => setFilters({ category: cat, mode: 'All', status: 'All' })}
            >
              {cat}
            </Button>
          ))}
        </div>

        {filters.category === 'Workshop' && (
          <>
            <div className="flex flex-wrap gap-2" aria-label="Workshop format">
              {['All', ...WORKSHOP_MODES].map((mode) => (
                <Button
                  key={mode}
                  variant={filters.mode === mode ? 'default' : 'outline'}
                  aria-pressed={filters.mode === mode}
                  onClick={() => setFilters({ ...filters, mode })}
                >
                  {mode === 'All' ? 'All workshops' : mode}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Workshop status">
              {['All', ...WORKSHOP_STATUSES].map((status) => (
                <Button
                  key={status}
                  variant={filters.status === status ? 'default' : 'ghost'}
                  aria-pressed={filters.status === status}
                  onClick={() => setFilters({ ...filters, status })}
                >
                  {status === 'All' ? 'All dates' : status}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>

      {filters.category === 'Personalized consultation' ? (
        <div className="border-b border-border py-8">
          <h3 className="font-display text-2xl text-foreground">
            Private consultation with Lakshit Sethiya
          </h3>
          <Button asChild className="mt-5">
            <Link to="/consultancy">Book consultation</Link>
          </Button>
        </div>
      ) : filtered.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>
      ) : (
        <p role="status" className="py-12 text-center text-muted-foreground">
          No products in this category yet.
        </p>
      )}
    </div>
  );
}
