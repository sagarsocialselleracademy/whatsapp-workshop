import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { trackPageView } from '@/lib/cms';
import { CookieConsent } from '@/components/CookieConsent';
import { HomePage } from '@/pages/HomePage';
import { WhatsappWorkshopPage } from '@/pages/WhatsappWorkshopPage';
import { ProgramsPage } from '@/pages/ProgramsPage';
import { ProgramDetailPage } from '@/pages/ProgramDetailPage';
import { ConsultancyPage } from '@/pages/ConsultancyPage';
import { BlogsPage } from '@/pages/BlogsPage';
import { TermsPage } from '@/pages/TermsPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { AuthPage } from '@/pages/AuthPage';
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminPrograms } from '@/pages/admin/AdminPrograms';
import { AdminProgramEdit } from '@/pages/admin/AdminProgramEdit';
import { AdminMedia } from '@/pages/admin/AdminMedia';
import { AdminSettings } from '@/pages/admin/AdminSettings';

function ScrollAndAnalyticsObserver() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollAndAnalyticsObserver />
      <Routes>
        <Route path="/" element={<WhatsappWorkshopPage />} />
        <Route path="/whatsapp-workshop" element={<WhatsappWorkshopPage />} />
        <Route path="/whatsapp-marketing-workshop" element={<WhatsappWorkshopPage />} />
        <Route path="/workshop" element={<WhatsappWorkshopPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/portfolio" element={<HomePage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/:programId" element={<ProgramDetailPage />} />
        <Route path="/consultancy" element={<ConsultancyPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="programs" element={<AdminPrograms />} />
          <Route path="programs/:id" element={<AdminProgramEdit />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <CookieConsent />
    </BrowserRouter>
  );
}
