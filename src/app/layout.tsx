import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/context/ThemeContext'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'
import AdminRouteCheck from '@/components/AdminRouteCheck'

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
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider>
            <AdminRouteCheck>
              <Header />
            </AdminRouteCheck>
            <main className="min-h-screen">
              {children}
            </main>
            <AdminRouteCheck>
              <Footer />
            </AdminRouteCheck>
            <Toaster position="top-right" />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
} 