'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/atoms/Button';
import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher';
import { RfqModal } from '@/components/molecules/RfqModal';
import { useLanguage } from '@/components/providers/LanguageContext';
import { SPRING_SNAPPY, CROSSFADE_REDUCED } from '@/lib/motion';
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck,
  FlaskConical,
  Pill,
  MessageCircle,
  HeartPulse,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isProductsDropdownOpen && !isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsProductsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target;
      if (
        isProductsDropdownOpen &&
        dropdownContainerRef.current &&
        target instanceof Node &&
        !dropdownContainerRef.current.contains(target)
      ) {
        setIsProductsDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isProductsDropdownOpen, isMobileMenuOpen]);

  const menuTransition = reduceMotion ? CROSSFADE_REDUCED : SPRING_SNAPPY;

  return (
    <>
      {/* Top corporate bar */}
      <div className="snap-top hidden border-b border-teal-900 bg-teal-950 px-4 py-2 text-xs text-slate-300 md:block">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {t('Pharmaceutical Raw Materials Supply · Egypt & MENA', 'استيراد وتوريد الخامات الدوائية · مصر والشرق الأوسط')}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-slate-200">
              <Phone className="h-3.5 w-3.5 text-teal-400" />
              <a href={`tel:${siteConfig.contact.phoneClean}`} className="font-mono hover:text-white">
                {siteConfig.contact.phone}
              </a>
              <span className="text-slate-600">/</span>
              <a href={`tel:${siteConfig.contact.phoneSecondaryClean}`} className="font-mono hover:text-white">
                {siteConfig.contact.phoneSecondary}
              </a>
            </div>

            <a
              href={siteConfig.socials.whatsappPrimary}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/20 px-2.5 py-0.5 text-emerald-300 transition hover:bg-emerald-600 hover:text-white active:scale-95"
            >
              <MessageCircle className="h-3 w-3" />
              <span className="font-mono">{siteConfig.contact.mobiles[0].display}</span>
            </a>

            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-1 text-slate-300 transition hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-teal-400" />
              <span>{siteConfig.contact.email}</span>
            </a>

            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header
        className={`sticky top-0 z-40 w-full transition-shadow duration-300 ${
          isScrolled ? 'border-b border-slate-200 bg-white shadow-md' : 'border-b border-slate-100 bg-white'
        }`}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Official Brand Logo */}
          <Link href="/" className="flex shrink-0 items-center transition-transform active:scale-[0.98]">
            <Image
              src="/images/logo-delta-chem.png"
              alt="DELTACHEM - From Quality to Excellence"
              width={932}
              height={531}
              priority
              fetchPriority="high"
              className="h-12 w-auto object-contain sm:h-13"
            />
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden items-center gap-1 lg:flex xl:gap-2">
            {/* Products Mega Dropdown (hover + click/tap + keyboard + Esc) */}
            <div
              ref={dropdownContainerRef}
              className="relative"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <button
                type="button"
                aria-expanded={isProductsDropdownOpen}
                aria-haspopup="true"
                aria-controls="products-sector-menu"
                onClick={() => setIsProductsDropdownOpen((prev) => !prev)}
                className={`flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-150 active:scale-[0.97] ${
                  pathname.startsWith('/products') || pathname.startsWith('/divisions')
                    ? 'bg-teal-600/10 text-teal-700'
                    : 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-900'
                }`}
              >
                <span>{t('Products', 'دليل الخامات')}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isProductsDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isProductsDropdownOpen && (
                  <motion.div
                    id="products-sector-menu"
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -4 }}
                    transition={menuTransition}
                    className="absolute left-0 top-full z-50 mt-1 grid w-[560px] origin-top-left grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl rtl:left-auto rtl:right-0 rtl:origin-top-right"
                  >
                    <div className="col-span-2 mb-1 flex items-center justify-between border-b border-slate-200/70 pb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 rtl:normal-case rtl:tracking-normal">
                        {t('Four Core Sectors', 'القطاعات الأربعة الرئيسية')}
                      </span>
                      <Link
                        href="/products"
                        onClick={() => setIsProductsDropdownOpen(false)}
                        className="text-xs font-semibold text-teal-700 hover:text-teal-900"
                      >
                        {t('Full Product List →', 'كل الخامات ←')}
                      </Link>
                    </div>

                    <Link
                      href="/divisions/human-raw-materials"
                      onClick={() => setIsProductsDropdownOpen(false)}
                      className="group rounded-xl border border-transparent p-3 transition hover:border-slate-200/80 hover:bg-white/80 active:scale-[0.98]"
                    >
                      <div className="mb-1 flex items-center gap-2">
                        <Pill className="h-4 w-4 text-teal-600" />
                        <span className="text-sm font-bold text-slate-800 group-hover:text-teal-700">
                          {t('Human Raw Materials', 'الخامات البشرية')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {t('APIs, antibiotics, analgesics & excipients', 'مضادات حيوية ومسكنات وسواغات دوائية')}
                      </p>
                    </Link>

                    <Link
                      href="/divisions/veterinary-raw-materials"
                      onClick={() => setIsProductsDropdownOpen(false)}
                      className="group rounded-xl border border-transparent p-3 transition hover:border-slate-200/80 hover:bg-white/80 active:scale-[0.98]"
                    >
                      <div className="mb-1 flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-bold text-slate-800 group-hover:text-amber-700">
                          {t('Veterinary Raw Materials', 'الخامات البيطرية')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {t('Vet antibiotics, antiparasitics & feed vitamins', 'مضادات حيوية بيطرية وإضافات أعلاف')}
                      </p>
                    </Link>

                    <Link
                      href="/divisions/cosmetics-raw-materials"
                      onClick={() => setIsProductsDropdownOpen(false)}
                      className="group rounded-xl border border-transparent p-3 transition hover:border-slate-200/80 hover:bg-white/80 active:scale-[0.98]"
                    >
                      <div className="mb-1 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-sky-600" />
                        <span className="text-sm font-bold text-slate-800 group-hover:text-sky-700">
                          {t('Cosmetics Raw Materials', 'خامات مستحضرات التجميل')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {t('Carbomers, UV filters, surfactants & bases', 'كاربومير وفلاتر شمس ومستحلبات')}
                      </p>
                    </Link>

                    <Link
                      href="/divisions/nutraceutical-raw-materials"
                      onClick={() => setIsProductsDropdownOpen(false)}
                      className="group rounded-xl border border-transparent p-3 transition hover:border-slate-200/80 hover:bg-white/80 active:scale-[0.98]"
                    >
                      <div className="mb-1 flex items-center gap-2">
                        <HeartPulse className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                          {t('Nutraceutical Raw Materials', 'خامات المكملات الغذائية')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {t('Vitamins, gluconates, minerals & sweeteners', 'فيتامينات وجلوكونات ومعادن ومحليات')}
                      </p>
                    </Link>

                    <Link
                      href="/products"
                      onClick={() => setIsProductsDropdownOpen(false)}
                      className="col-span-2 flex items-center justify-between rounded-xl border border-teal-200/80 bg-teal-50/80 px-3.5 py-2.5 text-xs font-bold text-teal-800 transition hover:bg-teal-100 active:scale-[0.99]"
                    >
                      <span className="flex items-center gap-2">
                        <FlaskConical className="h-4 w-4" />
                        {t('Search All Certified Raw Materials', 'البحث في كامل قائمة الخامات المعتمدة')}
                      </span>
                      <span className="rtl:rotate-180">→</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/about"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition active:scale-[0.97] ${
                pathname === '/about'
                  ? 'bg-teal-600/10 font-semibold text-teal-700'
                  : 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-900'
              }`}
            >
              {t('About', 'عن الشركة')}
            </Link>

            <Link
              href="/services"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition active:scale-[0.97] ${
                pathname === '/services'
                  ? 'bg-teal-600/10 font-semibold text-teal-700'
                  : 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-900'
              }`}
            >
              {t('Services', 'الخدمات')}
            </Link>

            <Link
              href="/quality-regulatory"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition active:scale-[0.97] ${
                pathname === '/quality-regulatory'
                  ? 'bg-teal-600/10 font-semibold text-teal-700'
                  : 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-900'
              }`}
            >
              {t('Quality', 'الجودة والتسجيل')}
            </Link>

            <Link
              href="/supply-chain"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition active:scale-[0.97] ${
                pathname === '/supply-chain'
                  ? 'bg-teal-600/10 font-semibold text-teal-700'
                  : 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-900'
              }`}
            >
              {t('Supply Chain', 'سلاسل الإمداد')}
            </Link>

            <Link
              href="/industries"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition active:scale-[0.97] ${
                pathname === '/industries'
                  ? 'bg-teal-600/10 font-semibold text-teal-700'
                  : 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-900'
              }`}
            >
              {t('Sectors', 'القطاعات')}
            </Link>

            <Link
              href="/insights"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition active:scale-[0.97] ${
                pathname.startsWith('/insights')
                  ? 'bg-teal-600/10 font-semibold text-teal-700'
                  : 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-900'
              }`}
            >
              {t('Insights', 'المقالات')}
            </Link>

            <Link
              href="/contact"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition active:scale-[0.97] ${
                pathname === '/contact'
                  ? 'bg-teal-600/10 font-semibold text-teal-700'
                  : 'text-slate-700 hover:bg-slate-900/5 hover:text-slate-900'
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
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-900/5 hover:text-slate-900 active:scale-95 lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={menuTransition}
              className="space-y-2 border-t border-slate-200 bg-white px-4 pb-6 pt-3 shadow-xl lg:hidden"
            >
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-lg bg-teal-50/80 px-3 py-2 text-base font-bold text-teal-800"
              >
                {t('Full Product Catalog', 'قائمة الخامات الكاملة')}
              </Link>
              <div className="space-y-1 border-l-2 border-teal-200 pl-4 text-sm rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4">
                <Link
                  href="/divisions/human-raw-materials"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1 text-slate-700 hover:text-teal-700"
                >
                  {t('Human Raw Materials', 'الخامات البشرية')}
                </Link>
                <Link
                  href="/divisions/veterinary-raw-materials"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1 text-slate-700 hover:text-teal-700"
                >
                  {t('Veterinary Raw Materials', 'الخامات البيطرية')}
                </Link>
                <Link
                  href="/divisions/cosmetics-raw-materials"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1 text-slate-700 hover:text-teal-700"
                >
                  {t('Cosmetics Raw Materials', 'خامات مستحضرات التجميل')}
                </Link>
                <Link
                  href="/divisions/nutraceutical-raw-materials"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1 text-slate-700 hover:text-teal-700"
                >
                  {t('Nutraceutical Raw Materials', 'خامات المكملات الغذائية')}
                </Link>
              </div>

              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-white/70"
              >
                {t('About DELTACHEM', 'عن دلتا كيم')}
              </Link>
              <Link
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-white/70"
              >
                {t('Services', 'الخدمات')}
              </Link>
              <Link
                href="/quality-regulatory"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-white/70"
              >
                {t('Quality & Regulatory', 'الجودة والتسجيل')}
              </Link>
              <Link
                href="/supply-chain"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-white/70"
              >
                {t('Supply Chain', 'سلاسل الإمداد')}
              </Link>
              <Link
                href="/industries"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-white/70"
              >
                {t('Industries & Sectors', 'القطاعات الصناعية')}
              </Link>
              <Link
                href="/partners"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-white/70"
              >
                {t('Global Partners', 'شركاؤنا العالميون')}
              </Link>
              <Link
                href="/insights"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100"
              >
                {t('News & Insights', 'الأخبار والمقالات')}
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-white/70"
              >
                {t('Contact Us', 'اتصل بنا')}
              </Link>

              <div className="flex flex-wrap gap-2 border-t border-slate-200/70 pt-3">
                <a
                  href={siteConfig.socials.whatsappPrimary}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white active:scale-[0.98]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{siteConfig.contact.mobiles[0].display}</span>
                </a>
                <a
                  href={`tel:${siteConfig.contact.phoneClean}`}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 active:scale-[0.98]"
                >
                  <Phone className="h-4 w-4 text-teal-600" />
                  <span>{siteConfig.contact.phone}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global RFQ modal instance */}
      <RfqModal isOpen={isRfqOpen} onClose={() => setIsRfqOpen(false)} />
    </>
  );
};
