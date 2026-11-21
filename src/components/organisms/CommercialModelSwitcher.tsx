'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Button } from '@/components/atoms/Button';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { useLanguage } from '@/components/providers/LanguageContext';
import { SPRING_SMOOTH, SPRING_SNAPPY, CROSSFADE_REDUCED } from '@/lib/motion';
import { Globe2, Warehouse, CheckCircle2, ArrowRight, Truck } from 'lucide-react';

type ModelKey = 'commission' | 'trade';

interface ModelContent {
  audience: string;
  audience_ar: string;
  title: string;
  title_ar: string;
  body: string;
  body_ar: string;
  points: { title: string; title_ar: string; text: string; text_ar: string }[];
  ctaLabel: string;
  ctaLabel_ar: string;
  ctaHref: string;
  linkLabel: string;
  linkLabel_ar: string;
  linkHref: string;
  sideTitle: string;
  sideTitle_ar: string;
  side: { label: string; label_ar: string; note: string; note_ar: string }[];
}

const MODELS: Record<ModelKey, ModelContent> = {
  commission: {
    audience: 'For International Manufacturers',
    audience_ar: 'للمصانع والشركات العالمية',
    title: 'Authorized Commission Agency & Direct Indent',
    title_ar: 'الوكالة التجارية والاستيراد المباشر',
    body: 'We represent global raw material producers in Egypt — managing contracting, technical sampling, and EDA registration.',
    body_ar: 'نمثل كبرى المصانع العالمية في مصر لإدارة التعاقدات المباشرة وتوريد العينات ودعم ملفات هيئة الدواء.',
    points: [
      {
        title: 'Direct Factory Invoicing',
        title_ar: 'فواتير مباشرة من المصنع',
        text: 'Contracts and LCs directly between principal and buyer.',
        text_ar: 'تعاقد واعتماد مستندي مباشر مع المصنع المورد.',
      },
      {
        title: 'Regulatory Dossier Support',
        title_ar: 'دعم ملفات التسجيل',
        text: 'DMF, COA, and GMP dossier coordination for EDA.',
        text_ar: 'توفير ملفات DMF وشهادات GMP لهيئة الدواء.',
      },
      {
        title: 'Technical R&D Samples',
        title_ar: 'عينات البحث والتطوير',
        text: 'Trial samples delivered straight to factory QC/R&D.',
        text_ar: 'توفير عينات التشغيل لمختبرات الجودة والبحث.',
      },
      {
        title: 'Market Follow-Up',
        title_ar: 'متابعة مستمرة للسوق',
        text: 'Demand forecasting and continuous supply planning.',
        text_ar: 'تخطيط الاحتياجات الدورية ومتابعة خطط الإنتاج.',
      },
    ],
    ctaLabel: 'Propose Partnership',
    ctaLabel_ar: 'طلب شراكة تجارية',
    ctaHref: '/contact',
    linkLabel: 'View Agency Services',
    linkLabel_ar: 'استعراض خدمات الوكالة',
    linkHref: '/services',
    sideTitle: 'Agency Workflow',
    sideTitle_ar: 'خطوات الوكالة المباشرة',
    side: [
      {
        label: 'Principal Authorization',
        label_ar: 'توقيع اتفاقية التمثيل',
        note: 'Portfolio scope & commercial terms',
        note_ar: 'تحديد الخامات المعتمدة وشروط التعاقد',
      },
      {
        label: 'Dossier Verification',
        label_ar: 'اعتماد الملفات الفنية',
        note: 'DMF & GMP compliance review',
        note_ar: 'مراجعة ملفات التسجيل وشهادات الجودة',
      },
      {
        label: 'Factory Sampling',
        label_ar: 'تأهيل العينات بالمصانع',
        note: 'QC validation by local plants',
        note_ar: 'فحص واعتماد العينات بمختبرات العملاء',
      },
      {
        label: 'Direct Shipment',
        label_ar: 'الشحن والتوريد المباشر',
        note: 'Maritime & air freight coordination',
        note_ar: 'تنسيق الشحن الدولي حتى ميناء الوصول',
      },
    ],
  },
  trade: {
    audience: 'For Egyptian Factories',
    audience_ar: 'لمصانع الأدوية والتجميل في مصر',
    title: 'Stock & Trade Distribution (Local Inventory)',
    title_ar: 'التوريد الفوري من المخزون المحلي',
    body: 'We import high-demand raw materials, clear customs, and stock inventory at Harvest Pharma for fast factory delivery.',
    body_ar: 'نستورد الخامات الأساسية وننهي الإفراج الجمركي ونحتفظ بمخزون جاهز بمخازن هارفست فارما للتسليم السريع.',
    points: [
      {
        title: 'Local Currency (EGP)',
        title_ar: 'التعامل بالجنيه المصري',
        text: 'Tax-compliant invoicing without LC delays.',
        text_ar: 'فواتير ضريبية محلية دون تعقيدات الاعتمادات.',
      },
      {
        title: 'Immediate Buffer Stock',
        title_ar: 'مخزون أمان متوفر',
        text: 'Protects production lines from global shipping delays.',
        text_ar: 'حماية خطوط الإنتاج من تقلبات الشحن الدولي.',
      },
      {
        title: 'GDP Validated Storage',
        title_ar: 'تخزين مطابق لمعايير GDP',
        text: 'Climate-controlled rooms monitored 24/7.',
        text_ar: 'غرف مراقبة الحرارة والرطوبة على مدار الساعة.',
      },
      {
        title: 'Verified Batch COA',
        title_ar: 'شهادات تحليل معتمدة',
        text: 'Original batch documentation with every drum.',
        text_ar: 'تسليم كل شحنة بشهادة التحليل الأصلية.',
      },
    ],
    ctaLabel: 'Explore Product List',
    ctaLabel_ar: 'استعراض قائمة الخامات',
    ctaHref: '/products',
    linkLabel: 'Inspect Harvest Pharma Hub',
    linkLabel_ar: 'معاينة مخازن هارفست فارما',
    linkHref: '/supply-chain',
    sideTitle: 'Delivery Coverage',
    sideTitle_ar: 'مواعيد التوصيل للمناطق الصناعية',
    side: [
      {
        label: '10th of Ramadan City',
        label_ar: 'العاشر من رمضان',
        note: 'Same-Day / 24h',
        note_ar: 'نفس اليوم / ٢٤ ساعة',
      },
      {
        label: '6th of October City',
        label_ar: 'السادس من أكتوبر',
        note: '24h Dispatch',
        note_ar: 'خلال ٢٤ ساعة',
      },
      {
        label: 'Obour & Badr Cities',
        label_ar: 'العبور وبدر',
        note: 'Same-Day / 12h',
        note_ar: 'خلال ١٢ ساعة',
      },
      {
        label: 'Alexandria & Borg El-Arab',
        label_ar: 'الإسكندرية وبرج العرب',
        note: '24h – 48h',
        note_ar: 'خلال ٢٤ - ٤٨ ساعة',
      },
    ],
  },
};

