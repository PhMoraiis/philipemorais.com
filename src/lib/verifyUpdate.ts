interface IVerifyUpdate {
	project?: {
		createdAt: string
		updatedAt: string
	}
	tech?: {
		createdAt: string
		updatedAt: string
	}
}

export const verifyUpdate = ({ project, tech }: IVerifyUpdate) => {
	// Verifica se o projeto ou a tecnologia existem antes de acessar suas propriedades
	if (project && project.updatedAt === project.createdAt) {
		return 'Nunca atualizada'
	}

	if (tech && tech.updatedAt === tech.createdAt) {
		return 'Nunca atualizada'
	}

	const dataAtualizacao = project?.updatedAt ?? tech?.updatedAt
	if (!dataAtualizacao) return 'Data desconhecida'

	return new Intl.DateTimeFormat('pt-BR', {
		dateStyle: 'short',
		timeStyle: 'short',
	}).format(new Date(dataAtualizacao))
}
