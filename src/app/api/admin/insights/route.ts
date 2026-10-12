import { NextRequest, NextResponse } from 'next/server';
import { dataStore } from '@/lib/data/store';

export async function GET() {
  try {
    const articles = await dataStore.getAllArticlesAdmin();
    return NextResponse.json({ success: true, articles });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch articles';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.slug) {
      return NextResponse.json({ success: false, error: 'Title and slug are required' }, { status: 400 });
    }

    const newArt = await dataStore.createArticle({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt || null,
      body: body.body || '<p></p>',
      featured_image: body.featured_image || null,
      author: body.author || 'Dr. Abdelhamid Aboelaly',
      category: body.category || 'Industry Insights',
      is_published: body.is_published ?? true,
      published_at: body.published_at || new Date().toISOString(),
      seo_title: body.seo_title || null,
      seo_description: body.seo_description || null,
      title_ar: body.title_ar || null,
      excerpt_ar: body.excerpt_ar || null,
      body_ar: body.body_ar || null,
    });

    return NextResponse.json({ success: true, article: newArt }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create article';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
