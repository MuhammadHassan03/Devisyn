'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiClock, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  createdAt: string;
  slug: string;
  readTime?: number;
}

const DEFAULT_IMAGE = '/images/default-blog.svg';
const ITEMS_PER_PAGE = 6;

// Function to strip HTML tags and limit text length
const stripHtml = (html: string, maxLength: number = 150) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const text = tmp.textContent || tmp.innerText || '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const BlogSkeleton = () => (
  <div className="bg-[#1A1A1A] rounded-lg overflow-hidden animate-pulse">
    <div className="aspect-video bg-gray-700"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-700 rounded w-4/6"></div>
      </div>
      <div className="flex items-center mt-4">
        <div className="h-4 bg-gray-700 rounded w-16"></div>
      </div>
    </div>
  </div>
);

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/blogs?page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
        if (response.ok) {
          const data = await response.json();
          setBlogs(data.blogs || []);
          setTotalPages(Math.ceil((data.total || 0) / ITEMS_PER_PAGE));
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Blog Posts</h1>
          <p className="text-gray-400">Discover our latest articles and insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <BlogSkeleton />
              </motion.div>
            ))
          ) : blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-[#1A1A1A] rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col cursor-pointer"
              >
                <Link href={`/blog/${blog.slug}`} className="flex flex-col h-full">
                  <div className="relative aspect-video bg-[#1A1A1A]">
                    {blog.featuredImage ? (
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={DEFAULT_IMAGE}
                        alt="Default blog image"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold text-white mb-2 hover:text-blue-400 transition-colors">{blog.title}</h2>
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {blog.excerpt ? stripHtml(blog.excerpt) : stripHtml(blog.content)}
                    </p>
                    <div className="flex items-center text-gray-400 mt-auto">
                      <FiClock className="mr-2" />
                      <span>{blog.readTime || 5} min read</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-white/70 py-12">
              No blog posts found
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-[#1A1A1A] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2A2A2A] transition-colors"
            >
              <FiChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#1A1A1A] text-white hover:bg-[#2A2A2A]'
                } transition-colors`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-[#1A1A1A] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2A2A2A] transition-colors"
            >
              <FiChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 