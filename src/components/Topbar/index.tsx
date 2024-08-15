import { CircleUser, Hexagon, Home, LogOut, Menu, Search, SquareTerminal, ToggleLeft } from 'lucide-react'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Input } from '../ui/input'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import SearchBar from '../SearchBar'


const Topbar = () => {
  const pathname = usePathname()

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <ToggleLeft className="h-6 w-6" />
              <span className="sr-only">OnPholio</span>
            </Link>
            <Link
              href="/dashboard"
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${pathname === '/dashboard' ? 'text-primary' : ''}`}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/projects"
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${pathname === '/dashboard/projects' ? 'text-primary' : ''}`}
            >
              <SquareTerminal className="h-5 w-5" />
              Projetos
              <Badge variant={pathname === '/dashboard/projects' ? 'default' : 'outline'} className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
            <Link
              href="/dashboard/techs"
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${pathname === '/dashboard/techs' ? 'text-primary' : ''}`}
            >
              <Hexagon className="h-5 w-5" />
              Techs
              <Badge variant={pathname === '/dashboard/techs' ? 'default' : 'outline'} className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <SearchBar />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className='hover:bg-red-500 hover:text-secondary flex justify-between'>Sair <LogOut className='ml-2 w-4 h-4' /> </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Topbar