'use client';

import React from 'react';
import { useLanguage } from '@/components/providers/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Switch Language"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-slate-300 hover:border-slate-400 bg-white/80 hover:bg-white text-slate-700 transition shadow-xs cursor-pointer ${
        className || ''
      }`}
    >
      <Globe className="w-3.5 h-3.5 text-teal-600" />
      <span className="uppercase">{locale === 'en' ? 'العربية' : 'English'}</span>
    </button>
  );
};
