import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Camera, ChevronLeft, ChevronRight, PlayCircle, Quote, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ALUMNI_LINKS, CONTENT, type Photographer, type ProfileId } from '../../data/galaData';
import { EASE_LUX } from '../../lib/motion';
import { PortraitMedallion, WorkImage, isUsable } from './parts';

interface Props {
  people: Photographer[];
  openId: ProfileId | null;
  onClose: () => void;
  onStep: (id: ProfileId) => void;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Locks page scroll while the modal is open, without a layout jump where scrollbars take space. */
function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const html = document.documentElement;
    const gap = window.innerWidth - html.clientWidth;
    const prev = { overflow: html.style.overflow, paddingRight: html.style.paddingRight };
    html.style.overflow = 'hidden';
    if (gap > 0) html.style.paddingRight = `${gap}px`;
    return () => {
      html.style.overflow = prev.overflow;
      html.style.paddingRight = prev.paddingRight;
    };
  }, [active]);
}

/**
 * Editorial detail view of a Fulbright-García Robles photographer: featured work
 * at full size (never cropped), portrait, biography, Fulbright Impact quote and
 * links, with Previous / Next fellow navigation. Driven entirely by the URL hash,
 * so QR codes (#/alumni/photographer-N) open it directly.
 */
export default function FellowModal({ people, openId, onClose, onStep }: Props) {
  const reduce = useReducedMotion();
  const ph = CONTENT.alumni.photography;
  const index = people.findIndex((p) => p.id === openId);
  const person = index >= 0 ? people[index] : null;
  const open = !!person;

  const panelRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useScrollLock(open);

  const prev = person ? people[(index - 1 + people.length) % people.length] : null;
  const next = person ? people[(index + 1) % people.length] : null;

  // Focus management: remember the trigger, focus the close button, restore on close.
  useEffect(() => {
    if (!open) return;
    returnFocus.current = (document.activeElement as HTMLElement) ?? null;
    const t = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 30);
    return () => {
      window.clearTimeout(t);
      const back = returnFocus.current;
      if (back && document.contains(back)) back.focus({ preventScroll: true });
    };
  }, [open]);

  // Each fellow starts at the top of the sheet.
  useEffect(() => {
    if (open) scrollerRef.current?.scrollTo({ top: 0 });
  }, [openId, open]);

  // Keyboard: Escape closes, arrows step, Tab stays inside the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight' && next) {
        onStep(next.id);
      } else if (e.key === 'ArrowLeft' && prev) {
        onStep(prev.id);
      } else if (e.key === 'Tab' && panelRef.current) {
        const nodes = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, next, prev, onClose, onStep]);

  const links = person ? ALUMNI_LINKS[person.id] : null;
  const fade = { duration: reduce ? 0 : 0.35, ease: EASE_LUX };

  // Portalled to <body> so it sits above the fixed navbar (the page <main> is its own stacking context).
  return createPortal(
    <AnimatePresence>
      {person && links && (
        <motion.div key="fellow-modal" className="fixed inset-0 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fade}>
          {/* Backdrop */}
          <div aria-hidden="true" className="absolute inset-0 bg-[#00131f]/85 backdrop-blur-[6px]" />

          {/* Scroll container — clicks on the empty area around the sheet close it */}
          <div
            ref={scrollerRef}
            className="absolute inset-0 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] sm:px-6 sm:py-10"
            onClick={(e) => {
              if (!panelRef.current?.contains(e.target as Node)) onClose();
            }}
          >
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="fellow-modal-name"
              initial={reduce ? false : { opacity: 0, y: 28, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 18 }}
              transition={{ duration: reduce ? 0 : 0.5, ease: EASE_LUX }}
              className="relative mx-auto min-h-full w-full max-w-4xl bg-[#F8F3EA] text-navy shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] sm:min-h-0 sm:rounded-[2px] sm:border sm:border-champagne/70"
            >
              {/* Sticky control bar */}
              <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-champagne/30 bg-navy/95 px-3 py-2 text-ivory backdrop-blur sm:px-5" style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top))' }}>
                <p className="pl-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-champagne/90">
                  <span className="hidden sm:inline">{ph.eyebrow} · </span>
                  <span className="font-display text-[0.9rem] tracking-[0.08em] text-ivory/90">{pad(index + 1)}</span>
                  <span className="text-ivory/45"> / {pad(people.length)}</span>
                </p>
                <div className="flex items-center gap-1">
                  {prev && (
                    <button type="button" onClick={() => onStep(prev.id)} className="grid h-11 w-11 place-items-center rounded-full text-ivory/80 transition-colors hover:bg-ivory/10 hover:text-champagne" aria-label={`${ph.modal.previous}: ${prev.name}`}>
                      <ChevronLeft className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                    </button>
                  )}
                  {next && (
                    <button type="button" onClick={() => onStep(next.id)} className="grid h-11 w-11 place-items-center rounded-full text-ivory/80 transition-colors hover:bg-ivory/10 hover:text-champagne" aria-label={`${ph.modal.next}: ${next.name}`}>
                      <ChevronRight className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                    </button>
                  )}
                  <span aria-hidden="true" className="mx-1 h-6 w-px bg-champagne/30" />
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    className="grid h-11 w-11 place-items-center rounded-full border border-champagne/50 text-champagne transition-colors hover:bg-champagne hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                    aria-label={ph.modal.close}
                  >
                    <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={person.id} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: reduce ? 0 : 0.28, ease: EASE_LUX }}>
                  {/* 1 · Featured work, whole */}
                  <figure className="bg-navy px-3 pb-5 pt-4 sm:px-8 sm:pb-7 sm:pt-8">
                    <div className="relative border border-champagne/50 p-1.5 sm:p-2">
                      <WorkImage src={person.work} alt={person.workTitle ? `${person.workTitle} by ${person.name}` : `${ph.workLabel} by ${person.name}`} pending={ph.workPending} eager />
                    </div>
                    <figcaption className="mt-3 text-[0.65rem] uppercase tracking-[0.24em] text-champagne/80">
                      {ph.workLabel}
                      {person.workTitle && <em className="ml-2 font-display text-[1rem] normal-case tracking-[0.02em] text-ivory/90">{person.workTitle}</em>}
                    </figcaption>
                  </figure>

                  <div className="px-5 pb-8 pt-7 sm:px-12 sm:pb-12 sm:pt-10">
                    {/* 2 · Fellow header */}
                    <header className="flex items-center gap-5">
                      <PortraitMedallion src={person.image} alt={`Portrait of ${person.name}`} position={person.imagePosition} />
                      <div className="min-w-0">
                        <h2 id="fellow-modal-name" className="font-display text-[1.9rem] leading-tight tracking-[0.02em] text-navy sm:text-[2.6rem]">
                          {person.name}
                        </h2>
                        <p className="mt-1.5 text-[0.72rem] font-semibold uppercase leading-snug tracking-[0.14em] text-legacy sm:text-[0.78rem]">{person.program}</p>
                      </div>
                    </header>

                    <div className="mt-6 h-px w-16 bg-champagne" aria-hidden="true" />

                    {/* 3 · Full biography */}
                    <p className="mt-6 max-w-[68ch] text-pretty text-[1rem] leading-[1.75] text-navy/85 sm:text-[1.05rem]">{person.bio}</p>

                    {/* 4 · Fulbright Impact */}
                    {person.quote && (
                      <blockquote className="relative mt-9 border border-[#C9A66B] bg-ivory/60 px-5 pb-6 pt-7 sm:px-9 sm:pb-8 sm:pt-9">
                        <span aria-hidden="true" className="pointer-events-none absolute inset-1.5 border border-[#C9A66B]/30" />
                        <span className="absolute -top-3 left-5 inline-flex items-center gap-2 bg-[#F8F3EA] px-2 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#C9A66B] sm:left-9">
                          <Quote className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                          {ph.quoteLabel}
                        </span>
                        <p className="relative text-pretty font-display text-[1.12rem] italic leading-snug text-navy sm:text-[1.3rem]">“{person.quote}”</p>
                      </blockquote>
                    )}

                    {/* 5 · External links (hidden while pending) */}
                    {(isUsable(links.portfolio) || isUsable(links.secondary?.href)) && (
                      <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap">
                        {isUsable(links.portfolio) && (
                          <a
                            href={links.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-ivory transition-colors duration-500 ease-lux hover:bg-legacy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne sm:w-auto"
                          >
                            <Camera className="h-4 w-4 text-champagne" strokeWidth={1.5} aria-hidden="true" />
                            {ph.cta}
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-lux group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
                            <span className="sr-only">(opens in a new tab)</span>
                          </a>
                        )}
                        {links.secondary && isUsable(links.secondary.href) && (
                          <a
                            href={links.secondary.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-champagne/70 px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-legacy transition-colors hover:border-champagne hover:bg-champagne/15 hover:text-navy sm:w-auto"
                          >
                            <PlayCircle className="h-4 w-4 text-champagne" strokeWidth={1.5} aria-hidden="true" />
                            {links.secondary.label}
                            <span className="sr-only">(opens in a new tab)</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 6 · Previous / Next fellow */}
                  {prev && next && (
                    <nav aria-label={ph.modal.navLabel} className="grid grid-cols-2 border-t border-champagne/35" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
                      <button type="button" onClick={() => onStep(prev.id)} className="group flex min-h-[72px] items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-navy/[0.04] sm:px-8">
                        <ChevronLeft className="h-5 w-5 shrink-0 text-champagne transition-transform group-hover:-translate-x-1" strokeWidth={1.5} aria-hidden="true" />
                        <span className="min-w-0">
                          <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-navy/50">{ph.modal.previous}</span>
                          <span className="block truncate font-display text-[1.05rem] text-navy sm:text-[1.2rem]">{prev.name}</span>
                        </span>
                      </button>
                      <button type="button" onClick={() => onStep(next.id)} className="group flex min-h-[72px] items-center justify-end gap-3 border-l border-champagne/35 px-4 py-4 text-right transition-colors hover:bg-navy/[0.04] sm:px-8">
                        <span className="min-w-0">
                          <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-navy/50">{ph.modal.next}</span>
                          <span className="block truncate font-display text-[1.05rem] text-navy sm:text-[1.2rem]">{next.name}</span>
                        </span>
                        <ChevronRight className="h-5 w-5 shrink-0 text-champagne transition-transform group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
                      </button>
                    </nav>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
