import { Metadata } from 'next';
import { Suspense } from 'react';
import {
  FileText,
  Clock,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Warehouse,
} from 'lucide-react';
import { Container } from '@/components/atoms/Container';
import { Badge } from '@/components/atoms/Badge';
import { dataStore } from '@/lib/data/store';
import { RequestQuoteClient } from './RequestQuoteClient';

export const metadata: Metadata = {
  title: 'Request a Quote (RFQ) | DELTACHEM Egypt',
  description:
    'Submit an official B2B Request for Quote for active pharmaceutical ingredients, excipients, and specialty chemicals. 24-hour response SLA.',
};

export default async function RequestQuotePage() {
  const { products } = await dataStore.getProducts();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-16 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="info" className="mb-4">
              Commercial Quotation System
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
              Request for Quote (RFQ)
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Submit your formulation volumes, pharmacopoeial grades, and delivery terms. Our technical commercial desk provides comprehensive pricing within one business day.
            </p>
          </div>
        </Container>
      </section>

      {/* Form & Assurance Section */}
      <section className="py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-8">
              <Suspense
                fallback={
                  <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500">
                    Loading Quotation Form...
                  </div>
                }
              >
                <RequestQuoteClient products={products} />
              </Suspense>
            </div>

            {/* Right Column: Why Quote with DELTACHEM */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  Quotation & SLA Guarantee
                </h3>
                <div className="space-y-4 text-xs text-slate-600">
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">24-Hour SLA</strong>
                      Verified pricing and current stock confirmation provided within one business day.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Lot COA Included</strong>
                      Initial quotes include sample Certificates of Analysis and manufacturer accreditations.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Warehouse className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Local Holding Option</strong>
                      Quotes can be structured with buffer storage at Harvest Pharma Cairo warehouse.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Regulatory Protection</strong>
                      EDA registration dossier compatibility verified by our regulatory department.
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Telephone Support */}
              <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-6">
                <h4 className="text-sm font-bold text-blue-950">Urgent Formulation Batch?</h4>
                <p className="mt-1 text-xs text-blue-800 leading-relaxed">
                  For emergency production runs requiring same-day dispatch from our Cairo warehouse, contact our commercial desk directly:
                </p>
                <p className="mt-3 font-mono font-bold text-blue-900 text-sm">
                  Tel: (202) 26988187
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Email: sales@deltachem.com.eg
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
