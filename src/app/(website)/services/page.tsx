import { Metadata } from 'next';
import { ServicesClient } from './ServicesClient';

export const metadata: Metadata = {
  title: 'Commercial Models & Services | DELTACHEM Egypt',
  description:
    'Explore DELTACHEM’s B2B service offerings: Commission Agency representation, Stock & Trade local warehouse distribution, and EDA regulatory support.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
