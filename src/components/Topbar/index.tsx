import {
	Check,
	CircleUser,
	CircleX,
	Hexagon,
	Home,
	LogOut,
	Menu,
	SquareTerminal,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import SearchBar from '@/components/SearchBar'
import { Badge } from '@/components/ui/badge'
import { useMutation } from '@tanstack/react-query'
import { handleLogout } from '@/services/Users/logout'
import { useToast } from '@/hooks/use-toast'
import { FaviconOnpholio } from '../Logos'

const Topbar = () => {
	const router = useRouter()
	const pathname = usePathname()
	const { toast } = useToast()

	const logoutMutation = useMutation({
		mutationFn: handleLogout,
		onSuccess: () => {
			toast({
				title: 'Logout successful!',
				variant: 'success',
				action: <Check />,
			})
			router.push('/')
		},
		onError: (error) => {
			toast({
				title: 'There was an error',
				description: `${error instanceof Error ? error.message : 'Erro desconhecido'}`,
				variant: 'destructive',
				action: <CircleX />,
			})
			router.refresh()
		},
	})
	const handleLogoutButton = () => {
		logoutMutation.mutate()
	}

	return (
		<header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='outline' size='icon' className='shrink-0 md:hidden'>
						<Menu className='h-5 w-5' />
					</Button>
				</SheetTrigger>
				<SheetContent side='left' className='flex flex-col'>
					<nav className='grid gap-2 text-lg font-medium'>
						<Link
							href='/dashboard'
							className='flex items-center gap-2 text-lg font-semibold'
						>
							<FaviconOnpholio width={35} />
							<span className=''>OnPholio</span>
						</Link>
						<Link
							href='/dashboard'
							className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${pathname === '/dashboard' ? 'text-primary' : ''}`}
						>
							<Home className='h-5 w-5' />
							Dashboard
						</Link>
						<Link
							href='/dashboard/projects'
							className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${pathname === '/dashboard/projects' ? 'text-primary' : ''}`}
						>
							<SquareTerminal className='h-5 w-5' />
							Projetos
							<Badge
								variant={
									pathname === '/dashboard/projects' ? 'default' : 'outline'
								}
								className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'
							>
								6
							</Badge>
						</Link>
						<Link
							href='/dashboard/techs'
							className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${pathname === '/dashboard/techs' ? 'text-primary' : ''}`}
						>
							<Hexagon className='h-5 w-5' />
							Techs
							<Badge
								variant={
									pathname === '/dashboard/techs' ? 'default' : 'outline'
								}
								className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'
							>
								6
							</Badge>
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
			<SearchBar />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size='icon' className='rounded-full'>
						<CircleUser className='h-5 w-5' />
						<span className='sr-only'>Toggle user menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<Button
						onClick={handleLogoutButton}
						variant='default'
						className='hover:bg-red-500 hover:text-secondary flex justify-between w-full'
					>
						Sair <LogOut className='ml-2 w-4 h-4' />{' '}
					</Button>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	)
}

export default Topbar
