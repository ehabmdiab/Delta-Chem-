export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  is_published: boolean;
  name_ar: string | null;
  description_ar: string | null;
  created_at: string;
  updated_at: string;
};

export type Supplier = {
  id: string;
  name: string;
  country?: string | null;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  partnership_type: string | null;
  is_published: boolean;
  name_ar: string | null;
  created_at: string;
};

export type ProductDocument = {
  title: string;
  url: string;
  file_type?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  supplier_id: string | null;
  description: string | null;
  application: string | null;
  industry: string | null;
  cas_number: string | null;
  grade_spec: string | null;
  pharmacopoeia_standards: string | null;
  packaging: string | null;
  availability_status: string;
  technical_info: string | null;
  documents: ProductDocument[];
  image_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  name_ar: string | null;
  description_ar: string | null;
  created_at: string;
  updated_at: string;
  category?: Category | null;
  supplier?: Supplier | null;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  featured_image: string | null;
  author: string;
  category: string;
  is_published: boolean;
  published_at: string;
  seo_title: string | null;
  seo_description: string | null;
  title_ar: string | null;
  excerpt_ar: string | null;
  body_ar: string | null;
  created_at: string;
  updated_at: string;
};

export type RFQStatus = 'new' | 'under_review' | 'quoted' | 'closed';
export type RFQNotificationStatus = 'sent' | 'failed' | 'pending';

export type RFQ = {
  id: string;
  reference_number: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  product_id: string | null;
  product_name: string;
  required_quantity: string;
  grade_spec: string | null;
  application: string | null;
  target_delivery_date: string | null;
  additional_comments: string | null;
  notes?: string | null;
  status: RFQStatus;
  notification_status: RFQNotificationStatus;
  created_at: string;
};

export type SiteSettings = {
  company_info: {
    name: string;
    legal_name: string;
    tagline: string;
    founder_ceo: string;
    headquarters_address: string;
    telephone: string;
    email: string;
    working_hours: string;
    warehouse_partner: string;
    warehouse_website: string;
    linkedin_url: string;
    established: string;
    regions_served: string[];
  };
};

export type Locale = 'en' | 'ar';
