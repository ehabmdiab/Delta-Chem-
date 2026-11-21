'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Reveal } from '@/components/molecules/Reveal';
import { useLanguage } from '@/components/providers/LanguageContext';

export const QualityClient: React.FC = () => {
  const { t } = useLanguage();

  const documentChecklist = [
    {
      title: t('Certificate of Analysis (COA)', 'شهادة التحليل (COA)'),
      desc: t('Lot-specific assay, purity limits, and physical specs.', 'نتائج التحليل المخبري المطابقة لكل تشغيلة.'),
      tag: t('Every Batch', 'لكل تشغيلة'),
    },
    {
      title: t('Drug Master File (DMF) / CEP', 'ملف المادة الفعالة (DMF) / CEP'),
      desc: t('Open Part dossiers and EDQM suitability certificates.', 'الملفات المفتوحة وشهادات الملاءمة للتسجيل الدوائي.'),
      tag: t('Registration', 'للتسجيل'),
    },
    {
      title: t('Nitrosamine Risk Evaluation', 'تقييم شوائب النيتروزامين'),
      desc: t('Step 1 & 2 risk assessments per EDA requirements.', 'ملفات تقييم النيتروزامين وفق متطلبات هيئة الدواء.'),
      tag: t('EDA Required', 'هيئة الدواء'),
    },
    {
      title: t('Elemental Impurities (ICH Q3D)', 'الشوائب العنصرية (ICH Q3D)'),
      desc: t('Validated heavy-metal and elemental limit summaries.', 'تقارير حدود المعادن الثقيلة والشوائب العنصرية.'),
      tag: t('Safety', 'أمان دوائي'),
    },
    {
      title: t('Residual Solvents (ICH Q3C)', 'المذيبات المتبقية (ICH Q3C)'),
      desc: t('Synthesis solvent declarations and GC verification.', 'إقرارات المذيبات المستخدمة ومطابقة حدود الأمان.'),
      tag: t('Compliance', 'امتثال'),
    },
    {
      title: t('BSE / TSE Statements', 'إقرارات خلو المنشأ الحيواني'),
      desc: t('Certified origin safety documentation.', 'شهادات سلامة المنشأ وخلو المشتقات الحيوانية.'),
      tag: t('Origin', 'المنشأ'),
    },
    {
      title: t('Stability Data (Zone IVa / IVb)', 'دراسات الثبات الدوائي'),
      desc: t('Climatic stability summaries supporting Egyptian filing.', 'بيانات الثبات الملائمة للمناخ المحلي والتسجيل.'),
      tag: t('Stability', 'الثبات'),
    },
    {
      title: t('GHS Safety Data Sheet (SDS)', 'صحيفة بيانات السلامة (SDS)'),
      desc: t('16-section handling, storage, and transport safety guide.', 'إرشادات التداول الآمن والتخزين والشحن.'),
      tag: t('Handling', 'السلامة'),
    },
  ];

  const sopSteps = [
    {
      step: '01',
      title: t('Arrival & Quarantine', 'الاستلام والحجر'),
      desc: t('Physical quarantine and seal inspection upon warehouse arrival.', 'حجر مادي وفحص للأختام والسجلات الحرارية فور الوصول.'),
    },
    {
      step: '02',
      title: t('COA Verification', 'تدقيق شهادة التحليل'),
      desc: t('Cross-check against USP, BP, EP, and CPV monographs.', 'مراجعة نتائج المصنع ومطابقتها لدساتير الأدوية.'),
    },
    {
      step: '03',
      title: t('GDP Storage', 'التخزين المراقب'),
      desc: t('Controlled 15–25°C and 2–8°C zones with 24/7 logging.', 'تخزين في مناطق مضبوطة الحرارة برصد إلكتروني مستمر.'),
    },
    {
      step: '04',
      title: t('Dispatch with Dossier', 'التسليم مع المستندات'),
      desc: t('Delivered with original batch COA, SDS, and full traceability.', 'صرف الشحنة مع شهادة التحليل الأصلية وسجلات التتبع.'),
    },
  ];

  return (
    <>
      {/* 1. Hero */}
      <SectionShell label={t('Overview', 'نظرة عامة')} tone="forest" image="/images/deltachem-raw-drums.jpg">
        <Reveal className="mx-auto max-w-3xl space-y-6 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Quality & Regulatory', 'الجودة والشؤون التنظيمية')}
            title={t('Pharmacopoeial Standards & Complete Dossiers', 'الالتزام الصارم بالجودة والملفات التنظيمية')}
            description={t(
              'Every raw material drum and bag is backed by verified COA, DMF, and EDA-compliant quality documentation.',
              'كل عبوة خامات دوائية تصاحبها شهادات التحليل المعتمدة وملفات التسجيل المتوافقة مع هيئة الدواء.'
            )}
          />
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/request-a-quote">
              <Button size="lg" variant="teal" className="px-7 font-bold shadow-xl">
                <span>{t('Request Technical File', 'طلب الملف الفني')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 px-7 font-bold text-white backdrop-blur-md hover:bg-white/10"
              >
                {t('Browse Product List', 'تصفح قائمة الخامات')}
              </Button>
            </Link>
          </div>
        </Reveal>
      </SectionShell>

      {/* 2. Screening & Framework */}
      <SectionShell label={t('Governance', 'حوكمة الجودة')} tone="light">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="rounded-3xl border border-teal-200 bg-teal-50 p-7 shadow-md sm:p-9">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-sm">
                <Award className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {t('Quality Leadership', 'القيادة والاعتماد العلمي')}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
                {t(
                  'Directed by Dr. Abdelhamid Aboelaly (PhD in Quality Management, MBA) with 20+ years in raw materials governance.',
                  'تحت إشراف د. عبدالحميد أبو العلي (دكتوراه إدارة الجودة وماجستير MBA) لضمان أعلى معايير الاعتماد.'
                )}
              </p>
              <ul className="mt-5 space-y-2.5 border-t border-teal-200 pt-4 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-600" />
                  <span>{t('ISO 9001 & GDP Aligned Operations', 'عمليات متوافقة مع ISO 9001 وGDP')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-600" />
                  <span>{t('Pre-Audited Global Principals', 'مصانع موردة مؤهلة ومعتمدة')}</span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12} x={24} y={0} className="space-y-6 lg:col-span-7">
            <SectionHeader
              eyebrow={t('Quality Assurance', 'نظام ضمان الجودة')}
              title={t('Multi-Tier Supplier & Monograph Screening', 'تأهيل الموردين ومطابقة دساتير الأدوية')}
              description={t(
                'We source exclusively from qualified manufacturers conforming to international monographs.',
                'نعتمد التوريد من مصانع عالمية مؤهلة تلتزم التزاماً كاملاً بدساتير الأدوية المعتمدة.'
              )}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                <h4 className="flex items-center gap-2 text-base font-extrabold text-slate-900">
                  <ShieldCheck className="h-5 w-5 text-teal-600" />
                  {t('cGMP Manufacturers', 'مصانع مطابقة لـ cGMP')}
                </h4>
                <p className="mt-2 text-sm text-slate-600">
                  {t('Valid EU-GMP, US-FDA, or national GMP accreditations.', 'شهادات تصنيع جيد سارية ومعتمدة دولياً.')}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                <h4 className="flex items-center gap-2 text-base font-extrabold text-slate-900">
                  <Layers className="h-5 w-5 text-teal-600" />
                  {t('Monograph Standards', 'الدساتير الدوائية')}
                </h4>
                <p className="mt-2 text-sm text-slate-600">
                  {t('Strict verification against USP, BP, EP, CPV, and FCC.', 'مطابقة دقيقة لمواصفات USP وBP وEP وCPV وFCC.')}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* 3. Document Package */}
      <SectionShell label={t('Dossiers', 'الملفات الفنية')} tone="tint">
        <div className="space-y-8">
          <SectionHeader
            align="center"
            eyebrow={t('Documentation', 'الوثائق المعتمدة')}
            title={t('Complete Technical & Registration Files', 'ملفات فنية متكاملة لتسهيل التسجيل الدوائي')}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {documentChecklist.map((item, index) => (
              <Reveal
                key={index}
                delay={index * 0.03}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-teal-500"
              >
                <div className="mb-2.5 flex items-center justify-between">
                  <FileSpreadsheet className="h-5 w-5 text-teal-600" />
                  <span className="rounded-md border border-teal-200 bg-teal-50 px-2 py-0.5 text-[11px] font-bold text-teal-700">
                    {item.tag}
                  </span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900">{item.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* 4. SOP */}
      <SectionShell label={t('Protocol', 'إجراءات العمل')} tone="navy" image="/images/harvest-warehouse-2.jpg">
        <div className="space-y-8">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Traceability Protocol', 'بروتوكول الاستلام والإفراج')}
            title={t('From Port Arrival to Factory Delivery', 'من ميناء الوصول حتى تسليم المصنع')}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sopSteps.map((s, idx) => (
              <Reveal
                key={s.step}
                delay={idx * 0.05}
                className="rounded-3xl border border-white/15 bg-white/10 p-6 text-white backdrop-blur-md"
              >
                <span className="font-mono text-3xl font-extrabold text-amber-400">{s.step}</span>
                <h4 className="mt-2 text-lg font-extrabold">{s.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-200">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionShell>
    </>
  );
};
