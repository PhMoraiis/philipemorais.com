import { Provider } from '@/app/provider'
import '@/app/globals.css'
import { Toaster } from '@/components/ui/toaster'
import Providers from '@/components/ThemeProvider'
import { NextIntlClientProvider } from 'next-intl'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getLocale, getMessages } from 'next-intl/server'

export const metadata = {
	title: 'Onpholio - Gerenciamento de portfólio',
}

export default async function OnpholioLayout({
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
