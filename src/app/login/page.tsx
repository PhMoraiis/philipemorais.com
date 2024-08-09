'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Navbar from '@/components/Navbar'

import Link from 'next/link'
import { useFormState } from 'react-dom'
import loginAction from './loginAction'

const Login = () => {
  const [error, formAction] = useFormState(loginAction, undefined)

  return (
    <main className="container mx-auto max-w-lg md:max-w-2xl lg:max-w-full h-[60vh] md:h-[80vh] lg:h-[80vh] flex flex-col items-center justify-center sm:px-4">
      <Navbar />
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <div className="space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Faça login no OnPholio</h3>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <form className="space-y-5" action={formAction}>
            <div>
              <Label htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                name='email'
                type="email"
                placeholder="example@onpholio.com"
                autoComplete="off"
              />
            </div>
            <div>
              <Label htmlFor="password">
                Senha
              </Label>
              <Input
                id="password"
                name='password'
                type="password"
                placeholder="************"
              />
              <Link href="/forgotpassword" className="mt-2 ml-auto inline-block text-sm underline">
                Esqueceu sua senha?
              </Link>
            </div>
            <Button type="submit" className="w-full px-4 py-2">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Login