import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import React from 'react'

export default function DeleteTech() {
	return (
		<Button
			// onClick={() => handleDeleteTech(tech.id)}
			className='flex justify-between w-full hover:bg-red-500'
			size='sm'
			variant='outline'
		>
			Excluir <Trash2 className='h-4 w-4' />
		</Button>
	)
}
