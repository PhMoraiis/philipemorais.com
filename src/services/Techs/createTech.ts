'use server'

import { env } from '@/lib/env'
import type { ITechData } from './types'

export const createTech = async ({
	name,
	image,
}: Partial<ITechData>) => {
	try {
		const response = await fetch(`${env.API_URL}/techs`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, image }),
		})

		const result = await response.json()

		if (!response.ok) {
			throw new Error(result.message || 'Erro ao criar tecnologia')
		}

		return result
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Erro desconhecido',
		)
	}
}
