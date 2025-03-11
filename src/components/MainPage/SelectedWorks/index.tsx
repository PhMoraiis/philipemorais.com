import { ArrowDownRight } from 'lucide-react'
import Works from '../Works'
import { Highlight } from '@/components/ui/hero-highlight'

const SelectedWorks = () => {

	return (
		<div className='mt-12'>
			<div className='flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between lg:flex-row lg:items-end lg:justify-between mb-14'>
				<div className='flex items-end'>
					<h2 className='text-7xl font-Relative'>
						My latest <Highlight> works</Highlight>
					</h2>
					<ArrowDownRight size={24} />
				</div>
			</div>
			<div className='grid grid-cols-1 space-y-6 md:gap-6 md:items-center md:justify-center md:place-items-center md:space-y-0 lg:gap-y-10'>
				<Works />
			</div>
		</div>
	)
}

export default SelectedWorks
