import { Button } from '@/components/ui/button'
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Controller } from 'react-hook-form'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { RadioGroupIndicator } from '@radix-ui/react-radio-group'

export default function CreateProjectForm() {
	return (
		<form
			className='space-y-2 p-4 pb-0'
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
				{formState.errors.title && (
					<p className='title-red-400 text-sm'>
						{formState.errors.title.message}
					</p>
				)}
			</div>
			<div className='space-y-2'>
				<Label>Imagens Desktop</Label>
				<Input
					{...register('imagesDesktop')}
					id='image'
					name='image'
					placeholder='URLs das imagens (separadas por vírgula)'
					required
				/>
			</div>
			<div className='space-y-2'>
				<Label>Imagens Mobile</Label>
				<Input
					{...register('imagesMobile')}
					id='imageMobile'
					name='imageMobile'
					placeholder='URLs das imagens (separadas por vírgula)'
					required
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
				/>
			</div>
			<div className='space-y-2'>
				<Label htmlFor='status'>Status</Label>
				<Controller
					control={control}
					name='status'
					render={({ field }) => {
						return (
							<RadioGroup
								onValueChange={field.onChange}
								value={String(field.value)}
							>
								<RadioGroupItem value='1'>
									<RadioGroupIndicator />
									<span className='text-zinc-300 text-sm font-medium leading-none'>
										Online
									</span>
								</RadioGroupItem>
								<RadioGroupItem value='2'>
									<RadioGroupIndicator />
									<span className='text-zinc-300 text-sm font-medium leading-none'>
										Desenvolvimento
									</span>
								</RadioGroupItem>
								<RadioGroupItem value='3'>
									<RadioGroupIndicator />
									<span className='text-zinc-300 text-sm font-medium leading-none'>
										Interrompido
									</span>
								</RadioGroupItem>
							</RadioGroup>
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
						return (
							<RadioGroup
								onValueChange={field.onChange}
								value={String(field.value)}
							>
								{data?.techs.map((tech) => (
									<RadioGroupItem key={tech.id} value={tech.id}>
										<RadioGroupIndicator />
										<span className='text-zinc-300 text-sm font-medium leading-none'>
											{tech.name}
										</span>
									</RadioGroupItem>
								))}
							</RadioGroup>
						)
					}}
				/>
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
	)
}
