import { Metadata } from 'next';
import Link from 'next/link';
import {
  Globe,
  Handshake,
  ShieldCheck,
  TrendingUp,
  Building,
  CheckCircle2,
  ArrowRight,
  FileCheck2,
  Warehouse,
} from 'lucide-react';
import { Container } from '@/components/atoms/Container';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { dataStore } from '@/lib/data/store';

export const metadata: Metadata = {
  title: 'Global Partners & Principals | DELTACHEM Egypt',
  description:
    'Discover DELTACHEM’s network of international chemical and API manufacturers. Partner with us to access the Egyptian and MENA pharmaceutical market.',
};

export default async function PartnersPage() {
  const suppliers = await dataStore.getSuppliers();

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent pointer-events-none" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="info" className="mb-4">
              International Alliance Network
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Connecting Global Chemistry with the Egyptian Market
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              DELTACHEM serves as the strategic gateway for world-class chemical and API manufacturers seeking trusted, compliant, and volume-driven representation across Egypt and the MENA region.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-medium">
                  Partner with DELTACHEM
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800">
                  View Current Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Principals Choose DELTACHEM */}
      <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" className="mb-3">
              Principal Value Proposition
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Why Global Producers Choose DELTACHEM
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Entering the Egyptian pharmaceutical market requires nuanced regulatory acumen, active technical marketing, and reliable local infrastructure.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 mb-6">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Direct Factory Access</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Direct commercial relationships with 150+ licensed pharmaceutical manufacturers, generic drug formulators, and cosmeceutical laboratories across Egypt.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 mb-6">
                <FileCheck2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">EDA Regulatory Liaison</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                In-house regulatory specialists manage the entire registration lifecycle with the Egyptian Drug Authority (EDA), from CTD Module 3 to factory GMP inspection approval.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 mb-6">
                <Warehouse className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Local Warehousing Power</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Sister company <span className="font-semibold text-slate-900">Harvest Pharma</span> provides GDP-compliant, climate-controlled warehousing in Cairo, enabling local consignment and buffer stock.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Principals & Geographic Sourcing */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" className="mb-3">
              Represented Manufacturers
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Global Sourcing & Synthesis Partners
            </h2>
            <p className="mt-4 text-base text-slate-600">
              We collaborate with certified manufacturers across major global chemical manufacturing corridors.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {suppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm hover:border-blue-300 hover:bg-white transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-100 rounded-md px-2.5 py-1">
                      <Globe className="h-3.5 w-3.5" />
                      {supplier.country || 'Global Partner'}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Verified Partner</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{supplier.name}</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{supplier.description}</p>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Quality Standard</span>
                  <span className="text-xs font-semibold text-slate-900">EU-GMP / US-FDA Compliant</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Partner Onboarding Criteria */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <Badge variant="neutral" className="mb-3">
                Principal Qualification
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Our Standards for Global Representation
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                To protect our pharmaceutical customers in Egypt, DELTACHEM adheres to strict onboarding standards for new chemical and active ingredient suppliers.
              </p>

              <div className="mt-6 space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>Documented cGMP accreditation from recognized international health authorities.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>Availability of CTD Module 3 dossiers, open-part DMFs, or EDQM CEP certificates.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>Willingness to support Egyptian Drug Authority inspection visits if required.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>Commitment to commercial transparency and long-term exclusive representation.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-slate-900 p-8 sm:p-10 text-white shadow-xl">
                <h3 className="text-2xl font-bold">Inquire About Agency Representation</h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Are you an API, excipient, or specialty chemical producer looking to expand your footprint in Egypt and the MENA region? Contact our business development team.
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <Link href="/contact">
                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium">
                      Submit Principal Proposal
                    </Button>
                  </Link>
                  <a href={`mailto:sales@deltachem.com.eg`}>
                    <Button variant="outline" className="w-full border-slate-700 text-slate-200 hover:bg-slate-800">
                      Email Business Development Directly
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
