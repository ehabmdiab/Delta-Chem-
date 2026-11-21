'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types';
import { siteConfig } from '@/config/site';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Reveal } from '@/components/molecules/Reveal';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { Button } from '@/components/atoms/Button';
import { useLanguage } from '@/components/providers/LanguageContext';
import { CheckCircle2, ArrowRight, Award, MessageCircle } from 'lucide-react';

interface QualityPoint {
  title: string;
  title_ar: string;
  text: string;
  text_ar: string;
}

const QUALITY_POINTS: QualityPoint[] = [
  {
    title: 'Pharmacopoeia Compliance',
    title_ar: 'مطابقة دساتير الأدوية',
    text: 'Verified conformity to USP, BP, EP, CPV, and FCC monographs.',
    text_ar: 'مطابقة كاملة لمواصفات USP وBP وEP وCPV.',
  },
  {
    title: 'Audited Global Producers',
    title_ar: 'مصانع عالمية معتمدة',
    text: 'Direct sourcing from cGMP-certified international manufacturers.',
    text_ar: 'استيراد مباشر من مصانع حاصلة على اعتمادات cGMP.',
  },
  {
    title: 'Complete Registration Dossiers',
    title_ar: 'ملفات تسجيل متكاملة',
    text: 'COA, MSDS, and DMF support for EDA registration.',
    text_ar: 'شهادات تحليل COA وملفات DMF لدعم تسجيلات هيئة الدواء.',
  },
];

export const HomeSectionsClient: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const { t } = useLanguage();

  return (
    <>
      {/* 7. Quality assurance + leadership */}
      <SectionShell label="Quality" tone="light">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="space-y-6 lg:col-span-6">
            <SectionHeader
              eyebrow={t('Quality Assurance', 'ضمان الجودة')}
              title={t('Compliance & Documentation Built Into Every Lot', 'جودة موثقة في كل تشغيلة')}
              description={t(
                'Every batch is supplied with verified analytical certificates and full traceability from factory to warehouse.',
                'نلتزم بتوفير شهادات التحليل المعتمدة والتتبع الكامل لكل شحنة من المصنع حتى المستودع.'
              )}
            />
            <ul className="space-y-4">
              {QUALITY_POINTS.map((p) => (
                <li key={p.title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 text-teal-700">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <strong className="block text-base font-bold text-slate-900">
                      {t(p.title, p.title_ar)}
                    </strong>
                    <span className="text-sm text-slate-600">{t(p.text, p.text_ar)}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/quality-regulatory" className="inline-block pt-1">
              <Button variant="teal" size="lg" className="px-7 font-bold">
                <span>{t('Quality & Regulatory Standards', 'معايير الجودة والتسجيل')}</span>
                <ArrowRight className="h-5 w-5 rtl:rotate-180" />
              </Button>
            </Link>
          </Reveal>

          <Reveal delay={0.12} x={24} y={0} className="lg:col-span-6">
            <div className="space-y-5 rounded-3xl border border-teal-100 bg-teal-50 p-7 shadow-md sm:p-9">
              <div className="flex items-center gap-4 border-b border-teal-200 pb-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md">
                  <Award className="h-7 w-7" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {t('Executive Leadership', 'القيادة التنفيذية')}
                  </h3>
                  <p className="text-sm font-medium text-slate-600">
                    {t('Dr. Abdelhamid Aboelaly — Managing Director', 'د. عبدالحميد أبو العلي — المدير العام')}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                {t(
                  'Led by Dr. Abdelhamid Aboelaly with 20+ years in chemical sourcing, MBA governance, and a Doctorate in Quality Management.',
                  'تُدار الشركة بقيادة د. عبدالحميد أبو العلي بخبرة تتجاوز ٢٠ عاماً في استيراد الكيماويات وماجستير MBA ودكتوراه في إدارة الجودة.'
                )}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    {t('Business Management', 'إدارة الأعمال')}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {t('MBA International Business', 'ماجستير إدارة الأعمال (MBA)')}
                  </span>
                </div>
                <div className="rounded-2xl border border-teal-200 bg-white p-4">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-teal-700">
                    {t('Quality Governance', 'حوكمة الجودة')}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {t('PhD in Quality Management', 'دكتوراه في إدارة الجودة')}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* 8. Insights */}
      <SectionShell label="Insights" tone="tint">
        <div className="space-y-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionHeader
              eyebrow={t('Industry Updates', 'مقالات وتحديثات')}
              title={t('Latest Insights & Standards', 'أحدث المقالات والرؤى الصناعية')}
              description={t(
                'Brief perspectives on raw material sourcing, pharmacopoeial quality, and storage compliance.',
                'ملخصات متخصصة حول سلاسل الإمداد ومعايير الجودة الدوائية والتخزين المعتمد.'
              )}
            />
            <Link href="/insights" className="shrink-0">
              <Button variant="outline" size="lg" className="font-bold">
                <span>{t('All Articles', 'جميع المقالات')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article, idx) => (
              <Reveal key={article.id} delay={idx * 0.08}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* 9. Contact / CTA */}
      <SectionShell label="Contact" tone="forest" image="/images/bg-cairo-dusk.jpg">
        <Reveal className="mx-auto max-w-3xl space-y-6 py-4 text-center">
          <span className="inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.22em] text-teal-400">
            <span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-amber-500" />
            {t('DELTACHEM Cairo Head Office', 'المقر الرئيسي — دلتا كيم القاهرة')}
          </span>
          <h2 className="text-[clamp(1.75rem,1.2rem+2.2vw,3.1rem)] font-extrabold leading-[1.12] tracking-tight text-white">
            {t('Need Certified Raw Materials for Your Factory?', 'هل تبحث عن خامات معتمدة لمصنعك؟')}
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-200 lg:text-lg">
            {t(
              'Reach our Cairo sales desk directly for quotations, batch COAs, and delivery schedules.',
              'تواصل مباشرة مع فريق المبيعات بالقاهرة لطلب التسعير وشهادات التحليل ومواعيد التوريد.'
            )}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/request-a-quote">
              <Button variant="teal" size="lg" className="px-8 font-extrabold shadow-xl shadow-teal-950/50">
                {t('Request Quotation', 'طلب عرض أسعار')}
              </Button>
            </Link>
            <a href={siteConfig.socials.whatsappPrimary} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-400/60 bg-emerald-600/20 px-6 font-bold text-white hover:bg-emerald-600"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{t('WhatsApp: 01003875503', 'واتساب: 01003875503')}</span>
              </Button>
            </a>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white/50 px-6 font-bold text-white hover:bg-white/10"
              >
                {t(`Tel: ${siteConfig.contact.phone} / ${siteConfig.contact.phoneSecondary}`, `أرضي: ${siteConfig.contact.phone} / ${siteConfig.contact.phoneSecondary}`)}
              </Button>
            </Link>
          </div>
        </Reveal>
      </SectionShell>
    </>
  );
};
