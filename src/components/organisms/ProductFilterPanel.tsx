'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Product, Category } from '@/types';
import { ProductCard } from '@/components/molecules/ProductCard';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { RfqModal } from '@/components/molecules/RfqModal';
import { useLanguage } from '@/components/providers/LanguageContext';
import { SPRING_SNAPPY, CROSSFADE_REDUCED } from '@/lib/motion';
import {
  Search,
  RotateCcw,
  PackageOpen,
  Filter,
  LayoutGrid,
  Table2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface ProductFilterPanelProps {
  initialProducts: Product[];
  categories: Category[];
  initialCategorySlug?: string;
  initialSearchQuery?: string;
  hideCategoryPills?: boolean;
}

const ITEMS_PER_PAGE = 24;

export const ProductFilterPanel: React.FC<ProductFilterPanelProps> = ({
  initialProducts,
  categories,
  initialCategorySlug,
  initialSearchQuery,
  hideCategoryPills = false,
}) => {
  const { t, locale } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [search, setSearch] = useState(initialSearchQuery || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategorySlug || 'all');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [page, setPage] = useState<number>(1);
  const [rfqProduct, setRfqProduct] = useState<Product | null>(null);

  const sectorScopedProducts = useMemo(() => {
    if (selectedCategory === 'all') return initialProducts;
    const cat = categories.find((c) => c.slug === selectedCategory);
    if (!cat) return initialProducts;
    return initialProducts.filter((p) => p.category_id === cat.id);
  }, [initialProducts, categories, selectedCategory]);

  const groupOptions = useMemo(() => {
    const unique = Array.from(
      new Set(
        sectorScopedProducts
          .map((p) => p.application)
          .filter((val): val is string => Boolean(val && val.trim().length > 0))
      )
    );
    return [
      { label: t('All Product Groups', 'كل المجموعات الفرعية'), value: 'all' },
      ...unique.map((g) => ({ label: g, value: g })),
    ];
  }, [sectorScopedProducts, t]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of initialProducts) {
      if (p.category_id) {
        counts[p.category_id] = (counts[p.category_id] ?? 0) + 1;
      }
    }
    return counts;
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    return sectorScopedProducts.filter((product) => {
      if (selectedGroup !== 'all' && product.application !== selectedGroup) {
        return false;
      }

      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesAr = product.name_ar?.toLowerCase().includes(q) || false;
        const matchesStd = product.pharmacopoeia_standards?.toLowerCase().includes(q) || false;
        const matchesPack = product.packaging?.toLowerCase().includes(q) || false;
        const matchesGroup = product.application?.toLowerCase().includes(q) || false;
        const matchesDesc = product.description?.toLowerCase().includes(q) || false;

        if (!matchesName && !matchesAr && !matchesStd && !matchesPack && !matchesGroup && !matchesDesc) {
          return false;
        }
      }

      return true;
    });
  }, [sectorScopedProducts, selectedGroup, search]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginatedProducts = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, safePage]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setSelectedGroup('all');
    setPage(1);
  };

  const handleReset = () => {
    setSearch('');
    if (!hideCategoryPills) {
      setSelectedCategory('all');
    }
    setSelectedGroup('all');
    setPage(1);
  };

  const pillTransition = reduceMotion ? CROSSFADE_REDUCED : SPRING_SNAPPY;

  return (
    <div className="space-y-8">
      {/* Search & Filter Toolbar */}
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="w-full md:flex-1">
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={t(
                'Search by raw material name, pharmacopoeia (USP/BP/EP), or packing...',
                'ابحث باسم الخامة أو دستور الأدوية (USP/BP/EP) أو التعبئة...'
              )}
              leftIcon={<Search className="h-4 w-4 text-slate-400" />}
            />
          </div>

          <div className="w-full md:w-72">
            <Select
              value={selectedGroup}
              onChange={(e) => {
                setSelectedGroup(e.target.value);
                setPage(1);
              }}
              options={groupOptions}
            />
          </div>

          <div className="flex w-full items-center justify-between gap-2 md:w-auto">
            {/* Apple-style sliding segmented control */}
            <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1">
              {(
                [
                  ['cards', LayoutGrid, 'Cards', 'بطاقات', 'Grid view', 'عرض البطاقات'],
                  ['table', Table2, 'List', 'قائمة', 'Table view', 'عرض الجدول'],
                ] as const
              ).map(([mode, Icon, labelEn, labelAr, ariaEn, ariaAr]) => {
                const active = viewMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setViewMode(mode)}
                    aria-label={t(ariaEn, ariaAr)}
                    aria-pressed={active}
                    className={`relative inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors active:scale-[0.97] ${
                      active ? 'text-teal-700' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="catalog-view-pill"
                        transition={pillTransition}
                        aria-hidden="true"
                        className="absolute inset-0 rounded-lg bg-white shadow-xs"
                      />
                    )}
                    <Icon className="relative z-10 h-3.5 w-3.5" />
                    <span className="relative z-10">{t(labelEn, labelAr)}</span>
                  </button>
                );
              })}
            </div>

            {(search || (!hideCategoryPills && selectedCategory !== 'all') || selectedGroup !== 'all') && (
              <Button
                variant="outline"
                size="md"
                onClick={handleReset}
                className="shrink-0 text-xs"
                leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
              >
                {t('Reset', 'مسح')}
              </Button>
            )}
          </div>
        </div>

        {/* 4-Sector Pills */}
        {!hideCategoryPills && (
          <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
            <span className="mr-1 flex items-center gap-1 text-xs font-semibold text-slate-400">
              <Filter className="h-3.5 w-3.5" />
              <span>{t('Sector:', 'القطاع:')}</span>
            </span>

            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 active:scale-[0.97] ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('All Sectors', 'كل القطاعات')} ({initialProducts.length})
            </button>

            {categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 active:scale-[0.97] ${
                  selectedCategory === cat.slug
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t(cat.name, cat.name_ar)} ({categoryCounts[cat.id] ?? 0})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-500">
        <span>
          {t(
            `Showing ${paginatedProducts.length} of ${filteredProducts.length} raw materials`,
            `عرض ${paginatedProducts.length} من إجمالي ${filteredProducts.length} خامة مسجلة`
          )}
        </span>
        {totalPages > 1 && (
          <span className="font-mono text-slate-500">
            {t(`Page ${safePage} of ${totalPages}`, `صفحة ${safePage} من ${totalPages}`)}
          </span>
        )}
      </div>

      {/* Results Display */}
      {paginatedProducts.length > 0 ? (
        viewMode === 'cards' ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm rtl:text-right">
              <thead>
                <tr className="border-b border-slate-200 bg-teal-900 text-xs font-bold uppercase tracking-wider text-white rtl:normal-case rtl:tracking-normal">
                  <th className="px-5 py-3.5">{t('Product Name', 'اسم الخامة')}</th>
                  <th className="px-4 py-3.5">{t('Sector / Group', 'القطاع / المجموعة')}</th>
                  <th className="px-4 py-3.5">{t('Standard', 'الدستور')}</th>
                  <th className="px-4 py-3.5">{t('Packing', 'التعبئة')}</th>
                  <th className="px-5 py-3.5 text-center">{t('Inquiry', 'تسعير')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedProducts.map((product) => (
                  <tr key={product.id} className="transition-colors hover:bg-teal-50/50">
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/products/${product.slug}`}
                        className="font-bold text-slate-900 hover:text-teal-700 hover:underline"
                      >
                        {locale === 'ar' && product.name_ar ? product.name_ar : product.name}
                      </Link>
                      {locale === 'ar' && (
                        <span className="mt-0.5 block text-xs text-slate-500">{product.name}</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-600">
                      <span className="block font-semibold text-teal-800">
                        {product.category ? t(product.category.name, product.category.name_ar) : ''}
                      </span>
                      <span className="text-slate-500">{product.application}</span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs font-semibold text-slate-800">
                      {product.pharmacopoeia_standards}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs text-slate-700">
                      {product.packaging}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <Button
                        type="button"
                        variant="teal"
                        size="sm"
                        onClick={() => setRfqProduct(product)}
                        className="text-xs font-bold"
                      >
                        <Sparkles className="h-3 w-3" />
                        {t('RFQ', 'تسعير')}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <PackageOpen className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            {t('No Ingredients Match Your Search', 'لم يتم العثور على خامات مطابقة للبحث')}
          </h3>
          <p className="mx-auto max-w-md text-sm text-slate-500">
            {t(
              'Contact our procurement desk for custom specifications or direct sourcing inquiries.',
              'تواصل مع مكتب التوريد للاستفسار عن مواصفات خاصة أو طلبات استيراد مخصصة.'
            )}
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              {t('Reset Filters', 'إعادة ضبط البحث')}
            </Button>
            <Link href="/contact">
              <Button variant="teal" size="sm">
                {t('Contact Sourcing Team', 'تواصل مع فريق التوريد')}
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="min-h-[40px]"
          >
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            <span>{t('Previous', 'السابق')}</span>
          </Button>

          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => setPage(pageNum)}
              className={`min-h-[40px] min-w-[40px] cursor-pointer rounded-lg border px-3 text-xs font-bold transition-all active:scale-95 ${
                pageNum === safePage
                  ? 'border-teal-700 bg-teal-700 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="min-h-[40px]"
          >
            <span>{t('Next', 'التالي')}</span>
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          </Button>
        </div>
      )}

      <RfqModal
        isOpen={Boolean(rfqProduct)}
        onClose={() => setRfqProduct(null)}
        prefilledProduct={
          rfqProduct
            ? {
                id: rfqProduct.id,
                name: rfqProduct.name,
                grade: rfqProduct.pharmacopoeia_standards || rfqProduct.grade_spec,
              }
            : undefined
        }
      />
    </div>
  );
};
