import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Clock,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Container } from '@/components/atoms/Container';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { dataStore } from '@/lib/data/store';
import { ArticleCard } from '@/components/molecules/ArticleCard';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
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

  const formattedDate = new Date(article.published_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white">
      {/* Header / Breadcrumb */}
      <div className="border-b border-slate-200 bg-slate-50 py-4">
        <Container>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/insights" className="hover:text-blue-600">
              Insights
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium truncate max-w-md">
              {article.title}
            </span>
          </div>
        </Container>
      </div>

      {/* Article Header */}
      <header className="py-12 lg:py-16 bg-white border-b border-slate-100">
        <Container className="max-w-4xl">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to all insights</span>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Badge variant="primary">{article.category}</Badge>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
            {article.title}
          </h1>

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{article.author}</p>
                <p className="text-xs text-slate-500">DELTACHEM Executive & Technical Leadership</p>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Article Content */}
      <article className="py-12 lg:py-16">
        <Container className="max-w-4xl">
          {article.excerpt && (
            <p className="text-lg leading-relaxed text-slate-700 font-medium border-l-4 border-blue-600 pl-4 py-1 mb-8 bg-blue-50/50 rounded-r-lg">
              {article.excerpt}
            </p>
          )}

          <div
            className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed space-y-6 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-slate-900 [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>strong]:text-slate-900"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          {/* Author Box */}
          <div className="mt-16 rounded-2xl bg-slate-50 p-8 border border-slate-200">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">About the Author: {article.author}</h4>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Leading technical evaluation and commercial distribution of pharmaceutical raw materials across Egypt and the Middle East, ensuring adherence to Egyptian Drug Authority (EDA) and international pharmacopoeial monographs.
                </p>
              </div>
            </div>
          </div>

          {/* Inquire on Mentioned Ingredients */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-900 p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold">Require Ingredients Discussed in this Article?</h3>
              <p className="text-sm text-slate-300 mt-1">
                Request Certificates of Analysis, technical monographs, and pricing from our sales desk.
              </p>
            </div>
            <Link href="/request-a-quote" className="shrink-0">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-medium">
                Request a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-slate-50 py-16 border-t border-slate-200">
          <Container className="max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Insights</h2>
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
}
