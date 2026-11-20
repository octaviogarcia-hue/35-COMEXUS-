import { useCallback, useEffect, useState } from 'react';
import { OVERVIEW_SECTION_IDS, PROFILE_IDS, type TabId } from '../data/galaData';

/**
 * Hash-based routing: GitHub Pages and any static host only ever serve
 * index.html, so external deep links can never hit a 404.
 *
 * Every one of these lands on the right place:
 *   #/alumni                      → Alumni tab
 *   #/alumni/photographer-2       → Alumni tab, scrolled to that profile (canonical form; photographer-1 … -6)
 *   #photographer-2 · #musician   → same (short anchor form)
 *   ?tab=alumni                   → Alumni tab
 *   ?tab=alumni#photographer-2    → Alumni tab + profile
 *   #/overview/program · #program → Overview tab, scrolled to a section
 */
export interface Route {
  tab: TabId;
  anchor: string | null;
}

const isProfile = (id: string) => (PROFILE_IDS as readonly string[]).includes(id);
const isSection = (id: string) => (OVERVIEW_SECTION_IDS as readonly string[]).includes(id);

export function parseLocation(loc: Pick<Location, 'hash' | 'search'> = window.location): Route {
  const segments = decodeURIComponent(loc.hash.replace(/^#/, ''))
    .split(/[/#]/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  let queryTab: string | null = null;
  try {
    queryTab = new URLSearchParams(loc.search).get('tab');
  } catch {
    /* ignore */
  }

  const [first, second] = segments;

  if (first === 'alumni') return { tab: 'alumni', anchor: second && isProfile(second) ? second : null };
  if (first === 'overview' || first === 'gala') return { tab: 'overview', anchor: second && isSection(second) ? second : null };
  if (first && isProfile(first)) return { tab: 'alumni', anchor: first };
  if (first && isSection(first)) return { tab: 'overview', anchor: first };
  if (queryTab === 'alumni') return { tab: 'alumni', anchor: null };
  return { tab: 'overview', anchor: null };
}

export function buildHash(tab: TabId, anchor?: string | null) {
  if (tab === 'alumni') return anchor ? `#/alumni/${anchor}` : '#/alumni';
  return anchor && anchor !== 'top' ? `#/overview/${anchor}` : '#/';
}

export function useHashRoute() {
  const [route, setRoute] = useState<Route>(() => parseLocation());

  useEffect(() => {
    const onChange = () => setRoute(parseLocation());
    window.addEventListener('hashchange', onChange);
    window.addEventListener('popstate', onChange);
    return () => {
      window.removeEventListener('hashchange', onChange);
      window.removeEventListener('popstate', onChange);
    };
  }, []);

  const navigate = useCallback((tab: TabId, anchor: string | null = null) => {
    const hash = buildHash(tab, anchor);
    if (window.location.hash !== hash) {
      try {
        // Drop ?tab= once inside the app so the hash is the single source of truth.
        const url = new URL(window.location.href);
        url.searchParams.delete('tab');
        url.hash = hash;
        window.history.pushState(null, '', url.toString());
      } catch {
        window.location.hash = hash;
      }
    }
    setRoute({ tab, anchor });
  }, []);

  return { route, navigate };
}
