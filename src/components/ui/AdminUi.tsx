import React from 'react';

export function AdminCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <AdminCard>
      <p className="text-xs uppercase tracking-[0.14em] text-white/45">{label}</p>
      <p className="mt-3 font-display text-3xl font-semibold tracking-tight">{value}</p>
      {sub && <p className="mt-1 text-xs text-white/50">{sub}</p>}
    </AdminCard>
  );
}

export function AdminField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="text-white/60">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-white/35">{hint}</span>}
    </label>
  );
}

const inputBase =
  'mt-2 w-full rounded-md border border-white/12 bg-white/[0.06] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-electric';

export function AdminInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputBase} ${props.className ?? ''}`} />;
}

export function AdminTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputBase} ${props.className ?? ''}`} />;
}

export function AdminSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputBase} ${props.className ?? ''}`} />;
}

export function AdminButton({
  children,
  variant = 'primary',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger';
}) {
  const variantCls = {
    primary: 'bg-white text-neutral-950 hover:bg-white/90',
    ghost: 'border border-white/15 text-white hover:bg-white/10',
    danger: 'border border-red-400/40 text-red-300 hover:bg-red-500/10',
  }[variant];

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer ${variantCls} ${
        props.className ?? ''
      }`}
    >
      {children}
    </button>
  );
}

export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>
      {description && <p className="mt-1 text-sm text-white/50">{description}</p>}
    </div>
  );
}
