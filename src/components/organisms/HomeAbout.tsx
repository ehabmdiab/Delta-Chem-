'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Reveal } from '@/components/molecules/Reveal';
import { LiveStatsCounter } from '@/components/molecules/LiveStatsCounter';
import { Button } from '@/components/atoms/Button';
import { useLanguage } from '@/components/providers/LanguageContext';

export const HomeAbout: React.FC = () => {
  const { t } = useLanguage();

  const points: [string, string][] = [
    ['Direct import of pharmaceutical raw materials in sealed drums & bags', 'استيراد وتوريد الخامات في براميل وعبوات قياسية معتمدة'],
    ['Complete COA, MSDS & DMF documentation for every shipment', 'توفير شهادات التحليل (COA) وملفات التسجيل مع كل شحنة'],
    ['GDP-compliant warehousing via sister company Harvest Pharma', 'تخزين دوائي معتمد عبر شركتنا الشقيقة هارفست فارما'],
  ];

  return (
    <SectionShell label="About" tone="light">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="space-y-5 lg:col-span-7">
          <SectionHeader
            eyebrow={t('About DELTACHEM', 'عن دلتا كيم')}
            title={t(
              'Trusted Raw Materials Supply Chain in Egypt & MENA',
              'شريكك الموثوق في استيراد وتوريد الخامات الدوائية'
            )}
            description={t(
              'For over 20 years, DELTACHEM has imported and distributed certified raw materials for human, veterinary, cosmetic, and nutraceutical manufacturers.',
              'على مدار أكثر من ٢٠ عاماً، تورد دلتا كيم الخامات المعتمدة لمصانع الأدوية البشرية والبيطرية ومستحضرات التجميل والمكملات الغذائية.'
            )}
          />
          <ul className="space-y-3">
            {points.map(([en, ar]) => (
              <li key={en} className="flex items-start gap-3 text-sm font-medium text-slate-800 sm:text-base">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
                <span>{t(en, ar)}</span>
              </li>
            ))}
          </ul>
          <Link href="/about" className="inline-block pt-2">
            <Button variant="teal" size="lg" className="px-7 font-bold">
              <span>{t('About DELTACHEM', 'تعرف على الشركة')}</span>
              <ArrowRight className="h-5 w-5 rtl:rotate-180" />
            </Button>
          </Link>
        </Reveal>

        <Reveal delay={0.12} x={24} y={0} className="lg:col-span-5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
            <Image
              src="/images/deltachem-raw-drums.jpg"
              alt={t('Standard 25kg pharmaceutical raw material drums', 'براميل وعبوات المواد الخام القياسية')}
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-teal-950/90 to-transparent p-5 text-white">
              <p className="text-xs font-extrabold uppercase tracking-widest text-lime-300">
                USP · BP · EP · CPV · FCC
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-12">
        <LiveStatsCounter />
      </div>
    </SectionShell>
  );
};
