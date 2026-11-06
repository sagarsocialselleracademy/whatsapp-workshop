import type { Program } from './cms';

export const PRODUCT_CATEGORIES = [
  'Workshop',
  'Course',
  'Service',
  'Personalized consultation',
  'Events',
] as const;

export const WORKSHOP_MODES = ['Offline workshop', 'Online Workshop'] as const;

export const WORKSHOP_STATUSES = ['Past workshop', 'Upcoming workshop', 'LIVE'] as const;

export interface ProductFilters {
  category: string;
  mode: string;
  status: string;
}

export const DEFAULT_FILTERS: ProductFilters = {
  category: 'All',
  mode: 'All',
  status: 'All',
};

export function validateProductSearch(search: Record<string, unknown>): ProductFilters {
  return {
    category: PRODUCT_CATEGORIES.find((c) => c === search.category) ?? 'All',
    mode: WORKSHOP_MODES.find((m) => m === search.mode) ?? 'All',
    status: WORKSHOP_STATUSES.find((s) => s === search.status) ?? 'All',
  };
}

export function getProductCategory(program: Program): string | undefined {
  if (program.programType === 'recorded') return 'Course';
  if (program.programType === 'live') return 'Workshop';
  return undefined;
}

export function getWorkshopMode(program: Program): string | undefined {
  const combined = `${program.location ?? ''} ${program.format ?? ''} ${program.capsule ?? ''}`;
  if (/zoom|online|virtual/i.test(combined)) return 'Online Workshop';
  if (/offline|in-person|premises|at your organization/i.test(combined)) return 'Offline workshop';
  return undefined;
}

function parseEventDate(dateStr: string): Date | null {
  if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
    const d = new Date(`${dateStr.slice(0, 10)}T12:00:00+05:30`);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const parsed = new Date(dateStr);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function getWorkshopStatus(program: Program, now: Date = new Date()): string | undefined {
  if (!program.eventDate) return undefined;
  const parsed = parseEventDate(program.eventDate);
  if (!parsed) return undefined;

  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const todayStr = fmt.format(now);
  const eventStr = fmt.format(parsed);

  if (eventStr < todayStr) return 'Past workshop';
  if (eventStr > todayStr) return 'Upcoming workshop';
  return 'LIVE';
}

export function filterPrograms(
  programs: Program[],
  filters: ProductFilters,
  now: Date = new Date()
): Program[] {
  return programs.filter(
    (p) =>
      (filters.category === 'All' || getProductCategory(p) === filters.category) &&
      (filters.mode === 'All' || getWorkshopMode(p) === filters.mode) &&
      (filters.status === 'All' || getWorkshopStatus(p, now) === filters.status)
  );
}

export function getRequiredMembership(program: Program): string | undefined {
  const map: Record<string, string> = {
    'ai-super-strategies': 'Silver',
    'ai-agents-masterclass': 'Golden',
    'corporate-ai-transformation': 'Silver',
    '15-profitable-ai-business-ideas': 'Silver',
  };
  if (map[program.id]) return map[program.id];
  const lower = program.title.toLowerCase();
  if (/whatsapp/.test(lower) && /marketing|automation/.test(lower)) return 'Golden';
  return undefined;
}
