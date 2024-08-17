import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const projects = await prisma.project.findMany()
    return NextResponse.json(projects)
  } catch (error: any) {
    return NextResponse.json({
      error: 'Failed to fetch projects',
      details: error.message
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, image, shortDescription, longDescription, href, status, techIds = [] } = await request.json()

    const newProject = await prisma.project.create({
      data: {
        name,
        image,
        shortDescription,
        longDescription,
        href,
        status,
        techs: techIds.length ? { connect: techIds.map((id: string) => ({ id })) } : undefined,
      },
    })

    return NextResponse.json(newProject)
  } catch (error: any) {
    console.error('Error creating project:', error) // Log the error for debugging
    return NextResponse.json(
      {
        error: 'Failed to create project',
        details: error.message,
      },
      { status: 500 }
    )
  }
}

