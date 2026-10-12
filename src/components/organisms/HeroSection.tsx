'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { RfqModal } from '@/components/molecules/RfqModal';
import { useLanguage } from '@/components/providers/LanguageContext';
import {
  ShieldCheck,
  ArrowRight,
  Warehouse,
  CheckCircle2,
  FileCheck2,
  Sparkles,
  Search,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-14 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800">
        {/* Subtle scientific grid background overlay */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-950/70 border border-teal-800/60 text-teal-300 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
                <span>
                  {t(
                    'Certified B2B Life Science Ingredients Supplier &bull; Egypt & MENA',
                    'مورد وموزع معتمد للمواد الخام الصيدلانية لمصر والشرق الأوسط'
                  )}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                {t(
                  'High-Purity Active Ingredients, Excipients & Healthcare Raw Materials',
                  'مواد فعالة صيدلانية وسواغات عالية النقاء لصناعة الدواء والرعاية الصحية'
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                {t(
                  'DELTACHEM bridges international audited chemical synthesis principals with formulation manufacturers across Egypt and the MENA region. Supplying pharmacopoeia-compliant APIs, excipients, nutraceuticals, veterinary actives, and cosmeceuticals with full regulatory documentation.',
                  'تربط دلتا كيم بين كبرى مصانع المواد الكيميائية العالمية ومصنعي الأدوية ومستحضرات التجميل في مصر والمنطقة. نوفر مواد فعالة وسواغات ومكملات ومكونات بيطرية مطابقة لدساتير الأدوية مع الدعم الفني والتنظيمي الكامل.'
                )}
              </p>

              {/* Quick Search Bar directly in Hero */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="max-w-xl flex items-center bg-white/10 backdrop-blur-md rounded-lg p-1.5 border border-white/20 shadow-lg"
              >
                <div className="pl-3 pr-2 text-teal-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t(
                    'Search product name, CAS number, standard (e.g. Amoxicillin, USP)...',
                    'ابحث بالاسم أو رقم CAS أو الدستور الدوائي...'
                  )}
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none"
                />
                <Button type="submit" variant="teal" size="sm" className="shrink-0 font-semibold">
                  {t('Search', 'بحث')}
                </Button>
              </form>

              {/* Call to action buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/products">
                  <Button variant="teal" size="lg" className="font-semibold shadow-lg">
                    <span>{t('Explore Product Catalog', 'استعراض دليل المنتجات')}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsRfqOpen(true)}
                  className="border-slate-600 text-white hover:bg-white/10 hover:border-slate-500 font-semibold"
                >
                  {t('Request a Commercial Quote', 'طلب تسعير ومواصفات')}
                </Button>
              </div>

              {/* Trust badges row */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>{t('USP / BP / EP / JP Compliance', 'مطابقة لدساتير الأدوية الدولية')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>{t('Full COA, DMF & Dossier Support', 'دعم ملفات التسجيل وشهادات التحليل')}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Warehouse className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>{t('GDP Warehousing (Harvest Pharma)', 'تخزين معتمد عبر هارفست فارما')}</span>
                </div>
              </div>
            </div>

            {/* Right Strategic Highlight Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/80 rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {t('Commercial Capability & Reach', 'القدرة التجارية والتوزيع')}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {t('Founded by Dr. Abdelhamid Aboelaly', 'تأسست بقيادة د. عبدالحميد أبو العلي')}
                      </p>
                    </div>
                  </div>
                  <Badge variant="teal" size="sm">
                    {t('20+ Years', 'خبرة ٢٠+ عام')}
                  </Badge>
                </div>

                <div className="space-y-4 text-xs text-slate-300">
                  <div className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-700/60">
                    <strong className="text-teal-300 block mb-1">
                      {t('Dual B2B Business Models:', 'نموذجا العمل التجاري:')}
                    </strong>
                    <p className="text-slate-400 leading-relaxed">
                      {t(
                        '1. Commission Representation for international principals.\n2. Stock-and-Trade importing directly for fast domestic dispatch.',
                        '١. تمثيل بالعمولة للموردين العالميين لربطهم بالمصانع المحلية.\n٢. استيراد وتخزين تجاري لتوفير تسليم فوري من المستودع المحلي.'
                      )}
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-700/60">
                    <strong className="text-teal-300 block mb-1">
                      {t('Harvest Pharma Warehousing Synergy:', 'تكامل التخزين مع هارفست فارما:')}
                    </strong>
                    <p className="text-slate-400 leading-relaxed">
                      {t(
                        'Strategic relationship with sister company Harvest Pharma provides climate-controlled, GDP-audited pharmaceutical warehousing in Cairo.',
                        'شراكة استراتيجية مع الشقيقة هارفست فارما لتوفير مستودعات مبردة ومطابقة لاشتراطات هيئة الدواء المصرية.'
                      )}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/about"
                    className="block text-center text-xs font-semibold text-teal-400 hover:text-teal-300 transition py-2 rounded-md bg-teal-950/40 border border-teal-800/40"
                  >
                    {t('Read Executive Profile & Quality Charter ->', 'الملف المؤسسي وميثاق الجودة ->')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RfqModal isOpen={isRfqOpen} onClose={() => setIsRfqOpen(false)} />
    </>
  );
};
