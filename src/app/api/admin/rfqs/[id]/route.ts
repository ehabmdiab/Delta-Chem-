import { NextRequest, NextResponse } from 'next/server';
import { dataStore } from '@/lib/data/store';
import { RFQStatus } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = (await req.json()) as { status: RFQStatus };

    if (!body.status || !['new', 'under_review', 'quoted', 'closed'].includes(body.status)) {
      return NextResponse.json({ success: false, error: 'Invalid RFQ status' }, { status: 400 });
    }

    const updated = await dataStore.updateRFQStatus(id, body.status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'RFQ not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, rfq: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update RFQ status';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
