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
import Image from 'next/image'
import { useTheme } from 'next-themes'
import type React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/http/projects'
import type { Project } from '@/app/dashboard/projects/page'
import type { Tech } from '@/app/dashboard/techs/page'
import { Rocket } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'

type CardProps = React.ComponentProps<typeof Card>

const Works = ({ className, ...props }: CardProps) => {
	const [isHover, setIsHover] = useState(false)
	const { theme } = useTheme()
	const isDark = theme === 'dark'

	const { data, isLoading } = useQuery({
		queryFn: getProjects,
		queryKey: ['projects'],
	})

	if (isLoading) {
		return (
			<Skeleton className='w-full md:w-full md:h-[330px] lg:w-full lg:h-[380px] h-[550px] rounded-xl' />
		)
	}

	const handleMouseEnter = () => {
		setIsHover(true)
	}
	const handleMouseLeave = () => {
		setIsHover(false)
	}

	const getImage = (project: {
		lightImageDesktop: string
		darkImageDesktop: string | undefined
	}) => {
		return isDark ? project.darkImageDesktop : project.lightImageDesktop
	}

	const getImageMobile = (project: {
		lightImageMobile: string
		darkImageMobile: string | undefined
	}) => {
		return isDark ? project.darkImageMobile : project.lightImageMobile
	}

	const imageBG = (project: {
		lightImageDesktop: string
		darkImageDesktop: string | undefined
	}) => ({
		backgroundImage: `url(${getImage(project)})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		border: 'none',
		borderRadius: '0.75rem',
	})

	const mobileImageBG = (project: {
		lightImageMobile: string
		darkImageMobile: string | undefined
	}) => ({
		backgroundImage: `url(${getImageMobile(project)})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		border: 'none',
		borderRadius: '0.75rem',
	})

	const transformStatus = (status: string) => {
		switch (status) {
			case 'Online':
				return {
					label: 'Online',
					bgColor: 'bg-[#00eb4e]',
					hoverClass: isHover ? 'neon2' : 'neon',
				}
			case 'Desenvolvimento':
				return {
					label: 'Desenvolvimento',
					bgColor: 'bg-[#4D4DFF]',
					hoverClass: isHover ? 'neonDev1' : 'neonDev2',
				}
			case 'Interrompido':
				return {
					label: 'Interrompido',
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

	return (
		<>
			{data?.projects.map((project: Project) => {
				const statusInfo = transformStatus(project.status)
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
							lightImageDesktop: project.lightImageDesktop,
							darkImageDesktop: project.darkImageDesktop,
						})}
					>
						<CardHeader>
							<CardTitle
								className={cn('text-secondary dark:text-primary')}
							>
								{project.title}
							</CardTitle>
							<CardDescription
								className={cn('text-secondary dark:text-primary')}
							>
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
							{project.techs.map((tech: string) => (
								<Badge key={tech} size='icon'>
									<Rocket size={18} />
									{tech.name}
								</Badge>
							))}
						</CardFooter>
					</Card>
				)
			})}
			{data?.projects.map((project: Project) => {
				const statusInfo = transformStatus(project.status)
				return (
					<Card
						key={project.id}
						className={cn(
							'w-full shadow-xl rounded-xl cursor-pointer',
							'h-[550px]',
							'flex sm:hidden',
						)}
						style={mobileImageBG({
							lightImageMobile: project.lightImageDesktop,
							darkImageMobile: project.darkImageDesktop,
						})}
						{...props}
						onClick={() => handleHref(project.href)}
					>
						<CardHeader>
							<CardTitle className='text-secondary dark:text-primary'>
								{project.title}
							</CardTitle>
							<CardDescription className='text-secondary dark:text-primary'>
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
							{project.techs.map((tech) => (
								<Badge key={tech} size='icon'>
									<Rocket />
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
