'use client';

import React from 'react';
import Link from 'next/link';
import { Category, Product } from '@/types';
import { Container } from '@/components/atoms/Container';
import { ProductCard } from '@/components/molecules/ProductCard';
import { Button } from '@/components/atoms/Button';
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
    <div className="py-12 bg-slate-50 min-h-screen">
      <Container size="lg" className="space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-800 transition">
            {t('Home', 'الرئيسية')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
          <Link href="/products" className="hover:text-slate-800 transition">
            {t('Products', 'المنتجات')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
          <span className="text-slate-900 font-semibold">{displayName}</span>
        </nav>

        {/* Division Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
          <div className="inline-block px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold rounded-full uppercase tracking-wider">
            {t('DELTACHEM Specialized Division', 'أقسام دلتا كيم التخصصية')}
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            {displayName}
          </h1>

          {secondaryName && (
            <p className="text-base font-bold text-teal-800 font-arabic">
              {secondaryName}
            </p>
          )}

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            {displayDesc}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link href="/request-a-quote">
              <Button variant="teal" size="sm">
                {t('Request Division RFQ', 'طلب عرض أسعار للقسم')}
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="sm">
                {t('View Entire Catalog', 'عرض كامل الكتالوج')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Division Products Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              {t(
                `Showing ${products.length} registered product${
                  products.length === 1 ? '' : 's'
                } in this division`,
                `عرض ${products.length} منتج مسجل في هذا القسم`
              )}
            </span>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
              {t(
                'No products are currently published in this division. Contact our sourcing desk for custom inquiries.',
                'لا توجد منتجات منشورة حالياً في هذا القسم. يرجى التواصل مع مكتب التوريد للاستفسارات المخصصة.'
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
