export async function getTechs() {
	const response = await fetch('http://localhost:3333/techs', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	})

	if (!response.ok) {
		throw new Error('Failed to get techs')
	}

	console.log(response)
	return await response.json()
}

interface CreateTechRequest {
	name: string
	image: string
}
export async function createTech({ name, image }: CreateTechRequest) {
	await fetch('http://localhost:3333/techs', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify({
			name,
			image,
		}),
	})
}

export async function deleteTech(techId: string) {
	await fetch(`http://localhost:3333/techs/${techId}`, {
		method: 'DELETE',
		credentials: 'include',
	})
}
