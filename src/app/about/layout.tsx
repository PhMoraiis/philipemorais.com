import '@/app/globals.css'
import Providers from '@/components/ThemeProvider/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Philipe Morais | Sobre mim',
  description: 'Desenvolvedor Front-End & UX/UI Designer, com foco em desenvolvimento de interfaces web criativas, acessíveis e performáticas.'
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section lang='en' suppressHydrationWarning className='dark:bg-neutral-dark-background bg-neutral-light-background'>
      <Providers>{children}</Providers>
      <Toaster />
    </section>
  )
}
