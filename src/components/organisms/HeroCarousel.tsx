'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion, type PanInfo } from 'motion/react';
import { Button } from '@/components/atoms/Button';
import { RfqModal } from '@/components/molecules/RfqModal';
import { useLanguage } from '@/components/providers/LanguageContext';
import { withBasePath } from '@/lib/paths';
import { SPRING_SMOOTH, SPRING_MOMENTUM, CROSSFADE_REDUCED, projectVelocity } from '@/lib/motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Search,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  Warehouse,
  Pause,
  Play,
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
      en: 'Certified Raw Materials Importer • Egypt & MENA',
      ar: 'استيراد وتوريد الخامات الدوائية المعتمدة · مصر والشرق الأوسط',
    },
    titleHighlight: {
      en: 'Certified Pharmaceutical & Industrial Raw Materials',
      ar: 'توريد الخامات الدوائية والبيطرية والتجميلية',
    },
    titleRest: {
      en: 'Global Supply & Local Stock',
      ar: 'بمعايير الجودة العالمية',
    },
    description: {
      en: 'Direct supply of Human, Veterinary, Cosmetic, and Nutraceutical raw materials in standard industrial packaging.',
      ar: 'نورد الخامات البشرية والبيطرية وخامات مستحضرات التجميل والمكملات الغذائية في عبوات وبراميل قياسية معتمدة.',
    },
    image: '/images/deltachem-raw-drums.jpg',
    primaryCtaText: { en: 'Explore Product List', ar: 'استعراض قائمة الخامات' },
    primaryCtaHref: '/products',
    secondaryCtaText: { en: 'Request Commercial Quote', ar: 'طلب تسعير ومواصفات' },
    statsBadge: {
      value: '4 Sectors',
      label: { en: 'Human · Vet · Cosmetics · Nutraceuticals', ar: 'بشري · بيطري · تجميل · مكملات غذائية' },
    },
  },
  {
    id: 2,
    badge: {
      en: 'Sister Company Logistics • Harvest Pharma',
      ar: 'التخزين الاستراتيجي بالشراكة مع هارفست فارما',
    },
    titleHighlight: {
      en: 'Harvest Pharma GDP Warehousing Hub',
      ar: 'مستودعات هارفست فارما المعتمدة',
    },
    titleRest: {
      en: 'Controlled Temperature & Rapid Dispatch',
      ar: 'تخزين دوائي مضبوط وتوزيع سريع',
    },
    description: {
      en: 'Validated pharmaceutical storage with continuous thermal monitoring and prompt dispatch across Egypt.',
      ar: 'مخازن دوائية معتمدة ومجهزة برصد مستمر للحرارة والرطوبة لضمان التوريد الفوري لمصانع مصر.',
    },
    image: '/images/harvest-warehouse-1.webp',
    primaryCtaText: { en: 'Explore Warehousing', ar: 'مواصفات المخازن والإمداد' },
    primaryCtaHref: '/supply-chain',
    secondaryCtaText: { en: 'Inquire on Local Stock', ar: 'طلب تسعير مخزون محلي' },
    statsBadge: {
      value: '2°C–8°C',
      label: { en: 'Controlled Cold & Ambient Storage', ar: 'تخزين مبرد ومضبوط الحرارة' },
    },
  },
  {
    id: 3,
    badge: {
      en: 'Global Principals • Direct Maritime Import',
      ar: 'شراكات دولية واستيراد مباشر من المصانع العالمية',
    },
    titleHighlight: {
      en: 'International Supply Chains & Agency',
      ar: 'شحن دولي وتمثيل تجاري للمصانع العالمية',
    },
    titleRest: {
      en: 'From Global Producers to Your Plant',
      ar: 'من المصانع العالمية إلى خطوط الإنتاج',
    },
    description: {
      en: 'Connecting audited global synthesis manufacturers with Egyptian factories through transparent agency and stock models.',
      ar: 'نربط كبرى المصانع العالمية بالمصانع المصرية عبر الوكالة التجارية المباشرة والمخزون المحلي المعتمد.',
    },
    image: '/images/deltachem-global-shipping.jpg',
    primaryCtaText: { en: 'Our Supply Models', ar: 'نماذج التوريد والوكالة' },
    primaryCtaHref: '/services',
    secondaryCtaText: { en: 'Partner With Us', ar: 'طلب شراكة وتوريد' },
    statsBadge: {
      value: '20+ Years',
      label: { en: 'Raw Materials Import Leadership', ar: 'خبرة في استيراد وتوريد الخامات' },
    },
  },
];

