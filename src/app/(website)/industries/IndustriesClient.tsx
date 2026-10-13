'use client';

import React from 'react';
import Link from 'next/link';
import {
  Pill,
  Sparkles,
  HeartPulse,
  Syringe,
  Apple,
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

  const industries = [
    {
      id: 'pharmaceuticals',
      label: t('Human Pharma', 'الدواء البشري'),
      tone: 'light' as const,
      title: t('Human Pharmaceuticals', 'الأدوية البشرية (Human Pharmaceuticals)'),
      tagline: t('Precision APIs & Pharmacopoeial Excipients', 'مواد فعالة دقيقة وسواغ دواء مطابق للدساتير العالمية'),
      desc: t(
        'Formulation-grade active pharmaceutical ingredients (APIs), binders, superdisintegrants, lubricants and film coatings adhering strictly to BP, USP and Ph. Eur. standards.',
        'مواد دوائية فعالة (APIs) ومواد رابطة ومفككات فائقة ومزلقات وأغشية تغليف أقراص مطابقة تماماً لمواصفات دساتير الأدوية البريطانية والأمريكية والأوروبية (BP, USP, Ph. Eur.).'
      ),
      icon: Pill,
      badge: t('Core Division', 'القطاع الرئيسي'),
      items: [
        t('Direct Compression (DC) & Wet Granulation Excipients', 'سواغ الضغط المباشر (DC) والتحبيب الرطب'),
        t('Antibiotics, Analgesics & Cardiovascular APIs', 'مواد فعالة للمضادات الحيوية والمسكنات وأمراض القلب'),
        t('Controlled Release Polymers & Enteric Coatings', 'بوليمرات التحرر المضبوط والتغليف المعوي (Enteric Coating)'),
        t('Complete Open-Part DMF and CEP Technical Dossiers', 'ملفات فنية كاملة تشمل Open-Part DMF وشهادات CEP'),
      ],
      filterSlug: 'pharmaceutical-excipients',
    },
    {
      id: 'nutraceuticals',
      label: t('Nutraceuticals', 'المكملات الغذائية'),
      tone: 'tint' as const,
      title: t('Nutraceuticals & Dietary Supplements', 'المكملات الغذائية والمغذيات العلاجية'),
      tagline: t('High-Bioavailability Vitamins & Active Minerals', 'فيتامينات ومعادن فعالة عالية التوافر الحيوي'),
      desc: t(
        'Food Chemicals Codex (FCC) and USP verified nutritional ingredients for gummies, softgels, effervescent tablets and functional beverage blends.',
        'مكونات غذائية معتمدة وفق دستور المواد الكيميائية الغذائية (FCC) والدستور الأمريكي (USP) للحلوى الجيلاتينية والكبسولات الرخوة والأقراص الفوارة والمشروبات الوظيفية.'
      ),
      icon: HeartPulse,
      badge: t('High Growth', 'نمو متسارع'),
      items: [
        t('Pure Vitamins (Ascorbic Acid, D3, K2, B-Complex)', 'فيتامينات نقية (حمض الأسكوربيك C، وفيتامين D3، و K2، ومجموعة B المركبة)'),
        t('Cellular Energizers & Antioxidants (CoQ10, Resveratrol)', 'مضادات أكسدة ومحفزات خلوية (CoQ10، ريسفيراترول)'),
        t('Direct-to-Mouth Granules & Effervescent Additives', 'حبيبات سريعة الذوبان ومواد مساعدة للأقراص الفوارة'),
        t('Non-GMO & Heavy-Metal Tested Specifications', 'خامات غير معدلة وراثياً (Non-GMO) ومفحوصة لخلوها من المعادن الثقيلة'),
      ],
      filterSlug: 'nutraceutical-ingredients',
    },
    {
      id: 'veterinary',
      label: t('Veterinary', 'الطب البيطري'),
      tone: 'light' as const,
      title: t('Veterinary Medicines & Animal Health', 'الأدوية البيطرية وصحة الحيوان'),
      tagline: t('Targeted Chemotherapeutics & Feed Additives', 'علاجات كيميائية مركزة وإضافات أعلاف متطورة'),
      desc: t(
        'High-potency veterinary APIs for water-soluble powders, oral suspensions, premixes and sterile injectables addressing livestock, poultry and aquaculture.',
        'مواد فعالة بيطرية عالية الفاعلية للمساحيق القابلة للذوبان في الماء، والمعلقات الفموية، والخلطات الأولية (Premixes)، وحقن التعقيم لقطاعات الماشية والدواجن والاستزراع السمكي.'
      ),
      icon: Syringe,
      badge: t('Veterinary Grade', 'درجة بيطرية معتمدة'),
      items: [
        t('Tylosin Tartrate, Doxycycline Hyclate, Enrofloxacin', 'تيلوزين تارترات، دوكسيسيكلين هيكلات، إنروفلوكساسين'),
        t('High-Solubility Powders for Large-Scale Water Lines', 'مساحيق فائقة الذوبان لشبكات مياه الشرب بالمزارع الضخمة'),
        t('Stability in Harsh Climatic & Farm Conditions', 'ثبات فائق في الظروف المناخية القاسية وبيئات المزارع'),
        t('Full Egyptian Veterinary Authority Approvals', 'موافقات وتسجيلات كاملة من الهيئة العامة للخدمات البيطرية وهيئة الدواء'),
      ],
      filterSlug: 'veterinary-ingredients',
    },
    {
      id: 'cosmeceuticals',
      label: t('Cosmeceuticals', 'مستحضرات التجميل'),
      tone: 'navy' as const,
      image: '/images/bg-molecules.jpg',
      title: t('Cosmeceuticals & Personal Care', 'مستحضرات التجميل العلاجية والعناية الشخصية'),
      tagline: t('Dermatological Actives & Functional Polymers', 'مواد جلدية فعالة وبوليمرات وظيفية متقدمة'),
      desc: t(
        'Premium cosmetic active ingredients with proven dermal penetration, anti-aging efficacy, UV radiation shielding and deep moisturizing properties.',
        'مكونات تجميلية نشطة متميزة ذات نفاذية جلدية مثبتة وفعالية عالية لمكافحة علامات التقدم في السن، والحماية من الأشعة فوق البنفسجية، والترطيب العميق.'
      ),
      icon: Sparkles,
      badge: t('Personal Care', 'العناية الشخصية'),
      items: [
        t('Multi-Molecular Sodium Hyaluronate (HA)', 'هيالورونات الصوديوم (HA) متعددة الأوزان الجزيئية'),
        t('High-Purity Niacinamide (Low Nicotinic Acid)', 'نياسيناميد فائق النقاء (بأدنى نسبة لحمض النيكوتينيك)'),
        t('Broad-Spectrum UV Absorbers (Octocrylene, Avobenzone)', 'فلاتر حماية واسعة الطيف من الشمس (أوكتوكريلين، أفوبنزون)'),
        t('Microbiology Certificates & Preservative Systems', 'شهادات ميكروبيولوجية وأنظمة حفظ آمنة ومعتمدة'),
      ],
      filterSlug: 'cosmeceuticals-ingredients',
    },
    {
      id: 'food',
      label: t('Food & Nutrition', 'الأغذية والتغذية'),
      tone: 'tint' as const,
      title: t('Functional Food & Beverages', 'الأغذية الوظيفية والمشروبات المتطورة'),
      tagline: t('FCC Compliant Stabilizers & Acidulants', 'مثبتات ومعدلات حموضة مطابقة لدستور FCC'),
      desc: t(
        'Food-grade preservation agents, acidity regulators and texture hydrocolloids meeting international Food Chemicals Codex and Egyptian ISO standards.',
        'مواد حفظ غذائية ومعدلات حموضة وغرويات مائية للقوام مطابقة لأحدث معايير دستور المواد الكيميائية الغذائية (FCC) والمواصفات القياسية المصرية.'
      ),
      icon: Apple,
      badge: t('Food Grade', 'درجة غذائية معتمدة'),
      items: [
        t('Citric Acid, Sodium Benzoate, Potassium Sorbate', 'حمض الستريك، بنزوات الصوديوم، سوربات البوتاسيوم'),
        t('Emulsifiers, Thickeners & Bulking Agents', 'مستحلبات ومثخنات قوام وعوامل زيادة الحجم'),
        t('Halal & Kosher Certified Raw Materials', 'مواد خام حاصلة على شهادات حلال وكوشير معتمدة'),
        t('High-Purity Granulations for Instant Drink Mixes', 'حبيبات فائقة النقاء لمزائج المشروبات سريعة التحضير'),
      ],
      filterSlug: 'pharmaceutical-excipients',
    },
  ];

  return (
    <>
      {/* 1. Hero */}
      <SectionShell label={t('Overview', 'نظرة عامة')} tone="forest" image="/images/bg-chem-powder.jpg">
        <Reveal className="mx-auto max-w-4xl space-y-6 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Sector Expertise', 'الخبرة القطاعية المتخصصة')}
            title={t(
              'Targeted Ingredient Solutions Across Industrial Sectors',
              'حلول خامات موجهة ومصممة لمختلف القطاعات الصناعية'
            )}
            description={t(
              'From cGMP human sterile manufacturing to dynamic cosmeceutical laboratories, DELTACHEM curates specialized chemical portfolios engineered to meet sector-specific monographs and regulatory standards.',
              'من مصانع أدوية الحقن البشرية العقيمة المعيارية cGMP إلى مختبرات مستحضرات التجميل العلاجية، تنتقي دلتا كيم محافظ كيميائية متخصصة مصممة لتلبية دساتير ومعايير كل قطاع صناعي بدقة.'
            )}
          />
          <div className="flex flex-wrap justify-center gap-4 pt-3">
            <Link href="/products">
              <Button size="lg" variant="teal" className="px-8 font-bold shadow-xl shadow-teal-950/60">
                <span>{t('Search All Ingredients', 'البحث في كافة الخامات')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
            <Link href="/request-a-quote">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 px-7 font-bold text-white backdrop-blur-md hover:bg-white/10"
              >
                {t('Request Sector Catalog', 'طلب كتالوج القطاع الصناعي')}
              </Button>
            </Link>
          </div>
        </Reveal>
      </SectionShell>

      {/* 2 to 6: Each sector slide */}
      {industries.map((ind) => {
        const Icon = ind.icon;
        const isDark = ind.tone === 'navy';
        return (
          <SectionShell
            key={ind.id}
            id={ind.id}
            label={ind.label}
            tone={ind.tone}
            image={ind.image}
          >
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
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
                    {ind.badge}
                  </span>
                </div>

                <SectionHeader
                  onDark={isDark}
                  eyebrow={ind.tagline}
                  title={ind.title}
                  description={ind.desc}
                />

                <ul className="grid grid-cols-1 gap-2.5 pt-2 sm:grid-cols-2">
                  {ind.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
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

              <Reveal delay={0.15} x={30} y={0} className="lg:col-span-5">
                <div
                  className={`rounded-3xl p-7 text-center shadow-xl sm:p-9 ${
                    isDark
                      ? 'border border-white/20 bg-white/10 text-white backdrop-blur-xl'
                      : 'border border-teal-200 bg-teal-50/70 text-slate-900'
                  }`}
                >
                  <h4 className="text-xl font-extrabold">
                    {t(`Explore ${ind.title}`, `استكشاف ${ind.title}`)}
                  </h4>
                  <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {t(
                      'Access technical specifications, pharmacopoeias and request a direct quotation.',
                      'الوصول إلى المواصفات الفنية ودساتير الأدوية وطلب عرض سعر مباشر ومخصص.'
                    )}
                  </p>
                  <div className="mt-6 space-y-3">
                    <Link href={`/products?category=${ind.filterSlug}`} className="block">
                      <Button variant="teal" size="md" className="w-full justify-between font-bold">
                        <span>{t('Browse Sector Portfolio', 'تصفح خامات هذا القطاع')}</span>
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
                        {t('Request Custom Quote', 'طلب عرض سعر مخصص')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </SectionShell>
        );
      })}

      {/* 7. Bottom CTA */}
      <SectionShell label={t('Inquire', 'طلب استفسار')} tone="forest" image="/images/bg-cairo-dusk.jpg">
        <Reveal className="mx-auto max-w-4xl space-y-6 py-6 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Consolidated Sourcing', 'توريد واستيراد مجمع متعدد القطاعات')}
            title={t(
              'Need a Multi-Industry Raw Material Solution?',
              'هل تحتاج إلى حلول توريد خامات لمصانع متعددة الأنشطة؟'
            )}
            description={t(
              'Our technical sourcing team coordinates consolidated shipments combining excipients, APIs and vitamins under a unified commercial agreement.',
              'ينسق فريق التوريد الفني لدينا شحنات مجمعة تجمع بين السواغ الدوائي والمواد الفعالة والفيتامينات بموجب اتفاقية تجارية موحدة وميسرة.'
            )}
          />
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/request-a-quote">
              <Button size="lg" variant="teal" className="px-9 font-extrabold shadow-xl shadow-teal-950/50">
                {t('Submit an RFQ', 'إرسال طلب تسعير (RFQ)')}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 px-8 font-bold text-white hover:bg-white/10"
              >
                {t('Contact Sales Team', 'التواصل مع فريق المبيعات')}
              </Button>
            </Link>
          </div>
        </Reveal>
      </SectionShell>
    </>
  );
};
