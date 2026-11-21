'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { Button } from '@/components/atoms/Button';
import { RfqModal } from '@/components/molecules/RfqModal';
import { siteConfig } from '@/config/site';
import { Phone, FileQuestion, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';

export const ProductDetailClient: React.FC<{ product: Product }> = ({ product }) => {
  const { t, locale } = useLanguage();
  const [isRfqOpen, setIsRfqOpen] = useState(false);

  const productName = locale === 'ar' && product.name_ar ? product.name_ar : product.name;

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <div className="space-y-1">
        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
          {t('Procurement & Quotation', 'التسعير والتوريد')}
        </span>
        <p className="text-xs leading-relaxed text-slate-600">
          {t(
            'Request batch COA, technical specifications, and B2B pricing.',
            'اطلب شهادة التحليل (COA) والمواصفات الفنية وعرض السعر.'
          )}
        </p>
      </div>

      <div className="space-y-2.5">
        <Button
          variant="teal"
          size="md"
          className="min-h-[44px] w-full font-bold shadow-xs"
          onClick={() => setIsRfqOpen(true)}
          leftIcon={<FileQuestion className="h-4 w-4" />}
        >
          {t('Request a Quote (RFQ)', 'طلب عرض أسعار (RFQ)')}
        </Button>

        <a
          href={siteConfig.socials.whatsappPrimary}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-500"
        >
          <MessageCircle className="h-4 w-4" />
          <span>
            {t('WhatsApp Sales:', 'واتساب المبيعات:')} {siteConfig.contact.mobiles[0].display}
          </span>
        </a>

        <a
          href={`tel:${siteConfig.contact.phoneClean}`}
          className="inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <Phone className="h-3.5 w-3.5 text-teal-600" />
          <span>
            {t('Landline:', 'الأرضي:')} {siteConfig.contact.phone} / {siteConfig.contact.phoneSecondary}
          </span>
        </a>
      </div>

      <RfqModal
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
        prefilledProduct={{
          id: product.id,
          name: productName,
          grade: product.pharmacopoeia_standards || product.grade_spec,
        }}
      />
    </div>
  );
};
