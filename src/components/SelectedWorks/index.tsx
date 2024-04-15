import dynamic from 'next/dynamic'
import Works from '../Works'

const SelectedWorks = () => {
  return (
    <div className='mt-24'>
      <div className='flex items-center justify-center mb-20'>
        <h2 className='text-5xl font-bold flex items-center justify-center font-Relative'>Selected Works</h2>
      </div>
      <div className='grid grid-cols-1 space-y-6 md:grid-cols-2 md:gap-6 md:items-center md:justify-center md:place-items-center md:space-y-0 lg:grid-cols-3 lg:gap-y-10'>
        <Works />
        <Works />
        <Works />
        <Works />
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(SelectedWorks), { ssr: false })