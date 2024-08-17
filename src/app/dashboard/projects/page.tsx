'use client'

import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MultiStepLoader as Loader } from '@/components/ui/multi-step-loader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckCircle, ListFilter, Loader2, MoreHorizontal, Pen, PlusCircle, RefreshCcw, Trash2 } from 'lucide-react'

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import useProjectStore from '@/stores/projectStore'
import useTechStore from '@/stores/techStore'
import { Label } from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Schema de validação para os forms de criação e edição
const projectSchema = z.object({
  name: z.string().min(3, 'O nome é obrigatório'),
  image: z.string().min(1, 'A URL da imagem é obrigatória'),
  shortDescription: z.string().min(3, 'A descrição curta é obrigatória'),
  longDescription: z.string().min(3, 'A descrição longa é obrigatória'),
  href: z.string().url('Link inválido').min(1, 'O link é obrigatório'),
  status: z.enum(['ONLINE', 'DESENVOLVIMENTO', 'INTERROMPIDO']),
  techs: z.array(z.string()).min(1, 'Selecione pelo menos uma tecnologia')
})

type ProjectFormData = z.infer<typeof projectSchema>


const ProjectsDashboard = () => {
  const [refreshLoading, setRefreshLoading] = useState(false)
  const { projects, loading: loadingProjects, setProjects, setLoading: setLoadingProjects, setError: setProjectError } = useProjectStore()
  const { techs, loading: loadingTechs, setTechs, setLoading: setLoadingTechs, setError: setTechError } = useTechStore()

  const { handleSubmit, register, formState: { errors, isSubmitting, isDirty, isValid }, } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      image: '',
      shortDescription: '',
      longDescription: '',
      href: '',
      status: 'ONLINE',
      techs: []
    }
  })

  useEffect(() => {
    const getProjects = async () => {
      setLoadingProjects(true)
      try {
        const response = await fetch('/api/projects')
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        setProjectError('Failed to fetch projects')
      } finally {
        setLoadingProjects(false)
      }
    }

    const getTechs = async () => {
      setLoadingTechs(true)
      try {
        const response = await fetch('/api/techs')
        const data = await response.json()
        setTechs(data)
      } catch (error) {
        setTechError('Failed to fetch techs')
      } finally {
        setLoadingTechs(false)
      }
    }

    getProjects()
    getTechs()

  }, [setProjects, setLoadingProjects, setProjectError, setTechs, setLoadingTechs, setTechError])

  const loadingStates = [
    {
      text: 'Bem vindo ao OnPholio',
    },
    {
      text: 'Explorando novos horizontes',
    },
    {
      text: 'Preparando um café delicioso',
    },
    {
      text: 'Decifrando os segredos do universo',
    },
    {
      text: 'Fazendo algumas alterações no tempo',
    },
    {
      text: 'Preparando o palco',
    },
    {
      text: 'Coletando estrelas',
    },
    {
      text: 'Deixando as engrenagens girarem',
    },
  ]

  const loading = loadingProjects || loadingTechs

  if (loading) {
    return (
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
    )
  }

  const handleCreateProject = async (data: ProjectFormData) => {
    console.log('Creating project with data:', data)
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      console.log('response', response)

      if (!response.ok) {
        throw new Error('Failed to create project')
      }

      const newProject = await response.json()
      setProjects([...projects, newProject])
      console.log('newProject', newProject)
      toast.success('Projeto criado com sucesso!', {
        icon: <CheckCircle className='mr-2 h-4 w-4 text-green-500' />,
        duration: 2000,
      })
    } catch (error) {
      toast.error('Erro ao criar projeto', {
        description: 'Ocorreu um erro ao tentar criar o projeto. Por favor, tente novamente.',
        duration: 2000,
      })
    }
  }

  const handleEditProject = async (id: string, data: ProjectFormData) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update project')
      }

      const updatedProject = await response.json()
      setProjects(projects.map((project) => (project.id === id ? updatedProject : project)))
      toast.success('Projeto editado com sucesso!', {
        icon: <CheckCircle className='mr-2 h-4 w-4 text-green-500' />,
        duration: 2000,
      })
    } catch (error) {
      toast.error('Erro ao editar projeto', {
        description: 'Ocorreu um erro ao tentar editar o projeto. Por favor, tente novamente.',
        duration: 2000,
      })
    }
  }


  const handleDeleteProject = async (id: string) => {
    try {
      await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })
      setProjects(projects.filter(project => project.id !== id))
      toast.success('Projeto excluído com sucesso!', {
        icon: <CheckCircle className='mr-2 h-4 w-4 text-green-500' />,
        description: `${projects.find(project => project.id === id)?.name} excluído com sucesso`,
        duration: 2000
      })
    } catch (error) {
      toast.error('Erro ao excluir projeto', {
        description: 'Ocorreu um erro ao tentar excluir o projeto. Por favor, tente novamente.',
        duration: 2000
      })
    }
  }

  const handleRefresh = async () => {
    setRefreshLoading(true)
    const fetchWithTimeout = (url: string, options: RequestInit, timeout: number) => {
      return new Promise<Response>((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Request timed out')), timeout)
        fetch(url, options)
          .then(response => {
            clearTimeout(timer)
            resolve(response)
          })
          .catch(error => {
            clearTimeout(timer)
            reject(error)
          })
      })
    }

    try {
      const timeout = 300000 // 5 minutos
      const response = await fetchWithTimeout('/api/projects', {}, timeout)

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`)
      }

      const data = await response.json()
      setProjects(data)
    } catch (error) {
      setProjectError('Failed to refresh Projects')
      console.error('Fetch error:', error)
    } finally {
      setRefreshLoading(false)
    }
  }

  const verificarAtualizacao = (project: { updatedAt: string, createdAt: string }) => {
    if (project.updatedAt === project.createdAt) {
      return 'Nunca atualizada'
    } else {
      return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(project.updatedAt))
    }
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-2">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="active">Online</TabsTrigger>
                <TabsTrigger value="draft">Em Desenvolvimento</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">Interrompidos</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Ordenar
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>Nome</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Status</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Data de Criação</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Data de Atualização</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                  <Button size="sm" className="h-8 gap-1" onClick={handleRefresh} disabled={refreshLoading}>
                    {refreshLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCcw className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </DropdownMenu>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button size="sm" className="h-8 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Adicionar Projeto
                      </span>
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                      <DrawerHeader>
                        <DrawerTitle>Novo Projeto</DrawerTitle>
                        <DrawerDescription>Crie um novo projeto.</DrawerDescription>
                      </DrawerHeader>
                      <form className='space-y-2 p-4 pb-0' onSubmit={handleSubmit(handleCreateProject)}>
                        <div className="space-y-2">
                          <Label>Nome</Label>
                          <Input {...register('name')} id="name" name="name" placeholder="Nome do projeto" required />
                        </div>
                        <div className="space-y-2">
                          <Label>Imagem</Label>
                          <Input {...register('image')} id="image" name="image" placeholder="URLs das imagens (separadas por vírgula)" required />
                        </div>
                        <div className="space-y-2">
                          <Label>Descrição Curta</Label>
                          <Input {...register('shortDescription')} id="shortDescription" name="shortDescription" placeholder="Descrição curta do projeto" required />
                        </div>
                        <div className="space-y-2">
                          <Label>Descrição Longa</Label>
                          <Input {...register('longDescription')} id="longDescription" name="longDescription" placeholder="Descrição longa do projeto" required />
                        </div>
                        <div className="space-y-2">
                          <Label>Link</Label>
                          <Input {...register('href')} id="href" name="href" placeholder="Link para o projeto" required />
                        </div>
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <Select {...register('status')}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o status do projeto" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="ONLINE">Online</SelectItem>
                                <SelectItem value="DEVELOPMENT">Em Desenvolvimento</SelectItem>
                                <SelectItem value="INTERRUPTED">Interrompido</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Tecnologias</Label>
                          <select {...register('techs')} id="techs" name="techs" multiple required>
                            {techs.map((tech) => (
                              <option key={tech.id} value={tech.id}>
                                {tech.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <DrawerFooter>
                          <DrawerClose asChild>
                            <Button type='submit'>Criar Tecnologia</Button>
                          </DrawerClose>
                          <DrawerClose asChild>
                            <Button variant="outline">Cancelar</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </form>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Todos os Projetos</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Descrição</TableHead>
                        <TableHead className="hidden md:table-cell">Link</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Criado em
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Atualizado em
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    {projects.length === 0 ? (
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={4} className="h-24 text-center">
                            Nenhuma tecnologia encontrada
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ) : (
                      <>
                        <TableBody>
                          {projects.map((project) => (
                            <TableRow key={project.id}>
                              <TableCell className="hidden sm:table-cell">
                                <Image
                                  alt="Product image"
                                  className="aspect-square rounded-md object-cover"
                                  height="64"
                                  src={project.image}
                                  width="64"
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                {project.name}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{project.status}</Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {project.shortDescription}
                              </TableCell>
                              <TableCell className="hidden md:table-cell text-blue-500 underline">
                                <Link href={project.href}>
                                  {project.href}
                                </Link>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {new Intl.DateTimeFormat('pt-BR', {
                                  dateStyle: 'medium',
                                  timeStyle: 'short',
                                }).format(new Date(project.createdAt))}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {verificarAtualizacao(project)}
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      aria-haspopup="true"
                                      size="icon"
                                      variant="ghost"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Toggle menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className='space-y-1'>
                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                    <Drawer>
                                      <DrawerTrigger asChild>
                                        <Button className='flex justify-between w-full' size='sm' variant='outline'>Editar <Pen className='h-4 w-4' /></Button>
                                      </DrawerTrigger>
                                      <DrawerContent>
                                        <div className="mx-auto w-full max-w-sm">
                                          <DrawerHeader>
                                            <DrawerTitle>Editar {project.name}</DrawerTitle>
                                            <DrawerDescription>Edite com sabedoria o projeto escolhido.</DrawerDescription>
                                          </DrawerHeader>
                                          <form className='space-y-2 p-4 pb-0' onSubmit={handleSubmit((data) => handleEditProject(project.id, data))}>
                                            <div className="space-y-2">
                                              <Label>Nome</Label>
                                              <Input {...register('name')} id="name" name="name" placeholder="Nome do projeto" required />
                                            </div>
                                            <div className="space-y-2">
                                              <Label>Imagens</Label>
                                              <Input {...register('image')} id="image" name="image" placeholder="URLs das imagens (separadas por vírgula)" required />
                                            </div>
                                            <div className="space-y-2">
                                              <Label>Descrição Curta</Label>
                                              <Input {...register('shortDescription')} id="shortDescription" name="shortDescription" placeholder="Descrição curta do projeto" required />
                                            </div>
                                            <div className="space-y-2">
                                              <Label>Descrição Longa</Label>
                                              <Input {...register('longDescription')} id="longDescription" name="longDescription" placeholder="Descrição longa do projeto" required />
                                            </div>
                                            <div className="space-y-2">
                                              <Label>Link</Label>
                                              <Input {...register('href')} id="href" name="href" placeholder="Link para o projeto" required />
                                            </div>
                                            <div className="space-y-2">
                                              <Label>Status</Label>
                                              <Select {...register('status')}>
                                                <SelectTrigger>
                                                  <SelectValue placeholder="Selecione o status do projeto" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectGroup>
                                                    <SelectLabel>Status</SelectLabel>
                                                    <SelectItem value="ONLINE">Online</SelectItem>
                                                    <SelectItem value="DEVELOPMENT">Em Desenvolvimento</SelectItem>
                                                    <SelectItem value="INTERRUPTED">Interrompido</SelectItem>
                                                  </SelectGroup>
                                                </SelectContent>
                                              </Select>
                                            </div>
                                            <div className="space-y-2">
                                              <Label>Tecnologias</Label>
                                              <select {...register('techs')} id="techs" name="techs" multiple required>
                                                {techs.map((tech) => (
                                                  <option key={tech.id} value={tech.id}>
                                                    {tech.name}
                                                  </option>
                                                ))}
                                              </select>
                                            </div>
                                            <DrawerFooter>
                                              <DrawerClose asChild>
                                                <Button type='submit'>Editar Projeto</Button>
                                              </DrawerClose>
                                              <DrawerClose asChild>
                                                <Button variant="outline">Cancelar</Button>
                                              </DrawerClose>
                                            </DrawerFooter>
                                          </form>
                                        </div>
                                      </DrawerContent>
                                    </Drawer>
                                    <Button onClick={() => handleDeleteProject(project.id)} className='flex justify-between w-full hover:bg-red-500' size='sm' variant='outline'>Excluir <Trash2 className='h-4 w-4' /> </Button>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </>
                    )}
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Mostrando <strong>1-10</strong> de <strong>32</strong>{' '}
                    Projetos
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div >
  )
}

export default ProjectsDashboard
