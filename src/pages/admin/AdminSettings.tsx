import React, { useEffect, useState } from 'react';
import {
  DEFAULT_SETTINGS,
  upsertSiteSetting,
  useSiteSettings,
  type SiteSettings,
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

export function AdminSettings() {
  const { get, isLoading } = useSiteSettings();
  const [noticeBar, setNoticeBar] = useState(DEFAULT_SETTINGS.notice_bar);
  const [logo, setLogo] = useState(DEFAULT_SETTINGS.logo);
  const [hero, setHero] = useState(DEFAULT_SETTINGS.hero);
  const [stats, setStats] = useState(DEFAULT_SETTINGS.stats);
  const [sections, setSections] = useState(DEFAULT_SETTINGS.sections);
  const [savedLabel, setSavedLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading) {
      setNoticeBar(get('notice_bar'));
      setLogo(get('logo'));
      setHero(get('hero'));
      setStats(get('stats'));
      setSections(get('sections'));
    }
  }, [isLoading]);

  async function save<K extends keyof SiteSettings>(
    label: string,
    key: K,
    val: SiteSettings[K]
  ) {
    await upsertSiteSetting(key, val);
    setSavedLabel(label);
    window.setTimeout(() => setSavedLabel(null), 2500);
  }

  return (
    <div className="space-y-8">
      <SectionHeading
        title="Website content"
        description="Notification bar, logo, homepage headline, capsules and statistics."
      />

      {savedLabel && <p className="text-sm text-electric-glow">{savedLabel} saved.</p>}

      <AdminCard className="grid gap-5 sm:grid-cols-2">
        <p className="sm:col-span-2 font-semibold">Notification bar</p>
        <AdminField label="Text">
          <AdminInput
            value={noticeBar.text}
            onChange={(e) => setNoticeBar({ ...noticeBar, text: e.target.value })}
          />
        </AdminField>
        <AdminField label="Link" hint="For example /consultancy">
          <AdminInput
            value={noticeBar.link}
            onChange={(e) => setNoticeBar({ ...noticeBar, link: e.target.value })}
          />
        </AdminField>
        <AdminField label="Show bar">
          <AdminSelect
            value={noticeBar.enabled ? 'yes' : 'no'}
            onChange={(e) =>
              setNoticeBar({ ...noticeBar, enabled: e.target.value === 'yes' })
            }
          >
            <option value="yes">Visible</option>
            <option value="no">Hidden</option>
          </AdminSelect>
        </AdminField>
        <div className="flex items-end">
          <AdminButton onClick={() => save('Notification bar', 'notice_bar', noticeBar)}>
            Save
          </AdminButton>
        </div>
      </AdminCard>

      <AdminCard className="grid gap-5 sm:grid-cols-2">
        <p className="sm:col-span-2 font-semibold">Logo</p>
        <AdminField label="Logo image" hint="Leave blank to keep the current logo">
          <UploadInput value={logo.url} onChange={(url) => setLogo({ url })} />
        </AdminField>
        <div className="flex items-end">
          <AdminButton onClick={() => save('Logo', 'logo', logo)}>Save</AdminButton>
        </div>
      </AdminCard>

      <AdminCard className="grid gap-5 sm:grid-cols-2">
        <p className="sm:col-span-2 font-semibold">Homepage hero</p>
        <AdminField label="Capsule above the title">
          <AdminInput
            value={hero.badge}
            onChange={(e) => setHero({ ...hero, badge: e.target.value })}
          />
        </AdminField>
        <AdminField label="Button text">
          <AdminInput
            value={hero.ctaText}
            onChange={(e) => setHero({ ...hero, ctaText: e.target.value })}
          />
        </AdminField>
        <AdminField label="Title — first line">
          <AdminInput
            value={hero.titleLine1}
            onChange={(e) => setHero({ ...hero, titleLine1: e.target.value })}
          />
        </AdminField>
        <AdminField label="Title — second line (blue)">
          <AdminInput
            value={hero.titleLine2}
            onChange={(e) => setHero({ ...hero, titleLine2: e.target.value })}
          />
        </AdminField>
        <AdminField label="Capsules below the title" hint="Separate with commas">
          <AdminInput
            value={hero.capsules.join(', ')}
            onChange={(e) =>
              setHero({
                ...hero,
                capsules: e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
        </AdminField>
        <AdminField label="Hero video" hint="Leave blank to keep the current one">
          <UploadInput
            value={hero.videoUrl}
            accept="video/*"
            onChange={(videoUrl) => setHero({ ...hero, videoUrl })}
          />
        </AdminField>
        <AdminField label="Portrait photo" hint="Leave blank to keep the current one">
          <UploadInput
            value={hero.portraitUrl}
            onChange={(portraitUrl) => setHero({ ...hero, portraitUrl })}
          />
        </AdminField>
        <div className="flex items-end">
          <AdminButton onClick={() => save('Hero', 'hero', hero)}>Save</AdminButton>
        </div>
      </AdminCard>

      <AdminCard>
        <p className="mb-4 font-semibold">Statistics</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((st, idx) => (
            <div key={idx} className="space-y-3">
              <AdminField label={`Number ${idx + 1}`}>
                <AdminInput
                  value={st.value}
                  onChange={(e) => {
                    const next = [...stats];
                    next[idx] = { ...st, value: e.target.value };
                    setStats(next);
                  }}
                />
              </AdminField>
              <AdminField label="Label">
                <AdminInput
                  value={st.label}
                  onChange={(e) => {
                    const next = [...stats];
                    next[idx] = { ...st, label: e.target.value };
                    setStats(next);
                  }}
                />
              </AdminField>
            </div>
          ))}
        </div>
        <AdminButton className="mt-5" onClick={() => save('Statistics', 'stats', stats)}>
          Save
        </AdminButton>
      </AdminCard>

      <AdminCard className="grid gap-5 sm:grid-cols-2">
        <p className="sm:col-span-2 font-semibold">Section titles</p>
        <AdminField label="Programs section title">
          <AdminInput
            value={sections.programsTitle}
            onChange={(e) => setSections({ ...sections, programsTitle: e.target.value })}
          />
        </AdminField>
        <AdminField label="Feedback section title">
          <AdminInput
            value={sections.feedbackTitle}
            onChange={(e) => setSections({ ...sections, feedbackTitle: e.target.value })}
          />
        </AdminField>
        <AdminField label="Gallery section title">
          <AdminInput
            value={sections.galleryTitle}
            onChange={(e) => setSections({ ...sections, galleryTitle: e.target.value })}
          />
        </AdminField>
        <div className="flex items-end">
          <AdminButton onClick={() => save('Section titles', 'sections', sections)}>
            Save
          </AdminButton>
        </div>
      </AdminCard>
    </div>
  );
}
