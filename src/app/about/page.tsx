'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    image: '/team/john-doe.jpg',
    bio: '15+ years of experience in software development and business leadership.',
  },
  {
    name: 'Jane Smith',
    role: 'CTO',
    image: '/team/jane-smith.jpg',
    bio: 'Expert in cloud architecture and scalable solutions.',
  },
  {
    name: 'Mike Johnson',
    role: 'Lead Developer',
    image: '/team/mike-johnson.jpg',
    bio: 'Full-stack developer with expertise in modern web technologies.',
  },
  {
    name: 'Sarah Williams',
    role: 'UI/UX Designer',
    image: '/team/sarah-williams.jpg',
    bio: 'Award-winning designer focused on creating intuitive user experiences.',
  },
];

const values = [
  {
    title: 'Innovation',
    description: 'We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.',
    icon: '💡',
  },
  {
    title: 'Quality',
    description: 'We maintain the highest standards in our code, design, and service delivery.',
    icon: '⭐',
  },
  {
    title: 'Collaboration',
    description: 'We work closely with our clients to ensure their vision becomes reality.',
    icon: '🤝',
  },
  {
    title: 'Integrity',
    description: 'We operate with transparency and honesty in all our dealings.',
    icon: '🎯',
  },
];

const milestones = [
  {
    year: "2020",
    title: "Company Founded",
    description: "Started with a vision to revolutionize digital solutions"
  },
  {
    year: "2021",
    title: "First Major Client",
    description: "Secured our first enterprise-level project"
  },
  {
    year: "2022",
    title: "Team Expansion",
    description: "Grew to a team of 15+ talented professionals"
  },
  {
    year: "2023",
    title: "Global Recognition",
    description: "Received multiple industry awards and recognition"
  }
];

const storyTimeline = [
  {
    year: "2020",
    title: "Foundation",
    description: "Founded in San Francisco with a vision to revolutionize digital solutions",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    year: "2021",
    title: "Growth",
    description: "Expanded team and capabilities to serve global clients",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2V22M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    year: "2022",
    title: "Innovation",
    description: "Launched cutting-edge solutions and expanded service offerings",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    year: "2023",
    title: "Excellence",
    description: "Achieved industry recognition and continued global expansion",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  }
];

const infographics = [
  {
    title: "Our Expertise",
    description: "Specialized in cutting-edge technologies and innovative solutions",
    svg: (
      <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Global Reach",
    description: "Serving clients across multiple continents and industries",
    svg: (
      <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M2 12H22" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  {
    title: "Innovation Hub",
    description: "Leading the way in digital transformation and technological advancement",
    svg: (
      <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Quality Assurance",
    description: "Committed to delivering excellence in every project",
    svg: (
      <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  }
];

export default function AboutPage() {
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
              About Devisyn
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We are a team of passionate developers, designers, and innovators dedicated to creating exceptional digital experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg mb-6">
                Founded in 2020, Devisyn emerged from a shared vision to revolutionize the digital landscape. 
                What started as a small team of passionate developers has grown into a full-service digital agency 
                serving clients worldwide.
              </p>
              <p className="text-lg mb-6">
                Our journey began in a small office in San Francisco, where a group of tech enthusiasts came together 
                with a common goal: to create digital solutions that make a difference. We believed that technology 
                should be accessible, intuitive, and transformative.
              </p>
              <p className="text-lg mb-6">
                In our early days, we focused on building strong foundations - not just in our technical expertise, 
                but in our relationships with clients. We understood that successful digital transformation requires 
                more than just coding; it needs a deep understanding of business needs, user behavior, and market trends.
              </p>
              <p className="text-lg mb-6">
                As we grew, so did our capabilities. We expanded our team to include not just developers, but also 
                designers, strategists, and project managers. Each new team member brought unique perspectives and 
                skills, enriching our collective ability to solve complex problems.
              </p>
              <p className="text-lg mb-6">
                Today, Devisyn stands as a testament to what can be achieved when passion meets purpose. We've helped 
                businesses across industries transform their digital presence, from startups looking to make their mark 
                to established enterprises seeking to innovate and evolve.
              </p>
              <p className="text-lg">
                Our commitment to excellence, combined with our innovative approach to problem-solving, has made us 
                a trusted partner in digital transformation. We continue to push boundaries, explore new technologies, 
                and deliver solutions that drive real business value.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg" />
              <div className="relative p-8">
                <div className="space-y-8">
                  {storyTimeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-primary mb-1">{item.year}</div>
                        <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Infographics Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Why Choose Devisyn
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {infographics.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                <div className="text-primary mb-4 flex justify-center">
                  {item.svg}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary mb-4">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Our Journey
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center"
              >
                <div className="text-4xl font-bold text-primary mb-4">{milestone.year}</div>
                <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6"
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Let's discuss how we can help bring your vision to life with our expertise and innovative solutions.
          </motion.p>
          <Link href="/contact" className="btn-primary">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
} 