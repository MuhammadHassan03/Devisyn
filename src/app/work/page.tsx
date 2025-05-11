'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const DEFAULT_IMAGE = '/images/default-blog.svg';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'web',
    image: '/projects/ecommerce.jpg',
    description: 'A full-featured e-commerce platform with advanced filtering and payment integration.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '/work/ecommerce-platform',
    features: ['Advanced Filtering', 'Payment Integration', 'Real-time Updates', 'Admin Dashboard']
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    category: 'mobile',
    image: '/projects/banking.jpg',
    description: 'Secure and intuitive mobile banking application with biometric authentication.',
    technologies: ['React Native', 'Firebase', 'Redux', 'Node.js'],
    link: '/work/mobile-banking',
    features: ['Biometric Auth', 'Real-time Transactions', 'Push Notifications', 'Secure Messaging']
  },
  {
    id: 3,
    title: 'AI-Powered Analytics',
    category: 'ai',
    image: '/projects/analytics.jpg',
    description: 'Advanced analytics platform with machine learning capabilities.',
    technologies: ['Python', 'TensorFlow', 'React', 'AWS'],
    link: '/work/ai-analytics',
    features: ['Predictive Analysis', 'Data Visualization', 'Real-time Insights', 'Custom Reports']
  },
  {
    id: 4,
    title: 'Cloud Migration',
    category: 'cloud',
    image: '/projects/cloud.jpg',
    description: 'Enterprise cloud migration project with zero downtime.',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    link: '/work/cloud-migration',
    features: ['Zero Downtime', 'Data Security', 'Performance Monitoring', 'Cost Optimization']
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
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0">
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
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="group cursor-pointer bg-[#1A1A1A] rounded-lg overflow-hidden"
                  onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative aspect-video">
                    <Image
                      src={project.image || DEFAULT_IMAGE}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = DEFAULT_IMAGE;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent opacity-100" />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#00FF9D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#00FF9D] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    
                    {/* Features */}
                    <motion.div
                      initial={false}
                      animate={{ height: selectedProject === project.id ? 'auto' : 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 mb-4">
                        <h4 className="text-[#00FF9D] font-medium">Key Features:</h4>
                        <ul className="grid grid-cols-2 gap-2">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-400">
                              <span className="w-1.5 h-1.5 bg-[#00FF9D] rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <motion.span
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 text-sm rounded-full bg-[#2A2A2A] text-[#00FF9D] border border-[#00FF9D]/20"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* View Project Button */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: selectedProject === project.id ? 1 : 0 }}
                      className="mt-6"
                    >
                      <Link href={project.link}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-2 px-4 bg-gradient-to-r from-[#00FF9D] to-[#6B46FF] text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                        >
                          View Project Details
                        </motion.button>
                      </Link>
                    </motion.div>
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