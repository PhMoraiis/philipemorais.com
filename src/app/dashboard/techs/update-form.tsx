import { Button } from '@/components/ui/button'
import { DrawerFooter, DrawerClose } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function UpdateTechForm() {
	return (
		<form className='space-y-2 p-4 pb-0'>
			<div className='space-y-2'>
				<Label htmlFor='name'>Nome</Label>
				<Input id='name' name='name' />
			</div>
			<div className='space-y-2'>
				<Label htmlFor='icon'>Ícone</Label>
				<Input id='icon' name='icon' />
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
	)
}
