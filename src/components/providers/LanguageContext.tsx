'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale } from '@/types';

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: 'ltr' | 'rtl';
  t: (en: string, ar?: string | null) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
  dir: 'ltr',
  t: (en) => en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('deltachem_lang') as Locale | null;
      if (saved === 'en' || saved === 'ar') {
        return saved;
      }
    }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('deltachem_lang', newLocale);
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
  };

  const t = (en: string, ar?: string | null): string => {
    if (locale === 'ar' && ar && ar.trim().length > 0) {
      return ar;
    }
    return en;
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        dir: locale === 'ar' ? 'rtl' : 'ltr',
        t,
      }}
    >
      <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className={locale === 'ar' ? 'font-arabic' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
