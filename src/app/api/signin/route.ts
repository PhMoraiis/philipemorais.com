import prisma from '@/lib/prisma'
import { validateEmail, validatePassword } from '@/lib/validation'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import * as jose from 'jose'

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

  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })

  const isCorrectPassword = await bcrypt.compareSync(password, user.password)

  if (!user) {
    return NextResponse.json({
      error: 'Invalid email or password'
    }, {
      status: 400
    })
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const alg = 'HS256'
  const jwt = await new jose.SignJWT({ })
    .setProtectedHeader({ alg })
    .setSubject(user.id.toString())
    .setExpirationTime('1h')
    .sign(secret)

  return NextResponse.json({ token: jwt })
}