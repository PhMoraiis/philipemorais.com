import prisma from '@/lib/prisma'
import { Status } from '@prisma/client'
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
    const { name, image, imageMobile, shortDescription, translatedShortDescription, href, status = [], techIds = [] } = await request.json()

    const newProject = await prisma.project.create({
      data: {
        name,
        image,
        imageMobile,
        shortDescription,
        translatedShortDescription,
        href,
        status: status as Status,
        techs: techIds.length ? { connect: techIds.map((id: string) => ({ id })) } : undefined,
      },
    })

    return NextResponse.json(newProject)
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(
      {
        error: 'Failed to create project',
        details: error.message,
      },
      { status: 500 }
    )
  }
}

