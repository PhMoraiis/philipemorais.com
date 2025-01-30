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
import { Pen } from 'lucide-react'
import React from 'react'

export default function UpdateTech() {
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
					<form
						// onSubmit={(event) => handleUpdateTech(event, tech.id)}
						className='space-y-2 p-4 pb-0'
					>
						<div className='space-y-2'>
							<Label htmlFor='name'>Nome</Label>
							<Input
								id='name'
								name='name'
								// placeholder={tech.name}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='icon'>Ícone</Label>
							<Input
								id='icon'
								name='icon'
								// placeholder={tech.image}
							/>
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
