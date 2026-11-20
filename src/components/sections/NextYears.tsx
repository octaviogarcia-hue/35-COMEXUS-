import { motion, useReducedMotion } from 'framer-motion';
import { Compass, Handshake, Users } from 'lucide-react';
import { CONTENT } from '../../data/galaData';
import { EASE_LUX } from '../../lib/motion';
import Ornament, { Eyebrow } from '../ui/Ornament';
import Reveal, { DrawLine } from '../ui/Reveal';

const ICONS = { compass: Compass, handshake: Handshake, users: Users };

/** "The Next 35 Years" — vision statement, three pillars and a closing line. */
export default function NextYears() {
  const f = CONTENT.future;
  const reduce = useReducedMotion();

  return (
    <section id="future" className="relative z-10 scroll-mt-[var(--nav-h)] overflow-hidden bg-navy text-ivory">
      {/* Atmosphere: Fulbright-blue glows and a faint 35 watermark */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[15%] -top-[10%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(0,119,200,0.22),transparent_62%)]" />
        <div className="absolute -left-[20%] bottom-[-20%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,rgba(0,61,165,0.35),transparent_64%)]" />
        <span className="absolute left-1/2 top-6 -translate-x-1/2 select-none font-display text-[13rem] leading-none text-champagne/[0.05] sm:text-[22rem]">35</span>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="text-champagne/85">{f.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-[2.5rem] uppercase leading-none tracking-legacy text-ivory sm:text-6xl" style={{ paddingLeft: '0.14em' }}>
            {f.title}
          </h2>
          <Ornament className="mt-6" />
          <div className="mt-6 space-y-4 text-pretty text-[1.02rem] leading-relaxed text-ivory/80 sm:text-[1.08rem]">
            {f.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {f.pillars.map((pillar, i) => {
            const Icon = ICONS[pillar.icon];
            return (
              <Reveal as="li" key={pillar.title} delay={i * 0.12} className="h-full">
                <motion.div
                  whileHover={reduce ? undefined : { y: -4 }}
                  whileTap={reduce ? undefined : { y: -4 }}
                  transition={{ duration: 0.6, ease: EASE_LUX }}
                  className="group/card relative flex h-full flex-col rounded-[2px] border border-champagne/30 bg-legacy/15 p-6 backdrop-blur-[2px] transition-colors duration-700 ease-lux hover:border-champagne/60 sm:p-8"
                >
                  <span aria-hidden="true" className="edge-glint" />
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-champagne/60 text-champagne transition-colors duration-700 ease-lux group-hover/card:bg-champagne group-hover/card:text-navy">
                      <Icon className="h-5 w-5" strokeWidth={1.3} aria-hidden="true" />
                    </span>
                    <span aria-hidden="true" className="font-display text-3xl text-champagne/35">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-[1.55rem] leading-tight tracking-[0.02em] text-ivory">{pillar.title}</h3>
                  <DrawLine className="mt-4 w-12 origin-left" delay={0.2 + i * 0.12} />
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-ivory/75">{pillar.text}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mx-auto mt-16 max-w-3xl text-center sm:mt-20">
          <Ornament />
          <p className="mt-6 text-balance font-display text-[1.75rem] italic leading-snug tracking-[0.01em] text-champagne sm:text-[2.6rem]">
            {f.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
