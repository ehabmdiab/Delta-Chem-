import { describe, it, expect } from 'vitest';
import { rfqFormSchema } from '@/lib/validation/rfq';

describe('RFQ Form Validation', () => {
  it('should validate a valid RFQ submission correctly', () => {
    const validData = {
      company_name: 'Alexandria Pharmaceuticals',
      contact_person: 'Dr. Yasser',
      email: 'yasser@alexper.com.eg',
      phone: '+201001122334',
      product_name: 'Amoxicillin Trihydrate',
      required_quantity: '1000 kg',
      grade_spec: 'USP Grade',
    };

    const result = rfqFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.company_name).toBe('Alexandria Pharmaceuticals');
      expect(result.data.product_name).toBe('Amoxicillin Trihydrate');
    }
  });

  it('should reject invalid business email', () => {
    const invalidData = {
      company_name: 'Pharma Company',
      contact_person: 'John Doe',
      email: 'invalid-email-address',
      phone: '+201001122334',
      product_name: 'Paracetamol',
      required_quantity: '500 kg',
    };

    const result = rfqFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should catch spam bot submission with filled honeypot field', () => {
    const spamData = {
      company_name: 'Spam Bot Co',
      contact_person: 'Bot',
      email: 'bot@spam.com',
      phone: '1234567890',
      product_name: 'Product',
      required_quantity: '10 kg',
      website_url_hp: 'http://spam-link.com',
    };

    const result = rfqFormSchema.safeParse(spamData);
    expect(result.success).toBe(false);
  });
});
