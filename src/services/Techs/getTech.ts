import { env } from '@/lib/env'

export const getTechs = async () => {
	try {
		const response = await fetch(`${env.API_URL}/techs`, {
			method: 'GET',
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

export const getTechByID = async (id: string) => {
	try {
		const response = await fetch(`${env.API_URL}/techs/${id}`, {
			method: 'GET',
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
