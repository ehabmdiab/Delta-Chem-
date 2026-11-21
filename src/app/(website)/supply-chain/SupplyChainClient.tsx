'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Warehouse,
  ThermometerSnowflake,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  ExternalLink,
  Activity,
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Reveal } from '@/components/molecules/Reveal';
import { useLanguage } from '@/components/providers/LanguageContext';

export const SupplyChainClient: React.FC = () => {
  const { t } = useLanguage();

  const zones = [
    {
      title: t('Controlled Ambient (CRT)', 'التخزين المكيف (CRT)'),
      range: '15°C – 25°C',
      rh: t('< 60% RH', 'رطوبة < 60%'),
      desc: t(
        'Dedicated zoning for APIs, tablet binders, and standard 25kg raw material drums.',
        'مخصص للمواد الفعالة والسواغات وبراميل وعبوات الخامات القياسية.'
      ),
      icon: Warehouse,
    },
    {
      title: t('Cold Chain Storage', 'سلسلة التبريد المخصصة'),
      range: '2°C – 8°C',
      rh: t('Monitored RH', 'رطوبة مراقبة'),
      desc: t(
        'Validated cold rooms with backup compressors for temperature-sensitive ingredients.',
        'غرف تبريد معتمدة بضواغط احتياطية للخامات الحساسة للحرارة.'
      ),
      icon: ThermometerSnowflake,
    },
    {
      title: t('Low-Humidity Zones', 'مناطق منخفضة الرطوبة'),
      range: t('Controlled', 'مناخ معزول'),
      rh: t('< 45% RH', 'رطوبة < 45%'),
      desc: t(
        'Moisture-protected storage for hygroscopic superdisintegrants and excipients.',
        'تخزين محمي من الرطوبة للمفككات الفائقة والسواغات الحساسة.'
      ),
      icon: ShieldCheck,
    },
  ];

  return (
    <>
      {/* 1. Hero */}
      <SectionShell label={t('Overview', 'نظرة عامة')} tone="navy" image="/images/harvest-warehouse-1.webp">
        <Reveal className="mx-auto max-w-3xl space-y-6 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Harvest Pharma Warehousing', 'مخازن هارفست فارما المعتمدة')}
            title={t('GDP Warehousing & Supply Chain Integrity', 'سلاسل الإمداد والتخزين الدوائي المعتمد')}
            description={t(
              'Through our sister company Harvest Pharma, raw materials are stored in validated climate-controlled facilities and dispatched rapidly across Egypt.',
              'عبر شركتنا الشقيقة هارفست فارما، تُحفظ الخامات في مخازن دوائية معتمدة ومضبوطة الحرارة مع تسليم سريع لمصانع مصر.'
            )}
          />
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/request-a-quote">
              <Button size="lg" variant="teal" className="px-7 font-bold shadow-xl">
                <span>{t('Inquire on Local Stock', 'استفسار عن المخزون المحلي')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
            <a href="https://www.harvestpharma-eg.com" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 px-7 font-bold text-white backdrop-blur-md hover:bg-white/10"
              >
                <span>{t('Visit Harvest Pharma', 'موقع هارفست فارما')}</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </Reveal>
      </SectionShell>

      {/* 2. Real Warehouse Gallery + Infrastructure */}
      <SectionShell label={t('Facilities', 'المخازن الواقعية')} tone="light">
        <div className="space-y-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <Reveal className="space-y-5 lg:col-span-7">
              <div className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2">
                <Image
                  src="/images/logo-harvest-pharma.png"
                  alt="Harvest Pharma"
                  width={557}
                  height={525}
                  className="h-10 w-auto object-contain"
                />
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  {t('Official Warehousing Partner', 'الشريك اللوجستي الرسمي')}
                </span>
              </div>

              <SectionHeader
                eyebrow={t('Real Facility Infrastructure', 'الصور الحية لمخازن هارفست فارما')}
                title={t('Harvest Pharma: Validated Pharmaceutical Storage', 'مخازن هارفست فارما المجهزة بالكامل')}
                description={t(
                  'High-capacity pallet racking, continuous digital telemetry, and strict quarantine segregation under EDA guidelines.',
                  'أرفف تخزين عالية السعة، مراقبة رقمية مستمرة للحرارة والرطوبة، وفصل تام لمناطق الحجر والإفراج.'
                )}
              />

              <ul className="grid grid-cols-1 gap-3 pt-1 text-sm text-slate-700 sm:grid-cols-2">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-600" />
                  <span>{t('Licensed by Egyptian Drug Authority', 'مرخصة من هيئة الدواء المصرية')}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-600" />
                  <span>{t('24/7 Calibrated Thermal Sensors', 'مجسات حرارة معايرة تعمل ٢٤/٧')}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-600" />
                  <span>{t('Backup Diesel Generators', 'مولدات كهربائية احتياطية مزدوجة')}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-600" />
                  <span>{t('Barcoded WMS Batch Tracking', 'نظام تتبع بالباركود WMS للتشغيلات')}</span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.12} x={24} y={0} className="lg:col-span-5">
              <div className="rounded-3xl border border-teal-200 bg-teal-50 p-7 shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                    {t('Facility Specifications', 'مواصفات التشغيل والرقابة')}
                  </span>
                  <Activity className="h-5 w-5 text-teal-600" />
                </div>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-teal-200/80 pb-2">
                    <dt className="text-slate-600">{t('Compliance Standard', 'معيار التشغيل')}</dt>
                    <dd className="font-extrabold text-slate-900">GDP & ISO 9001</dd>
                  </div>
                  <div className="flex justify-between border-b border-teal-200/80 pb-2">
                    <dt className="text-slate-600">{t('Racking System', 'نظام التخزين')}</dt>
                    <dd className="font-extrabold text-slate-900">{t('Multi-Tier Pallet Racks', 'أرفف صناعية متعددة المستويات')}</dd>
                  </div>
                  <div className="flex justify-between border-b border-teal-200/80 pb-2">
                    <dt className="text-slate-600">{t('Security', 'الأمن والمراقبة')}</dt>
                    <dd className="font-extrabold text-slate-900">{t('24/7 CCTV & Access Control', 'مراقبة وأنظمة دخول ٢٤/٧')}</dd>
                  </div>
                  <div className="flex justify-between pt-1">
                    <dt className="text-slate-600">{t('Traceability', 'التتبع')}</dt>
                    <dd className="font-extrabold text-teal-700">{t('Lot-Level WMS Control', 'تتبع دقيق لكل تشغيلة')}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>

          {/* Two Real Harvest Pharma Photos Side by Side */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/harvest-warehouse-1.webp"
                  alt={t('Harvest Pharma Storage Aisles', 'مخازن هارفست فارما — الممرات والأرفف')}
                  fill
                  sizes="(min-width:768px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-sm font-bold text-slate-800">
                {t('High-Bay Racking & Storage Aisles — Harvest Pharma', 'أرفف وممرات التخزين الرئيسية — مخازن هارفست فارما')}
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/harvest-warehouse-2.jpg"
                  alt={t('Harvest Pharma Pallet Staging Area', 'منطقة تجهيز واستلام الباليتات — هارفست فارما')}
                  fill
                  sizes="(min-width:768px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-sm font-bold text-slate-800">
                {t('Pallet Staging & Dispatch Bay — Harvest Pharma', 'منطقة تجهيز وشحن الباليتات — مخازن هارفست فارما')}
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* 3. Climate Zones */}
      <SectionShell label={t('Climate Zones', 'مناطق التخزين')} tone="tint">
        <div className="space-y-8">
          <SectionHeader
            align="center"
            eyebrow={t('Multi-Zone Storage', 'تخزين متعدد المناطق')}
            title={t('Engineered Storage Climates', 'بيئات تخزين مضبوطة لكل خامة')}
            description={t(
              'Strict separation across ambient, cold-chain, and low-humidity compartments.',
              'فصل مناخي كامل بين الغرف المكيفة وغرف التبريد ومناطق الرطوبة المنخفضة.'
            )}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {zones.map((zone, idx) => {
              const Icon = zone.icon;
              return (
                <Reveal
                  key={idx}
                  delay={idx * 0.06}
                  className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xs transition hover:border-teal-500"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">{zone.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-md border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700">
                      {zone.range}
                    </span>
                    <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {zone.rh}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{zone.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SectionShell>

      {/* 4. Distribution Fleet */}
      <SectionShell label={t('Distribution', 'التوزيع والشحن')} tone="forest" image="/images/deltachem-supply-logistics.jpg">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <Reveal className="space-y-5 lg:col-span-6">
            <SectionHeader
              onDark
              eyebrow={t('Domestic Logistics', 'أسطول التوزيع المحلي')}
              title={t('24–48 Hour Delivery Across Egypt', 'توصيل خلال ٢٤ – ٤٨ ساعة لجميع المصانع')}
              description={t(
                'Dedicated temperature-monitored transport connecting our storage hubs with industrial cities.',
                'نقل مضبوط الحرارة يربط مستودعاتنا بكبرى المدن والمناطق الصناعية في مصر.'
              )}
            />

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <div>
                  <h4 className="text-sm font-bold">{t('Same-Day Greater Cairo Dispatch', 'شحن في نفس اليوم للقاهرة الكبرى')}</h4>
                  <p className="mt-0.5 text-xs text-slate-200">
                    {t('Prompt supply to Obour, Badr, and nearby plants.', 'توريد عاجل للعبور وبدر والمناطق المحيطة.')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur">
                <Truck className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />
                <div>
                  <h4 className="text-sm font-bold">{t('Insulated Cold-Chain Vans', 'سيارات نقل مجهزة ومبردة')}</h4>
                  <p className="mt-0.5 text-xs text-slate-200">
                    {t('USB temperature data loggers on every shipment.', 'أجهزة تسجيل حرارة رقمية مع كل شحنة.')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-lime-300" />
                <div>
                  <h4 className="text-sm font-bold">{t('All Industrial Zones', 'تغطية كافة المناطق الصناعية')}</h4>
                  <p className="mt-0.5 text-xs text-slate-200">
                    {t('10th of Ramadan, 6th of October, Sadat City & Alexandria.', 'العاشر من رمضان، السادس من أكتوبر، السادات والإسكندرية.')}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} x={24} y={0} className="lg:col-span-6">
            <div className="rounded-3xl border border-white/20 bg-teal-950/85 p-8 text-white shadow-2xl backdrop-blur-xl">
              <h3 className="text-2xl font-extrabold">
                {t('Reserve Dedicated Buffer Stock', 'تخصيص مخزون أمان لمصنعكم')}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                {t(
                  'Secure guaranteed stock held at Harvest Pharma with scheduled call-offs tailored to your production plan.',
                  'احجز كميات مضمونة بمخازن هارفست فارما مع السحب المرن حسب جدول إنتاج مصنعكم.'
                )}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/request-a-quote">
                  <Button size="lg" variant="teal" className="w-full font-bold">
                    {t('Request Buffer Stock Quote', 'طلب عرض مخزون استراتيجي')}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white/40 font-bold text-white hover:bg-white/10"
                  >
                    {t('Contact Logistics Team', 'تواصل مع فريق الإمداد')}
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>
    </>
  );
};
