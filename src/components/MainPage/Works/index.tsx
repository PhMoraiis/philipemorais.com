'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/services/Projects/getProject'
import { useRouter } from 'next/navigation'

interface Project {
	id: string
	title: string
	description: string
	initial_date: Date
	final_date: Date
	href: string
  icon: string
	image: string
	techs: { id: string; name: string }[]
}

const Works = ({ className, ...props }: React.ComponentProps<typeof Card>) => {
	const [mounted, setMounted] = useState(false)
	const router = useRouter()

	useEffect(() => setMounted(true), [])

	const { data: projects } = useQuery({
		queryKey: ['projects'],
		queryFn: getProjects,
	})

	if (!mounted) {
		return (
			<Skeleton className='w-full h-[550px] md:h-[330px] lg:h-[380px] shadow-xl rounded-xl' />
		)
	}

	return (
		<>
			{projects?.map((project: Project) => (
				<Card
					key={project.id}
					onClick={() => router.push(project.href)}
					className={cn(
						'w-full shadow-xl rounded-xl cursor-pointer',
						'h-[550px] md:h-[330px] lg:h-[550px]',
						'flex sm:flex-col sm:flex-wrap',
						className,
					)}
					style={{
						backgroundImage: `url(${project.image})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
					{...props}
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
						{project.techs.map((tech) => (
							<Badge key={tech.id} size='icon'>
								{tech.name}
							</Badge>
						))}
					</CardFooter>
				</Card>
			))}
		</>
	)
}

export default Works
