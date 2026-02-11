import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nice Right | UX Writing & Content Strategy for Small Businesses',
  description: 'We help small businesses grow through clear messaging, strategic content, and user experiences that convert. UX writing that drives acquisition, efficiency, and retention.',
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