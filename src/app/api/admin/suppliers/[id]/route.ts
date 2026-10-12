import { NextRequest, NextResponse } from 'next/server';
import { dataStore } from '@/lib/data/store';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await dataStore.updateSupplier(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Supplier not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, supplier: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update supplier';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const deleted = await dataStore.deleteSupplier(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Supplier not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Supplier deleted' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete supplier';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
