import { env } from '@/lib/env'

export interface ILoginData {
	email: string
	password: string
}

export const handleLogin = async (data: ILoginData) => {
	const response = await fetch(`${env.API_URL}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})

	if (!response.ok) {
		const error = await response.json()
		throw new Error(error.message)
	}

	return response.json()
}
