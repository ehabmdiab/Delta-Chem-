import { describe, it, expect } from 'vitest';
import { SITE_CONFIG } from '@/config/site';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_SUPPLIERS,
  INITIAL_ARTICLES,
} from '@/lib/data/initial-data';

describe('Bilingual Localization & Official Contact Coverage', () => {
  it('should have official Head Office address, landlines, mobiles, WhatsApp, and map URLs in SITE_CONFIG', () => {
    expect(SITE_CONFIG.contact.address).toContain('64 Abdel Aziz Hegazy');
    expect(SITE_CONFIG.contact.address_ar).toContain('٦٤ شارع عبد العزيز حجازي');
    expect(SITE_CONFIG.contact.landlines.map((l) => l.display)).toEqual([
      '0226988187',
      '0226988217',
    ]);
    expect(SITE_CONFIG.contact.mobiles.map((m) => m.display)).toEqual([
      '01003875503',
      '01210110609',
    ]);
    expect(SITE_CONFIG.contact.mobiles[0].whatsapp).toBe('https://wa.me/201003875503');
    expect(SITE_CONFIG.contact.mobiles[1].whatsapp).toBe('https://wa.me/201210110609');
    expect(SITE_CONFIG.contact.mapsEmbedUrl).toContain('64+Abdel+Aziz+Hegazy');
    expect(SITE_CONFIG.contact.mapsDirectUrl).toContain('64+Abdel+Aziz+Hegazy');
    expect(SITE_CONFIG.contact.workingHours_ar).toBeDefined();
    expect(SITE_CONFIG.contact.hours_ar).toBeDefined();
    expect(SITE_CONFIG.contact.warehousePartner_ar).toBeDefined();
  });

  it('should have Arabic translations for all 4 sector categories', () => {
    expect(INITIAL_CATEGORIES).toHaveLength(4);
    for (const cat of INITIAL_CATEGORIES) {
      expect(cat.name_ar).toBeDefined();
      expect(cat.name_ar).not.toBeNull();
      expect(cat.name_ar?.length).toBeGreaterThan(0);
      expect(cat.description_ar).toBeDefined();
      expect(cat.description_ar).not.toBeNull();
    }
  });

  it('should have Arabic titles and descriptions for all initial products', () => {
    expect(INITIAL_PRODUCTS.length).toBeGreaterThanOrEqual(160);
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
