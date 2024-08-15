'use client'

import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MultiStepLoader as Loader } from '@/components/ui/multi-step-loader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ListFilter, MoreHorizontal, PlusCircle, Trash2 } from 'lucide-react'

import { apiClient } from '@/lib/apiClient'
import useTechStore from '@/stores/techStore'
import Image from 'next/image'
import { useEffect } from 'react'

const TechsDashboard = () => {
  const { techs, loading: loadingTechs, setTechs, setLoading: setLoadingTechs, setError: setTechError } = useTechStore()

  useEffect(() => {
    const getTechs = async () => {
      setLoadingTechs(true)
      try {
        const data = await apiClient('/api/techs')
        setTechs(data)
        console.log(data)
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

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-2">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="active">Ativas</TabsTrigger>
                <TabsTrigger value="draft">Rascunho</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Arquivadas
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filtros
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Ativas
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Rascunhos</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Arquivadas
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Adicionar Tecnologia
                  </span>
                </Button>
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
                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                    <DropdownMenuItem className='flex justify-between bg-red-500'>Excluir <Trash2 className='h-4 w-4' /> </DropdownMenuItem>
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
