import { describe, it, expect } from 'vitest';
import { dataStore } from '@/lib/data/store';
import { INITIAL_PRODUCTS } from '@/lib/data/initial-data';

describe('DataStore Repository Operations', () => {
  it('should retrieve all 4 official sector categories in correct order', async () => {
    const categories = await dataStore.getCategories();
    expect(categories.map((c) => c.slug)).toEqual([
      'human-raw-materials',
      'veterinary-raw-materials',
      'cosmetics-raw-materials',
      'nutraceutical-raw-materials',
    ]);
    for (let i = 0; i < categories.length - 1; i++) {
      expect(categories[i].sort_order).toBeLessThanOrEqual(categories[i + 1].sort_order);
    }
  });

  it('should expose the complete PDF raw-material catalog across the 4 sectors', async () => {
    expect(INITIAL_PRODUCTS).toHaveLength(193);

    const uniqueSlugs = new Set(INITIAL_PRODUCTS.map((p) => p.slug));
    const uniqueIds = new Set(INITIAL_PRODUCTS.map((p) => p.id));
    expect(uniqueSlugs.size).toBe(193);
    expect(uniqueIds.size).toBe(193);

    const expectedCounts: Record<string, { id: string; count: number }> = {
      'human-raw-materials': { id: 'cat-human', count: 78 },
      'veterinary-raw-materials': { id: 'cat-vet', count: 40 },
      'cosmetics-raw-materials': { id: 'cat-cosmetics', count: 36 },
      'nutraceutical-raw-materials': { id: 'cat-nutra', count: 39 },
    };

    let countedTotal = 0;
    for (const [slug, { id: expectedId, count }] of Object.entries(expectedCounts)) {
      const result = await dataStore.getProducts({ categorySlug: slug });
      expect(result.products).toHaveLength(count);
      countedTotal += result.products.length;
      for (const prod of result.products) {
        expect(prod.category_id).toBe(expectedId);
        expect(prod.pharmacopoeia_standards?.trim().length).toBeGreaterThan(0);
        expect(prod.packaging?.trim().length).toBeGreaterThan(0);
        expect(prod.application?.trim().length).toBeGreaterThan(0);
        expect(prod.name_ar?.trim().length).toBeGreaterThan(0);
      }
    }
    expect(countedTotal).toBe(193);
  });

  it('should contain real PDF products, multi-grade details, and exclude removed sample products', async () => {
    const expectedSlugs = [
      'amoxicillin-trihydrate',
      'paracetamol',
      'tylosin-tartrate-powder-granular',
      'carbomer-940',
      'octyl-methoxycinnamate',
      'ascorbic-acid-vitamin-c',
      'vitamin-d3-food-pharma-feed-injection-grades',
      'vitamin-a-acetate-palmitate-grades',
      'carboxymethyl-cellulose-sodium-cmc-sodium',
      'ivermectin',
      'streptomycin-sulphate',
      'dihydrostreptomycin-sulphate',
    ];
    for (const slug of expectedSlugs) {
      const found = await dataStore.getProductBySlug(slug);
      expect(found).not.toBeNull();
    }

    const vitaminA = await dataStore.getProductBySlug('vitamin-a-acetate-palmitate-grades');
    expect(vitaminA?.technical_info).toContain('Acetate 250,000IU Powder Pharma Grade CWS (20KG/CARTON)');
    expect(vitaminA?.technical_info).toContain('Palmitate 1,000,000IU Oil Pharma Grade (25KG/IRON DRUM)');

    const vitaminD3 = await dataStore.getProductBySlug(
      'vitamin-d3-food-pharma-feed-injection-grades'
    );
    expect(vitaminD3?.packaging).toContain('20KG/CARTON');
    expect(vitaminD3?.technical_info).toContain('40,000,000IU Injection Grade (20KG/CARTON)');

    const cmc = await dataStore.getProductBySlug('carboxymethyl-cellulose-sodium-cmc-sodium');
    expect(cmc?.technical_info).toContain('different viscosities');

    const ivermectin = await dataStore.getProductBySlug('ivermectin');
    expect(ivermectin?.category_id).toBe('cat-vet');
    expect(ivermectin?.application).toBe('Veterinary Anthelmintics');

    const strep = await dataStore.getProductBySlug('streptomycin-sulphate');
    expect(strep?.packaging).toContain('2TIN/CTN');
    expect(strep?.packaging).toContain('20BOU/DRUM');

    const dihydro = await dataStore.getProductBySlug('dihydrostreptomycin-sulphate');
    expect(dihydro?.packaging).toContain('2TIN/CTN');

    const removedSlugs = [
      'metformin-hydrochloride',
      'sodium-hyaluronate',
      'coenzyme-q10-ubiquinone',
      'octocrylene-uv-filter',
    ];
    for (const slug of removedSlugs) {
      const removed = await dataStore.getProductBySlug(slug);
      expect(removed).toBeNull();
    }
  });

  it('should filter products by search term accurately', async () => {
    const amoxicillinResult = await dataStore.getProducts({ search: 'Amoxicillin' });
    expect(amoxicillinResult.products.length).toBeGreaterThanOrEqual(1);
    expect(amoxicillinResult.products[0].name).toContain('Amoxicillin');
  });

  it('should create and retrieve a new RFQ with generated reference number', async () => {
    const newRfq = await dataStore.createRFQ({
      company_name: 'Test Pharma Egypt',
      contact_person: 'Dr. Test',
      email: 'test@pharma.com.eg',
      phone: '+201003875503',
      product_id: null,
      product_name: 'Ascorbic Acid (Vitamin C)',
      required_quantity: '200 kg',
      grade_spec: 'BP2012 / USP34',
      application: 'Nutraceutical formulation',
      target_delivery_date: null,
      additional_comments: 'Urgent quotation required',
    });

    expect(newRfq.reference_number).toMatch(/^RFQ-\d{4}-\d+/);
    expect(newRfq.status).toBe('new');

    const updated = await dataStore.updateRFQStatus(newRfq.id, 'under_review');
    expect(updated?.status).toBe('under_review');
  });
});
