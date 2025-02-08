'use client'

import { motion } from 'motion/react'
import {
	ArrowRight,
	Command,
	Hexagon,
	Search,
	SquareTerminal,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Magnetic from '../Magnetic'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '../ui/command'
import { useQuery } from '@tanstack/react-query'
import { getTechs, type IGetTech } from '@/services/Techs/getTech'
import { getProjects, type IGetProject } from '@/services/Projects/getProject'
import { SheetTitle } from '../ui/sheet'

const SearchBar = () => {
	const [open, setOpen] = useState(false)

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
			event.preventDefault()
			setOpen((open) => !open)
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	const { data: techs } = useQuery({
		queryKey: ['techs'],
		queryFn: () => getTechs(undefined, true),
		select: (data) => data?.techs ?? [],
	})

	const { data: projects } = useQuery({
		queryKey: ['projects'],
		queryFn: getProjects,
	})

	return (
		<div className='w-full flex-1'>
			<motion.div
				transition={{ type: 'spring', stiffness: 150, damping: 17, bounce: 1 }}
				className='flex justify-between items-center'
			>
				<Button
					onClick={() => setOpen((open) => !open)}
					variant='outline'
					size='lg'
					className='gap-2 justify-between'
				>
					<Search className='h-4 w-4 text-muted-foreground' size={22} />
					Busque por Projetos
					<div className='flex space-x-1'>
						<span className='border border-border bg-border text-primary-foreground rounded-md p-[2px]'>
							{' '}
							<Command size={22} />
						</span>
						<span className='border border-border bg-border text-primary-foreground rounded-md px-1 '>
							K
						</span>
					</div>
				</Button>
				<CommandDialog open={open} onOpenChange={setOpen}>
					<SheetTitle className='sr-only'>Menu</SheetTitle>
					<CommandInput placeholder='Digite o nome do Projeto ou Tecnologia...' />
					<CommandList className='overflow font-Relative'>
						{projects?.length === 0 && techs?.length === 0 ? (
							<CommandEmpty>
								Nenhum projeto ou tecnologia encontrado.
							</CommandEmpty>
						) : (
							<>
								<CommandGroup heading='Projetos'>
									{projects?.map((project: IGetProject) => (
										<CommandItem key={project.id}>
											<Button variant='noHover' size='sm' className='m-0 p-0'>
												<Magnetic>
													<SquareTerminal className='mr-2 h-4 w-4' />
												</Magnetic>
												<span className='text-md hover:animate-text-shake'>
													{project.title}
												</span>
											</Button>
										</CommandItem>
									))}
								</CommandGroup>
								<CommandGroup heading='Tecnologias'>
									{techs?.map((tech: IGetTech) => (
										<CommandItem key={tech.id}>
											<Button variant='noHover' size='sm' className='m-0 p-0'>
												<div className='flex'>
													<Magnetic>
														<Hexagon className='mr-2 h-4 w-4' />
													</Magnetic>
													<span className='text-md hover:animate-text-shake'>
														{tech.name}
													</span>
												</div>
											</Button>
										</CommandItem>
									))}
								</CommandGroup>
							</>
						)}
					</CommandList>
				</CommandDialog>
			</motion.div>
		</div>
	)
}

export default SearchBar
