import Link from 'next/link'
import { Badge } from '../ui/badge'
import { ArrowRight } from 'lucide-react'
import Works from '../Works/índex'

const SelectedWorks = () => {

  return (
    <div className='mt-24'>
      <div className='flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between lg:flex-row lg:items-end lg:justify-between mb-14'>
        <div>
          <h2 className='text-5xl font-bold flex items-center justify-center font-Relative'>{'title'}</h2>
        </div>
        <div>
          <Link href='/soon'>
            <Badge variant="defaultPointer">{'buttonSoon'}<ArrowRight size={18} /></Badge>
          </Link>
        </div>
      </div>
      <div className='grid grid-cols-1 space-y-6 md:gap-6 md:items-center md:justify-center md:place-items-center md:space-y-0 lg:gap-y-10'>
        <Works />
      </div>
    </div>
  )
}

export default SelectedWorks