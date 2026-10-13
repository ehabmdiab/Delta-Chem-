'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  Mail,
  Phone,
  User,
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { Select } from '@/components/atoms/Select';
import { useLanguage } from '@/components/providers/LanguageContext';

interface ContactFormData {
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  inquiry_type: string;
  message: string;
  honeypot?: string;
}

export const ContactClient: React.FC = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<{
    referenceNumber: string;
    message: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      inquiry_type: 'product_quote',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = {
        company_name: data.company_name,
        contact_person: data.contact_person,
        email: data.email,
        phone: data.phone,
        product_name: `[Inquiry: ${data.inquiry_type}] General Inquiry / Consultation`,
        required_quantity: 'N/A',
        application: data.inquiry_type,
        notes: data.message,
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
            t('Failed to submit contact message.', 'فشل إرسال رسالة الاستفسار. يرجى المحاولة لاحقاً.')
        );
      }

      setSuccessResponse({
        referenceNumber: result.reference_number || 'INQ-ACKNOWLEDGED',
        message: t(
          'Your inquiry has been logged and assigned to technical sales.',
          'تم تسجيل استفساركم بنجاح وإحالته إلى قسم المبيعات الفنية للمتابعة الفورية.'
        ),
      });
      reset();
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : t(
              'An unexpected error occurred. Please call our office directly.',
              'حدث خطأ غير متوقع. يرجى الاتصال بمكتبنا مباشرة.'
            )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
      <h3 className="text-2xl font-bold text-slate-900">
        {t('Send an Official Inquiry', 'إرسال استفسار رسمي')}
      </h3>
      <p className="mt-2 text-sm text-slate-500">
        {t(
          'Our technical sales and regulatory desk replies within one business day.',
          'يجيب فريق المبيعات الفنية والشؤون التنظيمية لدينا خلال يوم عمل واحد.'
        )}
      </p>

      {successResponse ? (
        <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h4 className="text-xl font-bold text-emerald-950">
            {t('Inquiry Received Successfully', 'تم استلام الاستفسار بنجاح')}
          </h4>
          <p className="mt-2 text-sm text-emerald-800">{successResponse.message}</p>
          <div className="mt-4 inline-block rounded-lg bg-white px-4 py-2 border border-emerald-300">
            <span className="text-xs text-slate-500 block uppercase font-medium">
              {t('Tracking Reference', 'رقم المرجع والتتبع')}
            </span>
            <span className="text-base font-mono font-bold text-emerald-700">
              {successResponse.referenceNumber}
            </span>
          </div>
          <div className="mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSuccessResponse(null)}
              className="border-emerald-300 text-emerald-800 hover:bg-emerald-100"
            >
              {t('Send Another Inquiry', 'إرسال استفسار آخر')}
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          {/* Honeypot spam trap */}
          <input
            type="text"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            {...register('honeypot')}
          />

          {errorMessage && (
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-4 flex items-start gap-3 text-sm text-rose-800">
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('Company Name *', 'اسم الشركة / المنشأة *')}
              </label>
              <Input
                placeholder={t('e.g. Eva Pharma / EIPICO', 'مثال: إيفا فارما / إيبيكو')}
                leftIcon={<Building2 className="h-4 w-4" />}
                error={errors.company_name?.message}
                {...register('company_name', {
                  required: t('Company name is required', 'اسم الشركة مطلوب'),
                })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('Contact Person *', 'اسم المسؤول أو اللقب *')}
              </label>
              <Input
                placeholder={t('e.g. Dr. Youssef Nabil', 'مثال: د. يوسف نبيل')}
                leftIcon={<User className="h-4 w-4" />}
                error={errors.contact_person?.message}
                {...register('contact_person', {
                  required: t('Contact person is required', 'اسم المسؤول مطلوب'),
                })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('Official Email *', 'البريد الإلكتروني الرسمي *')}
              </label>
              <Input
                type="email"
                placeholder="procurement@company.com"
                leftIcon={<Mail className="h-4 w-4" />}
                error={errors.email?.message}
                {...register('email', {
                  required: t('Email is required', 'البريد الإلكتروني مطلوب'),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t('Invalid email address', 'صيغة البريد الإلكتروني غير صحيحة'),
                  },
                })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('Direct Telephone / Mobile *', 'الهاتف المباشر / المحمول *')}
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

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              {t('Inquiry Scope *', 'نطاق وطبيعة الاستفسار *')}
            </label>
            <Select
              {...register('inquiry_type')}
              options={[
                {
                  value: 'product_quote',
                  label: t(
                    'Commercial Quotation / Pricing Inquiry',
                    'طلب تسعير تجاري / استفسار عن الأسعار'
                  ),
                },
                {
                  value: 'buffer_stock',
                  label: t(
                    'Harvest Pharma Buffer Stocking Agreement',
                    'اتفاقية تخزين مخزون أمان بمستودع هارفست فارما'
                  ),
                },
                {
                  value: 'regulatory_dossier',
                  label: t(
                    'Regulatory File & EDA DMF Request',
                    'طلب ملف فني / ملف DMF لهيئة الدواء المصرية'
                  ),
                },
                {
                  value: 'principal_agency',
                  label: t(
                    'International Principal Agency Representation',
                    'تمثيل وكالة تجارية لشركة عالمية'
                  ),
                },
                {
                  value: 'general',
                  label: t('General Corporate Consultation', 'استشارة فنية ومؤسسية عامة'),
                },
              ]}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              {t('Technical Details / Requirements *', 'التفاصيل والمواصفات الفنية المطلوبة *')}
            </label>
            <Textarea
              rows={4}
              placeholder={t(
                'Specify chemical name, CAS number, required grade (USP/BP/EP), estimated volume, or regulatory requirements...',
                'يرجى تحديد اسم المادة الكيميائية، ورقم CAS، والدرجة المطلوبة (USP/BP/EP)، والكمية التقديرية، أو المتطلبات التنظيمية...'
              )}
              error={errors.message?.message}
              {...register('message', {
                required: t('Please provide details for your inquiry', 'يرجى كتابة تفاصيل الاستفسار'),
              })}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-medium"
          >
            {isSubmitting ? (
              <span>{t('Transmitting Inquiry...', 'جاري إرسال الاستفسار...')}</span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>{t('Submit Inquiry to DELTACHEM', 'إرسال الاستفسار إلى دلتا كيم')}</span>
                <Send className="h-4 w-4 rtl:rotate-180" />
              </span>
            )}
          </Button>

          <p className="text-center text-xs text-slate-400">
            {t(
              'All submitted commercial data is treated under strict B2B non-disclosure ethics.',
              'تُعامل جميع البيانات التجارية المستلمة بسرية تامة وأخلاقيات عمل مؤسسية صارمة.'
            )}
          </p>
        </form>
      )}
    </div>
  );
};
