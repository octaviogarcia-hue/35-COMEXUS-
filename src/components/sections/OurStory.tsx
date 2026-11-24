import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { CONTENT } from '../../data/galaData';
import type { TimelineItem } from '../../data/galaData';
import ImageWithFallback from '../ui/ImageWithFallback';
import Ornament, { Eyebrow } from '../ui/Ornament';
import Reveal, { DrawLine, RevealGroup, RevealItem } from '../ui/Reveal';

function ArchivalFallback({ year, label }: { year: string; label: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-navy text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(201,166,107,0.35) 0 1px, transparent 1px 14px), radial-gradient(circle at 30% 20%, rgba(0,119,200,0.6), transparent 60%)',
        }}
      />
      <span className="relative font-display text-4xl tracking-[0.08em] text-champagne sm:text-5xl">{year}</span>
      <span className="relative flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.26em] text-ivory/60">
        <ImageIcon className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
        {label}
      </span>
    </div>
  );
}

const FRAME = 'relative w-full overflow-hidden rounded-[2px] shadow-[0_24px_50px_-28px_rgba(0,43,73,0.6)]';
const ARCHIVAL_TONE = 'grayscale-[35%] sepia-[15%]';

/**
 * Landscape archival photo shown at its own proportions: full width of the
 * frame, height follows the image, nothing cropped and no scroll zoom or drift.
 * While the file is missing it keeps a 4:3 frame with the elegant fallback.
 */
function LandscapePhoto({ item, photoPending }: { item: TimelineItem; photoPending: string }) {
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');
  return (
    <div className={`${FRAME} ${state === 'ok' ? '' : 'aspect-[4/3]'}`}>
      {state !== 'ok' && (
        <div className="absolute inset-0">
          <ArchivalFallback year={item.id} label={photoPending} />
        </div>
      )}
      {state !== 'error' && (
        <img
          src={item.image}
          alt={item.imageAlt}
          loading="lazy"
          decoding="async"
          onLoad={() => setState('ok')}
          onError={() => setState('error')}
          className={`relative block h-auto w-full object-contain transition-opacity duration-700 ${state === 'ok' ? 'opacity-100' : 'opacity-0'} ${ARCHIVAL_TONE}`}
        />
      )}
    </div>
  );
}

/**
 * Upright 3:4 frame for portraits, anchored at the top and without the parallax
 * drift, so heads are never cropped. Width is capped so small archival files
 * stay sharp on high-density screens.
 */
function PortraitPhoto({ item, photoPending }: { item: TimelineItem; photoPending: string }) {
  return (
    <div className={`${FRAME} aspect-[3/4]`}>
      <ImageWithFallback
        src={item.image}
        alt={item.imageAlt}
        className="h-full w-full"
        imgClassName={`object-top ${ARCHIVAL_TONE}`}
        fallback={<ArchivalFallback year={item.id} label={photoPending} />}
      />
    </div>
  );
}

function Milestone({ item, index, photoPending }: { item: TimelineItem; index: number; photoPending: string }) {
  const flip = index % 2 === 1;
  return (
    <li className="relative grid grid-cols-[1.75rem_1fr] gap-x-4 sm:gap-x-6 md:grid-cols-[1fr_3rem_1fr] md:gap-x-0">
      {/* Node on the spine */}
      <div className="relative flex justify-center md:col-start-2 md:row-start-1">
        <span className="sticky top-[calc(var(--nav-h)+2rem)] mt-1.5 grid h-5 w-5 place-items-center rounded-full border border-champagne bg-ivory">
          <span className="h-1.5 w-1.5 rounded-full bg-legacy" />
        </span>
      </div>

      {/* Text */}
      <Reveal
        className={`pb-8 md:row-start-1 md:pb-20 ${flip ? 'md:col-start-3 md:pl-10' : 'md:col-start-1 md:pr-10 md:text-right'}`}
      >
        <DrawLine className={`mb-5 w-full max-w-[14rem] origin-left ${flip ? '' : 'md:ml-auto md:origin-right'}`} />
        <p className="font-display text-[1.65rem] leading-none tracking-[0.04em] text-legacy sm:text-4xl">{item.year}</p>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-navy sm:text-xl">{item.title}</h3>
        <p className="mt-3 text-[0.97rem] leading-relaxed text-navy/80">{item.text}</p>
      </Reveal>

      {/* Photo */}
      <Reveal
        delay={0.1}
        className={`col-start-2 pb-14 md:row-start-1 md:pb-20 ${flip ? 'md:col-start-1 md:pr-10' : 'md:col-start-3 md:pl-10'}`}
      >
        <figure className={`relative ${item.portrait ? `max-w-[17rem] sm:max-w-[19rem] ${flip ? 'md:ml-auto' : ''}` : ''}`}>
          {item.portrait ? <PortraitPhoto item={item} photoPending={photoPending} /> : <LandscapePhoto item={item} photoPending={photoPending} />}
          <span aria-hidden="true" className="pointer-events-none absolute -inset-2 rounded-[2px] border border-champagne/50" />
        </figure>
      </Reveal>
    </li>
  );
}

