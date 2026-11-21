'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { Container } from '@/components/atoms/Container';
import { Badge } from '@/components/atoms/Badge';
import { ProductDetailClient } from './ProductDetailClient';
import { FileText, Warehouse, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';

export const ProductDetailPageClient: React.FC<{ product: Product }> = ({ product }) => {
  const { t, locale } = useLanguage();

  const displayName = locale === 'ar' && product.name_ar ? product.name_ar : product.name;
  const secondaryName = locale === 'ar' ? product.name : product.name_ar;
  const displayDesc =
    locale === 'ar' && product.description_ar ? product.description_ar : product.description;
  const categoryName = product.category
    ? locale === 'ar' && product.category.name_ar
      ? product.category.name_ar
      : product.category.name
    : null;

  return (
    <div className="min-h-screen bg-slate-50 py-14 sm:py-16">
      <Container size="lg" className="space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="transition hover:text-slate-800">
            {t('Home', 'الرئيسية')}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 rtl:rotate-180" />
          <Link href="/products" className="transition hover:text-slate-800">
            {t('Products', 'المنتجات')}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 rtl:rotate-180" />
          {product.category && (
            <>
              <Link href={`/divisions/${product.category.slug}`} className="transition hover:text-slate-800">
                {categoryName}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 rtl:rotate-180" />
            </>
          )}
          <span className="max-w-xs truncate font-semibold text-slate-900">{displayName}</span>
        </nav>

        {/* Main Product Card */}
        <div className="space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-xs sm:p-10">
          <div className="flex flex-col justify-between gap-6 border-b border-slate-100 pb-6 lg:flex-row lg:items-start">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {product.category && (
                  <Badge variant="teal" size="md">
                    {categoryName}
                  </Badge>
                )}
                {product.cas_number && (
                  <span className="rounded border border-slate-200 bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-700">
                    CAS {product.cas_number}
                  </span>
                )}
                {product.pharmacopoeia_standards && (
                  <span className="rounded border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-900">
                    {product.pharmacopoeia_standards}
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                {displayName}
              </h1>

              {secondaryName && (
                <p className="font-arabic text-sm font-semibold text-teal-800">{secondaryName}</p>
              )}

              <p className="pt-1 text-sm leading-relaxed text-slate-600 sm:text-base">
                {displayDesc}
              </p>
            </div>

            <div className="w-full shrink-0 lg:w-72">
              <ProductDetailClient product={product} />
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {t('Technical Specifications', 'المواصفات الفنية والقياسية')}
            </h2>

            <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <span className="mb-1 block font-semibold text-slate-400">
                  {t('Standard', 'الدستور المعتمد')}
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {product.pharmacopoeia_standards || t('Pharmacopoeial Standard', 'مواصفة قياسية')}
                </span>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <span className="mb-1 block font-semibold text-slate-400">
                  {t('Standard Packing', 'التعبئة القياسية')}
                </span>
                <span className="font-mono text-sm font-bold text-slate-800">
                  {product.packaging || t('Standard Drum / Bag', 'عبوة قياسية')}
                </span>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <span className="mb-1 block font-semibold text-slate-400">
                  {t('Product Group', 'التصنيف الفرعي')}
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {product.application || t('Industrial Formulation', 'صياغة صناعية')}
                </span>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <span className="mb-1 block font-semibold text-slate-400">
                  {t('Sector', 'القطاع')}
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {categoryName || product.industry}
                </span>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <span className="mb-1 block font-semibold text-slate-400">
                  {t('Grade', 'الدرجة')}
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {product.grade_spec || t('Certified Grade', 'درجة معتمدة')}
                </span>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <span className="mb-1 block font-semibold text-slate-400">
                  {t('Warehousing Partner', 'التخزين والإمداد')}
                </span>
                <span className="text-sm font-bold text-teal-800">
                  {t('Harvest Pharma GDP Warehousing', 'مستودعات هارفست فارما المعتمدة')}
                </span>
              </div>
            </div>

            {product.technical_info && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-700">
                <span className="mb-1 block font-semibold uppercase tracking-wider text-slate-500 rtl:normal-case rtl:tracking-normal">
                  {t('Available Grades & Technical Notes', 'الدرجات المتاحة والملاحظات الفنية')}
                </span>
                <p>{product.technical_info}</p>
              </div>
            )}
          </div>

          {/* Storage Partner Note */}
          <div className="flex items-start gap-3 rounded-xl bg-slate-900 p-5 text-xs text-white">
            <Warehouse className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" />
            <div>
              <strong className="block text-sm text-white">
                {t('Harvest Pharma Warehousing & Dispatch', 'التخزين والتوزيع عبر هارفست فارما')}
              </strong>
              <p className="mt-1 text-slate-300">
                {t(
                  'Stored under GDP-compliant temperature and humidity controls for reliable factory delivery across Egypt.',
                  'تخزين دوائي مطابق لمعايير التوزيع الجيد (GDP) مع تسليم منتظم لمصانع مصر.'
                )}
              </p>
            </div>
          </div>

          {/* Regulatory Documents Available */}
          <div className="space-y-3 border-t border-slate-100 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {t('Available Quality Documentation', 'الوثائق الفنية المتاحة')}
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-xs">
                <FileText className="h-4 w-4 shrink-0 text-teal-600" />
                <span className="font-semibold text-slate-800">
                  {t('Certificate of Analysis (COA)', 'شهادة التحليل (COA)')}
                </span>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-xs">
                <FileText className="h-4 w-4 shrink-0 text-teal-600" />
                <span className="font-semibold text-slate-800">
                  {t('Material Safety Data Sheet (MSDS)', 'صحيفة السلامة (MSDS)')}
                </span>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-xs">
                <FileText className="h-4 w-4 shrink-0 text-teal-600" />
                <span className="font-semibold text-slate-800">
                  {t('DMF & GMP Dossier Support', 'ملفات DMF وشهادات GMP')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
