import React, { useEffect, useState } from 'react';
import { Bot, Building2, GraduationCap, Sparkles } from 'lucide-react';
import { ASSETS } from './assets';

export interface GalleryItem {
  src: string;
  alt: string;
  ratio: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  rating: number;
  quote: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

export interface VideoTestimonialInput {
  name: string;
  program: string;
  url: string;
}

export interface Program {
  id: string;
  title: string;
  programType: 'live' | 'recorded';
  speaker?: string;
  summary?: string;
  price: string;
  originalPrice?: string;
  duration: string;
  rating: number;
  reviews: number;
  reviewsLabel?: string;
  totalSeats: number;
  filledSeats: number;
  bannerGradient: string;
  bannerImage?: string;
  heroVideo?: string;
  heroPoster?: string;
  heroWistia?: string;
  countdownTo?: string;
  capsule?: string;
  capsules?: string[];
  registeredLabel?: string;
  eventDay?: string;
  eventDate?: string;
  eventTime?: string;
  location?: string;
  format?: string;
  level?: string;
  ctaText?: string;
  ctaLink?: string;
  whatsappText?: string;
  audience?: string[];
  curriculum?: string[];
  outcomes?: string[];
  faqs?: FaqItem[];
  testimonials?: TestimonialItem[];
  videoTestimonials?: VideoTestimonialInput[];
  gallery?: GalleryItem[];
  icon?: React.ReactNode;
}

export interface ProgramRow {
  id: string;
  title: string;
  program_type: 'live' | 'recorded';
  published: boolean;
  sort_order: number;
  data: Partial<Program>;
}

export interface MediaItem {
  id: string;
  kind: 'gallery' | 'feedback_video' | 'review_screenshot' | 'marquee_logo';
  program_id: string | null;
  url: string;
  title: string | null;
  alt: string | null;
  ratio: string;
  sort_order: number;
}

export interface SiteSettings {
  notice_bar: {
    enabled: boolean;
    text: string;
    link: string;
  };
  logo: {
    url: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    capsules: string[];
    ctaText: string;
    videoUrl: string;
    portraitUrl: string;
  };
  stats: Array<{ value: string; label: string }>;
  sections: {
    programsTitle: string;
    feedbackTitle: string;
    galleryTitle: string;
  };
}

export const GALLERY_PHOTOS: GalleryItem[] = [
  {
    src: '/__l5e/assets-v1/17fb8fdf-1de6-4932-92c4-9419397e0deb/DSC_9537.jpg',
    alt: 'Lakshit Sethiya speaking at the CREDAI BANM AI in Real Estate event',
    ratio: 'aspect-2/3',
  },
  {
    src: '/__l5e/assets-v1/0831389a-0795-460e-95fc-7c94f0339346/DSC_9526.jpg',
    alt: 'Lakshit Sethiya seated with attendees at the CREDAI BANM event',
    ratio: 'aspect-3/2',
  },
  {
    src: '/__l5e/assets-v1/679e066f-ef49-4878-82be-9f272423f061/DSC_9864.jpg',
    alt: 'Lakshit Sethiya receiving an award on stage at the CREDAI BANM event',
    ratio: 'aspect-3/2',
  },
  {
    src: '/__l5e/assets-v1/12613d28-c1ed-47b3-8fec-2178f83cc90c/DSC_9811.jpg',
    alt: 'Lakshit Sethiya demonstrating AI tools at the CREDAI BANM event',
    ratio: 'aspect-3/2',
  },
  {
    src: '/__l5e/assets-v1/429cf078-b6c5-4189-bf0d-e7c31f1b82e6/session-audience.jpeg',
    alt: 'Lakshit Sethiya with attendees at a professional event',
    ratio: 'aspect-3/2',
  },
  {
    src: '/__l5e/assets-v1/326bc118-1b74-40e5-99f1-51d67a1972a8/panel-session.jpeg',
    alt: 'Lakshit Sethiya speaking during a live panel session',
    ratio: 'aspect-2/3',
  },
  {
    src: ASSETS.consultancyAward,
    alt: 'Recognised on stage with the BUSINESSGARH award',
    ratio: 'aspect-4/5',
  },
  {
    src: '/__l5e/assets-v1/a232834a-fa7c-4b1d-a5b0-35fe0df02031/youtube-award.jpeg',
    alt: 'Lakshit Sethiya holding his YouTube Creator Award',
    ratio: 'aspect-square',
  },
  {
    src: ASSETS.consultancySession,
    alt: 'Live AI workshop at BBM 2025',
    ratio: 'aspect-9/16',
  },
  {
    src: '/__l5e/assets-v1/e90c363d-d92a-42f3-adb8-c420f93e1431/aspire-3506.jpg',
    alt: 'Lakshit Sethiya presenting an AI & Automation Training session',
    ratio: 'aspect-3/2',
  },
  {
    src: '/__l5e/assets-v1/d697b1dc-feac-47c5-9c9b-cf886b23c1bf/aspire-3891.jpg',
    alt: 'Lakshit Sethiya delivering an AI training with a projection screen',
    ratio: 'aspect-3/2',
  },
  {
    src: '/__l5e/assets-v1/afb15c84-fa64-451b-a130-6e54d9a74466/seminar-podium.jpeg',
    alt: 'Lakshit Sethiya addressing a full auditorium from the podium',
    ratio: 'aspect-3/2',
  },
  {
    src: '/__l5e/assets-v1/cb73413e-ecde-43e3-93fe-f45030588b89/seminar-audience.jpeg',
    alt: 'Attendees at a Lakshit Sethiya AI seminar with learning materials',
    ratio: 'aspect-3/2',
  },
  {
    src: '/__l5e/assets-v1/65501a7f-64ec-4b54-9d56-13b91ca69191/seminar-applause.jpeg',
    alt: 'Lakshit Sethiya receiving a standing ovation from the seminar audience',
    ratio: 'aspect-3/2',
  },
  {
    src: '/__l5e/assets-v1/d9327b5b-4009-45dd-9a78-6f66de5d5e1e/dsc-06209.jpg',
    alt: 'Lakshit Sethiya presenting on prompt writing at a live AI training event',
    ratio: 'aspect-3/2',
  },
  {
    src: '/__l5e/assets-v1/0fd8ac32-2093-4fb9-92dc-0cecee43bc35/dsc-4306.jpg',
    alt: 'Lakshit Sethiya addressing a packed lecture hall from the stage',
    ratio: 'aspect-3/2',
  },
  {
    src: '/__l5e/assets-v1/3e09886c-036a-41a3-9d6e-1b5a048843a1/award-central-india.jpeg',
    alt: 'Lakshit Sethiya receiving an award at Central India Connect Marketplace 2024',
    ratio: 'aspect-3/2',
  },
  {
    src: '/__l5e/assets-v1/1eb3cb2f-9df6-4444-854a-082d599e5c0c/training-room-group.jpeg',
    alt: 'Lakshit Sethiya with a cohort of trainees after a hands-on workshop',
    ratio: 'aspect-3/2',
  },
  {
    src: '/__l5e/assets-v1/e0153b30-512d-4407-bf26-1c2b2f7548d6/office-group-chhattisgarh.jpeg',
    alt: 'Lakshit Sethiya with a professional group at a Chhattisgarh training session',
    ratio: 'aspect-3/2',
  },
  {
    src: '/__l5e/assets-v1/9eeaa20f-5684-45c2-9d6d-78fbd5831087/ya-startup-award.jpeg',
    alt: 'Lakshit Sethiya accepting the YA Startup Award 2023 on stage',
    ratio: 'aspect-square',
  },
  {
    src: '/__l5e/assets-v1/36833a42-6e72-417f-9fdf-78731a3fdae2/creator-commune.jpeg',
    alt: 'Lakshit Sethiya at the Creator Commune event',
    ratio: 'aspect-9/16',
  },
];

const PROGRAM_GALLERY_17 = GALLERY_PHOTOS.slice(4);

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: 'Who is this program for?',
    answer:
      'It is designed for founders, professionals, creators and business teams who want practical AI systems rather than theory.',
  },
  {
    question: 'Do I need technical experience?',
    answer:
      'No coding background is required. Every workflow is explained in plain language and demonstrated step by step.',
  },
  {
    question: 'Will I receive learning material?',
    answer:
      'Yes. Relevant templates, prompts and implementation resources are included with the program.',
  },
];

