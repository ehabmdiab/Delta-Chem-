'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  Mail,
  Phone,
  User,
  FlaskConical,
  Scale,
  Calendar,
  Warehouse,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { Select } from '@/components/atoms/Select';
import { useLanguage } from '@/components/providers/LanguageContext';
import { Product } from '@/types';

interface RfqFormData {
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  product_name: string;
  product_id?: string;
  required_quantity: string;
  grade_spec?: string;
  application?: string;
  delivery_model?: string;
  target_delivery_date?: string;
  notes?: string;
  honeypot?: string;
}

interface RequestQuoteClientProps {
  products: Product[];
}

export const RequestQuoteClient: React.FC<RequestQuoteClientProps> = ({ products }) => {
  const { t, locale } = useLanguage();
  const searchParams = useSearchParams();
  const preselectedProductSlug = searchParams.get('product');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{
    referenceNumber: string;
    productName: string;
    companyName: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const matchedProduct = preselectedProductSlug
    ? products.find((p) => p.slug === preselectedProductSlug)
    : null;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RfqFormData>({
    defaultValues: {
      product_name: matchedProduct ? (locale === 'ar' && matchedProduct.name_ar ? matchedProduct.name_ar : matchedProduct.name) : '',
      product_id: matchedProduct ? matchedProduct.id : '',
      grade_spec: (matchedProduct ? matchedProduct.pharmacopoeia_standards : null) || 'USP / BP / EP',
      delivery_model: 'stock_and_trade',
    },
  });

  useEffect(() => {
    if (matchedProduct) {
      const pName = locale === 'ar' && matchedProduct.name_ar ? matchedProduct.name_ar : matchedProduct.name;
      setValue('product_name', pName);
      setValue('product_id', matchedProduct.id);
      if (matchedProduct.pharmacopoeia_standards) {
        setValue('grade_spec', matchedProduct.pharmacopoeia_standards);
      }
    }
  }, [matchedProduct, setValue, locale]);

  const onProductSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId === 'other') {
      setValue('product_id', '');
      setValue('product_name', '');
    } else {
      const prod = products.find((p) => p.id === selectedId);
      if (prod) {
        const pName = locale === 'ar' && prod.name_ar ? prod.name_ar : prod.name;
        setValue('product_id', prod.id);
        setValue('product_name', pName);
        setValue('grade_spec', prod.pharmacopoeia_standards || 'USP / BP / EP');
      }
    }
  };

  const onSubmit: SubmitHandler<RfqFormData> = async (data) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = {
        company_name: data.company_name,
        contact_person: data.contact_person,
        email: data.email,
        phone: data.phone,
        product_name: data.product_name,
        product_id: data.product_id || undefined,
        required_quantity: data.required_quantity,
        grade_spec: data.grade_spec,
        application: data.application,
        target_delivery_date: data.target_delivery_date,
        notes: data.notes
          ? `[Delivery Model: ${data.delivery_model}] ${data.notes}`
          : `[Delivery Model: ${data.delivery_model}]`,
        bot_check: data.honeypot || '',
      };

      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = (await res.json()) as { success: boolean; reference_number?: string; error?: string };

      if (!res.ok || !result.success) {
        throw new Error(
          result.error ||
            t(
              'Failed to submit RFQ. Please check form inputs.',
              'فشل إرسال طلب عرض السعر. يرجى مراجعة البيانات والمدخلات.'
            )
        );
      }

      setSuccessData({
        referenceNumber: result.reference_number || 'RFQ-ACKNOWLEDGED',
        productName: data.product_name,
        companyName: data.company_name,
      });
      reset();
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : t(
              'Failed to transmit quotation request. Please contact sales@deltachem.com.eg.',
              'تعذر إرسال طلب عرض السعر. يرجى التواصل مباشرة عبر sales@deltachem.com.eg.'
            )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
      {successData ? (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 sm:p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <span className="rounded-full bg-emerald-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-900">
            {t('Quotation Request Received', 'تم استلام طلب التسعير بنجاح')}
          </span>
          <h3 className="mt-4 text-2xl font-extrabold text-emerald-950 sm:text-3xl">
            {t('RFQ Successfully Registered', 'تم تسجيل طلب التسعير بنجاح')}
          </h3>
          <p className="mt-2 text-sm text-emerald-800 max-w-lg mx-auto">
            {t('Thank you, ', 'شكراً لكم، ')}
            <span className="font-semibold">{successData.companyName}</span>
            {t('. Your request for ', '. تم توجيه طلبكم بخصوص ')}
            <span className="font-semibold">{successData.productName}</span>
            {t(
              ' has been dispatched to our technical commercial desk.',
              ' إلى مكتب المبيعات الفنية والتسعير للمتابعة الفورية.'
            )}
          </p>

          <div className="my-8 inline-block rounded-xl bg-white p-6 border border-emerald-300 shadow-sm text-center">
            <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">
              {t('Official Quotation Reference', 'رقم المرجع والتتبع الرسمي')}
            </span>
            <p className="text-2xl font-mono font-black text-emerald-700 mt-1">
              {successData.referenceNumber}
            </p>
            <p className="text-xs text-slate-400 mt-2">
              {t(
                'Save this reference number for all subsequent correspondence with sales.',
                'يرجى الاحتفاظ بهذا الرقم المرجعي لجميع المراسلات والمتابعات اللاحقة مع المبيعات.'
              )}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 max-w-md mx-auto text-start text-xs text-slate-600 bg-white/70 p-4 rounded-xl border border-emerald-200">
            <div>
              <span className="font-bold text-slate-900 block">{t('Response SLA', 'مدة الرد الرسمية')}</span>
              {t('Within 24 business hours', 'خلال 24 ساعة عمل رسمية')}
            </div>
            <div>
              <span className="font-bold text-slate-900 block">
                {t('Dossier Inclusion', 'المرفقات مع عرض السعر')}
              </span>
              {t('Lot COA & Pricing Sheet', 'شهادة تحليل التشغيلة وبيان التسعير')}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => setSuccessData(null)}
              className="bg-teal-600 hover:bg-teal-500 text-white font-medium"
            >
              {t('Submit Another Product Request', 'إرسال طلب تسعير لمنتج آخر')}
            </Button>
            <Link href="/products">
              <Button variant="outline">{t('Browse Product Catalog', 'تصفح كتالوج المنتجات')}</Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Honeypot */}
          <input
            type="text"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            {...register('honeypot')}
          />

          {errorMessage && (
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 flex items-start gap-3 text-sm text-rose-800">
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Product Selection */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
              <FlaskConical className="h-5 w-5 text-teal-600" />
              {t('1. Material & Specification', '1. المادة الخام والمواصفات الفنية')}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t('Select Verified Ingredient', 'اختر من المواد المعتمدة بالدليل')}
                </label>
                <select
                  defaultValue={matchedProduct ? matchedProduct.id : 'other'}
                  onChange={onProductSelectChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="other">
                    {t('-- Custom / Unlisted Ingredient --', '-- مادة مخصصة / غير مدرجة بالقائمة --')}
                  </option>
                  {products.map((p) => {
                    const pName = locale === 'ar' && p.name_ar ? p.name_ar : p.name;
                    return (
                      <option key={p.id} value={p.id}>
                        {pName} ({p.cas_number || 'N/A'})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t('Ingredient Name / CAS Number *', 'اسم المادة الخام / رقم CAS *')}
                </label>
                <Input
                  placeholder={t(
                    'e.g. Microcrystalline Cellulose PH 102',
                    'مثال: سليلوز دقيق التبلور PH 102'
                  )}
                  error={errors.product_name?.message}
                  {...register('product_name', {
                    required: t('Please specify the ingredient name', 'يرجى تحديد اسم المادة الخام'),
                  })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t('Required Volume / Quantity *', 'الكمية المطلوبة / الحجم *')}
                </label>
                <Input
                  placeholder={t(
                    'e.g. 500 kg, 2 Metric Tons, 25 kg trial drum',
                    'مثال: 500 كجم، 2 طن متري، برميل تجريبي 25 كجم'
                  )}
                  leftIcon={<Scale className="h-4 w-4" />}
                  error={errors.required_quantity?.message}
                  {...register('required_quantity', {
                    required: t('Please state your required quantity', 'يرجى تحديد الكمية المطلوبة'),
                  })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t('Target Pharmacopoeia / Grade', 'دستور الأدوية / درجة النقاء المستهدفة')}
                </label>
                <Input
                  placeholder={t(
                    'e.g. USP-NF, BP, EP, JP, FCC, Cosmetic Grade',
                    'مثال: USP-NF، BP، EP، JP، FCC، درجة مستحضرات التجميل'
                  )}
                  error={errors.grade_spec?.message}
                  {...register('grade_spec')}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Fulfillment & Commercial Terms */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
              <Warehouse className="h-5 w-5 text-teal-600" />
              {t('2. Commercial Model & Timing', '2. النموذج التجاري وجدول التوريد')}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t('Preferred Delivery Channel', 'قناة التوريد والتسليم المفضلة')}
                </label>
                <Select
                  {...register('delivery_model')}
                  options={[
                    {
                      value: 'stock_and_trade',
                      label: t(
                        'Stock & Trade (Cairo Warehouse Dispatch via Harvest Pharma)',
                        'تخزين وتوزيع محلي (تسليم فوري من مستودع القاهرة عبر هارفست فارما)'
                      ),
                    },
                    {
                      value: 'indent_agency',
                      label: t(
                        'Commission Agency (Direct Maritime Indent from Global Principal)',
                        'وكالة تجارية واستيراد بحري مباشر من المصنع العالمي (Indent)'
                      ),
                    },
                    {
                      value: 'buffer_agreement',
                      label: t(
                        'Annual Reserved Buffer Agreement (Cairo Holding)',
                        'اتفاقية مخزون أمان سنوي محجوز بمستودع القاهرة'
                      ),
                    },
                  ]}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t('Target Factory Receiving Date', 'تاريخ الاستلام المستهدف بالمصنع')}
                </label>
                <Input
                  type="date"
                  leftIcon={<Calendar className="h-4 w-4" />}
                  {...register('target_delivery_date')}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t('Dosage Form / Finished Application', 'الشكل الصيدلاني / الاستخدام النهائي')}
                </label>
                <Input
                  placeholder={t(
                    'e.g. Direct compression oral tablet, sterile injectable, anti-aging serum',
                    'مثال: أقراص ضغط مباشر، حقن عقيمة، سيروم مضاد للتجاعيد'
                  )}
                  {...register('application')}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Company & Contact Information */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
              <Building2 className="h-5 w-5 text-teal-600" />
              {t('3. Procurement Organization Details', '3. بيانات جهة الشراء والتواصل')}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t('Company / Factory Name *', 'اسم الشركة / المصنع *')}
                </label>
                <Input
                  placeholder={t('e.g. Amoun Pharmaceutical / Pharco', 'مثال: آمون للأدوية / فاركو')}
                  leftIcon={<Building2 className="h-4 w-4" />}
                  error={errors.company_name?.message}
                  {...register('company_name', {
                    required: t('Company name is required', 'اسم الشركة مطلوب'),
                  })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t('Contact Person & Title *', 'اسم المسؤول والمنصب *')}
                </label>
                <Input
                  placeholder={t('e.g. Dr. Ahmed Samir (Procurement Lead)', 'مثال: د. أحمد سمير (رئيس المشتريات)')}
                  leftIcon={<User className="h-4 w-4" />}
                  error={errors.contact_person?.message}
                  {...register('contact_person', {
                    required: t('Contact person is required', 'اسم المسؤول مطلوب'),
                  })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t('Official Business Email *', 'البريد الإلكتروني الرسمي *')}
                </label>
                <Input
                  type="email"
                  placeholder="procurement@company.com"
                  leftIcon={<Mail className="h-4 w-4" />}
                  error={errors.email?.message}
                  {...register('email', {
                    required: t('Email address is required', 'البريد الإلكتروني مطلوب'),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t('Valid corporate email required', 'يرجى إدخال بريد إلكتروني صحيح'),
                    },
                  })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t('Direct Phone / Mobile *', 'الهاتف المباشر / المحمول *')}
                </label>
                <Input
                  placeholder="+20 100 000 0000"
                  leftIcon={<Phone className="h-4 w-4" />}
                  error={errors.phone?.message}
                  {...register('phone', {
                    required: t('Phone number is required', 'رقم الهاتف مطلوب'),
                  })}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Additional Regulatory or Packaging Instructions */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              {t(
                'Special Documentation or Packaging Notes',
                'ملاحظات إضافية حول الملفات التوثيقية أو التعبئة'
              )}
            </label>
            <Textarea
              rows={3}
              placeholder={t(
                'Specify if DMF Open Part, CEP, Halal certification, or specific drum packaging is required...',
                'يرجى تحديد ما إذا كان مطلوباً ملف DMF المفتوح، شهادة CEP، شهادة حلال، أو نوع تعبئة خاص...'
              )}
              {...register('notes')}
            />
          </div>

          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
            <ShieldCheck className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
            <span>
              <strong>{t('B2B Confidentiality Notice:', 'إشعار السرية المؤسسية (B2B):')}</strong>{' '}
              {t(
                'DELTACHEM complies with strict commercial non-disclosure ethics. We do not distribute consumer goods or process retail orders.',
                'تلتزم دلتا كيم بأعلى معايير السرية وأخلاقيات عدم الإفصاح التجاري. لا نقوم بتوزيع المنتجات الاستهلاكية أو معالجة طلبات الأفراد.'
              )}
            </span>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-medium py-3.5"
          >
            {isSubmitting ? (
              <span>{t('Registering Official RFQ...', 'جاري تسجيل وتوجيه طلب التسعير...')}</span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>{t('Submit Official Request for Quote', 'إرسال طلب التسعير الرسمي')}</span>
                <Send className="h-4 w-4 rtl:rotate-180" />
              </span>
            )}
          </Button>
        </form>
      )}
    </div>
  );
};
