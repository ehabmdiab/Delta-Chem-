'use client';

import React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  FileCheck2,
  Search,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileText,
  BadgePercent,
  Warehouse,
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Reveal } from '@/components/molecules/Reveal';
import { useLanguage } from '@/components/providers/LanguageContext';

export const ServicesClient: React.FC = () => {
  const { t } = useLanguage();

  const capabilities = [
    {
      icon: FileCheck2,
      title: t('EDA Registration Support', 'دعم ملفات هيئة الدواء'),
      desc: t(
        'Technical coordination for manufacturer accreditation and CTD submissions.',
        'التنسيق الفني لاعتماد المصانع وتقديم ملفات التسجيل بهيئة الدواء المصرية.'
      ),
    },
    {
      icon: ShieldCheck,
      title: t('Complete Quality Pack', 'حزمة المستندات القياسية'),
      desc: t(
        'DMF Open Part, CEP certificates, batch COAs, and origin statements.',
        'ملفات DMF وشهادات الملاءمة الأوروبية وشهادات التحليل لكل تشغيلة.'
      ),
    },
    {
      icon: Search,
      title: t('Custom Sourcing', 'توريد الخامات المتخصصة'),
      desc: t(
        'Sourcing niche APIs and excipients from audited international producers.',
        'توفير المواد الفعالة والسواغات المتخصصة من مصانع عالمية معتمدة.'
      ),
    },
    {
      icon: FileText,
      title: t('Impurity Assessments', 'تقارير الشوائب والثبات'),
      desc: t(
        'Nitrosamine, ICH Q3D elemental, and ICH Q3C solvent compliance files.',
        'تقييمات النيتروزامين والشوائب العنصرية والمذيبات المتبقية وفق ICH.'
      ),
    },
    {
      icon: Briefcase,
      title: t('R&D Samples', 'عينات البحث والتطوير'),
      desc: t(
        'Fast delivery of lab-scale samples with lot-specific COAs.',
        'توفير عينات مخبرية سريعة مصحوبة بشهادات التحليل للتجارب التشغيلية.'
      ),
    },
    {
      icon: Truck,
      title: t('GDP Cold & Ambient Logistics', 'شحن وتوصيل مراقب الحرارة'),
      desc: t(
        'Tracked international freight and local delivery from Harvest Pharma.',
        'شحن دولي وتوصيل محلي مراقب الحرارة من مخازن هارفست فارما.'
      ),
    },
  ];

  return (
    <>
      {/* 1. Hero */}
      <SectionShell label={t('Overview', 'نظرة عامة')} tone="forest" image="/images/deltachem-global-shipping.jpg">
        <Reveal className="mx-auto max-w-3xl space-y-6 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('B2B Services', 'الخدمات التجارية واللوجستية')}
            title={t('Direct Import & Local Distribution Solutions', 'حلول متكاملة للاستيراد والتوزيع المحلي')}
            description={t(
              'Choose between direct indent representation with global producers or prompt local delivery from our Cairo stock.',
              'مرونة كاملة بين التعاقد المباشر مع المصانع العالمية أو التوريد الفوري من مخزوننا المحلي.'
            )}
          />
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/request-a-quote">
              <Button size="lg" variant="teal" className="px-7 font-bold shadow-xl">
                <span>{t('Request Commercial Quote', 'طلب عرض سعر')}</span>
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

      {/* 2. Dual Operating Structure */}
      <SectionShell label={t('Models', 'نماذج العمل')} tone="tint">
        <div className="space-y-8">
          <SectionHeader
            align="center"
            eyebrow={t('Supply Models', 'هيكل التوريد')}
            title={t('Two Flexible Sourcing Channels', 'قنوات تعاقد تناسب خطط مصنعكم')}
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Reveal className="flex flex-col justify-between space-y-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-xs sm:p-9">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                    <BadgePercent className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                    {t('Direct Indent', 'استيراد مباشر')}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {t('Commission Agency Model', 'الوكالة التجارية المباشرة')}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {t(
                    'Direct contracting between Egyptian manufacturers and audited global suppliers.',
                    'تعاقد مباشر بين المصانع المصرية وكبرى الشركات العالمية الموردة.'
                  )}
                </p>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    <span>{t('Factory-direct pricing & L/C support', 'أسعار المصنع ودعم الاعتمادات المستندية')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    <span>{t('EDA dossier & registration follow-up', 'متابعة ملفات التسجيل بهيئة الدواء')}</span>
                  </li>
                </ul>
              </div>
              <Link href="/partners">
                <Button variant="outline" className="w-full justify-between font-bold">
                  <span>{t('Global Representation', 'الشراكات والوكالات العالمية')}</span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col justify-between space-y-6 rounded-3xl border border-teal-200 bg-teal-50/70 p-7 shadow-xs sm:p-9">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600 text-white">
                    <Warehouse className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-teal-600 px-3 py-1 text-xs font-bold text-white">
                    {t('Local Stock', 'مخزون محلي')}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {t('Stock & Trade Distribution', 'التوريد من المخزون المحلي')}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {t(
                    'Ready local stock cleared through customs and held at Harvest Pharma warehouses.',
                    'مخزون محلي جاهز ومفرج عنه جمركياً ومحفوظ بمخازن هارفست فارما.'
                  )}
                </p>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    <span>{t('24–48h delivery across Egypt in EGP', 'تسليم خلال ٢٤-٤٨ ساعة بفواتير محلية')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    <span>{t('No import delays or port congestion risk', 'تجنب مخاطر تأخير الشحن وتكدس الموانئ')}</span>
                  </li>
                </ul>
              </div>
              <Link href="/supply-chain">
                <Button variant="teal" className="w-full justify-between font-bold">
                  <span>{t('Inspect Harvest Pharma Warehouses', 'معاينة مخازن هارفست فارما')}</span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* 3. Value-Added Capabilities */}
      <SectionShell label={t('Capabilities', 'القدرات')} tone="navy" image="/images/deltachem-supply-logistics.jpg">
        <div className="space-y-8">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Technical Support', 'الدعم الفني والرقابي')}
            title={t('Regulatory & Logistics Capabilities', 'قدراتنا الفنية واللوجستية')}
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, idx) => (
              <Reveal
                key={idx}
                delay={idx * 0.04}
                className="rounded-2xl border border-white/15 bg-white/10 p-6 text-white backdrop-blur-md"
              >
                <cap.icon className="mb-3 h-7 w-7 text-teal-400" aria-hidden="true" />
                <h4 className="text-base font-extrabold">{cap.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-200 sm:text-sm">{cap.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* 4. CTA */}
      <SectionShell label={t('Inquire', 'طلب تسعير')} tone="forest" image="/images/bg-cairo-dusk.jpg">
        <Reveal className="mx-auto max-w-3xl space-y-6 py-4 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Sales Desk', 'فريق المبيعات')}
            title={t('Ready to Quote Your Requirements?', 'هل أنت مستعد لطلب عرض أسعار؟')}
            description={t(
              'Share your raw material list, target standards, and volumes for a prompt quotation.',
              'أرسل قائمة الخامات والمواصفات والكميات المطلوبة للحصول على عرض سعر سريع.'
            )}
          />
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/request-a-quote">
              <Button size="lg" variant="teal" className="px-8 font-extrabold shadow-xl">
                {t('Submit an RFQ', 'إرسال طلب تسعير')}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 px-8 font-bold text-white hover:bg-white/10"
              >
                {t('Contact Us', 'تواصل معنا')}
              </Button>
            </Link>
          </div>
        </Reveal>
      </SectionShell>
    </>
  );
};
