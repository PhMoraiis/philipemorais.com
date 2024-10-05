'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import EllipseWithHoverMotion from '@/components/EllipseWithHoverMotion'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginUser } from './login-user'
import { Ban, LoaderPinwheel } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const LoginSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, 'A senha deve conter pelo menos 8 caracteres')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
		),
})

type LoginUserSchema = z.infer<typeof LoginSchema>

const Login = () => {
  const router = useRouter()
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting, isDirty, isValid },
	} = useForm<LoginUserSchema>({
		resolver: zodResolver(LoginSchema),
	})

	async function handleLoginUser(data: LoginUserSchema) {
		try {
			await loginUser({
				email: data.email,
				password: data.password,
			})
			router.push('/dashboard')
		} catch (error) {
			toast('Ocorreu um erro, tente novamente!', {
				icon: <Ban className='mr-2 h-4 w-4 text-red-500' />,
				description: `${error}`,
				duration: 2000,
			})
			console.log(error)
		}
	}

	return (
		<main className='container mx-auto max-w-lg md:max-w-2xl lg:max-w-full h-[60vh] md:h-[80vh] lg:h-[80vh] flex flex-col items-center justify-center sm:px-4'>
			<div className='w-full space-y-6 text-gray-600 sm:max-w-md'>
				<div className='text-center'>
					<div className='flex items-center justify-center'>
						<EllipseWithHoverMotion width='150' height='150' />
					</div>
					<div className='space-y-2'>
						<h3 className='text-gray-800 text-2xl font-bold sm:text-3xl font-RelativeBk'>
							Entre no OnPholio
						</h3>
					</div>
				</div>
				<div className='bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg'>
					<form className='space-y-5' onSubmit={handleSubmit(handleLoginUser)}>
						<div>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								{...register('email')}
								autoFocus
								required
								placeholder='example@onpholio.com'
							/>
							{errors?.email && (
								<p className='text-red-600 text-sm mt-1'>
									{errors.email.message}
								</p>
							)}
						</div>
						<div>
							<Label htmlFor='password'>Senha</Label>
							<Input
								id='password'
								type='password'
								{...register('password')}
								required
								placeholder='************'
							/>
							{errors?.password && (
								<p className='text-red-600 text-sm mt-1'>
									{errors.password.message}
								</p>
							)}
						</div>
						<Button
							disabled={!isDirty || !isValid || isSubmitting}
							type='submit'
							className='w-full px-4 py-2'
						>
							{isSubmitting ? (
								<LoaderPinwheel size={24} className='animate-spin' />
							) : (
								'Entrar'
							)}
						</Button>
					</form>
				</div>
			</div>
		</main>
	)
}

export default Login
