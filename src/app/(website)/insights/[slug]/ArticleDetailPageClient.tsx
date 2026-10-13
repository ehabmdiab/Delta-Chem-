'use client';

import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Container } from '@/components/atoms/Container';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { Article } from '@/types';
import { useLanguage } from '@/components/providers/LanguageContext';

const CATEGORY_MAP: Record<string, string> = {
  'Regulatory Affairs': 'الشؤون التنظيمية والرقابية',
  'Technical Guide': 'دليل فني وتطبيقي',
  'Quality Control': 'توكيد وضبط الجودة',
  'Supply Chain': 'سلاسل الإمداد والتوريد',
  'Market Analysis': 'تحليلات السوق الدوائي',
};

interface ArticleDetailPageClientProps {
  article: Article;
  relatedArticles: Article[];
}

export const ArticleDetailPageClient: React.FC<ArticleDetailPageClientProps> = ({
  article,
  relatedArticles,
}) => {
  const { t, locale } = useLanguage();

  const title = locale === 'ar' && article.title_ar ? article.title_ar : article.title;
  const excerpt = locale === 'ar' && article.excerpt_ar ? article.excerpt_ar : article.excerpt;
  const body = locale === 'ar' && article.body_ar ? article.body_ar : article.body;
  const categoryLabel =
    locale === 'ar' && CATEGORY_MAP[article.category]
      ? CATEGORY_MAP[article.category]
      : article.category;

  const authorName =
    locale === 'ar' && article.author.includes('Abdelhamid')
      ? 'د. عبد الحميد أبو العلى'
      : article.author;

  const formattedDate = new Date(article.published_at).toLocaleDateString(
    locale === 'ar' ? 'ar-EG' : 'en-US',
    {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }
  );

  return (
    <div className="bg-white">
      {/* Header / Breadcrumb */}
      <div className="border-b border-slate-200 bg-slate-50 py-4">
        <Container>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-teal-600">
              {t('Home', 'الرئيسية')}
            </Link>
            <span>/</span>
            <Link href="/insights" className="hover:text-teal-600">
              {t('Insights', 'الرؤى والتحليلات')}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium truncate max-w-md">
              {title}
            </span>
          </div>
        </Container>
      </div>

      {/* Article Header */}
      <header className="py-12 lg:py-16 bg-white border-b border-slate-100">
        <Container className="max-w-4xl">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800 mb-6"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            <span>{t('Back to all insights', 'العودة إلى كافة المقالات')}</span>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Badge variant="primary">{categoryLabel}</Badge>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
            {title}
          </h1>

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-800 font-bold">
                {authorName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{authorName}</p>
                <p className="text-xs text-slate-500">
                  {t(
                    'DELTACHEM Executive & Technical Leadership',
                    'القيادة الفنية والتنفيذية لدلتا كيم'
                  )}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Article Content */}
      <article className="py-12 lg:py-16">
        <Container className="max-w-4xl">
          {excerpt && (
            <p className="text-lg leading-relaxed text-slate-700 font-medium border-l-4 rtl:border-l-0 rtl:border-r-4 border-teal-600 pl-4 rtl:pl-0 rtl:pr-4 py-1 mb-8 bg-teal-50/50 rounded-r-lg rtl:rounded-r-none rtl:rounded-l-lg">
              {excerpt}
            </p>
          )}

          <div
            className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed space-y-6 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-slate-900 [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 rtl:[&>ul]:pl-0 rtl:[&>ul]:pr-6 [&>ul]:space-y-2 [&>strong]:text-slate-900"
            dangerouslySetInnerHTML={{ __html: body }}
          />

          {/* Author Box */}
          <div className="mt-16 rounded-2xl bg-slate-50 p-8 border border-slate-200">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 text-white font-bold shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {t(`About the Author: ${authorName}`, `عن الكاتب: ${authorName}`)}
                </h4>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {t(
                    'Leading technical evaluation and commercial distribution of pharmaceutical raw materials across Egypt and the Middle East, ensuring adherence to Egyptian Drug Authority (EDA) and international pharmacopoeial monographs.',
                    'يقود التقييم الفني والتوزيع التجاري للمواد الخام الصيدلانية في مصر والشرق الأوسط، مع ضمان الالتزام التام باشتراطات هيئة الدواء المصرية (EDA) ودساتير الأدوية الدولية.'
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Inquire on Mentioned Ingredients */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-teal-950 to-slate-900 p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold">
                {t(
                  'Require Ingredients Discussed in this Article?',
                  'هل تحتاج إلى الخامات المذكورة في هذا المقال؟'
                )}
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                {t(
                  'Request Certificates of Analysis, technical monographs, and pricing from our sales desk.',
                  'اطلب شهادات التحليل (COA)، والدراسات الفنية، وعروض الأسعار من مكتب المبيعات لدينا.'
                )}
              </p>
            </div>
            <Link href="/request-a-quote" className="shrink-0">
              <Button className="bg-teal-600 hover:bg-teal-500 text-white font-medium">
                {t('Request a Quote', 'طلب عرض أسعار')}
                <ArrowRight className="ml-2 h-4 w-4 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </Container>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-slate-50 py-16 border-t border-slate-200">
          <Container className="max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              {t('Related Insights', 'مقالات ورؤى ذات صلة')}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id} article={rel} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
};
