import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { dataStore } from '@/lib/data/store';
import { ProductForm } from '../../ProductForm';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: 'Edit Product Monograph | DELTACHEM Admin',
  description: 'Update chemical specification monograph in DELTACHEM catalog',
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const [allProducts, categories, suppliers] = await Promise.all([
    dataStore.getAllProductsAdmin(),
    dataStore.getAllCategoriesAdmin(),
    dataStore.getAllSuppliersAdmin(),
  ]);

  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

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
            Edit: {product.name}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Update technical parameters, pharmacopoeial grades, packaging, or translations.
          </p>
        </div>
      </div>

      <ProductForm
        initialData={product}
        categories={categories}
        suppliers={suppliers}
      />
    </div>
  );
}
