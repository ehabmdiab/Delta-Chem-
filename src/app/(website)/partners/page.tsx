import { Metadata } from 'next';
import { dataStore } from '@/lib/data/store';
import { PartnersClient } from './PartnersClient';

export const metadata: Metadata = {
  title: 'Global Partners & Principals | DELTACHEM Egypt',
  description:
    'Discover DELTACHEM’s network of international chemical and API manufacturers. Partner with us to access the Egyptian and MENA pharmaceutical market.',
};

export default async function PartnersPage() {
  const suppliers = await dataStore.getSuppliers();
  return <PartnersClient suppliers={suppliers} />;
}
