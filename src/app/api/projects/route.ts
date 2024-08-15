import prisma from '@/lib/prisma'
import { Status } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const projects = await prisma.projects.findMany()
    return NextResponse.json(projects)
  } catch (error: any) {
    return NextResponse.json({
      error: 'Failed to fetch projects',
      details: error.message
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, images, shortDescription, longDescription, href, status, techs } = await request.json()
    const project = await prisma.projects.create({
      data: {
        name,
        images,
        shortDescription,
        longDescription,
        href,
        status: status as Status,
        techs: {
          connect: techs.map((techID: string) => ({ id: techID }))
        }
      },
      include: { techs: true }
    })

    return NextResponse.json(project)
  } catch (error: any) {
    return NextResponse.json({
      error: 'Project not created',
      details: error.message
    }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const project = await prisma.projects.delete({
      where: { id }
    })

    return NextResponse.json(project)
  } catch (error: any) {
    return NextResponse.json({
      error: 'Project not deleted',
      details: error.message
    }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name, images, shortDescription, longDescription, href, status, techs } = await request.json()
    const project = await prisma.projects.update({
      where: { id },
      data: {
        name,
        images,
        shortDescription,
        longDescription,
        href,
        status: status as Status,
        techs: {
          connect: techs.map((techID: string) => ({ id: techID }))
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