export const CommercialModelSwitcher: React.FC = () => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [activeModel, setActiveModel] = useState<ModelKey>('commission');
  const model = MODELS[activeModel];

  return (
    <SectionShell label="Sourcing Models" tone="navy" image="/images/deltachem-global-shipping.jpg">
      <div className="space-y-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader
            onDark
            eyebrow={t('Supply Architecture', 'نماذج التوريد')}
            title={t('Flexible Commercial Sourcing Models', 'نماذج توريد مرنة لشركاء الصناعة')}
          />
          <div
            role="tablist"
            aria-label={t('Sourcing model', 'نموذج التوريد')}
            className="inline-flex w-full flex-col gap-1.5 rounded-2xl border border-white/20 bg-sky-950/85 p-1.5 shadow-lg sm:w-auto sm:flex-row"
          >
            {(
              [
                ['commission', Globe2, '01: Commission Agency', '١: الوكالة التجارية'],
                ['trade', Warehouse, '02: Local Stock & Trade', '٢: المخزون المحلي'],
              ] as const
            ).map(([key, Icon, en, ar]) => {
              const isSelected = activeModel === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveModel(key)}
                  className={`relative flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-colors active:scale-[0.98] ${
                    isSelected ? 'text-slate-950' : 'text-white hover:bg-white/10'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="sourcing-model-pill"
                      transition={reduceMotion ? CROSSFADE_REDUCED : SPRING_SNAPPY}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-xl bg-amber-500 shadow-md"
                    />
                  )}
                  <Icon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">{t(en, ar)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interruptible switch without wait lock */}
        <motion.div
          key={activeModel}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? CROSSFADE_REDUCED : SPRING_SMOOTH}
          className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12"
        >
          <div className="space-y-5 rounded-3xl bg-white p-6 text-slate-900 shadow-2xl sm:p-8 lg:col-span-7">
            <span className="inline-block rounded-md border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-700 rtl:normal-case rtl:tracking-normal">
              {t(model.audience, model.audience_ar)}
            </span>
            <h3 className="text-xl font-extrabold leading-tight sm:text-2xl">
              {t(model.title, model.title_ar)}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              {t(model.body, model.body_ar)}
            </p>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {model.points.map((p) => (
                <li key={p.title} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                  <span>
                    <strong className="block text-sm font-bold text-slate-900">
                      {t(p.title, p.title_ar)}
                    </strong>
                    <span className="text-xs text-slate-600">{t(p.text, p.text_ar)}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href={model.ctaHref}>
                <Button variant="teal" size="md" className="font-bold">
                  <span>{t(model.ctaLabel, model.ctaLabel_ar)}</span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
              <Link href={model.linkHref} className="text-sm font-bold text-teal-700 hover:underline">
                {t(model.linkLabel, model.linkLabel_ar)} →
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-sky-950/80 p-6 text-white shadow-xl sm:p-8 lg:col-span-5">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-amber-400 rtl:normal-case rtl:tracking-normal">
              {t(model.sideTitle, model.sideTitle_ar)}
            </span>
            <ol className="mt-5 space-y-3">
              {model.side.map((item, idx) => (
                <li
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl border border-white/15 bg-sky-950/55 p-3.5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-400 text-sm font-extrabold text-teal-950">
                    {activeModel === 'trade' ? <Truck className="h-4 w-4" aria-hidden="true" /> : idx + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold">{t(item.label, item.label_ar)}</span>
                    <span className="block text-xs text-slate-300">{t(item.note, item.note_ar)}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
};
