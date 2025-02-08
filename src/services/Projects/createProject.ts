import { env } from '@/lib/env'
import type { ITech } from '../Techs/createTech'

interface IProject {
	title: string
	description: string
	href: string
	initial_date: Date
	final_date: Date
	icon: string
	image: string
	techs: ITech[]
}

export async function createProject(data: IProject) {
	try {
		const response = await fetch(`${env.API_URL}/projects`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(data),
		})

		if (!response.ok) {
			const errorData = await response.json().catch(() => null)
			const errorMessage = errorData?.message || 'Erro ao criar projeto'
			throw new Error(errorMessage)
		}

		return response.json()
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Erro desconhecido',
		)
	}
}
