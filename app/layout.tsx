import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: '--font-sans' });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
  title: {
    default: 'iConvertNow - All-in-One Online Tools',
    template: '%s | iConvertNow'
  },
  description: 'Convert files, format data, and simplify your workflow. Free online tools for file conversion, JSON formatting, image resizing, and more.',
  keywords: ['online tools', 'file converter', 'JSON formatter', 'image resizer', 'developer tools', 'text tools'],
  authors: [{ name: 'iConvertNow' }],
  creator: 'iConvertNow',
  publisher: 'iConvertNow',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  metadataBase: new URL('https://iconvertnow.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://iconvertnow.com',
    title: 'iConvertNow - All-in-One Online Tools',
    description: 'Convert files, format data, and simplify your workflow. Free online tools for everyone.',
    siteName: 'iConvertNow',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iConvertNow - All-in-One Online Tools',
    description: 'Convert files, format data, and simplify your workflow. Free online tools for everyone.',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0f172a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head />
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
