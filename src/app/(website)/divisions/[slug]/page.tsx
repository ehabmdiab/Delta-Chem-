import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { dataStore } from '@/lib/data/store';
import { DivisionPageClient } from './DivisionPageClient';

export async function generateStaticParams() {
  const categories = await dataStore.getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await dataStore.getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Division Not Found | DELTACHEM' };
  }

  return {
    title: `${category.name} | DELTACHEM Egypt & MENA`,
    description: category.description || `Explore ${category.name} supplied by DELTACHEM.`,
  };
}

export default async function DivisionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await dataStore.getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const { products } = await dataStore.getProducts({ categorySlug: slug });

  return <DivisionPageClient category={category} products={products} />;
}
