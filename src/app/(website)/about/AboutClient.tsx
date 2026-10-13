'use client';

import React from 'react';
import Link from 'next/link';
import {
  Award,
  ShieldCheck,
  Building2,
  Globe2,
  CheckCircle2,
  FileCheck,
  ArrowRight,
  TrendingUp,
  FlaskConical,
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Reveal } from '@/components/molecules/Reveal';
import { SITE_CONFIG } from '@/config/site';
import { useLanguage } from '@/components/providers/LanguageContext';

export const AboutClient: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* 1. Hero */}
      <SectionShell label="Profile" tone="forest" image="/images/about-qc-lab.jpg">
        <Reveal className="mx-auto max-w-4xl space-y-6 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Corporate Profile & Heritage', 'الملف المؤسسي والريادة')}
            title={t(
              'Pioneering Chemical & Pharmaceutical Integrity in Egypt',
              'رواد النقاء والجودة في المواد الخام الصيدلانية بمصر'
            )}
            description={t(
              'Founded on deep technical expertise and doctoral-level quality governance, DELTACHEM connects leading global chemical producers with Egypt and the MENA region’s foremost pharmaceutical manufacturers.',
              'تأسست دلتا كيم على خبرة فنية عميقة وحوكمة جودة بدرجة الدكتوراه، لتربط كبرى مصانع الكيماويات العالمية بمصانع الأدوية الرائدة في مصر والشرق الأوسط.'
            )}
          />
          <div className="flex flex-wrap justify-center gap-4 pt-3">
            <Link href="/products">
              <Button size="lg" variant="teal" className="px-8 font-bold shadow-xl shadow-teal-950/60">
                <span>{t('Browse Product Catalog', 'استعراض دليل المنتجات')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
            <Link href="/quality-regulatory">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 px-7 font-bold text-white backdrop-blur-md hover:bg-white/10"
              >
                {t('Quality Standards & Compliance', 'معايير الجودة والامتثال الرقابي')}
              </Button>
            </Link>
          </div>
        </Reveal>
      </SectionShell>

      {/* 2. Founder & Leadership */}
      <SectionShell label="Leadership" tone="light">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="rounded-3xl border border-teal-200 bg-teal-50 p-7 shadow-xl sm:p-9">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md">
                <Award className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                {t('Dr. Abdelhamid Aboelaly', 'د. عبدالحميد أبو العلي')}
              </h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-teal-700">
                {t('Founder & Managing Director', 'المؤسس والمدير العام')}
              </p>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                  <span>
                    {t(
                      '20+ years of industrial chemistry & pharmaceutical distribution leadership',
                      'أكثر من ٢٠ عاماً من القيادة في الكيمياء الصناعية وتوزيع المواد الدوائية'
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                  <span>
                    {t(
                      'Master of Business Administration (MBA) in International Management',
                      'ماجستير إدارة الأعمال (MBA) في الإدارة الدولية'
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                  <span>
                    {t(
                      'Doctorate Degree in Quality Management Systems',
                      'درجة الدكتوراه في نظم إدارة الجودة الشاملة'
                    )}
                  </span>
                </li>
              </ul>
              <blockquote className="mt-5 border-t border-teal-200 pt-4 text-xs italic leading-relaxed text-slate-600">
                &ldquo;
                {t(
                  'In pharmaceutical procurement, an ingredient is only as dependable as the regulatory documentation and quality assurance backing each drum. Our commitment is absolute purity and full traceability.',
                  'في التوريد الدوائي، موثوقية المادة الخام تقاس بدقة التوثيق الرقابي وضمان الجودة المصاحب لكل عبوة. التزامنا هو النقاوة المطلقة والتتبع الكامل.'
                )}
                &rdquo;
              </blockquote>
            </div>
          </Reveal>

          <Reveal delay={0.15} x={30} y={0} className="space-y-5 lg:col-span-7">
            <SectionHeader
              eyebrow={t('Executive Leadership', 'القيادة التنفيذية')}
              title={t(
                'Founded on Technical Knowledge and Quality Management',
                'تأسست على المعرفة التقنية العميقة وإدارة الجودة'
              )}
              description={t(
                'DELTACHEM was established with a singular objective: to elevate the standard of raw material distribution in Egypt. Under the direction of Dr. Abdelhamid Aboelaly, the company blends deep chemical comprehension with modern supply chain orchestration.',
                'تأسست دلتا كيم بهدف واضح: الارتقاء بمستوى توريد وتوزيع المواد الخام في مصر. بقيادة د. عبدالحميد أبو العلي، تجمع الشركة بين الفهم الكيميائي الدقيق والتنظيم اللوجستي الحديث.'
              )}
            />
            <p className="text-base leading-relaxed text-slate-600">
              {t(
                'Recognizing that local pharmaceutical manufacturers require more than simple commodity broking, DELTACHEM functions as a technical consultant and authorized agent, facilitating full EDA regulatory filings, technical dossier reviews and secure supply agreements.',
                'إدراكاً لحاجة مصانع الأدوية المحلية إلى ما يتجاوز مجرد الوساطة التجارية، تعمل دلتا كيم كمستشار فني ووكيل معتمد، لتدير ملفات التسجيل لدى هيئة الدواء المصرية ومراجعة الملفات الفنية وعقود التوريد المباشرة.'
              )}
            </p>
            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <FlaskConical className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h4 className="font-extrabold text-slate-900">{t('Technical Rigor', 'الدقة العلمية')}</h4>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {t(
                    'Pre-evaluated chemical monographs and active verification of manufacturer cGMP certifications.',
                    'تقييم مسبق للمواصفات الكيميائية والتحقق الفعلي من شهادات التصنيع الجيد cGMP للمصانع.'
                  )}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h4 className="font-extrabold text-slate-900">
                    {t('Regulatory Preparedness', 'الجاهزية الرقابية')}
                  </h4>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {t(
                    'Expedited provision of DMF Open Parts, COA verification and allergen & nitrosamine statements.',
                    'توفير سريع للأجزاء المفتوحة من ملفات DMF وشهادات التحليل وإقرارات النيتروزامين ومسببات الحساسية.'
                  )}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* 3. Sister Company: Harvest Pharma */}
      <SectionShell label="Harvest Hub" tone="navy" image="/images/pharma-warehouse-coldchain.jpg">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <Reveal className="space-y-5 lg:col-span-8">
            <SectionHeader
              onDark
              eyebrow={t('Logistics & Warehousing Synergy', 'التكامل اللوجستي والتخزين')}
              title={t(
                'Sister Company Alliance: Harvest Pharma Cairo Hub',
                'التحالف الاستراتيجي مع الشقيقة هارفست فارما بالقاهرة'
              )}
              description={t(
                'DELTACHEM operates in close strategic partnership with Harvest Pharma, an established pharmaceutical distributor and licensed warehouse operator in Gesr El-Suez, Cairo.',
                'تعمل دلتا كيم بشراكة استراتيجية وثيقة مع هارفست فارما، الموزع الدوائي المرخص وصاحب المستودعات المعتمدة في جسر السويس بالقاهرة.'
              )}
            />
            <p className="text-base leading-relaxed text-slate-200">
              {t(
                'This partnership grants DELTACHEM immediate access to licensed, temperature-regulated and humidity-monitored pharmaceutical warehousing facilities. Clients benefit from prompt local buffer stock availability without exposure to international shipping delays.',
                'تمنح هذه الشراكة دلتا كيم وصولاً فورياً لمستودعات دوائية مرخصة ومراقبة الحرارة والرطوبة على مدار الساعة. يستفيد عملاؤنا من مخزون محلي استراتيجي لتجنب أي تأخيرات في الشحن الدولي.'
              )}
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-sm text-slate-200">
              <span className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 backdrop-blur">
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                {t('GDP-Compliant Facility', 'منشأة مطابقة لمعايير التوزيع الجيد GDP')}
              </span>
              <span className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 backdrop-blur">
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                {t('2°C–8°C Cold Chain & Ambient', 'تخزين مبرد ٢-٨° مئوية وتخزين مضبوط')}
              </span>
              <span className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 backdrop-blur">
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                {t('Cairo Central Hub Dispatch', 'شحن فوري من مستودعات القاهرة')}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15} x={30} y={0} className="lg:col-span-4">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-7 text-center text-white backdrop-blur-xl sm:p-9">
              <Building2 className="mx-auto mb-3 h-14 w-14 text-teal-300" aria-hidden="true" />
              <h4 className="text-xl font-extrabold">{t('Harvest Pharma', 'هارفست فارما')}</h4>
              <p className="mt-2 text-xs text-slate-300">
                {t(
                  'Licensed Warehousing & Cold-Chain Management (Cairo)',
                  'تخزين دوائي مرخص وإدارة سلسلة التبريد (القاهرة)'
                )}
              </p>
              <Link href="/supply-chain" className="mt-6 inline-block">
                <Button variant="teal" size="md" className="font-bold">
                  <span>{t('Explore Supply Chain', 'استكشف سلسلة الإمداد')}</span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* 4. Guiding Principles */}
      <SectionShell label="Principles" tone="tint">
        <div className="space-y-6">
          <SectionHeader
            align="center"
            eyebrow={t('Guiding Principles', 'المبادئ الحاكمة')}
            title={t('Engineered for Scientific Reliability', 'مصممة لتحقيق الموثوقية العلمية')}
            description={t(
              'Our principles govern every transaction, from initial supplier screening to final cleanroom delivery.',
              'تحكم مبادؤنا كل خطوة، بدءاً من فحص المورد الأجنبي وحتى تسليم الشحنة لغرف الإنتاج النظيفة.'
            )}
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <Reveal delay={0.05} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {t('Uncompromising Quality', 'جودة لا تقبل المساومة')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t(
                  'We represent manufacturers adhering strictly to WHO, EU-GMP and US-FDA standards. Pharmacopoeial conformity (USP, BP, Ph. Eur.) is systematically verified.',
                  'نمثل مصانع ملتزمة بأعلى معايير منظمة الصحة العالمية والاتحاد الأوروبي وUS-FDA. نتحقق بدقة من مطابقة دساتير الأدوية الدولية.'
                )}
              </p>
            </Reveal>

            <Reveal delay={0.15} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                <FileCheck className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {t('Regulatory Partnership', 'شراكة تنظيمية متكاملة')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t(
                  'We do not just supply chemicals; we support the regulatory lifecycle. We equip Egyptian manufacturers with full dossiers to expedite EDA approvals.',
                  'لا نكتفي بتوريد المواد الكيميائية، بل ندعم دورة التسجيل بالكامل، ونزود مصانع الأدوية بملفات متكاملة لتسريع اعتمادات هيئة الدواء.'
                )}
              </p>
            </Reveal>

            <Reveal delay={0.25} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                <TrendingUp className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {t('Reliable Continuity', 'استمرارية موثوقة للإمداد')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t(
                  'Through buffer warehousing at Harvest Pharma and scheduled maritime shipments, we protect our clients against global raw material market volatility.',
                  'من خلال التخزين الاستراتيجي بمستودعات هارفست فارما والشحنات المنتظمة، نحمي عملاءنا من تقلبات وتوقفات سلاسل الإمداد العالمية.'
                )}
              </p>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* 5. Geographic Scope & Presence */}
      <SectionShell label="Footprint" tone="light">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <Reveal className="space-y-5 lg:col-span-6">
            <SectionHeader
              eyebrow={t('Territory Coverage', 'التغطية الجغرافية')}
              title={t('Serving Key Industrial Clusters Across Egypt', 'خدمة كافة المجمعات الصناعية الدوائية في مصر')}
              description={t(
                'DELTACHEM operates from headquarters in Gesr El-Suez, Cairo, with logistics distribution reaching all major manufacturing belts across the country.',
                'تعمل دلتا كيم من مقرها الرئيسي بجسر السويس بالقاهرة، مع شبكة توزيع لوجستي تغطي أهم المناطق الصناعية في الجمهورية.'
              )}
            />
            <div className="grid grid-cols-2 gap-3 pt-2 text-sm">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="font-extrabold text-teal-900">{t('Greater Cairo', 'القاهرة الكبرى')}</h4>
                <p className="mt-1 text-xs text-slate-600">
                  {t('Obour, Badr City, Gesr El-Suez', 'العبور، مدينة بدر، جسر السويس')}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="font-extrabold text-teal-900">{t('10th of Ramadan', 'العاشر من رمضان')}</h4>
                <p className="mt-1 text-xs text-slate-600">
                  {t('Major pharma & chemical zones', 'كبرى المناطق الدوائية والكيميائية')}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="font-extrabold text-teal-900">{t('6th of October', 'السادس من أكتوبر')}</h4>
                <p className="mt-1 text-xs text-slate-600">
                  {t('Industrial zones 1 through 6', 'المناطق الصناعية من ١ إلى ٦')}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="font-extrabold text-teal-900">{t('Alexandria & Delta', 'الإسكندرية والدلتا')}</h4>
                <p className="mt-1 text-xs text-slate-600">
                  {t('Borg El Arab, Sadat City, Tanta', 'برج العرب، مدينة السادات، طنطا')}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} x={30} y={0} className="lg:col-span-6">
            <div className="rounded-3xl border border-teal-100 bg-teal-50 p-7 shadow-sm sm:p-9">
              <div className="mb-4 flex items-center gap-3">
                <Globe2 className="h-6 w-6 text-teal-700" aria-hidden="true" />
                <h3 className="text-lg font-extrabold text-slate-900">
                  {t('Headquarters & Registry', 'المقر الرئيسي وبيانات التواصل')}
                </h3>
              </div>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="font-bold text-slate-500">{t('Head Office', 'المكتب الرئيسي')}</dt>
                  <dd className="mt-0.5 font-bold text-slate-900">
                    {t(SITE_CONFIG.contact.address, SITE_CONFIG.contact.address_ar)}
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-500">{t('Telephone Direct Line', 'الهاتف المباشر')}</dt>
                  <dd className="mt-0.5 font-bold text-slate-900">{SITE_CONFIG.contact.phone}</dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-500">{t('Sales & Inquiries Email', 'البريد الإلكتروني للمبيعات')}</dt>
                  <dd className="mt-0.5 font-bold text-teal-700">{SITE_CONFIG.contact.salesEmail}</dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-500">{t('Operational Jurisdiction', 'النطاق الجغرافي والتشغيلي')}</dt>
                  <dd className="mt-0.5 font-bold text-slate-900">
                    {t(
                      'Arab Republic of Egypt & MENA Regional Partnerships',
                      'جمهورية مصر العربية وشراكات الشرق الأوسط وشمال أفريقيا'
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* 6. Partner With DELTACHEM */}
      <SectionShell label="Partner" tone="forest" image="/images/bg-cairo-dusk.jpg">
        <Reveal className="mx-auto max-w-4xl space-y-6 py-6 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Commercial Engagement', 'الشراكة والتعاون التجاري')}
            title={t('Partner with DELTACHEM Today', 'ابدأ شراكتك مع دلتا كيم اليوم')}
            description={t(
              'Whether you require an immediate quotation for pharmaceutical excipients or wish to explore agency representation in Egypt, our team is ready to assist.',
              'سواء كنت بحاجة لعرض سعر فوري للسواغات والمواد الفعالة أو ترغب في توقيع عقد وكالة تجارية في مصر، فريقنا مستعد لمساعدتك.'
            )}
          />
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/request-a-quote">
              <Button size="lg" variant="teal" className="px-9 font-extrabold shadow-xl shadow-teal-950/50">
                {t('Submit Request for Quote', 'إرسال طلب تسعير')}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 px-8 font-bold text-white hover:bg-white/10"
              >
                {t('Contact Technical Sales', 'تواصل مع المبيعات الفنية')}
              </Button>
            </Link>
          </div>
        </Reveal>
      </SectionShell>
    </>
  );
};
