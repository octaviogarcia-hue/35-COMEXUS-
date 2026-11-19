import { ArrowUp } from 'lucide-react';
import { ASSETS } from '../../data/galaData';
import { useLanguage } from '../../i18n/LanguageContext';
import { Comexus35Mark, Freedom250Mark, Fulbright80Mark, LogoSlot } from '../ui/Logos';
import Ornament from '../ui/Ornament';

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;
  return (
    <footer className="relative z-10 border-t border-champagne/20 bg-navy text-ivory" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
        <p className="font-script text-4xl text-champagne sm:text-5xl">Celebrating a</p>
        <p className="-mt-2 font-display text-xl uppercase tracking-legacy text-ivory sm:text-2xl" style={{ paddingLeft: '0.14em' }}>
          Legacy of Exchange
        </p>
        <Ornament className="mt-6" />
        <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-10 gap-y-5">
          <LogoSlot src={ASSETS.logos.fulbrightComexus} alt="Fulbright-COMEXUS" className="h-9" badge fallback={<Comexus35Mark className="h-10" />} />
          <LogoSlot src={ASSETS.logos.fulbright80} alt="Fulbright Program 80th Anniversary" className="h-10 opacity-90" fallback={<Fulbright80Mark className="h-10" />} />
          <LogoSlot src={ASSETS.logos.freedom250} alt="Freedom 250" className="h-10" fallback={<Freedom250Mark className="h-10" />} />
        </div>
        <p className="mx-auto mt-8 max-w-md text-[0.85rem] leading-relaxed text-ivory/60">{f.org}</p>
        <p className="mx-auto mt-2 max-w-md text-[0.85rem] italic text-ivory/45">{f.tagline}</p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-champagne/80 hover:text-champagne"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          {f.backToTop}
        </button>
        <p className="mt-6 text-[0.7rem] tracking-[0.12em] text-ivory/35">
          © {new Date().getFullYear()} {f.rights}
        </p>
      </div>
    </footer>
  );
}
