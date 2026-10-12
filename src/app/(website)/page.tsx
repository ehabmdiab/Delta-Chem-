import React from 'react';
import Link from 'next/link';
import { dataStore } from '@/lib/data/store';
import { HeroSection } from '@/components/organisms/HeroSection';
import { ProductCard } from '@/components/molecules/ProductCard';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { HarvestPharmaBanner } from '@/components/organisms/HarvestPharmaBanner';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import {
  Pill,
  FlaskConical,
  Sparkles,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Boxes,
  Users2,
  Globe2,
} from 'lucide-react';

export default async function HomePage() {
  const categories = await dataStore.getCategories();
  const { products: featuredProducts } = await dataStore.getProducts({
    isFeatured: true,
    limit: 6,
  });
  const articles = await dataStore.getArticles({ limit: 3 });
  const suppliers = await dataStore.getSuppliers();

  const divisionIcons: Record<string, React.ReactNode> = {
    'pharmaceutical-apis': <Pill className="w-6 h-6 text-teal-600" />,
    'pharmaceutical-excipients': <FlaskConical className="w-6 h-6 text-sky-600" />,
    'nutraceutical-ingredients': <Sparkles className="w-6 h-6 text-emerald-600" />,
    'veterinary-ingredients': <ShieldCheck className="w-6 h-6 text-amber-600" />,
    'cosmeceuticals-ingredients': <Sparkles className="w-6 h-6 text-indigo-600" />,
  };

  return (
    <div className="space-y-0">
      {/* 1. Cinematic Hero Section */}
      <HeroSection />

      {/* 2. Core Ingredient Divisions Grid */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-bold text-teal-600 tracking-wider">
              Specialized Product Portfolio
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Engineered for Pharmaceutical Formulators & Manufacturers
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Explore our core ingredient divisions. All products are sourced from audited international manufacturers with comprehensive technical and regulatory documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group relative bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-teal-500/80 p-6 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {divisionIcons[category.slug] || <FlaskConical className="w-6 h-6 text-teal-600" />}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {category.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <Link
                    href={`/divisions/${category.slug}`}
                    className="font-semibold text-teal-700 group-hover:text-teal-800 inline-flex items-center gap-1.5"
                  >
                    <span>Explore Division</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    View Catalog
                  </Link>
                </div>
              </div>
            ))}

            {/* Custom Sourcing Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white flex flex-col justify-between border border-slate-700 shadow-md">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
                  <Globe2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Specialty Chemical & Custom Sourcing
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Require specialized chemical synthesis, custom purity parameters, or direct import of rare pharmacopoeial materials? Our regulatory team handles full import licensing.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-700">
                <Link href="/contact">
                  <Button variant="teal" size="sm" className="w-full text-xs font-semibold">
                    Submit Custom Sourcing Inquiry
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Products Showcase */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-teal-600 tracking-wider">
                Direct Inquiry Directory
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Featured Pharmaceutical & Healthcare Ingredients
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl">
                Ready-for-inquiry active pharmaceutical ingredients, excipients, and specialty bio-actives available for immediate consultation and technical evaluation.
              </p>
            </div>

            <Link href="/products" className="shrink-0">
              <Button variant="outline" size="md" className="text-xs font-semibold">
                <span>View Complete Product Catalog</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Sourcing & Business Models (Commission vs Trade) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-bold text-teal-600 tracking-wider">
              Verified Commercial Operations
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Flexible Sourcing Models Built for Industry Partners
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              DELTACHEM operates with two distinct commercial frameworks, accommodating the exact supply chain, regulatory, and financial requirements of international principals and regional manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Model 1: Commission Representation */}
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 hover:border-teal-500/60 transition space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  01
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Commission Agency Business Model
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Authorized Agency & Technical Bridge for Foreign Suppliers
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Under our commission model, DELTACHEM acts as authorized commercial and technical agent for foreign chemical and API manufacturers. We handle local market qualification, regulatory dossier submissions to health authorities, client sampling, and contract negotiations.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Direct contracts between foreign principals and pharmaceutical factories</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Comprehensive technical marketing and client formulation support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Regulatory liaison and DMF submission coordination in Cairo</span>
                </li>
              </ul>
            </div>

            {/* Model 2: Trade & Distribution */}
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 hover:border-teal-500/60 transition space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
                  02
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Stock & Trade Distribution Model
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Direct Importing, Buffer Stocking & Local Prompt Dispatch
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Under the trade model, DELTACHEM directly imports, clears customs, and stocks high-demand APIs and excipients in Harvest Pharma’s Cairo facilities. This protects manufacturers from international freight volatility and eliminates production downtime.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Local currency invoicing and cleared domestic stock availability</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Temperature-controlled storage in Harvest Pharma Cairo warehouses</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Fast domestic door-to-door delivery across Egypt and Arab markets</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Strategic Warehousing Infrastructure: Harvest Pharma */}
      <HarvestPharmaBanner />

      {/* 6. Quality & Regulatory Commitment Section */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase font-bold text-teal-600 tracking-wider">
                Total Quality Assurance
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                Pharmacopoeial Integrity from Synthesis to Warehouse
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                In pharmaceutical and health sciences, raw material quality dictates clinical outcomes. DELTACHEM enforces a zero-compromise compliance policy across every batch we distribute.
              </p>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5 border border-teal-200">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-sm font-semibold">
                      Full Monograph Verification
                    </strong>
                    <span className="text-slate-500">
                      Analytical conformity with United States Pharmacopeia (USP), British Pharmacopoeia (BP), and European Pharmacopoeia (EP/Ph.Eur).
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5 border border-teal-200">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-sm font-semibold">
                      Supplier Qualification Audits
                    </strong>
                    <span className="text-slate-500">
                      Rigorous supplier assessment covering cGMP documentation, environmental controls, and batch-to-batch repeatability.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5 border border-teal-200">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-sm font-semibold">
                      Complete Traceability & Registration Dossiers
                    </strong>
                    <span className="text-slate-500">
                      Certificates of Analysis (COA), Material Safety Data Sheets (MSDS), Drug Master Files (DMF), and stability documentation supplied upon request.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/quality-regulatory">
                  <Button variant="outline" size="md">
                    <span>Learn About Our Regulatory Standards</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">
                Executive Leadership & Quality Governance
              </h3>

              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <p>
                  DELTACHEM is steered by its Founder and Managing Director, <strong>Dr. Abdelhamid Aboelaly</strong>, who brings over 20 years of proven executive expertise in global ingredient sourcing, chemical marketing, and quality assurance.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Scientific Foundation
                    </span>
                    <span className="font-semibold text-slate-800 text-xs">
                      Background in Chemistry
                    </span>
                  </div>
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Business Governance
                    </span>
                    <span className="font-semibold text-slate-800 text-xs">
                      Master’s in International Business
                    </span>
                  </div>
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 col-span-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Quality Doctorate
                    </span>
                    <span className="font-semibold text-slate-800 text-xs">
                      Doctorate Degree in Quality Management
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 pt-2 italic">
                  Managing Director of both DELTACHEM Company and Harvest Pharma, ensuring end-to-end alignment between raw ingredient sourcing and compliant healthcare storage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Industry Insights & News */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-teal-600 tracking-wider">
                Market Intelligence
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Latest Insights & Industry Perspectives
              </h2>
              <p className="text-sm text-slate-600 max-w-xl">
                Technical analyses, supply chain updates, and regulatory insights from DELTACHEM’s pharmaceutical and life science specialists.
              </p>
            </div>

            <Link href="/insights" className="shrink-0">
              <Button variant="outline" size="md" className="text-xs font-semibold">
                <span>View All Articles</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Bottom Commercial CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase font-bold text-teal-400 tracking-widest">
            Partner With DELTACHEM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Secure Verified Pharmaceutical Ingredients for Your Formulations?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Contact our technical procurement desk in Cairo or submit an immediate quotation request. Our specialists provide certified batch COAs, technical specifications, and delivery timelines.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/request-a-quote">
              <Button variant="teal" size="lg" className="font-semibold shadow-lg">
                Submit Request for Quotation (RFQ)
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-slate-700 text-white hover:bg-slate-800">
                Contact Sales Team &bull; (202) 26988187
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
