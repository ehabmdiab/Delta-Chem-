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
      'الشركة الشقيقة والشريك اللوجستي الرئيسي الذي يوفر مستودعات صيدلانية معتمدة ومضبوطة الحرارة وفق ممارسات GDP بالقاهرة.',
    'sup-global-apis':
      'منشآت تصنيع وتخليق دوائي حاصلة على شهادات GMP الأوروبية والدولية للمواد الفعالة والسواغ المتطور.',
    'sup-euroderma':
      'مكونات تجميلية نشطة متخصصة، وفلاتر حماية من الأشعة فوق البنفسجية، وبوليمرات لإعادة بناء حاجز البشرة.',
  };

  return (
    <>
      {/* 1. Hero */}
      <SectionShell label={t('Overview', 'نظرة عامة')} tone="forest" image="/images/bg-chem-powder.jpg">
        <Reveal className="mx-auto max-w-4xl space-y-6 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('International Alliance Network', 'شبكة التحالفات والشراكات الدولية')}
            title={t(
              'Connecting Global Chemistry with the Egyptian Market',
              'ربط الصناعات الكيميائية والدوائية العالمية بالسوق المصري'
            )}
            description={t(
              'DELTACHEM serves as the strategic gateway for world-class chemical and API manufacturers seeking trusted, compliant, and volume-driven representation across Egypt and the MENA region.',
              'تمثل دلتا كيم البوابة الاستراتيجية لكبرى مصانع المواد الكيميائية والفعالة العالمية الراغبة في تمثيل موثوق ومعتمد وعالي الكفاءة في مصر والشرق الأوسط.'
            )}
          />
          <div className="flex flex-wrap justify-center gap-4 pt-3">
            <Link href="/contact">
              <Button size="lg" variant="teal" className="px-8 font-bold shadow-xl shadow-teal-950/60">
                <span>{t('Partner with DELTACHEM', 'كن شريكاً لدلتا كيم')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 px-7 font-bold text-white backdrop-blur-md hover:bg-white/10"
              >
                {t('View Current Portfolio', 'عرض المحفظة الحالية')}
              </Button>
            </Link>
          </div>
        </Reveal>
      </SectionShell>

      {/* 2. Value Proposition */}
      <SectionShell label={t('Advantages', 'المزايا')} tone="light">
        <div className="space-y-6">
          <SectionHeader
            align="center"
            eyebrow={t('Principal Value Proposition', 'القيمة المضافة للموردين والشركات العالمية')}
            title={t('Why Global Producers Choose DELTACHEM', 'لماذا يختار المصنعون العالميون دلتا كيم؟')}
            description={t(
              'Entering the Egyptian pharmaceutical market requires nuanced regulatory acumen, active technical marketing and reliable local infrastructure.',
              'يتطلب دخول سوق الدواء المصري خبرة تنظيمية دقيقة، وتسويقاً فنياً فعالاً، وبنية تحتية لوجستية محلية راسخة.'
            )}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Reveal delay={0.08} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {t('Direct Factory Access', 'الوصول المباشر للمصانع المصرية')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t(
                  'Direct commercial relationships with 150+ licensed pharmaceutical manufacturers, generic drug formulators and cosmeceutical laboratories across Egypt.',
                  'علاقات تجارية وفنية مباشرة مع أكثر من 150 مصنع دواء مرخص ومعامل مستحضرات تجميل ومكملات غذائية في جمهورية مصر العربية.'
                )}
              </p>
            </Reveal>

            <Reveal delay={0.16} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                <FileCheck2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {t('EDA Regulatory Liaison', 'تمثيل وتسجيل بهيئة الدواء المصرية (EDA)')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t(
                  'In-house regulatory specialists manage the entire registration lifecycle with the Egyptian Drug Authority (EDA), from CTD Module 3 to factory GMP inspection approval.',
                  'فريق متخصص في الشؤون التنظيمية يدير دورة التسجيل بالكامل لدى هيئة الدواء المصرية من ملفات CTD Module 3 حتى اعتماد زيارات تفتيش cGMP للمصنع.'
                )}
              </p>
            </Reveal>

            <Reveal delay={0.24} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                <Warehouse className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {t('Local Warehousing Power', 'قوة التخزين والتوزيع المحلي')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t(
                  'Sister company Harvest Pharma provides GDP-compliant, climate-controlled warehousing in Cairo, enabling local consignment and emergency buffer stock.',
                  'توفر شركتنا الشقيقة هارفست فارما مستودعات معتمدة ومطابقة لممارسات التوزيع الجيد (GDP) في القاهرة تتيح تخزين البضائع أمانة وتوفير مخزون طوارئ فوري.'
                )}
              </p>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* 3. Global Principals Network */}
      <SectionShell label={t('Network', 'شبكة الشركاء')} tone="navy" image="/images/bg-molecules.jpg">
        <div className="space-y-6">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Represented Manufacturers', 'المصانع والشركات العالمية الممثلة')}
            title={t('Global Sourcing & Synthesis Partners', 'شركاء التخليق والتوريد الدوليون')}
            description={t(
              'We collaborate with certified manufacturers across major global chemical manufacturing corridors.',
              'نتعاون مع مصانع معتمدة وموثوقة عبر كبرى المراكز الصناعية الكيميائية العالمية.'
            )}
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {suppliers.map((supplier, idx) => {
              const displayName = (locale === 'ar' && supplier.name_ar) ? supplier.name_ar : supplier.name;
              const displayDesc = (locale === 'ar' && supplierDescriptionsAr[supplier.id])
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
                        {supplier.country || t('Global Partner', 'شريك دولي')}
                      </span>
                      <span className="text-xs font-semibold text-amber-300">
                        {t('Verified Principal', 'مورد عالمي معتمد')}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold">{displayName}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300">{displayDesc}</p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-3 text-xs">
                    <span className="text-slate-400">{t('Quality Standard', 'معيار الجودة')}</span>
                    <span className="font-bold text-lime-300">
                      {t('EU-GMP / US-FDA Compliant', 'مطابق لمعايير EU-GMP / US-FDA')}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SectionShell>

      {/* 4. Standards & Proposal CTA */}
      <SectionShell label={t('Criteria', 'المعايير')} tone="forest" image="/images/bg-cairo-dusk.jpg">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <Reveal className="space-y-5 lg:col-span-6">
            <SectionHeader
              onDark
              eyebrow={t('Principal Qualification', 'معايير تأهيل المصنعين والموردين')}
              title={t('Our Standards for Global Representation', 'معاييرنا للتمثيل التجاري العالمي')}
              description={t(
                'To protect our pharmaceutical customers in Egypt, DELTACHEM adheres to strict onboarding standards for new chemical and active ingredient suppliers.',
                'حماية لعملائنا من مصنعي الأدوية في مصر، تلتزم دلتا كيم بمعايير تأهيل واعتماد صارمة لموردي المواد الفعالة والكيميائية الجدد.'
              )}
            />

            <ul className="space-y-3 pt-2 text-sm text-slate-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                <span>
                  {t(
                    'Documented cGMP accreditation from recognized international health authorities.',
                    'شهادات اعتماد وتصنيع جيد cGMP موثقة من سلطات صحية دولية معترف بها.'
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                <span>
                  {t(
                    'Availability of CTD Module 3 dossiers, open-part DMFs, or EDQM CEP certificates.',
                    'توافر ملفات CTD Module 3، وملفات DMF المفتوحة، أو شهادات CEP من الهيئة الأوروبية.'
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                <span>
                  {t(
                    'Willingness to support Egyptian Drug Authority inspection visits if required.',
                    'الاستعداد لدعم وتنسيق زيارات التفتيش الميداني لهيئة الدواء المصرية عند طلبها.'
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                <span>
                  {t(
                    'Commitment to commercial transparency and long-term exclusive representation.',
                    'الالتزام بالشفافية التجارية التامة والشراكات الحصرية طويلة الأجل.'
                  )}
                </span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.15} x={30} y={0} className="lg:col-span-6">
            <div className="rounded-3xl border border-white/20 bg-teal-950/85 p-8 text-white shadow-2xl backdrop-blur-xl sm:p-10">
              <h3 className="text-2xl font-extrabold">
                {t('Inquire About Agency Representation', 'طلب تمثيل تجاري ووكالة حصرية')}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                {t(
                  'Are you an API, excipient, or specialty chemical producer looking to expand your footprint in Egypt and the MENA region? Contact our business development team.',
                  'هل أنت منتج للمواد الفعالة أو السواغ أو الكيماويات المتخصصة وترغب في التوسع بالسوق المصري والشرق الأوسط؟ تواصل مع فريق تطوير الأعمال لدينا.'
                )}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/contact">
                  <Button size="lg" variant="teal" className="w-full font-bold shadow-lg">
                    {t('Submit Principal Proposal', 'تقديم عرض تمثيل وشراكة')}
                  </Button>
                </Link>
                <a href="mailto:sales@deltachem.com.eg">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white/40 font-bold text-white hover:bg-white/10"
                  >
                    {t('Email Business Development Directly', 'مراسلة إدارة تطوير الأعمال مباشرة')}
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
