'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/atoms/Button';
import { useLanguage } from '@/components/providers/LanguageContext';
import { ShieldCheck, ThermometerSnowflake, Truck, ExternalLink } from 'lucide-react';

export const HarvestPharmaBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden border-y border-slate-800 bg-slate-900 py-16 text-white">
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            <div className="inline-flex items-center gap-3 rounded-xl bg-white px-3.5 py-2 shadow-sm">
              <Image
                src="/images/logo-harvest-pharma.png"
                alt="Harvest Pharma"
                width={557}
                height={525}
                className="h-9 w-auto object-contain"
              />
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                {t('Sister Company Logistics', 'شريك التخزين المعتمد')}
              </span>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {t(
                'Harvest Pharma: GDP-Compliant Warehousing & Cold Chain',
                'هارفست فارما: مخازن دوائية معتمدة وفق معايير GDP'
              )}
            </h2>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
              {t(
                'Managed by our sister company Harvest Pharma with 2°C–8°C cold chain, ambient zones, and 24/7 digital monitoring.',
                'مخازن دوائية مجهزة بأنظمة تبريد (٢ - ٨°م) وتخزين مكيف ورقابة رقمية على مدار الساعة.'
              )}
            </p>

            <div className="grid grid-cols-1 gap-3 pt-2 text-xs text-slate-300 sm:grid-cols-3">
              <div className="flex items-center gap-2.5 rounded-lg border border-slate-700/60 bg-slate-800/80 p-3">
                <ThermometerSnowflake className="h-5 w-5 shrink-0 text-teal-400" />
                <div>
                  <strong className="block text-white">{t('Cold Chain', 'سلسلة التبريد')}</strong>
                  <span className="text-slate-400">2°C – 8°C</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg border border-slate-700/60 bg-slate-800/80 p-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-teal-400" />
                <div>
                  <strong className="block text-white">{t('GDP Certified', 'معايير GDP')}</strong>
                  <span className="text-slate-400">{t('EDA Compliant', 'معتمد رقابياً')}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg border border-slate-700/60 bg-slate-800/80 p-3">
                <Truck className="h-5 w-5 shrink-0 text-teal-400" />
                <div>
                  <strong className="block text-white">{t('Fast Dispatch', 'توصيل سريع')}</strong>
                  <span className="text-slate-400">{t('Egypt Industrial Zones', 'كافة المناطق الصناعية')}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/supply-chain">
                <Button variant="teal" size="md" className="font-semibold">
                  {t('Explore Warehouses', 'معاينة المخازن')}
                </Button>
              </Link>
              <a href="https://www.harvestpharma-eg.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="md"
                  className="border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white"
                  rightIcon={<ExternalLink className="h-4 w-4" />}
                >
                  {t('Visit Harvest Pharma', 'موقع هارفست فارما')}
                </Button>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-700 shadow-2xl">
              <Image
                src="/images/harvest-warehouse-2.jpg"
                alt={t('Harvest Pharma Warehouse', 'مخازن هارفست فارما')}
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
