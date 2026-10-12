import { Metadata } from 'next';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  Warehouse,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Container } from '@/components/atoms/Container';
import { Badge } from '@/components/atoms/Badge';
import { SITE_CONFIG } from '@/config/site';
import { ContactClient } from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact DELTACHEM | Cairo Head Office & Sales Desk',
  description:
    'Get in touch with DELTACHEM: Head office at 66 Gamal El-Deen Zaki st, Gesr El-Suez, Cairo. Tel: (202) 26988187. Email: sales@deltachem.com.eg.',
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-20 text-white lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent pointer-events-none" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="info" className="mb-4">
              Direct B2B Communication
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Connect with Our Technical & Sales Specialists
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Headquartered in Cairo, Egypt, DELTACHEM supports formulators, procurement executives, and regulatory managers across the pharmaceutical and chemical sectors.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content: Info Cards & Form */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Direct Corporate Details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <Badge variant="primary" className="mb-3">
                  Executive Headquarters
                </Badge>
                <h3 className="text-2xl font-bold text-slate-900">Cairo Head Office</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Direct commercial inquiries, indent representation, and contract administration.
                </p>

                <div className="mt-6 space-y-6 text-sm text-slate-700">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 shrink-0 mt-0.5">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold uppercase text-slate-400">
                        Physical Address
                      </span>
                      <span className="font-semibold text-slate-900 leading-snug">
                        {SITE_CONFIG.contact.address}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 shrink-0 mt-0.5">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold uppercase text-slate-400">
                        Direct Phone (Cairo)
                      </span>
                      <a
                        href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9]/g, '')}`}
                        className="font-semibold text-slate-900 hover:text-blue-600"
                      >
                        {SITE_CONFIG.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 shrink-0 mt-0.5">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold uppercase text-slate-400">
                        Sales & Quotation Desk
                      </span>
                      <a
                        href={`mailto:${SITE_CONFIG.contact.salesEmail}`}
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        {SITE_CONFIG.contact.salesEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 shrink-0 mt-0.5">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold uppercase text-slate-400">
                        Official Business Hours
                      </span>
                      <span className="font-medium text-slate-900">
                        {SITE_CONFIG.contact.workingHours}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sister Company Warehouse Card */}
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-blue-950 p-8 text-white shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <Warehouse className="h-5 w-5 text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    Warehousing & Logistics
                  </span>
                </div>
                <h4 className="text-xl font-bold">Harvest Pharma Alliance</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Pharmaceutical-grade GDP warehousing facilities in Cairo. Buffer storage, cold chain 2°C–8°C, and express nationwide dispatch.
                </p>
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Sister Entity Portal:</span>
                  <a
                    href="https://www.harvestpharma-eg.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-blue-400 hover:text-white"
                  >
                    <span>www.harvestpharma-eg.com</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Regulatory Assurance Callout */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-emerald-600" />
                  <h4 className="font-bold text-slate-900">EDA Dossier Compliance</h4>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Every batch supplied is backed by a verified manufacturer COA and registration dossier prepared under the oversight of Managing Director Dr. Abdelhamid Aboelaly.
                </p>
              </div>
            </div>

            {/* Right Column: Contact Client Interactive Form */}
            <div className="lg:col-span-7">
              <ContactClient />
            </div>
          </div>
        </Container>
      </section>

      {/* Map / Location Overview */}
      <section className="py-16 bg-white border-t border-slate-200">
        <Container>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-12 text-center">
            <h3 className="text-2xl font-bold text-slate-900">Visiting Our Gesr El-Suez Office</h3>
            <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
              Our headquarters is centrally situated in Gesr El-Suez, Cairo, providing streamlined access to Cairo International Airport and major industrial highways connecting Obour and 10th of Ramadan.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 border border-slate-200 text-sm font-semibold text-slate-800 shadow-sm">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span>66 Gamal El-Deen Zaki st, Gesr El-Suez, Cairo, Egypt</span>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
