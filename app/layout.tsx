import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nice Right | Digital Growth Partner for Small Businesses',
  description: 'We help small businesses grow through better websites, apps, and digital systems. Focus on customer acquisition, service efficiency, and retention.',
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