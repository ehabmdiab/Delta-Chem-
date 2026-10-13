import { Metadata } from 'next';
import { dataStore } from '@/lib/data/store';
import { RequestQuotePageClient } from './RequestQuotePageClient';

export const metadata: Metadata = {
  title: 'Request a Quote (RFQ) | DELTACHEM Egypt',
  description:
    'Submit an official B2B Request for Quote for active pharmaceutical ingredients, excipients, and specialty chemicals. 24-hour response SLA.',
};

export default async function RequestQuotePage() {
  const { products } = await dataStore.getProducts();
  return <RequestQuotePageClient products={products} />;
}
