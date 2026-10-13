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
      title: t('Certificate of Analysis (COA)', 'شهادة التحليل المخبري (COA)'),
      desc: t(
        'Lot-specific test results matching batch numbers, including assay percentage, purity limits and physical parameters.',
        'نتائج تحاليل مخبرية دقيقة لكل تشغيلة مطابقة لأرقام التشغيلات، تشمل نسبة المادة الفعالة وحدود النقاء والمواصفات الفيزيائية.'
      ),
      tag: t('Every Batch', 'لكل تشغيلة'),
    },
    {
      title: t('Drug Master File (DMF) / CEP', 'ملف المادة الفعالة (DMF) / شهادة CEP'),
      desc: t(
        'Open Part documentation, Certificate of Suitability from EDQM, and administrative registration authorization letters.',
        'الملف الفني المفتوح (Open Part)، وشهادة الملاءمة من الهيئة الأوروبية (EDQM)، وخطابات تفويض التسجيل بهيئة الدواء.'
      ),
      tag: t('Registration', 'ملف التسجيل'),
    },
    {
      title: t('Nitrosamine Risk Evaluation', 'تقييم مخاطر شوائب النيتروزامين'),
      desc: t(
        'Comprehensive step 1 & 2 risk assessments identifying potential formation or presence of nitrosamine impurities.',
        'تقييم شامل لمخاطر النيتروزامين في المرحلتين 1 و 2 لتحديد احتمالية تكون أو وجود أي شوائب نيتروزامين والسيطرة عليها.'
      ),
      tag: t('Mandatory EDA', 'إلزامي بهيئة الدواء'),
    },
    {
      title: t('Elemental Impurities (ICH Q3D)', 'الشوائب العنصرية (ICH Q3D)'),
      desc: t(
        'Validated testing summaries addressing Class 1, 2A, 2B and 3 metals per ICH guidelines.',
        'ملخصات اختبارات معتمدة تغطي معادن الفئات 1 و 2A و 2B و 3 وفق إرشادات ICH المعتمدة عالمياً.'
      ),
      tag: t('Safety', 'معايير الأمان'),
    },
    {
      title: t('Residual Solvents (ICH Q3C)', 'المذيبات المتبقية (ICH Q3C)'),
      desc: t(
        'Statement of solvents utilized in synthesis and chromatographic confirmation of limit thresholds.',
        'إقرار رسمي بالمذيبات المستخدمة في التخليق وتأكيد كروماتوغرافي على مطابقة الحدود المسموح بها.'
      ),
      tag: t('Compliance', 'الامتثال الدوائي'),
    },
    {
      title: t('BSE / TSE Risk Assessment', 'تقييم مخاطر الاعتلال الدماغي (BSE / TSE)'),
      desc: t(
        'Certified absence of animal-derived components or strict verification of bovine/porcine origin safety.',
        'شهادة رسمية بخلو المادة من أي مشتقات حيوانية أو توثيق صارم لسلامة المنشأ البقري/الخنزيري.'
      ),
      tag: t('Origin', 'شهادة المنشأ'),
    },
    {
      title: t('Stability Data (Zone IVa & IVb)', 'بيانات دراسات الثبات (Zone IVa & IVb)'),
      desc: t(
        'Real-time and accelerated stability reporting tailored to hot and humid climatic zones for Egyptian filing.',
        'تقارير ثبات مسرعة وفعلية في الوقت الحقيقي ملائمة للمناطق المناخية الحارة والرطبة للتسجيل بهيئة الدواء المصرية.'
      ),
      tag: t('Stability', 'دراسات الثبات'),
    },
    {
      title: t('GHS Safety Data Sheet (SDS)', 'صحيفة بيانات سلامة المادة (SDS)'),
      desc: t(
        '16-section Globally Harmonized System safety data sheets in English and Arabic if required.',
        'صحائف بيانات السلامة المكونة من 16 بنداً وفق النظام المتوافق عالمياً (GHS) باللغتين الإنجليزية والعربية.'
      ),
      tag: t('Handling', 'تعليمات التداول'),
    },
  ];

  const sopSteps = [
    {
      step: '01',
      title: t('Arrival & Quarantine', 'وصول الشحنة والحجر المادي'),
      desc: t(
        'Upon entry to our Harvest Pharma warehouse, shipments are placed in physical quarantine. Package seals and temperature logs are checked.',
        'فور وصول الشحنة إلى مستودع هارفست فارما، توضع مباشرة في منطقة الحجر الفعلي ويتم فحص أختام العبوات وسجلات درجات الحرارة بدقة.'
      ),
    },
    {
      step: '02',
      title: t('COA Audit & Verification', 'تدقيق شهادة التحليل (COA) والمطابقة'),
      desc: t(
        'Quality personnel audit manufacturer test parameters against client-agreed monographs (BP, USP, Ph. Eur.) and EDA commitments.',
        'يقوم أخصائيو توكيد الجودة بمراجعة نتائج فحص المصنع ومطابقتها مع مواصفات الدساتير المعتمدة (BP, USP, Ph. Eur.) واشتراطات هيئة الدواء.'
      ),
    },
    {
      step: '03',
      title: t('Controlled Storage', 'التخزين البيئي الخاضع للرقابة المستمرة'),
      desc: t(
        'Released materials are moved into active racks maintained at 15°C–25°C or 2°C–8°C with 24/7 digital data logging.',
        'تنقل المواد المفرج عنها إلى رفوف التخزين المخصصة مع ضبط درجات الحرارة عند 15°C–25°C أو 2°C–8°C وتسجيل رقمي على مدار الساعة.'
      ),
    },
    {
      step: '04',
      title: t('Dispatched with Dossier', 'الصرف والتسليم مع الحزمة التوثيقية'),
      desc: t(
        'Every delivery to the customer includes original batch COAs, SDS and delivery receipts signed under GDP guidelines.',
        'ترفق مع كل شحنة تسلم للعميل شهادات التحليل الأصلية لكل تشغيلة وصحائف بيانات السلامة ومستندات التسليم المعتمدة وفق ممارسات GDP.'
      ),
    },
  ];

  return (
    <>
      {/* 1. Hero */}
      <SectionShell label={t('Overview', 'نظرة عامة')} tone="forest" image="/images/about-qc-lab.jpg">
        <Reveal className="mx-auto max-w-4xl space-y-6 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Scientific Governance & Rigor', 'الحوكمة العلمية والدقة الصارمة')}
            title={t(
              'Quality Assurance Without Compromise',
              'توكيد الجودة الدوائية دون أي تهاون أو مساومة'
            )}
            description={t(
              'In modern pharmaceutical manufacturing, compliance is not an afterthought. DELTACHEM delivers certified, auditable raw materials backed by comprehensive documentation that passes Egyptian Drug Authority (EDA) scrutiny.',
              'في الصناعات الدوائية الحديثة، الامتثال ليس خياراً ثانوياً بل ركيزة أساسية. تقدم دلتا كيم خامات دوائية معتمدة وقابلة للتدقيق ومدعومة بملفات توثيق شاملة تجتاز كافة اشتراطات هيئة الدواء المصرية (EDA).'
            )}
          />
          <div className="flex flex-wrap justify-center gap-4 pt-3">
            <Link href="/request-a-quote">
              <Button size="lg" variant="teal" className="px-8 font-bold shadow-xl shadow-teal-950/60">
                <span>{t('Request Technical Dossier', 'طلب ملف فني ومستندات')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 px-7 font-bold text-white backdrop-blur-md hover:bg-white/10"
              >
                {t('Inspect Verified Catalog', 'معاينة الكتالوج المعتمد')}
              </Button>
            </Link>
          </div>
        </Reveal>
      </SectionShell>

      {/* 2. Screening & Framework */}
      <SectionShell label={t('Screening', 'التدقيق والتأهيل')} tone="light">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="rounded-3xl border border-teal-200 bg-teal-50 p-7 shadow-xl sm:p-9">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md">
                <Award className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                {t('Academic & Quality Leadership', 'الريادة الأكاديمية وإدارة الجودة')}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {t(
                  'Our quality framework is engineered directly by Founder & Managing Director, Dr. Abdelhamid Aboelaly, holding a Doctorate in Quality Management alongside an MBA and over two decades in chemical distribution.',
                  'تم تصميم وتأسيس منظومة الجودة لدينا مباشرة بإشراف المؤسس والعضو المنتدب، د. عبد الحميد أبو العلى، الحاصل على درجة الدكتوراه في إدارة الجودة إلى جانب ماجستير إدارة الأعمال وخبرة تزيد عن 20 عاماً في قطاع توزيع المواد الكيميائية والصيدلانية.'
                )}
              </p>
              <ul className="mt-5 space-y-3 border-t border-teal-200 pt-5 text-sm text-slate-700">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-teal-600" />
                  <span>{t('ISO 9001:2015 Quality Management Alignment', 'مطابقة معايير نظام إدارة الجودة ISO 9001:2015')}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-teal-600" />
                  <span>{t('Good Distribution Practice (GDP) Oversight', 'تطبيق ومتابعة ممارسات التوزيع الجيد (GDP) الصيدلانية')}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-teal-600" />
                  <span>{t('Full Audit Preparedness for Regulatory Inspections', 'جاهزية تامة لعمليات التفتيش والتدقيق من الجهات الرقابية')}</span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15} x={30} y={0} className="space-y-5 lg:col-span-7">
            <SectionHeader
              eyebrow={t('Quality Management System', 'نظام إدارة الجودة المتكامل')}
              title={t(
                'Rigorous Screening from Reactor to Warehouse',
                'فحص وتدقيق دقيق من المفاعل إلى المستودع'
              )}
              description={t(
                'We believe distribution excellence requires active scientific involvement. Every manufacturer we partner with undergoes a multi-tier qualification audit before ingredients are introduced to the Egyptian market.',
                'نؤمن بأن التميز في التوزيع يتطلب إشرافاً علمياً مباشراً ودقيقاً. يخضع كل مصنع نتعامل معه لتدقيق تأهيلي متعدد المستويات قبل طرح أي مادة خام في السوق المصري.'
              )}
            />
            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h4 className="flex items-center gap-2 text-base font-extrabold text-slate-900">
                  <ShieldCheck className="h-5 w-5 text-teal-600" />
                  {t('Qualified Principals', 'موردون عالميون مؤهلون')}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t(
                    'We exclusively represent synthesis plants with valid EU-GMP, US-FDA or verified national GMP certifications.',
                    'نمثل حصرياً مصانع تخليق دوائي حاصلة على شهادات EU-GMP أو US-FDA سارية أو تدقيق وطني معتمد.'
                  )}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h4 className="flex items-center gap-2 text-base font-extrabold text-slate-900">
                  <Layers className="h-5 w-5 text-teal-600" />
                  {t('Pharmacopoeial Conformity', 'المطابقة الدقيقة لدساتير الأدوية')}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t(
                    'Continuous cross-referencing against current monographs: USP-NF, BP, European Pharmacopoeia (Ph. Eur.) and JP.',
                    'مطابقة مستمرة ودقيقة لأحدث دراسات ومواصفات دساتير الأدوية: USP-NF و BP والدستور الأوروبي (Ph. Eur.) والياباني (JP).'
                  )}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* 3. Regulatory Document Package */}
      <SectionShell label={t('Dossiers', 'الملفات الفنية')} tone="tint">
        <div className="space-y-6">
          <SectionHeader
            align="center"
            eyebrow={t('Documentation Ecosystem', 'المنظومة التوثيقية المتكاملة')}
            title={t(
              'Turnkey Regulatory Dossiers for EDA Submission',
              'ملفات فنية وتنظيمية جاهزة للاعتماد بهيئة الدواء المصرية'
            )}
            description={t(
              'Avoid regulatory delays and sample rejections. DELTACHEM supplies the complete technical file required by the Egyptian Drug Authority (EDA) for human, veterinary and dietary product registration.',
              'تجنب تأخيرات التسجيل ورفض العينات؛ توفر دلتا كيم الملف الفني الكامل المطلوب من قبل هيئة الدواء المصرية (EDA) لتسجيل الأدوية البشرية والبيطرية والمكملات الغذائية.'
            )}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {documentChecklist.map((item, index) => (
              <Reveal
                key={index}
                delay={index * 0.04}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-teal-500 hover:shadow-md"
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

      {/* 4. SOP: Port Arrival to Release */}
      <SectionShell label={t('Protocol', 'بروتوكول العمل')} tone="navy" image="/images/pharma-warehouse-coldchain.jpg">
        <div className="space-y-6">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Standard Operating Procedure', 'إجراءات التشغيل القياسية (SOP)')}
            title={t(
              'From Port Arrival to Final Cleanroom Release',
              'من وصول الميناء حتى التسليم لغرف الإنتاج النظيفة'
            )}
            description={t(
              'Traceability is maintained through strict serial numbering, batch integrity verification and physical inspection.',
              'يتم الحفاظ على التتبع الكامل عبر ترقيم تسلسلي دقيق، والتحقق الصارم من سلامة التشغيلات، والفحص المادي الدقيق.'
            )}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sopSteps.map((s, idx) => (
              <Reveal
                key={s.step}
                delay={idx * 0.06}
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

      {/* 5. CTA */}
      <SectionShell label={t('Assistance', 'الدعم الفني')} tone="forest" image="/images/bg-cairo-dusk.jpg">
        <Reveal className="mx-auto max-w-4xl space-y-6 py-6 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Regulatory Affairs Desk', 'مكتب الشؤون التنظيمية والتسجيل')}
            title={t(
              'Need Immediate Regulatory Assistance?',
              'هل تحتاج إلى دعم تنظيمي عاجل لمنتجاتكم؟'
            )}
            description={t(
              'Contact our regulatory affairs team for advice on ingredient registration, DMF filings and official certificates.',
              'تواصل مع فريق الشؤون التنظيمية لدينا للحصول على استشارات تسجيل الخامات، وملفات DMF، والشهادات الرسمية المطلوبة.'
            )}
          />
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/contact">
              <Button size="lg" variant="teal" className="px-9 font-extrabold shadow-xl shadow-teal-950/50">
                {t('Contact Regulatory Affairs', 'التواصل مع الشؤون التنظيمية')}
              </Button>
            </Link>
            <Link href="/request-a-quote">
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 px-8 font-bold text-white hover:bg-white/10"
              >
                {t('Request a Quote with Specifications', 'طلب عرض سعر مع المواصفات الفنية')}
              </Button>
            </Link>
          </div>
        </Reveal>
      </SectionShell>
    </>
  );
};
