'use server'

import { env } from '@/lib/env'
import { cookies } from 'next/headers'
import type { ILoginData, ILoginResponse } from './types'

export const handleLogin = async ({
	email,
	password,
}: ILoginData): Promise<ILoginResponse> => {
	try {
		const response = await fetch(`${env.API_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		})

		const result: ILoginResponse = await response.json()

		if (!response.ok) {
			throw new Error(result.message || 'Erro ao fazer login')
		}

		if (result.accessToken) {
			;(await cookies()).set('access_token', result.accessToken)
		}

		return result
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Erro desconhecido',
		)
	}
}
