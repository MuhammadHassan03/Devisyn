'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaTwitter, FaLinkedin, FaArrowLeft, FaEdit } from 'react-icons/fa';
import { formatDate, calculateReadTime } from '@/lib/utils';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Blog {
  _id: string;
  title: string;
  content: string;
  featuredImage: string;
  createdAt: string;
  author: string;
  slug: string;
  readTime?: number;
  excerpt?: string;
}

const BlogPostSkeleton = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="bg-[#1A1A1A] rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-video bg-gray-700"></div>
      <div className="p-6">
        <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-4 bg-gray-700 rounded w-32"></div>
          <div className="h-4 bg-gray-700 rounded w-24"></div>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-700 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  </div>
);

const NotFoundPage = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-[calc(100vh-80px)] pt-20 bg-[#0A0A0A]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center py-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1A1A1A] p-8 rounded-lg shadow-lg max-w-md mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">Blog Post Not Found</h2>
          <p className="text-gray-400 mb-6">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col space-y-4">
            <button
              onClick={onBack}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span className="mr-2">
                <FaArrowLeft />
              </span>
              Back to Blog
            </button>
            <Link
              href="/blog"
              className="flex items-center justify-center px-6 py-3 bg-[#2A2A2A] text-white rounded-lg hover:bg-[#3A3A3A] transition-colors"
            >
              Browse All Posts
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/blogs/${params.slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError('Blog not found');
          } else {
            setError('Failed to fetch blog');
          }
          return;
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchBlog();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="relative min-h-[calc(100vh-80px)] mt-20 bg-[#0A0A0A]">
        <BlogPostSkeleton />
      </div>
    );
  }

  if (error || !blog) {
    return <NotFoundPage onBack={() => router.push('/blog')} />;
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this blog post: ${blog.title}`;

  return (
    <div className="relative min-h-[calc(100vh-80px)] mt-20 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1A1A1A] rounded-lg overflow-hidden"
        >
          <div className="relative aspect-video">
            {blog.featuredImage ? (
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400">No featured image</span>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-white">{blog.title}</h1>
              <Link
                href={`/admin/dashboard/edit/${blog.slug}`}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="mr-2">
                  <FaEdit />
                </span>
                Edit
              </Link>
            </div>
            
            <div className="flex items-center text-gray-400 mb-6">
              <span>{formatDate(blog.createdAt)}</span>
              <span className="mx-2">•</span>
              <span>{blog.readTime || calculateReadTime(blog.content)} min read</span>
            </div>

            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <div className="mt-8 pt-6 border-t border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Share this post</h2>
              <div className="flex space-x-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
} 