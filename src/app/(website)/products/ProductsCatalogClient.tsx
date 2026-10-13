'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductFilterPanel } from '@/components/organisms/ProductFilterPanel';
import type { Category, Product } from '@/types';

interface ProductsCatalogClientProps {
  products: Product[];
  categories: Category[];
}

/**
 * Reads `?category=` / `?search=` on the client so the products page stays
 * statically renderable (required for the GitHub Pages export).
 */
function CatalogWithQuery({ products, categories }: ProductsCatalogClientProps) {
  const params = useSearchParams();
  const category = params.get('category') ?? undefined;
  const search = params.get('search') ?? undefined;

  return (
    <ProductFilterPanel
      key={`${category ?? ''}|${search ?? ''}`}
      initialProducts={products}
      categories={categories}
      initialCategorySlug={category}
      initialSearchQuery={search}
    />
  );
}

export function ProductsCatalogClient(props: ProductsCatalogClientProps) {
  return (
    <Suspense
      fallback={
        <ProductFilterPanel initialProducts={props.products} categories={props.categories} />
      }
    >
      <CatalogWithQuery {...props} />
    </Suspense>
  );
}
