'use client';

import React from 'react';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  MessageCircle,
  Smartphone,
} from 'lucide-react';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Reveal } from '@/components/molecules/Reveal';
import { Button } from '@/components/atoms/Button';
import { SITE_CONFIG } from '@/config/site';
import { useLanguage } from '@/components/providers/LanguageContext';
import { ContactClient } from './ContactClient';

export const ContactPageClient: React.FC = () => {
  const { t, locale } = useLanguage();

  return (
    <>
      {/* 1. Contact Hero */}
      <SectionShell label={t('Overview', 'نظرة عامة')} tone="forest" image="/images/bg-cairo-dusk.jpg">
        <Reveal className="mx-auto max-w-3xl space-y-5 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Direct B2B Contact', 'التواصل المباشر')}
            title={t('Connect with DELTACHEM Cairo', 'تواصل مع شركة دلتا كيم')}
            description={t(
              'Reach our Cairo Head Office by phone, WhatsApp, or email for raw material quotations and inquiries.',
              'تواصل مع مقرنا الرئيسي بالقاهرة عبر الهاتف أو واتساب أو البريد الإلكتروني لطلبات التسعير والاستفسارات.'
            )}
          />
        </Reveal>
      </SectionShell>

      {/* 2. Direct Channels & Interactive Form */}
      <SectionShell label={t('Contact', 'بيانات التواصل')} tone="light">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Official Head Office & Channels */}
          <Reveal className="space-y-6 lg:col-span-5">
            <div className="rounded-3xl border border-teal-200 bg-teal-50 p-6 shadow-sm sm:p-8">
              <span className="inline-block rounded-md border border-teal-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-700">
                {t('Head Office', 'المقر الرئيسي')}
              </span>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
                {t('DELTACHEM Cairo', 'دلتا كيم — القاهرة')}
              </h3>

              <div className="mt-6 space-y-5 text-sm text-slate-700">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      {t('Head Office Address', 'عنوان المقر الرئيسي')}
                    </span>
                    <span className="font-bold leading-snug text-slate-900">
                      {locale === 'ar' ? SITE_CONFIG.contact.address_ar : SITE_CONFIG.contact.address}
                    </span>
                  </div>
                </div>

                {/* Landlines */}
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      {t('Landline Numbers', 'أرقام التليفون الأرضي')}
                    </span>
                    <div className="mt-1 flex flex-wrap items-center gap-2 font-mono font-extrabold text-slate-900">
                      {SITE_CONFIG.contact.landlines.map((line, i) => (
                        <React.Fragment key={line.display}>
                          <a href={`tel:${line.tel}`} className="hover:text-teal-700 hover:underline">
                            {line.display}
                          </a>
                          {i === 0 && <span className="text-slate-400">/</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobiles & WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div className="w-full space-y-2.5">
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      {t('Mobile & WhatsApp', 'الموبايل والتواصل عبر واتساب')}
                    </span>
                    {SITE_CONFIG.contact.mobiles.map((mob) => (
                      <div
                        key={mob.display}
                        className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-teal-200 bg-white p-2.5 shadow-2xs"
                      >
                        <a
                          href={`tel:${mob.tel}`}
                          className="inline-flex items-center gap-1.5 font-mono text-sm font-extrabold text-slate-900 hover:text-teal-700"
                        >
                          <Smartphone className="h-4 w-4 text-teal-600" />
                          <span>{mob.display}</span>
                        </a>
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`tel:${mob.tel}`}
                            className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                          >
                            {t('Call', 'اتصال')}
                          </a>
                          <a
                            href={mob.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white transition hover:bg-emerald-500"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>{t('WhatsApp', 'واتساب')}</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      {t('Sales & Quotations Email', 'البريد الإلكتروني للمبيعات')}
                    </span>
                    <a
                      href={`mailto:${SITE_CONFIG.contact.salesEmail}`}
                      className="font-extrabold text-teal-700 hover:underline"
                    >
                      {SITE_CONFIG.contact.salesEmail}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      {t('Business Hours', 'مواعيد العمل')}
                    </span>
                    <span className="font-bold text-slate-900">
                      {locale === 'ar'
                        ? SITE_CONFIG.contact.workingHours_ar
                        : SITE_CONFIG.contact.workingHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Harvest Pharma Sister Company Card */}
            <div className="overflow-hidden rounded-3xl border border-teal-800 bg-teal-950 text-white shadow-md">
              <div className="relative h-36 w-full">
                <Image
                  src="/images/harvest-warehouse-1.webp"
                  alt="Harvest Pharma Warehouse"
                  fill
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-3 p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white p-1.5">
                    <Image
                      src="/images/logo-harvest-pharma.png"
                      alt="Harvest Pharma"
                      width={557}
                      height={525}
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                  <h4 className="text-base font-extrabold">
                    {t('Harvest Pharma Warehousing', 'شركة هارفست فارما الشقيقة')}
                  </h4>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  {t(
                    'GDP-compliant cold and ambient pharmaceutical warehousing for local buffer inventory.',
                    'مخازن دوائية معتمدة ومضبوطة الحرارة لتخزين الخامات وتوريدها للمصانع.'
                  )}
                </p>
                <a
                  href={SITE_CONFIG.contact.warehouseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-white"
                >
                  <span>www.harvestpharma-eg.com</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Contact Form */}
          <Reveal delay={0.12} x={24} y={0} className="lg:col-span-7">
            <ContactClient />
          </Reveal>
        </div>
      </SectionShell>

      {/* 3. Location & Embedded Google Map */}
      <SectionShell label={t('Map & Location', 'الموقع على الخريطة')} tone="tint">
        <div className="space-y-8">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <SectionHeader
              eyebrow={t('Headquarters Map', 'الموقع الجغرافي الدقيق')}
              title={t('Visit Our Cairo Head Office', 'موقع المقر الرئيسي — جسر السويس، القاهرة')}
              description={t(
                SITE_CONFIG.contact.address,
                SITE_CONFIG.contact.address_ar
              )}
            />
            <a
              href={SITE_CONFIG.contact.mapsDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <Button variant="teal" size="md" className="font-bold">
                <MapPin className="h-4 w-4" />
                <span>{t('Open in Google Maps', 'فتح على خرائط جوجل')}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </a>
          </div>

          <div className="overflow-hidden rounded-3xl border border-teal-200 bg-white shadow-lg">
            <iframe
              title={t('DELTACHEM Cairo Head Office Map', 'خريطة المقر الرئيسي لشركة دلتا كيم')}
              src={SITE_CONFIG.contact.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[380px] w-full border-0 sm:h-[440px]"
              allowFullScreen
            />
          </div>
        </div>
      </SectionShell>
    </>
  );
};
