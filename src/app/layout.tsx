import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from 'next-themes'


export const metadata: Metadata = {
  title: 'Philipe Morais - Desenvolvedor Front-End & Designer',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-Br">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
