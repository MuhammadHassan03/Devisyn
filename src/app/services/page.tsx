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
      description: "We dive deep into understanding your vision, goals, and challenges to create a solid foundation",
      icon: "🔍",
      color: "from-blue-500 to-blue-600",
      gradient: "bg-gradient-to-br from-blue-500/20 to-blue-600/20",
      features: ["Requirement Analysis", "Market Research", "User Personas", "Competitor Analysis"]
    },
    {
      title: "Planning",
      description: "Crafting a detailed roadmap with milestones and deliverables for your project",
      icon: "📋",
      color: "from-purple-500 to-purple-600",
      gradient: "bg-gradient-to-br from-purple-500/20 to-purple-600/20",
      features: ["Project Timeline", "Resource Allocation", "Risk Assessment", "Budget Planning"]
    },
    {
      title: "Development",
      description: "Building your solution with cutting-edge technologies and best practices",
      icon: "⚙️",
      color: "from-green-500 to-green-600",
      gradient: "bg-gradient-to-br from-green-500/20 to-green-600/20",
      features: ["Agile Development", "Code Review", "Version Control", "Continuous Integration"]
    },
    {
      title: "Testing",
      description: "Ensuring quality through comprehensive testing and quality assurance",
      icon: "✅",
      color: "from-yellow-500 to-yellow-600",
      gradient: "bg-gradient-to-br from-yellow-500/20 to-yellow-600/20",
      features: ["Unit Testing", "Integration Testing", "Performance Testing", "Security Testing"]
    },
    {
      title: "Deployment",
      description: "Smooth deployment and launch with zero downtime",
      icon: "🚀",
      color: "from-red-500 to-red-600",
      gradient: "bg-gradient-to-br from-red-500/20 to-red-600/20",
      features: ["CI/CD Pipeline", "Environment Setup", "Monitoring", "Backup Strategy"]
    },
    {
      title: "Support",
      description: "Ongoing maintenance, updates, and support to keep your solution running smoothly",
      icon: "🛠️",
      color: "from-indigo-500 to-indigo-600",
      gradient: "bg-gradient-to-br from-indigo-500/20 to-indigo-600/20",
      features: ["Bug Fixes", "Performance Optimization", "Feature Updates", "24/7 Support"]
    }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section */}
      <div className="relative">
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
                Our Services
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Comprehensive software solutions tailored to your business needs
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Services Grid */}
      <section className="relative z-10 py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer bg-[#1A1A1A] rounded-lg overflow-hidden"
                onClick={() => setActiveService(index)}
              >
                <div className="relative aspect-video">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent" />
                </div>
                <div className="p-6 relative">
                  <div className="text-4xl mb-4 text-[#00FF9D]">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#00FF9D] transition-colors">
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/10 to-[#6B46FF]/10 animate-pulse"></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(0,255,157,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,157,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              Our Process
            </h2>
            <p className="text-xl text-gray-400">
              A seamless journey from concept to completion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative p-8 rounded-2xl overflow-hidden bg-[#1A1A1A] border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/5 to-[#6B46FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{step.icon}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#00FF9D] transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-6">
                      {step.description}
                    </p>
                    
                    <div className="space-y-2">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-gray-300">
                          <span className="w-1.5 h-1.5 bg-[#00FF9D] rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
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