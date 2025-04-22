import { Metadata } from 'next';
import clientPromise from '@/lib/mongodb';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const client = await clientPromise;
  const db = client.db('devisyn');
  const blog = await db.collection('blogs').findOne({ slug: params.slug });

  if (!blog) {
    return {
      title: 'Blog Post Not Found | Devisyn',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${blog.title} | Devisyn Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      publishedTime: blog.createdAt,
      authors: [blog.author || 'Devisyn Team'],
      images: blog.featuredImage ? [blog.featuredImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: blog.featuredImage ? [blog.featuredImage] : [],
    },
  };
} 