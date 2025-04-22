'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import RichTextEditor from '@/components/RichTextEditor';
import { generateSlug } from '@/lib/utils';
import { FiUpload } from 'react-icons/fi';
import ImageCropper from '@/components/ImageCropper';

interface Blog {
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

export default function CreateBlogPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [blog, setBlog] = useState<Blog>({
    title: '',
    slug: '',
    content: '',
    featuredImage: '',
    status: 'draft',
    excerpt: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    readTime: 0,
    ogImage: '',
    canonicalUrl: '',
    schemaMarkup: ''
  });
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = generateSlug(title);
    setBlog({ ...blog, title, slug, metaTitle: title });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    try {
      // Read the file as base64
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setTempImage(event.target.result as string);
          setShowCropper(true);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error reading image:', error);
      toast.error('Failed to read image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    setBlog({ ...blog, featuredImage: croppedImage, ogImage: croppedImage });
    setShowCropper(false);
    setTempImage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
      });

      if (response.ok) {
        toast.success('Blog created successfully');
        router.push('/admin/dashboard');
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to create blog');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error('Failed to create blog');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      {showCropper && (
        <ImageCropper
          image={tempImage}
          onCropComplete={handleCropComplete}
          onCancel={() => {
            setShowCropper(false);
            setTempImage('');
          }}
          aspectRatio={16/9}
        />
      )}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={blog.title}
              onChange={handleTitleChange}
              className="w-full px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slug (auto-generated)</label>
            <input
              type="text"
              value={blog.slug}
              readOnly
              className="w-full px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Excerpt</label>
            <textarea
              value={blog.excerpt}
              onChange={(e) => setBlog({ ...blog, excerpt: e.target.value, metaDescription: e.target.value })}
              className="w-full px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Featured Image</label>
            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors group relative"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {blog.featuredImage ? (
                  <div className="relative w-full aspect-video">
                    <img
                      src={blog.featuredImage}
                      alt="Featured"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setBlog({ ...blog, featuredImage: '', ogImage: '' });
                        }}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <FiUpload className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-full aspect-video bg-[#1A1A1A] rounded-lg flex items-center justify-center mb-4">
                      <FiUpload className="w-12 h-12 text-white/50 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <p className="text-white/70 group-hover:text-blue-500 transition-colors">Click to upload or drag and drop</p>
                    <p className="text-sm text-white/50 mt-2">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
              {uploadingImage && (
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Uploading image...</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <div className="bg-[#1A1A1A] border border-white/10 rounded-lg p-4">
              <RichTextEditor
                content={blog.content}
                onChange={(content) => setBlog({ ...blog, content })}
                imageResize={true}
                imageCrop={true}
                imageUpload={true}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">SEO Settings</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">Meta Title</label>
              <input
                type="text"
                value={blog.metaTitle}
                onChange={(e) => setBlog({ ...blog, metaTitle: e.target.value })}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="SEO title for search engines"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Meta Description</label>
              <textarea
                value={blog.metaDescription}
                onChange={(e) => setBlog({ ...blog, metaDescription: e.target.value })}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="SEO description for search engines"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Meta Keywords</label>
              <input
                type="text"
                value={blog.metaKeywords}
                onChange={(e) => setBlog({ ...blog, metaKeywords: e.target.value })}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Comma-separated keywords for SEO"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Canonical URL</label>
              <input
                type="text"
                value={blog.canonicalUrl}
                onChange={(e) => setBlog({ ...blog, canonicalUrl: e.target.value })}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Canonical URL for duplicate content"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Schema Markup</label>
              <textarea
                value={blog.schemaMarkup}
                onChange={(e) => setBlog({ ...blog, schemaMarkup: e.target.value })}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="JSON-LD schema markup for rich snippets"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={blog.status}
              onChange={(e) => setBlog({ ...blog, status: e.target.value as 'draft' | 'published' })}
              className="w-full px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Read Time (minutes)</label>
            <input
              type="number"
              value={blog.readTime}
              onChange={(e) => setBlog({ ...blog, readTime: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard')}
              className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Creating...' : 'Create Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 