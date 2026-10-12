'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Users,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Save,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { Supplier, Product } from '@/types';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';

interface SuppliersManagerClientProps {
  initialSuppliers: Supplier[];
  products: Product[];
}

interface NewSupplierFormData {
  name: string;
  country: string;
  partnership_type: string;
  website_url?: string;
  description?: string;
}

export const SuppliersManagerClient: React.FC<SuppliersManagerClientProps> = ({
  initialSuppliers,
  products,
}) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewSupplierFormData>({
    defaultValues: {
      partnership_type: 'Exclusive Commercial Representation',
      country: 'Germany',
    },
  });

  const onSubmit: SubmitHandler<NewSupplierFormData> = async (data) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to create supplier');
      }

      setSuppliers((prev) => [...prev, json.supplier]);
      reset();
      setShowAddForm(false);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Error creating supplier');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePublish = async (supplier: Supplier) => {
    try {
      const newStatus = !supplier.is_published;
      const res = await fetch(`/api/admin/suppliers/${supplier.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      setSuppliers((prev) =>
        prev.map((s) => (s.id === supplier.id ? { ...s, is_published: newStatus } : s))
      );
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Action failed');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete supplier "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/suppliers/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete supplier');

      setSuppliers((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-400">
          Global Principal Partners: <strong className="text-white">{suppliers.length}</strong>
        </p>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs"
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          <span>{showAddForm ? 'Close Supplier Form' : 'Add New Principal'}</span>
        </Button>
      </div>

      {errorMessage && (
        <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Add Supplier Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-teal-500/30 bg-slate-900/90 p-6 space-y-4 shadow-lg"
        >
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="h-4 w-4 text-teal-400" />
            <span>Add Principal Manufacturer</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Company / Principal Name *
              </label>
              <Input
                placeholder="e.g. EuroPharma Fine Chemicals GmbH"
                className="bg-slate-850 text-white border-slate-700"
                error={errors.name?.message}
                {...register('name', { required: 'Name is required' })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Country of Origin *
              </label>
              <Input
                placeholder="e.g. Germany, India, France, Spain"
                className="bg-slate-850 text-white border-slate-700"
                error={errors.country?.message}
                {...register('country', { required: 'Country is required' })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Partnership Type
              </label>
              <Input
                placeholder="e.g. Exclusive Commercial Agency / Indent Partner"
                className="bg-slate-850 text-white border-slate-700"
                {...register('partnership_type')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Corporate Website URL
              </label>
              <Input
                placeholder="https://www.example-pharma.com"
                className="bg-slate-850 text-white border-slate-700 font-mono"
                {...register('website_url')}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Manufacturing & Quality Capabilities Overview
              </label>
              <Input
                placeholder="Synthesis capabilities, GMP certifications (EU-GMP, US-FDA), key chemical families..."
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
              <span>Save Principal</span>
            </Button>
          </div>
        </form>
      )}

      {/* Suppliers Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-850 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-4">Principal Name</th>
              <th className="py-3.5 px-4">Country</th>
              <th className="py-3.5 px-4">Representation Model</th>
              <th className="py-3.5 px-4">Represented Products</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {suppliers.map((s) => {
              const productCount = products.filter((p) => p.supplier_id === s.id).length;

              return (
                <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white text-sm">{s.name}</div>
                    {s.website_url && (
                      <a
                        href={s.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-teal-400 hover:underline mt-0.5"
                      >
                        <span>{s.website_url.replace(/^https?:\/\//, '')}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs text-slate-300 font-medium">
                      {s.country || 'Global'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-400">
                    {s.partnership_type || 'Authorized Distributor'}
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-white">
                    {productCount} Ingredients
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleTogglePublish(s)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition ${
                        s.is_published
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'bg-slate-700/30 text-slate-400 border border-slate-700 hover:bg-slate-700/50'
                      }`}
                    >
                      {s.is_published ? (
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
                      onClick={() => handleDelete(s.id, s.name)}
                      className="rounded-lg p-1.5 text-rose-400 hover:bg-rose-950 hover:text-rose-300"
                      title="Delete Supplier"
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
