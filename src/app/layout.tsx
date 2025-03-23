import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/context/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://devisyn.com'),
  title: 'Devisyn - Software Development Agency',
  description: 'Custom software solutions, web applications, and digital transformation services.',
  keywords: 'software development, web applications, mobile apps, cloud solutions, AI, machine learning',
  authors: [{ name: 'Devisyn' }],
  creator: 'Devisyn',
  publisher: 'Devisyn',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Devisyn - Software Development Agency',
    description: 'Custom software solutions, web applications, and digital transformation services.',
    url: 'https://devisyn.com',
    siteName: 'Devisyn',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Devisyn - Software Development Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devisyn - Software Development Agency',
    description: 'Custom software solutions, web applications, and digital transformation services.',
    images: ['/og-image.jpg'],
    creator: '@devisyn',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
  alternates: {
    canonical: 'https://devisyn.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>Devisyn - Software Development Agency</title>
        <meta name="description" content="Devisyn is a leading software development agency specializing in custom software solutions, web applications, and mobile development." />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} antialiased bg-[#0A0A0A] text-white`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 