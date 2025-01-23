'use client'

import AnimatedGradient from '@/components/fancy/animated-gradient-with-svg'
import { FaviconOnpholio, OnPholioLogo } from '@/components/Logos'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'

const Login = () => {
	return (
		<main className='flex items-center justify-center overflow-hidden'>
			<div className='relative h-[98vh] bg-slate-300 w-1/2 flex items-start justify-start p-10 ml-2 my-2 rounded-xl'>
				<AnimatedGradient
					colors={['#EC4899', '#F472B6', '#3B82F6']}
					speed={0.05}
					blur='medium'
				/>
				<div className='text-center relative flex items-start justify-center gap-2 flex-col'>
					<OnPholioLogo width={200} />
					<p className='text-gray-500 sm:text-lg font-RelativeBk text-left'>
						Gerenciando o seu portfólio online
					</p>
				</div>
				<div>
					<ArrowLeft size={24} />
					<Button>Back</Button>
				</div>
			</div>
			<section className='relative mx-auto w-full text-gray-600 sm:max-w-md'>
				<div className='bg-transparent p-4 py-6 sm:p-6 sm:rounded-lg flex flex-col justify-center'>
					<div className='flex items-center justify-center mb-6'>
						<FaviconOnpholio width={75} />
					</div>
					<div className='flex items-center justify-center mb-6'>
						<h2 className='text-3xl text-center font-RelativeBk'>
							Bem vindo de volta!
						</h2>
					</div>
					<form className='space-y-5'>
						<div
							className='space-y-2' // NOTE: This inline style is to show how to set the --ring variable in your CSS file in order to change the focus ring color.
							style={{ '--ring': '234 89% 74%' } as React.CSSProperties}
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
							className='space-y-2' // NOTE: This inline style is to show how to set the --ring variable in your CSS file in order to change the focus ring color.
							style={{ '--ring': '234 89% 74%' } as React.CSSProperties}
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
