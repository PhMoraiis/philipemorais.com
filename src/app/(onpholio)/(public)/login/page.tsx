'use client'

import AnimatedGradient from '@/components/fancy/animated-gradient-with-svg'
import { FaviconOnpholio, OnPholioLogo } from '@/components/Logos'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Check, CircleX } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { handleLogin } from '@/services/Users/login'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import type { ILoginData } from '@/services/Users/types'

const formSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			{
				message:
					'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
			},
		),
})

const Login = () => {
	const router = useRouter()
	const { toast } = useToast()

	const { handleSubmit, register, formState: { isDirty, isValid } } = useForm<ILoginData>({
		resolver: zodResolver(formSchema),
	})

	const loginMutation = useMutation({
		mutationFn: handleLogin,
		onSuccess: (result) => {
			toast({
				title: 'Login successful!',
				description: `${result.message}`,
				variant: 'success',
				action: <Check />,
			})
			router.push('/dashboard')
		},
		onError: (error) => {
			toast({
				title: 'There was an error',
				description: `${error instanceof Error ? error.message : 'Erro desconhecido'}`,
				variant: 'destructive',
				action: <CircleX />,
			})
		},
	})
	const handleSubmitForm = handleSubmit((data) => {
		loginMutation.mutate(data)
	})

	return (
		<section className='flex items-center justify-center overflow-hidden'>
			<div className='relative h-[98vh] bg-slate-300 w-1/2 flex items-start justify-between p-10 ml-2 my-2 rounded-xl'>
				{/* <AnimatedGradient
					colors={['#0F2027', '#203A43', '#2C5364']}
					speed={0.05}
					blur='heavy'
				/> */}
				<div className='flex justify-center items-center relative'>
					<Button className='text-foreground' onClick={() => router.forward()} variant='link'>
						<ArrowLeft size={24} /> Back
					</Button>
				</div>
				<div className='text-center relative flex items-start justify-center gap-2 flex-col'>
					<OnPholioLogo width={200} />
					<AnimatedShinyText className='text-zinc-500'>
						<p className='sm:text-lg font-RelativeBk text-left'>
							Gerenciando o seu portfólio online
						</p>
					</AnimatedShinyText>
				</div>
			</div>
			<section className='relative mx-auto w-full text-gray-600 sm:max-w-md'>
				<div className='bg-transparent p-4 py-6 sm:p-6 sm:rounded-lg flex flex-col justify-center'>
					<div className='flex items-center justify-center mb-6'>
						<FaviconOnpholio width={75} />
					</div>
					<div className='flex items-center justify-center mb-6'>
						<AnimatedShinyText className='text-zinc-600'>
							<span className='text-3xl font-RelativeBd'>
								Bem vindo de volta!
							</span>
						</AnimatedShinyText>
					</div>
					<form onSubmit={handleSubmitForm} className='space-y-5'>
						<div className='space-y-2'>
							<Input
								id='email'
								type='email'
								placeholder='Seu e-mail'
								autoComplete='off'
								{...register('email')}
							/>
						</div>
						<div className='space-y-2'>
							<Input
								id='password'
								placeholder='********'
								type='password'
								{...register('password')}
							/>
						</div>
						<Button type='submit' className='w-full px-4 py-2 bg-foreground text-background hover:bg-foreground/85' disabled={!isDirty || !isValid}>
							Entrar	
						</Button>
					</form>
				</div>
			</section>
		</section>
	)
}

export default Login
