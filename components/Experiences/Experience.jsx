import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

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
  company,
  begin,
  description }) => {
  return (
    <article className='flex flex-col  items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w=[900px] snap-center shadow-xl p-6 rounded-xl transition-opacity duration-200 overflow-hidden'>
      <motion.div
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        whileInView={{
          opacity: 1, y: 0
        }}
        viewport={{
          once: true,
        }}
      >
        <Image
          className='w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center shadow-xl p-4'
          src={src}
          alt={alt}
          width={200}
          height={200}
        />
      </motion.div>

      <div className='px-0 md:px-10'>
        <h4 className='text-4xl font-light'>{position}</h4>
        <p className='font-bold text-2xl mt-1 text-[#4a9b7f]'>{company}</p>
        <div className='flex space-x-5 my-5 items-center justify-center'>
          <Image
            className='h-100 w-120' src={srctech}
            alt={alttech}
            width={100}
            height={50} />
          <Image
            className='h-100 w-120' src={srctech2}
            alt={alttech2}
            width={60}
            height={50} />
          <Image
            className='h-100 w-120' src={srctech3}
            alt={alttech3}
            width={120}
            height={50} />
        </div>
        <p className='uppercase py-5 text-gray-500 text-center'>{begin}</p>

        <p className='space-y-4 text-sm '>
          {description}
        </p>
      </div>
    </article>
  )
}

export { Experience }