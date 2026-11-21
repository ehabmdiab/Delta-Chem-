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

export const FeaturedProductsRail: React.FC<{ products: Product[] }> = ({ products }) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const updateIndexFromScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    if (!card) return;
    const cardWidth = card.offsetWidth + 24;
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
      const step = (card?.offsetWidth ?? 360) + 24;
      const targetIdx = Math.max(0, Math.min(products.length - 1, currentIndex + direction));
      setCurrentIndex(targetIdx);
      el.scrollTo({ left: (isRtl ? -1 : 1) * targetIdx * step, behavior: 'smooth' });
    },
    [currentIndex, products.length]
  );

  return (
    <SectionShell label="Featured" tone="tint">
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeader
            eyebrow={t('Featured Raw Materials', 'خامات مختارة من القائمة الرسمية')}
            title={t('Key Products Across Our Four Sectors', 'أبرز الخامات المتوفرة عبر القطاعات الأربعة')}
            description={t(
              'Pharmacopoeia-compliant raw materials supplied with full COAs and reliable local logistics.',
              'خامات معتمدة وفق دساتير الأدوية الدولية مع شهادات التحليل وتوافر التوريد السريع.'
            )}
          />
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label={t('Previous products', 'المنتجات السابقة')}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-teal-600/40 bg-white text-teal-700 shadow-xs transition hover:bg-teal-600 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label={t('Next products', 'المنتجات التالية')}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-teal-600/40 bg-white text-teal-700 shadow-xs transition hover:bg-teal-600 hover:text-white"
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </button>
            <Link href="/products" className="hidden sm:block">
              <Button variant="outline" size="lg" className="font-bold">
                <span>{t('Full List', 'القائمة الكاملة')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </div>

        <div
          ref={trackRef}
          className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-2 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
        >
          {products.map((product) => (
            <div
              key={product.id}
              data-card
              className="flex w-[min(86vw,22rem)] shrink-0 snap-start flex-col xl:w-[23rem] [&>*]:h-full"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
};
