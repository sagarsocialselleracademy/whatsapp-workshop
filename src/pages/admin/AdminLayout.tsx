import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  ExternalLink,
  GraduationCap,
  Images,
  LogOut,
  Settings,
} from 'lucide-react';
import { ADMIN_AUTH_KEY } from '@/pages/AuthPage';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: BarChart3, exact: true },
  { to: '/admin/programs', label: 'Workshops', icon: GraduationCap, exact: false },
  { to: '/admin/media', label: 'Media & reviews', icon: Images, exact: false },
  { to: '/admin/settings', label: 'Website content', icon: Settings, exact: false },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleSignOut() {
    window.localStorage.removeItem(ADMIN_AUTH_KEY);
    navigate('/auth', { replace: true });
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <p className="font-display text-lg font-semibold tracking-tight">Website admin</p>
          <div className="flex items-center gap-4 text-sm">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white"
            >
              View site <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white cursor-pointer"
            >
              Sign out <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 pb-3 sm:px-8">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? 'bg-white text-neutral-950' : 'text-white/60 hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <Outlet />
      </main>
    </div>
  );
}
