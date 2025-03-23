'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function EditService({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [service, setService] = useState<any>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/admin/services/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch service');
        }
        const data = await response.json();
        setService(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch service');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      icon: formData.get('icon'),
      features: formData.get('features')?.toString().split('\n').map(feature => feature.trim()).filter(Boolean),
      technologies: formData.get('technologies')?.toString().split('\n').map(tech => tech.trim()).filter(Boolean),
      order: parseInt(formData.get('order')?.toString() || '0'),
    };

    try {
      const response = await fetch(`/api/admin/services/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update service');
      }

      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update service');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-red-500">Service not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">Edit Service</h1>
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
        ) : service ? (
          <div className="bg-secondary/5 rounded-xl p-4 sm:p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={service.title}
                  className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Description</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  defaultValue={service.description}
                  className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Icon (e.g., "Code", "Design", "Marketing")</label>
                <input
                  type="text"
                  name="icon"
                  required
                  defaultValue={service.icon}
                  className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Features (one per line)</label>
                <textarea
                  name="features"
                  required
                  rows={4}
                  defaultValue={service.features.join('\n')}
                  className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Technologies (comma-separated)</label>
                <input
                  type="text"
                  name="technologies"
                  required
                  defaultValue={service.technologies.join(', ')}
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
                  defaultValue={service.displayOrder}
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