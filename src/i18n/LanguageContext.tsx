import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { CONTENT, DEFAULT_LANG, type GalaContent, type Lang } from '../data/galaData';

interface LanguageState {
  lang: Lang;
  t: GalaContent;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageState | null>(null);

/**
 * English loads by default. A shared link may force Spanish with `?lang=es`
 * (handy for a Spanish-language QR code); otherwise the choice lives in memory
 * only, so every fresh visit starts in English as requested.
 */
function initialLang(): Lang {
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'es' || q === 'en') return q;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((next: Lang) => setLangState(next), []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = CONTENT[lang].meta.title;
  }, [lang]);

  const value = useMemo(() => ({ lang, t: CONTENT[lang], setLang }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
