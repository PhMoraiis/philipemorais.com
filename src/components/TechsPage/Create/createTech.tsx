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
import { useToast } from '@/hooks/use-toast'
import { createTech } from '@/services/Techs/createTech'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Check, CircleX, Loader2, PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createTechSchema = z.object({
	name: z.string().min(1, { message: 'Enter the name of the technology' }),
	image: z
		.string()
		.min(1, { message: 'Enter the image or icon of the technology' })
		.url(),
})

type CreateTechForm = z.infer<typeof createTechSchema>

export default function CreateTech() {
	const queryClient = useQueryClient()
	const { toast } = useToast()
	const { register, handleSubmit, formState, reset } = useForm<CreateTechForm>({
		resolver: zodResolver(createTechSchema),
	})

	const createTechMutation = useMutation({
		mutationFn: createTech,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['techs'] })
			toast({
				title: 'Tech created successfully!',
				variant: 'success',
				action: <Check />,
			})
			reset()
		},
		onError: (error) => {
			console.error('Erro na criação da tecnologia:', error)
			toast({
				title: 'There was an error',
				description: `${error instanceof Error ? error.message : 'Erro desconhecido'}`,
				variant: 'destructive',
				action: <CircleX />,
			})
		},
	})

	const handleCreateTech = handleSubmit(({ name, image }) => {
		console.log('Enviando dados para criar tecnologia:', { name, image })
		createTechMutation.mutate({ name, image })
	})

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button
					size='sm'
					className='h-8 gap-1'
					disabled={createTechMutation.isPending}
				>
					{createTechMutation.isPending ? (
						<Loader2 className='h-4 w-4 animate-spin' />
					) : (
						<PlusCircle className='h-3.5 w-3.5' />
					)}
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
					<form onSubmit={handleCreateTech} className='space-y-2 p-4 pb-0'>
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
