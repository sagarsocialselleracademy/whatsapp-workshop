import React from 'react';
import { Link } from 'react-router-dom';
import { Header, NoticeBar } from '@/components/NoticeBar';
import { openCookieSettings } from '@/components/CookieConsent';

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PrivacyPage() {
  return (
    <div id="top" className="min-h-screen bg-paper">
      <NoticeBar />
      <Header />
      <main className="px-5 pb-24 pt-40 sm:px-10 sm:pt-48">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-electric">Legal</p>
          <h1 className="mt-4 font-display text-[clamp(2rem,6vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: 20 October 2026</p>

          <div className="mt-12 space-y-10 text-base leading-relaxed text-ink/85">
            <LegalSection title="1. Who we are">
              Lakshit Sethiya (“we”, “us”) provides AI training programs, workshops, recorded
              courses, and private consultancy calls. This Privacy Policy explains how we collect,
              use, and protect your personal information when you use our website or register for
              our services.
            </LegalSection>

            <LegalSection title="2. Information we collect">
              <BulletList
                items={[
                  'Contact details you provide at registration: your name, mobile number, and (optionally) email address.',
                  'Details you share on WhatsApp when registering, such as your purpose and preferred contact time.',
                  'Information from your participation: questions asked during sessions and feedback you provide.',
                  'Basic technical data collected automatically, such as the pages you visit and approximate location, through standard analytics tools.',
                ]}
              />
            </LegalSection>

            <LegalSection title="3. How we use your information">
              <BulletList
                items={[
                  'To confirm your registration and process your payment.',
                  'To schedule and conduct the program or consultancy call, and to share recordings with you.',
                  'To respond to your enquiries and provide ongoing support related to the service.',
                  'To improve our programs, content, and website based on aggregate usage patterns.',
                  'To send you relevant updates about new programs or sessions, only where you have opted in. You can opt out at any time.',
                ]}
              />
            </LegalSection>

            <LegalSection title="4. Payment information">
              We do not store your full card or payment instrument details on our servers. Payment
              processing is handled by trusted third-party payment providers under their own
              security standards. We retain only the transaction reference and the amount for
              record-keeping.
            </LegalSection>

            <LegalSection title="5. WhatsApp & third-party tools">
              When you register via WhatsApp, your details are handled within WhatsApp&apos;s own
              platform and its privacy policy applies. We also use third-party tools such as video
              hosting (YouTube) and video conferencing (Zoom) to deliver sessions. These services
              have their own privacy policies governing data collected on their platforms.
            </LegalSection>

            <LegalSection title="6. Data sharing">
              We do not sell your personal information. We may share your information only in these
              limited cases:
              <BulletList
                items={[
                  'With our team members who need it to schedule and deliver your session.',
                  'With service providers who help us operate (payment, video, email), under appropriate confidentiality.',
                  'Where required by law, regulation, or a valid legal request.',
                ]}
              />
            </LegalSection>

            <LegalSection title="7. Data retention">
              We keep your personal information only as long as needed to provide the service and to
              meet legal or accounting requirements. After that, we delete or anonymise it.
            </LegalSection>

            <LegalSection title="8. Your rights">
              You may request access to, correction of, or deletion of the personal information we
              hold about you. To do so, contact us using the details below. We will respond within a
              reasonable period, typically within 7 working days.
            </LegalSection>

            <LegalSection title="9. Security">
              We take reasonable technical and organisational measures to protect your information
              against unauthorised access, loss, or misuse. However, no method of transmission over
              the internet is fully secure, and we cannot guarantee absolute security.
            </LegalSection>

            <LegalSection title="10. Children's privacy">
              Our services are intended for individuals aged 18 and above. We do not knowingly
              collect personal information from minors. If you believe a minor has provided us
              information, please contact us and we will delete it.
            </LegalSection>

            <LegalSection title="11. Changes to this policy">
              We may update this Privacy Policy from time to time. The updated version will be
              published on this page with the revised date. Continued use of our services after
              changes constitutes acceptance of the updated policy.
            </LegalSection>

            <LegalSection title="12. Advertising measurement (Meta)">
              We use the Meta Pixel, a measurement tool from Meta Platforms, Inc., to understand how
              visitors arrive from our Facebook and Instagram ads and how they use this website. The
              pixel reports page views and actions you take on the site to Meta for ad measurement
              and ad optimisation purposes. In regions that require consent, the pixel stays off
              until you accept it in our cookie banner; elsewhere it runs as standard website
              measurement. You can change or withdraw your choice at any time using the Cookie
              settings button below — withdrawal stops further measurement immediately.
            </LegalSection>

            <LegalSection title="13. Contact us">
              If you have any questions about this Privacy Policy or how your data is handled,
              please reach out using the details below.
            </LegalSection>
          </div>

          <div className="mt-14 rounded-xl border border-border bg-card p-7">
            <p className="font-display text-lg font-semibold text-ink">Contact about privacy</p>
            <p className="mt-2 text-sm text-muted-foreground">
              WhatsApp:{' '}
              <a
                href="https://wa.me/918370044449"
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium text-electric underline-offset-2 hover:underline"
              >
                +91 83700 44449
              </a>
              <br />
              Email:{' '}
              <a
                href="mailto:socialsellertechnology@gmail.com"
                className="font-medium text-electric underline-offset-2 hover:underline"
              >
                socialsellertechnology@gmail.com
              </a>
              <br />
              Raipur, Chhattisgarh, India
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-ink px-6 py-10 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-sm font-semibold text-white">Lakshit Sethiya</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60">
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/consultancy" className="hover:text-white">
              Consultancy
            </Link>
            <button
              type="button"
              onClick={openCookieSettings}
              className="hover:text-white cursor-pointer"
            >
              Cookie settings
            </button>
          </div>
          <p className="eyebrow text-white/35">Speaker & workshop portfolio · Raipur, India</p>
        </div>
      </footer>
    </div>
  );
}