export const BUILTIN_PROGRAMS: Program[] = [
  {
    id: 'ai-super-strategies',
    title: '30 AI Super Strategies Workshop',
    price: '₹999',
    originalPrice: '₹10,000',
    duration: '3 hours',
    rating: 4.9,
    reviews: 128,
    totalSeats: 100,
    filledSeats: 61,
    bannerGradient: 'linear-gradient(135deg, oklch(0.45 0.18 260), oklch(0.65 0.2 245))',
    icon: <Sparkles className="h-10 w-10" />,
    heroVideo: ASSETS.heroIntroVideo,
    heroPoster: ASSETS.heroPortrait,
    bannerImage: ASSETS.bannerSuperStrategies,
    programType: 'live',
    capsule: 'Live program',
    registeredLabel: '450+ registered',
    eventDay: 'Saturday',
    eventDate: '20 Sep 2026',
    eventTime: '7:00 PM IST',
    location: 'Live on Zoom',
    ctaText: 'Reserve Your Seat',
    format: 'Live online workshop + recording',
    level: 'Beginner friendly',
    curriculum: [
      'The problem-first AI framework',
      '10 strategies for sales and lead generation',
      '10 strategies for content and personal brand',
      '10 strategies for internal operations',
      'Prompt library and tool stack handover',
      'Live Q&A with Lakshit',
    ],
    outcomes: [
      'A prioritised list of AI use-cases for your business',
      'A reusable prompt library',
      'Your first three automations mapped out',
    ],
    faqs: DEFAULT_FAQS,
    gallery: PROGRAM_GALLERY_17,
    testimonials: [
      {
        name: 'Rohit Agrawal',
        role: 'Founder, D2C brand',
        rating: 5,
        quote: 'Implemented four strategies the same week. Content output tripled.',
      },
      {
        name: 'Neha Jain',
        role: 'Sales head',
        rating: 5,
        quote: 'Zero fluff. Every strategy came with a live demo we could copy.',
      },
    ],
  },
  {
    id: 'ai-agents-masterclass',
    title: 'AI Agents Masterclass',
    price: '₹4,999',
    originalPrice: '₹19,999',
    duration: '6 hours',
    rating: 4.8,
    reviews: 96,
    totalSeats: 100,
    filledSeats: 71,
    bannerGradient: 'linear-gradient(135deg, oklch(0.35 0.16 270), oklch(0.55 0.18 255))',
    icon: <Bot className="h-10 w-10" />,
    heroVideo: ASSETS.heroIntroVideo,
    heroPoster: ASSETS.heroPortrait,
    bannerImage: ASSETS.bannerAgentsMasterclass,
    programType: 'live',
    capsule: 'Masterclass',
    registeredLabel: '450+ registered',
    eventDay: 'Sunday',
    eventDate: '21 Sep 2026',
    eventTime: '10:00 AM IST',
    location: 'Live on Zoom',
    ctaText: 'Join the Program',
    summary:
      'Build working AI agents end to end — from problem definition to a deployed assistant your team actually uses.',
    format: 'Hands-on cohort, build along',
    level: 'Intermediate',
    curriculum: [
      'Anatomy of a useful agent',
      'Choosing tools, memory and guardrails',
      'Build 1: support agent',
      'Build 2: research and reporting agent',
      'Connecting agents to WhatsApp and email',
      'Cost, safety and monitoring',
    ],
    outcomes: [
      'Two agents deployed and running',
      'A reusable agent blueprint',
      'Clear cost model per workflow',
    ],
    faqs: DEFAULT_FAQS,
    gallery: PROGRAM_GALLERY_17,
    testimonials: [
      {
        name: 'Amit Verma',
        role: 'Operations lead',
        rating: 5,
        quote: 'We replaced a 20-hour weekly report with an agent built in this class.',
      },
    ],
  },
  {
    id: 'corporate-ai-transformation',
    title: 'YouTube Growth Masterclass',
    price: '₹999',
    originalPrice: '₹49,999',
    duration: '1 day',
    rating: 4.9,
    reviews: 64,
    totalSeats: 100,
    filledSeats: 65,
    bannerGradient: 'linear-gradient(135deg, oklch(0.3 0.14 265), oklch(0.5 0.16 250))',
    icon: <Building2 className="h-10 w-10" />,
    heroVideo: ASSETS.heroIntroVideo,
    heroPoster: ASSETS.heroPortrait,
    bannerImage: ASSETS.bannerYoutubeGrowth,
    programType: 'live',
    capsule: 'Offline workshop',
    registeredLabel: '450+ registered',
    eventDay: 'On request',
    location: 'At your organization',
    ctaText: 'Join the Program',
    summary:
      'A full-day, in-person transformation sprint for leadership and department heads — strategy, roadmap and adoption plan.',
    format: 'In-person, on your premises',
    level: 'Leadership teams',
    curriculum: [
      'AI maturity audit across departments',
      'Opportunity mapping workshop',
      'Build vs buy decisions',
      'Data, risk and compliance basics',
      '12-month adoption roadmap',
      'Change management and team enablement',
    ],
    outcomes: [
      'Department-wise AI roadmap',
      'Prioritised pilot projects with owners',
      'Internal enablement plan',
    ],
    faqs: DEFAULT_FAQS,
    gallery: PROGRAM_GALLERY_17,
    testimonials: [
      {
        name: 'Sandeep Kothari',
        role: 'CXO, manufacturing group',
        rating: 5,
        quote: 'The clarity our leadership got in one day was worth months of debate.',
      },
    ],
  },
  {
    id: '15-profitable-ai-business-ideas',
    title: '15 Profitable AI Business Ideas',
    price: 'Price on request',
    duration: '3 hours',
    rating: 4.9,
    reviews: 250,
    reviewsLabel: '250+ reviews',
    totalSeats: 100,
    filledSeats: 85,
    bannerGradient: 'var(--gradient-ink)',
    icon: <Sparkles className="h-10 w-10" />,
    bannerImage: ASSETS.bannerProfitableIdeas,
    heroPoster: ASSETS.bannerProfitableIdeas,
    programType: 'recorded',
    ctaText: 'Enquire Now',
    gallery: PROGRAM_GALLERY_17,
  },
  {
    id: 'ai-agents-masterclass-raipur',
    title: "Raipur's 1st AI Agent Building Workshop",
    price: '₹1,999',
    originalPrice: '₹2,999',
    duration: '3 hours',
    rating: 4.8,
    reviews: 96,
    totalSeats: 60,
    filledSeats: 38,
    bannerGradient: 'linear-gradient(135deg, oklch(0.35 0.16 270), oklch(0.55 0.18 255))',
    icon: <Bot className="h-10 w-10" />,
    bannerImage: ASSETS.bannerAgentsRaipur,
    heroVideo: ASSETS.heroIntroVideo,
    heroPoster: ASSETS.heroPortrait,
    heroWistia: 'vkyh1m0b2d',
    countdownTo: '2026-10-25T10:00:00+05:30',
    programType: 'live',
    capsule: 'Offline workshop',
    capsules: ['25th October', 'Aarambh Incubation, Raipur', '10:00 AM - 2:00 PM', 'Limited Seats'],
    eventDay: 'Sunday',
    eventDate: '25 Oct 2026',
    eventTime: '10:00 AM - 2:00 PM IST',
    location: 'Aarambh Incubation, Raipur',
    format: 'Live practical workshop',
    level: 'Intermediate',
    ctaText: 'Reserve Your Seat',
    ctaLink: 'https://pages.razorpay.com/pl_TpO2inHnnScaJI/view',
    summary: '',
    audience: [
      'Business Owners',
      'Entrepreneurs',
      'Startup Founders',
      'Freelancers',
      'Agency Owners',
      'Marketing Professionals',
      'Consultants',
      'Local Businesses',
      'E-commerce Businesses',
    ],
    curriculum: [
      'How to build an AI agent for Social Media Management',
      'How to build an AI agent for Video generation',
      'AI agents for Marketing',
      'AI agent for lead qualifying and sales follow-up',
      'AI agent for WhatsApp automation',
      'AI agent for voice calling — and many more',
    ],
    outcomes: [
      'Two agents deployed and running',
      'A reusable agent blueprint',
      'Clear cost model per workflow',
    ],
    faqs: DEFAULT_FAQS,
    gallery: PROGRAM_GALLERY_17,
    testimonials: [
      {
        name: 'Amit Verma',
        role: 'Operations lead',
        quote: 'We replaced a 20-hour weekly report with an agent built in this class.',
        rating: 5,
      },
      {
        name: 'Neha Kothari',
        role: 'Boutique owner, Raipur',
        quote:
          'I built a WhatsApp follow-up agent during the workshop itself. My customer replies now go out in seconds, not hours.',
        rating: 5,
      },
      {
        name: 'Rohit Sharma',
        role: 'Marketing agency founder',
        quote: 'The lead-qualifying agent alone paid for the seat. Clear, practical and zero fluff.',
        rating: 5,
      },
      {
        name: 'Priya Jain',
        role: 'E-commerce seller',
        quote:
          'No coding background, yet I left with a working social-media agent. Best three hours I have spent on my business.',
        rating: 5,
      },
    ],
  },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  notice_bar: {
    enabled: true,
    text: '⚡ WhatsApp Marketing Workshop in Raipur (15th Nov, Sunday) • Offer ₹1,999',
    link: '/whatsapp-workshop',
  },
  logo: {
    url: '',
  },
  hero: {
    badge: '10 Lakh+ Followers',
    titleLine1: 'Launch AI Business',
    titleLine2: 'in Just 30 Days.',
    capsules: ['Workshop', 'Courses', 'Consultations'],
    ctaText: 'Get Free AI Course',
    videoUrl: '',
    portraitUrl: '',
  },
  stats: [
    { value: '10 Lakh+', label: 'Followers' },
    { value: '25,000+', label: 'Students' },
    { value: '500+', label: 'Trainings' },
    { value: '10+', label: 'Experience' },
  ],
  sections: {
    programsTitle: 'AI Training programs',
    feedbackTitle: 'Feedbacks & Reviews',
    galleryTitle: '100+ AI Training Sessions',
  },
};

