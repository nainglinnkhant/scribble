import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import { Toaster } from '@/components/ui/Toaster'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const TITLE = 'Scribble'
const DESCRIPTION =
  'Scribble is a drawing app which allows multiple users to draw on the same canvas in real-time.'

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 'no',
  },
  metadataBase: 'https://scribble-delta.vercel.app',
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og'],
    creator: '@nainglk',
  },
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og'],
    siteName: TITLE,
    url: 'https://scribble-delta.vercel.app',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>{children}</Providers>

        <Toaster />

        <Analytics />
      </body>
    </html>
  )
}