/** Renders `text`, setting the first occurrence of `figure` in Champagne display type. */
function WithFigure({ text, figure }: { text: string; figure: string }) {
  const at = text.indexOf(figure);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="whitespace-nowrap font-display text-[1.35em] leading-none tracking-[0.02em] text-champagne">{figure}</span>
      {text.slice(at + figure.length)}
    </>
  );
}

export default function OurStory() {
  const t = CONTENT;
  const s = t.story;
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section id="story" className="relative z-10 scroll-mt-[var(--nav-h)] bg-ivory text-navy">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="text-azure">{s.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-[2.3rem] leading-[1.05] tracking-[0.02em] text-navy sm:text-6xl">{s.title}</h2>
          <Ornament className="mt-6" />
          <div className="mt-6 space-y-4 text-pretty text-[1.02rem] leading-relaxed text-navy/80 sm:text-[1.1rem]">
            {s.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Reveal>

        <div className="relative mt-16 sm:mt-24">
          {/* Spine + scroll progress */}
          <div aria-hidden="true" className="absolute bottom-0 left-[0.875rem] top-0 w-px bg-navy/15 md:left-1/2">
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-champagne via-champagne to-azure"
              style={{ scaleY: reduce ? 1 : progress }}
            />
          </div>
          <ol ref={listRef} className="relative">
            {s.timeline.map((item, i) => (
              <Milestone key={item.id} item={item} index={i} photoPending={s.photoPending} />
            ))}
          </ol>
        </div>

        {/* A LEGACY IN MOTION — frame first, then each line in sequence */}
        <RevealGroup
          stagger={0.16}
          delay={0.15}
          className="relative mx-auto mt-6 max-w-4xl overflow-hidden rounded-[2px] bg-navy px-6 py-14 text-center text-ivory sm:px-14 sm:py-20"
        >
          <RevealItem
            y={0}
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-[11rem] leading-none text-champagne/[0.08] sm:text-[18rem]"
          >
            35
          </RevealItem>
          <span aria-hidden="true" className="pointer-events-none absolute inset-3 border border-champagne/25" />
          <RevealItem>
            <Eyebrow className="relative text-champagne">{s.closing.eyebrow}</Eyebrow>
          </RevealItem>
          <div className="relative mx-auto mt-6 max-w-2xl space-y-4 text-pretty text-[1rem] leading-relaxed text-ivory/80 sm:text-[1.07rem]">
            {s.closing.paragraphs.map((p) => (
              <RevealItem as="p" key={p.slice(0, 24)}>
                <WithFigure text={p} figure={s.closing.figure} />
              </RevealItem>
            ))}
          </div>
          <RevealItem y={0} className="relative mt-8">
            <Ornament />
          </RevealItem>
          <RevealItem
            as="p"
            className="relative mx-auto mt-7 max-w-2xl text-balance font-display text-[1.4rem] leading-snug tracking-[0.02em] text-champagne sm:text-[1.85rem]"
          >
            {s.closing.highlight}
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
