import { env } from '@/lib/env'

interface UpdateTechRequest {
	name: string
	image: string
}

export const updateTech = async (
	id: string,
	{ name, image }: UpdateTechRequest,
) => {
	try {
		const response = await fetch(`${env.API_URL}/techs/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				name,
				image,
			}),
		})

		if (!response.ok) {
			const errorData = await response.json().catch(() => null)
			const errorMessage = errorData?.message || 'Erro ao atualizar tecnologia'
			throw new Error(errorMessage)
		}

		return response.json()
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Erro desconhecido',
		)
	}
}