const QUICK_TERMS = ['Amoxicillin', 'Paracetamol', 'Tylosin Tartrate', 'Ascorbic Acid', 'Carbomer 940'];

export const HeroCarousel: React.FC = () => {
  const { t, dir } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (reduceMotion || isHovered || isUserPaused) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [reduceMotion, isHovered, isUserPaused, nextSlide]);

  const active = SLIDES[currentSlide];

  const goSearch = (term: string) => {
    window.location.href = withBasePath(`/products?search=${encodeURIComponent(term)}`);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const projected = info.offset.x + projectVelocity(info.velocity.x, 0.99);
    const threshold = 72;
    if (Math.abs(projected) < threshold) return;
    const isRtl = dir === 'rtl';
    const swipedForward = isRtl ? projected > 0 : projected < 0;
    if (swipedForward) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  return (
    <>
      <section
        data-snap
        data-snap-label="Home"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex min-h-[min(86vh,780px)] items-center overflow-hidden bg-teal-950 text-white"
      >
        {/* Interruptible background crossfade */}
        <AnimatePresence mode="sync">
          <motion.div
            key={active.id}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={reduceMotion ? CROSSFADE_REDUCED : SPRING_SMOOTH}
            className="pointer-events-none absolute inset-0 z-0"
          >
            <Image
              src={active.image}
              alt=""
              fill
              priority={currentSlide === 0}
              fetchPriority={currentSlide === 0 ? 'high' : undefined}
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-950/95 via-teal-950/80 to-teal-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/85 via-transparent to-teal-950/40" />
          </motion.div>
        </AnimatePresence>

        {/* Direct horizontal swipe layer with rubber-band resistance */}
        <motion.div
          drag={reduceMotion ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.22}
          dragDirectionLock
          dragTransition={{ bounceStiffness: 320, bounceDamping: 26 }}
          onDragEnd={handleDragEnd}
          transition={SPRING_MOMENTUM}
          className="relative z-10 mx-auto w-full max-w-[1440px] cursor-grab px-5 py-16 active:cursor-grabbing sm:px-8 lg:px-12 lg:py-20"
        >
          <div className="grid grid-cols-1 items-center gap-10 xl:grid-cols-12">
            <div className="space-y-6 xl:col-span-8">
              <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-teal-400/40 bg-teal-950/75 px-4 py-1.5 text-xs font-semibold text-teal-300 backdrop-blur-md sm:text-sm">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-teal-400" />
                <span className="truncate">{t(active.badge.en, active.badge.ar)}</span>
              </div>

              <h1 className="text-[clamp(2rem,1.4rem+2.5vw,3.85rem)] font-extrabold leading-[1.08] tracking-tight text-white rtl:tracking-normal">
                <span className="block">{t(active.titleHighlight.en, active.titleHighlight.ar)}</span>
                <span className="mt-1.5 block bg-gradient-to-r from-teal-300 via-lime-300 to-amber-300 bg-clip-text text-transparent">
                  {t(active.titleRest.en, active.titleRest.ar)}
                </span>
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-slate-100/90 lg:text-lg">
                {t(active.description.en, active.description.ar)}
              </p>

              {/* Direct Search Box */}
              <div className="max-w-xl space-y-3 pt-1">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) goSearch(searchQuery.trim());
                  }}
                  className="flex items-center rounded-2xl border border-white/25 bg-white/10 p-1.5 shadow-2xl backdrop-blur-xl transition-all focus-within:border-teal-400"
                >
                  <Search className="mx-3 h-5 w-5 shrink-0 text-teal-400" aria-hidden="true" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label={t('Search raw materials', 'ابحث في الخامات')}
                    placeholder={t(
                      'Search raw material or pharmacopoeia (USP / BP / EP)...',
                      'ابحث باسم الخامة أو الدستور الدوائي (USP / BP / EP)...'
                    )}
                    className="w-full bg-transparent px-1 text-sm text-white placeholder:text-slate-300 focus:outline-none sm:text-base"
                  />
                  <Button type="submit" variant="teal" size="md" className="shrink-0 px-5 font-bold">
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
                      className="cursor-pointer rounded-full border border-white/20 bg-white/5 px-3 py-1 text-slate-100 transition-all duration-150 hover:border-teal-400 hover:bg-teal-400/20 active:scale-95"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
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
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span>{t(active.secondaryCtaText.en, active.secondaryCtaText.ar)}</span>
                </Button>
              </div>

              <div className="hidden grid-cols-3 gap-4 border-t border-white/15 pt-5 text-sm text-slate-200 lg:grid">
                <span className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-400" />
                  {t('USP / BP / EP / CPV', 'مطابق لدساتير الأدوية الدولية')}
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <FileCheck2 className="h-4 w-4 shrink-0 text-teal-400" />
                  {t('COA & Registration Dossiers', 'شهادات تحليل وملفات تسجيل')}
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <Warehouse className="h-4 w-4 shrink-0 text-teal-400" />
                  {t('Harvest Pharma Warehousing', 'مخازن هارفست فارما')}
                </span>
              </div>
            </div>

            {/* Right highlight card + pause control */}
            <div className="hidden xl:col-span-4 xl:block">
              <div className="rounded-3xl border border-white/20 bg-slate-950/95 p-7 shadow-2xl">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-amber-400 rtl:normal-case rtl:tracking-normal">
                    {t('DELTACHEM Snapshot', 'ملخص التشغيل')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsUserPaused((p) => !p)}
                    aria-label={isUserPaused ? t('Play slideshow', 'تشغيل العرض') : t('Pause slideshow', 'إيقاف العرض مؤقتاً')}
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 active:scale-95"
                  >
                    {isUserPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <div className="mt-2 text-4xl font-extrabold text-white">{active.statsBadge.value}</div>
                <p className="mt-1.5 text-sm text-slate-200">
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
                        className={`h-2 cursor-pointer rounded-full transition-all active:scale-95 ${
                          currentSlide === idx ? 'w-8 bg-teal-400' : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Prev / Next arrows */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-teal-950/60 text-white backdrop-blur-md transition-all hover:bg-teal-600 active:scale-95 lg:flex"
        >
          <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-teal-950/60 text-white backdrop-blur-md transition-all hover:bg-teal-600 active:scale-95 lg:flex"
        >
          <ChevronRight className="h-5 w-5 rtl:rotate-180" />
        </button>

        {/* Mobile/Tablet Slide Controls + Pause */}
        <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center xl:hidden">
          <div className="flex items-center gap-3 rounded-full border border-white/20 bg-teal-950/95 px-4 py-1.5 shadow-lg">
            <button
              type="button"
              onClick={() => setIsUserPaused((p) => !p)}
              aria-label={isUserPaused ? t('Play slideshow', 'تشغيل العرض') : t('Pause slideshow', 'إيقاف العرض مؤقتاً')}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-slate-200 hover:text-white active:scale-95"
            >
              {isUserPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            </button>
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
                    currentSlide === idx ? 'w-7 bg-teal-400' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <RfqModal isOpen={isRfqOpen} onClose={() => setIsRfqOpen(false)} />
    </>
  );
};
