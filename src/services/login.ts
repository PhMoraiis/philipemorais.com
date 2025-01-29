'use server'

import { env } from '@/lib/env'
import { cookies } from 'next/headers'

export interface ILoginData {
	email: string
	password: string
}

export interface ILoginResponse {
	success: boolean
	message: string
	accessToken?: string
	name: string
}

export const handleLogin = async (
	data: ILoginData,
): Promise<ILoginResponse> => {

	try {
		const response = await fetch(`${env.API_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		const result: ILoginResponse = await response.json()

		if (!response.ok) {
			throw new Error(result.message || 'Erro ao fazer login')
		}

		if (result.accessToken) {
			(await cookies()).set('access_token', result.accessToken)
		}

		return result
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Erro desconhecido',
		)
	}
}
