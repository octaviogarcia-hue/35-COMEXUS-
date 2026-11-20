import { ArrowUp, Instagram } from 'lucide-react';
import { ASSETS, CONTENT } from '../../data/galaData';
import { Comexus35Mark, LogoSlot } from '../ui/Logos';
import Ornament from '../ui/Ornament';

export default function Footer() {
  const t = CONTENT;
  const f = t.footer;
  return (
    <footer className="relative z-10 border-t border-champagne/20 bg-navy text-ivory" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
        <p className="font-script text-4xl text-champagne sm:text-5xl">Celebrating a</p>
        <p className="-mt-2 font-display text-xl uppercase tracking-legacy text-ivory sm:text-2xl" style={{ paddingLeft: '0.14em' }}>
          Legacy of Exchange
        </p>
        <Ornament className="mt-6" />
        <div className="mt-8 flex justify-center">
          <LogoSlot src={ASSETS.logos.comexus35White} alt="COMEXUS 35th Anniversary · Fulbright-COMEXUS" className="h-16 sm:h-[4.5rem]" fallback={<Comexus35Mark tone="light" className="h-14" />} />
        </div>
        <p className="mx-auto mt-6 max-w-md text-[0.9rem] leading-relaxed text-ivory/70">{f.org}</p>
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
        <p className="mx-auto mt-6 max-w-md border-t border-[#C9A66B]/15 pt-4 text-xs tracking-wider text-[#F3EBDD]/65">
          {f.credit.label}{' '}
          <a
            href={f.credit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#C9A66B]/90 underline decoration-[#C9A66B]/40 underline-offset-4 transition-colors duration-500 ease-lux hover:text-[#C9A66B] hover:decoration-[#C9A66B]"
          >
            {f.credit.name}
            <Instagram size={12} strokeWidth={1.6} aria-hidden="true" />
            <span className="sr-only">(Instagram, opens in a new tab)</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
