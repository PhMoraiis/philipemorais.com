import Providers from '@/components/ThemeProvider/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import './globals.css'
import { Provider } from './provider'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

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
						<Provider>{children}</Provider>
						<SpeedInsights />
					</Providers>
					<Toaster />
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
