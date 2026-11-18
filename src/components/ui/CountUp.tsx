import { animate, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { DURATION, EASE_LUX } from '../../lib/motion';

interface Props {
  to: number;
  /** Starts counting the first time this becomes true; never replays. */
  start: boolean;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Ascending counter (0 → `to`). The final value reserves the width from the
 * first frame, so nothing shifts while the digits change. Screen readers and
 * reduced-motion visitors get the final number straight away.
 */
export default function CountUp({ to, start, delay = 0, duration = DURATION.count, className = '' }: Props) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);
  const [done, setDone] = useState(!!reduce);

  useEffect(() => {
    if (!start || done) return;
    if (reduce) {
      setValue(to);
      setDone(true);
      return;
    }
    const controls = animate(0, to, {
      duration,
      delay,
      ease: EASE_LUX,
      onUpdate: (v) => setValue(Math.round(v)),
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [start, done, reduce, to, delay, duration]);

  return (
    <span className={`relative inline-block tabular-nums ${className}`} aria-label={String(to)}>
      <span className="invisible" aria-hidden="true">
        {to}
      </span>
      <span className="absolute inset-0" aria-hidden="true">
        {value}
      </span>
    </span>
  );
}
