'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function EditProject({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/admin/projects/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      image: formData.get('image'),
      technologies: (formData.get('technologies') as string).split(',').map(t => t.trim()),
      features: (formData.get('features') as string).split('\n').filter(f => f.trim()),
      projectLink: formData.get('projectLink'),
      displayOrder: parseInt(formData.get('displayOrder') as string),
    };

    try {
      const response = await fetch(`/api/admin/projects/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">Edit Project</h1>
          <button
            onClick={() => router.push('/admin')}
            className="w-full sm:w-auto px-6 py-2 bg-secondary/10 text-foreground rounded-lg hover:bg-secondary/20 transition-colors"
          >
            Back to Admin
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-red-500 bg-red-500/10 p-4 rounded-lg">{error}</div>
        ) : project ? (
          <div className="bg-secondary/5 rounded-xl p-4 sm:p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={project.title}
                  className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Description</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  defaultValue={project.description}
                  className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Category</label>
                <input
                  type="text"
                  name="category"
                  required
                  defaultValue={project.category}
                  className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Image URL</label>
                <input
                  type="url"
                  name="image"
                  required
                  defaultValue={project.image}
                  className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Technologies (comma-separated)</label>
                <input
                  type="text"
                  name="technologies"
                  required
                  defaultValue={project.technologies.join(', ')}
                  className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Features (one per line)</label>
                <textarea
                  name="features"
                  required
                  rows={4}
                  defaultValue={project.features.join('\n')}
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
                  defaultValue={project.projectLink}
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
                  defaultValue={project.displayOrder}
                  className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
} 