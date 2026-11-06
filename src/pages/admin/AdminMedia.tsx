import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import {
  deleteMediaItem,
  insertMediaItem,
  useAdminPrograms,
  useAllMediaItems,
  type MediaItem,
} from '@/lib/cms';
import { UploadInput } from '@/components/UploadInput';
import {
  AdminButton,
  AdminCard,
  AdminField,
  AdminInput,
  AdminSelect,
  SectionHeading,
} from '@/components/ui/AdminUi';

const MEDIA_KINDS: Array<{
  value: MediaItem['kind'];
  label: string;
  hint: string;
  accept: string;
}> = [
  {
    value: 'gallery',
    label: 'Session photos',
    hint: 'Shown in the “100+ AI Training Sessions” gallery on the homepage and on every workshop page.',
    accept: 'image/*',
  },
  {
    value: 'feedback_video',
    label: 'Feedback videos',
    hint: 'Shown in the “Feedbacks & Reviews” section. Paste a YouTube link or upload a video.',
    accept: 'video/*',
  },
  {
    value: 'review_screenshot',
    label: 'Review screenshots',
    hint: 'Customer chat / review screenshots shown under Feedbacks & Reviews.',
    accept: 'image/*',
  },
  {
    value: 'marquee_logo',
    label: 'Marquee logos',
    hint: 'The sliding logo strip below the hero.',
    accept: 'image/*',
  },
];

const ASPECT_RATIOS = [
  'aspect-3/2',
  'aspect-square',
  'aspect-4/5',
  'aspect-9/16',
  'aspect-video',
];

export function AdminMedia() {
  const [kind, setKind] = useState<MediaItem['kind']>('gallery');
  const { data: allMedia, isLoading } = useAllMediaItems();
  const { data: programs } = useAdminPrograms();

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [alt, setAlt] = useState('');
  const [ratio, setRatio] = useState(ASPECT_RATIOS[0]);
  const [programId, setProgramId] = useState('');
  const [adding, setAdding] = useState(false);

  const activeKindMeta = MEDIA_KINDS.find((k) => k.value === kind)!;
  const items = (allMedia ?? []).filter((m) => m.kind === kind);

  async function handleAdd() {
    if (!url) return;
    setAdding(true);
    try {
      await insertMediaItem({
        kind,
        program_id: programId || null,
        url,
        title: title || null,
        alt: alt || title || null,
        ratio,
        sort_order: items.length,
      });
      setUrl('');
      setTitle('');
      setAlt('');
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="space-y-8">
      <SectionHeading
        title="Media & reviews"
        description="Photos, feedback videos, review screenshots and marquee logos."
      />

      <div className="flex flex-wrap gap-2">
        {MEDIA_KINDS.map((k) => (
          <button
            key={k.value}
            type="button"
            onClick={() => setKind(k.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium cursor-pointer ${
              kind === k.value
                ? 'bg-white text-neutral-950'
                : 'border border-white/15 text-white/70'
            }`}
          >
            {k.label}
          </button>
        ))}
      </div>

      <AdminCard>
        <p className="text-sm text-white/50">{activeKindMeta.hint}</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <AdminField label="File or link">
            <UploadInput
              value={url}
              onChange={setUrl}
              accept={activeKindMeta.accept}
            />
          </AdminField>
          <AdminField label="Title / person name">
            <AdminInput value={title} onChange={(e) => setTitle(e.target.value)} />
          </AdminField>
          <AdminField label="Description (for accessibility)">
            <AdminInput value={alt} onChange={(e) => setAlt(e.target.value)} />
          </AdminField>
          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Shape">
              <AdminSelect value={ratio} onChange={(e) => setRatio(e.target.value)}>
                {ASPECT_RATIOS.map((r) => (
                  <option key={r} value={r}>
                    {r.replace('aspect-', '')}
                  </option>
                ))}
              </AdminSelect>
            </AdminField>
            <AdminField label="Show on" hint="Everywhere, or one workshop page only">
              <AdminSelect
                value={programId}
                onChange={(e) => setProgramId(e.target.value)}
              >
                <option value="">Whole website</option>
                {(programs ?? []).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </AdminSelect>
            </AdminField>
          </div>
        </div>
        <div className="mt-5">
          <AdminButton onClick={handleAdd} disabled={adding || !url}>
            <Plus className="h-4 w-4" /> {adding ? 'Adding…' : 'Add'}
          </AdminButton>
        </div>
      </AdminCard>

      {isLoading ? (
        <p className="text-white/60">Loading…</p>
      ) : items.length === 0 ? (
        <AdminCard>
          <p className="text-sm text-white/60">
            Nothing added here yet — the website is showing the existing built-in items.
          </p>
        </AdminCard>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <AdminCard key={item.id}>
              {kind === 'feedback_video' ? (
                <p className="truncate text-xs text-white/50">{item.url}</p>
              ) : (
                <img
                  src={item.url}
                  alt={item.alt ?? ''}
                  className="h-36 w-full rounded-lg object-contain"
                />
              )}
              <p className="mt-3 text-sm font-medium">{item.title || 'Untitled'}</p>
              <p className="text-xs text-white/40">
                {item.program_id ? `Only on ${item.program_id}` : 'Whole website'}
              </p>
              <AdminButton
                variant="danger"
                className="mt-3"
                onClick={() => deleteMediaItem(item.id)}
              >
                <Trash2 className="h-4 w-4" /> Remove
              </AdminButton>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
