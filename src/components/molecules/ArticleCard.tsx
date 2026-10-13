'use client';

import React from 'react';
import Link from 'next/link';
import { Article } from '@/types';
import { Badge } from '@/components/atoms/Badge';
import { useLanguage } from '@/components/providers/LanguageContext';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

const CATEGORY_MAP: Record<string, string> = {
  Regulatory: 'شؤون تنظيمية ورقابية',
  'Supply Chain': 'سلاسل الإمداد واللوجستيات',
  Technical: 'دراسات فنية وتصنيعية',
  Commercial: 'دراسات السوق والتجارة',
  Quality: 'ضمان ورقابة الجودة',
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
    <div className="group bg-white rounded-xl border border-slate-200/90 hover:border-teal-500/80 p-6 transition-all duration-300 hover:shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="teal" size="sm">
            {localizedCategory}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2.5">
          <Link href={`/insights/${article.slug}`}>
            {t(article.title, article.title_ar)}
          </Link>
        </h3>

        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
          {t(article.excerpt || '', article.excerpt_ar)}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-medium text-slate-700">{localizedAuthor}</span>
        </div>
        <Link
          href={`/insights/${article.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-teal-700 group-hover:text-teal-800 transition"
        >
          <span>{t('Read Article', 'قراءة المقال')}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
};
