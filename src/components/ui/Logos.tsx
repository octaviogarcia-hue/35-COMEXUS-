import { useState } from 'react';

/**
 * Logo slots: each tries the official file in /public/assets/logos/ and, while it
 * is missing, falls back to a clean typographic stand-in so the layout is never
 * broken. Replace the files — no code change needed.
 */

type Tone = 'light' | 'dark';

interface SlotProps {
  src: string;
  alt: string;
  fallback: React.ReactNode;
  className?: string;
  /**
   * Sit the logo on a subtle Ivory plate with a hairline Champagne rule — for
   * full-colour artwork that would lose contrast directly on Navy.
   */
  badge?: boolean;
}

export function LogoSlot({ src, alt, fallback, className = 'h-12', badge = false }: SlotProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  const img = <img src={src} alt={alt} className={`${className} w-auto object-contain`} onError={() => setFailed(true)} loading="lazy" />;
  if (!badge) return img;
  return (
    <span className="inline-flex items-center rounded-md border border-champagne/70 bg-ivory px-3.5 py-2 shadow-[0_10px_24px_-16px_rgba(0,0,0,0.7)]">{img}</span>
  );
}

/* ───────────────────────── Fallback marks (vector) ───────────────────────── */

const ink = (tone: Tone) => (tone === 'light' ? '#F3EBDD' : '#002B49');

export function Comexus35Mark({ tone = 'light', className = 'h-12' }: { tone?: Tone; className?: string }) {
  const c = ink(tone);
  return (
    <svg viewBox="0 0 190 56" className={className} role="img" aria-label="COMEXUS 35th Anniversary · Fulbright-COMEXUS">
      <circle cx="28" cy="28" r="25" fill="none" stroke="#C9A66B" strokeWidth="1.2" />
      <circle cx="28" cy="28" r="21" fill="none" stroke="#C9A66B" strokeWidth="0.5" opacity="0.7" />
      <text x="28" y="36" textAnchor="middle" fontFamily="Oranienbaum, Georgia, serif" fontSize="22" fill="#C9A66B">
        35
      </text>
      <text x="62" y="27" fontFamily="Oranienbaum, Georgia, serif" fontSize="20" letterSpacing="2.6" fill={c}>
        COMEXUS
      </text>
      <text x="63" y="43" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="7.6" letterSpacing="1.6" fill={c} opacity="0.75">
        FULBRIGHT-COMEXUS
      </text>
    </svg>
  );
}

export function Fulbright80Mark({ tone = 'light', className = 'h-12' }: { tone?: Tone; className?: string }) {
  const c = tone === 'light' ? '#FFFFFF' : '#003DA5';
  return (
    <svg viewBox="0 0 190 56" className={className} role="img" aria-label="Fulbright Program 80th Anniversary">
      <text x="2" y="30" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" fontSize="18" letterSpacing="2.4" fill={c}>
        FULBRIGHT
      </text>
      <line x1="2" y1="38" x2="132" y2="38" stroke={c} strokeWidth="0.8" opacity="0.6" />
      <text x="2" y="50" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="7.4" letterSpacing="2" fill={c} opacity="0.85">
        PROGRAM · 1946–2026
      </text>
      <text x="146" y="44" fontFamily="Oranienbaum, Georgia, serif" fontSize="36" fill={c}>
        80
      </text>
    </svg>
  );
}

export function Freedom250Mark({ className = 'h-12' }: { tone?: Tone; className?: string }) {
  return (
    <svg viewBox="0 0 168 56" className={className} role="img" aria-label="Freedom 250">
      <g transform="translate(4 8)">
        <rect width="40" height="40" rx="6" fill="#0A3161" />
        <rect y="26" width="40" height="5" fill="#B31942" />
        <rect y="34" width="40" height="5" fill="#B31942" />
        <path d="M20 7 l2.6 5.6 6.1.6 -4.6 4.1 1.3 6 -5.4-3.1 -5.4 3.1 1.3-6 -4.6-4.1 6.1-.6z" fill="#FFFFFF" />
      </g>
      <text x="54" y="29" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" fontSize="17" letterSpacing="2.4" fill="#FFFFFF">
        FREEDOM
      </text>
      <text x="54" y="50" fontFamily="Oranienbaum, Georgia, serif" fontSize="22" letterSpacing="3" fill="#E04E6B">
        250
      </text>
      <text x="96" y="49" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="7" letterSpacing="1.6" fill="#F3EBDD" opacity="0.8">
        1776–2026
      </text>
    </svg>
  );
}

/** Typographic seal for the 30 Years of the Binational Business Program (no official logo). */
export function BbpEmblem({ className = 'h-28 w-28', label = 'BINATIONAL BUSINESS PROGRAM' }: { className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label={`30 · ${label}`}>
      <defs>
        <path id="bbp-arc" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
      </defs>
      <circle cx="60" cy="60" r="57" fill="none" stroke="#C9A66B" strokeWidth="1" />
      <circle cx="60" cy="60" r="35" fill="#003DA5" />
      <circle cx="60" cy="60" r="31.5" fill="none" stroke="#C9A66B" strokeWidth="0.6" />
      <text fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="7.4" fontWeight="600" letterSpacing="2.1" fill="#002B49">
        <textPath href="#bbp-arc" startOffset="2%">
          {label} · 1996–2026 ·
        </textPath>
      </text>
      <text x="60" y="68" textAnchor="middle" fontFamily="Oranienbaum, Georgia, serif" fontSize="30" fill="#F3EBDD">
        30
      </text>
      <text x="60" y="80" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="6" letterSpacing="2.4" fill="#C9A66B">
        BBP
      </text>
    </svg>
  );
}
