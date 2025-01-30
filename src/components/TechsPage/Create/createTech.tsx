import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createTech } from '@/services/Techs/createTech'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { PlusCircle } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createTechSchema = z.object({
	name: z.string().min(1, { message: 'Enter the name of the technology' }),
	image: z
		.string()
		.min(1, { message: 'Enter the image or icon of the technology' }),
})

type CreateTechForm = z.infer<typeof createTechSchema>

export default function CreateTech() {
	const queryClient = useQueryClient()

	const { register, handleSubmit, formState, reset } =
		useForm<CreateTechForm>({
			resolver: zodResolver(createTechSchema),
		})

	const handleCreateTech = async (data: CreateTechForm) => {
		await createTech({
			name: data.name,
			image: data.image,
		})

		reset()
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button size='sm' className='h-8 gap-1'>
					<PlusCircle className='h-3.5 w-3.5' />
					<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
						Adicionar Tecnologia
					</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className='mx-auto w-full max-w-sm'>
					<DrawerHeader>
						<DrawerTitle>Nova Tecnologia</DrawerTitle>
						<DrawerDescription>Adicione uma nova tecnologia.</DrawerDescription>
					</DrawerHeader>
					<form
						onSubmit={handleSubmit(handleCreateTech)}
						className='space-y-2 p-4 pb-0'
					>
						<div className='space-y-2'>
							<Label htmlFor='name'>Nome</Label>
							<Input
								id='name'
								placeholder='Nome da tecnologia'
								required
								{...register('name')}
							/>

							{formState.errors.name && (
								<p className='title-red-400 text-sm'>
									{formState.errors.name.message}
								</p>
							)}
						</div>
						<div className='space-y-2'>
							<Label htmlFor='icon'>Ícone</Label>
							<Input
								id='icon'
								placeholder='Icone da tecnologia'
								required
								{...register('image')}
							/>

							{formState.errors.image && (
								<p className='title-red-400 text-sm'>
									{formState.errors.image.message}
								</p>
							)}
						</div>
						<DrawerFooter>
							<DrawerClose asChild>
								<Button type='submit'>Criar Tecnologia</Button>
							</DrawerClose>
							<DrawerClose asChild>
								<Button variant='outline'>Cancelar</Button>
							</DrawerClose>
						</DrawerFooter>
					</form>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
