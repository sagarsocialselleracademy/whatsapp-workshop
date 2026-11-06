import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Download, Pencil, Plus, Trash2 } from 'lucide-react';
import {
  BUILTIN_PROGRAMS,
  deleteProgram,
  upsertProgram,
  useAdminPrograms,
} from '@/lib/cms';
import { AdminButton, AdminCard, SectionHeading } from '@/components/ui/AdminUi';

export function AdminPrograms() {
  const { data: rows, isLoading } = useAdminPrograms();
  const navigate = useNavigate();

  async function importBuiltin() {
    let idx = 0;
    for (const p of BUILTIN_PROGRAMS) {
      const { icon, ...rest } = p;
      await upsertProgram({
        id: p.id,
        title: p.title,
        program_type: p.programType ?? 'live',
        published: true,
        sort_order: idx++,
        data: rest,
      });
    }
  }

  async function handleDelete(id: string) {
    if (window.confirm('Delete this workshop permanently?')) {
      await deleteProgram(id);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          title="Workshops"
          description="Create live workshops and recorded courses. Each one gets its own page on the website."
        />
        <div className="flex gap-3">
          {!isLoading && (rows?.length ?? 0) === 0 && (
            <AdminButton variant="ghost" onClick={importBuiltin}>
              <Download className="h-4 w-4" /> Import current workshops
            </AdminButton>
          )}
          <AdminButton onClick={() => navigate('/admin/programs/new')}>
            <Plus className="h-4 w-4" /> New workshop
          </AdminButton>
        </div>
      </div>

      {isLoading ? (
        <p className="text-white/60">Loading…</p>
      ) : (rows?.length ?? 0) === 0 ? (
        <AdminCard>
          <p className="text-sm text-white/60">
            No workshops saved yet — the website is still showing the built-in ones. Click “Import
            current workshops” to bring them in so you can edit them here.
          </p>
        </AdminCard>
      ) : (
        <div className="grid gap-4">
          {rows.map((row) => (
            <AdminCard
              key={row.id}
              className="flex flex-wrap items-center justify-between gap-4"
            >
              <div>
                <p className="font-display text-lg font-semibold tracking-tight">{row.title}</p>
                <p className="mt-1 text-xs text-white/45">
                  /programs/{row.id} · {row.program_type} · {row.published ? 'visible' : 'hidden'} ·
                  order {row.sort_order}
                </p>
              </div>
              <div className="flex gap-3">
                <Link to={`/admin/programs/${row.id}`}>
                  <AdminButton variant="ghost">
                    <Pencil className="h-4 w-4" /> Edit
                  </AdminButton>
                </Link>
                <AdminButton variant="danger" onClick={() => handleDelete(row.id)}>
                  <Trash2 className="h-4 w-4" /> Delete
                </AdminButton>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
