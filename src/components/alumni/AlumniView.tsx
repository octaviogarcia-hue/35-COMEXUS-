import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Camera, Check, Globe, Instagram, Link2, Linkedin, Music2, Quote, UserRound, Youtube } from 'lucide-react';
import { useState } from 'react';
import { ALUMNI_LINKS, type Musician, type Photographer, type ProfileId } from '../../data/galaData';
import { shareableUrl } from '../../hooks/useHashRoute';
import { useLanguage } from '../../i18n/LanguageContext';
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

function CopyLinkButton({ id, tone = 'navy' }: { id: ProfileId; tone?: 'navy' | 'ivory' }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const url = shareableUrl('alumni', id);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt(t.alumni.copyLink, url);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? t.alumni.copied : t.alumni.copyLink}
      title={copied ? t.alumni.copied : t.alumni.copyLink}
      className={`grid h-9 w-9 place-items-center rounded-full border transition-colors ${
        tone === 'navy' ? 'border-navy/20 text-navy/60 hover:border-champagne hover:text-navy' : 'border-champagne/40 text-champagne/80 hover:bg-champagne hover:text-navy'
      }`}
    >
      {copied ? <Check className="h-4 w-4" strokeWidth={1.5} /> : <Link2 className="h-4 w-4" strokeWidth={1.5} />}
    </button>
  );
}

const isUsable = (href?: string) => !!href && href.trim() !== '';

/* ─────────────────────────── photographer ─────────────────────────── */

