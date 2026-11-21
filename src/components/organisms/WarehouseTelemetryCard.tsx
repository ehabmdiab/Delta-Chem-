'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { Button } from '@/components/atoms/Button';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Reveal } from '@/components/molecules/Reveal';
import { useLanguage } from '@/components/providers/LanguageContext';
import { SPRING_SNAPPY, SPRING_SMOOTH, CROSSFADE_REDUCED } from '@/lib/motion';
import { ThermometerSnowflake, Sun, CheckCircle2, ArrowRight } from 'lucide-react';

interface Zone {
  name: string;
  name_ar: string;
  transit: string;
  transit_ar: string;
  note: string;
  note_ar: string;
}

const ZONES: Record<string, Zone> = {
  ramadan: {
    name: '10th of Ramadan City',
    name_ar: 'مدينة العاشر من رمضان',
    transit: 'Same-Day / 24h',
    transit_ar: 'نفس اليوم / ٢٤ ساعة',
    note: 'Daily scheduled routes to pharmaceutical manufacturing parks.',
    note_ar: 'خطوط نقل يومية منتظمة لمصانع الأدوية بالمنطقة الصناعية.',
  },
  october: {
    name: '6th of October City',
    name_ar: 'مدينة السادس من أكتوبر',
    transit: '24 Hours SLA',
    transit_ar: 'خلال ٢٤ ساعة',
    note: 'Climate-monitored trucks directly to factory receiving bays.',
    note_ar: 'سيارات مجهزة ومراقبة الحرارة مباشرة لاستلام المصانع.',
  },
  obour: {
    name: 'Obour & Badr Cities',
    name_ar: 'مدينتا العبور وبدر',
    transit: 'Prompt 12h',
    transit_ar: 'خلال ١٢ ساعة',
    note: 'Rapid buffer-stock replenishment to prevent line downtime.',
    note_ar: 'توريد عاجل من المخزون المحلي لضمان استمرارية الإنتاج.',
  },
  alexandria: {
    name: 'Alexandria & Borg El-Arab',
    name_ar: 'الإسكندرية وبرج العرب',
    transit: '24 – 48 Hours',
    transit_ar: '٢٤ – ٤٨ ساعة',
    note: 'Insulated transport with thermal logging for coastal plants.',
    note_ar: 'نقل معزول حرارياً مع أجهزة تسجيل رقمي للمصانع الساحلية.',
  },
};

