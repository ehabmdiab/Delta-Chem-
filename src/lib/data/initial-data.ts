import { Category, Product, Supplier, Article, SiteSettings, RFQ } from '@/types';
import { CATALOG_PRODUCTS } from './catalog-products';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-human',
    name: 'Human Pharmaceutical Raw Materials',
    slug: 'human-raw-materials',
    description:
      'Antibiotics, anti-inflammatory APIs, anthelmintics, and pharmacopoeial excipients for human formulations.',
    sort_order: 1,
    is_published: true,
    name_ar: 'الخامات البشرية',
    description_ar:
      'مضادات حيوية ومسكنات ومضادات ديدان وسواغات دوائية معتمدة لتصنيع الأدوية البشرية.',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'cat-vet',
    name: 'Veterinary Raw Materials',
    slug: 'veterinary-raw-materials',
    description:
      'Veterinary antibiotics, quinolones, sulphonamides, anthelmintics, and feed-grade vitamins for animal health.',
    sort_order: 2,
    is_published: true,
    name_ar: 'الخامات البيطرية',
    description_ar:
      'مضادات حيوية بيطرية ومضادات طفيليات وفيتامينات أعلاف لصناعة الأدوية البيطرية والثروة الحيوانية.',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'cat-cosmetics',
    name: 'Cosmetics Raw Materials',
    slug: 'cosmetics-raw-materials',
    description:
      'Carbomers, UV blocking agents, surfactants, lanolin, emollients, and preservatives for personal care.',
    sort_order: 3,
    is_published: true,
    name_ar: 'خامات مستحضرات التجميل',
    description_ar:
      'كاربومير وفلاتر أشعة الشمس ومستحلبات ولانولين ومرطبات ومواد حافظة لمستحضرات التجميل.',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'cat-nutra',
    name: 'Nutraceutical Raw Materials',
    slug: 'nutraceutical-raw-materials',
    description:
      'Vitamins, gluconates, nutritional minerals, and food-grade sweeteners for dietary supplements.',
    sort_order: 4,
    is_published: true,
    name_ar: 'خامات المكملات الغذائية',
    description_ar:
      'فيتامينات وجلوكونات ومعادن غذائية ومحليات معتمدة لتصنيع المكملات الغذائية.',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-harvest',
    name: 'Harvest Pharma Logistics',
    description:
      'Sister company providing certified GDP-compliant and temperature-controlled pharmaceutical warehousing in Egypt.',
    logo_url: '/images/logo-harvest-pharma.png',
    website_url: 'https://www.harvestpharma-eg.com',
    partnership_type: 'Strategic Warehousing Partner',
    is_published: true,
    name_ar: 'هارفست فارما للخدمات اللوجستية',
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'sup-global-apis',
    name: 'Global BioActives Alliance',
    description: 'Audited international GMP synthesis partners for APIs, vitamins, and excipients.',
    logo_url: null,
    website_url: 'https://deltachem.com.eg',
    partnership_type: 'Authorized Principal',
    is_published: true,
    name_ar: 'شركاء التوريد العالميون المعتمدون',
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'sup-euroderma',
    name: 'Specialty Cosmeceutical Principals',
    description: 'Certified international suppliers of carbomers, UV filters, and cosmetic bases.',
    logo_url: null,
    website_url: 'https://deltachem.com.eg',
    partnership_type: 'Exclusive Agent',
    is_published: true,
    name_ar: 'موردو خامات التجميل التخصصية',
    created_at: '2025-01-01T00:00:00Z',
  },
];

