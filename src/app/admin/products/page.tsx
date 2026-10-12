import React from 'react';
import { dataStore } from '@/lib/data/store';
import { ProductsManagerClient } from './ProductsManagerClient';

export const metadata = {
  title: 'Manage Products | DELTACHEM Admin',
  description: 'DELTACHEM Pharmaceutical Ingredient Catalog Administration',
};

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    dataStore.getAllProductsAdmin(),
    dataStore.getAllCategoriesAdmin(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Product Catalog & Monographs
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage pharmaceutical APIs, excipients, cosmeceutical actives, and veterinary raw materials.
        </p>
      </div>

      <ProductsManagerClient
        initialProducts={products}
        categories={categories}
      />
    </div>
  );
}