export const WarehouseTelemetryCard: React.FC = () => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [selectedZone, setSelectedZone] = useState<string>('ramadan');
  const zone = ZONES[selectedZone];

  const facilityPoints: [string, string][] = [
    ['EDA & GDP Audited Facilities', 'مخازن معتمدة وفق معايير التوزيع الجيد GDP'],
    ['24/7 Digital Climate Logging', 'رقابة إلكترونية مستمرة للحرارة والرطوبة'],
    ['Backup Power Generators', 'مولدات طوارئ احتياطية متكاملة'],
    ['Dedicated Quarantine & WMS', 'نظام تتبع بالباركود ومناطق حجر مستقلة'],
  ];

  return (
    <SectionShell label="Warehousing" tone="dark" image="/images/harvest-warehouse-1.webp">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <Reveal className="space-y-6 lg:col-span-6">
          <div className="inline-flex items-center gap-3 rounded-xl bg-white px-3.5 py-2 shadow-md">
            <Image
              src="/images/logo-harvest-pharma.png"
              alt="Harvest Pharma"
              width={557}
              height={525}
              className="h-9 w-auto object-contain"
            />
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 rtl:normal-case rtl:tracking-normal">
              {t('Sister Company Logistics', 'شريك التخزين واللوجستيات')}
            </span>
          </div>

          <SectionHeader
            onDark
            eyebrow={t('Harvest Pharma Warehouses', 'مخازن هارفست فارما')}
            title={t('Real GDP Warehousing & Cold Chain', 'مخازن هارفست فارما المعتمدة')}
            description={t(
              'Our sister company Harvest Pharma operates modern pharmaceutical warehouses ensuring strict climate stability for every imported batch.',
              'تدير شركتنا الشقيقة هارفست فارما مخازن دوائية حديثة ومعتمدة لحفظ جميع الخامات تحت ظروف مناخية مثالية.'
            )}
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-teal-400/40 bg-slate-950/85 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-400 rtl:normal-case rtl:tracking-normal">
                  <ThermometerSnowflake className="h-4 w-4" aria-hidden="true" />
                  {t('Cold Storage', 'التخزين المبرد')}
                </span>
                <span className="rounded border border-teal-700 bg-teal-950 px-2 py-0.5 font-mono text-xs text-teal-300">
                  2–8°C
                </span>
              </div>
              <div className="mt-2 font-mono text-3xl font-extrabold text-white">+4.1°C</div>
            </div>
            <div className="rounded-2xl border border-amber-400/40 bg-slate-950/85 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 rtl:normal-case rtl:tracking-normal">
                  <Sun className="h-4 w-4" aria-hidden="true" />
                  {t('Controlled Ambient', 'التخزين المكيف')}
                </span>
                <span className="rounded border border-amber-700 bg-amber-950 px-2 py-0.5 font-mono text-xs text-amber-300">
                  15–25°C
                </span>
              </div>
              <div className="mt-2 font-mono text-3xl font-extrabold text-white">+21.4°C</div>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-2.5 text-sm text-slate-200 sm:grid-cols-2">
            {facilityPoints.map(([en, ar]) => (
              <li key={en} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-400" aria-hidden="true" />
                <span>{t(en, ar)}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12} x={20} y={0} className="space-y-5 lg:col-span-6">
          <div className="overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
            <div className="relative aspect-[16/9]">
              <Image
                src="/images/harvest-warehouse-2.jpg"
                alt={t('Harvest Pharma Warehouse Facility', 'مخازن شركة هارفست فارما')}
                fill
                sizes="(min-width:1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-4 rounded-3xl bg-white p-6 text-slate-900 shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <h3 className="text-base font-extrabold">
                {t('Industrial Zone Delivery SLAs', 'مواعيد التوصيل للمناطق الصناعية')}
              </h3>
              <span className="text-xs font-bold text-teal-700">
                {t('Harvest Pharma Hub', 'مخازن هارفست فارما')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {Object.entries(ZONES).map(([key, z]) => {
                const isSelected = selectedZone === key;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedZone(key)}
                    className={`relative min-h-[42px] cursor-pointer rounded-xl border px-3 py-2 text-left text-xs font-bold transition-colors active:scale-[0.98] rtl:text-right sm:text-sm ${
                      isSelected
                        ? 'border-teal-600 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-teal-500'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="zone-tab-pill"
                        transition={reduceMotion ? CROSSFADE_REDUCED : SPRING_SNAPPY}
                        aria-hidden="true"
                        className="absolute inset-0 rounded-[11px] bg-teal-600 shadow-sm"
                      />
                    )}
                    <span className="relative z-10 block truncate">{t(z.name, z.name_ar)}</span>
                  </button>
                );
              })}
            </div>

            <motion.div
              key={selectedZone}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? CROSSFADE_REDUCED : SPRING_SMOOTH}
              className="space-y-1.5 rounded-2xl border border-teal-100 bg-teal-50 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-extrabold">{t(zone.name, zone.name_ar)}</h4>
                <span className="rounded border border-teal-200 bg-white px-2.5 py-0.5 font-mono text-xs font-bold text-teal-700">
                  {t(zone.transit, zone.transit_ar)}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-700 sm:text-sm">
                {t(zone.note, zone.note_ar)}
              </p>
            </motion.div>

            <Link href="/supply-chain" className="block">
              <Button variant="teal" size="md" className="w-full font-bold">
                <span>{t('Inspect Harvest Pharma Warehouses', 'تفاصيل مخازن هارفست فارما')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
};
