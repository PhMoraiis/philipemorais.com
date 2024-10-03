import { Button } from '@/components/ui/button'
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { Stats } from '@prisma/client'
import { createProjectAction } from '@/actions/Projects'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { RadioGroupIndicator } from '@radix-ui/react-radio-group'

const createProjectSchema = z.object({
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
export default function CreateProjectForm() {
	const queryClient = useQueryClient()

	const { register, control, handleSubmit, formState, reset } =
		useForm<CreateProjectForm>({
			resolver: zodResolver(createProjectSchema),
		})

	type CreateProjectForm = z.infer<typeof createProjectSchema>

	async function handleCreateProject(data: CreateProjectForm) {
		await createProjectAction({
			title: data.title,
			description: data.description,
			href: data.href,
			techs: data.techs,
			status: data.status,
			order: data.order,
			imagesDesktop: data.imagesDesktop,
			imagesMobile: data.imagesMobile,
		})

		queryClient.invalidateQueries({ queryKey: ['projects'] })

		reset()
	}

	return (
		<form
			className='space-y-2 p-4 pb-0'
			onSubmit={handleSubmit(handleCreateProject)}
		>
			<div className='space-y-2'>
				<Label>Nome</Label>
				<Input
					{...register('title')}
					id='title'
					name='title'
					placeholder='Nome do projeto'
					autoFocus
					required
				/>
				{formState.errors.title && (
					<p className='title-red-400 text-sm'>
						{formState.errors.title.message}
					</p>
				)}
			</div>
			<div className='space-y-2'>
				<Label>Imagens Desktop</Label>
				<Input
					{...register('imagesDesktop')}
					id='image'
					name='image'
					placeholder='URLs das imagens (separadas por vírgula)'
					required
				/>
			</div>
			<div className='space-y-2'>
				<Label>Imagens Mobile</Label>
				<Input
					{...register('imagesMobile')}
					id='imageMobile'
					name='imageMobile'
					placeholder='URLs das imagens (separadas por vírgula)'
					required
				/>
			</div>
			<div className='space-y-2'>
				<Label>Descrição Curta</Label>
				<Input
					{...register('description')}
					id='description'
					name='description'
					placeholder='Descrição curta do projeto'
					required
				/>
			</div>
			<div className='space-y-2'>
				<Label>Link</Label>
				<Input
					{...register('href')}
					id='href'
					name='href'
					placeholder='Link para o projeto'
					required
				/>
			</div>
			<div className='space-y-2'>
				<Label htmlFor='status'>Status</Label>
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
					<Button type='submit'>Criar Tecnologia</Button>
				</DrawerClose>
				<DrawerClose asChild>
					<Button variant='outline'>Cancelar</Button>
				</DrawerClose>
			</DrawerFooter>
		</form>
	)
}
