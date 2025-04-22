'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiLogIn } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: 'admin@example.com',
    password: 'admin123',
  });

  useEffect(() => {
    // Check if already logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/me');
        if (response.ok) {
          router.push('/admin/dashboard');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', formData);
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Redirect to dashboard on success
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-[#1A1A1A] rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
              <p className="text-gray-400">Enter your credentials to access the dashboard</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-[#2A2A2A] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 bg-[#2A2A2A] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white rounded-lg font-medium hover:opacity-90 transition-all duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <div className="mr-2">
                      <FiLogIn size={20} />
                    </div>
                    Login
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
}