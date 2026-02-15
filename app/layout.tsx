import type { Metadata } from 'next'
import Script from 'next/script'
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
      <body>
        <Script
          defer
          data-domain="nice-right.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/PLACEHOLDER_CLARITY_ID";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script");`}
        </Script>
        {children}
      </body>
    </html>
  )
}