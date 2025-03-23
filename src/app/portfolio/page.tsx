 'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Applications' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'ai', name: 'AI Solutions' },
    { id: 'cloud', name: 'Cloud Solutions' }
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution with advanced features and real-time inventory management",
      category: "web",
      image: "/project1.jpg",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
      features: [
        "Real-time inventory tracking",
        "Advanced search and filtering",
        "Secure payment integration",
        "Admin dashboard",
        "Analytics and reporting"
      ],
      link: "#"
    },
    {
      title: "Mobile Banking App",
      description: "Secure and intuitive mobile banking application with biometric authentication",
      category: "mobile",
      image: "/project2.jpg",
      tech: ["React Native", "Node.js", "MongoDB", "Firebase", "Stripe"],
      features: [
        "Biometric authentication",
        "Real-time transactions",
        "Bill payments",
        "Investment tracking",
        "Secure messaging"
      ],
      link: "#"
    },
    {
      title: "AI Analytics Dashboard",
      description: "Real-time analytics platform with AI-powered insights and predictions",
      category: "ai",
      image: "/project3.jpg",
      tech: ["Python", "TensorFlow", "React", "D3.js", "AWS"],
      features: [
        "Predictive analytics",
        "Custom reporting",
        "Data visualization",
        "Automated insights",
        "API integration"
      ],
      link: "#"
    },
    {
      title: "Cloud Migration Platform",
      description: "Enterprise-grade cloud migration and management solution",
      category: "cloud",
      image: "/project4.jpg",
      tech: ["AWS", "Azure", "Kubernetes", "Terraform", "Docker"],
      features: [
        "Multi-cloud support",
        "Automated migration",
        "Cost optimization",
        "Security compliance",
        "Performance monitoring"
      ],
      link: "#"
    },
    {
      title: "Social Media Dashboard",
      description: "Comprehensive social media management and analytics platform",
      category: "web",
      image: "/project5.jpg",
      tech: ["React", "Node.js", "GraphQL", "Redis", "Elasticsearch"],
      features: [
        "Multi-platform integration",
        "Content scheduling",
        "Engagement analytics",
        "Team collaboration",
        "Custom reporting"
      ],
      link: "#"
    },
    {
      title: "Healthcare Mobile App",
      description: "Patient care and appointment management mobile application",
      category: "mobile",
      image: "/project6.jpg",
      tech: ["Flutter", "Firebase", "Node.js", "MongoDB", "WebRTC"],
      features: [
        "Video consultations",
        "Appointment booking",
        "Health records",
        "Prescription management",
        "Emergency contacts"
      ],
      link: "#"
    }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0A0A]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/10 to-[#6B46FF]/10 animate-pulse"></div>
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              Our Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore our latest projects and success stories
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-[#1A1A1A]">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-[#00FF9D] text-black'
                    : 'bg-[#2A2A2A] text-gray-300 hover:bg-[#2A2A2A]/80'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover-lift"
              >
                <div className="aspect-video bg-[#2A2A2A] rounded-lg mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/20 to-[#6B46FF]/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">
                    {project.image}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-400">
                        <span className="w-1.5 h-1.5 bg-[#00FF9D] rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-[#2A2A2A] rounded-full text-sm text-[#00FF9D]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <motion.a
                  href={project.link}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary w-full text-center"
                >
                  View Project
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[#1A1A1A]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6 gradient-text">Have a Project in Mind?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's create something amazing together
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Start Your Project
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}