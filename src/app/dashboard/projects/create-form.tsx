import { Button } from '@/components/ui/button'
import {
	DialogClose,
	DialogFooter,
	DialogTrigger,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Controller, useForm } from 'react-hook-form'

import { Ban, PlusCircle } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createProject, Stats } from '@/http/projects'
import { z } from 'zod'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getTechs } from '@/http/techs'
import type { Tech } from '../techs/page'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

const CreateProjectSchema = z.object({
	title: z.string(),
	description: z.string(),
	lightImageDesktop: z.string(),
	darkImageDesktop: z.string().optional(),
	lightImageMobile: z.string(),
	darkImageMobile: z.string().optional(),
	href: z.string().url(),
	status: z.nativeEnum(Stats),
	techs: z.array(
		z.object({
			id: z.string(),
		}),
	),
})

export default function CreateProjectForm() {
	const queryClient = useQueryClient()

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { isSubmitting, isDirty, isValid, errors },
	} = useForm<CreateProjectForm>({
		resolver: zodResolver(CreateProjectSchema),
	})

	type CreateProjectForm = z.infer<typeof CreateProjectSchema>

	async function handleCreateProject(data: CreateProjectForm) {
		try {
			await createProject({
				title: data.title,
				description: data.description,
				href: data.href,
				lightImageDesktop: data.lightImageDesktop,
				darkImageDesktop: data.darkImageDesktop,
				lightImageMobile: data.lightImageMobile,
				darkImageMobile: data.darkImageMobile,
				status: data.status,
				techs: data.techs,
			})
			toast('Tecnologia criada com sucesso!', {
				icon: <PlusCircle className='mr-2 h-4 w-4 text-green-500' />,
				duration: 2000,
			})
		} catch (error) {
			toast('Ocorreu um erro, tente novamente!', {
				icon: <Ban className='mr-2 h-4 w-4 text-red-500' />,
				description: `${error}`,
				duration: 2000,
			})
		}

		queryClient.invalidateQueries({ queryKey: ['projects'] })

		reset()
	}

	const { data } = useQuery({
		queryFn: getTechs,
		queryKey: ['techs'],
	})

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size='sm' className='h-8 gap-1'>
					<PlusCircle className='h-3.5 w-3.5' />
					<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
						Adicionar Projeto
					</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<div className='mx-auto w-full max-w-sm'>
					<DialogHeader>
						<DialogTitle>Novo Projeto</DialogTitle>
						<DialogDescription>Crie um novo projeto.</DialogDescription>
					</DialogHeader>
					<form
						id='create-project'
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
							{errors.title && (
								<p className='title-red-400 text-sm'>{errors.title.message}</p>
							)}
						</div>
						<div className='space-y-2'>
							<Label>Imagens Desktop</Label>
							<Input
								{...register('lightImageDesktop')}
								placeholder='Tema Light'
								required
							/>
							<Input
								{...register('darkImageDesktop')}
								placeholder='Tema Dark'
							/>
						</div>
						<div className='space-y-2'>
							<Label>Imagens Mobile</Label>
							<Input
								{...register('lightImageMobile')}
								placeholder='Tema Light'
								required
							/>
							<Input
								{...register('darkImageMobile')}
								placeholder='Tema Light'
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
								aria-hidden={false}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='status'>Status</Label>
							<Controller
								control={control}
								name='status'
								render={({ field }) => {
									return (
										<Select
											onValueChange={field.onChange}
											value={field.value?.toString() || ''}
										>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Escolha um Status' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Status</SelectLabel>
													<SelectItem value={Stats.Online.toString()}>
														{Stats.Online}
													</SelectItem>
													<SelectItem value={Stats.Desenvolvimento.toString()}>
														{Stats.Desenvolvimento}
													</SelectItem>
													<SelectItem value={Stats.Interrompido.toString()}>
														{Stats.Interrompido}
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
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
									const selectedTechs = field.value ?? []
									const handleTechSelection = (techId: string) => {
										const exists = selectedTechs.some(
											(tech: { id: string }) => tech.id === techId,
										)

										if (exists) {
											field.onChange(
												selectedTechs.filter(
													(tech: { id: string }) => tech.id !== techId,
												),
											)
										} else {
											// Change here: correct the object structure to match the schema
											field.onChange([...selectedTechs, { id: techId }])
										}
									}

									return (
										<div className='w-full flex flex-col gap-2'>
											{data?.techs.map((tech: Tech) => (
												<label key={tech.id} className='flex items-center'>
													<input
														type='checkbox'
														checked={selectedTechs.some(
															(t: { id: string }) => t.id === tech.id,
														)}
														onChange={() => handleTechSelection(tech.id)}
													/>
													<span className='ml-2 text-zinc-600 text-sm font-medium leading-none'>
														{tech.name}
													</span>
												</label>
											))}
										</div>
									)
								}}
							/>
						</div>
					</form>
				</div>
				<DialogFooter>
					<Button form='create-project' type='submit'>
						Criar Projeto
					</Button>
					<DialogClose asChild>
						<Button variant='outline'>Cancelar</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
