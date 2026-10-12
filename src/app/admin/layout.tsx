import React, { Suspense } from 'react';
import Link from 'next/link';
import { AdminSidebar } from '@/components/organisms/AdminSidebar';
import {
  ExternalLink,
  ShieldCheck,
  Bell,
  Database,
  UserCheck,
} from 'lucide-react';

export const metadata = {
  title: 'DELTACHEM Portal CMS | Administration',
  description: 'Enterprise Content Management & B2B Inquiry Operations for DELTACHEM',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <Suspense fallback={<aside className="w-64 bg-slate-900 border-r border-slate-800 shrink-0" />}>
        <AdminSidebar />
      </Suspense>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950 text-slate-100">
        {/* Top Control Bar */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              DELTACHEM Operations CMS
            </span>
            <div className="hidden sm:flex items-center gap-1 rounded-md bg-emerald-950/60 px-2 py-0.5 text-[11px] font-medium text-emerald-400 border border-emerald-800/40">
              <Database className="h-3 w-3" />
              <span>Data Store Online</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <span>View Public Website</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </Link>

            <div className="h-4 w-[1px] bg-slate-800" />

            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600/20 text-teal-400 border border-teal-500/30 font-bold text-xs">
                AA
              </div>
              <div className="hidden md:block text-left text-xs">
                <span className="font-semibold text-white block">Dr. Abdelhamid Aboelaly</span>
                <span className="text-[10px] text-slate-400">Managing Director / Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
