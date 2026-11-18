import { useState, type ReactNode } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Rendered while the file is missing (e.g. before photos are uploaded to GitHub). */
  fallback: ReactNode;
  loading?: 'lazy' | 'eager';
}

/**
 * Tries to load `src`; if the file does not exist yet, shows an elegant
 * fallback instead of a broken-image icon. Drop the real file into
 * /public/assets/... with the same name and it appears automatically.
 */
export default function ImageWithFallback({ src, alt, className = '', imgClassName = '', fallback, loading = 'lazy' }: Props) {
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');

  return (
    <div className={`relative overflow-hidden ${className}`}>
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
    </div>
  );
}
