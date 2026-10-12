'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Settings,
  Save,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Warehouse,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { SiteSettings } from '@/types';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';

interface SettingsManagerClientProps {
  initialSettings: SiteSettings;
}

export const SettingsManagerClient: React.FC<SettingsManagerClientProps> = ({
  initialSettings,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SiteSettings['company_info']>({
    defaultValues: initialSettings.company_info,
  });

  const onSubmit: SubmitHandler<SiteSettings['company_info']> = async (data) => {
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company_info: data }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to update settings');
      }

      setSuccessMessage('Site settings and contact details saved successfully.');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Error updating settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
      {successMessage && (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Corporate Identity */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Building2 className="h-4 w-4 text-teal-400" />
          <span>Corporate Identity</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
              Company Name
            </label>
            <Input
              className="bg-slate-850 text-white border-slate-700"
              {...register('name')}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
              Legal Registered Name
            </label>
            <Input
              className="bg-slate-850 text-white border-slate-700"
              {...register('legal_name')}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
              Founder & Managing Director
            </label>
            <Input
              className="bg-slate-850 text-white border-slate-700"
              {...register('founder_ceo')}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
              Year Established
            </label>
            <Input
              className="bg-slate-850 text-white border-slate-700 font-mono"
              {...register('established')}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
              Corporate Tagline
            </label>
            <Input
              className="bg-slate-850 text-white border-slate-700"
              {...register('tagline')}
            />
          </div>
        </div>
      </div>

      {/* Contact Channels */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Phone className="h-4 w-4 text-teal-400" />
          <span>Official Contact & Channels</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
              Headquarters Physical Address *
            </label>
            <Input
              className="bg-slate-850 text-white border-slate-700"
              {...register('headquarters_address', { required: 'Address is required' })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
              Direct Phone (Cairo) *
            </label>
            <Input
              className="bg-slate-850 text-white border-slate-700 font-mono"
              {...register('telephone', { required: 'Telephone is required' })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
              Sales Inquiries Email *
            </label>
            <Input
              className="bg-slate-850 text-white border-slate-700"
              {...register('email', { required: 'Email is required' })}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
              Official Business Hours
            </label>
            <Input
              className="bg-slate-850 text-white border-slate-700"
              {...register('working_hours')}
            />
          </div>
        </div>
      </div>

      {/* Warehouse Sister Company Synergy */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Warehouse className="h-4 w-4 text-teal-400" />
          <span>Harvest Pharma Alliance</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
              Warehouse Operating Entity
            </label>
            <Input
              className="bg-slate-850 text-white border-slate-700"
              {...register('warehouse_partner')}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
              Sister Company Website
            </label>
            <Input
              className="bg-slate-850 text-white border-slate-700 font-mono"
              {...register('warehouse_website')}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
              LinkedIn Profile URL
            </label>
            <Input
              className="bg-slate-850 text-white border-slate-700 font-mono"
              {...register('linkedin_url')}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-teal-600 hover:bg-teal-500 text-white font-medium px-8"
        >
          {isSubmitting ? (
            <span>Saving Settings...</span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              <span>Save Configuration</span>
            </span>
          )}
        </Button>
      </div>
    </form>
  );
};
