import { Metadata } from 'next';
import Link from 'next/link';
import {
  Pill,
  Sparkles,
  HeartPulse,
  Syringe,
  Apple,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Container } from '@/components/atoms/Container';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';

export const metadata: Metadata = {
  title: 'Industries We Serve | DELTACHEM Egypt',
  description:
    'Tailored raw material portfolios for Human Pharmaceuticals, Nutraceuticals, Veterinary Health, Cosmeceuticals, and Functional Foods.',
};

export default function IndustriesPage() {
  const industries = [
    {
      id: 'pharmaceuticals',
      title: 'Human Pharmaceuticals',
      tagline: 'Precision APIs & Pharmacopoeial Excipients',
      desc: 'Formulation-grade active pharmaceutical ingredients (APIs), binders, superdisintegrants, lubricants, and film coatings adhering strictly to BP, USP, and Ph. Eur. standards.',
      icon: Pill,
      badge: 'Core Division',
      color: 'blue',
      items: [
        'Direct Compression (DC) & Wet Granulation Excipients',
        'Antibiotics, Analgesics & Cardiovascular APIs',
        'Controlled Release Polymers & Enteric Coatings',
        'Complete Open-Part DMF and CEP Technical Dossiers',
      ],
      filterSlug: 'pharmaceutical-excipients',
    },
    {
      id: 'nutraceuticals',
      title: 'Nutraceuticals & Dietary Supplements',
      tagline: 'High-Bioavailability Vitamins & Active Actives',
      desc: 'Food Chemicals Codex (FCC) and USP verified nutritional ingredients for gummies, softgels, effervescent tablets, and functional beverage blends.',
      icon: HeartPulse,
      badge: 'High Growth',
      color: 'emerald',
      items: [
        'Pure Vitamins (Ascorbic Acid, D3, K2, B-Complex)',
        'Cellular Energizers & Antioxidants (CoQ10, Resveratrol)',
        'Direct-to-Mouth Granules & Effervescent Additives',
        'Non-GMO & Heavy-Metal Tested Specifications',
      ],
      filterSlug: 'nutraceutical-ingredients',
    },
    {
      id: 'veterinary',
      title: 'Veterinary Medicines & Animal Health',
      tagline: 'Targeted Chemotherapeutics & Feed Additives',
      desc: 'High-potency veterinary APIs for water-soluble powders, oral suspensions, premixes, and sterile injectables addressing livestock, poultry, and equine wellness.',
      icon: Syringe,
      badge: 'Veterinary Grade',
      color: 'purple',
      items: [
        'Tylosin Tartrate, Doxycycline Hyclate, Enrofloxacin',
        'High-Solubility Powders for Large-Scale Water Lines',
        'Stability in Harsh Climatic & Farm Conditions',
        'Full Egyptian Veterinary Authority Approvals',
      ],
      filterSlug: 'veterinary-apis',
    },
    {
      id: 'cosmeceuticals',
      title: 'Cosmeceuticals & Personal Care',
      tagline: 'Dermatological Actives & Functional Polymers',
      desc: 'Premium cosmetic active ingredients with proven dermal penetration, anti-aging efficacy, UV radiation shielding, and moisturizing properties.',
      icon: Sparkles,
      badge: 'Personal Care',
      color: 'rose',
      items: [
        'Multi-Molecular Sodium Hyaluronate (HA)',
        'High-Purity Niacinamide (Low Nicotinic Acid)',
        'Broad-Spectrum UV Absorbers (Octocrylene, Avobenzone)',
        'Microbiology Certificates & Preservative Systems',
      ],
      filterSlug: 'cosmeceutical-actives',
    },
    {
      id: 'food',
      title: 'Functional Food & Beverages',
      tagline: 'FCC Compliant Stabilizers & Acidulants',
      desc: 'Food-grade preservation agents, acidity regulators, and texture hydrocolloids meeting international Food Chemicals Codex and Egyptian ISO standards.',
      icon: Apple,
      badge: 'Food Grade',
      color: 'amber',
      items: [
        'Citric Acid, Sodium Benzoate, Potassium Sorbate',
        'Emulsifiers, Thickeners & Bulking Agents',
        'Halal & Kosher Certified Raw Materials',
        'High-Purity Granulations for Instant Drink Mixes',
      ],
      filterSlug: 'pharmaceutical-excipients',
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
              Sector Expertise
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Targeted Ingredient Solutions Across Industrial Sectors
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              From cGMP human sterile manufacturing to dynamic cosmeceutical laboratories, DELTACHEM curates specialized chemical portfolios engineered to meet sector-specific pharmacopoeial monographs and regulatory standards.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-medium">
                  Search All Ingredients
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/request-a-quote">
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800">
                  Request Sector Catalog
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Industries Grid */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <Container>
          <div className="space-y-16">
            {industries.map((ind, index) => {
              const Icon = ind.icon;
              return (
                <div
                  key={ind.id}
                  id={ind.id}
                  className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-200">
                          {ind.badge}
                        </span>
                      </div>
                      <h2 className="text-3xl font-bold text-slate-900">{ind.title}</h2>
                      <p className="mt-1 text-sm font-semibold text-blue-600">{ind.tagline}</p>
                      <p className="mt-4 text-base leading-relaxed text-slate-600">{ind.desc}</p>

                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                        {ind.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-center rounded-2xl bg-slate-50 p-6 border border-slate-200 text-center">
                      <h4 className="font-bold text-slate-900">Explore {ind.title} Ingredients</h4>
                      <p className="text-xs text-slate-500 mt-2 mb-6">
                        Access technical specifications, pharmacopoeias, and request direct quotation.
                      </p>
                      <div className="space-y-3">
                        <Link href={`/products?category=${ind.filterSlug}`} className="block">
                          <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium justify-between">
                            <span>Browse Sector Portfolio</span>
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href="/request-a-quote" className="block">
                          <Button variant="outline" className="w-full">
                            Request Custom Quote
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-16 text-white text-center">
        <Container>
          <h2 className="text-3xl font-bold tracking-tight">Need a Multi-Industry Raw Material Solution?</h2>
          <p className="mt-4 max-w-xl mx-auto text-slate-300 text-sm">
            Our technical sourcing team coordinates consolidated shipments combining excipients, APIs, and vitamins under a unified commercial agreement.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/request-a-quote">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-medium">
                Submit an RFQ
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800">
                Contact Sales Team
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
