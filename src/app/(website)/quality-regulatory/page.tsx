import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Award,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/atoms/Container';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';

export const metadata: Metadata = {
  title: 'Quality & Regulatory Compliance | DELTACHEM Egypt',
  description:
    'Rigorous pharmacopoeial standards (USP, BP, EP), Egyptian Drug Authority (EDA) compliance, and complete regulatory dossiers provided by DELTACHEM.',
};

export default function QualityRegulatoryPage() {
  const documentChecklist = [
    {
      title: 'Certificate of Analysis (COA)',
      desc: 'Lot-specific test results matching batch numbers, including assay percentage, purity limits, and physical parameters.',
      tag: 'Every Batch',
    },
    {
      title: 'Drug Master File (DMF) / CEP',
      desc: 'Open Part documentation, Certificate of Suitability from EDQM, and administrative registration authorization letters.',
      tag: 'Registration',
    },
    {
      title: 'Nitrosamine Risk Evaluation',
      desc: 'Comprehensive step 1 & 2 risk assessments identifying potential formation or presence of nitrosamine impurities.',
      tag: 'Mandatory EDA',
    },
    {
      title: 'Elemental Impurities (ICH Q3D)',
      desc: 'Validated testing summaries addressing Class 1, 2A, 2B, and 3 metals per ICH guidelines.',
      tag: 'Safety',
    },
    {
      title: 'Residual Solvents (ICH Q3C)',
      desc: 'Statement of solvents utilized in chemical synthesis and chromatographic confirmation of limit thresholds.',
      tag: 'Compliance',
    },
    {
      title: 'BSE / TSE Risk Assessment',
      desc: 'Certified absence of animal-derived components or strict verification of bovine/porcine origin safety.',
      tag: 'Origin',
    },
    {
      title: 'Stability Data (Zone IVa & IVb)',
      desc: 'Real-time and accelerated stability reporting tailored to hot and humid climatic zones for Egyptian shelf-life filing.',
      tag: 'Stability',
    },
    {
      title: 'GHS Safety Data Sheet (SDS)',
      desc: '16-section Globally Harmonized System safety data sheets in English and Arabic if required.',
      tag: 'Handling',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent pointer-events-none" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="info" className="mb-4">
              Scientific Governance & Rigor
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Quality Assurance Without Compromise
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              In modern pharmaceutical manufacturing, compliance is not an afterthought. DELTACHEM delivers certified, auditable raw materials backed by comprehensive documentation that passes Egyptian Drug Authority (EDA) scrutiny.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/request-a-quote">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-medium">
                  Request Technical Dossier
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800">
                  Inspect Verified Catalog
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership Quality Philosophy */}
      <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 mb-6">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Academic & Quality Leadership</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Our quality framework is engineered directly by our Founder & Managing Director, <span className="font-semibold text-slate-900">Dr. Abdelhamid Aboelaly</span>, holding a Doctorate in Quality Management alongside an MBA and over two decades in chemical distribution.
                </p>
                <div className="mt-6 space-y-3 border-t border-slate-100 pt-6 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>ISO 9001:2015 Quality Management Alignment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Good Distribution Practice (GDP) Oversight</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Full Audit Preparedness for Regulatory Inspections</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Badge variant="primary" className="mb-3">
                Quality Management System
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Rigorous Screening from Reactor to Warehouse
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                We believe distribution excellence requires active scientific involvement. Every manufacturer we partner with undergoes a multi-tier qualification audit before their ingredients are introduced to the Egyptian market.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                    Qualified Principals
                  </h4>
                  <p className="mt-2 text-sm text-slate-600">
                    We exclusively represent synthesis plants with valid EU-GMP, US-FDA, or national GMP certifications.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="h-5 w-5 text-emerald-600" />
                    Pharmacopoeial Conformity
                  </h4>
                  <p className="mt-2 text-sm text-slate-600">
                    Continuous cross-referencing against current monographs: USP-NF, BP, European Pharmacopoeia (Ph. Eur.), and JP.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Complete Regulatory Document Package */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" className="mb-3">
              Documentation Ecosystem
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Turnkey Regulatory Dossiers for EDA Submission
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Avoid regulatory delays and sample rejections. DELTACHEM supplies the complete technical file required by the Egyptian Drug Authority (EDA) for human, veterinary, and dietary product registration.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {documentChecklist.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm hover:border-blue-300 hover:bg-white transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <FileSpreadsheet className="h-6 w-6 text-blue-600" />
                  <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                    {item.tag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Batch Traceability & Quarantine Workflow */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="neutral" className="mb-3">
              Standard Operating Procedure
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              From Port Arrival to Final Release
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Traceability is maintained through strict serial numbering, batch integrity verification, and physical inspection.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <div className="relative rounded-2xl bg-white p-6 border border-slate-200 shadow-sm">
              <span className="text-4xl font-extrabold text-blue-100">01</span>
              <h4 className="text-lg font-bold text-slate-900 mt-2">Arrival & Quarantine</h4>
              <p className="text-xs text-slate-600 mt-2">
                Upon entry to our Harvest Pharma warehouse, shipments are placed in physical quarantine status. Package seals and temperature logs are checked.
              </p>
            </div>
            <div className="relative rounded-2xl bg-white p-6 border border-slate-200 shadow-sm">
              <span className="text-4xl font-extrabold text-blue-100">02</span>
              <h4 className="text-lg font-bold text-slate-900 mt-2">COA Audit & Verification</h4>
              <p className="text-xs text-slate-600 mt-2">
                Quality personnel audit manufacturer test parameters against client-agreed monographs (BP, USP, Ph. Eur.) and EDA registration commitments.
              </p>
            </div>
            <div className="relative rounded-2xl bg-white p-6 border border-slate-200 shadow-sm">
              <span className="text-4xl font-extrabold text-blue-100">03</span>
              <h4 className="text-lg font-bold text-slate-900 mt-2">Controlled Storage</h4>
              <p className="text-xs text-slate-600 mt-2">
                Released materials are moved into active racks maintained at 15°C–25°C or 2°C–8°C with 24/7 digital data logging.
              </p>
            </div>
            <div className="relative rounded-2xl bg-white p-6 border border-slate-200 shadow-sm">
              <span className="text-4xl font-extrabold text-blue-100">04</span>
              <h4 className="text-lg font-bold text-slate-900 mt-2">Dispatched with Dossier</h4>
              <p className="text-xs text-slate-600 mt-2">
                Every delivery to the customer includes original batch COAs, SDS, and delivery receipts signed under GDP guidelines.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-16 text-white text-center">
        <Container>
          <h2 className="text-3xl font-bold tracking-tight">Need Immediate Regulatory Assistance?</h2>
          <p className="mt-4 max-w-xl mx-auto text-slate-300 text-sm">
            Contact our regulatory affairs team for advice on ingredient registration, DMF filings, and official certificates.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-medium">
                Contact Regulatory Affairs
              </Button>
            </Link>
            <Link href="/request-a-quote">
              <Button size="lg" variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800">
                Request a Quote with Specifications
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
