import React from 'react';
import { dataStore } from '@/lib/data/store';
import { RfqsManagerClient } from './RfqsManagerClient';

export const metadata = {
  title: 'Quotation Inquiries (RFQs) | DELTACHEM Admin',
  description: 'Manage B2B pharmaceutical quotations, pricing requests, and commercial responses.',
};

export default async function AdminRfqsPage() {
  const rfqs = await dataStore.getRFQs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Quotation Requests & Inquiries (RFQs)
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Review buyer specifications, verify local Harvest Pharma warehouse stock, and issue commercial offers.
        </p>
      </div>

      <RfqsManagerClient initialRfqs={rfqs} />
    </div>
  );
}
