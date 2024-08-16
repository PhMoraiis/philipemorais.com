import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const tech = await prisma.tech.delete({
      where: { id: params.id }
    })

    return NextResponse.json(tech)
  } catch (error: any) {
    return NextResponse.json({ error: 'Tech not deleted' }, { status: 400 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, icon } = await request.json()
    const tech = await prisma.tech.update({
      where: { id: params.id },
      data: { name, icon }
    })

    return NextResponse.json(tech)
  } catch (error: any) {
    return NextResponse.json({
      error: 'Tech not updated',
      details: error.message
    }, { status: 400 })
  }
}