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
	DropdownMenuContent,
	DropdownMenuLabel,
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
import { Tabs, TabsContent } from '@/components/ui/tabs'
import {
	ArrowDownIcon,
	ArrowUpIcon,
	Ban,
	MoreHorizontal,
	Trash2,
} from 'lucide-react'

import Link from 'next/link'

import CreateProjectForm from './create-form'
import UpdateProjectForm from './update-form'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteProject, getProjectById, getProjects, type Stats } from '@/http/projects'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export type Project = {
	id: string
	title: string
	description: string
	href: string
	lightImageDesktop: string
	darkImageDesktop?: string
	lightImageMobile: string
	darkImageMobile?: string
	techs: string[]
	status: Stats
	order: number
	createdAt: Date
	updatedAt: Date
}

const ProjectsDashboard = () => {
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		queryFn: getProjects,
		queryKey: ['projects'],
	})

	async function handleDeleteProject(projectId: string) {
		try {
			await deleteProject(projectId)
			toast('Projeto excluído com sucesso!', {
				icon: <Trash2 className='mr-2 h-4 w-4 text-green-500' />,
				duration: 2000,
			})
		} catch (error) {
			toast('Ocorreu um erro, tente novamente!', {
				icon: <Ban className='mr-2 h-4 w-4 text-red-500' />,
				description: `${error}`,
				duration: 2000,
			})
		}

		queryClient.invalidateQueries({ queryKey: ['projects'] })
	}

	const loadingStates = [
		{ text: 'Bem vindo ao OnPholio' },
		{ text: 'Explorando novos horizontes' },
		{ text: 'Preparando um café delicioso' },
		{ text: 'Decifrando os segredos do universo' },
		{ text: 'Fazendo algumas alterações no tempo' },
		{ text: 'Preparando o palco' },
		{ text: 'Coletando estrelas' },
		{ text: 'Deixando as engrenagens girarem' },
	]

	if (isLoading) {
		return (
			<Loader
				loadingStates={loadingStates}
				loading={isLoading}
				duration={2000}
			/>
		)
	}

	return (
		<div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
			<Sidebar />
			<div className='flex flex-col'>
				<Topbar />
				<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-2'>
					<Tabs defaultValue='all'>
						<div className='flex items-center'>
							<div className='ml-auto flex items-center gap-2'>
								<CreateProjectForm />
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
												<TableHead className='hidden md:table-cell'>
													Atualizado em
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
											<TableBody>
												{data?.projects.map((project: Project) => (
													<TableRow key={project.id}>
														<TableCell className='hidden sm:table-cell'>
															<Avatar>
																<AvatarImage
																	src={project.lightImageDesktop}
																	alt={project.title}
																/>
																<AvatarFallback>{project.title}</AvatarFallback>
															</Avatar>
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
														<TableCell className='hidden md:table-cell'>
															{new Intl.DateTimeFormat('pt-BR', {
																dateStyle: 'medium',
																timeStyle: 'short',
															}).format(new Date(project.updatedAt))}
														</TableCell>
														<TableCell>
															<DropdownMenu>
																<DropdownMenuTrigger asChild>
																	<Button
																		aria-haspopup='true'
																		size='icon'
																		variant='outline'
																	>
																		<MoreHorizontal className='h-4 w-4' />
																		<span className='sr-only'>Toggle menu</span>
																	</Button>
																</DropdownMenuTrigger>
																<DropdownMenuContent
																	align='end'
																	className='space-y-1'
																>
																	<DropdownMenuLabel>Ações</DropdownMenuLabel>
																	<UpdateProjectForm projectId={project.id} />
																	<Button
																		className='flex justify-between w-full hover:bg-red-500 hover:text-secondary text-red-500 border-red-500'
																		size='sm'
																		variant='outline'
																		onClick={() =>
																			handleDeleteProject(project.id)
																		}
																	>
																		Excluir <Trash2 className='h-4 w-4' />{' '}
																	</Button>
																</DropdownMenuContent>
															</DropdownMenu>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
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
