import Providers from '@/components/ThemeProvider/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Metadata } from 'next'
import './globals.css'

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
    <html lang='en' suppressHydrationWarning>
      <body className='dark:bg-neutral-dark-background bg-neutral-light-background'>
        <Providers>
          {children}
          <SpeedInsights />
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
