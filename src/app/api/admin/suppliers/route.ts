import { NextRequest, NextResponse } from 'next/server';
import { dataStore } from '@/lib/data/store';

export async function GET() {
  try {
    const suppliers = await dataStore.getAllSuppliersAdmin();
    return NextResponse.json({ success: true, suppliers });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch suppliers';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    }

    const newSup = await dataStore.createSupplier({
      name: body.name,
      country: body.country || null,
      description: body.description || null,
      logo_url: body.logo_url || null,
      website_url: body.website_url || null,
      partnership_type: body.partnership_type || 'Exclusive Commercial Representation',
      is_published: body.is_published ?? true,
      name_ar: body.name_ar || null,
    });

    return NextResponse.json({ success: true, supplier: newSup }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create supplier';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
