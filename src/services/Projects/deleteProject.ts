import { env } from '@/lib/env'

export const deleteProjectByID = async (id: string) => {
	try {
		const response = await fetch(`${env.API_URL}/projects/${id}`, {
			method: 'DELETE',
			credentials: 'include',
		})

		if (!response.ok) {
			const errorData = await response.json().catch(() => null)
			const errorMessage = errorData?.message || 'Erro ao criar tecnologia'
			throw new Error(errorMessage)
		}

		return response.json()
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Erro desconhecido',
		)
	}
}
