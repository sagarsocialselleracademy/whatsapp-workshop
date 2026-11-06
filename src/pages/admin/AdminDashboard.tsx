import React from 'react';
import { useAnalytics, usePrograms } from '@/lib/cms';
import { AdminCard, SectionHeading, StatCard } from '@/components/ui/AdminUi';

const DAY_MS = 1440 * 60 * 1000;

function splitPeriods<T extends { created_at: string }>(items: T[]) {
  const now = Date.now();
  return {
    recent: items.filter((i) => now - new Date(i.created_at).getTime() <= 30 * DAY_MS),
    previous: items.filter((i) => {
      const age = now - new Date(i.created_at).getTime();
      return age > 30 * DAY_MS && age <= 60 * DAY_MS;
    }),
  };
}

function growthPct(recent: number, previous: number): number {
  if (previous === 0) return recent > 0 ? 100 : 0;
  return Math.round(((recent - previous) / previous) * 100);
}

function formatGrowth(pct: number): string {
  return `${pct > 0 ? '+' : ''}${pct}%`;
}

function convRate(conversions: number, views: number): number {
  return views ? Math.round((conversions / views) * 1000) / 10 : 0;
}

export function AdminDashboard() {
  const { data, isLoading, error } = useAnalytics();
  const { programs } = usePrograms();

  if (isLoading) return <p className="text-white/60">Loading numbers…</p>;
  if (error) return <p className="text-red-300">Could not load analytics.</p>;

  const views = data?.views ?? [];
  const conversions = data?.conversions ?? [];
  const viewPeriods = splitPeriods(views);
  const convPeriods = splitPeriods(conversions);

  const uniqueVisitorsAll = new Set(views.map((v) => v.session_id)).size;
  const uniqueRecent = new Set(viewPeriods.recent.map((v) => v.session_id)).size;
  const uniquePrev = new Set(viewPeriods.previous.map((v) => v.session_id)).size;

  const enrolledTotal = programs.reduce((acc, p) => acc + (p.filledSeats || 0), 0);
  const viewGrowth = growthPct(viewPeriods.recent.length, viewPeriods.previous.length);
  const convGrowth = growthPct(convPeriods.recent.length, convPeriods.previous.length);
  const rate30d = convRate(convPeriods.recent.length, viewPeriods.recent.length);

  const waClicks = conversions.filter((c) => c.kind === 'whatsapp_click');
  const waRecent = splitPeriods(waClicks).recent.length;

  const programStats = programs.map((p) => {
    const pViews = views.filter((v) => v.program_id === p.id);
    const pConvs = conversions.filter((c) => c.program_id === p.id);
    const vSplit = splitPeriods(pViews);
    const cSplit = splitPeriods(pConvs);
    return {
      id: p.id,
      title: p.title,
      views: pViews.length,
      viewsRecent: vSplit.recent.length,
      viewGrowth: growthPct(vSplit.recent.length, vSplit.previous.length),
      conversions: pConvs.length,
      conversionsRecent: cSplit.recent.length,
      rate: convRate(cSplit.recent.length, vSplit.recent.length),
      allTimeRate: convRate(pConvs.length, pViews.length),
    };
  });

  const avgWorkshopRate = programStats.length
    ? Math.round(
        (programStats.reduce((sum, p) => sum + p.allTimeRate, 0) / programStats.length) * 10
      ) / 10
    : 0;

  return (
    <div className="space-y-10">
      <div>
        <SectionHeading
          title="Overview"
          description="Last 30 days compared with the 30 days before."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Visitors (all time)"
            value={uniqueVisitorsAll.toLocaleString('en-IN')}
            sub={`${uniqueRecent.toLocaleString('en-IN')} in last 30 days`}
          />
          <StatCard
            label="Visitor growth"
            value={formatGrowth(growthPct(uniqueRecent, uniquePrev))}
            sub="vs previous 30 days"
          />
          <StatCard
            label="Students enrolled"
            value={enrolledTotal.toLocaleString('en-IN')}
            sub="Across all workshops"
          />
          <StatCard
            label="Page views (30d)"
            value={viewPeriods.recent.length.toLocaleString('en-IN')}
            sub={`Traffic growth ${formatGrowth(viewGrowth)}`}
          />
          <StatCard
            label="Conversions (30d)"
            value={convPeriods.recent.length.toLocaleString('en-IN')}
            sub={`Conversion growth ${formatGrowth(convGrowth)}`}
          />
          <StatCard
            label="Conversion rate (30d)"
            value={`${rate30d}%`}
            sub={`Average per workshop ${avgWorkshopRate}%`}
          />
          <StatCard
            label="WhatsApp clicks (30d)"
            value={waRecent.toLocaleString('en-IN')}
            sub={`${waClicks.length.toLocaleString('en-IN')} all time`}
          />
        </div>
      </div>

      <div>
        <SectionHeading
          title="Each workshop page"
          description="Traffic, growth and conversions per page."
        />
        <AdminCard className="overflow-x-auto p-0">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-white/10 text-xs uppercase tracking-[0.12em] text-white/45">
              <tr>
                <th className="px-5 py-3">Workshop</th>
                <th className="px-5 py-3">Views 30d</th>
                <th className="px-5 py-3">Traffic growth</th>
                <th className="px-5 py-3">Conversions 30d</th>
                <th className="px-5 py-3">Total conversions</th>
                <th className="px-5 py-3">Conv. rate 30d</th>
                <th className="px-5 py-3">Avg conv. rate</th>
              </tr>
            </thead>
            <tbody>
              {programStats.map((row) => (
                <tr key={row.id} className="border-b border-white/5 last:border-0">
                  <td className="px-5 py-3 font-medium">{row.title}</td>
                  <td className="px-5 py-3">{row.viewsRecent}</td>
                  <td className="px-5 py-3">{formatGrowth(row.viewGrowth)}</td>
                  <td className="px-5 py-3">{row.conversionsRecent}</td>
                  <td className="px-5 py-3">{row.conversions}</td>
                  <td className="px-5 py-3">{row.rate}%</td>
                  <td className="px-5 py-3">{row.allTimeRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminCard>
        <p className="mt-3 text-xs text-white/40">
          A conversion is counted when a visitor clicks a join / reserve / register button.
        </p>
      </div>
    </div>
  );
}
