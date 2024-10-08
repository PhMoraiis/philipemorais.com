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
import { getTechs } from '@/http/techs'
import { useQuery } from '@tanstack/react-query'
import type { Tech } from '../techs/page'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MultiStepLoader as Loader } from '@/components/ui/multi-step-loader'

export default function TechTabs() {
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

	return (
		<TabsContent value='techs'>
			<Card x-chunk='dashboard-06-chunk-0'>
				<CardHeader>
					<CardTitle>Todas as Tecnologias</CardTitle>
					<CardDescription>
						Visualização de todas as tecnologias usadas em seus Projetos.
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
									Ultima atualização
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
							<TableBody>
								{data?.techs.map((tech: Tech) => (
									<TableRow key={tech.id}>
										<TableCell className='hidden sm:table-cell'>
											<Avatar>
												<AvatarImage
													src={tech.image}
													alt={`Imagem da tecnologia ${tech.name}`}
												/>
												<AvatarFallback>{tech.name.slice(0, 1)}</AvatarFallback>
											</Avatar>
										</TableCell>
										<TableCell className='font-medium'>{tech.name}</TableCell>
										<TableCell className='hidden md:table-cell'>
											{new Intl.DateTimeFormat('pt-BR', {
												dateStyle: 'medium',
												timeStyle: 'short',
											}).format(new Date(tech.createdAt))}
										</TableCell>
										<TableCell className='hidden md:table-cell'>
											{new Intl.DateTimeFormat('pt-BR', {
												dateStyle: 'medium',
												timeStyle: 'short',
											}).format(new Date(tech.updatedAt))}
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
