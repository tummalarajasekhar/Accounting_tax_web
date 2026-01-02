import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css' // Ensure you have your tailwind styles imported here

const inter = Inter({ subsets: ['latin'] })

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'TPR CS | Professional Tax Filing & Cloud Accounting',
  description: 'Expert tax filing, corporate accounting, and bookkeeping services by TPR CS. Managing personal and business finances in Guntur and globally.',
  keywords: ['Tax Filing', 'TPRCS', 'Accounting Guntur', 'Income Tax', 'GST Filing', 'Cloud Accounting'],
  metadataBase: new URL('https://taxfilling.tprcs.com'),
  openGraph: {
    title: 'TPR CS - Easy Tax Filing Solutions',
    description: 'We maximize your returns and minimize the stress. Professional tax services.',
    url: 'https://taxfilling.tprcs.com',
    siteName: 'TPR CS Tax Services',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}