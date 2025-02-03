import { env } from '@/lib/env'

export const updateTech = async ({
	id,
	...fields
}: { id: string; name?: string; image?: string }) => {
	try {
		const response = await fetch(`${env.API_URL}/techs/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(fields), // Apenas os campos modificados serão enviados
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
