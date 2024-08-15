import { Hexagon, Home, SquareTerminal, ToggleLeft } from 'lucide-react'
import { Badge } from '../ui/badge'

import { apiClient } from '@/lib/apiClient'
import useProjectStore from '@/stores/projectStore'
import useTechStore from '@/stores/techStore'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const Sidebar = () => {
  const pathname = usePathname()
  const { projects, setProjects, setError: setProjectError } = useProjectStore()
  const { techs, setTechs, setError: setTechError } = useTechStore()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiClient('/api/projects')
        setProjects(data)
      } catch (error) {
        setProjectError('Failed to fetch projects')
      }
    }

    const fetchTechs = async () => {
      try {
        const data = await apiClient('/api/techs')
        setTechs(data)
      } catch (error) {
        setTechError('Failed to fetch techs')
      }
    }

    fetchProjects()
    fetchTechs()
  }, [setProjects, setTechs, setProjectError, setTechError])

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <ToggleLeft className="h-6 w-6" />
            <span className="">OnPholio</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname === '/dashboard' ? 'text-primary' : ''}`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/projects"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname === '/dashboard/projects' ? 'text-primary' : ''}`}
            >
              <SquareTerminal className="h-4 w-4" />
              Projetos
              <Badge variant={pathname === '/dashboard/projects' ? 'default' : 'outline'} className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {projects.length}
              </Badge>
            </Link>
            <Link
              href="/dashboard/techs"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname === '/dashboard/techs' ? 'text-primary' : ''}`}
            >
              <Hexagon className="h-4 w-4" />
              Techs
              <Badge variant={pathname === '/dashboard/techs' ? 'default' : 'outline'} className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {techs.length}
              </Badge>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar