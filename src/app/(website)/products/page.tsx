import React from 'react';
import type { Metadata } from 'next';
import { dataStore } from '@/lib/data/store';
import { Container } from '@/components/atoms/Container';
import { ProductsHeaderClient } from './ProductsHeaderClient';
import { ProductsCatalogClient } from './ProductsCatalogClient';

export const metadata: Metadata = {
  title: 'Pharmaceutical Ingredients Catalog | DELTACHEM Egypt & MENA',
  description:
    'Search and browse DELTACHEM’s complete directory of Active Pharmaceutical Ingredients (APIs), excipients, nutraceuticals, veterinary APIs, and cosmetic actives.',
};

export default async function ProductsPage() {
  const categories = await dataStore.getCategories();
  const { products } = await dataStore.getProducts();

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <Container size="lg" className="space-y-8">
        {/* Page Header */}
        <ProductsHeaderClient />

        {/* Filter & Results Panel */}
        <ProductsCatalogClient products={products} categories={categories} />
      </Container>
    </div>
  );
}
