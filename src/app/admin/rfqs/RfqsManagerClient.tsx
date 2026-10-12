'use client';

import React, { useState } from 'react';
import {
  FileQuestion,
  Search,
  CheckCircle2,
  Clock,
  Send,
  X,
  Mail,
  Phone,
  Building2,
  Calendar,
  Scale,
  FileText,
  Warehouse,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { RFQ, RFQStatus } from '@/types';
import { Button } from '@/components/atoms/Button';

interface RfqsManagerClientProps {
  initialRfqs: RFQ[];
}

export const RfqsManagerClient: React.FC<RfqsManagerClientProps> = ({ initialRfqs }) => {
  const [rfqs, setRfqs] = useState<RFQ[]>(initialRfqs);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRfq, setActiveRfq] = useState<RFQ | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const filteredRfqs = rfqs.filter((r) => {
    const matchesStatus = selectedStatus === 'all' || r.status === selectedStatus;
    const matchesSearch =
      searchQuery === '' ||
      r.reference_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.contact_person.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.product_name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = async (id: string, newStatus: RFQStatus) => {
    try {
      setIsUpdatingStatus(true);
      setActionError(null);

      const res = await fetch(`/api/admin/rfqs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to update RFQ status');
      }

      setRfqs((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );

      if (activeRfq && activeRfq.id === id) {
        setActiveRfq((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const statusBadges: Record<RFQStatus, { label: string; className: string }> = {
    new: {
      label: 'New Inquiry',
      className: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
    under_review: {
      label: 'Under Review',
      className: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    quoted: {
      label: 'Quoted',
      className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    closed: {
      label: 'Closed',
      className: 'bg-slate-700/30 text-slate-400 border-slate-700/40',
    },
  };

  return (
    <div className="space-y-6">
      {/* Search & Tabs */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {(['all', 'new', 'under_review', 'quoted', 'closed'] as const).map((tab) => {
            const count =
              tab === 'all' ? rfqs.length : rfqs.filter((r) => r.status === tab).length;
            const isActive = selectedStatus === tab;

            return (
              <button
                key={tab}
                onClick={() => setSelectedStatus(tab)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-850 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.replace('_', ' ')} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search reference, company, product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-850 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {actionError && (
        <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{actionError}</span>
        </div>
      )}

      {/* RFQ List Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-850 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Reference</th>
                <th className="py-3.5 px-4">Company & Contact</th>
                <th className="py-3.5 px-4">Requested Chemical</th>
                <th className="py-3.5 px-4">Volume</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredRfqs.map((rfq) => {
                const badge = statusBadges[rfq.status] || statusBadges.new;

                return (
                  <tr
                    key={rfq.id}
                    onClick={() => setActiveRfq(rfq)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-teal-300">
                      {rfq.reference_number}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{rfq.company_name}</div>
                      <div className="text-[11px] text-slate-400">{rfq.contact_person}</div>
                    </td>

                    <td className="py-3.5 px-4 max-w-[200px]">
                      <div className="font-semibold text-slate-200 truncate">
                        {rfq.product_name}
                      </div>
                      <div className="text-[10px] text-teal-400/80 font-mono">
                        {rfq.grade_spec || 'Standard Grade'}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-300">
                      {rfq.required_quantity}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block rounded-md border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(rfq.created_at).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveRfq(rfq);
                        }}
                        className="rounded-lg bg-slate-800 px-3 py-1 text-[11px] font-medium text-teal-400 hover:bg-teal-950 hover:text-teal-300 transition"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredRfqs.length === 0 && (
            <div className="py-16 text-center text-slate-500">
              No quotation requests match the selected filters.
            </div>
          )}
        </div>
      </div>

      {/* Detail Inspection Modal */}
      {activeRfq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveRfq(null)}
              className="absolute top-6 right-6 rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block">
                {activeRfq.reference_number}
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">{activeRfq.company_name}</h3>
              <p className="text-xs text-slate-400 mt-1">
                Submitted on {new Date(activeRfq.created_at).toLocaleString()}
              </p>
            </div>

            {/* Details Grid */}
            <div className="py-6 space-y-6 text-xs text-slate-300">
              {/* Product Inquired */}
              <div className="rounded-2xl bg-slate-850 p-4 border border-slate-800 space-y-2">
                <span className="font-semibold uppercase tracking-wider text-teal-400 text-[10px] block">
                  Requested Material Specification
                </span>
                <div className="text-base font-bold text-white">{activeRfq.product_name}</div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block">Required Quantity:</span>
                    <span className="font-bold text-white">{activeRfq.required_quantity}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Pharmacopoeia Standard:</span>
                    <span className="font-bold text-teal-300">
                      {activeRfq.grade_spec || 'Not specified'}
                    </span>
                  </div>
                </div>
                {activeRfq.application && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-slate-500 block">Application / Finished Form:</span>
                    <span>{activeRfq.application}</span>
                  </div>
                )}
                {activeRfq.target_delivery_date && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-slate-500 block">Target Receiving Date:</span>
                    <span className="font-semibold text-white">
                      {activeRfq.target_delivery_date}
                    </span>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-850 p-4 border border-slate-800 space-y-1.5">
                  <span className="font-semibold uppercase tracking-wider text-slate-400 text-[10px] block">
                    Contact Person
                  </span>
                  <div className="text-sm font-bold text-white">{activeRfq.contact_person}</div>
                  <div className="flex items-center gap-2 pt-1 text-teal-400">
                    <Phone className="h-3.5 w-3.5" />
                    <a href={`tel:${activeRfq.phone}`}>{activeRfq.phone}</a>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-850 p-4 border border-slate-800 space-y-1.5">
                  <span className="font-semibold uppercase tracking-wider text-slate-400 text-[10px] block">
                    Corporate Email
                  </span>
                  <div className="text-sm font-bold text-white truncate">{activeRfq.email}</div>
                  <div className="flex items-center gap-2 pt-1 text-teal-400">
                    <Mail className="h-3.5 w-3.5" />
                    <a
                      href={`mailto:${activeRfq.email}?subject=DELTACHEM Quotation: ${activeRfq.product_name} (${activeRfq.reference_number})`}
                      className="hover:underline"
                    >
                      Draft Email Reply
                    </a>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {(activeRfq.notes || activeRfq.additional_comments) && (
                <div className="rounded-xl bg-slate-850 p-4 border border-slate-800">
                  <span className="font-semibold uppercase tracking-wider text-slate-400 text-[10px] block mb-1">
                    Special Packaging or Fulfillment Notes
                  </span>
                  <p className="whitespace-pre-wrap leading-relaxed text-slate-300">
                    {activeRfq.notes || activeRfq.additional_comments}
                  </p>
                </div>
              )}

              {/* Status Update Control */}
              <div className="border-t border-slate-800 pt-6">
                <span className="font-semibold uppercase tracking-wider text-slate-400 text-[10px] block mb-3">
                  Update Inquiry Workflow Status
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    disabled={isUpdatingStatus}
                    onClick={() => handleUpdateStatus(activeRfq.id, 'new')}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border transition ${
                      activeRfq.status === 'new'
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    New
                  </button>
                  <button
                    disabled={isUpdatingStatus}
                    onClick={() => handleUpdateStatus(activeRfq.id, 'under_review')}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border transition ${
                      activeRfq.status === 'under_review'
                        ? 'bg-blue-600 text-white border-blue-500'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    Under Review
                  </button>
                  <button
                    disabled={isUpdatingStatus}
                    onClick={() => handleUpdateStatus(activeRfq.id, 'quoted')}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border transition ${
                      activeRfq.status === 'quoted'
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    Quoted
                  </button>
                  <button
                    disabled={isUpdatingStatus}
                    onClick={() => handleUpdateStatus(activeRfq.id, 'closed')}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border transition ${
                      activeRfq.status === 'closed'
                        ? 'bg-slate-700 text-white border-slate-600'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    Closed
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveRfq(null)}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Close Modal
              </Button>

              <a
                href={`mailto:${activeRfq.email}?subject=DELTACHEM Official Quotation: ${activeRfq.product_name} (${activeRfq.reference_number})`}
                className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-500 transition shadow-sm"
              >
                <Mail className="h-4 w-4" />
                <span>Send Quotation Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
