'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/atoms/Button';
import { RfqModal } from '@/components/molecules/RfqModal';
import { useLanguage } from '@/components/providers/LanguageContext';
import { withBasePath } from '@/lib/paths';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Search,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  Warehouse,
} from 'lucide-react';

interface Bilingual {
  en: string;
  ar: string;
}

interface Slide {
  id: number;
  badge: Bilingual;
  titleHighlight: Bilingual;
  titleRest: Bilingual;
  description: Bilingual;
  image: string;
  primaryCtaText: Bilingual;
  primaryCtaHref: string;
  secondaryCtaText: Bilingual;
  statsBadge: { value: string; label: Bilingual };
}

const SLIDES: Slide[] = [
  {
    id: 1,
    badge: {
      en: 'Certified B2B Ingredients Supplier • Cairo, Egypt & MENA',
      ar: 'مورد وموزع معتمد للمواد الخام الصيدلانية لمصر والشرق الأوسط',
    },
    titleHighlight: {
      en: 'High-Purity Active Ingredients & Excipients',
      ar: 'مواد فعالة صيدلانية وسواغات عالية النقاء',
    },
    titleRest: {
      en: 'for Pharmaceutical Formulators',
      ar: 'لمصنعي الأدوية ومستحضرات التجميل',
    },
    description: {
      en: 'DELTACHEM connects audited global synthesis principals with formulation plants across Egypt — pharmacopoeia-certified APIs, functional excipients and veterinary actives with audit-ready dossiers and local Cairo GDP warehousing.',
      ar: 'تربط دلتا كيم بين كبرى مصانع المواد الكيميائية العالمية ومصانع الأدوية في مصر. نوفر مواد فعالة وسواغات ومكونات بيطرية مطابقة لدساتير الأدوية مع ملفات تسجيل كاملة وتخزين معتمد في القاهرة.',
    },
    image: '/images/pharma-lab-cleanroom.jpg',
    primaryCtaText: { en: 'Explore Product Catalog', ar: 'استعراض دليل المنتجات' },
    primaryCtaHref: '/products',
    secondaryCtaText: { en: 'Request Commercial Quote', ar: 'طلب تسعير ومواصفات' },
    statsBadge: {
      value: '100%',
      label: { en: 'EDA Audit-Ready Dossiers', ar: 'ملفات جاهزة لتدقيق هيئة الدواء' },
    },
  },
  {
    id: 2,
    badge: {
      en: 'Sister Company Synergy • Gesr El-Suez, Cairo',
      ar: 'تكامل استراتيجي مع الشقيقة هارفست فارما • جسر السويس، القاهرة',
    },
    titleHighlight: {
      en: 'Harvest Pharma Cairo GDP Warehousing Hub',
      ar: 'مستودعات هارفست فارما بالقاهرة المعتمدة',
    },
    titleRest: {
      en: 'Climate-Controlled 2°C–8°C Storage',
      ar: 'تخزين مبرد مخصص من ٢ إلى ٨ درجات مئوية',
    },
    description: {
      en: 'Buffer stock held in validated pharmaceutical conditions with continuous temperature and humidity logging. Same-day to 48-hour dispatch to 10th of Ramadan, 6th of October, Obour and Alexandria.',
      ar: 'مخزون استراتيجي جاهز للتسليم الفوري من مستودعاتنا بالقاهرة مع رقابة مستمرة لدرجات الحرارة والرطوبة لضمان استمرارية خطوط الإنتاج الدوائي دون توقف.',
    },
    image: '/images/pharma-warehouse-coldchain.jpg',
    primaryCtaText: { en: 'Inspect Cairo Warehouse', ar: 'مواصفات التخزين والمستودع' },
    primaryCtaHref: '/supply-chain',
    secondaryCtaText: { en: 'Request Cold Chain Quote', ar: 'طلب تسعير مخزون محلي' },
    statsBadge: {
      value: '2°C–8°C',
      label: { en: 'Continuous Monitored Cold Bay', ar: 'رصد حراري مستمر للغرف المبردة' },
    },
  },
  {
    id: 3,
    badge: {
      en: 'Executive Leadership • Dr. Abdelhamid Aboelaly, MD',
      ar: 'قيادة تنفيذية وخبرة عريقة • د. عبدالحميد أبو العلي',
    },
    titleHighlight: {
      en: 'Authorized Global Commission Agency',
      ar: 'وكالة تجارية وتمثيل معتمد للمصانع العالمية',
    },
    titleRest: {
      en: '& Direct Indent Representation',
      ar: 'وربط تقني مباشر بالمصانع المصرية',
    },
    description: {
      en: 'Authorized commercial and technical agent for foreign chemical manufacturers — local pre-qualification, customer sampling, DMF dossier submission and direct principal contracting for Egyptian plants.',
      ar: 'نعمل كوكيل تجاري وفني معتمد للمصانع العالمية، وندير عمليات التأهيل المحلي وعينات R&D وتقديم ملفات DMF لهيئة الدواء المصرية والتعاقد المباشر.',
    },
    image: '/images/bg-cairo-dusk.jpg',
    primaryCtaText: { en: 'Review Agency Credentials', ar: 'الملف المؤسسي والاعتمادات' },
    primaryCtaHref: '/about',
    secondaryCtaText: { en: 'Propose Agency Partnership', ar: 'طلب شراكة وتمثيل' },
    statsBadge: {
      value: '20+ Years',
      label: { en: 'Chemical Industry Leadership', ar: 'ريادة في الصناعات الكيميائية' },
    },
  },
];

