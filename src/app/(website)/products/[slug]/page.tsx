import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dataStore } from '@/lib/data/store';
import { Container } from '@/components/atoms/Container';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { ProductDetailClient } from './ProductDetailClient';
import {
  FileText,
  Warehouse,
  ShieldCheck,
  Building2,
  Calendar,
  CheckCircle2,
  Phone,
  Mail,
  ChevronRight,
} from 'lucide-react';

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

  const isHarvestFacility = product.availability_status
    .toLowerCase()
    .includes('harvest');

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <Container size="lg" className="space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-800 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
          <Link href="/products" className="hover:text-slate-800 transition">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
          {product.category && (
            <>
              <Link
                href={`/divisions/${product.category.slug}`}
                className="hover:text-slate-800 transition"
              >
                {product.category.name}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
            </>
          )}
          <span className="text-slate-900 font-semibold truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Main Product Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                {product.category && (
                  <Badge variant="teal" size="md">
                    {product.category.name}
                  </Badge>
                )}
                {product.cas_number && (
                  <span className="text-xs font-mono text-slate-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                    CAS {product.cas_number}
                  </span>
                )}
                {product.pharmacopoeia_standards && (
                  <span className="text-xs font-semibold text-slate-900 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                    {product.pharmacopoeia_standards}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {product.name}
              </h1>

              {product.name_ar && (
                <p className="text-sm font-semibold text-teal-800 font-arabic">
                  {product.name_ar}
                </p>
              )}

              <p className="text-sm text-slate-600 leading-relaxed pt-1">
                {product.description}
              </p>
            </div>

            {/* Client interactive action trigger */}
            <div className="shrink-0 w-full lg:w-72">
              <ProductDetailClient product={product} />
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs">
              Technical & Pharmacopoeial Parameters
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-semibold block mb-1">
                  Pharmacopoeial Monograph
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  {product.pharmacopoeia_standards || 'Official Monograph Standard'}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-semibold block mb-1">
                  Purity / Assay Grade
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  {product.grade_spec || 'Pharmaceutical Grade'}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-semibold block mb-1">
                  Standard Packaging
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  {product.packaging || '25 kg industrial drum / bag'}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-semibold block mb-1">
                  Target Industry
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  {product.industry || 'Pharmaceutical Manufacturing'}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-semibold block mb-1">
                  Recommended Applications
                </span>
                <span className="font-bold text-slate-800 text-sm">
                  {product.application || 'Solid dose, oral suspension, formulation'}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-semibold block mb-1">
                  Stock / Availability Status
                </span>
                <span className="font-bold text-teal-800 text-sm">
                  {product.availability_status}
                </span>
              </div>
            </div>
          </div>

          {/* Technical Info & Harvest Pharma Note */}
          {product.technical_info && (
            <div className="p-5 bg-teal-50/50 rounded-xl border border-teal-100 space-y-2 text-xs text-slate-700">
              <strong className="text-teal-900 font-semibold block text-sm">
                Chemical & Formulation Notes:
              </strong>
              <p className="leading-relaxed">{product.technical_info}</p>
            </div>
          )}

          {isHarvestFacility && (
            <div className="p-4 bg-slate-900 text-white rounded-xl flex items-start gap-3 text-xs">
              <Warehouse className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white text-sm">
                  Stored at Harvest Pharma Logistics Facility (Cairo)
                </strong>
                <p className="text-slate-300 mt-0.5">
                  This product is managed under climate-controlled conditions with certified Good Distribution Practice (GDP) protocols at our sister company’s Cairo warehouse. Available for prompt local dispatch.
                </p>
              </div>
            </div>
          )}

          {/* Regulatory Documents Available */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Available Quality & Regulatory Dossiers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                <div className="truncate">
                  <span className="font-semibold block text-slate-800 truncate">
                    Certificate of Analysis (COA)
                  </span>
                  <span className="text-[11px] text-slate-400">Batch-specific upon request</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                <div className="truncate">
                  <span className="font-semibold block text-slate-800 truncate">
                    Material Safety Data Sheet (MSDS)
                  </span>
                  <span className="text-[11px] text-slate-400">GHS / REACH compliant</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                <div className="truncate">
                  <span className="font-semibold block text-slate-800 truncate">
                    GMP Audit & DMF Summary
                  </span>
                  <span className="text-[11px] text-slate-400">For registration filing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
