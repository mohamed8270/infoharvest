import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '../components/NavBar'
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Info Harvest',
  description: 'Price junction for your purchase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar/>
        {children}
        <SpeedInsights />
        </body>
    </html>
  )
}
