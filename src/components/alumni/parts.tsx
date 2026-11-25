import { Camera, UserRound } from 'lucide-react';
import { useState } from 'react';

/** A link is shown only when it is real: "" and "#" hide the button (no broken links in production). */
export const isUsable = (href?: string) => !!href && href.trim() !== '' && href.trim() !== '#';

type LoadState = 'loading' | 'ok' | 'error';

/**
 * A photographer's featured work, never cropped.
 * • `full`    — natural proportions, as large as the viewport comfortably allows (modal).
 * • `preview` — fixed 4:3 stage so every grid card has the same height; the work
 *               is letterboxed (object-contain) on Navy rather than cut.
 */
export function WorkImage({
  src,
  alt,
  pending,
  variant = 'full',
  eager = false,
}: {
  src: string;
  alt: string;
  pending: string;
  variant?: 'full' | 'preview';
  eager?: boolean;
}) {
  const [state, setState] = useState<LoadState>('loading');
  const preview = variant === 'preview';
  const stage = preview ? 'aspect-[4/3]' : state === 'ok' ? '' : 'aspect-[4/3]';

  return (
    <div className={`relative overflow-hidden bg-[#0d1b2a] ${stage}`}>
      {state !== 'ok' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_40%,rgba(0,119,200,0.22),transparent_65%)] bg-navy">
          <span aria-hidden="true" className="pointer-events-none absolute inset-3 border border-champagne/20" />
          {state === 'error' && (
            <>
              <span className="grid h-14 w-14 place-items-center rounded-full border border-champagne/50 text-champagne/80">
                <Camera className="h-6 w-6" strokeWidth={1} aria-hidden="true" />
              </span>
              <span className="flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.26em] text-ivory/60">
                <span aria-hidden="true" className="h-px w-6 bg-champagne/50" />
                {pending}
                <span aria-hidden="true" className="h-px w-6 bg-champagne/50" />
              </span>
            </>
          )}
        </div>
      )}
      {state !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setState('ok')}
          onError={() => setState('error')}
          className={`relative block object-contain transition-[opacity,transform] duration-700 ease-lux ${state === 'ok' ? 'opacity-100' : 'opacity-0'} ${
            preview ? 'h-full w-full group-hover/card:scale-[1.03] motion-reduce:!transform-none' : 'mx-auto h-auto max-h-[72vh] w-auto max-w-full'
          }`}
        />
      )}
    </div>
  );
}

/** Round portrait medallion with a Champagne ring. */
export function PortraitMedallion({
  src,
  alt,
  position,
  size = 'md',
  ring = '#F8F3EA',
}: {
  src: string;
  alt: string;
  position?: string;
  size?: 'sm' | 'md';
  /** Colour of the gap between photo and outer ring (matches the surface behind). */
  ring?: string;
}) {
  const [state, setState] = useState<LoadState>('loading');
  const dims = size === 'sm' ? 'h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]' : 'h-20 w-20 sm:h-24 sm:w-24';
  return (
    <span
      className={`relative block ${dims} shrink-0 overflow-hidden rounded-full border border-champagne bg-gradient-to-b from-[#E9DFCC] to-[#DCCDB2]`}
      style={{ boxShadow: `0 0 0 4px ${ring}, 0 0 0 5px rgba(201,166,107,0.5)` }}
    >
      {state !== 'ok' && (
        <span className="absolute inset-0 grid place-items-center text-navy/40">
          <UserRound className="h-1/2 w-1/2" strokeWidth={1} aria-hidden="true" />
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
