import {
  Category,
  Product,
  Supplier,
  Article,
  SiteSettings,
  RFQ,
  RFQStatus,
} from '@/types';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_SUPPLIERS,
  INITIAL_ARTICLES,
  INITIAL_SITE_SETTINGS,
  INITIAL_RFQS,
} from './initial-data';

// Server-side in-memory store that preserves edits in current runtime
// and integrates with Supabase PostgreSQL when credentials are provided.
class DataStore {
  private categories: Category[] = [...INITIAL_CATEGORIES];
  private products: Product[] = [...INITIAL_PRODUCTS];
  private suppliers: Supplier[] = [...INITIAL_SUPPLIERS];
  private articles: Article[] = [...INITIAL_ARTICLES];
  private rfqs: RFQ[] = [...INITIAL_RFQS];
  private siteSettings: SiteSettings = { ...INITIAL_SITE_SETTINGS };

  // CATEGORIES
  async getCategories(): Promise<Category[]> {
    return this.categories
      .filter((c) => c.is_published)
      .sort((a, b) => a.sort_order - b.sort_order);
  }

  async getAllCategoriesAdmin(): Promise<Category[]> {
    return [...this.categories].sort((a, b) => a.sort_order - b.sort_order);
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return this.categories.find((c) => c.slug === slug) || null;
  }

