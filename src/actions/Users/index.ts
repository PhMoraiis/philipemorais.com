'use server'

import { createServerAction } from 'zsa'
import prisma from '@/database'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import * as jose from 'jose'

export const userLoginAction = createServerAction()
	.input(
		z.object({
			email: z.string().email(),
			password: z
				.string()
				.min(8)
				.regex(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				),
		}),
	)
	.handler(async ({ input }) => {
		const user = await prisma.user.findFirst({ where: { email: input.email } })
		if (!user) {
			throw new Error('Invalid email or password')
		}

		const isCorrectPassword = bcrypt.compareSync(input.password, user.password)
		if (!isCorrectPassword) {
			throw new Error('Invalid password')
		}
		const secret = new TextEncoder().encode(process.env.JWT_SECRET)
		const alg = 'HS256'
		const jwt = await new jose.SignJWT({})
			.setProtectedHeader({ alg })
			.setSubject(user.id.toString())
			.setExpirationTime('1h')
			.sign(secret)

		return { token: jwt }
	})

export const userRegisterAction = createServerAction()
	.input(
		z.object({
			name: z.string(),
			email: z.string().email(),
			password: z
				.string()
				.min(8)
				.regex(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				),
		}),
	)
	.handler(async ({ input }) => {
    const hash = bcrypt.hashSync(input.password, 8)
    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: hash,
      },
    })

    if (!user) {
      throw new Error('User not created')
    }

		return { user }
	})
