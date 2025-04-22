'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiSave, FiSettings, FiHome, FiUsers, FiMail, FiGlobe, FiImage } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import RichTextEditor from '@/components/RichTextEditor';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
  };
  about: {
    title: string;
    description: string;
    image: string;
    features: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  services: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
      icon: string;
      image: string;
    }[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: {
      name: string;
      role: string;
      company: string;
      content: string;
      image: string;
    }[];
  };
  team: {
    title: string;
    subtitle: string;
    members: {
      name: string;
      role: string;
      bio: string;
      image: string;
      socialLinks: {
        linkedin: string;
        twitter: string;
      };
    }[];
  };
  contact: {
    title: string;
    subtitle: string;
    address: string;
    email: string;
    phone: string;
    mapEmbed: string;
  };
}

export default function SiteSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: '',
    siteDescription: '',
    logo: '',
    favicon: '',
    contactEmail: '',
    contactPhone: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
    },
    meta: {
      title: '',
      description: '',
      keywords: '',
    },
    hero: {
      title: '',
      subtitle: '',
      ctaText: '',
      ctaLink: '',
      backgroundImage: '',
    },
    about: {
      title: '',
      description: '',
      image: '',
      features: [],
    },
    services: {
      title: '',
      subtitle: '',
      items: [],
    },
    testimonials: {
      title: '',
      subtitle: '',
      items: [],
    },
    team: {
      title: '',
      subtitle: '',
      members: [],
    },
    contact: {
      title: '',
      subtitle: '',
      address: '',
      email: '',
      phone: '',
      mapEmbed: '',
    },
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/site-settings');
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        toast.success('Settings saved successfully');
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(prev => ({
          ...prev,
          [field]: data.url,
        }));
        toast.success('Image uploaded successfully');
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Site Settings</h1>
          <button
            onClick={handleSubmit}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiSave className="mr-2" />
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-[#1A1A1A] rounded-lg p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('general')}
                className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'general' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-[#2A2A2A]'
                }`}
              >
                <span className="mr-2">
                  <FiSettings />
                </span>
                General
              </button>
              <button
                onClick={() => setActiveTab('hero')}
                className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'hero' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-[#2A2A2A]'
                }`}
              >
                <span className="mr-2">
                  <FiHome />
                </span>
                Hero Section
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'about' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-[#2A2A2A]'
                }`}
              >
                <span className="mr-2">
                  <FiUsers />
                </span>
                About Section
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'services' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-[#2A2A2A]'
                }`}
              >
                <span className="mr-2">
                  <FiSettings />
                </span>
                Services Section
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'contact' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-[#2A2A2A]'
                }`}
              >
                <span className="mr-2">
                  <FiMail />
                </span>
                Contact Section
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <div className="bg-[#1A1A1A] rounded-lg p-6">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 mb-2">Site Name</label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                      className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Site Description</label>
                    <textarea
                      value={settings.siteDescription}
                      onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                      className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Logo</label>
                    <div className="flex items-center space-x-4">
                      {settings.logo && (
                        <img
                          src={settings.logo}
                          alt="Logo"
                          className="w-16 h-16 object-contain"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'logo')}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg cursor-pointer hover:bg-[#3A3A3A] transition-colors"
                      >
                        Upload Logo
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Favicon</label>
                    <div className="flex items-center space-x-4">
                      {settings.favicon && (
                        <img
                          src={settings.favicon}
                          alt="Favicon"
                          className="w-8 h-8 object-contain"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'favicon')}
                        className="hidden"
                        id="favicon-upload"
                      />
                      <label
                        htmlFor="favicon-upload"
                        className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg cursor-pointer hover:bg-[#3A3A3A] transition-colors"
                      >
                        Upload Favicon
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={settings.meta.title}
                      onChange={(e) => setSettings({
                        ...settings,
                        meta: { ...settings.meta, title: e.target.value }
                      })}
                      className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Meta Description</label>
                    <textarea
                      value={settings.meta.description}
                      onChange={(e) => setSettings({
                        ...settings,
                        meta: { ...settings.meta, description: e.target.value }
                      })}
                      className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Meta Keywords</label>
                    <input
                      type="text"
                      value={settings.meta.keywords}
                      onChange={(e) => setSettings({
                        ...settings,
                        meta: { ...settings.meta, keywords: e.target.value }
                      })}
                      className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 mb-2">Hero Title</label>
                    <input
                      type="text"
                      value={settings.hero.title}
                      onChange={(e) => setSettings({
                        ...settings,
                        hero: { ...settings.hero, title: e.target.value }
                      })}
                      className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Hero Subtitle</label>
                    <textarea
                      value={settings.hero.subtitle}
                      onChange={(e) => setSettings({
                        ...settings,
                        hero: { ...settings.hero, subtitle: e.target.value }
                      })}
                      className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">CTA Text</label>
                    <input
                      type="text"
                      value={settings.hero.ctaText}
                      onChange={(e) => setSettings({
                        ...settings,
                        hero: { ...settings.hero, ctaText: e.target.value }
                      })}
                      className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">CTA Link</label>
                    <input
                      type="text"
                      value={settings.hero.ctaLink}
                      onChange={(e) => setSettings({
                        ...settings,
                        hero: { ...settings.hero, ctaLink: e.target.value }
                      })}
                      className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Background Image</label>
                    <div className="flex items-center space-x-4">
                      {settings.hero.backgroundImage && (
                        <img
                          src={settings.hero.backgroundImage}
                          alt="Hero Background"
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'hero.backgroundImage')}
                        className="hidden"
                        id="hero-bg-upload"
                      />
                      <label
                        htmlFor="hero-bg-upload"
                        className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg cursor-pointer hover:bg-[#3A3A3A] transition-colors"
                      >
                        Upload Image
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Add similar sections for About, Services, and Contact tabs */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 