const QUICK_TERMS = ['Amoxicillin', 'Metformin', 'MCC PH-102', 'Sodium Hyaluronate'];

export const HeroCarousel: React.FC = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const active = SLIDES[currentSlide];

  const goSearch = (term: string) => {
    window.location.href = withBasePath(`/products?search=${encodeURIComponent(term)}`);
  };

  return (
    <>
      <section
        data-snap
        data-snap-label="Home"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative overflow-hidden bg-teal-950 text-white"
      >
        {/* Background crossfade */}
        <AnimatePresence mode="sync">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="pointer-events-none absolute inset-0 z-0"
          >
            <Image
              src={active.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-950/95 via-teal-950/80 to-teal-950/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-transparent to-teal-950/40" />
          </motion.div>
        </AnimatePresence>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/4 z-[1] h-[28rem] w-[28rem] rounded-full bg-teal-400/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 right-0 z-[1] h-[22rem] w-[22rem] rounded-full bg-amber-500/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1720px] px-4 py-8 sm:px-8 lg:px-20 xl:px-28">
          <div className="grid grid-cols-1 items-center gap-8 xl:grid-cols-12 xl:gap-12">
            <div className="space-y-5 xl:col-span-8 2xl:col-span-7">
              <motion.div
                key={`badge-${active.id}`}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-teal-400/40 bg-teal-950/70 px-4 py-1.5 text-xs font-semibold text-teal-300 backdrop-blur-md sm:text-sm"
              >
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-400" />
                </span>
                <span className="truncate">{t(active.badge.en, active.badge.ar)}</span>
              </motion.div>

              <motion.h1
                key={`title-${active.id}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[clamp(2.1rem,4.3vw,4.75rem)] font-extrabold leading-[1.06] tracking-tight text-white"
              >
                <span className="block">{t(active.titleHighlight.en, active.titleHighlight.ar)}</span>
                <span className="mt-1 block bg-gradient-to-r from-teal-400 via-lime-300 to-amber-400 bg-clip-text text-transparent">
                  {t(active.titleRest.en, active.titleRest.ar)}
                </span>
              </motion.h1>

              <motion.p
                key={`desc-${active.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-3xl text-base leading-relaxed text-slate-100/90 lg:text-lg xl:text-xl"
              >
                {t(active.description.en, active.description.ar)}
              </motion.p>

              <div className="max-w-2xl space-y-3 pt-1">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) goSearch(searchQuery.trim());
                  }}
                  className="flex items-center rounded-2xl border border-white/20 bg-white/10 p-1.5 shadow-2xl backdrop-blur-xl transition-all focus-within:border-teal-400"
                >
                  <Search className="mx-3 h-5 w-5 shrink-0 text-teal-400" aria-hidden="true" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label={t('Search products', 'ابحث في المنتجات')}
                    placeholder={t(
                      'Search chemical name, CAS # or pharmacopoeia…',
                      'ابحث باسم المادة الكيميائية أو رقم CAS أو الدستور الدوائي...'
                    )}
                    className="w-full bg-transparent px-1 text-sm text-white placeholder:text-slate-300 focus:outline-none sm:text-base"
                  />
                  <Button type="submit" variant="teal" size="md" className="shrink-0 px-6 font-bold">
                    {t('Search', 'بحث')}
                  </Button>
                </form>

                <div className="hidden flex-wrap items-center gap-2 text-xs sm:flex">
                  <span className="font-medium text-slate-300">{t('Quick lookup:', 'بحث سريع:')}</span>
                  {QUICK_TERMS.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => goSearch(term)}
                      className="cursor-pointer rounded-full border border-white/20 bg-white/5 px-3 py-1 text-slate-100 transition-colors hover:border-teal-400 hover:bg-teal-400/20"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link href={active.primaryCtaHref}>
                  <Button variant="teal" size="lg" className="px-7 font-extrabold shadow-xl shadow-teal-950/50">
                    <span>{t(active.primaryCtaText.en, active.primaryCtaText.ar)}</span>
                    <ArrowRight className="h-5 w-5 rtl:rotate-180" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsRfqOpen(true)}
                  className="border-white/40 px-6 font-bold text-white backdrop-blur-md hover:bg-white/10"
                >
                  <Sparkles className="mr-2 h-4 w-4 text-amber-400" />
                  <span>{t(active.secondaryCtaText.en, active.secondaryCtaText.ar)}</span>
                </Button>
              </div>

              <div className="hidden grid-cols-3 gap-4 border-t border-white/15 pt-4 text-sm text-slate-200 lg:grid">
                <span className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-400" />
                  {t('USP / BP / EP / JP', 'مطابقة لدساتير الأدوية الدولية')}
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <FileCheck2 className="h-4 w-4 shrink-0 text-teal-400" />
                  {t('COA, DMF & Dossiers', 'دعم ملفات DMF وشهادات التحليل')}
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <Warehouse className="h-4 w-4 shrink-0 text-teal-400" />
                  {t('Harvest Pharma Hub', 'مستودع هارفست فارما')}
                </span>
              </div>
            </div>

            {/* Floating metric card — xl+ only */}
            <div className="hidden xl:col-span-4 xl:col-start-9 xl:block 2xl:col-span-3 2xl:col-start-10">
              <motion.div
                key={`card-${active.id}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-3xl border border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-xl"
              >
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-400">
                  {t('Operational Highlight', 'مؤشر تشغيلي')}
                </span>
                <div className="mt-2 text-5xl font-extrabold text-white">{active.statsBadge.value}</div>
                <p className="mt-1 text-base text-slate-200">
                  {t(active.statsBadge.label.en, active.statsBadge.label.ar)}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-4">
                  <span className="font-mono text-sm text-slate-200">
                    {String(currentSlide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-2">
                    {SLIDES.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-2 cursor-pointer rounded-full transition-all ${
                          currentSlide === idx ? 'w-8 bg-teal-400' : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-teal-950/50 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-teal-600 sm:flex lg:left-6"
        >
          <ChevronLeft className="h-6 w-6 rtl:rotate-180" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-teal-950/50 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-teal-600 sm:flex lg:right-16"
        >
          <ChevronRight className="h-6 w-6 rtl:rotate-180" />
        </button>

        {/* Slide navigation controls + counter (visible across all viewports) */}
        <div className="absolute inset-x-0 bottom-3 z-20 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 rounded-full border border-white/20 bg-teal-950/75 px-4 py-1.5 shadow-lg backdrop-blur-md xl:hidden">
            <span className="font-mono text-xs font-bold text-teal-300">
              {String(currentSlide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-1.5">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 cursor-pointer rounded-full transition-all ${
                    currentSlide === idx ? 'w-8 bg-teal-400' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
          <ChevronDown className="hidden h-5 w-5 animate-bounce text-white/70 sm:block" aria-hidden="true" />
        </div>
      </section>

      <RfqModal isOpen={isRfqOpen} onClose={() => setIsRfqOpen(false)} />
    </>
  );
};
