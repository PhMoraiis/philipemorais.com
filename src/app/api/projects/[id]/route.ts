import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

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
    const { name, image, shortDescription, longDescription, href, status, techIds = [] } = await request.json()

    const updatedProject = await prisma.project.update({
      where: { id },
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

    return NextResponse.json(updatedProject)
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Failed to update project',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
