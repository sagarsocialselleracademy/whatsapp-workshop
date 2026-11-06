import React from 'react';
import { Link } from 'react-router-dom';
import { Header, NoticeBar } from '@/components/NoticeBar';

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

export function TermsPage() {
  return (
    <div id="top" className="min-h-screen bg-paper">
      <NoticeBar />
      <Header />
      <main className="px-5 pb-24 pt-40 sm:px-10 sm:pt-48">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-electric">Legal</p>
          <h1 className="mt-4 font-display text-[clamp(2rem,6vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: 16 September 2026</p>

          <div className="mt-12 space-y-10 text-base leading-relaxed text-ink/85">
            <LegalSection title="1. Acceptance of terms">
              By registering for any workshop, course, training program, or private consultancy call
              offered by Lakshit Sethiya (“we”, “us”, or “the consultant”), you agree to be bound
              by these Terms &amp; Conditions. If you do not agree with any part of these terms,
              please do not register or participate.
            </LegalSection>

            <LegalSection title="2. Programs & services">
              We offer live workshops, recorded self-paced courses, and private consultancy calls.
              The format, duration, schedule, and delivery method (online via Zoom or in-person)
              for each program are described on its respective program page. We reserve the right to
              modify the schedule, curriculum, or delivery method with reasonable notice to
              registered participants.
            </LegalSection>

            <LegalSection title="3. Registration & payment">
              <BulletList
                items={[
                  'Registration is confirmed only after full payment of the listed fee, inclusive of applicable GST.',
                  'Coupon codes, when available, may be applied at checkout for a discounted price. Only one coupon may be used per registration.',
                  'Prices are listed in Indian Rupees (₹) and may change without prior notice. The price at the time of your registration is binding.',
                  'A registered seat is non-transferable to another individual without our prior written consent.',
                ]}
              />
            </LegalSection>

            <LegalSection title="4. Live programs">
              For live workshops and training sessions, our team connects with you after
              registration to share the most suitable time to conduct the session based on mutual
              availability. You are expected to join on time; sessions may begin as scheduled
              without waiting for late arrivals.
            </LegalSection>

            <LegalSection title="5. Recorded courses">
              Recorded, self-paced courses grant lifetime access to the enrolled participant. Access
              is tied to the email address used at registration and may not be shared with others.
              We may update or refresh course content over time.
            </LegalSection>

            <LegalSection title="6. Private consultancy calls">
              <BulletList
                items={[
                  'The consultancy call is a private 1.5-hour session conducted on Zoom.',
                  'After you register, our team reaches out to schedule the most suitable time slot.',
                  'A full recording of the call is shared with you for your reference.',
                  'The consultancy fee is ₹15,000 + GST. The coupon code CONSULT20, when applied, reduces the fee by 20%.',
                  'Strategies and recommendations shared during the call are advisory in nature. Implementation results depend on your execution and business context.',
                ]}
              />
            </LegalSection>

            <LegalSection title="7. Refund & cancellation policy">
              <BulletList
                items={[
                  'Recorded courses include a 100% money-back guarantee within the period stated on the program page, provided you have not completed more than the allowed portion of the content.',
                  'Live programs and private consultancy calls: cancellations requested at least 48 hours before the scheduled session are eligible for a full refund. Cancellations within 48 hours are non-refundable.',
                  'If we cancel a session, a full refund or a rescheduled slot will be offered at your preference.',
                ]}
              />
            </LegalSection>

            <LegalSection title="8. Intellectual property">
              All materials provided — including videos, slides, templates, recordings, and written
              content — are the intellectual property of Lakshit Sethiya. You may use them for your
              personal learning and internal business use. You may not reproduce, redistribute,
              sell, or publicly share any part of the materials without written permission.
            </LegalSection>

            <LegalSection title="9. Conduct">
              Participants are expected to maintain professional conduct during sessions.
              Harassment, abuse, or disruption may result in removal from the session without a
              refund.
            </LegalSection>

            <LegalSection title="10. Limitation of liability">
              Our programs and consultancy are provided on an “as is” basis. We are not liable for
              any indirect, incidental, or consequential damages arising from the use of our
              services or implementation of shared strategies. Our total liability is limited to the
              fee paid by you for the specific program or session.
            </LegalSection>

            <LegalSection title="11. Changes to terms">
              We may update these Terms &amp; Conditions from time to time. The latest version will
              always be available on this page with the updated date. Continued participation after
              changes constitutes acceptance of the revised terms.
            </LegalSection>

            <LegalSection title="12. Governing law">
              These terms are governed by the laws of India. Any disputes shall be subject to the
              exclusive jurisdiction of the courts in Raipur, Chhattisgarh.
            </LegalSection>
          </div>

          <div className="mt-14 rounded-xl border border-border bg-card p-7">
            <p className="font-display text-lg font-semibold text-ink">
              Questions about these terms?
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Reach out on WhatsApp at{' '}
              <a
                href="https://wa.me/918370044449"
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium text-electric underline-offset-2 hover:underline"
              >
                +91 83700 44449
              </a>{' '}
              or email{' '}
              <a
                href="mailto:socialsellertechnology@gmail.com"
                className="font-medium text-electric underline-offset-2 hover:underline"
              >
                socialsellertechnology@gmail.com
              </a>
              .
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
          </div>
          <p className="eyebrow text-white/35">Speaker & workshop portfolio · Raipur, India</p>
        </div>
      </footer>
    </div>
  );
}
