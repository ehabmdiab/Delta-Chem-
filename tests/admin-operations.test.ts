import { describe, it, expect } from 'vitest';
import { dataStore } from '@/lib/data/store';

describe('Admin Operations & Store Management', () => {
  it('should create, update, and delete a product in store', async () => {
    const created = await dataStore.createProduct({
      name: 'Test Zinc Gluconate',
      slug: 'test-zinc-gluconate',
      category_id: 'cat-nutra',
      supplier_id: null,
      description: 'High purity mineral chelate for dietary supplements.',
      application: 'Immunity tablets',
      industry: 'Nutraceuticals',
      cas_number: '4468-02-4',
      grade_spec: 'USP Grade',
      pharmacopoeia_standards: 'USP / FCC',
      packaging: '25 kg drum',
      availability_status: 'Available in Stock',
      technical_info: 'Assay: 97.0% - 102.0%',
      documents: [],
      image_url: null,
      is_featured: false,
      is_published: true,
      seo_title: 'Zinc Gluconate | DELTACHEM',
      seo_description: 'Nutraceutical ingredient Zinc Gluconate in Egypt.',
      name_ar: 'غلوكونات الزنك',
      description_ar: 'معدن نقي للمكملات الغذائية',
    });

    expect(created.id).toBeDefined();
    expect(created.name).toBe('Test Zinc Gluconate');

    // Update
    const updated = await dataStore.updateProduct(created.id, {
      grade_spec: 'Pharma Grade EP',
    });
    expect(updated?.grade_spec).toBe('Pharma Grade EP');

    // Delete
    const deleted = await dataStore.deleteProduct(created.id);
    expect(deleted).toBe(true);

    const check = await dataStore.getProductBySlug('test-zinc-gluconate');
    expect(check).toBeNull();
  });

  it('should create, update, and delete a category in store', async () => {
    const created = await dataStore.createCategory({
      name: 'Biotech Actives',
      slug: 'biotech-actives',
      description: 'Fermentation-derived ingredients',
      sort_order: 10,
      is_published: true,
      name_ar: 'المكونات الحيوية',
      description_ar: null,
    });

    expect(created.id).toBeDefined();
    expect(created.slug).toBe('biotech-actives');

    const updated = await dataStore.updateCategory(created.id, {
      sort_order: 12,
    });
    expect(updated?.sort_order).toBe(12);

    const deleted = await dataStore.deleteCategory(created.id);
    expect(deleted).toBe(true);
  });

  it('should create, update, and delete a supplier principal in store', async () => {
    const created = await dataStore.createSupplier({
      name: 'Alpine Fine Pharma AG',
      country: 'Switzerland',
      description: 'Swiss precision synthesis partner',
      logo_url: null,
      website_url: 'https://www.alpine-pharma.ch',
      partnership_type: 'Exclusive Commercial Agency',
      is_published: true,
      name_ar: 'ألباين فارما سويسرا',
    });

    expect(created.id).toBeDefined();
    expect(created.country).toBe('Switzerland');

    const updated = await dataStore.updateSupplier(created.id, {
      partnership_type: 'Direct Indent Partner',
    });
    expect(updated?.partnership_type).toBe('Direct Indent Partner');

    const deleted = await dataStore.deleteSupplier(created.id);
    expect(deleted).toBe(true);
  });

  it('should update and retrieve site settings', async () => {
    const settings = await dataStore.getSiteSettings();
    expect(settings.company_info.telephone).toBe('(202) 26988187');

    const updated = await dataStore.updateSiteSettings({
      company_info: {
        ...settings.company_info,
        telephone: '(202) 26988188',
      },
    });

    expect(updated.company_info.telephone).toBe('(202) 26988188');

    // Restore original telephone
    await dataStore.updateSiteSettings({
      company_info: {
        ...settings.company_info,
        telephone: '(202) 26988187',
      },
    });
  });

  it('should create, update, and delete an article in store', async () => {
    const created = await dataStore.createArticle({
      title: 'Testing Cold Chain Loggers in Cairo',
      slug: 'testing-cold-chain-loggers-in-cairo',
      excerpt: 'Evaluating temperature excursions during summer transit.',
      body: '<p>Study on continuous temperature logging for parenteral storage...</p>',
      featured_image: null,
      author: 'Dr. Abdelhamid Aboelaly',
      category: 'Supply Chain Intelligence',
      is_published: true,
      published_at: new Date().toISOString(),
      seo_title: 'Cold Chain Loggers | DELTACHEM',
      seo_description: 'Cold chain evaluation at Harvest Pharma facilities.',
      title_ar: null,
      excerpt_ar: null,
      body_ar: null,
    });

    expect(created.id).toBeDefined();

    const fetched = await dataStore.getArticleBySlug('testing-cold-chain-loggers-in-cairo');
    expect(fetched?.title).toBe('Testing Cold Chain Loggers in Cairo');

    const deleted = await dataStore.deleteArticle(created.id);
    expect(deleted).toBe(true);

    const recheck = await dataStore.getArticleBySlug('testing-cold-chain-loggers-in-cairo');
    expect(recheck).toBeNull();
  });
});
