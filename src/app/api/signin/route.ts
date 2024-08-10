import prisma from '@/lib/prisma'
import { validateEmail, validatePassword } from '@/lib/validation'
import bcrypt from 'bcrypt'
import * as jose from 'jose'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password } = body

  if (!validateEmail(email) || !validatePassword(password)) {
    return NextResponse.json({
      error: 'Invalid email or password'
    }, {
      status: 400
    })
  }

  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })

  if (!user) {
    return NextResponse.json(
      {
        error: 'Invalid email or password',
      },
      {
        status: 400,
      }
    )
  }

  const isCorrectPassword = bcrypt.compareSync(password, user.password)

  if (!isCorrectPassword) {
    return NextResponse.json({
      error: 'Invalid password'
    }, {
      status: 400
    })
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const alg = 'HS256'
  const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg })
    .setSubject(user.id.toString())
    .setExpirationTime('1h')
    .sign(secret)

  return NextResponse.json({ token: jwt })
}