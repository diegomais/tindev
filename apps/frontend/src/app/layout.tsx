import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'tindev',
  description: 'A social network for developers',
}

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
