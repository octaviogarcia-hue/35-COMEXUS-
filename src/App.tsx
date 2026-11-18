import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import SubtleScrollFireworks from './components/ui/SubtleScrollFireworks';
import { PROFILE_IDS } from './data/galaData';
import { useHashRoute } from './hooks/useHashRoute';
import AlumniShowcase from './views/AlumniShowcase';
import GalaOverview from './views/GalaOverview';

const TAB_FADE_MS = 280;

function scrollToId(id: string, smooth: boolean) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  return true;
}

export default function App() {
  const { route, navigate } = useHashRoute();
  const reduce = useReducedMotion();
  const prevTab = useRef(route.tab);
  const firstRun = useRef(true);
  const [highlight, setHighlight] = useState<string | null>(null);

  /* Scroll management: tab switches start at the top; anchors (QR deep links) scroll to the profile/section. */
  useEffect(() => {
    const tabChanged = prevTab.current !== route.tab;
    prevTab.current = route.tab;
    const isFirst = firstRun.current;
    firstRun.current = false;
    const timers: number[] = [];

    if (!route.anchor || route.anchor === 'top') {
      if (tabChanged || route.anchor === 'top') window.scrollTo({ top: 0, behavior: tabChanged || reduce ? 'auto' : 'smooth' });
      return;
    }

    const anchor = route.anchor;
    const wait = tabChanged ? TAB_FADE_MS + 60 : isFirst ? 120 : 0;
    timers.push(window.setTimeout(() => scrollToId(anchor, !isFirst && !tabChanged && !reduce), wait));
    // Second pass after web fonts settle so a QR landing is pixel-accurate.
    if (isFirst || tabChanged) timers.push(window.setTimeout(() => scrollToId(anchor, false), wait + 650));

    if ((PROFILE_IDS as readonly string[]).includes(anchor)) {
      setHighlight(anchor);
      timers.push(window.setTimeout(() => setHighlight(null), 4200));
    }
    return () => timers.forEach(clearTimeout);
  }, [route, reduce]);

  return (
    <>
      <SubtleScrollFireworks enabled={route.tab === 'overview'} />
      <Navbar tab={route.tab} onNavigate={navigate} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={route.tab}
          role="tabpanel"
          className="relative z-10"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: TAB_FADE_MS / 1000, ease: 'easeOut' }}
        >
          {route.tab === 'overview' ? <GalaOverview onNavigate={navigate} /> : <AlumniShowcase onNavigate={navigate} highlighted={highlight} />}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  );
}
