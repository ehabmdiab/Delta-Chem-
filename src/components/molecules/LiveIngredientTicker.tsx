'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';

interface TickerItem {
  name: string;
  name_ar: string;
  cas: string;
  grade: string;
  status: string;
  status_ar: string;
  slug: string;
}

const TICKER_ITEMS: TickerItem[] = [
  {
    name: 'Amoxicillin Trihydrate',
    name_ar: 'أموكسيسيلين ثلاثي الهيدرات',
    cas: '61336-70-7',
    grade: 'USP / BP / EP',
    status: 'In Stock Cairo',
    status_ar: 'متوفر بمستودع القاهرة',
    slug: 'amoxicillin-trihydrate-compacted',
  },
  {
    name: 'Metformin Hydrochloride',
    name_ar: 'ميتفورمين هيدروكلوريد',
    cas: '1115-70-4',
    grade: 'USP / BP',
    status: 'Ready Dispatch',
    status_ar: 'جاهز للشحن الفوري',
    slug: 'metformin-hydrochloride-dc',
  },
  {
    name: 'Microcrystalline Cellulose (MCC PH-102)',
    name_ar: 'سليلوز دقيق التبلور (MCC PH-102)',
    cas: '9004-34-6',
    grade: 'Ph.Eur / USP-NF',
    status: 'High Demand',
    status_ar: 'طلب مرتفع',
    slug: 'microcrystalline-cellulose-ph102',
  },
  {
    name: 'Sodium Hyaluronate (Multi-MW)',
    name_ar: 'هيالورونات الصوديوم (متعدد الأوزان)',
    cas: '9067-32-7',
    grade: 'EP 10.0 / Cosmetic',
    status: 'Cold Chain 2°C–8°C',
    status_ar: 'سلسلة تبريد ٢-٨° مئوية',
    slug: 'sodium-hyaluronate-cosmetic-pharma',
  },
  {
    name: 'Doxycycline Hyclate',
    name_ar: 'دوكسيسيكلين هيكلات',
    cas: '24390-14-5',
    grade: 'USP / EP',
    status: 'Buffer Stock',
    status_ar: 'مخزون استراتيجي',
    slug: 'doxycycline-hyclate-pure',
  },
  {
    name: 'Tylosin Tartrate Granular',
    name_ar: 'تيلوزين طرطرات حبيبي',
    cas: '1405-54-5',
    grade: 'BP(Vet) / EP',
    status: 'Veterinary Active',
    status_ar: 'خامة بيطرية فعالة',
    slug: 'tylosin-tartrate-granular',
  },
  {
    name: 'Niacinamide (Vitamin B3)',
    name_ar: 'نياسيناميد (فيتامين B3)',
    cas: '98-92-0',
    grade: 'USP / EP / FCC',
    status: 'In Stock Cairo',
    status_ar: 'متوفر بمستودع القاهرة',
    slug: 'niacinamide-vitamin-b3-pharma',
  },
  {
    name: 'Paracetamol DC 90%',
    name_ar: 'باراسيتامول كبس مباشر ٩٠٪',
    cas: '103-90-2',
    grade: 'Direct Compression',
    status: 'Prompt Delivery',
    status_ar: 'تسليم سريع',
    slug: 'paracetamol-dc-90',
  },
];

export const LiveIngredientTicker: React.FC = () => {
  const { t } = useLanguage();
  // Duplicate for seamless infinite marquee loop
  const duplicatedItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 border-y border-teal-900/40 py-2.5 z-20">
      {/* Subtle glowing side fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10" />

      <div className="flex items-center">
        {/* Ticker Lead Tag */}
        <div className="shrink-0 flex items-center gap-2 pl-4 pr-6 py-1 bg-slate-900/90 border-r border-slate-800 text-teal-400 text-xs font-bold tracking-wider uppercase z-20 rtl:border-r-0 rtl:border-l rtl:pl-6 rtl:pr-4">
          <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-spin" />
          <span className="hidden sm:inline">
            {t('Live Cairo Hub Inventory', 'المخزون المباشر بمستودعات القاهرة')}
          </span>
          <span className="sm:hidden">{t('Live Stock', 'مخزون حي')}</span>
        </div>

        {/* Marquee Track */}
        <motion.div
          className="flex items-center gap-6 whitespace-nowrap cursor-pointer hover:[animation-play-state:paused]"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 35,
            ease: 'linear',
          }}
        >
          {duplicatedItems.map((item, index) => (
            <Link
              key={`${item.slug}-${index}`}
              href={`/products/${item.slug}`}
              className="group inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-slate-900/70 hover:bg-teal-950/60 border border-slate-800 hover:border-teal-700/60 transition-all text-xs"
            >
              <span className="font-semibold text-slate-200 group-hover:text-teal-300 transition-colors">
                {t(item.name, item.name_ar)}
              </span>
              <span className="font-mono text-[11px] text-slate-500 group-hover:text-slate-400">
                CAS {item.cas}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-medium border border-slate-700">
                {item.grade}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-teal-400">
                <CheckCircle2 className="w-3 h-3 text-teal-400" />
                {t(item.status, item.status_ar)}
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
