import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { DURATION, EASE_LUX, VIEWPORT_ONCE, riseItem, staggerParent } from '../../lib/motion';

type Tag = 'div' | 'li' | 'article' | 'section' | 'ul' | 'ol' | 'p' | 'span';

interface Props extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: ReactNode;
  delay?: number;
  y?: number;
  as?: Tag;
}

/** Progressive scroll reveal (fade + lift). Static when reduced motion is on. */
export default function Reveal({ children, delay = 0, y = 28, as = 'div', ...rest }: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DURATION.base, ease: EASE_LUX, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

interface GroupProps extends Props {
  stagger?: number;
}

/**
 * Container that reveals its <RevealItem> children in sequence when it scrolls
 * into view (once). With reduced motion everything is simply visible.
 */
export function RevealGroup({ children, stagger = 0.12, delay = 0, as = 'div', ...rest }: GroupProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      variants={staggerParent(stagger, delay)}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={VIEWPORT_ONCE}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Child of <RevealGroup>; inherits the parent's timing. */
export function RevealItem({ children, y = 22, as = 'div', ...rest }: Props) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp variants={riseItem(y)} {...rest}>
      {children}
    </Comp>
  );
}

/**
 * Hairline that draws itself (scaleX 0 → 1) when it enters the viewport.
 * Draw direction comes from the CSS transform-origin, so callers can make it
 * responsive (e.g. `origin-left md:origin-right`).
 */
export function DrawLine({ className = 'origin-left', delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={`block h-px bg-champagne ${className}`}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DURATION.slow, ease: EASE_LUX, delay }}
    />
  );
}
