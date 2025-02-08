'use client'

import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
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
import { Tabs, TabsContent } from '@/components/ui/tabs'
import {
	Check,
	CircleX,
	GripVertical,
	ListFilter,
	Loader2,
	MoreHorizontal,
	RefreshCcw,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useQuery } from '@tanstack/react-query'
import { CreateProject } from '@/components/ProjectsPage/Create'
import { getProjects, type IGetProject } from '@/services/Projects/getProject'
import Image from 'next/image'
import Link from 'next/link'
import { DeleteProject } from '@/components/ProjectsPage/Delete'
import { UpdateProject } from '@/components/ProjectsPage/Update'
import { verifyUpdate } from '@/lib/verifyUpdate'

const ProjectsDashboard = () => {
	const { toast } = useToast()

	const {
		data: projects,
		isLoading,
		isError,
		refetch,
		isFetching,
		isFetched,
	} = useQuery({
		queryKey: ['projects'],
		queryFn: getProjects,
	})

	const handleRefresh = async () => {
		try {
			await refetch()
			if (isFetched) {
				toast({
					title: 'Data refreshed!',
					description: 'Data has been refreshed successfully!',
					variant: 'success',
					action: <Check />,
				})
			}
		} catch (error) {
			toast({
				title: 'There was an error',
				description: 'Error while trying to refresh the data, try again later!',
				variant: 'destructive',
				action: <CircleX />,
			})
		}
	}

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
			<Loader
				loadingStates={loadingStates}
				loading={isLoading}
				duration={2000}
			/>
		)
	}

	if (isError) {
		toast({
			title: 'There was an error',
			description: 'There was an error with the request, try again!',
			variant: 'destructive',
			action: <CircleX />,
		})
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
										<DropdownMenuCheckboxItem>
											Data de Criação
										</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>
											Data de Atualização
										</DropdownMenuCheckboxItem>
									</DropdownMenuContent>
									<Button
										size='sm'
										variant='outline'
										onClick={handleRefresh}
										disabled={isFetching}
									>
										{isFetching ? (
											<Loader2 className='h-4 w-4 animate-spin' />
										) : (
											<RefreshCcw className='h-3.5 w-3.5' />
										)}
									</Button>
								</DropdownMenu>
								<CreateProject />
							</div>
						</div>
						<TabsContent value='all'>
							<Card className='bg-background' x-chunk='dashboard-06-chunk-0'>
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
												<TableHead className='hidden md:table-cell'>
													Descrição
												</TableHead>
												<TableHead className='hidden md:table-cell'>
													Link
												</TableHead>
												<TableHead className='hidden md:table-cell'>
													Data Inicial
												</TableHead>
												<TableHead className='hidden md:table-cell'>
													Data Final
												</TableHead>
												<TableHead className='hidden md:table-cell'>
													Criado em
												</TableHead>
												<TableHead className='hidden md:table-cell'>
													Atualizado em
												</TableHead>
												<TableHead>
													<span className='sr-only'>Actions</span>
												</TableHead>
											</TableRow>
										</TableHeader>
										{projects?.length === 0 ? (
											<TableBody>
												<TableRow>
													<TableCell colSpan={4} className='h-24 text-center'>
														Nenhum projeto encontrado
													</TableCell>
												</TableRow>
											</TableBody>
										) : (
											<>
												<TableBody>
													{projects.map((project: IGetProject) => (
														<TableRow key={project.id}>
															<TableCell className='hidden sm:table-cell'>
																<Image
																	alt='Product image'
																	className='aspect-square rounded-md object-cover'
																	height='64'
																	src={project.icon}
																	width='64'
																/>
															</TableCell>
															<TableCell className='font-medium'>
																{project.title}
															</TableCell>
															<TableCell className='hidden md:table-cell'>
																{project.description}
															</TableCell>
															<TableCell className='hidden md:table-cell text-[#1d48e140]/50 underline hover:text-[#1d48e140]/65'>
																<Link href={project.href}>{project.href}</Link>
															</TableCell>
															<TableCell className='hidden md:table-cell'>
																{new Intl.DateTimeFormat('pt-BR', {
																	dateStyle: 'short',
																}).format(new Date(project.initial_date))}
															</TableCell>
															<TableCell className='hidden md:table-cell'>
																{new Intl.DateTimeFormat('pt-BR', {
																	dateStyle: 'short',
																}).format(new Date(project.final_date))}
															</TableCell>
															<TableCell className='hidden md:table-cell'>
																{new Intl.DateTimeFormat('pt-BR', {
																	dateStyle: 'short',
																	timeStyle: 'short',
																}).format(new Date(project.createdAt))}
															</TableCell>
															<TableCell className='hidden md:table-cell'>
																{verifyUpdate({ project })}
															</TableCell>
															<TableCell className='space-x-2'>
																<DropdownMenu>
																	<DropdownMenuTrigger asChild>
																		<Button
																			aria-haspopup='true'
																			size='icon'
																			variant='outline'
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
																		<UpdateProject projectID={project.id} />
																		<DeleteProject projectID={project.id} />
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
							</Card>
						</TabsContent>
					</Tabs>
				</main>
			</div>
		</div>
	)
}

export default ProjectsDashboard
