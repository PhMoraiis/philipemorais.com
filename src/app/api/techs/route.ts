import prisma from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const tech = await prisma.tech.findMany()
    return Response.json({ tech })
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
  const { name, icon } = await request.json()

  try {
    const tech = await prisma.tech.create({
      data: {
        name,
        icon
      },
    })

    return Response.json({ message: 'Tech created', tech })

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

export async function DELETE(request: NextRequest) {
  const { id } = await request.json()

  try {
    const tech = await prisma.tech.delete({
      where: {
        id
      }
    })

    return Response.json({ message: 'Tech deleted', tech })
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

export async function PUT(request: NextRequest) {
  const { id, name, icon } = await request.json()

  try {
    const tech = await prisma.tech.update({
      where: {
        id
      },
      data: {
        name,
        icon
      }
    })

    return Response.json({ message: 'Tech updated', tech })
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