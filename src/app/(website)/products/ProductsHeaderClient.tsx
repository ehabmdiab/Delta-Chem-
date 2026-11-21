'use client';

import React from 'react';
import { useLanguage } from '@/components/providers/LanguageContext';

export const ProductsHeaderClient: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-8 shadow-xs sm:p-10">
      <div className="inline-block rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-800">
        {t('Official Product List', 'قائمة الخامات الرسمية المعتمدة')}
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {t('Raw Materials Directory', 'دليل الخامات والمواد الفعالة')}
      </h1>
      <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
        {t(
          'Browse Delta Chem’s verified portfolio across Human, Veterinary, Cosmetics, and Nutraceutical sectors.',
          'تصفح القائمة الرسمية لخامات دلتا كيم المصنفة عبر القطاعات الأربعة: البشرية، البيطرية، مستحضرات التجميل، والمكملات الغذائية.'
        )}
      </p>
    </div>
  );
};
