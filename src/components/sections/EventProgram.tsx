import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Award, GlassWater, Mic2, MoonStar, Music2, Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';
import { CONTENT } from '../../data/galaData';
import type { ProgramEntry } from '../../data/galaData';
import { EASE_LUX } from '../../lib/motion';
import Ornament, { Eyebrow } from '../ui/Ornament';
import Reveal from '../ui/Reveal';

const ICONS: Record<ProgramEntry['icon'], typeof Mic2> = {
  mic: Mic2,
  award: Award,
  music: Music2,
  glass: GlassWater,
  moon: MoonStar,
  spotlight: Sparkles,
};

export default function EventProgram() {
  const t = CONTENT;
  const p = t.program;
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  // Progress line fills as the program scrolls through the middle of the screen.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 65%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  // The entry closest to the centre of the screen is “live”: its time glows.
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="program" className="relative z-10 scroll-mt-[var(--nav-h)] overflow-hidden bg-navy text-ivory">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[25%] top-[-10%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(0,61,165,0.35),transparent_62%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal className="text-center">
          <Eyebrow className="text-champagne/85">{p.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[2.6rem] uppercase leading-none tracking-legacy text-champagne sm:text-6xl" style={{ paddingLeft: '0.14em' }}>
            {p.title}
          </h2>
          <Ornament className="mt-6" />
          <p className="mx-auto mt-6 max-w-xl text-pretty text-[1rem] leading-relaxed text-ivory/70">{p.intro}</p>
        </Reveal>

        <ol ref={listRef} className="relative mt-14 sm:mt-16">
          {/* Track + animated progress */}
          <span aria-hidden="true" className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-champagne/15 sm:left-[7.9rem]">
            <motion.span
              className="absolute inset-0 origin-top bg-gradient-to-b from-champagne via-champagne/80 to-champagne/30"
              style={{ scaleY: reduce ? 1 : progress }}
            />
          </span>
          {p.entries.map((entry, i) => {
            const Icon = ICONS[entry.icon];
            return (
              <Reveal
                as="li"
                key={entry.title}
                delay={i * 0.06}
                className="group/entry relative grid grid-cols-[2.75rem_1fr] gap-x-4 pb-10 last:pb-0 sm:grid-cols-[6.5rem_2.75rem_1fr] sm:gap-x-5"
              >
                {/* Invisible sentinel: marks this entry “live” while it crosses the centre band of the screen */}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  onViewportEnter={() => setActive(i)}
                  onViewportLeave={() => setActive((cur) => (cur === i ? null : cur))}
                  viewport={{ margin: '-42% 0px -42% 0px' }}
                />
                {/* time (desktop column) */}
                <p
                  className={`hidden pt-2 text-right font-display text-xl tracking-[0.06em] transition-[color,text-shadow] duration-700 ease-lux sm:block ${
                    active === i ? 'text-champagne [text-shadow:0_0_18px_rgba(201,166,107,0.55)]' : 'text-champagne/70'
                  }`}
                >
                  {entry.time}
                </p>
                <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-champagne/60 bg-navy transition-[border-color,transform] duration-700 ease-lux group-hover/entry:scale-105 group-hover/entry:border-champagne group-active/entry:scale-105">
                  {/* Luminous indicator */}
                  <motion.span
                    aria-hidden="true"
                    className={`absolute inset-0 rounded-full ${reduce ? '' : 'glow-breathe'}`}
                    initial={false}
                    animate={{ opacity: active === i ? 1 : 0 }}
                    transition={{ duration: 0.9, ease: EASE_LUX }}
                  />
                  <Icon className="relative h-[1.15rem] w-[1.15rem] text-champagne" strokeWidth={1.25} aria-hidden="true" />
                </span>
                <div className="-mx-3 -mt-1 rounded-[2px] px-3 pt-2 transition-[background-color,transform] duration-700 ease-lux group-hover/entry:translate-x-1 group-hover/entry:bg-ivory/[0.035] group-active/entry:bg-ivory/[0.05] motion-reduce:transform-none">
                  <p
                    className={`font-display text-lg tracking-[0.06em] text-champagne transition-[text-shadow] duration-700 ease-lux sm:hidden ${
                      active === i ? '[text-shadow:0_0_16px_rgba(201,166,107,0.6)]' : ''
                    }`}
                  >
                    {entry.time}
                  </p>
                  <h3 className="text-xl font-semibold tracking-[0.02em] text-ivory sm:pt-1.5 sm:text-2xl">{entry.title}</h3>

                  {entry.people && (
                    <ul className="mt-4 divide-y divide-champagne/15 border-y border-champagne/15">
                      {entry.people.map((person) => (
                        <li key={person.name} className="py-3 text-[0.95rem] leading-snug">
                          <span className="text-ivory/90">{person.name}</span>
                          {person.note && <span className="mt-0.5 block text-[0.82rem] italic text-ivory/55">{person.note}</span>}
                        </li>
                      ))}
                    </ul>
                  )}

                  {entry.segments && (
                    <div className="relative mb-2 mt-6 rounded-[2px] border border-champagne/40 bg-gradient-to-br from-legacy/25 to-transparent p-5 transition-colors duration-700 ease-lux group-hover/entry:border-champagne/70 sm:p-6">
                      <span aria-hidden="true" className="pointer-events-none absolute inset-1.5 border border-champagne/15" />
                      <p className="relative text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-champagne">{entry.segmentsTitle}</p>
                      <ol className="relative mt-4 space-y-3">
                        {entry.segments.map((seg, j) => {
                          const SegIcon = ICONS[seg.kind];
                          return (
                            <li key={`${seg.title}-${j}`} className="flex items-center gap-3 text-[0.95rem] text-ivory/90">
                              <SegIcon className={`h-4 w-4 shrink-0 ${seg.kind === 'music' ? 'text-sky' : 'text-champagne'}`} strokeWidth={1.4} aria-hidden="true" />
                              <span>{seg.title}</span>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ol>

      </div>
    </section>
  );
}
