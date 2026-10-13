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
  Shield,
  Warehouse,
  ExternalLink,
  Linkedin,
  Lock,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="snap-bottom bg-slate-950 text-slate-300 border-t border-teal-900 pt-16 pb-8">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Mission column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-48 h-12 brightness-0 invert">
                <Image
                  src="/images/logo-delta-chem.png"
                  alt="DELTACHEM Company"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t(
                'DELTACHEM is a premier B2B distributor and supplier of Active Pharmaceutical Ingredients (APIs), excipients, nutraceutical raw materials, veterinary APIs, and cosmetic ingredients serving manufacturers across Egypt and the MENA region.',
                'شركة دلتا كيم هي المورد والموزع الرائد للمواد الفعالة الصيدلانية والسواغات ومكونات المكملات الغذائية والأدوية البيطرية ومستحضرات التجميل في مصر والشرق الأوسط.'
              )}
            </p>

            {/* Harvest Pharma Sister Company Callout */}
            <div className="p-3.5 bg-slate-900/80 rounded-lg border border-slate-800 space-y-2 max-w-sm">
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-xs">
                <Warehouse className="w-4 h-4 shrink-0" />
                <span>{t('Storage & Logistics Infrastructure', 'البنية التحتية للتخزين واللوجستيات')}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                {t(
                  "Warehousing and temperature-controlled distribution is managed through our sister company Harvest Pharma's GDP-compliant Cairo facility.",
                  'تتم إدارة عمليات التخزين والتوزيع المبرد من خلال مستودعات شركتنا الشقيقة هارفست فارما بالقاهرة وفق معايير التوزيع الجيد GDP.'
                )}
              </p>
              <a
                href={siteConfig.contact.warehouseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-400 hover:text-teal-300 transition"
              >
                <span>www.harvestpharma-eg.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Product Divisions column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t('Ingredient Divisions', 'أقسام المنتجات')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/divisions/pharmaceutical-apis"
                  className="hover:text-teal-400 transition"
                >
                  {t('Pharmaceutical APIs', 'المواد الفعالة الصيدلانية')}
                </Link>
              </li>
              <li>
                <Link
                  href="/divisions/pharmaceutical-excipients"
                  className="hover:text-teal-400 transition"
                >
                  {t('Pharmaceutical Excipients', 'السواغات الصيدلانية')}
                </Link>
              </li>
              <li>
                <Link
                  href="/divisions/nutraceutical-ingredients"
                  className="hover:text-teal-400 transition"
                >
                  {t('Nutraceutical Ingredients', 'المكملات الغذائية')}
                </Link>
              </li>
              <li>
                <Link
                  href="/divisions/veterinary-ingredients"
                  className="hover:text-teal-400 transition"
                >
                  {t('Veterinary Ingredients', 'المكونات البيطرية')}
                </Link>
              </li>
              <li>
                <Link
                  href="/divisions/cosmeceuticals-ingredients"
                  className="hover:text-teal-400 transition"
                >
                  {t('Cosmeceuticals Actives', 'مستحضرات التجميل العلاجية')}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-teal-400 font-semibold hover:underline">
                  {t('Browse Full Catalog ->', 'تصفح الدليل بالكامل ->')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities & Corporate */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t('Corporate & Capabilities', 'الشركة والقدرات')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-teal-400 transition">
                  {t('About DELTACHEM', 'عن الشركة')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-teal-400 transition">
                  {t('Sourcing & Business Models', 'نماذج التوريد والشراكة')}
                </Link>
              </li>
              <li>
                <Link href="/quality-regulatory" className="hover:text-teal-400 transition">
                  {t('Quality Assurance & Audits', 'ضمان الجودة والاعتمادات')}
                </Link>
              </li>
              <li>
                <Link href="/supply-chain" className="hover:text-teal-400 transition">
                  {t('Supply Chain & Cold Chain', 'سلاسل التوريد والتبريد')}
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-teal-400 transition">
                  {t('Industries We Serve', 'القطاعات الصناعية')}
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-teal-400 transition">
                  {t('Global Principals & Suppliers', 'الشركاء والموردون')}
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-teal-400 transition">
                  {t('Articles & Life Science News', 'الأخبار والمقالات')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t('Head Office & Contact', 'المقر الرئيسي والاتصال')}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{t(siteConfig.contact.address, siteConfig.contact.address_ar)}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phoneClean}`}
                  className="hover:text-white transition"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{t(siteConfig.contact.hours, siteConfig.contact.hours_ar)}</span>
              </li>
              <li className="pt-2">
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white transition p-2 bg-slate-900 rounded-md border border-slate-800"
                >
                  <Linkedin className="w-4 h-4 text-sky-400" />
                  <span>{t('DELTACHEM Official LinkedIn', 'صفحة دلتا كيم الرسمية على لينكد إن')}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & admin access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            {t(
              '© 2026 DELTACHEM Company. All rights reserved. Sourced & distributed under formal pharmaceutical compliance.',
              '© ٢٠٢٦ شركة دلتا كيم للمنتجات الدوائية وعلوم الحياة. جميع الحقوق محفوظة. توريد وتوزيع خاضع للامتثال الصيدلاني الكامل.'
            )}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-slate-400 transition">
              {t('Contact Directory', 'دليل الاتصال')}
            </Link>
            <span>&bull;</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-teal-400 transition"
            >
              <Lock className="w-3 h-3" />
              <span>{t('Staff Portal', 'بوابة الإدارة')}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
