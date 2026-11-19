import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CalendarDays, ChevronDown, Clock, MapPin, QrCode } from 'lucide-react';
import { Fragment, useRef, useState } from 'react';
import { ASSETS } from '../../data/galaData';
import { useLanguage } from '../../i18n/LanguageContext';
import { EASE_LUX } from '../../lib/motion';
import { Comexus35Mark, Freedom250Mark, Fulbright80Mark, LogoSlot } from '../ui/Logos';
import Ornament, { Eyebrow } from '../ui/Ornament';
import TitleLockup from '../ui/TitleLockup';

const ICONS = { calendar: CalendarDays, clock: Clock, pin: MapPin };

/**
 * Entrance choreography (seconds). One orchestrated sequence, top to bottom:
 * eyebrow → three lockup lines → divider draws → tagline → fact rows →
 * CTAs → logo band (one logo at a time) → scroll cue.
 */
const T = {
  eyebrow: 0.1,
  lockup: 0.3, // + 0.24 per line inside <TitleLockup>
  divider: 1.15,
  tagline: 1.3,
  facts: 1.5, // + 0.12 per row
  cta: 1.95,
  logosLabel: 2.15,
  logos: 2.25, // + 0.12 per logo
  cue: 2.8,
};

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

  // Scroll-linked parallax (lockup drifts down and fades, glows drift up).
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const lockupY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const lockupOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0.15]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);

  // The ambient aura breathes only while the guest has not scrolled yet.
  const { scrollY } = useScroll();
  const [idle, setIdle] = useState(() => typeof window === 'undefined' || window.scrollY < 24);
  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y < 24;
    if (next !== idle) setIdle(next);
  });

  const rise = (delay: number, y = 16) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, delay, ease: EASE_LUX },
        };

  const logos = [
    { src: ASSETS.logos.comexus35White, alt: 'COMEXUS 35th Anniversary · Fulbright-COMEXUS', Fallback: Comexus35Mark, size: 'h-14 sm:h-[3.75rem]' },
    { src: ASSETS.logos.fulbright80, alt: 'Fulbright Program 80th Anniversary', Fallback: Fulbright80Mark, size: 'h-11 sm:h-12' },
    { src: ASSETS.logos.freedom250White, alt: 'Freedom 250', Fallback: Freedom250Mark, size: 'h-16 sm:h-[4.5rem]' },
  ];

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pb-14 pt-[calc(var(--nav-h)+2.5rem)] sm:pb-20"
    >
      {/* Atmosphere: breathing aura in Legacy Blue / Azure + soft static glows */}
      <motion.div aria-hidden="true" style={{ y: glowY }} className="pointer-events-none absolute inset-0 -z-10">
        <div
          data-idle={idle}
          className="hero-aura absolute left-1/2 top-[12%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(0,119,200,0.34)_0%,rgba(0,61,165,0.22)_38%,transparent_64%)]"
        />
        <div className="absolute -left-[20%] bottom-[-10%] h-[45vmax] w-[45vmax] rounded-full bg-[radial-gradient(circle,rgba(0,61,165,0.35),transparent_65%)]" />
        <div className="absolute -right-[18%] top-[30%] h-[38vmax] w-[38vmax] rounded-full bg-[radial-gradient(circle,rgba(0,169,224,0.12),transparent_65%)]" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0, scale: 1.015 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: EASE_LUX }}
        className="pointer-events-none absolute inset-3 -z-10 rounded-[2px] border border-champagne/15 sm:inset-5"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-4 text-center sm:px-6">
        <motion.div {...rise(T.eyebrow, 10)}>
          <Eyebrow className="text-champagne/90">{h.eyebrow}</Eyebrow>
        </motion.div>

        <motion.div style={{ y: lockupY, opacity: lockupOpacity }} className="mt-6 w-full sm:mt-8">
          <TitleLockup {...h.lockup} delay={T.lockup} shimmer />
        </motion.div>

        <div className="mt-7 w-full">
          <motion.div
            initial={reduce ? false : { opacity: 0, scaleX: 0.2 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.2, delay: T.divider, ease: EASE_LUX }}
          >
            <Ornament />
          </motion.div>
          <motion.p
            {...rise(T.tagline)}
            className="mx-auto mt-5 max-w-xl text-balance font-display text-[1.2rem] italic leading-snug text-ivory/90 sm:text-2xl"
          >
            “{h.tagline}”
          </motion.p>
        </div>

        {/* Event facts card: frame fades in, then each row rises in turn */}
        <motion.dl
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: T.facts, ease: EASE_LUX }}
          className="mt-9 grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-sm border border-champagne/30 bg-navy/60 text-left backdrop-blur-sm sm:grid-cols-[auto_auto_1.6fr]"
        >
          {h.facts.map((f, i) => {
            const Icon = ICONS[f.icon];
            return (
              <motion.div
                key={f.label}
                {...rise(T.facts + 0.12 * (i + 1), 12)}
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
              </motion.div>
            );
          })}
        </motion.dl>

        {/* CTAs */}
        <motion.div {...rise(T.cta)} className="mt-8 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onMeetAlumni}
            className="group inline-flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-champagne px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-champagne transition-colors duration-500 ease-lux hover:bg-champagne hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne sm:w-auto"
          >
            <QrCode className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            {h.ctaAlumni}
            <span className="hidden rounded-full border border-current/40 px-2 py-0.5 text-[0.6rem] tracking-[0.18em] opacity-80 min-[400px]:inline">{h.ctaAlumniHint}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-lux group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onViewProgram}
            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium tracking-[0.08em] text-ivory/80 underline decoration-champagne/50 underline-offset-[6px] transition-colors duration-500 ease-lux hover:text-champagne"
          >
            {h.ctaProgram}
          </button>
        </motion.div>

        {/* Logo band: label, then one logo after another */}
        <div className="mt-12 w-full">
          <motion.p {...rise(T.logosLabel, 8)} className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-ivory/50">
            {h.logosLabel}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: T.logosLabel, ease: EASE_LUX }}
            className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-5 border-y border-champagne/15 py-5 sm:gap-x-12"
          >
            {logos.map(({ src, alt, Fallback, size }, i) => (
              <Fragment key={alt}>
                {i > 0 && <span className="hidden h-8 w-px bg-champagne/25 sm:block" aria-hidden="true" />}
                <motion.div {...rise(T.logos + 0.12 * i, 10)}>
                  <LogoSlot
                    src={src}
                    alt={alt}
                    className={size}
                    fallback={<Fallback className="h-11 sm:h-12" />}
                  />
                </motion.div>
              </Fragment>
            ))}
          </motion.div>
        </div>

        <motion.button
          type="button"
          onClick={onScrollNext}
          {...rise(T.cue, 6)}
          className="mt-10 flex flex-col items-center gap-1 text-[0.6rem] uppercase tracking-[0.3em] text-ivory/45 transition-colors duration-500 ease-lux hover:text-champagne"
          aria-label={h.scrollHint}
        >
          {h.scrollHint}
          <ChevronDown className={`h-4 w-4 ${reduce ? '' : 'animate-bounce-slow'}`} strokeWidth={1.25} aria-hidden="true" />
        </motion.button>
      </div>
    </section>
  );
}
