'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/atoms/Button';
import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher';
import { RfqModal } from '@/components/molecules/RfqModal';
import { useLanguage } from '@/components/providers/LanguageContext';
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Phone,
  Mail,
  Building,
  ShieldCheck,
  FileCheck,
  Truck,
  FlaskConical,
  Pill,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isRfqOpen, setIsRfqOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top corporate bar */}
      <div className="snap-top bg-teal-950 text-slate-300 text-xs py-2 px-4 border-b border-teal-900 hidden md:block">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t(
                'Egypt & MENA B2B Pharmaceutical Ingredient Supply',
                'توريد وتوزيع المواد الخام الصيدلانية لمصر والشرق الأوسط'
              )}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">
              {t('Warehousing Partner: Harvest Pharma (Cairo)', 'شريك التخزين: هارفست فارما (القاهرة)')}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${siteConfig.contact.phoneClean}`}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition"
            >
              <Phone className="w-3 h-3 text-teal-400" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition"
            >
              <Mail className="w-3 h-3 text-teal-400" />
              <span>{siteConfig.contact.email}</span>
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header
        className={`sticky top-0 z-40 w-full transition-shadow duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="h-[var(--header-h)] max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20 flex items-center justify-between">
          {/* Authentic Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative w-44 h-11">
              <Image
                src="/images/logo-delta-chem.png"
                alt="DELTACHEM Company"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 150px, 180px"
              />
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Products Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition cursor-pointer ${
                  pathname.startsWith('/products') || pathname.startsWith('/divisions')
                    ? 'text-teal-700 bg-teal-50/70'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>{t('Product Portfolio', 'دليل المنتجات')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              {isProductsDropdownOpen && (
                <div className="absolute top-full left-0 w-[580px] bg-white rounded-xl shadow-2xl border border-slate-200 p-5 grid grid-cols-2 gap-3 transition-all z-50">
                  <div className="col-span-2 pb-2 mb-1 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                      {t('Core Ingredient Divisions', 'الأقسام الرئيسية للمكونات')}
                    </span>
                    <Link
                      href="/products"
                      className="text-xs font-semibold text-teal-600 hover:text-teal-800"
                    >
                      {t('View All Catalog ->', 'عرض الدليل الشامل ->')}
                    </Link>
                  </div>

                  <Link
                    href="/divisions/pharmaceutical-apis"
                    className="p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Pill className="w-4 h-4 text-teal-600" />
                      <span className="text-sm font-bold text-slate-800 group-hover:text-teal-700">
                        {t('Active APIs', 'المواد الفعالة (APIs)')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {t('USP/BP/EP grade oral and sterile actives', 'مواد فعالة مطابقة لدساتير الأدوية الدولية')}
                    </p>
                  </Link>

                  <Link
                    href="/divisions/pharmaceutical-excipients"
                    className="p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <FlaskConical className="w-4 h-4 text-sky-600" />
                      <span className="text-sm font-bold text-slate-800 group-hover:text-sky-700">
                        {t('Pharma Excipients', 'السواغات الصيدلانية')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {t('MCC, disintegrants, binders and coatings', 'سليلوز دقيق التبلور، روابط ومفككات')}
                    </p>
                  </Link>

                  <Link
                    href="/divisions/nutraceutical-ingredients"
                    className="p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                        {t('Nutraceuticals', 'المكملات الغذائية')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {t('Vitamins, minerals and dietary bioactives', 'فيتامينات، معادن، ومستخلصات غذائية')}
                    </p>
                  </Link>

                  <Link
                    href="/divisions/veterinary-ingredients"
                    className="p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-bold text-slate-800 group-hover:text-amber-700">
                        {t('Veterinary Ingredients', 'المكونات البيطرية')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {t('Animal health APIs and feed additives', 'مواد فعالة بيطرية وإضافات أعلاف')}
                    </p>
                  </Link>

                  <Link
                    href="/divisions/cosmeceuticals-ingredients"
                    className="col-span-2 p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-700">
                        {t('Cosmeceuticals & Personal Care', 'مستحضرات التجميل العلاجية')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {t('Sodium hyaluronate, UV filters, and skin barrier actives', 'حمض الهيالورونيك وفلاتر الحماية من الشمس ومغذيات البشرة')}
                    </p>
                  </Link>
                </div>
              )}
            </div>

            {/* Standard Links */}
            <Link
              href="/about"
              className={`px-3 py-2 text-sm font-medium rounded-md transition ${
                pathname === '/about'
                  ? 'text-teal-700 font-semibold bg-teal-50/50'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t('About', 'عن الشركة')}
            </Link>

            <Link
              href="/services"
              className={`px-3 py-2 text-sm font-medium rounded-md transition ${
                pathname === '/services'
                  ? 'text-teal-700 font-semibold bg-teal-50/50'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t('Services', 'الخدمات')}
            </Link>

            <Link
              href="/quality-regulatory"
              className={`px-3 py-2 text-sm font-medium rounded-md transition ${
                pathname === '/quality-regulatory'
                  ? 'text-teal-700 font-semibold bg-teal-50/50'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t('Quality & Regulatory', 'الجودة والشؤون التنظيمية')}
            </Link>

            <Link
              href="/supply-chain"
              className={`px-3 py-2 text-sm font-medium rounded-md transition ${
                pathname === '/supply-chain'
                  ? 'text-teal-700 font-semibold bg-teal-50/50'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t('Supply Chain', 'سلاسل الإمداد')}
            </Link>

            <Link
              href="/industries"
              className={`px-3 py-2 text-sm font-medium rounded-md transition ${
                pathname === '/industries'
                  ? 'text-teal-700 font-semibold bg-teal-50/50'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t('Industries', 'القطاعات')}
            </Link>

            <Link
              href="/insights"
              className={`px-3 py-2 text-sm font-medium rounded-md transition ${
                pathname === '/insights'
                  ? 'text-teal-700 font-semibold bg-teal-50/50'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t('Insights', 'المقالات')}
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 text-sm font-medium rounded-md transition ${
                pathname === '/contact'
                  ? 'text-teal-700 font-semibold bg-teal-50/50'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t('Contact', 'اتصل بنا')}
            </Link>
          </nav>

          {/* Right Header CTAs */}
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <LanguageSwitcher />
            </div>
            <Button
              variant="teal"
              size="sm"
              onClick={() => setIsRfqOpen(true)}
              className="hidden font-semibold shadow-xs sm:inline-flex"
            >
              {t('Request a Quote', 'طلب تسعير')}
            </Button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-md focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
            <Link
              href="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-bold text-teal-800 rounded-md bg-teal-50/60"
            >
              {t('All Products Catalog', 'دليل المنتجات الشامل')}
            </Link>
            <div className="pl-4 space-y-1 text-sm border-l-2 border-teal-200 rtl:border-l-0 rtl:border-r-2 rtl:pr-4">
              <Link
                href="/divisions/pharmaceutical-apis"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1 text-slate-700 hover:text-teal-700"
              >
                {t('Active Pharmaceutical Ingredients (APIs)', 'المواد الفعالة الصيدلانية')}
              </Link>
              <Link
                href="/divisions/pharmaceutical-excipients"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1 text-slate-700 hover:text-teal-700"
              >
                {t('Pharmaceutical Excipients', 'السواغات الصيدلانية')}
              </Link>
              <Link
                href="/divisions/nutraceutical-ingredients"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1 text-slate-700 hover:text-teal-700"
              >
                {t('Nutraceutical Ingredients', 'مكونات المكملات الغذائية')}
              </Link>
              <Link
                href="/divisions/veterinary-ingredients"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1 text-slate-700 hover:text-teal-700"
              >
                {t('Veterinary Ingredients', 'المكونات البيطرية')}
              </Link>
              <Link
                href="/divisions/cosmeceuticals-ingredients"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1 text-slate-700 hover:text-teal-700"
              >
                {t('Cosmeceuticals Ingredients', 'مستحضرات التجميل العلاجية')}
              </Link>
            </div>

            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
            >
              {t('About DELTACHEM', 'عن دلتا كيم')}
            </Link>
            <Link
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
            >
              {t('Services', 'الخدمات')}
            </Link>
            <Link
              href="/quality-regulatory"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
            >
              {t('Quality & Regulatory', 'الجودة والشؤون التنظيمية')}
            </Link>
            <Link
              href="/supply-chain"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
            >
              {t('Supply Chain & Logistics', 'سلاسل الإمداد والتخزين')}
            </Link>
            <Link
              href="/industries"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
            >
              {t('Industries We Serve', 'القطاعات الصناعية')}
            </Link>
            <Link
              href="/partners"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
            >
              {t('Global Partners', 'شركاؤنا العالميون')}
            </Link>
            <Link
              href="/insights"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
            >
              {t('News & Insights', 'الأخبار والمقالات')}
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
            >
              {t('Contact Us', 'اتصل بنا')}
            </Link>
          </div>
        )}
      </header>

      {/* Global RFQ modal instance */}
      <RfqModal
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
      />
    </>
  );
};
