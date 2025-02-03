import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { deleteTechByID } from '@/services/Techs/deleteTech'
import { useQueryClient } from '@tanstack/react-query'
import { Check, CircleX, Trash2 } from 'lucide-react'
import React from 'react'

export default function DeleteTech({ techID }: { techID: string }) {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	const handleDeleteTech = async (techID: string) => {
		try {
			await deleteTechByID(techID)
			toast({
				title: 'Tecnologia excluída com sucesso!',
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

		queryClient.invalidateQueries({ queryKey: ['techs'] })
	}

	return (
		<Button
			onClick={() => handleDeleteTech(techID)}
			className='flex justify-between w-full hover:bg-red-500'
			size='sm'
			variant='outline'
		>
			Excluir <Trash2 className='h-4 w-4' />
		</Button>
	)
}
