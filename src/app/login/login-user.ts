interface UserLoginRequest {
	email: string
	password: string
}

export async function loginUser(formData: UserLoginRequest) {
	const response = await fetch('https://onpholio.onrender.com/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: formData.email,
			password: formData.password,
		}),
		credentials: 'include',
	})

	if (!response.ok) {
		throw new Error('Failed to login')
	}

	return await response.json()
}
