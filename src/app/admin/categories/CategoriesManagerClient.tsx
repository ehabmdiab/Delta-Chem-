'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  FolderTree,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Save,
  Layers,
} from 'lucide-react';
import { Category, Product } from '@/types';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';

interface CategoriesManagerClientProps {
  initialCategories: Category[];
  products: Product[];
}

interface NewCategoryFormData {
  name: string;
  slug: string;
  name_ar?: string;
  description?: string;
  sort_order: number;
}

export const CategoriesManagerClient: React.FC<CategoriesManagerClientProps> = ({
  initialCategories,
  products,
}) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<NewCategoryFormData>({
    defaultValues: {
      sort_order: categories.length + 1,
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

  const onSubmit: SubmitHandler<NewCategoryFormData> = async (data) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to create category');
      }

      setCategories((prev) => [...prev, json.category]);
      reset({ sort_order: categories.length + 2 });
      setShowAddForm(false);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Error creating category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePublish = async (cat: Category) => {
    try {
      const newStatus = !cat.is_published;
      const res = await fetch(`/api/admin/categories/${cat.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      setCategories((prev) =>
        prev.map((c) => (c.id === cat.id ? { ...c, is_published: newStatus } : c))
      );
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Action failed');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const attachedCount = products.filter((p) => p.category_id === id).length;
    if (attachedCount > 0) {
      alert(
        `Cannot delete "${name}" because it currently has ${attachedCount} products assigned. Reassign or delete those products first.`
      );
      return;
    }

    if (!window.confirm(`Are you sure you want to delete category "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete category');

      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-400">
          Total Taxonomy Categories: <strong className="text-white">{categories.length}</strong>
        </p>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs"
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          <span>{showAddForm ? 'Close Category Form' : 'Add New Category'}</span>
        </Button>
      </div>

      {errorMessage && (
        <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Add Category Collapsible Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-teal-500/30 bg-slate-900/90 p-6 space-y-4 shadow-lg"
        >
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="h-4 w-4 text-teal-400" />
            <span>Create New Product Category</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Category Name (English) *
              </label>
              <Input
                placeholder="e.g. Ophthalmic Excipients"
                className="bg-slate-850 text-white border-slate-700"
                error={errors.name?.message}
                {...register('name', { required: 'Name is required' })}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  URL Slug *
                </label>
                <button
                  type="button"
                  onClick={handleGenerateSlug}
                  className="text-[11px] text-teal-400 hover:text-teal-300 font-medium"
                >
                  Generate
                </button>
              </div>
              <Input
                placeholder="ophthalmic-excipients"
                className="bg-slate-850 text-white border-slate-700 font-mono"
                error={errors.slug?.message}
                {...register('slug', { required: 'Slug is required' })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Name (Arabic)
              </label>
              <Input
                placeholder="سواغات قطرات ومستحضرات العيون"
                className="bg-slate-850 text-white border-slate-700 font-arabic text-right"
                {...register('name_ar')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Sort Order Weight
              </label>
              <Input
                type="number"
                className="bg-slate-850 text-white border-slate-700 font-mono"
                {...register('sort_order', { valueAsNumber: true })}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Brief Description
              </label>
              <Input
                placeholder="Functional description of this ingredient family..."
                className="bg-slate-850 text-white border-slate-700"
                {...register('description')}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAddForm(false)}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="bg-teal-600 hover:bg-teal-500 text-white font-medium"
            >
              <Save className="mr-1.5 h-3.5 w-3.5" />
              <span>Save Category</span>
            </Button>
          </div>
        </form>
      )}

      {/* Categories Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-850 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-4">Category Name</th>
              <th className="py-3.5 px-4">Slug</th>
              <th className="py-3.5 px-4">Active Products</th>
              <th className="py-3.5 px-4">Sort Order</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {categories.map((cat) => {
              const productCount = products.filter((p) => p.category_id === cat.id).length;

              return (
                <tr key={cat.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white text-sm">{cat.name}</div>
                    {cat.name_ar && (
                      <div className="text-[11px] text-slate-400 font-arabic">{cat.name_ar}</div>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-400">
                    {cat.slug}
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-white">
                    <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs">
                      {productCount} Products
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-400">
                    {cat.sort_order}
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleTogglePublish(cat)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition ${
                        cat.is_published
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'bg-slate-700/30 text-slate-400 border border-slate-700 hover:bg-slate-700/50'
                      }`}
                    >
                      {cat.is_published ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 text-slate-400" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(cat.id, cat.name)}
                      className="rounded-lg p-1.5 text-rose-400 hover:bg-rose-950 hover:text-rose-300"
                      title="Delete Category"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
