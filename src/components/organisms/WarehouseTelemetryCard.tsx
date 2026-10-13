'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Reveal } from '@/components/molecules/Reveal';
import { useLanguage } from '@/components/providers/LanguageContext';
import { ThermometerSnowflake, Sun, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';

interface Zone {
  name: string;
  name_ar: string;
  transit: string;
  transit_ar: string;
  distance: string;
  distance_ar: string;
  note: string;
  note_ar: string;
}

const ZONES: Record<string, Zone> = {
  ramadan: {
    name: '10th of Ramadan City',
    name_ar: 'مدينة العاشر من رمضان',
    transit: 'Same-Day / 24 Hours',
    transit_ar: 'نفس اليوم / خلال ٢٤ ساعة',
    distance: '55 km from Cairo Hub',
    distance_ar: '٥٥ كم من مستودع القاهرة',
    note: 'Dedicated daily transport routes to major Egyptian pharmaceutical industrial parks.',
    note_ar: 'خطوط نقل يومية منتظمة لمصانع الأدوية الكبرى بالمنطقة الصناعية.',
  },
  october: {
    name: '6th of October City',
    name_ar: 'مدينة السادس من أكتوبر',
    transit: '24 Hours SLA',
    transit_ar: 'تسليم خلال ٢٤ ساعة',
    distance: '48 km from Cairo Hub',
    distance_ar: '٤٨ كم من مستودع القاهرة',
    note: 'Climate-monitored refrigerated van delivery directly to GMP formulation quarantine bays.',
    note_ar: 'توصيل مبرد وسيارات مكيفة مباشرة لمنطقة استلام المواد الخام بالمصانع.',
  },
  obour: {
    name: 'Obour & Badr Cities',
    name_ar: 'مدينتا العبور وبدر',
    transit: 'Prompt 12 Hours',
    transit_ar: 'تسليم عاجل خلال ١٢ ساعة',
    distance: '22 km from Cairo Hub',
    distance_ar: '٢٢ كم من مستودع القاهرة',
    note: 'Immediate emergency raw material replenishment to prevent line stoppages.',
    note_ar: 'إمداد فوري طارئ للمواد الخام لتجنب أي توقف لخطوط الإنتاج.',
  },
  alexandria: {
    name: 'Alexandria & Borg El-Arab',
    name_ar: 'الإسكندرية وبرج العرب',
    transit: '24 – 48 Hours',
    transit_ar: 'خلال ٢٤ إلى ٤٨ ساعة',
    distance: '215 km via Desert Rd',
    distance_ar: '٢١٥ كم عبر طريق مصر الإسكندرية الصحراوي',
    note: 'Validated temperature-logger insulated transport to coastal pharmaceutical clusters.',
    note_ar: 'نقل معزول حرارياً مع تسجيل رقمي للحرارة لمصانع الأدوية الساحلية.',
  },
};

/** Slide 6 — Harvest Pharma GDP hub, climate telemetry + zone transit explorer. */
export const WarehouseTelemetryCard: React.FC = () => {
  const { t } = useLanguage();
  const [selectedZone, setSelectedZone] = useState<string>('ramadan');
  const zone = ZONES[selectedZone];

  const facilityPoints: [string, string][] = [
    ['EDA Audit-Approved Facility', 'منشأة معتمدة لتدقيق هيئة الدواء'],
    ['Dual Diesel Backup Generators', 'مولدات ديزل احتياطية مزدوجة'],
    ['Epoxy Sanitary Sealed Floors', 'أرضيات إيبوكسي صحية معزولة'],
    ['Calibrated Sensors Active 24/7', 'مجسات معايرة تعمل ٢٤/٧'],
  ];

  return (
    <SectionShell label="Cairo Hub" tone="dark" image="/images/pharma-warehouse-coldchain.jpg">
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-12">
        <Reveal className="space-y-5 lg:col-span-6">
          <SectionHeader
            onDark
            eyebrow={t('Strategic Warehousing', 'التخزين الاستراتيجي')}
            title={t('Harvest Pharma Cairo GDP Storage Hub', 'مركز تخزين هارفست فارما المعتمد بالقاهرة')}
            description={t(
              'DELTACHEM operates in unified synergy with sister company Harvest Pharma. Raw materials are held in audited pharmaceutical conditions with continuous temperature and humidity validation.',
              'تعمل دلتا كيم بتكامل مع شقيقتها هارفست فارما. تُحفظ المواد الخام في ظروف دوائية مدققة مع رصد مستمر للحرارة والرطوبة.'
            )}
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-teal-400/40 bg-slate-950/70 p-4 backdrop-blur">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-400">
                  <ThermometerSnowflake className="h-4 w-4" aria-hidden="true" />
                  {t('Cold Storage Bay', 'غرفة التبريد')}
                </span>
                <span className="rounded border border-teal-700 bg-teal-950 px-2 py-0.5 font-mono text-xs text-teal-300">
                  2–8°C
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-mono text-4xl font-extrabold text-white">+4.1°C</span>
                <span className="text-xs font-bold text-lime-300">{t('Optimal', 'مثالي')}</span>
              </div>
              <p className="mt-2 border-t border-white/10 pt-2 text-xs text-slate-300">
                44% RH · Logger CS-04B
              </p>
            </div>
            <div className="rounded-2xl border border-amber-400/40 bg-slate-950/70 p-4 backdrop-blur">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Sun className="h-4 w-4" aria-hidden="true" />
                  {t('Controlled Ambient', 'تخزين محيطي مضبوط')}
                </span>
                <span className="rounded border border-amber-700 bg-amber-950 px-2 py-0.5 font-mono text-xs text-amber-300">
                  15–25°C
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-mono text-4xl font-extrabold text-white">+21.4°C</span>
                <span className="text-xs font-bold text-lime-300">{t('Optimal', 'مثالي')}</span>
              </div>
              <p className="mt-2 border-t border-white/10 pt-2 text-xs text-slate-300">
                41% RH · Logger AM-12A
              </p>
            </div>
          </div>

          <ul className="hidden gap-x-6 gap-y-2 text-sm text-slate-200 sm:grid sm:grid-cols-2">
            {facilityPoints.map(([en, ar]) => (
              <li key={en} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-400" aria-hidden="true" />
                {t(en, ar)}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15} x={30} y={0} className="lg:col-span-6">
          <div className="space-y-4 rounded-3xl bg-white p-6 text-slate-900 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <h3 className="text-lg font-extrabold">{t('Industrial Zone Transit Times', 'أزمنة التوصيل للمناطق الصناعية')}</h3>
              <span className="text-xs font-bold text-teal-700">{t('From Gesr El-Suez', 'من جسر السويس')}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {Object.entries(ZONES).map(([key, z]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={selectedZone === key}
                  onClick={() => setSelectedZone(key)}
                  className={`min-h-[44px] cursor-pointer rounded-xl border p-2.5 text-left rtl:text-right text-sm font-bold transition-all ${
                    selectedZone === key
                      ? 'border-teal-600 bg-teal-600 text-white shadow-md'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-teal-500'
                  }`}
                >
                  <span className="block truncate">{t(z.name, z.name_ar)}</span>
                </button>
              ))}
            </div>

            <div className="space-y-2 rounded-2xl border border-teal-100 bg-teal-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-base font-extrabold">{t(zone.name, zone.name_ar)}</h4>
                <span className="rounded border border-teal-200 bg-white px-2 py-0.5 font-mono text-xs font-bold text-teal-700">
                  {t(zone.transit, zone.transit_ar)}
                </span>
              </div>
              <p className="flex items-center gap-1.5 font-mono text-xs text-slate-600">
                <MapPin className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" />
                {t(zone.distance, zone.distance_ar)}
              </p>
              <p className="text-sm leading-relaxed text-slate-700">{t(zone.note, zone.note_ar)}</p>
            </div>

            <Link href="/supply-chain" className="block">
              <Button variant="teal" size="md" className="w-full font-bold">
                <span>{t('Explore Warehousing & Supply Chain', 'استكشف التخزين وسلسلة الإمداد')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
};
