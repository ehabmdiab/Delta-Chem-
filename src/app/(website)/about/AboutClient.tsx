'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Award,
  ShieldCheck,
  Globe2,
  CheckCircle2,
  FileCheck,
  ArrowRight,
  TrendingUp,
  FlaskConical,
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Reveal } from '@/components/molecules/Reveal';
import { SITE_CONFIG } from '@/config/site';
import { useLanguage } from '@/components/providers/LanguageContext';

export const AboutClient: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* 1. Hero */}
      <SectionShell label="Profile" tone="forest" image="/images/deltachem-supply-logistics.jpg">
        <Reveal className="mx-auto max-w-3xl space-y-6 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Corporate Profile', 'الملف التعريفي للشركة')}
            title={t('Importing & Supplying Certified Raw Materials', 'استيراد وتوريد الخامات الدوائية المعتمدة')}
            description={t(
              'DELTACHEM links international raw-material manufacturers with pharmaceutical, veterinary, cosmetic, and nutraceutical factories across Egypt.',
              'تربط دلتا كيم المصانع العالمية بمصانع الأدوية البشرية والبيطرية ومستحضرات التجميل والمكملات الغذائية في مصر.'
            )}
          />
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/products">
              <Button size="lg" variant="teal" className="px-7 font-bold shadow-xl">
                <span>{t('Browse Product List', 'استعراض قائمة الخامات')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
            <Link href="/quality-regulatory">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 px-7 font-bold text-white backdrop-blur-md hover:bg-white/10"
              >
                {t('Quality & Regulatory', 'الجودة والتسجيل')}
              </Button>
            </Link>
          </div>
        </Reveal>
      </SectionShell>

      {/* 2. Leadership */}
      <SectionShell label="Leadership" tone="light">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="rounded-3xl border border-teal-200 bg-teal-50 p-7 shadow-md sm:p-9">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md">
                <Award className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                {t('Dr. Abdelhamid Aboelaly', 'د. عبدالحميد أبو العلي')}
              </h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-teal-700">
                {t('Founder & Managing Director', 'المؤسس والمدير العام')}
              </p>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                  <span>{t('20+ years in pharmaceutical raw materials supply', 'خبرة تتجاوز ٢٠ عاماً في توريد الخامات الدوائية')}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                  <span>{t('MBA in International Business Management', 'ماجستير إدارة الأعمال الدولية (MBA)')}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                  <span>{t('PhD in Quality Management Systems', 'درجة الدكتوراه في نظم إدارة الجودة')}</span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12} x={24} y={0} className="space-y-6 lg:col-span-7">
            <SectionHeader
              eyebrow={t('Executive Governance', 'القيادة والحوكمة')}
              title={t('Built on Quality Management & Technical Trust', 'تأسست على معايير الجودة والثقة الفنية')}
              description={t(
                'We act as a trusted partner and authorized agent, supporting EDA filings, technical dossiers, and reliable factory supply.',
                'نعمل كشريك موثوق ووكيل معتمد لدعم ملفات التسجيل بهيئة الدواء وتأمين احتياجات المصانع بانتظام.'
              )}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <FlaskConical className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h4 className="font-extrabold text-slate-900">{t('Verified Monographs', 'مطابقة المواصفات')}</h4>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {t('Strict verification against USP, BP, EP, and CPV standards.', 'التحقق الدقيق من مطابقة دساتير الأدوية العالمية.')}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h4 className="font-extrabold text-slate-900">{t('Regulatory Support', 'الدعم التنظيمي')}</h4>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {t('Complete DMF Open Parts, COAs, and safety dossiers.', 'توفير ملفات DMF وشهادات التحليل وبيانات السلامة.')}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* 3. Sister Company: Harvest Pharma */}
      <SectionShell label="Harvest Pharma" tone="navy" image="/images/harvest-warehouse-2.jpg">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <Reveal className="space-y-5 lg:col-span-8">
            <SectionHeader
              onDark
              eyebrow={t('Warehousing Synergy', 'التكامل اللوجستي والتخزين')}
              title={t('Sister Company Alliance: Harvest Pharma', 'التحالف الاستراتيجي مع الشقيقة هارفست فارما')}
              description={t(
                'Harvest Pharma provides licensed, temperature-controlled pharmaceutical warehousing for local buffer stock and fast dispatch.',
                'توفر شركتنا الشقيقة هارفست فارما مخازن دوائية مرخصة ومراقبة الحرارة لتوفير مخزون محلي جاهز للتسليم الفوري.'
              )}
            />
            <div className="flex flex-wrap gap-3 pt-1 text-sm text-slate-200">
              <span className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 backdrop-blur">
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                {t('GDP-Compliant Facility', 'مخازن مطابقة لمعايير GDP')}
              </span>
              <span className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 backdrop-blur">
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                {t('2°C–8°C Cold Chain & Ambient', 'تخزين مبرد ٢-٨° م ومكيف')}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.12} x={24} y={0} className="lg:col-span-4">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-7 text-center text-white backdrop-blur-xl">
              <div className="mx-auto mb-4 inline-block rounded-2xl bg-white p-3 shadow-md">
                <Image
                  src="/images/logo-harvest-pharma.png"
                  alt="Harvest Pharma"
                  width={557}
                  height={525}
                  className="h-16 w-16 object-contain"
                />
              </div>
              <h4 className="text-xl font-extrabold">Harvest Pharma</h4>
              <p className="mt-1.5 text-xs text-slate-300">
                {t('Licensed Pharmaceutical Warehousing', 'تخزين دوائي مرخص ولوجستيات مبردة')}
              </p>
              <Link href="/supply-chain" className="mt-5 inline-block">
                <Button variant="teal" size="md" className="font-bold">
                  <span>{t('Inspect Warehouses', 'معاينة المخازن')}</span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* 4. Principles */}
      <SectionShell label="Principles" tone="tint">
        <div className="space-y-8">
          <SectionHeader
            align="center"
            eyebrow={t('Core Values', 'مبادئ العمل')}
            title={t('Engineered for Supply Reliability', 'موثوقية كاملة في التوريد والجودة')}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Reveal delay={0.05} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                {t('Certified Quality', 'جودة معتمدة')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t('Partnering exclusively with audited WHO, EU-GMP, and international manufacturers.', 'توريد مباشر من مصانع معتمدة دولياً ومطابقة لدساتير الأدوية.')}
              </p>
            </Reveal>

            <Reveal delay={0.12} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                <FileCheck className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                {t('Full Documentation', 'توثيق كامل')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t('Complete COA, MSDS, and DMF dossiers to support registration workflows.', 'توفير ملفات التسجيل وشهادات التحليل المخبري لكل تشغيلة.')}
              </p>
            </Reveal>

            <Reveal delay={0.18} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                <TrendingUp className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                {t('Continuous Stock', 'استمرارية الإمداد')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t('Buffer inventory at Harvest Pharma shielding production plants from delays.', 'مخزون أمان بمخازن هارفست فارما لضمان انتظام الإنتاج.')}
              </p>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* 5. Head Office & Presence */}
      <SectionShell label="Head Office" tone="light">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <Reveal className="space-y-5 lg:col-span-6">
            <SectionHeader
              eyebrow={t('National Coverage', 'التغطية الجغرافية')}
              title={t('Serving Industrial Zones Across Egypt', 'خدمة جميع المناطق الصناعية في مصر')}
              description={t(
                'From our Cairo Head Office to Egypt’s major pharmaceutical and manufacturing hubs.',
                'من مقرنا الرئيسي بالقاهرة نغطي كافة المدن والمناطق الصناعية الدوائية في مصر.'
              )}
            />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="font-extrabold text-teal-900">{t('Greater Cairo', 'القاهرة الكبرى')}</h4>
                <p className="mt-1 text-xs text-slate-600">{t('Obour, Badr City, Gesr El-Suez', 'العبور، بدر، جسر السويس')}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="font-extrabold text-teal-900">{t('10th of Ramadan', 'العاشر من رمضان')}</h4>
                <p className="mt-1 text-xs text-slate-600">{t('Pharmaceutical industrial parks', 'المناطق الصناعية الدوائية')}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="font-extrabold text-teal-900">{t('6th of October', 'السادس من أكتوبر')}</h4>
                <p className="mt-1 text-xs text-slate-600">{t('Industrial zones 1 – 6', 'المناطق الصناعية ١ – ٦')}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="font-extrabold text-teal-900">{t('Alexandria & Delta', 'الإسكندرية والدلتا')}</h4>
                <p className="mt-1 text-xs text-slate-600">{t('Borg El-Arab, Sadat City', 'برج العرب، مدينة السادات')}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} x={24} y={0} className="lg:col-span-6">
            <div className="rounded-3xl border border-teal-100 bg-teal-50 p-7 shadow-sm sm:p-9">
              <div className="mb-4 flex items-center gap-3">
                <Globe2 className="h-6 w-6 text-teal-700" aria-hidden="true" />
                <h3 className="text-lg font-extrabold text-slate-900">
                  {t('Cairo Head Office', 'المقر الرئيسي بالقاهرة')}
                </h3>
              </div>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="font-bold text-slate-500">{t('Address', 'العنوان')}</dt>
                  <dd className="mt-0.5 font-bold text-slate-900">
                    {t(SITE_CONFIG.contact.address, SITE_CONFIG.contact.address_ar)}
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-500">{t('Landlines', 'الأرضي')}</dt>
                  <dd className="mt-0.5 font-mono font-bold text-slate-900">
                    {SITE_CONFIG.contact.phone} / {SITE_CONFIG.contact.phoneSecondary}
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-500">{t('Mobile & WhatsApp', 'الموبايل والواتساب')}</dt>
                  <dd className="mt-0.5 font-mono font-bold text-slate-900">
                    {SITE_CONFIG.contact.mobiles.map((m) => m.display).join(' / ')}
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-500">{t('Email', 'البريد الإلكتروني')}</dt>
                  <dd className="mt-0.5 font-bold text-teal-700">{SITE_CONFIG.contact.salesEmail}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* 6. CTA */}
      <SectionShell label="Partner" tone="forest" image="/images/bg-cairo-dusk.jpg">
        <Reveal className="mx-auto max-w-3xl space-y-6 py-4 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Commercial Desk', 'التعاقدات والمبيعات')}
            title={t('Partner with DELTACHEM Today', 'ابدأ شراكتك مع دلتا كيم')}
            description={t(
              'Request a quotation for any of our four raw material sectors or discuss agency representation.',
              'اطلب تسعيراً فورياً لأي من قطاعات الخامات الأربعة أو ناقش فرص التمثيل التجاري.'
            )}
          />
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/request-a-quote">
              <Button size="lg" variant="teal" className="px-8 font-extrabold shadow-xl">
                {t('Request a Quote', 'إرسال طلب تسعير')}
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
