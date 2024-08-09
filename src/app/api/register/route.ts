import prisma from '@/lib/prisma'
import { validateEmail, validatePassword } from '@/lib/validation'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, email, password } = body

  if (!validateEmail(email) || !validatePassword(password)) {
    return NextResponse.json({
      error: 'Invalid email or password'
    }, {
      status: 400
    })
  }

  const hash = bcrypt.hashSync(password, 8)
  prisma.user.create({
    data: {
      name,
      email,
      password: hash
    }
  })

  return NextResponse.json({})
}