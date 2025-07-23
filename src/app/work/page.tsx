'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const DEFAULT_IMAGE = '/images/default-blog.svg';

const projects = [
  {
    id: 101,
    title: 'Tella – Screen Recording App',
    category: 'web',
    image: 'https://api.microlink.io/?url=https://www.tella.com&screenshot=true&meta=false&embed=screenshot.url',
    description: 'Record beautiful screen and camera videos instantly with Tella, a modern Loom alternative.',
    technologies: ['React', 'Next.js', 'Supabase', 'TailwindCSS'],
    link: 'https://www.tella.com',
    features: ['Video Editing', 'Screen + Cam Record', 'Cloud Sync', 'Branding Tools']
  },
  {
    id: 102,
    title: 'Wasp – AI-Powered Dev Tool',
    category: 'ai',
    image: 'https://api.microlink.io/?url=https://wasp.dev&screenshot=true&meta=false&embed=screenshot.url',
    description: 'Build full-stack apps faster with Wasp, a modern framework powered by AI-assisted coding.',
    technologies: ['React', 'Node.js', 'Prisma', 'OpenAI'],
    link: 'https://wasp.dev',
    features: ['AI Coding Assistant', 'CLI Generator', 'User Auth', 'Job Scheduling']
  },
  {
    id: 103,
    title: 'Typedream – No-Code Site Builder',
    category: 'web',
    image: 'https://api.microlink.io/?url=https://www.typedream.com&screenshot=true&meta=false&embed=screenshot.url',
    description: 'Typedream helps you build websites like Notion pages. No-code builder for creators and founders.',
    technologies: ['React', 'Firebase', 'TailwindCSS'],
    link: 'https://www.typedream.com',
    features: ['Drag & Drop Builder', 'Responsive Design', 'Templates', 'AI Copywriting']
  },
  {
    id: 104,
    title: 'Opal – Focus Management App',
    category: 'mobile',
    image: 'https://api.microlink.io/?url=https://www.opal.so&screenshot=true&meta=false&embed=screenshot.url',
    description: 'A mobile productivity app that helps users stay focused by blocking distractions.',
    technologies: ['React Native', 'Firebase', 'Redux'],
    link: 'https://www.opal.so',
    features: ['Time Blocking', 'App Blocking', 'Focus Reports', 'Deep Work Sessions']
  },
  {
    id: 105,
    title: 'Superhuman – Fast Email Client',
    category: 'web',
    image: 'https://api.microlink.io/?url=https://superhuman.com&screenshot=true&meta=false&embed=screenshot.url',
    description: 'Superhuman is a premium email client with AI-powered features and stunning UX.',
    technologies: ['React', 'Electron', 'AI Models'],
    link: 'https://superhuman.com',
    features: ['AI Smart Replies', 'Command Bar', 'Instant Search', 'Split Inbox']
  },
  {
    id: 106,
    title: 'Linear – Issue Tracker',
    category: 'web',
    image: 'https://api.microlink.io/?url=https://linear.app&screenshot=true&meta=false&embed=screenshot.url',
    description: 'Linear offers high-performance issue tracking with elegant UI for software teams.',
    technologies: ['React', 'GraphQL', 'TailwindCSS'],
    link: 'https://linear.app',
    features: ['Team Collaboration', 'Keyboard Shortcuts', 'Milestones', 'Fast UI']
  },
  {
    id: 107,
    title: 'Cron – Calendar App',
    category: 'mobile',
    image: 'https://api.microlink.io/?url=https://cron.com&screenshot=true&meta=false&embed=screenshot.url',
    description: 'Cron is a beautifully designed calendar app for professionals and remote teams.',
    technologies: ['React Native', 'Electron', 'Google Calendar API'],
    link: 'https://cron.com',
    features: ['Smart Scheduling', 'Time Zone Support', 'Cross-Platform Sync', 'Minimal UI']
  }
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
                          Live Preview
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