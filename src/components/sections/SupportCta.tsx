import { ArrowUpRight, HeartHandshake } from 'lucide-react';
import { CONTENT } from '../../data/galaData';
import Ornament from '../ui/Ornament';
import { RevealGroup, RevealItem } from '../ui/Reveal';

/** "Investing in the Future" — donation call to action framed in Champagne. */
export default function SupportCta() {
  const s = CONTENT.support;

  return (
    <section id="support" className="relative z-10 scroll-mt-[var(--nav-h)] bg-ivory text-navy">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <RevealGroup
          stagger={0.12}
          className="relative mx-auto max-w-4xl rounded-[2px] border border-champagne bg-[#F8F3EA] px-6 py-14 text-center shadow-[0_30px_70px_-40px_rgba(0,43,73,0.55)] sm:px-14 sm:py-20"
        >
          {/* Double Champagne frame, gala-invitation style */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-2.5 border border-champagne/35 sm:inset-3.5" />
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-champagne/0 via-champagne to-champagne/0" />

          <RevealItem>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-champagne text-champagne">
              <HeartHandshake className="h-6 w-6" strokeWidth={1.2} aria-hidden="true" />
            </span>
          </RevealItem>
          <RevealItem as="h2" className="relative mt-6 text-balance font-display text-[2.3rem] leading-[1.05] tracking-[0.02em] text-navy sm:text-6xl">
            {s.title}
          </RevealItem>
          <RevealItem as="p" className="relative mt-3 font-script text-[2.1rem] leading-tight text-champagne sm:text-5xl">
            {s.subtitle}
          </RevealItem>
          <RevealItem y={0} className="relative mt-5">
            <Ornament />
          </RevealItem>
          <div className="relative mx-auto mt-6 max-w-2xl space-y-3 text-pretty text-[1.02rem] leading-relaxed text-navy/80 sm:text-[1.1rem]">
            {s.paragraphs.map((p) => (
              <RevealItem as="p" key={p.slice(0, 24)}>
                {p}
              </RevealItem>
            ))}
          </div>
          <RevealItem className="relative mt-9">
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-champagne px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-navy shadow-[0_14px_30px_-14px_rgba(201,166,107,0.9)] transition-colors duration-500 ease-lux hover:bg-navy hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne sm:w-auto"
            >
              {s.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-lux group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.6} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
