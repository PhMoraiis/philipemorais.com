import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Stats, updateProject } from '@/http/projects'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Ban, Pen, PlusCircle } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { getTechs } from '@/http/techs'
import type { Tech } from '../techs/page'

const updateProjectSchema = z.object({
	title: z.string(),
	description: z.string(),
	lightImageDesktop: z.string(),
	darkImageDesktop: z.string().optional(),
	lightImageMobile: z.string(),
	darkImageMobile: z.string().optional(),
	href: z.string(),
	status: z.nativeEnum(Stats),
	techs: z
		.array(
			z.object({
				id: z.string(),
			}),
		),
})

export default function UpdateProjectForm({
	projectId,
}: { projectId: string }) {
	const queryClient = useQueryClient()

	const {
		register,
		handleSubmit,
		reset,
		control,
	} = useForm<UpdateProjectForm>({
		resolver: zodResolver(updateProjectSchema),
	})
	type UpdateProjectForm = z.infer<typeof updateProjectSchema>

	async function handleUpdateProject(
		projectId: string,
		data: UpdateProjectForm,
	) {
		console.log('Dados recebidos para atualização', data)
		try {
			await updateProject(projectId, {
				title: data.title,
				description: data.description,
				href: data.href,
				lightImageDesktop: data.lightImageDesktop,
				darkImageDesktop: data.darkImageDesktop,
				lightImageMobile: data.lightImageMobile,
				darkImageMobile: data.darkImageMobile,
				status: data.status,
				techs: data.techs?.filter(
					(tech): tech is { id: string } => tech !== undefined,
				),
			})
			toast('Tecnologia editada com sucesso!', {
				icon: <PlusCircle className='mr-2 h-4 w-4 text-green-500' />,
				duration: 2000,
			})
		} catch (error) {
			console.log(error)
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
				<Button
					className='flex justify-between w-full'
					size='sm'
					variant='outline'
				>
					Editar <Pen className='h-4 w-4' />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<div className='mx-auto w-full max-w-sm'>
					<DialogHeader>
						<DialogTitle>Editar</DialogTitle>
						<DialogDescription>
							Edite com sabedoria o projeto escolhido.
						</DialogDescription>
					</DialogHeader>
					<form
						id='update-project'
						className='space-y-2 p-4 pb-0'
						onSubmit={handleSubmit((data) =>
							handleUpdateProject(projectId, data),
						)}
					>
						<div className='space-y-2'>
							<Label>Nome</Label>
							<Input
								{...register('title')}
								id='title'
								name='title'
								placeholder={'Nome do projeto'}
								autoFocus
								required
							/>
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
							<Input {...register('darkImageMobile')} placeholder='Tema Dark' />
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
								aria-hidden={false}
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
											(tech: { id: string } | undefined) =>
												tech !== undefined && tech.id === techId,
										)
										if (exists) {
											field.onChange(
												selectedTechs.filter(
													(tech): tech is { id: string } =>
														tech !== undefined && tech.id !== techId,
												),
											)
										} else {
											field.onChange([...selectedTechs, { id: techId }])
										}
									}

									return (
										<div className='w-full flex flex-col gap-2'>
											{data?.techs.map((tech: Tech) => (
												<label key={tech.id} className='flex items-center'>
													<input
														type='checkbox'
														className='w-4 h-4 rounded bg-zinc-100 border-zinc-300'
														checked={selectedTechs
															.filter(
																(t): t is { id: string } => t !== undefined,
															)
															.some((t) => t.id === tech.id)}
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
					<Button form='update-project' type='submit'>
						Editar Projeto
					</Button>
					<DialogClose asChild>
						<Button variant='outline'>Cancelar</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
