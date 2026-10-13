'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Reveal } from '@/components/molecules/Reveal';
import { LiveStatsCounter } from '@/components/molecules/LiveStatsCounter';
import { LiveIngredientTicker } from '@/components/molecules/LiveIngredientTicker';
import { Button } from '@/components/atoms/Button';
import { useLanguage } from '@/components/providers/LanguageContext';

/** Slide 2 — "About us" + live credentials, Arshine style. */
export const HomeAbout: React.FC = () => {
  const { t } = useLanguage();

  const points: [string, string][] = [
    ['Authorized commission agency for global synthesis principals', 'وكالة تجارية معتمدة للمصانع العالمية'],
    ['Audit-ready COA, DMF & MSDS dossiers for EDA registration', 'ملفات COA وDMF وMSDS جاهزة لتسجيل هيئة الدواء'],
    ['Local Cairo buffer stock via sister company Harvest Pharma', 'مخزون محلي بالقاهرة عبر شركة هارفست فارما'],
  ];

  return (
    <SectionShell label="About" tone="light" image="/images/about-qc-lab.jpg">
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
        <Reveal className="space-y-4 lg:col-span-7">
          <SectionHeader
            eyebrow={t('About DELTACHEM', 'عن دلتا كيم')}
            title={t(
              'Egypt’s bridge between global chemistry and local formulation',
              'جسر مصر بين الكيمياء العالمية والتصنيع المحلي'
            )}
            description={t(
              'For over 20 years DELTACHEM has supplied pharmaceutical, nutraceutical, veterinary and cosmeceutical manufacturers with certified raw materials — backed by rigorous quality governance and compliant GDP warehousing in Cairo.',
              'منذ أكثر من ٢٠ عاماً توفر دلتا كيم مواد خام معتمدة لمصنعي الأدوية والمكملات والبيطرة ومستحضرات التجميل، مدعومة بحوكمة جودة صارمة وتخزين معتمد في القاهرة.'
            )}
          />
          <ul className="space-y-2.5">
            {points.map(([en, ar]) => (
              <li key={en} className="flex items-start gap-3 text-base font-medium text-slate-800 lg:text-lg">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
                <span>{t(en, ar)}</span>
              </li>
            ))}
          </ul>
          <Link href="/about" className="inline-block pt-0.5">
            <Button variant="teal" size="lg" className="px-7 font-bold">
              <span>{t('Discover Our Story', 'اكتشف قصتنا')}</span>
              <ArrowRight className="h-5 w-5 rtl:rotate-180" />
            </Button>
          </Link>
        </Reveal>

        <Reveal delay={0.15} x={30} y={0} className="hidden lg:col-span-5 lg:block">
          <div className="relative aspect-[16/10] max-h-[320px] overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
            <Image
              src="/images/about-qc-lab.jpg"
              alt={t('DELTACHEM quality control laboratory', 'مختبر مراقبة الجودة')}
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-teal-950/90 to-transparent p-4 text-white">
              <p className="text-sm font-extrabold uppercase tracking-widest text-lime-300">cGMP · USP · BP · EP</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-5 space-y-3 lg:mt-6">
        <LiveStatsCounter />
        <div className="overflow-hidden rounded-xl">
          <LiveIngredientTicker />
        </div>
      </div>
    </SectionShell>
  );
};
