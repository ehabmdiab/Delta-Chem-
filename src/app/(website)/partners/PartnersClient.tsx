'use client';

import React from 'react';
import Link from 'next/link';
import {
  Globe,
  Building,
  CheckCircle2,
  ArrowRight,
  FileCheck2,
  Warehouse,
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Reveal } from '@/components/molecules/Reveal';
import { useLanguage } from '@/components/providers/LanguageContext';
import { Supplier } from '@/types';

interface PartnersClientProps {
  suppliers: Supplier[];
}

export const PartnersClient: React.FC<PartnersClientProps> = ({ suppliers }) => {
  const { t, locale } = useLanguage();

  const supplierDescriptionsAr: Record<string, string> = {
    'sup-harvest':
      'الشركة الشقيقة التي تدير مخازن دوائية معتمدة ومجهزة وفق معايير التوزيع الجيد GDP.',
    'sup-global-apis':
      'شركاء التصنيع الدوليون المعتمدون للمواد الفعالة والفيتامينات والسواغات الدوائية.',
    'sup-euroderma':
      'موردون عالميون معتمدون لخامات الكاربومير وفلاتر الشمس والقواعد التجميلية.',
  };

  return (
    <>
      {/* 1. Hero */}
      <SectionShell label={t('Overview', 'نظرة عامة')} tone="forest" image="/images/deltachem-global-shipping.jpg">
        <Reveal className="mx-auto max-w-3xl space-y-6 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('International Partners', 'شبكة الشركاء العالميين')}
            title={t('Global Raw Material Producers & Logistics Allies', 'ربط المصانع العالمية بالسوق المصري')}
            description={t(
              'DELTACHEM represents audited global manufacturers across Egypt and the MENA pharmaceutical and industrial markets.',
              'تمثل دلتا كيم كبرى المصانع العالمية المعتمدة لتوفير احتياجات السوق المصري والشرق الأوسط.'
            )}
          />
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/contact">
              <Button size="lg" variant="teal" className="px-7 font-bold shadow-xl">
                <span>{t('Partner With Us', 'كن شريكاً لدلتا كيم')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 px-7 font-bold text-white backdrop-blur-md hover:bg-white/10"
              >
                {t('View Product List', 'عرض قائمة الخامات')}
              </Button>
            </Link>
          </div>
        </Reveal>
      </SectionShell>

      {/* 2. Value Proposition */}
      <SectionShell label={t('Advantages', 'المزايا')} tone="light">
        <div className="space-y-8">
          <SectionHeader
            align="center"
            eyebrow={t('Why DELTACHEM', 'لماذا دلتا كيم')}
            title={t('A Reliable Commercial & Logistics Gateway', 'بوابة تجارية ولوجستية موثوقة')}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Reveal className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                {t('Direct Factory Reach', 'وصول مباشر للمصانع')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t('Direct partnerships with 150+ pharmaceutical, vet, cosmetic, and food plants.', 'شراكات مباشرة مع أكثر من ١٥٠ مصنعاً في مصر.')}
              </p>
            </Reveal>

            <Reveal delay={0.08} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                <FileCheck2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                {t('Regulatory Coordination', 'التنسيق التنظيمي')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t('Dedicated team handling EDA submissions, DMFs, and manufacturer approvals.', 'فريق مختص لمتابعة ملفات التسجيل والاعتماد لدى هيئة الدواء.')}
              </p>
            </Reveal>

            <Reveal delay={0.14} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                <Warehouse className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                {t('Harvest Pharma Warehousing', 'مخازن هارفست فارما')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t('Local climate-controlled buffer warehousing supporting prompt supply.', 'مخازن دوائية معتمدة توفر مخزون أمان محلي وتسليماً فورياً.')}
              </p>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* 3. Partners Grid */}
      <SectionShell label={t('Network', 'الشبكة')} tone="navy" image="/images/deltachem-supply-logistics.jpg">
        <div className="space-y-8">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Strategic Alliances', 'التحالفات والموردون')}
            title={t('Key Sourcing & Logistics Partners', 'شركاؤنا في التوريد والتخزين')}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {suppliers.map((supplier, idx) => {
              const displayName = locale === 'ar' && supplier.name_ar ? supplier.name_ar : supplier.name;
              const displayDesc =
                locale === 'ar' && supplierDescriptionsAr[supplier.id]
                  ? supplierDescriptionsAr[supplier.id]
                  : supplier.description;

              return (
                <Reveal
                  key={supplier.id}
                  delay={idx * 0.05}
                  className="flex flex-col justify-between rounded-3xl border border-white/15 bg-white/10 p-6 text-white backdrop-blur-md"
                >
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-teal-400/40 bg-teal-950/60 px-2.5 py-1 text-xs font-bold text-teal-300">
                        <Globe className="h-3.5 w-3.5" />
                        {supplier.country || t('Partner', 'شريك')}
                      </span>
                      <span className="text-xs font-semibold text-amber-300">
                        {t('Verified', 'معتمد')}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold">{displayName}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-200 sm:text-sm">{displayDesc}</p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-3 text-xs">
                    <span className="text-slate-400">{t('Standard', 'المعيار')}</span>
                    <span className="font-bold text-lime-300">cGMP / GDP</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SectionShell>

      {/* 4. Standards CTA */}
      <SectionShell label={t('Criteria', 'المعايير')} tone="forest" image="/images/bg-cairo-dusk.jpg">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <Reveal className="space-y-5 lg:col-span-6">
            <SectionHeader
              onDark
              eyebrow={t('Supplier Standards', 'معايير الاعتماد')}
              title={t('Principal Onboarding Requirements', 'متطلبات تمثيل المصانع العالمية')}
            />
            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                <span>{t('Valid cGMP accreditation from recognized health authorities.', 'شهادات تصنيع جيد cGMP سارية ومعتمدة.')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                <span>{t('Available DMF, CEP, and batch COA technical dossiers.', 'توافر ملفات DMF وCEP وشهادات التحليل المخبري.')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                <span>{t('Long-term commercial partnership commitment.', 'التزام واضح بالشراكة التجارية طويلة الأمد.')}</span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.12} x={24} y={0} className="lg:col-span-6">
            <div className="rounded-3xl border border-white/20 bg-teal-950/85 p-8 text-white shadow-2xl backdrop-blur-xl">
              <h3 className="text-2xl font-extrabold">
                {t('Propose Agency Partnership', 'طلب تمثيل وشراكة تجارية')}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-200">
                {t(
                  'Looking to distribute pharmaceutical, veterinary, cosmetic, or nutraceutical raw materials in Egypt?',
                  'تواصل مع فريق تطوير الأعمال لمناقشة فرص التمثيل والتوزيع في مصر والشرق الأوسط.'
                )}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/contact">
                  <Button size="lg" variant="teal" className="w-full font-bold">
                    {t('Contact Business Development', 'التواصل مع تطوير الأعمال')}
                  </Button>
                </Link>
                <a href="mailto:sales@deltachem.com.eg">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white/40 font-bold text-white hover:bg-white/10"
                  >
                    sales@deltachem.com.eg
                  </Button>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>
    </>
  );
};
