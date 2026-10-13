'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Product } from '@/types';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { RfqModal } from '@/components/molecules/RfqModal';
import { useLanguage } from '@/components/providers/LanguageContext';
import { ArrowRight, CheckCircle2, Warehouse, Sparkles } from 'lucide-react';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { t } = useLanguage();
  const [isRfqOpen, setIsRfqOpen] = useState(false);

  const isHarvestStored = product.availability_status.toLowerCase().includes('harvest');

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-teal-500/80 p-6 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
      >
        <div>
          {/* Top category & CAS badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
            {product.category && (
              <Badge variant="teal" size="sm" className="font-bold">
                {t(product.category.name, product.category.name_ar)}
              </Badge>
            )}
            {product.cas_number && (
              <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                CAS {product.cas_number}
              </span>
            )}
          </div>

          {/* Product Title - Scale up for impact */}
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 mb-2.5">
            <Link href={`/products/${product.slug}`} className="hover:underline">
              {t(product.name, product.name_ar)}
            </Link>
          </h3>

          {/* Description snippet */}
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-5 leading-relaxed font-normal">
            {t(product.description || '', product.description_ar)}
          </p>

          {/* Technical Specs Box */}
          <div className="space-y-2 py-3.5 px-3 bg-slate-50/80 rounded-xl border border-slate-100 text-xs mb-4">
            {product.pharmacopoeia_standards && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">{t('Standard:', 'المعيار:')}</span>
                <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded shadow-2xs border border-slate-200/60">
                  {product.pharmacopoeia_standards}
                </span>
              </div>
            )}
            {product.grade_spec && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">{t('Grade:', 'الدرجة:')}</span>
                <span className="font-semibold text-slate-800">{product.grade_spec}</span>
              </div>
            )}
            {product.packaging && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">{t('Packaging:', 'التعبئة:')}</span>
                <span className="text-slate-700 font-mono truncate max-w-[170px]">{product.packaging}</span>
              </div>
            )}
          </div>

          {/* Availability note */}
          <div className="mb-5">
            {isHarvestStored ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 p-2.5 rounded-lg border border-teal-200">
                <Warehouse className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{t('Local Stock at Harvest Pharma Cairo Hub', 'مخزون محلي بمستودعات هارفست فارما')}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  {t(
                    product.availability_status,
                    product.availability_status.toLowerCase().includes('indent')
                      ? 'توريد واستيراد مباشر خلال ١٠-١٤ يوماً'
                      : 'متوفر عند الطلب'
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex items-center gap-2.5 border-t border-slate-100">
          <Button
            variant="teal"
            size="md"
            className="flex-1 text-xs sm:text-sm font-bold min-h-[44px]"
            onClick={() => setIsRfqOpen(true)}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            {t('Request RFQ', 'طلب تسعير ومواصفات')}
          </Button>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center p-2.5 rounded-lg border border-slate-200 text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition min-h-[44px] min-w-[44px]"
            title={t('View Technical Monograph', 'عرض المواصفات الفنية')}
          >
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </motion.div>

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