const STORAGE_KEYS = {
  settings: 'ls_cms_site_settings_v1',
  programs: 'ls_cms_programs_v1',
  media: 'ls_cms_media_items_v1',
  views: 'ls_cms_page_views_v1',
  conversions: 'ls_cms_conversions_v1',
};

const CMS_CHANGE_EVENT = 'ls:cms-updated';

function notifyCmsChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(CMS_CHANGE_EVENT));
  }
}

function useCmsSubscription() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const handler = () => setTick((t) => t + 1);
    window.addEventListener(CMS_CHANGE_EVENT, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(CMS_CHANGE_EVENT, handler);
      window.removeEventListener('storage', handler);
    };
  }, []);
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    notifyCmsChange();
  } catch {
    // ignore storage quota errors
  }
}

function getDefaultProgramRows(): ProgramRow[] {
  return BUILTIN_PROGRAMS.map((p, idx) => {
    const { icon, ...rest } = p;
    return {
      id: p.id,
      title: p.title,
      program_type: p.programType ?? 'live',
      published: true,
      sort_order: idx,
      data: rest,
    };
  });
}

function hydrateProgramRow(row: ProgramRow): Program {
  const data = row.data ?? {};
  const builtin = BUILTIN_PROGRAMS.find((b) => b.id === row.id);
  return {
    ...builtin,
    ...data,
    id: row.id,
    title: row.title,
    programType: row.program_type ?? 'live',
    price: data.price ?? builtin?.price ?? '',
    duration: data.duration ?? builtin?.duration ?? '',
    rating: Number(data.rating ?? builtin?.rating ?? 5),
    reviews: Number(data.reviews ?? builtin?.reviews ?? 0),
    totalSeats: Number(data.totalSeats ?? builtin?.totalSeats ?? 100),
    filledSeats: Number(data.filledSeats ?? builtin?.filledSeats ?? 0),
    bannerGradient:
      data.bannerGradient ||
      builtin?.bannerGradient ||
      'linear-gradient(135deg, oklch(0.45 0.18 260), oklch(0.65 0.2 245))',
    icon: builtin?.icon ?? <GraduationCap className="h-10 w-10" />,
  };
}

