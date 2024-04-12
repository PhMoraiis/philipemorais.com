import dynamic from 'next/dynamic'
import Works from '../Works'

const SelectedWorks = () => {
  return (
    <div className='grid grid-cols-1 place-items-center gap-x-6 md:grid-cols-2 lg:grid-cols-2'>
      <Works />
      <Works />
      <Works />
      <Works />
    </div>
  )
}

export default dynamic(() => Promise.resolve(SelectedWorks), { ssr: false })