import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Seconds between sweeps (6–8 s keeps it discreet). */
  period?: number;
  /** Seconds before the first sweep, so it starts after the entrance choreography. */
  delay?: number;
  className?: string;
}

/**
 * Wraps Champagne text with a slow metallic highlight. The base text keeps its
 * solid colour (so script swashes are never clipped); an aria-hidden duplicate
 * carries the moving highlight. Hidden entirely with prefers-reduced-motion.
 */
export default function ShimmerText({ children, period = 7, delay = 2.4, className = '' }: Props) {
  return (
    <span className={`shimmer-text ${className}`}>
      {children}
      <span
        aria-hidden="true"
        className="shimmer-text__sweep"
        style={{ ['--shimmer-period' as string]: `${period}s`, ['--shimmer-delay' as string]: `${delay}s` }}
      >
        {children}
      </span>
    </span>
  );
}
