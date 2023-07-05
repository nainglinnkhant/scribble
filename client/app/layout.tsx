import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import { Providers } from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Scribble',
  description:
    'Scribble is a drawing app which allows multiple users to draw on the same canvas in real-time.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>{children}</Providers>

        <Analytics />
      </body>
    </html>
  )
}
