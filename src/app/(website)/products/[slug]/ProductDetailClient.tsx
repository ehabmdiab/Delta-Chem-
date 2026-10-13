'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { Button } from '@/components/atoms/Button';
import { RfqModal } from '@/components/molecules/RfqModal';
import { siteConfig } from '@/config/site';
import { Phone, FileQuestion } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';

export const ProductDetailClient: React.FC<{ product: Product }> = ({ product }) => {
  const { t, locale } = useLanguage();
  const [isRfqOpen, setIsRfqOpen] = useState(false);

  const productName = locale === 'ar' && product.name_ar ? product.name_ar : product.name;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
      <div className="space-y-1">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
          {t('Procurement & Pricing', 'التسعير والتوريد المؤسسي')}
        </span>
        <p className="text-xs text-slate-600">
          {t(
            'Inquire for batch specifications, COA verification, and commercial quotations.',
            'استفسر عن مواصفات التشغيلة، واعتماد شهادات التحليل (COA)، وعروض الأسعار الرسمية.'
          )}
        </p>
      </div>

      <div className="space-y-2">
        <Button
          variant="teal"
          size="md"
          className="w-full font-semibold shadow-xs"
          onClick={() => setIsRfqOpen(true)}
          leftIcon={<FileQuestion className="w-4 h-4 rtl:ml-2 rtl:mr-0" />}
        >
          {t('Request a Quote (RFQ)', 'طلب عرض أسعار (RFQ)')}
        </Button>

        <a
          href={`tel:${siteConfig.contact.phoneClean}`}
          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition"
        >
          <Phone className="w-3.5 h-3.5 text-teal-600" />
          <span>
            {t('Call:', 'اتصال:')} {siteConfig.contact.phone}
          </span>
        </a>
      </div>

      <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-500 space-y-1">
        <p>&bull; {t('Direct commercial inquiries only', 'استفسارات وتعاقدات تجارية مباشرة فقط')}</p>
        <p>&bull; {t('No minimum cart restriction; B2B orders', 'توريد مباشر لمصانع الأدوية والكيماويات (B2B)')}</p>
        <p>&bull; {t('Free technical sampling for manufacturers', 'عينات فنية مجانية لمعامل ومصانع الأدوية')}</p>
      </div>

      <RfqModal
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
        prefilledProduct={{
          id: product.id,
          name: productName,
          grade: product.grade_spec,
        }}
      />
    </div>
  );
};
