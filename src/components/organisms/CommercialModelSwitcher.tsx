'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/atoms/Button';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { useLanguage } from '@/components/providers/LanguageContext';
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
    audience: 'For Foreign Chemical Manufacturers & Multinationals',
    audience_ar: 'للمصانع الكيميائية والشركات متعددة الجنسيات',
    title: 'Authorized Commission Agency & Technical Representation',
    title_ar: 'وكالة تجارية معتمدة وتمثيل فني مباشر للمصانع',
    body: 'DELTACHEM acts as your commercial ambassador across Egypt and neighbouring Arab markets — bridging foreign synthesis plants with licensed manufacturers and handling pre-qualification, sample trials and EDA registration.',
    body_ar: 'تعمل دلتا كيم كسفير تجاري وفني لمصانعكم في مصر والأسواق العربية — حيث نربط بين منشآت التخليق العالمية ومصانع الأدوية المرخصة، وندير التأهيل المسبق وتجارب العينات والتسجيل لدى هيئة الدواء.',
    points: [
      {
        title: 'Direct Principal Invoicing',
        title_ar: 'فواتير مباشرة من المصنع الرئيسي',
        text: 'Contracts and LCs executed directly between principal and local plant.',
        text_ar: 'إصدار العقود والاعتمادات المستندية مباشرة بين المصنع والمشتري المحلي.',
      },
      {
        title: 'EDA Dossier Coordination',
        title_ar: 'تنسيق ملفات هيئة الدواء المصرية',
        text: 'In-house team manages DMF filings and GMP attestation.',
        text_ar: 'فريق متخصص يقدم ملفات DMF وشهادات GMP والتسجيلات الرسمية.',
      },
      {
        title: 'Client Technical Sampling',
        title_ar: 'عينات فنية لمختبرات R&D وQC',
        text: 'Samples delivered straight to QA/QC and R&D heads in Egypt.',
        text_ar: 'توصيل عينات التشغيل مباشرة لرؤساء الجودة والبحوث بمصانع الأدوية.',
      },
      {
        title: 'Market Intelligence',
        title_ar: 'دراسات وتقارير السوق الدوائي',
        text: 'Quarterly reports, forecasts and tender tracking.',
        text_ar: 'تقارير دورية وتنبؤات باحتياجات السوق ومتابعة المناقصات الدوائية.',
      },
    ],
    ctaLabel: 'Propose Agency Partnership',
    ctaLabel_ar: 'طلب شراكة وتمثيل تجاري',
    ctaHref: '/contact',
    linkLabel: 'Review Agency Credentials',
    linkLabel_ar: 'استعراض اعتمادات الوكالة',
    linkHref: '/about',
    sideTitle: 'Commission Model Workflow',
    sideTitle_ar: 'مراحل عمل الوكالة التجارية',
    side: [
      {
        label: 'Agency Agreement',
        label_ar: 'عقد الوكالة والتمثيل',
        note: 'Territory authorization & portfolio assignment',
        note_ar: 'تحديد النطاق الجغرافي وقائمة المنتجات المعتمدة',
      },
      {
        label: 'Regulatory Dossier Approval',
        label_ar: 'اعتماد الملف الفني والتسجيل',
        note: 'DMF submission, EDA evaluation & stability review',
        note_ar: 'تقديم ملف DMF ودراسات الثبات لدى هيئة الدواء',
      },
      {
        label: 'Customer Qualification & R&D',
        label_ar: 'تأهيل العينات لدى المصانع',
        note: 'Batch samples evaluated by Egyptian labs',
        note_ar: 'فحص عينات التشغيل بالمصانع والمختبرات المحلية',
      },
      {
        label: 'Direct Contract Execution',
        label_ar: 'تنفيذ العقود والشحن المباشر',
        note: 'Principal paid directly; DELTACHEM earns commission',
        note_ar: 'دفع مستحقات المصنع مباشرة مع تحصيل عمولة التمثيل',
      },
    ],
  },
  trade: {
    audience: 'For Egyptian Pharmaceutical & Cosmetics Factories',
    audience_ar: 'لمصانع الأدوية ومستحضرات التجميل في مصر',
    title: 'Stock & Trade Distribution (Direct Cairo Hub Inventory)',
    title_ar: 'التوزيع والتوريد من المخزون المحلي (مستودعات القاهرة)',
    body: 'DELTACHEM imports high-velocity APIs, excipients and vitamins, handling customs clearance and laboratory release testing. Materials are held in Harvest Pharma’s GDP-compliant Cairo facility for immediate dispatch.',
    body_ar: 'تستورد دلتا كيم المواد سريعة الاستهلاك من مواد فعالة وسواغات وفيتامينات، مع إنهاء التخليص الجمركي والفحص المعملي. يتم تخزين الخامات بمستودعات هارفست فارما بالقاهرة للتسليم الفوري.',
    points: [
      {
        title: 'Local Currency Invoicing',
        title_ar: 'فواتير بالعملة المحلية (الجنيه المصري)',
        text: 'No FX risk or LC delays — billing in EGP.',
        text_ar: 'دون مخاطر أسعار الصرف أو تأخير الاعتمادات المستندية.',
      },
      {
        title: 'Zero Production Downtime',
        title_ar: 'حماية خطوط الإنتاج من التوقف',
        text: 'Safety buffer stock for same-day dispatch.',
        text_ar: 'مخزون أمان استراتيجي جاهز للتسليم في نفس اليوم.',
      },
      {
        title: '2°C–8°C Cold Chain & Ambient',
        title_ar: 'تخزين مبرد ٢-٨° مئوية وغرف مكيفة',
        text: 'Validated rooms with calibrated data loggers.',
        text_ar: 'غرف معتمدة ومجهزة برواصد بيانات رقمية لمعايرة الحرارة.',
      },
      {
        title: 'Cleared Analytical COA',
        title_ar: 'شهادات تحليل COA معتمدة والإفراج الجمركي',
        text: 'Every container ships with verified COA and customs release.',
        text_ar: 'تسليم كل شحنة مع شهادة التحليل الأصلية ومستندات الإفراج.',
      },
    ],
    ctaLabel: 'View Current In-Stock Inventory',
    ctaLabel_ar: 'استعراض المخزون المحلي المتوفر',
    ctaHref: '/products',
    linkLabel: 'Inspect Cairo Warehouse',
    linkLabel_ar: 'مواصفات مستودع القاهرة',
    linkHref: '/supply-chain',
    sideTitle: 'Trade Model Dispatch SLA',
    sideTitle_ar: 'مواعيد التسليم للمناطق الصناعية',
    side: [
      {
        label: '10th of Ramadan City',
        label_ar: 'مدينة العاشر من رمضان',
        note: 'Same-Day / 24h',
        note_ar: 'نفس اليوم / خلال ٢٤ ساعة',
      },
      {
        label: '6th of October City',
        label_ar: 'مدينة السادس من أكتوبر',
        note: '24h Dispatch',
        note_ar: 'شحن خلال ٢٤ ساعة',
      },
      {
        label: 'Obour & Badr Cities',
        label_ar: 'مدينتا العبور وبدر',
        note: 'Same-Day / 12h',
        note_ar: 'نفس اليوم / خلال ١٢ ساعة',
      },
      {
        label: 'Alexandria & Borg El-Arab',
        label_ar: 'الإسكندرية وبرج العرب',
        note: '24h – 48h',
        note_ar: 'خلال ٢٤ إلى ٤٨ ساعة',
      },
    ],
  },
};

