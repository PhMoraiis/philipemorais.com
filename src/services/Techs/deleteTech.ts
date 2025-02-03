import { env } from '@/lib/env'

export const deleteAllTechs = async () => {
	try {
		const response = await fetch(`${env.API_URL}/techs`, {
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

export const deleteTechByID = async (id: string) => {
	try {
		const response = await fetch(`${env.API_URL}/techs/${id}`, {
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
