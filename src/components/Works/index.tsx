'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const Works = () => {

  return (
    <section className='bg-white dark:bg-[#111110] rounded-xl shadow-sm mt-6 border border-white/10'>
      <div className="overflow-hidden">
        <Image src={'/images/Frame16.svg'} width={1000} height={500} alt='Nimbus Logo' className='w-full rounded-xl' />
      </div>
      <div className="dark:bg-[#0a0a0a] p-10 space-y-6 md:flex md:items-end md:justify-between lg:flex lg:items-end lg:justify-between">
        <div className="flex flex-col items-start gap-4 md:gap-6 md:max-w-sm lg:gap-6 lg:max-w-lg">
          <div className="flex items-center justify-center max-w-xs lg:max-w-md space-x-4">
            <Image src={'/images/Nimbus.svg'} width={100} height={100} alt='Nimbus Logo' className='w-10 h-10' />
            <h1 className="text-3xl leading-none font-Relative">Pathway</h1>
          </div>
          <p className="max-w-md font-RelativeBk lg:max-w-lg lg:text-lg">Currently working at Young Platform helping to concept.</p>
        </div>
      </div>
    </section>
  )
}

export default dynamic(() => Promise.resolve(Works), { ssr: false })

