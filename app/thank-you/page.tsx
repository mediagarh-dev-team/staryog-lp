import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarCheck, Clock, Wifi } from 'lucide-react';
import { EVENT, HOST } from '@/lib/content';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "You're registered! | Sound Healing: Myths and Facts",
  description: 'Your spot is confirmed for the free live webinar on 3 December 2026 at 11 AM IST.',
  robots: { index: false, follow: false },
};

const details = [
  { icon: CalendarCheck, label: 'Date', value: EVENT.date },
  { icon: Clock, label: 'Time', value: EVENT.time },
  { icon: Wifi, label: 'Format', value: EVENT.format },
];

export default function ThankYouPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col bg-night text-cream">
        {/* Header */}
        <header className="container-x flex items-center justify-between py-6">
          <div className="rounded-2xl bg-cream px-3 py-2 shadow-lg">
            <Image
              src="/images/staryog-logo.png"
              alt="Star Yog Studio"
              width={180}
              height={86}
              priority
              className="h-[56px] w-auto sm:h-[72px]"
            />
          </div>
          <Image
            src="/images/ish-logo.png"
            alt="Institute of Sound Healing"
            width={88}
            height={88}
            priority
            className="h-16 w-16 rounded-full bg-white sm:h-[88px] sm:w-[88px]"
          />
        </header>

        {/* Hero */}
        <section className="container-x flex flex-1 flex-col items-center justify-center gap-12 py-16 text-center lg:flex-row lg:items-start lg:gap-20 lg:py-24 lg:text-left">
          {/* Copy */}
          <div className="rise max-w-xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-amber/80 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-amber">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-amber" />
              Spot confirmed
            </span>

            <h1 className="mt-6 font-serif text-[clamp(2.6rem,5.5vw,4.25rem)] font-normal leading-[1.08]">
              You're in,
              <br />
              <em className="text-amber-soft">see you there!</em>
            </h1>

            <p className="mt-5 max-w-[520px] text-lg leading-relaxed text-ondark">
              Your seat is reserved for the free live webinar. Check your email and WhatsApp for the joining link — it's
              on its way.
            </p>

            {/* Event details */}
            <dl className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-10">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-saffron/15 text-amber">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <div className="text-left">
                    <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-amber">{label}</dt>
                    <dd className="mt-0.5 font-medium text-cream">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            {/* What to do next */}
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber mb-4">What to do next</p>
              <ol className="flex flex-col gap-3">
                {[
                  'Save 3 December 2026, 11 AM IST in your calendar',
                  'Look out for the joining link on your email & WhatsApp',
                  'Join 5 minutes early for the best experience',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-saffron/20 text-xs font-bold text-amber">
                      {i + 1}
                    </span>
                    <span className="text-ondark">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="mt-8 text-sm text-ondark/70">
              Hosted by <span className="font-semibold text-ondark">{HOST}</span>, ISH certified sound healing trainer
            </p>
          </div>

          {/* Host image card */}
          <div className="rise w-full max-w-[380px] shrink-0 overflow-hidden rounded-3xl shadow-[0_32px_64px_rgb(0_0_0/0.5)] [animation-delay:150ms]">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/host.jpg"
                alt={HOST}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 90vw, 380px"
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'linear-gradient(to top, rgb(20 11 42 / 0.85) 0%, transparent 50%)',
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-serif text-xl text-cream">{HOST}</p>
                <p className="mt-1 text-sm text-ondark">ISH certified sound healing trainer</p>
              </div>
            </div>
          </div>
        </section>

        {/* Back link */}
        <div className="container-x pb-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ondark/60 transition hover:text-ondark"
          >
            <ArrowRight size={14} className="rotate-180" />
            Back to main page
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
