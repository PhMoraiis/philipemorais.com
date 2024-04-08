'use client'

import { ThemeProvider } from 'next-themes'
import dynamic from 'next/dynamic'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider attribute='class' defaultTheme='system' disableTransitionOnChange>{children}</ThemeProvider>
}

export default dynamic (() => Promise.resolve(Providers), {ssr: false})
