import { z } from 'zod';

export const productFormSchema = z.object({
  name: z.string().min(2, { message: 'Product name must be at least 2 characters.' }),
  slug: z
    .string()
    .min(2, { message: 'Slug must be at least 2 characters.' })
    .regex(/^[a-z0-9-]+$/, { message: 'Slug can only contain lowercase letters, numbers, and hyphens.' }),
  category_id: z.string().min(1, { message: 'Please select a product category.' }),
  supplier_id: z.string().optional().nullable(),
  description: z.string().min(5, { message: 'Description must be at least 5 characters.' }),
  application: z.string().optional().nullable(),
  industry: z.string().min(2, { message: 'Target industry must be specified.' }),
  cas_number: z.string().optional().nullable(),
  grade_spec: z.string().optional().nullable(),
  pharmacopoeia_standards: z.string().optional().nullable(),
  packaging: z.string().optional().nullable(),
  availability_status: z.string().default('Contact for Availability'),
  technical_info: z.string().optional().nullable(),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(true),
  seo_title: z.string().optional().nullable(),
  seo_description: z.string().optional().nullable(),
  name_ar: z.string().optional().nullable(),
  description_ar: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  documents: z
    .array(
      z.object({
        title: z.string(),
        url: z.string(),
        file_type: z.string().optional(),
      })
    )
    .optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
export const productSchema = productFormSchema;
