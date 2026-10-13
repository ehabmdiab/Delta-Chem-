'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from '@/components/molecules/ProductCard';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Button } from '@/components/atoms/Button';
import { useLanguage } from '@/components/providers/LanguageContext';

/** Slide 4 — horizontal rail of featured, ready-for-inquiry materials. */
export const FeaturedProductsRail: React.FC<{ products: Product[] }> = ({ products }) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const updateIndexFromScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    if (!card) return;
    const cardWidth = card.offsetWidth + 20;
    const scrollPos = Math.abs(el.scrollLeft);
    const idx = Math.min(
      products.length - 1,
      Math.max(0, Math.round(scrollPos / cardWidth))
    );
    setCurrentIndex(idx);
  }, [products.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateIndexFromScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [updateIndexFromScroll]);

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      const isRtl = document.documentElement.dir === 'rtl';
      const card = el.querySelector<HTMLElement>('[data-card]');
      const step = (card?.offsetWidth ?? 360) + 20;
      const targetIdx = Math.max(0, Math.min(products.length - 1, currentIndex + direction));
      setCurrentIndex(targetIdx);
      el.scrollTo({ left: (isRtl ? -1 : 1) * targetIdx * step, behavior: 'smooth' });
    },
    [currentIndex, products.length]
  );

  return (
    <SectionShell label="Featured" tone="tint">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeader
            eyebrow={t('Verified Pharmacopoeial Materials', 'مواد معتمدة وفق الدساتير الدوائية')}
            title={t('Featured Active Ingredients & Excipients', 'المواد الفعالة والسواغات المميزة')}
            description={t(
              'Ready-for-inquiry ingredients with certified batch COAs, technical monographs and prompt Cairo buffer-stock dispatch.',
              'مكونات جاهزة للاستفسار مع شهادات تحليل دفعية ومواصفات فنية وتسليم فوري من مخزون القاهرة.'
            )}
          />
          <div className="flex shrink-0 items-center gap-3">
            {/* Swiper fraction counter */}
            <div
              aria-label={t(
                `Product ${currentIndex + 1} of ${products.length}`,
                `منتج ${currentIndex + 1} من ${products.length}`
              )}
              className="flex items-center gap-1.5 rounded-full border border-teal-600/30 bg-white px-4 py-2 font-mono text-sm font-extrabold text-slate-800 shadow-sm"
            >
              <span className="text-teal-700">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="text-slate-400">/</span>
              <span>{String(products.length).padStart(2, '0')}</span>
            </div>
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label={t('Previous products', 'المنتجات السابقة')}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-teal-600/40 bg-white text-teal-700 shadow-sm transition-all hover:scale-105 hover:bg-teal-600 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label={t('Next products', 'المنتجات التالية')}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-teal-600/40 bg-white text-teal-700 shadow-sm transition-all hover:scale-105 hover:bg-teal-600 hover:text-white"
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </button>
            <Link href="/products" className="hidden sm:block">
              <Button variant="outline" size="lg" className="font-bold">
                <span>{t('Full Catalog', 'الكتالوج الكامل')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </div>

        <div
          ref={trackRef}
          className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 pt-1 sm:-mx-8 sm:px-8 lg:-mx-14 lg:px-14 xl:-mx-20 xl:px-20"
        >
          {products.map((product) => (
            <div
              key={product.id}
              data-card
              className="flex w-[min(86vw,22rem)] shrink-0 snap-start flex-col xl:w-[24rem] [&>*]:h-full"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Pagination bullets */}
        {products.length > 1 && (
          <div className="flex items-center justify-center gap-2 pt-1">
            {products.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  const el = trackRef.current;
                  if (!el) return;
                  const isRtl = document.documentElement.dir === 'rtl';
                  const card = el.querySelector<HTMLElement>('[data-card]');
                  const step = (card?.offsetWidth ?? 360) + 20;
                  setCurrentIndex(idx);
                  el.scrollTo({ left: (isRtl ? -1 : 1) * idx * step, behavior: 'smooth' });
                }}
                aria-label={`Go to product ${idx + 1}`}
                className={`h-2 cursor-pointer rounded-full transition-all ${
                  currentIndex === idx ? 'w-8 bg-teal-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </SectionShell>
  );
};
