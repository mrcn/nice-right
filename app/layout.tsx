import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nice Right | Digital Growth for Small Businesses',
  description: 'We help small businesses grow through better websites, smarter marketing, and custom apps. Focus on customer acquisition, service efficiency, and retention.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}