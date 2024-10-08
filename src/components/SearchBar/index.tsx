'use client'

import { motion } from 'framer-motion'
import { Hexagon, Search, SquareTerminal } from 'lucide-react'
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
import { getProjects } from '@/http/projects'
import { getTechs } from '@/http/techs'
import type { Project } from '@/app/dashboard/projects/page'
import type { Tech } from '@/app/dashboard/techs/page'

const SearchBar = () => {
	const [open, setOpen] = useState(false)

	const { data } = useQuery({
		queryFn: getProjects,
		queryKey: ['projects'],
	})

	const { data: tech } = useQuery({
		queryFn: getTechs,
		queryKey: ['techs'],
	})

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
			event.preventDefault()
			setOpen((open) => !open)
		}
	}

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

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
					<Badge variant='default' className='ml-2'>
						Ctrl + K
					</Badge>
				</Button>
				<CommandDialog open={open} onOpenChange={setOpen}>
					<CommandInput placeholder='Digite o nome do Projeto ou Tecnologia...' />
					<CommandList className='overflow font-Relative'>
						{data?.projects.length === 0 && tech?.techs.length === 0 ? (
							<CommandEmpty>
								Nenhum projeto ou tecnologia encontrado.
							</CommandEmpty>
						) : (
							<div>
								<CommandGroup heading='Projetos'>
									{data?.projects.map((project: Project) => (
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
									{tech?.techs.map((tech: Tech) => (
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
							</div>
						)}
					</CommandList>
				</CommandDialog>
			</motion.div>
		</div>
	)
}

export default SearchBar
