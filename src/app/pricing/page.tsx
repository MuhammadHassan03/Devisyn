'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import pricingData from '@/data/pricing.json';

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState('monthly');

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0A0A] dark:bg-white">
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
              Transparent Pricing
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 dark:text-gray-700 mb-8 max-w-2xl mx-auto">
              Choose the perfect plan for your business
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Toggle */}
      <section className="py-8 bg-[#1A1A1A] dark:bg-gray-100">
        <div className="container-custom">
          <div className="flex justify-center items-center space-x-4">
            <span className={`text-sm ${activeTab === 'monthly' ? 'text-[#00FF9D]' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setActiveTab(activeTab === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-16 h-8 bg-[#2A2A2A] dark:bg-gray-200 rounded-full"
            >
              <motion.div
                initial={false}
                animate={{ x: activeTab === 'yearly' ? 32 : 0 }}
                className="absolute w-6 h-6 bg-[#00FF9D] rounded-full top-1 left-1"
              />
            </button>
            <span className={`text-sm ${activeTab === 'yearly' ? 'text-[#00FF9D]' : 'text-gray-400'}`}>
              Yearly
              {activeTab === 'yearly' && (
                <span className="ml-1 text-xs bg-[#00FF9D] text-black px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              )}
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingData.pricing.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`card hover-lift relative ${
                  plan.popular ? 'border-2 border-[#00FF9D]' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#00FF9D] text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-400">/project</span>}
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-[#00FF9D] mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-300 dark:text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-500">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full ${
                      plan.popular ? 'btn-primary' : 'btn-secondary'
                    }`}
                  >
                    {plan.cta}
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-[#1A1A1A] dark:bg-gray-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Frequently Asked Questions</h2>
            <p className="text-gray-400 dark:text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our pricing and services
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {pricingData.faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <h3 className="text-xl font-bold mb-2">{item.question}</h3>
                <p className="text-gray-400 dark:text-gray-600">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6 gradient-text">Ready to Get Started?</h2>
            <p className="text-xl text-gray-400 dark:text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us to discuss your project requirements and get a custom quote
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
    </main>
  );
} 