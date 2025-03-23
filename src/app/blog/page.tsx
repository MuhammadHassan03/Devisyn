'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const featuredPosts = [
  {
    title: 'The Future of Web Development: Trends to Watch in 2024',
    excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to advanced frameworks.',
    image: '/blog/web-dev-trends.jpg',
    category: 'Technology',
    date: 'March 15, 2024',
    readTime: '5 min read',
  },
  {
    title: 'Building Scalable Applications with Next.js',
    excerpt: 'Learn how to leverage Next.js features to build high-performance, scalable web applications.',
    image: '/blog/nextjs-scalable.jpg',
    category: 'Development',
    date: 'March 10, 2024',
    readTime: '7 min read',
  },
  {
    title: 'The Impact of AI on Modern Business Solutions',
    excerpt: 'Discover how artificial intelligence is transforming business operations and customer experiences.',
    image: '/blog/ai-business.jpg',
    category: 'AI & ML',
    date: 'March 5, 2024',
    readTime: '6 min read',
  },
];

const categories = [
  { name: 'Technology', count: 12 },
  { name: 'Development', count: 8 },
  { name: 'AI & ML', count: 6 },
  { name: 'Design', count: 5 },
  { name: 'Business', count: 4 },
];

const recentPosts = [
  {
    title: 'Optimizing Performance in React Applications',
    excerpt: 'Best practices and techniques for improving React application performance.',
    date: 'March 1, 2024',
    readTime: '4 min read',
  },
  {
    title: 'The Rise of Edge Computing',
    excerpt: 'Understanding edge computing and its implications for modern applications.',
    date: 'February 28, 2024',
    readTime: '5 min read',
  },
  {
    title: 'UI/UX Design Principles for Better User Engagement',
    excerpt: 'Key principles to enhance user engagement through effective design.',
    date: 'February 25, 2024',
    readTime: '6 min read',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 z-0" />
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-6"
          >
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Insights, tutorials, and industry updates from our team of experts.
          </motion.p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12"
          >
            Featured Posts
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <span className="text-primary">{post.category}</span>
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{post.excerpt}</p>
                  <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary hover:underline">
                    Read More →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories and Recent Posts */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h3 className="text-2xl font-bold mb-6">Categories</h3>
              <div className="space-y-4">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/blog/category/${category.name.toLowerCase()}`}
                    className="flex items-center justify-between p-4 card hover:bg-primary/5 transition-colors"
                  >
                    <span>{category.name}</span>
                    <span className="text-gray-600 dark:text-gray-300">{category.count}</span>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Recent Posts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h3 className="text-2xl font-bold mb-6">Recent Posts</h3>
              <div className="space-y-6">
                {recentPosts.map((post) => (
                  <Link
                    key={post.title}
                    href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block p-6 card hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2">{post.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl mb-8">
              Subscribe to our newsletter for the latest insights and updates.
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 