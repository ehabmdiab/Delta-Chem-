import { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  FileCheck2,
  Search,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileText,
  BadgePercent,
  Warehouse,
} from 'lucide-react';
import { Container } from '@/components/atoms/Container';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';

export const metadata: Metadata = {
  title: 'Commercial Models & Services | DELTACHEM Egypt',
  description:
    'Explore DELTACHEM’s B2B service offerings: Commission Agency representation, Stock & Trade local warehouse distribution, and EDA regulatory support.',
};

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent pointer-events-none" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="info" className="mb-4">
              Comprehensive B2B Solutions
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Commercial Agility & Regulatory Precision
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Whether you need direct maritime indent contracts with global principals or immediate local delivery from our Cairo warehouse, DELTACHEM adapts to your procurement architecture.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/request-a-quote">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-medium">
                  Request Quotation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800">
                  Search Ingredient Directory
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Two Core Business Models */}
      <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" className="mb-3">
              Dual Operating Structure
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Flexible Engagement Channels
            </h2>
            <p className="mt-4 text-base text-slate-600">
              We structure our operations around two distinct models to serve both large-scale production campaigns and urgent short-term manufacturing runs.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Model 1: Commission Agency */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 mb-6">
                  <BadgePercent className="h-7 w-7" />
                </div>
                <Badge variant="neutral" className="mb-3">
                  Direct Indent / Agency
                </Badge>
                <h3 className="text-2xl font-bold text-slate-900">Commission Agency Model</h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Acting as the exclusive or authorized commercial representative for leading global API and excipient manufacturers in Egypt. DELTACHEM facilitates direct contractual engagement between Egyptian buyers and global producers.
                </p>

                <div className="mt-6 space-y-3 text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Direct proforma invoicing and factory-gate pricing from international principals</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Support for Letter of Credit (L/C), CAD, and deferred payment arrangements</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Full regulatory dossier preparation and direct EDA registration sponsorship</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Annual contract volume commitments with guaranteed price protections</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6">
                <Link href="/partners">
                  <Button variant="outline" className="w-full justify-between">
                    <span>Learn About Principal Representation</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Model 2: Stock & Trade */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 mb-6">
                  <Warehouse className="h-7 w-7" />
                </div>
                <Badge variant="success" className="mb-3">
                  Local Inventory / Spot Market
                </Badge>
                <h3 className="text-2xl font-bold text-slate-900">Stock & Trade Model</h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Importing and holding ready stock of top-demand excipients and active ingredients in our Cairo facility via sister company <span className="font-semibold text-slate-900">Harvest Pharma</span>. Designed for rapid batch fulfillment and safety stock buffers.
                </p>

                <div className="mt-6 space-y-3 text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Same-day or 24-48 hour delivery to pharmaceutical plants across Egypt</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Billed in local currency (EGP) with immediate tax-compliant invoicing</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Elimination of shipping delays, customs demurrage, and port congestion risk</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Stored in temperature-monitored, GDP-compliant warehouses in Cairo</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6">
                <Link href="/supply-chain">
                  <Button variant="outline" className="w-full justify-between">
                    <span>Inspect Harvest Pharma Warehousing</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Value-Added Regulatory & Technical Services */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" className="mb-3">
              Technical Excellence
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Value-Added Regulatory & Sourcing Capabilities
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Procurement is only successful when your quality and regulatory teams are completely confident. We deliver thorough technical support at every phase.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
              <FileCheck2 className="h-8 w-8 text-blue-600 mb-4" />
              <h4 className="text-lg font-bold text-slate-900">EDA Dossier Support</h4>
              <p className="mt-2 text-sm text-slate-600">
                Liaison with Egyptian Drug Authority (EDA) registration requirements. Assisting with manufacturer accreditation, CTD Module 3 submissions, and GMP audit scheduling.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
              <ShieldCheck className="h-8 w-8 text-blue-600 mb-4" />
              <h4 className="text-lg font-bold text-slate-900">Complete Regulatory Pack</h4>
              <p className="mt-2 text-sm text-slate-600">
                Instant delivery of Drug Master Files (DMF Open Part), Certificate of Suitability (CEP), Certificates of Analysis (COA), and BSE/TSE statements.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
              <Search className="h-8 w-8 text-blue-600 mb-4" />
              <h4 className="text-lg font-bold text-slate-900">Bespoke Ingredient Sourcing</h4>
              <p className="mt-2 text-sm text-slate-600">
                Locating rare chemical intermediates, specialized polymer excipients, and niche APIs through pre-audited international chemical synthesize partners.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
              <FileText className="h-8 w-8 text-blue-600 mb-4" />
              <h4 className="text-lg font-bold text-slate-900">Risk Assessment Dossiers</h4>
              <p className="mt-2 text-sm text-slate-600">
                Nitrosamine contamination evaluations, elemental impurities data conforming to ICH Q3D, and residual solvent reports conforming to ICH Q3C.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
              <Briefcase className="h-8 w-8 text-blue-600 mb-4" />
              <h4 className="text-lg font-bold text-slate-900">R&D Sample Fulfillment</h4>
              <p className="mt-2 text-sm text-slate-600">
                Rapid provision of lab-scale pre-formulation sample quantities with comprehensive lot-specific COAs for pilot trial batches and stability studies.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
              <Truck className="h-8 w-8 text-blue-600 mb-4" />
              <h4 className="text-lg font-bold text-slate-900">Cold Chain Validation</h4>
              <p className="mt-2 text-sm text-slate-600">
                Continuous temperature telemetry during international maritime/air transport and domestic road transport to your warehouse receiving dock.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Conversion Banner */}
      <section className="bg-slate-900 py-16 text-white text-center border-t border-slate-800">
        <Container>
          <h2 className="text-3xl font-bold tracking-tight">Ready to Discuss Your Chemical Requirements?</h2>
          <p className="mt-4 max-w-xl mx-auto text-slate-300 text-sm">
            Our technical sales team will review your pharmacopoeial specifications, volume targets, and delivery timeline to provide a tailored quote.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/request-a-quote">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-medium">
                Submit an RFQ
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800">
                Speak with Sales
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
