import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Camera, Globe, ImageIcon, Music2, PlayCircle, Quote, UserRound } from 'lucide-react';
import { ALUMNI_LINKS, CONTENT, type Musician, type Photographer, type ProfileId } from '../../data/galaData';
import { EASE_LUX } from '../../lib/motion';
import ImageWithFallback from '../ui/ImageWithFallback';
import Ornament, { Eyebrow } from '../ui/Ornament';
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal';

interface Props {
  onBack: () => void;
  onJump: (id: ProfileId) => void;
  highlighted: string | null;
}

/* ───────────────────────────── helpers ───────────────────────────── */

function PortraitFallback({ label, tone = 'ivory' }: { label: string; tone?: 'ivory' | 'navy' }) {
  const navy = tone === 'navy';
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-3 ${navy ? 'bg-legacy/30' : 'bg-gradient-to-b from-[#E9DFCC] to-[#DCCDB2]'}`}>
      <span className={`grid h-20 w-20 place-items-center rounded-full border ${navy ? 'border-champagne/60 text-champagne' : 'border-navy/25 text-navy/45'}`}>
        <UserRound className="h-9 w-9" strokeWidth={1} aria-hidden="true" />
      </span>
      <span className={`text-[0.62rem] uppercase tracking-[0.26em] ${navy ? 'text-ivory/60' : 'text-navy/50'}`}>{label}</span>
    </div>
  );
}

/** A link is shown only when it is real: "" and "#" hide the button (no broken links in production). */
const isUsable = (href?: string) => !!href && href.trim() !== '' && href.trim() !== '#';

/* ─────────────────────────── photographer ─────────────────────────── */

/** Featured work: full width, natural height — the artist's composition is never cropped. */
function WorkImage({ src, alt, pending }: { src: string; alt: string; pending: string }) {
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');
  return (
    <div className={`relative overflow-hidden bg-[#0d1b2a] ${state === 'ok' ? '' : 'aspect-[4/3]'}`}>
      {state !== 'ok' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-legacy/25 to-navy">
          <ImageIcon className="h-8 w-8 text-champagne/60" strokeWidth={1} aria-hidden="true" />
          {state === 'error' && <span className="text-[0.62rem] uppercase tracking-[0.26em] text-ivory/55">{pending}</span>}
        </div>
      )}
      {state !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setState('ok')}
          onError={() => setState('error')}
          className={`relative block h-auto w-full object-contain transition-opacity duration-700 ${state === 'ok' ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
}

/** Round portrait medallion with a Champagne ring. */
function PortraitMedallion({ src, alt, position }: { src: string; alt: string; position?: string }) {
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');
  return (
    <span className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-full border border-champagne bg-gradient-to-b from-[#E9DFCC] to-[#DCCDB2] shadow-[0_0_0_4px_#F8F3EA,0_0_0_5px_rgba(201,166,107,0.45)] sm:h-24 sm:w-24">
      {state !== 'ok' && (
        <span className="absolute inset-0 grid place-items-center text-navy/40">
          <UserRound className="h-9 w-9" strokeWidth={1} aria-hidden="true" />
        </span>
      )}
      {state !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setState('ok')}
          onError={() => setState('error')}
          style={{ objectPosition: position ?? '50% 35%' }}
          className={`relative h-full w-full object-cover transition-opacity duration-700 ${state === 'ok' ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </span>
  );
}

function PhotographerCard({ person, index, highlighted }: { person: Photographer; index: number; highlighted: boolean }) {
  const ph = CONTENT.alumni.photography;
  const links = ALUMNI_LINKS[person.id];
  const flip = index % 2 === 1; // alternate work left / right on large screens
  const workCaption = person.workTitle ? `${ph.workLabel} · ${person.workTitle}` : ph.workLabel;

  return (
    <Reveal
      as="article"
      id={person.id}
      aria-labelledby={`${person.id}-name`}
      className={`group/card relative grid scroll-mt-[calc(var(--nav-h)+1rem)] overflow-hidden rounded-[2px] border bg-[#F8F3EA] shadow-[0_24px_50px_-30px_rgba(0,0,0,0.7)] transition-[box-shadow,border-color] duration-700 ease-lux hover:shadow-[0_34px_60px_-30px_rgba(0,0,0,0.8)] lg:grid-cols-2 ${
        highlighted ? 'border-champagne ring-2 ring-champagne/60 ring-offset-4 ring-offset-navy' : 'border-champagne/45'
      }`}
    >
      {/* Featured work — framed like a print, shown whole */}
      <figure className={`relative flex flex-col justify-center bg-navy p-4 sm:p-6 lg:p-8 ${flip ? 'lg:order-2' : ''}`}>
        <div className="relative border border-champagne/50 p-1.5 sm:p-2">
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 border border-champagne/15 [margin:-5px]" />
          <WorkImage src={person.work} alt={`${workCaption} — ${person.name}`} pending={ph.workPending} />
        </div>
        <figcaption className="mt-3 flex items-center justify-between gap-3 text-[0.65rem] uppercase tracking-[0.24em] text-champagne/80">
          <span>
            {ph.workLabel}
            {person.workTitle && <em className="ml-2 font-display text-[0.95rem] normal-case tracking-[0.02em] text-ivory/85">{person.workTitle}</em>}
          </span>
          <span aria-hidden="true" className="font-display text-xl tracking-normal text-champagne/40">
            {String(index + 1).padStart(2, '0')}
          </span>
        </figcaption>
      </figure>

      {/* Copy arrives line by line */}
      <RevealGroup stagger={0.09} delay={0.2} className="flex flex-col p-6 sm:p-8 lg:p-10">
        <RevealItem y={14} className="flex items-center gap-5">
          <PortraitMedallion src={person.image} alt={`Portrait of ${person.name}`} position={person.imagePosition} />
          <div className="min-w-0">
            <h3 id={`${person.id}-name`} className="font-display text-[1.75rem] leading-tight tracking-[0.02em] text-navy sm:text-[2rem]">
              {person.name}
            </h3>
            <p className="mt-1.5 text-[0.72rem] font-semibold uppercase leading-snug tracking-[0.14em] text-legacy">{person.program}</p>
          </div>
        </RevealItem>

        <RevealItem as="p" y={14} className="mt-6 text-pretty text-[0.95rem] leading-relaxed text-navy/80">
          {person.bio}
        </RevealItem>

        {person.quote && (
          <RevealItem y={14} className="relative mt-7">
            <p className="mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-champagne">{ph.quoteLabel}</p>
            <blockquote className="relative border-l-2 border-champagne pl-4">
              <Quote className="absolute -left-[0.6rem] -top-3 h-5 w-5 rounded-full bg-[#F8F3EA] p-0.5 text-champagne" strokeWidth={1.5} aria-hidden="true" />
              <p className="text-pretty font-display text-[1.08rem] italic leading-snug text-navy">“{person.quote}”</p>
            </blockquote>
          </RevealItem>
        )}

        {(isUsable(links.portfolio) || isUsable(links.secondary?.href)) && (
          <RevealItem y={10} className="mt-auto flex flex-col items-center gap-4 pt-8 sm:flex-row sm:flex-wrap">
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
                className="inline-flex min-h-[44px] items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-legacy underline decoration-champagne/50 underline-offset-4 transition-colors hover:text-navy hover:decoration-champagne"
              >
                <PlayCircle className="h-4 w-4 text-champagne" strokeWidth={1.5} aria-hidden="true" />
                {links.secondary.label}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </RevealItem>
        )}
      </RevealGroup>
    </Reveal>
  );
}

/* ───────────────────────────── musician ───────────────────────────── */

function MusicianFeature({ person, highlighted }: { person: Musician; highlighted: boolean }) {
  const t = CONTENT;
  const m = t.alumni.music;
  const website = ALUMNI_LINKS.musician.website;

  return (
    <Reveal
      as="article"
      id={person.id}
      aria-labelledby="musician-name"
      className={`group/card relative grid scroll-mt-[calc(var(--nav-h)+1rem)] overflow-hidden rounded-[2px] border bg-navy shadow-[0_30px_60px_-36px_rgba(0,0,0,0.7)] transition-[border-color] duration-700 ease-lux lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] ${
        highlighted ? 'border-champagne ring-2 ring-champagne/60 ring-offset-4 ring-offset-navy' : 'border-champagne/35'
      }`}
    >
      <div className="relative">
        <ImageWithFallback
          src={person.image}
          alt={person.name}
          zoom
          className="aspect-square h-full w-full sm:aspect-[16/11] lg:aspect-auto lg:min-h-[34rem]"
          fallback={<PortraitFallback label={t.alumni.photoPending} tone="navy" />}
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy/40" />
      </div>

      <RevealGroup stagger={0.1} delay={0.25} className="relative p-6 sm:p-10 lg:p-12">
        <span aria-hidden="true" className="pointer-events-none absolute -right-4 -top-6 select-none font-script text-[9rem] leading-none text-champagne/[0.07]">
          ♪
        </span>
        <RevealItem y={14}>
          <Eyebrow className="text-sky">{m.eyebrow}</Eyebrow>
          <h3 id="musician-name" className="mt-3 font-display text-[2.2rem] leading-tight tracking-[0.02em] text-ivory sm:text-5xl">
            {person.name}
          </h3>
          <p className="mt-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-champagne">{person.program}</p>
          <p className="mt-1 text-[0.85rem] text-ivory/55">{person.cohort}</p>
        </RevealItem>

        <RevealItem as="p" y={14} className="mt-6 text-[1rem] leading-relaxed text-ivory/85">
          {person.bio}
        </RevealItem>

        <RevealItem y={14} className="mt-7 border-t border-champagne/20 pt-6">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-champagne">{m.careerLabel}</p>
          <p className="mt-3 text-[0.97rem] leading-relaxed text-ivory/75">{person.career}</p>
        </RevealItem>

        {isUsable(website) && (
          <RevealItem y={10} className="mt-8">
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full border border-champagne/60 px-6 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-ivory transition-colors duration-500 ease-lux hover:border-champagne hover:bg-champagne hover:text-navy"
            >
              <Globe className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
              {m.websiteLabel}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-lux group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
            </a>
          </RevealItem>
        )}
      </RevealGroup>
    </Reveal>
  );
}

/* ───────────────────────────── view ───────────────────────────── */

export default function AlumniView({ onBack, onJump, highlighted }: Props) {
  const t = CONTENT;
  const a = t.alumni;
  const reduce = useReducedMotion();

  const jumps: { id: ProfileId; label: string; icon: typeof Camera }[] = [
    ...a.photography.people.map((p, i) => ({ id: p.id, label: `${String(i + 1).padStart(2, '0')} · ${p.name}`, icon: Camera })),
    { id: 'musician', label: a.music.person.name, icon: Music2 },
  ];

  return (
    <div>
      {/* Header */}
      <header className="relative overflow-hidden pb-12 pt-[calc(var(--nav-h)+2rem)] text-center text-ivory sm:pb-16">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[50vmax] w-[50vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,119,200,0.25),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex justify-start">
            <button
              type="button"
              onClick={onBack}
              className="group inline-flex min-h-[44px] items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ivory/70 transition-colors hover:text-champagne"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} aria-hidden="true" />
              {a.back}
            </button>
          </div>
          <motion.div initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE_LUX }}>
            <h1 className="mx-auto mt-6 max-w-3xl text-balance font-display text-[2.35rem] leading-[1.08] tracking-[0.02em] text-ivory sm:text-6xl">
              {a.title}
            </h1>
            <p className="mt-2 font-script text-[2.1rem] leading-tight text-champagne sm:text-5xl">Fulbright-García Robles</p>
            <Ornament className="mt-5" />
            <div className="mx-auto mt-5 max-w-2xl space-y-3 text-pretty text-[1rem] leading-relaxed text-ivory/75 sm:text-[1.05rem]">
              {a.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </motion.div>

          <nav aria-label={a.jumpTo} className="mt-8">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-ivory/45">{a.jumpTo}</p>
            <ul className="mt-3 flex flex-wrap justify-center gap-2">
              {jumps.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => onJump(id)}
                    className={`inline-flex min-h-[40px] items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.75rem] transition-colors ${
                      highlighted === id ? 'border-champagne bg-champagne text-navy' : 'border-champagne/35 text-ivory/80 hover:border-champagne hover:text-champagne'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                    <span className="max-w-[12rem] truncate">{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Block A — Photography */}
      <section aria-labelledby="photography-title" className="relative text-ivory">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow className="text-champagne/85">{a.photography.eyebrow}</Eyebrow>
            <h2 id="photography-title" className="mt-4 text-balance font-display text-[2rem] leading-[1.1] tracking-[0.02em] sm:text-5xl">
              {a.photography.title}
            </h2>
            <Ornament className="mt-6" />
            <div className="mt-6 space-y-3 text-pretty text-[1.02rem] leading-relaxed text-ivory/75">
              {a.photography.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className="mx-auto mt-5 max-w-xl border-y border-champagne/30 py-3 text-[0.85rem] italic leading-relaxed text-ivory/60">{a.photography.curatorial}</p>
          </Reveal>

          <div className="mt-12 space-y-10 sm:space-y-14">
            {a.photography.people.map((person, i) => (
              <PhotographerCard key={person.id} person={person} index={i} highlighted={highlighted === person.id} />
            ))}
          </div>
        </div>
      </section>

      {/* Block B — Music */}
      <section aria-labelledby="music-title" className="relative overflow-hidden text-ivory">
        <div aria-hidden="true" className="pointer-events-none absolute -left-[20%] bottom-0 h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,rgba(0,61,165,0.4),transparent_62%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow className="text-champagne/85">{a.music.eyebrow}</Eyebrow>
            <h2 id="music-title" className="mt-4 font-display text-[2.4rem] uppercase leading-none tracking-legacy text-champagne sm:text-6xl" style={{ paddingLeft: '0.14em' }}>
              {a.music.title}
            </h2>
            <Ornament className="mt-6" />
            <div className="mx-auto mt-6 max-w-2xl space-y-3 text-pretty text-[1.02rem] leading-relaxed text-ivory/75">
              {a.music.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
          <div className="mt-12">
            <MusicianFeature person={a.music.person} highlighted={highlighted === 'musician'} />
          </div>
        </div>
      </section>
    </div>
  );
}