export function findBuiltinProgram(id: string): Program | undefined {
  return BUILTIN_PROGRAMS.find((p) => p.id === id);
}

export function useSiteSettings() {
  useCmsSubscription();
  const stored = readJson<Partial<SiteSettings>>(STORAGE_KEYS.settings, {});

  function get<K extends keyof SiteSettings>(key: K): SiteSettings[K] {
    const val = stored[key];
    if (val == null) return DEFAULT_SETTINGS[key];
    if (Array.isArray(DEFAULT_SETTINGS[key])) {
      return (Array.isArray(val) && val.length ? val : DEFAULT_SETTINGS[key]) as SiteSettings[K];
    }
    return { ...DEFAULT_SETTINGS[key], ...(val as object) } as SiteSettings[K];
  }

  return { data: stored, isLoading: false, get };
}

export async function upsertSiteSetting<K extends keyof SiteSettings>(
  key: K,
  value: SiteSettings[K]
) {
  const current = readJson<Partial<SiteSettings>>(STORAGE_KEYS.settings, {});
  writeJson(STORAGE_KEYS.settings, { ...current, [key]: value });
}

export function usePrograms() {
  useCmsSubscription();
  const rows = readJson<ProgramRow[]>(STORAGE_KEYS.programs, getDefaultProgramRows());
  const sorted = [...rows].sort((a, b) => a.sort_order - b.sort_order);
  const published = sorted.filter((r) => r.published).map(hydrateProgramRow);
  const programs = published.length ? published : BUILTIN_PROGRAMS;
  return { data: sorted, rows: sorted, programs, isLoading: false };
}

