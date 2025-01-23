'use client'

import AnimatedGradient from '@/components/fancy/animated-gradient-with-svg'
import { FaviconOnpholio, OnPholioLogo } from '@/components/Logos'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SparklesText } from '@/components/ui/sparkles-text'
import { ArrowLeft } from 'lucide-react'

const Login = () => {
	return (
		<main className='flex items-center justify-center overflow-hidden'>
			<div className='relative h-[98vh] bg-slate-300 w-1/2 flex items-start justify-between p-10 ml-2 my-2 rounded-xl'>
				<AnimatedGradient
					colors={['#0F2027', '#203A43', '#2C5364']}
					speed={0.05}
					blur='medium'
				/>
				<div className='flex justify-center items-center relative'>
					<Button variant='link'>
						<ArrowLeft size={24} /> Back
					</Button>
				</div>
				<div className='text-center relative flex items-start justify-center gap-2 flex-col'>
					<OnPholioLogo width={200} />
					<AnimatedShinyText className='text-zinc-900'>
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
						<AnimatedShinyText className='text-zinc-700'>
							<span className='text-3xl font-RelativeBd'>
								Bem vindo de volta!
							</span>
						</AnimatedShinyText>
					</div>
					<form className='space-y-5'>
						<div
							className='space-y-2'
							style={{ '--ring': '198 40% 11%' } as React.CSSProperties}
						>
							<Input
								id='email'
								name='email'
								type='email'
								placeholder='Seu e-mail'
								autoComplete='off'
							/>
						</div>
						<div
							className='space-y-2'
							style={{ '--ring': '198 40% 11%' } as React.CSSProperties}
						>
							<Input id='password' placeholder='********' type='password' />
						</div>
						<Button type='submit' className='w-full px-4 py-2'>
							Entrar
						</Button>
					</form>
				</div>
			</section>
		</main>
	)
}

export default Login
