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
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[#0A0A0A]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/10 to-[#6B46FF]/10 animate-pulse"></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(0,255,157,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,157,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              Our Work
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore our portfolio of successful projects and innovative solutions
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
                    ? 'bg-gradient-to-r from-[#00FF9D] to-[#6B46FF] text-white'
                    : 'bg-[#1A1A1A] text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="relative group"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#00FF9D] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-full bg-[#1A1A1A] text-gray-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
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