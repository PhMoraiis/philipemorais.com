interface UserLogoutRequest {
	email: string
	password: string
}

export async function logoutUser() {
	const response = await fetch('https://onpholio.onrender.com/login', {
		method: 'DELETE',
		credentials: 'include',
	})

	if (!response.ok) {
		throw new Error('Failed to Logout')
	}

	return await response.json()
}
