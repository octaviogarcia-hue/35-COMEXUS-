import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CalendarDays, ChevronDown, Clock, MapPin, QrCode } from 'lucide-react';
import { useRef } from 'react';
import { ASSETS } from '../../data/galaData';
import { useLanguage } from '../../i18n/LanguageContext';
import { Comexus35Mark, Freedom250Mark, Fulbright80Mark, LogoSlot } from '../ui/Logos';
import Ornament, { Eyebrow } from '../ui/Ornament';
import TitleLockup from '../ui/TitleLockup';

const ICONS = { calendar: CalendarDays, clock: Clock, pin: MapPin };

interface Props {
  onMeetAlumni: () => void;
  onViewProgram: () => void;
  onScrollNext: () => void;
}

export default function Hero({ onMeetAlumni, onViewProgram, onScrollNext }: Props) {
  const { t } = useLanguage();
  const h = t.hero;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const lockupY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const lockupOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0.15]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);

  const appear = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pb-14 pt-[calc(var(--nav-h)+2.5rem)] sm:pb-20"
    >
      {/* Atmosphere: soft radial glows in Fulbright blues + fine champagne frame */}
      <motion.div aria-hidden="true" style={{ y: glowY }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[18%] h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,119,200,0.28),transparent_62%)]" />
        <div className="absolute -left-[20%] bottom-[-10%] h-[45vmax] w-[45vmax] rounded-full bg-[radial-gradient(circle,rgba(0,61,165,0.35),transparent_65%)]" />
        <div className="absolute -right-[18%] top-[30%] h-[38vmax] w-[38vmax] rounded-full bg-[radial-gradient(circle,rgba(0,169,224,0.12),transparent_65%)]" />
      </motion.div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-3 -z-10 rounded-[2px] border border-champagne/15 sm:inset-5" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-4 text-center sm:px-6">
        <motion.div {...appear(0)}>
          <Eyebrow className="text-champagne/90">{h.eyebrow}</Eyebrow>
        </motion.div>

        <motion.div style={{ y: lockupY, opacity: lockupOpacity }} className="mt-6 w-full sm:mt-8">
          <TitleLockup {...h.lockup} />
        </motion.div>

        <motion.div {...appear(0.9)} className="mt-7 w-full">
          <Ornament />
          <p className="mx-auto mt-5 max-w-xl text-balance font-display text-[1.2rem] italic leading-snug text-ivory/90 sm:text-2xl">
            “{h.tagline}”
          </p>
        </motion.div>

        {/* Event facts card */}
        <motion.dl
          {...appear(1.1)}
          className="mt-9 grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-sm border border-champagne/30 bg-navy/60 text-left backdrop-blur-sm sm:grid-cols-[auto_auto_1.6fr]"
        >
          {h.facts.map((f, i) => {
            const Icon = ICONS[f.icon];
            return (
              <div
                key={f.label}
                className={`flex items-start gap-3.5 px-5 py-4 sm:px-6 sm:py-5 ${i > 0 ? 'border-t border-champagne/20 sm:border-l sm:border-t-0' : ''}`}
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-champagne" strokeWidth={1.25} aria-hidden="true" />
                <div>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-champagne/85">{f.label}</dt>
                  <dd className="mt-1 text-[0.95rem] font-medium leading-snug text-ivory">
                    {f.value}
                    {f.detail && <span className="mt-0.5 block text-[0.82rem] font-normal text-ivory/65">{f.detail}</span>}
                  </dd>
                </div>
              </div>
            );
          })}
        </motion.dl>

        {/* CTAs */}
        <motion.div {...appear(1.3)} className="mt-8 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onMeetAlumni}
            className="group inline-flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-champagne px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-champagne transition-colors hover:bg-champagne hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne sm:w-auto"
          >
            <QrCode className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            {h.ctaAlumni}
            <span className="hidden rounded-full border border-current/40 px-2 py-0.5 text-[0.6rem] tracking-[0.18em] opacity-80 min-[400px]:inline">{h.ctaAlumniHint}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onViewProgram}
            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium tracking-[0.08em] text-ivory/80 underline decoration-champagne/50 underline-offset-[6px] transition-colors hover:text-champagne"
          >
            {h.ctaProgram}
          </button>
        </motion.div>

        {/* Logo band */}
        <motion.div {...appear(1.5)} className="mt-12 w-full">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-ivory/50">{h.logosLabel}</p>
          <div className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-5 border-y border-champagne/15 py-5 sm:gap-x-12">
            <LogoSlot src={ASSETS.logos.comexus35} alt="COMEXUS 35th Anniversary · Fulbright-COMEXUS" className="h-11 sm:h-12" fallback={<Comexus35Mark className="h-11 sm:h-12" />} />
            <span className="hidden h-8 w-px bg-champagne/25 sm:block" aria-hidden="true" />
            <LogoSlot src={ASSETS.logos.fulbright80} alt="Fulbright Program 80th Anniversary" className="h-11 sm:h-12" fallback={<Fulbright80Mark className="h-11 sm:h-12" />} />
            <span className="hidden h-8 w-px bg-champagne/25 sm:block" aria-hidden="true" />
            <LogoSlot src={ASSETS.logos.freedom250} alt="Freedom 250" className="h-11 sm:h-12" fallback={<Freedom250Mark className="h-11 sm:h-12" />} />
          </div>
        </motion.div>

        <motion.button
          type="button"
          onClick={onScrollNext}
          {...appear(1.8)}
          className="mt-10 flex flex-col items-center gap-1 text-[0.6rem] uppercase tracking-[0.3em] text-ivory/45 hover:text-champagne"
          aria-label={h.scrollHint}
        >
          {h.scrollHint}
          <ChevronDown className={`h-4 w-4 ${reduce ? '' : 'animate-bounce-slow'}`} strokeWidth={1.25} aria-hidden="true" />
        </motion.button>
      </div>
    </section>
  );
}
