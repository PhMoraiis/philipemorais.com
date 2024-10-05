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
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
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
import { Ban, ListFilter, MoreHorizontal, Pen, Trash2 } from 'lucide-react'

import Image from 'next/image'
import CreateTechForm from './create-form'
import UpdateTechForm from './update-form'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteTech, getTechs } from '../../../http/techs'
import { toast } from 'sonner'

type Tech = {
	id: string
	name: string
	image: string
	createdAt: Date
	updatedAt: Date
}

const TechsDashboard = () => {
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		queryFn: getTechs,
		queryKey: ['techs'],
	})

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

	async function handleDeleteTech(techId: string) {
		try {
			await deleteTech(techId)
			toast('Tecnologia excluída com sucesso!', {
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

		queryClient.invalidateQueries({ queryKey: ['techs'] })
	}

	return (
		<div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
			<Sidebar />
			<div className='flex flex-col'>
				{/* <Topbar /> */}
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
								</DropdownMenu>
								<CreateTechForm />
							</div>
						</div>
						<TabsContent value='all'>
							<Card x-chunk='dashboard-06-chunk-0'>
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
										{data?.techs.length === 0 ? (
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
													{data?.techs.map((tech: Tech) => (
														<TableRow key={tech.id}>
															<TableCell className='hidden sm:table-cell'>
																{tech.image ? (
																	<Image
																		alt='Product image'
																		className='aspect-square rounded-md object-cover'
																		height='44'
																		src={tech.image}
																		width='54'
																	/>
																) : (
																	<div
																		className='aspect-square rounded-md bg-gray-200'
																		style={{ height: '44px', width: '54px' }}
																	/>
																)}
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
																							Editar {tech.name}
																						</DrawerTitle>
																						<DrawerDescription>
																							Edite com sabedoria a tecnologia
																							escolhida.
																						</DrawerDescription>
																					</DrawerHeader>
																					<UpdateTechForm />
																				</div>
																			</DrawerContent>
																		</Drawer>
																		<Button
																			className='flex justify-between w-full hover:bg-red-500'
																			size='sm'
																			variant='outline'
																			onClick={() => handleDeleteTech(tech.id)}
																		>
																			Excluir <Trash2 className='h-4 w-4' />
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

export default TechsDashboard
