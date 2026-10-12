'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import {
  Save,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Package,
  Layers,
  FileText,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import { Product, Category, Supplier } from '@/types';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';

interface ProductFormData {
  name: string;
  slug: string;
  name_ar?: string;
  category_id?: string;
  supplier_id?: string;
  cas_number?: string;
  grade_spec?: string;
  pharmacopoeia_standards?: string;
  availability_status: string;
  packaging?: string;
  industry?: string;
  application?: string;
  description?: string;
  description_ar?: string;
  technical_info?: string;
  is_featured: boolean;
  is_published: boolean;
  seo_title?: string;
  seo_description?: string;
}

interface ProductFormProps {
  initialData?: Product;
  categories: Category[];
  suppliers: Supplier[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  suppliers,
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isEdit = Boolean(initialData);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: initialData?.name || '',
      slug: initialData?.slug || '',
      name_ar: initialData?.name_ar || '',
      category_id: initialData?.category_id || (categories[0]?.id || ''),
      supplier_id: initialData?.supplier_id || '',
      cas_number: initialData?.cas_number || '',
      grade_spec: initialData?.grade_spec || 'Pharma Grade',
      pharmacopoeia_standards: initialData?.pharmacopoeia_standards || 'USP / BP / EP',
      availability_status: initialData?.availability_status || 'Available in Stock',
      packaging: initialData?.packaging || '25 kg fiber drum',
      industry: initialData?.industry || 'Pharmaceutical Manufacturing',
      application: initialData?.application || '',
      description: initialData?.description || '',
      description_ar: initialData?.description_ar || '',
      technical_info: initialData?.technical_info || '',
      is_featured: initialData?.is_featured ?? false,
      is_published: initialData?.is_published ?? true,
      seo_title: initialData?.seo_title || '',
      seo_description: initialData?.seo_description || '',
    },
  });

  const handleGenerateSlug = () => {
    const name = watch('name');
    if (name) {
      const generated = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setValue('slug', generated);
    }
  };

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const url = isEdit
        ? `/api/admin/products/${initialData?.id}`
        : '/api/admin/products';

      const method = isEdit ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to save product');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
      {errorMessage && (
        <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Section 1: Identification */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Package className="h-4 w-4 text-teal-400" />
          General Identification
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Product Name (English) *
            </label>
            <Input
              placeholder="e.g. Amoxicillin Trihydrate Compacted"
              error={errors.name?.message}
              className="bg-slate-850 text-white border-slate-700"
              {...register('name', { required: 'Name is required' })}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                URL Slug *
              </label>
              <button
                type="button"
                onClick={handleGenerateSlug}
                className="text-[11px] text-teal-400 hover:text-teal-300 font-medium"
              >
                Auto-generate
              </button>
            </div>
            <Input
              placeholder="amoxicillin-trihydrate-compacted"
              error={errors.slug?.message}
              className="bg-slate-850 text-white border-slate-700 font-mono"
              {...register('slug', { required: 'Slug is required' })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Product Name (Arabic)
            </label>
            <Input
              placeholder="e.g. أموكسيسيلين ثلاثي الهيدرات مضغوط"
              className="bg-slate-850 text-white border-slate-700 font-arabic text-right"
              {...register('name_ar')}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              CAS Number
            </label>
            <Input
              placeholder="e.g. 61336-70-7"
              className="bg-slate-850 text-white border-slate-700 font-mono"
              {...register('cas_number')}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Classification & Sourcing */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Layers className="h-4 w-4 text-teal-400" />
          Classification & Supplier
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Category Division *
            </label>
            <select
              className="w-full rounded-md border border-slate-700 bg-slate-850 px-3.5 py-2 text-sm text-white focus:outline-none focus:border-teal-500"
              {...register('category_id')}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Principal Supplier
            </label>
            <select
              className="w-full rounded-md border border-slate-700 bg-slate-850 px-3.5 py-2 text-sm text-white focus:outline-none focus:border-teal-500"
              {...register('supplier_id')}
            >
              <option value="">-- Unassigned / Direct Sourced --</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.country || 'Global'})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Grade Specification
            </label>
            <Input
              placeholder="e.g. Pharma Grade / DC Grade / Cosmetic Grade"
              className="bg-slate-850 text-white border-slate-700"
              {...register('grade_spec')}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Pharmacopoeia Standards
            </label>
            <Input
              placeholder="e.g. USP / BP / EP / JP / FCC"
              className="bg-slate-850 text-white border-slate-700 font-mono"
              {...register('pharmacopoeia_standards')}
            />
          </div>
        </div>
      </div>

      {/* Section 3: Commercial & Warehouse Logistics */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <ShieldCheck className="h-4 w-4 text-teal-400" />
          Logistics & Availability
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Availability Status
            </label>
            <Input
              placeholder="Available in Stock (Harvest Pharma Facility)"
              className="bg-slate-850 text-white border-slate-700"
              {...register('availability_status')}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Packaging Format
            </label>
            <Input
              placeholder="e.g. 25 kg fiber drum with double inner PE liner"
              className="bg-slate-850 text-white border-slate-700"
              {...register('packaging')}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Target Industry
            </label>
            <Input
              placeholder="e.g. Human Pharmaceutical Manufacturing"
              className="bg-slate-850 text-white border-slate-700"
              {...register('industry')}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Primary Applications
            </label>
            <Input
              placeholder="e.g. Direct compression capsules, dry powder oral suspensions"
              className="bg-slate-850 text-white border-slate-700"
              {...register('application')}
            />
          </div>
        </div>
      </div>

      {/* Section 4: Descriptions & Technical Monograph */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <FileText className="h-4 w-4 text-teal-400" />
          Technical Descriptions
        </h3>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Full Description (English)
          </label>
          <Textarea
            rows={4}
            placeholder="Comprehensive description of chemical characteristics, solubility, and regulatory attributes..."
            className="bg-slate-850 text-white border-slate-700"
            {...register('description')}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Full Description (Arabic)
          </label>
          <Textarea
            rows={3}
            placeholder="الوصف الفني للمنتج باللغة العربية..."
            className="bg-slate-850 text-white border-slate-700 font-arabic text-right"
            {...register('description_ar')}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Technical Information / Monograph Parameters
          </label>
          <Textarea
            rows={3}
            placeholder="e.g. Assay: 98.0% - 102.0%. Bulk density: 0.65 g/mL. Moisture: <= 14.5%..."
            className="bg-slate-850 text-white border-slate-700 font-mono text-xs"
            {...register('technical_info')}
          />
        </div>
      </div>

      {/* Section 5: Status & SEO */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Globe className="h-4 w-4 text-teal-400" />
          Publishing & Search Optimization
        </h3>

        <div className="flex flex-wrap gap-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-700 bg-slate-850 text-teal-600 focus:ring-teal-500"
              {...register('is_published')}
            />
            <span className="text-xs font-semibold uppercase tracking-wider text-white">
              Published on Public Website
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-700 bg-slate-850 text-teal-600 focus:ring-teal-500"
              {...register('is_featured')}
            />
            <span className="text-xs font-semibold uppercase tracking-wider text-white">
              Featured on Homepage
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              SEO Meta Title
            </label>
            <Input
              placeholder="e.g. Amoxicillin Trihydrate Compacted | DELTACHEM"
              className="bg-slate-850 text-white border-slate-700"
              {...register('seo_title')}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              SEO Meta Description
            </label>
            <Input
              placeholder="e.g. Premium compacted Amoxicillin Trihydrate for pharmaceutical manufacturing in Egypt."
              className="bg-slate-850 text-white border-slate-700"
              {...register('seo_description')}
            />
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between border-t border-slate-800 pt-6">
        <Link href="/admin/products">
          <Button variant="outline" type="button" className="border-slate-700 text-slate-300 hover:bg-slate-850">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Cancel</span>
          </Button>
        </Link>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-teal-600 hover:bg-teal-500 text-white font-medium px-8"
        >
          {isSubmitting ? (
            <span>Saving Product...</span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              <span>{isEdit ? 'Update Product' : 'Create Product'}</span>
            </span>
          )}
        </Button>
      </div>
    </form>
  );
};
