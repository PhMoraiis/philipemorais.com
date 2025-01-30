import { env } from '@/lib/env'
import type { ITechData } from './types'

export const updateTech = async (id: string, { name, image }: ITechData) => {
	try {
		const response = await fetch(`${env.API_URL}/techs/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, image }),
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
