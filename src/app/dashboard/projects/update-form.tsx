import { updateProjectByIdAction } from '@/actions/Projects'
import { Button } from '@/components/ui/button'
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { zodResolver } from '@hookform/resolvers/zod'
import { RadioGroupIndicator } from '@radix-ui/react-radio-group'
import { useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const updateProjectSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	href: z.string().url('Link inválido').min(1, 'O link é obrigatório'),
	techs: z.array(z.string()).min(1, 'Selecione pelo menos uma tecnologia'),
	status: z.nativeEnum(Stats),
	order: z.number(),
	imagesDesktop: z
		.array(z.string())
		.min(2, 'Selecione duas imagens')
		.max(2, 'Selecione duas imagens'),
	imagesMobile: z
		.array(z.string())
		.min(2, 'Selecione duas imagens')
		.max(2, 'Selecione duas imagens'),
})

export default function UpdateProjectForm() {
	const queryClient = useQueryClient()

	const { register, control, handleSubmit, formState, reset } =
		useForm<UpdateProjectForm>({
			resolver: zodResolver(updateProjectSchema),
		})

	type UpdateProjectForm = z.infer<typeof updateProjectSchema>

	async function handleUpdateProject(data: UpdateProjectForm) {
		await updateProjectByIdAction({
			id: data.id,
			newTitle: data.title,
			newDescription: data.description,
			newHref: data.href,
			newTechs: data.techs,
			newStatus: data.status,
			newImagesDesktop: data.imagesDesktop,
			newImagesMobile: data.imagesMobile,
		})

		queryClient.invalidateQueries({ queryKey: ['techs'] })
		queryClient.invalidateQueries({ queryKey: ['projects'] })

		reset()
	}

	return (
		<form
			className='space-y-2 p-4 pb-0'
			onSubmit={handleSubmit(handleUpdateProject)}
		>
			<div className='space-y-2'>
				<Label>Nome</Label>
				<Input id='title' {...register('title')} />
			</div>
			<div className='space-y-2'>
				<Label>Imagens Desktop</Label>
				<Input id='image' {...register('imagesDesktop')} />
			</div>
			<div className='space-y-2'>
				<Label>Imagens Mobile</Label>
				<Input id='imageMobile' {...register('imagesMobile')} />
			</div>
			<div className='space-y-2'>
				<Label>Descrição Curta</Label>
				<Input id='description' {...register('description')} />
			</div>
			<div className='space-y-2'>
				<Label>Link</Label>
				<Input id='href' {...register('href')} />
			</div>
			<div className='space-y-2'>
				<Label>Status</Label>
				<Controller
					control={control}
					name='status'
					render={({ field }) => {
						return (
							<RadioGroup
								onValueChange={field.onChange}
								value={String(field.value)}
							>
								<RadioGroupItem value='1'>
									<RadioGroupIndicator />
									<span className='text-zinc-300 text-sm font-medium leading-none'>
										Online
									</span>
								</RadioGroupItem>
								<RadioGroupItem value='2'>
									<RadioGroupIndicator />
									<span className='text-zinc-300 text-sm font-medium leading-none'>
										Desenvolvimento
									</span>
								</RadioGroupItem>
								<RadioGroupItem value='3'>
									<RadioGroupIndicator />
									<span className='text-zinc-300 text-sm font-medium leading-none'>
										Interrompido
									</span>
								</RadioGroupItem>
							</RadioGroup>
						)
					}}
				/>
			</div>
			<div className='space-y-2'>
				<Label>Tecnologias</Label>
				<Controller
					control={control}
					name='techs'
					render={({ field }) => {
						return (
							<RadioGroup
								onValueChange={field.onChange}
								value={String(field.value)}
							>
								{techs.map((tech) => (
									<RadioGroupItem value='1'>
										<RadioGroupIndicator />
										<span className='text-zinc-300 text-sm font-medium leading-none'>
											Online
										</span>
									</RadioGroupItem>
								))}
							</RadioGroup>
						)
					}}
				/>
			</div>
			<DrawerFooter>
				<DrawerClose asChild>
					<Button type='submit'>Editar Projeto</Button>
				</DrawerClose>
				<DrawerClose asChild>
					<Button variant='outline'>Cancelar</Button>
				</DrawerClose>
			</DrawerFooter>
		</form>
	)
}
