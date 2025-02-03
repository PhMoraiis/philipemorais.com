import { env } from '@/lib/env'

export interface IGetTech {
	id: string
	name: string
	image: string
	createdAt: string
	updatedAt: string
}

export const getTechs = async () => {
	try {
		const response = await fetch(`${env.API_URL}/techs`, {
			method: 'GET',
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

export const getTechByID = async (id: string) => {
	try {
		const response = await fetch(`${env.API_URL}/techs/${id}`, {
			method: 'GET',
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
