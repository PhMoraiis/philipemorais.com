'use client'

import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MultiStepLoader as Loader } from '@/components/ui/multi-step-loader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckCircle, ListFilter, Loader2, MoreHorizontal, Pen, PlusCircle, RefreshCcw, Trash2, X } from 'lucide-react'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useTechStore from '@/stores/techStore'
import Image from 'next/image'
import { FormEvent, useEffect, useState } from 'react'

const TechsDashboard = () => {
  const { techs, loading: loadingTechs, setTechs, setLoading: setLoadingTechs, setError: setTechError, addTech } = useTechStore()
  const [refreshLoading, setRefreshLoading] = useState(false)

  useEffect(() => {
    const getTechs = async () => {
      setLoadingTechs(true)
      try {
        const response = await fetch('/api/techs')
        const data = await response.json()
        setTechs(data)
      } catch (error) {
        setTechError('Failed to get techs')
      } finally {
        setLoadingTechs(false)
      }
    }

    getTechs()
  }, [setTechs, setLoadingTechs, setTechError])

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

  if (loadingTechs) {
    return (
      <Loader loadingStates={loadingStates} loading={loadingTechs} duration={2000} />
    )
  }

  const handleCreateTech = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const name = formData.get('name') as string
    const icon = formData.get('icon') as string

    try {
      const response = await fetch('/api/techs', {
        method: 'POST',
        body: JSON.stringify({ name, icon }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const newTech = await response.json()
      addTech(newTech)
      toast.success('Tecnologia criada com sucesso!', {
        icon: <CheckCircle className='mr-2 h-4 w-4 text-green-500' />,
        description: `${newTech.name} Criada com sucesso`,
        duration: 2000,
      })

    } catch (error) {
      setTechError('Failed to create tech')
      toast.error('Erro ao criar tecnologia.', {
        description: 'Ocorreu um erro ao tentar criar a tecnologia. Por favor, tente novamente.',
        icon: <X className='mr-2 h-4 w-4 text-red-500' />,
        duration: 2000,
      })
    }
  }

  const handleUpdateTech = async (event: FormEvent<HTMLFormElement>, id: string) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const icon = formData.get('icon') as string

    // Obtenha a tecnologia atual para comparação
    const currentTech = techs.find(tech => tech.id === id)
    if (!currentTech) return // Se a tecnologia não for encontrada, não faz nada

    // Prepare o objeto com apenas os campos alterados
    const updatedFields: { name?: string; icon?: string } = {}
    if (name && name !== currentTech.name) updatedFields.name = name
    if (icon && icon !== currentTech.icon) updatedFields.icon = icon

    try {
      const response = await fetch(`/api/techs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedFields),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Falha ao editar tecnologia')
      }

      const updatedTech = await response.json()
      setTechs(techs.map(tech => tech.id === id ? updatedTech : tech)) // Atualiza o estado

      toast.success('Tecnologia editada com sucesso', {
        icon: <CheckCircle className='mr-2 h-4 w-4 text-green-500' />,
        description: `${name || currentTech.name} foi atualizada com sucesso`,
        duration: 2000
      })
    } catch (error) {
      toast.error('Erro ao editar tecnologia', {
        description: 'Ocorreu um erro ao tentar editar a tecnologia. Por favor, tente novamente.',
        icon: <X className='mr-2 h-4 w-4 text-red-500' />,
        duration: 2000
      })
    }
  }


  const handleDeleteTech = async (id: string) => {
    try {
      await fetch(`/api/techs/${id}`, { method: 'DELETE' })
      setTechs(techs.filter((tech) => tech.id !== id))
      toast.success('Tecnologia excluída com sucesso', {
        icon: <CheckCircle className='mr-2 h-4 w-4 text-green-500' />,
        description: `${techs.find((tech) => tech.id === id)?.name} excluída com sucesso`,
        duration: 2000
      })
    } catch (error) {
      toast.error('Erro ao excluir tecnologia', {
        description: 'Ocorreu um erro ao tentar excluir a tecnologia. Por favor, tente novamente.',
        icon: <X className='mr-2 h-4 w-4 text-red-500' />,
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
      const response = await fetchWithTimeout('/api/techs', {}, timeout)

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`)
      }

      const data = await response.json()
      setTechs(data)
    } catch (error) {
      setTechError('Failed to refresh techs')
    } finally {
      setRefreshLoading(false)
    }
  }

  const verificarAtualizacao = (tech: { updatedAt: string, createdAt: string }) => {
    if (tech.updatedAt === tech.createdAt) {
      return 'Nunca atualizada'
    } else {
      return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(tech.updatedAt))
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
                        Adicionar Tecnologia
                      </span>
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                      <DrawerHeader>
                        <DrawerTitle>Nova Tecnologia</DrawerTitle>
                        <DrawerDescription>Crie uma nova tecnologia.</DrawerDescription>
                      </DrawerHeader>
                      <form onSubmit={handleCreateTech} className='space-y-2 p-4 pb-0'>
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome</Label>
                          <Input id="name" name="name" placeholder="Nome da tecnologia" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="icon">Ícone</Label>
                          <Input id="icon" name="icon" placeholder="Icone da tecnologia" required />
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
                  <CardTitle>Suas Tecnologias</CardTitle>
                  <CardDescription>
                    Gerencie as suas tecnologias usadas em seus Projetos.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Icon</span>
                        </TableHead>
                        <TableHead>Nome</TableHead>
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
                    {techs.length === 0 ? (
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
                          {techs.map((tech) => (
                            <TableRow key={tech.id}>
                              <TableCell className="hidden sm:table-cell">
                                <Image
                                  alt="Product image"
                                  className="aspect-square rounded-md object-cover"
                                  height="64"
                                  src={tech.icon}
                                  width="64"
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                {tech.name}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {new Intl.DateTimeFormat('pt-BR', {
                                  dateStyle: 'medium',
                                  timeStyle: 'short',
                                }).format(new Date(tech.createdAt))}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {verificarAtualizacao(tech)}
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
                                            <DrawerTitle>Editar {tech.name}</DrawerTitle>
                                            <DrawerDescription>Edite com sabedoria a tecnologia escolhida.</DrawerDescription>
                                          </DrawerHeader>
                                          <form onSubmit={(event) => handleUpdateTech(event, tech.id)} className='space-y-2 p-4 pb-0'>
                                            <div className="space-y-2">
                                              <Label htmlFor="name">Nome</Label>
                                              <Input id="name" name="name" placeholder={tech.name} />
                                            </div>
                                            <div className="space-y-2">
                                              <Label htmlFor="icon">Ícone</Label>
                                              <Input id="icon" name="icon" placeholder={tech.icon} />
                                            </div>
                                            <DrawerFooter>
                                              <DrawerClose asChild>
                                                <Button type='submit'>Editar Tecnologia</Button>
                                              </DrawerClose>
                                              <DrawerClose asChild>
                                                <Button variant="outline">Cancelar</Button>
                                              </DrawerClose>
                                            </DrawerFooter>
                                          </form>
                                        </div>
                                      </DrawerContent>
                                    </Drawer>
                                    <Button onClick={() => handleDeleteTech(tech.id)} className='flex justify-between w-full hover:bg-red-500' size='sm' variant='outline'>Excluir <Trash2 className='h-4 w-4' /></Button>
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
                    Tecnologias
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

export default TechsDashboard
