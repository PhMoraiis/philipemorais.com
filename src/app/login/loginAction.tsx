'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export default async function loginAction(currentState: any, formData: FormData): Promise<string> {
  const email = formData.get('email')
  const password = formData.get('password')

  const res = await fetch(process.env.ROOT_URL + '/api/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })

  const data = await res.json()

  if (res.ok) {
    cookies().set('token', data.token, {
      secure: true,
      httpOnly: true,
      expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
      path: '/',
      sameSite: 'strict'
    })
    redirect('/dashboard')
  }
  else {
    return data.error
  }
} 