/** Slide 5 — dual commercial operating frameworks. */
export const CommercialModelSwitcher: React.FC = () => {
  const { t } = useLanguage();
  const [activeModel, setActiveModel] = useState<ModelKey>('commission');
  const model = MODELS[activeModel];

  return (
    <SectionShell label="Sourcing Models" tone="navy" image="/images/bg-molecules.jpg">
      <div className="space-y-5">
        <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-end">
          <SectionHeader
            onDark
            eyebrow={t('Commercial Operating Frameworks', 'نماذج التشغيل التجاري')}
            title={t('Flexible Sourcing Models for Industry Partners', 'نماذج توريد مرنة لشركاء الصناعة')}
          />
          <div
            role="tablist"
            aria-label={t('Sourcing model', 'نموذج التوريد')}
            className="inline-flex w-full flex-col gap-1.5 rounded-2xl border border-white/20 bg-white/10 p-1.5 backdrop-blur sm:w-auto sm:flex-row"
          >
            {(
              [
                ['commission', Globe2, 'Model 01: Commission Agency', 'النموذج ١: الوكالة التجارية'],
                ['trade', Warehouse, 'Model 02: Stock & Trade', 'النموذج ٢: المخزون والتجارة'],
              ] as const
            ).map(([key, Icon, en, ar]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={activeModel === key}
                onClick={() => setActiveModel(key)}
                className={`flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                  activeModel === key
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{t(en, ar)}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeModel}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12"
          >
            <div className="space-y-3.5 rounded-3xl bg-white p-5 text-slate-900 shadow-2xl sm:p-6 lg:col-span-7">
              <span className="inline-block rounded-md border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-700">
                {t(model.audience, model.audience_ar)}
              </span>
              <h3 className="text-xl font-extrabold leading-tight tracking-tight sm:text-2xl lg:text-3xl">
                {t(model.title, model.title_ar)}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 lg:text-base">
                {t(model.body, model.body_ar)}
              </p>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {model.points.map((p) => (
                  <li key={p.title} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                    <span>
                      <strong className="block text-sm font-bold text-slate-900">
                        {t(p.title, p.title_ar)}
                      </strong>
                      <span className="text-xs text-slate-600 sm:text-sm">
                        {t(p.text, p.text_ar)}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link href={model.ctaHref}>
                  <Button variant="teal" size="md" className="font-bold">
                    <span>{t(model.ctaLabel, model.ctaLabel_ar)}</span>
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
                <Link href={model.linkHref} className="text-sm font-bold text-teal-700 hover:underline">
                  {t(model.linkLabel, model.linkLabel_ar)} &rarr;
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-md sm:p-6 lg:col-span-5">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-400">
                {t(model.sideTitle, model.sideTitle_ar)}
              </span>
              <ol className="mt-4 space-y-2.5">
                {model.side.map((item, idx) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl border border-white/15 bg-sky-950/50 p-3.5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-400 text-sm font-extrabold text-teal-950">
                      {activeModel === 'trade' ? <Truck className="h-4 w-4" aria-hidden="true" /> : idx + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold">
                        {t(item.label, item.label_ar)}
                      </span>
                      <span className="block text-sm text-slate-300">
                        {t(item.note, item.note_ar)}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionShell>
  );
};
