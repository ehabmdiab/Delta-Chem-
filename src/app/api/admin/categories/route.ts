import { NextRequest, NextResponse } from 'next/server';
import { dataStore } from '@/lib/data/store';

export async function GET() {
  try {
    const categories = await dataStore.getAllCategoriesAdmin();
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch categories';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.slug) {
      return NextResponse.json({ success: false, error: 'Name and slug are required' }, { status: 400 });
    }

    const newCat = await dataStore.createCategory({
      name: body.name,
      slug: body.slug,
      description: body.description || null,
      sort_order: body.sort_order ?? 0,
      is_published: body.is_published ?? true,
      name_ar: body.name_ar || null,
      description_ar: body.description_ar || null,
    });

    return NextResponse.json({ success: true, category: newCat }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create category';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
