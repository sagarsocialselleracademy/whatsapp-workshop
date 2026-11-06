# Lakshit Sethiya Website (Complete Clone)

Complete React + Vite + Tailwind CSS + TypeScript clone of [lakshitsethiya.com](https://lakshitsethiya.com/), with all media assets, programs, session photos, and a standalone local CMS pre-loaded.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

## Pages & Routes

- `/` — **Home Page**: Hero with intro video, Marquee, Speaker & Recognition logos, Filterable Product & Program Catalog, About Lakshit, Why Choose Us, Video Feedback (Wistia players), 21-Photo Session Gallery with lightbox, Book Banner, FAQ Accordion, and Footer.
- `/programs` — **All Programs**: Full catalog with search, category tabs, mode pills, date filter, and detail drawer.
- `/programs/:programId` — **Program Detail**: Dedicated landing pages for all 5 live programs (including the Raipur Offline Workshop with live countdown timer, press clippings, and WhatsApp review carousel).
- `/consultancy` — **1:1 AI Consultancy**: Formats, process steps, focus areas, client logos, and booking modal.
- `/blogs` — **Insights & Articles**: Searchable blog grid with category filters, newsletter signup, and full-article reader modal.
- `/terms` & `/privacy` — **Legal Pages**: Terms & Conditions and Privacy Policy.
- `/auth` & `/admin` — **Standalone Admin CMS**: Manage programs, media uploads, and site-wide settings (persisted in `localStorage` with one-click reset to live defaults).

## Project Structure

- `public/__l5e/assets-v1/` — All 54 original images, logos, press clippings, WhatsApp review screenshots, `hero-intro.mp4`, and `Lakshit_Sethiya_AI_Portfolio.pdf`.
- `public/assets/` — Workshop & keynote fallback thumbnails.
- `src/lib/cms.tsx` — Standalone CMS data layer pre-seeded with live Supabase data (`programs`, `site_settings`, `media_items`, and `GALLERY_PHOTOS`).
- `src/lib/assets.ts` — Local asset path constants.
- `src/lib/product-categories.ts` — Category, mode, date filtering, and membership tier helpers.
- `src/components/` — Reusable UI components (`NoticeBar`, `Header`, `ProductCatalog`, `SpeakerLogos`, `VideoFeedback`, `ContactDialog`, `StickyCta`, `CookieConsent`, etc.).
- `src/pages/` — All public and admin route views.
- `src/styles/index.css` — Full stylesheet, theme variables, animations, and utility classes.
