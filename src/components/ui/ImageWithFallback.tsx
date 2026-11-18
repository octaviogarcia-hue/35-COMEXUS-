import { useState, type ReactNode } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Rendered while the file is missing (e.g. before photos are uploaded to GitHub). */
  fallback: ReactNode;
  loading?: 'lazy' | 'eager';
  /** Slow 3% zoom when the surrounding `group/card` is hovered or focused. */
  zoom?: boolean;
}

/**
 * Tries to load `src`; if the file does not exist yet, shows an elegant
 * fallback instead of a broken-image icon. Drop the real file into
 * /public/assets/... with the same name and it appears automatically.
 */
export default function ImageWithFallback({ src, alt, className = '', imgClassName = '', fallback, loading = 'lazy', zoom = false }: Props) {
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');

  const layers = (
    <>
      {state !== 'ok' && <div className="absolute inset-0">{fallback}</div>}
      {state !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setState('ok')}
          onError={() => setState('error')}
          className={`relative h-full w-full object-cover transition-opacity duration-700 ${state === 'ok' ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        />
      )}
    </>
  );

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {zoom ? (
        <div className="absolute inset-0 transition-transform duration-[1400ms] ease-lux will-change-transform group-hover/card:scale-[1.03] group-focus-within/card:scale-[1.03] motion-reduce:!transform-none">
          {layers}
        </div>
      ) : (
        layers
      )}
    </div>
  );
}
