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
import { updateTech } from '@/services/Techs/updateTech'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Check, CircleX, Pen } from 'lucide-react'
import type React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const updateTechSchema = z.object({
	name: z.string().optional(),
	image: z.string().url().optional(),
})

type UpdateTechForm = z.infer<typeof updateTechSchema>

export default function UpdateTech({ techID }: { techID: string }) {
	const queryClient = useQueryClient()
	const { toast } = useToast()
	const { register, handleSubmit, formState } = useForm<UpdateTechForm>({
		resolver: zodResolver(updateTechSchema),
	})

	const updateTechMutation = useMutation({
		mutationFn: updateTech,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['techs'] })
			toast({
				title: 'Tech updated successfully!',
				variant: 'success',
				action: <Check />,
			})
		},
		onError: (error) => {
			console.error('Error updating technology:', error)
			toast({
				title: 'There was an error',
				description: `${error instanceof Error ? error.message : 'Unknown error'}`,
				variant: 'destructive',
				action: <CircleX />,
			})
		},
	})

	const handleUpdateTech = handleSubmit(({ name, image }) => {
		updateTechMutation.mutate({ id: techID, name: name ?? '', image: image ?? '' })
	})

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
						<DrawerTitle>Editar </DrawerTitle>
						<DrawerDescription>
							Edite com sabedoria a tecnologia escolhida.
						</DrawerDescription>
					</DrawerHeader>
					<form onSubmit={handleUpdateTech} className='space-y-2 p-4 pb-0'>
						<div className='space-y-2'>
							<Label htmlFor='name'>Nome</Label>
							<Input
								id='name'
								// placeholder={tech.name}
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
								// placeholder={tech.image}
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
								<Button type='submit'>Editar Tecnologia</Button>
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
