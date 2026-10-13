'use client';

import React, { Suspense } from 'react';
import {
  FileText,
  Clock,
  ShieldCheck,
  Warehouse,
} from 'lucide-react';
import { Container } from '@/components/atoms/Container';
import { Badge } from '@/components/atoms/Badge';
import { useLanguage } from '@/components/providers/LanguageContext';
import { RequestQuoteClient } from './RequestQuoteClient';
import { Product } from '@/types';

interface RequestQuotePageClientProps {
  products: Product[];
}

export const RequestQuotePageClient: React.FC<RequestQuotePageClientProps> = ({ products }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-16 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="info" className="mb-4">
              {t('Commercial Quotation System', 'منظومة التسعير التجاري الرسمية')}
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
              {t('Request for Quote (RFQ)', 'طلب عرض أسعار رسمي (RFQ)')}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              {t(
                'Submit your formulation volumes, pharmacopoeial grades, and delivery terms. Our technical commercial desk provides comprehensive pricing within one business day.',
                'أرسل كميات الإنتاج المطلوبة، ومواصفات دساتير الأدوية، وشروط التسليم. يقدم مكتب المبيعات الفنية والتسعير عروض أسعار شاملة خلال يوم عمل واحد.'
              )}
            </p>
          </div>
        </Container>
      </section>

      {/* Form & Assurance Section */}
      <section className="py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Form */}
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

            {/* Right Column: Why Quote with DELTACHEM */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  {t('Quotation & SLA Guarantee', 'ضمانات التسعير وسرعة الاستجابة')}
                </h3>
                <div className="space-y-4 text-xs text-slate-600">
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">
                        {t('24-Hour SLA', 'استجابة خلال 24 ساعة')}
                      </strong>
                      {t(
                        'Verified pricing and current stock confirmation provided within one business day.',
                        'أسعار موثوقة وتأكيد فوري للكميات المتوفرة بالمخزون خلال يوم عمل واحد.'
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">
                        {t('Lot COA Included', 'إرفاق شهادة التحليل (COA)')}
                      </strong>
                      {t(
                        'Initial quotes include sample Certificates of Analysis and manufacturer accreditations.',
                        'تشمل العروض المبدئية نماذج شهادات التحليل المخبري واعتمادات المصنعين.'
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Warehouse className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">
                        {t('Local Holding Option', 'خيار التخزين المحلي')}
                      </strong>
                      {t(
                        'Quotes can be structured with buffer storage at Harvest Pharma Cairo warehouse.',
                        'إمكانية هيكلة عروض الأسعار مع اتفاقيات حجز مخزون أمان بمستودعات هارفست فارما بالقاهرة.'
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">
                        {t('Regulatory Protection', 'الحماية والتوافق الرقابي')}
                      </strong>
                      {t(
                        'EDA registration dossier compatibility verified by our regulatory department.',
                        'مراجعة وتأكيد توافق ملف التسجيل مع اشتراطات هيئة الدواء المصرية.'
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Telephone Support */}
              <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-6">
                <h4 className="text-sm font-bold text-teal-950">
                  {t('Urgent Formulation Batch?', 'هل لديك تشغيلة إنتاج عاجلة؟')}
                </h4>
                <p className="mt-1 text-xs text-teal-800 leading-relaxed">
                  {t(
                    'For emergency production runs requiring same-day dispatch from our Cairo warehouse, contact our commercial desk directly:',
                    'لتشغيلات الإنتاج الطارئة التي تتطلب تسليماً في نفس اليوم من مستودع القاهرة، تواصل مباشرة مع مكتب المبيعات:'
                  )}
                </p>
                <p className="mt-3 font-mono font-bold text-teal-900 text-sm">
                  {t('Tel: (202) 26988187', 'هاتف: 26988187 (02)')}
                </p>
                <p className="text-xs text-teal-700 mt-1">
                  Email: sales@deltachem.com.eg
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
