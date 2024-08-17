import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const techs = await prisma.tech.findMany()
    return NextResponse.json(techs)
  } catch (error: any) {
    return NextResponse.json({
      error: 'Failed to fetch techs',
      details: error.message
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, icon } = await request.json()

    const newTech = await prisma.tech.create({
      data: {
        name,
        icon,
      },
    })

    return NextResponse.json(newTech)
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Failed to create technology',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
