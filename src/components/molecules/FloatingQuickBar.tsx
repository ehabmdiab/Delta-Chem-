'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RfqModal } from '@/components/molecules/RfqModal';
import { Sparkles, Phone, ArrowUp } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';

export const FloatingQuickBar: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isRfqOpen, setIsRfqOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rtl:right-auto rtl:left-6"
          >
            {/* Quick RFQ Capsule */}
            <button
              type="button"
              onClick={() => setIsRfqOpen(true)}
              className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white border border-teal-500/50 shadow-2xl backdrop-blur-xl transition-all hover:scale-105 cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
              </span>
              <Sparkles className="w-4 h-4 text-teal-400 group-hover:rotate-12 transition-transform" />
              <span className="text-xs sm:text-sm font-bold tracking-tight">
                {t('Quick RFQ', 'طلب تسعير سريع')}
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-800">
                {t('24h SLA', 'خلال ٢٤ ساعة')}
              </span>
            </button>

            {/* Direct Phone Call Button */}
            <a
              href="tel:+20226988187"
              title={t('Call Cairo Procurement Desk', 'اتصل بمكتب المشتريات بالقاهرة')}
              className="p-3 rounded-full bg-slate-900/90 hover:bg-slate-900 text-teal-400 hover:text-white border border-slate-700 shadow-xl backdrop-blur-xl transition-all hover:scale-105 cursor-pointer flex items-center justify-center"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              title={t('Scroll to Top', 'العودة للأعلى')}
              className="p-3 rounded-full bg-slate-900/90 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-700 shadow-xl backdrop-blur-xl transition-all hover:scale-105 cursor-pointer flex items-center justify-center"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <RfqModal isOpen={isRfqOpen} onClose={() => setIsRfqOpen(false)} />
    </>
  );
};
