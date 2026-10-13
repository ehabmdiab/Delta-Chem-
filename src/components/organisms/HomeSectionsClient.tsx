'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Reveal } from '@/components/molecules/Reveal';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { Button } from '@/components/atoms/Button';
import { useLanguage } from '@/components/providers/LanguageContext';
import { CheckCircle2, ArrowRight, Award } from 'lucide-react';

interface QualityPoint {
  title: string;
  title_ar: string;
  text: string;
  text_ar: string;
}

const QUALITY_POINTS: QualityPoint[] = [
  {
    title: 'Full Monograph Verification',
    title_ar: 'فحص كامل وفق الدساتير الدوائية',
    text: 'Analytical conformity with USP, BP and European Pharmacopoeia (Ph.Eur).',
    text_ar: 'تطابق تحليلي كامل مع دساتير الأدوية الأمريكية والبريطانية والأوروبية.',
  },
  {
    title: 'Supplier Qualification Audits',
    title_ar: 'تدقيق وتأهيل المصانع الموردة',
    text: 'cGMP documentation, environmental controls and batch-to-batch repeatability.',
    text_ar: 'توثيق ممارسات التصنيع الجيد cGMP والرقابة البيئية وثبات الجودة بين التشغيلات.',
  },
  {
    title: 'Registration Dossiers (DMF / COA / MSDS)',
    title_ar: 'ملفات التسجيل (DMF / COA / MSDS)',
    text: 'Supplied on request for Egyptian Drug Authority (EDA) registration.',
    text_ar: 'نوفر الملفات الفنية المعتمدة للتسجيل لدى هيئة الدواء المصرية (EDA).',
  },
];

