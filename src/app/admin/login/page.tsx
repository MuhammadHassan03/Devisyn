'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }
      console.log('Login successful');
      router.push('/admin/dashboard');
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/10 via-[#4ECDC4]/10 to-[#45B7D1]/10 animate-gradient" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="relative w-full max-w-md p-8 space-y-8 bg-[#1A1A1A]/80 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl">
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="Devisyn Logo"
            width={150}
            height={50}
            className="mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-white">Admin Login</h2>
          <p className="mt-2 text-gray-400">Sign in to access the admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-[#2A2A2A] border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-[#2A2A2A] border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 text-white bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B6B] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
} 