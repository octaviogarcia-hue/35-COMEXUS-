import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Camera, Globe, Music2, UserRound } from 'lucide-react';
import { ALUMNI_LINKS, CONTENT, type Musician, type Photographer, type ProfileId } from '../../data/galaData';
import { EASE_LUX } from '../../lib/motion';
import ImageWithFallback from '../ui/ImageWithFallback';
import Ornament, { Eyebrow } from '../ui/Ornament';
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal';
import FellowModal from './FellowModal';
import { PortraitMedallion, WorkImage, isUsable } from './parts';

interface Props {
  onBack: () => void;
  onJump: (id: ProfileId) => void;
  highlighted: string | null;
  /** Photographer whose modal is open (from the URL hash), if any. */
  openId: ProfileId | null;
  onOpen: (id: ProfileId) => void;
  onStep: (id: ProfileId) => void;
  onClose: () => void;
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

/* ─────────────────────────── photographer ─────────────────────────── */

/**
 * Grid card: work preview, portrait, name, program, two-line bio excerpt.
 * The whole card opens the editorial modal (stretched button on the name).
 */
function PhotographerCard({ person, index, highlighted, onOpen }: { person: Photographer; index: number; highlighted: boolean; onOpen: (id: ProfileId) => void }) {
  const ph = CONTENT.alumni.photography;
  // 5 cards: 3 + 2 on desktop and 2 + 2 + 1 on tablet, with the short rows centred.
  const place = index === 3 ? 'lg:col-start-2' : index === 4 ? 'md:col-start-2 lg:col-start-auto' : '';

  return (
    <Reveal
      as="article"
      delay={(index % 3) * 0.1}
      id={person.id}
      aria-labelledby={`${person.id}-name`}
      className={`group/card relative flex h-full scroll-mt-[calc(var(--nav-h)+1rem)] cursor-pointer flex-col overflow-hidden rounded-[2px] border bg-[#F8F3EA] shadow-[0_24px_50px_-30px_rgba(0,0,0,0.7)] transition-[box-shadow,border-color,transform] duration-700 ease-lux hover:-translate-y-1 hover:border-champagne hover:shadow-[0_36px_64px_-30px_rgba(0,0,0,0.85)] motion-reduce:hover:translate-y-0 md:col-span-2 ${place} ${
        highlighted ? 'border-champagne ring-2 ring-champagne/60 ring-offset-4 ring-offset-navy' : 'border-champagne/45'
      }`}
    >
      {/* Work preview — letterboxed, never cropped */}
      <div className="relative bg-navy p-2.5">
        <div className="border border-champagne/35">
          <WorkImage src={person.work} alt="" pending={ph.workPending} variant="preview" />
        </div>
        <span className="absolute left-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-navy/85 font-display text-base text-champagne backdrop-blur">
          {String(index + 1).padStart(2, '0')}
        </span>
        {person.workTitle && (
          <span className="absolute bottom-5 right-5 max-w-[60%] truncate bg-navy/80 px-2.5 py-1 font-display text-[0.85rem] italic text-ivory/90 backdrop-blur">{person.workTitle}</span>
        )}
      </div>

      <div className="relative flex flex-1 flex-col px-6 pb-6 pt-0">
        {/* Portrait overlaps the frame edge */}
        <div className="-mt-9 sm:-mt-10">
          <PortraitMedallion src={person.image} alt="" position={person.imagePosition} size="sm" />
        </div>
        <h3 id={`${person.id}-name`} className="mt-4 font-display text-[1.6rem] leading-tight tracking-[0.02em] text-navy">
          {/* Stretched button: the whole card is one large, accessible click target */}
          <button
            type="button"
            onClick={() => onOpen(person.id)}
            aria-haspopup="dialog"
            className="text-left after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-champagne"
          >
            {person.name}
          </button>
        </h3>
        <p className="mt-1.5 line-clamp-2 min-h-[2.5em] text-[0.68rem] font-semibold uppercase leading-snug tracking-[0.14em] text-legacy">{person.program}</p>
        <p className="mt-3 line-clamp-2 text-[0.92rem] leading-relaxed text-navy/75">{person.bio}</p>

        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-navy">
          <span className="relative">
            {ph.cardCta}
            <span aria-hidden="true" className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-[0.35] bg-champagne transition-transform duration-700 ease-lux group-hover/card:scale-x-100" />
          </span>
          <ArrowRight className="h-4 w-4 text-champagne transition-transform duration-500 ease-lux group-hover/card:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
        </span>
      </div>
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

export default function AlumniView({ onBack, onJump, highlighted, openId, onOpen, onStep, onClose }: Props) {
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
                    onClick={() => (id === 'musician' ? onJump(id) : onOpen(id))}
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

          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-4 lg:grid-cols-6">
            {a.photography.people.map((person, i) => (
              <PhotographerCard key={person.id} person={person} index={i} highlighted={highlighted === person.id && openId !== person.id} onOpen={onOpen} />
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

      <FellowModal people={a.photography.people} openId={openId} onClose={onClose} onStep={onStep} />
    </div>
  );
}
