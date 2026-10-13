'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Container } from '@/components/atoms/Container';
import { Badge } from '@/components/atoms/Badge';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { Article } from '@/types';
import { useLanguage } from '@/components/providers/LanguageContext';

interface InsightsPageClientProps {
  articles: Article[];
}

export const InsightsPageClient: React.FC<InsightsPageClientProps> = ({ articles }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/30 via-transparent to-transparent pointer-events-none" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="info" className="mb-4">
              {t('Knowledge & Market Intelligence', 'المعرفة والتحليلات السوقية الدوائية')}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              {t(
                'Pharmaceutical & Life Science Insights',
                'رؤى وتحليلات الصناعات الدوائية وعلوم الحياة'
              )}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {t(
                'In-depth commentary, technical briefs, and regulatory perspectives on raw materials, Good Distribution Practices (GDP), and chemical sourcing in Egypt and the MENA region.',
                'تحليلات معمقة، وملفات فنية، ورؤى تنظيمية حول المواد الخام الدوائية، وممارسات التوزيع الجيد (GDP)، وتوريد الكيماويات بمصر والشرق الأوسط.'
              )}
            </p>
          </div>
        </Container>
      </section>

      {/* Articles Grid */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {t('Featured Publications', 'أبرز المقالات والدراسات الفنية')}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {t(
                  'Articles authored by our technical directors and quality specialists.',
                  'مقالات ودراسات فنية كتبها خبراؤنا ومديرو توكيد الجودة.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {t(`Total Articles: ${articles.length}`, `إجمالي المقالات: ${articles.length}`)}
              </span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {articles.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900">
                {t('No articles found', 'لا توجد مقالات منشورة حالياً')}
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                {t(
                  'Please check back soon for our latest technical updates.',
                  'يرجى العودة قريباً للاطلاع على أحدث الدراسات والتحديثات الفنية.'
                )}
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Newsletter / Regulatory Alert CTA */}
      <section className="bg-slate-900 py-16 text-white text-center border-t border-slate-800">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">
              {t(
                'Stay Ahead of EDA Regulatory Changes',
                'ابقَ على اطلاع دائم بقرارات هيئة الدواء المصرية (EDA)'
              )}
            </h2>
            <p className="mt-4 text-slate-300 text-sm">
              {t(
                'Receive updates on pharmacopoeial revisions, active ingredient availability, and Harvest Pharma warehousing buffer schedules.',
                'احصل على أحدث التحديثات حول مراجعات دساتير الأدوية، وتوفر المواد الفعالة، وجداول مخزون الأمان بمستودعات هارفست فارما.'
              )}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/contact">
                <button className="rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 transition cursor-pointer">
                  {t('Contact Technical Advisory', 'تواصل مع الاستشارات الفنية')}
                </button>
              </Link>
              <Link href="/products">
                <button className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition cursor-pointer">
                  {t('Browse Product Monograph', 'تصفح كتالوج المواد الخام')}
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
