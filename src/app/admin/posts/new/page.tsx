'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function NewPost() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      excerpt: formData.get('excerpt'),
      content: formData.get('content'),
      image: formData.get('image'),
      category: formData.get('category'),
      author: {
        name: formData.get('authorName'),
        image: formData.get('authorImage'),
        role: formData.get('authorRole'),
      },
      date: new Date().toISOString(),
      readTime: formData.get('readTime'),
      featured: formData.get('featured') === 'true',
      published: formData.get('published') === 'true',
      tags: formData.get('tags')?.toString().split(',').map(tag => tag.trim()),
    };

    try {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">New Post</h1>
          <button
            onClick={() => router.push('/admin')}
            className="w-full sm:w-auto px-6 py-2 bg-secondary/10 text-foreground rounded-lg hover:bg-secondary/20 transition-colors"
          >
            Back to Admin
          </button>
        </div>

        <div className="bg-secondary/5 rounded-xl p-4 sm:p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Title</label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Excerpt</label>
              <textarea
                name="excerpt"
                required
                rows={3}
                className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Content</label>
              <textarea
                name="content"
                required
                rows={10}
                className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Image URL</label>
              <input
                type="url"
                name="image"
                required
                className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Category</label>
              <input
                type="text"
                name="category"
                required
                className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Author Name</label>
                <input
                  type="text"
                  name="authorName"
                  required
                  className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Author Image URL</label>
                <input
                  type="url"
                  name="authorImage"
                  required
                  className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Author Role</label>
                <input
                  type="text"
                  name="authorRole"
                  required
                  className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Read Time (e.g., "5 min read")</label>
              <input
                type="text"
                name="readTime"
                required
                className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2 text-foreground">
                <input
                  type="checkbox"
                  name="featured"
                  value="true"
                  className="rounded bg-secondary/10 border-secondary/20 text-primary focus:ring-primary"
                />
                <span>Featured</span>
              </label>
              <label className="flex items-center space-x-2 text-foreground">
                <input
                  type="checkbox"
                  name="published"
                  value="true"
                  className="rounded bg-secondary/10 border-secondary/20 text-primary focus:ring-primary"
                />
                <span>Published</span>
              </label>
            </div>

            {error && (
              <div className="text-red-500 bg-red-500/10 p-4 rounded-lg">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 