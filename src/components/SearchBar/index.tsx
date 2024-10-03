'use client'

import useProjectStore from '@/stores/projectStore'
import useTechStore from '@/stores/techStore'
import { motion } from 'framer-motion'
import { Hexagon, Search, SquareTerminal } from 'lucide-react'
import { useEffect, useState } from 'react'
import Magnetic from '../Magnetic'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'

const SearchBar = () => {
  const [open, setOpen] = useState(false)

  const { projects, setProjects, setLoading: setLoadingProjects, setError: setProjectError } = useProjectStore()
  const { techs, setTechs, setLoading: setLoadingTechs, setError: setTechError } = useTechStore()

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      setOpen((open) => !open)
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetch('/api/projects')
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        setProjectError('Failed to get projects')
      }
    }

    const getTechs = async () => {
      try {
        const response = await fetch('/api/techs')
        const data = await response.json()
        setTechs(data)
      } catch (error) {
        setTechError('Failed to get techs')
      }
    }

    getProjects()
    getTechs()

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [setProjects, setTechs, setLoadingProjects, setLoadingTechs, setProjectError, setTechError])

  return (
    <div className="w-full flex-1">
      <motion.div
        transition={{ type: 'spring', stiffness: 150, damping: 17, bounce: 1 }}
        className='flex justify-between items-center'>
        <Button onClick={() => setOpen((open) => !open)} variant='outline' size='lg' className='gap-2 justify-between'>
          <Search className='h-4 w-4 text-muted-foreground' size={22} />
          Busque por Projetos
          <Badge variant='default' className='ml-2'>Ctrl + K</Badge>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder='Digite o nome do Projeto ou Tecnologia...' />
          <CommandList className='overflow font-Relative'>
            {projects.length === 0 && techs.length === 0 ? (
              <CommandEmpty>Nenhum projeto ou tecnologia encontrado.</CommandEmpty>
            ) : (
              <div>
                <CommandGroup heading="Projetos">
                  {projects.map((project) => (
                    <CommandItem key={project.id}>
                      <Button variant="noHover" size="sm" className='m-0 p-0'>
                        <Magnetic>
                          <SquareTerminal className="mr-2 h-4 w-4" />
                        </Magnetic>
                        <span className='text-md hover:animate-text-shake'>{project.name}</span>
                      </Button>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandGroup heading="Tecnologias">
                  {techs.map((tech) => (
                    <CommandItem key={tech.id}>
                      <Button variant="noHover" size="sm" className='m-0 p-0'>
                        <div className='flex'>
                          <Magnetic>
                            <Hexagon className="mr-2 h-4 w-4" />
                          </Magnetic>
                          <span className='text-md hover:animate-text-shake'>{tech.name}</span>
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
