import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dataStore } from '@/lib/data/store';
import { Container } from '@/components/atoms/Container';
import { ProductCard } from '@/components/molecules/ProductCard';
import { Button } from '@/components/atoms/Button';
import { ChevronRight, ArrowLeft, Pill, Sparkles, FlaskConical, ShieldCheck } from 'lucide-react';

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

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <Container size="lg" className="space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-800 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
          <Link href="/products" className="hover:text-slate-800 transition">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
          <span className="text-slate-900 font-semibold">{category.name}</span>
        </nav>

        {/* Division Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
          <div className="inline-block px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold rounded-full uppercase tracking-wider">
            DELTACHEM Specialized Division
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            {category.name}
          </h1>

          {category.name_ar && (
            <p className="text-base font-bold text-teal-800 font-arabic">
              {category.name_ar}
            </p>
          )}

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            {category.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link href="/request-a-quote">
              <Button variant="teal" size="sm">
                Request Division RFQ
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="sm">
                View Entire Catalog
              </Button>
            </Link>
          </div>
        </div>

        {/* Division Products Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing {products.length} registered product{products.length === 1 ? '' : 's'} in this division
            </span>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
              No products are currently published in this division. Contact our sourcing desk for custom inquiries.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
