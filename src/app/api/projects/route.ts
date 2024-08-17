import prisma from '@/lib/prisma'
import { Status } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const projects = await prisma.projects.findMany()
    return NextResponse.json(projects)
  } catch (error: any) {
    return NextResponse.json({
      error: 'Failed to fetch projects',
      details: error.message
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, images, shortDescription, longDescription, href, status, techs } = await request.json()

    // Validate required fields
    if (!name || !shortDescription || !longDescription || !href) {
      return NextResponse.json({
        error: 'Missing required fields',
      }, { status: 400 })
    }

    // Handle status as nullable
    const projectStatus = status ?? undefined

    // Create the project
    const project = await prisma.projects.create({
      data: {
        name,
        images,
        shortDescription,
        longDescription,
        href,
        status: projectStatus as Status, // Ensure Status type is handled correctly
        techs: {
          connect: techs.length > 0 ? techs.map((techID: string) => ({ id: techID })) : [],
        },
      },
      include: { techs: true },
    })

    return NextResponse.json(project)
  } catch (error: any) {
    console.error('Error creating project:', error)
    return NextResponse.json({
      error: 'Project not created',
      details: error.message,
    }, { status: 400 })
  }
}