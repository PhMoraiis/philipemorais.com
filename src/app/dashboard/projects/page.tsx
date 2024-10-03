'use client'

import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MultiStepLoader as Loader } from '@/components/ui/multi-step-loader'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'

import {
	ListFilter,
	MoreHorizontal,
	Pen,
	PlusCircle,
	Trash2,
} from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import { useServerActionQuery } from '@/hooks/server-actions-hooks'
import { getAllProjectsAction } from '@/actions/Projects'
import CreateProjectForm from './create-form'
import UpdateProjectForm from './update-form'

const ProjectsDashboard = () => {

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

	if (isLoading) {
		return (
			<Loader loadingStates={loadingStates} loading={isLoading} duration={2000} />
		)
	}

	const verifyUpdate = (project: {
		updatedAt: string
		createdAt: string
	}) => {
		if (project.updatedAt === project.createdAt) {
			return 'Projeto nunca atualizado'
		}
		return new Intl.DateTimeFormat('pt-BR', {
			dateStyle: 'medium',
			timeStyle: 'short',
		}).format(new Date(project.updatedAt))
	}

	return (
		<div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
			<Sidebar />
			<div className='flex flex-col'>
				<Topbar />
				<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-2'>
					<Tabs defaultValue='all'>
						<div className='flex items-center'>
							<TabsList>
								<TabsTrigger value='all'>Todos</TabsTrigger>
								<TabsTrigger value='active'>Online</TabsTrigger>
								<TabsTrigger value='draft'>Em Desenvolvimento</TabsTrigger>
								<TabsTrigger value='archived' className='hidden sm:flex'>
									Interrompidos
								</TabsTrigger>
							</TabsList>
							<div className='ml-auto flex items-center gap-2'>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant='outline' size='sm' className='h-8 gap-1'>
											<ListFilter className='h-3.5 w-3.5' />
											<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
												Ordenar
											</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align='end'>
										<DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuCheckboxItem checked>
											Nome
										</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>Status</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>
											Data de Criação
										</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>
											Data de Atualização
										</DropdownMenuCheckboxItem>
									</DropdownMenuContent>
								</DropdownMenu>
								<Drawer>
									<DrawerTrigger asChild>
										<Button size='sm' className='h-8 gap-1'>
											<PlusCircle className='h-3.5 w-3.5' />
											<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
												Adicionar Projeto
											</span>
										</Button>
									</DrawerTrigger>
									<DrawerContent>
										<div className='mx-auto w-full max-w-sm'>
											<DrawerHeader>
												<DrawerTitle>Novo Projeto</DrawerTitle>
												<DrawerDescription>
													Crie um novo projeto.
												</DrawerDescription>
											</DrawerHeader>
											<CreateProjectForm />
										</div>
									</DrawerContent>
								</Drawer>
							</div>
						</div>
						<TabsContent value='all'>
							<Card x-chunk='dashboard-06-chunk-0'>
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
												<TableHead className='hidden w-[100px] sm:table-cell'>
													<span className='sr-only'>Image</span>
												</TableHead>
												<TableHead>Nome</TableHead>
												<TableHead>Status</TableHead>
												<TableHead className='hidden md:table-cell'>
													Descrição
												</TableHead>
												<TableHead className='hidden md:table-cell'>
													Link
												</TableHead>
												<TableHead className='hidden md:table-cell'>
													Criado em
												</TableHead>
												<TableHead>
													<span className='sr-only'>Ações</span>
												</TableHead>
											</TableRow>
										</TableHeader>
										{data?.projects.length === 0 ? (
											<TableBody>
												<TableRow>
													<TableCell colSpan={4} className='h-24 text-center'>
														Nenhum projeto encontrado
													</TableCell>
												</TableRow>
											</TableBody>
										) : (
											<div>
												<TableBody>
													{data?.projects.map((project) => (
														<TableRow key={project.id}>
															<TableCell className='hidden sm:table-cell'>
																<Image
																	alt='Product image'
																	className='aspect-square rounded-md object-cover'
																	height='64'
																	src={project.imagesDesktop[0]}
																	width='64'
																/>
															</TableCell>
															<TableCell className='font-medium'>
																{project.title}
															</TableCell>
															<TableCell>
																<Badge variant={project.status}>
																	{project.status}
																</Badge>
															</TableCell>
															<TableCell className='hidden md:table-cell'>
																{project.description}
															</TableCell>
															<TableCell className='hidden md:table-cell text-[#1d48e140]/50 underline hover:text-[#1d48e140]/65'>
																<Link href={project.href}>{project.href}</Link>
															</TableCell>
															<TableCell className='hidden md:table-cell'>
																{new Intl.DateTimeFormat('pt-BR', {
																	dateStyle: 'medium',
																	timeStyle: 'short',
																}).format(new Date(project.createdAt))}
															</TableCell>
															<TableCell>
																<DropdownMenu>
																	<DropdownMenuTrigger asChild>
																		<Button
																			aria-haspopup='true'
																			size='icon'
																			variant='ghost'
																		>
																			<MoreHorizontal className='h-4 w-4' />
																			<span className='sr-only'>
																				Toggle menu
																			</span>
																		</Button>
																	</DropdownMenuTrigger>
																	<DropdownMenuContent
																		align='end'
																		className='space-y-1'
																	>
																		<DropdownMenuLabel>Ações</DropdownMenuLabel>
																		<Drawer>
																			<DrawerTrigger asChild>
																				<Button
																					className='flex justify-between w-full'
																					size='sm'
																					variant='outline'
																				>
																					Editar <Pen className='h-4 w-4' />
																				</Button>
																			</DrawerTrigger>
																			<DrawerContent>
																				<div className='mx-auto w-full max-w-sm'>
																					<DrawerHeader>
																						<DrawerTitle>
																							Editar {project.title}
																						</DrawerTitle>
																						<DrawerDescription>
																							Edite com sabedoria o projeto
																							escolhido.
																						</DrawerDescription>
																					</DrawerHeader>
																					<UpdateProjectForm />
																				</div>
																			</DrawerContent>
																		</Drawer>
																		<Button
																			className='flex justify-between w-full hover:bg-red-500 hover:text-secondary text-red-500 border-red-500'
																			size='sm'
																			variant='outline'
																		>
																			Excluir <Trash2 className='h-4 w-4' />{' '}
																		</Button>
																	</DropdownMenuContent>
																</DropdownMenu>
															</TableCell>
														</TableRow>
													))}
												</TableBody>
											</div>
										)}
									</Table>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</main>
			</div>
		</div>
	)
}

export default ProjectsDashboard
