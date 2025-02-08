import { env } from '@/lib/env'
import type { ITech } from '../Techs/createTech'

export interface IGetProject {
	id: string
	title: string
	description: string
	href: string
	initial_date: string
	final_date: string
	icon: string
	image: string
	techs: ITech[]
	createdAt: string
	updatedAt: string
}

export const getProjects = async () => {
	try {
		const response = await fetch(`${env.API_URL}/projects`, {
			credentials: 'include',
		})

		if (!response.ok) {
			const errorData = await response.json().catch(() => null)
			const errorMessage = errorData?.message || 'Erro ao obter projetos'
			throw new Error(errorMessage)
		}

		return response.json()
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Erro desconhecido',
		)
	}
}

export const getProjectByID = async (id: string) => {
	try {
		const response = await fetch(`${env.API_URL}/projects/${id}`, {
			method: 'GET',
			credentials: 'include',
		})

		if (!response.ok) {
			const errorData = await response.json().catch(() => null)
			const errorMessage =
				errorData?.message || 'Erro ao obter o projeto escolhido'
			throw new Error(errorMessage)
		}

		return response.json()
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Erro desconhecido',
		)
	}
}
