import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Project = () => {
  return (
    <div className='relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl p-4 group hover:gb-gradient-to-r from-[#276355] to-[#4a9b7f]'>
      <Image
        src={'/images/nextjs.png'}
        alt='NextJS'
        width={500}
        height={500}
        className='rounded-xl group-hover:opacity-10'
      />
      <div className='hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
        <h3 className='text-2xl text-white tracking-wider text-center'>NextJS</h3>
        <p className='pb-4 pt-2 text-white text-center'>React Js</p>
        <Link href="/">
          <p className='text-center py-3 rounded-lg bg-white text-gray-700 font-bold text-lg cursor-pointer'>Ver Mais</p>
        </Link>
      </div>
    </div>
  )
}

export { Project }