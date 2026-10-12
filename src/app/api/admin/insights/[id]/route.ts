import { NextRequest, NextResponse } from 'next/server';
import { dataStore } from '@/lib/data/store';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await dataStore.updateArticle(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, article: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update article';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const deleted = await dataStore.deleteArticle(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Article deleted' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete article';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
