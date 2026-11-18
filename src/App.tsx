import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import SubtleScrollFireworks from './components/ui/SubtleScrollFireworks';
import { PROFILE_IDS } from './data/galaData';
import { useHashRoute } from './hooks/useHashRoute';
import { EASE_LUX } from './lib/motion';
import AlumniShowcase from './views/AlumniShowcase';
import GalaOverview from './views/GalaOverview';

const TAB_FADE_S = 0.42;
const TOP = '__top__';

/**
 * Scrolls to an element by its *layout* position (offsetTop chain), which ignores
 * transforms. Reveal animations translate cards by a few pixels while they
 * appear; measuring with getBoundingClientRect would land off-target.
 */
function scrollToId(id: string, smooth: boolean) {
  const el = document.getElementById(id);
  if (!el) return false;
  let y = 0;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) y += node.offsetTop;
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  // 'instant' (not 'auto') so the CSS `scroll-behavior: smooth` cannot animate a QR landing.
  window.scrollTo({ top: Math.max(0, y - margin), behavior: smooth ? 'smooth' : 'instant' });
  return true;
}

const isProfile = (id: string) => (PROFILE_IDS as readonly string[]).includes(id);

export default function App() {
  const { route, navigate } = useHashRoute();
  const reduce = useReducedMotion();
  const prevTab = useRef(route.tab);
  const firstRun = useRef(true);
  /** Anchor waiting for the incoming tab to finish its entrance. */
  const pending = useRef<string | null>(null);
  const [highlight, setHighlight] = useState<string | null>(null);
  const highlightTimer = useRef<number>();

  const flash = useCallback((id: string) => {
    if (!isProfile(id)) return;
    window.clearTimeout(highlightTimer.current);
    setHighlight(id);
    highlightTimer.current = window.setTimeout(() => setHighlight(null), 4200);
  }, []);

  /** Final landing on an anchor: jump, flash the Champagne ring, re-check once web fonts settle. */
  const land = useCallback(
    (id: string, smooth: boolean) => {
      scrollToId(id, smooth);
      flash(id);
      if (!smooth) window.setTimeout(() => scrollToId(id, false), 600);
    },
    [flash],
  );

  /*
   * Scroll choreography
   * • Same tab (or first load / QR scan): scroll right away.
   * • Tab switch: the old view fades out → page resets to top while nothing is
   *   visible (onExitComplete) → new view rises in → only then do we jump to the
   *   anchor (onAnimationComplete), so the transition never fights the scroll.
   */
  useEffect(() => {
    const tabChanged = prevTab.current !== route.tab;
    prevTab.current = route.tab;
    const isFirst = firstRun.current;
    firstRun.current = false;

    if (tabChanged && !reduce) {
      pending.current = route.anchor && route.anchor !== 'top' ? route.anchor : TOP;
      return;
    }

    const timers: number[] = [];
    if (!route.anchor || route.anchor === 'top') {
      if (tabChanged || route.anchor === 'top') window.scrollTo({ top: 0, behavior: tabChanged || reduce ? 'instant' : 'smooth' });
      return;
    }
    const anchor = route.anchor;
    timers.push(window.setTimeout(() => land(anchor, !isFirst && !tabChanged && !reduce), isFirst || tabChanged ? 120 : 0));
    return () => timers.forEach(clearTimeout);
  }, [route, reduce, land]);

  const onTabEntered = (definition: unknown) => {
    // Fires for the exit animation of the outgoing view too; only act on the entrance.
    if ((definition as { opacity?: number })?.opacity !== 1) return;
    const target = pending.current;
    pending.current = null;
    if (target && target !== TOP) land(target, false);
  };

  return (
    <>
      <SubtleScrollFireworks enabled={route.tab === 'overview'} />
      <Navbar tab={route.tab} onNavigate={navigate} />

      <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
        <motion.main
          id="main"
          key={route.tab}
          role="tabpanel"
          className="relative z-10"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: TAB_FADE_S, ease: EASE_LUX }}
          onAnimationComplete={onTabEntered}
        >
          {route.tab === 'overview' ? <GalaOverview onNavigate={navigate} /> : <AlumniShowcase onNavigate={navigate} highlighted={highlight} />}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  );
}
