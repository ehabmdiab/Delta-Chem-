import { Metadata } from 'next';
import { IndustriesClient } from './IndustriesClient';

export const metadata: Metadata = {
  title: 'Industries We Serve | DELTACHEM Egypt',
  description:
    'Tailored raw material portfolios for Human Pharmaceuticals, Nutraceuticals, Veterinary Health, Cosmeceuticals, and Functional Foods.',
};

export default function IndustriesPage() {
  return <IndustriesClient />;
}
