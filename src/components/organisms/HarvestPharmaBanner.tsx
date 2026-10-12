'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { useLanguage } from '@/components/providers/LanguageContext';
import { Warehouse, ShieldCheck, ThermometerSnowflake, Truck, ExternalLink } from 'lucide-react';

export const HarvestPharmaBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden border-y border-slate-800">
      <div className="absolute right-0 top-0 w-1/3 h-full bg-teal-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950 border border-teal-800 text-teal-300 text-xs font-semibold">
              <Warehouse className="w-3.5 h-3.5 text-teal-400" />
              <span>{t('Sister-Company Healthcare Logistics Infrastructure', 'البنية التحتية اللوجستية للشركة الشقيقة')}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t(
                'Harvest Pharma: GDP-Compliant Warehousing & Climate-Controlled Distribution',
                'هارفست فارما: مستودعات معتمدة وفق معايير التوزيع الجيد (GDP) وتخزين مبرد'
              )}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              {t(
                "DELTACHEM's warehousing and local inventory operations are managed by its sister company, Harvest Pharma (Cairo). Featuring pharmaceutical-grade ambient and 2°C - 8°C cold-chain storage facilities, continuous computerized temperature mapping, and strict regulatory adherence to Egyptian Drug Authority (EDA) guidelines.",
                'تتم إدارة العمليات اللوجستية ومخزون دلتا كيم في القاهرة من خلال شركتنا الشقيقة هارفست فارما. توفر مستودعاتنا ظروف تخزين بيئية مبردة (٢ - ٨ مئوية) ومراقبة مستمرة لدرجات الحرارة والرطوبة وفق متطلبات هيئة الدواء المصرية.'
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                <ThermometerSnowflake className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <strong className="block text-white">{t('Cold Chain', 'سلسلة التبريد')}</strong>
                  <span className="text-[11px] text-slate-400">{t('2°C to 8°C controlled', 'مراقبة على مدار الساعة')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <strong className="block text-white">{t('GDP Standard', 'معايير GDP')}</strong>
                  <span className="text-[11px] text-slate-400">{t('Good Distribution Practices', 'ممارسات التوزيع الجيد')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                <Truck className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <strong className="block text-white">{t('Rapid Dispatch', 'تسليم سريع')}</strong>
                  <span className="text-[11px] text-slate-400">{t('Immediate Egypt coverage', 'تغطية فورية للمصانع')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <Link href="/supply-chain" className="w-full">
              <Button variant="teal" size="lg" className="w-full font-semibold">
                {t('Explore Supply Chain Details', 'تفاصيل سلاسل الإمداد والتخزين')}
              </Button>
            </Link>
            <a
              href="https://www.harvestpharma-eg.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white"
                rightIcon={<ExternalLink className="w-4 h-4" />}
              >
                {t('Visit Harvest Pharma', 'زيارة موقع هارفست فارما')}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
