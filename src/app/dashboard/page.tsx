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
import { ListFilter, Loader2, RefreshCcw } from 'lucide-react'
import Image from 'next/image'

import Link from 'next/link'

const Dashboard = () => {
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

	if (loading) {
		return (
			<Loader loadingStates={loadingStates} loading={loading} duration={2000} />
		)
	}

	return (
		<div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
			<Sidebar />
			<div className='flex flex-col'>
				<Topbar />
				<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-2'>
					<Tabs defaultValue='projects'>
						<div className='flex items-center'>
							<TabsList>
								<TabsTrigger value='projects'>Projetos</TabsTrigger>
								<TabsTrigger value='techs'>Tecnologias</TabsTrigger>
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
							</div>
						</div>
						<TabsContent value='projects'>
							<Card x-chunk='dashboard-06-chunk-0'>
								<CardHeader>
									<CardTitle>Todos os Projetos</CardTitle>
									<CardDescription>
										Visualização de todos os projetos criados
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
													<span className='sr-only'>Actions</span>
												</TableHead>
											</TableRow>
										</TableHeader>
										{projects.length === 0 ? (
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
													{projects.map((project) => (
														<TableRow key={project.id}>
															<TableCell className='hidden sm:table-cell'>
																<Image
																	alt='Product image'
																	className='aspect-square rounded-md object-cover'
																	height='64'
																	src={project.image}
																	width='64'
																/>
															</TableCell>
															<TableCell className='font-medium'>
																{project.name}
															</TableCell>
															<TableCell>
																<Badge variant={project.status}>
																	{project.status}
																</Badge>
															</TableCell>
															<TableCell className='hidden md:table-cell'>
																{project.shortDescription}
															</TableCell>
															<TableCell className='hidden md:table-cell text-blue-500 underline'>
																<Link href={project.href}>{project.href}</Link>
															</TableCell>
															<TableCell className='hidden md:table-cell'>
																{new Intl.DateTimeFormat('pt-BR', {
																	dateStyle: 'medium',
																	timeStyle: 'short',
																}).format(new Date(project.createdAt))}
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
						<TabsContent value='techs'>
							<Card x-chunk='dashboard-06-chunk-0'>
								<CardHeader>
									<CardTitle>Todas as Tecnologias</CardTitle>
									<CardDescription>
										Visualização de todas as tecnologias usadas em seus
										Projetos.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead className='hidden w-[100px] sm:table-cell'>
													<span className='sr-only'>Icon</span>
												</TableHead>
												<TableHead>Nome</TableHead>
												<TableHead className='hidden md:table-cell'>
													Criado em
												</TableHead>
											</TableRow>
										</TableHeader>
										{techs.length === 0 ? (
											<TableBody>
												<TableRow>
													<TableCell colSpan={4} className='h-24 text-center'>
														Nenhuma tecnologia encontrada
													</TableCell>
												</TableRow>
											</TableBody>
										) : (
											<div>
												<TableBody>
													{techs.map((tech) => (
														<TableRow key={tech.id}>
															<TableCell className='hidden sm:table-cell'>
																<Image
																	alt='Product image'
																	className='aspect-square rounded-md object-cover'
																	height='64'
																	src={tech.icon}
																	width='64'
																/>
															</TableCell>
															<TableCell className='font-medium'>
																{tech.name}
															</TableCell>
															<TableCell className='hidden md:table-cell'>
																{new Intl.DateTimeFormat('pt-BR', {
																	dateStyle: 'medium',
																	timeStyle: 'short',
																}).format(new Date(tech.createdAt))}
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

export default Dashboard
