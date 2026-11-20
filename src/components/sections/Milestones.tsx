import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { CONTENT } from '../../data/galaData';
import type { Milestone } from '../../data/galaData';
import { EASE_LUX } from '../../lib/motion';
import CountUp from '../ui/CountUp';
import { Comexus35Mark, Freedom250Mark, Fulbright80Mark, LogoSlot } from '../ui/Logos';
import Ornament, { Eyebrow } from '../ui/Ornament';
import Reveal from '../ui/Reveal';

function MilestoneLogo({ item, index }: { item: Milestone; index: number }) {
  if (!item.logo) return null;
  const fallbacks = [
    <Comexus35Mark key="c" tone="dark" className="h-12" />,
    <Fulbright80Mark key="f" tone="dark" className="h-12" />,
    null,
    <div key="fr" className="rounded-sm bg-navy px-3 py-1.5">
      <Freedom250Mark className="h-10" />
    </div>,
  ];
  return <LogoSlot src={item.logo!} alt={item.logoAlt ?? ''} className="h-14 max-w-[11rem]" fallback={fallbacks[index]} />;
}

export default function Milestones() {
  const t = CONTENT;
  const m = t.milestones;
  const reduce = useReducedMotion();
  const gridRef = useRef<HTMLUListElement>(null);
  // Counters start together, once, when the grid is meaningfully on screen.
  const inView = useInView(gridRef, { once: true, amount: 0.35 });

  return (
    <section id="milestones" className="relative z-10 scroll-mt-[var(--nav-h)] bg-ivory text-navy">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="text-azure">{m.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-[2.3rem] leading-[1.05] tracking-[0.02em] sm:text-6xl">{m.title}</h2>
          <Ornament className="mt-6" />
          <p className="mt-6 text-pretty text-[1.05rem] leading-relaxed text-navy/75">{m.intro}</p>
        </Reveal>

        <ul ref={gridRef} className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {m.items.map((item, i) => (
            <Reveal as="li" key={item.number} delay={i * 0.08} className="h-full">
              {/* Inner layer handles the hover lift so it never fights the reveal transform */}
              <motion.div
                whileHover={reduce ? undefined : { y: -4 }}
                whileTap={reduce ? undefined : { y: -4 }}
                transition={{ duration: 0.6, ease: EASE_LUX }}
                className="group/card relative flex h-full flex-col overflow-hidden rounded-[2px] border border-champagne/50 bg-[#F8F3EA] p-6 shadow-[0_18px_40px_-30px_rgba(0,43,73,0.55)] transition-shadow duration-700 ease-lux hover:shadow-[0_30px_60px_-30px_rgba(0,43,73,0.6)] sm:p-7"
              >
                <span aria-hidden="true" className="pointer-events-none absolute inset-1.5 border border-champagne/20" />
                <span aria-hidden="true" className="edge-glint" />
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-legacy via-azure to-sky" />

                {/* Typography-only cards keep the logo row's height on multi-column layouts so the numbers line up */}
                <div className={`relative h-24 items-center ${item.logo ? 'flex' : 'hidden sm:flex'}`}>
                  <MilestoneLogo item={item} index={i} />
                </div>

                <div className="relative mt-6 flex items-end gap-3">
                  <CountUp
                    to={Number(item.number)}
                    start={inView}
                    delay={0.2 + i * 0.12}
                    className="font-display text-[5.2rem] leading-[0.8] text-legacy transition-colors duration-700 ease-lux group-hover/card:text-azure"
                  />
                  <span className="pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-champagne">{item.unit}</span>
                </div>
                <h3 className="relative mt-4 text-lg font-semibold leading-snug text-navy">{item.title}</h3>
                <span aria-hidden="true" className="relative mt-4 block h-px w-10 origin-left bg-champagne transition-transform duration-700 ease-lux group-hover/card:scale-x-[2.2]" />
                <p className="relative mt-4 text-[0.92rem] leading-relaxed text-navy/70">{item.caption}</p>
              </motion.div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
