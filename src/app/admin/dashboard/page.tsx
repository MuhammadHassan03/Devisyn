'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiLogOut, FiPlus, FiEdit2, FiTrash2, FiBook, FiEye } from 'react-icons/fi';
import { IconType } from 'react-icons';
import Image from 'next/image';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  createdAt: string;
  slug: string;
  status: 'draft' | 'published';
}

const DEFAULT_IMAGE = '/images/default-blog.svg';

// Function to strip HTML tags and limit text length
const stripHtml = (html: string, maxLength: number = 150) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const text = tmp.textContent || tmp.innerText || '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const IconWrapper = ({ icon: Icon, className }: { icon: IconType; className?: string }) => (
  <div className={className}>
    <Icon size={20} />
  </div>
);

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/me');
        if (!response.ok) {
          toast.error('Please login to access the dashboard');
          router.push('/admin');
          return;
        }
        fetchBlogs();
      } catch (error) {
        console.error('Auth check failed:', error);
        toast.error('Authentication failed');
        router.push('/admin');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs?admin=true');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      setBlogs(data.blogs || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs');
      setBlogs([]);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Blog deleted successfully');
        fetchBlogs();
      } else {
        toast.error('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to logout');
      
      const data = await response.json();
      toast.success(data.message || 'Logged out successfully');
      
      // Wait a bit for the toast to show
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to admin login page
      router.push('/admin');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to logout');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-[#1A1A1A] p-4 lg:p-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          
          <Link 
            href="/admin/dashboard/create"
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
          >
            <FiPlus className="w-5 h-5" />
            <span>New Blog</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
          >
            <FiLogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Blog Posts</h1>
            <button
              onClick={() => router.push('/admin/dashboard/create')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New Blog
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1A1A1A] rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
              >
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
                  <h2 className="text-xl font-semibold text-white mb-2">{blog.title}</h2>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {blog.excerpt ? stripHtml(blog.excerpt) : stripHtml(blog.content)}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`px-2 py-1 rounded text-sm ${
                      blog.status === 'published' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {blog.status}
                    </span>
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/dashboard/edit/${blog.slug}`}
                        className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <FiEdit2 />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}