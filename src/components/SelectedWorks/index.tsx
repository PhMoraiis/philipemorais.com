import dynamic from 'next/dynamic'
import Link from 'next/link'
import Works from '../Works'
import { Badge } from '../ui/badge'
import { ArrowRight } from 'lucide-react'

const SelectedWorks = () => {
  return (
    <div className='mt-24'>
      <div className='flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between lg:flex-row lg:items-end lg:justify-between mb-14'>
        <div>
          <h2 className='text-5xl font-bold flex items-center justify-center font-Relative'>Selected Works</h2>
        </div>
        <div>
          <Link href='/projects'>
            <Badge variant="defaultPointer">View All Projects <ArrowRight size={18} /></Badge>
          </Link>
        </div>
      </div>
      <div className='grid grid-cols-1 space-y-6 md:gap-6 md:items-center md:justify-center md:place-items-center md:space-y-0 lg:gap-y-10'>
        <Works />
        <Works />
        <Works />
        <Works />
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(SelectedWorks), { ssr: false })