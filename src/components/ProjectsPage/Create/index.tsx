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
import { format } from 'date-fns'
import { Label } from '@/components/ui/label'
import MultipleSelector, { type Option } from '@/components/ui/multiselect'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { createProject } from '@/services/Projects/createProject'
import type { IProject } from '@/services/Projects/type'
import { getTechs, type IGetTech } from '@/services/Techs/getTech'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CalendarIcon, Check, CircleX, Loader2, PlusCircle } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'

const projectSchema = z.object({
	title: z.string().min(3, 'O nome é obrigatório'),
	description: z.string().min(3, 'A descrição é obrigatória'),
	initial_date: z.date(),
	final_date: z.date(),
	icon: z.string().min(1, 'O ícone é obrigatório'),
	image: z.string().min(1, 'A URL da imagem é obrigatória'),
	href: z.string().url('Link inválido').min(1, 'O link é obrigatório'),
	techs: z.array(z.string()).min(1, 'Selecione pelo menos uma tecnologia'),
})

type ProjectFormData = z.infer<typeof projectSchema>

export const CreateProject = () => {
	const [initialDate, setInitialDate] = useState<Date | undefined>()
	const [finalDate, setFinalDate] = useState<Date | undefined>()
	const queryClient = useQueryClient()
	const { toast } = useToast()
	const {
		control,
		register,
		handleSubmit,
		formState: { isDirty, isValid },
		reset,
		setValue,
	} = useForm<ProjectFormData>({
		resolver: zodResolver(projectSchema),
		defaultValues: {
			techs: [],
		},
	})

	const createProjectMutation = useMutation({
		mutationFn: createProject,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects'] })
			toast({
				title: 'Project created successfully!',
				variant: 'success',
				action: <Check />,
			})
			reset()
		},
		onError: (error) => {
			console.error('Erro na criação do projeto:', error)
			toast({
				title: 'Houve um erro',
				description: `${error instanceof Error ? error.message : 'Erro desconhecido'}`,
				variant: 'destructive',
				action: <CircleX />,
			})
		},
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

	const handleCreateProject = handleSubmit((data) => {
		const formattedData: IProject = {
			...data,
			techs: techs.filter((tech: IGetTech) => data.techs.includes(tech.id)),
		}
		createProjectMutation.mutate(formattedData)
	})

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button
					size='sm'
					className='gap-2'
					disabled={createProjectMutation.isPending}
				>
					{createProjectMutation.isPending ? (
						<Loader2 className='h-4 w-4 animate-spin' />
					) : (
						<PlusCircle className='h-3.5 w-3.5' />
					)}
					<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
						Adicionar Projeto
					</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className='mx-auto w-full max-w-sm'>
					<DrawerHeader>
						<DrawerTitle>Novo Projeto</DrawerTitle>
						<DrawerDescription>Crie um novo projeto.</DrawerDescription>
					</DrawerHeader>
					<form className='space-y-2 p-4 pb-0' onSubmit={handleCreateProject}>
						<div className='space-y-2'>
							<Label>Nome</Label>
							<Input
								{...register('title')}
								id='title'
								name='title'
								placeholder='Nome do projeto'
								required
							/>
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
									Criar Projeto
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