export const INITIAL_PRODUCTS: Product[] = CATALOG_PRODUCTS;

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-001',
    title: 'Global Raw Material Sourcing & Supply Continuity',
    slug: 'pioneering-excellence-in-the-life-science-industry',
    excerpt:
      'How DELTACHEM links international chemical manufacturers with licensed plants across Egypt and MENA.',
    body: `<p>DELTACHEM operates as a strategic bridge between audited international raw-material manufacturers and licensed pharmaceutical, veterinary, cosmetic, and nutraceutical factories across Egypt.</p><h3>Storage & Logistics Integration</h3><p>Through our sister company <strong>Harvest Pharma</strong>, imported batches are stored under GDP-compliant conditions with continuous environmental monitoring for rapid domestic dispatch.</p>`,
    featured_image: null,
    author: 'Dr. Abdelhamid Aboelaly',
    category: 'Supply Chain',
    is_published: true,
    published_at: '2025-02-09T10:00:00Z',
    seo_title: 'Global Raw Material Sourcing | DELTACHEM Insights',
    seo_description: 'How DELTACHEM links global raw material suppliers with manufacturers in Egypt.',
    title_ar: 'سلاسل الإمداد العالمية وتوفير الخامات الدوائية',
    excerpt_ar: 'كيف تربط دلتا كيم المصانع العالمية بمصانع الدواء والتجميل في مصر والشرق الأوسط.',
    body_ar: `<p>تعمل دلتا كيم كشريك توريد واستيراد رئيسي يربط كبرى المصانع العالمية بمصانع الأدوية البشرية والبيطرية ومستحضرات التجميل والمكملات الغذائية في مصر.</p><p>وبالتكامل مع مستودعات شركتنا الشقيقة هارفست فارما، نضمن حفظ الخامات وفق معايير التوزيع الجيد GDP وسرعة التوريد لخطوط الإنتاج.</p>`,
    created_at: '2025-02-09T10:00:00Z',
    updated_at: '2025-02-09T10:00:00Z',
  },
  {
    id: 'art-002',
    title: 'Delta Chem Vision: Reliable B2B Chemical Distribution',
    slug: 'delta-chems-impact-and-vision',
    excerpt:
      'Dual commission agency and local stock-and-trade models tailored for industrial manufacturers.',
    body: `<p>Our mission at DELTACHEM is to guarantee uninterrupted access to USP, BP, EP, and FCC compliant raw materials through transparent contracting and direct local inventory.</p><p>Under the leadership of Dr. Abdelhamid Aboelaly, our team supports registration dossiers, batch sampling, and timely factory delivery.</p>`,
    featured_image: null,
    author: 'DELTACHEM Editorial Team',
    category: 'Corporate Vision',
    is_published: true,
    published_at: '2025-01-15T11:30:00Z',
    seo_title: 'Delta Chem Vision | B2B Raw Material Distribution',
    seo_description: 'Explore DELTACHEM supply models for Egypt pharmaceutical and industrial sectors.',
    title_ar: 'رؤية دلتا كيم في استيراد وتوزيع الخامات المعتمدة',
    excerpt_ar: 'نماذج التعاقد المباشر والمخزون المحلي لخدمة خطوط الإنتاج الدوائية والغذائية.',
    body_ar: `<p>تلتزم دلتا كيم بتأمين احتياجات المصانع من الخامات المطابقة لدساتير الأدوية الدولية عبر نظامي الوكالة التجارية المباشرة والتوريد من المخزون المحلي.</p>`,
    created_at: '2025-01-15T11:30:00Z',
    updated_at: '2025-01-15T11:30:00Z',
  },
  {
    id: 'art-003',
    title: 'Pharmacopoeial Standards & Batch Traceability',
    slug: 'raw-materials-and-ingredients-in-the-life-science-industry',
    excerpt:
      'Verifying USP, BP, EP, and CPV compliance with complete COA and registration dossiers.',
    body: `<p>Every raw material lot supplied by DELTACHEM is accompanied by verified Certificates of Analysis (COA), Safety Data Sheets, and registration documentation aligned with Egyptian Drug Authority (EDA) guidelines.</p>`,
    featured_image: null,
    author: 'DELTACHEM Quality Assurance',
    category: 'Quality & Regulatory',
    is_published: true,
    published_at: '2025-01-05T14:00:00Z',
    seo_title: 'Pharmacopoeial Standards & Traceability | DELTACHEM',
    seo_description: 'Compliance with USP, BP, EP, and CPV monographs and batch documentation.',
    title_ar: 'المعايير الدستورية وتتبع تشغيلات المواد الخام',
    excerpt_ar: 'الالتزام الكامل بدساتير الأدوية الدولية وتوفير ملفات التسجيل وشهادات التحليل.',
    body_ar: `<p>تُسلّم جميع التشغيلات مصحوبة بشهادات التحليل المخبري COA وصحائف السلامة والملفات التنظيمية الداعمة لإجراءات هيئة الدواء المصرية.</p>`,
    created_at: '2025-01-05T14:00:00Z',
    updated_at: '2025-01-05T14:00:00Z',
  },
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  company_info: {
    name: 'DELTACHEM Company',
    legal_name: 'DELTACHEM for Pharmaceutical Chemicals & Raw Materials',
    tagline: 'From Quality to Excellence',
    founder_ceo: 'Dr. Abdelhamid Aboelaly',
    headquarters_address: '64 Abdel Aziz Hegazy Street, El Togarieen, Gesr El-Suez, Cairo, Egypt',
    telephone: '0226988187 / 0226988217',
    email: 'sales@deltachem.com.eg',
    working_hours: 'Sunday - Thursday: 9:00 AM - 5:00 PM (Cairo Time)',
    warehouse_partner: 'Harvest Pharma Warehousing & Logistics',
    warehouse_website: 'https://www.harvestpharma-eg.com',
    linkedin_url: '',
    established: '2004',
    regions_served: ['Egypt', 'Saudi Arabia', 'UAE', 'Jordan', 'North Africa', 'MENA Region'],
  },
};

export const INITIAL_RFQS: RFQ[] = [
  {
    id: 'rfq-demo-01',
    reference_number: 'RFQ-2026-10492',
    company_name: 'PharmaCure Industries',
    contact_person: 'Dr. Tariq Mansour',
    email: 't.mansour@pharmacure.com.eg',
    phone: '+20 100 234 5678',
    product_id: 'prod-001',
    product_name: 'Amoxicillin Trihydrate',
    required_quantity: '500 kg',
    grade_spec: 'USP30 / BP2008 / EP6',
    application: 'Human Pharmaceutical Raw Materials',
    target_delivery_date: '2026-11-15',
    additional_comments: 'Require full Certificate of Analysis (COA) and 25KG/DRUM packing.',
    status: 'under_review',
    notification_status: 'sent',
    created_at: '2026-10-10T14:20:00Z',
  },
  {
    id: 'rfq-demo-02',
    reference_number: 'RFQ-2026-10493',
    company_name: 'NutraCare Laboratories',
    contact_person: 'Eng. Sarah Zaki',
    email: 's.zaki@nutracare-eg.com',
    phone: '+20 111 876 5432',
    product_id: 'prod-158',
    product_name: 'Ascorbic Acid (Vitamin C)',
    required_quantity: '250 kg',
    grade_spec: 'BP2012 / USP34 / EP7.0 / FCC7',
    application: 'Nutraceutical Raw Materials',
    target_delivery_date: '2026-11-01',
    additional_comments: 'Confirm stock availability in Harvest Pharma facility for prompt dispatch.',
    status: 'new',
    notification_status: 'sent',
    created_at: '2026-10-11T09:15:00Z',
  },
];
