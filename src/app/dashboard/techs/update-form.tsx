import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { DrawerFooter, DrawerClose } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateTech } from '@/http/techs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Ban, Pen, PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const UpdateTechSchema = z.object({
	name: z.string().optional(),
	image: z.string().optional(),
})

export default function UpdateTechForm({ techId }: { techId: string }) {
	const queryClient = useQueryClient()

	const {
		register,
		handleSubmit,
		reset,
	} = useForm<UpdateTechForm>({
		resolver: zodResolver(UpdateTechSchema),
	})

	type UpdateTechForm = z.infer<typeof UpdateTechSchema>

	async function handleUpdateTech(techId: string, data: UpdateTechForm) {
		try {
			await updateTech(techId, {
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
						<DialogTitle>Editar </DialogTitle>
						<DialogDescription>
							Edite com sabedoria a tecnologia escolhida.
						</DialogDescription>
					</DialogHeader>
					<form
						id='update-tech'
						className='space-y-2 p-4 pb-0'
						onSubmit={handleSubmit((data) => handleUpdateTech(techId, data))}
					>
						<div className='space-y-2'>
							<Label htmlFor='name'>Nome</Label>
							<Input
								id='name'
								{...register('name')}
								placeholder='Nome da tecnologia'
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='image'>Ícone</Label>
							<Input
								id='image'
								{...register('image')}
								placeholder='Icone da tecnologia'
							/>
						</div>
					</form>
				</div>
				<DrawerFooter>
					<DrawerClose asChild>
						<Button form='update-tech' type='submit'>
							Editar Tecnologia
						</Button>
					</DrawerClose>
					<DrawerClose asChild>
						<Button variant='outline'>Cancelar</Button>
					</DrawerClose>
				</DrawerFooter>
			</DialogContent>
		</Dialog>
	)
}
