import './globals.css'
import Providers from '@/components/ThemeToggle/theme-provider'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Philipe Morais | Desenvolvedor Front-End e UX/UI Designer.',
  description: 'Desenvolvedor Front-End & UX/UI Designer.',
  icons: {
    icon: {
      url: '/icons/favicon.svg',
      type: 'image/svg+xml',
    }
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}