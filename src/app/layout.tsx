import Providers from '@/components/ThemeProvider/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import './globals.css'
import ReactQueryProvider from '@/lib/react-query'

export const metadata: Metadata = {
	title: 'Philipe Morais | Desenvolvedor Front-End e UX/UI Designer.',
	description: 'Desenvolvedor Front-End & UX/UI Designer.',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='pt-BR' suppressHydrationWarning>
			<body className='dark:bg-neutral-dark-background bg-neutral-light-background'>
				<ReactQueryProvider>
					<Providers>
						{children}
						<SpeedInsights />
					</Providers>
					<Toaster />
				</ReactQueryProvider>
			</body>
		</html>
	)
}
