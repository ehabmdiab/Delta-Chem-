import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Award,
  ShieldCheck,
  Building2,
  Globe2,
  CheckCircle2,
  FileCheck,
  ArrowRight,
  TrendingUp,
  FlaskConical,
  Warehouse,
} from 'lucide-react';
import { Container } from '@/components/atoms/Container';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { SITE_CONFIG } from '@/config/site';

export const metadata: Metadata = {
  title: 'About DELTACHEM | Pharmaceutical Ingredients Supplier & Distributor',
  description:
    'Discover DELTACHEM: Egypt’s premier supplier of active pharmaceutical ingredients, excipients, and specialty chemicals. Founded by Dr. Abdelhamid Aboelaly.',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent pointer-events-none" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="info" className="mb-4">
              Corporate Profile & History
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Pioneering Chemical & Pharmaceutical Integrity in Egypt
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Founded on deep technical expertise and doctoral-level quality governance, DELTACHEM connects leading global chemical producers with Egypt and the MENA region’s foremost pharmaceutical manufacturers.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-medium">
                  Browse Product Monograph
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/quality-regulatory">
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800">
                  Quality Standards & Compliance
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership & Founder Section */}
      <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl bg-white p-8 shadow-xl border border-slate-200">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 mb-6">
                  <Award className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Dr. Abdelhamid Aboelaly</h3>
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mt-1">
                  Founder & Managing Director
                </p>
                <div className="mt-6 space-y-3 text-sm text-slate-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>20+ years of industrial chemistry and pharmaceutical distribution expertise</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Master of Business Administration (MBA)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Doctorate in Quality Management Systems</span>
                  </div>
                </div>
                <div className="mt-6 border-t border-slate-100 pt-6">
                  <blockquote className="italic text-slate-600 text-sm">
                    &ldquo;In pharmaceutical procurement, an ingredient is only as dependable as the regulatory documentation and quality assurance backing each drum. Our commitment is absolute purity and full traceability.&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Badge variant="primary" className="mb-3">
                Executive Leadership
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Founded on Technical Knowledge and Quality Management
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                DELTACHEM was established with a singular objective: to elevate the standard of raw material distribution in Egypt. Under the direction of Dr. Abdelhamid Aboelaly, the company blends deep chemical comprehension with modern supply chain orchestration.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Recognizing that local pharmaceutical manufacturers require more than simple commodity broking, DELTACHEM functions as a technical consultant and authorized agent, facilitating full EDA regulatory filings, technical dossier reviews, and secure supply agreements.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <FlaskConical className="h-6 w-6 text-blue-600" />
                    <h4 className="font-semibold text-slate-900">Technical Rigor</h4>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    Pre-evaluated chemical monographs and active verification of manufacturer GMP certifications.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-emerald-600" />
                    <h4 className="font-semibold text-slate-900">Regulatory Preparedness</h4>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    Expedited provision of DMF Open Parts, COA verification, and allergen & nitrosamine risk statements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Harvest Pharma Strategic Synergy */}
      <section className="py-20 bg-white border-b border-slate-200">
        <Container>
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 mb-4">
                  <Warehouse className="h-6 w-6 text-blue-400" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                    Logistics & Warehousing Synergy
                  </span>
                </div>
                <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Sister Company Alliance: Harvest Pharma
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-300">
                  DELTACHEM operates in close strategic partnership with <span className="font-semibold text-white">Harvest Pharma</span> (
                  <a
                    href="https://www.harvestpharma-eg.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    www.harvestpharma-eg.com
                  </a>
                  ), an established pharmaceutical distributor and licensed warehouse operator.
                </p>
                <p className="mt-3 text-base leading-relaxed text-slate-300">
                  This partnership grants DELTACHEM immediate access to licensed, temperature-regulated, and humidity-monitored pharmaceutical warehousing facilities in Cairo. Our clients benefit from local buffer stock availability without exposure to international shipping lead times.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <span>GDP-Compliant Facility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <span>2°C–8°C Cold Chain & Ambient Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <span>Cairo Central Hub Dispatch</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col justify-center items-center rounded-2xl bg-white/10 p-8 backdrop-blur-md border border-white/10 text-center">
                <Building2 className="h-16 w-16 text-blue-300 mb-4" />
                <h4 className="text-xl font-bold text-white">Harvest Pharma</h4>
                <p className="text-xs text-slate-300 mt-2">
                  Licensed Warehousing & Cold-Chain Management
                </p>
                <Link
                  href="/supply-chain"
                  className="mt-6 inline-flex items-center text-sm font-semibold text-blue-300 hover:text-white"
                >
                  Explore Supply Chain Infrastructure
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission, Vision, and Values */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" className="mb-3">
              Guiding Principles
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Engineered for Scientific Reliability
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Our principles govern every transaction, from initial supplier screening to final cleanroom delivery.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Uncompromising Quality</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                We represent manufacturers adhering strictly to WHO, EU-GMP, and US-FDA quality standards. Pharmacopoeial conformity (USP, BP, Ph. Eur.) is systematically verified.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 mb-6">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Regulatory Partnership</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                We do not just supply chemicals; we support the regulatory lifecycle. We equip Egyptian pharmaceutical manufacturers with full dossiers to expedite EDA approvals.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 mb-6">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Reliable Continuity</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Through buffer warehousing at Harvest Pharma and scheduled maritime shipments, we protect our clients against global raw material market volatility.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Geographic Scope & Presence */}
      <section className="py-20 bg-white border-t border-slate-200">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <Badge variant="neutral" className="mb-3">
                Territory Coverage
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Serving Key Industrial Clusters Across Egypt
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                DELTACHEM operates from headquarters in Gesr El-Suez, Cairo, with logistics distribution reaching all major manufacturing belts across the country.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm font-medium text-slate-800">
                <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                  <h4 className="font-bold text-blue-900">Greater Cairo</h4>
                  <p className="text-xs text-slate-500 mt-1">Obour, Badr City, Gesr El-Suez</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                  <h4 className="font-bold text-blue-900">10th of Ramadan</h4>
                  <p className="text-xs text-slate-500 mt-1">Major pharma & chemical zones</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                  <h4 className="font-bold text-blue-900">6th of October</h4>
                  <p className="text-xs text-slate-500 mt-1">Industrial zones 1 through 6</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                  <h4 className="font-bold text-blue-900">Alexandria & Delta</h4>
                  <p className="text-xs text-slate-500 mt-1">Borg El Arab, Sadat City, Tanta</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Globe2 className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">Headquarters & Registry</h3>
                </div>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-slate-500 font-medium">Head Office</dt>
                    <dd className="text-slate-900 font-semibold mt-0.5">{SITE_CONFIG.contact.address}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500 font-medium">Telephone Direct Line</dt>
                    <dd className="text-slate-900 font-semibold mt-0.5">{SITE_CONFIG.contact.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500 font-medium">Sales & Inquiries Email</dt>
                    <dd className="text-blue-600 font-semibold mt-0.5">{SITE_CONFIG.contact.salesEmail}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500 font-medium">Operational Jurisdiction</dt>
                    <dd className="text-slate-900 font-semibold mt-0.5">Arab Republic of Egypt & MENA Regional Partnerships</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-16 text-white text-center">
        <Container>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Partner with DELTACHEM Today
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-base">
            Whether you require an immediate quotation for pharmaceutical excipients or wish to explore agency representation in Egypt, our team is ready to assist.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/request-a-quote">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-medium">
                Submit Request for Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                Contact Technical Sales
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
