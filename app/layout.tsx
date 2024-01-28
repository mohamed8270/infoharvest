import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '../components/NavBar'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';

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
    <>
    <Head>
      <meta name="google-adsense-account" content="ca-pub-6678637984319183" />
    </Head>
    <html lang="en">
      <body className={inter.className}>
        <NavBar/>
        {children}
        <SpeedInsights />
        <Analytics />
        </body>
    </html>
    </>
  )
}
