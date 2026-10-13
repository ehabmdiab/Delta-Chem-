import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { dataStore } from '@/lib/data/store';
import { ProductDetailPageClient } from './ProductDetailPageClient';

export async function generateStaticParams() {
  const { products } = await dataStore.getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await dataStore.getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | DELTACHEM',
    };
  }

  return {
    title: `${product.name} | DELTACHEM Pharmaceutical Ingredients`,
    description:
      product.description ||
      `Buy verified ${product.name} (CAS ${product.cas_number || 'N/A'}) in Egypt and MENA. USP/BP/EP grade supplied by DELTACHEM.`,
    openGraph: {
      title: product.name,
      description: product.description || '',
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await dataStore.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPageClient product={product} />;
}
