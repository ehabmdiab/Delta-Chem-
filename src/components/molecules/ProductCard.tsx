'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { RfqModal } from '@/components/molecules/RfqModal';
import { useLanguage } from '@/components/providers/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { t } = useLanguage();
  const [isRfqOpen, setIsRfqOpen] = useState(false);

  return (
    <>
      <div className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-teal-500/80 hover:shadow-[0_12px_32px_-12px_rgba(15,31,24,0.14)]">
        <div>
          {/* Category & Subgroup tags */}
          <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
            {product.category && (
              <Badge variant="teal" size="sm" className="font-bold">
                {t(product.category.name, product.category.name_ar)}
              </Badge>
            )}
            {product.cas_number && (
              <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold text-slate-600">
                CAS {product.cas_number}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="mb-2 text-lg font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-teal-700 sm:text-xl">
            <Link href={`/products/${product.slug}`} className="hover:underline">
              {t(product.name, product.name_ar)}
            </Link>
          </h3>

          {/* Concise 1-2 line description */}
          <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {t(product.description || '', product.description_ar)}
          </p>

          {/* Compact Technical Specs */}
          <div className="mb-5 space-y-2 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 text-xs">
            {product.pharmacopoeia_standards && (
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-slate-500">{t('Standard:', 'الدستور:')}</span>
                <span className="rounded border border-slate-200/70 bg-white px-2 py-0.5 text-right font-bold text-slate-900">
                  {product.pharmacopoeia_standards}
                </span>
              </div>
            )}
            {product.packaging && (
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-slate-500">{t('Packing:', 'التعبئة:')}</span>
                <span className="truncate font-mono font-semibold text-slate-700" title={product.packaging}>
                  {product.packaging}
                </span>
              </div>
            )}
            {product.application && (
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-slate-500">{t('Group:', 'التصنيف:')}</span>
                <span className="truncate font-medium text-slate-700" title={product.application}>
                  {product.application}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 border-t border-slate-100 pt-4">
          <Button
            variant="teal"
            size="md"
            className="min-h-[44px] flex-1 text-sm font-bold"
            onClick={() => setIsRfqOpen(true)}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t('Request RFQ', 'طلب تسعير')}
          </Button>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-slate-200 p-2.5 text-slate-700 transition hover:bg-slate-50 hover:text-teal-700 active:scale-95"
            title={t('View Specifications', 'عرض المواصفات')}
          >
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>

      <RfqModal
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
        prefilledProduct={{
          id: product.id,
          name: product.name,
          grade: product.pharmacopoeia_standards || product.grade_spec,
        }}
      />
    </>
  );
};
