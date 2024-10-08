import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from '@/components/ui/table'
import { TabsContent } from '@/components/ui/tabs'
import { MultiStepLoader as Loader } from '@/components/ui/multi-step-loader'
import type { Project } from '../projects/page'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/http/projects'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function ProjectTabs() {
	const { data, isLoading } = useQuery({
		queryFn: getProjects,
		queryKey: ['projects'],
	})

	console.log(data)

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
								<TableHead className='hidden md:table-cell'>Link</TableHead>
								<TableHead className='hidden md:table-cell'>
									Criado em
								</TableHead>
								<TableHead className='hidden md:table-cell'>
									Ultima atualização
								</TableHead>
								<TableHead>
									<span className='sr-only'>Actions</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						{data?.projects.lenght === 0 ? (
							<TableBody>
								<TableRow>
									<TableCell colSpan={4} className='h-24 text-center'>
										Nenhum projeto encontrado
									</TableCell>
								</TableRow>
							</TableBody>
						) : (
							<TableBody>
								{data?.projects?.map((project: Project) => (
									<TableRow key={project.id}>
										<TableCell className='hidden sm:table-cell'>
											<Avatar>
												<AvatarImage
													src={project.lightImageDesktop}
													alt={`Logo de ${project.title}`}
												/>
												<AvatarFallback>
													{project.title.slice(0, 2)}
												</AvatarFallback>
											</Avatar>
										</TableCell>
										<TableCell className='font-medium'>
											{project.title}
										</TableCell>
										<TableCell>
											<Badge variant={project.status}>{project.status}</Badge>
										</TableCell>
										<TableCell className='hidden md:table-cell'>
											{project.description}
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
										<TableCell className='hidden md:table-cell'>
											{new Intl.DateTimeFormat('pt-BR', {
												dateStyle: 'medium',
												timeStyle: 'short',
											}).format(new Date(project.updatedAt))}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						)}
					</Table>
				</CardContent>
			</Card>
		</TabsContent>
	)
}
