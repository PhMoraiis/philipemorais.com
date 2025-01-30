import { env } from '@/lib/env'

export const deleteAllTechs = async () => {
	try {
		const response = await fetch(`${env.API_URL}/techs`, {
			method: 'DELETE',
		})

		const result = await response.json()

		if (!response.ok) {
			throw new Error(result.message)
		}

		return result
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
		})

		const result = await response.json()

		if (!response.ok) {
			throw new Error(result.message)
		}

		return result
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Erro desconhecido',
		)
	}
}
