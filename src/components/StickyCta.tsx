import React, { useEffect, useState } from 'react';
import { ArrowRight, Users } from 'lucide-react';

export function StickyCta({
  title,
  price,
  originalPrice,
  note,
  label,
  disabled = false,
  onClick,
}: {
  title?: string;
  price?: string;
  originalPrice?: string;
  note?: string;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink/95 backdrop-blur-xl transition-transform duration-500 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-10 sm:py-4">
        <div className="flex items-center gap-3 text-sm sm:text-base">
          {originalPrice && <span className="text-white/40 line-through">{originalPrice}</span>}
          {price && <span className="font-display font-semibold text-white">{price}</span>}
          {!price && title && (
            <span className="hidden font-display font-semibold text-white sm:inline">{title}</span>
          )}
          {note && (
            <span className="inline-flex items-center gap-1 text-xs text-white/60 sm:text-sm">
              <Users className="h-3.5 w-3.5 text-electric-glow" />
              {note}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={`group inline-flex shrink-0 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-transform duration-500 sm:px-7 cursor-pointer ${
            disabled
              ? 'cursor-not-allowed bg-white/15 text-white/50'
              : 'text-white hover:scale-[1.03]'
          }`}
          style={disabled ? undefined : { background: 'var(--gradient-electric)' }}
        >
          {label}
          {!disabled && (
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
          )}
        </button>
      </div>
    </div>
  );
}
