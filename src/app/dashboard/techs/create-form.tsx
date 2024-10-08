import { Button } from '@/components/ui/button'
import {
	DialogFooter,
	DialogClose,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Ban, PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createTech } from '../../../http/techs'
import { toast } from 'sonner'

const CreateTechSchema = z.object({
	name: z.string().min(1, 'O nome é obrigatório'),
	image: z.string().min(1, 'A imagem é obrigatória'),
})

export default function CreateTechForm() {
	const queryClient = useQueryClient()

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, isDirty, isValid },
	} = useForm<CreateTechForm>({
		resolver: zodResolver(CreateTechSchema),
	})

	type CreateTechForm = z.infer<typeof CreateTechSchema>

	async function handleCreateTech(data: CreateTechForm) {
		try {
			await createTech({
				name: data.name,
				image: data.image,
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

		queryClient.invalidateQueries({ queryKey: ['techs'] })

		reset()
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size='sm' className='h-8 gap-1'>
					<PlusCircle className='h-3.5 w-3.5' />
					<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
						Adicionar Tecnologia
					</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<div className='mx-auto w-full max-w-sm'>
					<DialogHeader>
						<DialogTitle>Nova Tecnologia</DialogTitle>
						<DialogDescription>Crie uma nova tecnologia.</DialogDescription>
					</DialogHeader>
					<form
						id='create-tech'
						onSubmit={handleSubmit(handleCreateTech)}
						className='space-y-2 p-4 pb-0'
					>
						<div className='space-y-2'>
							<Label htmlFor='name'>Nome</Label>
							<Input
								id='name'
								autoFocus
								placeholder='Nome da tecnologia'
								{...register('name')}
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='image'>Ícone</Label>
							<Input
								id='image'
								{...register('image')}
								placeholder='Icone da tecnologia'
								required
							/>
						</div>
					</form>
				</div>
				<DialogFooter className='flex items-center justify-center'>
					<DialogClose asChild>
						<Button variant='outline'>Cancelar</Button>
					</DialogClose>
					<Button
						disabled={!isDirty || !isValid || isSubmitting}
						form='create-tech'
						type='submit'
					>
						Criar Tecnologia
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
