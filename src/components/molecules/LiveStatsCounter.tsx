'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, Users, Warehouse, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';

interface StatItemProps {
  value: number;
  suffix?: string;
  prefix?: string;
  staticText?: string;
  label: string;
  labelAr: string;
  sublabel: string;
  sublabelAr: string;
  icon: React.ComponentType<{ className?: string }>;
  index: number;
}

const CounterItem: React.FC<StatItemProps> = ({
  value,
  suffix = '',
  prefix = '',
  staticText,
  label,
  labelAr,
  sublabel,
  sublabelAr,
  icon: Icon,
  index,
}) => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView || staticText) return;

    let startTime: number | null = null;
    const duration = 1800; // ms

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(ease * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isInView, value, staticText]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-teal-800 bg-teal-900 p-5 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-900/30 sm:p-6"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-teal-400 to-amber-500 transition-transform duration-500 group-hover:scale-x-100"
      />
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-teal-400/30 bg-teal-400/10 text-teal-400 transition-all duration-300 group-hover:bg-teal-400 group-hover:text-teal-950">
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex items-baseline gap-1 text-[clamp(2rem,3vw,3.25rem)] font-extrabold leading-none tracking-tight">
        {staticText ? (
          <span>{staticText}</span>
        ) : (
          <>
            {prefix && <span className="text-teal-400">{prefix}</span>}
            <span>{displayValue}</span>
            {suffix && <span className="text-teal-400">{suffix}</span>}
          </>
        )}
      </div>

      <h3 className="mt-2 text-base font-bold leading-snug text-white lg:text-lg">{t(label, labelAr)}</h3>
      <p className="mt-1 text-sm leading-relaxed text-teal-100/80">{t(sublabel, sublabelAr)}</p>
    </motion.div>
  );
};

export const LiveStatsCounter: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <CounterItem
        index={0}
        value={20}
        suffix="+"
        label="Years Chemical Leadership"
        labelAr="أكثر من ٢٠ عاماً من الريادة الكيميائية"
        sublabel="Founded by Dr. Abdelhamid Aboelaly"
        sublabelAr="تأسست بقيادة د. عبدالحميد أبو العلي"
        icon={Award}
      />
      <CounterItem
        index={1}
        value={150}
        suffix="+"
        label="Formulation Clients in Egypt"
        labelAr="أكثر من ١٥٠ مصنع أدوية ورعاية صحية"
        sublabel="Cairo, 10th Ramadan, 6th October & Alexandria"
        sublabelAr="القاهرة والعاشر وأكتوبر والإسكندرية"
        icon={Users}
      />
      <CounterItem
        index={2}
        value={0}
        staticText="2°C–8°C"
        label="Cold Chain & Ambient Storage"
        labelAr="تخزين مبرد ٢-٨° مئوية وتخزين مضبوط"
        sublabel="Harvest Pharma GDP warehousing, Cairo"
        sublabelAr="مستودعات هارفست فارما المرخصة"
        icon={Warehouse}
      />
      <CounterItem
        index={3}
        value={100}
        suffix="%"
        label="EDA Regulatory Audit Ready"
        labelAr="١٠٠٪ مطابقة لاشتراطات هيئة الدواء"
        sublabel="Lot-specific COA, DMF, TSE/BSE & Nitrosamine dossiers"
        sublabelAr="شهادات تحليل دفعية وملفات DMF وتقييمات النيتروزامين"
        icon={ShieldCheck}
      />
    </div>
  );
};
