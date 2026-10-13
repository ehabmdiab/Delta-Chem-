import { describe, it, expect } from 'vitest';
import { SITE_CONFIG } from '@/config/site';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_SUPPLIERS, INITIAL_ARTICLES } from '@/lib/data/initial-data';

describe('Bilingual Localization Coverage', () => {
  it('should have Arabic contact information in SITE_CONFIG', () => {
    expect(SITE_CONFIG.contact.address_ar).toBeDefined();
    expect(SITE_CONFIG.contact.address_ar.length).toBeGreaterThan(0);
    expect(SITE_CONFIG.contact.workingHours_ar).toBeDefined();
    expect(SITE_CONFIG.contact.hours_ar).toBeDefined();
    expect(SITE_CONFIG.contact.warehousePartner_ar).toBeDefined();
  });

  it('should have Arabic translations for all initial categories', () => {
    expect(INITIAL_CATEGORIES.length).toBeGreaterThan(0);
    for (const cat of INITIAL_CATEGORIES) {
      expect(cat.name_ar).toBeDefined();
      expect(cat.name_ar).not.toBeNull();
      expect(cat.name_ar?.length).toBeGreaterThan(0);
      expect(cat.description_ar).toBeDefined();
      expect(cat.description_ar).not.toBeNull();
    }
  });

  it('should have Arabic titles and descriptions for initial products', () => {
    expect(INITIAL_PRODUCTS.length).toBeGreaterThan(0);
    for (const prod of INITIAL_PRODUCTS) {
      expect(prod.name_ar).toBeDefined();
      expect(prod.name_ar).not.toBeNull();
      expect(prod.name_ar?.length).toBeGreaterThan(0);
      expect(prod.description_ar).toBeDefined();
      expect(prod.description_ar).not.toBeNull();
    }
  });

  it('should have Arabic titles, excerpts and bodies for initial articles', () => {
    expect(INITIAL_ARTICLES.length).toBeGreaterThan(0);
    for (const art of INITIAL_ARTICLES) {
      expect(art.title_ar).toBeDefined();
      expect(art.title_ar).not.toBeNull();
      expect(art.title_ar?.length).toBeGreaterThan(0);
      expect(art.excerpt_ar).toBeDefined();
      expect(art.body_ar).toBeDefined();
    }
  });

  it('should have Arabic names for initial suppliers', () => {
    expect(INITIAL_SUPPLIERS.length).toBeGreaterThan(0);
    for (const sup of INITIAL_SUPPLIERS) {
      expect(sup.name_ar).toBeDefined();
      expect(sup.name_ar).not.toBeNull();
      expect(sup.name_ar?.length).toBeGreaterThan(0);
    }
  });
});
