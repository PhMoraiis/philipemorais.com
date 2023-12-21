
import { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/ThemeToggle/theme-provider'

export const metadata: Metadata = {
  title: 'Philipe Morais | Desenvolvedor Front-End e UX/UI Designer.',
  description: 'Desenvolvedor Front-End e UX/UI Designer.',
  icons: {
    icon: [
      {
        url: '/icons/light-icon.png',
        href: '/icons/light-icon.png',
      }
    ],
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
