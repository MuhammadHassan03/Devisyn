'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Post } from '@/models/Post';
import { Service } from '@/models/Service';
import { Project } from '@/models/Project';
import { Setting } from '@/models/Setting';
import type { Document, Types } from 'mongoose';

type Tab = 'posts' | 'services' | 'projects' | 'settings';

type PostDocument = Document & {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: {
    name: string;
    image: string;
    role: string;
  };
  date: string;
  readTime: string;
  featured: boolean;
  published: boolean;
  tags: string[];
  createdAt: string;
};

type ServiceDocument = Document & {
  _id: Types.ObjectId;
  title: string;
  description: string;
  icon: string;
  features: string[];
  technologies: string[];
  order: number;
};

type ProjectDocument = Document & {
  _id: Types.ObjectId;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  features: string[];
  link: string;
  order: number;
};

type SettingDocument = Document & {
  _id: Types.ObjectId;
  siteName: string;
  logo: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    twitter: string;
    linkedin: string;
    github: string;
  };
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
};

export default function AdminPanel() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>('posts');
  const [posts, setPosts] = useState<PostDocument[]>([]);
  const [services, setServices] = useState<ServiceDocument[]>([]);
  const [projects, setProjects] = useState<ProjectDocument[]>([]);
  const [settings, setSettings] = useState<SettingDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postsRes, servicesRes, projectsRes, settingsRes] = await Promise.all([
          fetch('/api/admin/posts'),
          fetch('/api/admin/services'),
          fetch('/api/admin/projects'),
          fetch('/api/admin/settings'),
        ]);

        if (!postsRes.ok || !servicesRes.ok || !projectsRes.ok || !settingsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [postsData, servicesData, projectsData, settingsData] = await Promise.all([
          postsRes.json(),
          servicesRes.json(),
          projectsRes.json(),
          settingsRes.json(),
        ]);

        setPosts(postsData);
        setServices(servicesData);
        setProjects(projectsData);
        setSettings(settingsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  const handleDelete = async (type: Tab, id: Types.ObjectId) => {
    try {
      const response = await fetch(`/api/admin/${type}/${id.toString()}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      // Update state based on type
      switch (type) {
        case 'posts':
          setPosts(posts.filter(post => post._id.toString() !== id.toString()));
          break;
        case 'services':
          setServices(services.filter(service => service._id.toString() !== id.toString()));
          break;
        case 'projects':
          setProjects(projects.filter(project => project._id.toString() !== id.toString()));
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
    }
  };

  const handleUpdateSettings = async (newSettings: Partial<SettingDocument>) => {
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      });

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }

      const updatedSettings = await response.json();
      setSettings(updatedSettings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update settings');
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

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          <button
            onClick={() => router.push('/')}
            className="w-full sm:w-auto px-6 py-2 bg-secondary/10 text-foreground rounded-lg hover:bg-secondary/20 transition-colors"
          >
            Back to Site
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {(['posts', 'services', 'projects', 'settings'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : 'bg-secondary/10 text-foreground hover:bg-secondary/20'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-secondary/5 rounded-xl p-4 sm:p-6 shadow-lg">
          {activeTab === 'posts' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Blog Posts</h2>
                <button
                  onClick={() => router.push('/admin/posts/new')}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  New Post
                </button>
              </div>
              <div className="grid gap-4">
                {posts.map((post) => (
                  <div
                    key={post._id.toString()}
                    className="bg-secondary/10 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{post.title}</h3>
                      <p className="text-sm text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2 w-full sm:w-auto">
                      <button
                        onClick={() => router.push(`/admin/posts/${post._id.toString()}`)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete('posts', post._id)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Services</h2>
                <button
                  onClick={() => router.push('/admin/services/new')}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  New Service
                </button>
              </div>
              <div className="grid gap-4">
                {services.map((service) => (
                  <div
                    key={service._id.toString()}
                    className="bg-secondary/10 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{service.title}</h3>
                      <p className="text-sm text-gray-400">{service.description}</p>
                    </div>
                    <div className="flex space-x-2 w-full sm:w-auto">
                      <button
                        onClick={() => router.push(`/admin/services/${service._id.toString()}`)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete('services', service._id)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Projects</h2>
                <button
                  onClick={() => router.push('/admin/projects/new')}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  New Project
                </button>
              </div>
              <div className="grid gap-4">
                {projects.map((project) => (
                  <div
                    key={project._id.toString()}
                    className="bg-secondary/10 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{project.title}</h3>
                      <p className="text-sm text-gray-400">{project.category}</p>
                    </div>
                    <div className="flex space-x-2 w-full sm:w-auto">
                      <button
                        onClick={() => router.push(`/admin/projects/${project._id.toString()}`)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete('projects', project._id)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && settings && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Website Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-foreground">Site Name</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => handleUpdateSettings({ ...settings, siteName: e.target.value })}
                    className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-foreground">Logo URL</label>
                  <input
                    type="text"
                    value={settings.logo}
                    onChange={(e) => handleUpdateSettings({ ...settings, logo: e.target.value })}
                    className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-foreground">Description</label>
                  <textarea
                    value={settings.description}
                    onChange={(e) => handleUpdateSettings({ ...settings, description: e.target.value })}
                    className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-foreground">Contact Email</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleUpdateSettings({ ...settings, email: e.target.value })}
                    className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-foreground">Phone Number</label>
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => handleUpdateSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-foreground">Address</label>
                  <textarea
                    value={settings.address}
                    onChange={(e) => handleUpdateSettings({ ...settings, address: e.target.value })}
                    className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-foreground">Social Media Links</label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      placeholder="Twitter URL"
                      value={settings.socialMedia.twitter}
                      onChange={(e) => handleUpdateSettings({
                        ...settings,
                        socialMedia: { ...settings.socialMedia, twitter: e.target.value }
                      })}
                      className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="url"
                      placeholder="LinkedIn URL"
                      value={settings.socialMedia.linkedin}
                      onChange={(e) => handleUpdateSettings({
                        ...settings,
                        socialMedia: { ...settings.socialMedia, linkedin: e.target.value }
                      })}
                      className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="url"
                      placeholder="GitHub URL"
                      value={settings.socialMedia.github}
                      onChange={(e) => handleUpdateSettings({
                        ...settings,
                        socialMedia: { ...settings.socialMedia, github: e.target.value }
                      })}
                      className="w-full px-4 py-2 bg-secondary/10 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-foreground">Theme Colors</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs mb-1 text-foreground">Primary</label>
                      <input
                        type="color"
                        value={settings.colors.primary}
                        onChange={(e) => handleUpdateSettings({
                          ...settings,
                          colors: { ...settings.colors, primary: e.target.value }
                        })}
                        className="w-full h-10 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-foreground">Secondary</label>
                      <input
                        type="color"
                        value={settings.colors.secondary}
                        onChange={(e) => handleUpdateSettings({
                          ...settings,
                          colors: { ...settings.colors, secondary: e.target.value }
                        })}
                        className="w-full h-10 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-foreground">Background</label>
                      <input
                        type="color"
                        value={settings.colors.background}
                        onChange={(e) => handleUpdateSettings({
                          ...settings,
                          colors: { ...settings.colors, background: e.target.value }
                        })}
                        className="w-full h-10 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 