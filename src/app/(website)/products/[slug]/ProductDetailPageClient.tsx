'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { Container } from '@/components/atoms/Container';
import { Badge } from '@/components/atoms/Badge';
import { ProductDetailClient } from './ProductDetailClient';
import {
  FileText,
  Warehouse,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';

export const ProductDetailPageClient: React.FC<{ product: Product }> = ({ product }) => {
  const { t, locale } = useLanguage();

  const isHarvestFacility = product.availability_status
    .toLowerCase()
    .includes('harvest');

  const displayName = locale === 'ar' && product.name_ar ? product.name_ar : product.name;
  const secondaryName = locale === 'ar' ? product.name : product.name_ar;
  const displayDesc = locale === 'ar' && product.description_ar ? product.description_ar : product.description;
  const categoryName = product.category
    ? (locale === 'ar' && product.category.name_ar ? product.category.name_ar : product.category.name)
    : null;

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <Container size="lg" className="space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-800 transition">
            {t('Home', 'الرئيسية')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
          <Link href="/products" className="hover:text-slate-800 transition">
            {t('Products', 'المنتجات')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
          {product.category && (
            <>
              <Link
                href={`/divisions/${product.category.slug}`}
                className="hover:text-slate-800 transition"
              >
                {categoryName}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
            </>
          )}
          <span className="text-slate-900 font-semibold truncate max-w-xs">
            {displayName}
          </span>
        </nav>

        {/* Main Product Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                {product.category && (
                  <Badge variant="teal" size="md">
                    {categoryName}
                  </Badge>
                )}
                {product.cas_number && (
                  <span className="text-xs font-mono text-slate-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                    CAS {product.cas_number}
                  </span>
                )}
                {product.pharmacopoeia_standards && (
                  <span className="text-xs font-semibold text-slate-900 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                    {product.pharmacopoeia_standards}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {displayName}
              </h1>

              {secondaryName && (
                <p className="text-sm font-semibold text-teal-800 font-arabic">
                  {secondaryName}
                </p>
              )}

              <p className="text-sm text-slate-600 leading-relaxed pt-1">
                {displayDesc}
              </p>
            </div>

            {/* Client interactive action trigger */}
            <div className="shrink-0 w-full lg:w-72">
              <ProductDetailClient product={product} />
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs">
              {t('Technical & Pharmacopoeial Parameters', 'المعايير الفنية ومواصفات دساتير الأدوية')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-semibold block mb-1">
                  {t('Pharmacopoeial Monograph', 'دستور الأدوية المعتمد')}
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  {product.pharmacopoeia_standards || t('Official Monograph Standard', 'المواصفة الدستورية القياسية')}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-semibold block mb-1">
                  {t('Purity / Assay Grade', 'درجة النقاء / نسبة التركيز')}
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  {product.grade_spec || t('Pharmaceutical Grade', 'درجة دوائية معتمدة')}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-semibold block mb-1">
                  {t('Standard Packaging', 'نوع التعبئة القياسية')}
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  {product.packaging || t('25 kg industrial drum / bag', 'برميل / شيكارة صناعية 25 كجم')}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-semibold block mb-1">
                  {t('Target Industry', 'القطاع الصناعي المستهدف')}
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  {product.industry || t('Pharmaceutical Manufacturing', 'صناعة الأدوية')}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-semibold block mb-1">
                  {t('Recommended Applications', 'التطبيقات والاستخدامات الموصى بها')}
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  {product.application || t('Solid dose, oral suspension, formulation', 'أقراص صلبة، معلقات فموية، صياغة دوائية')}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-semibold block mb-1">
                  {t('Stock / Availability Status', 'حالة التوفر والمخزون')}
                </span>
                <span className="font-bold text-teal-800 text-sm">
                  {product.availability_status.includes('Harvest')
                    ? t('Available in Stock (Harvest Pharma Facility)', 'متوفر بالمخزون الفوري (مستودع هارفست فارما بالقاهرة)')
                    : product.availability_status.includes('Indent')
                    ? t('Available via Direct Indent', 'متوفر عبر الاستيراد المباشر (Indent)')
                    : product.availability_status}
                </span>
              </div>
            </div>
          </div>

          {/* Technical Info & Harvest Pharma Note */}
          {product.technical_info && (
            <div className="p-5 bg-teal-50/50 rounded-xl border border-teal-100 space-y-2 text-xs text-slate-700">
              <strong className="text-teal-900 font-semibold block text-sm">
                {t('Chemical & Formulation Notes:', 'ملاحظات كيميائية وصيدلانية:')}
              </strong>
              <p className="leading-relaxed">{product.technical_info}</p>
            </div>
          )}

          {isHarvestFacility && (
            <div className="p-4 bg-slate-900 text-white rounded-xl flex items-start gap-3 text-xs">
              <Warehouse className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white text-sm">
                  {t(
                    'Stored at Harvest Pharma Logistics Facility (Cairo)',
                    'مخزن في منشأة هارفست فارما اللوجستية (القاهرة)'
                  )}
                </strong>
                <p className="text-slate-300 mt-0.5">
                  {t(
                    'This product is managed under climate-controlled conditions with certified Good Distribution Practice (GDP) protocols at our sister company’s Cairo warehouse. Available for prompt local dispatch.',
                    'تتم إدارة هذا المنتج تحت ظروف مناخية مضبوطة تماماً ووفق بروتوكولات ممارسات التوزيع الجيد (GDP) بمستودع شركتنا الشقيقة بالقاهرة. متاح للتسليم المحلي الفوري.'
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Regulatory Documents Available */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {t(
                'Available Quality & Regulatory Dossiers',
                'الملفات الفنية والرقابية المتاحة للتسجيل والاعتماد'
              )}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                <div className="truncate">
                  <span className="font-semibold block text-slate-800 truncate">
                    {t('Certificate of Analysis (COA)', 'شهادة التحليل المخبري (COA)')}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {t('Batch-specific upon request', 'خاصة بكل تشغيلة عند الطلب')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                <div className="truncate">
                  <span className="font-semibold block text-slate-800 truncate">
                    {t('Material Safety Data Sheet (MSDS)', 'صحيفة بيانات سلامة المادة (MSDS)')}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {t('GHS / REACH compliant', 'مطابقة لمعايير GHS / REACH')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                <div className="truncate">
                  <span className="font-semibold block text-slate-800 truncate">
                    {t('GMP Audit & DMF Summary', 'ملخص ملف DMF وتدقيق GMP')}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {t('For registration filing', 'جاهز لملفات التسجيل بهيئة الدواء')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
