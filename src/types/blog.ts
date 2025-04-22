export interface Blog {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string; // Base64 encoded image
  videoUrl?: string;
  author: string;
  tags: string[];
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  readTime?: number;
  ogImage?: string; // Base64 encoded image
  canonicalUrl?: string;
  schemaMarkup?: string;
} 