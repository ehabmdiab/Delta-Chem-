import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { dataStore } from '@/lib/data/store';
import { ArticleDetailPageClient } from './ArticleDetailPageClient';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await dataStore.getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await dataStore.getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | DELTACHEM',
    };
  }

  return {
    title: `${article.seo_title || article.title} | DELTACHEM Insights`,
    description: article.seo_description || article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await dataStore.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await dataStore.getArticles();
  const relatedArticles = allArticles.filter((a) => a.id !== article.id).slice(0, 2);

  return <ArticleDetailPageClient article={article} relatedArticles={relatedArticles} />;
}
