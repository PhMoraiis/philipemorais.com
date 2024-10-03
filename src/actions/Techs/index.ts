'use server'

import { createServerAction } from 'zsa'
import prisma from '@/database'
import { z } from 'zod'

export const getAllTechsAction = createServerAction().handler(async () => {
	const techs = await prisma.tech.findMany()
	return { techs }
})

export const getTechByIdAction = createServerAction()
	.input(z.object({ id: z.string() }))
	.handler(async ({ input }) => {
		const tech = await prisma.tech.findUnique({ where: { id: input.id } })
		if (!tech) {
			throw new Error('Tech not found')
		}
		return { tech }
	})

export const updateTechByIdAction = createServerAction()
	.input(
		z.object({
			id: z.string(),
			newName: z.string(),
			newImage: z.string(),
		}),
	)
	.handler(async ({ input }) => {
		const updatedTech = await prisma.tech.update({
			where: { id: input.id },
			data: {
				name: input.newName,
				image: input.newImage,
			},
		})

		if (!updatedTech) {
			throw new Error('Failed to update user')
		}

		return { updatedTech }
	})

export const createTechAction = createServerAction()
	.input(
		z.object({
			name: z.string(),
			image: z.string(),
			order: z.number(),
		}),
	)
	.handler(async ({ input }) => {
		const tech = await prisma.tech.create({
			data: {
				name: input.name,
				image: input.image,
				order: input.order,
			},
		})

		if (!tech) {
			throw new Error('Tech not created')
		}

		return { tech }
	})

export const updateTechOrderAction = createServerAction()
	.input(
		z.array(
			z.object({
				id: z.string(),
				order: z.number(),
			}),
		),
	)
	.handler(async ({ input }) => {
		for (const tech of input) {
			await prisma.tech.update({
				where: { id: tech.id },
				data: { order: tech.order },
			})
		}
		return { message: 'Order updated successfully' }
	})

export const deleteTechByIdAction = createServerAction()
	.input(z.object({ id: z.string() }))
	.handler(async ({ input }) => {
		const deletedTech = await prisma.tech.delete({
			where: { id: input.id },
		})
		if (!deletedTech) {
			throw new Error('Failed to delete tech')
		}
		return { deletedTech }
	})
