'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types';
import { Badge } from '@/components/atoms/Badge';
import { useLanguage } from '@/components/providers/LanguageContext';
import { Calendar, User, ArrowRight } from 'lucide-react';

const CATEGORY_MAP: Record<string, string> = {
  Regulatory: 'شؤون تنظيمية ورقابية',
  'Supply Chain': 'سلاسل الإمداد واللوجستيات',
  Technical: 'دراسات فنية وتصنيعية',
  Commercial: 'دراسات السوق والتجارة',
  Quality: 'ضمان ورقابة الجودة',
  'Corporate Vision': 'رؤية الشركة',
  'Quality & Regulatory': 'الجودة والشؤون التنظيمية',
};

export const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const { t, locale } = useLanguage();
  const formattedDate = new Date(article.published_at).toLocaleDateString(
    locale === 'ar' ? 'ar-EG' : 'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
  );

  const localizedCategory = t(article.category, CATEGORY_MAP[article.category] || article.category);
  const localizedAuthor = t(
    article.author,
    article.author.includes('Abdelhamid') ? 'د. عبدالحميد أبو العلي' : article.author
  );

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-teal-500/80 hover:shadow-[0_12px_32px_-12px_rgba(15,31,24,0.14)]">
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <Badge variant="teal" size="sm">
            {localizedCategory}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <h3 className="mb-2.5 text-lg font-bold text-slate-900 transition-colors group-hover:text-teal-700">
          <Link href={`/insights/${article.slug}`}>{t(article.title, article.title_ar)}</Link>
        </h3>

        <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-slate-600">
          {t(article.excerpt || '', article.excerpt_ar)}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <User className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-medium text-slate-700">{localizedAuthor}</span>
        </div>
        <Link
          href={`/insights/${article.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-teal-700 transition group-hover:text-teal-800 active:scale-95"
        >
          <span>{t('Read Article', 'قراءة المقال')}</span>
          <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
};
