import { Metadata } from 'next';
import Link from 'next/link';
import { Newspaper, ArrowRight, BookOpen, Search } from 'lucide-react';
import { Container } from '@/components/atoms/Container';
import { Badge } from '@/components/atoms/Badge';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { dataStore } from '@/lib/data/store';

export const metadata: Metadata = {
  title: 'Insights & Technical Articles | DELTACHEM Egypt',
  description:
    'Regulatory updates, pharmacopoeial trends, cold chain logistics analysis, and life science market intelligence from DELTACHEM experts.',
};

export default async function InsightsPage() {
  const articles = await dataStore.getArticles();

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent pointer-events-none" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="info" className="mb-4">
              Knowledge & Market Intelligence
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Pharmaceutical & Life Science Insights
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              In-depth commentary, technical briefs, and regulatory perspectives on raw materials, Good Distribution Practices (GDP), and chemical sourcing in Egypt and the MENA region.
            </p>
          </div>
        </Container>
      </section>

      {/* Articles Grid */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Featured Publications</h2>
              <p className="text-sm text-slate-500 mt-1">
                Articles authored by our technical directors and quality specialists.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Articles: {articles.length}
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
              <h3 className="text-lg font-bold text-slate-900">No articles found</h3>
              <p className="text-sm text-slate-500 mt-2">Please check back soon for our latest technical updates.</p>
            </div>
          )}
        </Container>
      </section>

      {/* Newsletter / Regulatory Alert CTA */}
      <section className="bg-slate-900 py-16 text-white text-center border-t border-slate-800">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">Stay Ahead of EDA Regulatory Changes</h2>
            <p className="mt-4 text-slate-300 text-sm">
              Receive updates on pharmacopoeial revisions, active ingredient availability, and Harvest Pharma warehousing buffer schedules.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/contact">
                <button className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition">
                  Contact Technical Advisory
                </button>
              </Link>
              <Link href="/products">
                <button className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition">
                  Browse Product Monograph
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
