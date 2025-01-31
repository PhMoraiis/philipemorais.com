import { Provider } from '@/app/provider'
import '@/app/globals.css'

export const metadata = {
	title: 'Onpholio - Gerenciamento de portfólio'
}

export default function OnpholioLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<Provider>
			<html lang='en'>
				<body>{children}</body>
			</html>
		</Provider>
	)
}
