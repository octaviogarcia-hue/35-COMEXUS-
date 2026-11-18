import { motion, useReducedMotion } from 'framer-motion';
import { EASE_LUX } from '../../lib/motion';
import ShimmerText from './ShimmerText';

interface Props {
  line1: string;
  line2: string;
  line3: string;
  as?: 'h1' | 'h2';
  size?: 'hero' | 'compact';
  /** Seconds before the first line appears (lets the Hero orchestrate its sequence). */
  delay?: number;
  /** Adds the slow metallic sweep to the Champagne lines. */
  shimmer?: boolean;
}

/**
 * Official lockup, three centred lines:
 *   1 · “Celebrating a”  Great Vibes (or Citadel Script)  #C9A66B — overlaps line 2
 *   2 · “LEGACY OF”      Oranienbaum (or Charlon) 0.14em   #C9A66B
 *   3 · “EXCHANGE”       Oranienbaum (or Charlon) 0.14em   #F3EBDD
 *
 * Entrance: the three lines resolve one after another from a soft blur
 * (transform/opacity/filter only — no layout work on mobile).
 */
export default function TitleLockup({ line1, line2, line3, as = 'h1', size = 'hero', delay = 0.15, shimmer = false }: Props) {
  const reduce = useReducedMotion();
  const Tag = as;
  const hero = size === 'hero';

  const enter = (step: number, extra: Record<string, string | number> = {}, from: Record<string, string | number> = {}) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18, filter: 'blur(8px)', ...from },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)', ...extra },
          transition: { duration: 1.4, delay: delay + step * 0.24, ease: EASE_LUX },
        };

  const capsSize = hero ? 'text-[clamp(2.5rem,11.5vw,6.75rem)]' : 'text-[clamp(1.8rem,7vw,3.4rem)]';
  const Gold = ({ children, d }: { children: string; d: number }) =>
    shimmer ? (
      <ShimmerText delay={d} period={7}>
        {children}
      </ShimmerText>
    ) : (
      <>{children}</>
    );

  return (
    <Tag className="relative mx-auto flex flex-col items-center text-center leading-none" aria-label={`${line1} ${line2} ${line3}`}>
      <motion.span
        {...enter(0, {}, { y: 26 })}
        aria-hidden="true"
        className={`relative z-10 font-script text-champagne drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)] ${
          hero ? 'text-[clamp(3.4rem,15vw,8.5rem)] -mb-[0.32em] -translate-x-[4%]' : 'text-[clamp(2.4rem,9vw,4.5rem)] -mb-[0.3em]'
        }`}
        style={{ lineHeight: 1.05 }}
      >
        <Gold d={delay + 2.2}>{line1}</Gold>
      </motion.span>
      <motion.span
        {...enter(1)}
        aria-hidden="true"
        className={`relative z-0 font-display uppercase tracking-legacy text-champagne ${capsSize}`}
        style={{ lineHeight: 1, paddingLeft: '0.14em' }}
      >
        <Gold d={delay + 2.6}>{line2}</Gold>
      </motion.span>
      <motion.span
        {...enter(2)}
        aria-hidden="true"
        className={`relative font-display uppercase tracking-legacy text-ivory ${capsSize}`}
        style={{ lineHeight: 1.05, paddingLeft: '0.14em' }}
      >
        {line3}
      </motion.span>
    </Tag>
  );
}
