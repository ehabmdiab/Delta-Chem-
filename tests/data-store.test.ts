import { describe, it, expect } from 'vitest';
import { dataStore } from '@/lib/data/store';

describe('DataStore Repository Operations', () => {
  it('should retrieve published categories in correct order', async () => {
    const categories = await dataStore.getCategories();
    expect(categories.length).toBeGreaterThan(0);
    expect(categories[0].sort_order).toBeLessThanOrEqual(categories[1].sort_order);
  });

  it('should filter products by search term accurately', async () => {
    const amoxicillinResult = await dataStore.getProducts({ search: 'Amoxicillin' });
    expect(amoxicillinResult.products.length).toBeGreaterThanOrEqual(1);
    expect(amoxicillinResult.products[0].name).toContain('Amoxicillin');
  });

  it('should filter products by category slug', async () => {
    const apiProducts = await dataStore.getProducts({ categorySlug: 'pharmaceutical-apis' });
    expect(apiProducts.products.length).toBeGreaterThan(0);
    for (const prod of apiProducts.products) {
      expect(prod.category_id).toBe('cat-api');
    }
  });

  it('should create and retrieve a new RFQ with generated reference number', async () => {
    const newRfq = await dataStore.createRFQ({
      company_name: 'Test Pharma Egypt',
      contact_person: 'Dr. Test',
      email: 'test@pharma.com.eg',
      phone: '+201234567890',
      product_id: null,
      product_name: 'Ascorbic Acid (Vitamin C)',
      required_quantity: '200 kg',
      grade_spec: 'Pharma Grade',
      application: 'Immunity formulation',
      target_delivery_date: null,
      additional_comments: 'Urgent quotation required',
    });

    expect(newRfq.reference_number).toMatch(/^RFQ-\d{4}-\d+/);
    expect(newRfq.status).toBe('new');

    const updated = await dataStore.updateRFQStatus(newRfq.id, 'under_review');
    expect(updated?.status).toBe('under_review');
  });
});
