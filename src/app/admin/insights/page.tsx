import React from 'react';
import { dataStore } from '@/lib/data/store';
import { InsightsManagerClient } from './InsightsManagerClient';

export const metadata = {
  title: 'Manage Insights | DELTACHEM Admin',
  description: 'Manage Technical Articles & Life Science Publications',
};

export default async function AdminInsightsPage() {
  const articles = await dataStore.getAllArticlesAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Articles & Technical Publications
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Curate scientific thought-leadership, regulatory briefings, and life science market trends.
        </p>
      </div>

      <InsightsManagerClient initialArticles={articles} />
    </div>
  );
}
