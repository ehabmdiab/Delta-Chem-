import React from 'react';
import type { Metadata } from 'next';
import { dataStore } from '@/lib/data/store';
import { ProductFilterPanel } from '@/components/organisms/ProductFilterPanel';
import { Container } from '@/components/atoms/Container';

export const metadata: Metadata = {
  title: 'Pharmaceutical Ingredients Catalog | DELTACHEM Egypt & MENA',
  description:
    'Search and browse DELTACHEM’s complete directory of Active Pharmaceutical Ingredients (APIs), excipients, nutraceuticals, veterinary APIs, and cosmetic actives.',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const categories = await dataStore.getCategories();
  const { products } = await dataStore.getProducts();

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <Container size="lg" className="space-y-8">
        {/* Page Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs space-y-3">
          <div className="inline-block px-2.5 py-1 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold rounded-full uppercase tracking-wider">
            B2B Commercial Directory
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Pharmaceutical & Life Science Ingredient Catalog
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Search, filter, and inspect verified ingredient records. This catalog is structured for formulation scientists, quality departments, and procurement managers in Egypt and the MENA region. Request immediate quotations and batch technical documentation.
          </p>
        </div>

        {/* Filter & Results Panel */}
        <ProductFilterPanel
          initialProducts={products}
          categories={categories}
          initialCategorySlug={resolvedParams.category}
          initialSearchQuery={resolvedParams.search}
        />
      </Container>
    </div>
  );
}
