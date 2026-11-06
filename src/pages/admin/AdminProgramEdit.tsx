import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import {
  upsertProgram,
  useAdminPrograms,
  type FaqItem,
  type ProgramRow,
  type VideoTestimonialInput,
} from '@/lib/cms';
import { UploadInput } from '@/components/UploadInput';
import {
  AdminButton,
  AdminCard,
  AdminField,
  AdminInput,
  AdminSelect,
  AdminTextarea,
  SectionHeading,
} from '@/components/ui/AdminUi';

interface FormState {
  id: string;
  title: string;
  program_type: 'live' | 'recorded';
  published: boolean;
  sort_order: number;
  speaker: string;
  summary: string;
  duration: string;
  rating: string;
  reviews: string;
  totalSeats: string;
  filledSeats: string;
  price: string;
  originalPrice: string;
  capsule: string;
  registeredLabel: string;
  eventDay: string;
  eventDate: string;
  eventTime: string;
  location: string;
  format: string;
  level: string;
  bannerImage: string;
  heroVideo: string;
  heroPoster: string;
  ctaText: string;
  ctaLink: string;
  whatsappText: string;
  curriculum: string;
  outcomes: string;
  faqs: FaqItem[];
  videoTestimonials: VideoTestimonialInput[];
}

const DEFAULT_FORM: FormState = {
  id: '',
  title: '',
  program_type: 'live',
  published: true,
  sort_order: 0,
  speaker: 'Lakshit Sethiya',
  summary: '',
  duration: '3 hours',
  rating: '4.9',
  reviews: '0',
  totalSeats: '100',
  filledSeats: '0',
  price: '',
  originalPrice: '',
  capsule: 'Live program',
  registeredLabel: '450+ registered',
  eventDay: '',
  eventDate: '',
  eventTime: '',
  location: 'Live on Zoom',
  format: '',
  level: 'Beginner friendly',
  bannerImage: '',
  heroVideo: '',
  heroPoster: '',
  ctaText: 'Reserve Your Seat',
  ctaLink: '',
  whatsappText: '',
  curriculum: '',
  outcomes: '',
  faqs: [],
  videoTestimonials: [],
};

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function rowToForm(row: ProgramRow): FormState {
  const d = row.data ?? {};
  const str = (k: keyof typeof d, fallback = '') =>
    typeof d[k] === 'string' ? (d[k] as string) : fallback;
  const numStr = (k: keyof typeof d, fallback = '') =>
    d[k] == null ? fallback : String(d[k]);

  return {
    ...DEFAULT_FORM,
    id: row.id,
    title: row.title,
    program_type: row.program_type ?? 'live',
    published: row.published,
    sort_order: row.sort_order,
    speaker: str('speaker', 'Lakshit Sethiya'),
    summary: str('summary'),
    duration: str('duration'),
    rating: numStr('rating', '4.9'),
    reviews: numStr('reviews', '0'),
    totalSeats: numStr('totalSeats', '100'),
    filledSeats: numStr('filledSeats', '0'),
    price: str('price'),
    originalPrice: str('originalPrice'),
    capsule: str('capsule'),
    registeredLabel: str('registeredLabel'),
    eventDay: str('eventDay'),
    eventDate: str('eventDate'),
    eventTime: str('eventTime'),
    location: str('location'),
    format: str('format'),
    level: str('level'),
    bannerImage: str('bannerImage'),
    heroVideo: str('heroVideo'),
    heroPoster: str('heroPoster'),
    ctaText: str('ctaText'),
    ctaLink: str('ctaLink'),
    whatsappText: str('whatsappText'),
    curriculum: Array.isArray(d.curriculum) ? d.curriculum.join('\n') : '',
    outcomes: Array.isArray(d.outcomes) ? d.outcomes.join('\n') : '',
    faqs: Array.isArray(d.faqs) ? d.faqs : [],
    videoTestimonials: Array.isArray(d.videoTestimonials) ? d.videoTestimonials : [],
  };
}

