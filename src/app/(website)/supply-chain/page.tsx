import { Metadata } from 'next';
import { SupplyChainClient } from './SupplyChainClient';

export const metadata: Metadata = {
  title: 'Supply Chain & Warehousing | Harvest Pharma Synergy | DELTACHEM',
  description:
    'Discover DELTACHEM’s GDP-compliant pharmaceutical supply chain and climate-controlled warehousing in Cairo via sister company Harvest Pharma.',
};

export default function SupplyChainPage() {
  return <SupplyChainClient />;
}
