'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { RfqModal } from '@/components/molecules/RfqModal';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { useLanguage } from '@/components/providers/LanguageContext';
import { Pill, ShieldCheck, Sparkles, HeartPulse, ArrowRight } from 'lucide-react';

interface SectorCardData {
  id: string;
  titleEn: string;
  titleAr: string;
  slug: string;
  descEn: string;
  descAr: string;
  standards: string;
  Icon: React.ComponentType<{ className?: string }>;
  samples: { name: string; standard: string; packing: string }[];
}

const SECTORS: SectorCardData[] = [
  {
    id: 'human',
    titleEn: 'Human Pharmaceutical Raw Materials',
    titleAr: 'الخامات البشرية',
    slug: 'human-raw-materials',
    descEn: 'Antibiotics, analgesics, anthelmintics, and pharmacopoeial excipients for human formulations.',
    descAr: 'مضادات حيوية ومسكنات ومضادات ديدان وسواغات دوائية معتمدة لتصنيع الأدوية البشرية.',
    standards: 'USP • BP • EP',
    Icon: Pill,
    samples: [
      { name: 'Amoxicillin Trihydrate', standard: 'USP / BP / EP', packing: '25KG/DRUM' },
      { name: 'Paracetamol', standard: 'BP2010', packing: '25KG/DRUM' },
      { name: 'Azithromycin Dihydrate', standard: 'USP35/32/26', packing: '25KG/DRUM' },
      { name: 'MCC PH 101 / PH 200', standard: 'BP/USP/FCC/EP', packing: '25KG/DRUM or BAG' },
    ],
  },
  {
    id: 'veterinary',
    titleEn: 'Veterinary Raw Materials',
    titleAr: 'الخامات البيطرية',
    slug: 'veterinary-raw-materials',
    descEn: 'Veterinary antibiotics, quinolones, sulphonamides, anthelmintics, and feed-grade vitamins.',
    descAr: 'مضادات حيوية بيطرية وكينولون وسلفوناميدات وفيتامينات أعلاف لقطاع الصحة الحيوانية.',
    standards: 'BPV • CPV • EP',
    Icon: ShieldCheck,
    samples: [
      { name: 'Tylosin Tartrate', standard: 'BPV2010', packing: '15KG/CTN or 20KG/DRUM' },
      { name: 'Enrofloxacin Base', standard: 'CPV2010/USP34', packing: '25KG/DRUM' },
      { name: 'Florfenicol', standard: 'CPV2010', packing: '25KG/DRUM' },
      { name: 'Oxytetracycline Base / HCL', standard: 'BP/USP/EP', packing: '25KG/DRUM' },
    ],
  },
  {
    id: 'cosmetics',
    titleEn: 'Cosmetics Raw Materials',
    titleAr: 'خامات مستحضرات التجميل',
    slug: 'cosmetics-raw-materials',
    descEn: 'Carbomers, UV blocking agents, surfactants, lanolin, emollients, and cosmetic preservatives.',
    descAr: 'كاربومير وفلاتر أشعة الشمس ومستحلبات ولانولين ومرطبات ومواد حافظة تجميلية.',
    standards: 'USP • BP • EP',
    Icon: Sparkles,
    samples: [
      { name: 'Carbomer 940 / 934', standard: 'USP/BP/EP', packing: '25KG/DRUM or BAG' },
      { name: 'Octyl Methoxycinnamate', standard: 'IP/BP/USP', packing: 'Standard Pack' },
      { name: 'Dexpanthenol (Vitamin B5)', standard: 'USP34', packing: '15KG/PLASTIC DRUM' },
      { name: 'PEG 200–6000 / Tween 80', standard: 'IP/BP/USP', packing: '230/215 KG/DRUM' },
    ],
  },
  {
    id: 'nutraceutical',
    titleEn: 'Nutraceutical Raw Materials',
    titleAr: 'خامات المكملات الغذائية',
    slug: 'nutraceutical-raw-materials',
    descEn: 'Vitamins, gluconates, nutritional minerals, and food-grade sweeteners for supplements.',
    descAr: 'فيتامينات وجلوكونات ومعادن غذائية ومحليات معتمدة لصناعة المكملات الغذائية.',
    standards: 'USP • FCC • EP',
    Icon: HeartPulse,
    samples: [
      { name: 'Ascorbic Acid (Vitamin C)', standard: 'BP/USP/EP/FCC', packing: '25KG/CARTON' },
      { name: 'Vitamin D3 (100k–40M IU)', standard: 'Food/Pharma', packing: '25KG/CTN or DRUM' },
      { name: 'Ferrous / Calcium Gluconate', standard: 'BP/USP/FCC/EP', packing: '25KG/DRUM or BAG' },
      { name: 'Sucralose / Acesulfame K', standard: 'BP/USP/FCC/EP', packing: '25KG/DRUM or BAG' },
    ],
  },
];

export const ArshineProductCarousel: React.FC = () => {
  const { t } = useLanguage();
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);

  return (
    <SectionShell label="Sectors" tone="forest" image="/images/deltachem-raw-drums.jpg">
      <div className="space-y-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            onDark
            eyebrow={t('Official Product List', 'قائمة الخامات المعتمدة')}
            title={t('Four Core Raw Material Sectors', 'القطاعات الأربعة للخامات الدوائية')}
            description={t(
              'Explore verified raw materials organized across our four specialized industrial divisions.',
              'استكشف محفظة خاماتنا الفعلية المصنفة بدقة ضمن أربعة قطاعات متخصصة.'
            )}
          />
          <Link href="/products" className="shrink-0">
            <Button variant="teal" size="lg" className="px-6 font-bold">
              <span>{t('Browse All Products', 'عرض الدليل الكامل')}</span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SECTORS.map((sector) => (
            <article
              key={sector.id}
              className="group flex flex-col justify-between gap-5 rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-md transition-all duration-200 hover:border-teal-400 hover:bg-white/15 sm:p-7"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-400/20 text-teal-300 transition group-hover:bg-teal-400 group-hover:text-teal-950">
                    <sector.Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
                    {sector.standards}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-white">
                    {t(sector.titleEn, sector.titleAr)}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-200">
                    {t(sector.descEn, sector.descAr)}
                  </p>
                </div>

                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {sector.samples.map((item) => (
                    <li
                      key={item.name}
                      className="rounded-xl border border-white/10 bg-teal-950/60 p-2.5 text-xs"
                    >
                      <span className="block truncate font-bold text-white">{item.name}</span>
                      <span className="mt-0.5 block truncate font-mono text-[11px] text-teal-300">
                        {item.standard} · {item.packing}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-white/15 pt-4">
                <Button
                  variant="teal"
                  size="sm"
                  onClick={() => {
                    setSelectedDivision(t(sector.titleEn, sector.titleAr));
                    setIsRfqOpen(true);
                  }}
                  className="min-h-[42px] px-4 text-sm font-bold"
                >
                  {t('Request RFQ', 'طلب تسعير')}
                </Button>
                <Link
                  href={`/divisions/${sector.slug}`}
                  className="inline-flex min-h-[42px] items-center gap-1.5 text-sm font-bold text-white transition hover:text-teal-300"
                >
                  <span>{t('View Sector List', 'عرض خامات القطاع')}</span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <RfqModal
        isOpen={isRfqOpen}
        onClose={() => {
          setIsRfqOpen(false);
          setSelectedDivision(null);
        }}
        prefilledProduct={selectedDivision ? { name: selectedDivision } : undefined}
      />
    </SectionShell>
  );
};
