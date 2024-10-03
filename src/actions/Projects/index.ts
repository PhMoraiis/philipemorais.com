'use server'

import { createServerAction } from 'zsa'
import prisma from '@/database'
import { z } from 'zod'
import { Stats } from '@prisma/client'

export const getAllProjectsAction = createServerAction().handler(async () => {
	const projects = await prisma.project.findMany({
		include: {
			techs: true,
		},
	})
	return { projects }
})

export const getProjectByIdAction = createServerAction()
	.input(z.object({ id: z.string() }))
	.handler(async ({ input }) => {
		const project = await prisma.project.findUnique({
			where: {
				id: input.id,
			},
			include: {
				techs: true,
			},
		})
		if (!project) {
			throw new Error('Project not found')
		}
		return { project }
	})

export const updateProjectByIdAction = createServerAction()
	.input(
		z.object({
			id: z.string(),
			newTitle: z.string(),
			newDescription: z.string(),
			newHref: z.string().url('Link inválido').min(1, 'O link é obrigatório'),
			newTechs: z
				.array(z.string())
				.min(1, 'Selecione pelo menos uma tecnologia'),
			newStatus: z.nativeEnum(Stats),
			newImagesDesktop: z
				.array(z.string())
				.min(2, 'Selecione duas imagens')
				.max(2, 'Selecione duas imagens'),
			newImagesMobile: z
				.array(z.string())
				.min(2, 'Selecione duas imagens')
				.max(2, 'Selecione duas imagens'),
		}),
	)
	.handler(async ({ input }) => {
		const updatedProject = await prisma.project.update({
			where: { id: input.id },
			data: {
				title: input.newTitle,
				description: input.newDescription,
				href: input.newHref,
				status: input.newStatus,
				imagesDesktop: input.newImagesDesktop,
				imagesMobile: input.newImagesMobile,
				techs: {
					connect: input.newTechs.map((tech) => ({ id: tech })),
				},
			},
		})

		if (!updatedProject) {
			throw new Error('Failed to update user')
		}

		return { updatedProject }
	})

export const createProjectAction = createServerAction()
	.input(
		z.object({
			title: z.string(),
			description: z.string(),
			href: z.string().url('Link inválido').min(1, 'O link é obrigatório'),
			techs: z.array(z.string()).min(1, 'Selecione pelo menos uma tecnologia'),
			status: z.nativeEnum(Stats),
			order: z.number(),
			imagesDesktop: z
				.array(z.string())
				.min(2, 'Selecione duas imagens')
				.max(2, 'Selecione duas imagens'),
			imagesMobile: z
				.array(z.string())
				.min(2, 'Selecione duas imagens')
				.max(2, 'Selecione duas imagens'),
		}),
	)
	.handler(async ({ input }) => {
		const project = await prisma.project.create({
			data: {
				title: input.title,
				description: input.description,
				href: input.href,
				status: input.status,
				order: input.order,
				imagesDesktop: input.imagesDesktop,
				imagesMobile: input.imagesMobile,
				techs: {
					connect: input.techs.map((tech) => ({ id: tech })),
				},
			},
			include: { techs: true },
		})

		if (!project) {
			throw new Error('Project not created')
		}

		return { project }
	})

export const updateProjectOrderAction = createServerAction()
	.input(
		z.array(
			z.object({
				id: z.string(),
				order: z.number(),
			}),
		),
	)
	.handler(async ({ input }) => {
		for (const project of input) {
			await prisma.project.update({
				where: { id: project.id },
				data: { order: project.order },
			})
		}

		return { message: 'Order updated successfully' }
	})

export const deleteProjectByIdAction = createServerAction()
	.input(z.object({ id: z.string() }))
	.handler(async ({ input }) => {
		const deletedProject = await prisma.project.delete({
			where: { id: input.id },
		})
		if (!deletedProject) {
			throw new Error('Failed to delete project')
		}
		return { deletedProject }
	})
