'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { RfqModal } from '@/components/molecules/RfqModal';
import { siteConfig } from '@/config/site';
import { SPRING_SNAPPY, CROSSFADE_REDUCED } from '@/lib/motion';
import { Sparkles, Phone, ArrowUp, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';

export const FloatingQuickBar: React.FC = () => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isRfqOpen, setIsRfqOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.96 }}
            transition={reduceMotion ? CROSSFADE_REDUCED : SPRING_SNAPPY}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rtl:left-6 rtl:right-auto"
          >
            {/* Quick RFQ Capsule */}
            <button
              type="button"
              onClick={() => setIsRfqOpen(true)}
              className="group flex cursor-pointer items-center gap-2 rounded-full border border-teal-400/40 bg-slate-900 px-4 py-3 text-white shadow-2xl transition-transform hover:scale-[1.03] hover:bg-slate-800 active:scale-95"
            >
              <Sparkles className="h-4 w-4 text-teal-400 transition-transform group-hover:rotate-12" />
              <span className="text-xs font-bold tracking-tight sm:text-sm">
                {t('Quick RFQ', 'طلب تسعير')}
              </span>
            </button>

            {/* Direct WhatsApp Button */}
            <a
              href={siteConfig.socials.whatsappPrimary}
              target="_blank"
              rel="noopener noreferrer"
              title={t('WhatsApp Sales (01003875503)', 'واتساب المبيعات (01003875503)')}
              className="flex cursor-pointer items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-600 p-3 text-white shadow-xl transition-transform hover:scale-[1.05] hover:bg-emerald-500 active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
            </a>

            {/* Direct Landline Call Button */}
            <a
              href={`tel:${siteConfig.contact.phoneClean}`}
              title={t('Call Landline (0226988187)', 'اتصل بالأرضي (0226988187)')}
              className="flex cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-900 p-3 text-teal-400 shadow-xl transition-transform hover:scale-[1.05] hover:bg-slate-800 hover:text-white active:scale-95"
            >
              <Phone className="h-4 w-4" />
            </a>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              title={t('Scroll to Top', 'العودة للأعلى')}
              className="flex cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-900 p-3 text-slate-300 shadow-xl transition-transform hover:scale-[1.05] hover:bg-slate-800 hover:text-white active:scale-95"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <RfqModal isOpen={isRfqOpen} onClose={() => setIsRfqOpen(false)} />
    </>
  );
};
