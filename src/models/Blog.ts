export interface Blog {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  tags: string[];
  category: string;
  published: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  readingTime: number;
  views: number;
} 