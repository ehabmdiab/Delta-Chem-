'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/components/providers/LanguageContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Lock,
  MessageCircle,
  Smartphone,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="snap-bottom border-t border-teal-900 bg-slate-950 pb-10 pt-16 text-slate-300">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 border-b border-slate-800 pb-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Harvest Pharma Sister Company */}
          <div className="space-y-5 lg:col-span-2">
            <Link
              href="/"
              className="inline-block rounded-xl bg-white px-4 py-2.5 shadow-sm"
            >
              <Image
                src="/images/logo-delta-chem.png"
                alt="DELTACHEM - From Quality to Excellence"
                width={932}
                height={531}
                className="h-12 w-auto object-contain"
              />
            </Link>

            <p className="max-w-sm text-xs leading-relaxed text-slate-400">
              {t(
                'Authorized B2B importer and distributor of human, veterinary, cosmetic, and nutraceutical raw materials across Egypt and MENA.',
                'مستورد وموزع معتمد للخامات البشرية والبيطرية وخامات التجميل والمكملات الغذائية في مصر والشرق الأوسط.'
              )}
            </p>

            {/* Harvest Pharma Sister Company Callout with official logo */}
            <div className="max-w-sm space-y-3 rounded-xl border border-slate-800 bg-slate-900/90 p-4">
              <div className="flex items-center gap-3">
                <div className="shrink-0 rounded-lg bg-white p-1.5">
                  <Image
                    src="/images/logo-harvest-pharma.png"
                    alt="Harvest Pharma"
                    width={557}
                    height={525}
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div>
                  <span className="block text-xs font-bold text-teal-400">
                    {t('Sister Company & Storage Hub', 'الشركة الشقيقة ومركز التخزين')}
                  </span>
                  <span className="text-xs font-semibold text-white">Harvest Pharma</span>
                </div>
              </div>
              <p className="text-xs leading-normal text-slate-400">
                {t(
                  'GDP-compliant climate-controlled warehousing and rapid nationwide delivery.',
                  'مخازن دوائية معتمدة ومجهزة بأنظمة مراقبة الحرارة والرطوبة والتوصيل السريع.'
                )}
              </p>
              <a
                href={siteConfig.contact.warehouseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-teal-400 transition hover:text-teal-300"
              >
                <span>www.harvestpharma-eg.com</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Four Sectors column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('Core Sectors', 'القطاعات الأربعة')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/divisions/human-raw-materials" className="transition hover:text-teal-400">
                  {t('Human Raw Materials', 'الخامات البشرية')}
                </Link>
              </li>
              <li>
                <Link href="/divisions/veterinary-raw-materials" className="transition hover:text-teal-400">
                  {t('Veterinary Raw Materials', 'الخامات البيطرية')}
                </Link>
              </li>
              <li>
                <Link href="/divisions/cosmetics-raw-materials" className="transition hover:text-teal-400">
                  {t('Cosmetics Raw Materials', 'خامات مستحضرات التجميل')}
                </Link>
              </li>
              <li>
                <Link href="/divisions/nutraceutical-raw-materials" className="transition hover:text-teal-400">
                  {t('Nutraceutical Raw Materials', 'خامات المكملات الغذائية')}
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/products" className="font-semibold text-teal-400 hover:underline">
                  {t('Full Product List →', 'عرض جميع الخامات ←')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities & Corporate */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('Corporate', 'الشركة والخدمات')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="transition hover:text-teal-400">
                  {t('About DELTACHEM', 'عن دلتا كيم')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="transition hover:text-teal-400">
                  {t('Import & Supply Models', 'نماذج التوريد والاستيراد')}
                </Link>
              </li>
              <li>
                <Link href="/quality-regulatory" className="transition hover:text-teal-400">
                  {t('Quality & Regulatory', 'الجودة والشؤون التنظيمية')}
                </Link>
              </li>
              <li>
                <Link href="/supply-chain" className="transition hover:text-teal-400">
                  {t('Supply Chain', 'سلاسل الإمداد')}
                </Link>
              </li>
              <li>
                <Link href="/partners" className="transition hover:text-teal-400">
                  {t('Global Partners', 'الشركاء العالميون')}
                </Link>
              </li>
              <li>
                <Link href="/insights" className="transition hover:text-teal-400">
                  {t('News & Insights', 'الأخبار والمقالات')}
                </Link>
              </li>
              <li>
                <Link href="/request-a-quote" className="transition hover:text-teal-400">
                  {t('Request a Quote', 'طلب تسعير')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Head Office & Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('Head Office & Contact', 'المقر الرئيسي والتواصل')}
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                <a
                  href={siteConfig.contact.mapsDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-relaxed transition hover:text-white"
                >
                  {t(siteConfig.contact.address, siteConfig.contact.address_ar)}
                </a>
              </li>

              {/* Landlines */}
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-slate-200">
                  {siteConfig.contact.landlines.map((line, i) => (
                    <React.Fragment key={line.display}>
                      <a href={`tel:${line.tel}`} className="transition hover:text-teal-400">
                        {line.display}
                      </a>
                      {i === 0 && <span className="text-slate-600">/</span>}
                    </React.Fragment>
                  ))}
                </div>
              </li>

              {/* Mobiles + Direct Call & WhatsApp */}
              <li className="space-y-2">
                {siteConfig.contact.mobiles.map((mob) => (
                  <div key={mob.display} className="flex items-center justify-between gap-2 rounded-lg border border-slate-800 bg-slate-900/70 px-2.5 py-1.5">
                    <a
                      href={`tel:${mob.tel}`}
                      className="inline-flex items-center gap-1.5 font-mono text-slate-200 hover:text-white"
                    >
                      <Smartphone className="h-3.5 w-3.5 text-teal-400" />
                      <span>{mob.display}</span>
                    </a>
                    <a
                      href={mob.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded bg-emerald-600/20 px-2 py-0.5 text-[11px] font-bold text-emerald-300 transition hover:bg-emerald-600 hover:text-white"
                    >
                      <MessageCircle className="h-3 w-3" />
                      <span>{t('WhatsApp', 'واتساب')}</span>
                    </a>
                  </div>
                ))}
              </li>

              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-teal-400" />
                <a href={`mailto:${siteConfig.contact.email}`} className="transition hover:text-white">
                  {siteConfig.contact.email}
                </a>
              </li>

              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                <span>{t(siteConfig.contact.hours, siteConfig.contact.hours_ar)}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & admin access */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>
            {t(
              '© 2026 DELTACHEM Company. All rights reserved.',
              '© ٢٠٢٦ شركة دلتا كيم للكيماويات الدوائية. جميع الحقوق محفوظة.'
            )}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="transition hover:text-slate-300">
              {t('Contact Us', 'تواصل معنا')}
            </Link>
            <span>&bull;</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-slate-500 transition hover:text-teal-400"
            >
              <Lock className="h-3 w-3" />
              <span>{t('Staff Portal', 'بوابة الإدارة')}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
