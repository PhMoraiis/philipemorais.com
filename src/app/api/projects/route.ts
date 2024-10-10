import prisma from '@/lib/prisma'
import type { Status } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const projects = await prisma.project.findMany({
			orderBy: { createdAt: 'asc' },
			include: { techs: true }, // Incluir tecnologias
		})
		return NextResponse.json(projects)
	} catch (error) {
		// Remover 'any'
		return NextResponse.json(
			{
				error: 'Failed to fetch projects',
				details: (error as Error).message, // Especificar o tipo de erro
			},
			{ status: 500 },
		)
	}
}

export async function POST(request: Request) {
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
			techs = [], // Certifique-se de que está recebendo as techs
		} = await request.json()

		const newProject = await prisma.project.create({
			data: {
				name,
				image,
				imageMobile,
        imageDark,
        imageDarkMobile,
				shortDescription,
				translatedShortDescription,
				href,
				status: status as Status,
				techs: techs.length
					? { connect: techs } // Conecte as tecnologias
					: undefined,
			},
		})

		return NextResponse.json(newProject)
	} catch (error) {
		// Remover 'any'
		return NextResponse.json(
			{
				error: 'Failed to create project',
				details: (error as Error).message, // Especificar o tipo de erro
			},
			{ status: 500 },
		)
	}
}
