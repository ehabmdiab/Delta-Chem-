'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product, Category } from '@/types';
import { ProductCard } from '@/components/molecules/ProductCard';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { useLanguage } from '@/components/providers/LanguageContext';
import { Search, RotateCcw, PackageOpen, Filter } from 'lucide-react';

interface ProductFilterPanelProps {
  initialProducts: Product[];
  categories: Category[];
  initialCategorySlug?: string;
  initialSearchQuery?: string;
}

export const ProductFilterPanel: React.FC<ProductFilterPanelProps> = ({
  initialProducts,
  categories,
  initialCategorySlug,
  initialSearchQuery,
}) => {
  const { t } = useLanguage();
  const [search, setSearch] = useState(initialSearchQuery || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategorySlug || 'all'
  );
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const cat = categories.find((c) => c.slug === selectedCategory);
        if (cat && product.category_id !== cat.id) {
          return false;
        }
      }

      // Industry filter
      if (selectedIndustry !== 'all') {
        if (
          !product.industry ||
          !product.industry.toLowerCase().includes(selectedIndustry.toLowerCase())
        ) {
          return false;
        }
      }

      // Search query filter
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description?.toLowerCase().includes(q) || false;
        const matchesCas = product.cas_number?.toLowerCase().includes(q) || false;
        const matchesStandard =
          product.pharmacopoeia_standards?.toLowerCase().includes(q) || false;
        const matchesAr = product.name_ar?.includes(q) || false;

        if (!matchesName && !matchesDesc && !matchesCas && !matchesStandard && !matchesAr) {
          return false;
        }
      }

      return true;
    });
  }, [initialProducts, categories, selectedCategory, selectedIndustry, search]);

  const handleReset = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedIndustry('all');
  };

  const industries = [
    { label: t('All Industries', 'جميع القطاعات'), value: 'all' },
    { label: t('Pharmaceutical Manufacturing', 'صناعة الأدوية'), value: 'pharmaceutical' },
    { label: t('Nutraceuticals & Dietary', 'المكملات الغذائية'), value: 'nutraceutical' },
    { label: t('Veterinary & Animal Health', 'الأدوية البيطرية والأعلاف'), value: 'veterinary' },
    { label: t('Cosmetics & Cosmeceuticals', 'مستحضرات التجميل'), value: 'cosmetic' },
  ];

  return (
    <div className="space-y-8">
      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Bar */}
          <div className="w-full md:flex-1">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t(
                'Search by product name, active ingredient, CAS number, standard (e.g. 103-90-2, Paracetamol, USP)...',
                'ابحث باسم المنتج، رقم CAS، أو الدستور الدوائي...'
              )}
              leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            />
          </div>

          {/* Industry Filter Dropdown */}
          <div className="w-full md:w-64">
            <Select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              options={industries}
            />
          </div>

          {/* Clear Filters Button */}
          {(search || selectedCategory !== 'all' || selectedIndustry !== 'all') && (
            <Button
              variant="outline"
              size="md"
              onClick={handleReset}
              className="shrink-0 text-xs"
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              {t('Clear Filters', 'مسح التصفية')}
            </Button>
          )}
        </div>

        {/* Category Pills */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>{t('Category:', 'القسم:')}</span>
          </span>

          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t('All Ingredients', 'جميع المنتجات')}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                selectedCategory === cat.slug
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t(cat.name, cat.name_ar)}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Status */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div>
          <span>
            {t(
              `Showing ${filteredProducts.length} verified ingredient${
                filteredProducts.length === 1 ? '' : 's'
              }`,
              `عرض ${filteredProducts.length} منتج مسجل وموثق`
            )}
          </span>
        </div>
        <div className="text-[11px] text-slate-400">
          {t('Directory for B2B Quotations & Inquiries', 'دليل الاستفسارات وطلبات عروض الأسعار')}
        </div>
      </div>

      {/* Product Results Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <PackageOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            {t('No Ingredients Match Your Search', 'لم يتم العثور على خامات مطابقة للبحث')}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {t(
              'DELTACHEM regularly sources custom pharmacopoeial specifications, rare APIs, and specialized excipients upon direct client request.',
              'تقوم دلتا كيم بتوريد مواصفات كيميائية خاصة ومواد فعالة وسواغات نادرة بناءً على طلب المصانع والشركات.'
            )}
          </p>
          <div className="pt-2 flex justify-center gap-3">
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
    </div>
  );
};
