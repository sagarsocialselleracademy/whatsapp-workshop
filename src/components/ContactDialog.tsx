import React, { useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { trackConversion } from '@/lib/cms';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/Dialog';

const WHATSAPP_NUMBER = '918370044449';
const PURPOSES = [
  'Book Keynote',
  'Corporate Training',
  'AI Consulting',
  'Workshop',
  'Partnership',
  'Media Interview',
  'Startup Mentorship',
  'General Inquiry',
] as const;

export function ContactDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [purpose, setPurpose] = useState<string>(PURPOSES[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    const trimmedName = name.trim();
    const trimmedMobile = mobile.trim();

    if (trimmedName.length < 2) errs.name = 'Please enter your name';
    else if (trimmedName.length > 80) errs.name = 'Name is too long';

    if (trimmedMobile.length < 7 || trimmedMobile.length > 20) {
      errs.mobile = 'Enter a valid mobile number';
    } else if (!/^[+0-9\s-]+$/.test(trimmedMobile)) {
      errs.mobile = 'Digits, spaces, + and - only';
    }

    return errs;
  };

  const whatsappUrl = (() => {
    const msg = `Hi Lakshit,\n\nName: ${name.trim()}\nMobile: ${mobile.trim()}\nPurpose: ${purpose}\n\nI'd like to discuss this with you.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  })();

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setReady(false);
      }}
    >
      <DialogContent className="overflow-hidden border-none bg-transparent p-0 shadow-none sm:max-w-lg">
        <div className="surface-ink relative rounded-3xl p-7 sm:p-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full opacity-40 blur-3xl"
            style={{ background: 'var(--gradient-electric)' }}
          />
          <DialogHeader className="relative space-y-2 text-left">
            <p className="eyebrow text-electric-glow">Book a session</p>
            <DialogTitle className="text-3xl leading-[1.05] font-semibold">
              Tell me about the room.
            </DialogTitle>
            <p className="text-sm text-white/60">
              Three fields. You get a session outline built for that audience.
            </p>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const errs = validate();
              if (Object.keys(errs).length > 0) {
                setErrors(errs);
                setReady(false);
                return;
              }
              setErrors({});
              setReady(true);
            }}
            className="relative mt-7 space-y-4"
            noValidate
          >
            <Field label="Name" error={errors.name}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                autoComplete="name"
                placeholder="Your full name"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-electric-glow focus:outline-none"
              />
            </Field>

            <Field label="Mobile number" error={errors.mobile}>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                maxLength={20}
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 ..."
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-electric-glow focus:outline-none"
              />
            </Field>

            <Field label="Purpose" error={errors.purpose}>
              <div className="flex flex-wrap gap-2">
                {PURPOSES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={purpose === p}
                    onClick={() => setPurpose(p)}
                    className={`rounded-md px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer ${
                      purpose === p
                        ? 'bg-white text-ink'
                        : 'border border-white/15 text-white/65 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </Field>

            {ready ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => void trackConversion('whatsapp_click')}
                className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-500 hover:scale-[1.015]"
                style={{ background: 'linear-gradient(120deg,#1faa59,#25d366)' }}
              >
                <MessageCircle className="h-4 w-4" />
                Contact on WhatsApp
              </a>
            ) : (
              <button
                type="submit"
                className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-transform duration-500 hover:scale-[1.015] cursor-pointer"
              >
                Continue
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            )}

            <p className="text-center text-[11px] text-white/40">
              Opens WhatsApp with your details pre-filled. Nothing is stored here.
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="eyebrow text-white/45">{label}</span>
      {children}
      {error ? <span className="block text-xs text-red-300">{error}</span> : null}
    </label>
  );
}
