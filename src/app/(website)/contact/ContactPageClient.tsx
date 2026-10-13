'use client';

import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Warehouse,
  ExternalLink,
} from 'lucide-react';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Reveal } from '@/components/molecules/Reveal';
import { SITE_CONFIG } from '@/config/site';
import { useLanguage } from '@/components/providers/LanguageContext';
import { ContactClient } from './ContactClient';

export const ContactPageClient: React.FC = () => {
  const { t, locale } = useLanguage();

  return (
    <>
      {/* 1. Contact Hero */}
      <SectionShell label={t('Overview', 'نظرة عامة')} tone="forest" image="/images/bg-cairo-dusk.jpg">
        <Reveal className="mx-auto max-w-4xl space-y-6 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Direct B2B Communication', 'قنوات اتصال وتواصل مباشر (B2B)')}
            title={t(
              'Connect with Our Technical & Sales Specialists',
              'تواصل مع خبرائنا الفنيين وفريق المبيعات'
            )}
            description={t(
              'Headquartered in Cairo, Egypt, DELTACHEM supports formulators, procurement executives and regulatory managers across the pharmaceutical and chemical sectors.',
              'يقع مقرنا الرئيسي في القاهرة، مصر، وتدعم دلتا كيم مسؤولي الصياغة الدوائية، ومديري المشتريات، ومديري الشؤون التنظيمية عبر قطاعات الأدوية والكيماويات.'
            )}
          />
        </Reveal>
      </SectionShell>

      {/* 2. Direct Channels & Interactive Form */}
      <SectionShell label={t('Inquire', 'طلب استفسار')} tone="light">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Direct Corporate Details */}
          <Reveal className="space-y-6 lg:col-span-5">
            <div className="rounded-3xl border border-teal-200 bg-teal-50 p-6 shadow-sm sm:p-8">
              <span className="inline-block rounded-md border border-teal-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-700">
                {t('Executive Headquarters', 'المقر الإداري والتنفيذي')}
              </span>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
                {t('Cairo Head Office', 'المقر الرئيسي - القاهرة')}
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                {t(
                  'Direct commercial inquiries, indent representation and contract administration.',
                  'استفسارات تجارية مباشرة، تمثيل الوكالات التجارية، وإدارة العقود والتوريد.'
                )}
              </p>

              <div className="mt-5 space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {t('Physical Address', 'العنوان الفعلي')}
                    </span>
                    <span className="font-extrabold text-slate-900 leading-snug">
                      {locale === 'ar' ? SITE_CONFIG.contact.address_ar : SITE_CONFIG.contact.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {t('Direct Phone (Cairo)', 'الهاتف المباشر (القاهرة)')}
                    </span>
                    <a
                      href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9]/g, '')}`}
                      className="font-extrabold text-slate-900 hover:text-teal-700"
                    >
                      {SITE_CONFIG.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {t('Sales & Quotation Desk', 'مكتب المبيعات والتسعير')}
                    </span>
                    <a
                      href={`mailto:${SITE_CONFIG.contact.salesEmail}`}
                      className="font-extrabold text-teal-700 hover:underline"
                    >
                      {SITE_CONFIG.contact.salesEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {t('Official Business Hours', 'مواعيد العمل الرسمية')}
                    </span>
                    <span className="font-extrabold text-slate-900">
                      {locale === 'ar' ? SITE_CONFIG.contact.workingHours_ar : SITE_CONFIG.contact.workingHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sister Company Warehouse Card */}
            <div className="rounded-3xl border border-teal-800 bg-teal-950 p-6 text-white shadow-md sm:p-7">
              <div className="mb-2 flex items-center gap-2">
                <Warehouse className="h-4 w-4 text-teal-400" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
                  {t('Warehousing & Logistics', 'المستودعات والخدمات اللوجستية')}
                </span>
              </div>
              <h4 className="text-lg font-extrabold">
                {t('Harvest Pharma Alliance', 'تحالف هارفست فارما الشقيقة')}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">
                {t(
                  'GDP warehousing in Cairo. Buffer storage, cold chain 2°C–8°C and express nationwide dispatch.',
                  'مستودعات مطابقة لممارسات GDP في القاهرة. تخزين أمان استراتيجي، سلسلة تبريد 2°C–8°C، وشحن سريع لجميع أنحاء الجمهورية.'
                )}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-teal-800/80 pt-3 text-xs">
                <span className="text-slate-400">{t('Sister Entity Portal:', 'بوابة الكيان الشقيق:')}</span>
                <a
                  href="https://www.harvestpharma-eg.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-teal-400 hover:text-white"
                >
                  <span>www.harvestpharma-eg.com</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Contact Client Interactive Form */}
          <Reveal delay={0.15} x={30} y={0} className="lg:col-span-7">
            <ContactClient />
          </Reveal>
        </div>
      </SectionShell>

      {/* 3. Location & Accessibility */}
      <SectionShell label={t('Location', 'الموقع الجغرافي')} tone="tint">
        <Reveal className="mx-auto max-w-4xl space-y-5 text-center">
          <SectionHeader
            align="center"
            eyebrow={t('Gesr El-Suez Hub', 'مركز جسر السويس اللوجستي')}
            title={t('Visiting Our Cairo Executive Office', 'زيارة مقرنا الإداري والتنفيذي بالقاهرة')}
            description={t(
              'Our headquarters is centrally situated in Gesr El-Suez, Cairo, providing streamlined access to Cairo International Airport and major industrial highways connecting Obour, 10th of Ramadan and 6th of October.',
              'يقع مقرنا الرئيسي في موقع متميز بجسر السويس بالقاهرة، مما يوفر وصولاً سلساً لمطار القاهرة الدولي والمحاور الصناعية الكبرى التي تربط العبور، والعاشر من رمضان، والسادس من أكتوبر.'
            )}
          />
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-teal-200 bg-white px-6 py-3.5 text-sm font-extrabold text-slate-900 shadow-md">
              <MapPin className="h-5 w-5 text-teal-600" />
              <span>
                {locale === 'ar'
                  ? '66 شارع جمال الدين زكي، جسر السويس، القاهرة، جمهورية مصر العربية'
                  : '66 Gamal El-Deen Zaki st, Gesr El-Suez, Cairo, Egypt'}
              </span>
            </div>
          </div>
        </Reveal>
      </SectionShell>
    </>
  );
};
