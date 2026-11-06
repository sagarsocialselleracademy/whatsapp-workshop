import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export const ADMIN_AUTH_KEY = 'ls_admin_authenticated_v1';

export function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      window.localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify({ email, at: Date.now() }));
      navigate('/admin', { replace: true });
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-5 py-20 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur">
        <p className="eyebrow text-white/50">Private area</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">
          {mode === 'signin' ? 'Admin sign in' : 'Create admin account'}
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block text-sm">
            <span className="text-white/60">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-md border border-white/12 bg-white/[0.06] px-4 py-3 text-white outline-none focus:border-electric"
            />
          </label>
          <label className="block text-sm">
            <span className="text-white/60">Password</span>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-md border border-white/12 bg-white/[0.06] px-4 py-3 text-white outline-none focus:border-electric"
            />
          </label>
          {message && <p className="text-sm text-electric-glow">{message}</p>}
          <Button type="submit" disabled={loading} className="w-full py-6 text-base">
            {loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="mt-6 text-sm text-white/60 underline underline-offset-4 cursor-pointer"
        >
          {mode === 'signin' ? 'Need an account? Create one' : 'Already have an account? Sign in'}
        </button>
      </div>
    </main>
  );
}
