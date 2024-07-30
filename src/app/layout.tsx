import Providers from '@/components/ThemeProvider/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import './globals.css'

export const metadata: Metadata = {
  title: 'Philipe Morais | Desenvolvedor Front-End e UX/UI Designer.',
  description: 'Desenvolvedor Front-End & UX/UI Designer.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className='dark:bg-neutral-dark-background bg-neutral-light-background'>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
            <SpeedInsights />
          </Providers>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
