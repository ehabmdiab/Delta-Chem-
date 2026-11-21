'use client';

import React from 'react';
import Link from 'next/link';
import { Category, Product } from '@/types';
import { Container } from '@/components/atoms/Container';
import { Button } from '@/components/atoms/Button';
import { ProductFilterPanel } from '@/components/organisms/ProductFilterPanel';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';

interface DivisionPageClientProps {
  category: Category;
  products: Product[];
}

export const DivisionPageClient: React.FC<DivisionPageClientProps> = ({
  category,
  products,
}) => {
  const { t, locale } = useLanguage();

  const displayName = locale === 'ar' && category.name_ar ? category.name_ar : category.name;
  const secondaryName = locale === 'ar' ? category.name : category.name_ar;
  const displayDesc =
    locale === 'ar' && category.description_ar
      ? category.description_ar
      : category.description;

  return (
    <div className="min-h-screen bg-slate-50 py-14 sm:py-16">
      <Container size="lg" className="space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="transition hover:text-slate-800">
            {t('Home', 'الرئيسية')}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 rtl:rotate-180" />
          <Link href="/products" className="transition hover:text-slate-800">
            {t('Products', 'المنتجات')}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 rtl:rotate-180" />
          <span className="font-semibold text-slate-900">{displayName}</span>
        </nav>

        {/* Division Header Banner */}
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-xs sm:p-10">
          <div className="inline-block rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-800">
            {t('DELTACHEM Sector Catalog', 'قطاع الخامات المعتمد — دلتا كيم')}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {displayName}
          </h1>

          {secondaryName && (
            <p className="font-arabic text-base font-bold text-teal-800">{secondaryName}</p>
          )}

          <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {displayDesc}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/request-a-quote">
              <Button variant="teal" size="md">
                {t('Request Sector RFQ', 'طلب عرض أسعار للقطاع')}
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="md">
                {t('View All 4 Sectors', 'عرض جميع القطاعات الأربعة')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Scoped Filterable & Paginated Catalog */}
        <ProductFilterPanel
          initialProducts={products}
          categories={[category]}
          initialCategorySlug={category.slug}
          hideCategoryPills
        />
      </Container>
    </div>
  );
};
