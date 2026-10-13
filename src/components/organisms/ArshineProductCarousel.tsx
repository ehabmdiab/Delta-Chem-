'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/atoms/Button';
import { RfqModal } from '@/components/molecules/RfqModal';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { useLanguage } from '@/components/providers/LanguageContext';
import {
  ChevronLeft,
  ChevronRight,
  Pill,
  FlaskConical,
  Sparkles,
  ShieldCheck,
  Globe2,
  ArrowRight,
} from 'lucide-react';

interface CarouselDivision {
  id: string;
  categoryName: string;
  categoryNameAr: string;
  slug: string;
  tagline: string;
  taglineAr: string;
  standards: string;
  description: string;
  descriptionAr: string;
  Icon: React.ComponentType<{ className?: string }>;
  chemicals: { name: string; cas: string; grade: string }[];
}

const CAROUSEL_DIVISIONS: CarouselDivision[] = [
  {
    id: 'apis',
    categoryName: 'Active Pharmaceutical Ingredients (APIs)',
    categoryNameAr: 'المواد الفعالة الدوائية (APIs)',
    slug: 'pharmaceutical-apis',
    tagline: 'High-Potency & Bulk Therapeutic Actives',
    taglineAr: 'مواد علاجية فعالة وعالية النقاوة',
    standards: 'USP • BP • Ph.Eur',
    description:
      'Human active substances for antibiotic, cardiovascular, antidiabetic and analgesic dosage forms — backed by DMF files and EDA registration clearance.',
    descriptionAr:
      'مواد فعالة بشرية للمضادات الحيوية وأمراض القلب والسكري والمسكنات، مدعومة بملفات DMF واعتمادات هيئة الدواء.',
    Icon: Pill,
    chemicals: [
      { name: 'Amoxicillin Trihydrate', cas: '61336-70-7', grade: 'Compacted' },
      { name: 'Metformin HCl', cas: '1115-70-4', grade: 'Direct Compression' },
      { name: 'Paracetamol / APAP', cas: '103-90-2', grade: 'DC 90%' },
      { name: 'Pregabalin', cas: '148553-50-8', grade: 'EP / USP' },
    ],
  },
  {
    id: 'excipients',
    categoryName: 'Pharmaceutical Excipients',
    categoryNameAr: 'السواغات الدوائية',
    slug: 'pharmaceutical-excipients',
    tagline: 'Binders, Superdisintegrants & Solubilizers',
    taglineAr: 'روابط ومفككات فائقة ومحسنات ذوبان',
    standards: 'Ph.Eur • USP-NF • JP',
    description:
      'Functional polymers and binders ensuring fast disintegration, superior tablet hardness and optimal dissolution kinetics for high-speed tableting.',
    descriptionAr:
      'بوليمرات وظيفية ومواد رابطة تضمن التفكك السريع وصلابة الأقراص ومعدلات ذوبان مثالية لخطوط الإنتاج السريعة.',
    Icon: FlaskConical,
    chemicals: [
      { name: 'Microcrystalline Cellulose', cas: '9004-34-6', grade: 'PH-101 / 102' },
      { name: 'Povidone (PVP)', cas: '9003-39-8', grade: 'K30 / K90' },
      { name: 'Croscarmellose Sodium', cas: '74811-65-7', grade: 'Superdisintegrant' },
      { name: 'Magnesium Stearate', cas: '557-04-0', grade: 'Vegetable' },
    ],
  },
  {
    id: 'nutraceuticals',
    categoryName: 'Nutraceuticals & Dietary Actives',
    categoryNameAr: 'المكملات الغذائية والمواد النشطة',
    slug: 'nutraceutical-ingredients',
    tagline: 'Vitamins, Bio-Minerals & Fortification',
    taglineAr: 'فيتامينات ومعادن نشطة ومغذيات حيوية',
    standards: 'USP-NF • FCC • Halal',
    description:
      'Bio-available raw materials for immunity tablets, effervescents and functional syrups — tested for heavy metals, microbial limits and residual solvents.',
    descriptionAr:
      'مواد خام عالية الامتصاص لأقراص المناعة والفوارات والشراب، مفحوصة للمعادن الثقيلة والحدود الميكروبية والمذيبات المتبقية.',
    Icon: Sparkles,
    chemicals: [
      { name: 'Niacinamide (B3)', cas: '98-92-0', grade: 'Pharma / Food' },
      { name: 'Ascorbic Acid (C)', cas: '50-81-7', grade: 'Coated & Plain' },
      { name: 'Zinc Gluconate', cas: '4468-02-4', grade: 'High Bioavailability' },
      { name: 'Glucosamine Sulfate', cas: '38899-05-7', grade: 'Joint Health' },
    ],
  },
  {
    id: 'veterinary',
    categoryName: 'Veterinary Actives & Premixes',
    categoryNameAr: 'المواد البيطرية والخلطات',
    slug: 'veterinary-ingredients',
    tagline: 'Animal Health Antibacterials & Premixes',
    taglineAr: 'مضادات حيوية وإضافات أعلاف للثروة الحيوانية',
    standards: 'BP(Vet) • EP Vet • cGMP',
    description:
      'Veterinary actives for poultry, livestock and aquaculture — broad-spectrum coverage, water solubility and feed stability.',
    descriptionAr:
      'مواد فعالة بيطرية للدواجن والماشية والاستزراع السمكي — كفاءة واسعة المدى وذوبانية عالية وثبات بالأعلاف.',
    Icon: ShieldCheck,
    chemicals: [
      { name: 'Tylosin Tartrate', cas: '1405-54-5', grade: 'Granular' },
      { name: 'Doxycycline Hyclate', cas: '24390-14-5', grade: 'Poultry & Cattle' },
      { name: 'Colistin Sulfate', cas: '1264-72-8', grade: 'GI Tract Active' },
      { name: 'Ivermectin', cas: '70288-86-7', grade: 'Micronized' },
    ],
  },
  {
    id: 'cosmeceuticals',
    categoryName: 'Cosmeceuticals & Personal Care',
    categoryNameAr: 'مستحضرات التجميل والعناية',
    slug: 'cosmeceuticals-ingredients',
    tagline: 'Dermatological Bio-Actives & UV Filters',
    taglineAr: 'مكونات جلدية نشطة وفلاتر أشعة الشمس',
    standards: 'INCI • EP Cosmetic',
    description:
      'Clinically validated actives — multi-molecular-weight hyaluronic acid, brightening agents and photostable UV filters for advanced skincare.',
    descriptionAr:
      'خامات تجميلية معتمدة — هيالورونات الصوديوم بأوزان جزيئية متعددة، مواد تفتيح وفلاتر واقية من الشمس للعناية المتقدمة بالبشرة.',
    Icon: Sparkles,
    chemicals: [
      { name: 'Sodium Hyaluronate', cas: '9067-32-7', grade: 'Multi-MW' },
      { name: 'Octocrylene', cas: '6197-30-4', grade: 'UV Filter' },
      { name: 'Alpha-Arbutin', cas: '84380-01-8', grade: 'Brightening' },
      { name: 'Allantoin', cas: '97-59-6', grade: 'Soothing' },
    ],
  },
  {
    id: 'specialty',
    categoryName: 'Specialty Synthesis & Custom Sourcing',
    categoryNameAr: 'التخليق المتخصص والتوريد المخصص',
    slug: 'contact',
    tagline: 'Rare Chemical Indenting & Custom Dossiers',
    taglineAr: 'استيراد كيميائي مباشر وملفات فنية مخصصة',
    standards: 'Custom Synthesis • Tailored PSD',
    description:
      'Can’t find your CAS number or particle size? We coordinate direct synthesis with audited partners and handle Egyptian import licensing and testing.',
    descriptionAr:
      'هل تبحث عن رقم CAS أو حجم حبيبات محدد؟ ننسق التخليق المباشر مع المصانع العالمية المعتمدة وننهي إجراءات الاستيراد والفحص.',
    Icon: Globe2,
    chemicals: [
      { name: 'Custom Particle Size', cas: 'Custom', grade: 'Micronized' },
      { name: 'Low Endotoxin Excipients', cas: 'Custom', grade: 'Injectable' },
      { name: 'Rare Monograph Actives', cas: 'Custom', grade: 'Sourcing' },
      { name: 'Buffer Stocks', cas: 'Cairo Hub', grade: 'Harvest' },
    ],
  },
];

