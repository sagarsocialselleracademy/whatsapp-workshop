import React, { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';
import { Button } from './ui/Button';

const COOKIE_SETTINGS_EVENT = 'ls:cookie-settings';
const COOKIE_STORAGE_KEY = 'ls_cookie_consent_v1';

export function openCookieSettings() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
  }
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, openHandler);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, openHandler);
  }, []);

  const handleChoice = (choice: 'accepted' | 'rejected') => {
    try {
      window.localStorage.setItem(
        COOKIE_STORAGE_KEY,
        JSON.stringify({ choice, at: new Date().toISOString() })
      );
    } catch {
      // ignore
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-xl rounded-xl border border-white/15 bg-ink p-5 text-white shadow-[var(--shadow-float)] sm:p-6"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-electric/15 text-electric-glow">
          <Cookie className="h-4 w-4" />
        </span>
        <div>
          <p className="font-display text-sm font-semibold">Cookies & ad measurement</p>
          <p className="mt-1.5 text-xs leading-relaxed text-white/60">
            We use Meta (Facebook) measurement cookies to understand how our ads perform and to
            improve our programs. You can accept or reject - your choice is saved and can be
            changed anytime from Cookie settings in our privacy policy.
          </p>
        </div>
      </div>
      <div className="mt-4 flex gap-2.5">
        <Button
          onClick={() => handleChoice('accepted')}
          className="h-auto flex-1 px-4 py-2.5 text-sm font-semibold text-white"
          style={{ background: 'var(--gradient-electric)' }}
        >
          Accept
        </Button>
        <Button
          onClick={() => handleChoice('rejected')}
          variant="outline"
          className="h-auto flex-1 border-white/20 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
        >
          Reject
        </Button>
      </div>
    </div>
  );
}
