'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  FileQuestion,
  Newspaper,
  Users,
  Settings,
  ExternalLink,
  ShieldCheck,
  LogOut,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Products Catalog', href: '/admin/products', icon: Package },
    { label: 'Categories', href: '/admin/categories', icon: FolderTree },
    { label: 'RFQs / Inquiries', href: '/admin/rfqs', icon: FileQuestion },
    { label: 'Articles & Insights', href: '/admin/insights', icon: Newspaper },
    { label: 'Suppliers & Principals', href: '/admin/suppliers', icon: Users },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col justify-between border-r border-slate-800 shrink-0">
      <div>
        {/* Brand header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              DC
            </div>
            <div>
              <span className="font-bold text-white text-sm block leading-none">DELTACHEM</span>
              <span className="text-[10px] text-teal-400 font-mono tracking-wider">PORTAL CMS</span>
            </div>
          </Link>
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-xs font-semibold rounded-lg transition-colors ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition"
        >
          <span>View Live Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 px-2">
          <span>Admin Role</span>
          <span className="text-emerald-400 font-semibold">&bull; Active</span>
        </div>
      </div>
    </aside>
  );
};
