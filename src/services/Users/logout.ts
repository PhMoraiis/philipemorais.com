'use server'

import { env } from '@/lib/env'
import { cookies } from 'next/headers'

export interface ILogoutResponse {
	message: string
}

export const handleLogout = async (): Promise<ILogoutResponse> => {
	try {
		const response = await fetch(`${env.API_URL}/logout`, {
			method: 'DELETE',
		})

		const result: ILogoutResponse = await response.json()

		if (!response.ok) {
			throw new Error(result.message || 'Erro ao fazer login')
		}

		if (response.ok) {
			;(await cookies()).delete('access_token')
		}

		return result
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Erro desconhecido',
		)
	}
}
