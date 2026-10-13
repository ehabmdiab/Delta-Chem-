import { Metadata } from 'next';
import { AboutClient } from './AboutClient';

export const metadata: Metadata = {
  title: 'About DELTACHEM | Pharmaceutical Ingredients Supplier & Distributor',
  description:
    'Discover DELTACHEM: Egypt’s premier supplier of active pharmaceutical ingredients, excipients, and specialty chemicals. Founded by Dr. Abdelhamid Aboelaly.',
};

export default function AboutPage() {
  return <AboutClient />;
}
