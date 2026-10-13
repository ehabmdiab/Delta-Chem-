'use client';

import React from 'react';
import { useLanguage } from '@/components/providers/LanguageContext';

export const ProductsHeaderClient: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs space-y-3">
      <div className="inline-block px-2.5 py-1 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold rounded-full uppercase tracking-wider">
        {t('B2B Commercial Directory', 'دليل التوريد والتعاقدات المؤسسية (B2B)')}
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        {t(
          'Pharmaceutical & Life Science Ingredient Catalog',
          'كتالوج المواد الخام الصيدلانية وعلوم الحياة'
        )}
      </h1>
      <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
        {t(
          'Search, filter, and inspect verified ingredient records. This catalog is structured for formulation scientists, quality departments, and procurement managers in Egypt and the MENA region. Request immediate quotations and batch technical documentation.',
          'ابحث وقم بتصفية وفحص بيانات وسجلات المواد الخام المعتمدة. تم إعداد هذا الكتالوج لعلماء الصياغة الدوائية، وإدارات توكيد الجودة، ومسؤولي المشتريات بمصر والشرق الأوسط. اطلب عروض أسعار فورية والملفات الفنية المعتمدة للتشغيلات.'
        )}
      </p>
    </div>
  );
};
