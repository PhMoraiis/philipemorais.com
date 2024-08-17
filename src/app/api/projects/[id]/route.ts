import prisma from '@/lib/prisma'
import { Status } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const project = await prisma.projects.delete({
      where: { id: params.id },
    })

    return NextResponse.json(project)
  } catch (error: any) {
    return NextResponse.json({
      error: 'Project not deleted',
      details: error.message
    }, { status: 400 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, images, shortDescription, longDescription, href, status, techs } = await request.json()
    const projectStatus = status ?? undefined

    const project = await prisma.projects.update({
      where: { id: params.id },
      data: {
        name,
        images,
        shortDescription,
        longDescription,
        href,
        status: projectStatus as Status,
        techs: {
          connect: techs.length > 0 ? techs.map((techID: string) => ({ id: techID })) : [],
        }
      },
      include: { techs: true }
    })

    return NextResponse.json(project)
  } catch (error: any) {
    return NextResponse.json({
      error: 'Project not updated',
      details: error.message
    }, { status: 400 })
  }
}
