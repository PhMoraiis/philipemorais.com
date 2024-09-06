import prisma from '@/lib/prisma'
import type { Status } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const { id } = params

	try {
		await prisma.project.delete({
			where: { id },
		})

		return NextResponse.json({ message: 'Project deleted successfully' })
	} catch (error) {
		// Removido 'any'
		return NextResponse.json(
			{
				error: 'Failed to delete project',
				details: (error as Error).message, // Especificado como Error
			},
			{ status: 500 },
		)
	}
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const { id } = params

	try {
		const {
			name,
			image,
			imageMobile,
			imageDark,
			imageDarkMobile,
			shortDescription,
			translatedShortDescription,
			href,
			status = [],
			techs = [],
		} = await request.json()

		// Verificação para garantir que os campos obrigatórios não sejam undefined
		if (!name || !href) {
			return NextResponse.json(
				{ error: 'Name and href are required' },
				{ status: 400 },
			)
		}

		const validStatus =
			status && typeof status === 'string' ? (status as Status) : undefined

		const updatedProject = await prisma.project.update({
			where: { id },
			data: {
				name,
				image,
				imageMobile,
				imageDark,
				imageDarkMobile,
				shortDescription,
				translatedShortDescription,
				href,
				status: validStatus,
				techs: techs.length
					? { connect: techs } // Conecte as tecnologias
					: undefined,
			},
		})

		return NextResponse.json(updatedProject)
	} catch (error) {
		console.log(error)
		return NextResponse.json(
			{
				error: 'Failed to update project',
				details: (error as Error).message, // Especificado como Error
			},
			{ status: 500 },
		)
	}
}
