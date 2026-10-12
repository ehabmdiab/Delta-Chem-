export const siteConfig = {
  name: 'DELTACHEM',
  fullName: 'DELTACHEM Company for Life Science Products & Ingredients',
  tagline: 'Premium B2B Pharmaceutical, Nutraceutical, Veterinary & Cosmetic Ingredients',
  description:
    'Leading B2B distributor and supplier of Active Pharmaceutical Ingredients (APIs), excipients, nutraceutical raw materials, veterinary APIs, and cosmetic actives in Egypt and the MENA region.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://deltachem.com.eg',
  contact: {
    address: '66 Gamal El-Deen Zaki st, Gesr El-Suez, Cairo, Egypt',
    phone: '(202) 26988187',
    phoneClean: '+20226988187',
    email: 'sales@deltachem.com.eg',
    salesEmail: 'sales@deltachem.com.eg',
    hours: 'Sunday - Thursday: 9:00 AM - 5:00 PM (GMT+2)',
    workingHours: 'Sunday - Thursday: 9:00 AM - 5:00 PM (Cairo Time)',
    warehousePartner: 'Harvest Pharma Logistics (Cairo)',
    warehouseUrl: 'https://www.harvestpharma-eg.com',
  },
  socials: {
    linkedin: 'https://www.linkedin.com/company/deltachem-egypt',
  },
  nav: [
    {
      title: 'Products',
      title_ar: 'المنتجات',
      href: '/products',
      children: [
        {
          title: 'Active Pharmaceutical Ingredients (APIs)',
          title_ar: 'المواد الفعالة الصيدلانية',
          href: '/divisions/pharmaceutical-apis',
          desc: 'GMP-certified oral and injectable active substances',
        },
        {
          title: 'Pharmaceutical Excipients',
          title_ar: 'السواغات الصيدلانية',
          href: '/divisions/pharmaceutical-excipients',
          desc: 'Binders, superdisintegrants, and coating polymers',
        },
        {
          title: 'Nutraceutical Ingredients',
          title_ar: 'مكونات المكملات الغذائية',
          href: '/divisions/nutraceutical-ingredients',
          desc: 'Vitamins, amino acids, and high-potency bioactives',
        },
        {
          title: 'Veterinary Ingredients',
          title_ar: 'المكونات البيطرية والصحة الحيوانية',
          href: '/divisions/veterinary-ingredients',
          desc: 'Antibiotics and premixes for animal therapeutics',
        },
        {
          title: 'Cosmeceuticals & Personal Care',
          title_ar: 'مكونات مستحضرات التجميل',
          href: '/divisions/cosmeceuticals-ingredients',
          desc: 'UV filters, hyaluronic specialties, and skin bio-actives',
        },
      ],
    },
    {
      title: 'About Us',
      title_ar: 'عن دلتا كيم',
      href: '/about',
    },
    {
      title: 'Services',
      title_ar: 'الخدمات',
      href: '/services',
    },
    {
      title: 'Quality & Regulatory',
      title_ar: 'الجودة والشؤون التنظيمية',
      href: '/quality-regulatory',
    },
    {
      title: 'Supply Chain',
      title_ar: 'سلاسل الإمداد والتخزين',
      href: '/supply-chain',
    },
    {
      title: 'Industries',
      title_ar: 'القطاعات الصناعية',
      href: '/industries',
    },
    {
      title: 'Global Partners',
      title_ar: 'شركاؤنا العالميون',
      href: '/partners',
    },
    {
      title: 'Insights',
      title_ar: 'الأخبار والمقالات',
      href: '/insights',
    },
    {
      title: 'Contact',
      title_ar: 'اتصل بنا',
      href: '/contact',
    },
  ],
};

export const SITE_CONFIG = siteConfig;
