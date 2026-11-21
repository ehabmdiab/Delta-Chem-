'use client';

import React from 'react';
import Link from 'next/link';
import {
  Pill,
  Sparkles,
  HeartPulse,
  Syringe,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Reveal } from '@/components/molecules/Reveal';
import { useLanguage } from '@/components/providers/LanguageContext';

export const IndustriesClient: React.FC = () => {
  const { t } = useLanguage();

  const sectors = [
    {
      id: 'human',
      label: t('Human', 'البشرية'),
      tone: 'light' as const,
      title: t('Human Pharmaceutical Raw Materials', 'الخامات البشرية'),
      tagline: t('APIs & Functional Excipients', 'مواد فعالة وسواغات دوائية'),
      desc: t(
        'Antibiotics, anti-inflammatory drugs, anthelmintics, and pharmaceutical excipients in standard 25kg drums and bags.',
        'مضادات حيوية ومسكنات ومضادات ديدان وسواغات دوائية مطابقة لدساتير الأدوية العالمية.'
      ),
      icon: Pill,
      badge: t('Sector 01', 'القطاع الأول'),
      items: [
        t('Amoxicillin Trihydrate & Clavulanate', 'أموكسيسيلين ثلاثي الهيدرات وكلافولانات'),
        t('Paracetamol, Ibuprofen & Diclofenac', 'باراسيتامول، إيبوبروفين وديكلوفيناك'),
        t('MCC PH 101/200, HPMC & Povidone Series', 'سليلوز دقيق التبلور، HPMC وبوفيدون'),
        t('Starch, Dextrose, Mannitol & Lactose', 'نشا، دكستروز، مانيتول ولاكتوز'),
      ],
      filterSlug: 'human-raw-materials',
    },
    {
      id: 'veterinary',
      label: t('Veterinary', 'البيطرية'),
      tone: 'tint' as const,
      title: t('Veterinary Raw Materials', 'الخامات البيطرية'),
      tagline: t('Animal Health APIs & Feed Vitamins', 'خامات الأدوية البيطرية وإضافات الأعلاف'),
      desc: t(
        'Veterinary antibiotics, quinolones, sulphonamides, and anthelmintics formulated for poultry, livestock, and aquaculture.',
        'مضادات حيوية بيطرية وكينولون وسلفوناميدات ومضادات طفيليات وفيتامينات أعلاف.'
      ),
      icon: Syringe,
      badge: t('Sector 02', 'القطاع الثاني'),
      items: [
        t('Tylosin Tartrate, Tylosin Phosphate & Tiamulin', 'تيلوزين طرطرات، فوسفات وتيامولين'),
        t('Enrofloxacin, Florfenicol & Oxytetracycline', 'إنروفلوكساسين، فلورفينيكول وأوكسي تتراسيكلين'),
        t('Sulphadimidine, Sulphaquinoxaline & Diaveridine', 'سلفاديميدين، سلفاكوينوكسالين وديافيريدين'),
        t('Fenbendazole, Triclabendazole & Ivermectin', 'فينبيندازول، تريكلابيندازول وإيفرمكتين'),
      ],
      filterSlug: 'veterinary-raw-materials',
    },
    {
      id: 'cosmetics',
      label: t('Cosmetics', 'التجميل'),
      tone: 'navy' as const,
      image: '/images/deltachem-supply-logistics.jpg',
      title: t('Cosmetics Raw Materials', 'خامات مستحضرات التجميل'),
      tagline: t('Carbomers, UV Filters & Cosmetic Bases', 'كاربومير وفلاتر شمس وقواعد تجميلية'),
      desc: t(
        'Specialty thickeners, UV blocking agents, surfactants, lanolin series, emollients, and cosmetic preservatives.',
        'كاربومير وفلاتر الأشعة فوق البنفسجية ومستحلبات ولانولين ومرطبات ومواد حافظة تجميلية.'
      ),
      icon: Sparkles,
      badge: t('Sector 03', 'القطاع الثالث'),
      items: [
        t('Carbomer 940, 934, 934P & 940P', 'كاربومير 940 و934 و934P و940P'),
        t('Octyl Methoxycinnamate & Benzophenone 3', 'أوكتيل ميثوكسي سينامات وبنزوفينون 3'),
        t('PEG Series, Tween 80/60/20, CAPB & SLES', 'بولي إيثيلين جليكول، توين، CAPB وتيكسابون'),
        t('Lanoline, Cetostearyl Alcohol & Dexpanthenol', 'لانولين، كحول سيتوستيريل وديكسبانثينول'),
      ],
      filterSlug: 'cosmetics-raw-materials',
    },
    {
      id: 'nutraceutical',
      label: t('Nutraceuticals', 'المكملات الغذائية'),
      tone: 'light' as const,
      title: t('Nutraceutical Raw Materials', 'خامات المكملات الغذائية'),
      tagline: t('Vitamins, Gluconates & Nutritional Minerals', 'فيتامينات وجلوكونات ومعادن غذائية'),
      desc: t(
        'Full spectrum of vitamins, gluconate salts, food-grade minerals, and high-intensity sweeteners.',
        'تشكيلة متكاملة من الفيتامينات والجلوكونات والمعادن الغذائية والمحليات المعتمدة.'
      ),
      icon: HeartPulse,
      badge: t('Sector 04', 'القطاع الرابع'),
      items: [
        t('Ascorbic Acid (Vitamin C) — All Grades', 'فيتامين C (حمض الأسكوربيك) بجميع الدرجات'),
        t('Vitamins A, D3, B1, B2, B6, B12 & Folic Acid', 'فيتامينات A وD3 ومجموعة B وحمض الفوليك'),
        t('Ferrous, Calcium, Potassium & Sodium Gluconates', 'جلوكونات الحديد والكالسيوم والبوتاسيوم والصوديوم'),
        t('Sucralose, Acesulfame K, Aspartame & Zinc Sulphate', 'سكرالوز، أسيسلفام K، أسبارتام وكبريتات الزنك'),
      ],
      filterSlug: 'nutraceutical-raw-materials',
    },
  ];

  return (
    <>
      {/* 1. Hero */}
      <SectionShell label={t('Overview', 'نظرة عامة')} tone="forest" image="/images/deltachem-raw-drums.jpg">
        <Reveal className="mx-auto max-w-3xl space-y-6 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Four Industrial Sectors', 'القطاعات الأربعة الرئيسية')}
            title={t('Specialized Raw Materials Across Four Sectors', 'خامات متخصصة عبر أربعة قطاعات صناعية')}
            description={t(
              'Explore DELTACHEM’s product portfolio organized across Human, Veterinary, Cosmetics, and Nutraceutical manufacturing.',
              'تصفح خامات دلتا كيم المعتمدة لقطاعات: الخامات البشرية، البيطرية، مستحضرات التجميل، والمكملات الغذائية.'
            )}
          />
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/products">
              <Button size="lg" variant="teal" className="px-7 font-bold shadow-xl">
                <span>{t('Browse Full List', 'عرض القائمة الكاملة')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
            <Link href="/request-a-quote">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 px-7 font-bold text-white backdrop-blur-md hover:bg-white/10"
              >
                {t('Request a Quote', 'طلب تسعير')}
              </Button>
            </Link>
          </div>
        </Reveal>
      </SectionShell>

      {/* 2 to 5: Each of the 4 sectors */}
      {sectors.map((sec) => {
        const Icon = sec.icon;
        const isDark = sec.tone === 'navy';
        return (
          <SectionShell key={sec.id} id={sec.id} label={sec.label} tone={sec.tone} image={sec.image}>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <Reveal className="space-y-5 lg:col-span-7">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      isDark ? 'bg-teal-400/20 text-teal-400' : 'bg-teal-50 text-teal-700'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                      isDark
                        ? 'border border-amber-400/50 bg-amber-500/10 text-amber-300'
                        : 'border border-teal-200 bg-teal-50 text-teal-700'
                    }`}
                  >
                    {sec.badge}
                  </span>
                </div>

                <SectionHeader
                  onDark={isDark}
                  eyebrow={sec.tagline}
                  title={sec.title}
                  description={sec.desc}
                />

                <ul className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
                  {sec.items.map((item, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-2 text-sm ${isDark ? 'text-slate-200' : 'text-slate-700'}`}
                    >
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 shrink-0 ${isDark ? 'text-teal-400' : 'text-teal-600'}`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1} x={24} y={0} className="lg:col-span-5">
                <div
                  className={`rounded-3xl p-7 text-center shadow-md sm:p-9 ${
                    isDark
                      ? 'border border-white/20 bg-white/10 text-white backdrop-blur-xl'
                      : 'border border-teal-200 bg-teal-50/70 text-slate-900'
                  }`}
                >
                  <h4 className="text-xl font-extrabold">{sec.title}</h4>
                  <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {t('View standards, packing options, and submit RFQ.', 'استعراض المواصفات والعبوات وطلب التسعير.')}
                  </p>
                  <div className="mt-6 space-y-3">
                    <Link href={`/divisions/${sec.filterSlug}`} className="block">
                      <Button variant="teal" size="md" className="w-full justify-between font-bold">
                        <span>{t('View Sector Catalog', 'عرض خامات القطاع')}</span>
                        <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                      </Button>
                    </Link>
                    <Link href="/request-a-quote" className="block">
                      <Button
                        variant="outline"
                        size="md"
                        className={`w-full font-bold ${
                          isDark
                            ? 'border-white/40 text-white hover:bg-white/10'
                            : 'border-slate-300 text-slate-800 hover:bg-white'
                        }`}
                      >
                        {t('Request Custom Quote', 'طلب عرض سعر')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </SectionShell>
        );
      })}
    </>
  );
};
