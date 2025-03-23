'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const services = [
    {
      title: "Custom Software Development",
      description: "Tailored solutions that perfectly align with your business objectives",
      icon: "💻",
      features: [
        "Scalable Architecture",
        "Cloud Integration",
        "API Development",
        "Legacy System Modernization"
      ],
      image: "/images/process/web-development.png"
    },
    {
      title: "Web Applications",
      description: "Modern, responsive web applications built with cutting-edge technologies",
      icon: "🌐",
      features: [
        "Frontend Development",
        "Backend Systems",
        "E-commerce Solutions",
        "Progressive Web Apps"
      ],
      image: "/images/process/mobile-development.png"
    },
    {
      title: "Mobile Solutions",
      description: "Native and cross-platform mobile applications for iOS and Android",
      icon: "📱",
      features: [
        "iOS Development",
        "Android Development",
        "Cross-platform Apps",
        "App Maintenance"
      ],
      image: "/images/process/ai-solutions.png"
    },
    {
      title: "AI Integration",
      description: "Leverage the power of artificial intelligence to transform your business",
      icon: "🤖",
      features: [
        "Machine Learning",
        "Natural Language Processing",
        "Computer Vision",
        "Predictive Analytics"
      ],
      image: "/images/process/cloud-services.png"
    }
  ];

  const processSteps = [
    {
      title: "Discovery",
      description: "Understanding your requirements and business goals",
      icon: "🔍"
    },
    {
      title: "Planning",
      description: "Creating a detailed roadmap and architecture",
      icon: "📋"
    },
    {
      title: "Development",
      description: "Building your solution with best practices",
      icon: "⚙️"
    },
    {
      title: "Testing",
      description: "Rigorous testing and quality assurance",
      icon: "✅"
    },
    {
      title: "Deployment",
      description: "Smooth deployment and launch",
      icon: "🚀"
    },
    {
      title: "Support",
      description: "Ongoing maintenance and support",
      icon: "🛠️"
    }
  ];

  if (!mounted) return null;

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
              Our Services
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive software solutions tailored to your business needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group cursor-pointer"
                onClick={() => setActiveService(index)}
              >
                <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-[#00FF9D] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <span className="w-1.5 h-1.5 bg-[#00FF9D] rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Process
            </h2>
            <p className="text-xl text-gray-400">
              We follow a systematic approach to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Web Development',
                description: 'Custom websites and web applications built with cutting-edge technologies.',
                image: '/images/process/web-development.png',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                ),
              },
              {
                title: 'Mobile Development',
                description: 'Native and cross-platform mobile applications for iOS and Android.',
                image: '/images/process/mobile-development.png',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: 'AI Solutions',
                description: 'Intelligent systems and machine learning solutions for your business.',
                image: '/images/process/ai-solutions.png',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
              {
                title: 'Cloud Services',
                description: 'Scalable cloud infrastructure and deployment solutions.',
                image: '/images/process/cloud-services.png',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-purple-500 text-white mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Technologies We Use</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Leveraging cutting-edge technologies to build exceptional solutions
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { name: 'React', icon: '⚛️' },
              { name: 'Next.js', icon: '▲' },
              { name: 'Node.js', icon: '🟢' },
              { name: 'Python', icon: '🐍' },
              { name: 'MongoDB', icon: '🍃' },
              { name: 'PostgreSQL', icon: '🐘' },
              { name: 'AWS', icon: '☁️' },
              { name: 'Docker', icon: '🐳' },
              { name: 'Kubernetes', icon: '⚓' },
              { name: 'TypeScript', icon: '📘' },
              { name: 'GraphQL', icon: '📊' },
              { name: 'Redis', icon: '🔴' },
              { name: 'Flutter', icon: '🦋' },
              { name: 'TensorFlow', icon: '🧠' },
              { name: 'Git', icon: '📦' },
              { name: 'CI/CD', icon: '🔄' },
              { name: 'Firebase', icon: '🔥' },
              { name: 'Tailwind CSS', icon: '🎨' },
              { name: 'Web3', icon: '⛓️' },
              { name: 'REST APIs', icon: '🔌' },
              { name: 'Jest', icon: '🧪' },
              { name: 'Selenium', icon: '🤖' },
              { name: 'Figma', icon: '🎯' },
              { name: 'Jira', icon: '📋' },
              { name: 'Slack', icon: '💬' },
              { name: 'VS Code', icon: '💻' },
              { name: 'Linux', icon: '🐧' },
              { name: 'Nginx', icon: '🌐' },
              { name: 'Elasticsearch', icon: '🔍' },
              { name: 'RabbitMQ', icon: '🐰' },
              { name: 'Jenkins', icon: '🤖' }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex flex-col items-center justify-center p-6 bg-[#1A1A1A] rounded-lg group hover:bg-[#2A2A2A] transition-colors"
              >
                <span className="text-4xl mb-4">{tech.icon}</span>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6 gradient-text">Ready to Get Started?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your goals
            </p>
            <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
                Contact Us
            </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 