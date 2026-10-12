import { NextRequest, NextResponse } from 'next/server';
import { dataStore } from '@/lib/data/store';
import { productSchema } from '@/lib/validation/product';

export async function GET() {
  try {
    const products = await dataStore.getAllProductsAdmin();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch products';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = productSchema.parse(body);

    const newProduct = await dataStore.createProduct({
      name: validated.name,
      slug: validated.slug,
      category_id: validated.category_id || null,
      supplier_id: validated.supplier_id || null,
      description: validated.description || null,
      application: validated.application || null,
      industry: validated.industry || null,
      cas_number: validated.cas_number || null,
      grade_spec: validated.grade_spec || null,
      pharmacopoeia_standards: validated.pharmacopoeia_standards || null,
      packaging: validated.packaging || null,
      availability_status: validated.availability_status || 'Available in Stock',
      technical_info: validated.technical_info || null,
      documents: validated.documents || [],
      image_url: validated.image_url || null,
      is_featured: validated.is_featured ?? false,
      is_published: validated.is_published ?? true,
      seo_title: validated.seo_title || null,
      seo_description: validated.seo_description || null,
      name_ar: validated.name_ar || null,
      description_ar: validated.description_ar || null,
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create product';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
