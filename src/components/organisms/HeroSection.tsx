'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { RfqModal } from '@/components/molecules/RfqModal';
import { useLanguage } from '@/components/providers/LanguageContext';
import { withBasePath } from '@/lib/paths';
import {
  ShieldCheck,
  ArrowRight,
  Warehouse,
  CheckCircle2,
  FileCheck2,
  Search,
  Sparkles,
  FlaskConical,
  Award,
  Clock,
  ExternalLink,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const quickSearchTags = [
    { label: 'Amoxicillin', query: 'Amoxicillin' },
    { label: 'Metformin', query: 'Metformin' },
    { label: 'Microcrystalline Cellulose', query: 'Microcrystalline' },
    { label: 'Hyaluronic Acid', query: 'Hyaluronate' },
    { label: 'Tylosin', query: 'Tylosin' },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-24 lg:pt-24 lg:pb-32 border-b border-slate-800">
        {/* Subtle luminous ambient background lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-7"
            >
              {/* Premium Pill Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs sm:text-sm font-semibold shadow-lg shadow-teal-950/50 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400"></span>
                </span>
                <span>
                  {t(
                    'Certified B2B Life Science Ingredients Supplier • Cairo, Egypt & MENA',
                    'مورد وموزع معتمد للمواد الخام الصيدلانية لمصر والشرق الأوسط'
                  )}
                </span>
              </div>

              {/* Bold Display Headline - Scaling up per UI/UX Pro Max */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.08]">
                {t(
                  'High-Purity Active Ingredients & Excipients',
                  'مواد فعالة صيدلانية وسواغات عالية النقاء'
                )}
                <span className="block mt-2 bg-gradient-to-r from-teal-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                  {t('for Egyptian & MENA Formulators', 'لمصنعي الأدوية ومستحضرات التجميل')}
                </span>
              </h1>

              {/* High-legibility Body Copy */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl">
                {t(
                  'DELTACHEM connects verified global chemical synthesis principals with formulation plants across Egypt. We supply pharmacopoeia-certified APIs, functional excipients, and veterinary actives with audit-ready registration dossiers and local Cairo GDP warehousing.',
                  'تربط دلتا كيم بين كبرى مصانع المواد الكيميائية العالمية ومصانع الأدوية في مصر. نوفر مواد فعالة وسواغات ومكونات بيطرية مطابقة لدساتير الأدوية مع ملفات تسجيل كاملة وتخزين معتمد في القاهرة.'
                )}
              </p>

              {/* Fast Direct Search Box with Quick Tags */}
              <div className="space-y-3 max-w-2xl">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      window.location.href = withBasePath(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                    }
                  }}
                  className="flex items-center bg-slate-900/90 backdrop-blur-xl rounded-xl p-2 border border-slate-700/80 shadow-2xl focus-within:border-teal-400/80 transition-colors"
                >
                  <div className="pl-3 pr-2 text-teal-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t(
                      'Search by chemical name, CAS # or standard (e.g. Amoxicillin, USP)...',
                      'ابحث باسم المادة الكيميائية أو رقم CAS أو الدستور الدوائي...'
                    )}
                    className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-slate-400 focus:outline-none px-2"
                  />
                  <Button type="submit" variant="teal" size="md" className="shrink-0 font-bold px-5">
                    {t('Search', 'بحث')}
                  </Button>
                </form>

                {/* Instant Query Suggestions */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="text-slate-500 font-medium">
                    {t('Popular searches:', 'الأكثر بحثاً:')}
                  </span>
                  {quickSearchTags.map((tag) => (
                    <button
                      key={tag.query}
                      type="button"
                      onClick={() => {
                        setSearchQuery(tag.query);
                        window.location.href = withBasePath(`/products?search=${encodeURIComponent(tag.query)}`);
                      }}
                      className="px-2.5 py-0.5 rounded-full bg-slate-800/80 hover:bg-teal-900/50 hover:text-teal-300 border border-slate-700/70 transition-colors text-slate-300 cursor-pointer"
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* High-Impact Dual CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/products">
                  <Button variant="teal" size="lg" className="font-bold text-base shadow-xl shadow-teal-950/50 px-7 py-3.5">
                    <span>{t('Explore Product Catalog', 'استعراض دليل المنتجات')}</span>
                    <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsRfqOpen(true)}
                  className="border-slate-600 text-white hover:bg-white/10 hover:border-slate-400 font-bold text-base px-6 py-3.5 backdrop-blur-md"
                >
                  <Sparkles className="w-4 h-4 text-teal-400 mr-2" />
                  {t('Request Commercial Quote (24h)', 'طلب تسعير فوري (خلال ٢٤ ساعة)')}
                </Button>
              </div>

              {/* Trust badges row */}
              <div className="pt-6 border-t border-slate-800/90 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-teal-900/60 text-teal-300 flex items-center justify-center shrink-0 border border-teal-700/50">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{t('USP / BP / EP / JP Monograph', 'مطابقة لدساتير الأدوية الدولية')}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-teal-900/60 text-teal-300 flex items-center justify-center shrink-0 border border-teal-700/50">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{t('COA, DMF & Dossier Support', 'دعم ملفات DMF وشهادات التحليل')}</span>
                </div>
                <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <div className="w-6 h-6 rounded-md bg-teal-900/60 text-teal-300 flex items-center justify-center shrink-0 border border-teal-700/50">
                    <Warehouse className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{t('Harvest Pharma Cairo Hub', 'مستودع هارفست فارما بالقاهرة')}</span>
                </div>
              </div>
            </motion.div>

            {/* Right Strategic Highlight Card - Dynamic & Lively */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-2xl p-1 bg-gradient-to-b from-teal-500/30 via-slate-700/40 to-slate-800/80 shadow-2xl">
                <div className="bg-slate-900/95 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 space-y-6">
                  {/* Top Bar with Founder credential */}
                  <div className="flex items-center justify-between pb-5 border-b border-slate-800">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-lg font-bold">
                        <FlaskConical className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-white">
                          DELTACHEM Cairo Hub
                        </h3>
                        <p className="text-xs text-teal-400 font-medium">
                          Dr. Abdelhamid Aboelaly, MD
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950 border border-teal-700 text-teal-300 text-xs font-bold">
                      <Award className="w-3.5 h-3.5" />
                      20+ Years
                    </span>
                  </div>

                  {/* Operational Capabilities List */}
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 hover:border-teal-500/50 transition-all group">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs uppercase font-extrabold text-teal-400 tracking-wider">
                          Commercial Model 01
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">Global Indent</span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                        Commission Agency Representation
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Authorized commercial & technical agent for global synthesis principals. Direct contracting, market sampling, and DMF registration in Egypt.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 hover:border-sky-500/50 transition-all group">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs uppercase font-extrabold text-sky-400 tracking-wider">
                          Commercial Model 02
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">Local Stock</span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                        Stock-and-Trade Distribution
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Direct importing with buffer inventories stocked in Harvest Pharma’s Cairo facilities. Same-day to 48h door-to-door delivery.
                      </p>
                    </div>
                  </div>

                  {/* Live Dispatch SLA Metric */}
                  <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-800/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 text-xs text-slate-300">
                      <Clock className="w-4 h-4 text-teal-400" />
                      <span>Standard RFQ SLA</span>
                    </div>
                    <span className="text-xs font-bold text-teal-300 font-mono">
                      &lt; 24 Hours Response
                    </span>
                  </div>

                  {/* Link to corporate credentials */}
                  <Link
                    href="/about"
                    className="flex items-center justify-center gap-2 text-center text-xs font-bold text-teal-300 hover:text-white transition py-2.5 rounded-xl bg-slate-800 hover:bg-teal-900/60 border border-slate-700 hover:border-teal-600"
                  >
                    <span>Read Executive Profile & Quality Charter</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <RfqModal isOpen={isRfqOpen} onClose={() => setIsRfqOpen(false)} />
    </>
  );
};
