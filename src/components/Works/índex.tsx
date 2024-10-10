'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import type React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/http/projects'
import { Skeleton } from '../ui/skeleton'
import type { Tech } from '@/app/dashboard/techs/page'

type CardProps = React.ComponentProps<typeof Card>

interface Projects {
	id: string
	title: string
	description: string
	href: string
	lightImageDesktop: string
	darkImageDesktop?: string
	lightImageMobile: string
	darkImageMobile?: string
	techs: Techs[]
	status: string
	createdAt: Date
	updatedAt: Date
}

interface Techs {
	id: string
	name: string
	image: string
	createdAt: Date
	updatedAt: Date
}[]

const Works = ({ className, ...props }: CardProps) => {
	const [isHover, setIsHover] = useState(false)
	const { theme } = useTheme()
	const isDark = theme === 'dark'

	const { data, isLoading } = useQuery({
		queryKey: ['projects'],
		queryFn: getProjects,
	})

	if (isLoading) {
		return (
			<Skeleton className='w-full md:w-full md:h-[330px] lg:w-full lg:h-[380px] h-[550px] rounded-xl' />
		)
	}

	const handleMouseEnter = () => setIsHover(true)
	const handleMouseLeave = () => setIsHover(false)

	const getImage = (project: Projects) =>
		isDark ? project.darkImageDesktop : project.lightImageDesktop
	const getImageMobile = (project: Projects) =>
		isDark ? project.darkImageMobile : project.lightImageMobile

	const imageBG = (project: Projects) => ({
		backgroundImage: `url(${getImage(project)})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		border: 'none',
		borderRadius: '0.75rem',
	})

	const mobileImageBG = (project: Projects) => ({
		backgroundImage: `url(${getImageMobile(project)})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		border: 'none',
		borderRadius: '0.75rem',
	})

	const transformStatus = (status: string) => {
		const statusMap = {
			Online: {
				label: 'Online',
				bgColor: 'bg-[#00eb4e]',
				hoverClass: isHover ? 'neon2' : 'neon',
			},
			Desenvolvimento: {
				label: 'Desenvolvimento',
				bgColor: 'bg-[#4D4DFF]',
				hoverClass: isHover ? 'neonDev1' : 'neonDev2',
			},
			Interrompido: {
				label: 'Interrompido',
				bgColor: 'bg-[#DEFF1C]',
				hoverClass: isHover ? 'neonStop1' : 'neonStop2',
			},
		}
		return statusMap[status as keyof typeof statusMap] || statusMap.Online
	}

	const handleHref = (href: string) => window.open(href, '_blank')

	return (
		<>
			{data?.projects.map((project: Projects, index: number) => {
				const statusInfo = transformStatus(project.status)
				const titleClass =
					index === 1 || index === 2 || index === 5
						? 'text-primary dark:text-primary'
						: 'text-secondary dark:text-primary'
				return (
					<Card
						key={project.id}
						onClick={() => handleHref(project.href)}
						className={cn(
							'w-full md:w-full md:h-[330px] lg:w-full lg:h-[380px] h-[550px] shadow-xl rounded-xl cursor-pointer hidden sm:flex',
							className,
						)}
						{...props}
						style={imageBG(project)}
					>
						<CardHeader>
							<CardTitle className={cn(titleClass)}>{project.title}</CardTitle>
							<CardDescription className={cn(titleClass)}>
								{project.description}
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
								{statusInfo.label}
							</button>
							{project.techs.map((tech: Tech) => (
								<Badge key={tech.id} size='icon'>
									<Image
										src={tech.image}
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
			{data?.projects.map((project: Projects, index: number) => {
				const statusInfo = transformStatus(project.status)
				const titleClass =
					index === 0 || index === 4
						? 'text-primary dark:text-secondary'
						: 'text-secondary dark:text-primary'
				return (
					<Card
						key={project.id}
						className={cn(
							'w-full shadow-xl rounded-xl cursor-pointer',
							'h-[550px]',
							'flex sm:hidden',
						)}
						style={mobileImageBG(project)}
						{...props}
						onClick={() => handleHref(project.href)}
					>
						<CardHeader>
							<CardTitle className={cn(titleClass)}>{project.title}</CardTitle>
							<CardDescription className={cn(titleClass)}>
								{project.description}
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
								{project.status}
							</button>
							{project.techs.map((tech: Tech) => ( 
								<Badge key={tech.id} size='icon'>
									<Image
										src={tech.image}
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
