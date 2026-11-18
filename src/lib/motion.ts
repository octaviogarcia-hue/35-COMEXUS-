/**
 * Motion language for the gala: long, fluid, editorial movements with no
 * overshoot. Every component imports its easing and timing from here.
 */
import type { Transition, Variants } from 'framer-motion';

/** Signature easing: fast out, very soft landing. */
export const EASE_LUX = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  quick: 0.5,
  base: 0.9,
  slow: 1.2,
  count: 2,
} as const;

export const luxTransition = (delay = 0, duration: number = DURATION.base): Transition => ({
  duration,
  delay,
  ease: EASE_LUX,
});

/** Parent that reveals its <RevealItem> children one after another. */
export const staggerParent = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Child for a stagger parent: fades up from `y` px. */
export const riseItem = (y = 22, duration: number = DURATION.base): Variants => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration, ease: EASE_LUX } },
});

/** Shared viewport settings for scroll reveals (fire once, a little before fully in view). */
export const VIEWPORT_ONCE = { once: true, margin: '0px 0px -12% 0px' } as const;
