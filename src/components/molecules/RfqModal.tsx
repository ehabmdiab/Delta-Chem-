'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { rfqFormSchema, RfqFormValues } from '@/lib/validation/rfq';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { useLanguage } from '@/components/providers/LanguageContext';
import { X, CheckCircle2, AlertCircle, Building2, User, Mail, Phone, Package, ShieldCheck } from 'lucide-react';

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProduct?: {
    id?: string;
    name: string;
    grade?: string | null;
  } | null;
}

export const RfqModal: React.FC<RfqModalProps> = ({ isOpen, onClose, prefilledProduct }) => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successReference, setSuccessReference] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RfqFormValues>({
    resolver: zodResolver(rfqFormSchema),
    defaultValues: {
      product_id: prefilledProduct?.id || undefined,
      product_name: prefilledProduct?.name || '',
      grade_spec: prefilledProduct?.grade || '',
      website_url_hp: '',
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: RfqFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit inquiry.');
      }

      setSuccessReference(result.reference_number);
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed. Please try again.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccessReference(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-teal-400 font-semibold">
              DELTACHEM Commercial Sourcing
            </span>
            <h3 className="text-xl font-bold mt-0.5">
              {t('Request for Quotation (RFQ)', 'طلب تسعير ومواصفات تجارية')}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition p-1 rounded-md"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {successReference ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">
                {t('Inquiry Received Successfully', 'تم استلام طلب التسعير بنجاح')}
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                {t(
                  'Your quotation request has been securely dispatched to the DELTACHEM technical procurement department. Our representative will contact you with batch availability and quotation details.',
                  'تم إرسال طلبكم بنجاح إلى الإدارة التجارية بشركة دلتا كيم. سيتواصل معكم ممثلنا لتأكيد التوافر وإرسال عرض السعر.'
                )}
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-w-xs mx-auto">
                <span className="text-xs text-slate-500 uppercase tracking-wider block font-medium">
                  {t('Inquiry Reference Number', 'رقم المرجع')}
                </span>
                <span className="text-lg font-mono font-bold text-teal-700">{successReference}</span>
              </div>
              <div className="pt-4">
                <Button variant="primary" onClick={handleClose}>
                  {t('Close', 'إغلاق')}
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-md flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Anti-spam honeypot */}
              <input
                type="text"
                {...register('website_url_hp')}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('Product Required *', 'اسم الخامة المطلوبة *')}
                  </label>
                  <Input
                    {...register('product_name')}
                    placeholder={t('e.g. Amoxicillin Trihydrate, Microcrystalline Cellulose', 'مثال: أموكسيسيلين، سليلوز دقيق التبلور')}
                    error={errors.product_name?.message}
                    leftIcon={<Package className="w-4 h-4" />}
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('Company Name *', 'اسم الشركة / المصنع *')}
                  </label>
                  <Input
                    {...register('company_name')}
                    placeholder={t('e.g. EVA Pharma, Sedico, Medical Union', 'مثال: إيفا فارما، سيديكو، المهن الطبية')}
                    error={errors.company_name?.message}
                    leftIcon={<Building2 className="w-4 h-4" />}
                  />
                </div>

                {/* Contact Person */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('Contact Person *', 'اسم المسؤول *')}
                  </label>
                  <Input
                    {...register('contact_person')}
                    placeholder={t('e.g. Dr. Ahmed Hassan', 'مثال: د. أحمد حسن')}
                    error={errors.contact_person?.message}
                    leftIcon={<User className="w-4 h-4" />}
                  />
                </div>

                {/* Business Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('Business Email *', 'البريد الإلكتروني للعمل *')}
                  </label>
                  <Input
                    type="email"
                    {...register('email')}
                    placeholder={t('procurement@company.com', 'procurement@company.com')}
                    error={errors.email?.message}
                    leftIcon={<Mail className="w-4 h-4" />}
                  />
                </div>

                {/* Telephone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('Phone / Mobile *', 'الهاتف / الموبايل *')}
                  </label>
                  <Input
                    {...register('phone')}
                    placeholder={t('+20 100 000 0000', '+20 100 000 0000')}
                    error={errors.phone?.message}
                    leftIcon={<Phone className="w-4 h-4" />}
                  />
                </div>

                {/* Required Quantity */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('Estimated Quantity Required *', 'الكمية التقديرية المطلوبة *')}
                  </label>
                  <Input
                    {...register('required_quantity')}
                    placeholder={t('e.g. 500 kg, 2 drums, 1 metric ton', 'مثال: ٥٠٠ كجم، برميلين، ١ طن متري')}
                    error={errors.required_quantity?.message}
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    {t('Commercial inquiry only. Does not reserve stock.', 'للاستفسار التجاري فقط، ولا يحجز مخزوناً.')}
                  </p>
                </div>

                {/* Grade / Spec */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('Pharmacopoeia Standard / Grade', 'المعيار / الدرجة')}
                  </label>
                  <Input
                    {...register('grade_spec')}
                    placeholder={t('e.g. USP, BP, EP, DC grade', 'مثال: USP, BP, EP أو درجة كبس مباشر')}
                    error={errors.grade_spec?.message}
                  />
                </div>

                {/* Application */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('Application / Dosage Form', 'التطبيق / الشكل الدوائي')}
                  </label>
                  <Input
                    {...register('application')}
                    placeholder={t('e.g. Solid oral dose, Topical, Injectable', 'مثال: أقراص صلبة، مستحضرات موضعية، حقن')}
                    error={errors.application?.message}
                  />
                </div>

                {/* Target Date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('Target Delivery Date (Optional)', 'تاريخ التوريد المستهدف (اختياري)')}
                  </label>
                  <Input
                    type="date"
                    {...register('target_delivery_date')}
                    error={errors.target_delivery_date?.message}
                  />
                </div>
              </div>

              {/* Additional Comments */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('Additional Comments or Specifications', 'ملاحظات أو مواصفات إضافية')}
                </label>
                <Textarea
                  {...register('additional_comments')}
                  rows={3}
                  placeholder={t(
                    'Mention any specific documentation requirements (COA, DMF, GMP certificate, stability study)...',
                    'اذكر أي متطلبات توثيق خاصة (شهادة تحليل COA، ملف DMF، شهادة GMP، دراسات ثبات)...'
                  )}
                  error={errors.additional_comments?.message}
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {t(
                    'Submissions are handled under strict commercial confidentiality and direct sales routing.',
                    'تتم معالجة جميع الطلبات بسرية تامة ومتابعة مباشرة مع الإدارة التجارية.'
                  )}
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <Button type="button" variant="outline" onClick={handleClose}>
                  {t('Cancel', 'إلغاء')}
                </Button>
                <Button type="submit" variant="teal" isLoading={isSubmitting}>
                  {t('Submit Quote Request', 'إرسال طلب التسعير')}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
