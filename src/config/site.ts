export const siteConfig = {
  name: 'DELTACHEM',
  fullName: 'DELTACHEM Company for Pharmaceutical & Life Science Ingredients',
  tagline: 'Pharmaceutical, Veterinary, Cosmetic & Nutraceutical Raw Materials',
  description:
    'Importer and distributor of certified human pharmaceutical, veterinary, cosmetic, and nutraceutical raw materials in Egypt and the MENA region.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://deltachem.com.eg',
  contact: {
    address: '64 Abdel Aziz Hegazy Street, El Togarieen, Gesr El-Suez, Cairo, Egypt',
    address_ar: '٦٤ شارع عبد العزيز حجازي، التجاريين، جسر السويس، القاهرة، مصر',
    mapsQuery: '64 Abdel Aziz Hegazy Street, El Togarieen, Gesr El-Suez, Cairo, Egypt',
    mapsEmbedUrl:
      'https://maps.google.com/maps?q=64+Abdel+Aziz+Hegazy+Street,+El+Togarieen,+Gesr+El-Suez,+Cairo,+Egypt&t=&z=16&ie=UTF8&iwloc=&output=embed',
    mapsDirectUrl:
      'https://www.google.com/maps/search/?api=1&query=64+Abdel+Aziz+Hegazy+Street,+El+Togarieen,+Gesr+El-Suez,+Cairo,+Egypt',
    phone: '0226988187',
    phoneClean: '+20226988187',
    phoneSecondary: '0226988217',
    phoneSecondaryClean: '+20226988217',
    landlines: [
      { display: '0226988187', tel: '+20226988187' },
      { display: '0226988217', tel: '+20226988217' },
    ],
    mobiles: [
      { display: '01003875503', tel: '+201003875503', whatsapp: 'https://wa.me/201003875503' },
      { display: '01210110609', tel: '+201210110609', whatsapp: 'https://wa.me/201210110609' },
    ],
    email: 'sales@deltachem.com.eg',
    salesEmail: 'sales@deltachem.com.eg',
    hours: 'Sunday - Thursday: 9:00 AM - 5:00 PM (Cairo Time)',
    hours_ar: 'الأحد - الخميس: ٩:٠٠ ص - ٥:٠٠ م (توقيت القاهرة)',
    workingHours: 'Sunday - Thursday: 9:00 AM - 5:00 PM (Cairo Time)',
    workingHours_ar: 'الأحد - الخميس: ٩:٠٠ ص - ٥:٠٠ م (توقيت القاهرة)',
    warehousePartner: 'Harvest Pharma Logistics (Cairo)',
    warehousePartner_ar: 'لوجستيات هارفست فارما (القاهرة)',
    warehouseUrl: 'https://www.harvestpharma-eg.com',
  },
  socials: {
    linkedin: '',
    facebook: '',
    whatsappPrimary: 'https://wa.me/201003875503',
    whatsappSecondary: 'https://wa.me/201210110609',
  },
  nav: [
    {
      title: 'Products',
      title_ar: 'المنتجات',
      href: '/products',
      children: [
        {
          title: 'Human Pharmaceutical Raw Materials',
          title_ar: 'الخامات البشرية',
          href: '/divisions/human-raw-materials',
          desc: 'Human antibiotics, analgesics, anthelmintics, and pharma excipients',
        },
        {
          title: 'Veterinary Raw Materials',
          title_ar: 'الخامات البيطرية',
          href: '/divisions/veterinary-raw-materials',
          desc: 'Veterinary antibiotics, antiparasitics, and feed-grade vitamins',
        },
        {
          title: 'Cosmetics Raw Materials',
          title_ar: 'خامات مستحضرات التجميل',
          href: '/divisions/cosmetics-raw-materials',
          desc: 'Carbomers, UV filters, emollients, surfactants, and preservatives',
        },
        {
          title: 'Nutraceutical Raw Materials',
          title_ar: 'خامات المكملات الغذائية',
          href: '/divisions/nutraceutical-raw-materials',
          desc: 'Vitamins, gluconates, minerals, and food-grade sweeteners',
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
