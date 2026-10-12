import { Metadata } from 'next';
import Link from 'next/link';
import {
  Warehouse,
  ThermometerSnowflake,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  ExternalLink,
  Activity,
} from 'lucide-react';
import { Container } from '@/components/atoms/Container';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';

export const metadata: Metadata = {
  title: 'Supply Chain & Warehousing | Harvest Pharma Synergy | DELTACHEM',
  description:
    'Discover DELTACHEM’s GDP-compliant pharmaceutical supply chain and climate-controlled warehousing in Cairo via sister company Harvest Pharma.',
};

export default function SupplyChainPage() {
  const zones = [
    {
      title: 'Controlled Room Temperature (CRT)',
      range: '15°C – 25°C',
      rh: '< 60% Relative Humidity',
      desc: 'Optimized for standard active ingredients, tablet binders, cellulose polymers, and standard excipient drums.',
      icon: Warehouse,
    },
    {
      title: 'Refrigerated Cold Chain Storage',
      range: '2°C – 8°C',
      rh: 'Controlled Humidity',
      desc: 'Dedicated cold rooms with redundant refrigeration compressors for enzymes, temperature-sensitive antibiotics, and bio-nutraceuticals.',
      icon: ThermometerSnowflake,
    },
    {
      title: 'Hygroscopic Sensitive Storage',
      range: 'Controlled Atmosphere',
      rh: '< 45% Relative Humidity',
      desc: 'Desiccant-equipped zoning tailored for moisture-reactive superdisintegrants and ultra-pure sodium hyaluronate.',
      icon: ShieldCheck,
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
              Integrated Cold-Chain & GDP Logistics
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
              Securing the Pharmaceutical Chain of Custody
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Through our sister company <span className="font-semibold text-white">Harvest Pharma</span>, DELTACHEM offers Egypt’s pharmaceutical industry audited, GDP-compliant warehousing, climate-controlled environments, and rapid regional delivery.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/request-a-quote">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-medium">
                  Inquire on In-Stock Materials
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a
                href="https://www.harvestpharma-eg.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800">
                  Visit Harvest Pharma
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Harvest Pharma Warehouse Infrastructure */}
      <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Badge variant="primary" className="mb-3">
                Strategic Alliance
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Harvest Pharma: Cairo’s Premier Pharmaceutical Warehouse Hub
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Pharmaceutical raw materials cannot simply be stored in generic commercial facilities. Moisture fluctuations degrade superdisintegrants, while thermal spikes denature active pharmaceutical ingredients.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Our sister company <span className="font-semibold text-slate-900">Harvest Pharma</span> operates dedicated Good Distribution Practices (GDP) compliant warehouse facilities in Cairo. Every square meter is engineered for pharmaceutical-grade stability.
              </p>

              <div className="mt-6 space-y-3 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Licensed by the Egyptian Drug Authority (EDA)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Calibrated 24/7 digital sensors with automated SMS alerts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Dual power redundancy with commercial automatic diesel generators</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Epoxy anti-dust floor coatings and positive pressure ventilation</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    Live Telemetry Specs
                  </span>
                  <Activity className="h-5 w-5 text-emerald-500 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Warehouse Environment Controls</h3>
                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Facility Location</span>
                    <span className="font-semibold text-slate-900">Cairo, Egypt</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Total Pallet Capacity</span>
                    <span className="font-semibold text-slate-900">Multi-Tier Racking</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Pest & Rodent Control</span>
                    <span className="font-semibold text-emerald-600">Active Monthly Contract</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Security & Access</span>
                    <span className="font-semibold text-slate-900">Biometric & 24/7 CCTV</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-slate-500">Batch Segregation</span>
                    <span className="font-semibold text-slate-900">Barcoded WMS Location</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Climate Zones */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" className="mb-3">
              Multi-Zone Storage
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Engineered Storage Climates
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Each class of chemical requires distinct ambient thresholds. We maintain strict compartmentalization to prevent degradation.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {zones.map((zone, idx) => {
              const Icon = zone.icon;
              return (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 mb-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{zone.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-md bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      {zone.range}
                    </span>
                    <span className="rounded-md bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {zone.rh}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{zone.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Distribution Reach & Rapid Dispatch */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <Badge variant="neutral" className="mb-3">
                Domestic Fleet
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                24–48 Hour Express Delivery to Egypt’s Industrial Cities
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Our logistics network connects Cairo directly with Egypt’s major pharmaceutical and chemical manufacturing epicenters.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4 rounded-xl bg-white p-4 border border-slate-200">
                  <Clock className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Same-Day Urgent Dispatch</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Available for Greater Cairo manufacturing zones (Obour, Badr, Gesr El-Suez) for stock-and-trade items.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl bg-white p-4 border border-slate-200">
                  <Truck className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Dedicated Temperature-Controlled Trucks</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Equipped with USB dataloggers to guarantee cold chain integrity right up to your QC receiving gate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl bg-white p-4 border border-slate-200">
                  <MapPin className="h-6 w-6 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Nationwide Coverage</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Regular routes to 10th of Ramadan, 6th of October, Borg El Arab, Sadat City, and Upper Egypt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 p-8 sm:p-10 text-white shadow-xl">
                <h3 className="text-2xl font-bold">Request Warehouse Buffer Stock</h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Protect your plant from shipping volatility by establishing a local stock agreement held at Harvest Pharma. Guaranteed volume, locked price, and instant call-off capability.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link href="/request-a-quote">
                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium">
                      Setup Buffer Inventory
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full border-slate-600 text-slate-200 hover:bg-slate-800">
                      Schedule a Facility Audit
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
