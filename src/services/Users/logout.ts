import { env } from '@/lib/env'

export async function handleLogout() {
	const response = await fetch(`${env.API_URL}/logout`, {
		method: 'DELETE',
		credentials: 'include',
	})

	if (!response.ok) {
		throw new Error('Failed to Logout')
	}

	return await response.json()
}
