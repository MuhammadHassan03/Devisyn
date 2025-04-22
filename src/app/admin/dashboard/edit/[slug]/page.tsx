'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import RichTextEditor from '@/components/RichTextEditor';
import { generateSlug } from '@/lib/utils';
import { FiUpload } from 'react-icons/fi';
import ImageCropper from '@/components/ImageCropper';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  status: 'draft' | 'published';
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  readTime: number;
  ogImage: string;
  canonicalUrl: string;
  schemaMarkup: string;
}

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/blogs/${params.slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            toast.error('Blog post not found');
            router.push('/admin/dashboard');
            return;
          }
          throw new Error('Failed to fetch blog');
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Failed to fetch blog');
        setError('Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchBlog();
    }
  }, [params.slug, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/blogs/${blog.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
      });

      if (!response.ok) {
        throw new Error('Failed to update blog');
      }

      toast.success('Blog updated successfully');
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof Blog, value: any) => {
    if (!blog) return;

    if (field === 'title') {
      setBlog({
        ...blog,
        [field]: value,
        slug: generateSlug(value),
      });
    } else {
      setBlog({
        ...blog,
        [field]: value,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Error Loading Blog</h1>
          <p className="text-gray-400 mb-6">{error || 'Blog not found'}</p>
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Edit Blog Post</h1>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => router.push('/admin/dashboard')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-6 bg-[#1A1A1A] p-6 rounded-lg">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={blog.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-200 mb-2">
                Slug (auto-generated)
              </label>
              <input
                type="text"
                id="slug"
                value={blog.slug}
                className="w-full px-4 py-2 bg-[#2A2A2A] text-gray-400 rounded-lg cursor-not-allowed"
                readOnly
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-200 mb-2">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                value={blog.excerpt}
                onChange={(e) => handleChange('excerpt', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Content
              </label>
              <RichTextEditor
                value={blog.content}
                onChange={(value) => handleChange('content', value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Status
              </label>
              <select
                value={blog.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* SEO Fields */}
            <div className="border-t border-gray-700 pt-6 mt-6">
              <h2 className="text-xl font-semibold text-white mb-4">SEO Settings</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-200 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    id="metaTitle"
                    value={blog.metaTitle}
                    onChange={(e) => handleChange('metaTitle', e.target.value)}
                    className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-200 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    id="metaDescription"
                    value={blog.metaDescription}
                    onChange={(e) => handleChange('metaDescription', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-200 mb-2">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    id="metaKeywords"
                    value={blog.metaKeywords}
                    onChange={(e) => handleChange('metaKeywords', e.target.value)}
                    className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Comma-separated keywords"
                  />
                </div>

                <div>
                  <label htmlFor="canonicalUrl" className="block text-sm font-medium text-gray-200 mb-2">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    id="canonicalUrl"
                    value={blog.canonicalUrl}
                    onChange={(e) => handleChange('canonicalUrl', e.target.value)}
                    className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 