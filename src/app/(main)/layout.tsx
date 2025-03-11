import Providers from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/app/globals.css'
import { Provider } from '@/app/provider'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import Navbar from '@/components/MainPage/Navbar'
import type { Metadata } from 'next'

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
			<body>
				<NextIntlClientProvider messages={messages}>
					<Providers>
						<Provider>
							<div className='container mx-auto max-w-screen-md md:max-w-screen-lg lg:max-w-screen-2xl'>
								<Navbar />
							</div>
							{children}
						</Provider>
						<SpeedInsights />
					</Providers>
					<Toaster />
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
