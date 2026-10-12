import React from 'react';
import { dataStore } from '@/lib/data/store';
import { SuppliersManagerClient } from './SuppliersManagerClient';

export const metadata = {
  title: 'Principal Suppliers | DELTACHEM Admin',
  description: 'Manage Global Chemical Principals & Manufacturing Partners',
};

export default async function AdminSuppliersPage() {
  const [suppliers, products] = await Promise.all([
    dataStore.getAllSuppliersAdmin(),
    dataStore.getAllProductsAdmin(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Global Principal Suppliers & Principals
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Oversee international chemical synthesis partners, exclusive representation models, and origin registries.
        </p>
      </div>

      <SuppliersManagerClient
        initialSuppliers={suppliers}
        products={products}
      />
    </div>
  );
}