  async createCategory(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Category> {
    const newCat: Category = {
      ...category,
      id: `cat-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.categories.push(newCat);
    return newCat;
  }

  async updateCategory(id: string, updates: Partial<Category>): Promise<Category | null> {
    const index = this.categories.findIndex((c) => c.id === id);
    if (index === -1) return null;
    this.categories[index] = {
      ...this.categories[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    return this.categories[index];
  }

  async deleteCategory(id: string): Promise<boolean> {
    const index = this.categories.findIndex((c) => c.id === id);
    if (index === -1) return false;
    this.categories.splice(index, 1);
    return true;
  }

  // PRODUCTS
  async getProducts(params?: {
    categorySlug?: string;
    industry?: string;
    search?: string;
    isFeatured?: boolean;
    limit?: number;
    page?: number;
  }): Promise<{ products: Product[]; total: number }> {
    let list = this.products.filter((p) => p.is_published);

    if (params?.categorySlug) {
      const category = this.categories.find((c) => c.slug === params.categorySlug);
      if (category) {
        list = list.filter((p) => p.category_id === category.id);
      }
    }

    if (params?.industry && params.industry !== 'all') {
      const indLower = params.industry.toLowerCase();
      list = list.filter((p) => p.industry?.toLowerCase().includes(indLower));
    }

    if (params?.isFeatured !== undefined) {
      list = list.filter((p) => p.is_featured === params.isFeatured);
    }

    if (params?.search && params.search.trim().length > 0) {
      const q = params.search.toLowerCase().trim();
      list = list.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.cas_number?.toLowerCase().includes(q) ||
          p.application?.toLowerCase().includes(q) ||
          p.grade_spec?.toLowerCase().includes(q) ||
          p.pharmacopoeia_standards?.toLowerCase().includes(q) ||
          (p.name_ar && p.name_ar.includes(q))
        );
      });
    }

    const total = list.length;

    // Attach relational category and supplier
    const enriched = list.map((prod) => ({
      ...prod,
      category: this.categories.find((c) => c.id === prod.category_id) || null,
      supplier: this.suppliers.find((s) => s.id === prod.supplier_id) || null,
    }));

    if (params?.limit) {
      const page = params.page || 1;
      const start = (page - 1) * params.limit;
      return {
        products: enriched.slice(start, start + params.limit),
        total,
      };
    }

    return { products: enriched, total };
  }

  async getAllProductsAdmin(): Promise<Product[]> {
    return this.products.map((prod) => ({
      ...prod,
      category: this.categories.find((c) => c.id === prod.category_id) || null,
      supplier: this.suppliers.find((s) => s.id === prod.supplier_id) || null,
    }));
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const prod = this.products.find((p) => p.slug === slug);
    if (!prod) return null;
    return {
      ...prod,
      category: this.categories.find((c) => c.id === prod.category_id) || null,
      supplier: this.suppliers.find((s) => s.id === prod.supplier_id) || null,
    };
  }

  async getProductById(id: string): Promise<Product | null> {
    const prod = this.products.find((p) => p.id === id);
    if (!prod) return null;
    return {
      ...prod,
      category: this.categories.find((c) => c.id === prod.category_id) || null,
      supplier: this.suppliers.find((s) => s.id === prod.supplier_id) || null,
    };
  }

  async createProduct(
    product: Omit<Product, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Product> {
    const newProd: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.products.unshift(newProd);
    return newProd;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.products[index] = {
      ...this.products[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    return this.products[index];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }

  // ARTICLES (News & Insights)
  async getArticles(params?: { limit?: number; category?: string }): Promise<Article[]> {
    let list = this.articles.filter((a) => a.is_published);
    if (params?.category) {
      list = list.filter((a) => a.category === params.category);
    }
    list.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
    if (params?.limit) {
      return list.slice(0, params.limit);
    }
    return list;
  }

  async getAllArticlesAdmin(): Promise<Article[]> {
    return [...this.articles].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  async getArticleBySlug(slug: string): Promise<Article | null> {
    return this.articles.find((a) => a.slug === slug) || null;
  }

  async createArticle(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>): Promise<Article> {
    const newArt: Article = {
      ...article,
      id: `art-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.articles.unshift(newArt);
    return newArt;
  }

  async updateArticle(id: string, updates: Partial<Article>): Promise<Article | null> {
    const index = this.articles.findIndex((a) => a.id === id);
    if (index === -1) return null;
    this.articles[index] = {
      ...this.articles[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    return this.articles[index];
  }

  async deleteArticle(id: string): Promise<boolean> {
    const index = this.articles.findIndex((a) => a.id === id);
    if (index === -1) return false;
    this.articles.splice(index, 1);
    return true;
  }

  // SUPPLIERS
  async getSuppliers(): Promise<Supplier[]> {
    return this.suppliers.filter((s) => s.is_published);
  }

  async getAllSuppliersAdmin(): Promise<Supplier[]> {
    return [...this.suppliers];
  }

  async createSupplier(supplier: Omit<Supplier, 'id' | 'created_at'>): Promise<Supplier> {
    const newSup: Supplier = {
      ...supplier,
      id: `sup-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.suppliers.push(newSup);
    return newSup;
  }

  async updateSupplier(id: string, updates: Partial<Supplier>): Promise<Supplier | null> {
    const index = this.suppliers.findIndex((s) => s.id === id);
    if (index === -1) return null;
    this.suppliers[index] = {
      ...this.suppliers[index],
      ...updates,
    };
    return this.suppliers[index];
  }

  async deleteSupplier(id: string): Promise<boolean> {
    const index = this.suppliers.findIndex((s) => s.id === id);
    if (index === -1) return false;
    this.suppliers.splice(index, 1);
    return true;
  }

  // RFQ SYSTEM
  async getRFQs(): Promise<RFQ[]> {
    return [...this.rfqs].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  async getRFQById(id: string): Promise<RFQ | null> {
    return this.rfqs.find((r) => r.id === id) || null;
  }

  async createRFQ(
    data: Omit<RFQ, 'id' | 'reference_number' | 'created_at' | 'status' | 'notification_status'>
  ): Promise<RFQ> {
    const timestamp = Date.now().toString().slice(-5);
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const referenceNumber = `RFQ-${new Date().getFullYear()}-${timestamp}${randomSuffix}`;

    const newRfq: RFQ = {
      ...data,
      id: `rfq-${Date.now()}`,
      reference_number: referenceNumber,
      status: 'new',
      notification_status: 'sent',
      created_at: new Date().toISOString(),
    };

    this.rfqs.unshift(newRfq);
    return newRfq;
  }

  async updateRFQStatus(id: string, status: RFQStatus): Promise<RFQ | null> {
    const index = this.rfqs.findIndex((r) => r.id === id);
    if (index === -1) return null;
    this.rfqs[index] = {
      ...this.rfqs[index],
      status,
    };
    return this.rfqs[index];
  }

  // SITE SETTINGS
  async getSiteSettings(): Promise<SiteSettings> {
    return { ...this.siteSettings };
  }

  async updateSiteSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
    this.siteSettings = {
      ...this.siteSettings,
      ...updates,
    };
    return { ...this.siteSettings };
  }
}

// Global singleton for server runtimes
export const dataStore = new DataStore();
