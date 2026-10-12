import React from 'react';
import Link from 'next/link';
import {
  Package,
  FileQuestion,
  FolderTree,
  Users,
  Newspaper,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Warehouse,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { dataStore } from '@/lib/data/store';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';

export default async function AdminDashboardPage() {
  const [products, categories, rfqs, articles, suppliers] = await Promise.all([
    dataStore.getAllProductsAdmin(),
    dataStore.getAllCategoriesAdmin(),
    dataStore.getRFQs(),
    dataStore.getAllArticlesAdmin(),
    dataStore.getAllSuppliersAdmin(),
  ]);

  const newRfqsCount = rfqs.filter((r) => r.status === 'new').length;
  const recentRfqs = rfqs.slice(0, 5);

  const stats = [
    {
      label: 'Total Products in Catalog',
      value: products.length,
      icon: Package,
      change: `${products.filter((p) => p.is_published).length} Published`,
      href: '/admin/products',
      color: 'blue',
    },
    {
      label: 'New RFQs / Inquiries',
      value: newRfqsCount,
      icon: FileQuestion,
      change: `${rfqs.length} Total Registered`,
      href: '/admin/rfqs',
      color: 'amber',
      highlight: newRfqsCount > 0,
    },
    {
      label: 'Product Categories',
      value: categories.length,
      icon: FolderTree,
      change: 'Active Taxonomy',
      href: '/admin/categories',
      color: 'emerald',
    },
    {
      label: 'Global Principal Suppliers',
      value: suppliers.length,
      icon: Users,
      change: 'Verified Partners',
      href: '/admin/suppliers',
      color: 'purple',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Operations & Catalog Overview
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Real-time management of DELTACHEM pharmaceutical products, quotations, and content.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/products/new">
            <Button className="bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs">
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              <span>Add New Product</span>
            </Button>
          </Link>
          <Link href="/admin/rfqs">
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs">
              <span>View All RFQs</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              href={stat.href}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-sm hover:border-slate-700 hover:bg-slate-900 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{stat.label}</span>
                <div className="rounded-xl bg-slate-800 p-2.5 text-slate-300 group-hover:text-teal-400 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white">{stat.value}</span>
                {stat.highlight && (
                  <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                    Action Required
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs text-slate-500">{stat.change}</p>
            </Link>
          );
        })}
      </div>

      {/* Operational Synergy & Recent Inquiries Grid */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Recent Inquiries Table (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Recent Quotation Requests (RFQs)</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Incoming B2B pricing inquiries submitted by pharmaceutical formulators.
              </p>
            </div>
            <Link
              href="/admin/rfqs"
              className="text-xs font-semibold text-teal-400 hover:text-teal-300 inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3">Reference</th>
                  <th className="pb-3">Company</th>
                  <th className="pb-3">Requested Product</th>
                  <th className="pb-3">Volume</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {recentRfqs.map((rfq) => {
                  const statusColors: Record<string, string> = {
                    new: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                    under_review: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                    quoted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                    closed: 'bg-slate-700/30 text-slate-400 border-slate-700/40',
                  };

                  return (
                    <tr key={rfq.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 font-mono font-medium text-teal-300">
                        {rfq.reference_number}
                      </td>
                      <td className="py-3.5 font-semibold text-white">
                        {rfq.company_name}
                      </td>
                      <td className="py-3.5 text-slate-300 max-w-[180px] truncate">
                        {rfq.product_name}
                      </td>
                      <td className="py-3.5 font-mono text-slate-400">
                        {rfq.required_quantity}
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            statusColors[rfq.status] || 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {rfq.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 text-right text-slate-500">
                        {new Date(rfq.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {recentRfqs.length === 0 && (
              <div className="py-12 text-center text-slate-500">
                No quotation requests recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Strategic Highlights & System Status (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Harvest Pharma Warehouse Card */}
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Warehouse className="h-5 w-5 text-teal-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Logistics Infrastructure
              </span>
            </div>
            <h3 className="text-base font-bold text-white">Harvest Pharma Hub</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Cairo pharmaceutical warehousing facility operating under Good Distribution Practices (GDP). Climate zones: 15°C–25°C ambient and 2°C–8°C cold chain.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Warehouse Site:</span>
              <a
                href="https://www.harvestpharma-eg.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-teal-400 hover:text-teal-300"
              >
                harvestpharma-eg.com
              </a>
            </div>
          </div>

          {/* Database Architecture Status */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Database Architecture
              </span>
            </div>
            <h3 className="text-base font-bold text-white">Supabase PostgreSQL</h3>
            <div className="mt-3 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span>Row Level Security (RLS)</span>
                <span className="font-semibold text-emerald-400">Active & Enforced</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span>Local Cache Fallback</span>
                <span className="font-semibold text-teal-400">In-Memory Active</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                <span>Audit Logs / Anti-Spam</span>
                <span className="font-semibold text-slate-300">Enabled</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span>Articles Published</span>
                <span className="font-semibold text-slate-300">{articles.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
