import { z } from 'zod';

export const rfqFormSchema = z.object({
  company_name: z
    .string()
    .min(2, { message: 'Company name must be at least 2 characters.' })
    .max(100, { message: 'Company name is too long.' }),
  contact_person: z
    .string()
    .min(2, { message: 'Contact person name must be at least 2 characters.' })
    .max(80, { message: 'Contact name is too long.' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid corporate or business email address.' }),
  phone: z
    .string()
    .min(7, { message: 'Please enter a valid telephone or mobile number.' })
    .max(25, { message: 'Telephone number is too long.' }),
  product_id: z.string().optional().nullable(),
  product_name: z
    .string()
    .min(2, { message: 'Required product name must be specified.' }),
  required_quantity: z
    .string()
    .min(1, { message: 'Please specify the estimated required inquiry quantity (e.g., 500 kg, 2 drums).' }),
  grade_spec: z.string().optional().nullable(),
  application: z.string().optional().nullable(),
  target_delivery_date: z.string().optional().nullable(),
  additional_comments: z.string().optional().nullable(),
  // Honeypot field for anti-spam (must be empty)
  website_url_hp: z.string().max(0, { message: 'Spam detected.' }).optional(),
});

export type RfqFormValues = z.infer<typeof rfqFormSchema>;
