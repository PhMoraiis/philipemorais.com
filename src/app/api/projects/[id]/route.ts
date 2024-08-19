import { PrismaClient, Status } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    await prisma.project.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Failed to delete project',
        details: error.message,
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    const { name, image, imageMobile, shortDescription, longDescription, href, status = [], techIds = [] } = await request.json()

    const validStatus = status && typeof status === 'string' ? (status as Status) : undefined

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        name,
        image,
        imageMobile,
        shortDescription,
        longDescription,
        href,
        status: validStatus,
        techs: techIds.length ? { connect: techIds.map((id: string) => ({ id })) } : undefined,
      },
    })

    return NextResponse.json(updatedProject)
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(
      {
        error: 'Failed to update project',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
