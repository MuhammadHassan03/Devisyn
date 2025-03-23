'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function NewProject() {
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
      description: formData.get('description'),
      category: formData.get('category'),
      image: formData.get('image'),
      technologies: formData.get('technologies')?.toString().split('\n').map(tech => tech.trim()).filter(Boolean),
      features: formData.get('features')?.toString().split('\n').map(feature => feature.trim()).filter(Boolean),
      link: formData.get('projectLink'),
      order: parseInt(formData.get('displayOrder')?.toString() || '0'),
    };

    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">New Project</h1>
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
              <label className="block text-sm font-medium mb-1 text-foreground">Description</label>
              <textarea
                name="description"
                required
                rows={4}
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
              <label className="block text-sm font-medium mb-1 text-foreground">Technologies (comma-separated)</label>
              <input
                type="text"
                name="technologies"
                required
                className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Features (one per line)</label>
              <textarea
                name="features"
                required
                rows={4}
                className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Project Link</label>
              <input
                type="url"
                name="projectLink"
                required
                className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Display Order</label>
              <input
                type="number"
                name="displayOrder"
                required
                min="0"
                className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {error && (
              <div className="text-red-500 bg-red-500/10 p-4 rounded-lg">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 