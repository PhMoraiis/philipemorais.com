interface UserLogoutRequest {
	email: string
	password: string
}

export async function logoutUser() {
	const response = await fetch('http://localhost:3333/login', {
		method: 'DELETE',
		credentials: 'include',
	})

	if (!response.ok) {
		throw new Error('Failed to Logout')
	}

	return await response.json()
}
