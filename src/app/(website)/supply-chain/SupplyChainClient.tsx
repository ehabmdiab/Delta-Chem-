'use client';

import React from 'react';
import Link from 'next/link';
import {
  Warehouse,
  ThermometerSnowflake,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  ExternalLink,
  Activity,
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { SectionShell } from '@/components/molecules/SectionShell';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Reveal } from '@/components/molecules/Reveal';
import { useLanguage } from '@/components/providers/LanguageContext';

export const SupplyChainClient: React.FC = () => {
  const { t } = useLanguage();

  const zones = [
    {
      title: t('Controlled Room Temperature (CRT)', 'درجة حرارة الغرفة المضبوطة (CRT)'),
      range: '15°C – 25°C',
      rh: t('< 60% Relative Humidity', 'رطوبة نسبية < 60%'),
      desc: t(
        'Optimized for standard active ingredients, tablet binders, cellulose polymers and standard excipient drums.',
        'مخصصة للمواد الفعالة القياسية، وروابط الأقراص، وبوليمرات السليلوز، وبراميل السواغ الدوائي المعتادة.'
      ),
      icon: Warehouse,
    },
    {
      title: t('Refrigerated Cold Chain Storage', 'تخزين مبرد لسلسلة التبريد (Cold Chain)'),
      range: '2°C – 8°C',
      rh: t('Controlled Humidity', 'رطوبة خاضعة للرقابة'),
      desc: t(
        'Dedicated cold rooms with redundant compressors for enzymes, temperature-sensitive antibiotics and bio-nutraceuticals.',
        'غرف تبريد مخصصة مزودة بضواغط تبريد احتياطية للإنزيمات، والمضادات الحيوية الحساسة للحرارة، والمغذيات الدوائية الحيوية.'
      ),
      icon: ThermometerSnowflake,
    },
    {
      title: t('Hygroscopic Sensitive Storage', 'تخزين المواد الحساسة للرطوبة والجاذبة للماء'),
      range: t('Controlled Atmosphere', 'غلاف جوي مضبوط ومعزول'),
      rh: t('< 45% Relative Humidity', 'رطوبة نسبية منخفضة < 45%'),
      desc: t(
        'Desiccant-equipped zoning tailored for moisture-reactive superdisintegrants and ultra-pure sodium hyaluronate.',
        'مناطق مجهزة بمجففات هواء متطورة مخصصة للمفككات الفائقة الحساسة للرطوبة وهيالورونات الصوديوم فائقة النقاء.'
      ),
      icon: ShieldCheck,
    },
  ];

  return (
    <>
      {/* 1. Hero */}
      <SectionShell label={t('Overview', 'نظرة عامة')} tone="navy" image="/images/pharma-warehouse-coldchain.jpg">
        <Reveal className="mx-auto max-w-4xl space-y-6 text-center">
          <SectionHeader
            onDark
            align="center"
            eyebrow={t('Integrated Cold-Chain & GDP Logistics', 'سلسلة تبريد متكاملة ولوجستيات معتمدة (GDP)')}
            title={t(
              'Securing the Pharmaceutical Chain of Custody',
              'تأمين وحماية سلسلة الحيازة والتوريد الدوائية'
            )}
            description={t(
              'Through sister company Harvest Pharma, DELTACHEM offers Egypt’s pharmaceutical industry audited, GDP-compliant warehousing, climate-controlled environments and rapid regional delivery.',
              'من خلال شركتنا الشقيقة هارفست فارما، توفر دلتا كيم لقطاع الدواء بمصر مستودعات معتمدة ومطابقة لممارسات التوزيع الجيد (GDP)، وبيئات مضبوطة مناخياً، وشبكة تسليم إقليمية فائقة السرعة.'
            )}
          />
          <div className="flex flex-wrap justify-center gap-4 pt-3">
            <Link href="/request-a-quote">
              <Button size="lg" variant="teal" className="px-8 font-bold shadow-xl shadow-teal-950/60">
                <span>{t('Inquire on In-Stock Materials', 'الاستفسار عن الخامات المتوفرة بالمخزون')}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
            <a href="https://www.harvestpharma-eg.com" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 px-7 font-bold text-white backdrop-blur-md hover:bg-white/10"
              >
                <span>{t('Visit Harvest Pharma', 'زيارة موقع هارفست فارما')}</span>
                <ExternalLink className="ml-2 h-4 w-4 rtl:mr-2 rtl:ml-0" />
              </Button>
            </a>
          </div>
        </Reveal>
      </SectionShell>

      {/* 2. Harvest Pharma Hub Infrastructure */}
      <SectionShell label={t('Infrastructure', 'البنية التحتية')} tone="light">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <Reveal className="space-y-5 lg:col-span-7">
            <SectionHeader
              eyebrow={t('Strategic Alliance', 'شراكة لوجستية استراتيجية')}
              title={t(
                'Harvest Pharma: Cairo’s Premier Pharmaceutical Warehouse Hub',
                'هارفست فارما: مركز التخزين والتوزيع الدوائي الرائد بالقاهرة'
              )}
              description={t(
                'Pharmaceutical raw materials cannot simply be stored in generic facilities. Moisture degrades superdisintegrants, while thermal spikes denature APIs. Our sister company Harvest Pharma operates dedicated GDP-compliant facilities in Cairo.',
                'لا يمكن تخزين المواد الخام الصيدلانية في مستودعات عادية؛ فالرطوبة تفسد مفككات الأقراص، والتقلبات الحرارية تتلف المواد الفعالة. تدير شركتنا الشقيقة هارفست فارما منشآت متخصصة خاضعة لاشتراطات ممارسات التوزيع الجيد (GDP) في القاهرة.'
              )}
            />
            <ul className="space-y-3 pt-2 text-sm text-slate-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-teal-600" />
                <span>{t('Licensed by the Egyptian Drug Authority (EDA)', 'مرخص رسمياً من هيئة الدواء المصرية (EDA)')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-teal-600" />
                <span>{t('Calibrated 24/7 digital sensors with automated SMS alerts', 'حساسات رقمية معايرة تسجل البيانات 24/7 مع تنبيهات SMS فورية')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-teal-600" />
                <span>{t('Dual power redundancy with commercial automatic diesel generators', 'تغذية كهربائية مزدوجة مع مولدات ديزل تجارية أوتوماتيكية للطوارئ')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-teal-600" />
                <span>{t('Epoxy anti-dust floor coatings and positive pressure ventilation', 'أرضيات إيبوكسي مقاومة للأتربة ونظام تهوية بضغط موجب معتمد')}</span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.15} x={30} y={0} className="lg:col-span-5">
            <div className="rounded-3xl border border-teal-200 bg-teal-50 p-7 shadow-xl sm:p-9">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                  {t('Live Telemetry Specs', 'مواصفات الرقابة البيئية المباشرة')}
                </span>
                <Activity className="h-5 w-5 animate-pulse text-teal-600" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {t('Warehouse Environment Controls', 'معايير التحكم في بيئة المستودع')}
              </h3>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between border-b border-teal-200/80 pb-2">
                  <dt className="text-slate-600">{t('Facility Location', 'موقع المنشأة')}</dt>
                  <dd className="font-extrabold text-slate-900">{t('Cairo, Egypt (Gesr El-Suez)', 'القاهرة، مصر (جسر السويس)')}</dd>
                </div>
                <div className="flex justify-between border-b border-teal-200/80 pb-2">
                  <dt className="text-slate-600">{t('Pallet Capacity', 'سعة المنصات (Pallets)')}</dt>
                  <dd className="font-extrabold text-slate-900">{t('Multi-Tier Validated Racking', 'أرفف متعددة المستويات خاضعة للمعايرة')}</dd>
                </div>
                <div className="flex justify-between border-b border-teal-200/80 pb-2">
                  <dt className="text-slate-600">{t('Pest & Rodent Control', 'مكافحة الآفات والقوارض')}</dt>
                  <dd className="font-extrabold text-teal-700">{t('Active Monthly Contract', 'عقد شهري دوري معتمد')}</dd>
                </div>
                <div className="flex justify-between border-b border-teal-200/80 pb-2">
                  <dt className="text-slate-600">{t('Security & Access', 'الأمن وأنظمة الدخول')}</dt>
                  <dd className="font-extrabold text-slate-900">{t('Biometric & 24/7 CCTV', 'بصمة حيوية وكاميرات مراقبة 24/7')}</dd>
                </div>
                <div className="flex justify-between pt-1">
                  <dt className="text-slate-600">{t('Batch Segregation', 'فصل التشغيلات وتتبعها')}</dt>
                  <dd className="font-extrabold text-slate-900">{t('Barcoded WMS Location', 'تحديد رقمي بنظام الباركود WMS')}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* 3. Climate Zones */}
      <SectionShell label={t('Storage Zones', 'مناطق التخزين')} tone="tint">
        <div className="space-y-6">
          <SectionHeader
            align="center"
            eyebrow={t('Multi-Zone Storage', 'تخزين متعدد المناطق المناخية')}
            title={t('Engineered Storage Climates', 'مناخات تخزين هندسية متخصصة')}
            description={t(
              'Each class of chemical requires distinct ambient thresholds. We maintain strict compartmentalization to prevent degradation.',
              'تتطلب كل فئة كيميائية معايير مناخية محددة. نطبق فصلاً تاماً بين المناطق لمنع أي تدهور لخواص المواد الفعالة والسواغ.'
            )}
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {zones.map((zone, idx) => {
              const Icon = zone.icon;
              return (
                <Reveal
                  key={idx}
                  delay={idx * 0.08}
                  className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-teal-500 hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">{zone.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-md border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700">
                      {zone.range}
                    </span>
                    <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {zone.rh}
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-600">{zone.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SectionShell>

      {/* 4. Distribution Fleet & SLAs */}
      <SectionShell label={t('Fleet & SLAs', 'الأسطول ومواعيد التسليم')} tone="forest" image="/images/bg-cairo-dusk.jpg">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <Reveal className="space-y-5 lg:col-span-6">
            <SectionHeader
              onDark
              eyebrow={t('Domestic Fleet', 'أسطول التوزيع المحلي')}
              title={t(
                '24–48 Hour Express Delivery to Egypt’s Industrial Cities',
                'تسليم سريع خلال 24–48 ساعة لجميع المدن والمناطق الصناعية بمصر'
              )}
              description={t(
                'Our logistics network connects Cairo directly with Egypt’s major pharmaceutical and chemical manufacturing epicenters.',
                'تربط شبكتنا اللوجستية القاهرة مباشرة بكبرى قلاع تصنيع الدواء والكيماويات في جمهورية مصر العربية.'
              )}
            />

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur">
                <Clock className="mt-0.5 h-6 w-6 shrink-0 text-amber-400" />
                <div>
                  <h4 className="text-sm font-bold">{t('Same-Day Urgent Dispatch', 'تسليم عاجل في نفس اليوم')}</h4>
                  <p className="mt-0.5 text-xs text-slate-200">
                    {t(
                      'Available for Greater Cairo manufacturing zones (Obour, Badr, Gesr El-Suez) for stock-and-trade items.',
                      'متاح للمناطق الصناعية بالقاهرة الكبرى (العبور، بدر، جسر السويس) للأصناف المتوفرة بالمخزون المحلي.'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur">
                <Truck className="mt-0.5 h-6 w-6 shrink-0 text-teal-300" />
                <div>
                  <h4 className="text-sm font-bold">
                    {t('Dedicated Temperature-Controlled Trucks', 'شاحنات مجهزة ومخصصة ومضبوطة الحرارة')}
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-200">
                    {t(
                      'Equipped with USB dataloggers to guarantee cold chain integrity right up to your QC receiving gate.',
                      'مزودة بأجهزة تسجيل حرارة رقمية (USB Dataloggers) لضمان سلامة سلسلة التبريد حتى رصيف استلام مصنعكم.'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur">
                <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-lime-300" />
                <div>
                  <h4 className="text-sm font-bold">{t('Nationwide Coverage', 'تغطية جغرافية شاملة لكافة المحافظات')}</h4>
                  <p className="mt-0.5 text-xs text-slate-200">
                    {t(
                      'Regular routes to 10th of Ramadan, 6th of October, Borg El Arab, Sadat City and Upper Egypt.',
                      'رحلات منتظمة لمدينة العاشر من رمضان، والسادس من أكتوبر، وبرج العرب، ومدينة السادات، ومحافظات الصعيد.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} x={30} y={0} className="lg:col-span-6">
            <div className="rounded-3xl border border-white/20 bg-teal-950/80 p-8 text-white shadow-2xl backdrop-blur-xl sm:p-10">
              <h3 className="text-2xl font-extrabold">
                {t('Request Warehouse Buffer Stock', 'طلب مخزون أمان استراتيجي مخصص لمصنعكم')}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                {t(
                  'Protect your plant from shipping volatility by establishing a local stock agreement held at Harvest Pharma. Guaranteed volume, locked price and instant call-off capability.',
                  'احمِ خطوط إنتاج مصنعك من تقلبات الشحن العالمي عبر إبرام اتفاقية مخزون محلي محجوز بمستودعات هارفست فارما. كميات مضمونة، وأسعار مثبتة، وسحب فوري عند الحاجة.'
                )}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/request-a-quote">
                  <Button size="lg" variant="teal" className="w-full font-bold shadow-lg">
                    {t('Setup Buffer Inventory', 'تأسيس مخزون استراتيجي (Buffer Stock)')}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white/40 font-bold text-white hover:bg-white/10"
                  >
                    {t('Schedule a Facility Audit', 'جدولة زيارة وتدقيق للمنشأة')}
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>
    </>
  );
};
