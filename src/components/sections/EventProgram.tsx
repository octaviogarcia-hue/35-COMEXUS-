import { Award, GlassWater, Mic2, MoonStar, Music2 } from 'lucide-react';
import type { ProgramEntry } from '../../data/galaData';
import { useLanguage } from '../../i18n/LanguageContext';
import Ornament, { Eyebrow } from '../ui/Ornament';
import Reveal from '../ui/Reveal';

const ICONS: Record<ProgramEntry['icon'], typeof Mic2> = {
  mic: Mic2,
  award: Award,
  music: Music2,
  glass: GlassWater,
  moon: MoonStar,
};

export default function EventProgram() {
  const { t } = useLanguage();
  const p = t.program;

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

        <ol className="relative mt-14 sm:mt-16">
          <span aria-hidden="true" className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-gradient-to-b from-champagne/70 via-champagne/30 to-champagne/0 sm:left-[7.9rem]" />
          {p.entries.map((entry, i) => {
            const Icon = ICONS[entry.icon];
            return (
              <Reveal as="li" key={entry.title} delay={i * 0.06} className="relative grid grid-cols-[2.75rem_1fr] gap-x-4 pb-10 last:pb-0 sm:grid-cols-[6.5rem_2.75rem_1fr] sm:gap-x-5">
                {/* time (desktop column) */}
                <p className="hidden pt-2 text-right font-display text-xl tracking-[0.06em] text-champagne sm:block">{entry.time}</p>
                <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-champagne/60 bg-navy">
                  <Icon className="h-[1.15rem] w-[1.15rem] text-champagne" strokeWidth={1.25} aria-hidden="true" />
                </span>
                <div className="pt-1">
                  <p className="font-display text-lg tracking-[0.06em] text-champagne sm:hidden">{entry.time}</p>
                  <h3 className="text-xl font-semibold tracking-[0.02em] text-ivory sm:pt-1.5 sm:text-2xl">{entry.title}</h3>

                  {entry.people && (
                    <ul className="mt-4 divide-y divide-champagne/15 border-y border-champagne/15">
                      {entry.people.map((person) => {
                        const tbc = person.note === 'tbc';
                        return (
                          <li key={person.name} className="py-3 text-[0.95rem] leading-snug">
                            <span className="text-ivory/90">{person.name}</span>
                            {person.note && !tbc && <span className="mt-0.5 block text-[0.82rem] text-ivory/55">{person.note}</span>}
                            {tbc && <em className="ml-1 text-[0.82rem] not-italic text-champagne/75">({p.toBeConfirmed})</em>}
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {entry.segments && (
                    <div className="relative mt-6 rounded-[2px] border border-champagne/40 bg-gradient-to-br from-legacy/25 to-transparent p-5 sm:p-6">
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

        <Reveal>
          <p className="mx-auto mt-14 max-w-xl border-t border-champagne/20 pt-6 text-center text-[0.8rem] italic leading-relaxed text-ivory/50">{p.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
