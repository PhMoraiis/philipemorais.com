import { env } from '@/lib/env'

export const updateProjectOrder = async (id: string, newOrder: number) => {
	try {
		const response = await fetch(
			`${env.API_URL}/projects/${id}/order/${newOrder}`,
			{
				method: 'PUT',
				credentials: 'include',
			},
		)

		if (!response.ok) {
			const errorData = await response.json().catch(() => null)
			const errorMessage = errorData?.message || 'Erro ao ordernar projeto'
			throw new Error(errorMessage)
		}

		return response.json()
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Erro desconhecido',
		)
	}
}
