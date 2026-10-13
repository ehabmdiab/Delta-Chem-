import { Metadata } from 'next';
import { QualityClient } from './QualityClient';

export const metadata: Metadata = {
  title: 'Quality & Regulatory Compliance | DELTACHEM Egypt',
  description:
    'Rigorous pharmacopoeial standards (USP, BP, EP), Egyptian Drug Authority (EDA) compliance, and complete regulatory dossiers provided by DELTACHEM.',
};

export default function QualityRegulatoryPage() {
  return <QualityClient />;
}