export function useAdminPrograms() {
  useCmsSubscription();
  const rows = readJson<ProgramRow[]>(STORAGE_KEYS.programs, getDefaultProgramRows());
  const sorted = [...rows].sort((a, b) => a.sort_order - b.sort_order);
  return { data: sorted, isLoading: false };
}

export function useProgram(id: string) {
  const { programs, isLoading } = usePrograms();
  return {
    program: programs.find((p) => p.id === id) ?? null,
    isLoading,
  };
}

export async function upsertProgram(row: ProgramRow) {
  const rows = readJson<ProgramRow[]>(STORAGE_KEYS.programs, getDefaultProgramRows());
  const idx = rows.findIndex((r) => r.id === row.id);
  if (idx >= 0) {
    rows[idx] = row;
  } else {
    rows.push(row);
  }
  writeJson(STORAGE_KEYS.programs, rows);
}

export async function deleteProgram(id: string) {
  const rows = readJson<ProgramRow[]>(STORAGE_KEYS.programs, getDefaultProgramRows());
  writeJson(
    STORAGE_KEYS.programs,
    rows.filter((r) => r.id !== id)
  );
}

export function useMediaItems(kind: MediaItem['kind'], programId?: string | null) {
  useCmsSubscription();
  const all = readJson<MediaItem[]>(STORAGE_KEYS.media, []);
  const filtered = all
    .filter((item) => {
      if (item.kind !== kind) return false;
      if (programId) {
        return item.program_id === programId || item.program_id === null;
      }
      return item.program_id === null;
    })
    .sort((a, b) => a.sort_order - b.sort_order);

  return { data: filtered, isLoading: false };
}

