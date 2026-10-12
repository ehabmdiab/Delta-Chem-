'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { RfqModal } from '@/components/molecules/RfqModal';
import { useLanguage } from '@/components/providers/LanguageContext';
import { ArrowRight, FileText, CheckCircle2, Warehouse } from 'lucide-react';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { t } = useLanguage();
  const [isRfqOpen, setIsRfqOpen] = useState(false);

  const isHarvestStored = product.availability_status.toLowerCase().includes('harvest');

  return (
    <>
      <div className="group relative bg-white rounded-xl border border-slate-200/90 hover:border-teal-500/80 p-5 transition-all duration-300 hover:shadow-lg flex flex-col justify-between">
        <div>
          {/* Top category & CAS badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            {product.category && (
              <Badge variant="teal" size="sm">
                {t(product.category.name, product.category.name_ar)}
              </Badge>
            )}
            {product.cas_number && (
              <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/70">
                CAS {product.cas_number}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 mb-2">
            <Link href={`/products/${product.slug}`}>
              {t(product.name, product.name_ar)}
            </Link>
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {t(product.description || '', product.description_ar)}
          </p>

          {/* Technical Specs List */}
          <div className="space-y-1.5 py-3 border-t border-slate-100 text-xs mb-4">
            {product.pharmacopoeia_standards && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">{t('Standard:', 'المعيار:')}</span>
                <span className="font-semibold text-slate-800 bg-slate-50 px-1.5 py-0.5 rounded">
                  {product.pharmacopoeia_standards}
                </span>
              </div>
            )}
            {product.grade_spec && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">{t('Grade:', 'الدرجة:')}</span>
                <span className="font-medium text-slate-700">{product.grade_spec}</span>
              </div>
            )}
            {product.packaging && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">{t('Packaging:', 'التعبئة:')}</span>
                <span className="text-slate-700 truncate max-w-[170px]">{product.packaging}</span>
              </div>
            )}
          </div>

          {/* Availability note */}
          <div className="mb-4">
            {isHarvestStored ? (
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-teal-800 bg-teal-50/70 p-2 rounded-md border border-teal-100">
                <Warehouse className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>{t('Local Stock at Harvest Pharma Facility', 'مخزون محلي بمستودعات هارفست فارما')}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{product.availability_status}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2 border-t border-slate-100">
          <Button
            variant="teal"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setIsRfqOpen(true)}
          >
            {t('Request Quote', 'طلب تسعير')}
          </Button>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center p-2 rounded-md border border-slate-200 text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition"
            title={t('View Technical Details', 'عرض المواصفات الفنية')}
          >
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>

      <RfqModal
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
        prefilledProduct={{
          id: product.id,
          name: product.name,
          grade: product.grade_spec,
        }}
      />
    </>
  );
};
