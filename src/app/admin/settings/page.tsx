import React from 'react';
import { dataStore } from '@/lib/data/store';
import { SettingsManagerClient } from './SettingsManagerClient';

export const metadata = {
  title: 'Site Configuration | DELTACHEM Admin',
  description: 'Manage corporate registry, contact channels, and Harvest Pharma partner URLs.',
};

export default async function AdminSettingsPage() {
  const settings = await dataStore.getSiteSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Site Settings & Corporate Details
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Configure corporate registry information, Cairo head office contacts, and partner URLs.
        </p>
      </div>

      <SettingsManagerClient initialSettings={settings} />
    </div>
  );
}