export function AdminProgramEdit() {
  const { id = 'new' } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const { data: rows } = useAdminPrograms();
  const existingRow = useMemo(() => rows?.find((r) => r.id === id), [rows, id]);

  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (existingRow) setForm(rowToForm(existingRow));
  }, [existingRow]);

  function setField<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  const isLive = form.program_type === 'live';

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const slug = form.id || slugify(form.title);
      if (!slug || !form.title) throw new Error('Give the workshop a name.');

      const dataPayload: ProgramRow['data'] = {
        ...existingRow?.data,
        speaker: form.speaker,
        summary: form.summary,
        duration: form.duration,
        rating: Number(form.rating) || 0,
        reviews: Number(form.reviews) || 0,
        totalSeats: Number(form.totalSeats) || 100,
        filledSeats: Number(form.filledSeats) || 0,
        price: form.price,
        originalPrice: form.originalPrice,
        capsule: form.capsule,
        registeredLabel: form.registeredLabel,
        location: form.location,
        format: form.format,
        level: form.level,
        bannerImage: form.bannerImage,
        heroVideo: form.heroVideo,
        heroPoster: form.heroPoster,
        ctaText: form.ctaText,
        ctaLink: form.ctaLink,
        whatsappText: form.whatsappText,
        curriculum: form.curriculum
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        outcomes: form.outcomes
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        faqs: form.faqs.filter((f) => f.question && f.answer),
        videoTestimonials: form.videoTestimonials.filter((v) => v.url),
        programType: form.program_type,
      };

      if (isLive) {
        dataPayload.eventDay = form.eventDay;
        dataPayload.eventDate = form.eventDate;
        dataPayload.eventTime = form.eventTime;
      }

      await upsertProgram({
        id: slug,
        title: form.title,
        program_type: form.program_type,
        published: form.published,
        sort_order: Number(form.sort_order) || 0,
        data: dataPayload,
      });

      navigate('/admin/programs');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <SectionHeading
        title={isNew ? 'New workshop' : `Edit: ${form.title || id}`}
        description="Everything here appears on the workshop's own page and on its card on the homepage."
      />

      <AdminCard className="grid gap-5 sm:grid-cols-2">
        <AdminField label="Workshop name">
          <AdminInput
            value={form.title}
            onChange={(e) => setField('title', e.target.value)}
          />
        </AdminField>
        <AdminField
          label="Page address (leave blank to auto-create)"
          hint={`/programs/${form.id || slugify(form.title) || '…'}`}
        >
          <AdminInput
            value={form.id}
            onChange={(e) => setField('id', slugify(e.target.value))}
          />
        </AdminField>
        <AdminField label="Type">
          <AdminSelect
            value={form.program_type}
            onChange={(e) =>
              setField('program_type', e.target.value as 'live' | 'recorded')
            }
          >
            <option value="live">Live workshop</option>
            <option value="recorded">Recorded course</option>
          </AdminSelect>
        </AdminField>
        <AdminField label="Speaker">
          <AdminInput
            value={form.speaker}
            onChange={(e) => setField('speaker', e.target.value)}
          />
        </AdminField>
        <AdminField label="Short description">
          <AdminTextarea
            rows={3}
            value={form.summary}
            onChange={(e) => setField('summary', e.target.value)}
          />
        </AdminField>
        <div className="grid grid-cols-2 gap-4">
          <AdminField label="Show on website">
            <AdminSelect
              value={form.published ? 'yes' : 'no'}
              onChange={(e) => setField('published', e.target.value === 'yes')}
            >
              <option value="yes">Visible</option>
              <option value="no">Hidden</option>
            </AdminSelect>
          </AdminField>
          <AdminField label="Display order">
            <AdminInput
              type="number"
              value={form.sort_order}
              onChange={(e) => setField('sort_order', Number(e.target.value))}
            />
          </AdminField>
        </div>
      </AdminCard>

      <AdminCard className="grid gap-5 sm:grid-cols-3">
        <AdminField label="Price (discounted)" hint="e.g. ₹4,999">
          <AdminInput
            value={form.price}
            onChange={(e) => setField('price', e.target.value)}
          />
        </AdminField>
        <AdminField label="Original price" hint="Shown struck through">
          <AdminInput
            value={form.originalPrice}
            onChange={(e) => setField('originalPrice', e.target.value)}
          />
        </AdminField>
        <AdminField label="Checkout page link" hint="Where the join button sends people">
          <AdminInput
            value={form.ctaLink}
            onChange={(e) => setField('ctaLink', e.target.value)}
          />
        </AdminField>
        <AdminField label="Duration">
          <AdminInput
            value={form.duration}
            onChange={(e) => setField('duration', e.target.value)}
          />
        </AdminField>
        <AdminField label="Rating">
          <AdminInput
            value={form.rating}
            onChange={(e) => setField('rating', e.target.value)}
          />
        </AdminField>
        <AdminField label="Number of reviews">
          <AdminInput
            value={form.reviews}
            onChange={(e) => setField('reviews', e.target.value)}
          />
        </AdminField>
        <AdminField label="Total seats">
          <AdminInput
            value={form.totalSeats}
            onChange={(e) => setField('totalSeats', e.target.value)}
          />
        </AdminField>
        <AdminField
          label="Seats already booked"
          hint={`Seats left: ${Math.max(0, Number(form.totalSeats) - Number(form.filledSeats))}`}
        >
          <AdminInput
            value={form.filledSeats}
            onChange={(e) => setField('filledSeats', e.target.value)}
          />
        </AdminField>
        <AdminField label="Button text">
          <AdminInput
            value={form.ctaText}
            onChange={(e) => setField('ctaText', e.target.value)}
          />
        </AdminField>
      </AdminCard>

      <AdminCard className="grid gap-5 sm:grid-cols-3">
        <AdminField label="Capsule above title">
          <AdminInput
            value={form.capsule}
            onChange={(e) => setField('capsule', e.target.value)}
          />
        </AdminField>
        <AdminField label="Registered / enrolled label">
          <AdminInput
            value={form.registeredLabel}
            onChange={(e) => setField('registeredLabel', e.target.value)}
          />
        </AdminField>
        <AdminField label="Level">
          <AdminInput
            value={form.level}
            onChange={(e) => setField('level', e.target.value)}
          />
        </AdminField>
        {isLive && (
          <>
            <AdminField label="Day">
              <AdminInput
                value={form.eventDay}
                onChange={(e) => setField('eventDay', e.target.value)}
              />
            </AdminField>
            <AdminField label="Date">
              <AdminInput
                value={form.eventDate}
                onChange={(e) => setField('eventDate', e.target.value)}
              />
            </AdminField>
            <AdminField label="Time">
              <AdminInput
                value={form.eventTime}
                onChange={(e) => setField('eventTime', e.target.value)}
              />
            </AdminField>
          </>
        )}
        <AdminField label="Venue / location">
          <AdminInput
            value={form.location}
            onChange={(e) => setField('location', e.target.value)}
          />
        </AdminField>
        <AdminField label="Format">
          <AdminInput
            value={form.format}
            onChange={(e) => setField('format', e.target.value)}
          />
        </AdminField>
      </AdminCard>

      <AdminCard className="grid gap-5 sm:grid-cols-2">
        <AdminField label="Banner image">
          <UploadInput
            value={form.bannerImage}
            onChange={(v) => setField('bannerImage', v)}
          />
        </AdminField>
        <AdminField label="Page video" hint="Upload an MP4 or paste a video link">
          <UploadInput
            value={form.heroVideo}
            onChange={(v) => setField('heroVideo', v)}
            accept="video/*"
            placeholder="Paste a video link or upload"
          />
        </AdminField>
        <AdminField label="Video cover image">
          <UploadInput
            value={form.heroPoster}
            onChange={(v) => setField('heroPoster', v)}
          />
        </AdminField>
        <AdminField label="WhatsApp message text">
          <AdminInput
            value={form.whatsappText}
            onChange={(e) => setField('whatsappText', e.target.value)}
          />
        </AdminField>
      </AdminCard>

      <AdminCard className="grid gap-5 sm:grid-cols-2">
        <AdminField label="Lessons — one per line">
          <AdminTextarea
            rows={8}
            value={form.curriculum}
            onChange={(e) => setField('curriculum', e.target.value)}
          />
        </AdminField>
        <AdminField label="Outcomes — one per line">
          <AdminTextarea
            rows={8}
            value={form.outcomes}
            onChange={(e) => setField('outcomes', e.target.value)}
          />
        </AdminField>
      </AdminCard>

      <AdminCard>
        <div className="mb-4 flex items-center justify-between">
          <p className="font-semibold">Testimonial videos for this page</p>
          <AdminButton
            variant="ghost"
            onClick={() =>
              setField('videoTestimonials', [
                ...form.videoTestimonials,
                { name: '', program: form.title, url: '' },
              ])
            }
          >
            <Plus className="h-4 w-4" /> Add
          </AdminButton>
        </div>
        <div className="space-y-4">
          {form.videoTestimonials.map((vt, idx) => (
            <div
              key={idx}
              className="grid gap-3 sm:grid-cols-[1fr_1fr_2fr_auto] sm:items-end"
            >
              <AdminField label="Person">
                <AdminInput
                  value={vt.name}
                  onChange={(e) => {
                    const next = [...form.videoTestimonials];
                    next[idx] = { ...vt, name: e.target.value };
                    setField('videoTestimonials', next);
                  }}
                />
              </AdminField>
              <AdminField label="Program">
                <AdminInput
                  value={vt.program}
                  onChange={(e) => {
                    const next = [...form.videoTestimonials];
                    next[idx] = { ...vt, program: e.target.value };
                    setField('videoTestimonials', next);
                  }}
                />
              </AdminField>
              <AdminField label="Video link (YouTube or uploaded)">
                <UploadInput
                  value={vt.url}
                  accept="video/*"
                  onChange={(val) => {
                    const next = [...form.videoTestimonials];
                    next[idx] = { ...vt, url: val };
                    setField('videoTestimonials', next);
                  }}
                />
              </AdminField>
              <AdminButton
                variant="danger"
                onClick={() =>
                  setField(
                    'videoTestimonials',
                    form.videoTestimonials.filter((_, i) => i !== idx)
                  )
                }
              >
                <Trash2 className="h-4 w-4" />
              </AdminButton>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard>
        <div className="mb-4 flex items-center justify-between">
          <p className="font-semibold">Questions &amp; answers</p>
          <AdminButton
            variant="ghost"
            onClick={() =>
              setField('faqs', [...form.faqs, { question: '', answer: '' }])
            }
          >
            <Plus className="h-4 w-4" /> Add
          </AdminButton>
        </div>
        <div className="space-y-4">
          {form.faqs.map((faq, idx) => (
            <div key={idx} className="grid gap-3 sm:grid-cols-[1fr_2fr_auto] sm:items-end">
              <AdminField label="Question">
                <AdminInput
                  value={faq.question}
                  onChange={(e) => {
                    const next = [...form.faqs];
                    next[idx] = { ...faq, question: e.target.value };
                    setField('faqs', next);
                  }}
                />
              </AdminField>
              <AdminField label="Answer">
                <AdminInput
                  value={faq.answer}
                  onChange={(e) => {
                    const next = [...form.faqs];
                    next[idx] = { ...faq, answer: e.target.value };
                    setField('faqs', next);
                  }}
                />
              </AdminField>
              <AdminButton
                variant="danger"
                onClick={() =>
                  setField(
                    'faqs',
                    form.faqs.filter((_, i) => i !== idx)
                  )
                }
              >
                <Trash2 className="h-4 w-4" />
              </AdminButton>
            </div>
          ))}
        </div>
      </AdminCard>

      {error && <p className="text-sm text-red-300">{error}</p>}

      <div className="flex gap-3">
        <AdminButton onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save workshop'}
        </AdminButton>
        <AdminButton variant="ghost" onClick={() => navigate('/admin/programs')}>
          Cancel
        </AdminButton>
      </div>
    </div>
  );
}