/** Slide 3 — Arshine-style "Our product" horizontal division swiper. */
export const ArshineProductCarousel: React.FC = () => {
  const { t } = useLanguage();
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const updateIndexFromScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    if (!card) return;
    const cardWidth = card.offsetWidth + 20;
    const scrollPos = Math.abs(el.scrollLeft);
    const idx = Math.min(
      CAROUSEL_DIVISIONS.length - 1,
      Math.max(0, Math.round(scrollPos / cardWidth))
    );
    setCurrentIndex(idx);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateIndexFromScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [updateIndexFromScroll]);

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      const isRtl = document.documentElement.dir === 'rtl';
      const card = el.querySelector<HTMLElement>('[data-card]');
      const step = (card?.offsetWidth ?? 420) + 20;
      const targetIdx = Math.max(0, Math.min(CAROUSEL_DIVISIONS.length - 1, currentIndex + direction));
      setCurrentIndex(targetIdx);
      el.scrollTo({ left: (isRtl ? -1 : 1) * targetIdx * step, behavior: 'smooth' });
    },
    [currentIndex]
  );

  return (
    <SectionShell label="Products" tone="forest" image="/images/bg-chem-powder.jpg">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeader
            onDark
            eyebrow={t('Our Products', 'منتجاتنا')}
            title={t('Core Divisions & Ingredient Portfolio', 'الأقسام الرئيسية ومحفظة المكونات')}
            description={t(
              'Swipe across our specialised divisions to inspect verified monographs, CAS registries and clinical specifications.',
              'استعرض أقسامنا المتخصصة للاطلاع على المواصفات المعتمدة وأرقام CAS والخصائص الفنية.'
            )}
          />
          <div className="flex shrink-0 items-center gap-3">
            {/* Arshine-style Swiper Fraction Counter */}
            <div
              aria-label={t(
                `Slide ${currentIndex + 1} of ${CAROUSEL_DIVISIONS.length}`,
                `شريحة ${currentIndex + 1} من ${CAROUSEL_DIVISIONS.length}`
              )}
              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-sm font-extrabold text-white backdrop-blur-md shadow-sm"
            >
              <span className="text-teal-400">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="text-white/40">/</span>
              <span>{String(CAROUSEL_DIVISIONS.length).padStart(2, '0')}</span>
            </div>
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label={t('Previous division', 'القسم السابق')}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-all hover:scale-105 hover:bg-teal-500"
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label={t('Next division', 'القسم التالي')}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-all hover:scale-105 hover:bg-teal-500"
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-3 sm:-mx-8 sm:px-8 lg:-mx-14 lg:px-14 xl:-mx-20 xl:px-20"
        >
          {CAROUSEL_DIVISIONS.map((division, idx) => (
            <motion.article
              key={division.id}
              data-card
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.07 }}
              className="group flex w-[min(86vw,25rem)] shrink-0 snap-start flex-col justify-between gap-3 rounded-3xl border border-white/15 bg-white/10 p-4.5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-teal-400 hover:bg-white/15 sm:p-5 xl:w-[26rem]"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-400/20 text-teal-400 transition-all group-hover:scale-105 group-hover:bg-teal-400 group-hover:text-teal-950">
                    <division.Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-amber-400/50 bg-amber-500/10 px-3 py-0.5 text-xs font-bold text-amber-300">
                    {division.standards}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold leading-tight tracking-tight text-white lg:text-xl">
                  {t(division.categoryName, division.categoryNameAr)}
                </h3>
                <p className="text-xs font-semibold text-teal-400 sm:text-sm">
                  {t(division.tagline, division.taglineAr)}
                </p>
                <p className="line-clamp-2 text-xs leading-relaxed text-slate-200 sm:text-sm">
                  {t(division.description, division.descriptionAr)}
                </p>

                <ul className="grid grid-cols-2 gap-1.5">
                  {division.chemicals.map((chem) => (
                    <li
                      key={chem.name}
                      className="rounded-xl border border-white/10 bg-teal-950/50 p-2 text-xs"
                    >
                      <span className="block truncate font-bold text-white">{chem.name}</span>
                      <span className="mt-0.5 flex items-center justify-between gap-1 font-mono text-[0.68rem] text-slate-300">
                        <span className="truncate">CAS {chem.cas}</span>
                        <span className="shrink-0 text-teal-400">{chem.grade}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-white/15 pt-3">
                <Button
                  variant="teal"
                  size="sm"
                  onClick={() => {
                    setSelectedDivision(division.categoryName);
                    setIsRfqOpen(true);
                  }}
                  className="min-h-[44px] px-4 text-sm font-bold"
                >
                  {t('Request RFQ', 'طلب تسعير')}
                </Button>
                <Link
                  href={`/products?category=${division.slug}`}
                  className="group/link inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-white transition hover:text-teal-400"
                >
                  <span>{t('View Catalog', 'عرض الكتالوج')}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1 rtl:rotate-180 rtl:group-hover/link:-translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination bullets (Swiper style) */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {CAROUSEL_DIVISIONS.map((division, idx) => (
            <button
              key={division.id}
              type="button"
              onClick={() => {
                const el = trackRef.current;
                if (!el) return;
                const isRtl = document.documentElement.dir === 'rtl';
                const card = el.querySelector<HTMLElement>('[data-card]');
                const step = (card?.offsetWidth ?? 420) + 20;
                setCurrentIndex(idx);
                el.scrollTo({ left: (isRtl ? -1 : 1) * idx * step, behavior: 'smooth' });
              }}
              aria-label={`Go to ${division.categoryName}`}
              className={`h-2 cursor-pointer rounded-full transition-all ${
                currentIndex === idx ? 'w-8 bg-teal-400' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
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
