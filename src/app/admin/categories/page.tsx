import React from 'react';
import { dataStore } from '@/lib/data/store';
import { CategoriesManagerClient } from './CategoriesManagerClient';

export const metadata = {
  title: 'Manage Categories | DELTACHEM Admin',
  description: 'DELTACHEM Product Taxonomy & Category Divisions',
};

export default async function AdminCategoriesPage() {
  const [categories, products] = await Promise.all([
    dataStore.getAllCategoriesAdmin(),
    dataStore.getAllProductsAdmin(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Product Categories & Divisions
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Organize the catalog taxonomy across APIs, excipients, veterinary, and cosmeceutical divisions.
        </p>
      </div>

      <CategoriesManagerClient
        initialCategories={categories}
        products={products}
      />
    </div>
  );
}
