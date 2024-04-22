import Providers from '@/components/ThemeProvider/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { Metadata } from 'next'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Philipe Morais | Sobre mim.',
  description: 'Desenvolvedor Front-End & UX/UI Designer, com foco em desenvolvimento de interfaces web criativas, acessíveis e performáticas.',
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
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
