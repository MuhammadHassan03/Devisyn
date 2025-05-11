import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/context/ThemeContext'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
}

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
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  applicationName: 'Devisyn',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Devisyn',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Providers>
          <ThemeProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <Toaster position="top-right" />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
} 