export const HomeSectionsClient: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const { t } = useLanguage();

  return (
    <>
      {/* 7. Quality assurance + leadership */}
      <SectionShell label="Quality" tone="light">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <Reveal className="space-y-5 lg:col-span-6">
            <SectionHeader
              eyebrow={t('Total Quality Assurance', 'ضمان الجودة الشامل')}
              title={t(
                'Pharmacopoeial Integrity from Synthesis to Warehouse',
                'مطابقة دساتير الأدوية من التصنيع إلى المستودع'
              )}
              description={t(
                'Raw-material purity dictates clinical bioavailability and safety. DELTACHEM enforces a zero-compromise compliance policy across every lot distributed in Egypt and the MENA region.',
                'نقاوة المادة الخام تحدد التوافر الحيوي وسلامة الدواء. تلتزم دلتا كيم بسياسة جودة صارمة بدون أي تهاون عبر كل تشغيلة يتم توريدها في مصر والشرق الأوسط.'
              )}
            />
            <ul className="space-y-4">
              {QUALITY_POINTS.map((p) => (
                <li key={p.title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 text-teal-700">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <strong className="block text-base font-bold text-slate-900 lg:text-lg">
                      {t(p.title, p.title_ar)}
                    </strong>
                    <span className="text-sm leading-relaxed text-slate-600 lg:text-base">
                      {t(p.text, p.text_ar)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/quality-regulatory" className="inline-block pt-1">
              <Button variant="teal" size="lg" className="px-7 font-bold">
                <span>{t('Our Regulatory Standards', 'معاييرنا التنظيمية والرقابية')}</span>
                <ArrowRight className="h-5 w-5 rtl:rotate-180" />
              </Button>
            </Link>
          </Reveal>

          <Reveal delay={0.15} x={30} y={0} className="lg:col-span-6">
            <div className="space-y-5 rounded-3xl border border-teal-100 bg-teal-50 p-6 shadow-lg sm:p-8">
              <div className="flex items-center gap-4 border-b border-teal-200 pb-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md">
                  <Award className="h-7 w-7" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                    {t('Executive Leadership & Governance', 'القيادة التنفيذية والحوكمة')}
                  </h3>
                  <p className="text-sm font-medium text-slate-600">
                    {t(
                      'Dr. Abdelhamid Aboelaly, Founder & Managing Director',
                      'د. عبدالحميد أبو العلي، المؤسس والمدير العام'
                    )}
                  </p>
                </div>
              </div>
              <p className="text-base leading-relaxed text-slate-700">
                {t(
                  'DELTACHEM is steered by Dr. Abdelhamid Aboelaly, who brings over 20 years of executive expertise in global ingredient sourcing, chemical marketing and quality assurance.',
                  'تقاد شركة دلتا كيم بواسطة د. عبدالحميد أبو العلي، بخبرة تنفيذية تتجاوز ٢٠ عاماً في توريد الكيماويات والتسويق وضمان الجودة الصيدلانية.'
                )}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    {t('Scientific Foundation', 'الأساس العلمي')}
                  </span>
                  <span className="font-bold text-slate-900">
                    {t('Background in Chemistry', 'تخصص في الكيمياء الصناعية')}
                  </span>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    {t('Business Governance', 'إدارة الأعمال والحوكمة')}
                  </span>
                  <span className="font-bold text-slate-900">
                    {t('Master’s (MBA) in Business', 'ماجستير إدارة الأعمال (MBA)')}
                  </span>
                </div>
                <div className="rounded-2xl border border-teal-200 bg-white p-4 sm:col-span-2">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-teal-700">
                    {t('Academic Quality Credentials', 'المؤهل الأكاديمي في الجودة')}
                  </span>
                  <span className="font-bold text-slate-900">
                    {t('Doctorate Degree in Quality Management', 'درجة الدكتوراه في إدارة الجودة')}
                  </span>
                </div>
              </div>
              <p className="border-t border-teal-200 pt-3 text-sm italic leading-relaxed text-slate-600">
                {t(
                  'Managing Director of both DELTACHEM and Harvest Pharma — unifying international chemical indenting with compliant Egyptian healthcare storage.',
                  'المدير العام لكل من دلتا كيم وهارفست فارما — لتوحيد الاستيراد الكيميائي الدولي مع التخزين الدوائي المعتمد في مصر.'
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* 8. Insights */}
      <SectionShell label="Insights" tone="tint">
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionHeader
              eyebrow={t('Market Intelligence', 'رؤى ودراسات السوق')}
              title={t('Latest Insights & Industry Perspectives', 'أحدث المقالات والرؤى الصيدلانية')}
              description={t(
                'Technical analyses, supply chain updates and regulatory insights from DELTACHEM’s life-science specialists.',
                'تحليلات فنية ومستجدات سلاسل الإمداد والشؤون التنظيمية من خبراء دلتا كيم.'
              )}
            />
            <Link href="/insights" className="shrink-0">
              <Button variant="outline" size="lg" className="font-bold">
                <span>{t('View All Articles', 'عرض جميع المقالات')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
            {articles.map((article, idx) => (
              <Reveal key={article.id} delay={idx * 0.1}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* 9. Contact / CTA */}
      <SectionShell label="Contact" tone="forest" image="/images/bg-cairo-dusk.jpg">
        <Reveal className="mx-auto max-w-4xl space-y-6 py-6 text-center">
          <span className="inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.22em] text-teal-400">
            <span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-amber-500" />
            {t('Partner With DELTACHEM Cairo', 'شراكة موثوقة مع دلتا كيم القاهرة')}
          </span>
          <h2 className="text-[clamp(1.9rem,4vw,4rem)] font-extrabold leading-[1.08] tracking-tight text-white">
            {t(
              'Ready to Secure Verified Pharmaceutical Ingredients for Your Formulations?',
              'هل أنت مستعد لتأمين مواد خام دوائية معتمدة لمصنعك؟'
            )}
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-200 lg:text-xl">
            {t(
              'Contact our technical procurement desk in Cairo or submit a quotation request. Our specialists provide certified batch COAs, technical specifications and delivery timelines.',
              'تواصل مع مكتب المشتريات الفنية بالقاهرة أو أرسل طلب تسعير. يوفر أخصائيونا شهادات التحليل المعتمدة والمواصفات الفنية ومواعيد التوريد بدقة.'
            )}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/request-a-quote">
              <Button variant="teal" size="lg" className="px-9 text-base font-extrabold shadow-xl shadow-teal-950/50">
                {t('Submit Request for Quotation', 'إرسال طلب تسعير')}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white/50 px-8 text-base font-bold text-white hover:bg-white/10"
              >
                {t('Contact Sales • (202) 26988187', 'اتصل بالمبيعات • 26988187 (202)')}
              </Button>
            </Link>
          </div>
        </Reveal>
      </SectionShell>
    </>
  );
};
