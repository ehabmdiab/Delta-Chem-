'use client';

import React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  FileCheck2,
  Search,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileText,
  BadgePercent,
  Warehouse,
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Reveal } from '@/components/molecules/Reveal';
import { useLanguage } from '@/components/providers/LanguageContext';

export const ServicesClient: React.FC = () => {
  const { t } = useLanguage();

  const capabilities = [
    {
      icon: FileCheck2,
      title: t('EDA Dossier Support', 'دعم ملفات هيئة الدواء المصرية (EDA)'),
      desc: t(
        'Liaison with Egyptian Drug Authority (EDA). Assisting with manufacturer accreditation, CTD Module 3 submissions and GMP audit scheduling.',
        'التنسيق الفني مع هيئة الدواء المصرية، والمساعدة في اعتماد المصنعين وملفات CTD Module 3 وجدولة زيارات تدقيق التصنيع الجيد cGMP.'
      ),
    },
    {
      icon: ShieldCheck,
      title: t('Complete Regulatory Pack', 'الحزمة التنظيمية والرقابية الكاملة'),
      desc: t(
        'Delivery of Drug Master Files (DMF Open Part), Certificate of Suitability (CEP), Batch COAs and BSE/TSE statements.',
        'توفير ملفات المادة الفعالة (DMF Open Part)، وشهادة الملاءمة الأوروبية (CEP)، وشهادات التحليل المخبري لكل تشغيلة، وبيانات BSE/TSE.'
      ),
    },
    {
      icon: Search,
      title: t('Bespoke Ingredient Sourcing', 'توريد مخصص للمواد والبوليمرات النادرة'),
      desc: t(
        'Locating rare intermediates, specialized polymers and niche APIs through pre-audited international synthesis partners.',
        'توفير المركبات الوسيطة والبوليمرات التخصصية والمواد الفعالة النادرة عبر شبكة شركاء تصنيع دوليين خاضعين للتدقيق والمطابقة المسبقة.'
      ),
    },
    {
      icon: FileText,
      title: t('Risk Assessment Dossiers', 'ملفات تقييم المخاطر والشوائب'),
      desc: t(
        'Nitrosamine contamination evaluations, elemental impurities conforming to ICH Q3D and residual solvents conforming to ICH Q3C.',
        'تقييمات شوائب النيتروزامين الدقيقة، والشوائب العنصرية وفق ICH Q3D، والمذيبات المتبقية وفق معايير ICH Q3C العالمية.'
      ),
    },
    {
      icon: Briefcase,
      title: t('R&D Sample Fulfillment', 'توفير عينات البحث والتطوير (R&D)'),
      desc: t(
        'Rapid provision of lab-scale pre-formulation sample quantities with lot-specific COAs for pilot trial batches.',
        'تأمين كميات مخبرية مخصصة لأبحاث الصياغة والتطوير مصحوبة بشهادات تحليل خاصة بالتشغيلة لتشغيل الدفعات التجريبية.'
      ),
    },
    {
      icon: Truck,
      title: t('Cold Chain Telemetry', 'تتبع ومراقبة سلسلة التبريد'),
      desc: t(
        'Continuous temperature logging during maritime/air transport and domestic road transport to your warehouse receiving dock.',
        'تسجيل ومراقبة رقمية مستمرة لدرجات الحرارة أثناء الشحن الجوي والبحري والنقل الداخلي المبرد حتى رصيف استلام مصنعكم.'
      ),
    },
  ];

  return (
    <>
      {/* 1. Services Hero */}
      <SectionShell label={t('Overview', 'نظرة عامة')} tone="forest" image="/images/bg-chem-powder.jpg">
        <Reveal className="mx-auto max-w-4xl space-y-6 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Comprehensive B2B Solutions', 'حلول تجارية متكاملة لقطاع الصناعات الدوائية')}
            title={t(
              'Commercial Agility & Regulatory Precision',
              'مرونة تجارية متقدمة ودقة تنظيمية فائقة'
            )}
            description={t(
              'Whether you need direct maritime indent contracts with global principals or immediate local delivery from our Cairo warehouse, DELTACHEM adapts to your procurement architecture.',
              'سواء كنت بحاجة إلى عقود استيراد بحري مباشرة مع المصنعين العالميين أو توريد فوري من مستودعنا بالقاهرة، دلتا كيم تتكيف تماماً مع متطلبات سلاسل إمدادك.'
            )}
          />
          <div className="flex flex-wrap justify-center gap-4 pt-3">
            <Link href="/request-a-quote">
              <Button size="lg" variant="teal" className="px-8 font-bold shadow-xl shadow-teal-950/60">
                <span>{t('Request Commercial Quotation', 'طلب عرض سعر تجاري')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 px-7 font-bold text-white backdrop-blur-md hover:bg-white/10"
              >
                {t('Search Ingredient Directory', 'البحث في دليل المواد الخام')}
              </Button>
            </Link>
          </div>
        </Reveal>
      </SectionShell>

      {/* 2. Dual Operating Structure */}
      <SectionShell label={t('Dual Models', 'النماذج المزدوجة')} tone="tint">
        <div className="space-y-6">
          <SectionHeader
            align="center"
            eyebrow={t('Dual Operating Structure', 'هيكل تشغيلي وتجاري مرن')}
            title={t('Flexible Engagement Channels', 'قنوات تعاقد وتوريد مصممة لاحتياجاتك')}
            description={t(
              'We structure our operations around two distinct models to serve both large-scale production campaigns and urgent short-term manufacturing runs.',
              'نهيكل عملياتنا وفق نموذجين متميزين لخدمة خطط الإنتاج الضخمة المستمرة وكذلك تلبية احتياجات التشغيل العاجلة ومخزون الأمان.'
            )}
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Model 1: Commission Agency */}
            <Reveal
              delay={0.08}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                    <BadgePercent className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-xs font-bold text-teal-700">
                    {t('Direct Indent / Agency', 'استيراد مباشر / وكالة تجارية')}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {t('Commission Agency Model', 'نموذج الوكالة التجارية المباشرة (Indent)')}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {t(
                    'Acting as authorized commercial representative for leading global API and excipient manufacturers. DELTACHEM facilitates direct contractual engagement between Egyptian pharmaceutical plants and global principals.',
                    'بصفتنا ممثلاً تجارياً معتمداً لكبرى الشركات العالمية المصنعة للمواد الفعالة والسواغ، تيسر دلتا كيم التعاقد المباشر بين مصانع الأدوية المصرية والشركات العالمية الموردة.'
                  )}
                </p>

                <ul className="space-y-2.5 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                    <span>
                      {t(
                        'Direct proforma invoicing and factory-gate pricing from international principals',
                        'فواتير مبدئية مباشرة وأسعار تسليم المصنع التنافسية من كبرى المصانع العالمية'
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                    <span>
                      {t(
                        'Support for Letter of Credit (L/C), CAD and deferred payment arrangements',
                        'دعم كامل للاعتمادات المستندية (L/C) والتحصيل المستندي وتسهيلات السداد'
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                    <span>
                      {t(
                        'Full regulatory dossier preparation and direct EDA registration sponsorship',
                        'تجهيز كامل للملفات الفنية والتنظيمية ورعاية تسجيل المواد بهيئة الدواء المصرية'
                      )}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <Link href="/partners">
                  <Button variant="outline" className="w-full justify-between font-bold">
                    <span>{t('Learn About Principal Representation', 'تعرف على تمثيل الشركات العالمية')}</span>
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </Reveal>

            {/* Model 2: Stock & Trade */}
            <Reveal
              delay={0.16}
              className="flex flex-col justify-between rounded-3xl border border-teal-200 bg-teal-50/60 p-7 shadow-sm sm:p-9"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md">
                    <Warehouse className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-teal-600 bg-teal-600 px-3.5 py-1 text-xs font-bold text-white">
                    {t('Local Inventory / Cairo Hub', 'مخزون محلي فوري / مركز القاهرة')}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {t('Stock & Trade Model', 'نموذج التخزين والتوزيع المحلي (Stock & Trade)')}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {t(
                    'Importing and holding ready stock of top-demand excipients and APIs in our Cairo facility via sister company Harvest Pharma. Designed for rapid batch fulfillment and safety stock buffers.',
                    'استيراد والاحتفاظ بمخزون استراتيجي جاهز من المواد الفعالة والسواغ الدوائي في منشأتنا بالقاهرة عبر شركتنا الشقيقة هارفست فارما لتلبية الاحتياجات الفورية ومخزون الأمان.'
                  )}
                </p>

                <ul className="space-y-2.5 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                    <span>
                      {t(
                        'Same-day or 24–48 hour delivery to pharmaceutical plants across Egypt',
                        'تسليم في نفس اليوم أو خلال 24–48 ساعة لجميع المدن والمناطق الصناعية بمصر'
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                    <span>
                      {t(
                        'Billed in local currency (EGP) with immediate tax-compliant invoicing',
                        'فواتير بالجنيه المصري (EGP) متوافقة فوراً مع منظومة الفاتورة الإلكترونية المصرية'
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                    <span>
                      {t(
                        'Elimination of shipping delays, customs demurrage and port congestion risk',
                        'حماية مصنعكم من تأخيرات الشحن الدولي وغرامات الأرضيات ومخاطر تكدس الموانئ'
                      )}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-teal-200/60 pt-5">
                <Link href="/supply-chain">
                  <Button variant="teal" className="w-full justify-between font-bold">
                    <span>{t('Inspect Harvest Pharma Warehousing', 'معاينة مستودعات هارفست فارما')}</span>
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* 3. Value-Added Technical Capabilities */}
      <SectionShell label={t('Capabilities', 'القدرات الفنية')} tone="navy" image="/images/bg-molecules.jpg">
        <div className="space-y-6">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Technical Excellence', 'التميز الفني والرقابي')}
            title={t(
              'Value-Added Regulatory & Sourcing Capabilities',
              'قدرات تنظيمية واستيرادية متقدمة ذات قيمة مضافة'
            )}
            description={t(
              'Procurement is only successful when your quality and regulatory teams are completely confident. We deliver thorough technical support at every phase.',
              'لا يكتمل نجاح التوريد إلا بتمام ثقة واطمئنان فرق الجودة والرقابة الدوائية لديكم؛ لذا نوفر دعماً فنياً شاملاً في كافة المراحل.'
            )}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, idx) => (
              <Reveal
                key={idx}
                delay={idx * 0.05}
                className="rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-md"
              >
                <cap.icon className="mb-3 h-7 w-7 text-teal-400" aria-hidden="true" />
                <h4 className="text-base font-extrabold">{cap.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">{cap.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* 4. Conversion CTA */}
      <SectionShell label={t('Inquire', 'طلب استفسار')} tone="forest" image="/images/bg-cairo-dusk.jpg">
        <Reveal className="mx-auto max-w-4xl space-y-6 py-6 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Commercial Procurement Desk', 'مكتب المشتريات والتعاقدات التجارية')}
            title={t(
              'Ready to Discuss Your Chemical Requirements?',
              'هل أنت مستعد لمناقشة متطلباتكم من المواد الخام الصيدلانية؟'
            )}
            description={t(
              'Our technical sales team will review your pharmacopoeial specifications, volume targets and delivery timeline to provide a tailored quotation.',
              'سيقوم فريق المبيعات الفنية بمراجعة مواصفات دستور الأدوية والكميات المستهدفة وجدول التوريد لتقديم عرض سعر مخصص يلبي خططكم الإنتاجية.'
            )}
          />
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/request-a-quote">
              <Button size="lg" variant="teal" className="px-9 font-extrabold shadow-xl shadow-teal-950/50">
                {t('Submit an RFQ', 'إرسال طلب تسعير (RFQ)')}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 px-8 font-bold text-white hover:bg-white/10"
              >
                {t('Speak with Sales', 'التحدث مع المبيعات الفنية')}
              </Button>
            </Link>
          </div>
        </Reveal>
      </SectionShell>
    </>
  );
};