export function useAllMediaItems() {
  useCmsSubscription();
  const all = readJson<MediaItem[]>(STORAGE_KEYS.media, []);
  return { data: all, isLoading: false };
}

export async function insertMediaItem(item: Omit<MediaItem, 'id'>) {
  const all = readJson<MediaItem[]>(STORAGE_KEYS.media, []);
  const newItem: MediaItem = {
    ...item,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  };
  writeJson(STORAGE_KEYS.media, [...all, newItem]);
}

export async function deleteMediaItem(id: string) {
  const all = readJson<MediaItem[]>(STORAGE_KEYS.media, []);
  writeJson(
    STORAGE_KEYS.media,
    all.filter((m) => m.id !== id)
  );
}

export async function uploadMediaFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Upload failed'));
    reader.readAsDataURL(file);
  });
}

function getSessionId(): string | null {
  if (typeof window === 'undefined') return null;
  let sid = window.localStorage.getItem('ls_sid');
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    window.localStorage.setItem('ls_sid', sid);
  }
  return sid;
}

function extractProgramIdFromPath(path: string): string | null {
  const m = /^\/programs\/([^/?#]+)/.exec(path);
  return m ? m[1] : null;
}

export interface PageViewRecord {
  path: string;
  program_id: string | null;
  session_id: string | null;
  created_at: string;
}

export interface ConversionRecord {
  path: string;
  kind: string;
  program_id: string | null;
  session_id: string | null;
  created_at: string;
}

export async function trackPageView(path: string) {
  if (typeof window === 'undefined') return;
  try {
    const views = readJson<PageViewRecord[]>(STORAGE_KEYS.views, []);
    views.push({
      path,
      program_id: extractProgramIdFromPath(path),
      session_id: getSessionId(),
      created_at: new Date().toISOString(),
    });
    window.localStorage.setItem(STORAGE_KEYS.views, JSON.stringify(views.slice(-2000)));
  } catch {
    // ignore
  }
}

export async function trackConversion(kind: string, programId?: string) {
  if (typeof window === 'undefined') return;
  const path = window.location.pathname;
  try {
    const conversions = readJson<ConversionRecord[]>(STORAGE_KEYS.conversions, []);
    conversions.push({
      path,
      kind,
      program_id: programId ?? extractProgramIdFromPath(path),
      session_id: getSessionId(),
      created_at: new Date().toISOString(),
    });
    window.localStorage.setItem(STORAGE_KEYS.conversions, JSON.stringify(conversions.slice(-2000)));
    notifyCmsChange();
  } catch {
    // ignore
  }
}

export function useAnalytics() {
  useCmsSubscription();
  const views = readJson<PageViewRecord[]>(STORAGE_KEYS.views, []);
  const conversions = readJson<ConversionRecord[]>(STORAGE_KEYS.conversions, []);
  return {
    data: { views, conversions },
    isLoading: false,
    error: null,
  };
}
