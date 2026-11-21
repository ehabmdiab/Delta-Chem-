'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useReducedMotion } from 'motion/react';
import { rfqFormSchema, RfqFormValues } from '@/lib/validation/rfq';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { useLanguage } from '@/components/providers/LanguageContext';
import { SPRING_SMOOTH, CROSSFADE_REDUCED } from '@/lib/motion';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Building2,
  User,
  Mail,
  Phone,
  Package,
  ShieldCheck,
} from 'lucide-react';

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProduct?: {
    id?: string;
    name: string;
    grade?: string | null;
  } | null;
}

function isOutsideRect(e: PointerEvent, el: HTMLElement): boolean {
  const r = el.getBoundingClientRect();
  return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
}

export const RfqModal: React.FC<RfqModalProps> = ({ isOpen, onClose, prefilledProduct }) => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
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

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.setAttribute('closedby', 'any');

    if (isOpen) {
      reset({
        product_id: prefilledProduct?.id || undefined,
        product_name: prefilledProduct?.name || '',
        grade_spec: prefilledProduct?.grade || '',
        website_url_hp: '',
      });
      if (!dialog.open && typeof dialog.showModal === 'function') {
        dialog.showModal();
      }
    } else if (dialog.open && typeof dialog.close === 'function') {
      dialog.close();
    }
  }, [isOpen, prefilledProduct, reset]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || 'closedBy' in HTMLDialogElement.prototype) return;

    let pressedOutside = false;
    const onPointerDown = (e: PointerEvent) => {
      pressedOutside = isOutsideRect(e, dialog);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (pressedOutside && isOutsideRect(e, dialog) && typeof dialog.close === 'function') {
        dialog.close();
      }
      pressedOutside = false;
    };

    dialog.addEventListener('pointerdown', onPointerDown);
    dialog.addEventListener('pointerup', onPointerUp);
    return () => {
      dialog.removeEventListener('pointerdown', onPointerDown);
      dialog.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  const handleClose = () => {
    setSuccessReference(null);
    setErrorMessage(null);
    const dialog = dialogRef.current;
    if (dialog?.open && typeof dialog.close === 'function') {
      dialog.close();
    }
    onClose();
  };

  const handleNativeClose = () => {
    setSuccessReference(null);
    setErrorMessage(null);
    onClose();
  };

  const onSubmit = async (data: RfqFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = (await res.json()) as { reference_number?: string; error?: string };
      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit inquiry.');
      }

      setSuccessReference(result.reference_number ?? 'RFQ-RECEIVED');
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed. Please try again.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={handleNativeClose}
      className="m-auto w-[min(92vw,42rem)] max-h-[90dvh] overflow-y-auto border-0 bg-transparent p-0"
    >
      {isOpen && (
        <motion.div
          key="rfq-dialog-surface"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={reduceMotion ? CROSSFADE_REDUCED : SPRING_SMOOTH}
          className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-slate-900 px-6 py-5 text-white">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 rtl:normal-case rtl:tracking-normal">
                DELTACHEM Commercial Sourcing
              </span>
              <h3 id={titleId} className="mt-0.5 text-xl font-bold">
                {t('Request for Quotation (RFQ)', 'طلب تسعير ومواصفات تجارية')}
              </h3>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white active:scale-95"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {successReference ? (
              <div className="space-y-4 py-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900">
                  {t('Inquiry Received Successfully', 'تم استلام طلب التسعير بنجاح')}
                </h4>
                <p className="mx-auto max-w-md text-sm text-slate-600">
                  {t(
                    'Your quotation request has been dispatched to the DELTACHEM commercial desk.',
                    'تم إرسال طلبكم بنجاح إلى الإدارة التجارية بشركة دلتا كيم للمتابعة.'
                  )}
                </p>
                <div className="mx-auto max-w-xs rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <span className="block text-xs font-medium uppercase tracking-wider text-slate-500 rtl:normal-case rtl:tracking-normal">
                    {t('Inquiry Reference Number', 'رقم المرجع')}
                  </span>
                  <span className="font-mono text-lg font-bold text-teal-700">{successReference}</span>
                </div>
                <div className="pt-4">
                  <Button type="button" variant="primary" autoFocus onClick={handleClose}>
                    {t('Close', 'إغلاق')}
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {errorMessage && (
                  <div className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                    <AlertCircle className="h-4 w-4 shrink-0" />
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

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      {t('Product Required *', 'اسم الخامة المطلوبة *')}
                    </label>
                    <Input
                      autoFocus
                      {...register('product_name')}
                      placeholder={t(
                        'e.g. Amoxicillin Trihydrate, MCC PH 101',
                        'مثال: أموكسيسيلين، سليلوز دقيق التبلور'
                      )}
                      error={errors.product_name?.message}
                      leftIcon={<Package className="h-4 w-4" />}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      {t('Company Name *', 'اسم الشركة / المصنع *')}
                    </label>
                    <Input
                      {...register('company_name')}
                      placeholder={t('e.g. EVA Pharma, Sedico', 'مثال: إيفا فارما، سيديكو')}
                      error={errors.company_name?.message}
                      leftIcon={<Building2 className="h-4 w-4" />}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      {t('Contact Person *', 'اسم المسؤول *')}
                    </label>
                    <Input
                      {...register('contact_person')}
                      placeholder={t('e.g. Dr. Ahmed Hassan', 'مثال: د. أحمد حسن')}
                      error={errors.contact_person?.message}
                      leftIcon={<User className="h-4 w-4" />}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      {t('Business Email *', 'البريد الإلكتروني للعمل *')}
                    </label>
                    <Input
                      type="email"
                      {...register('email')}
                      placeholder="procurement@company.com"
                      error={errors.email?.message}
                      leftIcon={<Mail className="h-4 w-4" />}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      {t('Phone / Mobile *', 'الهاتف / الموبايل *')}
                    </label>
                    <Input
                      {...register('phone')}
                      placeholder="+20 100 000 0000"
                      error={errors.phone?.message}
                      leftIcon={<Phone className="h-4 w-4" />}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      {t('Estimated Quantity Required *', 'الكمية التقديرية المطلوبة *')}
                    </label>
                    <Input
                      {...register('required_quantity')}
                      placeholder={t('e.g. 500 kg, 2 drums', 'مثال: ٥٠٠ كجم، برميلين')}
                      error={errors.required_quantity?.message}
                    />
                    <p className="mt-1 text-[11px] text-slate-500">
                      {t('Commercial inquiry only.', 'للاستفسار التجاري فقط.')}
                    </p>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      {t('Pharmacopoeia Standard / Grade', 'المعيار / الدرجة')}
                    </label>
                    <Input
                      {...register('grade_spec')}
                      placeholder={t('e.g. USP, BP, EP, DC grade', 'مثال: USP, BP, EP')}
                      error={errors.grade_spec?.message}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      {t('Application / Dosage Form', 'التطبيق / الشكل الدوائي')}
                    </label>
                    <Input
                      {...register('application')}
                      placeholder={t('e.g. Solid oral dose, Topical', 'مثال: أقراص، مستحضرات موضعية')}
                      error={errors.application?.message}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      {t('Target Delivery Date (Optional)', 'تاريخ التوريد المستهدف (اختياري)')}
                    </label>
                    <Input
                      type="date"
                      {...register('target_delivery_date')}
                      error={errors.target_delivery_date?.message}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    {t('Additional Comments or Specifications', 'ملاحظات أو مواصفات إضافية')}
                  </label>
                  <Textarea
                    {...register('additional_comments')}
                    rows={3}
                    placeholder={t(
                      'Mention COA, DMF, GMP certificate, or specific packing needs...',
                      'اذكر متطلبات التوثيق (COA، DMF، GMP) أو نوع التعبئة...'
                    )}
                    error={errors.additional_comments?.message}
                  />
                </div>

                <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>
                    {t(
                      'Handled under strict B2B confidentiality.',
                      'تُعامل جميع الطلبات بسرية تجارية تامة.'
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-3">
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
        </motion.div>
      )}
    </dialog>
  );
};
