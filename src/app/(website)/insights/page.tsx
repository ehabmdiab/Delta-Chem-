import { Metadata } from 'next';
import { dataStore } from '@/lib/data/store';
import { InsightsPageClient } from './InsightsPageClient';

export const metadata: Metadata = {
  title: 'Insights & Technical Articles | DELTACHEM Egypt',
  description:
    'Regulatory updates, pharmacopoeial trends, cold chain logistics analysis, and life science market intelligence from DELTACHEM experts.',
};

export default async function InsightsPage() {
  const articles = await dataStore.getArticles();
  return <InsightsPageClient articles={articles} />;
}
