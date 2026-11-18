import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Lang, TabId } from '../../data/galaData';
import { LANGS } from '../../data/galaData';
import { useLanguage } from '../../i18n/LanguageContext';

interface Props {
  tab: TabId;
  onNavigate: (tab: TabId, anchor?: string | null) => void;
}

function LangSwitch() {
  const { lang, setLang, t } = useLanguage();
  return (
    <div role="group" aria-label={t.nav.langLabel} className="flex items-center rounded-full border border-champagne/40 bg-navy/40 p-0.5 text-[0.7rem] font-semibold tracking-[0.18em]">
      {LANGS.map((l: Lang, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-0.5 h-3 w-px bg-champagne/40" aria-hidden="true" />}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            lang={l}
            className={`min-h-[32px] min-w-[38px] rounded-full px-2.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne ${
              lang === l ? 'bg-champagne text-navy' : 'text-ivory/75 hover:text-champagne'
            }`}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

function Brand({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="group flex items-center gap-2.5 text-left" aria-label="COMEXUS — Celebrating a Legacy of Exchange">
      <span className="relative grid h-9 w-9 place-items-center rounded-full border border-champagne/70 font-display text-[0.95rem] text-champagne transition-colors group-hover:bg-champagne group-hover:text-navy">
        35
      </span>
      <span className="leading-tight">
        <span className="block font-display text-[0.95rem] tracking-[0.22em] text-ivory">COMEXUS</span>
        <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-champagne/80">Legacy of Exchange</span>
      </span>
    </button>
  );
}

interface TabBarProps extends Props {
  className?: string;
  pillId: string;
}

function TabBar({ tab, onNavigate, className = '', pillId }: TabBarProps) {
  const { t } = useLanguage();
  const tabs: { id: TabId; label: string }[] = [
    { id: 'overview', label: t.nav.overview },
    { id: 'alumni', label: t.nav.alumni },
  ];
  return (
    <nav aria-label="Primary" className={className}>
      <ul role="tablist" className="relative flex w-full rounded-full border border-champagne/25 bg-navy/50 p-1">
        {tabs.map((item) => {
          const active = tab === item.id;
          return (
            <li key={item.id} className="relative flex-1" role="presentation">
              <button
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="main"
                onClick={() => onNavigate(item.id)}
                className={`relative z-10 w-full whitespace-nowrap rounded-full px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne sm:text-xs ${
                  active ? 'text-navy' : 'text-ivory/80 hover:text-champagne'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId={pillId}
                    className="absolute inset-0 -z-10 rounded-full bg-champagne"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function Navbar({ tab, onNavigate }: Props) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500 ${
        scrolled || tab === 'alumni'
          ? 'border-champagne/20 bg-navy/90 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.55)] backdrop-blur-md'
          : 'border-transparent bg-gradient-to-b from-navy/80 to-navy/0'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-champagne focus:px-3 focus:py-2 focus:text-navy">
        {t.nav.skip}
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Brand onClick={() => onNavigate('overview', 'top')} />
        <TabBar tab={tab} onNavigate={onNavigate} pillId="tab-pill-desktop" className="hidden w-[min(26rem,44vw)] md:block" />
        <LangSwitch />
      </div>
      <div className="px-4 pb-2.5 md:hidden">
        <TabBar tab={tab} onNavigate={onNavigate} pillId="tab-pill-mobile" />
      </div>
    </header>
  );
}
