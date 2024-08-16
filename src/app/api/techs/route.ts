import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

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

export async function POST(request: NextRequest) {
  try {
    const { name, icon } = await request.json()
    const tech = await prisma.tech.create({
      data: {
        name,
        icon,
      }
    })

    return NextResponse.json(tech)
  } catch (error: any) {
    return NextResponse.json({
      error: 'Tech not created',
      details: error.message
    }, { status: 400 })
  }
}
