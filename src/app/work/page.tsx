'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'web',
    image: '/projects/ecommerce.jpg',
    description: 'A full-featured e-commerce platform with advanced filtering and payment integration.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '/work/ecommerce-platform',
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    category: 'mobile',
    image: '/projects/banking.jpg',
    description: 'Secure and intuitive mobile banking application with biometric authentication.',
    technologies: ['React Native', 'Firebase', 'Redux', 'Node.js'],
    link: '/work/mobile-banking',
  },
  {
    id: 3,
    title: 'AI-Powered Analytics',
    category: 'ai',
    image: '/projects/analytics.jpg',
    description: 'Advanced analytics platform with machine learning capabilities.',
    technologies: ['Python', 'TensorFlow', 'React', 'AWS'],
    link: '/work/ai-analytics',
  },
  {
    id: 4,
    title: 'Cloud Migration',
    category: 'cloud',
    image: '/projects/cloud.jpg',
    description: 'Enterprise cloud migration project with zero downtime.',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    link: '/work/cloud-migration',
  },
  // Add more projects as needed
];

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'web', name: 'Web Development' },
  { id: 'mobile', name: 'Mobile Apps' },
  { id: 'ai', name: 'AI Solutions' },
  { id: 'cloud', name: 'Cloud Services' },
];

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-purple-500/10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <div className="relative container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Work
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Explore our portfolio of successful projects and innovative solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-green-500 to-purple-500 text-white'
                    : 'bg-[#1A1A1A] text-gray-400 hover:text-white'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-[#1A1A1A] rounded-lg overflow-hidden"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative aspect-video">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-[#2A2A2A] text-sm text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={project.link}
                      className="inline-flex items-center text-green-500 hover:text-green-400 transition-colors"
                    >
                      View Project
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
} 