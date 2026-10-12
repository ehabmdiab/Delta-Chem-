import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { dataStore } from '@/lib/data/store';
import { ProductForm } from '../ProductForm';

export const metadata = {
  title: 'Create Product | DELTACHEM Admin',
  description: 'Add a new chemical ingredient to DELTACHEM monograph catalog',
};

export default async function NewProductPage() {
  const [categories, suppliers] = await Promise.all([
    dataStore.getAllCategoriesAdmin(),
    dataStore.getAllSuppliersAdmin(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Add New Ingredient
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Publish a pharmaceutical active, excipient, or specialty raw material to the B2B catalog.
          </p>
        </div>
      </div>

      <ProductForm categories={categories} suppliers={suppliers} />
    </div>
  );
}
