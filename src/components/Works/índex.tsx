'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card'
import { Badge } from '../ui/badge'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import type React from 'react'

type CardProps = React.ComponentProps<typeof Card>

const Works = ({ className, ...props }: CardProps) => {
	const [projects, setProjects] = useState<
		{
			id: number
			name: string
			status: string
			image: string
			href: string
			imageMobile: string
			imageDark: string
			imageDarkMobile: string
			shortDescription: string
			translatedShortDescription: string
			techs: { id: number; name: string; icon: string }[]
		}[]
	>([])
	const [tech, setTechs] = useState<
		{ id: number; name: string; icon: string }[]
	>([])
	const [isHover, setIsHover] = useState(false)
	const [mounted, setMounted] = useState(false)
	const { theme } = useTheme()
	const isDark = theme === 'dark'

	const handleMouseEnter = () => {
		setIsHover(true)
	}

	const handleMouseLeave = () => {
		setIsHover(false)
	}

	useEffect(() => {
		setMounted(true)
		const fetchProjects = async () => {
			const response = await fetch('/api/projects')
			const data = await response.json()
			console.log(data)
			setProjects(data)
		}

		const fetchTechs = async () => {
			const response = await fetch('/api/techs')
			const data = await response.json()
			console.log(data)
			setTechs(data)
		}

		fetchProjects()
		fetchTechs()
	}, [])

	if (!mounted) return null

	const getImage = (project: { image: string; imageDark: string }) => {
		// Verifica se project.imageDark contém apenas um ponto
		if (
			project.imageDark === '.' ||
			project.imageDark === '' ||
			project.imageDark === null
		) {
			return project.image // Retorna apenas a imagem clara
		}
		return isDark ? project.imageDark : project.image // Retorna a imagem escura ou clara com base no tema
	}

	const getImageMobile = (project: {
		imageMobile: string
		imageDarkMobile: string
	}) => {
		// Verifica se project.imageDark contém apenas um ponto
		if (
			project.imageDarkMobile === '.' ||
			project.imageDarkMobile === '' ||
			project.imageDarkMobile === null
		) {
			return project.imageMobile // Retorna apenas a imagem clara
		}
		return isDark ? project.imageDarkMobile : project.imageMobile // Retorna a imagem escura ou clara com base no tema
	}

	const imageBG = (project: { image: string; imageDark: string }) => ({
		backgroundImage: `url(${getImage(project)})`, // Usa a função para obter a imagem correta
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		border: 'none',
		borderRadius: '0.75rem',
	})

	const mobileImageBG = (project: {
		imageMobile: string
		imageDarkMobile: string
	}) => ({
		backgroundImage: `url(${getImageMobile(project)})`, // Corrigido para usar imageMobile
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		border: 'none',
		borderRadius: '0.75rem',
	})

	const transformStatus = (status: string) => {
		switch (status) {
			case 'ONLINE':
				return {
					label: 'Online',
					labelEnglish: 'Online',
					bgColor: 'bg-[#00eb4e]',
					hoverClass: isHover ? 'neon2' : 'neon',
				}
			case 'DESENVOLVIMENTO':
				return {
					label: 'Desenvolvimento',
					labelEnglish: 'Development',
					bgColor: 'bg-[#4D4DFF]',
					hoverClass: isHover ? 'neonDev1' : 'neonDev2',
				}
			case 'INTERROMPIDO':
				return {
					label: 'Interrompido',
					labelEnglish: 'Stopped',
					bgColor: 'bg-[#DEFF1C]',
					hoverClass: isHover ? 'neonStop1' : 'neonStop2',
				}
			default:
				return {
					label: 'Online',
					bgColor: 'bg-[#00eb4e]',
					hoverClass: isHover ? 'neon2' : 'neon',
				}
		}
	}

	const handleHref = (href: string) => {
		window.open(`${href}`, '_blank')
	}

	const getLanguageFromCookie = () => {
		const language = Cookies.get('NEXT_LOCALE')
		return language
	}

	return (
		<>
			{projects.map((project) => {
				const statusInfo = transformStatus(project.status)
				const description =
					getLanguageFromCookie() === 'en'
						? project.translatedShortDescription
						: project.shortDescription
				const statusLabel =
					getLanguageFromCookie() === 'en'
						? statusInfo.labelEnglish
						: statusInfo.label
				return (
					<Card
						key={project.id}
						onClick={() => handleHref(project.href)}
						className={cn(
							'w-full md:w-full md:h-[330px] lg:w-full lg:h-[380px] h-[550px] shadow-xl rounded-xl cursor-pointer hidden sm:flex',
							className,
						)}
						{...props}
						style={imageBG({
							image: project.image,
							imageDark: project.imageDark,
						})}
					>
						<CardHeader>
							<CardTitle
								className={cn('text-secondary dark:text-primary', {
									'text-primary':
										(projects.indexOf(project) === 1 ||
											projects.indexOf(project) === 2) &&
										!isDark,
								})}
							>
								{project.name}
							</CardTitle>
							<CardDescription
								className={cn('text-secondary dark:text-primary', {
									'text-primary':
										(projects.indexOf(project) === 1 ||
											projects.indexOf(project) === 2) &&
										!isDark,
								})}
							>
								{description}
							</CardDescription>
						</CardHeader>
						<CardFooter className='gap-3'>
							<button
								type='button'
								className={
									'inline-flex items-center rounded-full border px-3 py-1 gap-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80'
								}
								onMouseLeave={handleMouseLeave}
								onMouseEnter={handleMouseEnter}
							>
								<div
									className={`rounded-full w-3 h-3 ${statusInfo.bgColor} mr-2 ${isHover} duration-300 ease-in-out`}
								/>
								{statusLabel}
							</button>
							{project.techs.map((tech) => (
								<Badge key={tech.id} size='icon'>
									<Image
										src={tech.icon}
										alt={tech.name}
										width={18}
										height={18}
									/>
									{tech.name}
								</Badge>
							))}
						</CardFooter>
					</Card>
				)
			})}
			{projects.map((project) => {
				const statusInfo = transformStatus(project.status)
				const description =
					getLanguageFromCookie() === 'en'
						? project.translatedShortDescription
						: project.shortDescription
				const statusLabel =
					getLanguageFromCookie() === 'en'
						? statusInfo.labelEnglish
						: statusInfo.label
				return (
					<Card
						key={project.id}
						className={cn(
							'w-full shadow-xl rounded-xl cursor-pointer',
							'h-[550px]',
							'flex sm:hidden', // Mostrar apenas em dispositivos móveis
						)}
						style={mobileImageBG({
							imageMobile: project.imageMobile,
							imageDarkMobile: project.imageDarkMobile,
						})} // Passando a propriedade correta
						{...props}
						onClick={() => handleHref(project.href)}
					>
						<CardHeader>
							<CardTitle className='text-secondary dark:text-primary'>
								{project.name}
							</CardTitle>
							<CardDescription className='text-secondary dark:text-primary'>
								{description}
							</CardDescription>
						</CardHeader>
						<CardFooter className='gap-3 flex-wrap'>
							<button
								type='button'
								className='inline-flex items-center rounded-full border px-3 py-1 gap-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80'
								onMouseLeave={handleMouseLeave}
								onMouseEnter={handleMouseEnter}
							>
								<div
									className={`rounded-full w-3 h-3 ${statusInfo.bgColor} mr-2 ${statusInfo.hoverClass} duration-300 ease-in-out`}
								/>
								{statusLabel}
							</button>
							{project.techs.map((tech) => (
								<Badge key={tech.id} size='icon'>
									<Image
										src={tech.icon}
										alt={tech.name}
										width={18}
										height={18}
									/>
									{tech.name}
								</Badge>
							))}
						</CardFooter>
					</Card>
				)
			})}
		</>
	)
}

export default Works
