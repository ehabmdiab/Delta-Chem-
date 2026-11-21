'use client';

import React, { Suspense } from 'react';
import { FileText, Clock, ShieldCheck, Warehouse, MessageCircle } from 'lucide-react';
import { Container } from '@/components/atoms/Container';
import { Badge } from '@/components/atoms/Badge';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/components/providers/LanguageContext';
import { RequestQuoteClient } from './RequestQuoteClient';
import { Product } from '@/types';

interface RequestQuotePageClientProps {
  products: Product[];
}

export const RequestQuotePageClient: React.FC<RequestQuotePageClientProps> = ({ products }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-16 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="info" className="mb-4">
              {t('Commercial Quotation System', 'منظومة التسعير التجاري')}
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t('Request for Quote (RFQ)', 'طلب عرض أسعار (RFQ)')}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              {t(
                'Submit your product requirements, pharmacopoeial grade, and volume for a prompt quotation.',
                'أرسل اسم الخامة والكمية والمواصفة المطلوبة للحصول على عرض سعر سريع.'
              )}
            </p>
          </div>
        </Container>
      </section>

      {/* Form & Assurance Section */}
      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <Suspense
                fallback={
                  <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500">
                    {t('Loading Quotation Form...', 'جاري تحميل نموذج طلب التسعير...')}
                  </div>
                }
              >
                <RequestQuoteClient products={products} />
              </Suspense>
            </div>

            <div className="space-y-6 lg:col-span-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h3 className="mb-4 text-base font-bold text-slate-900">
                  {t('Quotation Guarantees', 'ضمانات التسعير')}
                </h3>
                <div className="space-y-4 text-xs text-slate-600">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    <div>
                      <strong className="block text-slate-900">{t('Fast Response', 'استجابة سريعة')}</strong>
                      {t('Pricing & availability within one business day.', 'أسعار مؤكدة خلال يوم عمل واحد.')}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    <div>
                      <strong className="block text-slate-900">{t('COA & Dossiers', 'شهادات التحليل')}</strong>
                      {t('Batch COAs and technical files included.', 'مرفق شهادات التحليل والملفات الفنية.')}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Warehouse className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    <div>
                      <strong className="block text-slate-900">{t('Harvest Pharma Stock', 'مخازن هارفست فارما')}</strong>
                      {t('Local holding and dispatch options.', 'إمكانية التخزين المحلي والتسليم الفوري.')}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <div>
                      <strong className="block text-slate-900">{t('EDA Ready', 'جاهز لهيئة الدواء')}</strong>
                      {t('Verified compliance for registration.', 'توافق كامل مع متطلبات التسجيل.')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Contact */}
              <div className="space-y-3 rounded-2xl border border-teal-200 bg-teal-50/70 p-6">
                <h4 className="text-sm font-bold text-teal-950">
                  {t('Direct Sales Contact', 'التواصل المباشر مع المبيعات')}
                </h4>
                <p className="font-mono text-sm font-bold text-teal-900">
                  {t('Tel:', 'أرضي:')} {siteConfig.contact.phone} / {siteConfig.contact.phoneSecondary}
                </p>
                <div className="space-y-2 pt-1">
                  {siteConfig.contact.mobiles.map((mob) => (
                    <a
                      key={mob.display}
                      href={mob.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl bg-emerald-600 px-3.5 py-2 font-mono text-xs font-bold text-white transition hover:bg-emerald-500"
                    >
                      <span className="flex items-center gap-1.5">
                        <MessageCircle className="h-4 w-4" />
                        <span>{t('WhatsApp:', 'واتساب:')} {mob.display}</span>
                      </span>
                      <span>→</span>
                    </a>
                  ))}
                </div>
                <p className="text-xs text-teal-800">{siteConfig.contact.salesEmail}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
