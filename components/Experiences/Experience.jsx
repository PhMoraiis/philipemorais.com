import Image from 'next/image'
import React from 'react'

const Experience = () => {
  return (
    <article className='flex flex-col  items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w=[900px] snap-center shadow-xl p-6 rounded-xl transition-opacity duration-200 overflow-hidden'>
      <div>
        <Image
          className='w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center shadow-xl p-4'
          src="/images/Image1.png"
          alt="Experiencia"
          width={200}
          height={200}
        />
      </div>

      <div className='px-0 md:px-10'>
        <h4 className='text-4xl font-light'>CEO</h4>
        <p className='font-bold text-2xl mt-1 text-[#4a9b7f]'>FOTON</p>
        <div className='flex space-x-2 my-[-20px]'>
          <Image className='h-100 w-120 rounded-full' src="/images/LogoBall.png" alt="" width={120} height={100} />
          <Image className='h-100 w-120 rounded-full' src="/images/LogoBall.png" alt="" width={120} height={100} />
          <Image className='h-100 w-120 rounded-full' src="/images/LogoBall.png" alt="" width={120} height={100} />
        </div>
        <p className='uppercase py-5 text-gray-300'>Started work... - Ended...</p>

        <ul className='list-disc space-y-4 ml-5 text-lg'>
          <li>Summary points</li>
          <li>Summary points</li>
          <li>Summary points</li>
          <li>Summary points</li>
          <li>Summary points</li>
        </ul>
      </div>
    </article>
  )
}

export { Experience }