function PhotographerCard({ person, index, highlighted }: { person: Photographer; index: number; highlighted: boolean }) {
  const { t } = useLanguage();
  const link = ALUMNI_LINKS[person.id].portfolio;
  return (
    <Reveal
      as="article"
      delay={index * 0.1}
      id={person.id}
      aria-labelledby={`${person.id}-name`}
      className={`group/card relative flex scroll-mt-[calc(var(--nav-h)+1rem)] flex-col rounded-[2px] border bg-[#F8F3EA] shadow-[0_24px_50px_-34px_rgba(0,43,73,0.6)] transition-[box-shadow,border-color] duration-700 ease-lux hover:shadow-[0_34px_60px_-34px_rgba(0,43,73,0.7)] ${
        highlighted ? 'border-champagne ring-2 ring-champagne/60 ring-offset-4 ring-offset-ivory' : 'border-champagne/45'
      }`}
    >
      <div className="relative overflow-hidden rounded-t-[2px]">
        <ImageWithFallback
          src={person.image}
          alt={person.name}
          zoom
          className="aspect-square w-full sm:aspect-[4/5]"
          fallback={<PortraitFallback label={t.alumni.photoPending} />}
        />
        <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-navy/85 font-display text-lg text-champagne backdrop-blur">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="absolute right-4 top-4">
          <CopyLinkButton id={person.id} tone="ivory" />
        </span>
      </div>

      {/* Card copy arrives line by line after the frame */}
      <RevealGroup stagger={0.09} delay={0.25 + index * 0.1} className="flex flex-1 flex-col p-6 sm:p-7">
        <RevealItem y={14}>
          <h3 id={`${person.id}-name`} className="font-display text-[1.75rem] leading-tight tracking-[0.02em] text-navy">
            {person.name}
          </h3>
          <p className="mt-2 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-legacy">{person.program}</p>
          <p className="mt-1 text-[0.82rem] text-navy/60">{person.cohort}</p>
        </RevealItem>
        <RevealItem as="p" y={14} className="mt-4 text-[0.95rem] leading-relaxed text-navy/80">
          {person.bio}
        </RevealItem>

        <RevealItem y={14} className="relative mt-6">
          <blockquote className="relative border-l-2 border-champagne pl-4">
            <Quote className="absolute -left-[0.6rem] -top-3 h-5 w-5 rounded-full bg-[#F8F3EA] p-0.5 text-champagne" strokeWidth={1.5} aria-hidden="true" />
            <p className="font-display text-[1.1rem] italic leading-snug text-navy">“{person.quote}”</p>
          </blockquote>
        </RevealItem>

        <RevealItem y={10} className="mt-auto pt-7">
          <a
            href={link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-ivory transition-colors duration-500 ease-lux hover:bg-legacy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
          >
            <Camera className="h-4 w-4 text-champagne" strokeWidth={1.5} aria-hidden="true" />
            {t.alumni.photography.cta}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-lux group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </RevealItem>
      </RevealGroup>
    </Reveal>
  );
}

/* ───────────────────────────── musician ───────────────────────────── */

function MusicianFeature({ person, highlighted }: { person: Musician; highlighted: boolean }) {
  const { t } = useLanguage();
  const m = t.alumni.music;
  const links = ALUMNI_LINKS.musician;
  const items = [
    { key: 'website', href: links.website, icon: Globe },
    { key: 'portfolio', href: links.portfolio, icon: ArrowUpRight },
    { key: 'spotify', href: links.spotify, icon: Music2 },
    { key: 'youtube', href: links.youtube, icon: Youtube },
    { key: 'instagram', href: links.instagram, icon: Instagram },
    { key: 'linkedin', href: links.linkedin, icon: Linkedin },
  ].filter((l) => isUsable(l.href)) as { key: keyof typeof m.linkLabels; href: string; icon: typeof Globe }[];

  return (
    <Reveal
      as="article"
      id={person.id}
      aria-labelledby="musician-name"
      className={`group/card relative grid scroll-mt-[calc(var(--nav-h)+1rem)] overflow-hidden rounded-[2px] border bg-navy/60 transition-[border-color] duration-700 ease-lux lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] ${
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
        <span className="absolute right-4 top-4">
          <CopyLinkButton id={person.id} tone="ivory" />
        </span>
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

        {items.length > 0 && (
          <RevealItem y={10} className="mt-8">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-champagne">{m.linksLabel}</p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {items.map(({ key, href, icon: Icon }) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-champagne/45 px-4 py-2 text-[0.8rem] font-medium tracking-[0.06em] text-ivory transition-colors duration-500 ease-lux hover:border-champagne hover:bg-champagne hover:text-navy"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
                    {m.linkLabels[key]}
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>
        )}
      </RevealGroup>
    </Reveal>
  );
}

/* ───────────────────────────── view ───────────────────────────── */

export default function AlumniView({ onBack, onJump, highlighted }: Props) {
  const { t } = useLanguage();
  const a = t.alumni;
  const reduce = useReducedMotion();

  const jumps: { id: ProfileId; label: string; icon: typeof Camera }[] = [
    ...a.photography.people.map((p, i) => ({ id: p.id, label: `${String(i + 1).padStart(2, '0')} · ${p.name}`, icon: Camera })),
    { id: 'musician', label: a.music.person.name, icon: Music2 },
  ];

  return (
    <div>
      {/* Header */}
      <header className="relative overflow-hidden bg-navy pb-12 pt-[calc(var(--nav-h)+2rem)] text-center text-ivory sm:pb-16">
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
            <Eyebrow className="mt-6 text-champagne">{a.eyebrow}</Eyebrow>
            <h1 className="mt-4 font-display text-[2.6rem] uppercase leading-none tracking-legacy text-ivory sm:text-6xl" style={{ paddingLeft: '0.14em' }}>
              {a.title}
            </h1>
            <p className="mt-1 font-script text-[2.2rem] leading-tight text-champagne sm:text-5xl">Fulbright-García Robles</p>
            <Ornament className="mt-5" />
            <p className="mx-auto mt-5 max-w-xl text-pretty text-[1rem] leading-relaxed text-ivory/75">{a.intro}</p>
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
      <section aria-labelledby="photography-title" className="bg-ivory text-navy">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow className="text-azure">{a.photography.eyebrow}</Eyebrow>
            <h2 id="photography-title" className="mt-4 text-balance font-display text-[2rem] leading-[1.1] tracking-[0.02em] sm:text-5xl">
              {a.photography.title}
            </h2>
            <Ornament className="mt-6" />
            <p className="mt-6 text-pretty text-[1.02rem] leading-relaxed text-navy/80">{a.photography.intro}</p>
            <p className="mx-auto mt-5 max-w-xl border-y border-champagne/40 py-3 text-[0.85rem] italic leading-relaxed text-navy/60">{a.photography.curatorial}</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {a.photography.people.map((person, i) => (
              <PhotographerCard key={person.id} person={person} index={i} highlighted={highlighted === person.id} />
            ))}
          </div>
        </div>
      </section>

      {/* Block B — Music */}
      <section aria-labelledby="music-title" className="relative overflow-hidden bg-navy text-ivory">
        <div aria-hidden="true" className="pointer-events-none absolute -left-[20%] bottom-0 h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,rgba(0,61,165,0.4),transparent_62%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow className="text-champagne/85">{a.music.eyebrow}</Eyebrow>
            <h2 id="music-title" className="mt-4 font-display text-[2.4rem] uppercase leading-none tracking-legacy text-champagne sm:text-6xl" style={{ paddingLeft: '0.14em' }}>
              {a.music.title}
            </h2>
            <Ornament className="mt-6" />
            <p className="mx-auto mt-6 max-w-xl text-pretty text-[1.02rem] leading-relaxed text-ivory/75">{a.music.intro}</p>
          </Reveal>
          <div className="mt-12">
            <MusicianFeature person={a.music.person} highlighted={highlighted === 'musician'} />
          </div>
        </div>
      </section>
    </div>
  );
}
