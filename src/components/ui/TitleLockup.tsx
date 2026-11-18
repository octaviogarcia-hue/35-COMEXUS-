import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  line1: string;
  line2: string;
  line3: string;
  as?: 'h1' | 'h2';
  size?: 'hero' | 'compact';
}

/**
 * Official lockup, three centred lines:
 *   1 · “Celebrating a”  Great Vibes (or Citadel Script)  #C9A66B — overlaps line 2
 *   2 · “LEGACY OF”      Oranienbaum (or Charlon) 0.14em   #C9A66B
 *   3 · “EXCHANGE”       Oranienbaum (or Charlon) 0.14em   #F3EBDD
 */
export default function TitleLockup({ line1, line2, line3, as = 'h1', size = 'hero' }: Props) {
  const reduce = useReducedMotion();
  const Tag = as;
  const hero = size === 'hero';

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18, filter: 'blur(6px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <Tag className="relative mx-auto flex flex-col items-center text-center leading-none" aria-label={`${line1} ${line2} ${line3}`}>
      <motion.span
        {...fade(0.15)}
        aria-hidden="true"
        className={`relative z-10 font-script text-champagne drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)] ${
          hero ? 'text-[clamp(3.4rem,15vw,8.5rem)] -mb-[0.32em] -translate-x-[4%]' : 'text-[clamp(2.4rem,9vw,4.5rem)] -mb-[0.3em]'
        }`}
        style={{ lineHeight: 1.05 }}
      >
        {line1}
      </motion.span>
      <motion.span
        {...fade(0.4)}
        aria-hidden="true"
        className={`relative z-0 font-display uppercase tracking-legacy text-champagne ${
          hero ? 'text-[clamp(2.5rem,11.5vw,6.75rem)]' : 'text-[clamp(1.8rem,7vw,3.4rem)]'
        }`}
        style={{ lineHeight: 1, paddingLeft: '0.14em' }}
      >
        {line2}
      </motion.span>
      <motion.span
        {...fade(0.6)}
        aria-hidden="true"
        className={`relative font-display uppercase tracking-legacy text-ivory ${
          hero ? 'text-[clamp(2.5rem,11.5vw,6.75rem)]' : 'text-[clamp(1.8rem,7vw,3.4rem)]'
        }`}
        style={{ lineHeight: 1.05, paddingLeft: '0.14em' }}
      >
        {line3}
      </motion.span>
    </Tag>
  );
}
