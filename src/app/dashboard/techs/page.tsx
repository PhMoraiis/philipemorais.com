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
import { ListFilter, Loader2, MoreHorizontal, RefreshCcw } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import CreateTech from '@/components/TechsPage/Create/createTech'
import { useQuery } from '@tanstack/react-query'
import { getTechs } from '@/services/Techs/getTech'
import UpdateTech from '@/components/TechsPage/Update/updateTech'
import DeleteTech from '@/components/TechsPage/Delete/deleteTech'

const TechsDashboard = () => {
	const [refreshLoading, setRefreshLoading] = useState(false)
	
	const { data, isLoading, isError } = useQuery({
		queryKey: ['techs'],
		queryFn: getTechs,
		staleTime: 1000 * 60,
	})

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
										className='h-8 gap-1'
										// onClick={handleRefresh}
										disabled={refreshLoading}
									>
										{refreshLoading ? (
											<Loader2 className='h-4 w-4 animate-spin' />
										) : (
											<RefreshCcw className='h-3.5 w-3.5' />
										)}
									</Button>
								</DropdownMenu>
								<CreateTech />
							</div>
						</div>
						<TabsContent value='all'>
							<Card x-chunk='dashboard-06-chunk-0'>
								<CardHeader>
									<CardTitle>Suas Tecnologias</CardTitle>
									<CardDescription>
										Gerencie as tecnologias usadas nos projetos.
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
												<TableHead className='hidden md:table-cell'>
													Atualizado em
												</TableHead>
												<TableHead>
													<span className='sr-only'>Actions</span>
												</TableHead>
											</TableRow>
										</TableHeader>
										{data?.lenght === 0 ? (
											<TableBody>
												<TableRow>
													<TableCell colSpan={4} className='h-24 text-center'>
														Nenhuma tecnologia encontrada
													</TableCell>
												</TableRow>
											</TableBody>
										) : (
											<>
												<TableBody>
													{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
													{data?.map((tech: any, index: any) => (
														// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
														<TableRow key={index}>
															<TableCell className='hidden sm:table-cell'>
																<Image
																	alt='Product image'
																	className='aspect-square rounded-md object-cover'
																	height='44'
																	src={tech.image}
																	width='54'
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
															<TableCell className='hidden md:table-cell'>
																{/* {verificarAtualizacao(tech)} */}
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
																		<UpdateTech />
																		<DeleteTech />
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

export default TechsDashboard
