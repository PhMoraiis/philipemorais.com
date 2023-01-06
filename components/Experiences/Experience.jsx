import Image from 'next/image'
import React from 'react'

const Experience = ({ 
  src,
  alt,
  srctech,
  srctech2,
  srctech3,
  alttech,
  alttech2,
  alttech3,
  position,
  company }) => {
  return (
    <article className='flex flex-col  items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w=[900px] snap-center shadow-xl p-6 rounded-xl transition-opacity duration-200 overflow-hidden'>
      <div>
        <Image
          className='w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center shadow-xl p-4'
          src={src}
          alt={alt}
          width={200}
          height={200}
        />
      </div>

      <div className='px-0 md:px-10'>
        <h4 className='text-4xl font-light'>{position}</h4>
        <p className='font-bold text-2xl mt-1 text-[#4a9b7f]'>{company}</p>
        <div className='flex space-x-2 my-[-20px]'>
          <Image
            className='h-100 w-120 rounded-full' src={srctech}
            alt={alttech}
            width={120}
            height={100} />
          <Image
            className='h-100 w-120 rounded-full' src={srctech2}
            alt={alttech2}
            width={120}
            height={100} />
          <Image
            className='h-100 w-120 rounded-full' src={srctech3}
            alt={alttech3}
            width={120}
            height={100} />
        </div>
        <p className='uppercase py-5 text-gray-500 text-center'>Inicio em... - Saída em ...</p>

        <p className='space-y-4 text-center text-lg'>
          Worked with a team of 5 people
        </p>
      </div>
    </article>
  )
}

export { Experience }