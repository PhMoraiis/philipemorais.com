import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { deleteProjectByID } from '@/services/Projects/deleteProject'
import { useQueryClient } from '@tanstack/react-query'
import { Check, CircleX, Trash2 } from 'lucide-react'

export const DeleteProject = ({ projectID }: { projectID: string }) => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	const handleDeleteProject = async (projectID: string) => {
		try {
			await deleteProjectByID(projectID)
			toast({
				title: 'Projeto excluído com sucesso!',
				variant: 'success',
				action: <Check />,
			})
		} catch (error) {
			toast({
				title: 'Houve um erro',
				description: `${error instanceof Error ? error.message : 'Erro desconhecido'}`,
				variant: 'destructive',
				action: <CircleX />,
			})
		}

		queryClient.invalidateQueries({ queryKey: ['projects'] })
	}

	return (
		<Button
			onClick={() => handleDeleteProject(projectID)}
			className='flex justify-between w-full hover:bg-red-500 hover:text-secondary text-red-500 border-red-500'
			size='sm'
			variant='outline'
		>
			Excluir <Trash2 className='h-4 w-4' />{' '}
		</Button>
	)
}
