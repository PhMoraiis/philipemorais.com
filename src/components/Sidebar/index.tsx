import { Hexagon, Home, SquareTerminal } from 'lucide-react'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaviconOnpholio } from '../Logos'
import { useQuery } from '@tanstack/react-query'
import { getTechs } from '@/services/Techs/getTech'
import { getProjects } from '@/services/Projects/getProject'

const Sidebar = () => {
	const pathname = usePathname()

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
		<div className='hidden border-r bg-muted/40 md:block'>
			<div className='flex h-full max-h-screen flex-col gap-2'>
				<div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
					<Link
						href='/dashboard'
						className='flex items-center gap-2 font-semibold'
					>
						<FaviconOnpholio width={35} />
						<span className=''>OnPholio</span>
					</Link>
				</div>
				<div className='flex-1'>
					<nav className='grid items-start px-2 space-y-2 text-sm font-medium lg:px-4'>
						{[
							{ href: '/dashboard', label: 'Home', icon: Home },
							{
								href: '/dashboard/projects',
								label: 'Projetos',
								icon: SquareTerminal,
								badgeCount: projects?.length,
							},
							{
								href: '/dashboard/techs',
								label: 'Techs',
								icon: Hexagon,
								badgeCount: techs?.length,
							},
						].map(({ href, label, icon: Icon, badgeCount }) => (
							<Link
								key={href}
								href={href}
								className={`flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground/85 hover:bg-border ${pathname === href ? 'text-foreground/90 bg-border' : ''}`}
							>
								<Icon className='h-4 w-4' />
								{label}
								{badgeCount !== undefined && (
									<Badge
										variant={pathname === href ? 'default' : 'outline'}
										className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'
									>
										{badgeCount}
									</Badge>
								)}
							</Link>
						))}
					</nav>
				</div>
			</div>
		</div>
	)
}

export default Sidebar
