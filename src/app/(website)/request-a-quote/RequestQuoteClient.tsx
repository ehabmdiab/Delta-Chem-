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
  FileText,
  Warehouse,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { Select } from '@/components/atoms/Select';
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
      product_name: matchedProduct ? matchedProduct.name : '',
      product_id: matchedProduct ? matchedProduct.id : '',
      grade_spec: (matchedProduct ? matchedProduct.pharmacopoeia_standards : null) || 'USP / BP / EP',
      delivery_model: 'stock_and_trade',
    },
  });

  useEffect(() => {
    if (matchedProduct) {
      setValue('product_name', matchedProduct.name);
      setValue('product_id', matchedProduct.id);
      if (matchedProduct.pharmacopoeia_standards) {
        setValue('grade_spec', matchedProduct.pharmacopoeia_standards);
      }
    }
  }, [matchedProduct, setValue]);

  const onProductSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId === 'other') {
      setValue('product_id', '');
      setValue('product_name', '');
    } else {
      const prod = products.find((p) => p.id === selectedId);
      if (prod) {
        setValue('product_id', prod.id);
        setValue('product_name', prod.name);
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
        throw new Error(result.error || 'Failed to submit RFQ. Please check form inputs.');
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
          : 'Failed to transmit quotation request. Please contact sales@deltachem.com.eg.'
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
            Quotation Request Received
          </span>
          <h3 className="mt-4 text-2xl font-extrabold text-emerald-950 sm:text-3xl">
            RFQ Successfully Registered
          </h3>
          <p className="mt-2 text-sm text-emerald-800 max-w-lg mx-auto">
            Thank you, <span className="font-semibold">{successData.companyName}</span>. Your request for <span className="font-semibold">{successData.productName}</span> has been dispatched to our technical commercial desk.
          </p>

          <div className="my-8 inline-block rounded-xl bg-white p-6 border border-emerald-300 shadow-sm text-center">
            <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">
              Official Quotation Reference
            </span>
            <p className="text-2xl font-mono font-black text-emerald-700 mt-1">
              {successData.referenceNumber}
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Save this reference number for all subsequent correspondence with sales.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 max-w-md mx-auto text-left text-xs text-slate-600 bg-white/70 p-4 rounded-xl border border-emerald-200">
            <div>
              <span className="font-bold text-slate-900 block">Response SLA</span>
              Within 24 business hours
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Dossier Inclusion</span>
              Lot COA & Pricing Sheet
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => setSuccessData(null)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium"
            >
              Submit Another Product Request
            </Button>
            <Link href="/products">
              <Button variant="outline">Browse Product Catalog</Button>
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
              <FlaskConical className="h-5 w-5 text-blue-600" />
              1. Material & Specification
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Select Verified Ingredient
                </label>
                <select
                  defaultValue={matchedProduct ? matchedProduct.id : 'other'}
                  onChange={onProductSelectChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="other">-- Custom / Unlisted Ingredient --</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.cas_number || 'N/A'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Ingredient Name / CAS Number *
                </label>
                <Input
                  placeholder="e.g. Microcrystalline Cellulose PH 102"
                  error={errors.product_name?.message}
                  {...register('product_name', { required: 'Please specify the ingredient name' })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Required Volume / Quantity *
                </label>
                <Input
                  placeholder="e.g. 500 kg, 2 Metric Tons, 25 kg trial drum"
                  leftIcon={<Scale className="h-4 w-4" />}
                  error={errors.required_quantity?.message}
                  {...register('required_quantity', {
                    required: 'Please state your required quantity',
                  })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Target Pharmacopoeia / Grade
                </label>
                <Input
                  placeholder="e.g. USP-NF, BP, EP, JP, FCC, Cosmetic Grade"
                  error={errors.grade_spec?.message}
                  {...register('grade_spec')}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Fulfillment & Commercial Terms */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
              <Warehouse className="h-5 w-5 text-blue-600" />
              2. Commercial Model & Timing
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Preferred Delivery Channel
                </label>
                <Select
                  {...register('delivery_model')}
                  options={[
                    {
                      value: 'stock_and_trade',
                      label: 'Stock & Trade (Cairo Warehouse Dispatch via Harvest Pharma)',
                    },
                    {
                      value: 'indent_agency',
                      label: 'Commission Agency (Direct Maritime Indent from Global Principal)',
                    },
                    {
                      value: 'buffer_agreement',
                      label: 'Annual Reserved Buffer Agreement (Cairo Holding)',
                    },
                  ]}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Target Factory Receiving Date
                </label>
                <Input
                  type="date"
                  leftIcon={<Calendar className="h-4 w-4" />}
                  {...register('target_delivery_date')}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Dosage Form / Finished Application
                </label>
                <Input
                  placeholder="e.g. Direct compression oral tablet, sterile injectable, anti-aging serum"
                  {...register('application')}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Company & Contact Information */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              3. Procurement Organization Details
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Company / Factory Name *
                </label>
                <Input
                  placeholder="e.g. Amoun Pharmaceutical / Pharco"
                  leftIcon={<Building2 className="h-4 w-4" />}
                  error={errors.company_name?.message}
                  {...register('company_name', { required: 'Company name is required' })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Contact Person & Title *
                </label>
                <Input
                  placeholder="e.g. Dr. Ahmed Samir (Procurement Lead)"
                  leftIcon={<User className="h-4 w-4" />}
                  error={errors.contact_person?.message}
                  {...register('contact_person', { required: 'Contact person is required' })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Official Business Email *
                </label>
                <Input
                  type="email"
                  placeholder="procurement@company.com"
                  leftIcon={<Mail className="h-4 w-4" />}
                  error={errors.email?.message}
                  {...register('email', {
                    required: 'Email address is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Valid corporate email required',
                    },
                  })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Direct Phone / Mobile *
                </label>
                <Input
                  placeholder="+20 100 000 0000"
                  leftIcon={<Phone className="h-4 w-4" />}
                  error={errors.phone?.message}
                  {...register('phone', { required: 'Phone number is required' })}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Additional Regulatory or Packaging Instructions */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Special Documentation or Packaging Notes
            </label>
            <Textarea
              rows={3}
              placeholder="Specify if DMF Open Part, CEP, Halal certification, or specific drum packaging is required..."
              {...register('notes')}
            />
          </div>

          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>B2B Confidentiality Notice:</strong> DELTACHEM complies with strict commercial non-disclosure ethics. We do not distribute consumer goods or process retail orders.
            </span>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3.5"
          >
            {isSubmitting ? (
              <span>Registering Official RFQ...</span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>Submit Official Request for Quote</span>
                <Send className="h-4 w-4" />
              </span>
            )}
          </Button>
        </form>
      )}
    </div>
  );
};
