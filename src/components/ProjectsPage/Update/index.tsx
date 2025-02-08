import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import type { Option } from '@/components/ui/multiselect'
import MultipleSelector from '@/components/ui/multiselect'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import type { IProject } from '@/services/Projects/type'
import { updateProject } from '@/services/Projects/updateProject'
import { getTechs, type IGetTech } from '@/services/Techs/getTech'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { CalendarIcon, Check, CircleX, Pen } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const updateProjectSchema = z.object({
	title: z.string(),
	description: z.string(),
	initial_date: z.date(),
	final_date: z.date(),
	icon: z.string(),
	image: z.string(),
	href: z.string().url('Link inválido'),
	techs: z.array(z.string()),
})

type UpdateProjectForm = z.infer<typeof updateProjectSchema>

export const UpdateProject = ({ projectID }: { projectID: string }) => {
	const [initialDate, setInitialDate] = useState<Date | undefined>()
	const [finalDate, setFinalDate] = useState<Date | undefined>()
	const queryClient = useQueryClient()
	const { toast } = useToast()
	const {
		register,
		handleSubmit,
		formState: { isDirty, isValid },
		reset,
		control,
		setValue,
	} = useForm<UpdateProjectForm>({
		resolver: zodResolver(updateProjectSchema),
		defaultValues: {
			techs: [],
		},
	})

	const updateProjectMutation = useMutation({
		mutationFn: (data: UpdateProjectForm) => {
			const projectData: IProject = {
				...data,
				techs: data.techs.map((techId) => {
					const tech = techOptions.find((option) => option.value === techId)
					return { id: techId, name: tech?.label || '' }
				}),
			}
			return updateProject(projectID, projectData)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects'] })
			toast({
				title: 'Tech updated successfully!',
				variant: 'success',
				action: <Check />,
			})
			reset()
		},
		onError: (error) => {
			console.error('Error updating technology:', error)
			toast({
				title: 'There was an error',
				description: error instanceof Error ? error.message : 'Unknown error',
				variant: 'destructive',
				action: <CircleX />,
			})
		},
	})

	const onSubmit = handleSubmit((data) => {
		updateProjectMutation.mutate(data)
	})

	const { data: techs } = useQuery({
		queryKey: ['techs'],
		queryFn: () => getTechs(undefined, true),
		select: (data) => data?.techs ?? [],
	})

	const techOptions: Option[] = useMemo(() => {
		return (
			techs?.map((tech: IGetTech) => ({ value: tech.id, label: tech.name })) ||
			[]
		)
	}, [techs])

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button
					className='flex justify-between w-full'
					size='sm'
					variant='outline'
				>
					Editar <Pen className='h-4 w-4' />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className='mx-auto w-full max-w-sm'>
					<DrawerHeader>
						<DrawerTitle>Editar</DrawerTitle>
						<DrawerDescription>
							Edite com sabedoria o projeto escolhido.
						</DrawerDescription>
					</DrawerHeader>
					<form className='space-y-2 p-4 pb-0' onSubmit={onSubmit}>
						<div className='space-y-2'>
							<Label>Nome</Label>
							<Input {...register('title')} id='title' name='title' required />
						</div>
						<div className='space-y-2'>
							<Label>Tecnologias</Label>
							<Controller
								name='techs'
								control={control}
								render={({ field }) => (
									<MultipleSelector
										commandProps={{ label: 'Select technologies' }}
										value={techOptions.filter((option) =>
											(field.value ?? []).includes(option.value),
										)}
										defaultOptions={techOptions}
										placeholder='Selecione as tecnologias'
										hideClearAllButton
										hidePlaceholderWhenSelected
										emptyIndicator={
											<p className='text-center text-sm'>No results found</p>
										}
										onChange={(selected) =>
											field.onChange(selected.map((option) => option.value))
										}
									/>
								)}
							/>
						</div>
						<div className='space-y-2'>
							<Label>Descrição</Label>
							<Input
								{...register('description')}
								id='description'
								name='description'
								placeholder='Descrição do projeto'
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label>Ícone</Label>
							<Input
								{...register('icon')}
								id='icon'
								name='icon'
								placeholder='Ícone do Projeto'
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label>Imagem</Label>
							<Input
								{...register('image')}
								id='image'
								name='image'
								placeholder='Imagem principal do Projeto'
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
						<div className='space-y-2 flex flex-col'>
							<Label>Data Inicial</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={'outline'}
										className={cn(
											'w-full justify-start border-input text-left font-normal',
											!initialDate && 'text-muted-foreground',
										)}
									>
										<CalendarIcon />
										{initialDate ? (
											format(initialDate, 'PPP')
										) : (
											<span>Pick a date</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0'>
									<Calendar
										mode='single'
										selected={initialDate}
										onSelect={(date) => {
											if (date) {
												setInitialDate(date)
												setValue('initial_date', date)
											}
										}}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>
						<div className='space-y-2 flex flex-col'>
							<Label>Data Final</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={'outline'}
										className={cn(
											'w-full justify-start border-input text-left font-normal',
											!finalDate && 'text-muted-foreground',
										)}
									>
										<CalendarIcon />
										{finalDate ? (
											format(finalDate, 'PPP')
										) : (
											<span>Pick a date</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0'>
									<Calendar
										mode='single'
										selected={finalDate}
										onSelect={(date) => {
											if (date) {
												setFinalDate(date)
												setValue('final_date', date)
											}
										}}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>
						<DrawerFooter>
							<DrawerClose asChild>
								<Button type='submit' disabled={!isDirty || !isValid}>
									Editar Projeto
								</Button>
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
