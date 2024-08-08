import prisma from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const project = await prisma.projects.findMany()
    return Response.json({ project })
  }
  catch (error) {
    return NextResponse.json(
      {
        message: 'Error', error
      },
      {
        status: 500
      }
    )
  }
}

export async function POST(request: NextRequest) {
  const { name, images, shortDescription, longDescription, href, status, techs } = await request.json()

  try {
    const project = await prisma.projects.create({
      data: {
        name,
        images,
        shortDescription,
        longDescription,
        href,
        status,
        techs
      },
    })

    return Response.json({ message: 'Project created', project })

  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error', error
      },
      {
        status: 500
      }
    )
  }
}