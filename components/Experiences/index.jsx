import React from 'react'
import { motion } from 'framer-motion'
import { Experience } from './Experience'


const Experiences = () => {
  return (
    <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full">
      <p className="text-xl tracking-widest uppercase text-[#4a9b7f]">Experiences</p>
      <h2 className="py-4">what i can do</h2>

      <div className='w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#4A9B7F]/80'>
        <Experience />
        <Experience />
        <Experience />
      </div>
    </div>
  )
}

export { Experiences }