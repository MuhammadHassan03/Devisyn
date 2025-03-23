'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      image: "/testimonials/sarah.jpg",
      quote: "Devisyn transformed our business with their innovative software solutions. Their team's expertise and dedication are unmatched."
    },
    {
      name: "Michael Chen",
      role: "CTO, InnovateCorp",
      image: "/testimonials/michael.jpg",
      quote: "Working with Devisyn was a game-changer. They delivered beyond our expectations and helped us scale our operations."
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager, GrowthLabs",
      image: "/testimonials/emily.jpg",
      quote: "The attention to detail and technical excellence of Devisyn's team is impressive. They're true partners in our success."
    }
  ];

  const featuredProjects = [
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution with advanced features",
      image: "/projects/ecommerce.jpg",
      category: "Web Development",
      link: "/portfolio/ecommerce"
    },
    {
      title: "Mobile Banking App",
      description: "Secure and user-friendly mobile banking application",
      image: "/projects/banking.jpg",
      category: "Mobile Development",
      link: "/portfolio/banking"
    },
    {
      title: "AI Analytics Dashboard",
      description: "Real-time analytics with AI-powered insights",
      image: "/projects/analytics.jpg",
      category: "AI Solutions",
      link: "/portfolio/analytics"
    }
  ];

  const techStack = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Node.js", icon: "🟢" },
    { name: "TypeScript", icon: "📘" },
    { name: "Python", icon: "🐍" },
    { name: "AWS", icon: "☁️" },
    { name: "Docker", icon: "🐳" },
    { name: "MongoDB", icon: "🍃" },
    { name: "GraphQL", icon: "📊" },
    { name: "TensorFlow", icon: "🧠" },
    { name: "Kubernetes", icon: "⚙️" },
    { name: "Redis", icon: "🔴" }
  ];

  const teamMembers = [
    {
      name: "Muhammad Hassan",
      role: "Software Engineer & CEO",
      image: "/team/ceo.jpg",
      bio: "A passionate software engineer with expertise in full-stack development, leading Devisyn with innovation and technical excellence."
    },
    {
      name: "Maria Garcia",
      role: "CTO",
      image: "/team/maria.jpg",
      bio: "Expert in cloud architecture and scalable solutions"
    },
    {
      name: "David Chen",
      role: "Lead Developer",
      image: "/team/david.jpg",
      bio: "Full-stack developer specializing in AI and machine learning"
    },
    {
      name: "Sophie Anderson",
      role: "UI/UX Designer",
      image: "/team/sophie.jpg",
      bio: "Award-winning designer with a passion for user experience"
    }
  ];

  const latestNews = [
    {
      title: "The Future of AI in Business",
      excerpt: "Exploring how artificial intelligence is transforming industries...",
      date: "March 15, 2024",
      image: "/news/ai-future.jpg",
      category: "Technology"
    },
    {
      title: "Building Scalable Web Applications",
      excerpt: "Best practices for creating high-performance web apps...",
      date: "March 10, 2024",
      image: "/news/web-dev.jpg",
      category: "Development"
    },
    {
      title: "Mobile-First Design Principles",
      excerpt: "Why mobile-first approach is crucial in modern web design...",
      date: "March 5, 2024",
      image: "/news/mobile-design.jpg",
      category: "Design"
    }
  ];

  const whyChooseUs = [
    {
      title: "Expert Team",
      description: "Our team of skilled professionals brings years of industry experience",
      icon: "👥"
    },
    {
      title: "Innovative Solutions",
      description: "We leverage cutting-edge technology to deliver modern solutions",
      icon: "💡"
    },
    {
      title: "Quality Assurance",
      description: "Rigorous testing and quality checks ensure flawless delivery",
      icon: "✅"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock support to address your needs anytime",
      icon: "🔄"
    },
    {
      title: "Cost-Effective",
      description: "Competitive pricing without compromising on quality",
      icon: "💰"
    },
    {
      title: "Fast Delivery",
      description: "Quick turnaround times without sacrificing quality",
      icon: "⚡"
    }
  ];

  const awards = [
    {
      title: "Best Tech Company 2023",
      issuer: "Tech Excellence Awards",
      date: "2023",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Innovation in AI",
      issuer: "Global Tech Summit",
      date: "2023",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Customer Satisfaction",
      issuer: "Client Choice Awards",
      date: "2023",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: "Best Workplace",
      issuer: "Tech Culture Awards",
      date: "2023",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 16.7909 14.3137 15 11 15C7.68629 15 5 16.7909 5 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 12C13.2091 12 15 10.2091 15 8C15 5.79086 13.2091 4 11 4C8.79086 4 7 5.79086 7 8C7 10.2091 8.79086 12 11 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We offer comprehensive software development services including custom software development, web applications, mobile solutions, and AI integration. Our team specializes in creating scalable, secure, and innovative solutions tailored to your business needs.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary depending on complexity and requirements. A typical project can take anywhere from 3-12 months. We'll provide a detailed timeline during our initial consultation.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer comprehensive support and maintenance packages to ensure your solution remains up-to-date, secure, and performs optimally. Our team is always available to help with any issues or updates.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      question: "What technologies do you work with?",
      answer: "We work with a wide range of modern technologies including React, Node.js, Python, AWS, and more. Our tech stack is chosen based on project requirements and best practices.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2V22M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  const stats = [
    {
      title: "Projects Completed",
      value: "150+",
      description: "Successful projects delivered to clients worldwide",
      svg: (
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Team Members",
      value: "25+",
      description: "Expert professionals from diverse backgrounds",
      svg: (
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 16.7909 14.3137 15 11 15C7.68629 15 5 16.7909 5 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 12C13.2091 12 15 10.2091 15 8C15 5.79086 13.2091 4 11 4C8.79086 4 7 5.79086 7 8C7 10.2091 8.79086 12 11 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Client Satisfaction",
      value: "98%",
      description: "Happy clients who trust our services",
      svg: (
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: "Years Experience",
      value: "3+",
      description: "Delivering excellence since 2020",
      svg: (
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    }
  ];

  const floatingIcons = [
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      position: "top-1/4 left-1/4"
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 16.7909 14.3137 15 11 15C7.68629 15 5 16.7909 5 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 12C13.2091 12 15 10.2091 15 8C15 5.79086 13.2091 4 11 4C8.79086 4 7 5.79086 7 8C7 10.2091 8.79086 12 11 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      position: "top-1/3 right-1/4"
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      position: "bottom-1/4 left-1/3"
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      position: "bottom-1/3 right-1/3"
    }
  ];

  const sectionBackgrounds = {
    services: {
      gradient: "from-[#00FF9D]/5 to-[#6B46FF]/5",
      gridColor: "rgba(0,255,157,0.03)",
      icons: [
        {
          icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          position: "top-1/4 left-1/4"
        },
        {
          icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2V22M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          position: "bottom-1/4 right-1/4"
        }
      ]
    },
    projects: {
      gradient: "from-[#6B46FF]/5 to-[#00FF9D]/5",
      gridColor: "rgba(107,70,255,0.03)",
      icons: [
        {
          icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
          ),
          position: "top-1/3 right-1/3"
        },
        {
          icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
          ),
          position: "bottom-1/3 left-1/3"
        }
      ]
    },
    testimonials: {
      gradient: "from-[#00FF9D]/5 via-[#6B46FF]/5 to-[#00FF9D]/5",
      gridColor: "rgba(0,255,157,0.02)",
      icons: [
        {
          icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 16.7909 14.3137 15 11 15C7.68629 15 5 16.7909 5 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 12C13.2091 12 15 10.2091 15 8C15 5.79086 13.2091 4 11 4C8.79086 4 7 5.79086 7 8C7 10.2091 8.79086 12 11 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          position: "top-1/4 right-1/4"
        }
      ]
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Animated Background */}
        <div className="absolute inset-0 bg-[#0A0A0A]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/10 to-[#6B46FF]/10 animate-pulse"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00FF9D]/5 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#6B46FF]/5 via-transparent to-transparent"></div>
        </div>

          {/* Floating Icons */}
          {floatingIcons.map((icon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className={`absolute ${icon.position} text-[#00FF9D]/20`}
            >
              {icon.icon}
            </motion.div>
          ))}

          {/* Animated Grid Lines */}
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(0,255,157,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,157,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

          {/* Content */}
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              Crafting Digital Excellence
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Transforming businesses through cutting-edge software solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Start Your Project
                </motion.button>
              </Link>
              <Link href="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  View Our Work
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[#0A0A0A]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/5 to-[#6B46FF]/5 animate-pulse"></div>
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(0,255,157,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,157,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
          </div>

          {/* Floating Icons */}
          <div className="absolute top-1/4 left-1/4 text-[#00FF9D]/20">
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute bottom-1/4 right-1/4 text-[#6B46FF]/20">
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 gradient-text">Our Impact in Numbers</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Delivering excellence through measurable results
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/10 to-[#6B46FF]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-[#1A1A1A] rounded-2xl p-8 border border-[#00FF9D]/10 hover:border-[#00FF9D]/20 transition-all duration-300">
                    <div className="text-[#00FF9D] mb-6 flex justify-center">
                      {stat.svg}
                    </div>
                    <div className="text-5xl font-bold text-white mb-3 group-hover:text-[#00FF9D] transition-colors duration-300">
                      {stat.value}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#00FF9D] transition-colors duration-300">
                      {stat.title}
                    </h3>
                    <p className="text-gray-400">
                      {stat.description}
                    </p>
                  </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
        <section className="section-padding relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[#0A0A0A]">
            <div className={`absolute inset-0 bg-gradient-to-br ${sectionBackgrounds.services.gradient} animate-pulse`}></div>
            <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, ${sectionBackgrounds.services.gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${sectionBackgrounds.services.gridColor} 1px, transparent 1px)`, backgroundSize: '50px 50px' }}></div>
          </div>

          {/* Floating Icons */}
          {sectionBackgrounds.services.icons.map((icon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              viewport={{ once: true }}
              className={`absolute ${icon.position} text-[#00FF9D]/20`}
            >
              {icon.icon}
            </motion.div>
          ))}

          {/* Content */}
          <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Our Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive software solutions tailored to your business needs
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Custom Software Development",
                description: "Tailored solutions that perfectly align with your business objectives",
                icon: "💻",
                link: "/services#custom-software"
              },
              {
                title: "Web Applications",
                description: "Modern, responsive web applications built with cutting-edge technologies",
                icon: "🌐",
                link: "/services#web-applications"
              },
              {
                title: "Mobile Solutions",
                description: "Native and cross-platform mobile applications for iOS and Android",
                icon: "📱",
                link: "/services#mobile-solutions"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <Link href={service.link}>
                  <span className="text-[#00FF9D] group-hover:translate-x-2 transition-transform inline-block">
                    Learn More →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Carousel */}
        <section className="section-padding bg-[#1A1A1A] relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className={`absolute inset-0 bg-gradient-to-br ${sectionBackgrounds.projects.gradient} animate-pulse`}></div>
            <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, ${sectionBackgrounds.projects.gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${sectionBackgrounds.projects.gridColor} 1px, transparent 1px)`, backgroundSize: '50px 50px' }}></div>
          </div>

          {/* Floating Icons */}
          {sectionBackgrounds.projects.icons.map((icon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              viewport={{ once: true }}
              className={`absolute ${icon.position} text-[#6B46FF]/20`}
            >
              {icon.icon}
            </motion.div>
          ))}

          {/* Content */}
          <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Featured Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore some of our recent work and success stories
            </p>
          </motion.div>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "E-Commerce Platform",
                    description: "A modern e-commerce solution with advanced features and seamless user experience",
                    category: "Web Development",
                    icon: (
                      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 3H5L5.4 5M5.4 5H21L17 13H7M5.4 5L7 13M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 16.7893 15.5858 16.4142C15.2107 16.0391 15 15.5304 15 15C15 14.4696 15.2107 13.9609 15.5858 13.5858C15.9609 13.2107 16.4696 13 17 13C17.5304 13 18.0391 13.2107 18.4142 13.5858C18.7893 13.9609 19 14.4696 19 15C19 15.5304 18.7893 16.0391 18.4142 16.4142C18.0391 16.7893 17.5304 17 17 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ),
                    link: "/work/ecommerce"
                  },
                  {
                    title: "Mobile Banking App",
                    description: "Secure and user-friendly mobile banking application with advanced features",
                    category: "Mobile Development",
                    icon: (
                      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ),
                    link: "/work/banking"
                  },
                  {
                    title: "AI Analytics Dashboard",
                    description: "Real-time analytics with AI-powered insights and predictive analytics",
                    category: "AI Solutions",
                    icon: (
                      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ),
                    link: "/work/analytics"
                  }
                ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-xl bg-[#242424] hover:bg-[#2A2A2A] transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/10 to-[#6B46FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative p-8">
                      <div className="text-[#00FF9D] mb-6">
                        {project.icon}
                  </div>
                      <span className="text-sm text-[#00FF9D]">{project.category}</span>
                      <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-[#00FF9D] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-6">{project.description}</p>
                      <Link href={project.link}>
                        <span className="text-white hover:text-[#00FF9D] transition-colors inline-flex items-center">
                          View Project
                          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
        <section className="section-padding relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[#0A0A0A]">
            <div className={`absolute inset-0 bg-gradient-to-br ${sectionBackgrounds.testimonials.gradient} animate-pulse`}></div>
            <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, ${sectionBackgrounds.testimonials.gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${sectionBackgrounds.testimonials.gridColor} 1px, transparent 1px)`, backgroundSize: '50px 50px' }}></div>
          </div>

          {/* Floating Icons */}
          {sectionBackgrounds.testimonials.icons.map((icon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              viewport={{ once: true }}
              className={`absolute ${icon.position} text-[#00FF9D]/20`}
            >
              {icon.icon}
            </motion.div>
          ))}

          {/* Content */}
          <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Client Testimonials</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              What our clients say about working with us
            </p>
          </motion.div>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card"
                >
                  <div className="flex items-center mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-[#1A1A1A]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Our Process</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A systematic approach to delivering exceptional results
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your needs and project requirements"
              },
              {
                step: "02",
                title: "Planning",
                description: "Creating a detailed roadmap for success"
              },
              {
                step: "03",
                title: "Development",
                description: "Building your solution with cutting-edge technology"
              },
              {
                step: "04",
                title: "Delivery",
                description: "Launching and maintaining your solution"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="text-4xl font-bold text-[#00FF9D] mb-4">{step.step}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="section-padding bg-[#1A1A1A] relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/5 to-[#6B46FF]/5 animate-pulse"></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(0,255,157,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,157,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-1/4 left-1/4 text-[#00FF9D]/20">
          <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="absolute bottom-1/4 right-1/4 text-[#6B46FF]/20">
          <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Our Tech Stack</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Cutting-edge technologies we use to build exceptional solutions
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                {
                  name: "React",
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  name: "Next.js",
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2V22M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  name: "Node.js",
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  name: "TypeScript",
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  name: "Python",
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  name: "AWS",
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                }
              ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl bg-[#242424] hover:bg-[#2A2A2A] transition-all duration-300 p-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/10 to-[#6B46FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex flex-col items-center">
                    <div className="text-[#00FF9D] mb-4">
                      {tech.icon}
                    </div>
                    <h3 className="text-sm font-medium text-white group-hover:text-[#00FF9D] transition-colors">
                  {tech.name}
                </h3>
                  </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
              <h2 className="text-4xl font-bold mb-4 gradient-text">Our Team</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
                Meet the passionate individuals behind Devisyn
            </p>
          </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#1A1A1A] rounded-2xl p-8 hover:bg-[#242424] transition-colors duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-48 h-48 mb-6">
                  <Image
                      src="/images/team/ceo.svg"
                      alt="Muhammad Hassan"
                    fill
                      className="rounded-full object-cover"
                  />
                </div>
                  <h3 className="text-2xl font-bold mb-2">Muhammad Hassan</h3>
                  <p className="text-[#00FF9D] mb-4">Software Engineer & CEO</p>
                  <p className="text-gray-400 max-w-md">
                    A passionate full-stack developer with expertise in modern web technologies. Leading Devisyn with a vision to create innovative digital solutions.
                  </p>
                </div>
              </motion.div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="section-padding bg-[#1A1A1A] relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/5 to-[#6B46FF]/5 animate-pulse"></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(0,255,157,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,157,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-1/4 left-1/4 text-[#00FF9D]/20">
          <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 20H5C3.89543 20 3 19.1046 3 18V6C3 4.89543 3.89543 4 5 4H15L21 10V18C21 19.1046 20.1046 20 19 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 4V10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="absolute bottom-1/4 right-1/4 text-[#6B46FF]/20">
          <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Latest News</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Stay updated with our latest insights and industry news
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "The Future of AI in Business",
                  excerpt: "Exploring how artificial intelligence is transforming industries and creating new opportunities for businesses worldwide.",
                  date: "March 15, 2024",
                  category: "Technology",
                  icon: (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  title: "Building Scalable Web Applications",
                  excerpt: "Best practices and modern approaches for creating high-performance, scalable web applications that grow with your business.",
                  date: "March 10, 2024",
                  category: "Development",
                  icon: (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 20L14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 12L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  title: "Mobile-First Design Principles",
                  excerpt: "Why mobile-first approach is crucial in modern web design and how it impacts user experience and business success.",
                  date: "March 5, 2024",
                  category: "Design",
                  icon: (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                }
              ].map((news, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl bg-[#242424] hover:bg-[#2A2A2A] transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/10 to-[#6B46FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-8">
                    <div className="text-[#00FF9D] mb-6">
                      {news.icon}
                </div>
                <span className="text-sm text-[#00FF9D]">{news.category}</span>
                    <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-[#00FF9D] transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-gray-400 mb-6">{news.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{news.date}</span>
                  <Link href="/blog">
                        <span className="text-white hover:text-[#00FF9D] transition-colors inline-flex items-center">
                          Read More
                          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                    </span>
                  </Link>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[#0A0A0A]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/5 to-[#6B46FF]/5 animate-pulse"></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(0,255,157,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,157,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-1/4 left-1/4 text-[#00FF9D]/20">
          <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="absolute bottom-1/4 right-1/4 text-[#6B46FF]/20">
          <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Why Choose Us</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We deliver excellence through our unique approach
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Expert Team",
                  description: "Our team of skilled professionals brings years of industry experience",
                  icon: (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21V19C17 16.7909 14.3137 15 11 15C7.68629 15 5 16.7909 5 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11 12C13.2091 12 15 10.2091 15 8C15 5.79086 13.2091 4 11 4C8.79086 4 7 5.79086 7 8C7 10.2091 8.79086 12 11 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  title: "Innovative Solutions",
                  description: "We leverage cutting-edge technology to deliver modern solutions",
                  icon: (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  title: "Quality Assurance",
                  description: "Rigorous testing and quality checks ensure flawless delivery",
                  icon: (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )
                },
                {
                  title: "24/7 Support",
                  description: "Round-the-clock support to address your needs anytime",
                  icon: (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )
                },
                {
                  title: "Cost-Effective",
                  description: "Competitive pricing without compromising on quality",
                  icon: (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2V22M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  title: "Fast Delivery",
                  description: "Quick turnaround times without sacrificing quality",
                  icon: (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                }
              ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl bg-[#242424] hover:bg-[#2A2A2A] transition-all duration-300 p-8"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/10 to-[#6B46FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="text-[#00FF9D] mb-6">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#00FF9D] transition-colors">
                  {item.title}
                </h3>
                    <p className="text-gray-400">
                      {item.description}
                    </p>
                  </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
        <section className="section-padding bg-[#1A1A1A] relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/5 to-[#6B46FF]/5 animate-pulse"></div>
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(0,255,157,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,157,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
          </div>

          {/* Floating Icons */}
          <div className="absolute top-1/4 left-1/4 text-[#00FF9D]/20">
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute bottom-1/4 right-1/4 text-[#6B46FF]/20">
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>

          <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Awards & Recognition</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Proud to be recognized for our excellence
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Best Tech Company 2023",
                  issuer: "Tech Excellence Awards",
                  date: "2023",
                  icon: (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  title: "Innovation in AI",
                  issuer: "Global Tech Summit",
                  date: "2023",
                  icon: (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  title: "Customer Satisfaction",
                  issuer: "Client Choice Awards",
                  date: "2023",
                  icon: (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )
                },
                {
                  title: "Best Workplace",
                  issuer: "Tech Culture Awards",
                  date: "2023",
                  icon: (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21V19C17 16.7909 14.3137 15 11 15C7.68629 15 5 16.7909 5 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11 12C13.2091 12 15 10.2091 15 8C15 5.79086 13.2091 4 11 4C8.79086 4 7 5.79086 7 8C7 10.2091 8.79086 12 11 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                }
              ].map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl bg-[#242424] hover:bg-[#2A2A2A] transition-all duration-300 p-8"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/10 to-[#6B46FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex flex-col items-center text-center">
                    <div className="text-[#00FF9D] mb-6">
                      {award.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#00FF9D] transition-colors">
                      {award.title}
                    </h3>
                <p className="text-gray-400 mb-1">{award.issuer}</p>
                <p className="text-sm text-[#00FF9D]">{award.date}</p>
                  </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
        <section className="section-padding relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[#0A0A0A]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/5 to-[#6B46FF]/5 animate-pulse"></div>
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(0,255,157,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,157,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
          </div>

          {/* Floating Icons */}
          <div className="absolute top-1/4 left-1/4 text-[#00FF9D]/20">
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute bottom-1/4 right-1/4 text-[#6B46FF]/20">
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>

          <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Frequently Asked Questions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our services
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "What services do you offer?",
                  answer: "We offer comprehensive software development services including custom software development, web applications, mobile solutions, and AI integration. Our team specializes in creating scalable, secure, and innovative solutions tailored to your business needs.",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  question: "How long does a typical project take?",
                  answer: "Project timelines vary depending on complexity and requirements. A typical project can take anywhere from 3-12 months. We'll provide a detailed timeline during our initial consultation.",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )
                },
                {
                  question: "Do you provide ongoing support?",
                  answer: "Yes, we offer comprehensive support and maintenance packages to ensure your solution remains up-to-date, secure, and performs optimally. Our team is always available to help with any issues or updates.",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )
                },
                {
                  question: "What technologies do you work with?",
                  answer: "We work with a wide range of modern technologies including React, Node.js, Python, AWS, and more. Our tech stack is chosen based on project requirements and best practices.",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2V22M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                }
              ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl bg-[#242424] hover:bg-[#2A2A2A] transition-all duration-300 p-8"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/10 to-[#6B46FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="text-[#00FF9D] mt-1">
                        {faq.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#00FF9D] transition-colors">
                  {faq.question}
                </h3>
                        <p className="text-gray-400">
                          {faq.answer}
                        </p>
          </div>
        </div>
            </div>
          </motion.div>
              ))}
            </div>
        </div>
      </section>
    </main>
    </div>
  );
} 