import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { motion } from 'framer-motion'

const Project = ({ src, alt, name, techs, projectUrl }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 100,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 1.2
      }}
      viewport={{
        once: true,
      }}
      className='relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl p-4 group hover:bg-gradient-to-r from-[#276355] to-[#4a9b7f]'>
      <Image
        src={src}
        alt={alt}
        width={700}
        height={500}
        className='rounded-xl group-hover:opacity-10 transition-all ease-in duration-400'
      />
      <div className='hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
        <h3 className='text-2xl tracking-wider text-center text-white'>{name}</h3>
        <p className='pb-4 pt-2 text-center text-white font-bold'>{techs}</p>
        <Link href={projectUrl}>
          <p className='text-center py-3 rounded-lg bg-white text-gray-700 font-bold text-lg cursor-pointer'>Ver Mais</p>
        </Link>
      </div>
    </motion.div>
  )
}

export { Project }