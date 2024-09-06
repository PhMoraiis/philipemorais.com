import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    await prisma.tech.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Technology deleted successfully' })
  } catch (error) { // Removido 'any'
    return NextResponse.json(
      {
        error: 'Failed to delete technology',
        details: (error as Error).message, // Especificado o tipo de erro
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    const { name, icon } = await request.json()

    const updatedTech = await prisma.tech.update({
      where: { id },
      data: {
        name,
        icon,
      },
    })

    return NextResponse.json(updatedTech)
  } catch (error) { // Removido 'any'
    return NextResponse.json(
      {
        error: 'Failed to update technology',
        details: (error as Error).message, // Especificado o tipo de erro
      },
      { status: 500 }
    )
  }
}