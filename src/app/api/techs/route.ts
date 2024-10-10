import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const techs = await prisma.tech.findMany({
			orderBy: { name: 'asc' },
		})
		return NextResponse.json(techs)
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Failed to fetch techs',
				details: (error as Error).message, // Especificando o tipo de erro
			},
			{ status: 500 },
		)
	}
}

export async function POST(request: Request) {
	try {
		const { name, icon } = await request.json()

		const newTech = await prisma.tech.create({
			data: {
				name,
				icon,
			},
		})

		return NextResponse.json(newTech)
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Failed to create technology',
				details: (error as Error).message, // Especificando o tipo de erro
			},
			{ status: 500 },
		)
	}
}
