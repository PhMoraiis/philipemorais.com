import { ArrowDownRight } from 'lucide-react'

const Story = () => {
	return (
		<div className='mt-12'>
			<div className='flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between lg:flex-row lg:items-end lg:justify-between mb-14'>
				<div className='flex items-end max-w-xl'>
					<h2 className='text-5xl font-bold font-Relative'>
						I don't have dark secrets, only bright ones
					</h2>
					<ArrowDownRight size={24} />
				</div>
			</div>
		</div>
	)
}

export default Story
